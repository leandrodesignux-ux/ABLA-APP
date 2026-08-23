import { motion, useReducedMotion } from 'framer-motion'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const variants = {
  primary: 'bg-abla-green text-white shadow-abla-green hover:bg-[#478f77]',
  secondary: 'bg-abla-blue text-white shadow-abla-blue hover:bg-[#354966]',
  soft: 'bg-abla-green-soft text-abla-blue hover:bg-abla-green-mist',
  outline: 'border border-abla-green/40 bg-white text-abla-green hover:bg-abla-green-soft',
}

export default function AblaButton({ as = 'button', variant = 'primary', className = '', children, ...props }) {
  const reducedMotion = useReducedMotion()
  const Component = motion[as] || motion.button
  return (
    <Component
      whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-abla-control px-5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-green/30 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
