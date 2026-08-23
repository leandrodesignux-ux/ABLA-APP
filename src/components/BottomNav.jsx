import { motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { getNavigation } from './navigation.js'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

function TabLink({ to, icon: Icon, label, active, preloadRoute }) {
  const reducedMotion = useReducedMotion()
  const handlePreload = () => {
    const preload = preloadRoute[to]
    if (preload && !active) {
      preload()
    }
  }

  return (
    <Link
      to={to}
      onMouseEnter={handlePreload}
      onTouchStart={handlePreload}
      className="relative flex h-full flex-1 items-center justify-center px-1"
      aria-label={label}
    >
      <motion.div
        whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)}
        className={`relative z-10 flex min-w-12 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-bold transition-colors ${
          active ? 'text-abla-blue' : 'text-slate-400'
        }`}
      >
        {active && <motion.span layoutId="mobile-nav-pill" className="absolute inset-0 -z-10 rounded-full bg-abla-green-soft" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </motion.div>
    </Link>
  )
}

export default function BottomNav() {
  const location = useLocation()
  const pathname = location?.pathname || '/'
  const { perfil } = useAppContext()

  const items = getNavigation(perfil)

  const preloadRoute = perfil === 'profesional' ? {
    '/home/profesional': () => import('../pages/HomeProfesional.jsx'),
    '/chat': () => import('../pages/ChatSelect.jsx'),
    '/protocolos': () => import('../pages/Protocolos.jsx'),
    '/bitacora': () => import('../pages/Bitacora.jsx'),
    '/faqs': () => import('../pages/FAQs.jsx'),
    '/perfil': () => import('../pages/Perfil.jsx'),
  } : perfil === 'apoderado' ? {
    '/home/apoderado': () => import('../pages/HomeApoderado.jsx'),
    '/ayuda/cita': () => import('../pages/AyudaCita.jsx'),
    '/protocolos': () => import('../pages/Protocolos.jsx'),
    '/bitacora': () => import('../pages/Bitacora.jsx'),
    '/apoderado/nee': () => import('../pages/CertificadosNEE.jsx'),
    '/perfil': () => import('../pages/Perfil.jsx'),
  } : {
    '/home': () => import('../pages/Home.jsx'),
    '/chat': () => import('../pages/ChatSelect.jsx'),
    '/ayuda': () => import('../pages/Ayuda.jsx'),
    '/reportar': () => import('../pages/Reportar.jsx'),
    '/perfil': () => import('../pages/Perfil.jsx'),
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 h-[72px] border-t border-white/80 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_35px_rgba(63,85,119,.08)] backdrop-blur-xl md:hidden"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex h-full w-full max-w-lg items-stretch">
        {items.map((item) => (
          <TabLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={item.match(pathname)}
            preloadRoute={preloadRoute}
          />
        ))}
      </div>
    </nav>
  )
}
