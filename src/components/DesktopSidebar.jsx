import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { getNavigation } from './navigation.js'
import AblaCharacter from './AblaCharacter.jsx'

export default function DesktopSidebar() {
  const { pathname } = useLocation()
  const { perfil } = useAppContext()
  const items = getNavigation(perfil)

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-56 border-r border-white/80 bg-white/95 shadow-[12px_0_40px_rgba(63,85,119,.06)] backdrop-blur-xl md:flex lg:w-64">
      <div className="flex w-full flex-col px-4 py-6 lg:px-5">
        <Link to={items[0].to} className="flex items-center gap-3 px-2" aria-label="ABLA - Inicio">
          <img src="/Logo/abla-logo.svg" alt="" className="h-10 w-10" />
          <div>
            <div className="text-xl font-black tracking-tight text-abla-blue">ABLA</div>
            <div className="text-[11px] font-medium text-abla-green">Tu espacio seguro</div>
          </div>
        </Link>

        <nav className="mt-9 space-y-2" aria-label="Navegación principal">
          {items.map(({ to, label, icon: Icon, match }) => {
            const active = match(pathname)
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex min-h-12 items-center gap-3 overflow-hidden rounded-full px-4 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-green/30 ${active ? 'text-abla-blue' : 'text-slate-500 hover:bg-abla-blue-soft/60 hover:text-abla-blue'}`}
              >
                {active && <motion.span layoutId="desktop-nav" className="absolute inset-0 -z-10 rounded-full bg-abla-green-soft" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                {active && <span className="absolute right-3 h-2.5 w-2.5 rounded-abla-blob bg-abla-green" aria-hidden="true" />}
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="relative mt-auto overflow-hidden rounded-abla-card bg-abla-blue-soft p-4 pt-16 text-xs leading-5 text-slate-500">
          <AblaCharacter emotion="safe" shape="pill" size="sm" className="absolute -top-1 left-1/2 -translate-x-1/2" />
          <span className="font-bold text-abla-blue">Tu espacio seguro</span><br />
          Habla cuando lo necesites. Estamos contigo.
        </div>
      </div>
    </aside>
  )
}
