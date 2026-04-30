import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

function MoodOption({ active, emoji, title, subtitle, imageSrc, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      animate={{ scale: active ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className="flex w-full flex-col items-center"
      aria-label={title}
    >
      <div
        className={`flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border-2 bg-white shadow-sm transition-colors ${
          active ? 'border-abla-green' : 'border-[#E6E6E6]'
        }`}
      >
        <img src={imageSrc} alt="" className="h-full w-full object-contain p-5" draggable="false" />
      </div>

      <div className="mt-3 text-[26px] leading-none">{emoji}</div>
      <div className="mt-1 text-[14px] font-bold text-abla-blue">{title}</div>
      <div className="mt-1 max-w-[280px] text-center text-[12px] leading-5 text-slate-600">{subtitle}</div>
    </motion.button>
  )
}

export default function Encuesta() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [mood, setMood] = useState(null)

  const moodConfig = useMemo(
    () => ({
      BIEN: {
        title: '¡Es genial que te sientas bien!',
        subtitle: '¡Son esos días especiales!',
        gradient: 'bg-gradient-to-b from-[#EAF7F2] via-[#F5F7F9] to-white',
      },
      'MAS O MENOS': {
        title: 'Va a mejorar 😊',
        subtitle: 'Recuerda que no estás solo/a',
        gradient: 'bg-gradient-to-b from-[#FFF7E6] via-[#F5F7F9] to-white',
      },
      MAL: {
        title: 'Tranquilo/a, aquí estamos',
        subtitle: '¿Quieres hablar con alguien?',
        gradient: 'bg-gradient-to-b from-[#FCE7F3] via-[#F5F7F9] to-white',
      },
    }),
    [],
  )

  const canContinue = Boolean(mood)

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="mx-auto w-full max-w-[390px] px-4 pb-10"
          >
            <div className="pt-10">
              <div className="flex justify-center">
                <img src="/Logo/abla-logo.svg" alt="" className="h-8 w-auto select-none" draggable="false" />
              </div>

              <div className="mt-6 text-center text-[22px] font-bold text-abla-blue">Encuesta diaria</div>
              <div className="mt-1 text-center text-[14px] text-slate-600">¿Cómo te sientes hoy?</div>

              <div className="mt-8 flex flex-col items-center gap-7">
                <MoodOption
                  active={mood === 'BIEN'}
                  emoji="😄"
                  title="BIEN"
                  subtitle="Sigue así, tu bienestar es importante."
                  imageSrc="/Illustrations/encuesta-bien.svg"
                  onClick={() => setMood('BIEN')}
                />

                <MoodOption
                  active={mood === 'MAS O MENOS'}
                  emoji="😐"
                  title="MAS O MENOS"
                  subtitle="A veces cuesta, pero puedes con esto."
                  imageSrc="/Illustrations/encuesta-masomenos.svg"
                  onClick={() => setMood('MAS O MENOS')}
                />

                <MoodOption
                  active={mood === 'MAL'}
                  emoji="😟"
                  title="MAL"
                  subtitle="No estás solo/a. Pide ayuda cuando lo necesites."
                  imageSrc="/Illustrations/encuesta-mal.svg"
                  onClick={() => setMood('MAL')}
                />
              </div>

              <AnimatePresence>
                {canContinue && (
                  <motion.button
                    key="continue"
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => setStep(2)}
                    className="mt-8 h-12 w-full rounded-xl bg-abla-green font-bold text-white"
                    aria-label="Continuar"
                  >
                    CONTINUAR
                  </motion.button>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => navigate('/home')}
                className="mt-3 h-12 w-full rounded-xl border border-abla-green bg-white font-bold text-abla-green"
                aria-label="Volver al inicio"
              >
                VOLVER AL INICIO
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className={`min-h-screen ${moodConfig[mood]?.gradient || 'bg-abla-bg'}`}
          >
            <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col items-center justify-center px-4 pb-10 text-center">
              <div className="flex justify-center">
                <img src="/Logo/abla-logo.svg" alt="" className="h-8 w-auto select-none" draggable="false" />
              </div>

              <div className="mt-8 text-[22px] font-bold text-abla-blue">{moodConfig[mood]?.title}</div>
              <div className="mt-2 text-[14px] text-slate-700">{moodConfig[mood]?.subtitle}</div>

              {mood === 'MAL' && (
                <div className="mt-8 flex w-full flex-col gap-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/chat')}
                    className="h-12 w-full rounded-xl bg-abla-green font-bold text-white"
                    aria-label="Chatear ahora"
                  >
                    Chatear ahora
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/ayuda/consejos')}
                    className="h-12 w-full rounded-xl border border-abla-green bg-white font-bold text-abla-green"
                    aria-label="Ver consejos"
                  >
                    Ver consejos
                  </motion.button>
                </div>
              )}

              <button
                type="button"
                onClick={() => navigate('/home')}
                className="mt-8 h-12 w-full rounded-xl border border-abla-green bg-white font-bold text-abla-green"
                aria-label="Volver al inicio"
              >
                VOLVER AL INICIO
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-3 text-[13px] font-semibold text-slate-600"
                aria-label="Volver"
              >
                Volver
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  )
}
