import { useState, useEffect } from 'react'

function getTimeInZone(tz) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(new Date())
    return {
      h: parseInt(parts.find(p => p.type === 'hour')?.value || 0),
      m: parseInt(parts.find(p => p.type === 'minute')?.value || 0),
      s: parseInt(parts.find(p => p.type === 'second')?.value || 0),
    }
  } catch { const n = new Date(); return { h: n.getHours(), m: n.getMinutes(), s: n.getSeconds() } }
}

export default function AnalogClockWidget({ accent = '#3b82f6', size = 200, theme = 'light', tz = Intl.DateTimeFormat().resolvedOptions().timeZone, city = '' }) {
  const [tick, setTick] = useState(0)
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(id) }, [])

  const { h, m, s } = getTimeInZone(tz)
  const secDeg = (s / 60) * 360
  const minDeg = ((m + s / 60) / 60) * 360
  const hourDeg = (((h % 12) + m / 60 + s / 3600) / 12) * 360

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#e2e8f0' : '#1e293b'
  const muted = isDark ? '#475569' : '#cbd5e1'

  return (
    <div style={{ background: bg, padding: 16, borderRadius: 12, display: 'inline-block', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="47" fill={bg} stroke={accent} strokeWidth="3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30) * Math.PI / 180
          const x1 = 50 + Math.sin(a) * 40, y1 = 50 - Math.cos(a) * 40
          const x2 = 50 + Math.sin(a) * 44, y2 = 50 - Math.cos(a) * 44
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={muted} strokeWidth={i % 3 === 0 ? 2 : 1} strokeLinecap="round" />
        })}
        <line x1="50" y1="50" x2="50" y2="30" stroke={fg} strokeWidth="4" strokeLinecap="round" transform={'rotate(' + hourDeg + ' 50 50)'} />
        <line x1="50" y1="50" x2="50" y2="22" stroke={fg} strokeWidth="2.5" strokeLinecap="round" transform={'rotate(' + minDeg + ' 50 50)'} />
        <line x1="50" y1="55" x2="50" y2="16" stroke={accent} strokeWidth="1.5" strokeLinecap="round" transform={'rotate(' + secDeg + ' 50 50)'} />
        <circle cx="50" cy="50" r="3" fill={accent} />
      </svg>
      {city && <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: muted, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{city}</div>}
    </div>
  )
}