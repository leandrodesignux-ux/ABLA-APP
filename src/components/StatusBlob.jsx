const styles = {
  urgente: 'bg-red-100 text-red-700 border-red-200',
  nuevo: 'bg-abla-blue-soft text-abla-blue border-blue-100',
  derivado: 'bg-abla-green-soft text-abla-green border-green-100',
  seguimiento: 'bg-amber-50 text-amber-700 border-amber-200',
  cerrado: 'bg-slate-100 text-slate-600 border-slate-200',
}

export default function StatusBlob({ status = 'nuevo', label, className = '' }) {
  return <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${styles[status] || styles.nuevo} ${className}`}><span className="relative h-3 w-3 rounded-abla-blob bg-current opacity-70"><span className="absolute left-[3px] top-[3px] h-1 w-1 rounded-full bg-white" /></span>{label || status}</span>
}
