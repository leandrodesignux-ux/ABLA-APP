import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function ProfesorCard({ profesor, onChat }) {
  const { nombre, materia, avatarSrc, disponible, descripcion } = profesor

  return (
    <div className={`rounded-2xl bg-white p-4 shadow-sm ${!disponible ? 'opacity-50' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-abla-bg">
          <img src={avatarSrc} alt="" className="h-full w-full object-cover" draggable="false" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[16px] font-bold text-abla-blue">{nombre}</div>
          <div className="mt-0.5 text-[13px] text-slate-500">{materia}</div>
          <div className="mt-2 text-[12px] font-medium text-slate-500">{descripcion}</div>
          <span
            className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${
              disponible ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {disponible ? 'DISPONIBLE' : 'NO DISPONIBLE'}
          </span>
        </div>

        <motion.button
          type="button"
          whileHover={disponible ? { scale: 1.02 } : undefined}
          whileTap={disponible ? { scale: 0.96 } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={onChat}
          disabled={!disponible}
          className={`h-9 rounded-xl px-4 text-[12px] font-bold ${
            disponible ? 'bg-abla-blue text-white' : 'bg-slate-200 text-slate-400'
          }`}
          aria-label={disponible ? `Chatear con ${nombre}` : `${nombre} no disponible`}
        >
          {disponible ? 'CHATEAR' : 'No disponible'}
        </motion.button>
      </div>
    </div>
  )
}

export default function ChatProfesor() {
  const navigate = useNavigate()

  const profesores = useMemo(
    () => [
      {
        id: 'prof-1',
        nombre: 'Prof. Juan Herrera',
        materia: 'Matemáticas',
        avatarSrc: '/Avatars/psi-1.svg',
        disponible: true,
        descripcion: 'Disponible para consultas de lunes a jueves',
      },
      {
        id: 'prof-2',
        nombre: 'Prof. María Vega',
        materia: 'Lenguaje y Comunicación',
        avatarSrc: '/Avatars/psi-2.svg',
        disponible: true,
        descripcion: 'Especialista en orientación estudiantil',
      },
      {
        id: 'prof-3',
        nombre: 'Prof. Roberto Díaz',
        materia: 'Ciencias Naturales',
        avatarSrc: '/Avatars/psi-3.svg',
        disponible: false,
        descripcion: 'Actualmente no disponible',
      },
    ],
    [],
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <Header title="Elegir Profesor" showBack showIcons={false} />

        <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
          <div className="mt-6 text-[16px] font-bold text-abla-blue">¿Con qué profesor quieres hablar?</div>

          <div className="mt-4 flex flex-col gap-3">
            {profesores.map((p) => (
              <ProfesorCard
                key={p.id}
                profesor={p}
                onChat={() =>
                  navigate('/chat/profesor', {
                    state: { profesorId: p.id, profesorNombre: p.nombre, avatarSrc: p.avatarSrc },
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
