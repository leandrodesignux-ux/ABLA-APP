import { Home, HeartHandshake, AlertTriangle, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function TabLink({ to, icon: Icon, label, active }) {
  return (
    <Link
      to={to}
      className="flex h-full flex-1 flex-col items-center justify-center"
      aria-label={label}
    >
      <div
        className={`flex flex-col items-center justify-center gap-1 text-tech-data font-medium ${
          active ? 'text-abla-green' : 'text-[#94A3B8]'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
        <span className={`mt-1 h-1 w-1 rounded-full ${active ? 'bg-abla-green' : 'bg-transparent'}`} />
      </div>
    </Link>
  )
}

export default function BottomNav() {
  const location = useLocation()
  const pathname = location?.pathname || '/'

  const items = [
    { to: '/', label: 'Home', icon: Home, match: (p) => p === '/' },
    { to: '/ayuda', label: 'Ayuda', icon: HeartHandshake, match: (p) => p.startsWith('/ayuda') },
    { to: '/reportar', label: 'Reportar', icon: AlertTriangle, match: (p) => p.startsWith('/reportar') },
    { to: '/perfil', label: 'Perfil', icon: User, match: (p) => p.startsWith('/perfil') },
  ]

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
          />
        ))}
      </div>
    </nav>
  )
}
