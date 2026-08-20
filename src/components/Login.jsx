import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageTransition from './PageTransition.jsx'
import SvgImage from './SvgImage.jsx'

export default function Login({ onLogin }) {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg px-4 text-slate-800">
        <div className="mx-auto grid min-h-dvh w-full max-w-[390px] items-center gap-6 py-10 md:max-w-5xl md:grid-cols-2 md:gap-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <SvgImage src="/Logo/abla-logo.svg" alt="ABLA" className="h-[96px] w-[96px] select-none" eager />
            <div className="mt-4 text-[34px] font-black tracking-tight text-abla-blue">ABLA</div>
            <div className="mt-1 text-[18px] font-bold text-abla-green">Tu espacio seguro</div>
            <p className="mt-3 max-w-[300px] text-[14px] leading-6 text-slate-500">
              App anti-bullying escolar para estudiantes, apoderados y profesionales
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="relative mx-auto flex h-[240px] w-[240px] items-center justify-center md:h-[320px] md:w-[320px]"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
                className="absolute rounded-full border border-abla-green/30"
                style={{
                  height: `${120 + i * 38}px`,
                  width: `${120 + i * 38}px`,
                }}
              />
            ))}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 flex h-[132px] w-[132px] items-center justify-center rounded-full bg-white shadow-xl"
            >
              <SvgImage src="/Illustrations/Profesional.svg" alt="" className="h-[104px] w-[104px]" eager />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="flex flex-col items-center md:col-span-2 md:mx-auto md:w-full md:max-w-md"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                navigate('/')
                onLogin?.()
              }}
              className="h-14 w-full rounded-2xl bg-abla-green text-[16px] font-bold text-white shadow-lg"
              style={{ boxShadow: '0 8px 24px rgba(86,160,135,0.35)' }}
            >
              INGRESAR A ABLA
            </motion.button>

            <div className="mt-8 text-center">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Diseñado por</div>
              <div className="mt-1 text-[14px] font-bold text-abla-blue">Leandro Balbian</div>
              <div className="text-[12px] font-medium text-slate-400">Product Designer</div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
