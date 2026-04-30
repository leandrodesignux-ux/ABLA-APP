import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

export default function Onboarding({ onDone }) {
  const navigate = useNavigate()

  const slides = useMemo(
    () => [
      {
        imageSrc: '/onboarding-1.svg',
        text: 'El acoso escolar es un problema grave y silencioso, por eso queremos ayudarte en esos momentos difíciles',
      },
      {
        imageSrc: '/onboarding-2.svg',
        text: 'Lo mas importante es que lo cuentes, puedes chatear con un tutor, en grupo o con alguien anónimo',
      },
      {
        imageSrc: '/onboarding-3.svg',
        text: 'También puedes realizar encuestas, recibir consejos y agendar una cita con un psicopedagogo',
      },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (nextIndex) => {
    if (nextIndex === index) return
    setDirection(nextIndex > index ? 1 : -1)
    setIndex(nextIndex)
  }

  const next = () => {
    if (index === slides.length - 1) {
      onDone?.()
      navigate('/login')
      return
    }
    goTo(Math.min(index + 1, slides.length - 1))
  }

  const prev = () => {
    goTo(Math.max(index - 1, 0))
  }

  const leftThumb = slides[(index + slides.length - 1) % slides.length]
  const rightThumb = slides[(index + 1) % slides.length]

  return (
    <PageTransition>
    <div className="min-h-screen w-full bg-white px-4 pt-8 pb-24">
      <div className="mx-auto w-full max-w-[390px]">
        <div className="flex justify-center">
          <SvgImage src="/Logo/abla-logo.svg" alt="ABLA" className="h-20 w-20 select-none" eager />
        </div>

        <div className="mt-10">
          <div className="relative mx-auto h-[200px] w-[280px]">
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-abla-green/60 bg-white opacity-50">
                <SvgImage src={leftThumb.imageSrc} alt="" className="h-full w-full object-cover" eager />
              </div>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-abla-green/60 bg-white opacity-50">
                <SvgImage src={rightThumb.imageSrc} alt="" className="h-full w-full object-cover" eager />
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[200px] w-[200px] overflow-hidden rounded-full border-4 border-abla-green bg-white">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={slides[index].imageSrc}
                    src={slides[index].imageSrc}
                    alt=""
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="h-full w-full select-none object-cover"
                    draggable="false"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <p className="max-w-[280px] text-center text-[16px] leading-6 text-[#1E293B]">{slides[index].text}</p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#94A3B8] disabled:opacity-40"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex items-center justify-center gap-2" aria-label="Progreso">
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

            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#94A3B8]"
              aria-label={index === slides.length - 1 ? 'Finalizar' : 'Siguiente'}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-8 px-4">
            <button
              type="button"
              onClick={next}
              className="h-12 w-full rounded-xl bg-abla-green font-semibold text-white"
            >
              {index === slides.length - 1 ? 'Comenzar' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
