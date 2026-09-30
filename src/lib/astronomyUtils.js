// NOAA solar position algorithm (SunCalc-style, compact) + simple moon phase.
// All angles in radians internally. All lat/lng inputs in degrees.
const rad = Math.PI / 180
const dayMs = 86400000
const J1970 = 2440588
const J2000 = 2451545
const e = rad * 23.4397
const J0 = 0.0009

const toJulian = (date) => date.valueOf() / dayMs - 0.5 + J1970
const fromJulian = (j) => new Date((j + 0.5 - J1970) * dayMs)
const toDays = (date) => toJulian(date) - J2000

const rightAscension = (l, b) => Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l))
const declination = (l, b) => Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l))
const azimuth = (H, phi, dec) => Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi))
const altitude = (H, phi, dec) => Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H))
const siderealTime = (d, lw) => rad * (280.16 + 360.9856235 * d) - lw

const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d)
const eclipticLongitude = (M) => {
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M))
  const P = rad * 102.9372
  return M + C + P + Math.PI
}
const julianCycle = (d, lw) => Math.round(d - J0 - lw / (2 * Math.PI))
const approxTransit = (Ht, lw, n) => J0 + (Ht + lw) / (2 * Math.PI) + n
const solarTransitJ = (ds, M, L) => J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L)
const hourAngle = (h, phi, d) => Math.acos((Math.sin(h) - Math.sin(phi) * Math.sin(d)) / (Math.cos(phi) * Math.cos(d)))

const getSetJ = (h, lw, phi, dec, n, M, L) => {
  const w = hourAngle(h, phi, dec)
  const a = approxTransit(w, lw, n)
  return solarTransitJ(a, M, L)
}

export function getSunTimes(date, lat, lng) {
  const lw = rad * -lng
  const phi = rad * lat
  const d = toDays(date)
  const n = julianCycle(d, lw)
  const ds = approxTransit(0, lw, n)
  const M = solarMeanAnomaly(ds)
  const L = eclipticLongitude(M)
  const dec = declination(L, 0)
  const Jnoon = solarTransitJ(ds, M, L)
  function forAngle(angle) {
    const Jset = getSetJ(rad * angle, lw, phi, dec, n, M, L)
    const Jrise = Jnoon - (Jset - Jnoon)
    return { rise: fromJulian(Jrise), set: fromJulian(Jset) }
  }
  const sun = forAngle(-0.833)
  const civil = forAngle(-6)
  const nautical = forAngle(-12)
  const astro = forAngle(-18)
  const dayLengthMs = sun.set - sun.rise
  return {
    solarNoon: fromJulian(Jnoon),
    sunrise: sun.rise,
    sunset: sun.set,
    dayLengthMinutes: Math.round(dayLengthMs / 60000),
    civilDawn: civil.rise,
    civilDusk: civil.set,
    nauticalDawn: nautical.rise,
    nauticalDusk: nautical.set,
    astroDawn: astro.rise,
    astroDusk: astro.set,
  }
}

export function getSunPosition(date, lat, lng) {
  const lw = rad * -lng
  const phi = rad * lat
  const d = toDays(date)
  const M = solarMeanAnomaly(d)
  const L = eclipticLongitude(M)
  const dec = declination(L, 0)
  const ra = rightAscension(L, 0)
  const H = siderealTime(d, lw) - ra
  const alt = altitude(H, phi, dec)
  const az = azimuth(H, phi, dec)
  return { altitude: alt / rad, azimuth: az / rad }
}

const KNOWN_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14)
const SYNODIC = 29.530588853

export function getMoonPhase(date) {
  const daysSince = (date.getTime() - KNOWN_NEW_MOON_MS) / dayMs
  const age = ((daysSince % SYNODIC) + SYNODIC) % SYNODIC
  const phase = age / SYNODIC
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2
  return { age: Math.round(age * 100) / 100, phase, illumination }
}

export function getMoonPhaseInfo(phase) {
  if (phase < 0.03 || phase >= 0.97) return { name: 'New Moon', emoji: '\u{1F311}' }
  if (phase < 0.22) return { name: 'Waxing Crescent', emoji: '\u{1F312}' }
  if (phase < 0.28) return { name: 'First Quarter', emoji: '\u{1F313}' }
  if (phase < 0.47) return { name: 'Waxing Gibbous', emoji: '\u{1F314}' }
  if (phase < 0.53) return { name: 'Full Moon', emoji: '\u{1F315}' }
  if (phase < 0.72) return { name: 'Waning Gibbous', emoji: '\u{1F316}' }
  if (phase < 0.78) return { name: 'Last Quarter', emoji: '\u{1F317}' }
  return { name: 'Waning Crescent', emoji: '\u{1F318}' }
}

export function getNextMoonPhases(date) {
  const { phase } = getMoonPhase(date)
  const now = date.getTime()
  const daysToNew = ((1 - phase) * SYNODIC)
  const daysToFull = ((phase < 0.5 ? 0.5 - phase : 1.5 - phase) * SYNODIC)
  return {
    nextNewMoon: new Date(now + daysToNew * dayMs),
    nextFullMoon: new Date(now + daysToFull * dayMs),
  }
}

export function formatTime(date, tz) {
  if (!date) return '--:--'
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
  } catch {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
  }
}

export function formatDuration(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h + 'h ' + String(m).padStart(2, '0') + 'm'
}