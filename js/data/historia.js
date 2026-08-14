// js/data/historia.js — Eventos históricos argentinos 1930-2026
// Formato: EventoHistorico (ver docs/specs/argentero.md). Objetos planos, sin funciones.
// cond: null = sin restricción. Regla de tono: dictadura 76-83, Malvinas y tragedias
// con muertos van SIEMPRE en tono 'sobrio', sin chistes. La sátira apunta a la macro
// y al Estado, nunca a la víctima. Fuentes: INDEC, DEIS, cifras oficiales de época.

export const HISTORIA = [

  // ——— 1930-1945: golpes fundacionales y década infame ———
  {
    id: 'golpe-1930', desde: 1930, hasta: 1930,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Llegás al mundo el mismo año en que Uriburu voltea a Yrigoyen e inaugura la costumbre argentina del golpe de Estado. Empezás con handicap, {nombre}.',
    efectos: { plata: 0, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'decada-infame', desde: 1931, hasta: 1942,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Crecés en la Década Infame: fraude "patriótico" en las urnas y el pacto Roca-Runciman regalando la vaca a Inglaterra. Acá el que gana no siempre es el que ganó.',
    efectos: { plata: -5, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'golpe-1943', desde: 1943, hasta: 1943,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Junio de 1943: los coroneles del GOU voltean a Castillo. Entre ellos anda un tal Perón; anotá el apellido, que lo vas a escuchar el resto de tu vida.',
    efectos: { plata: 0, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'terremoto-san-juan-1944', desde: 1944, hasta: 1944,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: ['Cuyo'], clases: null, plataMin: null },
    prob: 0.5, unaVez: true,
    texto: '15 de enero de 1944: un terremoto arrasa San Juan en menos de un minuto. Diez mil muertos, la ciudad en escombros; tu familia duerme semanas bajo la lona.',
    efectos: { plata: -15, salud: -10, felicidad: -15 },
    tono: 'sobrio'
  },

  // ——— 1946-1955: peronismo ———
  {
    id: 'peron-derechos', desde: 1946, hasta: 1954,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: ['humilde', 'trabajadora'], plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Aguinaldo, vacaciones pagas, sindicato: por primera vez en tu casa sobra algo a fin de mes. "Braden o Perón", decía el cartel, y en tu barrio nadie dudó.',
    efectos: { plata: 15, salud: 5, felicidad: 15 },
    tono: 'ironico'
  },
  {
    id: 'colimba', desde: 1948, hasta: 1994,
    cond: { edadMin: 18, edadMax: 18, genero: 'varon', regiones: null, clases: null, plataMin: null },
    prob: 0.5, unaVez: true,
    texto: 'Sorteo de la colimba: número alto, marchás. Un año pelando papas, baldeando el cuartel y contestando "sí, mi cabo" con cara de nada.',
    efectos: { plata: -5, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },
  {
    id: 'voto-femenino', desde: 1951, hasta: 1951,
    cond: { edadMin: 18, edadMax: null, genero: 'mujer', regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Noviembre de 1951: por primera vez las mujeres votan en la Argentina, y ahí estás vos, libreta cívica flamante en la mano. Ese derecho no se devuelve nunca más.',
    efectos: { plata: 0, salud: 0, felicidad: 10 },
    tono: 'sobrio'
  },
  {
    id: 'golpe-1955', desde: 1955, hasta: 1955,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Septiembre de 1955: la autoproclamada Libertadora derroca a Perón y un decreto prohíbe hasta nombrarlo. En los diarios dice "el tirano depuesto"; en muchas cocinas se dice bajito.',
    efectos: { plata: 0, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },

  // ——— 1962-1975: la calesita de golpes y el retorno ———
  {
    id: 'golpe-1962', desde: 1962, hasta: 1962,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Marzo de 1962: los militares deponen a Frondizi y lo mandan preso a la isla Martín García. Azules y colorados se tirotean entre sí para decidir quién te gobierna sin votos.',
    efectos: { plata: 0, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'golpe-1966', desde: 1966, hasta: 1966,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Junio de 1966: Onganía saca a Illia y promete quedarse diez años. Un mes después, la Noche de los Bastones Largos: la ciencia argentina sale a los sopapos rumbo al aeropuerto.',
    efectos: { plata: 0, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'cordobazo', desde: 1969, hasta: 1969,
    cond: { edadMin: 12, edadMax: null, genero: null, regiones: ['Pampeana'], clases: null, plataMin: null },
    prob: 0.7, unaVez: true,
    texto: 'Mayo de 1969, el Cordobazo: obreros y estudiantes toman las calles de Córdoba y a la dictadura de Onganía se le mueve el piso. Algo se encendió y no se apaga más.',
    efectos: { plata: 0, salud: 0, felicidad: 5 },
    tono: 'sobrio'
  },
  {
    id: 'peron-vuelve', desde: 1973, hasta: 1973,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Junio de 1973: Perón vuelve al país tras 18 años proscripto. Millones lo esperan en Ezeiza; el día se rompe a tiros entre los propios y la fiesta queda manchada.',
    efectos: { plata: 0, salud: 0, felicidad: 5 },
    tono: 'sobrio'
  },
  {
    id: 'muerte-peron', desde: 1974, hasta: 1974,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: '1º de julio de 1974: muere Perón. La fila para despedirlo aguanta horas bajo la llovizna. Lo hayas querido o no, el país entra en una zona oscura.',
    efectos: { plata: 0, salud: 0, felicidad: -10 },
    tono: 'sobrio'
  },
  {
    id: 'rodrigazo', desde: 1975, hasta: 1975,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Junio de 1975, el Rodrigazo: devaluación de más del 100%, tarifas por las nubes y la inflación anual clavada en 182%. El sueldo del mes se muere antes que el mes.',
    efectos: { plata: -20, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },

  // ——— 1976-1983: dictadura y Malvinas (tono sobrio, sin excepciones) ———
  {
    id: 'golpe-1976', desde: 1976, hasta: 1976,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Madrugada del 24 de marzo de 1976: comunicado Nº 1, las Fuerzas Armadas toman el poder. Empieza la etapa más oscura de la historia argentina.',
    efectos: { plata: 0, salud: 0, felicidad: -15 },
    tono: 'sobrio'
  },
  {
    id: 'anios-de-plomo', desde: 1976, hasta: 1982,
    cond: { edadMin: 16, edadMax: 30, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Años de plomo: vivís con un miedo de fondo que nadie nombra en voz alta. Hay compañeros que un día ya no están, otros que arman una valija de apuro rumbo al exilio, y vos aprendés a no preguntar.',
    efectos: { plata: 0, salud: -5, felicidad: -20 },
    tono: 'sobrio'
  },
  {
    id: 'mundial-1978', desde: 1978, hasta: 1978,
    cond: { edadMin: 4, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Junio de 1978: Argentina campeón del mundo por primera vez. La alegría es real y la abrazás; el silencio que hay detrás, a pocas cuadras del estadio, también es real.',
    efectos: { plata: 0, salud: 0, felicidad: 10 },
    tono: 'sobrio'
  },
  {
    id: 'malvinas', desde: 1982, hasta: 1982,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Abril de 1982: Malvinas. La plaza se llena y la tele asegura que estamos ganando; en junio llegan la rendición y las listas con nombres. 649 argentinos no vuelven.',
    efectos: { plata: 0, salud: 0, felicidad: -15 },
    tono: 'sobrio'
  },
  {
    id: 'malvinas-conscripto', desde: 1982, hasta: 1982,
    cond: { edadMin: null, edadMax: null, genero: 'varon', regiones: null, clases: null, plataMin: null, anioNacMin: 1962, anioNacMax: 1963 },
    prob: 0.35, unaVez: true,
    texto: 'La colimba te alcanzó y el destino redobló: te embarcan a Malvinas. Frío, hambre y bombardeos durante 74 días; lo que viste allá no se lo vas a poder contar entero a nadie.',
    efectos: { plata: 0, salud: -25, felicidad: -30 },
    tono: 'sobrio'
  },

  // ——— 1983-1990: democracia, primavera, hiper ———
  {
    id: 'democracia-1983', desde: 1983, hasta: 1983,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: '10 de diciembre de 1983: asume Alfonsín y vuelve la democracia. La plaza llena otra vez, ahora de alegría; por primera vez en mucho tiempo la palabra "futuro" se puede usar.',
    efectos: { plata: 0, salud: 0, felicidad: 20 },
    tono: 'sobrio'
  },
  {
    id: 'plan-austral', desde: 1985, hasta: 1985,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Junio de 1985, Plan Austral: moneda nueva, tres ceros menos y la inflación frenada en seco. Mientras dura, la primavera democrática se baila; lo de durar, acá, es siempre optativo.',
    efectos: { plata: 5, salud: 0, felicidad: 10 },
    tono: 'ironico'
  },
  {
    id: 'mundial-1986', desde: 1986, hasta: 1986,
    cond: { edadMin: 4, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'México 86: la mano de Dios y el mejor gol de la historia en la misma tarde, contra Inglaterra. Maradona levanta la Copa y vos flotás a diez centímetros del piso una semana entera.',
    efectos: { plata: 0, salud: 0, felicidad: 25 },
    tono: 'ironico'
  },
  {
    id: 'hiper-1989', desde: 1989, hasta: 1990,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: ['humilde', 'trabajadora', 'media'], plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Hiperinflación: 3079% en el año. Los precios cambian entre la góndola y la caja, el sueldo se evapora en una tarde y en los barrios empiezan los saqueos.',
    efectos: { plata: -30, salud: -5, felicidad: -20 },
    tono: 'ironico'
  },
  {
    id: 'hiper-1989-acomodada', desde: 1989, hasta: 1990,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: ['acomodada'], plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Hiperinflación: 3079%. Tus ahorros ya dormían en dólares, así que el incendio lo mirás por TV; igual el país se te desarma alrededor y el susto no te lo saca nadie.',
    efectos: { plata: -10, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },
  {
    id: 'mundial-1990', desde: 1990, hasta: 1990,
    cond: { edadMin: 4, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Italia 90: Goycochea ataja penales hasta la final, donde Codesal inventa uno para Alemania. Subcampeones del mundo y una bronca para administrar durante décadas.',
    efectos: { plata: 0, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },

  // ——— 1991-2001: convertibilidad, deme dos, y el precipicio ———
  {
    id: 'convertibilidad', desde: 1991, hasta: 1991,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Abril de 1991: un peso, un dólar, por ley. La inflación desaparece de un día para el otro y el precio del fiambre repite dos meses seguidos, cosa nunca vista.',
    efectos: { plata: 5, salud: 0, felicidad: 10 },
    tono: 'ironico'
  },
  {
    id: 'ramales-cerrados', desde: 1992, hasta: 1993,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: ['NOA', 'NEA'], clases: null, plataMin: null },
    prob: 0.6, unaVez: true,
    texto: '"Ramal que para, ramal que cierra", avisó Menem, y cumplió: el tren dejó de pasar por tu zona. La estación queda de decorado y los pibes se van yendo a la ciudad.',
    efectos: { plata: -10, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },
  {
    id: 'deme-dos', desde: 1992, hasta: 1998,
    cond: { edadMin: 18, edadMax: null, genero: null, regiones: null, clases: ['media', 'acomodada'], plataMin: null },
    prob: 0.7, unaVez: true,
    texto: 'Uno a uno mediante, Miami queda más barato que Mar del Plata: volvés con dos valijas y el "deme dos" incorporado. Algo te dice que esto no cierra, pero el plazo fijo rinde.',
    efectos: { plata: -5, salud: 0, felicidad: 10 },
    tono: 'ironico'
  },
  {
    id: 'desempleo-1995', desde: 1995, hasta: 1995,
    cond: { edadMin: 18, edadMax: 60, genero: null, regiones: null, clases: ['humilde', 'trabajadora', 'media'], plataMin: null },
    prob: 0.75, unaVez: true,
    texto: 'Efecto Tequila: el desempleo toca 18,4%, récord histórico. Los clasificados del domingo se leen como quiniela y "reestructuración" se vuelve la palabra más fea del idioma.',
    efectos: { plata: -15, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },
  {
    id: 'recesion-1999', desde: 1999, hasta: 2000,
    cond: { edadMin: 16, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'La recesión cumple años: blindaje, megacanje, déficit cero y otros conjuros. El riesgo país aparece en la tele como el pronóstico del tiempo, y siempre anuncia tormenta.',
    efectos: { plata: -10, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'corralito', desde: 2001, hasta: 2001,
    cond: { edadMin: 18, edadMax: null, genero: null, regiones: null, clases: null, plataMin: 50 },
    prob: 1, unaVez: true,
    texto: 'Diciembre de 2001: corralito. Tus ahorros quedan presos del banco, de a 250 pesos por semana, gracias por participar. Estrenás cacerola contra la persiana más cercana.',
    efectos: { plata: -30, salud: 0, felicidad: -20 },
    tono: 'ironico'
  },
  {
    id: 'estallido-2001', desde: 2001, hasta: 2001,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Diciembre de 2001: estado de sitio, "que se vayan todos" y el helicóptero despegando de la Rosada. Cinco presidentes en once días; a uno ni le aprendiste el nombre.',
    efectos: { plata: 0, salud: 0, felicidad: -15 },
    tono: 'ironico'
  },

  // ——— 2002-2015: fondo del pozo, boom y cepo ———
  {
    id: 'crisis-2002', desde: 2002, hasta: 2002,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'El peso pasa de 1 a casi 4 por dólar y la pobreza toca el 65%: trueque, patacones y LECOP. Si tenías dólares en el banco, volvieron a 1,40: "pesificación asimétrica", porque "afano" sonaba informal.',
    efectos: { plata: -25, salud: -5, felicidad: -15 },
    tono: 'ironico'
  },
  {
    id: 'inundacion-santa-fe', desde: 2003, hasta: 2003,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: ['Pampeana'], clases: null, plataMin: null },
    prob: 0.4, unaVez: true,
    texto: 'Abril de 2003: el Salado entra a Santa Fe casi sin aviso y un tercio de la ciudad queda bajo el agua. Más de cien mil evacuados; hay cosas que el agua no devuelve.',
    efectos: { plata: -15, salud: -5, felicidad: -10 },
    tono: 'sobrio'
  },
  {
    id: 'boom-2003', desde: 2003, hasta: 2008,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 0.45, unaVez: true,
    texto: 'Viento de cola: la soja vale oro, el país crece a tasas chinas y aparece esa rareza, el laburo. Te dan ganas nuevas: cambiar la heladera, irte de vacaciones, creer.',
    efectos: { plata: 15, salud: 5, felicidad: 10 },
    tono: 'ironico'
  },
  {
    id: 'cepo-2011', desde: 2011, hasta: 2011,
    cond: { edadMin: 18, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 0.9, unaVez: true,
    texto: 'Octubre de 2011: nace el cepo. Comprar un dólar requiere permiso de la AFIP, que casi siempre dice que no; nace también el blue, que es el mismo dólar pero clandestino.',
    efectos: { plata: -5, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'mundial-2014', desde: 2014, hasta: 2014,
    cond: { edadMin: 4, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Brasil 2014: final contra Alemania en el Maracaná, gol de ellos en el alargue. Higuaín, Palacio, el tiro libre de Messi: no entró nada, estaba pintado el tercer palo.',
    efectos: { plata: 0, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },

  // ——— 2018-2026: FMI, pandemia, Qatar y motosierra ———
  {
    id: 'crisis-2018', desde: 2018, hasta: 2018,
    cond: { edadMin: 16, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'El dólar se duplica en cinco meses y volvemos al FMI por el préstamo más grande de su historia: 57.000 millones. "Pasaron cosas", te explican. Sí: te pasaron a vos.',
    efectos: { plata: -15, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },
  {
    id: 'pandemia-2020', desde: 2020, hasta: 2020,
    cond: { edadMin: null, edadMax: 59, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Marzo de 2020: cuarentena "de 15 días". Meses después seguís adentro, aplaudiendo a las 21, horneando pan de masa madre y contando la salida al súper como una gesta.',
    efectos: { plata: -10, salud: 0, felicidad: -15 },
    tono: 'ironico'
  },
  {
    id: 'pandemia-2020-mayores', desde: 2020, hasta: 2020,
    cond: { edadMin: 60, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Marzo de 2020: cuarentena, y vos en el grupo de riesgo. Meses sin abrazar a los tuyos, la vida entera por videollamada y un susto nuevo con cada tos.',
    efectos: { plata: -5, salud: -15, felicidad: -20 },
    tono: 'sobrio'
  },
  {
    id: 'mundial-2022', desde: 2022, hasta: 2022,
    cond: { edadMin: 4, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Qatar 2022: Messi levanta la Copa. Abrazás desconocidos en la calle, cinco millones desbordan el Obelisco y por unos días este es, en serio, el mejor país del mundo.',
    efectos: { plata: 0, salud: 0, felicidad: 30 },
    tono: 'ironico'
  },
  {
    id: 'inflacion-2022', desde: 2022, hasta: 2022,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'La inflación de 2022 cierra en 94,8%. Ir al súper con lista es de gente optimista: los precios se remarcan mientras vos caminás el pasillo.',
    efectos: { plata: -10, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'inflacion-2023', desde: 2023, hasta: 2023,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Inflación 2023: 211,4% anual, la más alta del mundo. El alquiler se actualiza más seguido que tu sueldo y el asado asciende a la categoría de bien de lujo.',
    efectos: { plata: -15, salud: 0, felicidad: -10 },
    tono: 'ironico'
  },
  {
    id: 'motosierra-2024', desde: 2024, hasta: 2024,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: 'Balotaje y motosierra: el ajuste lo iba a pagar la casta, pero la pobreza salta al 53% antes de empezar a bajar. Tu tarifa de luz nunca se enteró de que era casta.',
    efectos: { plata: -10, salud: 0, felicidad: -5 },
    tono: 'ironico'
  },
  {
    id: 'estabilizacion-2025', desde: 2025, hasta: 2025,
    cond: { edadMin: null, edadMax: null, genero: null, regiones: null, clases: null, plataMin: null },
    prob: 1, unaVez: true,
    texto: '2025: la inflación baja a números de país normal y los precios repiten mes a mes. Vos desconfiás por memoria muscular y seguís ahorrando en dólares, por si las moscas.',
    efectos: { plata: 5, salud: 0, felicidad: 10 },
    tono: 'ironico'
  }
];
