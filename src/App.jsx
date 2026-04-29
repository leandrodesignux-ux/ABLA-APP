import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Boxes, History, LayoutGrid, Settings } from 'lucide-react'

function formatClock(now) {
  const pad2 = (n) => String(n).padStart(2, '0')
  const pad3 = (n) => String(n).padStart(3, '0')
  return `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}.${pad3(now.getMilliseconds())}`
}

function App() {
  const [clock, setClock] = useState(() => formatClock(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(formatClock(new Date()))
    }, 100)
    return () => window.clearInterval(id)
  }, [])

  const assets = useMemo(
    () => [
      {
        id: 'AST-01',
        name: 'Bomba Principal / P-001',
        currentValue: '128.4 kPa',
        volatility: '±0.7%',
        opStatus: 'OPERATIVE',
        points: [2, 12, 18, 9, 26, 14, 35, 7, 44, 10, 55, 6, 66, 11, 78, 5, 92, 9],
      },
      {
        id: 'AST-02',
        name: 'Compresor / C-014',
        currentValue: '74.1 A',
        volatility: '±1.3%',
        opStatus: 'OPERATIVE',
        points: [2, 8, 14, 10, 24, 6, 34, 13, 45, 9, 56, 12, 68, 7, 80, 11, 92, 6],
      },
      {
        id: 'AST-03',
        name: 'Válvula Crítica / V-778',
        currentValue: '0.92 bar',
        volatility: '±2.4%',
        opStatus: 'DEGRADED',
        points: [2, 14, 12, 11, 22, 15, 34, 10, 46, 16, 58, 9, 70, 13, 82, 8, 92, 12],
      },
      {
        id: 'AST-04',
        name: 'Turbina Aux / T-208',
        currentValue: '3,410 RPM',
        volatility: '±0.4%',
        opStatus: 'OPERATIVE',
        points: [2, 10, 14, 9, 26, 11, 38, 8, 50, 10, 60, 7, 72, 9, 84, 6, 92, 8],
      },
      {
        id: 'AST-05',
        name: 'Sensor Flujo / F-112',
        currentValue: '44.6 L/min',
        volatility: '±0.9%',
        opStatus: 'OPERATIVE',
        points: [2, 9, 16, 12, 28, 8, 40, 13, 52, 9, 64, 14, 76, 8, 88, 12, 92, 10],
      },
      {
        id: 'AST-06',
        name: 'Nodo PLC / N-03',
        currentValue: '0.18 ms',
        volatility: '±0.2%',
        opStatus: 'OPERATIVE',
        points: [2, 7, 14, 8, 26, 6, 38, 9, 50, 5, 62, 8, 74, 6, 86, 9, 92, 7],
      },
    ],
    []
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-industrial-bg text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl">
        <aside className="w-16 border-r border-white/5 bg-black/10">
          <div className="flex h-full flex-col items-center gap-3 py-4">
            <div className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl">
              <LayoutGrid className="h-5 w-5 text-industrial-brand" />
            </div>

            <nav className="mt-3 flex flex-col items-center gap-2">
              <button
                type="button"
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200"
                aria-label="Navegación"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200"
                aria-label="Activos"
              >
                <Boxes className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200"
                aria-label="Historial"
              >
                <History className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200"
                aria-label="Configuración"
              >
                <Settings className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col px-4 py-4">
          <header className="glass-panel flex items-center justify-between rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-industrial-brand" />
              <div className="text-tech-med font-medium tracking-wide text-slate-100">SYSTEM_ONLINE</div>
              <div className="text-tech-data text-slate-400">/ Industrial Asset Dashboard</div>
            </div>

            <div className="text-tech-data font-mono text-industrial-brand">{clock}</div>
          </header>

          <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {assets.map((a) => (
              <motion.section key={a.id} variants={item} className="glass-panel rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-tech-data font-mono text-slate-400">{a.id}</div>
                    <div className="mt-1 truncate text-tech-med font-medium text-white">{a.name}</div>
                  </div>
                  <div
                    className={`rounded-md border px-2 py-1 text-tech-data font-mono ${
                      a.opStatus === 'DEGRADED'
                        ? 'border-amber-400/30 bg-amber-400/10 text-amber-200'
                        : 'border-cyan-400/20 bg-cyan-400/10 text-industrial-brand'
                    }`}
                  >
                    {a.opStatus}
                  </div>
                </div>

                <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3">
                  <svg viewBox="0 0 96 20" className="h-10 w-full" role="img" aria-label="Asset trend">
                    <defs>
                      <linearGradient id={`g-${a.id}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#22D3EE" stopOpacity="0.15" />
                        <stop offset="1" stopColor="#22D3EE" stopOpacity="0.65" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke={`url(#g-${a.id})`}
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      points={a.points.join(' ')}
                    />
                  </svg>
                </div>

                <div className="mt-3 grid gap-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-tech-data text-slate-400">Valor Actual</div>
                    <div className="text-tech-reg font-medium text-slate-100">{a.currentValue}</div>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-tech-data text-slate-400">Volatilidad</div>
                    <div className="text-tech-reg font-medium text-slate-100">{a.volatility}</div>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-tech-data text-slate-400">Estado Operativo</div>
                    <div className="text-tech-reg font-medium text-slate-100">{a.opStatus}</div>
                  </div>
                </div>
              </motion.section>
            ))}
          </motion.main>
        </div>
      </div>
    </div>
  )
}

export default App
