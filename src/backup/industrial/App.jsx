import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import AssetCard from '../../components/AssetCard.jsx'
import DetailDrawer from '../../components/DetailDrawer.jsx'
import Header from '../../components/Header.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import { initialAssets } from '../../data/assets.js'

function formatClock(now) {
  const pad2 = (n) => String(n).padStart(2, '0')
  const pad3 = (n) => String(n).padStart(3, '0')
  return `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}.${pad3(now.getMilliseconds())}`
}

function useActionFeedback() {
  const [state, setState] = useState('idle')

  const run = async () => {
    if (state === 'loading') return
    setState('loading')
    await new Promise((r) => window.setTimeout(r, 900))
    setState('success')
    window.setTimeout(() => setState('idle'), 1200)
  }

  return { state, run }
}

export default function IndustrialDashboardBackup() {
  const [clock, setClock] = useState(() => formatClock(new Date()))
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [assets, setAssets] = useState(() => initialAssets)
  const exportLogs = useActionFeedback()
  const runAudit = useActionFeedback()

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(formatClock(new Date()))
    }, 100)
    return () => window.clearInterval(id)
  }, [])

  void setAssets

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return assets
    return assets.filter((a) => {
      return `${a.id} ${a.name}`.toLowerCase().includes(q)
    })
  }, [assets, query])

  const selectedAsset = useMemo(() => {
    if (!selectedId) return null
    return assets.find((a) => a.id === selectedId) ?? null
  }, [assets, selectedId])

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
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col px-4 py-4">
          <Header clock={clock} query={query} onQueryChange={setQuery} />

          <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAssets.map((a) => (
              <AssetCard key={a.id} asset={a} variants={item} onSelect={() => setSelectedId(a.id)} />
            ))}
          </motion.main>
        </div>
      </div>
      <DetailDrawer
        asset={selectedAsset}
        onClose={() => setSelectedId(null)}
        exportLogs={exportLogs}
        runAudit={runAudit}
      />
    </div>
  )
}
