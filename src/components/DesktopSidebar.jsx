import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { getNavigation } from './navigation.js'
import AblaCompanion from './companion/AblaCompanion.jsx'

export default function DesktopSidebar() {
  const { pathname } = useLocation()
  const { perfil } = useAppContext()
  const items = getNavigation(perfil)
  const reducedMotion = useReducedMotion()

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

        <div className="mt-7 border-t border-slate-100 pt-5">
          <p className="px-4 text-[10px] font-black uppercase tracking-[.16em] text-slate-400">Proyecto</p>
          <Link to="/como-lo-construi" className={`relative mt-2 flex min-h-12 items-center gap-3 rounded-full px-4 text-sm font-bold transition-colors ${pathname.startsWith('/como-lo-construi') ? 'bg-abla-green-soft text-abla-blue' : 'text-slate-500 hover:bg-abla-blue-soft/60 hover:text-abla-blue'}`}><BookOpen className="h-5 w-5" /><span>Cómo lo construí</span>{pathname.startsWith('/como-lo-construi') && <span className="absolute right-3 h-2.5 w-2.5 rounded-abla-blob bg-abla-green" aria-hidden="true" />}</Link>
        </div>

        <motion.div initial="idle" animate="idle" whileHover="hover" whileTap="tap" className="relative mt-auto overflow-hidden rounded-abla-card bg-abla-blue-soft p-4 pt-16 text-xs leading-5 text-slate-500">
          <motion.div variants={{ idle: { y: 2 }, hover: { y: reducedMotion ? 2 : -1 }, tap: { y: 2 } }} className="absolute -top-1 left-1/2 -translate-x-1/2"><AblaCompanion personality="empathetic" pose="listening" gaze="left" decorations="none" size="sm" label="ABLA está disponible" /></motion.div>
          <motion.span variants={{ idle: { opacity: .2 }, hover: { opacity: 1 } }} className="absolute right-5 top-5 h-2.5 w-2.5 rotate-45 rounded-sm bg-abla-green/35" />
          <span className="font-bold text-abla-blue">Tu espacio seguro</span><br />
          Habla cuando lo necesites. Estamos contigo.
        </motion.div>
      </div>
    </aside>
  )
}
