export const PROFESORES = [
  {
    id: 'prof-1',
    nombre: 'Ana García',
    rol: 'Psicóloga clínica',
    avatar: '/Avatars/psi-1.svg',
    dias: 'Lun / Mié / Vie',
    descripcion: 'Especialista en trauma infantil y crisis emocional.',
    especialidades: ['bullying-cyber', 'ansiedad', 'autolesion', 'violencia-fisica'],
  },
  {
    id: 'prof-2',
    nombre: 'Luis Muñoz',
    rol: 'Psicólogo educacional',
    avatar: '/Avatars/psi-2.svg',
    dias: 'Mar / Jue',
    descripcion: 'Especialista en NEE y convivencia escolar.',
    especialidades: ['acoso-verbal', 'bullying-cyber', 'exclusion', 'ansiedad'],
  },
  {
    id: 'prof-3',
    nombre: 'Carmen Silva',
    rol: 'Orientadora escolar',
    avatar: '/Avatars/psi-3.svg',
    dias: 'Lun a Vie',
    descripcion: 'Especialista en mediación y resolución de conflictos.',
    especialidades: ['acoso-verbal', 'exclusion', 'violencia-fisica', 'conflicto-puntual'],
  },
]

// Categorías de situación para la encuesta y para filtrar en HomeApoderado
export const CATEGORIAS_SITUACION = [
  { id: 'bullying-cyber', label: 'Ciberacoso', emoji: '📱' },
  { id: 'acoso-verbal', label: 'Acoso verbal', emoji: '💬' },
  { id: 'violencia-fisica', label: 'Violencia física', emoji: '🩹' },
  { id: 'exclusion', label: 'Exclusión social', emoji: '👤' },
  { id: 'ansiedad', label: 'Ansiedad', emoji: '😰' },
  { id: 'autolesion', label: 'Autolesión', emoji: '🚨' },
  { id: 'conflicto-puntual', label: 'Conflicto puntual', emoji: '⚡' },
]

// Datos de ratings precargados (para que el prototipo ya tenga valores visuales)
// Estructura: { [profesorId]: { [categoriaId]: { total: número, suma: número } } }
// El promedio se calcula como suma / total
export const RATINGS_INICIALES = {
  'prof-1': {
    'bullying-cyber': { total: 24, suma: 112 },
    'ansiedad': { total: 31, suma: 139 },
    'autolesion': { total: 18, suma: 87 },
    'violencia-fisica': { total: 15, suma: 66 },
  },
  'prof-2': {
    'acoso-verbal': { total: 22, suma: 96 },
    'bullying-cyber': { total: 19, suma: 80 },
    'exclusion': { total: 27, suma: 121 },
    'ansiedad': { total: 14, suma: 56 },
  },
  'prof-3': {
    'acoso-verbal': { total: 20, suma: 88 },
    'exclusion': { total: 33, suma: 152 },
    'violencia-fisica': { total: 16, suma: 67 },
    'conflicto-puntual': { total: 29, suma: 133 },
  },
}
