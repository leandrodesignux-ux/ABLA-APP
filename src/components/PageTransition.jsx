import { motion } from 'framer-motion'

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
  const variants = direction === 'back' ? backVariants : forwardVariants

  return (
    <motion.div
      variants={variants}
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
