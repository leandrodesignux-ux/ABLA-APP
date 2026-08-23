import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, BookOpen, ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import AblaCharacter from '../components/AblaCharacter.jsx'
import AblaEmptyState from '../components/AblaEmptyState.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { FAQS } from '../data/faqs.js'

const CATEGORIAS = {
  bullying: { label: 'Bullying', color: 'bg-amber-50 text-amber-700' },
  nee: { label: 'NEE', color: 'bg-purple-50 text-purple-700' },
  derechos: { label: 'Derechos', color: 'bg-blue-50 text-blue-700' },
  comunicacion: { label: 'Comunicación', color: 'bg-green-50 text-green-700' },
  responsabilidad: { label: 'Responsabilidad', color: 'bg-red-50 text-red-700' },
  clasificacion: { label: 'Clasificación', color: 'bg-slate-100 text-slate-700' },
}

export default function FAQs() {
  const navigate = useNavigate()
  const { perfil } = useAppContext()
  const [openId, setOpenId] = useState(null)
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  const faqsFiltradas = useMemo(() => {
    return FAQS.filter((f) => {
      const perfilMatch = !perfil || f.perfil.includes(perfil)
      const catMatch = categoriaFiltro === 'todas' || f.categoria === categoriaFiltro
      return perfilMatch && catMatch
    })
  }, [perfil, categoriaFiltro])

  const categoriasDisponibles = useMemo(() => {
    const cats = new Set(FAQS.filter((f) => !perfil || f.perfil.includes(perfil)).map((f) => f.categoria))
    return Array.from(cats)
  }, [perfil])

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <div className="bg-abla-blue px-4 pb-5 pt-4 text-white">
          <div className="mx-auto flex w-full max-w-[390px] md:max-w-3xl lg:max-w-6xl items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="text-white" aria-label="Volver">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-[16px] font-bold">Preguntas frecuentes</div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[390px] md:max-w-3xl lg:max-w-6xl px-4 pb-10">
          <section className="mt-5 grid items-center gap-4 rounded-abla-panel bg-abla-blue-soft p-5 md:grid-cols-[1fr_150px] md:p-7">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-abla-green">Respuestas claras</p>
              <h1 className="abla-page-title mt-2">Lo que necesitas saber</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Explora dudas frecuentes según tu perfil y encuentra orientación confiable.</p>
            </div>
            <div className="hidden place-items-center md:grid"><AblaCharacter emotion="help" shape="pill" size="lg" decoration /></div>
          </section>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setCategoriaFiltro('todas')}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                categoriaFiltro === 'todas'
                  ? 'border-abla-blue bg-abla-blue text-white'
                  : 'border-[#E6E6E6] bg-white text-slate-500'
              }`}
            >
              Todas
            </button>
            {categoriasDisponibles.map((cat) => {
              const cfg = CATEGORIAS[cat]
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoriaFiltro(cat)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    categoriaFiltro === cat ? 'border-abla-blue bg-abla-blue text-white' : `${cfg?.color || ''} border-transparent`
                  }`}
                >
                  {cfg?.label || cat}
                </button>
              )
            })}
          </div>

          <div className="mt-4 space-y-3">
            {faqsFiltradas.map((faq) => {
              const isOpen = openId === faq.id
              const catCfg = CATEGORIAS[faq.categoria]
              return (
                <div key={faq.id} className="abla-surface overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-start gap-3 px-4 py-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${catCfg?.color || 'bg-slate-100 text-slate-700'}`}>
                        {catCfg?.label || faq.categoria}
                      </div>
                      <div className="mt-2 text-[14px] font-semibold text-abla-blue">{faq.pregunta}</div>
                    </div>
                    <ChevronDown className={`mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="px-4 py-3">
                          <div className="text-[13px] leading-6 text-slate-700">{faq.respuesta}</div>
                          {faq.articulosRelacionados?.length > 0 && (
                            <div className="mt-3">
                              <div className="mb-2 flex flex-wrap gap-2">
                                {faq.articulosRelacionados.map((art) => (
                                  <span key={art} className="rounded-full bg-abla-bg px-2 py-1 text-[10px] font-semibold text-abla-blue">
                                    {art}
                                  </span>
                                ))}
                              </div>
                              <button
                                type="button"
                                onClick={() => navigate('/reglamento')}
                                className="flex items-center gap-1 text-[11px] font-semibold text-abla-green"
                              >
                                <BookOpen className="h-3.5 w-3.5" /> Ver reglamento
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
            {faqsFiltradas.length === 0 && (
              <div className="abla-surface">
                <AblaEmptyState kind="search" title="No encontramos preguntas" description="Prueba con otra categoría para seguir explorando." />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
