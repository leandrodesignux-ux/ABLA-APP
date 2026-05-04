import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, AlertTriangle, Bell, BookOpen, Calendar, ClipboardList, MessageCircle } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SvgImage from '../components/SvgImage.jsx'
import { useAppContext } from '../context/AppContext.jsx'

const moodConfig = {
  BIEN: { color: '#56A087', message: '¡Qué bueno saberlo! 🌟' },
  'MAS O MENOS': { color: '#F59E0B', message: 'Estamos aquí si necesitas 💛' },
  MAL: { color: '#EF4444', message: '¿Quieres hablar con alguien? 💙' },
}

function RippleCircles({ color }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            ease: 'easeOut',
          }}
          className="absolute w-20 h-20 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}

function MoodButton({ imageSrc, label, active, onClick, mood }) {
  const config = moodConfig[mood]

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative flex h-[84px] w-full flex-col items-center justify-center gap-1 rounded-2xl border bg-white text-slate-800 transition-shadow ${
        active ? 'border-abla-green shadow-sm' : 'border-[#E6E6E6]'
      }`}
      aria-label={label}
      style={{ willChange: 'transform' }}
    >
      <AnimatePresence>
        {active && <RippleCircles color={config.color} />}
      </AnimatePresence>
      <motion.div
        animate={active ? {
          scale: [1, 1.3, 0.9, 1.1, 1],
        } : { scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
        className="relative z-10"
      >
        <SvgImage src={imageSrc} alt={label} className="h-9 w-9 object-contain" eager />
      </motion.div>
      <div className="text-[11px] font-bold text-abla-blue relative z-10">{label}</div>
    </motion.button>
  )
}

function NavTile({ label, imageSrc, to }) {
  const navigate = useNavigate()

  return (
    <motion.button
      type="button"
      onClick={() => navigate(to)}
      whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(63,85,119,0.15)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="flex w-full flex-col items-center justify-start rounded-2xl p-2"
      aria-label={label}
    >
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-abla-green bg-white">
        <img src={imageSrc} alt="" className="h-full w-full object-cover" draggable="false" />
      </div>
      <div className="mt-2 text-[11px] font-bold tracking-wide text-abla-blue">{label}</div>
    </motion.button>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { user, moodHoy, setMood } = useAppContext()
  const moodDotColor = moodHoy === 'BIEN' ? '#22c55e' : moodHoy === 'MAL' ? '#ef4444' : '#f59e0b'

  const quickActions = [
    { label: 'Chat anónimo', to: '/chat/anonimo', Icon: MessageCircle },
    { label: 'Pedir cita', to: '/ayuda/cita', Icon: Calendar },
    { label: 'Consejos', to: '/ayuda/consejos', Icon: BookOpen },
    { label: 'Reportar', to: '/reportar', Icon: AlertTriangle },
    { label: 'Encuesta', to: '/encuesta', Icon: ClipboardList },
  ]

  const navTiles = useMemo(
    () => [
      { label: 'CONSEJOS', imageSrc: '/Illustrations/home-consejos.svg', to: '/ayuda/consejos' },
      { label: 'SOBRE TÍ', imageSrc: '/Illustrations/home-sobrti.svg', to: '/sobreti' },
      { label: 'ENCUESTAS', imageSrc: '/Illustrations/home-encuestas.svg', to: '/encuesta' },
    ],
    [],
  )

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24 text-slate-800">
      <header className="bg-abla-green text-white">
        <div className="flex h-14 items-center justify-between px-4">
          <button
            type="button"
            onClick={() => navigate('/perfil')}
            className="flex items-center gap-2"
            aria-label="Ir a perfil"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white/60 bg-white/10" style={{ willChange: 'transform' }}>
              <SvgImage src={user.avatar} alt="" className="h-full w-full object-cover" eager />
            </div>
            <div className="text-left text-[12px] leading-tight">
              <div className="text-white/80">Hola,</div>
              <div className="flex items-center gap-1.5 font-semibold text-white">
                {user.name}
                {moodHoy ? <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: moodDotColor }} /> : null}
              </div>
            </div>
          </button>

          <img
            src="/Logo/abla-logo.svg"
            alt="ABLA"
            className="h-7 w-auto brightness-0 invert"
            draggable="false"
          />

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => navigate('/chat/anonimo')}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white"
              aria-label="SOS"
            >
              SOS
            </motion.button>
            <button
              type="button"
              onClick={() => {}}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
              aria-label="Notificaciones"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="h-12 border-t border-white/10 bg-abla-green/90">
          <div className="flex h-full snap-x gap-2 overflow-x-auto px-4 py-1">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                type="button"
                onClick={() => navigate(qa.to)}
                className="flex flex-shrink-0 snap-start flex-col items-center gap-1 rounded-xl bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
                aria-label={qa.label}
              >
                <qa.Icon className="h-4 w-4" />
                <span className="text-[10px] font-medium leading-none">{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[390px] px-4">
        <section className="mt-5 text-center">
          <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full border-[3px] border-abla-green bg-white" style={{ willChange: 'transform' }}>
            <SvgImage src={user.avatar} alt="" className="h-full w-full object-cover" eager />
          </div>
          <div className="mt-4 text-[20px] font-bold text-abla-blue">¡Hola {user.name}!</div>
          <div className="mt-1 text-[14px] text-[#64748B]">¿Cómo te sientes?</div>
        </section>

        <section className="mt-5">
          <div className="grid grid-cols-3 gap-3">
            <MoodButton imageSrc="/Emogis/Bien.svg" label="BIEN" mood="BIEN" active={moodHoy === 'BIEN'} onClick={() => setMood('BIEN')} />
            <MoodButton
              imageSrc="/Emogis/mas o menos.svg"
              label="MAS O MENOS"
              mood="MAS O MENOS"
              active={moodHoy === 'MAS O MENOS'}
              onClick={() => setMood('MAS O MENOS')}
            />
            <MoodButton imageSrc="/Emogis/mal.svg" label="MAL" mood="MAL" active={moodHoy === 'MAL'} onClick={() => setMood('MAL')} />
          </div>
          <AnimatePresence mode="wait">
            {moodHoy && (
              <motion.div
                key={moodHoy}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-4 text-center"
              >
                <p className="text-[14px] font-medium text-abla-blue">
                  {moodConfig[moodHoy].message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <AnimatePresence>
          {moodHoy === 'MAL' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-bold text-abla-blue">¿Necesitas ayuda ahora?</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a
                      href="tel:147"
                      className="flex h-10 items-center justify-center rounded-xl bg-red-500 text-[12px] font-bold text-white"
                    >
                      Llamar al 147
                    </a>
                    <button
                      type="button"
                      onClick={() => navigate('/chat/anonimo')}
                      className="h-10 rounded-xl border border-red-300 bg-white text-[12px] font-bold text-red-600"
                    >
                      Hablar aquí
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            {navTiles.map((t) => (
              <NavTile key={t.label} label={t.label} imageSrc={t.imageSrc} to={t.to} />
            ))}
          </div>
        </section>
      </div>

      <motion.button
        type="button"
        onClick={() => navigate('/chat')}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-abla-green px-8 py-3 font-semibold text-white shadow-xl"
        aria-label="Chatear"
        style={{ willChange: 'transform' }}
      >
        <MessageCircle className="h-5 w-5" />
        + CHATEAR
      </motion.button>

      <BottomNav />
    </div>
    </PageTransition>
  )
}
