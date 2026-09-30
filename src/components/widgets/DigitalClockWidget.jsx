import { useState, useEffect } from 'react'

function getTimeInZone(tz) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(new Date())
    const h = parts.find(p => p.type === 'hour')?.value || '00'
    const m = parts.find(p => p.type === 'minute')?.value || '00'
    const s = parts.find(p => p.type === 'second')?.value || '00'
    return { h, m, s }
  } catch { const n = new Date(); return { h: String(n.getHours()).padStart(2,'0'), m: String(n.getMinutes()).padStart(2,'0'), s: String(n.getSeconds()).padStart(2,'0') } }
}

export default function DigitalClockWidget({ accent = '#3b82f6', theme = 'dark', tz = Intl.DateTimeFormat().resolvedOptions().timeZone, city = 'Your City', format = '24h', showSeconds = true, showDate = true }) {
  const [, setTick] = useState(0)
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(id) }, [])

  let { h, m, s } = getTimeInZone(tz)
  let ampm = ''
  if (format === '12h') {
    const hh = parseInt(h)
    ampm = hh >= 12 ? 'PM' : 'AM'
    h = String(hh % 12 || 12).padStart(2, '0')
  }

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#ffffff' : '#1e293b'

  // Date in target timezone
  let dateStr = ''
  try {
    dateStr = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())
  } catch {
    dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  return (
    <div style={{ background: bg, padding: '20px 28px', borderRadius: 12, display: 'inline-block', minWidth: 240, textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {city && <div style={{ color: accent, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{city}</div>}
      <div style={{ color: fg, fontSize: 42, fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {h}:{m}{showSeconds && <span style={{ fontSize: 24, opacity: 0.6 }}>:{s}</span>}
        {ampm && <span style={{ fontSize: 16, marginLeft: 6, fontWeight: 600 }}>{ampm}</span>}
      </div>
      {showDate && <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 12, marginTop: 8 }}>{dateStr}</div>}
    </div>
  )
}