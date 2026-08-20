import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Bell, BookOpen, Calendar, ChevronRight, MessageCircle, Star } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SvgImage from '../components/SvgImage.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { NEE_TYPES } from '../data/neeTypes.js'
import { PROFESORES, CATEGORIAS_SITUACION } from '../data/profesoresData.js'
import { LINEAS_EMERGENCIA } from '../data/recursosAyuda.js'

const alertSigns = [
  'Cambios repentinos de humor o comportamiento',
  'Evita ir al colegio sin razón aparente',
  'Heridas inexplicables o ropa dañada',
  'Pierde objetos o dinero frecuentemente',
]

export default function HomeApoderado() {
  const navigate = useNavigate()
  const { user, certificadosNEE, reglamentoLeido, ratingsEncuesta } = useAppContext()
  const lineasUrgentes = LINEAS_EMERGENCIA.filter((linea) => linea.urgente)

  const tieneNEEUrgente = certificadosNEE.some((c) => {
    const tipo = NEE_TYPES.find((t) => t.id === c.tipo)
    return tipo?.urgente === true
  })

  const directActions = [
    { label: 'Pedir cita', to: '/ayuda/cita', Icon: Calendar, color: 'text-abla-green' },
    { label: 'Hablar con tutor', to: '/chat/tutor', Icon: MessageCircle, color: 'text-abla-blue' },
    { label: 'Guías para padres', to: '/ayuda/consejos', Icon: BookOpen, color: 'text-abla-green' },
    { label: 'Hacer reporte', to: '/reportar', Icon: AlertTriangle, color: 'text-red-500' },
  ]

  const rankingProfesores = useMemo(() => {
    return PROFESORES.map((prof) => {
      const profRatings = ratingsEncuesta?.[prof.id] || {}

      let totalVotos = 0
      let sumaTotal = 0
      const categoriasPorPromedio = []

      Object.entries(profRatings).forEach(([catId, data]) => {
        totalVotos += data.total
        sumaTotal += data.suma
        const cat = CATEGORIAS_SITUACION.find((c) => c.id === catId)
        if (cat) {
          categoriasPorPromedio.push({
            ...cat,
            promedio: (data.suma / data.total).toFixed(1),
            total: data.total,
          })
        }
      })

      categoriasPorPromedio.sort((a, b) => b.promedio - a.promedio)

      return {
        ...prof,
        promedioGeneral: totalVotos > 0 ? (sumaTotal / totalVotos).toFixed(1) : null,
        totalVotos,
        top2Categorias: categoriasPorPromedio.slice(0, 2),
      }
    }).filter((p) => p.promedioGeneral !== null)
      .sort((a, b) => b.promedioGeneral - a.promedioGeneral)
  }, [ratingsEncuesta])

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

        <main className="mx-auto w-full max-w-[390px] md:max-w-3xl lg:max-w-6xl px-4">
          <AnimatePresence>
            {tieneNEEUrgente && (
              <motion.section
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-bold text-red-700">🔴 Alerta activa</div>
                    <div className="text-[14px] font-black text-red-800">REQUIERE ATENCIÓN</div>
                  </div>
                </div>

                <div className="mt-2 text-[13px] text-red-900">
                  Tu hijo/a tiene una condición que requiere seguimiento activo. Revisa las recomendaciones y el
                  protocolo de actuación.
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/apoderado/nee')}
                  className="mt-3 h-9 rounded-xl bg-red-600 px-4 text-[12px] font-bold text-white"
                >
                  Ver protocolos →
                </button>
              </motion.section>
            )}
          </AnimatePresence>

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
            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
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

          {rankingProfesores.length > 0 && (
            <section className="mt-5">
              <div className="text-[16px] font-bold text-abla-blue">
                Profesores mejor valorados
              </div>
              <div className="mt-1 text-[12px] text-slate-500">
                Según las experiencias de otros estudiantes
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
                {rankingProfesores.map((prof, index) => (
                  <motion.div
                    key={prof.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-abla-bg">
                          <img src={prof.avatar} alt="" className="h-full w-full object-cover" draggable="false" />
                        </div>
                        {index === 0 && (
                          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px]">
                            🥇
                          </div>
                        )}
                        {index === 1 && (
                          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-[10px]">
                            🥈
                          </div>
                        )}
                        {index === 2 && (
                          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px]">
                            🥉
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[14px] font-bold text-abla-blue">{prof.nombre}</span>
                          <div className="flex flex-shrink-0 items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-[13px] font-bold text-slate-700">{prof.promedioGeneral}</span>
                            <span className="text-[11px] text-slate-400">({prof.totalVotos})</span>
                          </div>
                        </div>

                        <div className="mt-0.5 text-[12px] text-slate-500">{prof.rol}</div>

                        {prof.top2Categorias.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {prof.top2Categorias.map((cat) => (
                              <span
                                key={cat.id}
                                className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700"
                              >
                                {cat.emoji} {cat.label}
                                <span className="text-green-500">{cat.promedio}★</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/ayuda/cita')}
                      className="mt-3 h-9 w-full rounded-xl border border-abla-green text-[12px] font-bold text-abla-green"
                    >
                      Agendar cita
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
          <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-[16px] font-bold text-abla-blue">Recursos y documentos</div>

            <div className="mt-3 flex flex-col gap-3">
              {[
                {
                  label: 'Reglamento interno',
                  icon: '📋',
                  to: '/reglamento',
                  sub: reglamentoLeido ? '✓ Leído' : 'Pendiente de lectura',
                },
                { label: 'Preguntas frecuentes', icon: '❓', to: '/faqs', sub: 'Vinculadas al reglamento' },
                { label: 'Protocolos de denuncia', icon: '🛡️', to: '/protocolos', sub: 'Bullying, violencia, cyberbullying' },
                {
                  label: 'Condiciones de mi hijo/a',
                  icon: '🧠',
                  to: '/apoderado/nee',
                  sub:
                    certificadosNEE.length > 0
                      ? `${certificadosNEE.length} condición(es) registrada(s)`
                      : 'Sin condiciones registradas',
                  badge: certificadosNEE.some((c) => NEE_TYPES.find((t) => t.id === c.tipo)?.urgente) ? 'ALERTA' : null,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.to)}
                  className="flex items-center gap-3 rounded-xl bg-abla-bg px-3 py-3"
                >
                  <span className="text-base">{item.icon}</span>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[13px] font-semibold text-abla-blue">{item.label}</div>
                    <div className="truncate text-[12px] text-slate-500">{item.sub}</div>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </section>

          <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-[16px] font-bold text-abla-blue">Recursos de Emergencia</div>
            <div className="mt-3 flex flex-col gap-2">
              {lineasUrgentes.map((linea) => (
                <div key={linea.id} className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2">
                  <span className="text-base">{linea.icono}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12px] font-bold text-abla-blue">{linea.nombre}</div>
                    <div className="text-[13px] font-black text-red-600">{linea.numero}</div>
                  </div>
                  <a
                    href={`tel:${linea.numero}`}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-[11px] font-bold text-white"
                    aria-label={`Llamar a ${linea.nombre}`}
                  >
                    Llamar
                  </a>
                </div>
              ))}
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
