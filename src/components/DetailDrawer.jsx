import { AnimatePresence, motion } from 'framer-motion'
import { Check, LoaderCircle, X } from 'lucide-react'

const drawer = {
  hidden: { x: '100%' },
  show: {
    x: 0,
    transition: { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 },
  },
}

const drawerBackdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

function ActionButton({ label, onClick, feedback, variant }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-panel flex h-10 items-center justify-center gap-2 rounded-xl border text-tech-reg font-medium text-white ${
        variant === 'primary'
          ? 'border-cyan-400/20 bg-cyan-400/10'
          : 'border-white/10 bg-white/5'
      }`}
      aria-label={label}
    >
      {feedback?.state === 'loading' && <LoaderCircle className="h-4 w-4 animate-spin text-abla-green" />}
      {feedback?.state === 'success' && <Check className="h-4 w-4 text-abla-green" />}
      {feedback?.state === 'idle' && <span className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  )
}

export default function DetailDrawer({ asset, onClose, exportLogs, runAudit }) {
  return (
    <>
      <AnimatePresence>
        {asset && (
          <motion.div
            key="drawer-backdrop"
            variants={drawerBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/35"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {asset && (
          <motion.aside
            key="drawer"
            variants={drawer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="glass-panel fixed right-0 top-0 z-50 h-full w-[30vw] min-w-[340px] max-w-[520px] p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle del activo ${asset.id}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-tech-data font-mono text-slate-200">{asset.id}</div>
                <div className="mt-1 truncate text-tech-med font-medium text-white">{asset.name}</div>
              </div>

              <button
                type="button"
                className="glass-panel flex h-9 w-9 items-center justify-center rounded-xl text-slate-100"
                onClick={onClose}
                aria-label="Cerrar panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="text-tech-data font-mono text-slate-300">Valor Actual</div>
                <div className="mt-1 text-tech-med font-medium text-white">{asset.currentValue}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="text-tech-data font-mono text-slate-300">Volatilidad</div>
                <div className="mt-1 text-tech-med font-medium text-white">{asset.volatility}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="text-tech-data font-mono text-slate-300">Estado Operativo</div>
                <div className="mt-1 text-tech-med font-medium text-white">{asset.opStatus}</div>
              </div>
            </div>

            <div className="mt-5 grid gap-2">
              <ActionButton
                label="Exportar Logs"
                onClick={exportLogs?.run}
                feedback={exportLogs}
                variant="secondary"
              />
              <ActionButton
                label="Ejecutar Auditoría"
                onClick={runAudit?.run}
                feedback={runAudit}
                variant="primary"
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
