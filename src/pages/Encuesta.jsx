import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ChevronRight, Star } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { PROFESORES, CATEGORIAS_SITUACION } from '../data/profesoresData.js'
import AblaCompanion from '../components/companion/AblaCompanion.jsx'
import AblaButton from '../components/AblaButton.jsx'
import { ablaMotion, motionIfAllowed } from '../design/motion.js'

const categoryVisuals = [
  { mood: 'worried', pose: 'listening', gaze: 'left', tone: 'bg-abla-blue-soft' },
  { mood: 'focused', pose: 'thinking', gaze: 'right', tone: 'bg-abla-green-soft' },
  { mood: 'sad', pose: 'resting', gaze: 'left', tone: 'bg-[#F1EDF6]' },
  { mood: 'neutral', pose: 'idle', gaze: 'right', tone: 'bg-[#EEF1F6]' },
  { mood: 'worried', pose: 'protecting', gaze: 'center', tone: 'bg-[#FDEDEC]' },
  { mood: 'focused', pose: 'supporting', gaze: 'right', tone: 'bg-[#E9F3F5]' },
]

function StarRating({ value, onChange = () => {}, size = 'lg', readOnly = false }) {
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(0)
  const starSize = size === 'lg' ? 'h-10 w-10' : 'h-5 w-5'

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileTap={readOnly ? {} : motionIfAllowed(reducedMotion, ablaMotion.press)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          onClick={() => !readOnly && onChange(star)}
          aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
          className={readOnly ? 'pointer-events-none' : ''}
        >
          <Star
            className={`${starSize} transition-colors duration-150 ${
              star <= (hovered || value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-slate-200 text-slate-200'
            }`}
          />
        </motion.button>
      ))}
    </div>
  )
}

const stepMotion = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.22 },
}

const textosEstrellas = {
  1: '😔 Fue difícil, pero gracias por contarlo',
  2: '🤔 Podría haber sido mejor',
  3: '👍 Fue de ayuda',
  4: '😊 Muy buena ayuda',
  5: '🌟 ¡Excelente! Fue muy importante',
}

export default function Encuesta() {
  const reducedMotion = useReducedMotion()
  const navigate = useNavigate()
  const { addRating } = useAppContext()
  const [step, setStep] = useState('inicio')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null)
  const [estrellas, setEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')

  const resetAll = () => {
    setCategoriaSeleccionada(null)
    setProfesorSeleccionado(null)
    setEstrellas(0)
    setComentario('')
    setStep('inicio')
  }

  const profesoresOrdenados = useMemo(() => {
    if (!categoriaSeleccionada) return PROFESORES
    return [...PROFESORES].sort((a, b) => {
      const aMatch = a.especialidades.includes(categoriaSeleccionada.id) ? -1 : 1
      const bMatch = b.especialidades.includes(categoriaSeleccionada.id) ? -1 : 1
      return aMatch - bMatch
    })
  }, [categoriaSeleccionada])

  const enviarValoracion = () => {
    if (!profesorSeleccionado || !categoriaSeleccionada || estrellas === 0) return
    addRating(profesorSeleccionado.id, categoriaSeleccionada.id, estrellas)
    setStep('gracias')
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg pb-24">
        <AnimatePresence mode="wait">
          {step === 'inicio' ? (
            <motion.div key="inicio" {...stepMotion} className="min-h-[calc(100vh-96px)]">
              <Header title="Encuesta" showBack showIcons={false} />
              <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pt-8 text-center">
                <div className="relative grid h-52 w-52 place-items-center overflow-hidden rounded-[46%_54%_42%_58%/58%_44%_56%_42%] bg-abla-green-soft"><span className="absolute right-5 top-7 h-12 w-16 rounded-abla-card bg-white/55" /><AblaCompanion personality="friendly" pose="waving" gaze="right" decorations="subtle" size="xl" label="ABLA te invita a valorar el apoyo" /></div>
                <h1 className="mt-8 text-center text-3xl font-black text-abla-blue md:text-4xl">¿Alguien te ayudó?</h1>
                <p className="mt-3 px-6 text-center text-[14px] text-slate-500">
                  Cuéntanos quién te acompañó y ayuda a otros a encontrar el apoyo que necesitan.
                </p>
                <AblaButton
                  type="button"
                  onClick={() => setStep('categoria')}
                  className="mt-9 w-full md:max-w-md"
                >
                  Valorar un profesor
                </AblaButton>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mt-4 text-center text-[13px] text-slate-400 underline"
                >
                  Saltar por ahora
                </button>
                <div className="mt-10 text-center text-[11px] text-slate-400">🔒 Tu valoración es anónima</div>
              </div>
            </motion.div>
          ) : null}

          {step === 'categoria' ? (
            <motion.div key="categoria" {...stepMotion} className="min-h-[calc(100vh-96px)] pb-24">
              <div className="relative">
                <Header title="Encuesta" showIcons={false} />
                <button
                  type="button"
                  onClick={() => setStep('inicio')}
                  className="absolute left-4 top-4 z-50 text-white"
                  aria-label="Volver"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </div>
              <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
                <h1 className="abla-page-title mt-6">¿Qué tipo de situación tuviste?</h1>
                <p className="mt-1 px-4 text-[13px] text-slate-500">Selecciona la que más se acerca a lo que viviste.</p>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {CATEGORIAS_SITUACION.map((categoria, index) => {
                    const visual = categoryVisuals[index % categoryVisuals.length]
                    return (
                    <motion.button
                      key={categoria.id}
                      type="button"
                      whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)}
                      onClick={() => setCategoriaSeleccionada(categoria)}
                      className={`relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-abla-card border-2 p-4 text-center transition-all ${
                        categoriaSeleccionada?.id === categoria.id
                          ? 'border-abla-green bg-abla-green-soft shadow-abla-float'
                          : 'border-transparent bg-white shadow-abla-card'
                      }`}
                    >
                      <div className={`grid h-24 w-full place-items-center rounded-[44%_56%_48%_52%/58%_44%_56%_42%] ${visual.tone}`}><AblaCompanion mood={visual.mood} pose={visual.pose} gaze={visual.gaze} decorations="none" interactive size="sm" label={`ABLA representa ${categoria.label}`} /></div>
                      <div className="mt-3 text-[13px] font-extrabold text-abla-blue">{categoria.label}</div>
                    </motion.button>
                  )})}
                </div>
              </div>
              <AnimatePresence>
                {categoriaSeleccionada ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-20 left-0 right-0 z-40 px-4 md:bottom-6 md:left-56 lg:left-64"
                  >
                    <div className="mx-auto w-full max-w-[390px] md:max-w-2xl">
                      <button
                        type="button"
                        onClick={() => setStep('profesor')}
                        className="h-14 w-full rounded-2xl bg-abla-blue font-bold text-white"
                      >
                        Continuar
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : null}

          {step === 'profesor' ? (
            <motion.div key="profesor" {...stepMotion} className="min-h-[calc(100vh-96px)] pb-24">
              <div className="relative">
                <Header title="Encuesta" showIcons={false} />
                <button
                  type="button"
                  onClick={() => setStep('categoria')}
                  className="absolute left-4 top-4 z-50 text-white"
                  aria-label="Volver"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </div>
              <div className="mx-auto w-full max-w-[390px] md:max-w-2xl px-4">
                <h1 className="mt-6 text-[18px] font-bold text-abla-blue">¿Quién te ayudó?</h1>
                <p className="mt-1 text-[13px] text-slate-500">
                  ¿Cuál fue el profesor o profesional que te acompañó con tu situación de {categoriaSeleccionada?.label}?
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {profesoresOrdenados.map((profesor) => {
                    const isSelected = profesorSeleccionado?.id === profesor.id
                    const isSpecialist = profesor.especialidades.includes(categoriaSeleccionada?.id)
                    const matches = profesor.especialidades.filter((item) => item === categoriaSeleccionada?.id)

                    return (
                      <motion.button
                        key={profesor.id}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setProfesorSeleccionado(profesor)}
                        className={`rounded-2xl border-l-[3px] bg-white p-4 text-left shadow-sm ${
                          isSelected ? 'border-l-abla-green bg-green-50/30' : 'border-l-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={profesor.avatar} alt="" className="h-12 w-12 rounded-full object-cover" draggable="false" />
                          <div className="min-w-0 flex-1">
                            <div className="text-[14px] font-bold text-abla-blue">{profesor.nombre}</div>
                            <div className="text-[12px] text-slate-500">{profesor.rol}</div>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {matches.map((match) => (
                                <span key={match} className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                                  {CATEGORIAS_SITUACION.find((cat) => cat.id === match)?.label || match}
                                </span>
                              ))}
                              {isSpecialist ? (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                                  ✓ Especialista en esto
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-300" />
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
              <AnimatePresence>
                {profesorSeleccionado ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-20 left-0 right-0 z-40 px-4 md:bottom-6 md:left-56 lg:left-64"
                  >
                    <div className="mx-auto w-full max-w-[390px] md:max-w-2xl">
                      <button
                        type="button"
                        onClick={() => setStep('estrellas')}
                        className="h-14 w-full rounded-2xl bg-abla-blue font-bold text-white"
                      >
                        Continuar
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : null}

          {step === 'estrellas' ? (
            <motion.div key="estrellas" {...stepMotion} className="min-h-[calc(100vh-96px)]">
              <div className="relative">
                <Header title="Encuesta" showIcons={false} />
                <button
                  type="button"
                  onClick={() => setStep('profesor')}
                  className="absolute left-4 top-4 z-50 text-white"
                  aria-label="Volver"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </div>
              <div className="mx-auto flex w-full max-w-[390px] md:max-w-2xl flex-col items-center px-4 pt-8">
                <img
                  src={profesorSeleccionado?.avatar}
                  alt=""
                  className="h-20 w-20 rounded-full border-4 border-abla-green object-cover"
                  draggable="false"
                />
                <h1 className="mt-3 text-[20px] font-bold text-abla-blue">{profesorSeleccionado?.nombre}</h1>
                <p className="text-[13px] text-slate-500">{profesorSeleccionado?.rol}</p>
                <div className="mt-6 h-px w-full bg-[#E6E6E6]" />
                <p className="mt-6 px-6 text-center text-[15px] font-semibold text-abla-blue">
                  ¿Cómo fue la ayuda de {profesorSeleccionado?.nombre} con tu situación de {categoriaSeleccionada?.emoji} {categoriaSeleccionada?.label}?
                </p>
                <div className="mt-8">
                  <StarRating value={estrellas} onChange={setEstrellas} size="lg" />
                </div>
                <AnimatePresence>
                  {estrellas > 0 ? (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mt-4 text-center text-[14px] text-slate-600"
                    >
                      {textosEstrellas[estrellas]}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="¿Quieres agregar algo más? (opcional)"
                  className="mt-6 h-24 w-full resize-none rounded-2xl border border-[#E6E6E6] bg-white p-4 text-[14px] text-slate-800 placeholder:text-slate-400 focus:border-abla-green focus:outline-none"
                />
                <AnimatePresence>
                  {estrellas > 0 ? (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      onClick={enviarValoracion}
                      className="mt-6 h-14 w-full rounded-2xl bg-abla-green text-[15px] font-bold text-white"
                    >
                      Enviar valoración
                    </motion.button>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}

          {step === 'gracias' ? (
            <motion.div key="gracias" {...stepMotion} className="flex min-h-[calc(100vh-96px)] items-center justify-center">
              <div className="mx-auto flex w-full max-w-[390px] md:max-w-2xl flex-col items-center px-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="flex h-40 w-40 items-center justify-center rounded-abla-blob bg-abla-green-soft"
                >
                  <AblaCompanion reaction="success" size="xl" label="ABLA agradece tu valoración" />
                </motion.div>
                <h1 className="mt-5 text-3xl font-black text-abla-blue">¡Gracias!</h1>
                <p className="mt-2 px-8 text-center text-[14px] text-slate-500">
                  Tu valoración ayuda a otros estudiantes a encontrar el apoyo que necesitan.
                </p>
                <div className="mx-4 mt-6 w-full rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={profesorSeleccionado?.avatar} alt="" className="h-10 w-10 rounded-full object-cover" draggable="false" />
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-[13px] font-bold text-abla-blue">{profesorSeleccionado?.nombre}</div>
                      <StarRating value={estrellas} size="sm" readOnly />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetAll}
                  className="mx-4 mt-4 h-12 w-full rounded-2xl border border-abla-green text-[13px] font-bold text-abla-green"
                >
                  Valorar otro profesor
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mt-3 text-center text-[13px] text-slate-400"
                >
                  Volver al inicio
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <BottomNav />
      </div>
    </PageTransition>
  )
}
