import { useState, useEffect } from 'react'

function getTimeInZone(tz, baseDate = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(baseDate)
    return {
      h: parseInt(parts.find(p => p.type === 'hour')?.value || 0),
      m: parseInt(parts.find(p => p.type === 'minute')?.value || 0),
      s: parseInt(parts.find(p => p.type === 'second')?.value || 0),
    }
  } catch {
    return { h: baseDate.getHours(), m: baseDate.getMinutes(), s: baseDate.getSeconds() }
  }
}

function getDateInZone(tz, baseDate = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz, weekday: 'short', month: 'short', day: 'numeric'
    }).format(baseDate)
  } catch {
    return baseDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }
}

// Get UTC offset in minutes for a timezone at a specific date
function getOffsetMinutes(tz, baseDate = new Date()) {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    })
    const parts = dtf.formatToParts(baseDate)
    const year = parseInt(parts.find(p => p.type === 'year').value)
    const month = parseInt(parts.find(p => p.type === 'month').value) - 1
    const day = parseInt(parts.find(p => p.type === 'day').value)
    const hour = parseInt(parts.find(p => p.type === 'hour').value)
    const minute = parseInt(parts.find(p => p.type === 'minute').value)
    const asUTC = Date.UTC(year, month, day, hour, minute)
    const asLocal = baseDate.getTime()
    return Math.round((asUTC - asLocal) / 60000)
  } catch {
    return 0
  }
}

const CITY_TZ = {
  'Sydney': 'Australia/Sydney', 'Melbourne': 'Australia/Melbourne', 'Brisbane': 'Australia/Brisbane',
  'Perth': 'Australia/Perth', 'Adelaide': 'Australia/Adelaide', 'Auckland': 'Pacific/Auckland',
  'London': 'Europe/London', 'Paris': 'Europe/Paris', 'Berlin': 'Europe/Berlin', 'Rome': 'Europe/Rome',
  'Madrid': 'Europe/Madrid', 'Amsterdam': 'Europe/Amsterdam', 'Dublin': 'Europe/Dublin',
  'Zurich': 'Europe/Zurich', 'Vienna': 'Europe/Vienna', 'Stockholm': 'Europe/Stockholm',
  'Dubai': 'Asia/Dubai', 'Abu Dhabi': 'Asia/Dubai', 'Mumbai': 'Asia/Kolkata', 'Delhi': 'Asia/Kolkata',
  'Karachi': 'Asia/Karachi', 'Lahore': 'Asia/Karachi', 'Dhaka': 'Asia/Dhaka', 'Colombo': 'Asia/Colombo',
  'Kathmandu': 'Asia/Kathmandu', 'Singapore': 'Asia/Singapore', 'Hong Kong': 'Asia/Hong_Kong',
  'Beijing': 'Asia/Shanghai', 'Shanghai': 'Asia/Shanghai', 'Tokyo': 'Asia/Tokyo', 'Osaka': 'Asia/Tokyo',
  'Seoul': 'Asia/Seoul', 'Bangkok': 'Asia/Bangkok', 'Jakarta': 'Asia/Jakarta', 'Manila': 'Asia/Manila',
  'Kuala Lumpur': 'Asia/Kuala_Lumpur', 'Ho Chi Minh City': 'Asia/Ho_Chi_Minh',
  'New York': 'America/New_York', 'Los Angeles': 'America/Los_Angeles', 'Chicago': 'America/Chicago',
  'Houston': 'America/Chicago', 'Toronto': 'America/Toronto', 'Vancouver': 'America/Vancouver',
  'Mexico City': 'America/Mexico_City', 'Sao Paulo': 'America/Sao_Paulo',
  'Buenos Aires': 'America/Argentina/Buenos_Aires', 'Lima': 'America/Lima', 'Bogota': 'America/Bogota',
  'Cairo': 'Africa/Cairo', 'Johannesburg': 'Africa/Johannesburg', 'Lagos': 'Africa/Lagos',
  'Nairobi': 'Africa/Nairobi', 'Casablanca': 'Africa/Casablanca', 'Marrakech': 'Africa/Casablanca',
  'Istanbul': 'Europe/Istanbul', 'Moscow': 'Europe/Moscow', 'Riyadh': 'Asia/Riyadh',
  'Doha': 'Asia/Qatar', 'Kuwait City': 'Asia/Kuwait', 'Tehran': 'Asia/Tehran',
  'Bali': 'Asia/Makassar', 'Honolulu': 'Pacific/Honolulu', 'Fiji': 'Pacific/Fiji',
}

const ALL_CITIES = Object.keys(CITY_TZ).sort()

function formatOffset(mins) {
  const sign = mins >= 0 ? '+' : '-'
  const abs = Math.abs(mins)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return 'UTC' + sign + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0')
}

export default function TimeZoneConverterWidget({
  accent = '#8b5cf6',
  theme = 'dark',
  from = 'Sydney',
  to = 'London',
  format = '24h',
}) {
  const [tick, setTick] = useState(0)
  const [fromCity, setFromCity] = useState(from)
  const [toCity, setToCity] = useState(to)
  const [customTime, setCustomTime] = useState('') // "HH:MM"

  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(id) }, [])

  const fromTz = CITY_TZ[fromCity] || 'UTC'
  const toTz = CITY_TZ[toCity] || 'UTC'

  const now = new Date()
  const fromTime = getTimeInZone(fromTz, now)
  const toTime = getTimeInZone(toTz, now)
  const fromDate = getDateInZone(fromTz, now)
  const toDate = getDateInZone(toTz, now)

  const fromOffset = getOffsetMinutes(fromTz, now)
  const toOffset = getOffsetMinutes(toTz, now)
  const diffMinutes = toOffset - fromOffset

  const diffHours = diffMinutes / 60
  const diffLabel = diffMinutes === 0
    ? 'Same time'
    : (diffMinutes > 0 ? '+' : '') + diffHours.toFixed(diffMinutes % 60 === 0 ? 0 : 1) + 'h'

  // If user entered custom time, calculate the converted time
  let customConverted = null
  if (customTime && /^\d{1,2}:\d{2}$/.test(customTime)) {
    const [hStr, mStr] = customTime.split(':')
    const h = parseInt(hStr)
    const m = parseInt(mStr)
    const totalMin = h * 60 + m + diffMinutes
    const normalized = ((totalMin % 1440) + 1440) % 1440
    const ch = Math.floor(normalized / 60)
    const cm = normalized % 60
    customConverted = { h: ch, m: cm, dayShift: Math.floor(totalMin / 1440) }
  }

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#ffffff' : '#1e293b'
  const muted = isDark ? '#334155' : '#e2e8f0'
  const sub = isDark ? '#94a3b8' : '#64748b'

  const fmt = (h, m) => {
    if (format === '12h') {
      const ampm = h >= 12 ? 'PM' : 'AM'
      const h12 = h % 12 || 12
      return h12 + ':' + String(m).padStart(2, '0') + ' ' + ampm
    }
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0')
  }

  const selectStyle = {
    background: isDark ? '#1e293b' : '#f1f5f9',
    color: fg,
    border: '1px solid ' + muted,
    borderRadius: 8,
    padding: '6px 8px',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'inherit',
    width: '100%',
    cursor: 'pointer',
  }

  return (
    <div style={{
      background: bg,
      padding: '20px 22px',
      borderRadius: 14,
      display: 'inline-block',
      minWidth: 300,
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
        🌐 Time Zone Converter
      </div>

      {/* FROM */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: sub, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>From</div>
        <select
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          style={selectStyle}
        >
          {ALL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{
          background: isDark ? '#1e293b' : '#f8fafc',
          borderRadius: 8,
          padding: '8px 10px',
          marginTop: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
          <div style={{ color: fg, fontSize: 22, fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
            {fmt(fromTime.h, fromTime.m)}
          </div>
          <div style={{ color: sub, fontSize: 10 }}>{fromDate}</div>
        </div>
      </div>

      {/* DIFF INDICATOR */}
      <div style={{
        textAlign: 'center',
        color: accent,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.06em',
        margin: '8px 0',
        padding: '4px 0',
        borderTop: '1px dashed ' + muted,
        borderBottom: '1px dashed ' + muted,
      }}>
        {diffLabel} {diffMinutes !== 0 && '· ' + formatOffset(fromOffset) + ' → ' + formatOffset(toOffset)}
      </div>

      {/* TO */}
      <div style={{ marginTop: 12 }}>
        <div style={{ color: sub, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>To</div>
        <select
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
          style={selectStyle}
        >
          {ALL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{
          background: isDark ? '#1e293b' : '#f8fafc',
          borderRadius: 8,
          padding: '8px 10px',
          marginTop: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
          <div style={{ color: accent, fontSize: 22, fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
            {fmt(toTime.h, toTime.m)}
          </div>
          <div style={{ color: sub, fontSize: 10 }}>{toDate}</div>
        </div>
      </div>

      {/* CUSTOM TIME CONVERTER */}
      <div style={{
        marginTop: 14,
        paddingTop: 12,
        borderTop: '1px solid ' + muted,
      }}>
        <div style={{ color: sub, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
          Convert a specific time
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="time"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            style={{
              background: isDark ? '#1e293b' : '#f1f5f9',
              color: fg,
              border: '1px solid ' + muted,
              borderRadius: 8,
              padding: '6px 8px',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: 'inherit',
              flex: 1,
            }}
            placeholder="HH:MM"
          />
          <span style={{ color: sub, fontSize: 16, fontWeight: 700 }}>→</span>
          <div style={{
            background: isDark ? '#1e293b' : '#f8fafc',
            border: '1px solid ' + muted,
            borderRadius: 8,
            padding: '6px 12px',
            color: customConverted ? accent : sub,
            fontSize: 14,
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
            flex: 1,
            textAlign: 'center',
          }}>
            {customConverted
              ? fmt(customConverted.h, customConverted.m) + (customConverted.dayShift !== 0 ? (customConverted.dayShift > 0 ? ' (+1d)' : ' (-1d)') : '')
              : '—'}
          </div>
        </div>
      </div>
    </div>
  )
}