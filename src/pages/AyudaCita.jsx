import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { PROFESORES } from '../data/profesoresData.js'

function calcularPromedio(profesorId, ratings) {
  const profRatings = ratings?.[profesorId] || {}
  let total = 0
  let suma = 0
  Object.values(profRatings).forEach((r) => {
    total += r.total
    suma += r.suma
  })
  return total > 0 ? { promedio: (suma / total).toFixed(1), total } : null
}

function ProCard({ name, role, avatarSrc, days, rating, onSchedule }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-abla-bg">
          <img src={avatarSrc} alt="" className="h-full w-full object-cover" draggable="false" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[16px] font-bold text-abla-blue">{name}</div>
          <div className="mt-0.5 text-[13px] text-slate-500">{role}</div>
          {rating && (
            <div className="mt-1 flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[12px] font-bold text-slate-700">{rating.promedio}</span>
              <span className="text-[11px] text-slate-400">({rating.total} valoraciones)</span>
            </div>
          )}
          <div className="mt-2 text-[12px] font-medium text-slate-500">{days}</div>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={onSchedule}
          className="h-9 rounded-xl bg-abla-green px-4 text-[12px] font-bold text-white"
          aria-label={`Agendar con ${name}`}
        >
          AGENDAR
        </motion.button>
      </div>
    </div>
  )
}

export default function AyudaCita() {
  const navigate = useNavigate()
  const { ratingsEncuesta } = useAppContext()

  const pros = useMemo(() => PROFESORES, [])

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg">
      <Header title="Ayuda profesional" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
        <div className="mt-6 text-[16px] font-bold text-abla-blue">Psicopedagogos disponibles</div>

        <div className="mt-4 flex flex-col gap-3">
          {pros.map((p) => (
            <ProCard
              key={p.id}
              name={p.nombre}
              role={p.rol}
              avatarSrc={p.avatar}
              days={p.dias}
              rating={calcularPromedio(p.id, ratingsEncuesta)}
              onSchedule={() =>
                navigate(`/ayuda/cita/calendario?pro=${encodeURIComponent(p.nombre)}`, {
                  state: { proName: p.nombre },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
