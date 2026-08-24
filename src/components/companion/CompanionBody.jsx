import { motion } from 'framer-motion'
import { companionBodyPath, companionTokens } from './companionTokens.js'

export default function CompanionBody({ variants }) {
  return <motion.g variants={variants} style={{ transformOrigin: '60px 62px' }}><path d={companionBodyPath} fill={companionTokens.color.body} /><path d="M35 17C48 11 73 10 87 16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity=".09" /></motion.g>
}
