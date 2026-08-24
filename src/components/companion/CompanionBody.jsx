import { motion } from 'framer-motion'
import { companionBodyPath, companionTokens } from './companionTokens.js'

export default function CompanionBody({ variants }) {
  return <motion.path d={companionBodyPath} fill={companionTokens.color.body} variants={variants} style={{ transformOrigin: '60px 62px' }} />
}

