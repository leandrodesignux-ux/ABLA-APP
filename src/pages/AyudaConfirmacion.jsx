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

      <div className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[390px] flex-col items-center justify-center px-4 pb-10 text-center">
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

        <div className="mt-3 text-[22px] font-bold text-abla-blue">¡Cita agendada!</div>

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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          type="button"
          onClick={() => navigate('/home')}
          className="mt-6 h-12 w-full rounded-xl bg-abla-green font-bold text-white"
          aria-label="Volver al inicio"
        >
          VOLVER AL INICIO
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          type="button"
          className="mt-3 h-12 w-full rounded-xl border border-abla-green bg-white font-bold text-abla-green"
          aria-label="Añadir recordatorio"
        >
          AÑADIR RECORDATORIO
        </motion.button>
      </div>
    </div>
    </PageTransition>
  )
}
