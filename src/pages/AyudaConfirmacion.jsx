import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function getQueryParam(search, key) {
  try {
    return new URLSearchParams(search).get(key)
  } catch {
    return null
  }
}

export default function AyudaConfirmacion() {
  const navigate = useNavigate()

  const details = useMemo(() => {
    const search = window.location.search
    const pro = getQueryParam(search, 'pro') || 'Profesional'
    const date = getQueryParam(search, 'date') || '—'
    const time = getQueryParam(search, 'time') || '—'
    return { pro, date, time }
  }, [])

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg">
      <Header title="Cita confirmada" showBack={false} showIcons={false} />

      <div className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl flex-col items-center px-4 pb-8 pt-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.05, 1] }}
          transition={{
            scale: {
              type: 'spring',
              stiffness: 200,
              damping: 15,
              times: [0, 0.3, 1],
            },
          }}
          className="flex h-24 w-24 items-center justify-center"
          aria-hidden="true"
        >
          <CheckCircle className="h-20 w-20 text-abla-green" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mt-3 text-[22px] font-bold text-abla-blue">¡Tu cita ha sido agendada con éxito!</div>
          <div className="mt-2 text-[14px] text-slate-500">Recibirás un recordatorio antes de tu cita</div>
        </motion.div>

        <div className="mt-6 w-full rounded-2xl bg-white p-4 text-left shadow-sm">
          <div className="text-[13px] text-slate-500">Profesional</div>
          <div className="mt-1 text-[15px] font-semibold text-slate-800">{details.pro}</div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[13px] text-slate-500">Fecha</div>
              <div className="mt-1 text-[15px] font-semibold text-slate-800">{details.date}</div>
            </div>
            <div>
              <div className="text-[13px] text-slate-500">Hora</div>
              <div className="mt-1 text-[15px] font-semibold text-slate-800">{details.time}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full rounded-2xl p-4 text-left" style={{ backgroundColor: 'rgba(86,160,135,0.08)' }}>
          <div className="text-[15px] font-bold text-abla-blue">¿Necesitas hablar mientras tanto?</div>
          <div className="mt-2 text-[13px] leading-5 text-slate-600">
            Mientras esperas tu cita, puedes chatear de forma anónima con un orientador
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              type="button"
              onClick={() => navigate('/chat')}
              className="h-12 w-full rounded-xl bg-abla-green font-bold text-white"
              aria-label="Chatear ahora"
            >
              CHATEAR AHORA
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              type="button"
              onClick={() => navigate('/ayuda/consejos')}
              className="h-12 w-full rounded-xl border border-abla-blue bg-white font-bold text-abla-blue"
              aria-label="Ver consejos"
            >
              VER CONSEJOS
            </motion.button>
          </div>
        </div>

        <div className="flex-1" />

        <motion.button
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          type="button"
          onClick={() => navigate('/home')}
          className="mt-6 text-[13px] font-semibold text-slate-500"
          aria-label="Volver al inicio"
        >
          VOLVER AL INICIO
        </motion.button>
      </div>
    </div>
    </PageTransition>
  )
}
