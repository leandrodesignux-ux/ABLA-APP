import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AblaCompanion from '../components/companion/AblaCompanion.jsx'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { LINEAS_EMERGENCIA, RECURSOS_WEB } from '../data/recursosAyuda.js'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const intentions = [
  { title: 'Necesito hablar', description: 'Conversa de forma confidencial.', to: '/chat/anonimo', pose: 'listening', gaze: 'left', accessory: 'speech' },
  { title: 'Necesito orientación', description: 'Encuentra consejos para lo que estás viviendo.', to: '/ayuda/consejos', pose: 'supporting', gaze: 'right', accessory: 'card' },
  { title: 'Quiero pedir una cita', description: 'Agenda apoyo con un profesional.', to: '/ayuda/cita', pose: 'pointing', gaze: 'right', accessory: 'calendar' },
]

function IntentionCard({ title, description, to, pose, gaze, accessory }) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  return <motion.button type="button" initial="idle" animate="idle" whileHover="hover" whileTap="tap" variants={{ idle: {}, hover: motionIfAllowed(reducedMotion, { y: -3 }), tap: motionIfAllowed(reducedMotion, ablaMotion.press) }} onClick={() => navigate(to)} className="flex min-h-44 items-center gap-4 rounded-abla-card bg-white p-5 text-left shadow-abla-card transition-shadow hover:shadow-abla-float md:flex-col md:items-start"><motion.div variants={{ idle: { scale: 1 }, hover: { scale: reducedMotion ? 1 : 1.015 }, tap: { scale: .99 } }} className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-[44%_56%_46%_54%/56%_42%_58%_44%] bg-abla-green-soft md:h-36 md:w-full"><AblaCompanion pose={pose} gaze={gaze} accessory={accessory} size="md" /></motion.div><div><h2 className="text-lg font-black text-abla-blue">{title}</h2><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></div></motion.button>
}

export default function Ayuda() {
  const { perfil } = useAppContext()
  const perfilActivo = perfil || 'estudiante'
  const lineasUrgentes = LINEAS_EMERGENCIA.filter((linea) => linea.urgente)
  const recursosPerfil = RECURSOS_WEB.filter((recurso) => recurso.perfil.includes(perfilActivo))

  return (
    <PageTransition>
      <div className="min-h-dvh bg-abla-bg pb-24 md:pb-12">
        <Header title="Ayuda" showBack />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
          <section className="grid items-center gap-6 overflow-hidden rounded-abla-panel bg-abla-blue p-6 text-white md:grid-cols-[1fr_240px] md:p-9"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-white/65">Estamos contigo</p><h1 className="mt-2 text-3xl font-black leading-tight md:text-4xl">¿Qué necesitas ahora?</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/75 md:text-base">Puedes hablar, buscar orientación o pedir apoyo profesional. Elige por dónde quieres empezar.</p></div><div className="relative mx-auto"><span className="absolute -right-3 top-3 h-16 w-24 rounded-[24px_24px_24px_7px] bg-white/10" /><AblaCompanion personality="empathetic" pose="open" gaze="left" decorations="subtle" size="xl" label="Compañero de apoyo ABLA" /></div></section>
          <section className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">{intentions.map((item) => <IntentionCard key={item.to} {...item} />)}</section>

          <section className="mt-8 rounded-abla-panel border-2 border-red-200 bg-red-50 p-5 md:p-7" aria-labelledby="emergency-title"><div><p className="text-xs font-extrabold uppercase tracking-[.15em] text-red-600">Ayuda urgente</p><h2 id="emergency-title" className="mt-1 text-xl font-black text-red-900">Si estás en riesgo, llama ahora</h2><p className="mt-1 text-sm text-red-800">Estas líneas son gratuitas y están preparadas para ayudarte.</p></div><div className="mt-5 grid gap-3 lg:grid-cols-2">{lineasUrgentes.map((linea) => <div key={linea.id} className="rounded-abla-card border border-red-100 bg-white p-4"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-abla-control bg-red-50 text-2xl">{linea.icono}</div><div className="min-w-0 flex-1"><h3 className="text-sm font-black text-abla-blue">{linea.nombre}</h3><div className="text-xl font-black text-red-600">{linea.numero}</div><div className="text-[11px] font-semibold text-slate-500">{linea.disponibilidad}</div></div><a href={`tel:${linea.numero}`} className="flex min-h-11 items-center gap-2 rounded-abla-control bg-red-600 px-4 text-xs font-bold text-white" aria-label={`Llamar a ${linea.nombre}`}><Phone className="h-4 w-4" />Llamar</a></div><p className="mt-3 text-xs leading-5 text-slate-600">{linea.descripcion}</p></div>)}</div></section>

          <section className="mt-10"><h2 className="abla-section-title">Recursos para ti</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{recursosPerfil.map((recurso) => <article key={recurso.id} className="flex items-start gap-3 rounded-abla-card bg-white p-5 shadow-abla-card"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-abla-control bg-abla-blue-soft text-2xl">{recurso.icono}</div><div className="min-w-0 flex-1"><h3 className="text-sm font-black text-abla-blue">{recurso.nombre}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{recurso.descripcion}</p></div><a href={recurso.url} target="_blank" rel="noreferrer" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-abla-green-soft text-abla-green" aria-label={`Ver ${recurso.nombre}`}><ExternalLink className="h-4 w-4" /></a></article>)}</div></section>
        </main>
        <BottomNav />
      </div>
    </PageTransition>
  )
}
