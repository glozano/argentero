// Tablas estadísticas reales (orden de magnitud correcto; ver docs/specs/argentero.md).
// Fuentes: INDEC Censo 2022, Argendata/CEPED (pobreza), DEIS (mortalidad infantil),
// Grushka (esperanza de vida), RENAPER (fecundidad), Argentinos por la Educación/UCA.

// --- Provincias: share poblacional (Censo 2022) + región ---
export const PROVINCIAS = [
  { nombre: 'Buenos Aires', peso: 38.2, region: 'GBA' },       // se divide conurbano/interior en LOCALIDADES
  { nombre: 'Córdoba', peso: 8.4, region: 'Pampeana' },
  { nombre: 'Santa Fe', peso: 7.7, region: 'Pampeana' },
  { nombre: 'CABA', peso: 6.8, region: 'CABA' },
  { nombre: 'Mendoza', peso: 4.5, region: 'Cuyo' },
  { nombre: 'Tucumán', peso: 3.8, region: 'NOA' },
  { nombre: 'Salta', peso: 3.1, region: 'NOA' },
  { nombre: 'Entre Ríos', peso: 3.1, region: 'Pampeana' },
  { nombre: 'Misiones', peso: 2.8, region: 'NEA' },
  { nombre: 'Corrientes', peso: 2.6, region: 'NEA' },
  { nombre: 'Chaco', peso: 2.5, region: 'NEA' },
  { nombre: 'Santiago del Estero', peso: 2.3, region: 'NOA' },
  { nombre: 'San Juan', peso: 1.8, region: 'Cuyo' },
  { nombre: 'Jujuy', peso: 1.8, region: 'NOA' },
  { nombre: 'Río Negro', peso: 1.6, region: 'Patagonia' },
  { nombre: 'Neuquén', peso: 1.5, region: 'Patagonia' },
  { nombre: 'Formosa', peso: 1.3, region: 'NEA' },
  { nombre: 'Chubut', peso: 1.3, region: 'Patagonia' },
  { nombre: 'San Luis', peso: 1.2, region: 'Cuyo' },
  { nombre: 'Catamarca', peso: 0.9, region: 'NOA' },
  { nombre: 'La Rioja', peso: 0.8, region: 'NOA' },
  { nombre: 'La Pampa', peso: 0.8, region: 'Pampeana' },
  { nombre: 'Santa Cruz', peso: 0.7, region: 'Patagonia' },
  { nombre: 'Tierra del Fuego', peso: 0.4, region: 'Patagonia' },
];

// --- Año de nacimiento: cohortes (aprox. distribución de cohortes vivas + jugabilidad) ---
export const COHORTES = [
  [[1930, 1949], 15],
  [[1950, 1969], 20],
  [[1970, 1989], 30],
  [[1990, 2005], 35],
];

export const P_VARON = 0.512; // ~105 varones cada 100 mujeres

// --- Clase social al nacer, pesos por banda de años ---
// humilde ~ pobreza/indigencia; trabajadora ~ clase baja integrada; media; acomodada.
// Sigue la curva real de pobreza: 1974 ~6-8% -> 1989 ~47% -> 2002 >65% -> 2024 ~40-50%.
export const CLASES_POR_EPOCA = [
  { desde: 1930, hasta: 1945, pesos: { humilde: 30, trabajadora: 42, media: 23, acomodada: 5 } },
  { desde: 1946, hasta: 1975, pesos: { humilde: 15, trabajadora: 40, media: 38, acomodada: 7 } }, // época dorada de movilidad
  { desde: 1976, hasta: 1988, pesos: { humilde: 25, trabajadora: 38, media: 31, acomodada: 6 } },
  { desde: 1989, hasta: 1990, pesos: { humilde: 45, trabajadora: 32, media: 19, acomodada: 4 } }, // hiper
  { desde: 1991, hasta: 1998, pesos: { humilde: 27, trabajadora: 33, media: 33, acomodada: 7 } },
  { desde: 1999, hasta: 2003, pesos: { humilde: 55, trabajadora: 27, media: 15, acomodada: 3 } }, // 2002: >65% pobreza
  { desde: 2004, hasta: 2017, pesos: { humilde: 30, trabajadora: 33, media: 31, acomodada: 6 } },
  { desde: 2018, hasta: 2005 + 100, pesos: { humilde: 40, trabajadora: 30, media: 25, acomodada: 5 } },
];

// Ajuste regional de clase: NOA/NEA y pueblo corren la distribución hacia abajo.
export const AJUSTE_CLASE_REGION = { NOA: 12, NEA: 14, Cuyo: 6, Patagonia: 2, Pampeana: 0, GBA: 4, CABA: -12 }; // puntos que migran de media->trabajadora->humilde

// --- Mortalidad infantil (0-1 año, por mil) por época; multiplicador regional ---
export const MORTALIDAD_INFANTIL = [
  [[1930, 1944], 95], [[1945, 1959], 70], [[1960, 1974], 60], [[1975, 1984], 35],
  [[1985, 1994], 26], [[1995, 2004], 17], [[2005, 2014], 12], [[2015, 2026], 8.5],
];
export const MULT_MORT_REGION = { NOA: 1.7, NEA: 1.9, Cuyo: 1.3, Patagonia: 1.1, Pampeana: 1.0, GBA: 1.0, CABA: 0.6 };
export const MULT_MORT_CLASE = { humilde: 1.5, trabajadora: 1.1, media: 0.8, acomodada: 0.5 };

// --- Esperanza de vida al nacer por época y género (Grushka + World Bank) ---
export const ESPERANZA_VIDA = [
  { desde: 1930, hasta: 1946, varon: 55, mujer: 59 },
  { desde: 1947, hasta: 1959, varon: 59, mujer: 64 },
  { desde: 1960, hasta: 1979, varon: 63, mujer: 70 },
  { desde: 1980, hasta: 1990, varon: 66, mujer: 73 },
  { desde: 1991, hasta: 2000, varon: 68, mujer: 76 },
  { desde: 2001, hasta: 2010, varon: 71, mujer: 78 },
  { desde: 2011, hasta: 2026, varon: 74, mujer: 80 },
];

// --- Fecundidad: TGF (hijos por mujer) por época; para sortear hermanos e hijos ---
export const TGF = [
  [[1930, 1969], 3.2], [[1970, 1989], 3.2], [[1990, 2000], 2.7],
  [[2001, 2010], 2.35], [[2011, 2018], 2.1], [[2019, 2026], 1.5],
];
export const AJUSTE_HERMANOS = { // suma a la media de hermanos
  clase: { humilde: 2.2, trabajadora: 0.8, media: -0.3, acomodada: -0.6 },
  region: { NOA: 1.0, NEA: 1.2, Cuyo: 0.5, Patagonia: 0.2, Pampeana: 0, GBA: 0, CABA: -0.7 },
  pueblo: 1.0, // localidad rural/pueblo
};

// --- Educación: modificadores de DC por clase (ApE: secundario Q1 59.6% vs Q5 92%; universidad pobres ~12%) ---
export const MOD_CLASE = { humilde: -3, trabajadora: -1, media: 1, acomodada: 3 };
export const MOD_REGION_EDU = { NOA: -1, NEA: -1, Cuyo: 0, Patagonia: 0, Pampeana: 0, GBA: 0, CABA: 1 };

// --- Stats iniciales por clase ---
export const PLATA_INICIAL = { humilde: 12, trabajadora: 32, media: 55, acomodada: 82 };

// --- Presidencias (para el contador "presidentes que viviste"; períodos, no personas exactas en interinatos) ---
export const PRESIDENTES = [
  ['Uriburu', 1930], ['Justo', 1932], ['Ortiz', 1938], ['Castillo', 1942], ['Ramírez', 1943], ['Farrell', 1944],
  ['Perón', 1946], ['Lonardi', 1955], ['Aramburu', 1955], ['Frondizi', 1958], ['Guido', 1962], ['Illia', 1963],
  ['Onganía', 1966], ['Levingston', 1970], ['Lanusse', 1971], ['Cámpora', 1973], ['Perón (III)', 1973],
  ['Isabel Perón', 1974], ['Videla', 1976], ['Viola', 1981], ['Galtieri', 1981], ['Bignone', 1982],
  ['Alfonsín', 1983], ['Menem', 1989], ['De la Rúa', 1999], ['Rodríguez Saá', 2001], ['Duhalde', 2002],
  ['Néstor Kirchner', 2003], ['Cristina Fernández', 2007], ['Macri', 2015], ['Alberto Fernández', 2019], ['Milei', 2023],
];

// --- Mundiales: [año, resultado] ---
export const MUNDIALES = [
  [1930, 'sub'], [1934, null], [1958, null], [1962, null], [1966, null], [1970, null], [1974, null],
  [1978, 'campeon'], [1982, null], [1986, 'campeon'], [1990, 'sub'], [1994, null], [1998, null],
  [2002, null], [2006, null], [2010, null], [2014, 'sub'], [2018, null], [2022, 'campeon'], [2026, null],
];

// --- Cuadro de fútbol: te lo asignan al nacer (Kantar: Boca 29%, River 24%,
// Racing/Independiente/San Lorenzo ~5%, interior 12%, ninguno 12%) ---
export const CUADROS_BASE = [
  ['Boca', 27], ['River', 23], ['Racing', 5], ['Independiente', 5], ['San Lorenzo', 4],
  ['Vélez', 2], ['Huracán', 1.5], ['de ninguno (raro el pibe)', 10],
];
export const CUADROS_PROVINCIA = { // el cuadro local pesa fuerte en su provincia
  'Santa Fe': [["Newell's", 12], ['Rosario Central', 12], ['Colón', 6], ['Unión', 5]],
  'Córdoba': [['Talleres', 12], ['Belgrano', 12], ['Instituto', 6]],
  'Mendoza': [['Godoy Cruz', 14]],
  'Tucumán': [['Atlético Tucumán', 14], ['San Martín de Tucumán', 8]],
  'Santiago del Estero': [['Central Córdoba (SdE)', 14]],
  'San Juan': [['San Martín de San Juan', 14]],
  'Jujuy': [['Gimnasia de Jujuy', 14]],
  'Salta': [['Juventud Antoniana', 10]],
  'Chaco': [['Sarmiento de Resistencia', 8]],
  'Corrientes': [['Boca Unidos', 6]],
  'Entre Ríos': [['Patronato', 10]],
  'Misiones': [['Guaraní Antonio Franco', 6]],
  'Buenos Aires': [['Estudiantes', 4], ['Gimnasia', 4], ['Lanús', 3], ['Banfield', 3], ['Quilmes', 3]],
};

export function buscarEnBandas(bandas, anio) {
  for (const [[a, b], v] of bandas) if (anio >= a && anio <= b) return v;
  return bandas[bandas.length - 1][1];
}

export function buscarRango(arr, anio) {
  for (const r of arr) if (anio >= r.desde && anio <= r.hasta) return r;
  return arr[arr.length - 1];
}
