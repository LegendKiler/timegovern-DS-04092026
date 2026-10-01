import { useEffect, useState, useCallback, useRef } from 'react'
import { getHolidays } from '../lib/holidaysApi'

// Session-scoped cache for holiday payloads.
// Key format: tg:holidays:v1:{CC}:{YYYY}
// sessionStorage (not localStorage) -- a fresh tab re-fetches, same tab reuses.
// Matches the naming convention of useGeo.js (`tg:geo:v1`).
const CACHE_PREFIX = 'tg:holidays:v1:'

function cacheKey(countryCode, year) {
  return `${CACHE_PREFIX}${String(countryCode).toUpperCase()}:${year}`
}

function readCache(countryCode, year) {
  try {
    const raw = sessionStorage.getItem(cacheKey(countryCode, year))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && Array.isArray(parsed.holidays)) return parsed.holidays
  } catch { /* private mode / disabled storage -- ignore */ }
  return null
}

function writeCache(countryCode, year, holidays) {
  try {
    sessionStorage.setItem(
      cacheKey(countryCode, year),
      JSON.stringify({ holidays, cachedAt: Date.now() })
    )
  } catch { /* noop */ }
}

/**
 * useHolidays -- fetch public holidays for a country + year, cached in
 * sessionStorage for the lifetime of the tab.
 *
 * Returns:
 *   { holidays, loading, error, fromCache, refresh }
 */
export function useHolidays(countryCode, year) {
  const cc = countryCode ? String(countryCode).toUpperCase() : null
  const y  = Number(year) || new Date().getFullYear()

  const [holidays, setHolidays] = useState(() => readCache(cc, y) || [])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [fromCache, setFromCache] = useState(() => readCache(cc, y) !== null)

  const mounted = useRef(true)

  const load = useCallback(async (force = false) => {
    if (!cc) return
    if (!force) {
      const cached = readCache(cc, y)
      if (cached) {
        setHolidays(cached)
        setFromCache(true)
        setError(null)
        return
      }
    }
    setLoading(true)
    setError(null)
    try {
      const data = await getHolidays(cc, y)
      if (!mounted.current) return
      setHolidays(data)
      writeCache(cc, y, data)
      setFromCache(false)
    } catch (e) {
      if (!mounted.current) return
      setError(e.message || 'Failed to load holidays')
      setHolidays([])
    } finally {
      if (mounted.current) setLoading(false)
    }
  }, [cc, y])

  useEffect(() => {
    mounted.current = true
    load(false)
    return () => { mounted.current = false }
  }, [load])

  const refresh = useCallback(() => load(true), [load])

  return { holidays, loading, error, fromCache, refresh }
}