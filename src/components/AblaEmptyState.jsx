import { motion, useReducedMotion } from 'framer-motion'
import AblaCompanion from './companion/AblaCompanion.jsx'

export default function AblaEmptyState({ title, description, kind = 'empty', action }) {
  const config = {
    empty: { mood: 'neutral', pose: 'resting', gaze: 'left', accessory: 'none' },
    messages: { mood: 'happy', pose: 'listening', gaze: 'right', accessory: 'speech' },
    cases: { mood: 'calm', pose: 'resting', gaze: 'center', decorations: 'none' },
    search: { mood: 'worried', pose: 'thinking', gaze: 'up', accessory: 'question', decorations: 'none' },
  }[kind] || { mood: 'neutral', pose: 'resting', gaze: 'center' }
  const reducedMotion = useReducedMotion()

  return (
    <div className="flex flex-col items-center px-5 py-10 text-center">
      <motion.div initial="idle" animate="idle" whileHover="hover" className="relative grid h-40 w-48 place-items-center overflow-hidden rounded-[48%_52%_44%_56%/58%_44%_56%_42%] bg-abla-blue-soft">
        <motion.span animate={reducedMotion ? undefined : { x: [0, 4, 0], y: [0, -2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-4 top-6 h-8 w-16 rounded-full bg-white/65" />
        <motion.span variants={{ idle: { opacity: .45, scale: .9 }, hover: { opacity: 1, scale: 1 } }} className="absolute right-5 top-5 h-3 w-3 rotate-45 rounded-sm bg-abla-green/30" />
        <motion.div animate={reducedMotion ? undefined : { y: [2, -2, 2] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-3 left-1/2 -translate-x-1/2"><AblaCompanion {...config} size="lg" label={title} /></motion.div>
      </motion.div>
      <h3 className="mt-5 text-lg font-extrabold text-abla-blue">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
