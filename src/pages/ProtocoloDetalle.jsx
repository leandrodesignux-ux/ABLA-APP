import { motion } from 'framer-motion'
import { ArrowLeft, Phone } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { PROTOCOLOS } from '../data/protocolos.js'

export default function ProtocoloDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const protocolo = PROTOCOLOS.find((p) => p.id === id)

  if (!protocolo) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-abla-bg p-4">
          <div className="mx-auto mt-10 w-full max-w-[390px] rounded-2xl bg-white p-5 text-center shadow-sm">
            <div className="text-[14px] text-slate-600">No se encontró el protocolo solicitado.</div>
            <button type="button" onClick={() => navigate(-1)} className="mt-4 font-semibold text-abla-blue">
              ← Volver
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  const isUrgente = protocolo.nivel === 'urgente' || protocolo.nivel === 'critico'

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <div className="bg-abla-blue px-4 pb-5 pt-4 text-white">
          <div className="mx-auto flex w-full max-w-[390px] items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="text-white" aria-label="Volver">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-bold">{protocolo.titulo}</div>
            </div>
            <div className="text-xl">{protocolo.icon}</div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
          {isUrgente && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-[13px] font-semibold text-red-800">
              🔴 Este protocolo requiere acción inmediata. Sigue los pasos en orden.
            </div>
          )}

          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-[12px] text-slate-500">Plazo</div>
            <div className="mt-1 text-[13px] font-semibold text-slate-800">{protocolo.plazo}</div>
          </div>

          <section className="mt-5">
            <div className="text-[15px] font-bold text-abla-blue">Pasos de actuación</div>
            <div className="mt-3 space-y-3">
              {protocolo.pasos.map((paso) => (
                <motion.div
                  key={`${protocolo.id}-${paso.paso}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-abla-blue text-[12px] font-bold text-white">
                    {paso.paso}
                  </div>
                  <div className="text-[12px] font-bold text-abla-blue">{paso.actor}</div>
                  <div className="mt-1 text-[13px] leading-5 text-slate-700">{paso.accion}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {protocolo.recursos?.length > 0 && (
            <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-[14px] font-bold text-abla-blue">📞 Recursos y contactos</div>
              <div className="mt-3 space-y-2">
                {protocolo.recursos.map((r) => {
                  const numero = r.match(/[\d\s]{7,}/)?.[0]?.trim()
                  return (
                    <div key={r} className="flex items-center justify-between rounded-xl bg-abla-bg px-3 py-2.5">
                      <div className="text-[12px] text-slate-700">{r}</div>
                      {numero && (
                        <a href={`tel:${numero.replace(/\s+/g, '')}`} className="flex items-center gap-1 text-[12px] font-semibold text-abla-blue">
                          <Phone className="h-3.5 w-3.5" />
                          {numero}
                        </a>
                      )}
                    </div>
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
