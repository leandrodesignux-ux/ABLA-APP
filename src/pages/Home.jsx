import { motion } from 'framer-motion'
import { Bell, GalleryHorizontalEnd, MessageCircle, MoreVertical } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'

function MoodButton({ emoji, label, active, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex h-[84px] w-full flex-col items-center justify-center gap-1 rounded-2xl border bg-white text-slate-800 transition-shadow ${
        active ? 'border-abla-green shadow-sm' : 'border-[#E6E6E6]'
      }`}
      aria-label={label}
    >
      <div className="text-[28px] leading-none">{emoji}</div>
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="flex w-full flex-col items-center justify-start"
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
  const [mood, setMood] = useState(null)

  const navTiles = useMemo(
    () => [
      { label: 'CONSEJOS', imageSrc: '/illustrations/home-consejos.svg', to: '/ayuda/consejos' },
      { label: 'SOBRE TÍ', imageSrc: '/illustrations/home-sobrti.svg', to: '/encuesta' },
      { label: 'ENCUESTAS', imageSrc: '/illustrations/home-encuestas.svg', to: '/encuesta' },
    ],
    [],
  )

  return (
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
          <div className="ml-1 h-8 w-8 overflow-hidden rounded-full border-2 border-white/60 bg-white/10">
            <img src="/avatars/avatar-matias.svg" alt="" className="h-full w-full object-cover" draggable="false" />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[390px] px-4">
        <section className="mt-5 text-center">
          <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full border-[3px] border-abla-green bg-white">
            <img src="/avatars/avatar-matias.svg" alt="" className="h-full w-full object-cover" draggable="false" />
          </div>
          <div className="mt-4 text-[20px] font-bold text-abla-blue">¡Hola Matías!</div>
          <div className="mt-1 text-[14px] text-[#64748B]">¿Cómo te sientes?</div>
        </section>

        <section className="mt-5">
          <div className="grid grid-cols-3 gap-3">
            <MoodButton emoji="😄" label="BIEN" active={mood === 'BIEN'} onClick={() => setMood('BIEN')} />
            <MoodButton
              emoji="😐"
              label="MAS O MENOS"
              active={mood === 'MAS O MENOS'}
              onClick={() => setMood('MAS O MENOS')}
            />
            <MoodButton emoji="😟" label="MAL" active={mood === 'MAL'} onClick={() => setMood('MAL')} />
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
      >
        <MessageCircle className="h-5 w-5" />
        + CHATEAR
      </motion.button>

      <BottomNav />
    </div>
  )
}
