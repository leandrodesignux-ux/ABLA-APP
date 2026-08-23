import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FileImage, MapPin, Upload, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import AblaCharacter from '../components/AblaCharacter.jsx'
import AblaButton from '../components/AblaButton.jsx'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

function Chip({ active, label, onClick, className = '', activeClassName = '' }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.button
      type="button"
      whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)}
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 text-[13px] font-bold transition-colors focus-visible:ring-3 focus-visible:ring-abla-green/30 ${
        active ? activeClassName || 'bg-abla-green text-white shadow-abla-green' : `bg-white text-abla-blue border border-abla-border ${className}`
      }`}
      aria-label={label}
    >
      {label}
    </motion.button>
  )
}

function FieldLabel({ children }) {
  return <div className="text-sm font-extrabold text-abla-blue">{children}</div>
}

function TextInput({ icon, placeholder, value, onChange }) {
  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-abla-control border border-abla-border bg-white px-3 focus-within:border-abla-green focus-within:ring-3 focus-within:ring-abla-green/15">
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
  const reducedMotion = useReducedMotion()
  const { tipo } = useParams()
  const navigate = useNavigate()
  const { addReporte } = useAppContext()

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
  const [severidad, setSeveridad] = useState('medio')
  const [frecuencia, setFrecuencia] = useState('')
  const [tieneEvidencia, setTieneEvidencia] = useState(false)
  const [tiposEvidencia, setTiposEvidencia] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const toggleTipoEvidencia = (value) => {
    setTiposEvidencia((prev) => (
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    ))
  }

  const submitReporte = () => {
    addReporte({
      tipo: tipo,
      descripcion: desc,
      lugar: where,
      cuando: when,
      quien: who,
      anonimo: anon,
      severidad,
      frecuencia,
      tieneEvidencia,
      tiposEvidencia,
    })
    setSubmitted(true)
  }

  return (
    <PageTransition>
    <div className="min-h-dvh bg-abla-bg">
      <Header title={title} showBack showIcons={false} />

      <div className="mx-auto w-full max-w-3xl px-4 pb-10 md:px-6">
        <div className="mt-6 rounded-abla-card bg-abla-blue-soft p-5 md:flex md:items-center md:gap-5"><AblaCharacter emotion="safe" shape="arch" pose="open" interaction="supportive" size="sm" /><div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-abla-green">Paso a paso</p><h1 className="mt-1 text-xl font-black text-abla-blue md:text-2xl">Cuéntanos lo que ocurrió</h1><p className="mt-1 text-sm leading-5 text-slate-500">Completa solo lo que recuerdes. Puedes mantener tu identidad anónima.</p></div><div className="ml-auto mt-4 flex items-center gap-2 md:mt-0" aria-label="Progreso del reporte"><span className="h-3 w-8 rounded-full bg-abla-green" /><span className="h-3 w-3 rounded-abla-blob bg-abla-green/40" /><span className="h-3 w-3 rounded-full bg-abla-blue/15" /></div></div>

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
          <FieldLabel>Describe lo que ocurrió</FieldLabel>
          <textarea
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Escribe aquí lo que pasó..."
            className="mt-2 w-full resize-none rounded-abla-control border border-abla-border bg-abla-bg p-4 text-[14px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-abla-green focus:bg-white focus:ring-3 focus:ring-abla-green/15"
          />
        </div>

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
          <FieldLabel>Nivel de gravedad</FieldLabel>
          <div className="mt-2 flex flex-wrap gap-2">
            {['leve', 'medio', 'grave', 'urgente'].map((option) => (
              <Chip
                key={option}
                label={option}
                active={severidad === option}
                onClick={() => setSeveridad(option)}
                className={option === 'urgente' ? 'border-red-400 text-red-500' : ''}
                activeClassName={option === 'urgente' ? 'bg-red-500 text-white' : ''}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
          <FieldLabel>¿Con qué frecuencia ocurre?</FieldLabel>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: 'Primera vez', value: 'primera-vez' },
              { label: 'Ocasional', value: 'ocasional' },
              { label: 'Frecuente', value: 'frecuente' },
              { label: 'Todos los días', value: 'diario' },
            ].map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                active={frecuencia === option.value}
                onClick={() => setFrecuencia(option.value)}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
          <FieldLabel>¿Tienes evidencia?</FieldLabel>
          <button
            type="button"
            onClick={() => setTieneEvidencia((prev) => !prev)}
            className={`mt-2 h-10 rounded-full px-4 text-[13px] font-bold transition-colors ${
              tieneEvidencia ? 'bg-abla-green text-white' : 'border border-[#E6E6E6] bg-white text-abla-blue'
            }`}
          >
            {tieneEvidencia ? 'Sí, tengo evidencia' : 'No por ahora'}
          </button>

          {tieneEvidencia ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: 'Foto', value: 'foto' },
                { label: 'Captura de pantalla', value: 'captura' },
                { label: 'Audio', value: 'audio' },
                { label: 'Testigo presencial', value: 'testigo' },
              ].map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  active={tiposEvidencia.includes(option.value)}
                  onClick={() => toggleTipoEvidencia(option.value)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
          <FieldLabel>¿Cuándo ocurrió?</FieldLabel>
          <div className="mt-2 flex gap-2">
            {['Hoy', 'Esta semana', 'Antes'].map((o) => (
              <Chip key={o} label={o} active={when === o} onClick={() => setWhen(o)} />
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
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

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
          <FieldLabel>Adjuntar evidencia</FieldLabel>
          <motion.button
            type="button"
            whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)}
            className="mt-2 flex w-full items-center justify-center gap-4 rounded-abla-card border-2 border-dashed border-abla-green/35 bg-abla-green-soft px-5 py-6 text-left transition-colors hover:bg-abla-green-mist"
            aria-label="Adjuntar evidencia"
          >
            <div className="relative"><AblaCharacter emotion="help" shape="pebble" pose="point" gaze="right" interaction="curious" interactive size="sm" /><FileImage className="absolute -right-2 -top-1 h-7 w-7 rounded-md bg-white p-1 text-abla-blue shadow-abla-card" /></div>
            <div><div className="text-[13px] font-bold text-abla-blue">Adjunta una foto, captura o video</div><div className="mt-1 text-[12px] text-slate-500">La evidencia puede ayudar a comprender lo ocurrido · Demostración</div></div><Upload className="ml-auto h-5 w-5 shrink-0 text-abla-green" />
          </motion.button>
        </div>

        <div className="mt-5 rounded-abla-card bg-white p-5 shadow-abla-card md:p-6">
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

        <label className="mt-5 flex items-center gap-3 rounded-abla-card bg-abla-green-soft p-5 shadow-abla-card">
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

        <AblaButton
          type="button"
          disabled={submitted}
          onClick={submitReporte}
          className="mt-6 w-full"
          aria-label="Enviar reporte"
        >
          ENVIAR REPORTE
        </AblaButton>
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
              className="w-full max-w-md rounded-abla-panel bg-white p-6 text-center shadow-abla-float md:p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 520, damping: 24, delay: 0.05 }}
                className="mx-auto flex h-32 w-32 items-center justify-center rounded-abla-blob bg-abla-green-soft"
                aria-hidden="true"
              >
                <AblaCharacter emotion="success" shape="soft-star" pose="open" interaction="celebrate" size="lg" decoration blink />
              </motion.div>
              <div className="mt-4 text-xl font-black text-abla-blue">Reporte enviado</div>
              <div className="mt-1 text-[13px] text-slate-600">Gracias por contarlo.</div>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-12 w-full rounded-xl bg-abla-green text-[13px] font-bold text-white"
                >
                  Volver
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/bitacora')}
                  className="h-12 w-full rounded-xl border border-abla-green text-[13px] font-bold text-abla-green"
                >
                  Ver en Bitácora
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  )
}
