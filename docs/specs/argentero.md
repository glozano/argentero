# Technical Specification: Argentero — Simulador de nacer argentino

**Date:** 2026-08-14
**Author:** gaz (asistido por Claude)
**Product Brief:** `docs/briefs/argentero.md`

## Overview

### Purpose

Definir la arquitectura, el modelo de datos y las mecánicas del MVP de Argentero: un juego web estático donde el jugador "nace" argentino con atributos sorteados por estadística real y vive una vida por etapas gobernada por un d12 visible.

### Scope

Incluye: motor de simulación, tablas de datos estadísticos, banco de contenido en es-AR, UI mobile-first, compartir resultado, semilla reproducible. Excluye: backend, cuentas, imagen PNG generada, otros países.

### References

- Product Brief: `docs/briefs/argentero.md`
- Referencia principal de UX: copero.com.ar/juegos/simulador-carrera (jugado y documentado)
- Datos: INDEC Censo 2022, Argendata/CEPED (pobreza), DEIS (mortalidad infantil), Grushka (esperanza de vida), RENAPER (fecundidad), Argentinos por la Educación / UCA (educación por ingreso).

---

## Architecture

### System Architecture

SPA estática, vanilla ES modules, sin build ni dependencias. Se sirve con cualquier servidor estático (`python3 -m http.server`) o file://-compatible via un solo bundle. Deploy: GitHub Pages/Netlify.

```
index.html            — shell, 4 pantallas (portada, nacimiento, vida, final)
css/style.css         — dark theme copero-style, mobile-first
js/main.js            — bootstrap, estado global, navegación de pantallas
js/rng.js             — xorshift32 con semilla; encode/decode base36 para ?v=
js/engine.js          — motor: sorteo de nacimiento, loop de etapas, chequeos d12, score
js/ui.js              — render DOM: dado animado, partida de nacimiento, timeline, tarjeta final, share
js/data/tablas.js     — tablas estadísticas (provincias, épocas, clases, fecundidad, mortalidad, educación)
js/data/historia.js   — eventos históricos 1930-2026 con condiciones y efectos
js/data/eventos.js    — banco de eventos de etapa + decisiones
js/data/textos.js     — nombres por década, localidades flavor, veredictos, textos UI y share
```

### Architectural Approach

Monolito estático client-side. **Rationale:** viralidad exige cero fricción (sin descarga, sin cuenta, carga < 1s); el estado de una vida entra en memoria; la reproducibilidad se logra con RNG sembrado, no con servidor.

### Component Overview

- **rng.js:** xorshift32. TODA aleatoriedad pasa por acá → misma semilla, misma vida. API: `mulRng(seed)`, `rng.d12()`, `rng.pick(arr)`, `rng.weighted(pairs)`, `rng.chance(p)`.
- **engine.js:** puro (sin DOM). `nacer(rng)` → `Nacimiento`; `simularVida(nacimiento, rng, decisiones)` corre por etapas y emite `Momento[]` (log). Las decisiones se resuelven con callbacks async para que la UI pause.
- **ui.js:** consume los `Momento[]` y los renderiza con animación de dado y timeline que se llena fila a fila (patrón copero).

---

## Data Model

### Entities

```js
Nacimiento = {
  anio: 1930..2005,          // ponderado por cohortes vivas: 30s-40s 15%, 50s-60s 20%, 70s-80s 30%, 90s-05 35%
  genero: 'varon'|'mujer',   // P(varon)=0.512 (105:100 real)
  provincia, localidad,      // provincia ponderada por share censal; localidad: capital|conurbano|pueblo
  region: 'CABA'|'GBA'|'Pampeana'|'Cuyo'|'NOA'|'NEA'|'Patagonia',
  clase: 'humilde'|'trabajadora'|'media'|'acomodada',  // pesos por época (ver tabla)
  hermanos: 0..12,           // TGF(época) + mods clase/rural, cola larga real
  nombre,                    // popular de la década + género
}

Vida = {
  nacimiento, stats: {plata, salud, felicidad},  // 0..100
  educacion, laburo, hijos, pareja,
  crisisVividas, mundialesVistos, mundialesGanados, presidentesVividos,
  vivo, anioMuerte|null, causaFinal, exilio|null,
  momentos: Momento[],       // log completo
  tiradas: Tirada[],         // cada d12 con mods y resultado
  score, veredicto,
}

Momento = { etapa, anio, edad, tipo: 'historia'|'tirada'|'decision'|'hito'|'muerte', texto, efectos: {plata?, salud?, felicidad?} }

EventoHistorico = { id, desde, hasta, cond: {edadMin?, edadMax?, genero?, regiones?, clases?, anioNacMin?, anioNacMax?}, prob?, texto(ctx), efectos, tono: 'sobrio'|'ironico' }

EventoEtapa = { id, etapas: [], cond, peso, tirada?: {dc, mods, exito, fallo, crit1, crit12}, decision?: {pregunta, opciones: [{texto, efectos, resultado(ctx)}]} }
```

### Tablas estadísticas (fuente → mecánica)

| Tabla | Fuente real | Uso en el juego |
|---|---|---|
| Peso por provincia | Censo 2022 (BA 38.2%, Cba 8.4%, SF 7.7%, CABA 6.8%...) | sorteo de lugar |
| Clase por época | Argendata/CEPED: pobreza 1974 ~6% → 2002 >65% → 2024 ~38% | pesos de clase al nacer, por banda de años |
| Mortalidad infantil | DEIS: 1930s ~10% → 1970 6.1% → 1990 2.6% → 2023 0.8%; ×1.5-2 NOA/NEA | chequeo de supervivencia en Infancia |
| Esperanza de vida | Grushka: 1947 H59/M64 → 2023 H74.5/M80.3 | DC de chequeos de mortalidad por etapa |
| Educación por clase | ApE 2024: secundario Q1 59.6% vs Q5 92%; universidad pobres ~12% | DC de tiradas de educación |
| Fecundidad | RENAPER: TGF 1970 3.1 → 2023 1.36; +1 NOA/NEA/clase baja | hermanos e hijos propios |
| Informalidad | 1974 38% → 2023 52% | tiradas de laburo |
| Vivienda propia | 2010 73% → 2022 65.5% | tirada "el techo propio" |

Los números viven en `js/data/tablas.js` con comentario de fuente. Precisión objetivo: orden de magnitud correcto y dirección correcta de todos los gradientes (época, clase, región, género); no es un modelo demográfico serio.

---

## Motor de juego

### El d12

- Chequeo estándar: `d12 + mods vs DC`. Mods visibles y explicados (ej: `+2 clase acomodada`, `−1 interior profundo`, `+1 buena salud`).
- **Natural 1**: pifia crítica — texto especial dramático. **Natural 12**: crítico — texto especial glorioso. Son los momentos screenshoteables; nunca se reducen a "fallaste/pasaste".
- La UI SIEMPRE muestra el dado girando, el número, y la cuenta (9 + 2 − 1 = 10 vs DC 8 ✓).

### Etapas

| Etapa | Edad | Chequeos |
|---|---|---|
| Infancia | 0-5 | supervivencia (mortalidad infantil por época/región/clase) |
| Niñez | 6-11 | primaria; evento de etapa |
| Adolescencia | 12-17 | secundaria (DC por clase/época); decisión estudiar/laburar; colimba (varón, <1994) |
| Juventud | 18-29 | universidad/oficio, laburo (informalidad), pareja; decisión migrar (si crisis); Malvinas (varón 1962-63) |
| Adultez | 30-44 | vivienda propia, hijos, laburo II; decisión ahorros (dólar/plazo fijo/ladrillo) |
| Madurez | 45-59 | chequeo salud, laburo III / jubilación en negro |
| Vejez | 60+ | jubilación (ANSES), chequeos de mortalidad cada etapa hasta morir |

- El reloj avanza año a año dentro de cada etapa disparando `EventoHistorico` que correspondan (condición año calendario + edad + género + región + clase).
- Si el año llega a **2026** con el personaje vivo → final "CONTINUARÁ" (vida hasta hoy).
- Muerte: salud ≤ 0 o falla chequeo de mortalidad → pantalla final con edad y causa.

### Historia real (eventos clave, tono)

Golpes (1930/43/55/62/66/76), Peronismo 46-55, Rodrigazo 75, dictadura 76-83 (**tono sobrio**), Malvinas 82 (**sobrio**; conscriptos varones nacidos 1962-63: chequeo), retorno democracia 83, hiper 89 (CPI +3079%), convertibilidad, corralito 2001 (si Plata>50: te confiscan), 2002 pobreza >65%, boom 2003-11, cepo 2011, crisis 2018, pandemia 2020, inflación 2023 211%, motosierra 2024. Mundiales: vistos desde los 4 años; ganados 78/86/2022 (+felicidad masiva, "por un rato te olvidaste de todo"). Voto femenino 1947 (mujer ≥18). Colimba hasta 1994.

**Regla de tono:** la sátira apunta a la macroeconomía y al Estado (inflación, corralito, trámites). Dictadura, Malvinas y muerte infantil se narran sobrios, sin chistes. El chiste nunca es contra la víctima.

### Score y veredicto

`score = añosVividos×0.5 (cap 40) + (plata+salud+felicidad)/10 + educación (0-15) + hitos (techo propio +5, jubilación +5, hijos +2 c/u cap 6, Mundial ganado visto +3 c/u) + sobrevivir crisis +1 c/u — muerte temprana penaliza sola (menos años)`. Rango práctico 0-120.

| Score | Veredicto |
|---|---|
| ≥ 90 | **LE GANASTE A NACER ARGENTINO** 🏆 |
| 65-89 | Le empataste con dignidad 🤝 |
| 40-64 | Perdiste por penales 😔 |
| < 40 | Te pasó la Argentina por encima 🚜 |

### Share

Texto ≤ 280 chars vía `navigator.share` con fallback clipboard:
`🇦🇷 ARGENTERO 🎲 Nací mujer en Calingasta (San Juan) en 1994, familia humilde, 10 hermanos. Sobreviví 3 crisis, vi 1 Mundial ganado. Llegué a 2026 con laburo en negro. Puntaje 58/120: perdí por penales. ¿Le ganás vos a nacer argentino? → URL?v=SEMILLA`

---

## API Design

N/A (sin backend). Contrato interno: `engine.js` expone `nacer(rng)`, `simularVida(nac, rng, onDecision, onMomento)`; `ui.js` no contiene lógica de juego; `data/*.js` no contienen lógica.

### Authentication & Authorization

N/A.

---

## Testing Plan

- **Motor (node --test, sin DOM):** distribución del sorteo (10k nacimientos: shares de provincia ±2pp de la tabla; P(varon)≈0.512; hermanos con cola hasta ≥10 en humilde-rural pre-1990; clase 2002 sesgada a humilde), reproducibilidad (misma semilla → misma vida), invariantes (stats 0-100 clampeados, muerte termina la vida, año nunca pasa 2026, score en rango, share < 280 chars), cobertura de eventos (cada evento histórico dispara para al menos una cohorte simulada).
- **Manual/browser:** 10+ vidas jugadas en preview; mobile 375px; nat-1/nat-12 visibles; share copia texto.

---

## Rollout

Repo estático listo para GitHub Pages. `README.md` con cómo correr local (`python3 -m http.server`) y deploy. Sin flags, sin telemetría.
