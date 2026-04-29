import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function Onboarding({ onDone }) {
  const steps = useMemo(
    () => [
      {
        imageSrc: '/ABLA6.PNG',
        title: 'El acoso escolar es un problema grave...',
      },
      {
        imageSrc: '/ABLA5.PNG',
        title: 'Lo mas importante es que lo cuentes...',
      },
      {
        imageSrc: '/ABLA7.PNG',
        title: 'también puedes realizar encuestas, recibir consejos y agendar una cita con un psicopedagogo.',
      },
    ],
    [],
  )

  const [index, setIndex] = useState(0)

  const next = () => {
    if (index === steps.length - 1) {
      onDone?.()
      return
    }
    setIndex((v) => Math.min(v + 1, steps.length - 1))
  }

  const prev = () => {
    setIndex((v) => Math.max(v - 1, 0))
  }

  return (
    <div className="min-h-screen bg-abla-bg px-4 py-10 text-slate-800">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="text-sm font-semibold text-abla-blue">ABLA</div>

          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
            aria-label={index === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-center">
                <img
                  src={steps[index].imageSrc}
                  alt=""
                  className="w-full select-none rounded-2xl"
                  draggable="false"
                />
              </div>

              <p className="mt-5 text-center text-base font-semibold text-abla-blue">{steps[index].title}</p>

              <button
                type="button"
                onClick={next}
                className="mt-6 h-11 w-full rounded-xl bg-abla-blue font-semibold text-white"
              >
                {index === steps.length - 1 ? 'Comenzar' : 'Continuar'}
              </button>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-center gap-2" aria-label="Progreso">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-abla-green' : 'bg-slate-200'}`}
                aria-label={`Paso ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
