// Meeting-hour classification, scoring, and best-overlap utilities.
// All logic in this file is timezone-agnostic and works for any number of cities.

import { CITIES } from '../data/cities'

// Classify an hour (0-23, in the city's local time) into a category.
// Returns one of: 'work' | 'shoulder' | 'sleep'
export function classifyHour(hour) {
  if (hour >= 9 && hour < 18) return 'work'
  if ((hour >= 7 && hour < 9) || (hour >= 18 && hour < 21)) return 'shoulder'
  return 'sleep'
}

// Get a city's local hour at a given UTC instant
export function getLocalHour(tz, date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    hour12: false
  }).formatToParts(date)
  const h = parts.find(p => p.type === 'hour')
  return h ? parseInt(h.value, 10) % 24 : 0
}

// Get a city's local date+hour at a given UTC instant
export function getLocalDateTime(tz, date) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  return fmt.format(date)
}

// Score a UTC hour for a set of cities.
// Scoring: +100 per city in 'work', +40 per city in 'shoulder', -80 per city in 'sleep'
// Result is normalized to 0-100 (relative to a perfect all-work hour).
export function scoreOverlapHour(citySlugs, utcHour, baseDate = new Date()) {
  const d = new Date(Date.UTC(
    baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate(), utcHour, 0, 0
  ))
  let score = 0
  const breakdown = []
  for (const slug of citySlugs) {
    const city = CITIES[slug]
    if (!city) continue
    const h = getLocalHour(city.tz, d)
    const cat = classifyHour(h)
    if (cat === 'work') score += 100
    else if (cat === 'shoulder') score += 40
    else score -= 80
    breakdown.push({ slug, city: city.name, localHour: h, category: cat })
  }
  const maxScore = citySlugs.length * 100
  const normalized = maxScore > 0 ? Math.max(0, score) / maxScore * 100 : 0
  return {
    utcHour,
    rawScore: score,
    score: Math.round(normalized),
    breakdown
  }
}

// Find the best UTC hour for a set of cities (across all 24 hours).
export function bestOverlapHour(citySlugs, baseDate = new Date()) {
  const results = []
  for (let h = 0; h < 24; h++) {
    results.push(scoreOverlapHour(citySlugs, h, baseDate))
  }
  results.sort((a, b) => b.rawScore - a.rawScore)
  return results[0]
}

// Return all 24 hours, scored.
export function fullDayHeatmap(citySlugs, baseDate = new Date()) {
  return Array.from({ length: 24 }, (_, h) => scoreOverlapHour(citySlugs, h, baseDate))
}

// Return per-city per-hour classification matrix (for the hour strip).
export function buildHourStrip(citySlugs, baseDate = new Date()) {
  const rows = []
  for (const slug of citySlugs) {
    const city = CITIES[slug]
    if (!city) continue
    const cells = []
    for (let utcH = 0; utcH < 24; utcH++) {
      const d = new Date(Date.UTC(
        baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate(), utcH, 0, 0
      ))
      const localH = getLocalHour(city.tz, d)
      const cat = classifyHour(localH)
      cells.push({ utcHour: utcH, localHour: localH, category: cat })
    }
    rows.push({ slug, city: city.name, tz: city.tz, cells })
  }
  return rows
}

// Return human-friendly descriptor for a category
export function categoryLabel(cat) {
  if (cat === 'work') return 'Working hours'
  if (cat === 'shoulder') return 'Shoulder hours'
  return 'Sleeping hours'
}

export function categoryColor(cat) {
  if (cat === 'work') return 'emerald'
  if (cat === 'shoulder') return 'amber'
  return 'rose'
}