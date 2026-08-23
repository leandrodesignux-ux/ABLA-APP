import { motion } from 'framer-motion'
import { Building2, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import AblaCharacter from '../components/AblaCharacter.jsx'
import AblaEmptyState from '../components/AblaEmptyState.jsx'
import { useAppContext } from '../context/AppContext.jsx'

function InfoCard({ icon, title, lines, actionLabel, actionColorClass, onAction }) {
  return (
    <div className="abla-surface p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-abla-card bg-abla-blue-soft">{icon}</div>
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
    <div className="flex items-center justify-between rounded-abla-card border border-slate-100 bg-white px-4 py-3">
      <div className="text-[13px] font-semibold text-slate-700">{title}</div>
      <div className="rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold text-[#B45309]">{statusLabel}</div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="abla-surface p-5 text-center">
      <div className="text-[22px] font-bold text-abla-blue">{value}</div>
      <div className="mt-1 text-[12px] font-semibold text-slate-500">{label}</div>
    </div>
  )
}

export default function Perfil() {
  const navigate = useNavigate()
  const { user, perfil, setPerfil, clearSession, reportesEnviados, citasAgendadas, certificadosNEE } = useAppContext()

  const perfilLabel = perfil === 'estudiante'
    ? '🎒 Estudiante'
    : perfil === 'apoderado'
      ? '👨‍👩‍👧 Apoderado'
      : perfil === 'profesional'
        ? '🏫 Profesional'
        : '—'

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24">
      <Header title="Perfil" showBack={false} showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] md:max-w-3xl lg:max-w-6xl">
        <div className="relative md:mx-4 md:mt-5">
          <div className="h-[160px] w-full bg-abla-green md:h-[190px] md:rounded-abla-panel" />
          <div className="absolute right-8 top-5 hidden opacity-25 md:block"><AblaCharacter emotion="calm" shape="pebble" pose="rest" interaction="calm" size="xl" animate="breathe" decoration /></div>

          <div className="absolute left-1/2 top-[160px] -translate-x-1/2 -translate-y-1/2">
            <div className="h-20 w-20 overflow-hidden rounded-full border-[4px] border-white bg-white shadow-md">
              <img src={user.avatar} alt="" className="h-full w-full object-cover" draggable="false" />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 lg:px-8">
          <div className="mt-12 text-center">
            <div className="text-[20px] font-bold text-abla-blue">{user.name}</div>
            <div className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[12px] font-bold text-abla-blue shadow-sm">
              {perfilLabel}
            </div>
          </div>

          {perfil === 'estudiante' && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <StatCard label="Reportes enviados" value={reportesEnviados.length} />
              <StatCard label="Citas agendadas" value={citasAgendadas.length} />
            </div>
          )}

          {perfil === 'apoderado' && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <StatCard label="Citas agendadas" value={citasAgendadas.length} />
              <StatCard label="Certificados NEE" value={certificadosNEE.length} />
            </div>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-2">
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

          <div className="abla-surface mt-6 p-5">
            <div className="flex items-center justify-between">
              <div className="text-[14px] font-bold text-abla-blue">Mis Reportes</div>
              <div className="text-[13px] font-semibold text-slate-600">{reportesEnviados.length} reportes enviados</div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {reportesEnviados.length === 0 ? (
                <AblaEmptyState
                  kind="cases"
                  title="Tu espacio está tranquilo"
                  description="Cuando envíes un reporte podrás revisar aquí su avance y estado."
                />
              ) : (
                reportesEnviados.map((reporte, index) => (
                  <ReportItem key={index} title={reporte.titulo || reporte.tipo || 'Reporte'} statusLabel={reporte.estado || 'En revisión'} />
                ))
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPerfil(null)
              sessionStorage.removeItem('abla_perfil')
              navigate('/sobreti')
            }}
            className="h-12 w-full rounded-full border border-abla-blue text-[13px] font-semibold text-abla-blue"
            aria-label="Cambiar perfil"
          >
            Cambiar perfil
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              clearSession()
              navigate('/login')
            }}
            className="h-12 w-full rounded-full border border-[#EF4444] bg-white font-bold text-[#EF4444]"
            aria-label="Cerrar sesión"
          >
            Cerrar Sesión
          </motion.button>
          </div>

          {/* Acerca de */}
          <div className="abla-surface mt-6 p-5 text-center">
            <div className="text-[18px] font-bold text-abla-blue">ABLA</div>
            <div className="mt-1 text-[13px] text-slate-500">App anti-bullying escolar</div>

            <div className="mt-4 rounded-xl bg-abla-bg p-3">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Diseñado y creado por
              </div>
              <div className="mt-1 text-[14px] font-bold text-abla-blue">Leandro Balbian</div>
              <div className="text-[12px] font-medium text-slate-500">Product Designer</div>
            </div>

            <div className="mt-3 text-[11px] font-medium text-slate-400">v2.0 · Mayo 2026</div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
    </PageTransition>
  )
}
