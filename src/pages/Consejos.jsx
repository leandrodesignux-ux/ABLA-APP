import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { FRASES_APOYO, FRASES_EVITAR, MICROCAPSULAS, RED_FLAGS_DATA } from '../data/consejosData.js'
import AblaCompanion from '../components/companion/AblaCompanion.jsx'
import { ablaMotion } from '../design/motion.js'

const tabs = ['Señales', 'Actualidad', 'Qué Decir']
const categorias = ['Físico', 'Material', 'Conductual', 'Emocional', 'Digital', 'Social', 'Grave']

function getActionRoute(action) {
  const text = action.toLowerCase()
  if (text.includes('reporte')) return '/reportar'
  if (text.includes('cita') || text.includes('psicólogo')) return '/ayuda/cita'
  if (text.includes('tutor')) return '/chat/tutor'
  if (text.includes('privacidad') || text.includes('redes')) return '/ayuda'
  return '/ayuda'
}

export default function Consejos() {
  const navigate = useNavigate()
  const { perfil } = useAppContext()
  const [activeTab, setActiveTab] = useState('Señales')
  const perfilActivo = perfil || 'estudiante'
  const microcapsulas = MICROCAPSULAS.filter((capsula) => capsula.perfil.includes(perfilActivo))
  const redFlagsPorCategoria = useMemo(
    () =>
      categorias.map((categoria) => ({
        categoria,
        items: RED_FLAGS_DATA.filter((item) => item.categoria === categoria),
      })).filter((grupo) => grupo.items.length > 0),
    [],
  )

  return (
    <PageTransition>
      <div className="min-h-dvh bg-abla-bg pb-24 md:pb-12">
        <Header title="Consejos" showBack showIcons={false} />

        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
          <section className="grid items-center gap-5 overflow-hidden rounded-abla-panel bg-abla-blue-soft p-5 md:grid-cols-[1fr_200px] md:p-8"><div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-abla-green">Herramientas para acompañarte</p><h1 className="abla-page-title mt-2">Consejos que sí ayudan</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Señales, palabras y acciones concretas para comprender mejor una situación difícil.</p></div><div className="relative hidden h-36 md:grid md:place-items-center"><AblaCompanion personality="curious" pose="pointing" gaze="right" accessory="card" size="lg" label="ABLA comparte una orientación" /></div></section>
          <div className="scrollbar-hide mt-6 flex gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-abla-card md:w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors ${
                  activeTab === tab
                    ? 'text-abla-blue'
                    : 'text-slate-500 hover:text-abla-blue'
                }`}
              >
                {activeTab === tab && <motion.span layoutId="consejos-tab" className="absolute inset-0 -z-10 rounded-full bg-abla-green-soft" />}
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
            {activeTab === 'Señales' && (
              <motion.div key="senales" variants={ablaMotion.pop} initial="hidden" animate="visible" exit="hidden" className="grid gap-5 lg:grid-cols-2">
                {redFlagsPorCategoria.map((grupo) => (
                  <section key={grupo.categoria}>
                    <div className="mb-2 text-[16px] font-bold text-abla-blue">{grupo.categoria}</div>
                    <div className="flex flex-col gap-3">
                      {grupo.items.map((item) => (
                        <div
                          key={item.indicador}
                          className={`rounded-abla-card p-4 shadow-abla-card ${
                            item.urgente ? 'border-2 border-red-200 bg-red-50' : 'border border-white bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{item.emoji}</div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="text-[14px] font-bold text-abla-blue">{item.indicador}</div>
                                {item.urgente && (
                                  <div className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-black text-red-600">
                                    ⚠️ URGENTE
                                  </div>
                                )}
                              </div>
                              <div className="mt-1 text-[12px] leading-5 text-slate-500">{item.descripcion}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </motion.div>
            )}

            {activeTab === 'Actualidad' && (
              <motion.div key="actualidad" variants={ablaMotion.pop} initial="hidden" animate="visible" exit="hidden" className="grid gap-4 md:grid-cols-2">
                {microcapsulas.map((capsula, index) => (
                  <div key={capsula.id} className="rounded-abla-card bg-white p-5 shadow-abla-card">
                    <div className="flex items-start gap-3">
                      <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-[46%_54%_42%_58%/58%_45%_55%_42%] bg-abla-blue-soft"><AblaCompanion mood={index % 2 ? 'calm' : 'focused'} pose={index % 2 ? 'resting' : 'pointing'} gaze={index % 2 ? 'center' : 'right'} size="sm" label="ABLA presenta este consejo" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-bold text-abla-blue">{capsula.titulo}</div>
                        <div className="mt-2 text-[13px] font-bold leading-5 text-slate-700">{capsula.dato}</div>
                        <div className="mt-2 text-[12px] leading-5 text-slate-500">{capsula.consejo}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(getActionRoute(capsula.accion))}
                      className="mt-4 min-h-11 w-full rounded-abla-control bg-abla-green text-[12px] font-bold text-white shadow-abla-green"
                    >
                      {capsula.accion}
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'Qué Decir' && (
              <motion.div key="decir" variants={ablaMotion.pop} initial="hidden" animate="visible" exit="hidden" className="grid gap-6 lg:grid-cols-2">
                <section>
                  <div className="mb-3 flex items-center gap-3"><AblaCompanion mood="happy" pose="supporting" size="xs" label="ABLA aprueba estas frases" /><div className="text-[16px] font-bold text-abla-blue">Frases que sí ayudan</div></div>
                  <div className="flex flex-col gap-3">
                    {FRASES_APOYO.map((item) => (
                      <div key={item.fase} className="rounded-abla-card border border-green-100 bg-green-50 p-5 shadow-abla-card">
                        <div className="text-[11px] font-black uppercase tracking-[0.16em] text-abla-green">{item.fase}</div>
                        <div className="mt-2 text-[14px] font-bold leading-5 text-abla-blue">“{item.frase}”</div>
                        <div className="mt-2 text-[12px] leading-5 text-slate-500">{item.proposito}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="mb-3 flex items-center gap-3"><AblaCompanion mood="worried" pose="listening" decorations="none" size="xs" label="ABLA advierte sobre estas frases" /><div className="text-[16px] font-bold text-abla-blue">Frases que dañan</div></div>
                  <div className="rounded-abla-card bg-white p-5 shadow-abla-card">
                    <div className="flex flex-col gap-3">
                      {FRASES_EVITAR.map((frase) => (
                        <div key={frase} className="flex items-start gap-2 text-[13px] font-semibold text-slate-600">
                          <span>❌</span>
                          <span>{frase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </main>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
