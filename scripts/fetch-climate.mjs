// Fetch climate normals from NASA POWER (no key, no rate limit, commercial-use allowed).
// Usage: node scripts/fetch-climate.mjs
// Safe to re-run. Skips cities already fetched.

import { ASTRO_CITIES } from '../src/data/astroCities.js'
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const outDir = resolve(root, 'public/api/climate')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const START = '19910101'
const END = '20201231'
const PERIOD = '1991-2020'
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchCity(city) {
  const params = new URLSearchParams({
    parameters: 'T2M_MAX,T2M_MIN,PRECTOTCORR,WS2M_MAX',
    community: 'RE',
    longitude: String(city.lng),
    latitude: String(city.lat),
    start: START,
    end: END,
    format: 'JSON',
  })
  const url = 'https://power.larc.nasa.gov/api/temporal/daily/point?' + params.toString()

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'TimeGovern/1.0 (https://timegovern.com)' },
      })
      if (res.status === 429) {
        const wait = 30000 * attempt
        console.log('  [429] waiting ' + (wait / 1000) + 's (attempt ' + attempt + '/5)')
        await sleep(wait)
        continue
      }
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return await res.json()
    } catch (err) {
      if (attempt === 5) throw err
      await sleep(5000 * attempt)
    }
  }
  throw new Error('Failed after 5 retries')
}

function aggregate(power, city) {
  const props = power.properties.parameter
  const tMax = props.T2M_MAX
  const tMin = props.T2M_MIN
  const precip = props.PRECTOTCORR
  const wind = props.WS2M_MAX

  const dates = Object.keys(tMax).sort()
  const monthly = {}
  for (let m = 1; m <= 12; m++) monthly[m] = { tMaxSum: 0, tMinSum: 0, precipSum: 0, windSum: 0, n: 0, precipDays: 0, years: {} }

  for (const date of dates) {
    const m = parseInt(date.slice(4, 6), 10)
    const yr = date.slice(0, 4)
    const b = monthly[m]
    const tm = tMax[date]
    const tn = tMin[date]
    const pr = precip[date]
    const wd = wind[date]

    if (tm != null && tm > -900) { b.tMaxSum += tm; b.n++ }
    if (tn != null && tn > -900) b.tMinSum += tn
    if (pr != null && pr > -900) { b.precipSum += pr; if (pr > 0.1) b.precipDays++ }
    if (wd != null && wd > -900) b.windSum += wd

    if (!b.years[yr]) b.years[yr] = { precipSum: 0 }
    if (pr != null && pr > -900) b.years[yr].precipSum += pr
  }

  const months = []
  for (let m = 1; m <= 12; m++) {
    const b = monthly[m]
    const n = b.n || 1
    const nYears = Object.keys(b.years).length || 1
    months.push({
      m,
      name: MONTH_NAMES[m - 1],
      avgHigh: Math.round((b.tMaxSum / n) * 10) / 10,
      avgLow: Math.round((b.tMinSum / n) * 10) / 10,
      precip: Math.round((b.precipSum / nYears) * 10) / 10,
      rainDays: Math.round((b.precipDays / nYears) * 10) / 10,
      wind: Math.round((b.windSum / n) * 10) / 10,
    })
  }
  const hottest = months.reduce((a, b) => a.avgHigh > b.avgHigh ? a : b)
  const coldest = months.reduce((a, b) => a.avgLow < b.avgLow ? a : b)
  const wettest = months.reduce((a, b) => a.precip > b.precip ? a : b)
  const windiest = months.reduce((a, b) => a.wind > b.wind ? a : b)
  const annualHigh = Math.round(months.reduce((s, m) => s + m.avgHigh, 0) / 12 * 10) / 10
  const annualLow = Math.round(months.reduce((s, m) => s + m.avgLow, 0) / 12 * 10) / 10
  const annualPrecip = Math.round(months.reduce((s, m) => s + m.precip, 0))
  return {
    slug: city.slug, name: city.name, country: city.c2,
    lat: city.lat, lng: city.lng,
    region: city.region, climate: city.climate, hemisphere: city.hemisphere,
    period: PERIOD,
    source: 'NASA POWER (MERRA-2)',
    annual: {
      avgHigh: annualHigh, avgLow: annualLow, precip: annualPrecip,
      hottestMonth: hottest.name, hottestTemp: hottest.avgHigh,
      coldestMonth: coldest.name, coldestTemp: coldest.avgLow,
      wettestMonth: wettest.name, wettestPrecip: wettest.precip,
      windiestMonth: windiest.name, windiestSpeed: windiest.wind,
    },
    months,
  }
}

async function main() {
  const existing = readdirSync(outDir).filter((f) => f.endsWith('.json')).length
  const toFetch = ASTRO_CITIES.filter((c) => !existsSync(resolve(outDir, c.slug + '.json')))

  console.log('=== Climate fetch (NASA POWER) ===')
  console.log('Cities total:    ' + ASTRO_CITIES.length)
  console.log('Already fetched: ' + existing)
  console.log('To fetch:        ' + toFetch.length)
  console.log('Period:          ' + PERIOD)
  console.log('Est. runtime:    ~' + Math.ceil(toFetch.length * 2 / 60) + ' minutes (2s per city)')
  console.log('')

  if (toFetch.length === 0) {
    console.log('All cities already fetched.')
    return
  }

  let done = 0
  let failed = []

  for (const city of toFetch) {
    try {
      const raw = await fetchCity(city)
      const agg = aggregate(raw, city)
      writeFileSync(resolve(outDir, city.slug + '.json'), JSON.stringify(agg))
      done++
      if (done % 10 === 0 || done === toFetch.length) {
        console.log('  [' + done + '/' + toFetch.length + '] ' + city.slug + ' ok')
      }
    } catch (err) {
      failed.push(city.slug + ': ' + err.message)
      console.log('  [FAIL] ' + city.slug + ': ' + err.message)
    }
    await sleep(2000)
  }

  console.log('')
  console.log('=== Done ===')
  console.log('Fetched:  ' + done + '/' + toFetch.length)
  if (failed.length > 0) {
    console.log('Failed (' + failed.length + '):')
    failed.forEach((f) => console.log('  ' + f))
  }
  const total = readdirSync(outDir).filter((f) => f.endsWith('.json')).length
  console.log('Total now: ' + total + '/' + ASTRO_CITIES.length)
}

main().catch((err) => { console.error(err); process.exit(1) })