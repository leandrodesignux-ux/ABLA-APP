import { motion, useReducedMotion } from 'framer-motion'
import AblaCharacter from './AblaCharacter.jsx'

const objectMotion = {
  idle: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 0.9 },
  hover: { y: -3, rotate: 4, scale: 1.04, opacity: 1 },
  tap: { y: 1, rotate: -2, scale: 0.96, opacity: 1 },
}

function SpeechBubble() {
  return <motion.svg variants={objectMotion} viewBox="0 0 58 44" className="absolute right-2 top-2 w-14 drop-shadow-sm md:right-4"><path d="M8 4h39c5 0 8 4 8 9v13c0 5-3 9-8 9H28l-10 7 2-7H8c-5 0-7-4-7-9V13c0-5 2-9 7-9Z" fill="white" /><motion.g variants={{ idle: {}, hover: { transition: { staggerChildren: .08 } } }} fill="#56A087"><motion.circle variants={{ idle: { opacity: .35 }, hover: { opacity: 1 } }} cx="20" cy="20" r="2.6" /><motion.circle variants={{ idle: { opacity: .35 }, hover: { opacity: 1 } }} cx="29" cy="20" r="2.6" /><motion.circle variants={{ idle: { opacity: .35 }, hover: { opacity: 1 } }} cx="38" cy="20" r="2.6" /></motion.g></motion.svg>
}

function Calendar() {
  return <motion.svg variants={objectMotion} viewBox="0 0 54 58" className="absolute right-2 top-5 w-12 drop-shadow-sm md:right-5"><rect x="4" y="8" width="46" height="44" rx="10" fill="white" /><path d="M4 21h46" stroke="#87A0C0" strokeWidth="4" /><path d="M16 4v10M38 4v10" stroke="#3F5577" strokeWidth="4" strokeLinecap="round" /><circle cx="18" cy="34" r="3" fill="#9CCBBB" /><circle cx="31" cy="34" r="3" fill="#C7D2E2" /><circle cx="18" cy="44" r="3" fill="#C7D2E2" /><circle cx="31" cy="44" r="3" fill="#9CCBBB" /></motion.svg>
}

function Booklet() {
  return <motion.svg variants={objectMotion} viewBox="0 0 58 52" className="absolute right-1 top-6 w-14 drop-shadow-sm md:right-4"><path d="M5 8c9-4 17-2 24 3v35c-8-5-16-7-24-3V8Z" fill="white" /><path d="M53 8c-9-4-17-2-24 3v35c8-5 16-7 24-3V8Z" fill="#F7FAFC" /><path d="M29 11v35" stroke="#C7D2E2" strokeWidth="2" /><path d="M11 17h11M11 24h9M36 17h11M36 24h8" stroke="#56A087" strokeWidth="2" strokeLinecap="round" /></motion.svg>
}

function Sign() {
  return <motion.svg variants={objectMotion} viewBox="0 0 50 64" className="absolute right-3 top-2 w-11 md:right-5"><path d="M24 31v29" stroke="#3F5577" strokeWidth="4" strokeLinecap="round" /><rect x="3" y="4" width="44" height="32" rx="8" fill="white" /><path d="M14 20h22" stroke="#6D829F" strokeWidth="4" strokeLinecap="round" /></motion.svg>
}

function Choices() {
  return <motion.div variants={{ idle: {}, hover: { transition: { staggerChildren: .08 } } }} className="absolute right-3 top-4 flex flex-col gap-2 md:right-6">{[0, 1, 2].map((item) => <motion.span key={item} variants={{ idle: { x: 4, opacity: .45 }, hover: { x: 0, opacity: 1 } }} className={`block h-3 rounded-full bg-white shadow-sm ${item === 1 ? 'w-10' : 'w-7'}`} />)}</motion.div>
}

const sceneConfig = {
  chat: { emotion: 'chat', shape: 'arch', pose: 'hide', gaze: 'right', interaction: 'shy', object: <SpeechBubble />, className: '-left-1 bottom-[-12px]' },
  appointment: { emotion: 'calm', shape: 'pebble', pose: 'point', gaze: 'right', interaction: 'supportive', object: <Calendar />, className: '-left-2 bottom-[-8px]' },
  advice: { emotion: 'help', shape: 'blob', pose: 'point', gaze: 'right', interaction: 'curious', object: <Booklet />, className: '-left-2 bottom-[-10px]' },
  report: { emotion: 'report', shape: 'soft-star', pose: 'raised', gaze: 'right', interaction: 'alert', object: <Sign />, className: '-left-2 bottom-[-8px]' },
  survey: { emotion: 'neutral', shape: 'wave', pose: 'wave', gaze: 'right', interaction: 'curious', object: <Choices />, className: '-left-2 bottom-[-8px]' },
}

export default function AblaScene({ type = 'chat', size = 'md', className = '' }) {
  const reducedMotion = useReducedMotion()
  const config = sceneConfig[type] || sceneConfig.chat
  return <motion.div initial="idle" animate="idle" variants={{ idle: {}, hover: {}, tap: {} }} className={`relative h-full w-full overflow-hidden ${className}`}>
    <motion.div variants={reducedMotion ? { idle: {}, hover: {}, tap: {} } : { idle: { scale: 1 }, hover: { scale: 1.015 }, tap: { scale: .985 } }} className="absolute inset-2 rounded-[48%_52%_45%_55%/55%_42%_58%_45%] bg-white/35" />
    <AblaCharacter {...config} size={size} decoration className={`absolute ${config.className}`} />
    {config.object}
  </motion.div>
}
