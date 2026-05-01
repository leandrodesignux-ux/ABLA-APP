import { AnimatePresence, motion } from 'framer-motion'
import { Bell, MessageCircle, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SvgImage from '../components/SvgImage.jsx'
import { useAppContext } from '../context/AppContext.jsx'

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
      className="w-full rounded-2xl bg-white p-4 text-left shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${config.dot}`} />
            <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${config.badgeClass}`}>
              {config.badge}
            </span>
          </div>
          <div className="mt-2 text-[15px] font-bold text-slate-800">{caso.nombre}</div>
          <div className="mt-0.5 text-[12px] text-slate-500">
            {caso.tipo}{caso.curso ? ` · ${caso.curso}` : ''}
          </div>
        </div>
        <div className="shrink-0 text-[11px] text-slate-400">{caso.fecha}</div>
      </div>

      <div className="mt-2 line-clamp-2 text-[13px] leading-5 text-slate-600">{caso.descripcion}</div>

      <div className="mt-4 flex justify-end">
        {caso.derivado ? (
          <span className="rounded-full bg-green-50 px-3 py-1.5 text-[12px] font-bold text-green-700">Derivado ✓</span>
        ) : (
          <span className="rounded-xl bg-abla-blue px-4 py-2 text-[12px] font-bold text-white">VER CASO</span>
        )}
      </div>
    </motion.button>
  )
}

function DetailDrawer({ caso, onClose, onDerive, onChat }) {
  const config = levelConfig[caso.nivel]

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

      <div className="mt-4 flex flex-col gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => onDerive(caso)}
          className="h-12 rounded-xl bg-abla-green text-[13px] font-bold text-white"
        >
          DERIVAR A PROFESIONAL
        </motion.button>
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
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg pb-24 text-slate-800">
        <header className="bg-abla-green text-white">
          <div className="flex h-14 items-center justify-between px-4">
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

          <div className="flex h-12 items-center border-t border-white/10 bg-abla-green/90 px-4">
            <div className="text-[14px] font-semibold">Panel Profesional</div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[390px] px-4">
          <button
            type="button"
            onClick={() => navigate('/reglamento')}
            className="mt-5 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-sm"
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
                className={`rounded-full px-4 py-2 text-[13px] font-bold ${
                  filtro === tab.id ? 'bg-abla-green text-white' : 'bg-white text-slate-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedCaso ? (
              <DetailDrawer
                key={selectedCaso.id}
                caso={selectedCaso}
                onClose={() => setSelectedCaso(null)}
                onDerive={deriveCaso}
                onChat={() => {
                  setSelectedCaso(null)
                  navigate('/chat/tutor')
                }}
              />
            ) : null}
          </AnimatePresence>

          <motion.div layout className="mt-4 flex flex-col gap-3">
            <AnimatePresence>
              {casosFiltrados.map((caso) => (
                <CasoCard key={caso.id} caso={caso} onOpen={setSelectedCaso} />
              ))}
            </AnimatePresence>
          </motion.div>
        </main>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
