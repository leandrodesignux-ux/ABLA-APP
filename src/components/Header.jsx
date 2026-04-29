import { ArrowLeft, Bell, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header({ title, showBack = false, showIcons = false }) {
  const navigate = useNavigate()

  return (
    <header className="relative flex h-14 items-center bg-abla-green px-4 text-white">
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
    </header>
  )
}
