import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { useScrolled } from '../hooks/useScrolled.js'

export default function Header({ title, showBack = false, showIcons = false, scrollRef }) {
  const navigate = useNavigate()
  const { perfil } = useAppContext()
  const scrolled = useScrolled(scrollRef, 10)
  const profileBadge = {
    estudiante: { label: 'Estudiante', className: 'bg-green-100 text-green-700' },
    apoderado: { label: 'Apoderado/a', className: 'bg-blue-100 text-blue-700' },
    profesional: { label: 'Profesional', className: 'bg-purple-100 text-purple-700' },
  }[perfil]

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? 'rgba(86, 160, 135, 0.95)' : 'rgba(86, 160, 135, 1)',
        boxShadow: scrolled ? '0 2px 20px rgba(86, 160, 135, 0.25)' : '0 0 0 rgba(86, 160, 135, 0)',
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative flex h-14 items-center px-4 text-white sticky top-0 z-50"
      style={{ willChange: 'background-color, box-shadow, backdrop-filter' }}
    >
      <div className="flex flex-1 items-center">
        {showBack ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="-ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="h-10 w-10" aria-hidden="true" />
        )}
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-center font-bold">
        {title}
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        {showIcons ? (
          <>
            {profileBadge ? (
              <div className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${profileBadge.className}`}>
                {profileBadge.label}
              </div>
            ) : null}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
              aria-label="Menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </>
        ) : (
          <div className="h-10 w-10" aria-hidden="true" />
        )}
      </div>
    </motion.header>
  )
}
