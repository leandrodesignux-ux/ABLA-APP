import MoodShape from './MoodShape.jsx'
import { moodVisuals, normalizeMood } from './moodVisuals.js'

export default function MoodBadge({ mood, size = 'sm', showLabel = true, className = '' }) {
  const key = normalizeMood(mood)
  const visual = moodVisuals[key]
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-abla-blue ${className}`} style={{ backgroundColor: visual.softColor }}><MoodShape mood={key} size={size} animate={false} />{showLabel && visual.label}</span>
}
