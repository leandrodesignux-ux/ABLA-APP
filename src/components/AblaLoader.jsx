import { motion, useReducedMotion } from 'framer-motion'
import AblaCharacter from './AblaCharacter.jsx'

export default function AblaLoader({ label = 'Cargando' }) {
  const reducedMotion = useReducedMotion()
  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
      <motion.div animate={reducedMotion ? {} : { x: [0, -3, 3, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        <AblaCharacter emotion="calm" shape="blob" size="md" />
      </motion.div>
      <span className="text-sm font-semibold text-abla-blue">{label}<span className="sr-only">…</span></span>
    </div>
  )
}
