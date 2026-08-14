# Product Brief: Argentero — Simulador de nacer argentino

**Date:** 2026-08-14
**Author:** gaz (asistido por Claude)
**Status:** completed

## Overview

### Problem Statement

Los juegos virales argentinos del momento (el "Simulador de carrera" de copero.com.ar, BitLife, The Birth Lottery) demuestran que hay un apetito enorme por experiencias cortas, gratuitas, sin registro, con resultado compartible. No existe todavía un "simulador de nacer argentino": un juego donde no elegís nada, te toca — año, lugar, clase social, género, hermanos — y después vivís una vida gobernada por estadística real de censos y un dado de 12 caras. La idea original (de un amigo): *"Naciste mujer en Calingasta en una familia de bajos recursos con 10 hermanos en 1994. A ver si le ganás a nacer argentino."*

### Goal

Construir un MVP jugable de **Argentero**: un juego web estático, en español rioplatense, donde el jugador "nace" con atributos sorteados según estadística real argentina, atraviesa las etapas de la vida (y la historia del país que le tocó) tirando un d12 visible, toma 3-5 decisiones, y termina con una tarjeta de resultado compartible que responde: **¿le ganaste a nacer argentino?**

### Success Criteria

- Una partida completa dura menos de 3 minutos.
- Cada vida es distinta y estadísticamente verosímil (pesos derivados de INDEC/UCA/datos históricos).
- El resultado final es una tarjeta que da ganas de screenshotear + un texto con emojis para copiar y pegar (formato Wordle).
- Corre como sitio estático (abrir `index.html` alcanza), sin backend, sin cuenta, sin descarga.
- Todo el texto en es-AR con voseo.

---

## Target User

### Primary Users

Argentinos (y diáspora) de 16-45 años que comparten juegos/memes en X, WhatsApp e Instagram. Llegan por un link compartido, juegan una vez en el celular, comparten el resultado, juegan dos o tres veces más ("nacé de nuevo").

### User Personas

- **El que comparte**: juega una vez, le toca una vida absurda (nat 1 o nat 12), screenshotea y la manda al grupo.
- **El re-rolleador**: juega 5+ veces buscando "ganarle" al juego (nacer en 2003 clase alta en Recoleta, o sobrevivir a 1994 en Calingasta).
- **El nostálgico**: le interesa ver qué eventos históricos le tocan según el año (Malvinas, la hiper, el corralito, el Mundial que le tocó ver).

---

## Requirements

### Must Have (P0)

1. **Sorteo de nacimiento** con dados visibles: año (1930-2005), lugar (provincia + localidad, ponderado por población histórica), género, clase social (ponderada por época), cantidad de hermanos (ponderada por época y clase). Presentado como **Partida de Nacimiento**.
2. **Motor de vida por etapas** (infancia → niñez → adolescencia → juventud → adultez → madurez → vejez): en cada etapa, chequeos con un **d12 visible y animado** con modificadores explícitos (+2 clase alta, −2 interior profundo, etc.) contra umbrales derivados de estadística real (mortalidad infantil por época, terminalidad educativa por clase, informalidad laboral, etc.).
3. **Eventos históricos reales** según el año que atraviesa la vida (golpes, dictadura, Malvinas, hiper del 89, corralito 2001, 2018, pandemia, inflación 2023...) con efecto mecánico sobre las barras.
4. **Barras de estado** estilo BitLife: **Plata, Salud, Felicidad** (0-100), afectadas por tiradas, eventos y decisiones.
5. **3-5 decisiones por vida** con 2-3 opciones tipo tarjeta (¿te vas del país?, ¿UBA o laburo?, ¿dólar o plazo fijo?), con consecuencia mecánica visible.
6. **Muerte / final** por chequeos de mortalidad o vejez; tarjeta final compartible: resumen de la vida, puntaje ("puntaje de vida"), veredicto (¿le ganaste a nacer argentino?), botón **Compartir** (Web Share API / copiar texto con emojis) y **Nacer de nuevo**.
7. **Español rioplatense** en todo el juego (voseo, tono irónico pero no cruel: el chiste es contra la circunstancia y el Estado, nunca contra el pobre).
8. **Mobile-first**, sitio estático sin build (HTML+CSS+JS vanilla).

### Should Have (P1)

1. Timeline visual de la vida que se va llenando fila por fila (patrón copero).
2. Semilla compartible en la URL (`?v=SEMILLA`) para revivir exactamente la misma vida.
3. Resultados especiales para tiradas extremas (nat 1 / nat 12) — los momentos screenshoteables.
4. Contador de "crisis sobrevividas" y "Mundiales vistos (y ganados)" en la tarjeta final.

### Nice to Have (P2)

1. Estadísticas locales (localStorage): vidas jugadas, mejor puntaje.
2. Modo "Exprés" vs "Normal" (densidad de decisiones, patrón copero).
3. Galería de finales/logros ("Ribbons" de BitLife).

---

## Constraints

### Technical Constraints

- Sitio 100% estático, vanilla HTML/CSS/JS, sin dependencias ni build step. Deployable en GitHub Pages/Netlify tal cual.
- Sin backend, sin analytics, sin cuentas.
- Debe funcionar bien en un celular de gama baja (el público es masivo).

### Business Constraints

- MVP en una sesión de trabajo. Contenido acotado pero con densidad suficiente para 5+ vidas sin repetir sensación.

### Non-Negotiable Requirements

- Todo en español (es-AR). El dado es **de 12 caras** y **se ve**. Los atributos de nacimiento **no se eligen**: se sortean con pesos estadísticos reales.

---

## Out of Scope

- Multijugador, rankings online, cuentas de usuario.
- Simulación económica seria (es sátira con base estadística, no un paper).
- Monetización, ads.
- Otros países ("Chilero", "Uruguayero") — el motor podría permitirlo, pero no en el MVP.
- Generación de imagen para compartir (canvas → PNG): P2, el MVP comparte texto.

---

## Success Metrics

### Key Performance Indicators (KPIs)

- **Duración de partida:** < 3 min — medido jugando.
- **Rejugabilidad:** ≥ 5 vidas seguidas sin repetir eventos clave — medido jugando.
- **Compartibilidad:** el texto compartido entra en un tweet/mensaje de WhatsApp (< 280 chars).

### User Metrics

- **Comprensión inmediata:** cualquier persona entiende qué hacer sin instrucciones (un solo botón por pantalla).

---

## Business Context

La ventana cultural es ahora: el simulador de carrera de copero fue viral en Argentina (julio 2026, cobertura de Minuto Uno, Canal 26, Bolavip). El formato "lotería de nacimiento" (Birth Lottery de Giving What We Can) probó que cuantificar la suerte de nacer engancha. Nadie ocupó todavía el nicho "nacer argentino". Next step: `/spec` → `docs/specs/argentero.md`.
