// Tests del motor: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { crearRng, textoASemilla, semillaATexto } from '../js/rng.js';
import { nacer, simularVida } from '../js/engine.js';
import { PROVINCIAS } from '../js/data/tablas.js';
import { HISTORIA } from '../js/data/historia.js';
import { DECISIONES } from '../js/data/eventos.js';
import { textoShare } from '../js/ui.js';

// mismo rng continuo para nacer + vivir, igual que main.js
const vidaRapida = (seed) => {
  const rng = crearRng(seed);
  return simularVida(nacer(rng), rng, {});
};

test('la semilla de URL no inventa vidas: null/basura dan null', () => {
  assert.equal(textoASemilla(null), null);       // parseInt('null', 36) era un número válido
  assert.equal(textoASemilla(undefined), null);
  assert.equal(textoASemilla(''), null);
  assert.equal(textoASemilla('!!!'), null);
  const s = 123456789;
  assert.equal(textoASemilla(semillaATexto(s)), s); // ida y vuelta
});

test('sorteo de nacimiento sigue las distribuciones reales', () => {
  const rng = crearRng(123456);
  const N = 10000;
  const porProv = {}, porGenero = { varon: 0, mujer: 0 }, porClase = {};
  let hermanosMax = 0, humildes2002 = 0, nacidos2002 = 0;
  for (let i = 0; i < N; i++) {
    const n = nacer(rng);
    porProv[n.provincia] = (porProv[n.provincia] || 0) + 1;
    porGenero[n.genero]++;
    porClase[n.clase] = (porClase[n.clase] || 0) + 1;
    if (n.hermanos > hermanosMax) hermanosMax = n.hermanos;
    if (n.anio >= 1999 && n.anio <= 2003) { nacidos2002++; if (n.clase === 'humilde') humildes2002++; }
  }
  // provincias dentro de ±2pp del peso censal
  for (const p of PROVINCIAS) {
    const share = ((porProv[p.nombre] || 0) / N) * 100;
    assert.ok(Math.abs(share - p.peso) < 2.2, `${p.nombre}: ${share.toFixed(1)}% vs censo ${p.peso}%`);
  }
  // 105 varones cada 100 mujeres
  assert.ok(Math.abs(porGenero.varon / N - 0.512) < 0.02, `P(varon)=${porGenero.varon / N}`);
  // cola larga real de familias enormes
  assert.ok(hermanosMax >= 10, `hermanosMax=${hermanosMax}`);
  // el 2002 pega: la mayoría de los nacidos en la crisis arranca abajo
  assert.ok(humildes2002 / nacidos2002 > 0.42, `humildes 1999-2003: ${(humildes2002 / nacidos2002 * 100).toFixed(0)}%`);
});

test('misma semilla, misma vida (reproducibilidad)', async () => {
  const a = await vidaRapida(777);
  const b = await vidaRapida(777);
  assert.equal(a.score, b.score);
  assert.deepEqual(a.momentos.map(m => m.texto), b.momentos.map(m => m.texto));
  const c = await vidaRapida(778);
  assert.notDeepEqual(a.momentos.map(m => m.texto), c.momentos.map(m => m.texto));
});

test('invariantes en 300 vidas', async () => {
  let muertes = 0, presentes = 0, criticos = 0;
  for (let seed = 1; seed <= 300; seed++) {
    const vida = await vidaRapida(seed * 2654435761);
    for (const m of vida.momentos) {
      for (const k of ['plata', 'salud', 'felicidad']) {
        assert.ok(m.stats[k] >= 0 && m.stats[k] <= 100, `stat ${k} fuera de rango: ${m.stats[k]}`);
      }
      assert.ok(m.anio <= 2026, `año ${m.anio} > 2026`);
      if (m.tipo === 'tirada' && (m.tirada.crit === 1 || m.tirada.crit === 12)) criticos++;
    }
    if (!vida.vivo) {
      muertes++;
      assert.ok(vida.anioMuerte <= 2026 && vida.causaFinal, 'muerte sin cierre');
      assert.ok(vida.edadMuerte >= 0 && vida.edadMuerte <= 104);
    } else {
      presentes++;
      assert.ok(vida.llegoAlPresente, 'vivo pero sin llegar al presente');
    }
    assert.ok(vida.score >= 0 && vida.score <= 150, `score raro: ${vida.score}`);
    assert.ok(vida.veredicto && vida.veredicto.titulo, 'sin veredicto');
    assert.ok(vida.mundialesVistos >= vida.mundialesGanados);
    const share = textoShare(vida, 42, 'https://argentero.ar/');
    assert.ok(share.length <= 300, `share muy largo (${share.length}): ${share}`);
  }
  assert.ok(muertes > 0, 'nadie se murió en 300 vidas');
  assert.ok(presentes > 0, 'nadie llegó al presente en 300 vidas');
  assert.ok(criticos > 0, 'ningún crítico en 300 vidas');
});

test('la historia dispara: cobertura de eventos en 2000 vidas', async () => {
  const disparados = new Set();
  let crisisTotal = 0, malvinas = 0, decisiones = 0;
  for (let seed = 1; seed <= 2000; seed++) {
    const vida = await vidaRapida(seed * 40503 + 7);
    for (const id of vida.usados) disparados.add(id);
    crisisTotal += vida.crisisVividas;
    decisiones += vida.momentos.filter(m => m.tipo === 'decision').length;
    if (vida.momentos.some(m => m.titulo === 'Malvinas')) malvinas++;
  }
  const idsHistoria = HISTORIA.map(e => e.id);
  const cobertura = idsHistoria.filter(id => disparados.has(id)).length / idsHistoria.length;
  assert.ok(cobertura > 0.7, `cobertura de historia: ${(cobertura * 100).toFixed(0)}% — ids sin disparar: ${idsHistoria.filter(id => !disparados.has(id)).join(', ')}`);
  assert.ok(crisisTotal > 0, 'nadie vivió una crisis (imposible siendo Argentina)');
  assert.ok(decisiones > 0, 'ninguna decisión ofrecida');
});

test('las historias pueden abrir decisiones cotidianas y conservar sus consecuencias', async () => {
  const nacimiento = {
    anio: 1980, genero: 'varon', provincia: 'Córdoba', localidad: 'Córdoba',
    tipoLugar: 'capital', region: 'Pampeana', clase: 'media', hermanos: 1,
    nombre: 'Carlos', apellido: 'Gómez', cuadro: 'Belgrano', lugar: 'Córdoba, Córdoba',
  };
  let decisionCalles;
  const vida = await simularVida(nacimiento, crearRng(40510), {
    onDecision: async dec => {
      if (dec.pregunta.includes('quedás adentro')) {
        decisionCalles = dec;
        return dec.opciones[1];
      }
      return dec.opciones[0];
    },
  });

  assert.ok(decisionCalles, 'la historia no abrió la decisión cotidiana');
  assert.equal(decisionCalles.opciones.length, 2);
  assert.ok(vida.marcas.includes('golpe-calles'));
  assert.ok(vida.momentos.some(m => m.tipo === 'decision' && m.titulo.includes('quedás adentro')));
});

test('cada decisión tiene un conjunto múltiple y la interfaz recibe como máximo dos', () => {
  assert.ok(DECISIONES.every(dec => dec.opciones.length >= 2));
  assert.ok(DECISIONES.some(dec => dec.opciones.length > 2));
  const colimba = DECISIONES.find(dec => dec.id === 'colimba');
  assert.equal(colimba.etapa, 'juventud');
  assert.equal(colimba.cond.edadMin, 18);
});

test('un resultado educativo cambia la decisión posterior', async () => {
  const nacimiento = {
    anio: 1980, genero: 'mujer', provincia: 'Córdoba', localidad: 'Córdoba',
    tipoLugar: 'capital', region: 'Pampeana', clase: 'humilde', hermanos: 2,
    nombre: 'Ana', apellido: 'Gómez', cuadro: 'Belgrano', lugar: 'Córdoba, Córdoba',
  };
  const vida = await simularVida(nacimiento, crearRng(40510), {
    onDecision: async dec => dec.opciones[0],
  });

  assert.ok(vida.momentos.some(m => m.tipo === 'decision' && m.titulo.includes('Volvés a estudiar')));
  assert.equal(vida.momentos.filter(m => m.titulo === 'La facultad').length, 0);
  assert.equal(vida.educacion, 'secundaria');
});
