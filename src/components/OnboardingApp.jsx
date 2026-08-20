import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from './PageTransition.jsx'
import SvgImage from './SvgImage.jsx'

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

export default function OnboardingApp({ onDone }) {
  const navigate = useNavigate()

  const slides = useMemo(
    () => [
      {
        imageSrc: '/Illustrations/chat-anonimo.svg',
        title: 'Habla sin miedo',
        description: 'Chatea de forma anónima con un orientador. Sin nombres, sin registros.',
        actionLabel: 'Ir al chat →',
        actionTo: '/chat',
      },
      {
        imageSrc: '/Illustrations/ayuda-hero.svg',
        title: 'Apoyo profesional',
        description: 'Agenda una cita con un psicólogo o psicopedagogo de tu institución.',
        actionLabel: 'Ver profesionales →',
        actionTo: '/ayuda/cita',
      },
      {
        imageSrc: '/Illustrations/reporte-abuso.svg',
        title: 'Reporta de forma segura',
        description: 'Puedes reportar situaciones de acoso. Tu identidad está protegida.',
        actionLabel: 'Cómo reportar →',
        actionTo: '/reportar',
      },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const slide = slides[index]

  const goTo = (nextIndex) => {
    if (nextIndex === index) return
    setDirection(nextIndex > index ? 1 : -1)
    setIndex(nextIndex)
  }

  const next = () => {
    if (index === slides.length - 1) {
      onDone?.()
      return
    }
    goTo(Math.min(index + 1, slides.length - 1))
  }

  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-white px-4 pb-24 pt-10">
        <div className="mx-auto flex min-h-[calc(100vh-136px)] w-full max-w-[390px] flex-col items-center md:max-w-2xl">
          <div className="mt-8 flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full border-4 border-abla-green bg-white">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.imageSrc}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="h-full w-full"
              >
                <SvgImage src={slide.imageSrc} alt="" className="h-full w-full object-cover" eager />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full"
            >
              <h1 className="mt-6 text-center text-[22px] font-bold text-abla-blue">{slide.title}</h1>
              <p className="mx-auto mt-3 max-w-[280px] text-center text-[14px] leading-5 text-slate-500">
                {slide.description}
              </p>

              <div className="mt-4 flex justify-center">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate(slide.actionTo, { state: { fromOnboardingApp: true } })}
                  className="rounded-full border border-abla-green px-4 py-2 text-[12px] font-medium text-abla-green"
                >
                  {slide.actionLabel}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-2" aria-label="Progreso">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-abla-green' : 'bg-[#E6E6E6]'}`}
                aria-label={`Paso ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex-1" />

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={next}
            className="h-12 w-full rounded-xl bg-abla-green font-semibold text-white"
          >
            {index === slides.length - 1 ? 'EMPEZAR' : 'SIGUIENTE'}
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
