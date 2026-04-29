import { motion } from 'framer-motion'
import { BookOpen, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'

function HelpCard({ icon, title, description, buttonLabel, buttonVariant, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full rounded-2xl bg-white p-4 text-left shadow-sm"
      aria-label={title}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-abla-bg">{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="text-[16px] font-bold text-abla-blue">{title}</div>
          <div className="mt-1 text-[13px] text-slate-500">{description}</div>
        </div>
      </div>

      <div className="mt-4">
        <div
          className={`flex h-12 w-full items-center justify-center rounded-xl px-4 text-center text-[13px] font-bold tracking-wide ${
            buttonVariant === 'filled'
              ? 'bg-abla-green text-white'
              : 'border border-abla-green bg-white text-abla-green'
          }`}
        >
          {buttonLabel}
        </div>
      </div>
    </motion.button>
  )
}

export default function Ayuda() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-abla-bg pb-24">
      <Header title="Ayuda" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4">
        <div className="mt-6 text-[18px] font-bold text-abla-blue">Selecciona la ayuda que necesitas</div>

        <div className="mt-4 flex justify-center">
          <img
            src="/Illustrations/ayuda-hero.svg"
            alt=""
            className="h-40 w-40 select-none"
            draggable="false"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <HelpCard
            title="Cita con Profesional"
            description="Agenda una cita con un psicopedagogo o psicólogo"
            buttonLabel="SOLICITAR CITA CON PROFESIONAL"
            buttonVariant="filled"
            icon={<Calendar className="h-7 w-7 text-abla-green" aria-hidden="true" />}
            onClick={() => navigate('/ayuda/cita')}
          />

          <HelpCard
            title="Consejos Prácticos"
            description="Recibe orientación sobre situaciones difíciles"
            buttonLabel="VER CONSEJOS"
            buttonVariant="outlined"
            icon={<BookOpen className="h-7 w-7 text-abla-blue" aria-hidden="true" />}
            onClick={() => navigate('/ayuda/consejos')}
          />
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
