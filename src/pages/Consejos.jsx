import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { FRASES_APOYO, FRASES_EVITAR, MICROCAPSULAS, RED_FLAGS_DATA } from '../data/consejosData.js'

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
      <div className="min-h-screen bg-abla-bg pb-24">
        <Header title="Consejos" showBack showIcons={false} />

        <div className="mx-auto w-full max-w-[390px] px-4">
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
                  activeTab === tab
                    ? 'bg-abla-green text-white'
                    : 'bg-white text-abla-blue shadow-sm'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {activeTab === 'Señales' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5">
                {redFlagsPorCategoria.map((grupo) => (
                  <section key={grupo.categoria}>
                    <div className="mb-2 text-[16px] font-bold text-abla-blue">{grupo.categoria}</div>
                    <div className="flex flex-col gap-2">
                      {grupo.items.map((item) => (
                        <div
                          key={item.indicador}
                          className={`rounded-2xl p-3 shadow-sm ${
                            item.urgente ? 'border border-red-200 bg-red-50' : 'bg-white'
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
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                {microcapsulas.map((capsula) => (
                  <div key={capsula.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl text-white"
                        style={{ backgroundColor: capsula.color }}
                      >
                        {capsula.icono}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-bold text-abla-blue">{capsula.titulo}</div>
                        <div className="mt-2 text-[13px] font-bold leading-5 text-slate-700">{capsula.dato}</div>
                        <div className="mt-2 text-[12px] leading-5 text-slate-500">{capsula.consejo}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(getActionRoute(capsula.accion))}
                      className="mt-4 h-10 w-full rounded-xl bg-abla-green text-[12px] font-bold text-white"
                    >
                      {capsula.accion}
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'Qué Decir' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <section>
                  <div className="mb-3 text-[16px] font-bold text-abla-blue">Frases que sí ayudan</div>
                  <div className="flex flex-col gap-3">
                    {FRASES_APOYO.map((item) => (
                      <div key={item.fase} className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm">
                        <div className="text-[11px] font-black uppercase tracking-[0.16em] text-abla-green">{item.fase}</div>
                        <div className="mt-2 text-[14px] font-bold leading-5 text-abla-blue">“{item.frase}”</div>
                        <div className="mt-2 text-[12px] leading-5 text-slate-500">{item.proposito}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="mb-3 text-[16px] font-bold text-abla-blue">Frases que dañan</div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
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
          </div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
