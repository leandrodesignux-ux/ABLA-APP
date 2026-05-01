import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function GrupoCard({ grupo, onJoin }) {
  const { nombre, descripcion, miembros, activo, ultimoMensaje } = grupo

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[16px] font-bold text-abla-blue">{nombre}</div>
          <div className="mt-0.5 text-[13px] text-slate-500">{descripcion}</div>
          <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-500">
            <Users className="h-4 w-4" />
            <span>{miembros} miembros</span>
            <span>·</span>
            <span>{ultimoMensaje}</span>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
            activo ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-400'
          }`}
        >
          {activo ? 'ACTIVO' : 'INACTIVO'}
        </span>
      </div>

      <div className="mt-4">
        <motion.button
          type="button"
          whileHover={activo ? { scale: 1.02 } : undefined}
          whileTap={activo ? { scale: 0.97 } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={onJoin}
          disabled={!activo}
          className={`h-9 rounded-xl px-4 text-[12px] font-bold ${
            activo ? 'bg-abla-green text-white' : 'bg-slate-200 text-slate-400'
          }`}
        >
          UNIRSE
        </motion.button>
      </div>
    </div>
  )
}

export default function ChatGrupal() {
  const navigate = useNavigate()

  const grupos = useMemo(
    () => [
      {
        id: 'g1',
        nombre: 'Apoyo mutual',
        descripcion: 'Espacio seguro para compartir experiencias',
        miembros: 12,
        activo: true,
        categoria: 'bienestar',
        ultimoMensaje: 'Hace 5 min',
      },
      {
        id: 'g2',
        nombre: 'Frente al bullying',
        descripcion: 'Estrategias y apoyo ante el acoso escolar',
        miembros: 8,
        activo: true,
        categoria: 'acoso',
        ultimoMensaje: 'Hace 1h',
      },
      {
        id: 'g3',
        nombre: 'Bienestar digital',
        descripcion: 'Cómo usar las redes sociales de forma sana',
        miembros: 19,
        activo: false,
        categoria: 'digital',
        ultimoMensaje: 'Ayer',
      },
    ],
    [],
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-abla-bg">
        <Header title="Grupos" showBack showIcons={false} />

        <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
          <div className="mt-6 text-[16px] font-bold text-abla-blue">Selecciona un grupo para unirte</div>

          <div className="mt-4 flex flex-col gap-3">
            {grupos.map((g) => (
              <GrupoCard
                key={g.id}
                grupo={g}
                onJoin={() => navigate('/chat/grupal', { state: { grupoId: g.id, grupoNombre: g.nombre } })}
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
