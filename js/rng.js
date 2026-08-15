// RNG sembrado (xorshift32). Toda la aleatoriedad del juego pasa por acá:
// misma semilla => misma vida (URL ?v=SEMILLA).

// Mezcla la semilla (finalizador murmur3) antes de arrancar xorshift: sin esto,
// la primera salida es casi lineal en la semilla y semillas vecinas
// (AAAA/AAAB, DANI1/DANI2) daban el mismo año de nacimiento.
function mezclar(x) {
  x = x >>> 0;
  x ^= x >>> 16; x = Math.imul(x, 0x85ebca6b) >>> 0;
  x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35) >>> 0;
  x ^= x >>> 16;
  return x >>> 0;
}

export function crearRng(seed) {
  let s = mezclar(seed);
  if (s === 0) s = 0x9e3779b9;
  const next = () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 0x100000000;
  };
  return {
    semilla: seed >>> 0,
    random: next,
    d12: () => 1 + Math.floor(next() * 12),
    entre: (a, b) => a + Math.floor(next() * (b - a + 1)), // inclusivo
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    weighted(pairs) { // [[valor, peso], ...]
      let total = 0;
      for (const [, w] of pairs) total += w;
      let r = next() * total;
      for (const [v, w] of pairs) { r -= w; if (r <= 0) return v; }
      return pairs[pairs.length - 1][0];
    },
  };
}

export function semillaAleatoria() {
  if (globalThis.crypto && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] || 1;
  }
  return (Math.floor(Math.random() * 0xffffffff)) || 1;
}

export function semillaATexto(seed) { return (seed >>> 0).toString(36).toUpperCase(); }

export function textoASemilla(txt) {
  if (!txt || typeof txt !== 'string') return null; // ojo: parseInt('null', 36) es un número válido
  const n = parseInt(txt.toLowerCase(), 36);
  return Number.isFinite(n) && n > 0 ? (n >>> 0) : null;
}
