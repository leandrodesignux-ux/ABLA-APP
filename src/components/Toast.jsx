import { AnimatePresence, motion } from 'framer-motion'

export function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 left-1/2 z-50 w-[calc(100%-32px)] max-w-[358px] -translate-x-1/2 rounded-2xl bg-abla-blue px-4 py-3 text-center text-[13px] font-semibold text-white shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
