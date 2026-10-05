// Runtime data layer with localStorage cache + bundled fallback
// Strategy: on each call, check cache (24h TTL). If fresh, return cache.
//           Else fetch fresh; on success, cache + return. On failure, return null (caller falls back to bundled snapshot).

const CACHE_PREFIX = 'tg_wd_v1_'
const TTL_MS = 24 * 60 * 60 * 1000  // 24 hours
const FETCH_TIMEOUT_MS = 8000

function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.ts > TTL_MS) return null
    return parsed.data
  } catch { return null }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ts: Date.now(), data }))
  } catch { /* quota or privacy mode — silently ignore */ }
}

export function getCacheStatus(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const ageMs = Date.now() - parsed.ts
    return { ts: parsed.ts, ageMs, isFresh: ageMs < TTL_MS }
  } catch { return null }
}

export async function fetchCountryPopulation(code) {
  if (!code) return null
  const key = 'pop_' + String(code).toUpperCase()

  const cached = readCache(key)
  if (cached) return { ...cached, source: 'cache' }

  try {
    const url = 'https://api.worldbank.org/v2/country/' + code + '/indicator/SP.POP.TOTL?format=json&per_page=5&date=2022:2024'
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(url, { signal: ctrl.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const json = await res.json()
    const rows = (json[1] || []).filter(r => r.value != null).sort((a, b) => String(b.date).localeCompare(String(a.date)))
    if (rows.length === 0) throw new Error('no data')

    const population = Number(rows[0].value)
    const year = parseInt(rows[0].date, 10)
    let growthRate = 0
    if (rows.length >= 2) {
      const newer = Number(rows[0].value)
      const older = Number(rows[1].value)
      const years = Math.max(1, parseInt(rows[0].date, 10) - parseInt(rows[1].date, 10))
      if (older > 0) growthRate = Math.round(((newer - older) / older / years) * 100 * 1000) / 1000
    }

    const result = { population, year, growthRate }
    writeCache(key, result)
    return { ...result, source: 'live' }
  } catch {
    return null
  }
}

// World-rate refresh: currently a placeholder that returns the bundled rate unchanged.
// Wire to UN / IEA / Carbon Monitor endpoints when they expose stable public JSON.
export async function fetchWorldRate(key) {
  const cacheKey = 'rate_' + key
  const cached = readCache(cacheKey)
  if (cached) return { ...cached, source: 'cache' }
  return null
}

export async function fetchCountryPopulationHistory(code) {
  if (!code) return null
  const key = 'hist_' + String(code).toUpperCase()

  const cached = readCache(key)
  if (cached) return { ...cached, source: 'cache' }

  try {
    const url = 'https://api.worldbank.org/v2/country/' + code + '/indicator/SP.POP.TOTL?format=json&per_page=100&date=1960:2024'
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(url, { signal: ctrl.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const json = await res.json()
    const rows = (json[1] || [])
      .filter(r => r.value != null)
      .map(r => ({ year: parseInt(r.date, 10), value: Number(r.value) }))
      .sort((a, b) => a.year - b.year)
    if (rows.length === 0) throw new Error('no history')

    const result = { points: rows, count: rows.length }
    writeCache(key, result)
    return { ...result, source: 'live' }
  } catch {
    return null
  }
}
export function clearWorldDataCache() {
  try {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(CACHE_PREFIX)) keys.push(k)
    }
    keys.forEach(k => localStorage.removeItem(k))
  } catch { /* ignore */ }
}