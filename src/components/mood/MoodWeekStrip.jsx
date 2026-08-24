import MoodShape from './MoodShape.jsx'
import { moodVisuals } from './moodVisuals.js'
import { getWeekBounds, toLocalDateKey } from '../../data/moodHistory.js'

const dayFormatter = new Intl.DateTimeFormat('es-CL', { weekday: 'short' })

export default function MoodWeekStrip({ entries, referenceDate = new Date(), compact = false }) {
  const { start } = getWeekBounds(referenceDate)
  const todayKey = toLocalDateKey(referenceDate)
  const entriesByDate = new Map(entries.map((entry) => [entry.date, entry]))
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return { date, dateKey: toLocalDateKey(date), entry: entriesByDate.get(toLocalDateKey(date)) }
  })

  return <div className={`grid grid-cols-7 ${compact ? 'gap-1' : 'gap-2 md:gap-3'}`} aria-label="Registro emocional semanal">
    {days.map(({ date, dateKey, entry }) => <div key={dateKey} className={`flex min-w-0 flex-col items-center rounded-abla-control border text-center ${compact ? 'gap-1 px-1 py-2' : 'gap-2 px-1 py-3 md:px-2'} ${dateKey === todayKey ? 'border-abla-green bg-abla-green-soft' : 'border-white bg-white'}`}>
      <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">{dayFormatter.format(date).replace('.', '')}</span>
      {entry ? <MoodShape mood={entry.mood} size={compact ? 'xs' : 'sm'} animate={false} label={`${dayFormatter.format(date)}: ${moodVisuals[entry.mood].label}`} /> : <span className={`${compact ? 'h-[30px] w-[30px]' : 'h-12 w-12'} rounded-full border-2 border-dashed border-slate-200`} aria-label={`${dayFormatter.format(date)}: sin registro`} />}
      {!compact && <span className="hidden text-[10px] font-bold text-abla-blue sm:block">{entry ? moodVisuals[entry.mood].label : 'Sin registro'}</span>}
    </div>)}
  </div>
}
