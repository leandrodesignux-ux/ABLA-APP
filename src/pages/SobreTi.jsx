import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const options = [
  {
    id: 'estudiante',
    label: 'Estudiante',
    description: 'Soy alumno de la escuela',
    icon: '/Avatars/avatar-matias.svg',
  },
  {
    id: 'apoderado',
    label: 'Apoderado',
    description: 'Soy padre/madre/tutor',
    icon: '/Avatars/avatar-tutor.svg',
  },
  {
    id: 'profesional',
    label: 'Profesional',
    description: 'Psicólogo, docente, etc.',
    icon: '/Illustrations/profesional.svg',
  },
]

function OptionCard({ option, isSelected, onSelect }) {
  const navigate = useNavigate()
  const { setPerfil } = useAppContext()

  const handleClick = () => {
    onSelect(option.id)
    setPerfil(option.id)
    sessionStorage.setItem('abla_perfil', option.id)
    // Small delay to show selection feedback before navigating
    setTimeout(() => {
      if (option.id === 'estudiante') navigate('/home')
      if (option.id === 'apoderado') navigate('/home/apoderado')
      if (option.id === 'profesional') navigate('/home/profesional')
    }, 200)
  }

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(63,85,119,0.15)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      animate={{
        backgroundColor: isSelected ? 'rgba(86, 160, 135, 0.1)' : 'rgba(255, 255, 255, 1)',
      }}
      onClick={handleClick}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
        isSelected
          ? 'border-abla-green shadow-md'
          : 'border-[#E6E6E6] hover:border-abla-green/50'
      }`}
      aria-label={option.label}
    >
      <div className="h-14 w-14 rounded-full overflow-hidden bg-abla-bg flex items-center justify-center shrink-0">
        <img
          src={option.icon}
          alt=""
          className="h-full w-full object-contain p-1"
          draggable="false"
        />
      </div>
      <div className="flex-1 text-left">
        <div className="text-[16px] font-medium text-abla-blue">{option.label}</div>
        <div className="text-[14px] text-slate-500">{option.description}</div>
      </div>
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'border-abla-green bg-abla-green' : 'border-[#E6E6E6]'
        }`}
      >
        {isSelected && (
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </motion.button>
  )
}

export default function SobreTi() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <PageTransition>
      <div className="h-[844px] w-[390px] bg-abla-bg flex flex-col px-6 overflow-hidden">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-8 pb-4"
        >
          <h1 className="text-[22px] font-bold text-abla-blue text-center">
            Cuéntanos sobre ti
          </h1>
          <p className="text-[14px] text-slate-500 text-center mt-2">
            Selecciona tu perfil para personalizar tu experiencia
          </p>
        </motion.div>

        {/* Options Section - Flex grow to fill space */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col justify-center gap-4 py-4"
        >
          {options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={selectedId === option.id}
              onSelect={setSelectedId}
            />
          ))}
        </motion.div>

        {/* Bottom spacing for symmetry */}
        <div className="pb-8" />
      </div>
    </PageTransition>
  )
}
