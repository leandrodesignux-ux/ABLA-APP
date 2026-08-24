import MoodShape from './MoodShape.jsx'
import { getMonthBounds, toLocalDateKey } from '../../data/moodHistory.js'
import { moodVisuals } from './moodVisuals.js'

const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export default function MoodMonthGrid({ entries, referenceDate = new Date() }) {
  const { start, end } = getMonthBounds(referenceDate)
  const entriesByDate = new Map(entries.map((entry) => [entry.date, entry]))
  const leading = (start.getDay() || 7) - 1
  const cells = Array.from({ length: leading }, () => null)
  for (let day = 1; day <= end.getDate(); day += 1) cells.push(new Date(start.getFullYear(), start.getMonth(), day, 12))

  return <div aria-label="Calendario emocional mensual">
    <div className="grid grid-cols-7 gap-1">{weekdays.map((day, index) => <div key={`${day}-${index}`} className="py-1 text-center text-[10px] font-black text-slate-400">{day}</div>)}</div>
    <div className="mt-1 grid grid-cols-7 gap-1.5">{cells.map((date, index) => {
      if (!date) return <span key={`empty-${index}`} />
      const dateKey = toLocalDateKey(date)
      const entry = entriesByDate.get(dateKey)
      return <div key={dateKey} className="grid min-h-14 place-items-center rounded-xl bg-white px-1 py-1.5 shadow-sm"><span className="text-[9px] font-bold text-slate-400">{date.getDate()}</span>{entry ? <MoodShape mood={entry.mood} size="xs" animate={false} label={`${date.getDate()}: ${moodVisuals[entry.mood].label}`} /> : <span className="h-[30px]" aria-label={`${date.getDate()}: sin registro`} />}</div>
    })}</div>
  </div>
}
