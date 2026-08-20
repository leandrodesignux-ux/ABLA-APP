import { motion } from 'framer-motion'
import { AlertCircle, BookOpen, Calendar, ExternalLink, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { LINEAS_EMERGENCIA, RECURSOS_WEB } from '../data/recursosAyuda.js'

function HelpCard({ icon, title, description, buttonLabel, buttonVariant, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full rounded-2xl bg-white p-4 text-left shadow-sm"
      aria-label={title}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-abla-bg">{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="text-[16px] font-bold text-abla-blue">{title}</div>
          <div className="mt-1 text-[13px] text-slate-500">{description}</div>
        </div>
      </div>

      <div className="mt-4">
        <div
          className={`flex h-12 w-full items-center justify-center rounded-xl px-4 text-center text-[13px] font-bold tracking-wide ${
            buttonVariant === 'filled'
              ? 'bg-abla-green text-white'
              : 'border border-abla-green bg-white text-abla-green'
          }`}
        >
          {buttonLabel}
        </div>
      </div>
    </motion.button>
  )
}

export default function Ayuda() {
  const navigate = useNavigate()
  const { perfil } = useAppContext()
  const perfilActivo = perfil || 'estudiante'
  const lineasUrgentes = LINEAS_EMERGENCIA.filter((linea) => linea.urgente)
  const recursosPerfil = RECURSOS_WEB.filter((recurso) => recurso.perfil.includes(perfilActivo))

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24">
      <Header title="Ayuda" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] md:max-w-3xl lg:max-w-6xl px-4">
        <div className="mt-6 text-[18px] font-bold text-abla-blue">Selecciona la ayuda que necesitas</div>

        <div className="mt-4 flex justify-center">
          <img
            src="/Illustrations/ayuda-hero.svg"
            alt=""
            className="h-40 w-40 select-none"
            draggable="false"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <HelpCard
            title="Cita con Profesional"
            description="Agenda una cita con un psicopedagogo o psicólogo"
            buttonLabel="SOLICITAR CITA CON PROFESIONAL"
            buttonVariant="filled"
            icon={<Calendar className="h-7 w-7 text-abla-green" aria-hidden="true" />}
            onClick={() => navigate('/ayuda/cita')}
          />

          <HelpCard
            title="Consejos Prácticos"
            description="Recibe orientación sobre situaciones difíciles"
            buttonLabel="VER CONSEJOS"
            buttonVariant="outlined"
            icon={<BookOpen className="h-7 w-7 text-abla-blue" aria-hidden="true" />}
            onClick={() => navigate('/ayuda/consejos')}
          />
        </div>

        <section className="mt-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            <div className="text-[18px] font-bold text-abla-blue">Líneas de Ayuda</div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {lineasUrgentes.map((linea) => (
              <div
                key={linea.id}
                className={`rounded-2xl p-4 shadow-sm ${
                  linea.urgente ? 'border border-red-200 bg-red-50' : 'bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">
                    {linea.icono}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-bold text-abla-blue">{linea.nombre}</div>
                    <div className="mt-0.5 text-[22px] font-black leading-none text-red-600">{linea.numero}</div>
                    <div className="mt-1 text-[11px] font-medium text-slate-500">{linea.disponibilidad}</div>
                  </div>
                  <a
                    href={`tel:${linea.numero}`}
                    className="flex h-10 items-center gap-1 rounded-xl bg-red-500 px-3 text-[12px] font-bold text-white"
                    aria-label={`Llamar a ${linea.nombre}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Llamar
                  </a>
                </div>
                <div className="mt-3 text-[12px] leading-5 text-slate-600">{linea.descripcion}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="text-[18px] font-bold text-abla-blue">Recursos según tu perfil</div>

          <div className="mt-4 flex flex-col gap-3">
            {recursosPerfil.map((recurso) => (
              <div key={recurso.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-abla-bg text-2xl">
                    {recurso.icono}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-bold text-abla-blue">{recurso.nombre}</div>
                    <div className="mt-1 text-[12px] leading-5 text-slate-500">{recurso.descripcion}</div>
                  </div>
                  <a
                    href={recurso.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 items-center gap-1 rounded-xl border border-abla-green bg-white px-3 text-[12px] font-bold text-abla-green"
                    aria-label={`Ver ${recurso.nombre}`}
                  >
                    Ver
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
    </PageTransition>
  )
}
