import { motion, useReducedMotion } from 'framer-motion'
import CompanionAccessory from './CompanionAccessory.jsx'
import CompanionArms from './CompanionArms.jsx'
import CompanionBody from './CompanionBody.jsx'
import CompanionEyes from './CompanionEyes.jsx'
import CompanionMouth from './CompanionMouth.jsx'
import CompanionDecorations from './CompanionDecorations.jsx'
import { companionTokens } from './companionTokens.js'
import { moodFaces, personalityDefaults } from './companionVariants.js'

export default function AblaCompanion({ personality = 'friendly', mood, pose, gaze, eyeExpression, mouthExpression, accessory = 'none', decorations, size = 'md', interactive = false, animate = true, label, className = '' }) {
  const reducedMotion = useReducedMotion()
  const defaults = personalityDefaults[personality] || personalityDefaults.friendly
  const currentMood = mood || defaults.mood
  const face = moodFaces[currentMood] || moodFaces.neutral
  const currentPose = pose || defaults.pose
  const currentGaze = gaze || defaults.gaze
  const dimension = companionTokens.scale[size] || companionTokens.scale.md
  const large = ['lg', 'xl', 'hero'].includes(size)
  const medium = ['md', 'lg', 'xl', 'hero'].includes(size)
  const states = interactive ? { initial: 'idle', animate: 'idle', whileHover: 'hover', whileTap: 'tap' } : {}
  const bodyVariants = { idle: { scale: 1, y: 0, rotate: 0 }, hover: { scaleX: reducedMotion ? 1 : 1.025, scaleY: reducedMotion ? 1 : .985, y: reducedMotion ? 0 : -2, rotate: reducedMotion ? 0 : 1 }, tap: { scaleX: reducedMotion ? 1 : 1.025, scaleY: reducedMotion ? 1 : .95, y: 1 } }
  const armVariants = { idle: { y: 0 }, hover: { y: reducedMotion ? 0 : -2 }, tap: { y: 1 } }
  return <motion.svg viewBox="0 0 120 120" width={dimension} height={dimension} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...states}>
    <motion.g animate={!reducedMotion && animate && personality === 'calm' ? { scaleX: [1, .995, 1], scaleY: [1, 1.015, 1] } : undefined} transition={{ duration: companionTokens.timing.calm, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '60px 64px' }}>
      {size !== 'xs' && <CompanionArms pose={currentPose} variants={armVariants} />}
      <CompanionBody variants={bodyVariants} />
      <g color={companionTokens.color.ink}><CompanionEyes expression={eyeExpression || face.eyes} gaze={currentGaze} blink={!reducedMotion && animate && large} /><CompanionMouth expression={mouthExpression || face.mouth} /></g>
      {medium && <CompanionAccessory type={accessory} />}
      <CompanionDecorations type={decorations || (personality === 'curious' ? 'question' : personality === 'motivating' ? 'energy' : personality === 'empathetic' ? 'heart' : 'subtle')} visible={large} />
    </motion.g>
  </motion.svg>
}
