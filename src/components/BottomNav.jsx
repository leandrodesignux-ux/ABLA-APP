import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Calendar,
  ClipboardList,
  Heart,
  HeartHandshake,
  HelpCircle,
  Home,
  MessageCircle,
  Shield,
  User,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'

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

  const itemsEstudiante = [
    { to: '/home', label: 'Home', icon: Home, match: (p) => p === '/home' || p === '/' },
    { to: '/chat', label: 'Chat', icon: MessageCircle, match: (p) => p.startsWith('/chat') },
    { to: '/ayuda', label: 'Ayuda', icon: HeartHandshake, match: (p) => p.startsWith('/ayuda') },
    { to: '/reportar', label: 'Reportar', icon: AlertTriangle, match: (p) => p.startsWith('/reportar') },
    { to: '/perfil', label: 'Perfil', icon: User, match: (p) => p.startsWith('/perfil') },
  ]

  const itemsApoderado = [
    { to: '/home/apoderado', label: 'Inicio', icon: Home, match: (p) => p === '/home/apoderado' },
    { to: '/ayuda/cita', label: 'Cita', icon: Calendar, match: (p) => p.startsWith('/ayuda') },
    { to: '/protocolos', label: 'Protocolos', icon: Shield, match: (p) => p.startsWith('/protocolos') },
    { to: '/apoderado/nee', label: 'Mi hijo/a', icon: Heart, match: (p) => p.startsWith('/apoderado') },
    { to: '/perfil', label: 'Perfil', icon: User, match: (p) => p.startsWith('/perfil') },
  ]

  const itemsProfesional = [
    { to: '/home/profesional', label: 'Casos', icon: ClipboardList, match: (p) => p === '/home/profesional' },
    { to: '/chat', label: 'Chat', icon: MessageCircle, match: (p) => p.startsWith('/chat') },
    { to: '/protocolos', label: 'Protocolos', icon: Shield, match: (p) => p.startsWith('/protocolos') },
    { to: '/faqs', label: 'FAQs', icon: HelpCircle, match: (p) => p.startsWith('/faqs') },
    { to: '/perfil', label: 'Perfil', icon: User, match: (p) => p.startsWith('/perfil') },
  ]

  const items = perfil === 'apoderado'
    ? itemsApoderado
    : perfil === 'profesional'
      ? itemsProfesional
      : itemsEstudiante

  const preloadRoute = perfil === 'profesional' ? {
    '/home/profesional': () => import('../pages/HomeProfesional.jsx'),
    '/chat': () => import('../pages/ChatSelect.jsx'),
    '/protocolos': () => import('../pages/Protocolos.jsx'),
    '/faqs': () => import('../pages/FAQs.jsx'),
    '/perfil': () => import('../pages/Perfil.jsx'),
  } : perfil === 'apoderado' ? {
    '/home/apoderado': () => import('../pages/HomeApoderado.jsx'),
    '/ayuda/cita': () => import('../pages/AyudaCita.jsx'),
    '/protocolos': () => import('../pages/Protocolos.jsx'),
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
      className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-[#E6E6E6] bg-white"
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
