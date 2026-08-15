// Render y ritmo del juego. Sin lógica de simulación: eso vive en engine.js.
import { UI, SHARE_TPL, FRASES_CLASE } from './data/textos.js?v=4';
import { fraseNacimiento, ETAPAS, ANIO_ACTUAL } from './engine.js?v=4';
import { semillaATexto } from './rng.js?v=4';

const $ = (sel) => document.querySelector(sel);
export let VELOCIDAD = 1; // 1 normal, 2 rápido
export let AUTO = false;  // false: el jugador avanza con "Seguir"

const espera = (ms) => new Promise(r => setTimeout(r, ms / VELOCIDAD));

// pausa entre momentos: el momento ya está dibujado en el timeline, así que el
// panel NO lo repite. En manual muestra solo "Continuar"; en auto se esconde.
function pausa(ms) {
  if (AUTO) { ocultarPanel(); return espera(ms); }
  return esperarSeguir();
}

function mostrarPanel(html) {
  const panel = $('#accion-vida');
  panel.innerHTML = html;
  panel.classList.add('activo');
  return panel;
}

function ocultarPanel() {
  const panel = $('#accion-vida');
  panel.classList.remove('activo');
  panel.innerHTML = '';
}

function esperarSeguir() {
  return new Promise(resolve => {
    const panel = mostrarPanel(`<button class="boton chico" id="btn-seguir">Continuar ▸</button>`);
    panel.classList.add('solo-boton');
    panel.querySelector('#btn-seguir').onclick = () => { panel.classList.remove('solo-boton'); resolve(); };
  });
}

// El timeline siempre termina mostrando lo último que pasó. Se hace en el
// próximo frame (para que el DOM recién insertado ya tenga alto) y contra el
// último elemento real: en mobile el timeline no scrollea, scrollea la página,
// y hay una hoja fija abajo que no debe tapar el último momento.
export function scrollAlFinal(suave = true) {
  const hacer = () => {
    const tl = $('#timeline');
    const behavior = suave ? 'smooth' : 'auto';
    if (tl.scrollHeight > tl.clientHeight) { // desktop: scrollea el timeline
      tl.scrollTo({ top: tl.scrollHeight, behavior });
      return;
    }
    // mobile: la hoja de acción es fija abajo; reservamos exactamente su alto
    // como padding del timeline y llevamos la página al fondo.
    const hoja = $('#accion-vida');
    const fija = hoja.classList.contains('activo') && getComputedStyle(hoja).position === 'fixed';
    tl.style.paddingBottom = fija ? `${Math.ceil(hoja.getBoundingClientRect().height) + 24}px` : '';
    const objetivo = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, objetivo), behavior });
  };
  // dos pasadas: una apenas se pinta el DOM nuevo y otra cuando terminó de
  // asentarse el layout (imágenes/fuentes/altura de la hoja), así nunca queda
  // el último momento tapado por la hoja.
  requestAnimationFrame(hacer);
  setTimeout(hacer, 220);
}

export function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  $('#' + id).classList.add('activa');
  window.scrollTo({ top: 0 });
}

// ---------- DADO ----------
function dadoSvg() {
  // dodecágono regular (la cara de un d12)
  const pts = [];
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI / 6) * i - Math.PI / 2 + Math.PI / 12;
    pts.push(`${50 + 46 * Math.cos(a)},${50 + 46 * Math.sin(a)}`);
  }
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id="gd" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a8cbea"/><stop offset="0.5" stop-color="#75aadb"/><stop offset="1" stop-color="#4a7fb5"/>
    </linearGradient></defs>
    <polygon points="${pts.join(' ')}" fill="url(#gd)" stroke="#dbe9f7" stroke-width="2"/>
  </svg>`;
}

export async function animarDado(contenedor, resultado, { duracion = 1100 } = {}) {
  contenedor.innerHTML = `<div class="dado girando">${dadoSvg()}<div class="cara-num">?</div></div>`;
  const dado = contenedor.querySelector('.dado');
  const num = contenedor.querySelector('.cara-num');
  const t0 = Date.now();
  while (Date.now() - t0 < duracion / VELOCIDAD) {
    num.textContent = 1 + Math.floor(Math.random() * 12);
    await new Promise(r => setTimeout(r, 70));
  }
  dado.classList.remove('girando');
  num.textContent = resultado;
  if (resultado === 12) dado.classList.add('resultado-crit');
  if (resultado === 1) dado.classList.add('resultado-pifia');
  await espera(350);
}

function cuentaHtml(t) {
  const modsTxt = t.mods.map(m => ` ${m.val > 0 ? '+' : '−'}${Math.abs(m.val)} <span title="${m.label}">${m.label}</span>`).join('');
  const cls = t.exito ? 'vs-exito' : 'vs-fallo';
  const signo = t.exito ? '✓' : '✗';
  return `🎲 <b>${t.d}</b>${modsTxt} = <b>${t.total}</b> contra <b>${t.dc}</b> <span class="${cls}">${signo}</span>`;
}

// ---------- CHIPS DE EFECTOS ----------
function chipsEfectos(efectos) {
  if (!efectos) return '';
  const nombres = { plata: '💵', salud: '❤️', felicidad: '😄' };
  const chips = Object.entries(efectos)
    .filter(([, v]) => v)
    .map(([k, v]) => `<span class="chip ${v > 0 ? 'pos' : 'neg'}">${nombres[k]} ${v > 0 ? '+' : ''}${v}</span>`);
  return chips.length ? `<div class="efectos">${chips.join('')}</div>` : '';
}

// ---------- HUD ----------
function pintarBarras(stats) {
  for (const k of ['plata', 'salud', 'felicidad']) {
    const v = Math.round(stats[k]);
    $(`#barra-${k} .relleno`).style.width = v + '%';
    $(`#barra-${k} b`).textContent = v;
  }
}

const EDUCACION = {
  primaria: 'Primaria', secundaria: 'Secundaria', terciaria: 'Terciario', universitaria: 'Universidad',
};
const PROPIEDADES = { lote: 'Lote', casa: 'Casa propia 🏠', auto: 'Auto 🚗' };
const HABILIDADES = {
  estudio: 'Estudio', oficio: 'Oficio', emprendimiento: 'Emprendimiento',
  estabilidad: 'Trabajo formal', prudencia: 'Prudencia',
};

function pintarPerfil(nacimiento, estado = {}) {
  const familia = [
    FRASES_CLASE[nacimiento.clase].replace('en una familia ', ''),
    nacimiento.hermanos === 0 ? 'sin hermanos' : `${nacimiento.hermanos} ${nacimiento.hermanos === 1 ? 'hermano' : 'hermanos'}`,
    estado.pareja ? 'en pareja' : 'sin pareja',
    `${estado.hijos || 0} ${estado.hijos === 1 ? 'hijo' : 'hijos'}`,
  ];
  const propiedades = [...(estado.propiedades || [])];
  if (estado.techoPropio && !propiedades.includes('casa')) propiedades.unshift('casa');
  const propiedadesTxt = propiedades.length
    ? propiedades.map(p => PROPIEDADES[p] || p).join(' · ')
    : 'Ninguna todavía';
  const habilidades = (estado.habilidades || []).map(h => HABILIDADES[h] || h);
  const habilidadesTxt = habilidades.length ? habilidades.join(' · ') : 'Todavía ninguna';
  const perfil = $('#perfil-vida');
  if (!perfil) return;
  perfil.innerHTML = `
    <div class="perfil-titulo">Ficha de personaje</div>
    <div class="perfil-grid">
      <div><span>Nombre</span><b>${nacimiento.nombre}</b></div>
      <div><span>Apellido</span><b>${nacimiento.apellido}</b></div>
      <div><span>Edad</span><b>${estado.edad ?? 0} años</b></div>
      <div><span>Educación</span><b>${EDUCACION[estado.educacion] || 'Primaria'}</b></div>
      <div class="perfil-ancho"><span>Familia</span><b>${familia.join(' · ')}</b></div>
      <div class="perfil-ancho"><span>Propiedades</span><b>${propiedadesTxt}</b></div>
      <div class="perfil-ancho"><span>Habilidades</span><b>${habilidadesTxt}</b></div>
    </div>`;
}

export function pintarHudInicial(nacimiento) {
  $('#hud-nombre').textContent = `${nacimiento.nombre} ${nacimiento.apellido} · ${nacimiento.lugar}`;
  $('#hud-anio').textContent = nacimiento.anio;
  pintarPerfil(nacimiento);
}

// ---------- NACIMIENTO ----------
export async function animarNacimiento(nacimiento, rngVisual) {
  mostrarPantalla('pantalla-nacimiento');
  const cont = $('#nacimiento-dado');
  const filas = [
    ['Año', String(nacimiento.anio)],
    ['Lugar', nacimiento.lugar],
    ['Género', nacimiento.genero === 'varon' ? 'Varón' : 'Mujer'],
    ['Clase social', FRASES_CLASE[nacimiento.clase].replace('en una familia ', '')],
    ['Hermanos', String(nacimiento.hermanos)],
    ['Cuadro (herencia)', nacimiento.cuadro],
    ['Te anotaron como', nacimiento.nombre],
    ['Apellido', nacimiento.apellido],
  ];
  const acta = $('#acta-nacimiento');
  acta.innerHTML = `<div class="encabezado">${UI.partida.encabezado}</div>` + filas.map(([campo], i) =>
    `<div class="fila"><span class="campo">${campo}</span><span class="valor" id="acta-v${i}"></span></div>`).join('');

  for (let i = 0; i < filas.length; i++) {
    await animarDado(cont, rngVisual.d12(), { duracion: i === 0 ? 1000 : 600 });
    const v = $(`#acta-v${i}`);
    v.textContent = filas[i][1];
    v.classList.add('visible');
    await espera(320);
  }
  cont.innerHTML = '';
  acta.insertAdjacentHTML('beforeend', `<div class="frase">${fraseNacimiento(nacimiento)}</div>`);
  $('#btn-vivir').style.display = 'inline-block';
}

// ---------- VIDA: timeline ----------
export function marcarEtapa({ etapa, desde, hasta, anioDesde }) {
  const e = UI.etapas[etapa.id];
  const nombre = e ? `${e.emoji} ${e.nombre}` : etapa.nombre;
  const hastaAnio = Math.min(anioDesde + (hasta - desde), ANIO_ACTUAL);
  $('#timeline').insertAdjacentHTML('beforeend',
    `<div class="etapa-titulo">${nombre} <span class="anios">${anioDesde}–${hastaAnio}</span></div>`);
}

export async function renderMomento(m, nacimiento) {
  const tl = $('#timeline');
  const meta = `${m.anio} · ${m.edad} años`;

  if (m.tipo === 'tirada') {
    await tiradaConPanel(m);
    const t = m.tirada;
    const cls = t.crit === 12 ? 'crit' : t.crit === 1 ? 'pifia' : t.exito ? 'exito' : 'fallo';
    tl.insertAdjacentHTML('beforeend', `
      <div class="momento tirada-log ${cls}">
        <div class="meta">${meta}</div>
        <div class="titulo-ev">${m.titulo}</div>
        ${m.intro ? `<div class="intro">${m.intro}</div>` : ''}
        <div class="dado-cuenta">${cuentaHtml(t)}</div>
        ${m.texto ? `<div class="texto" style="margin-top:8px">${m.texto}</div>` : ''}
        ${chipsEfectos(m.efectos)}
      </div>`);
  } else if (m.tipo === 'historia') {
    tl.insertAdjacentHTML('beforeend', `
      <div class="momento historia ${m.tono === 'sobrio' ? 'sobrio' : ''}">
        <div class="meta">${meta}</div>
        <div class="texto">${m.texto}</div>
        ${m.tono === 'sobrio' ? '' : chipsEfectos(m.efectos)}
      </div>`);
    scrollAlFinal(); await pausa(760);
  } else if (m.tipo === 'decision') {
    tl.insertAdjacentHTML('beforeend', `
      <div class="momento decision-log">
        <div class="meta">${meta}</div>
        <div class="eleccion">➜ ${m.eleccion}</div>
        ${m.texto ? `<div class="texto" style="margin-top:4px">${m.texto}</div>` : ''}
        ${chipsEfectos(m.efectos)}
      </div>`);
    scrollAlFinal(); await pausa(700);
  } else if (m.tipo === 'muerte') {
    tl.insertAdjacentHTML('beforeend', `
      <div class="momento muerte">
        <div class="meta">${m.anio} · ${m.edad} años</div>
        <div class="texto">${m.texto}</div>
      </div>`);
    scrollAlFinal(); await pausa(1400);
  } else if (m.tipo === 'hito') {
    tl.insertAdjacentHTML('beforeend', `
      <div class="momento hito">
        <div class="meta">${meta}</div>
        <div class="texto">${m.texto}</div>
      </div>`);
    scrollAlFinal(); await pausa(900);
  }

  $('#hud-anio').textContent = m.anio;
  if (m.stats) pintarBarras(m.stats);
  pintarPerfil(nacimiento, m.estado);
  scrollAlFinal();
}

async function tiradaConPanel(m) {
  const panel = mostrarPanel(`
    <div class="accion-kicker">Tirada de d12</div>
    <h3>${m.titulo}</h3>
    ${m.intro ? `<p class="accion-intro">${m.intro}</p>` : ''}
    <div class="dado-zona accion-dado dado-wrap"></div>
    <div class="dado-cuenta"></div>
    <div class="resultado-texto"></div>
    <button class="boton chico" id="btn-tirar-dado">Tirar dado</button>`);
  const lanzar = panel.querySelector('#btn-tirar-dado');
  scrollAlFinal();
  if (!AUTO) await new Promise(resolve => { lanzar.onclick = resolve; });
  await animarDado(panel.querySelector('.dado-zona'), m.tirada.d);
  panel.querySelector('.dado-cuenta').innerHTML = cuentaHtml(m.tirada);
  const resTxt = panel.querySelector('.resultado-texto');
  if (m.tirada.crit === 12) { resTxt.textContent = '¡DOCE!'; resTxt.classList.add('crit'); }
  else if (m.tirada.crit === 1) { resTxt.textContent = 'Uno. Uf.'; resTxt.classList.add('pifia'); }
  else resTxt.textContent = m.tirada.exito ? '✓ Salió bien' : '✗ No salió';
  lanzar.textContent = 'Continuar ▸';
  if (AUTO) {
    await espera(1250);
  } else {
    await new Promise(resolve => { lanzar.onclick = resolve; });
  }
  ocultarPanel();
}

// ---------- DECISIONES ----------
export function pedirDecision(dec) {
  return new Promise(resolve => {
    const panel = mostrarPanel(`
      <div class="accion-kicker">Decisión · ${dec.edad} años</div>
      <h3>${dec.pregunta}</h3>
      <p class="accion-intro">${dec.contexto || ''}</p>
      <div class="opciones"></div>`);
    const cont = panel.querySelector('.opciones');
    cont.innerHTML = '';
    dec.opciones.slice(0, 2).forEach(op => {
      const btn = document.createElement('button');
      btn.className = 'opcion';
      btn.innerHTML = `<span class="texto-op">${op.texto}</span>`;
      btn.onclick = () => { ocultarPanel(); resolve(op); };
      cont.appendChild(btn);
    });
    scrollAlFinal();
  });
}

// ---------- FINAL ----------
export function pintarFinal(vida, seed, urlBase) {
  const n = vida.nacimiento;
  const v = vida.veredicto;
  const educ = { primaria: 'Primaria', secundaria: 'Secundaria completa', terciaria: 'Terciario', universitaria: 'Universidad' }[vida.educacion] || 'Primaria';
  const aniosTxt = vida.vivo
    ? `${n.anio} — sigue en juego (${ANIO_ACTUAL - n.anio} años)`
    : `${n.anio} — ${vida.anioMuerte} (${vida.edadMuerte} años)`;

  $('#final-contenido').innerHTML = `
    <div class="acta-final">
      <div class="veredicto">
        <div class="emoji">${v.emoji}</div>
        <h2>${v.titulo}</h2>
        <div class="texto-veredicto">${v.texto}</div>
      </div>
      <div class="puntaje"><span class="num">${vida.score}</span><span class="de"> / 120</span></div>
      <div class="vida-frase">${fraseNacimiento(n)}</div>
      <div class="anios-vida">${n.nombre} ${n.apellido} · ${aniosTxt}${vida.vivo ? '' : `<br><em>${vida.causaFinal}</em>`}</div>
      <div class="resumen-grid">
        <div class="resumen-item"><div class="campo">Educación</div><div class="valor">${educ}</div></div>
        <div class="resumen-item"><div class="campo">Laburo</div><div class="valor">${vida.laburo}</div></div>
        <div class="resumen-item"><div class="campo">Hijos</div><div class="valor">${vida.hijos}</div></div>
        <div class="resumen-item"><div class="campo">Crisis sobrevividas</div><div class="valor">${vida.crisisVividas}</div></div>
        <div class="resumen-item"><div class="campo">Mundiales vistos</div><div class="valor">${vida.mundialesVistos} (${vida.mundialesGanados} 🏆)</div></div>
        <div class="resumen-item"><div class="campo">Presidentes vividos</div><div class="valor">${vida.presidentesVividos}</div></div>
        <div class="resumen-item"><div class="campo">Cuadro</div><div class="valor">${n.cuadro} ⚽</div></div>
        ${vida.techoPropio ? '<div class="resumen-item"><div class="campo">Vivienda</div><div class="valor">Techo propio 🏠</div></div>' : ''}
        ${vida.exilio ? `<div class="resumen-item"><div class="campo">Emigró a</div><div class="valor">${vida.exilio} ✈️</div></div>` : ''}
      </div>
      <div class="barras" style="margin-top:16px">
        ${['plata', 'salud', 'felicidad'].map(k => `
          <div class="barra ${k}"><div class="etiqueta"><span>${{ plata: '💵 Plata', salud: '❤️ Salud', felicidad: '😄 Felicidad' }[k]}</span><b>${Math.round(vida.stats[k])}</b></div>
          <div class="pista"><div class="relleno" style="width:${Math.round(vida.stats[k])}%"></div></div></div>`).join('')}
      </div>
    </div>
    <div class="semilla">Vida N° <code>${semillaATexto(seed)}</code> — compartila y que otro la reviva.</div>`;

  mostrarPantalla('pantalla-final');
  return textoShare(vida, seed, urlBase);
}

export function textoShare(vida, seed, urlBase) {
  const n = vida.nacimiento;
  const g = n.genero === 'varon' ? 'varón' : 'mujer';
  const resumen = vida.vivo
    ? `Llegué a ${ANIO_ACTUAL} con ${vida.laburo}`
    : `Viví ${vida.edadMuerte} años`;
  const url = `${urlBase}?v=${semillaATexto(seed)}`;
  return SHARE_TPL
    .replaceAll('{genero}', g)
    .replaceAll('{lugar}', n.lugar)
    .replaceAll('{anio}', String(n.anio))
    .replaceAll('{clase}', FRASES_CLASE[n.clase])
    .replaceAll('{hermanos}', n.hermanos === 0 ? 'sin hermanos' : n.hermanos === 1 ? '1 hermano' : `${n.hermanos} hermanos`)
    .replaceAll('{resumen}', resumen)
    .replaceAll('{crisis}', String(vida.crisisVividas))
    .replaceAll('{score}', String(vida.score))
    .replaceAll('{veredicto}', `${vida.veredicto.emoji} ${vida.veredicto.share}`)
    .replaceAll('{url}', url);
}

export async function compartir(texto) {
  try {
    if (navigator.share) { await navigator.share({ text: texto }); return; }
  } catch { /* canceló: cae al portapapeles */ }
  try {
    await navigator.clipboard.writeText(texto);
    avisoCopiado();
  } catch {
    prompt('Copiá tu resultado:', texto);
  }
}

function avisoCopiado() {
  const el = $('#aviso-copiado');
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 1800);
}

export function setVelocidad(v) { VELOCIDAD = v; }
export function setAuto(v) { AUTO = v; VELOCIDAD = v ? 1.8 : 1; }
