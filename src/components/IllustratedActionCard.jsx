import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'
import AblaCharacter from './AblaCharacter.jsx'

export default function IllustratedActionCard({ to, title, description, emotion = 'happy', shape = 'blob', scene, className = '' }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div whileHover={motionIfAllowed(reducedMotion, { y: -4 })} className={className}>
      <Link
        to={to}
        className="group flex h-full min-h-40 items-center gap-4 overflow-hidden rounded-abla-card border border-white/70 bg-white p-5 shadow-abla-card transition-shadow hover:shadow-abla-float focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-green/30 md:flex-col md:items-start"
      >
        <motion.div whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)} className="relative grid h-24 w-24 shrink-0 place-items-center rounded-abla-blob bg-abla-green-soft md:h-32 md:w-full">
          {scene || <AblaCharacter emotion={emotion} shape={shape} size="md" />}
        </motion.div>
        <div>
          <h3 className="text-base font-extrabold text-abla-blue md:text-lg">{title}</h3>
          {description && <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>}
        </div>
      </Link>
    </motion.div>
  )
}
