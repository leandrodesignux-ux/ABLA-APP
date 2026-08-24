import { motion, useReducedMotion } from 'framer-motion'
import { companionTokens } from '../companion/companionTokens.js'
import { moodVisuals, normalizeMood } from './moodVisuals.js'

const sizes = { xs: 30, sm: 48, md: 76, lg: 112, xl: 160 }

function MoodFace({ mood }) {
  if (mood === 'bien') return <g fill="none" stroke={companionTokens.color.ink} strokeLinecap="round"><path d="M34 53Q42 44 50 53M70 53Q78 44 86 53" strokeWidth="4" /><path d="M49 69Q60 80 72 68" strokeWidth="4" /></g>
  if (mood === 'mal') return <g fill="none" stroke={companionTokens.color.ink} strokeLinecap="round"><path d="M34 55Q42 48 50 54M70 54Q78 48 86 55" strokeWidth="3.5" /><path d="M51 75Q60 67 70 75" strokeWidth="3.5" /></g>
  return <g><ellipse cx="43" cy="53" rx="8" ry="9" fill="white" /><ellipse cx="78" cy="52" rx="8" ry="9" fill="white" /><circle cx="46" cy="54" r="4" fill={companionTokens.color.ink} /><circle cx="81" cy="53" r="4" fill={companionTokens.color.ink} /><path d="M55 71H67" fill="none" stroke={companionTokens.color.ink} strokeWidth="3.5" strokeLinecap="round" /></g>
}

function MoodGesture({ mood }) {
  if (mood === 'bien') return <g fill="none" stroke={companionTokens.color.ink} strokeWidth="4" strokeLinecap="round"><path d="M18 64Q8 57 10 48" /><path d="M101 63Q112 56 110 47" /></g>
  if (mood === 'mal') return <g fill="none" stroke={companionTokens.color.ink} strokeWidth="4" strokeLinecap="round"><path d="M18 70Q10 72 12 82" /><path d="M101 69Q110 71 108 81" /></g>
  return <g fill="none" stroke={companionTokens.color.ink} strokeWidth="4" strokeLinecap="round"><path d="M18 62Q10 67 12 76" /><path d="M100 58Q109 53 109 45" /></g>
}

export default function MoodShape({ mood = 'mas_o_menos', size = 'md', selected = false, interactive = false, animate = true, label, className = '' }) {
  const reducedMotion = useReducedMotion()
  const key = normalizeMood(mood)
  const visual = moodVisuals[key]
  const dimension = sizes[size] || sizes.md
  const states = interactive ? { initial: 'idle', animate: selected ? 'selected' : 'idle', whileHover: 'hover', whileTap: 'tap' } : {}
  const variants = {
    idle: { y: 0, x: 0, rotate: 0, scale: 1 },
    hover: reducedMotion ? {} : key === 'bien' ? { y: -4, scale: 1.035 } : key === 'mal' ? { scaleY: .985, y: 1 } : { x: 3, rotate: 1.5 },
    tap: reducedMotion ? {} : { scale: .97 },
    selected: reducedMotion ? {} : { scale: 1.035 },
  }

  return <motion.svg viewBox="0 0 120 120" width={dimension} height={dimension} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...states}>
    <motion.g variants={variants} animate={!interactive && animate && !reducedMotion ? visual.motion : undefined} style={{ transformOrigin: '60px 62px' }}>
      <MoodGesture mood={key} />
      <path d={visual.bodyPath} fill={visual.color} />
      <path d="M31 27C44 20 72 18 88 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity=".1" />
      <MoodFace mood={key} />
      {key === 'bien' && selected && <g fill="#F5B82E"><path d="M102 18l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" /><circle cx="18" cy="28" r="3" /></g>}
    </motion.g>
  </motion.svg>
}
