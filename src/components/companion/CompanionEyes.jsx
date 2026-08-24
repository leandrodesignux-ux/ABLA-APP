import { motion } from 'framer-motion'
import { companionTokens } from './companionTokens.js'
import { gazeOffsets } from './companionVariants.js'

export default function CompanionEyes({ expression = 'open', gaze = 'center', blink = false }) {
  if (['closed', 'happy', 'relaxed'].includes(expression)) {
    const arch = expression === 'happy' ? 'M34 52Q42 44 50 52M70 52Q78 44 86 52' : 'M34 51Q42 57 50 51M70 51Q78 57 86 51'
    return <path d={arch} fill="none" stroke={companionTokens.color.ink} strokeWidth="4" strokeLinecap="round" />
  }
  const [gx, gy] = gazeOffsets[gaze] || gazeOffsets.center
  const worried = expression === 'worried'
  const focused = expression === 'focused'
  const curious = expression === 'curious'
  return <>
    {(worried || focused) && <path d={focused ? 'M31 40L50 46M89 40L70 46' : 'M31 43Q41 36 50 42M70 42Q80 36 89 43'} fill="none" stroke={companionTokens.color.ink} strokeWidth="3" strokeLinecap="round" />}
    <motion.g animate={blink ? { scaleY: [1, 1, 1, .08, 1, 1] } : undefined} transition={blink ? { duration: 7, repeat: Infinity, repeatDelay: 1.1 } : undefined} style={{ transformOrigin: '60px 52px' }}>
      <ellipse cx="43" cy="51" rx={curious ? 11 : 10} ry={curious ? 12 : 11} fill="white" />
      <ellipse cx="78" cy="50" rx={curious ? 10 : 9.5} ry={curious ? 11 : 10.5} fill="white" />
    </motion.g>
    <motion.g animate={{ x: gx, y: gy }} transition={{ duration: .2 }} fill={companionTokens.color.ink}>
      <circle cx="45" cy="52" r="5" /><circle cx="80" cy="51" r="5" />
    </motion.g>
  </>
}

