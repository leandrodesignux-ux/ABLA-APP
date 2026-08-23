import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AblaCharacter from '../components/AblaCharacter.jsx'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const bubbleVariants = {
  idle: { y: 2, scale: .92, opacity: .7 },
  hover: { y: -2, scale: 1, opacity: 1 },
  tap: { y: 1, scale: .95, opacity: 1 },
}

function MiniBubble({ className = '' }) {
  return <motion.div variants={bubbleVariants} className={`absolute rounded-[18px_18px_18px_6px] bg-white px-3 py-1.5 shadow-abla-card ${className}`}><motion.span variants={{ idle: { opacity: .35 }, hover: { opacity: 1 } }} className="font-black tracking-[.2em] text-abla-green">···</motion.span></motion.div>
}

function ChatScene({ kind, avatarSrc }) {
  if (avatarSrc) return <div className="relative h-28 w-full md:h-40"><motion.div variants={{ idle: { x: 0 }, hover: { x: 4 }, tap: { x: 1 } }} className="absolute bottom-1 left-[22%]"><AblaCharacter emotion="chat" shape="arch" pose="point" gaze="right" interaction="supportive" size="md" /></motion.div><motion.img variants={{ idle: { y: 0, boxShadow: '0 0 0 4px #fff' }, hover: { y: -2, boxShadow: '0 0 0 5px #DCECE7' } }} src={avatarSrc} alt="" className="absolute bottom-3 right-[20%] h-16 w-16 rounded-full object-cover md:h-20 md:w-20" /><MiniBubble className="left-1/2 top-2 -translate-x-1/2" /></div>
  if (kind === 'group') return <div className="relative h-28 w-full md:h-40"><motion.div variants={{ idle: { x: 0, y: 0 }, hover: { x: 5, y: -1 } }} className="absolute bottom-0 left-[12%]"><AblaCharacter emotion="happy" shape="pebble" pose="wave" gaze="right" interaction="friendly" size="sm" /></motion.div><motion.div variants={{ idle: { y: 0 }, hover: { y: -3 } }} className="absolute bottom-5 left-[37%]"><AblaCharacter emotion="chat" shape="blob" pose="open" gaze="left" interaction="supportive" size="md" /></motion.div><motion.div variants={{ idle: { x: 0 }, hover: { x: -4, y: -1 } }} className="absolute bottom-0 right-[11%]"><AblaCharacter emotion="neutral" shape="pill" pose="rest" gaze="left" interaction="curious" size="sm" /></motion.div><MiniBubble className="right-[14%] top-1" /></div>
  if (kind === 'teacher') return <div className="relative h-28 w-full md:h-40"><motion.div variants={{ idle: { x: 0 }, hover: { x: 4 } }} className="absolute bottom-2 left-[19%]"><AblaCharacter emotion="neutral" shape="pebble" pose="rest" gaze="right" interaction="curious" size="sm" /></motion.div><motion.div variants={{ idle: { x: 0 }, hover: { x: -4 } }} className="absolute bottom-1 right-[18%]"><AblaCharacter emotion="chat" shape="arch" pose="wave" gaze="left" interaction="supportive" size="md" /></motion.div><MiniBubble className="left-1/2 top-2 -translate-x-1/2" /></div>
  if (kind === 'anonymous') return <div className="relative h-28 w-full md:h-40"><motion.div variants={{ idle: { y: 13 }, hover: { y: 2 }, tap: { y: 8 } }} className="absolute -bottom-4 left-[22%]"><AblaCharacter emotion="chat" shape="arch" pose="hide" gaze="right" interaction="shy" size="lg" /></motion.div><motion.div variants={bubbleVariants} className="absolute right-[12%] top-3 h-16 w-28 rounded-[24px_24px_24px_7px] bg-white shadow-abla-card"><div className="flex h-full items-center justify-center gap-2">{[0, 1, 2].map((dot) => <motion.span key={dot} variants={{ idle: { opacity: .25, y: 2 }, hover: { opacity: 1, y: 0 }, tap: { y: 1 } }} transition={{ delay: dot * .06 }} className="h-2.5 w-2.5 rounded-full bg-abla-green" />)}</div></motion.div></div>
  return <div className="relative h-28 w-full md:h-40"><div className="absolute bottom-0 left-1/2 -translate-x-1/2"><AblaCharacter emotion="help" shape="soft-star" pose="open" gaze="right" interaction="supportive" size="lg" decoration /></div><MiniBubble className="right-[14%] top-2" /></div>
}

function OptionCard({ title, description, to, kind, avatarSrc, subdued = false }) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  return (
    <motion.button type="button" initial="idle" animate="idle" whileHover="hover" whileTap="tap" variants={{ idle: {}, hover: motionIfAllowed(reducedMotion, { y: -3 }), tap: motionIfAllowed(reducedMotion, ablaMotion.press) }} onClick={() => navigate(to)} className="group relative flex min-h-44 w-full flex-col overflow-hidden rounded-abla-card border border-white/70 bg-white p-5 text-left shadow-abla-card transition-shadow hover:shadow-abla-float focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-green/30 md:min-h-72 md:p-6" aria-label={title}>
      <motion.div variants={{ idle: { scale: 1 }, hover: { scale: reducedMotion ? 1 : 1.015 }, tap: { scale: .99 } }} className={`relative min-h-28 w-full overflow-hidden rounded-[42%_58%_48%_52%/55%_45%_55%_45%] ${subdued ? 'bg-abla-blue-soft' : 'bg-abla-green-soft'} md:min-h-40`}><ChatScene kind={kind} avatarSrc={avatarSrc} /></motion.div>
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
