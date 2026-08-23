import { motion, useReducedMotion } from 'framer-motion'
import { ablaMotion, characterPartVariants, motionIfAllowed } from '../design/motion.js'

const sizes = { xs: 44, sm: 64, md: 96, lg: 144, xl: 208 }

const expressions = {
  happy: { eyes: 'squint', mouth: 'M37 61Q50 74 63 60', tone: '#56A087', cheeks: true },
  calm: { eyes: 'closed', mouth: 'M41 63Q50 68 59 63', tone: '#9CCBBB' },
  neutral: { eyes: 'side-eye', mouth: 'M42 65Q50 66 58 64', tone: '#B8D9CE', brow: true },
  sad: { eyes: 'sleepy', mouth: 'M39 70Q50 61 61 70', tone: '#9EB0CA', cheeks: true },
  worried: { eyes: 'worried', mouth: 'M42 68Q50 62 58 68', tone: '#A8B8CE', detail: 'drop' },
  anxious: { eyes: 'surprised', mouth: 'M46 64Q50 70 54 64', tone: '#8FB8AA', detail: 'lines' },
  angry: { eyes: 'angry', mouth: 'M41 69Q50 62 59 69', tone: '#E58B83', detail: 'lines' },
  safe: { eyes: 'closed', mouth: 'M38 62Q50 72 62 61', tone: '#56A087', cheeks: true },
  chat: { eyes: 'big', mouth: 'M42 61Q50 69 58 61', tone: '#75B49F', cheeks: true },
  help: { eyes: 'open', mouth: 'M41 62Q50 69 59 62', tone: '#87A0C0', brow: true },
  report: { eyes: 'focused', mouth: 'M45 64H55', tone: '#6D829F', detail: 'lines' },
  success: { eyes: 'squint', mouth: 'M36 59Q50 75 64 59', tone: '#56A087', cheeks: true },
}

const bodyPaths = {
  circle: 'M50 12C72 11 87 26 88 48C90 70 75 87 52 88C29 90 12 74 12 51C11 28 27 13 50 12Z',
  pill: 'M22 25C33 19 67 19 78 25C91 32 92 50 83 64C75 77 29 80 17 67C5 54 8 33 22 25Z',
  blob: 'M19 35C25 17 43 11 59 16C72 13 87 26 86 42C94 56 82 77 66 81C54 92 31 84 24 73C10 66 9 47 19 35Z',
  wave: 'M10 48C13 28 29 17 45 23C57 31 68 17 82 27C97 38 88 62 76 70C65 86 42 83 29 75C14 72 7 60 10 48Z',
  'soft-star': 'M50 9C58 9 60 25 66 29C74 32 87 24 92 31C97 39 80 50 80 58C81 67 92 79 85 85C78 91 65 79 56 82C47 85 40 96 31 92C23 88 30 72 24 67C18 61 5 61 6 51C7 42 23 42 27 34C31 25 27 12 36 9C41 7 45 10 50 9Z',
  stack: 'M24 20C35 10 66 9 76 21C83 29 80 39 73 45C85 50 90 62 84 73C77 88 61 88 48 86C32 89 17 80 15 66C13 56 18 48 27 43C19 37 17 27 24 20Z',
  pebble: 'M21 42C24 25 39 17 57 19C75 20 86 33 84 52C82 72 66 82 47 81C28 80 14 66 17 49C18 46 19 44 21 42Z',
  arch: 'M16 70C17 42 27 20 49 17C72 14 85 37 85 69C76 80 26 82 16 70Z',
  drop: 'M51 9C61 25 80 39 80 58C80 76 67 87 50 87C31 87 19 75 20 57C21 39 41 25 51 9Z',
}

const poses = {
  rest: ['M20 55Q10 59 12 69', 'M80 55Q90 59 88 69'],
  open: ['M20 53Q8 48 5 39', 'M80 53Q92 48 95 39'],
  wave: ['M20 54Q9 58 10 68', 'M80 52Q92 43 88 31'],
  hug: ['M20 54Q32 61 39 65', 'M80 54Q68 61 61 65'],
  point: ['M20 55Q10 58 11 68', 'M80 53Q91 49 96 43'],
  hide: ['M20 55Q29 65 39 64', 'M80 55Q70 65 61 64'],
  raised: ['M20 52Q8 47 8 36', 'M80 52Q92 47 92 36'],
  tense: ['M20 54Q12 50 10 57', 'M80 54Q88 50 90 57'],
}

const gazeX = { left: -1.8, right: 1.8, center: 0 }

function EyeRig({ type, gaze, variants, blink, blinkDelay }) {
  if (type === 'closed') return <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M30 49Q37 54 44 49" /><path d="M56 49Q63 54 70 49" /></g>
  if (type === 'squint') return <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M30 49Q37 42 44 49" /><path d="M56 49Q63 42 70 49" /></g>
  if (type === 'angry' || type === 'focused') return <><g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M29 42L44 47" /><path d="M71 42L56 47" /></g><motion.g variants={variants} fill="currentColor"><circle cx="38" cy="50" r="3.2" /><circle cx="62" cy="50" r="3.2" /></motion.g></>
  const big = type === 'big' || type === 'surprised'
  const tiny = type === 'tiny'
  const sleepy = type === 'sleepy'
  const worried = type === 'worried'
  const rx = tiny ? 2.5 : big ? 7 : 5
  const ry = tiny ? 3 : sleepy ? 3.2 : big ? 8 : 6
  const pupil = big ? 3 : tiny ? 1.5 : 2.4
  const gx = type === 'side-eye' ? 2 : gazeX[gaze] || 0
  const gy = gaze === 'up' ? -1.5 : gaze === 'down' ? 1.5 : 0
  return <>
    {worried && <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M29 42Q37 37 44 42" /><path d="M56 42Q63 37 71 43" /></g>}
    <motion.g animate={blink ? { scaleY: [1, 1, 1, 0.08, 1, 1] } : undefined} transition={blink ? { duration: 6.2, delay: blinkDelay, repeat: Infinity, repeatDelay: 1.3 } : undefined} style={{ transformOrigin: '50px 49px' }} fill="white"><ellipse cx="37" cy="49" rx={rx} ry={ry} /><ellipse cx="63" cy="49" rx={rx} ry={ry} /></motion.g>
    <motion.g variants={variants} fill="currentColor" transform={`translate(${gx} ${gy})`}><circle cx="37" cy="50" r={pupil} /><circle cx="63" cy="50" r={pupil} /></motion.g>
  </>
}

function Details({ expression }) {
  return <>
    {expression.cheeks && <g fill="#FFFFFF" opacity=".28"><ellipse cx="29" cy="59" rx="5" ry="2.4" /><ellipse cx="71" cy="59" rx="5" ry="2.4" /></g>}
    {expression.detail === 'drop' && <path d="M76 38C80 43 80 47 76 48C72 47 72 43 76 38Z" fill="#DCECE7" />}
    {expression.detail === 'lines' && <g fill="none" stroke="#3F5577" strokeWidth="2" strokeLinecap="round"><path d="M17 37L10 33" /><path d="M83 37L90 33" /></g>}
  </>
}

export default function AblaCharacter({ emotion = 'happy', shape = 'blob', size = 'md', className = '', animate = 'none', arms = true, pose = 'rest', gaze = 'center', interaction = 'friendly', interactive = false, decoration = false, accessory, blink, selected = false, label }) {
  const reducedMotion = useReducedMotion()
  const expression = expressions[emotion] || expressions.happy
  const dimension = sizes[size] || sizes.md
  const detailed = size === 'lg' || size === 'xl'
  const shouldBlink = !reducedMotion && (blink ?? (detailed && ['big', 'open', 'worried', 'side-eye', 'surprised'].includes(expression.eyes)))
  const parts = characterPartVariants(interaction, reducedMotion)
  const ambient = animate === 'float' ? ablaMotion.float : animate === 'breathe' ? ablaMotion.breathe : animate === 'wiggle' ? ablaMotion.wiggle : {}
  const stateProps = interactive ? { initial: 'idle', animate: selected ? 'selected' : 'idle', whileHover: 'hover', whileTap: 'tap' } : {}
  const [leftArm, rightArm] = poses[pose] || poses.rest
  return <motion.svg viewBox="0 0 100 100" width={dimension} height={dimension} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...stateProps}>
    <motion.g animate={motionIfAllowed(reducedMotion, ambient)} style={{ transformOrigin: '50px 50px' }}>
      {decoration && <motion.g variants={parts.decoration} style={{ transformOrigin: '82px 20px' }}><circle cx="12" cy="25" r="3" fill="#DCECE7" /><path d="M83 12l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z" fill="#C7D2E2" />{detailed && <><circle cx="91" cy="65" r="2.5" fill="#DCECE7" /><path d="M17 77Q11 73 9 66" fill="none" stroke="#C7D2E2" strokeWidth="2" strokeLinecap="round" /></>}</motion.g>}
      {arms && <motion.g variants={parts.arms} fill="none" stroke="#3F5577" strokeWidth="3" strokeLinecap="round"><path d={leftArm} /><path d={rightArm} /></motion.g>}
      <motion.g variants={parts.body} style={{ transformOrigin: '50px 50px' }}><path d={bodyPaths[shape] || bodyPaths.blob} fill={expression.tone} /><Details expression={expression} /></motion.g>
      <g color="#3F5577"><EyeRig type={expression.eyes} gaze={gaze} variants={parts.pupils} blink={shouldBlink} blinkDelay={(emotion.length % 4) * 0.55} />{expression.brow && <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M30 40Q37 37 43 40" /><path d="M57 40Q63 37 70 41" /></g>}<motion.path variants={parts.mouth} d={expression.mouth} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '50px 65px' }} /></g>
      {accessory}
    </motion.g>
  </motion.svg>
}
