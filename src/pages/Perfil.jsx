import { motion } from 'framer-motion'
import { Building2, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'

function InfoCard({ icon, title, lines, actionLabel, actionColorClass, onAction }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-abla-bg">{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-bold text-abla-blue">{title}</div>
          <div className="mt-2 flex flex-col gap-1">
            {lines.map((l) => (
              <div key={l} className="text-[13px] text-slate-700">
                {l}
              </div>
            ))}
          </div>

          {actionLabel && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={onAction}
              className={`mt-3 text-left text-[13px] font-bold ${actionColorClass}`}
              aria-label={actionLabel}
            >
              {actionLabel}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

function ReportItem({ title, statusLabel }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#E6E6E6] bg-white px-4 py-3">
      <div className="text-[13px] font-semibold text-slate-700">{title}</div>
      <div className="rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold text-[#B45309]">{statusLabel}</div>
    </div>
  )
}

export default function Perfil() {
  const navigate = useNavigate()
  const { user, reportesEnviados } = useAppContext()

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24">
      <Header title="Perfil" showBack={false} showIcons={false} />

      <div className="mx-auto w-full max-w-[390px]">
        <div className="relative">
          <div className="h-[160px] w-full bg-abla-green" />

          <div className="absolute left-1/2 top-[160px] -translate-x-1/2 -translate-y-1/2">
            <div className="h-20 w-20 overflow-hidden rounded-full border-[4px] border-white bg-white shadow-md">
              <img src={user.avatar} alt="" className="h-full w-full object-cover" draggable="false" />
            </div>
          </div>
        </div>

        <div className="px-4">
          <div className="mt-12 text-center">
            <div className="text-[20px] font-bold text-abla-blue">{user.name}</div>
            <div className="mt-1 text-[13px] text-slate-500">Estudiante · 3ERA Entrega</div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <InfoCard
              icon={<Building2 className="h-6 w-6 text-abla-green" aria-hidden="true" />}
              title="Mi Instituto"
              lines={["Colegio San Marcos"]}
              actionLabel="Ver valoraciones →"
              actionColorClass="text-abla-green"
              onAction={() => {}}
            />

            <InfoCard
              icon={<User className="h-6 w-6 text-abla-blue" aria-hidden="true" />}
              title="Datos de usuario"
              lines={["matias@abla.app"]}
              actionLabel="Editar perfil →"
              actionColorClass="text-abla-green"
              onAction={() => {}}
            />
          </div>

          <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-[14px] font-bold text-abla-blue">Mis Reportes</div>
              <div className="text-[13px] font-semibold text-slate-600">{reportesEnviados.length} reportes enviados</div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {reportesEnviados.length === 0 ? (
                <div className="text-[13px] text-slate-500">No has enviado reportes aún</div>
              ) : (
                reportesEnviados.map((reporte, index) => (
                  <ReportItem key={index} title={reporte.titulo || reporte.tipo || 'Reporte'} statusLabel={reporte.estado || 'En revisión'} />
                ))
              )}
            </div>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.localStorage.clear()
              navigate('/login')
            }}
            className="mt-8 h-12 w-full rounded-xl border border-[#EF4444] bg-white font-bold text-[#EF4444]"
            aria-label="Cerrar sesión"
          >
            Cerrar Sesión
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
    </PageTransition>
  )
}
