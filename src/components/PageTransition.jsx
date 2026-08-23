import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

// Forward navigation variants (default)
const forwardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

// Back navigation variants
const backVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

export default function PageTransition({ children, direction = 'forward' }) {
  const reducedMotion = useReducedMotion()
  const variants = direction === 'back' ? backVariants : forwardVariants

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <motion.div
      variants={reducedMotion ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } } : variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: direction === 'back' ? 0.2 : 0.25,
        ease: direction === 'back' ? 'easeInOut' : [0.25, 0.46, 0.45, 0.94], // ease-out
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  )
}
