import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AblaCharacter from '../components/AblaCharacter.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const situations = [
  { title: 'Situación de abuso', description: 'Cuéntanos una situación de abuso para que podamos ayudarte de forma segura.', to: '/reportar/abuso', type: 'protection', tone: 'bg-abla-green-soft', label: 'Acompañamiento seguro' },
  { title: 'Cyberbullying', description: 'Si ocurre por redes o mensajes, repórtalo aquí y conserva la evidencia.', to: '/reportar/cyberbullying', type: 'digital', tone: 'bg-abla-blue-soft', label: 'Acoso digital' },
  { title: 'Violencia física', description: 'Si hubo una agresión o riesgo inmediato, repórtalo cuanto antes.', to: '/reportar/violencia', type: 'urgent', tone: 'bg-red-50', label: 'Atención prioritaria', urgent: true },
]

function ReportScene({ type }) {
  if (type === 'protection') return <div className="relative h-36 w-full"><motion.div variants={{ idle: { scale: 1 }, hover: { scale: 1.06 } }} className="absolute bottom-1 left-1/2 h-28 w-36 -translate-x-1/2 rounded-t-[70px] rounded-b-[32px] border-[10px] border-white/65" /><motion.div variants={{ idle: { y: 8 }, hover: { y: 3 } }} className="absolute bottom-0 left-1/2 -translate-x-1/2"><AblaCharacter emotion="worried" shape="drop" pose="hide" gaze="up" interaction="listening" size="md" /></motion.div></div>
  if (type === 'digital') return <div className="relative h-36 w-full"><motion.div variants={{ idle: { x: 0 }, hover: { x: -2 } }} className="absolute bottom-0 left-[18%]"><AblaCharacter emotion="anxious" shape="wave" pose="tense" gaze="right" interaction="alert" size="lg" /></motion.div><motion.div variants={{ idle: { x: 4, opacity: .75 }, hover: { x: 0, opacity: 1 }, tap: { x: 2 } }} className="absolute right-[14%] top-7 rounded-[22px_22px_6px_22px] bg-white px-4 py-3 shadow-abla-card"><div className="flex gap-1.5"><span className="h-2 w-2 rounded-sm bg-abla-blue/35" /><span className="h-2 w-4 rounded-sm bg-abla-green/60" /></div><div className="mt-2 h-2 w-12 rounded-full bg-abla-blue/20" /></motion.div><motion.span variants={{ idle: { opacity: .25 }, hover: { opacity: 1, rotate: 8 } }} className="absolute right-7 top-3 h-3 w-3 rotate-45 bg-abla-blue/25" /></div>
  return <div className="relative h-36 w-full"><motion.div variants={{ idle: { y: 0 }, hover: { y: -1 }, tap: { y: 1 } }} className="absolute bottom-0 left-1/2 -translate-x-1/2"><AblaCharacter emotion="report" shape="soft-star" pose="tense" gaze="up" interaction="alert" size="lg" /></motion.div><motion.div variants={{ idle: { opacity: .55, scale: .9 }, hover: { opacity: 1, scale: 1 } }} className="absolute right-[18%] top-5"><span className="block h-1 w-7 rotate-[-35deg] rounded-full bg-red-300" /><span className="mt-3 block h-1 w-5 rotate-[-12deg] rounded-full bg-red-300" /></motion.div></div>
}

function ReportCard({ title, description, to, type, tone, label, urgent }) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  return (
    <motion.button type="button" initial="idle" animate="idle" whileHover="hover" whileTap="tap" variants={{ idle: {}, hover: motionIfAllowed(reducedMotion, { y: -3 }), tap: type === 'urgent' ? { y: 0 } : motionIfAllowed(reducedMotion, ablaMotion.press) }} onClick={() => navigate(to)} className={`group flex min-h-64 w-full flex-col rounded-abla-card border-2 bg-white p-5 text-left shadow-abla-card transition-all hover:shadow-abla-float ${urgent ? 'border-red-200' : 'border-transparent hover:border-abla-green/20'}`}>
      <motion.div variants={{ idle: { scale: 1 }, hover: { scale: reducedMotion ? 1 : 1.012 }, tap: { scale: .99 } }} className={`relative w-full overflow-hidden rounded-[38%_62%_46%_54%/55%_43%_57%_45%] ${tone}`}><ReportScene type={type} /><span className={`absolute left-1/2 top-3 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${urgent ? 'bg-red-100 text-red-700' : 'bg-white/90 text-abla-blue'}`}>{label}</span></motion.div>
      <div className="mt-5 flex items-end gap-3"><div className="flex-1"><h2 className="text-xl font-black text-abla-blue">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${urgent ? 'bg-red-100 text-red-700' : 'bg-abla-green-soft text-abla-green'} group-hover:bg-abla-green group-hover:text-white`}><ChevronRight className="h-5 w-5" /></span></div>
    </motion.button>
  )
}

export default function Reportar() {
  return (
    <PageTransition>
      <div className="min-h-dvh bg-abla-bg">
        <Header title="Reportar" showBack />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
          <div className="grid items-end gap-5 lg:grid-cols-[1fr_auto]"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-abla-green">Te creemos</p><h1 className="abla-page-title mt-2">¿Qué situación quieres reportar?</h1><p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">Elige la opción más cercana. Podrás explicar los detalles con calma en el siguiente paso.</p></div><div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-xs font-semibold text-abla-blue shadow-abla-card"><ShieldCheck className="h-5 w-5 text-abla-green" />Tu identidad puede mantenerse anónima</div></div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">{situations.map((situation) => <ReportCard key={situation.to} {...situation} />)}</div>
        </main>
      </div>
    </PageTransition>
  )
}
