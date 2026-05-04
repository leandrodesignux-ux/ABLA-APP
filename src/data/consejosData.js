export const MICROCAPSULAS = [
  {
    id: 'deepfakes',
    titulo: 'IA como arma de acoso: Deepfakes',
    dato: 'El 14,2% de los casos de ciberbullying involucran IA para crear imágenes o videos falsos.',
    consejo: 'Educa a tu hijo/a sobre no compartir fotos de alta resolución en perfiles públicos. Las imágenes pueden ser manipuladas para crear relatos falsos.',
    accion: 'Revisar configuración de privacidad en redes sociales',
    icono: '🤖',
    perfil: ['apoderado', 'profesional'],
    color: '#7C3AED',
  },
  {
    id: 'hibrido',
    titulo: 'Acoso Híbrido: Presencial + Digital',
    dato: 'Los casos donde el acoso escolar se solapa con el ciberacoso se han duplicado en 2026.',
    consejo: 'Si detectas agresiones en el colegio, asume que el espacio digital también puede estar comprometido. Establece "zonas libres de pantallas" en el hogar.',
    accion: 'Hablar con el tutor sobre ambos contextos',
    icono: '🔄',
    perfil: ['apoderado', 'estudiante'],
    color: '#EA580C',
  },
  {
    id: 'testigo',
    titulo: 'El poder del testigo activo',
    dato: 'La intervención de un compañero testigo detiene la agresión en menos de 10 segundos en el 57% de los casos.',
    consejo: 'Reportar no es "ser un chivato", es ser un protector. Las apps de reporte anónimo permiten actuar sin miedo a represalias.',
    accion: 'Hacer un reporte anónimo',
    icono: '👁️',
    perfil: ['estudiante'],
    color: '#0891B2',
  },
  {
    id: 'trauma',
    titulo: 'El costo del silencio en salud mental',
    dato: 'El 40% de los niños víctimas muestran síntomas de estrés postraumático por más de 6 meses.',
    consejo: 'El bullying no es "preparación para la vida". Es un evento traumático que altera el desarrollo cerebral. Intervenir temprano previene depresión severa.',
    accion: 'Agendar cita con psicólogo',
    icono: '🧠',
    perfil: ['apoderado', 'profesional'],
    color: '#BE185D',
  },
]

export const RED_FLAGS_DATA = [
  { categoria: 'Físico', indicador: 'Somatización de Ansiedad', descripcion: 'Dolores de estómago o cabeza recurrentes, especialmente las mañanas escolares.', emoji: '🤢' },
  { categoria: 'Físico', indicador: 'Lesiones Inexplicables', descripcion: 'Moretones, cortes con explicaciones vagas o improbables.', emoji: '🩹' },
  { categoria: 'Físico', indicador: 'Cambios en Rutinas', descripcion: 'Alteraciones en apetito (pérdida o atracones) y sueño (insomnio, pesadillas).', emoji: '😴' },
  { categoria: 'Material', indicador: 'Pérdida de Bienes', descripcion: 'Ropa dañada, útiles rotos o pérdida frecuente de dinero sin explicación.', emoji: '🎒' },
  { categoria: 'Conductual', indicador: 'Fobia Escolar', descripcion: 'Resistencia a ir al colegio, fingir enfermedades o rutas alternativas.', emoji: '🏫' },
  { categoria: 'Conductual', indicador: 'Retraimiento Social', descripcion: 'Abandono de actividades favoritas y amigos sin causa aparente.', emoji: '🧍' },
  { categoria: 'Conductual', indicador: 'Descenso en Rendimiento', descripcion: 'Caída en calificaciones o desinterés total por tareas escolares.', emoji: '📉' },
  { categoria: 'Emocional', indicador: 'Baja Autoestima', descripcion: 'Comentarios despectivos sobre sí mismo o sentimientos de inutilidad.', emoji: '💔' },
  { categoria: 'Emocional', indicador: 'Tristeza Persistente', descripcion: 'Pérdida del brillo habitual, actitud distante o llanto sin motivo claro.', emoji: '😔' },
  { categoria: 'Digital', indicador: 'Ansiedad ante Notificaciones', descripcion: 'Reacciones de miedo al sonar el teléfono o recibir mensajes.', emoji: '📱' },
  { categoria: 'Digital', indicador: 'Secretismo Digital Extremo', descripcion: 'Cierre compulsivo de pantallas o eliminación repentina de redes sociales.', emoji: '🔐' },
  { categoria: 'Social', indicador: 'Aislamiento en el Centro', descripcion: 'Pasar el recreo solo, estar siempre cerca de profesores.', emoji: '👤' },
  { categoria: 'Grave', indicador: 'Señales de Autolesión', descripcion: '⚠️ Comentarios sobre "no querer estar aquí" o marcas físicas. Requiere intervención inmediata.', emoji: '🚨', urgente: true },
]

export const FRASES_APOYO = [
  { fase: 'Apertura', frase: 'Te creo. Gracias por confiar en mí para contarme esto.', proposito: 'Establece confianza y reduce vergüenza.' },
  { fase: 'Sin culpa', frase: 'Nada de lo que hiciste justifica que te traten así. No es tu culpa.', proposito: 'Combate el autodesprecio.' },
  { fase: 'Validación', frase: 'Es normal que te sientas así. Yo también me sentiría igual.', proposito: 'Valida la respuesta emocional.' },
  { fase: 'Seguridad', frase: 'Estamos juntos en esto. Mi trabajo es asegurarte que estés a salvo.', proposito: 'Restaura la figura de apoyo.' },
  { fase: 'Agencia', frase: '¿Cómo te gustaría que te ayude? Podemos decidir juntos los próximos pasos.', proposito: 'Devuelve el sentido de control.' },
]

export const FRASES_EVITAR = [
  'No les hagas caso',
  '¿Qué hiciste para provocarlos?',
  'Eso te hace más fuerte',
  'En mi época también era así',
  'No seas tan sensible',
]
