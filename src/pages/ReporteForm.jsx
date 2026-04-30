import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, MapPin, Upload, User } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function Chip({ active, label, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`h-10 rounded-full px-4 text-[13px] font-bold transition-colors ${
        active ? 'bg-abla-green text-white' : 'bg-white text-abla-blue border border-[#E6E6E6]'
      }`}
      aria-label={label}
    >
      {label}
    </motion.button>
  )
}

function FieldLabel({ children }) {
  return <div className="text-[13px] font-semibold text-abla-blue">{children}</div>
}

function TextInput({ icon, placeholder, value, onChange }) {
  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-xl border border-[#E6E6E6] bg-white px-3 focus-within:border-abla-green">
      <div className="text-slate-400" aria-hidden="true">
        {icon}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
      />
    </div>
  )
}

export default function ReporteForm() {
  const { tipo } = useParams()
  const navigate = useNavigate()

  const title = useMemo(() => {
    const t = (tipo || '').toLowerCase()
    if (t === 'abuso') return 'Situación de Abuso'
    if (t === 'cyberbullying') return 'Cyberbullying'
    if (t === 'violencia') return 'Violencia Física'
    return 'Reporte'
  }, [tipo])

  const [desc, setDesc] = useState('')
  const [when, setWhen] = useState('Hoy')
  const [where, setWhere] = useState('')
  const [who, setWho] = useState('')
  const [anon, setAnon] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!submitted) return
    const t = window.setTimeout(() => navigate(-1), 2000)
    return () => window.clearTimeout(t)
  }, [submitted, navigate])

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg">
      <Header title={title} showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
        <div className="mt-6">
          <FieldLabel>Describe lo que ocurrió</FieldLabel>
          <textarea
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Escribe aquí lo que pasó..."
            className="mt-2 w-full resize-none rounded-xl border border-[#E6E6E6] bg-white p-3 text-[14px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-abla-green"
          />
        </div>

        <div className="mt-5">
          <FieldLabel>¿Cuándo ocurrió?</FieldLabel>
          <div className="mt-2 flex gap-2">
            {['Hoy', 'Esta semana', 'Antes'].map((o) => (
              <Chip key={o} label={o} active={when === o} onClick={() => setWhen(o)} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <FieldLabel>¿Dónde ocurrió?</FieldLabel>
          <div className="mt-2">
            <TextInput
              icon={<MapPin className="h-5 w-5" />}
              placeholder="Ej: Sala de clases, patio, chat..."
              value={where}
              onChange={setWhere}
            />
          </div>
        </div>

        <div className="mt-5">
          <FieldLabel>Adjuntar evidencia</FieldLabel>
          <motion.button
            type="button"
            whileTap={{ scale: 0.99 }}
            className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-white px-4 py-6 text-center"
            aria-label="Adjuntar evidencia"
          >
            <Upload className="h-6 w-6 text-abla-blue" aria-hidden="true" />
            <div className="text-[13px] font-semibold text-slate-700">Toca para adjuntar foto o video</div>
            <div className="text-[12px] text-slate-500">(Solo demostración)</div>
          </motion.button>
        </div>

        <div className="mt-5">
          <FieldLabel>¿Quién es el responsable? (opcional)</FieldLabel>
          <div className="mt-2">
            <TextInput
              icon={<User className="h-5 w-5" />}
              placeholder="Nombre o descripción (si lo sabes)"
              value={who}
              onChange={setWho}
            />
          </div>
        </div>

        <label className="mt-5 flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="h-5 w-5 accent-abla-green"
          />
          <div className="text-left">
            <div className="text-[13px] font-bold text-abla-blue">Mantener mi reporte anónimo</div>
            <div className="mt-0.5 text-[12px] text-slate-500">Tu identidad no será compartida.</div>
          </div>
        </label>

        <motion.button
          type="button"
          whileHover={!submitted ? { scale: 1.02 } : {}}
          whileTap={!submitted ? { scale: 0.96 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          disabled={submitted}
          onClick={() => setSubmitted(true)}
          className={`mt-6 h-12 w-full rounded-xl font-bold text-white ${
            submitted ? 'bg-slate-300' : 'bg-abla-green'
          }`}
          aria-label="Enviar reporte"
        >
          ENVIAR REPORTE
        </motion.button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 px-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="w-full max-w-[340px] rounded-2xl bg-white p-6 text-center shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 520, damping: 24, delay: 0.05 }}
                className="mx-auto flex h-20 w-20 items-center justify-center"
                aria-hidden="true"
              >
                <CheckCircle className="h-16 w-16 text-abla-green" />
              </motion.div>
              <div className="mt-2 text-[16px] font-bold text-abla-blue">Reporte enviado</div>
              <div className="mt-1 text-[13px] text-slate-600">Gracias por contarlo. Volviendo…</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  )
}
