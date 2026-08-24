import { ArrowRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getMoodEntriesBetween, getWeekBounds } from '../../data/moodHistory.js'
import MoodWeekStrip from './MoodWeekStrip.jsx'

const moodCopy = {
  bien: 'Hoy registraste que te sientes bien.',
  mas_o_menos: 'Hoy registraste que te sientes más o menos.',
  mal: 'Hoy registraste un día difícil. Estamos contigo.',
}

export default function MoodTrackerCard({ entries, referenceDate = new Date() }) {
  const { start, end } = getWeekBounds(referenceDate)
  const weekEntries = getMoodEntriesBetween(entries, start, end)
  const latestEntry = weekEntries.at(-1)
  const message = latestEntry
    ? moodCopy[latestEntry.mood]
    : 'Haz tu check-in para comenzar a ver tu semana.'

  return <section className="overflow-hidden rounded-abla-panel bg-abla-blue-soft shadow-abla-card" aria-labelledby="home-mood-title">
    <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,.72fr)_minmax(380px,1.28fr)] md:items-center md:p-7 lg:p-8">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-abla-green shadow-sm" aria-hidden="true"><CalendarDays className="h-5 w-5" /></div>
        <p className="mt-4 text-xs font-black uppercase tracking-[.15em] text-abla-green">Tu semana emocional</p>
        <h2 id="home-mood-title" className="mt-1 text-2xl font-black tracking-tight text-abla-blue md:text-3xl">Cada día cuenta algo</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{message}</p>
        <Link to="/mood-tracker" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-abla-blue px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-blue/25">
          Ver detalle <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="rounded-abla-card bg-white/70 p-3 ring-1 ring-white md:p-4">
        <MoodWeekStrip entries={weekEntries} referenceDate={referenceDate} compact />
        <p className="mt-3 text-center text-xs font-semibold text-slate-500">{weekEntries.length ? `${weekEntries.length} ${weekEntries.length === 1 ? 'día registrado' : 'días registrados'} esta semana` : 'Aún no hay registros esta semana'}</p>
      </div>
    </div>
  </section>
}
