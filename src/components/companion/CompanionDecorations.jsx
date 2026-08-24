import { motion } from 'framer-motion'
import { companionTokens } from './companionTokens.js'

export default function CompanionDecorations({ type = 'subtle', visible = true }) {
  if (!visible || type === 'none') return null
  if (type === 'question') return <motion.text initial={{ opacity: .4, y: 2 }} animate={{ opacity: 1, y: 0 }} x="101" y="30" fill="#9FC8F5" fontSize="29" fontWeight="800" aria-hidden="true">?</motion.text>
  if (type === 'heart') return <motion.path initial={{ scale: .85 }} animate={{ scale: 1 }} d="M102 25C97 18 87 23 89 31C91 37 102 43 102 43C102 43 113 37 115 31C117 23 107 18 102 25Z" fill="#EE8DB8" style={{ transformOrigin: '102px 31px' }} aria-hidden="true" />
  if (type === 'energy') return <g fill="none" stroke="#F6B91A" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M103 16v-8M111 20l6-5M97 20l-6-5" /></g>
  return <g aria-hidden="true"><circle cx="12" cy="29" r="3" fill={companionTokens.color.blueSoft} /><path d="M104 9l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" fill="#9FC8F5" opacity=".8" /></g>
}
