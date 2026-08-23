import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AblaCharacter from '../components/AblaCharacter.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const situations = [
  { title: 'Situación de abuso', description: 'Cuéntanos una situación de abuso para que podamos ayudarte de forma segura.', to: '/reportar/abuso', emotion: 'worried', shape: 'blob', tone: 'bg-abla-green-soft', label: 'Acompañamiento seguro' },
  { title: 'Cyberbullying', description: 'Si ocurre por redes o mensajes, repórtalo aquí y conserva la evidencia.', to: '/reportar/cyberbullying', emotion: 'anxious', shape: 'wave', tone: 'bg-abla-blue-soft', label: 'Acoso digital' },
  { title: 'Violencia física', description: 'Si hubo una agresión o riesgo inmediato, repórtalo cuanto antes.', to: '/reportar/violencia', emotion: 'report', shape: 'stack', tone: 'bg-red-50', label: 'Atención prioritaria', urgent: true },
]

function ReportCard({ title, description, to, emotion, shape, tone, label, urgent }) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  return (
    <motion.button type="button" whileHover={motionIfAllowed(reducedMotion, { y: -5 })} whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)} onClick={() => navigate(to)} className={`group flex min-h-64 w-full flex-col rounded-abla-card border-2 bg-white p-5 text-left shadow-abla-card transition-all hover:shadow-abla-float ${urgent ? 'border-red-200' : 'border-transparent hover:border-abla-green/20'}`}>
      <div className={`relative grid min-h-32 w-full place-items-center overflow-hidden rounded-abla-blob ${tone}`}><AblaCharacter emotion={emotion} shape={shape} size="lg" /><span className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${urgent ? 'bg-red-100 text-red-700' : 'bg-white/90 text-abla-blue'}`}>{label}</span></div>
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
