import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, Paperclip, Smile, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

// Screen 1: Survey Selector
function SurveySelector({ onSelectSurvey }) {
  const navigate = useNavigate()

  const surveys = [
    { id: 'tutor', title: '¿Qué opinas sobre tu tutor?' },
    { id: 'experiencia', title: '¿Cómo es tu experiencia en el instituto?' },
    { id: 'mejora', title: 'Ayúdanos a mejorar' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="h-14 bg-abla-green flex items-center justify-center relative px-4">
        <button
          onClick={() => navigate('/home')}
          className="absolute left-4 text-white"
          aria-label="Volver"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-white">Encuestas</h1>
      </div>

      <div className="px-6 py-8">
        {/* Circular illustration */}
        <div className="flex justify-center mb-10">
          <div className="w-[180px] h-[180px] rounded-full border-4 border-abla-green flex items-center justify-center bg-white overflow-hidden">
            <img
              src="/Illustrations/encuestas.svg"
              alt=""
              className="w-full h-full object-contain p-4"
              draggable="false"
            />
          </div>
        </div>

        {/* Survey options */}
        <div className="space-y-8">
          {surveys.map((survey) => (
            <div key={survey.id} className="text-center">
              <p className="text-[16px] text-slate-700 mb-4">{survey.title}</p>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectSurvey(survey.id)}
                className="w-[240px] h-11 bg-abla-blue text-white font-medium rounded-lg shadow-sm hover:bg-opacity-90 transition-colors"
              >
                CONTESTAR
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Screen 2: Tutor Survey
function TutorSurvey({ onBack, onComplete }) {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
  })
  const [comment, setComment] = useState('')

  const questions = [
    {
      id: 'q1',
      text: '¿Qué opinas del tutor?',
      options: ['Es muy bueno', 'Podría mejorar', 'No me gusta'],
    },
    {
      id: 'q2',
      text: '¿Que tipo de afinidad tienes con el tutor?',
      options: ['Muy buena', 'Podría mejorar', 'Ninguna'],
    },
    {
      id: 'q3',
      text: '¿Cómo podría mejorar?',
      options: ['Más comunicación', 'Más apoyo emocional', 'Mayor disponibilidad'],
    },
  ]

  const isAnswered = Object.values(answers).some((a) => a !== '')

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="h-14 bg-abla-green flex items-center justify-center relative px-4">
        <button
          onClick={onBack}
          className="absolute left-4 text-white"
          aria-label="Volver"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-white">Encuestas</h1>
      </div>

      <div className="px-6 py-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-[26px] font-bold text-abla-blue">Camila Lopez</h2>
          <p className="text-[14px] text-slate-500 mt-1">¿Qué opinas del tutor?</p>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="border-b border-[#E6E6E6] pb-6">
              <p className="text-[14px] text-abla-blue text-center mb-4">{q.text}</p>
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                    className={`w-full text-left py-3 border-b transition-colors ${
                      answers[q.id] === opt
                        ? 'text-abla-green border-abla-green font-medium'
                        : 'text-slate-700 border-slate-300'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          {/* Comment section */}
          <div className="border-b border-[#E6E6E6] pb-6">
            <p className="text-[14px] text-abla-blue text-center mb-4">¿Cómo podría mejorar?</p>
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="w-full h-28 p-4 bg-[#F5F7F9] rounded-lg resize-none text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-abla-green"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-3 text-slate-400">
                <Paperclip className="h-5 w-5" />
                <Smile className="h-5 w-5" />
                <ImageIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Finalizar button */}
        <AnimatePresence>
          {isAnswered && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onComplete()}
              className="mt-8 w-full h-12 bg-abla-blue text-white font-bold rounded-lg"
            >
              FINALIZAR
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Screen 3: Experience Survey
function ExperienceSurvey({ onBack, onComplete }) {
  const [answers, setAnswers] = useState({
    lugar: '',
    escuela: '',
    acosado: '',
    molestado: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const sections = [
    {
      title: '¿Dónde crees que ocurren más episodios violentos?',
      key: 'lugar',
      options: ['Pasillos', 'Baños', 'Gimnasio'],
    },
    {
      title: '¿Qué puede hacer la escuela para detener el acoso escolar?',
      key: 'escuela',
      options: ['Hablar sobre el acoso escolar en clases', 'Hacer reglas contra el bullying', 'Supervisar mejor'],
    },
    {
      title: '¿Cuántos niños te han acosado?',
      key: 'acosado',
      options: ['No me han acosado', '1-2', 'más de 4'],
    },
    {
      title: '¿Puedes decirnos como te han molestado?',
      key: 'molestado',
      options: ['No me han molestado', 'Me han agredido físicamente', 'Me han molestado por redes sociales'],
    },
  ]

  const isComplete = Object.values(answers).every((a) => a !== '')

  const handleFinalize = () => {
    setShowSuccess(true)
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-abla-green flex items-center justify-center mb-4">
            <Check className="h-12 w-12 text-white" />
          </div>
          <p className="text-lg font-semibold text-abla-blue">¡Gracias!</p>
          <p className="text-sm text-slate-500">Tu respuesta fue enviada</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="h-14 bg-abla-green flex items-center justify-center relative px-4">
        <button
          onClick={onBack}
          className="absolute left-4 text-white"
          aria-label="Volver"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-white">Encuestas</h1>
      </div>

      <div className="px-6 py-6 pb-24">
        {/* Questions */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.key} className="border-b border-[#E6E6E6] pb-6">
              <p className="text-[14px] text-abla-blue text-center mb-4 px-4">{section.title}</p>
              <div className="space-y-3">
                {section.options.map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAnswers((prev) => ({ ...prev, [section.key]: opt }))}
                    className={`w-full text-left py-3 border-b transition-colors ${
                      answers[section.key] === opt
                        ? 'text-abla-green border-abla-green font-medium'
                        : 'text-slate-700 border-slate-300'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Finalizar button */}
        <AnimatePresence>
          {isComplete && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinalize}
              className="mt-8 w-full h-12 bg-abla-blue text-white font-bold rounded-lg"
            >
              FINALIZAR
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Encuesta() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState('selector') // selector, tutor, experiencia

  const handleSurveySelect = (surveyId) => {
    if (surveyId === 'tutor') {
      setCurrentScreen('tutor')
    } else if (surveyId === 'experiencia' || surveyId === 'mejora') {
      setCurrentScreen('experiencia')
    }
  }

  const handleComplete = () => {
    navigate('/home')
  }

  return (
    <PageTransition>
      <AnimatePresence mode="wait">
        {currentScreen === 'selector' && (
          <SurveySelector
            key="selector"
            onSelectSurvey={handleSurveySelect}
          />
        )}
        {currentScreen === 'tutor' && (
          <TutorSurvey
            key="tutor"
            onBack={() => setCurrentScreen('selector')}
            onComplete={handleComplete}
          />
        )}
        {currentScreen === 'experiencia' && (
          <ExperienceSurvey
            key="experiencia"
            onBack={() => setCurrentScreen('selector')}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
