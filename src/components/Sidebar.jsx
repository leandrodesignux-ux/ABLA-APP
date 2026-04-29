import { Boxes, History, LayoutGrid, Settings } from 'lucide-react'

function NavIconButton({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-16 border-r border-white/5 bg-black/10">
      <div className="flex h-full flex-col items-center gap-3 py-4">
        <div className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl">
          <LayoutGrid className="h-5 w-5 text-industrial-brand" />
        </div>

        <nav className="mt-3 flex flex-col items-center gap-2">
          <NavIconButton icon={LayoutGrid} label="Navegación" />
          <NavIconButton icon={Boxes} label="Activos" />
          <NavIconButton icon={History} label="Historial" />
          <NavIconButton icon={Settings} label="Configuración" />
        </nav>
      </div>
    </aside>
  )
}
