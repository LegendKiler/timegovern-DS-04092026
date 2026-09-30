import { useState, useEffect } from 'react'

function getCityTime(tz) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(new Date())
    const h = parts.find(p => p.type === 'hour')?.value || '00'
    const m = parts.find(p => p.type === 'minute')?.value || '00'
    const s = parts.find(p => p.type === 'second')?.value || '00'
    const dateParts = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' }).formatToParts(new Date())
    const weekday = dateParts.find(p => p.type === 'weekday')?.value || ''
    const month = dateParts.find(p => p.type === 'month')?.value || ''
    const day = dateParts.find(p => p.type === 'day')?.value || ''
    return { h, m, s, date: weekday + ', ' + month + ' ' + day }
  } catch {
    const n = new Date()
    return { h: String(n.getHours()).padStart(2,'0'), m: String(n.getMinutes()).padStart(2,'0'), s: String(n.getSeconds()).padStart(2,'0'), date: '' }
  }
}

export default function MultiCityWorldClockWidget({
  accent = '#3b82f6',
  theme = 'dark',
  cities = 'Sydney,London,New York,Tokyo,Dubai',
  format = '24h',
  showSeconds = true,
  showDate = true,
}) {
  const [tick, setTick] = useState(0)
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(id) }, [])

  const cityMap = {
    'Sydney': 'Australia/Sydney', 'Melbourne': 'Australia/Melbourne', 'Brisbane': 'Australia/Brisbane',
    'Perth': 'Australia/Perth', 'Auckland': 'Pacific/Auckland', 'London': 'Europe/London',
    'Paris': 'Europe/Paris', 'Berlin': 'Europe/Berlin', 'Rome': 'Europe/Rome', 'Madrid': 'Europe/Madrid',
    'Amsterdam': 'Europe/Amsterdam', 'Dubai': 'Asia/Dubai', 'Mumbai': 'Asia/Kolkata',
    'Delhi': 'Asia/Kolkata', 'Karachi': 'Asia/Karachi', 'Lahore': 'Asia/Karachi',
    'Singapore': 'Asia/Singapore', 'Hong Kong': 'Asia/Hong_Kong', 'Beijing': 'Asia/Shanghai',
    'Shanghai': 'Asia/Shanghai', 'Tokyo': 'Asia/Tokyo', 'Seoul': 'Asia/Seoul',
    'Bangkok': 'Asia/Bangkok', 'Jakarta': 'Asia/Jakarta', 'Manila': 'Asia/Manila',
    'New York': 'America/New_York', 'Los Angeles': 'America/Los_Angeles', 'Chicago': 'America/Chicago',
    'Toronto': 'America/Toronto', 'Vancouver': 'America/Vancouver', 'Mexico City': 'America/Mexico_City',
    'Sao Paulo': 'America/Sao_Paulo', 'Buenos Aires': 'America/Argentina/Buenos_Aires',
    'Cairo': 'Africa/Cairo', 'Johannesburg': 'Africa/Johannesburg', 'Lagos': 'Africa/Lagos',
    'Nairobi': 'Africa/Nairobi', 'Istanbul': 'Europe/Istanbul', 'Moscow': 'Europe/Moscow',
    'Riyadh': 'Asia/Riyadh', 'Doha': 'Asia/Qatar', 'Tehran': 'Asia/Tehran',
    'Bali': 'Asia/Makassar', 'Kuala Lumpur': 'Asia/Kuala_Lumpur', 'Colombo': 'Asia/Colombo',
  }

  const cityList = (typeof cities === 'string' ? cities : 'Sydney,London,New York,Tokyo,Dubai')
    .split(',').map(c => c.trim()).filter(Boolean).slice(0, 6)

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#ffffff' : '#1e293b'
  const muted = isDark ? '#475569' : '#e2e8f0'
  const sub = isDark ? '#94a3b8' : '#64748b'

  const formatTime = (h, m, s) => {
    if (format === '12h') {
      const hh = parseInt(h)
      const ampm = hh >= 12 ? 'PM' : 'AM'
      const h12 = String(hh % 12 || 12).padStart(2, '0')
      return showSeconds ? h12 + ':' + m + ':' + s + ' ' + ampm : h12 + ':' + m + ' ' + ampm
    }
    return showSeconds ? h + ':' + m + ':' + s : h + ':' + m
  }

  return (
    <div style={{
      background: bg,
      padding: '20px 24px',
      borderRadius: 14,
      display: 'inline-block',
      minWidth: 320,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + muted,
    }}>
      <div style={{
        color: accent,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        🌍 World Clock
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cityList.map(city => {
          const tz = cityMap[city] || 'UTC'
          const t = getCityTime(tz)
          return (
            <div key={city} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              paddingBottom: 8,
              borderBottom: '1px solid ' + muted,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <div style={{ color: fg, fontSize: 13, fontWeight: 700 }}>{city}</div>
                {showDate && <div style={{ color: sub, fontSize: 10 }}>{t.date}</div>}
              </div>
              <div style={{
                color: fg,
                fontSize: 18,
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}>
                {formatTime(t.h, t.m, t.s)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}