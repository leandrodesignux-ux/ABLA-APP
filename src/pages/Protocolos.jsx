import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { PROTOCOLOS } from '../data/protocolos.js'

const nivelConfig = {
  critico: { label: 'URGENTE', bg: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-700' },
  urgente: { label: 'URGENTE', bg: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-700' },
  grave: { label: 'GRAVE', bg: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  moderado: { label: 'MODERADO', bg: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700' },
}

export default function Protocolos() {
  const navigate = useNavigate()
  const { perfil } = useAppContext()

  const protocolosFiltrados = useMemo(() => {
    if (!perfil) return PROTOCOLOS
    return PROTOCOLOS.filter((p) => p.perfil.includes(perfil))
  }, [perfil])

  const urgentes = protocolosFiltrados.filter((p) => p.nivel === 'urgente' || p.nivel === 'critico')
  const otros = protocolosFiltrados.filter((p) => p.nivel !== 'urgente' && p.nivel !== 'critico')

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <div className="bg-abla-blue px-4 pb-5 pt-4 text-white">
          <div className="mx-auto flex w-full max-w-[390px] items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="text-white" aria-label="Volver">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-[16px] font-bold">Protocolos de actuación</div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
          {urgentes.length > 0 && (
            <section className="mt-4">
              <div className="text-[14px] font-bold text-red-700">⚠️ Protocolos urgentes</div>
              <div className="mt-3 space-y-3">
                {urgentes.map((p) => {
                  const cfg = nivelConfig[p.nivel]
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => navigate(`/protocolos/${p.id}`)}
                      className={`w-full rounded-2xl border-2 p-4 text-left ${cfg.bg}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`rounded-full px-2 py-1 text-[10px] font-bold ${cfg.badge}`}>
                          {p.icon} {cfg.label}
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="mt-2 text-[14px] font-bold text-slate-800">{p.titulo}</div>
                      <div className="mt-1 text-[12px] text-slate-600">
                        {p.pasos.length} pasos · {p.plazo}
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {otros.length > 0 && (
            <section className="mt-5">
              <div className="text-[14px] font-bold text-abla-blue">Otros protocolos</div>
              <div className="mt-3 space-y-3">
                {otros.map((p) => {
                  const cfg = nivelConfig[p.nivel] || nivelConfig.moderado
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => navigate(`/protocolos/${p.id}`)}
                      className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm"
                    >
                      <div className="text-xl">{p.icon}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-bold text-slate-800">{p.titulo}</div>
                        <div className="mt-0.5 text-[12px] text-slate-500">{p.pasos.length} pasos de actuación</div>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${cfg.badge}`}>{cfg.label}</span>
                    </button>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
