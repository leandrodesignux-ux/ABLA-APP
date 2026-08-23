import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AblaCharacter from '../components/AblaCharacter.jsx'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

function ChatScene({ kind, avatarSrc }) {
  if (avatarSrc) return <div className="relative flex items-end justify-center"><AblaCharacter emotion="chat" shape="pill" size="sm" /><img src={avatarSrc} alt="" className="-ml-3 h-16 w-16 rounded-full border-4 border-white object-cover" /></div>
  if (kind === 'group') return <div className="flex items-end justify-center -space-x-4"><AblaCharacter emotion="happy" shape="circle" size="sm" /><AblaCharacter emotion="chat" shape="blob" size="md" /><AblaCharacter emotion="calm" shape="pill" size="sm" /></div>
  if (kind === 'teacher') return <div className="flex items-end justify-center -space-x-2"><AblaCharacter emotion="neutral" shape="circle" size="sm" /><AblaCharacter emotion="chat" shape="pill" size="md" /></div>
  if (kind === 'anonymous') return <div className="relative"><AblaCharacter emotion="safe" shape="blob" size="lg" /><span className="absolute -right-1 top-0 rounded-full bg-white px-2 py-1 text-lg font-black text-abla-green shadow-abla-card">···</span></div>
  return <AblaCharacter emotion="help" shape="soft-star" size="lg" />
}

function OptionCard({ title, description, to, kind, avatarSrc, subdued = false }) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  return (
    <motion.button type="button" whileHover={motionIfAllowed(reducedMotion, { y: -5 })} whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)} onClick={() => navigate(to)} className="group relative flex min-h-44 w-full flex-col overflow-hidden rounded-abla-card border border-white/70 bg-white p-5 text-left shadow-abla-card transition-shadow hover:shadow-abla-float focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-green/30 md:min-h-72 md:p-6" aria-label={title}>
      <div className={`grid min-h-28 w-full place-items-center rounded-abla-blob ${subdued ? 'bg-abla-blue-soft' : 'bg-abla-green-soft'} md:min-h-40`}><motion.div whileHover={motionIfAllowed(reducedMotion, { x: 3, rotate: 1 })}><ChatScene kind={kind} avatarSrc={avatarSrc} /></motion.div></div>
      <div className="mt-5 flex w-full items-end gap-3"><div className="min-w-0 flex-1"><h2 className="text-lg font-black text-abla-blue md:text-xl">{title}</h2><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-abla-blue-soft text-abla-blue transition-colors group-hover:bg-abla-green group-hover:text-white"><ChevronRight className="h-5 w-5" /></span></div>
    </motion.button>
  )
}

export default function ChatSelect() {
  const { perfil } = useAppContext()
  const isApoderado = perfil === 'apoderado'
  const isProfesional = perfil === 'profesional'
  const options = isApoderado
    ? [
        { title: 'Hablar con el tutor', description: 'Comunícate directamente con el tutor de tu hijo/a.', to: '/chat/tutor', kind: 'teacher', avatarSrc: '/Avatars/avatar-tutor.svg', subdued: true },
        { title: 'Orientación anónima', description: 'Consulta sin revelar tu identidad.', to: '/chat/anonimo', kind: 'anonymous', subdued: true },
        { title: 'Chat de apoyo', description: 'Habla con el equipo de convivencia.', to: '/chat/apoyo-apoderado', kind: 'support', subdued: true },
      ]
    : isProfesional
      ? [
          { title: 'Asistente de protocolos', description: 'Consulta flujos de intervención.', to: '/chat/profesional', kind: 'support', subdued: true },
          { title: 'Chat con estudiante', description: 'Inicia una conversación desde tu lado.', to: '/chat/tutor', kind: 'teacher', subdued: true },
          { title: 'Coordinación interna', description: 'Sala del equipo de convivencia.', to: '/chat/grupos', kind: 'group', subdued: true },
        ]
      : [
          { title: 'Anónimo', description: 'Conversa con tranquilidad sin revelar tu identidad.', to: '/chat/anonimo', kind: 'anonymous' },
          { title: 'Mi tutor', description: 'Habla con el tutor de tu clase.', to: '/chat/tutor', kind: 'teacher', avatarSrc: '/Avatars/avatar-tutor.svg' },
          { title: 'Profesor', description: 'Elige con qué profesor quieres conversar.', to: '/chat/elegir-profesor', kind: 'teacher' },
          { title: 'Grupal', description: 'Participa en una sala de conversación cuidada.', to: '/chat/grupos', kind: 'group' },
        ]

  return (
    <PageTransition>
      <div className="min-h-dvh bg-abla-bg pb-24 md:pb-12">
        <Header title="Chat" showBack />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
          <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-abla-green">Un espacio para hablar</p><h1 className="abla-page-title mt-2">{isApoderado ? '¿Qué necesitas hacer?' : isProfesional ? 'Comunicaciones' : '¿Con quién quieres hablar?'}</h1><p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">Elige el espacio que te haga sentir más cómodo/a. Puedes volver y cambiarlo cuando quieras.</p></div>
          <div className={`mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 ${options.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>{options.map((option) => <OptionCard key={option.title} {...option} />)}</div>
        </main>
        <BottomNav />
      </div>
    </PageTransition>
  )
}
