import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, ChevronRight, Info, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { NEE_TYPES } from '../data/neeTypes.js'

function NeeTypePicker({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/35 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mx-auto mt-14 w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl rounded-3xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[16px] font-bold text-abla-blue">Seleccionar condición</div>
          <button type="button" onClick={onClose} className="rounded-full p-1 text-slate-500" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
          {NEE_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelect(type)}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left ${type.color}`}
            >
              <span className="text-xl">{type.icon}</span>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold">{type.label}</div>
                {type.urgente && <div className="mt-0.5 text-[11px] font-bold">⚠️ Requiere protocolo urgente</div>}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function CertCard({ cert, neeType, onDelete, onView }) {
  return (
    <div className={`rounded-2xl border-2 p-4 ${neeType?.color || 'border-slate-200 bg-white text-slate-700'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{neeType?.icon || '📄'}</div>
          <div>
            <div className="text-[14px] font-bold">{neeType?.label || cert.tipo}</div>
            <div className="mt-0.5 text-[12px] opacity-70">
              Registrado el {new Date(cert.fechaSubida).toLocaleDateString('es', { day: '2-digit', month: 'long' })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(cert.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50"
          aria-label="Eliminar condición"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onView(neeType)}
        className="mt-3 flex items-center gap-1 text-[12px] font-semibold opacity-80"
      >
        <Info className="h-4 w-4" />
        Ver alertas y recomendaciones <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

function NeeDetail({ neeType, onClose }) {
  const navigate = useNavigate()

  if (!neeType) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/35 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mx-auto mt-10 w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl rounded-3xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} className="mb-3 flex items-center gap-1 text-[12px] font-semibold text-slate-600">
          <ArrowLeft className="h-4 w-4" /> Volver
        </button>

        <div className="rounded-2xl bg-abla-bg p-4">
          <div className="flex items-center gap-2 text-[16px] font-bold text-abla-blue">
            <span className="text-2xl">{neeType.icon}</span>
            {neeType.label}
          </div>
          <div className="mt-2 text-[13px] text-slate-600">{neeType.descripcion}</div>
        </div>

        {neeType.alertas.length > 0 && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="mb-2 text-[13px] font-bold text-red-700">⚠️ Señales de alerta</div>
            <div className="space-y-2">
              {neeType.alertas.map((a) => (
                <div key={a} className="flex items-start gap-2 text-[12px] text-red-800">
                  <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {neeType.recomendaciones.length > 0 && (
          <div className="mt-3 rounded-2xl border border-green-200 bg-green-50 p-4">
            <div className="mb-2 text-[13px] font-bold text-green-700">✅ Recomendaciones</div>
            <div className="space-y-2">
              {neeType.recomendaciones.map((r) => (
                <div key={r} className="flex items-start gap-2 text-[12px] text-green-800">
                  <CheckCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {neeType.protocoloId && (
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate(`/protocolos/${neeType.protocoloId}`)
            }}
            className="mt-4 h-12 w-full rounded-xl bg-abla-blue text-[13px] font-bold text-white"
          >
            Ver protocolo de actuación →
          </button>
        )}
      </motion.div>
    </div>
  )
}

export default function CertificadosNEE() {
  const navigate = useNavigate()
  const { certificadosNEE, addCertificadoNEE, removeCertificadoNEE } = useAppContext()
  const [showPicker, setShowPicker] = useState(false)
  const [detailNee, setDetailNee] = useState(null)

  const handleSelect = (neeType) => {
    addCertificadoNEE({ tipo: neeType.id, label: neeType.label })
    setShowPicker(false)
  }

  const getNeeType = (tipoId) => NEE_TYPES.find((t) => t.id === tipoId)

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <div className="bg-abla-blue px-4 pb-5 pt-4 text-white">
          <div className="mx-auto w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl">
            <button type="button" onClick={() => navigate(-1)} className="text-white" aria-label="Volver">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="mt-3 text-[20px] font-bold">Condiciones de mi hijo/a</div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[390px] md:max-w-2xl lg:max-w-3xl px-4 pb-10">
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-[12px] text-slate-600">
            Registra las condiciones de salud o NEE de tu hijo/a. Esta información solo es visible para ti y los
            profesionales autorizados.
          </div>

          <AnimatePresence>{detailNee && <NeeDetail neeType={detailNee} onClose={() => setDetailNee(null)} />}</AnimatePresence>

          <div className="mt-4 space-y-3">
            {certificadosNEE.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-center text-[13px] text-slate-500">
                No has registrado ninguna condición aún
              </div>
            )}
            {certificadosNEE.map((cert) => (
              <CertCard
                key={cert.id}
                cert={cert}
                neeType={getNeeType(cert.tipo)}
                onDelete={removeCertificadoNEE}
                onView={(t) => t && setDetailNee(t)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-abla-green bg-white text-[14px] font-semibold text-abla-green"
          >
            <Plus className="h-4 w-4" /> Agregar condición
          </button>
        </div>

        <AnimatePresence>{showPicker && <NeeTypePicker onSelect={handleSelect} onClose={() => setShowPicker(false)} />}</AnimatePresence>
      </div>
    </PageTransition>
  )
}
