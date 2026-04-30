import { motion } from 'framer-motion'
import { Bell, GalleryHorizontalEnd, MessageCircle, MoreVertical } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SvgImage from '../components/SvgImage.jsx'
import { useAppContext } from '../context/AppContext.jsx'

function MoodButton({ imageSrc, label, active, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex h-[84px] w-full flex-col items-center justify-center gap-1 rounded-2xl border bg-white text-slate-800 transition-shadow ${
        active ? 'border-abla-green shadow-sm' : 'border-[#E6E6E6]'
      }`}
      aria-label={label}
      style={{ willChange: 'transform' }}
    >
      <SvgImage src={imageSrc} alt={label} className="h-9 w-9 object-contain" eager />
      <div className="text-[11px] font-bold text-abla-blue">{label}</div>
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

  const navTiles = useMemo(
    () => [
      { label: 'CONSEJOS', imageSrc: '/Illustrations/home-consejos.svg', to: '/ayuda/consejos' },
      { label: 'SOBRE TÍ', imageSrc: '/Illustrations/home-sobrti.svg', to: '/encuesta' },
      { label: 'ENCUESTAS', imageSrc: '/Illustrations/home-encuestas.svg', to: '/encuesta' },
    ],
    [],
  )

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24 text-slate-800">
      <header className="flex h-14 items-center bg-abla-green px-4 text-white">
        <div className="flex flex-1 items-center" />

        <div className="text-center text-base font-semibold">Home</div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
            aria-label="Galería"
          >
            <GalleryHorizontalEnd className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
            aria-label="Más"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          <div className="ml-1 h-8 w-8 overflow-hidden rounded-full border-2 border-white/60 bg-white/10" style={{ willChange: 'transform' }}>
            <SvgImage src={user.avatar} alt="" className="h-full w-full object-cover" eager />
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
            <MoodButton imageSrc="/Emogis/Bien.svg" label="BIEN" active={moodHoy === 'BIEN'} onClick={() => setMood('BIEN')} />
            <MoodButton
              imageSrc="/Emogis/mas o menos.svg"
              label="MAS O MENOS"
              active={moodHoy === 'MAS O MENOS'}
              onClick={() => setMood('MAS O MENOS')}
            />
            <MoodButton imageSrc="/Emogis/mal.svg" label="MAL" active={moodHoy === 'MAL'} onClick={() => setMood('MAL')} />
          </div>
        </section>

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
