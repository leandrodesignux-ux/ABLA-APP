import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function Bullet({ text }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-abla-green" aria-hidden="true" />
      <div className="text-[13px] leading-5 text-slate-600">{text}</div>
    </div>
  )
}

function AdviceCard({ imageSrc, title, bullets }) {
  return (
    <div className="h-[520px] w-full shrink-0 px-1">
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

export default function Consejos() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const cards = useMemo(
    () => [
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
        title: '¿Cómo lidiar con ansiedad/depresión?',
        bullets: [
          'Respira lento: 4 segundos inhalar, 4 exhalar.',
          'Habla con alguien: no tienes que cargarlo solo/a.',
          'Descansa, hidrátate y mantén rutinas pequeñas.',
        ],
      },
      {
        imageSrc: '/Illustrations/consejos-redes.svg',
        title: '¿Te están acosando por redes sociales?',
        bullets: [
          'No respondas: bloquea y reporta las cuentas.',
          'Haz capturas de pantalla como evidencia.',
          'Configura privacidad y pide acompañamiento.',
        ],
      },
    ],
    [],
  )

  const goTo = (i) => setIndex(Math.max(0, Math.min(i, cards.length - 1)))

  const onDragEnd = (_, info) => {
    const threshold = 60
    if (info.offset.x < -threshold) goTo(index + 1)
    if (info.offset.x > threshold) goTo(index - 1)
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg">
      <Header title="Consejos prácticos" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
        <div className="mt-6 overflow-hidden" ref={trackRef}>
          <motion.div
            drag="x"
            onDragEnd={onDragEnd}
            dragConstraints={{ left: 0, right: 0 }}
            animate={{ x: `-${index * 100}%` }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="flex"
            style={{ width: `${cards.length * 100}%` }}
          >
            {cards.map((c) => (
              <div key={c.title} className="w-full" style={{ width: `${100 / cards.length}%` }}>
                <AdviceCard imageSrc={c.imageSrc} title={c.title} bullets={c.bullets} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" aria-label="Progreso">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-abla-green' : 'bg-[#E6E6E6]'}`}
              aria-label={`Consejo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
