import { motion } from 'framer-motion'

function parsePercent(value) {
  const m = String(value).match(/([0-9]+(?:\.[0-9]+)?)/)
  if (!m) return 0
  return Number(m[1])
}

export default function AssetCard({ asset, onSelect, variants }) {
  const volatilityPct = parsePercent(asset.volatility)
  const isAlert = volatilityPct > 5

  return (
    <motion.button
      variants={variants}
      type="button"
      onClick={onSelect}
      className={`glass-panel w-full rounded-xl p-4 text-left ${isAlert ? 'alert-glow' : ''}`}
      aria-label={`Abrir detalle de ${asset.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-tech-data font-mono text-slate-400">{asset.id}</div>
          <div className="mt-1 truncate text-tech-med font-medium text-white">{asset.name}</div>
        </div>
        <div
          className={`rounded-md border px-2 py-1 text-tech-data font-mono ${
            asset.opStatus === 'DEGRADED'
              ? 'border-amber-400/30 bg-amber-400/10 text-amber-200'
              : 'border-cyan-400/20 bg-cyan-400/10 text-industrial-brand'
          }`}
        >
          {asset.opStatus}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3">
        <svg viewBox="0 0 96 20" className="h-10 w-full" role="img" aria-label="Asset trend">
          <defs>
            <linearGradient id={`g-${asset.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#22D3EE" stopOpacity="0.15" />
              <stop offset="1" stopColor="#22D3EE" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke={`url(#g-${asset.id})`}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={asset.points.join(' ')}
          />
        </svg>
      </div>

      <div className="mt-3 grid gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-tech-data text-slate-300">Valor Actual</div>
          <div className="text-tech-reg font-medium text-slate-100">{asset.currentValue}</div>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-tech-data text-slate-300">Volatilidad</div>
          <div className={`text-tech-reg font-medium ${isAlert ? 'text-red-200' : 'text-slate-100'}`}>{asset.volatility}</div>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-tech-data text-slate-300">Estado Operativo</div>
          <div className="text-tech-reg font-medium text-slate-100">{asset.opStatus}</div>
        </div>
      </div>
    </motion.button>
  )
}
