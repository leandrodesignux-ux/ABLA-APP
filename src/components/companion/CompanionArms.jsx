import { motion } from 'framer-motion'
import { companionTokens } from './companionTokens.js'

const poses = {
  idle: ['M18 59Q7 63 10 76', 'M102 59Q113 63 110 76'],
  listening: ['M18 60Q11 67 16 77', 'M102 59Q93 64 87 69'],
  open: ['M18 58Q7 53 4 43', 'M102 58Q113 53 116 43'],
  thinking: ['M18 60Q9 65 12 76', 'M102 59Q91 67 79 66'],
  supporting: ['M18 59Q28 71 43 74', 'M102 59Q92 71 77 74'],
  celebrating: ['M18 56Q5 48 7 35', 'M102 56Q115 48 113 35'],
  protecting: ['M18 60Q29 69 39 70', 'M102 60Q92 69 82 70'],
  pointing: ['M18 60Q10 65 12 76', 'M102 58Q113 54 117 47'],
  waving: ['M18 58Q7 53 6 42', 'M102 60Q112 65 109 76'],
  resting: ['M20 66Q12 71 15 80', 'M100 66Q108 71 105 80'],
}

export default function CompanionArms({ pose = 'idle', variants }) {
  const [left, right] = poses[pose] || poses.idle
  return <motion.g variants={variants} fill="none" stroke={companionTokens.color.ink} strokeWidth="4" strokeLinecap="round"><path d={left} /><path d={right} /></motion.g>
}

