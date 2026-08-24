import MoodBadge from './MoodBadge.jsx'
import { moodKeys, moodVisuals } from './moodVisuals.js'

export default function MoodSummary({ entries, title = 'Resumen' }) {
  const counts = moodKeys.reduce((result, mood) => ({ ...result, [mood]: entries.filter((entry) => entry.mood === mood).length }), {})
  const total = entries.length || 1
  return <section className="rounded-abla-card bg-white p-5 shadow-abla-card" aria-labelledby="mood-summary-title"><h2 id="mood-summary-title" className="text-lg font-black text-abla-blue">{title}</h2><div className="mt-4 space-y-4">{moodKeys.map((mood) => <div key={mood}><div className="flex items-center justify-between gap-3"><MoodBadge mood={mood} size="xs" /><span className="text-sm font-black text-abla-blue">{counts[mood]} días</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full transition-[width]" style={{ width: `${(counts[mood] / total) * 100}%`, backgroundColor: moodVisuals[mood].color }} /></div></div>)}</div></section>
}
