import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import AblaCompanion from '../components/companion/AblaCompanion.jsx'
import MoodBadge from '../components/mood/MoodBadge.jsx'
import MoodMonthGrid from '../components/mood/MoodMonthGrid.jsx'
import MoodSummary from '../components/mood/MoodSummary.jsx'
import MoodWeekStrip from '../components/mood/MoodWeekStrip.jsx'
import { getMonthBounds, getMoodEntriesBetween, getWeekBounds } from '../data/moodHistory.js'
import { useAppContext } from '../context/AppContext.jsx'

const monthFormatter = new Intl.DateTimeFormat('es-CL', { month: 'long', year: 'numeric' })

function getDominantMood(entries) {
  if (!entries.length) return null
  const counts = entries.reduce((result, entry) => ({ ...result, [entry.mood]: (result[entry.mood] || 0) + 1 }), {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

function MoodInsight({ entries, period }) {
  const dominant = getDominantMood(entries)
  const copy = !entries.length
    ? 'Aún no hay registros en este período. Tu próximo check-in aparecerá aquí.'
    : dominant === 'bien'
      ? `En ${period} registraste más días en que te sentiste bien.`
      : dominant === 'mal'
        ? `En ${period} hubo varios días difíciles registrados. Puedes buscar apoyo cuando lo necesites.`
        : `En ${period} tu estado más registrado fue “Más o menos”. Cada día puede sentirse distinto.`
  return <aside className="rounded-abla-card bg-abla-green-soft p-5"><p className="text-xs font-black uppercase tracking-[.14em] text-abla-green">Una mirada suave</p><p className="mt-2 text-sm font-semibold leading-6 text-abla-blue">{copy}</p><p className="mt-2 text-xs leading-5 text-slate-500">Esto refleja solo tus check-ins; no es una evaluación de salud.</p></aside>
}

export default function MoodTracker() {
  const { moodEntries } = useAppContext()
  const reducedMotion = useReducedMotion()
  const [view, setView] = useState('week')
  const now = useMemo(() => new Date(), [])
  const weekBounds = useMemo(() => getWeekBounds(now), [now])
  const monthBounds = useMemo(() => getMonthBounds(now), [now])
  const weekEntries = useMemo(() => getMoodEntriesBetween(moodEntries, weekBounds.start, weekBounds.end), [moodEntries, weekBounds])
  const monthEntries = useMemo(() => getMoodEntriesBetween(moodEntries, monthBounds.start, monthBounds.end), [moodEntries, monthBounds])
  const latestEntry = moodEntries.at(-1)
  const activeEntries = view === 'week' ? weekEntries : monthEntries

  return <PageTransition><div className="min-h-dvh bg-abla-bg pb-24 md:pb-12"><Header title="Mood Tracker" showBack /><main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
    <section className="grid items-center gap-5 overflow-hidden rounded-abla-panel bg-abla-blue-soft p-5 md:grid-cols-[1fr_190px] md:p-8"><div><p className="text-xs font-black uppercase tracking-[.16em] text-abla-green">Tu registro emocional</p><h1 className="abla-page-title mt-2">Así se han sentido tus días</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Mira tus check-ins con calma. No hay estados buenos o malos: todos cuentan algo de tu experiencia.</p>{latestEntry && <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500"><span>Último registro</span><MoodBadge mood={latestEntry.mood} size="xs" /></div>}</div><motion.div animate={reducedMotion ? undefined : { y: [2, -2, 2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="hidden md:grid md:place-items-center"><AblaCompanion personality="empathetic" pose="supporting" size="lg" label="ABLA acompaña tu registro emocional" /></motion.div></section>

    <div className="mt-6 inline-flex rounded-full bg-white p-1.5 shadow-abla-card" role="group" aria-label="Período del Mood Tracker">{[['week', 'Semana'], ['month', 'Mes']].map(([value, label]) => <button key={value} type="button" onClick={() => setView(value)} aria-pressed={view === value} className={`rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${view === value ? 'bg-abla-blue text-white' : 'text-slate-500'}`}>{label}</button>)}</div>

    <div className="mt-5 grid gap-5 lg:grid-cols-[1.45fr_.75fr]">
      <motion.section key={view} initial={reducedMotion ? undefined : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-abla-panel bg-white p-4 shadow-abla-card md:p-6"><div className="mb-5"><p className="text-xs font-black uppercase tracking-[.14em] text-abla-green">{view === 'week' ? 'Esta semana' : monthFormatter.format(now)}</p><h2 className="mt-1 text-xl font-black text-abla-blue">{view === 'week' ? 'Tu semana de un vistazo' : 'Tu calendario emocional'}</h2></div>{view === 'week' ? <MoodWeekStrip entries={weekEntries} referenceDate={now} /> : <MoodMonthGrid entries={monthEntries} referenceDate={now} />}</motion.section>
      <div className="space-y-5"><MoodSummary entries={activeEntries} title={view === 'week' ? 'Distribución semanal' : 'Distribución mensual'} /><MoodInsight entries={activeEntries} period={view === 'week' ? 'esta semana' : 'este mes'} /></div>
    </div>
  </main><BottomNav /></div></PageTransition>
}
