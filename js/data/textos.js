// js/data/textos.js — Argentero
// Banco de contenido es-AR: nombres por década, localidades, causas de muerte,
// veredictos, microcopy de UI y plantilla de share.
// Regla de tono: la sátira apunta a la macro, el Estado y el absurdo.
// Dictadura, Malvinas y muerte infantil: siempre sobrio. El chiste nunca es contra la víctima.

// ---------------------------------------------------------------------------
// Nombres reales populares por década de nacimiento y género.
// '1930' cubre los 30s-40s; '1950' cubre los 50s-60s.
// ---------------------------------------------------------------------------
export const NOMBRES = {
  varon: {
    '1930': ['Juan Carlos', 'Roberto', 'Héctor', 'Oscar', 'Alberto', 'Rodolfo', 'Osvaldo', 'Norberto', 'Aníbal', 'Enrique'],
    '1950': ['Carlos Alberto', 'Jorge', 'Rubén', 'Daniel', 'Ricardo', 'Eduardo', 'Miguel Ángel', 'Néstor', 'Hugo', 'Omar'],
    '1970': ['Sergio', 'Gustavo', 'Marcelo', 'Fernando', 'Diego', 'Pablo', 'Claudio', 'Alejandro', 'Fabián', 'Gabriel'],
    '1980': ['Matías', 'Sebastián', 'Leonardo', 'Emanuel', 'Cristian', 'Maximiliano', 'Ezequiel', 'Damián', 'Leandro', 'Federico'],
    '1990': ['Brian', 'Jonathan', 'Lucas', 'Nahuel', 'Kevin', 'Facundo', 'Gonzalo', 'Alan', 'Axel', 'Elías'],
    '2000': ['Thiago', 'Benjamín', 'Lautaro', 'Santino', 'Bautista', 'Valentino', 'Joaquín', 'Ian', 'Dylan', 'Bruno'],
  },
  mujer: {
    '1930': ['María del Carmen', 'Norma', 'Beatriz', 'Elsa', 'Nélida', 'Haydée', 'Marta', 'Susana', 'Alicia', 'Zulema'],
    '1950': ['Graciela', 'Silvia', 'Mónica', 'Cristina', 'Liliana', 'Adriana', 'Patricia', 'Ana María', 'Stella Maris', 'Mirta'],
    '1970': ['Claudia', 'Sandra', 'Viviana', 'Alejandra', 'Verónica', 'Karina', 'Fabiana', 'Gabriela', 'Marcela', 'Paola'],
    '1980': ['Romina', 'Vanesa', 'Natalia', 'Soledad', 'Carolina', 'Cintia', 'Yanina', 'Daniela', 'Luciana', 'Érica'],
    '1990': ['Rocío', 'Micaela', 'Brenda', 'Ayelén', 'Aldana', 'Antonella', 'Agustina', 'Florencia', 'Belén', 'Melina'],
    '2000': ['Camila', 'Valentina', 'Morena', 'Martina', 'Mía', 'Catalina', 'Abril', 'Zoe', 'Julieta', 'Delfina'],
  },
};

export const APELLIDOS = [
  'Gómez', 'González', 'Rodríguez', 'Fernández', 'López', 'Martínez',
  'Pérez', 'Sánchez', 'Romero', 'Díaz', 'Sosa', 'Álvarez', 'Torres',
  'Ruiz', 'Benítez', 'Acosta', 'Medina', 'Herrera', 'Suárez', 'Aguirre',
  'Molina', 'Castro', 'Ríos', 'Vega', 'Quiroga', 'Ponce', 'Farías',
];

// ---------------------------------------------------------------------------
// 24 jurisdicciones (23 provincias + CABA). Capital real + pueblos reales.
// Buenos Aires suma conurbano; CABA usa barrios en lugar de pueblos.
// ---------------------------------------------------------------------------
export const LOCALIDADES = {
  'Buenos Aires': {
    capital: 'La Plata',
    pueblos: ['Lincoln', 'Pehuajó', 'Coronel Suárez', 'Carhué', 'General Villegas'],
    conurbano: ['Lanús', 'Quilmes', 'La Matanza', 'Moreno', 'San Martín', 'Berazategui'],
  },
  'CABA': {
    capital: 'Buenos Aires',
    barrios: ['Mataderos', 'Villa Lugano', 'Recoleta', 'Barracas', 'Villa Crespo', 'Parque Patricios', 'Flores', 'La Boca'],
  },
  'Catamarca': {
    capital: 'San Fernando del Valle de Catamarca',
    pueblos: ['Tinogasta', 'Fiambalá', 'Andalgalá', 'Pomán', 'Hualfín'],
  },
  'Chaco': {
    capital: 'Resistencia',
    pueblos: ['Quitilipi', 'Machagai', 'Charata', 'Villa Ángela', 'Pampa del Infierno'],
  },
  'Chubut': {
    capital: 'Rawson',
    pueblos: ['Gaiman', 'Trevelin', 'Camarones', 'Gobernador Costa', 'Gan Gan'],
  },
  'Córdoba': {
    capital: 'Córdoba',
    pueblos: ['Deán Funes', 'Laboulaye', 'Oncativo', 'Cruz del Eje', 'Villa Huidobro'],
  },
  'Corrientes': {
    capital: 'Corrientes',
    pueblos: ['Mercedes', 'Curuzú Cuatiá', 'Mburucuyá', 'Saladas', 'Yapeyú'],
  },
  'Entre Ríos': {
    capital: 'Paraná',
    pueblos: ['Villaguay', 'Chajarí', 'Urdinarrain', 'Basavilbaso', 'Federal'],
  },
  'Formosa': {
    capital: 'Formosa',
    pueblos: ['Clorinda', 'Pirané', 'Las Lomitas', 'El Colorado', 'Ingeniero Juárez'],
  },
  'Jujuy': {
    capital: 'San Salvador de Jujuy',
    pueblos: ['Humahuaca', 'La Quiaca', 'Abra Pampa', 'Tilcara', 'Purmamarca'],
  },
  'La Pampa': {
    capital: 'Santa Rosa',
    pueblos: ['General Acha', 'Victorica', 'Realicó', 'Guatraché', 'Jacinto Arauz'],
  },
  'La Rioja': {
    capital: 'La Rioja',
    pueblos: ['Chilecito', 'Chamical', 'Aimogasta', 'Famatina', 'Villa Unión'],
  },
  'Mendoza': {
    capital: 'Mendoza',
    pueblos: ['Tunuyán', 'Malargüe', 'Uspallata', 'General Alvear', 'La Paz'],
  },
  'Misiones': {
    capital: 'Posadas',
    pueblos: ['Oberá', 'Eldorado', 'Apóstoles', 'Aristóbulo del Valle', 'Montecarlo'],
  },
  'Neuquén': {
    capital: 'Neuquén',
    pueblos: ['Zapala', 'Chos Malal', 'Aluminé', 'Junín de los Andes', 'Las Lajas'],
  },
  'Río Negro': {
    capital: 'Viedma',
    pueblos: ['Choele Choel', 'Sierra Grande', 'Ingeniero Jacobacci', 'El Bolsón', 'Maquinchao'],
  },
  'Salta': {
    capital: 'Salta',
    pueblos: ['Cafayate', 'Cachi', 'Iruya', 'Rosario de la Frontera', 'El Galpón'],
  },
  'San Juan': {
    capital: 'San Juan',
    pueblos: ['Calingasta', 'Tamberías', 'Barreal', 'Tudcum', 'Talacasto'],
  },
  'San Luis': {
    capital: 'San Luis',
    pueblos: ['Merlo', 'Quines', 'Concarán', 'La Toma', 'Buena Esperanza'],
  },
  'Santa Cruz': {
    capital: 'Río Gallegos',
    pueblos: ['Puerto San Julián', 'Gobernador Gregores', 'Los Antiguos', 'Perito Moreno', 'Comandante Luis Piedrabuena'],
  },
  'Santa Fe': {
    capital: 'Santa Fe',
    pueblos: ['Ceres', 'Sunchales', 'Rufino', 'Vera', 'Firmat'],
  },
  'Santiago del Estero': {
    capital: 'Santiago del Estero',
    pueblos: ['Añatuya', 'Frías', 'Quimilí', 'Loreto', 'Bandera'],
  },
  'Tierra del Fuego': {
    capital: 'Ushuaia',
    pueblos: ['Tolhuin', 'Río Grande', 'Puerto Almanza'],
  },
  'Tucumán': {
    capital: 'San Miguel de Tucumán',
    pueblos: ['Tafí del Valle', 'Amaicha del Valle', 'Simoca', 'Monteros', 'Famaillá'],
  },
};

// ---------------------------------------------------------------------------
// Causas de muerte por etapa. Tono sobrio y digno, siempre.
// La muerte infantil no admite chistes: si señala algo, señala al sistema.
// Redacción neutra en género.
// ---------------------------------------------------------------------------
export const CAUSAS_MUERTE = {
  infancia: {
    humilde: [
      'Una diarrea estival. Faltaba agua potable, no amor.',
      'Una neumonía en pleno invierno. El hospital quedaba a tres horas.',
      'Una infección que con una consulta a tiempo se curaba.',
      'Sarampión. La vacuna existía, pero no llegaba a todos lados.',
    ],
    default: [
      'Una fiebre que los médicos de la época no supieron explicar.',
      'Complicaciones de una neumonía.',
      'Una infección que todavía no tenía cura.',
      'Sarampión, como tantos otros chicos ese año.',
    ],
  },
  ninez: [
    'Un accidente jugando cerca del arroyo.',
    'Una apendicitis que llegó tarde al quirófano.',
    'Una enfermedad que ese año se llevó a varios chicos del pueblo.',
    'Una fiebre que no bajó a tiempo.',
  ],
  adolescencia: [
    'Un accidente en moto en la ruta de tierra.',
    'Una enfermedad detectada demasiado tarde.',
    'Un accidente en el trabajo. Todavía no tenías edad para trabajar.',
    'Un descuido en el río, un verano.',
  ],
  juventud: [
    'Un accidente de tránsito volviendo a casa, de madrugada.',
    'Una enfermedad que no dio tiempo a nada.',
    'Un accidente en un laburo sin seguro ni casco.',
    'Una esquina equivocada, una noche equivocada.',
  ],
  adultez: [
    'Un infarto que nadie vio venir, ni vos.',
    'Un accidente en la ruta, yendo a laburar.',
    'Una enfermedad larga, peleada hasta el final.',
    'Un ACV, de un día para el otro.',
  ],
  madurez: [
    'El corazón dijo basta antes que vos.',
    'Una enfermedad que el sistema de salud detectó tarde.',
    'Un ACV, sin aviso previo.',
    'Una enfermedad larga, con más entereza que suerte.',
  ],
  vejez: [
    'Te fuiste durmiendo una siesta de domingo, con olor a asado en el patio.',
    'El corazón, después de tantos sobresaltos, se tomó su descanso.',
    'Una tarde cualquiera, con la radio prendida y el mate por la mitad.',
    'Despacio y sin drama, con los nietos cerca.',
    'En tu cama, en tu casa, que ya era mucho pedir en este país.',
  ],
};

// ---------------------------------------------------------------------------
// Veredictos por score (0-120). `share` es la versión en primera persona
// que usa la plantilla de compartir.
// ---------------------------------------------------------------------------
export const VEREDICTOS = [
  {
    min: 90,
    titulo: 'LE GANASTE A NACER ARGENTINO',
    emoji: '🏆',
    texto: 'Naciste en el país donde el que apuesta al dólar pierde, y aun así ganaste. Estadísticamente sos un error de medición: disfrutalo.',
    share: 'le gané a nacer argentino',
  },
  {
    min: 65,
    titulo: 'Le empataste con dignidad',
    emoji: '🤝',
    texto: 'Ni la inflación, ni el corralito, ni la fila del ANSES pudieron del todo con vos. Empatarle a la Argentina es, a los puntos, una victoria.',
    share: 'le empaté con dignidad',
  },
  {
    min: 40,
    titulo: 'Perdiste por penales',
    emoji: '😔',
    texto: 'Hiciste todo bien y perdiste igual, que es la experiencia argentina por excelencia. Llegar a los penales ya fue mérito: enfrente atajaba la macroeconomía.',
    share: 'perdí por penales',
  },
  {
    min: 0,
    titulo: 'Te pasó la Argentina por encima',
    emoji: '🚜',
    texto: 'No perdiste vos: te tocó de rival un siglo de macroeconomía argentina. A eso no le gana nadie, ni con VAR a favor.',
    share: 'me pasó por encima',
  },
];

// ---------------------------------------------------------------------------
// Microcopy de UI.
// ---------------------------------------------------------------------------
export const UI = {
  portada: {
    titulo: 'ARGENTERO',
    bajada: '¿Le ganás a nacer argentino?',
    explicacion: 'No elegís nada. Te toca como le toca a cualquiera: año, lugar, clase y un d12. Lo demás es bancársela.',
    boton: 'NACER 🎲',
  },
  atributos: {
    anio: 'Año',
    lugar: 'Lugar',
    genero: 'Género',
    clase: 'Clase social',
    hermanos: 'Hermanos',
  },
  genero: {
    varon: 'Varón',
    mujer: 'Mujer',
  },
  stats: {
    plata: '💵 Plata',
    salud: '❤️ Salud',
    felicidad: '😊 Felicidad',
  },
  etapas: {
    infancia: { emoji: '👶', nombre: 'Infancia' },
    ninez: { emoji: '⚽', nombre: 'Niñez' },
    adolescencia: { emoji: '🎒', nombre: 'Adolescencia' },
    juventud: { emoji: '🎸', nombre: 'Juventud' },
    adultez: { emoji: '🏠', nombre: 'Adultez' },
    madurez: { emoji: '🕰️', nombre: 'Madurez' },
    vejez: { emoji: '🧉', nombre: 'Vejez' },
  },
  botones: {
    seguir: 'Seguir',
    tirar: 'Tirar el dado',
    compartir: 'Compartir',
    nacerDeNuevo: 'Nacer de nuevo',
    revivir: 'Revivir esta vida',
  },
  partida: {
    encabezado: 'PARTIDA DE NACIMIENTO — República Argentina',
  },
  dado: {
    cargando: 'El dado está en el aire. El que apuesta al dado pierde.',
  },
  final: {
    continuara: 'CONTINUARÁ…',
    continuaraTexto: 'Llegaste a 2026 con vida. Acá eso ya cuenta como logro.',
    puntajeLabel: 'Puntaje',
  },
  disclaimers: {
    fuentes: 'Basado en estadísticas reales: INDEC, DEIS, UCA, RENAPER.',
    satira: 'Sátira: cualquier parecido con tu vida es pura estadística.',
  },
};

// ---------------------------------------------------------------------------
// Cómo se nombra la clase social al nacer (para partida y share).
// ---------------------------------------------------------------------------
export const FRASES_CLASE = {
  humilde: 'en una familia de bajos recursos',
  trabajadora: 'en una familia laburante',
  media: 'en una familia de clase media',
  acomodada: 'en una familia acomodada',
};

// ---------------------------------------------------------------------------
// Plantilla de share. {clase} usa FRASES_CLASE; {veredicto} usa VEREDICTOS[].share.
// El motor debe recortar {resumen} para que el resultado final no pase de 280 chars.
// ---------------------------------------------------------------------------
export const SHARE_TPL = '🇦🇷 ARGENTERO 🎲 Nací {genero} en {lugar} en {anio}, {clase}, {hermanos}. {resumen}. Puntaje {score}/120: {veredicto}. ¿Le ganás vos a nacer argentino? {url}';
