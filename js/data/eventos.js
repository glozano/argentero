// js/data/eventos.js — Argentero
// Banco de eventos de etapa (tiradas de d12) y decisiones.
// Sin lógica: objetos planos. El motor aplica mods de clase (+3 acomodada, +1 media,
// -1 trabajadora, -3 humilde) y región sobre el dc base.
// Regla de tono: la sátira apunta a la macro, el Estado y el absurdo. Dictadura,
// Malvinas y muerte infantil se narran sobrios (ver historia.js); acá no se tocan.

export const EVENTOS = [

  // ── INFANCIA (0-5) ──────────────────────────────────────────────

  {
    id: 'la-salita', etapa: 'infancia', peso: 10,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La salita de cuatro',
    intro: 'Hay una vacante en el jardín. Una sola. Tu vieja hace la cola desde las cinco de la mañana.',
    dc: 6,
    exito: { texto: 'Entraste. Guardapolvo a cuadritos y un rincón de bloques que ya es tuyo.', efectos: { felicidad: 8 }, set: {} },
    fallo: { texto: 'No hubo banco. Un año más mirando la calle desde la ventana, que también educa.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'La lista de espera tenía lista de espera. Tu primer trámite argentino: perdiste sin haber jugado.', efectos: { felicidad: -6 } },
    crit12: { texto: 'Entraste y te eligieron abanderado de la salita. Nadie sabe qué significa, pero tu abuela ya lo contó en todo el barrio.', efectos: { felicidad: 12 } }
  },

  {
    id: 'mudanza-conurbano', etapa: 'infancia', peso: 7,
    cond: { claseIn: null, regionIn: ['Pampeana', 'Cuyo', 'NOA', 'NEA'], generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La mudanza',
    intro: 'A tus viejos les prometieron laburo cerca de la Capital. Se carga todo en un camión prestado.',
    dc: 6,
    exito: { texto: 'Casa nueva, calle de tierra, vecinos que prestan la manguera. Se puede empezar de nuevo.', efectos: { plata: 5, felicidad: 5 }, set: {} },
    fallo: { texto: 'El laburo prometido duró menos que el sueldo. El barrio nuevo, al menos, vino con potrero.', efectos: { plata: -5, felicidad: -3 }, set: {} },
    crit1: { texto: 'El camión llegó, el laburo no. Bienvenido al conurbano: acá los planes se hacen a corto plazo.', efectos: { plata: -8, felicidad: -5 } },
    crit12: { texto: 'El barrio nuevo tenía club, sociedad de fomento y una vecina que hace tortas fritas. Ganaste sin saber que jugabas.', efectos: { felicidad: 10 } }
  },

  {
    id: 'club-del-barrio', etapa: 'infancia', peso: 9,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El club del barrio',
    intro: 'Tu viejo te lleva al club. Baby fútbol, bufet con panchos y un presidente que también corta el pasto.',
    dc: 5,
    exito: { texto: 'Camiseta que te queda enorme y tercer tiempo con naranjada. El club ya es tu segunda casa.', efectos: { felicidad: 8, salud: 3 }, set: {} },
    fallo: { texto: 'Te anotaron, pero la cuota se atrasó y el club también. Igual entrás a mirar por el alambrado.', efectos: { felicidad: -3 }, set: {} },
    crit1: { texto: 'El club cerró por deudas. Tu primer amor institucional, quebrado por la macroeconomía: no va a ser el último.', efectos: { felicidad: -6 } },
    crit12: { texto: 'Campeón de baby en cancha de tierra. Hay una foto con trofeo que va a presidir la casa de tu vieja por cincuenta años.', efectos: { felicidad: 12, salud: 3 } }
  },

  {
    id: 'apagones', etapa: 'infancia', peso: 7,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El apagón',
    intro: 'Se corta la luz en todo el barrio. Otra vez. Velas, radio a pilas y la heladera rezando.',
    dc: 5,
    exito: { texto: 'Noche de historias de terror a la luz de las velas. Te venden el apagón como aventura y vos lo comprás.', efectos: { felicidad: 5 }, set: {} },
    fallo: { texto: 'Se cortó en pleno verano. Se perdió la comida de la semana; la heladera nunca se recuperó del todo.', efectos: { plata: -5, felicidad: -3 }, set: {} },
    crit1: { texto: 'Tres días sin luz. Aprendiste la palabra "transformador" antes que "gracias".', efectos: { plata: -6, felicidad: -5 } },
    crit12: { texto: 'Volvió la luz justo en tu cumpleaños y el barrio entero lo festejó como un gol. Fue el mejor regalo, y fue gratis.', efectos: { felicidad: 10 } }
  },

  {
    id: 'primer-juguete', etapa: 'infancia', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La pelota o la muñeca',
    intro: 'Reyes. Los Magos vienen complicados este año, como todos los años.',
    dc: 5,
    exito: { texto: 'Pelota número cinco o muñeca con un solo zapato, da igual: era nueva y era tuya.', efectos: { felicidad: 8 }, set: {} },
    fallo: { texto: 'Los Reyes trajeron pasto para los camellos nomás. Tu vieja te explicó la inflación sin nombrarla.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'El juguete llegó en cuotas y la última cuota no llegó. Tu primera promesa incumplida con financiamiento.', efectos: { felicidad: -6 } },
    crit12: { texto: 'Apareció la pelota de cuero, la de verdad. En el barrio te trataron como a un ministro, pero querido.', efectos: { felicidad: 12 } }
  },

  {
    id: 'carnaval-barrio', etapa: 'infancia', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Carnaval en el barrio',
    intro: 'Febrero. Bombuchas, espuma y un corso con tres luces que para vos es Disney.',
    dc: 4,
    exito: { texto: 'Volviste empapado y feliz. El verano del barrio no sale plata y rinde igual.', efectos: { felicidad: 6 }, set: {} },
    fallo: { texto: 'Te agarró la barra contraria con las bombuchas heladas. Primer contacto con la injusticia organizada.', efectos: { felicidad: -3 }, set: {} },
    crit1: { texto: 'Llovió el único fin de semana de corso. Suspendido "hasta nuevo aviso", frase que te va a acompañar toda la vida.', efectos: { felicidad: -5 } },
    crit12: { texto: 'Ganaste el concurso de disfraces con uno hecho de cajas. La escasez, bien administrada, es arte.', efectos: { felicidad: 10 } }
  },

  // ── NIÑEZ (6-11) ────────────────────────────────────────────────

  {
    id: 'primaria', etapa: 'ninez', peso: 12,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La primaria',
    intro: 'Escuela pública, cuaderno de tapa dura y un mapa de Argentina con las Malvinas bien pintadas.',
    dc: 5,
    exito: { texto: 'Terminaste séptimo. Lectura, cuentas y la formación de los lunes: hay base.', efectos: { felicidad: 8 }, set: { educacion: 'primaria' } },
    fallo: { texto: 'Repetiste y al año siguiente arrancaste a ayudar en casa. La escuela quedó a medias.', efectos: { felicidad: -6 }, set: {} },
    crit1: { texto: 'Entre paros, faltas y mudanzas, la primaria se deshilachó. Nadie tuvo la culpa y la tuvieron todos.', efectos: { felicidad: -8 } },
    crit12: { texto: 'Abanderado. Tu vieja lloró en el acto y el guardapolvo planchado brillaba más que la escarapela.', efectos: { felicidad: 12 }, set: { educacion: 'primaria' } }
  },

  {
    id: 'potrero', etapa: 'ninez', peso: 9,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El potrero',
    intro: 'Dos ladrillos son un arco. El baldío de la esquina es el Monumental.',
    dc: 4,
    exito: { texto: 'Jugaste hasta que no se veía la pelota. Los picados de la infancia se cuentan después toda la vida.', efectos: { felicidad: 8, salud: 3 }, set: {} },
    fallo: { texto: 'Te eligieron último y te mandaron al arco. Formación de carácter, le dicen.', efectos: { felicidad: -3 }, set: {} },
    crit1: { texto: 'La pelota cayó en el techo del vecino malo. Hay duelos que un barrio no olvida.', efectos: { felicidad: -5 } },
    crit12: { texto: 'Un caño, gol de chilena y silencio. Veinte años después todavía discuten si fue de casualidad. No fue.', efectos: { felicidad: 12 } }
  },

  {
    id: 'guardapolvo', etapa: 'ninez', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El guardapolvo blanco',
    intro: 'Blanco, almidonado, imposible de mantener. El uniforme más democrático del hemisferio.',
    dc: 5,
    exito: { texto: 'Impecable toda la semana. Tu vieja lo plancha como si desfilaras en la ONU.', efectos: { felicidad: 5 }, set: {} },
    fallo: { texto: 'Tinta china en el bolsillo el primer día. El lavado con jabón blanco fue en vano.', efectos: { felicidad: -3 }, set: {} },
    crit1: { texto: 'Heredaste uno tres talles más grande "para que dure". Duró más que varios ministros de Economía.', efectos: { felicidad: -4 } },
    crit12: { texto: 'El único guardapolvo del grado que terminó el año blanco. Un prodigio de logística doméstica.', efectos: { felicidad: 8 } }
  },

  {
    id: 'bici-usada', etapa: 'ninez', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La bici usada',
    intro: 'Apareció una bicicleta de segunda mano. Le falta un guardabarro y le sobra historia.',
    dc: 5,
    exito: { texto: 'La domaste en una tarde, con rodillas de por medio. El barrio se te hizo chico.', efectos: { felicidad: 8, salud: 3 }, set: {} },
    fallo: { texto: 'La cadena saltaba cada dos cuadras. La bici era una metáfora, pero vos querías una bici.', efectos: { felicidad: -3 }, set: {} },
    crit1: { texto: 'Te la afanaron en la puerta del almacén. Aprendiste que acá lo que no se ata con cadena, vuela.', efectos: { felicidad: -7 } },
    crit12: { texto: 'La pintaste, le pusiste calcos y quedó mejor que una cero kilómetro. La industria nacional sos vos.', efectos: { felicidad: 10 } }
  },

  {
    id: 'catequesis', etapa: 'ninez', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Catequesis o la calle',
    intro: 'Tu abuela te anotó en catequesis. La calle, mientras tanto, dicta su propio catecismo.',
    dc: 5,
    exito: { texto: 'Tomaste la comunión con velita y traje prestado. La foto salió torcida pero bendecida.', efectos: { felicidad: 5 }, set: {} },
    fallo: { texto: 'Te rateaste de catequesis para ir al potrero. Dios, dicen, también fue pibe.', efectos: { felicidad: 3 }, set: {} },
    crit1: { texto: 'El cura te tomó de punto por preguntar demasiado. Tu carrera teológica terminó ahí.', efectos: { felicidad: -4 } },
    crit12: { texto: 'Saliste tan aplicado que la capilla te quiso de monaguillo. Tu abuela tocó el cielo con las manos.', efectos: { felicidad: 8 } }
  },

  {
    id: 'la-maestra', etapa: 'ninez', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La maestra',
    intro: 'Hay una maestra que se queda después de hora. Cobra poco, corrige mucho, no se rinde.',
    dc: 5,
    exito: { texto: 'Te prestó libros y te dijo que vos podías. Le creíste. Eso a veces alcanza.', efectos: { felicidad: 8 }, set: {} },
    fallo: { texto: 'A mitad de año la trasladaron. El grado siguió; algo tuyo quedó en el aula vieja.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'Se fue en medio de un paro largo que nadie le pagó. Perdiste algo que todavía no sabías nombrar.', efectos: { felicidad: -6 } },
    crit12: { texto: 'Décadas más tarde la cruzaste y se acordaba de tu nombre. Hay Estados que fallan y maestras que no.', efectos: { felicidad: 10 } }
  },

  {
    id: 'figuritas', etapa: 'ninez', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El álbum de figuritas',
    intro: 'Salió el álbum del Mundial. La difícil no aparece ni en los kioscos del centro.',
    dc: 6,
    exito: { texto: 'La conseguiste por canje: tres repetidas y un caramelo. Tu primera operación de mercado.', efectos: { felicidad: 6 }, set: {} },
    fallo: { texto: 'El álbum quedó a doce figuritas. Como el país: siempre a punto de completarse.', efectos: { felicidad: -3 }, set: {} },
    crit1: { texto: 'Cuando juntaste la plata para los paquetes, aumentaron. Tu primera clase de macroeconomía aplicada.', efectos: { felicidad: -5, plata: -3 } },
    crit12: { texto: 'Lo llenaste. LLENO. En el barrio te lo pedían para verlo como si fuera la Copa misma.', efectos: { felicidad: 10 } }
  },

  // ── ADOLESCENCIA (12-17) ────────────────────────────────────────

  {
    id: 'secundaria', etapa: 'adolescencia', peso: 12,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El secundario',
    intro: 'Arranca el secundario. Entre el laburo de tus viejos y las cuentas de casa, la cosa se complica.',
    dc: 7,
    exito: { texto: 'Terminaste el secundario. En tu familia no era poca cosa; en el país tampoco.', efectos: { felicidad: 10, plata: 5 }, set: { educacion: 'secundaria' } },
    fallo: { texto: 'Dejaste en tercer año para ayudar en casa. Los números no cerraban y vos sí sabías sumar.', efectos: { felicidad: -5 }, set: {} },
    crit1: { texto: 'Te fuiste del colegio un día de paro y no volviste más. Nadie llamó para preguntar.', efectos: { felicidad: -8 } },
    crit12: { texto: 'Mejor promedio de la promoción. La preceptora, que no sonreía desde hacía dos décadas, te aplaudió.', efectos: { felicidad: 14, plata: 5 }, set: { educacion: 'secundaria' } }
  },

  {
    id: 'primer-laburo-negro', etapa: 'adolescencia', peso: 9,
    cond: { claseIn: ['humilde', 'trabajadora', 'media'], regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Primer laburo, en negro',
    intro: 'En el corralón necesitan una mano los sábados. Pagan en mano, obvio: acá los recibos son de otra clase social.',
    dc: 6,
    exito: { texto: 'Primer sueldo en el bolsillo. Le compraste algo a tu vieja y te sentiste Rockefeller de barrio.', efectos: { plata: 8, felicidad: 6 }, set: { laburo: 'en negro' } },
    fallo: { texto: 'Te pagaron la mitad "por ahora". El "ahora" sigue corriendo.', efectos: { plata: 2, felicidad: -4 }, set: {} },
    crit1: { texto: 'Un mes de changas y el tipo desapareció con la plata. Primer empleador, primera estafa: todo en regla.', efectos: { plata: -5, felicidad: -6 } },
    crit12: { texto: 'Resultaste tan bueno que te pelean los comercios de la cuadra. En negro, eso sí: la formalidad es un rumor.', efectos: { plata: 10, felicidad: 6 }, set: { laburo: 'en negro' } }
  },

  {
    id: 'primer-amor', etapa: 'adolescencia', peso: 9,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Primer amor',
    intro: 'Alguien te sonríe distinto en la puerta del colegio. El corazón te late en pesos y en dólares.',
    dc: 6,
    exito: { texto: 'Noviazgo de plaza, mano sudada y helado de un kilo compartido. El PBI no registra estas riquezas.', efectos: { felicidad: 10 }, set: {} },
    fallo: { texto: 'Te dijeron "mejor amigos". La primera devaluación sentimental duele como todas las que vendrán.', efectos: { felicidad: -6 }, set: {} },
    crit1: { texto: 'Te dejaron por el del kiosco, que tenía moto. Perdiste contra el crédito prendario.', efectos: { felicidad: -8 } },
    crit12: { texto: 'El amor fue mutuo, simultáneo y sin inflación. No se repite; se atesora.', efectos: { felicidad: 14 } }
  },

  {
    id: 'el-boliche', etapa: 'adolescencia', peso: 7,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El boliche',
    intro: 'Sábado a la noche. Cumbia o rock según la era, patovica según el humor.',
    dc: 6,
    exito: { texto: 'Entraste, bailaste, volviste caminando al amanecer con los ojos brillantes. La juventud amortiza sola.', efectos: { felicidad: 8 }, set: {} },
    fallo: { texto: 'El patovica te bajó el pulgar sin explicar nada. Como el FMI, pero con musculosa.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'Te quedaste afuera y encima perdiste la campera nueva. Noche de pérdidas no recuperables.', efectos: { felicidad: -6, plata: -4 } },
    crit12: { texto: 'Fuiste la figura de la pista. Décadas después, en el barrio todavía se comenta.', efectos: { felicidad: 12 } }
  },

  {
    id: 'tecnica-o-comercial', etapa: 'adolescencia', peso: 7,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Técnica o comercial',
    intro: 'Hay que elegir orientación: el torno o la teneduría de libros. Los dos prometen futuro; el futuro no promete nada.',
    dc: 6,
    exito: { texto: 'Elegiste bien para tu barrio y tu época. Un oficio en la mano vale más que mil promesas de campaña.', efectos: { felicidad: 5, plata: 4 }, set: {} },
    fallo: { texto: 'Tu orientación dejó de tener salida laboral justo cuando saliste. Sincronía nacional.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'Cerraron el taller de la escuela por falta de presupuesto. Aprendiste tornería teórica, un clásico argentino.', efectos: { felicidad: -6 } },
    crit12: { texto: 'Mejor promedio del taller y un oficio de verdad. Las manos ya saben lo que el país olvida.', efectos: { felicidad: 8, plata: 6 } }
  },

  {
    id: 'la-rateada', etapa: 'adolescencia', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La rateada',
    intro: 'Todo quinto año falta hoy. El plan: la plaza, el río o el centro. La logística es impecable; la coartada, no.',
    dc: 6,
    exito: { texto: 'Salió perfecta. Un día robado al calendario que vale más que un feriado puente.', efectos: { felicidad: 8 }, set: {} },
    fallo: { texto: 'Tu vieja se enteró antes de que llegaras a la esquina. El servicio de inteligencia barrial nunca falla.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'Justo ese día cayó la supervisión y figuraste ausente en tres actas. Burocracia: 1, vos: 0.', efectos: { felicidad: -6 } },
    crit12: { texto: 'La rateada masiva salió tan bien que quedó en la mitología del colegio. Fuiste parte de la historia grande.', efectos: { felicidad: 10 } }
  },

  {
    id: 'banda-de-rock', etapa: 'adolescencia', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 1966, anioMax: null },
    titulo: 'La banda de rock',
    intro: 'Guitarra criolla con micrófono adentro, batería de balde. El garaje de tu amigo suena a estadio, para ustedes.',
    dc: 7,
    exito: { texto: 'Tocaron en el acto del colegio y no los abuchearon. En este país, eso es un éxito rotundo.', efectos: { felicidad: 8 }, set: {} },
    fallo: { texto: 'La banda se separó por diferencias creativas: nadie tenía plata para el equipo.', efectos: { felicidad: -3 }, set: {} },
    crit1: { texto: 'Primer y último recital: se cortó la luz en el segundo tema. El Estado también programa fechas.', efectos: { felicidad: -5 } },
    crit12: { texto: 'Un tema propio que el barrio entero tarareó un verano. La gloria existe y a veces es gratis.', efectos: { felicidad: 12 } }
  },

  {
    id: 'banda-de-cumbia', etapa: 'adolescencia', peso: 6,
    cond: { claseIn: ['humilde', 'trabajadora'], regionIn: null, generoIn: null, anioMin: 1990, anioMax: null },
    titulo: 'La banda de cumbia',
    intro: 'Teclado prestado, güiro y un primo que canta. El baile del club los espera, si llegan con el equipo.',
    dc: 7,
    exito: { texto: 'Tocaron en el baile del club y la pista explotó. Cobraron poco, vivieron mucho.', efectos: { felicidad: 8, plata: 3 }, set: {} },
    fallo: { texto: 'El dueño del salón se quedó con la recaudación "para gastos". La industria musical, versión conurbano.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'Se afanaron el teclado del flete. La banda murió antes del primer hit; la leyenda, también.', efectos: { felicidad: -6, plata: -4 } },
    crit12: { texto: 'El tema que grabaron en un casete sonó en todas las bailantas de la zona. Un verano fueron eternos.', efectos: { felicidad: 12, plata: 4 } }
  },

  // ── JUVENTUD (18-29) ────────────────────────────────────────────

  {
    id: 'universidad', etapa: 'juventud', peso: 12,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La facultad',
    intro: 'La universidad pública es gratuita. Lo que no es gratis: los apuntes, el bondi y las horas que no laburás.',
    dc: 9, // solo ~12% de los pibes humildes llega: con -3 de clase necesitan un 12 natural
    exito: { texto: 'Te recibiste. Primera generación de graduados, dice tu vieja a quien quiera oírla, y a quien no también.', efectos: { plata: 10, felicidad: 15 }, set: { educacion: 'universitaria', laburo: 'profesional' } },
    fallo: { texto: 'Entre el laburo y las cursadas, la facultad quedó para "el año que viene". Hay años que nunca vienen.', efectos: { felicidad: -8 }, set: {} },
    crit1: { texto: 'Ibas bien hasta que la crisis de turno te comió las horas. El mérito existe, pero cotiza en dólares.', efectos: { felicidad: -10 } },
    crit12: { texto: 'Diploma de honor y la foto en el pasillo de tu casa para siempre. Le ganaste a la estadística, que acá es ganarle a todo.', efectos: { plata: 12, felicidad: 18 }, set: { educacion: 'universitaria', laburo: 'profesional' } }
  },

  {
    id: 'el-oficio', etapa: 'juventud', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El oficio',
    intro: 'Un terciario corto o un oficio de los de antes: electricidad, enfermería, corte y confección.',
    dc: 6,
    exito: { texto: 'Título terciario en mano. Nadie te regaló nada, cosa que acá es casi una tradición.', efectos: { plata: 8, felicidad: 8 }, set: { educacion: 'terciaria' } },
    fallo: { texto: 'El instituto cerró a mitad de cursada. Te quedó medio oficio, que es como medio paraguas.', efectos: { felicidad: -5 }, set: {} },
    crit1: { texto: 'Pagaste tres cuotas por adelantado y el instituto se fundió. Fuiste alumno y acreedor a la vez.', efectos: { plata: -8, felicidad: -6 } },
    crit12: { texto: 'Terminaste primero y con clientela propia antes de recibirte. El boca a boca es la única institución que funciona.', efectos: { plata: 10, felicidad: 10 }, set: { educacion: 'terciaria' } }
  },

  {
    id: 'mudanza-capital', etapa: 'juventud', peso: 7,
    cond: { claseIn: null, regionIn: ['Pampeana', 'Cuyo', 'NOA', 'NEA', 'Patagonia'], generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Probar suerte en la Capital',
    intro: 'En el pueblo no hay futuro, dicen. En Buenos Aires tampoco, pero al menos hay más gente esperándolo.',
    dc: 7,
    exito: { texto: 'Conseguiste pensión y laburo en un mes. La Capital no te abrazó, pero te dejó pasar.', efectos: { plata: 8, felicidad: 4 }, set: {} },
    fallo: { texto: 'Volviste a los seis meses con lo puesto. Buenos Aires es hermosa, cara y ajena.', efectos: { plata: -6, felicidad: -5 }, set: {} },
    crit1: { texto: 'Te comieron los vivos apenas bajaste en Retiro. La bienvenida porteña clásica.', efectos: { plata: -10, felicidad: -6 } },
    crit12: { texto: 'En un año tenías laburo, pieza propia y hasta cuadro de fútbol nuevo. Al pueblo volvés de visita, triunfante.', efectos: { plata: 10, felicidad: 8 } }
  },

  {
    id: 'laburo-blanco-o-negro', etapa: 'juventud', peso: 11,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Blanco o negro',
    intro: 'Buscás laburo en serio. La mitad del país trabaja en blanco; la otra mitad también trabaja, pero no figura.',
    dc: 7, // ~50/50 antes de mods: la informalidad real
    exito: { texto: 'Recibo de sueldo, obra social, aguinaldo. Sos formal: en Argentina, casi una pieza de museo.', efectos: { plata: 12, felicidad: 8 }, set: { laburo: 'empleado formal' } },
    fallo: { texto: 'Laburo hay, recibo no. Todo en mano, todo "por ahora", todo hace diez años.', efectos: { plata: 5, felicidad: -4 }, set: { laburo: 'en negro' } },
    crit1: { texto: 'Te prometieron efectivizarte seis veces en tres años. La séptima te fuiste; la promesa sigue vacante.', efectos: { plata: -4, felicidad: -8 }, set: { laburo: 'en negro' } },
    crit12: { texto: 'Empleo formal, y encima en algo que te gusta. Comprá un billete de lotería hoy mismo.', efectos: { plata: 14, felicidad: 10 }, set: { laburo: 'empleado formal' } }
  },

  {
    id: 'la-pareja', etapa: 'juventud', peso: 10,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La pareja',
    intro: 'Apareció alguien con quien el mundo pesa menos. Ni la inflación arruina algunas cosas.',
    dc: 6,
    exito: { texto: 'Se pusieron de novios en serio. Hacer planes a largo plazo acá es un acto de fe: se llama amor.', efectos: { felicidad: 12 }, set: { pareja: true } },
    fallo: { texto: 'No prosperó. Quedó la costumbre de esperar un llamado que ya no llega.', efectos: { felicidad: -5 }, set: {} },
    crit1: { texto: 'Te enteraste por terceros de que ya no estaban de novios. La comunicación institucional, un clásico.', efectos: { felicidad: -8 } },
    crit12: { texto: 'Amor del bueno, del que empuja. Con esa sociedad, cualquier crisis se reparte mejor.', efectos: { felicidad: 18 }, set: { pareja: true } }
  },

  {
    id: 'alquiler-eterno', etapa: 'juventud', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El alquiler',
    intro: 'Dos meses de depósito, garantía propietaria y un dueño que "prefiere dólares". Bienvenido al mercado inmobiliario.',
    dc: 7,
    exito: { texto: 'Un dos ambientes con balcón a un pulmón de manzana. Es chico, es caro, es tuyo hasta que aumente.', efectos: { plata: -5, felicidad: 8 }, set: {} },
    fallo: { texto: 'Sin garantía no hay contrato. Volviste a lo de tus viejos con las cajas sin desarmar.', efectos: { felicidad: -6 }, set: {} },
    crit1: { texto: 'El dueño duplicó "porque el dólar". Tres mudanzas en dos años: coleccionás llaves que ya no abren nada.', efectos: { plata: -10, felicidad: -8 } },
    crit12: { texto: 'Un dueño que no aumenta y arregla las canillas. Existe. Lo viste. Nadie te cree.', efectos: { plata: 5, felicidad: 10 } }
  },

  {
    id: 'el-kiosco', etapa: 'juventud', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El kiosco propio',
    intro: 'Con un ahorrito y una ventana a la calle, cualquier casa argentina puede ser un comercio.',
    dc: 7,
    exito: { texto: 'El kiosco arrancó. Vendés de todo, fiado incluido: sos el banco central del barrio, pero con clientes agradecidos.', efectos: { plata: 10, felicidad: 6 }, set: { laburo: 'comerciante' } },
    fallo: { texto: 'Entre el fiado y los aumentos de los proveedores, el kiosco duró un invierno. La ventana volvió a ser ventana.', efectos: { plata: -6, felicidad: -4 }, set: {} },
    crit1: { texto: 'Abrieron un supermercado a media cuadra la misma semana. El timing: lo único que acá funciona, y en tu contra.', efectos: { plata: -10, felicidad: -6 } },
    crit12: { texto: 'De kiosco a despensa, de despensa a autoservicio. El barrio te dice "don" o "doña": llegaste.', efectos: { plata: 14, felicidad: 8 }, set: { laburo: 'comerciante' } }
  },

  {
    id: 'el-remis', etapa: 'juventud', peso: 6,
    cond: { claseIn: ['humilde', 'trabajadora'], regionIn: null, generoIn: null, anioMin: 1990, anioMax: null },
    titulo: 'El remis',
    intro: 'Un auto usado, un trapo rejilla y una radio: ya sos remisero. La agencia se queda con un toque, obvio.',
    dc: 6,
    exito: { texto: 'Doce horas al volante, pero la recaudación entra todos los días. El tablero es tu oficina.', efectos: { plata: 8, felicidad: 3 }, set: { laburo: 'remisero' } },
    fallo: { texto: 'La tarifa no siguió a la nafta. Laburás para el surtidor, que ni te saluda.', efectos: { plata: -4, felicidad: -4 }, set: { laburo: 'remisero' } },
    crit1: { texto: 'Fundiste el motor en un viaje a Ezeiza que encima te pagaron con un billete dudoso. Jornada redonda.', efectos: { plata: -10, felicidad: -6 } },
    crit12: { texto: 'Te hiciste una clientela fija que te pide "de confianza". En este país, ser confiable es un patrimonio.', efectos: { plata: 10, felicidad: 6 }, set: { laburo: 'remisero' } }
  },

  {
    id: 'futbol-de-los-jueves', etapa: 'juventud', peso: 5,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El fútbol de los jueves',
    intro: 'Cinco contra cinco en cancha de cemento. Lo único estable del país es este partido.',
    dc: 5,
    exito: { texto: 'Metiste dos goles y el tercer tiempo fue de campeonato. La felicidad, a veces, es una birra compartida.', efectos: { felicidad: 8, salud: 3 }, set: {} },
    fallo: { texto: 'Perdiste 8 a 2 y encima pagaste la cancha. Doble ajuste, cero coparticipación.', efectos: { felicidad: -3, plata: -2 }, set: {} },
    crit1: { texto: 'Te rompiste los ligamentos un jueves cualquiera. Seis meses mirando desde afuera, como a la economía.', efectos: { salud: -10, felicidad: -6 } },
    crit12: { texto: 'Hat-trick, victoria y elegido el mejor de la cancha. Hay jueves que valen un semestre.', efectos: { felicidad: 10, salud: 3 } }
  },

  // ── ADULTEZ (30-44) ─────────────────────────────────────────────

  {
    id: 'techo-propio-viejo', etapa: 'adultez', peso: 12,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: 1999 },
    titulo: 'El techo propio',
    intro: 'Un terrenito, ladrillos de a poco y los fines de semana con la cuchara de albañil. La casa propia todavía es un plan posible.',
    dc: 4, // ~73% de vivienda propia en la era vieja
    exito: { texto: 'Techo propio. Tardó años de domingos, pero abajo de estas chapas no manda ningún dueño.', efectos: { plata: 10, felicidad: 15 }, set: { techoPropio: true } },
    fallo: { texto: 'El terreno quedó en el papeleo o la plata en la inflación. Seguís alquilando futuro.', efectos: { felicidad: -8 }, set: {} },
    crit1: { texto: 'Habías juntado para los materiales y el plan económico de turno te licuó todo. La casa quedó en maqueta mental.', efectos: { plata: -12, felicidad: -10 } },
    crit12: { texto: 'Casa propia con parrilla y limonero. El sueño argentino completo; la hamaca paraguaya ya está comprada.', efectos: { plata: 12, felicidad: 20 }, set: { techoPropio: true } }
  },

  {
    id: 'techo-propio-moderno', etapa: 'adultez', peso: 12,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 2000, anioMax: null },
    titulo: 'El techo propio',
    intro: 'Comprar sin crédito es imposible y con crédito también. Pero en este país el ladrillo es religión.',
    dc: 6, // ~65% y bajando: cada década cuesta más
    exito: { texto: 'Escrituraste. Nadie sabe cómo hiciste; vos tampoco, pero el techo es tuyo.', efectos: { plata: 8, felicidad: 15 }, set: { techoPropio: true } },
    fallo: { texto: 'Entre el dólar y los requisitos del banco, seguís alquilando. El techo propio quedó para el próximo gobierno, como todo.', efectos: { felicidad: -8 }, set: {} },
    crit1: { texto: 'Firmaste un crédito atado a un índice que se disparó. La cuota te persigue como un acreedor con tu foto.', efectos: { plata: -14, felicidad: -10 } },
    crit12: { texto: 'Terreno, planos y una casa que crece con cada aguinaldo. Contra toda macroeconomía, la levantaste.', efectos: { plata: 10, felicidad: 18 }, set: { techoPropio: true } }
  },

  {
    id: 'hijos-familia-grande', etapa: 'adultez', peso: 11,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: 1989 },
    titulo: 'Los pibes',
    intro: 'En esta época las familias vienen numerosas. La mesa se agranda con tablones.',
    dc: 4, // TGF alta: lo raro es que no lleguen
    exito: { texto: 'Llegaron los hijos, de a varios. La casa quedó chica y el corazón al revés.', efectos: { felicidad: 12, plata: -8 }, set: { hijosDelta: 3 } },
    fallo: { texto: 'Los hijos no llegaron, o no todavía. La vida a veces reparte otras cartas.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'El primero llegó justo con la crisis de turno. Amor infinito, changas dobles.', efectos: { felicidad: 8, plata: -12 }, set: { hijosDelta: 1 } },
    crit12: { texto: 'Familia numerosa y mesa de tablones los domingos. Pobres de plata tal vez; de mesa, nunca.', efectos: { felicidad: 18, plata: -10 }, set: { hijosDelta: 4 } }
  },

  {
    id: 'hijos-planificados', etapa: 'adultez', peso: 11,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 1990, anioMax: null },
    titulo: 'Los pibes',
    intro: 'Los hijos ahora se planifican con calculadora: cuánto sale el jardín, cuánto las zapatillas, cuánto el futuro.',
    dc: 6, // TGF en baja: 3.1 en 1970 → 1.36 en 2023
    exito: { texto: 'Llegó tu primer hijo. Las cuentas no cerraban y no cerraron nunca, pero mirá esa cara.', efectos: { felicidad: 12, plata: -8 }, set: { hijosDelta: 1 } },
    fallo: { texto: 'Los hijos quedaron "para cuando la cosa mejore". La cosa, como el superávit, sigue sin llegar.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'Se pospuso tanto que el tema se cerró solo. Quedó una piecita pintada que ahora es "el escritorio".', efectos: { felicidad: -8 } },
    crit12: { texto: 'Contra todo pronóstico financiero, la familia creció. El PBI per cápita del hogar bajó; la felicidad, no.', efectos: { felicidad: 15, plata: -8 }, set: { hijosDelta: 2 } }
  },

  {
    id: 'monotributo', etapa: 'adultez', peso: 10,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 1998, anioMax: null },
    titulo: 'El monotributo',
    intro: 'A esta altura sos "trabajador independiente", que es como decir que dependés de todos menos de un sueldo.',
    dc: 7,
    exito: { texto: 'Conseguiste estabilidad: contrato, aportes, vacaciones pagas. Guardá ese recibo enmarcado.', efectos: { plata: 10, felicidad: 8 }, set: { laburo: 'empleado estable' } },
    fallo: { texto: 'Monotributista eterno. Facturás, recategorizás, rezás. La AFIP te escribe más que tu familia.', efectos: { plata: 4, felicidad: -4 }, set: { laburo: 'monotributista eterno' } },
    crit1: { texto: 'Te "reestructuraron" y volviste a facturar como cuando empezaste, pero con más años y menos paciencia.', efectos: { plata: -8, felicidad: -8 }, set: { laburo: 'monotributista eterno' } },
    crit12: { texto: 'Estabilidad, buen sueldo y un jefe razonable. Tres milagros juntos: andá a Luján a agradecer.', efectos: { plata: 14, felicidad: 10 }, set: { laburo: 'empleado estable' } }
  },

  {
    id: 'laburo-estable-viejo', etapa: 'adultez', peso: 10,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: 1997 },
    titulo: 'El puesto fijo',
    intro: 'Se abre un puesto efectivo: fábrica, banco o el Estado. Entrar es como escriturar, pero con sueldo.',
    dc: 6,
    exito: { texto: 'Quedaste efectivo. Aguinaldo, vacaciones y sindicato: tu vieja por fin duerme tranquila.', efectos: { plata: 10, felicidad: 8 }, set: { laburo: 'empleado estable' } },
    fallo: { texto: 'El puesto se lo dieron al sobrino de alguien. Seguís a prueba, categoría que acá puede durar décadas.', efectos: { felicidad: -5 }, set: {} },
    crit1: { texto: 'La fábrica cerró el año que entraste. La reconversión industrial te reconvirtió a las changas.', efectos: { plata: -10, felicidad: -8 }, set: { laburo: 'changas' } },
    crit12: { texto: 'Efectivo, escalafón y hasta obra social con odontólogo. La clase media te abre la puerta y te da la mano.', efectos: { plata: 14, felicidad: 10 }, set: { laburo: 'empleado estable' } }
  },

  {
    id: 'auto-usado', etapa: 'adultez', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El auto usado',
    intro: 'Un auto con más dueños que la Casa de Gobierno, pero con los papeles al día. Casi.',
    dc: 6,
    exito: { texto: 'Anda. Gasta, pero anda. Los viajes a la costa ya se planifican con termo y mate.', efectos: { plata: -5, felicidad: 10 }, set: {} },
    fallo: { texto: 'La junta de tapa te saludó a los dos meses. El mecánico ya te tutea.', efectos: { plata: -8, felicidad: -4 }, set: {} },
    crit1: { texto: 'Resultó tener deuda de patente en tres provincias. Comprarlo fue lo más barato que tuvo.', efectos: { plata: -12, felicidad: -6 } },
    crit12: { texto: 'Salió un fierro noble: años y años sin abrir el capó. Le vas a terminar poniendo nombre, y está bien.', efectos: { felicidad: 12 } }
  },

  {
    id: 'la-separacion', etapa: 'adultez', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La separación',
    intro: 'Lo que era equipo ahora es inventario: quién se queda con qué, quién se queda con quién.',
    dc: 6,
    exito: { texto: 'Se separaron como gente grande, sin abogados a comisión. Duele igual, pero duele en paz.', efectos: { felicidad: -8 }, set: {} },
    fallo: { texto: 'Separación con juicio, heladera partida al medio y suegra de por medio. Perdieron todos menos los abogados.', efectos: { felicidad: -15, plata: -10 }, set: {} },
    crit1: { texto: 'Te fuiste con una valija y volviste a alquilar a los cuarenta y pico. El mercado inmobiliario no perdona ni a los corazones rotos.', efectos: { felicidad: -15, plata: -14 } },
    crit12: { texto: 'La crisis fue de pareja y la remontaron juntos. Sale más barato que dividir una casa y rinde más.', efectos: { felicidad: 10 } }
  },

  {
    id: 'club-de-los-pibes', etapa: 'adultez', peso: 7,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El club de los pibes',
    intro: 'Tus hijos arrancan en el baby del club. Ya sabés cómo termina: vos, la parrilla del bufet y los sábados hipotecados.',
    dc: 5,
    exito: { texto: 'Sábados de cancha, torta frita y tercer tiempo. La cuota se paga con rifas que comprás vos mismo.', efectos: { felicidad: 8, plata: -3 }, set: {} },
    fallo: { texto: 'El club quedó lejos o la cuota quedó grande. Los pibes juegan en la vereda, que no cobra pero tampoco tiene arcos.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'Te hicieron delegado de la categoría: organizás viajes, perseguís rifas y te putean los otros padres. Cargo público sin sueldo.', efectos: { felicidad: -6, plata: -4 } },
    crit12: { texto: 'Gol del tuyo en la final y vos llorando contra el alambrado. Nadie lo filmó; queda para siempre igual.', efectos: { felicidad: 14 } }
  },

  {
    id: 'las-24-cuotas', etapa: 'adultez', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Las 24 cuotas',
    intro: 'Una heladera nueva en 24 cuotas "fijas". En este país, la palabra fija es un género literario.',
    dc: 6,
    exito: { texto: 'La inflación te licuó las cuotas: la heladera terminó saliendo dos pizzas. Ganarle al sistema, versión criolla.', efectos: { plata: 6, felicidad: 6 }, set: {} },
    fallo: { texto: 'Las cuotas eran fijas pero tu sueldo también. Empate técnico que se siente a derrota.', efectos: { plata: -5, felicidad: -3 }, set: {} },
    crit1: { texto: 'La cuota estaba atada al dólar y el dólar hizo lo suyo: la cuota 9 valía más que la heladera. La devolviste con dolor.', efectos: { plata: -10, felicidad: -6 } },
    crit12: { texto: 'Compraste justo antes del salto del dólar. En el barrio te consultan como a un gurú de la City.', efectos: { plata: 8, felicidad: 8 } }
  },

  // ── MADUREZ (45-59) ─────────────────────────────────────────────

  {
    id: 'el-chequeo', etapa: 'madurez', peso: 11,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El chequeo',
    intro: 'Hace años que "te tenés que hacer ver". El turno en el hospital sale para dentro de cuatro meses; la prepaga, un riñón.',
    dc: 6, // los mods de clase acá son la diferencia entre prepaga y cola de madrugada
    exito: { texto: 'Saliste bien. El médico dijo "cuidate el colesterol" y vos escuchaste "estás hecho un pibe".', efectos: { salud: 8, felicidad: 5 }, set: {} },
    fallo: { texto: 'Aparecieron valores feos y un tratamiento largo. El cuerpo pasa factura y no acepta cuotas.', efectos: { salud: -12, plata: -8 }, set: {} },
    crit1: { texto: 'El diagnóstico llegó tarde porque el turno se pateó tres veces. Ahora cuesta más de lo que hubiera costado.', efectos: { salud: -18, felicidad: -8 } },
    crit12: { texto: 'Clínicamente impecable contra todo pronóstico y toda dieta. El asado, científicamente reivindicado.', efectos: { salud: 12, felicidad: 8 } }
  },

  {
    id: 'reestructuracion', etapa: 'madurez', peso: 10,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La reestructuración',
    intro: 'La empresa "se achica". A los cincuenta y pico, el mercado laboral te mira como a un electrodoméstico viejo.',
    dc: 7,
    exito: { texto: 'Zafaste del recorte, esta vez. Trabajás el doble para demostrar la mitad, pero el sueldo entra.', efectos: { plata: 5, felicidad: -3 }, set: {} },
    fallo: { texto: 'Telegrama. Indemnización en cuotas y un mercado que no contrata canas. Arrancan las changas de nuevo.', efectos: { plata: -15, felicidad: -12 }, set: { laburo: 'changas' } },
    crit1: { texto: 'La empresa quebró y la indemnización quedó en un juicio que van a heredar tus nietos.', efectos: { plata: -20, felicidad: -12 }, set: { laburo: 'changas' } },
    crit12: { texto: 'Retiro voluntario bien negociado justo antes del derrumbe. Timing suizo en cuerpo argentino.', efectos: { plata: 15, felicidad: 6 } }
  },

  {
    id: 'tus-viejos', etapa: 'madurez', peso: 9,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Tus viejos',
    intro: 'Ahora los turnos médicos que gestionás no son los tuyos. La rueda gira y te toca empujarla.',
    dc: 6,
    exito: { texto: 'Entre hermanos y vecinos se armó la red. Tus viejos envejecen en su casa, con sus plantas y su radio.', efectos: { felicidad: 5, plata: -5 }, set: {} },
    fallo: { texto: 'Te tocó a vos solo, como siempre le toca a alguien. Los miércoles son de PAMI; los sueños, de más adelante.', efectos: { felicidad: -8, plata: -8 }, set: {} },
    crit1: { texto: 'Entre la obra social que no cubre y los remedios que aumentan, la vejez ajena salió carísima. La pagaste sin dudar.', efectos: { plata: -15, felicidad: -5 } },
    crit12: { texto: 'Les regalaste años buenos: mate en la vereda, nietos los domingos. Eso no cotiza y vale todo.', efectos: { felicidad: 12, plata: -5 } }
  },

  {
    id: 'casita-del-fondo', etapa: 'madurez', peso: 7,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La casita del fondo',
    intro: 'Tu hijo mayor no llega ni al alquiler. El fondo de tu casa lo mira con ojos de terreno edificable.',
    dc: 6,
    exito: { texto: 'Se levantó la casita del fondo entre todos. La familia se amontona, pero no se desparrama.', efectos: { plata: -8, felicidad: 10 }, set: {} },
    fallo: { texto: 'No alcanzó ni para los cimientos. Tu hijo alquila lejos y la mesa de los domingos quedó más callada.', efectos: { felicidad: -6 }, set: {} },
    crit1: { texto: 'Empezaron la losa justo antes de la devaluación. Quedó la platea hecha: la usan de patio, con humor.', efectos: { plata: -10, felicidad: -4 } },
    crit12: { texto: 'Quedó tan linda que vale más que la casa de adelante. El conurbano crece para adentro, como el aguante.', efectos: { plata: 5, felicidad: 12 } }
  },

  {
    id: 'los-aportes', etapa: 'madurez', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Los aportes',
    intro: 'Vas a averiguar cuántos años de aportes tenés. ANSES te recibe con número, ticket y una fe renovada en el más allá.',
    dc: 6,
    exito: { texto: 'Los años en blanco figuran todos. Los de las changas no existen para el sistema, pero el sistema tampoco existió para vos.', efectos: { felicidad: 4 }, set: {} },
    fallo: { texto: 'Décadas de laburo, siete años de aportes. El resto fue en negro, que en ANSES se traduce como "nunca pasó".', efectos: { felicidad: -6 }, set: {} },
    crit1: { texto: 'Un empleador te descontó aportes diez años y no los depositó nunca. El expediente es tan gordo que tiene apodo.', efectos: { plata: -6, felicidad: -8 } },
    crit12: { texto: 'Milagro administrativo: figuran TODOS los años, hasta los que dudabas. Guardá esa constancia como una reliquia.', efectos: { felicidad: 10 } }
  },

  {
    id: 'los-de-siempre', etapa: 'madurez', peso: 7,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Los de siempre',
    intro: 'Los amigos del barrio, los del laburo viejo, los del club: cada tanto la vida los junta en un asado.',
    dc: 5,
    exito: { texto: 'El asado salió largo y la sobremesa más. Las mismas anécdotas de hace treinta años siguen rindiendo.', efectos: { felicidad: 10 }, set: {} },
    fallo: { texto: 'Cada uno en su quilombo: el asado se pospuso tantas veces que quedó en promesa. Como la estabilidad.', efectos: { felicidad: -4 }, set: {} },
    crit1: { texto: 'El grupo se desarmó entre mudanzas, distancias y una pelea por política. La grieta también come amistades.', efectos: { felicidad: -8 } },
    crit12: { texto: 'Treinta años después, la misma mesa, las mismas caras, más canas. Hay patrimonios que la inflación no toca.', efectos: { felicidad: 12 } }
  },

  // ── VEJEZ (60+) ─────────────────────────────────────────────────

  {
    id: 'la-jubilacion', etapa: 'vejez', peso: 12,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La jubilación',
    intro: 'Llega la edad. ANSES revisa tu vida entera en un mostrador: a ver qué figurás haber sido.',
    dc: 6,
    exito: { texto: 'Te jubilaste. La mínima, pero tuya: el día de cobro hay ravioles.', efectos: { plata: 5, felicidad: 8 }, set: { jubilado: true, laburo: 'jubilado' } },
    fallo: { texto: 'No llegás con los años de aporte. Moratoria, abogado, espera: te jubilás en cuotas, como todo acá.', efectos: { plata: -5, felicidad: -8 }, set: {} },
    crit1: { texto: 'El trámite se trabó en un expediente que nadie encuentra. Seguís laburando "mientras tanto", y el mientras tanto tiene tu edad.', efectos: { plata: -8, felicidad: -10 } },
    crit12: { texto: 'Jubilación completa al primer intento, sin moratoria ni abogado. Enmarcá la resolución: es pieza única.', efectos: { plata: 10, felicidad: 12 }, set: { jubilado: true, laburo: 'jubilado' } }
  },

  {
    id: 'pami', etapa: 'vejez', peso: 9,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 1971, anioMax: null },
    titulo: 'PAMI',
    intro: 'Carnet nuevo. La obra social de los jubilados: a veces funciona, y cuando funciona emociona.',
    dc: 6,
    exito: { texto: 'Médico de cabecera de los buenos y remedios con descuento que llegan. Tocá madera y no la sueltes.', efectos: { salud: 8, felicidad: 5 }, set: {} },
    fallo: { texto: 'El remedio de todos los meses entra y sale de la cobertura según el humor fiscal. Cuando sale, lo pagás vos.', efectos: { salud: -6, plata: -6 }, set: {} },
    crit1: { texto: 'Tres meses para el turno, seis para el estudio, y el estudio se venció antes del especialista. El círculo perfecto.', efectos: { salud: -10, felicidad: -6 } },
    crit12: { texto: 'Te operaron a tiempo, gratis y bien. La salud pública, cuando aparece, es lo más parecido que tenemos a un milagro laico.', efectos: { salud: 12, felicidad: 8 } }
  },

  {
    id: 'los-nietos', etapa: 'vejez', peso: 9,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'Los nietos',
    intro: 'Llegan los nietos, con hambre de historias y de milanesas. Vos tenés stock de las dos cosas.',
    dc: 4,
    exito: { texto: 'Los sábados son tuyos: plaza, milanesa y una moneda a escondidas de los padres. Sos el ministerio de la felicidad, sin presupuesto.', efectos: { felicidad: 15 }, set: {} },
    fallo: { texto: 'Los nietos viven lejos y crecen de visita en visita. Cada abrazo tiene fecha de vencimiento.', efectos: { felicidad: -5 }, set: {} },
    crit1: { texto: 'La familia se fue a probar suerte afuera y los nietos crecen en otro idioma. Las fotos llegan; los abrazos, cada tanto.', efectos: { felicidad: -10 } },
    crit12: { texto: 'Un nieto lleva tu nombre. Todo lo demás que hiciste en la vida compite por el segundo puesto.', efectos: { felicidad: 18 } }
  },

  {
    id: 'la-plaza', etapa: 'vejez', peso: 7,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'La plaza',
    intro: 'El banco de la plaza tiene tertulia fija: los de siempre, arreglando un país que no se deja.',
    dc: 4,
    exito: { texto: 'Sol de invierno, mate y un diario compartido. El gabinete de la plaza sesiona todos los días y no cobra dieta.', efectos: { felicidad: 8, salud: 3 }, set: {} },
    fallo: { texto: 'La rodilla y el frío te dejaron sin sesión. La plaza sigue sin vos, que es lo que más duele de las plazas.', efectos: { felicidad: -5, salud: -3 }, set: {} },
    crit1: { texto: 'Levantaron los bancos "por remodelación" y tardaron dos años. El Estado también te jubila de la vereda.', efectos: { felicidad: -7 } },
    crit12: { texto: 'Sos la referencia del barrio: consejos, memoria viva y un banco que ya tiene tu forma. Prócer sin estatua, por ahora.', efectos: { felicidad: 12 } }
  },

  {
    id: 'asado-de-los-domingos', etapa: 'vejez', peso: 8,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El asado de los domingos',
    intro: 'La parrilla es tuya desde hace cuarenta años. El precio de la carne es el índice económico que mejor entendés.',
    dc: 5,
    exito: { texto: 'Mesa llena, punto perfecto, discusión de fútbol y de política sin heridos. Un domingo campeón del mundo.', efectos: { felicidad: 12 }, set: {} },
    fallo: { texto: 'La carne está por las nubes: el asado mutó a pollo con carbón simbólico. El ritual sobrevive devaluado.', efectos: { felicidad: -4, plata: -3 }, set: {} },
    crit1: { texto: 'El asado se fue achicando hasta quedar en picada. Nadie lo dice, pero todos extrañan el humo.', efectos: { felicidad: -8 } },
    crit12: { texto: 'Toda la familia junta, hasta los que andan peleados. Tu asado logró lo que ningún gobierno: unidad nacional.', efectos: { felicidad: 15 } }
  },

  {
    id: 'centro-de-jubilados', etapa: 'vejez', peso: 6,
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    titulo: 'El centro de jubilados',
    intro: 'Té con facturas, lotería familiar y viajes en micro a las termas. La agenda social más activa de tu vida arranca ahora.',
    dc: 5,
    exito: { texto: 'Entre el coro, las bochas y el tango de los viernes, la semana quedó corta. La vejez vino con vida social incluida.', efectos: { felicidad: 10, salud: 3 }, set: {} },
    fallo: { texto: 'El centro cerró un tiempo por falta de subsidio. Los martes quedaron huérfanos.', efectos: { felicidad: -5 }, set: {} },
    crit1: { texto: 'Te eligieron tesorero. Ahora perseguís la cuota de cuarenta jubilados y rendís cuentas como un ministro, pero honesto.', efectos: { felicidad: -4 } },
    crit12: { texto: 'Ganaste el torneo de truco de la zona con tu compañero de siempre. Falta envido, truco y buenas noches.', efectos: { felicidad: 12 } }
  }
];

export const DECISIONES = [

  // Estudiar o laburar (adolescencia, clase baja)
  {
    id: 'estudiar-o-laburar', etapa: 'adolescencia',
    cond: { claseIn: ['humilde', 'trabajadora'], regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    unaVez: true,
    pregunta: '¿Seguís estudiando o entrás a laburar?',
    contexto: 'En casa la plata no alcanza y en el corralón buscan pibe. El colegio no paga; el corralón, algo.',
    opciones: [
      { texto: 'Sigo estudiando, aunque cueste', efectos: { plata: -8, felicidad: 5 }, set: {}, resultado: 'Elegiste el pizarrón con la heladera flaca. Apostaste a largo plazo en un país cortoplacista: se banca.' },
      { texto: 'Entro a laburar, la casa manda', efectos: { plata: 10, felicidad: -5 }, set: { laburo: 'en negro' }, resultado: 'A los quince ya parás la olla. Nadie te va a dar un diploma por esto, y es una injusticia.' }
    ]
  },

  // Colimba (varón, antes de 1994)
  {
    id: 'colimba', etapa: 'adolescencia',
    cond: { claseIn: ['humilde', 'trabajadora', 'media'], regionIn: null, generoIn: ['varon'], anioMin: null, anioMax: 1993 },
    unaVez: true,
    pregunta: 'Te toca la colimba.',
    contexto: 'Sorteo por los últimos números del documento. Un año de tu vida en manos del azar estatal, que ya te conoce.',
    opciones: [
      { texto: 'La hago y listo', efectos: { felicidad: -8, salud: -4 }, set: {}, resultado: 'Un año de baldear cuarteles, pelar papas y aprender a fumar. "La colimba te hace hombre", decían los que no la hicieron.' },
      { texto: 'Intento zafar en la revisación', efectos: { felicidad: 3 }, set: {}, resultado: 'Pie plano, un soplo dudoso, un número bajo: zafaste. El azar estatal, por una vez, jugó para vos.' }
    ]
  },

  {
    id: 'colimba-acomodo', etapa: 'adolescencia',
    cond: { claseIn: ['acomodada'], regionIn: null, generoIn: ['varon'], anioMin: null, anioMax: 1993 },
    unaVez: true,
    pregunta: 'Te toca la colimba.',
    contexto: 'Salió tu número. Tu viejo conoce a un coronel amigo de la familia: una llamada y quedás "afectado a tareas administrativas".',
    opciones: [
      { texto: 'Que llame al coronel', efectos: { felicidad: 5 }, set: {}, resultado: 'Hiciste la colimba en una oficina con estufa, cebándole mate a un suboficial. El acomodo: la institución argentina más eficiente.' },
      { texto: 'La hago como cualquiera', efectos: { felicidad: -6, salud: -4 }, set: {}, resultado: 'Un año de cuartel como todos. En tu familia no lo entendieron; en el cuartel, tampoco.' }
    ]
  },

  // Migrar en dictadura (76-83) — tono sobrio, sin chistes
  {
    id: 'migrar-dictadura', etapa: 'juventud',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 1976, anioMax: 1982 },
    unaVez: true,
    pregunta: '¿Te quedás o te vas?',
    contexto: 'Son años de plomo. Compañeros tuyos ya no están y nadie pregunta en voz alta. Hay un pasaje posible a México o a España.',
    opciones: [
      { texto: 'Me voy al exilio', efectos: { felicidad: -12, plata: -5 }, set: { exilio: 'México' }, resultado: 'Saliste con lo puesto y el corazón apretado. El exilio salva la vida y parte la historia en dos.' },
      { texto: 'Me quedo', efectos: { felicidad: -8, salud: -5 }, set: {}, resultado: 'Te quedaste, con miedo y en silencio, como tantos. Esos años dejaron marcas que no se cuentan enteras.' }
    ]
  },

  // Migrar 2001-2003
  {
    id: 'migrar-2001', etapa: 'juventud',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 2001, anioMax: 2003 },
    unaVez: true,
    pregunta: '¿Te vas o te quedás?',
    contexto: 'Tu primo desde Barcelona te dice que allá "está todo bien". Acá no hay laburo ni para el que madruga.',
    opciones: [
      { texto: 'Me voy a España', efectos: { plata: 10, felicidad: -15 }, set: { exilio: 'España' }, resultado: 'Ezeiza, un bolso y la promesa de volver. Nunca se vuelve del todo.' },
      { texto: 'Me quedo, acá está mi gente', efectos: { felicidad: 5, plata: -10 }, set: {}, resultado: 'Te quedaste a remarla. Alguien tiene que apagar la luz... o no.' }
    ]
  },

  // Migrar 2018-2024
  {
    id: 'migrar-2018', etapa: 'juventud',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 2018, anioMax: 2024 },
    unaVez: true,
    pregunta: '¿Emigrás o aguantás?',
    contexto: 'Medio grupo de amigos ya está en Madrid y el otro medio junta para el pasaje. Tu sueldo, pasado a dólares, da risa. O llanto.',
    opciones: [
      { texto: 'Me voy a Madrid', efectos: { plata: 12, felicidad: -10 }, set: { exilio: 'España' }, resultado: 'Cobrás en euros y extrañás en pesos. Los asados por videollamada son un género del duelo.' },
      { texto: 'Me quedo a bancarla', efectos: { felicidad: 4, plata: -8 }, set: {}, resultado: 'Te quedaste, entre la bronca y el arraigo. Alguien tiene que cebar los mates, y esta vez sos vos.' }
    ]
  },

  // Ahorros — variantes por época con resultados ya calculados
  // (el motor no sabe de crisis: el desenlace va cocinado en los efectos)
  {
    id: 'ahorros-viejos', etapa: 'adultez',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: 1974 },
    unaVez: true,
    pregunta: '¿Dónde ponés los ahorros?',
    contexto: 'Guardaste unos pesos. Todavía hay quien cree en la moneda nacional; vos decidís si sos de esos.',
    opciones: [
      { texto: 'En el banco, a interés', efectos: { plata: -6, felicidad: -3 }, set: {}, resultado: 'El interés existía; la inflación, más. Los pesos se achicaron con elegancia, sin escándalo, como se perdía plata antes.' },
      { texto: 'Dólares, por las dudas', efectos: { plata: 8 }, set: {}, resultado: 'Todavía no era deporte nacional, pero vos ya la viste venir. Fundaste una tradición.' },
      { texto: 'Ladrillos: un lotecito', efectos: { plata: 8, felicidad: 4 }, set: {}, resultado: 'Un lote en las afueras. Con los años, las afueras se volvieron barrio y el lotecito, patrimonio.' }
    ]
  },

  {
    id: 'ahorros-hiper', etapa: 'adultez',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 1975, anioMax: 1990 },
    unaVez: true,
    pregunta: '¿Dónde ponés los ahorros?',
    contexto: 'Juntaste un dinerito. En la tele un ministro pide confianza, que es exactamente el momento de desconfiar.',
    opciones: [
      { texto: 'Dólares abajo del colchón', efectos: { plata: 12 }, set: {}, resultado: 'El colchón rindió más que cualquier banco. En este país el mueble más rentable es el sommier.' },
      { texto: 'Plazo fijo, como la gente seria', efectos: { plata: -15, felicidad: -8 }, set: {}, resultado: 'La tasa era fabulosa hasta que el plan de turno la hizo cenizas. "El que apuesta al dólar pierde", dijo el ministro. Perdió el que le creyó.' },
      { texto: 'Ladrillos: un terrenito', efectos: { plata: 8, felicidad: 5 }, set: {}, resultado: 'El terreno no paga interés pero tampoco se evapora. Lo que se atornilla al suelo, acá, sobrevive.' }
    ]
  },

  {
    id: 'ahorros-convertibilidad', etapa: 'adultez',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 1991, anioMax: 2001 },
    unaVez: true,
    pregunta: '¿Dónde ponés los ahorros?',
    contexto: 'Un peso, un dólar, dice el ministro por TV. Tan parejo que da sospecha.',
    opciones: [
      { texto: 'Dólares al colchón', efectos: { plata: 10 }, set: {}, resultado: 'Te miraron raro por desconfiado. En diciembre de 2001 te miraron distinto: te pedían consejos.' },
      { texto: 'Plazo fijo en dólares en el banco', efectos: { plata: -18, felicidad: -12 }, set: {}, resultado: 'Eran tus dólares hasta la "pesificación asimétrica". El corralito te explicó que, adentro del banco, tus ahorros son una opinión.' },
      { texto: 'Ladrillos', efectos: { plata: 8, felicidad: 4 }, set: {}, resultado: 'Compraste pared mientras otros compraban promesas bancarias. La pared no cotiza: por eso no se cae.' }
    ]
  },

  {
    id: 'ahorros-cepo', etapa: 'adultez',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: 2002, anioMax: 2026 },
    unaVez: true,
    pregunta: '¿Dónde ponés los ahorros?',
    contexto: 'Ahorrar en pesos es deporte extremo y comprar dólares, un trámite con muchos nombres: cepo, dólar ahorro, dólar tarjeta.',
    opciones: [
      { texto: 'Dólar blue al colchón', efectos: { plata: 10 }, set: {}, resultado: 'Comprarlos era medio ilegal; perder ahorros en pesos era legalísimo. El colchón nunca defrauda: no tiene directorio.' },
      { texto: 'Plazo fijo en pesos', efectos: { plata: -10, felicidad: -6 }, set: {}, resultado: 'La tasa perdió contra la inflación casi todos los meses. Le ganaste a la tentación del dólar y perdiste contra todo lo demás.' },
      { texto: 'Ladrillos, aunque sea de a poco', efectos: { plata: 6, felicidad: 4 }, set: {}, resultado: 'Una piecita más, una losa, un lote lejos. Lento como obra pública, pero tuyo como ninguna.' }
    ]
  },

  // Casarse joven o esperar
  {
    id: 'casarse-joven', etapa: 'juventud',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    unaVez: true,
    pregunta: '¿Se casan ya o esperan?',
    contexto: 'La relación va en serio. La familia pregunta "¿para cuándo?" en cada asado, que acá es una forma de presión fiscal.',
    opciones: [
      { texto: 'Nos casamos ya', efectos: { felicidad: 10, plata: -8 }, set: { pareja: true }, resultado: 'Fiesta en el club, tortas de las tías y deudas chicas. Arrancaron con nada, como arrancó todo el mundo acá.' },
      { texto: 'Esperamos a estar mejor', efectos: { felicidad: -3, plata: 5 }, set: {}, resultado: '"Estar mejor" en Argentina es un horizonte: camina con vos y nunca llega. Al menos se ahorraron el salón.' }
    ]
  },

  // Conurbano o pueblo (interior)
  {
    id: 'conurbano-o-pueblo', etapa: 'juventud',
    cond: { claseIn: null, regionIn: ['Pampeana', 'Cuyo', 'NOA', 'NEA', 'Patagonia'], generoIn: null, anioMin: null, anioMax: null },
    unaVez: true,
    pregunta: '¿Te vas a Buenos Aires o te quedás en el pueblo?',
    contexto: 'En el pueblo hay siesta, changa y todos saben tu apellido. En el Gran Buenos Aires dicen que hay laburo y, de paso, anonimato.',
    opciones: [
      { texto: 'Me voy al conurbano', efectos: { plata: 8, felicidad: -6 }, set: {}, resultado: 'Una pieza en Laferrere y dos horas de bondi al laburo. El progreso, visto desde el fondo del colectivo.' },
      { texto: 'Me quedo en el pueblo', efectos: { felicidad: 6, plata: -5 }, set: {}, resultado: 'Menos plata, más siesta, la vida entera a cinco cuadras. Hay riquezas que el INDEC no mide.' }
    ]
  },

  // La carrera o el pibe (mujer, época que empuja)
  {
    id: 'la-carrera-o-el-pibe', etapa: 'juventud',
    cond: { claseIn: null, regionIn: null, generoIn: ['mujer'], anioMin: null, anioMax: 1989 },
    unaVez: true,
    pregunta: '¿La carrera o la familia?',
    contexto: 'Estás por recibirte o por crecer en el laburo, y la época entera —suegra, cura y vecinas— opina que "ya es hora" de otra cosa.',
    opciones: [
      { texto: 'Sigo mi carrera, que esperen', efectos: { plata: 10, felicidad: 4 }, set: {}, resultado: 'Remaste contra la corriente de toda una época. Las que vinieron después te lo agradecen sin saber tu nombre.' },
      { texto: 'Postergo todo por la familia', efectos: { felicidad: 3, plata: -6 }, set: { pareja: true, hijosDelta: 1 }, resultado: 'Hiciste lo que la época esperaba de vos. Lo que hubieras sido quedó en un cajón, y cada tanto lo abrís.' }
    ]
  },

  // Emprender o empleo (adultez)
  {
    id: 'emprender-o-empleo', etapa: 'adultez',
    cond: { claseIn: null, regionIn: null, generoIn: null, anioMin: null, anioMax: null },
    unaVez: true,
    pregunta: '¿Te largás por tu cuenta?',
    contexto: 'Tenés un oficio, unos ahorros y un plan. También tenés un país que se comió más emprendedores que la timba.',
    opciones: [
      { texto: 'Me largo con lo mío', efectos: { plata: -8, felicidad: 8 }, set: { laburo: 'cuentapropista' }, resultado: 'Sos tu propio jefe y tu propio empleado explotado. Los primeros años se llora en factura C.' },
      { texto: 'Sigo en relación de dependencia', efectos: { plata: 4, felicidad: -4 }, set: {}, resultado: 'El sueldo seguro, si "seguro" significa algo acá. El plan quedó en un cuaderno que todavía guardás.' }
    ]
  }
];
