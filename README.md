# ARGENTERO 🎲🇦🇷

**¿Le ganás a nacer argentino?**

Un simulador de nacer argentino: no elegís nada — te toca. Año, lugar, género, clase social, hermanos (y cuadro). Después, la vida: estadística real de censos y un buen dado de 12 caras contra un siglo de historia argentina.

> *"Naciste mujer en Calingasta, San Juan, en 1994, en una familia de bajos recursos, con 10 hermanos."*

Inspirado en el [simulador de carrera de copero.com.ar](https://copero.com.ar/juegos/simulador-carrera), BitLife y The Birth Lottery.

## Jugar local

```bash
python3 -m http.server 8000
```

y abrí <http://localhost:8000>. Es un sitio 100% estático (vanilla JS, sin build, sin dependencias): cualquier server estático sirve, y se puede deployar tal cual en GitHub Pages o Netlify.

## Cómo funciona

- **Sorteo de nacimiento** ponderado por datos reales: población por provincia (Censo 2022), pobreza por época (Argendata/CEPED: 1974 ~6% → 2002 >65%), fecundidad (RENAPER), nombres populares por década.
- **Vida por etapas** (infancia → vejez): cada etapa tira un **d12 visible** con modificadores explícitos (+3 clase acomodada, −1 interior…) contra dificultades derivadas de estadística real (terminalidad educativa por clase, informalidad laboral, vivienda propia, mortalidad por época).
- **La historia te pasa por encima**: golpes, dictadura (tono sobrio), Malvinas (sobrio), hiper del 89, corralito, 2001, pandemia, 211% de inflación… y los Mundiales, que a veces salvan el año.
- **Semilla compartible**: la URL `?v=SEMILLA` reproduce exactamente la misma vida.
- **Resultado compartible**: puntaje sobre 120 y veredicto (*Le ganaste / Empataste con dignidad / Perdiste por penales / Te pasó por encima*).

## Tests

```bash
node --test tests/
```

Verifican distribución del sorteo contra el censo, reproducibilidad por semilla, invariantes del motor y cobertura de eventos históricos.

## Estructura

```
index.html          # shell de las 4 pantallas
css/style.css       # dark, mobile-first
js/engine.js        # motor puro (sin DOM)
js/rng.js           # xorshift32 sembrado
js/ui.js            # render + ritmo + share
js/data/tablas.js   # estadística real (con fuentes)
js/data/historia.js # eventos históricos 1930-2026
js/data/eventos.js  # tiradas de etapa + decisiones
js/data/textos.js   # nombres, localidades, veredictos, microcopy
docs/               # brief y spec (flujo g2i-ai/agents)
```

## Fuentes

INDEC (Censo 2022, EPH), DEIS (mortalidad infantil), Grushka — *Casi un siglo y medio de mortalidad en la Argentina* (esperanza de vida), RENAPER (fecundidad y nombres), Argendata/Fundar y CEPED-UBA (pobreza), Argentinos por la Educación y UCA (educación por ingreso), Kantar (hinchadas).

Sátira: cualquier parecido con tu vida es pura estadística.
