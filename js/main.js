// Bootstrap: pantallas, semilla en URL, y el hilo de una vida.
import { crearRng, semillaAleatoria, textoASemilla } from './rng.js';
import { nacer, simularVida } from './engine.js';
import * as ui from './ui.js';
import { UI } from './data/textos.js';

const $ = (sel) => document.querySelector(sel);
const urlBase = location.protocol === 'file:'
  ? 'https://argentero.ar' // placeholder hasta el deploy
  : location.origin + location.pathname.replace(/index\.html$/, '');

let corriendo = false;
let colaRender = Promise.resolve();

function encolar(fn) {
  colaRender = colaRender.then(fn).catch(err => console.error('render:', err));
}

async function jugar(seed) {
  if (corriendo) return;
  corriendo = true;
  const rng = crearRng(seed);
  const rngVisual = crearRng(seed ^ 0xdeadbeef); // dados decorativos del nacimiento

  const nacimiento = nacer(rng);
  await ui.animarNacimiento(nacimiento, rngVisual);
  await new Promise(resolve => { $('#btn-vivir').onclick = resolve; });

  ui.mostrarPantalla('pantalla-vida');
  $('#timeline').innerHTML = '';
  ui.pintarHudInicial(nacimiento);
  colaRender = Promise.resolve();

  const vida = await simularVida(nacimiento, rng, {
    onEtapa: async (info) => encolar(() => ui.marcarEtapa(info)),
    onMomento: (m) => encolar(() => ui.renderMomento(m, nacimiento)),
    onDecision: async (dec) => {
      await colaRender; // que termine de dibujarse todo lo anterior
      return ui.pedirDecision(dec);
    },
  });
  await colaRender;

  const share = ui.pintarFinal(vida, seed, urlBase);
  $('#btn-compartir').onclick = () => ui.compartir(share);
  $('#btn-denuevo').onclick = () => { location.href = location.pathname; };
  history.replaceState(null, '', `?v=${(seed >>> 0).toString(36).toUpperCase()}`);
  corriendo = false;
}

function init() {
  $('#portada-titulo').textContent = UI.portada.titulo;
  $('#portada-bajada').textContent = UI.portada.bajada;
  $('#portada-explicacion').textContent = UI.portada.explicacion;
  $('#btn-nacer').textContent = UI.portada.boton;
  $('#portada-disclaimer').textContent = `${UI.disclaimers.fuentes} ${UI.disclaimers.satira}`;

  const semillaUrl = textoASemilla(new URLSearchParams(location.search).get('v'));
  $('#btn-nacer').onclick = () => jugar(semillaUrl || semillaAleatoria());

  $('#btn-velocidad').onclick = () => {
    const rapido = ui.VELOCIDAD === 1;
    ui.setVelocidad(rapido ? 2.4 : 1);
    $('#btn-velocidad').textContent = rapido ? '▶ normal' : '⏩ rápido';
  };
}

init();
