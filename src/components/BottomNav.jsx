import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { getNavigation } from './navigation.js'

function TabLink({ to, icon: Icon, label, active, preloadRoute }) {
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
      className="flex h-full flex-1 flex-col items-center justify-center relative"
      aria-label={label}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={`flex flex-col items-center justify-center gap-1 text-tech-data font-medium ${
          active ? 'text-abla-green' : 'text-[#94A3B8]'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </motion.div>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-2 h-1 w-1 rounded-full bg-abla-green"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
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
      className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-[#E6E6E6] bg-white md:hidden"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex h-full w-full max-w-[390px] items-stretch">
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
