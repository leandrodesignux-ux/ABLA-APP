import { motion } from 'framer-motion'
import { AlertTriangle, Bell, BookOpen, Calendar, ExternalLink, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SvgImage from '../components/SvgImage.jsx'
import { useAppContext } from '../context/AppContext.jsx'

const alertSigns = [
  'Cambios repentinos de humor o comportamiento',
  'Evita ir al colegio sin razón aparente',
  'Heridas inexplicables o ropa dañada',
  'Pierde objetos o dinero frecuentemente',
]

export default function HomeApoderado() {
  const navigate = useNavigate()
  const { user } = useAppContext()

  const directActions = [
    { label: 'Pedir cita', to: '/ayuda/cita', Icon: Calendar, color: 'text-abla-green' },
    { label: 'Hablar con tutor', to: '/chat/tutor', Icon: MessageCircle, color: 'text-abla-blue' },
    { label: 'Guías para padres', to: '/ayuda/consejos', Icon: BookOpen, color: 'text-abla-green' },
    { label: 'Hacer reporte', to: '/reportar', Icon: AlertTriangle, color: 'text-red-500' },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg pb-24 text-slate-800">
        <header className="bg-abla-green text-white">
          <div className="flex h-14 items-center justify-between px-4">
            <button
              type="button"
              onClick={() => navigate('/perfil')}
              className="flex items-center gap-2"
              aria-label="Ir a perfil"
            >
              <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white/60 bg-white/10">
                <SvgImage src={user.avatar} alt="" className="h-full w-full object-cover" eager />
              </div>
              <div className="text-left text-[12px] leading-tight">
                <div className="text-white/80">Hola,</div>
                <div className="font-semibold text-white">{user.name}</div>
              </div>
            </button>

            <img
              src="/Logo/abla-logo.svg"
              alt="ABLA"
              className="h-7 w-auto brightness-0 invert"
              draggable="false"
            />

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={() => navigate('/chat/anonimo')}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white"
                aria-label="SOS"
              >
                SOS
              </motion.button>
              <button
                type="button"
                onClick={() => {}}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
                aria-label="Notificaciones"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex h-12 items-center border-t border-white/10 bg-abla-green/90 px-4">
            <div className="text-[14px] font-semibold">Apoderado</div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[390px] px-4">
          <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-[18px] font-bold text-abla-blue">Bienvenido/a</div>
            <div className="mt-1 text-[14px] text-slate-500">Aquí puedes apoyar a tu hijo/a</div>
          </section>

          <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="text-[16px] font-bold text-amber-700">Señales de alerta</div>

            <div className="mt-3 flex flex-col gap-3">
              {alertSigns.map((sign) => (
                <div key={sign} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <div className="text-[13px] leading-5 text-amber-900">{sign}</div>
                </div>
              ))}
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/ayuda/consejos')}
              className="mt-4 h-10 rounded-xl border border-amber-400 px-4 text-[13px] font-semibold text-amber-700"
            >
              Leer guía completa →
            </motion.button>
          </section>

          <section className="mt-5">
            <div className="text-[16px] font-bold text-abla-blue">Acciones directas</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {directActions.map((action) => (
                <motion.button
                  key={action.label}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={() => navigate(action.to)}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <action.Icon className={`h-6 w-6 ${action.color}`} />
                  <span className="text-[13px] font-semibold text-abla-blue">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-[16px] font-bold text-abla-blue">Información y apoyo</div>

            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl bg-abla-bg px-3 py-3">
                <div className="text-[13px] font-medium text-slate-700">Protocolo escolar anti-bullying</div>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-abla-bg px-3 py-3">
                <div className="text-[13px] font-medium text-slate-700">Cómo hablar con tu hijo/a</div>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
