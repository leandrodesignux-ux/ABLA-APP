import { CircleHelp, Home, ShieldAlert, User } from 'lucide-react'

function TabButton({ icon: Icon, label, active }) {
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 text-tech-data font-medium ${
        active ? 'text-industrial-brand' : 'text-slate-500'
      }`}
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  )
}

export default function BottomNav({ active = 'home' }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-around px-4 py-2">
        <TabButton icon={Home} label="Home" active={active === 'home'} />
        <TabButton icon={CircleHelp} label="Ayuda" active={active === 'help'} />
        <TabButton icon={ShieldAlert} label="Reportar" active={active === 'report'} />
        <TabButton icon={User} label="Perfil" active={active === 'profile'} />
      </div>
    </nav>
  )
}
