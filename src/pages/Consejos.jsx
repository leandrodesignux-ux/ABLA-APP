import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
}

function Bullet({ text }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-abla-green" aria-hidden="true" />
      <div className="text-[13px] leading-5 text-slate-600">{text}</div>
    </div>
  )
}

function Slide({ imageSrc, title, bullets }) {
  return (
    <div className="h-[520px] w-full">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-md">
        <div className="flex h-[40%] items-center justify-center bg-abla-bg">
          <img src={imageSrc} alt="" className="h-full w-full object-contain p-6" draggable="false" />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="text-[16px] font-bold text-abla-blue">{title}</div>
          <div className="mt-4 flex flex-col gap-3">
            {bullets.map((b) => (
              <Bullet key={b} text={b} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const slides = [
  {
    imageSrc: '/Illustrations/consejos-acoso.svg',
    title: '¿Qué hacer ante situaciones de violencia?',
    bullets: [
      'Busca un adulto de confianza y cuenta lo que ocurre.',
      'Aléjate de la situación y prioriza tu seguridad.',
      'Guarda evidencia (mensajes, fotos) y pide ayuda.',
    ],
  },
  {
    imageSrc: '/Illustrations/ansiedad.svg',
    title: 'Cómo actuar ante el acoso',
    bullets: [
      'Mantén la calma y no respondas con agresividad.',
      'Documenta todo: fechas, horas y testimonios.',
      'Busca ayuda profesional si es necesario.',
    ],
  },
  {
    imageSrc: '/Illustrations/consejos-redes.svg',
    title: 'Cuida tu bienestar digital',
    bullets: [
      'Limita el tiempo en redes sociales.',
      'Desconecta antes de dormir para descansar mejor.',
      'Sigue cuentas que te inspiren positivamente.',
    ],
  },
]

export default function Consejos() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (i) => {
    const newIndex = Math.max(0, Math.min(i, slides.length - 1))
    setDirection(newIndex > index ? 1 : -1)
    setIndex(newIndex)
  }

  const onPanEnd = (_, info) => {
    const threshold = 50
    if (info.offset.x < -threshold && index < slides.length - 1) {
      goTo(index + 1)
    } else if (info.offset.x > threshold && index > 0) {
      goTo(index - 1)
    }
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <Header title="Consejos prácticos" showBack showIcons={false} />

        <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
          <div className="mt-6 relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onPanEnd={onPanEnd}
                className="cursor-grab active:cursor-grabbing"
              >
                <Slide
                  imageSrc={slides[index].imageSrc}
                  title={slides[index].title}
                  bullets={slides[index].bullets}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2" aria-label="Progreso">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-abla-green' : 'bg-[#E6E6E6]'
                }`}
                aria-label={`Consejo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
