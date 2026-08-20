import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ChevronDown, Download, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import BottomNav from '../components/BottomNav.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'

const ESTADO_CONFIG = {
  'recibido': { label: 'Recibido', color: 'bg-slate-100 text-slate-500' },
  'en-investigacion': { label: 'En investigación', color: 'bg-yellow-100 text-yellow-700' },
  'entrevistas': { label: 'Entrevistas', color: 'bg-blue-100 text-blue-700' },
  'medidas-aplicadas': { label: 'Medidas aplicadas', color: 'bg-purple-100 text-purple-700' },
  'seguimiento': { label: 'Seguimiento', color: 'bg-orange-100 text-orange-700' },
  'cerrado': { label: 'Cerrado', color: 'bg-green-100 text-green-700' },
}

const SEVERIDAD_BORDER = {
  'leve': 'border-l-slate-300',
  'medio': 'border-l-yellow-400',
  'grave': 'border-l-orange-500',
  'urgente': 'border-l-red-500',
}

const TIPO_LABEL = {
  'abuso': '🛡️ Abuso',
  'cyberbullying': '📱 Ciberacoso',
  'violencia': '🩹 Violencia física',
  'fisico': '🩹 Físico',
  'verbal': '💬 Verbal',
  'cyber': '📱 Ciberacoso',
  'exclusion': '👤 Exclusión',
}

function exportarBitacora(reportes) {
  const lineas = []
  lineas.push('═══════════════════════════════════════════')
  lineas.push('       BITÁCORA DE INCIDENTES — ABLA-APP')
  lineas.push('═══════════════════════════════════════════')
  lineas.push(`Fecha de exportación: ${new Date().toLocaleString('es-CL')}`)
  lineas.push(`Total de registros: ${reportes.length}`)
  lineas.push('')
  lineas.push('NOTA LEGAL: Este documento puede ser')
  lineas.push('presentado como evidencia ante la dirección')
  lineas.push('del colegio, OPD o instancias judiciales.')
  lineas.push('═══════════════════════════════════════════')
  lineas.push('')

  reportes.forEach((r, i) => {
    lineas.push(`── REGISTRO ${i + 1} ─────────────────────────`)
    lineas.push(`ID: ${r.id || 'SIN-ID'}`)
    lineas.push(`Fecha del reporte: ${r.fecha ? new Date(r.fecha).toLocaleString('es-CL') : '—'}`)
    lineas.push(`Tipo: ${TIPO_LABEL[r.tipo] || r.tipo || '—'}`)
    lineas.push(`Gravedad: ${r.severidad || '—'}`)
    lineas.push(`Frecuencia: ${r.frecuencia || '—'}`)
    lineas.push(`Lugar: ${r.lugar || r.where || '—'}`)
    lineas.push(`Reportado por: ${r.anonimo ? 'Anónimo' : (r.quien || r.who || '—')}`)
    lineas.push(`Estado protocolo: ${ESTADO_CONFIG[r.estadoProtocolo]?.label || 'Recibido'}`)
    lineas.push(`Evidencia: ${r.tieneEvidencia ? (r.tiposEvidencia?.join(', ') || 'Sí') : 'No'}`)
    lineas.push('')
    lineas.push('Descripción:')
    lineas.push(r.descripcion || r.desc || '(sin descripción)')
    lineas.push('')
  })

  const blob = new Blob([lineas.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ABLA_Bitacora_${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function EntradaCard({ entrada }) {
  const [expanded, setExpanded] = useState(false)
  const border = SEVERIDAD_BORDER[entrada.severidad] || SEVERIDAD_BORDER['medio']
  const estadoConf = ESTADO_CONFIG[entrada.estadoProtocolo] || ESTADO_CONFIG['recibido']
  const fecha = entrada.fecha
    ? new Date(entrada.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—'

  return (
    <motion.div layout className={`rounded-2xl bg-white shadow-sm border-l-4 overflow-hidden ${border}`}>
      <button type="button" onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[13px] font-bold text-abla-blue">
                {TIPO_LABEL[entrada.tipo] || entrada.tipo || 'Reporte'}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${estadoConf.color}`}>
                {estadoConf.label}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-slate-400 font-mono">{fecha} · {entrada.id || '—'}</div>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
          </motion.div>
        </div>
        {!expanded && (
          <p className="mt-2 text-[12px] text-slate-500 line-clamp-2">
            {entrada.descripcion || entrada.desc || 'Sin descripción'}
          </p>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 space-y-3 border-t border-slate-50 pt-3">
              <p className="text-[13px] text-slate-700 leading-5">
                {entrada.descripcion || entrada.desc || '—'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Lugar', value: entrada.lugar || entrada.where || '—' },
                  { label: 'Frecuencia', value: entrada.frecuencia || '—' },
                  { label: 'Quién reporta', value: entrada.anonimo ? 'Anónimo' : (entrada.quien || entrada.who || '—') },
                  { label: 'Evidencia', value: entrada.tieneEvidencia ? (entrada.tiposEvidencia?.join(', ') || 'Sí') : 'No' },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl bg-abla-bg p-2.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{label}</div>
                    <div className="mt-0.5 text-[12px] font-medium text-slate-700">{value}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-slate-50 px-3 py-2">
                <span className="text-[10px] font-mono text-slate-400">{entrada.id || 'Sin ID'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Bitacora() {
  const navigate = useNavigate()
  const { reportesEnviados } = useAppContext()
  const [exportando, setExportando] = useState(false)

  const reportes = [...(reportesEnviados || [])].reverse()

  const handleExportar = () => {
    if (reportes.length === 0) return
    setExportando(true)
    setTimeout(() => { exportarBitacora(reportes); setExportando(false) }, 400)
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24">
      <Header title="Bitácora" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] md:max-w-3xl lg:max-w-6xl px-4">
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: 'Total', value: reportes.length, color: 'text-abla-blue' },
            { label: 'Activos', value: reportes.filter(r => r.estadoProtocolo !== 'cerrado').length, color: 'text-yellow-600' },
            { label: 'Graves', value: reportes.filter(r => r.severidad === 'grave' || r.severidad === 'urgente').length, color: 'text-red-500' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <div className={`text-[22px] font-bold ${color}`}>{value}</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={handleExportar}
          disabled={reportes.length === 0 || exportando}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-abla-green py-3 text-[13px] font-bold text-white disabled:opacity-40"
        >
          <Download className="h-4 w-4" />
          {exportando ? 'Exportando...' : 'Exportar Bitácora (.txt)'}
        </motion.button>

        <div className="mt-3 flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-100 px-3 py-2.5">
          <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-blue-700 leading-4">
            El archivo exportado incluye ID único por registro y es válido como evidencia ante la OPD, dirección del colegio o instancias judiciales.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {reportes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-12 shadow-sm">
              <FileText className="h-10 w-10 text-slate-200" />
              <div className="mt-3 text-[14px] font-semibold text-slate-400">Sin registros aún</div>
              <div className="mt-1 text-[12px] text-slate-400 text-center px-6">Los reportes que envíes aparecerán aquí como entradas de la bitácora</div>
              <button
                type="button"
                onClick={() => navigate('/reportar')}
                className="mt-4 rounded-full bg-abla-green px-5 py-2 text-[12px] font-bold text-white"
              >
                Crear primer registro
              </button>
            </div>
          ) : (
            reportes.map((entrada, i) => (
              <EntradaCard key={entrada.id || i} entrada={entrada} />
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
    </PageTransition>
  )
}
