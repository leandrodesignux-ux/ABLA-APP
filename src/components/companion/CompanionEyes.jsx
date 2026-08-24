import { motion } from 'framer-motion'
import { companionTokens } from './companionTokens.js'
import { gazeOffsets } from './companionVariants.js'

const closedPaths = {
  closed: 'M33 51Q42 57 51 51M69 51Q78 57 87 51',
  relaxed: 'M33 50Q42 55 51 50M69 50Q78 55 87 50',
  happy: 'M33 52Q42 43 51 52M69 52Q78 43 87 52',
  squint: 'M33 51Q42 46 51 51M69 51Q78 46 87 51',
}

export default function CompanionEyes({ expression = 'open', gaze = 'center', blink = false }) {
  if (closedPaths[expression]) return <path d={closedPaths[expression]} fill="none" stroke={companionTokens.color.ink} strokeWidth="4" strokeLinecap="round" />

  const [baseX, baseY] = gazeOffsets[gaze] || gazeOffsets.center
  const worried = expression === 'worried'
  const focused = expression === 'focused'
  const curious = expression === 'curious'
  const surprised = expression === 'surprised'
  const side = expression === 'side'
  const down = expression === 'down'
  const up = expression === 'up'
  const gx = side ? 2.8 : baseX
  const gy = down ? 2.2 : up ? -2.2 : baseY
  const leftRx = surprised ? 11 : curious ? 11 : 10
  const leftRy = surprised ? 13 : curious ? 12 : 11
  const rightRx = surprised ? 10.5 : curious ? 10 : 9.5
  const rightRy = surprised ? 12.5 : curious ? 11 : 10.5

  return <>
    {worried && <path d="M31 43Q41 36 50 42M70 42Q80 36 89 43" fill="none" stroke={companionTokens.color.ink} strokeWidth="3" strokeLinecap="round" />}
    {focused && <path d="M31 40L50 46M89 40L70 46" fill="none" stroke={companionTokens.color.ink} strokeWidth="3" strokeLinecap="round" />}
    <motion.g animate={blink ? { scaleY: [1, 1, 1, .08, 1, 1] } : undefined} transition={blink ? { duration: 7, repeat: Infinity, repeatDelay: 1.1 } : undefined} style={{ transformOrigin: '60px 52px' }}>
      <ellipse cx="43" cy="51" rx={leftRx} ry={leftRy} fill="white" />
      <ellipse cx="78" cy="50" rx={rightRx} ry={rightRy} fill="white" />
    </motion.g>
    <motion.g animate={{ x: gx, y: gy }} transition={{ duration: .2 }} fill={companionTokens.color.ink}>
      <circle cx="45" cy="52" r={surprised ? 4.5 : 5} /><circle cx="80" cy="51" r={surprised ? 4.5 : 5} />
    </motion.g>
  </>
}
