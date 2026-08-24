import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, Bell, MessageCircle, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import IllustratedActionCard from '../components/IllustratedActionCard.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SvgImage from '../components/SvgImage.jsx'
import AblaCompanion from '../components/companion/AblaCompanion.jsx'
import MoodShape from '../components/mood/MoodShape.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const moodConfig = {
  BIEN: { label: 'Bien', moodKey: 'bien', personality: 'motivating', reaction: 'celebrate', tint: 'bg-[#E4F3ED]', message: '¡Qué bueno saberlo! Guarda un poquito de esa energía para hoy.', heroCopy: 'Me alegra acompañarte en este buen momento.' },
  'MAS O MENOS': { label: 'Más o menos', moodKey: 'mas_o_menos', personality: 'curious', reaction: 'think', tint: 'bg-[#EEF1F6]', message: 'Está bien sentirse así. Estamos aquí si necesitas ordenar lo que pasa.', heroCopy: 'Podemos mirar juntos lo que necesitas ahora.' },
  MAL: { label: 'Mal', moodKey: 'mal', personality: 'empathetic', reaction: 'concern', tint: 'bg-[#FDEDEC]', message: 'Gracias por contarlo. No tienes que atravesar esto a solas.', heroCopy: 'Estoy aquí para escucharte, sin apuro y sin juzgar.' },
}

const quickActions = [
  { title: 'Chat anónimo', description: 'Habla sin dar tu nombre', to: '/chat/anonimo', pose: 'listening', gaze: 'left', accessory: 'speech' },
  { title: 'Pedir una cita', description: 'Encuentra apoyo profesional', to: '/ayuda/cita', pose: 'pointing', gaze: 'right', accessory: 'calendar' },
  { title: 'Consejos', description: 'Ideas para sentirte acompañado/a', to: '/ayuda/consejos', pose: 'supporting', gaze: 'right', accessory: 'card' },
  { title: 'Reportar', description: 'Cuenta una situación de forma segura', to: '/reportar', mood: 'focused', pose: 'protecting', gaze: 'center', accessory: 'shield', decorations: 'none' },
  { title: 'Encuesta', description: 'Comparte cómo fue tu experiencia', to: '/encuesta', pose: 'pointing', gaze: 'right', accessory: 'check' },
]

function EmotionOption({ value, selected, onSelect }) {
  const reducedMotion = useReducedMotion()
  const config = moodConfig[value]
  return (
    <motion.button type="button" onClick={() => onSelect(value)} whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)} className={`group relative min-h-36 overflow-hidden rounded-abla-card border-2 p-3 text-center transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-green/30 md:min-h-44 md:p-5 ${selected ? `${config.tint} border-abla-green shadow-abla-float` : 'border-transparent bg-white shadow-abla-card hover:border-abla-green/25'}`} aria-pressed={selected} aria-label={`Me siento ${config.label}`}>
      {selected && <div className="pointer-events-none absolute inset-0" aria-hidden="true"><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-4 h-2.5 w-2.5 rounded-full bg-abla-green/30" /><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .08 }} className="absolute bottom-8 left-4 h-3 w-3 rotate-45 rounded-sm bg-abla-blue/15" /></div>}
      <div className="relative mx-auto grid h-24 place-items-center md:h-28"><MoodShape mood={config.moodKey} interactive selected={selected} size="md" /></div>
      <span className="relative text-xs font-extrabold uppercase tracking-[.08em] text-abla-blue md:text-sm">{config.label}</span>
    </motion.button>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const { user, moodHoy, setMood } = useAppContext()
  const activeMood = moodConfig[moodHoy]

  return (
    <PageTransition>
      <div className="min-h-dvh bg-abla-bg pb-28 text-slate-800 md:pb-12">
        <header className="relative overflow-hidden bg-abla-green text-white">
          <div className="absolute -right-12 -top-20 h-44 w-44 rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-20 md:px-6 lg:px-8">
            <button type="button" onClick={() => navigate('/perfil')} className="flex items-center gap-3 rounded-full pr-3 focus-visible:ring-white/50" aria-label="Ir a perfil"><div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/70 bg-white/15"><SvgImage src={user.avatar} alt="" className="h-full w-full object-cover" eager /></div><div className="text-left leading-tight"><div className="text-xs text-white/75">Hola,</div><div className="font-bold">{user.name}</div></div></button>
            <img src="/Logo/abla-logo.svg" alt="ABLA" className="h-8 w-auto brightness-0 invert" draggable="false" />
            <div className="flex items-center gap-2"><button type="button" onClick={() => navigate('/chat/anonimo')} className="grid h-10 min-w-10 place-items-center rounded-full bg-red-500 px-2 text-[10px] font-black shadow-lg" aria-label="Ayuda SOS">SOS</button><button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-white/12 hover:bg-white/20" aria-label="Notificaciones"><Bell className="h-5 w-5" /></button></div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
          <section className="grid items-center gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-10">
            <div className="rounded-abla-panel bg-white p-5 shadow-abla-card md:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[.16em] text-abla-green">Tu check-in de hoy</p>
              <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.05] tracking-tight text-abla-blue">¿Cómo te sientes?</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">No hay respuestas correctas. Elegir cómo estás nos ayuda a acompañarte mejor.</p>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 md:mt-8">{Object.keys(moodConfig).map((mood) => <EmotionOption key={mood} value={mood} selected={moodHoy === mood} onSelect={setMood} />)}</div>
              <AnimatePresence mode="wait">{activeMood && <motion.div key={moodHoy} variants={ablaMotion.pop} initial="hidden" animate="visible" exit="hidden" className={`mt-5 rounded-abla-control px-4 py-3 text-sm font-semibold text-abla-blue ${activeMood.tint}`}>{activeMood.message}</motion.div>}</AnimatePresence>
            </div>

            <div className="relative hidden min-h-[470px] overflow-hidden rounded-abla-panel bg-abla-blue-soft p-8 lg:grid lg:place-items-center">
              <div className="absolute left-8 top-8 h-12 w-24 rounded-full bg-white/70" /><div className="absolute bottom-10 right-8 h-20 w-20 rounded-abla-blob bg-abla-green/15" />
              <motion.div key={moodHoy || 'idle'} animate={motionIfAllowed(reducedMotion, ablaMotion.float)}><AblaCompanion personality={activeMood?.personality || 'friendly'} reaction={activeMood?.reaction} size="hero" label="Compañero emocional ABLA" /></motion.div>
              <div className="absolute bottom-9 left-9 right-9 text-center"><p className="text-lg font-extrabold text-abla-blue">{activeMood?.heroCopy || 'Tu espacio también puede empezar con una emoción.'}</p></div>
            </div>
          </section>

          <AnimatePresence>{moodHoy === 'MAL' && <motion.section variants={ablaMotion.pop} initial="hidden" animate="visible" exit="hidden" className="mt-6 rounded-abla-card border-2 border-red-200 bg-red-50 p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-6" aria-live="polite"><div className="flex items-start gap-3"><AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" /><div><h2 className="text-lg font-black text-red-900">¿Necesitas ayuda ahora?</h2><p className="mt-1 text-sm leading-6 text-red-800">Si estás en peligro o necesitas contención, contacta a alguien inmediatamente.</p></div></div><div className="mt-4 grid grid-cols-2 gap-3 md:mt-0 md:min-w-72"><a href="tel:147" className="flex min-h-12 items-center justify-center gap-2 rounded-abla-control bg-red-600 px-4 text-sm font-bold text-white"><Phone className="h-4 w-4" />147</a><button type="button" onClick={() => navigate('/chat/anonimo')} className="min-h-12 rounded-abla-control border border-red-300 bg-white px-4 text-sm font-bold text-red-700">Hablar aquí</button></div></motion.section>}</AnimatePresence>

          <section className="mt-10 md:mt-14"><div><p className="text-sm font-bold uppercase tracking-[.15em] text-abla-green">Estamos contigo</p><h2 className="abla-section-title mt-1">¿Qué necesitas ahora?</h2></div><div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">{quickActions.map(({ pose, gaze, accessory, mood, decorations, ...action }) => <IllustratedActionCard key={action.to} {...action} scene={<AblaCompanion mood={mood} pose={pose} gaze={gaze} accessory={accessory} decorations={decorations} size="md" />} />)}</div></section>
        </main>

        <motion.button type="button" onClick={() => navigate('/chat')} whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)} className="fixed bottom-20 left-1/2 z-30 flex min-h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-abla-blue px-6 text-sm font-bold text-white shadow-abla-blue md:hidden" aria-label="Abrir opciones de chat"><MessageCircle className="h-5 w-5" />Chatear</motion.button>
        <BottomNav />
      </div>
    </PageTransition>
  )
}
