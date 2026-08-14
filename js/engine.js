// Motor de Argentero. Puro: sin DOM. La UI (o los tests) le pasan hooks.
import {
  PROVINCIAS, COHORTES, P_VARON, CLASES_POR_EPOCA, AJUSTE_CLASE_REGION,
  MORTALIDAD_INFANTIL, MULT_MORT_REGION, MULT_MORT_CLASE, ESPERANZA_VIDA,
  TGF, AJUSTE_HERMANOS, MOD_CLASE, MOD_REGION_EDU, PLATA_INICIAL,
  PRESIDENTES, MUNDIALES, CUADROS_BASE, CUADROS_PROVINCIA, buscarEnBandas, buscarRango,
} from './data/tablas.js?v=3';
import { HISTORIA } from './data/historia.js?v=3';
import { EVENTOS, DECISIONES } from './data/eventos.js?v=3';
import { NOMBRES, APELLIDOS, LOCALIDADES, CAUSAS_MUERTE, VEREDICTOS, FRASES_CLASE } from './data/textos.js?v=3';

export const ANIO_ACTUAL = 2026;

// La vida sigue afuera: un latido por etapa para quien emigró.
const TEXTOS_EXILIO = [
  'La vida sigue en {destino}: laburás, extrañás, mandás fotos al grupo de la familia.',
  'Otro año en {destino}. El acento no se te fue; la costumbre de mirar el dólar tampoco.',
  'En {destino} todo funciona y nada emociona. Yerba trajiste, por suerte.',
  'Desde {destino} seguís las noticias argentinas como quien mira una serie: con miedo a la próxima temporada.',
];

export const ETAPAS = [
  { id: 'infancia', nombre: 'Infancia', desde: 0, hasta: 5, tiradas: 1 },
  { id: 'ninez', nombre: 'Niñez', desde: 6, hasta: 11, tiradas: 1 },
  { id: 'adolescencia', nombre: 'Adolescencia', desde: 12, hasta: 17, tiradas: 2 },
  { id: 'juventud', nombre: 'Juventud', desde: 18, hasta: 29, tiradas: 2 },
  { id: 'adultez', nombre: 'Adultez', desde: 30, hasta: 44, tiradas: 2 },
  { id: 'madurez', nombre: 'Madurez', desde: 45, hasta: 59, tiradas: 1 },
  { id: 'vejez', nombre: 'Vejez', desde: 60, hasta: 104, tiradas: 1, bloques: 5 }, // en bloques de 5 años
];

function decadaNombre(anio) {
  if (anio < 1950) return '1930';
  if (anio < 1970) return '1950';
  if (anio < 1980) return '1970';
  if (anio < 1990) return '1980';
  if (anio < 2000) return '1990';
  return '2000';
}

// ---------- NACIMIENTO ----------
export function nacer(rng) {
  const anio = rng.entre(...rng.weighted(COHORTES));
  const genero = rng.chance(P_VARON) ? 'varon' : 'mujer';

  const prov = rng.weighted(PROVINCIAS.map(p => [p, p.peso]));
  const loc = LOCALIDADES[prov.nombre] || { capital: prov.nombre, pueblos: [prov.nombre], conurbano: null };
  let localidad, tipoLugar, region = prov.region;
  if (prov.nombre === 'CABA') {
    localidad = rng.pick(loc.barrios); tipoLugar = 'barrio';
  } else if (prov.nombre === 'Buenos Aires') {
    // conurbano 58% / interior bonaerense 42% (más pueblo cuanto más viejo)
    if (rng.chance(anio < 1970 ? 0.45 : 0.58)) { localidad = rng.pick(loc.conurbano); tipoLugar = 'conurbano'; region = 'GBA'; }
    else if (rng.chance(0.3)) { localidad = loc.capital; tipoLugar = 'capital'; region = 'Pampeana'; }
    else { localidad = rng.pick(loc.pueblos); tipoLugar = 'pueblo'; region = 'Pampeana'; }
  } else {
    const pPueblo = anio < 1970 ? 0.62 : 0.45;
    if (rng.chance(pPueblo)) { localidad = rng.pick(loc.pueblos); tipoLugar = 'pueblo'; }
    else { localidad = loc.capital; tipoLugar = 'capital'; }
  }

  // clase social: pesos por época, corridos por región
  const base = { ...buscarRango(CLASES_POR_EPOCA, anio).pesos };
  const adj = (AJUSTE_CLASE_REGION[region] || 0) + (tipoLugar === 'pueblo' ? 5 : 0);
  base.humilde = Math.max(1, base.humilde + adj);
  base.media = Math.max(1, base.media - adj * 0.7);
  base.acomodada = Math.max(1, base.acomodada - adj * 0.3);
  const clase = rng.weighted(Object.entries(base));

  // hermanos: media = TGF(época) - 1 + ajustes, con cola larga real
  const media = buscarEnBandas(TGF, anio) - 1
    + AJUSTE_HERMANOS.clase[clase]
    + (AJUSTE_HERMANOS.region[region] || 0)
    + (tipoLugar === 'pueblo' ? AJUSTE_HERMANOS.pueblo : 0);
  let hermanos = Math.max(0, Math.round(media + (rng.d12() - 6.5) / 2.2));
  if (hermanos >= 5 && rng.chance(0.25)) hermanos += rng.entre(1, 4); // la cola de las familias enormes
  hermanos = Math.min(hermanos, 14);

  const nombre = rng.pick(NOMBRES[genero][decadaNombre(anio)]);
  const apellido = rng.pick(APELLIDOS);

  // el cuadro no se elige: se hereda (pesos Kantar + cuadro local de la provincia)
  const cuadro = rng.weighted([...CUADROS_BASE, ...(CUADROS_PROVINCIA[prov.nombre] || [])]);

  return {
    anio, genero, provincia: prov.nombre, localidad, tipoLugar, region, clase, hermanos, nombre, apellido, cuadro,
    lugar: prov.nombre === 'CABA' ? `${localidad}, CABA` : `${localidad}, ${prov.nombre}`,
  };
}

// ---------- HELPERS ----------
function plantilla(texto, ctx) {
  return texto
    .replaceAll('{nombre}', ctx.nacimiento.nombre)
    .replaceAll('{provincia}', ctx.nacimiento.provincia)
    .replaceAll('{localidad}', ctx.nacimiento.localidad)
    .replaceAll('{edad}', String(ctx.edad ?? ''));
}

function aplicarEfectos(vida, efectos) {
  if (!efectos) return;
  const s = vida.stats;
  if (efectos.plata) s.plata = Math.max(0, Math.min(100, s.plata + efectos.plata));
  if (efectos.salud) s.salud = Math.max(0, Math.min(100, s.salud + efectos.salud));
  if (efectos.felicidad) s.felicidad = Math.max(0, Math.min(100, s.felicidad + efectos.felicidad));
}

function aplicarSet(vida, set) {
  if (!set) return;
  if (set.educacion) vida.educacion = set.educacion;
  if (set.laburo) vida.laburo = set.laburo;
  if (set.pareja) vida.pareja = true;
  if (set.hijosDelta) vida.hijos += set.hijosDelta;
  if (set.techoPropio) vida.techoPropio = true;
  if (set.jubilado) vida.jubilado = true;
  if (set.exilio) vida.exilio = set.exilio;
  if (set.habilidad && !vida.habilidades.includes(set.habilidad)) vida.habilidades.push(set.habilidad);
  if (set.propiedad && !vida.propiedades.includes(set.propiedad)) vida.propiedades.push(set.propiedad);
  if (set.marca && !vida.marcas.includes(set.marca)) vida.marcas.push(set.marca);
  for (const propiedad of set.propiedades || []) {
    if (!vida.propiedades.includes(propiedad)) vida.propiedades.push(propiedad);
  }
}

function estadoVida(vida, edad) {
  return {
    edad,
    pareja: vida.pareja,
    hijos: vida.hijos,
    educacion: vida.educacion,
    laburo: vida.laburo,
    techoPropio: vida.techoPropio,
    jubilado: vida.jubilado,
    exilio: vida.exilio,
    habilidades: [...vida.habilidades],
    propiedades: [...vida.propiedades],
    marcas: [...vida.marcas],
  };
}

function opcionesVisibles(dec, rng) {
  if (!dec.opciones || dec.opciones.length <= 2) return dec;
  const inicio = rng.entre(0, dec.opciones.length - 2);
  return { ...dec, opciones: dec.opciones.slice(inicio, inicio + 2) };
}

function cumpleCond(cond, ctx) {
  if (!cond) return true;
  const { nacimiento: n, edad, anio, vida } = ctx;
  if (cond.edadMin != null && edad < cond.edadMin) return false;
  if (cond.edadMax != null && edad > cond.edadMax) return false;
  if (cond.genero && n.genero !== cond.genero) return false;
  if (cond.generoIn && !cond.generoIn.includes(n.genero)) return false;
  if (cond.regiones && !cond.regiones.includes(n.region)) return false;
  if (cond.regionIn && !cond.regionIn.includes(n.region)) return false;
  if (cond.clases && !cond.clases.includes(n.clase)) return false;
  if (cond.claseIn && !cond.claseIn.includes(n.clase)) return false;
  if (cond.anioNacMin != null && n.anio < cond.anioNacMin) return false;
  if (cond.anioNacMax != null && n.anio > cond.anioNacMax) return false;
  if (cond.anioMin != null && anio != null && anio < cond.anioMin) return false;
  if (cond.anioMax != null && anio != null && anio > cond.anioMax) return false;
  if (cond.plataMin != null && vida.stats.plata < cond.plataMin) return false;
  if (cond.plataMax != null && vida.stats.plata > cond.plataMax) return false;
  if (cond.saludMin != null && vida.stats.salud < cond.saludMin) return false;
  if (cond.saludMax != null && vida.stats.salud > cond.saludMax) return false;
  if (cond.educacionIn && !cond.educacionIn.includes(vida.educacion)) return false;
  if (cond.laburoIn && !cond.laburoIn.includes(vida.laburo)) return false;
  if (cond.pareja != null && vida.pareja !== cond.pareja) return false;
  if (cond.techoPropio != null && vida.techoPropio !== cond.techoPropio) return false;
  if (cond.hijosMin != null && vida.hijos < cond.hijosMin) return false;
  if (cond.hijosMax != null && vida.hijos > cond.hijosMax) return false;
  if (cond.habilidadesIn && !cond.habilidadesIn.every(h => vida.habilidades.includes(h))) return false;
  if (cond.propiedadesIn && !cond.propiedadesIn.every(p => vida.propiedades.includes(p))) return false;
  if (cond.marcasIn && !cond.marcasIn.every(m => vida.marcas.includes(m))) return false;
  return true;
}

function esCrisis(ev) { return ev.efectos && (ev.efectos.plata || 0) <= -15; }

// ---------- SIMULACIÓN ----------
export async function simularVida(nacimiento, rng, hooks = {}) {
  const onMomento = hooks.onMomento || (() => {});
  const onEtapa = hooks.onEtapa || (() => {});
  const onDecision = hooks.onDecision || (async d => d.opciones[0]);

  const vida = {
    nacimiento,
    stats: {
      plata: PLATA_INICIAL[nacimiento.clase],
      salud: Math.max(20, 60 - Math.round((MULT_MORT_REGION[nacimiento.region] - 1) * 20) + (nacimiento.clase === 'acomodada' ? 10 : 0)),
      felicidad: 55,
    },
    educacion: 'primaria', laburo: null, pareja: false, hijos: 0,
    techoPropio: false, jubilado: false, exilio: null,
    habilidades: [], propiedades: [], marcas: [],
    crisisVividas: 0, momentos: [], usados: new Set(),
    vivo: true, anioMuerte: null, edadMuerte: null, causaFinal: null, llegoAlPresente: false,
  };

  // cada momento lleva una foto de las barras para que la UI pinte el HUD con retardo
  const emit = (m) => {
    m.stats = { ...vida.stats };
    m.estado = estadoVida(vida, m.edad ?? 0);
    vida.momentos.push(m);
    onMomento(m);
  };

  for (const etapa of ETAPAS) {
    if (!vida.vivo || vida.llegoAlPresente) break;
    const bloques = etapa.bloques
      ? partirEnBloques(etapa.desde, etapa.hasta, etapa.bloques)
      : [[etapa.desde, etapa.hasta]];

    for (const [desde, hasta] of bloques) {
      if (!vida.vivo || vida.llegoAlPresente) break;
      const anioDesde = nacimiento.anio + desde;
      if (anioDesde > ANIO_ACTUAL) { vida.llegoAlPresente = true; break; }
      await onEtapa({ etapa, desde, hasta, anioDesde, edadDesde: desde });

      // 1) chequeo de supervivencia del bloque (mortalidad real dramatizada en d12)
      if (!(await chequeoMortalidad(vida, rng, etapa, desde, hasta, emit))) break;

      // 2) historia argentina que atraviesa el bloque, año a año
      for (let edad = desde; edad <= hasta; edad++) {
        const anio = nacimiento.anio + edad;
        if (anio > ANIO_ACTUAL) { vida.llegoAlPresente = true; break; }
        await dispararHistoria(vida, rng, anio, edad, emit, onDecision);
        if (vida.stats.salud <= 0 && vida.vivo) { morir(vida, rng, etapa.id, edad, emit, 'La salud no aguantó tanto sacudón.'); break; }
      }
      if (!vida.vivo || vida.llegoAlPresente) break;

      // 3) tiradas y decisiones de etapa — salvo que la vida siga afuera
      if (vida.exilio) {
        if (vida.vivo && !vida.llegoAlPresente) {
          emit({
            tipo: 'hito', etapa: etapa.id, edad: desde, anio: Math.min(nacimiento.anio + desde, ANIO_ACTUAL),
            texto: rng.pick(TEXTOS_EXILIO).replaceAll('{destino}', vida.exilio), efectos: null,
          });
        }
      } else {
        for (let i = 0; i < etapa.tiradas; i++) {
          if (!vida.vivo) break;
          tiradaDeEtapa(vida, rng, etapa, desde, hasta, emit);
        }

        // decisiones (las etapas largas pueden traer una segunda)
        if (vida.vivo && !vida.llegoAlPresente) {
          const hubo = await decisionDeEtapa(vida, rng, etapa, desde, hasta, emit, onDecision);
          if (hubo && !vida.exilio && (etapa.id === 'juventud' || etapa.id === 'adultez') && rng.chance(0.6)) {
            await decisionDeEtapa(vida, rng, etapa, desde, hasta, emit, onDecision);
          }
        }
      }
    }
  }

  // hijos por defecto si los eventos no lo definieron (TGF de su época adulta)
  if (vida.hijos === 0 && (vida.pareja || rng.chance(0.55)) && edadFinal(vida) >= 28) {
    const tgf = buscarEnBandas(TGF, Math.min(nacimiento.anio + 28, ANIO_ACTUAL));
    vida.hijos = Math.max(0, Math.round(tgf + AJUSTE_HERMANOS.clase[nacimiento.clase] * 0.5 + (rng.d12() - 6.5) / 3));
  }
  if (!vida.laburo) vida.laburo = { humilde: 'changas', trabajadora: 'laburo en negro', media: 'empleo administrativo', acomodada: 'la empresa de la familia' }[nacimiento.clase];

  cerrarVida(vida, rng, emit);
  return vida;
}

function partirEnBloques(desde, hasta, tam) {
  const out = [];
  for (let a = desde; a <= hasta; a += tam) out.push([a, Math.min(a + tam - 1, hasta)]);
  return out;
}

function edadFinal(vida) {
  return vida.vivo ? Math.min(ANIO_ACTUAL - vida.nacimiento.anio, 104) : vida.edadMuerte;
}

// ---------- MORTALIDAD ----------
async function chequeoMortalidad(vida, rng, etapa, desde, hasta, emit) {
  const n = vida.nacimiento;
  let p = 0;
  if (etapa.id === 'infancia') {
    // 0-5 acumulado ~ IMR x1.35; sqrt suaviza el stacking región x clase
    p = (buscarEnBandas(MORTALIDAD_INFANTIL, n.anio) / 1000) * 1.35
      * Math.sqrt(MULT_MORT_REGION[n.region] * MULT_MORT_CLASE[n.clase]);
    p = Math.min(0.3, p);
  } else if (etapa.id === 'madurez') {
    p = (n.genero === 'varon' ? 0.06 : 0.04) * Math.sqrt(MULT_MORT_CLASE[n.clase]) * (vida.stats.salud < 30 ? 1.5 : 1);
  } else if (etapa.id === 'vejez') {
    const ev = buscarRango(ESPERANZA_VIDA, n.anio);
    const esperanza = n.genero === 'varon' ? ev.varon : ev.mujer;
    const edadMedia = (desde + hasta) / 2;
    p = 0.05 + Math.max(0, (edadMedia - esperanza)) * 0.045 + (vida.stats.salud < 30 ? 0.1 : 0) + (vida.stats.plata < 15 ? 0.04 : 0);
    p = Math.min(0.9, p);
  } else {
    p = 0.01; // accidentes, enfermedad: silencioso y raro
  }

  // el dado dice la verdad: muerte si d <= floor(p*12), y la fracción se
  // resuelve en el número borde — así p queda exacta y el d12 sigue mandando
  const umbralF = p * 12;
  const base = Math.floor(umbralF);
  const frac = umbralF - base;
  const d = rng.d12();
  const muere = d <= base || (d === base + 1 && rng.chance(frac));

  if (umbralF < 0.5 && !muere) return true; // riesgo bajo: ni se muestra
  if (umbralF >= 0.5) {
    const sobrevive = !muere;
    emit({
      tipo: 'tirada', subtipo: 'supervivencia', etapa: etapa.id, edad: desde, anio: n.anio + desde,
      titulo: etapa.id === 'infancia' ? 'Tirada de supervivencia' : 'Tirada de la vida',
      tirada: { d, mods: [], total: d, dc: Math.max(2, Math.ceil(umbralF) + 1), exito: sobrevive, crit: d === 1 ? 1 : d === 12 ? 12 : 0 },
      texto: sobrevive
        ? (d === 12 ? 'Un 12. Sanito como un roble, contra todo pronóstico.' : 'Zafaste. Se sigue.')
        : null,
      efectos: null,
    });
  }
  if (muere) {
    morir(vida, rng, etapa.id, rng.entre(desde, hasta), emit);
    return false;
  }
  return true;
}

function morir(vida, rng, etapaId, edad, emit, causaForzada) {
  const n = vida.nacimiento;
  vida.vivo = false;
  vida.edadMuerte = edad;
  vida.anioMuerte = Math.min(n.anio + edad, ANIO_ACTUAL);
  let causa = causaForzada;
  if (!causa) {
    const banco = CAUSAS_MUERTE[etapaId];
    const lista = Array.isArray(banco) ? banco : (banco[n.clase] || banco.default);
    causa = rng.pick(lista);
  }
  vida.causaFinal = causa;
  emit({ tipo: 'muerte', etapa: etapaId, edad, anio: vida.anioMuerte, texto: causa, efectos: null });
}

// ---------- HISTORIA ----------
async function dispararHistoria(vida, rng, anio, edad, emit, onDecision) {
  const ctx = { nacimiento: vida.nacimiento, edad, anio, vida };
  for (const ev of HISTORIA) {
    if (anio < ev.desde || anio > ev.hasta) continue;
    if (ev.unaVez && vida.usados.has(ev.id)) continue;
    if (!cumpleCond(ev.cond, ctx)) continue;
    if (vida.exilio && ev.id.indexOf('mundial') === -1) continue; // desde afuera solo se vive el Mundial
    if (ev.prob != null && !rng.chance(ev.prob)) { if (ev.unaVez) vida.usados.add(ev.id); continue; }
    vida.usados.add(ev.id);

    // caso especial: conscripto en Malvinas — chequeo de supervivencia sobrio
    if (ev.id === 'malvinas-conscripto') {
      emit({ tipo: 'historia', etapa: null, edad, anio, texto: plantilla(ev.texto, ctx), efectos: ev.efectos, tono: 'sobrio' });
      aplicarEfectos(vida, ev.efectos);
      const d = rng.d12();
      const vuelve = d > 1; // 649 caídos entre ~10.000 desplegados
      emit({
        tipo: 'tirada', subtipo: 'supervivencia', etapa: 'juventud', edad, anio,
        titulo: 'Malvinas', tirada: { d, mods: [], total: d, dc: 2, exito: vuelve, crit: d === 1 ? 1 : d === 12 ? 12 : 0 },
        texto: vuelve ? 'Volviste. Nadie te esperaba con banderas. Te lo guardaste todo, por décadas.' : null,
        efectos: vuelve ? { felicidad: -25, salud: -15 } : null, tono: 'sobrio',
      });
      if (!vuelve) {
        vida.vivo = false; vida.edadMuerte = edad; vida.anioMuerte = anio;
        vida.causaFinal = 'Caíste en Malvinas, a los ' + edad + ' años. En tu pueblo hay una calle con tu nombre.';
        emit({ tipo: 'muerte', etapa: 'juventud', edad, anio, texto: vida.causaFinal, efectos: null, tono: 'sobrio' });
        return;
      }
      aplicarEfectos(vida, { felicidad: -25, salud: -15 });
      continue;
    }

    if (esCrisis(ev)) vida.crisisVividas++;
    aplicarEfectos(vida, ev.efectos);
    emit({ tipo: 'historia', etapa: null, edad, anio, texto: plantilla(ev.texto, ctx), efectos: ev.efectos, tono: ev.tono });
    if (ev.set) aplicarSet(vida, ev.set);
    if (ev.decision && vida.vivo) await resolverDecision(vida, opcionesVisibles(ev.decision, rng), edad, anio, emit, onDecision);
    if (!vida.vivo) return;
  }
}

// ---------- TIRADAS DE ETAPA ----------
function tiradaDeEtapa(vida, rng, etapa, desde, hasta, emit) {
  const n = vida.nacimiento;
  const anioMedio = Math.min(n.anio + Math.floor((desde + hasta) / 2), ANIO_ACTUAL);
  const ctx = { nacimiento: n, edad: Math.floor((desde + hasta) / 2), anio: anioMedio, vida };

  const candidatos = EVENTOS.filter(e =>
    e.etapa === etapa.id && !vida.usados.has(e.id) && cumpleCond(e.cond, ctx));
  if (!candidatos.length) return;
  const ev = rng.weighted(candidatos.map(e => [e, e.peso || 10]));
  vida.usados.add(ev.id);

  const mods = [];
  const mClase = MOD_CLASE[n.clase];
  if (mClase) mods.push({ label: `clase ${claseNombre(n.clase)}`, val: mClase });
  const mRegion = MOD_REGION_EDU[n.region] || 0;
  if (mRegion) mods.push({ label: n.region === 'CABA' ? 'porteñidad' : `interior (${n.region})`, val: mRegion });
  if (vida.stats.salud > 70) mods.push({ label: 'buena salud', val: 1 });
  if (vida.stats.salud < 30) mods.push({ label: 'salud golpeada', val: -1 });
  if (vida.stats.plata < 15) mods.push({ label: 'en la lona', val: -1 });
  if (ev.id === 'universidad' && vida.educacion === 'secundaria') mods.push({ label: 'secundario terminado', val: 2 });
  if (ev.id === 'el-oficio' && vida.habilidades.includes('oficio')) mods.push({ label: 'oficio elegido', val: 2 });
  if (ev.id.startsWith('techo-propio') && vida.propiedades.includes('lote')) mods.push({ label: 'lote propio', val: 2 });
  if (ev.id === 'monotributo' && vida.habilidades.includes('emprendimiento')) mods.push({ label: 'experiencia por cuenta propia', val: 1 });
  if (ev.id === 'reestructuracion' && vida.habilidades.includes('estabilidad')) mods.push({ label: 'antigüedad formal', val: 1 });
  if (ev.id === 'los-aportes' && vida.laburo === 'en negro') mods.push({ label: 'años en negro', val: -2 });

  const d = rng.d12();
  const total = d + mods.reduce((a, m) => a + m.val, 0);
  const exito = d === 12 ? true : d === 1 ? false : total >= ev.dc;
  const res = d === 1 ? (ev.crit1 || ev.fallo) : d === 12 ? (ev.crit12 || ev.exito) : exito ? ev.exito : ev.fallo;

  aplicarEfectos(vida, res.efectos);
  aplicarSet(vida, res.set);
  emit({
    tipo: 'tirada', subtipo: 'etapa', etapa: etapa.id, edad: ctx.edad, anio: anioMedio,
    titulo: ev.titulo, intro: plantilla(ev.intro || '', ctx),
    tirada: { d, mods, total, dc: ev.dc, exito, crit: d === 1 ? 1 : d === 12 ? 12 : 0 },
    texto: plantilla(res.texto, ctx), efectos: res.efectos,
  });
}

// ---------- DECISIONES ----------
async function decisionDeEtapa(vida, rng, etapa, desde, hasta, emit, onDecision) {
  const n = vida.nacimiento;
  const anios = [n.anio + desde, Math.min(n.anio + hasta, ANIO_ACTUAL)];
  const ctx = { nacimiento: n, edad: desde, anio: anios[0], vida };

  const candidatas = DECISIONES.filter(dd => {
    if (dd.etapa !== etapa.id || vida.usados.has(dd.id)) return false;
    const c = dd.cond || {};
    if (c.edadMin != null && hasta < c.edadMin) return false;
    if (c.edadMax != null && desde > c.edadMax) return false;
    // la ventana de años de la decisión tiene que pisar los años del bloque
    if (c.anioMin != null && anios[1] < c.anioMin) return false;
    if (c.anioMax != null && anios[0] > c.anioMax) return false;
    return cumpleCond({ ...c, edadMin: null, edadMax: null, anioMin: null, anioMax: null }, ctx);
  });
  if (!candidatas.length) return false;
  const urgentes = candidatas.filter(decision => decision.urgente);
  const dec = opcionesVisibles(rng.pick(urgentes.length ? urgentes : candidatas), rng);
  vida.usados.add(dec.id);

  const edadDesde = Math.max(desde, dec.cond?.edadMin ?? desde);
  const edadHasta = Math.min(hasta, dec.cond?.edadMax ?? hasta);
  const edadObjetivo = Math.max(edadDesde, Math.min(dec.cond?.edadMin ?? edadDesde, edadHasta));
  const anioBase = n.anio + edadObjetivo;
  const anioDec = Math.max(anioBase, Math.min(dec.cond?.anioMin ?? anioBase, anios[1]));
  const edadDec = anioDec - n.anio;
  const ctxDec = { ...ctx, edad: edadDec, anio: anioDec };
  const elegida = await onDecision({
    ...dec,
    pregunta: plantilla(dec.pregunta, ctxDec),
    contexto: plantilla(dec.contexto || '', ctxDec),
    anio: anioDec, edad: edadDec,
  });
  aplicarEfectos(vida, elegida.efectos);
  aplicarSet(vida, elegida.set);
  emit({
    tipo: 'decision', etapa: etapa.id, edad: edadDec, anio: anioDec,
    titulo: dec.pregunta, eleccion: elegida.texto,
    texto: plantilla(elegida.resultado || '', ctxDec), efectos: elegida.efectos,
  });
  return true;
}

async function resolverDecision(vida, dec, edad, anio, emit, onDecision) {
  const ctx = { nacimiento: vida.nacimiento, edad, anio, vida };
  const elegida = await onDecision({
    ...dec,
    pregunta: plantilla(dec.pregunta, ctx),
    contexto: plantilla(dec.contexto || '', ctx),
    anio,
    edad,
  });
  const opcion = elegida || dec.opciones[0];
  aplicarEfectos(vida, opcion.efectos);
  aplicarSet(vida, opcion.set);
  emit({
    tipo: 'decision', etapa: null, edad, anio,
    titulo: dec.pregunta, eleccion: opcion.texto,
    texto: plantilla(opcion.resultado || '', ctx), efectos: opcion.efectos,
  });
}

// ---------- CIERRE, SCORE, VEREDICTO ----------
function cerrarVida(vida, rng, emit) {
  const n = vida.nacimiento;
  const finAnio = vida.vivo ? ANIO_ACTUAL : vida.anioMuerte;

  vida.mundialesVistos = MUNDIALES.filter(([a]) => a >= n.anio + 4 && a <= finAnio).length;
  vida.mundialesGanados = MUNDIALES.filter(([a, r]) => r === 'campeon' && a >= n.anio + 4 && a <= finAnio).length;
  vida.presidentesVividos = PRESIDENTES.filter(([, a], i) => {
    const sig = PRESIDENTES[i + 1] ? PRESIDENTES[i + 1][1] : ANIO_ACTUAL + 1;
    return a <= finAnio && sig > n.anio;
  }).length;

  const educPts = { primaria: 3, secundaria: 7, terciaria: 11, universitaria: 15 }[vida.educacion] || 0;
  const anios = edadFinal(vida);
  const s = vida.stats;
  vida.score = Math.round(
    Math.min(42, anios * 0.6)
    + (s.plata + s.salud + s.felicidad) / 8
    + educPts
    + (vida.techoPropio ? 6 : 0)
    + (vida.jubilado ? 6 : 0)
    + Math.min(6, vida.hijos * 2)
    + (vida.pareja ? 3 : 0)
    + vida.mundialesGanados * 3
    + vida.crisisVividas // sobreviviste: un punto por cicatriz
  );
  vida.veredicto = VEREDICTOS.find(v => vida.score >= v.min) || VEREDICTOS[VEREDICTOS.length - 1];

  if (vida.vivo) {
    emit({
      tipo: 'hito', etapa: 'final', edad: anios, anio: ANIO_ACTUAL,
      texto: `Y acá estás: ${anios} años, ${ANIO_ACTUAL}. La historia sigue. CONTINUARÁ…`, efectos: null,
    });
  }
}

export function claseNombre(clase) {
  return { humilde: 'humilde', trabajadora: 'trabajadora', media: 'media', acomodada: 'acomodada' }[clase];
}

export function fraseNacimiento(n) {
  const g = n.genero === 'varon' ? 'varón' : 'mujer';
  const h = n.hermanos === 0 ? 'sin hermanos'
    : n.hermanos === 1 ? 'con 1 hermano'
    : `con ${n.hermanos} hermanos`;
  return `Naciste ${g} en ${n.lugar} en ${n.anio}, ${FRASES_CLASE[n.clase]}, ${h}.`;
}
