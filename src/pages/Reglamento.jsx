import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, ChevronDown, CheckCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { REGLAMENTO } from '../data/reglamento.js'
import { useAppContext } from '../context/AppContext.jsx'

export default function Reglamento() {
  const navigate = useNavigate()
  const { reglamentoLeido, marcarReglamentoLeido } = useAppContext()
  const [query, setQuery] = useState('')
  const [openChapter, setOpenChapter] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const filtered = useMemo(() => {
    if (!query.trim()) return REGLAMENTO.capitulos
    const q = query.toLowerCase()
    return REGLAMENTO.capitulos
      .map((cap) => ({
        ...cap,
        articulos: cap.articulos.filter((a) => a.texto.toLowerCase().includes(q) || `art. ${a.num}`.includes(q)),
      }))
      .filter((cap) => cap.articulos.length > 0)
  }, [query])

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <div className="bg-abla-blue px-4 pb-5 pt-4 text-white">
          <div className="mx-auto flex w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="flex-shrink-0 text-white" aria-label="Volver">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <div className="truncate text-[16px] font-bold">{REGLAMENTO.titulo}</div>
              <div className="text-[12px] text-white/80">v{REGLAMENTO.version}</div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl px-4 pb-24">
          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artículo o palabra clave..."
              className="h-11 w-full rounded-xl border border-[#E6E6E6] bg-white pl-9 pr-4 text-[13px] focus:border-abla-green focus:outline-none"
            />
          </div>

          {reglamentoLeido ? (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-[12px] font-semibold text-green-700">
              <CheckCircle className="h-4 w-4" /> Marcado como leído
            </div>
          ) : null}

          <div className="mt-4 space-y-3">
            {filtered.map((cap) => (
              <div key={cap.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenChapter(openChapter === cap.id ? null : cap.id)}
                  className="flex w-full items-center justify-between px-4 py-4"
                >
                  <span className="text-left text-[14px] font-bold text-abla-blue">{cap.titulo}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform ${openChapter === cap.id ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openChapter === cap.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border-t border-slate-100 px-4 py-3"
                    >
                      <div className="space-y-3">
                        {cap.articulos.map((art) => (
                          <div key={art.num} className="rounded-xl bg-abla-bg p-3">
                            <div className="text-[11px] font-bold text-abla-blue">Art. {art.num}</div>
                            <div className="mt-1 text-[13px] leading-5 text-slate-700">{art.texto}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="rounded-2xl bg-white p-4 text-[13px] text-slate-500">
                No se encontraron resultados para "{query}"
              </div>
            )}
          </div>
        </div>

        {!reglamentoLeido && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-4 py-3 md:left-56 lg:left-64">
            <div className="mx-auto w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl">
              <button
                type="button"
                onClick={() => {
                  marcarReglamentoLeido()
                  setShowConfirm(true)
                  setTimeout(() => setShowConfirm(false), 2000)
                }}
                className="h-12 w-full rounded-xl bg-abla-blue text-[13px] font-bold text-white shadow-lg"
              >
                He leído el reglamento
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-green-600 px-4 py-2 text-[12px] font-bold text-white shadow-lg"
            >
              ✓ Reglamento marcado como leído
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
