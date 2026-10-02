// Nager.Date API client for public holidays.
// Docs: https://date.nager.at/swagger/index.html
// Free, no API key, CORS enabled.
//
// Endpoints used:
//   GET /api/v3/AvailableCountries          -> [{ countryCode, name }, ...]
//   GET /api/v4/Holidays/{CountryCode}/{Year} -> [{ date, name, ... }, ...]
//   (v3 is used as fallback if v4 returns 400/404)

import { SUPPLEMENTAL_HOLIDAYS } from '../data/holidaysSupplement'

const BASE_V4 = 'https://date.nager.at/api/v4'
const BASE_V3 = 'https://date.nager.at/api/v3'
const FETCH_TIMEOUT_MS = 15000
const DEFAULT_YEAR = new Date().getFullYear()

async function fetchJson(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      const err = new Error(`Nager.Date HTTP ${res.status} for ${url}`)
      err.status = res.status
      throw err
    }
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

/** GET /api/v3/AvailableCountries -> [{ countryCode, name }, ...] */
export async function getAvailableCountries() {
  const data = await fetchJson(`${BASE_V3}/AvailableCountries`)
  return Array.isArray(data) ? data : []
}

/**
 * GET /api/v4/Holidays/{countryCode}/{year}
 * Falls back to v3 if v4 returns 400/404.
 * Returns a normalized, date-sorted array.
 */
export async function getHolidays(countryCode, year) {
  if (!countryCode || !/^[A-Za-z]{2}$/.test(countryCode)) {
    throw new Error(`Invalid country code: ${countryCode}`)
  }
  const cc = countryCode.toUpperCase()
  const y = Number(year) || DEFAULT_YEAR

  const supp = SUPPLEMENTAL_HOLIDAYS[cc]
  if (supp) {
    const rows = (supp.years && supp.years[y]) || []
    return rows
      .map(h => ({
        date: h.date,
        name: h.name || '',
        localName: h.name || '',
        countryCode: cc,
        nationalHoliday: true,
        global: true,
        types: Array.isArray(h.types) ? h.types : ['Public'],
        supplemental: true,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }

  // Local static JSON first (fast, offline-capable, no rate limits)
  try {
    const localRes = await fetch(`/data/holidays/${cc}-${y}.json`, { cache: 'force-cache' })
    if (localRes.ok) {
      const localData = await localRes.json()
      const arr = Array.isArray(localData) ? localData : (localData.holidays || [])
      if (Array.isArray(arr)) {
        return arr
          .map(h => ({
            date: h.date,
            name: h.name || h.localName || '',
            localName: h.localName || h.name || '',
            countryCode: h.countryCode || cc,
            nationalHoliday: !!h.nationalHoliday,
            global: h.global !== undefined ? !!h.global : !!h.nationalHoliday,
            types: Array.isArray(h.types) ? h.types : Array.isArray(h.holidayTypes) ? h.holidayTypes : ['Public'],
          }))
          .sort((a, b) => a.date.localeCompare(b.date))
      }
    }
  } catch { /* fall through to live API */ }
  let raw
  try {
    raw = await fetchJson(`${BASE_V4}/Holidays/${cc}/${y}`)
  } catch (e) {
    if (e.status === 400 || e.status === 404) {
      raw = await fetchJson(`${BASE_V3}/Holidays/${cc}/${y}`)
    } else {
      throw e
    }
  }
  if (!Array.isArray(raw)) return []

  return raw
    .map(h => ({
      date: h.date,
      name: h.name || h.localName || '',
      localName: h.localName || h.name || '',
      countryCode: h.countryCode || cc,
      nationalHoliday: !!h.nationalHoliday,
      global:
        h.global !== undefined ? !!h.global : !!h.nationalHoliday,
      types: Array.isArray(h.types)
        ? h.types
        : Array.isArray(h.holidayTypes)
          ? h.holidayTypes
          : ['Public'],
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Group holidays by month (1..12). */
export function groupByMonth(holidays) {
  const out = {}
  for (const h of holidays || []) {
    const m = Number(h.date.slice(5, 7))
    if (!out[m]) out[m] = []
    out[m].push(h)
  }
  return out
}

/** Group holidays by holiday type (Public, Bank, ...). */
export function groupByType(holidays) {
  const out = {}
  for (const h of holidays || []) {
    for (const t of h.types || ['Public']) {
      if (!out[t]) out[t] = []
      out[t].push(h)
    }
  }
  return out
}

/** True if a YYYY-MM-DD string is in the holidays array. */
export function isHolidayDate(dateStr, holidays) {
  return (holidays || []).some(h => h.date === dateStr)
}