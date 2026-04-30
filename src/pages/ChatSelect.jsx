import { motion } from 'framer-motion'
import { ChevronRight, GraduationCap, UserX, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function OptionCard({ title, description, to, icon, avatarSrc }) {
  const navigate = useNavigate()

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(63,85,119,0.15)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={() => navigate(to)}
      className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
      aria-label={title}
    >
      <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-abla-bg">
        {avatarSrc ? (
          <img src={avatarSrc} alt="" className="h-full w-full object-cover" draggable="false" />
        ) : (
          icon
        )}
      </div>

      <div className="min-w-0 flex-1 text-left">
        <div className="truncate text-[16px] font-bold text-abla-blue">{title}</div>
        <div className="mt-0.5 truncate text-[13px] text-slate-500">{description}</div>
      </div>

      <ChevronRight className="h-5 w-5 text-slate-400" aria-hidden="true" />
    </motion.button>
  )
}

export default function ChatSelect() {
  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24">
      <Header title="Chat" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4">
        <div className="mt-4 text-[14px] text-[#64748B]">¿Con quién quieres hablar?</div>

        <div className="mt-4 flex flex-col gap-3">
          <OptionCard
            title="Anónimo"
            description="Conversa sin revelar tu identidad"
            to="/chat/anonimo"
            icon={<UserX className="h-6 w-6 text-abla-green" aria-hidden="true" />}
          />

          <OptionCard
            title="Mi Tutor"
            description="Habla con el tutor de tu clase"
            to="/chat/tutor"
            avatarSrc="/avatars/avatar-tutor.svg"
          />

          <OptionCard
            title="Profesor"
            description="Elige un profesor"
            to="/chat/profesor"
            icon={<GraduationCap className="h-6 w-6 text-abla-green" aria-hidden="true" />}
          />

          <OptionCard
            title="Grupal"
            description="Salas de chat grupales"
            to="/chat/grupal"
            icon={<Users className="h-6 w-6 text-abla-green" aria-hidden="true" />}
          />
        </div>
      </div>

      <BottomNav />
    </div>
    </PageTransition>
  )
}
