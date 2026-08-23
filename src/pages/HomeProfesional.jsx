import { AnimatePresence, motion } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SvgImage from '../components/SvgImage.jsx'
import { Toast } from '../components/Toast.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { NEE_TYPES } from '../data/neeTypes.js'
import StatusBlob from '../components/StatusBlob.jsx'

const PROFESIONALES_DERIVACION = [
  {
    id: 'p1',
    nombre: 'Psic. Ana García',
    rol: 'Psicóloga clínica',
    avatar: '/Avatars/psi-1.svg',
    especialidades: ['Violencia física', 'Cyberbullying', 'ansiedad', 'autolesion'],
    disponible: true,
    descripcion: 'Esp. en trauma infantil y crisis emocional',
  },
  {
    id: 'p2',
    nombre: 'Psic. Luis Muñoz',
    rol: 'Psicólogo educacional',
    avatar: '/Avatars/psi-2.svg',
    especialidades: ['Acoso verbal', 'Cyberbullying', 'tdah', 'autismo'],
    disponible: true,
    descripcion: 'Esp. en NEE y convivencia escolar',
  },
  {
    id: 'p3',
    nombre: 'Orient. Carmen Silva',
    rol: 'Orientadora escolar',
    avatar: '/Avatars/psi-3.svg',
    especialidades: ['Violencia física', 'Acoso verbal', 'Anonimo', 'Conflicto puntual'],
    disponible: false,
    descripcion: 'Esp. en mediación y resolución de conflictos',
  },
]

const mockCasos = [
  {
    id: 'c1',
    nombre: 'Estudiante A',
    nivel: 'critico',
    tipo: 'Violencia física',
    fecha: '2026-04-28',
    descripcion: 'Reportó agresiones repetidas en el patio. Tercer incidente este mes.',
    edad: 14,
    curso: '3°B',
    derivado: false,
    nee: 'ansiedad',
  },
  {
    id: 'c2',
    nombre: 'Estudiante B',
    nivel: 'critico',
    tipo: 'Cyberbullying',
    fecha: '2026-04-29',
    descripcion: 'Acoso sostenido por redes sociales. Comparte capturas como evidencia.',
    edad: 15,
    curso: '4°A',
    derivado: false,
  },
  {
    id: 'c3',
    nombre: 'Estudiante C',
    nivel: 'moderado',
    tipo: 'Acoso verbal',
    fecha: '2026-04-27',
    descripcion: 'Situación de exclusión social en el grupo. Sin incidentes físicos.',
    edad: 13,
    curso: '2°C',
    derivado: false,
    nee: 'tdah',
  },
  {
    id: 'c4',
    nombre: 'Estudiante D',
    nivel: 'moderado',
    tipo: 'Anonimo',
    fecha: '2026-04-26',
    descripcion: 'Reporte anónimo de situación en baños. Se investiga.',
    edad: null,
    curso: null,
    derivado: true,
  },
  {
    id: 'c5',
    nombre: 'Estudiante E',
    nivel: 'bajo',
    tipo: 'Conflicto puntual',
    fecha: '2026-04-25',
    descripcion: 'Discusión entre compañeros resuelta. En seguimiento preventivo.',
    edad: 14,
    curso: '3°A',
    derivado: true,
  },
]

const levelConfig = {
  critico: { dot: 'bg-red-500', badge: 'URGENTE', badgeClass: 'bg-red-50 text-red-700' },
  moderado: { dot: 'bg-amber-500', badge: 'MODERADO', badgeClass: 'bg-amber-50 text-amber-700' },
  bajo: { dot: 'bg-green-500', badge: 'SEGUIMIENTO', badgeClass: 'bg-green-50 text-green-700' },
}

const levelOrder = {
  critico: 0,
  moderado: 1,
  bajo: 2,
}

function CasoCard({ caso, onOpen }) {
  const config = levelConfig[caso.nivel]

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(caso)}
      className={`w-full rounded-abla-card border-l-4 bg-white p-5 text-left shadow-abla-card transition-shadow hover:shadow-abla-float ${caso.nivel === 'critico' ? 'border-l-red-500' : caso.nivel === 'moderado' ? 'border-l-amber-400' : 'border-l-abla-green'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <StatusBlob status={caso.nivel === 'critico' ? 'urgente' : caso.derivado ? 'derivado' : 'seguimiento'} label={config.badge} />
          </div>
          <div className="mt-2 text-[15px] font-bold text-slate-800">{caso.nombre}</div>
          {caso.nee && (() => {
            const neeType = NEE_TYPES.find((t) => t.id === caso.nee)
            return neeType ? (
              <div className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${neeType.color}`}>
                <span>{neeType.icon}</span>
                <span>{neeType.label}</span>
              </div>
            ) : null
          })()}
          <div className="mt-0.5 text-[12px] text-slate-500">
            {caso.tipo}{caso.curso ? ` · ${caso.curso}` : ''}
          </div>
        </div>
        <div className="shrink-0 text-[11px] text-slate-400">{caso.fecha}</div>
      </div>

      <div className="mt-2 line-clamp-2 text-[13px] leading-5 text-slate-600">{caso.descripcion}</div>

      <div className="mt-4 flex justify-end">
        {caso.derivado ? (
          <StatusBlob status="derivado" label="Derivado" className="text-[11px]" />
        ) : (
          <span className="rounded-abla-control bg-abla-blue px-4 py-2 text-[12px] font-bold text-white">Ver caso</span>
        )}
      </div>
    </motion.button>
  )
}

function DetailDrawer({ caso, onClose, onDerive, onChat }) {
  const navigate = useNavigate()
  const config = levelConfig[caso.nivel]
  const protocoloId =
    caso.tipo === 'Violencia física'
      ? 'violencia_fisica'
      : caso.tipo === 'Cyberbullying'
        ? 'cyberbullying'
        : caso.tipo.toLowerCase().includes('acoso')
          ? 'bullying'
          : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="mb-4 rounded-3xl bg-white p-4 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-bold text-abla-blue">Caso #{caso.id.toUpperCase()}</div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-abla-bg text-slate-500"
          aria-label="Cerrar caso"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3">
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${config.badgeClass}`}>{config.badge}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-left">
        <div>
          <div className="text-[11px] text-slate-400">Nombre</div>
          <div className="text-[13px] font-semibold text-slate-700">{caso.nombre}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Tipo</div>
          <div className="text-[13px] font-semibold text-slate-700">{caso.tipo}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Curso</div>
          <div className="text-[13px] font-semibold text-slate-700">{caso.curso || '—'}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Edad</div>
          <div className="text-[13px] font-semibold text-slate-700">{caso.edad || '—'}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Fecha</div>
          <div className="text-[13px] font-semibold text-slate-700">{caso.fecha}</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-abla-bg p-4 text-[13px] leading-5 text-slate-700">{caso.descripcion}</div>

      {caso.nee && (() => {
        const neeType = NEE_TYPES.find((t) => t.id === caso.nee)
        return neeType ? (
          <div className={`mt-4 rounded-xl border p-3 text-[12px] font-semibold ${neeType.color}`}>
            <div>{neeType.icon} Condición registrada: {neeType.label}</div>
            {neeType.protocoloId && (
              <button
                type="button"
                onClick={() => {
                  onClose()
                  setTimeout(() => navigate(`/protocolos/${neeType.protocoloId}`), 250)
                }}
                className="mt-2 text-[11px] font-semibold underline"
              >
                Ver protocolo específico →
              </button>
            )}
          </div>
        ) : null
      })()}

      <div className="mt-4 flex flex-col gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => onDerive(caso)}
          className="h-12 rounded-xl bg-abla-green text-[13px] font-bold text-white"
        >
          DERIVAR A PROFESIONAL
        </motion.button>
        {protocoloId && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              onClose()
              setTimeout(() => navigate(`/protocolos/${protocoloId}`), 250)
            }}
            className="h-12 rounded-xl border border-amber-400 bg-amber-50 text-[13px] font-bold text-amber-700"
          >
            📋 Ver protocolo para este caso
          </motion.button>
        )}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={onChat}
          className="h-12 rounded-xl border border-abla-blue bg-white text-[13px] font-bold text-abla-blue"
        >
          INICIAR CHAT
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function HomeProfesional() {
  const navigate = useNavigate()
  const { user, reglamentoLeido } = useAppContext()
  const [casos, setCasos] = useState(mockCasos)
  const [filtro, setFiltro] = useState('todos')
  const [selectedCaso, setSelectedCaso] = useState(null)
  const [toast, setToast] = useState('')
  const [derivarModal, setDerivarModal] = useState(null)
  const casosUrgentes = casos.filter((caso) => caso.nivel === 'critico' && !caso.derivado).length

  const casosFiltrados = useMemo(
    () =>
      casos
        .filter((c) => {
          if (filtro === 'urgentes') return c.nivel === 'critico'
          if (filtro === 'derivados') return c.derivado
          return true
        })
        .sort((a, b) => levelOrder[a.nivel] - levelOrder[b.nivel]),
    [casos, filtro],
  )

  const deriveCaso = (caso) => {
    setCasos((prev) => prev.map((c) => (c.id === caso.id ? { ...c, derivado: true } : c)))
    setSelectedCaso(null)
    setToast('Caso derivado correctamente')
    setTimeout(() => setToast(''), 2500)
  }

  const herramientas = [
    { label: 'Protocolos', icon: '🛡️', to: '/protocolos' },
    { label: 'Reglamento', icon: '📋', to: '/reglamento' },
    { label: 'FAQs', icon: '❓', to: '/faqs' },
  ]

  return (
    <PageTransition>
      <div className="min-h-dvh bg-abla-bg pb-24 text-slate-800 md:pb-12">
        <header className="bg-abla-green text-white">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-20 md:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => navigate('/perfil')}
              className="flex items-center gap-2"
              aria-label="Ir a perfil"
            >
              <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white/60 bg-white/10">
                <SvgImage src={user.avatar} alt="" className="h-full w-full object-cover" eager />
              </div>
              <div className="text-left text-[12px] leading-tight">
                <div className="text-white/80">Panel</div>
                <div className="font-semibold text-white">Profesional</div>
              </div>
            </button>

            <img
              src="/Logo/abla-logo.svg"
              alt="ABLA"
              className="h-7 w-auto brightness-0 invert"
              draggable="false"
            />

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={() => navigate('/chat/anonimo')}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white"
                aria-label="SOS"
              >
                SOS
              </motion.button>
              <button
                type="button"
                onClick={() => {}}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
                aria-label="Notificaciones"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between border-t border-white/10 bg-abla-green/90 px-4 md:px-6 lg:px-8">
            <div className="text-[14px] font-semibold">Panel Profesional</div>
            {casosUrgentes > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-1 text-[11px] font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>{casosUrgentes} urgente{casosUrgentes > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
          <section className="mt-6 grid gap-4 md:grid-cols-3">
            {[{ label: 'Casos activos', value: casos.filter((c) => !c.derivado).length, status: 'nuevo' }, { label: 'Requieren prioridad', value: casosUrgentes, status: 'urgente' }, { label: 'Derivados', value: casos.filter((c) => c.derivado).length, status: 'derivado' }].map((metric) => <div key={metric.label} className="rounded-abla-card bg-white p-5 shadow-abla-card"><div className="flex items-center justify-between"><StatusBlob status={metric.status} label={metric.label} /><span className="text-3xl font-black text-abla-blue">{metric.value}</span></div></div>)}
          </section>
          <button
            type="button"
            onClick={() => navigate('/reglamento')}
            className="mt-5 flex w-full items-center justify-between rounded-abla-control bg-white px-4 py-3 text-left shadow-abla-card"
          >
            <div className="text-[13px] font-semibold text-abla-blue">
              Reglamento interno
              {reglamentoLeido && (
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                  Leído
                </span>
              )}
            </div>
            <span className="text-slate-400">→</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/faqs')}
            className="mt-3 flex w-full items-center justify-between rounded-abla-control bg-white px-4 py-3 text-left shadow-abla-card"
          >
            <div className="text-[13px] font-semibold text-abla-blue">Preguntas frecuentes</div>
            <span className="text-slate-400">→</span>
          </button>

          <div className="mt-5 flex gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'urgentes', label: 'Urgentes' },
              { id: 'derivados', label: 'Derivados' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFiltro(tab.id)}
                className={`rounded-full px-4 py-2.5 text-[13px] font-bold transition-colors ${
                  filtro === tab.id ? 'bg-abla-green-soft text-abla-blue shadow-abla-card' : 'bg-white text-slate-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            {herramientas.map((h) => (
              <button
                key={h.label}
                type="button"
                onClick={() => navigate(h.to)}
                className="flex flex-1 flex-col items-center gap-1 rounded-abla-control bg-white py-3 shadow-abla-card transition-colors hover:bg-abla-blue-soft"
              >
                <span className="text-base">{h.icon}</span>
                <span className="text-[12px] font-semibold text-abla-blue">{h.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedCaso ? (
              <div className="mt-5">
                <DetailDrawer
                  key={selectedCaso.id}
                  caso={selectedCaso}
                  onClose={() => setSelectedCaso(null)}
                  onDerive={(caso) => {
                    setDerivarModal(caso)
                    setTimeout(() => setSelectedCaso(null), 50)
                  }}
                  onChat={() => {
                    navigate('/chat/tutor', {
                      state: {
                        profesorNombre: 'Tutor del establecimiento',
                        avatarSrc: '/Avatars/avatar-tutor.svg',
                        fromProfesional: true,
                      }
                    })
                    setTimeout(() => setSelectedCaso(null), 50)
                  }}
                />
              </div>
            ) : null}
          </AnimatePresence>

          <motion.div layout className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <AnimatePresence>
              {casosFiltrados.map((caso) => (
                <CasoCard key={caso.id} caso={caso} onOpen={setSelectedCaso} />
              ))}
            </AnimatePresence>
          </motion.div>
        </main>

        {derivarModal && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-4 md:items-center md:p-6"
            onClick={() => setDerivarModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[390px] rounded-3xl bg-white p-4 shadow-xl md:max-w-xl md:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-bold text-abla-blue">Derivar caso</div>
                <button
                  type="button"
                  onClick={() => setDerivarModal(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-abla-bg"
                  aria-label="Cerrar derivación"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>

              <div className="mt-2 text-[13px] text-slate-500">
                Selecciona el profesional para el caso de {derivarModal.nombre}
              </div>

              <div className="mt-4 max-h-[440px] overflow-y-auto">
                {(() => {
                  const caso = derivarModal
                  const recomendados = PROFESIONALES_DERIVACION.filter((p) =>
                    p.especialidades.some(
                      (e) =>
                        e === caso.tipo ||
                        e === caso.nee ||
                        caso.tipo.toLowerCase().includes(e.toLowerCase()),
                    ),
                  )
                  const otros = PROFESIONALES_DERIVACION.filter((p) => !recomendados.includes(p))

                  const ProfCard = ({ prof, highlight }) => (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => {
                        if (!prof.disponible) return
                        deriveCaso(caso)
                        setDerivarModal(null)
                      }}
                      className={`mb-3 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors ${
                        highlight
                          ? 'border-2 border-abla-green bg-green-50'
                          : 'border border-slate-200 bg-white'
                      } ${!prof.disponible ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <img src={prof.avatar} alt="" className="h-12 w-12 rounded-full object-cover" draggable="false" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-bold text-slate-800">{prof.nombre}</div>
                        <div className="text-[12px] font-semibold text-slate-500">{prof.rol}</div>
                        <div className="mt-0.5 text-[11px] text-slate-400">{prof.descripcion}</div>
                      </div>
                      <div className={`shrink-0 text-[10px] font-bold ${prof.disponible ? 'text-abla-green' : 'text-slate-400'}`}>
                        {prof.disponible ? '● Disponible' : '○ No disp.'}
                      </div>
                    </button>
                  )

                  return (
                    <>
                      {recomendados.length > 0 && (
                        <>
                          <div className="mb-2 text-[12px] font-bold text-abla-green">
                            ✓ Recomendados para este caso
                          </div>
                          {recomendados.map((p) => (
                            <ProfCard key={p.id} prof={p} highlight />
                          ))}
                        </>
                      )}
                      {otros.length > 0 && (
                        <>
                          <div className="mb-2 mt-3 text-[12px] font-bold text-slate-500">
                            Otros profesionales
                          </div>
                          {otros.map((p) => (
                            <ProfCard key={p.id} prof={p} />
                          ))}
                        </>
                      )}
                    </>
                  )
                })()}
              </div>
            </motion.div>
          </div>
        )}

        <BottomNav />
        <Toast message={toast} visible={Boolean(toast)} />
      </div>
    </PageTransition>
  )
}
