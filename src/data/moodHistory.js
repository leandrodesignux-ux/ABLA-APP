export const MOOD_HISTORY_STORAGE_KEY = 'abla_mood_history_v1'
export const moodValues = ['bien', 'mas_o_menos', 'mal']

const legacyMoodMap = {
  BIEN: 'bien',
  'MAS O MENOS': 'mas_o_menos',
  MAL: 'mal',
}

export function normalizeMoodValue(value) {
  const normalized = legacyMoodMap[value] || value
  return moodValues.includes(normalized) ? normalized : null
}

export function toLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function createMoodEntry(mood, date = new Date(), note = '') {
  const normalizedMood = normalizeMoodValue(mood)
  if (!normalizedMood) return null
  const dateKey = typeof date === 'string' ? date.slice(0, 10) : toLocalDateKey(date)
  return { id: `mood-${dateKey}`, date: dateKey, mood: normalizedMood, ...(note.trim() ? { note: note.trim() } : {}) }
}

export function upsertMoodEntry(entries, mood, date = new Date(), note = '') {
  const entry = createMoodEntry(mood, date, note)
  if (!entry) return entries
  return [...entries.filter((item) => item.date !== entry.date), entry].sort((a, b) => a.date.localeCompare(b.date))
}

export function sanitizeMoodEntries(value) {
  if (!Array.isArray(value)) return []
  return value.reduce((entries, item) => {
    if (!item || typeof item.date !== 'string') return entries
    return upsertMoodEntry(entries, item.mood, item.date, typeof item.note === 'string' ? item.note : '')
  }, [])
}

export function createDemoMoodEntries(referenceDate = new Date()) {
  const pattern = ['bien', 'mas_o_menos', 'bien', 'mal', 'mas_o_menos', 'bien', 'bien']
  const entries = []
  for (let offset = 27; offset >= 0; offset -= 1) {
    if (offset !== 0 && offset % 6 === 0) continue
    const date = new Date(referenceDate)
    date.setHours(12, 0, 0, 0)
    date.setDate(date.getDate() - offset)
    entries.push(createMoodEntry(pattern[offset % pattern.length], date))
  }
  return entries
}

export function loadMoodEntries(storage = window.localStorage) {
  try {
    const raw = storage.getItem(MOOD_HISTORY_STORAGE_KEY)
    if (!raw) return createDemoMoodEntries()
    return sanitizeMoodEntries(JSON.parse(raw))
  } catch {
    return createDemoMoodEntries()
  }
}

export function persistMoodEntries(entries, storage = window.localStorage) {
  storage.setItem(MOOD_HISTORY_STORAGE_KEY, JSON.stringify(sanitizeMoodEntries(entries)))
}

export function getMoodEntriesBetween(entries, startDate, endDate) {
  const start = toLocalDateKey(startDate)
  const end = toLocalDateKey(endDate)
  return entries.filter((entry) => entry.date >= start && entry.date <= end)
}

export function getWeekBounds(referenceDate = new Date()) {
  const start = new Date(referenceDate)
  start.setHours(12, 0, 0, 0)
  const weekday = start.getDay() || 7
  start.setDate(start.getDate() - weekday + 1)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}

export function getMonthBounds(referenceDate = new Date()) {
  return {
    start: new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1, 12),
    end: new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0, 12),
  }
}
