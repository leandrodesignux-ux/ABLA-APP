import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function ProCard({ name, role, avatarSrc, days, onSchedule }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-abla-bg">
          <img src={avatarSrc} alt="" className="h-full w-full object-cover" draggable="false" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[16px] font-bold text-abla-blue">{name}</div>
          <div className="mt-0.5 text-[13px] text-slate-500">{role}</div>
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

  const pros = useMemo(
    () => [
      {
        name: 'Ana García',
        role: 'Psicopedagoga',
        avatarSrc: '/Avatars/psi-1.svg',
        days: 'Lun/Mié/Vie',
      },
      {
        name: 'Luis Muñoz',
        role: 'Psicólogo',
        avatarSrc: '/Avatars/psi-2.svg',
        days: 'Mar/Jue',
      },
      {
        name: 'Carmen Silva',
        role: 'Orientadora',
        avatarSrc: '/Avatars/psi-1.svg',
        days: 'Lun a Vie',
      },
    ],
    [],
  )

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg">
      <Header title="Ayuda profesional" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
        <div className="mt-6 text-[16px] font-bold text-abla-blue">Psicopedagogos disponibles</div>

        <div className="mt-4 flex flex-col gap-3">
          {pros.map((p) => (
            <ProCard
              key={p.name}
              name={p.name}
              role={p.role}
              avatarSrc={p.avatarSrc}
              days={p.days}
              onSchedule={() =>
                navigate(`/ayuda/cita/calendario?pro=${encodeURIComponent(p.name)}`, {
                  state: { proName: p.name },
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
