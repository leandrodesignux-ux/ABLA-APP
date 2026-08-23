import { motion, useReducedMotion } from 'framer-motion'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const sizes = { xs: 44, sm: 64, md: 96, lg: 144, xl: 208 }

const expressions = {
  happy: { eyes: 'happy', mouth: 'M38 61 Q50 72 62 61', tone: '#56A087' },
  calm: { eyes: 'calm', mouth: 'M42 63 Q50 67 58 63', tone: '#9CCBBB' },
  neutral: { eyes: 'open', mouth: 'M43 65 H57', tone: '#B8D9CE' },
  sad: { eyes: 'soft', mouth: 'M40 70 Q50 61 60 70', tone: '#9EB0CA' },
  worried: { eyes: 'worried', mouth: 'M43 67 Q50 62 57 67', tone: '#A8B8CE' },
  anxious: { eyes: 'wide', mouth: 'M46 64 Q50 69 54 64', tone: '#8FB8AA' },
  angry: { eyes: 'angry', mouth: 'M42 69 Q50 62 58 69', tone: '#E58B83' },
  safe: { eyes: 'calm', mouth: 'M39 62 Q50 72 61 62', tone: '#56A087' },
  chat: { eyes: 'open', mouth: 'M43 62 Q50 68 57 62', tone: '#75B49F' },
  help: { eyes: 'soft', mouth: 'M42 62 Q50 68 58 62', tone: '#87A0C0' },
  report: { eyes: 'wide', mouth: 'M46 63 H54', tone: '#6D829F' },
  success: { eyes: 'happy', mouth: 'M37 60 Q50 74 63 60', tone: '#56A087' },
}

const bodyPaths = {
  circle: <circle cx="50" cy="50" r="37" />,
  pill: <rect x="12" y="24" width="76" height="52" rx="26" />,
  blob: <path d="M18 35C25 17 44 12 61 17C80 22 91 40 84 59C78 78 58 89 39 83C19 77 9 58 18 35Z" />,
  wave: <path d="M12 46C18 25 35 16 49 24C64 33 75 19 85 31C96 44 83 73 65 80C46 87 26 77 17 64C13 58 10 52 12 46Z" />,
  'soft-star': <path d="M50 10C57 10 60 27 66 31C72 35 88 27 91 34C94 41 78 51 77 58C76 66 88 79 82 84C76 89 63 77 55 80C47 83 40 98 33 94C26 90 32 73 27 67C22 61 4 60 5 52C6 44 24 42 28 35C32 28 28 11 36 9C42 8 44 10 50 10Z" />,
  stack: <path d="M18 28C18 17 27 10 39 10H62C73 10 82 18 82 29C82 36 78 42 72 46C82 50 88 58 86 68C84 82 72 90 58 88L37 85C22 83 13 73 14 60C15 52 19 46 27 42C21 39 18 34 18 28Z" />,
}

function Eyes({ type }) {
  if (type === 'happy') return <><path d="M31 48Q37 42 43 48" /><path d="M57 48Q63 42 69 48" /></>
  if (type === 'calm') return <><path d="M32 49Q37 52 42 49" /><path d="M58 49Q63 52 68 49" /></>
  if (type === 'angry') return <><path d="M31 43L43 48" /><path d="M69 43L57 48" /></>
  if (type === 'worried') return <><path d="M31 45Q37 40 43 44" /><path d="M57 44Q63 40 69 45" /><circle cx="38" cy="49" r="2" fill="currentColor" /><circle cx="62" cy="49" r="2" fill="currentColor" /></>
  if (type === 'wide') return <><circle cx="37" cy="48" r="5" fill="white" /><circle cx="63" cy="48" r="5" fill="white" /><circle cx="38" cy="49" r="2" fill="currentColor" /><circle cx="62" cy="49" r="2" fill="currentColor" /></>
  if (type === 'soft') return <><circle cx="37" cy="48" r="3" fill="currentColor" /><circle cx="63" cy="48" r="3" fill="currentColor" /></>
  return <><ellipse cx="37" cy="48" rx="4" ry="5" fill="white" /><ellipse cx="63" cy="48" rx="4" ry="5" fill="white" /><circle cx="38" cy="49" r="2" fill="currentColor" /><circle cx="62" cy="49" r="2" fill="currentColor" /></>
}

export default function AblaCharacter({
  emotion = 'happy', shape = 'blob', size = 'md', className = '', animate = 'none',
  arms = true, decoration = false, label,
}) {
  const reducedMotion = useReducedMotion()
  const expression = expressions[emotion] || expressions.happy
  const dimension = sizes[size] || sizes.md
  const animation = animate === 'float' ? ablaMotion.float : animate === 'breathe' ? ablaMotion.breathe : animate === 'wiggle' ? ablaMotion.wiggle : {}

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={dimension}
      height={dimension}
      className={className}
      animate={motionIfAllowed(reducedMotion, animation)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {decoration && <><circle cx="12" cy="25" r="3" fill="#DCECE7" /><path d="M83 14l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#C7D2E2" /></>}
      {arms && <g fill="none" stroke="#3F5577" strokeWidth="3" strokeLinecap="round"><path d="M18 54Q7 57 9 67" /><path d="M82 54Q93 57 91 67" /></g>}
      <g fill={expression.tone}>{bodyPaths[shape] || bodyPaths.blob}</g>
      <g fill="none" stroke="#3F5577" strokeWidth="3" strokeLinecap="round" color="#3F5577">
        <Eyes type={expression.eyes} />
        <path d={expression.mouth} />
      </g>
    </motion.svg>
  )
}
