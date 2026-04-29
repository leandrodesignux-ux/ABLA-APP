import { Search } from 'lucide-react'

export default function Header({ clock, query, onQueryChange }) {
  return (
    <header className="glass-panel flex items-center justify-between gap-3 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-abla-green" />
        <div className="text-tech-med font-medium tracking-wide text-slate-100">SYSTEM_ONLINE</div>
        <div className="text-tech-data text-slate-400">/ Industrial Asset Dashboard</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search assets"
            className="h-8 w-44 rounded-lg border border-white/10 bg-black/15 pl-8 pr-2 text-tech-reg text-slate-100 placeholder:text-slate-400 focus:border-cyan-300/40 focus:outline-none"
            aria-label="Buscar activos"
          />
        </div>
        <div className="text-tech-data font-mono text-abla-green">{clock}</div>
      </div>
    </header>
  )
}
