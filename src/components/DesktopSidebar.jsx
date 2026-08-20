import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { getNavigation } from './navigation.js'

export default function DesktopSidebar() {
  const { pathname } = useLocation()
  const { perfil } = useAppContext()
  const items = getNavigation(perfil)

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-56 border-r border-slate-200 bg-white md:flex lg:w-64">
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
                className={`relative flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-abla-green ${active ? 'bg-abla-green/10 text-abla-green' : 'text-slate-500 hover:bg-slate-50 hover:text-abla-blue'}`}
              >
                {active && <motion.span layoutId="desktop-nav" className="absolute inset-y-2 left-0 w-1 rounded-full bg-abla-green" />}
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-abla-bg p-4 text-xs leading-5 text-slate-500">
          <span className="font-semibold text-abla-blue">¿Necesitas apoyo?</span><br />
          ABLA es un espacio seguro y confidencial.
        </div>
      </div>
    </aside>
  )
}
