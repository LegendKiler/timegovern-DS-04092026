import { useState, useEffect } from 'react'

// Simple moon phase calc (approximation)
function getMoonPhase(date) {
  let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate()
  let c, e, jd, b
  if (month < 3) { year--; month += 12 }
  month++
  c = 365.25 * year
  e = 30.6 * month
  jd = c + e + day - 694039.09
  jd /= 29.5305882
  b = Math.floor(jd)
  jd -= b
  b = Math.round(jd * 8)
  if (b >= 8) b = 0
  return b
}

const PHASES = [
  ['New Moon', '🌑'], ['Waxing Crescent', '🌒'], ['First Quarter', '🌓'], ['Waxing Gibbous', '🌔'],
  ['Full Moon', '🌕'], ['Waning Gibbous', '🌖'], ['Last Quarter', '🌗'], ['Waning Crescent', '🌘']
]

export default function MoonPhaseWidget({ accent = '#a78bfa', theme = 'dark' }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const update = () => setPhase(getMoonPhase(new Date()))
    update()
    const id = setInterval(update, 3600000)
    return () => clearInterval(id)
  }, [])

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#ffffff' : '#1e293b'
  const [label, icon] = PHASES[phase]

  return (
    <div style={{ background: bg, padding: '24px 28px', borderRadius: 12, display: 'inline-block', minWidth: 180, textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ fontSize: 56, marginBottom: 8 }}>{icon}</div>
      <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Moon Phase</div>
      <div style={{ color: fg, fontSize: 18, fontWeight: 800 }}>{label}</div>
      <div style={{ color: accent, fontSize: 11, marginTop: 6 }}>
        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </div>
  )
}