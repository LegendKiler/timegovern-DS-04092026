import { useState, useEffect } from 'react'

const CODES = { 0: ['Clear', '☀️'], 1: ['Mainly clear', '🌤️'], 2: ['Partly cloudy', '⛅'], 3: ['Overcast', '☁️'], 45: ['Fog', '🌫️'], 48: ['Fog', '🌫️'], 51: ['Drizzle', '🌦️'], 53: ['Drizzle', '🌦️'], 55: ['Drizzle', '🌧️'], 61: ['Rain', '🌦️'], 63: ['Rain', '🌧️'], 65: ['Heavy rain', '🌧️'], 71: ['Snow', '🌨️'], 73: ['Snow', '❄️'], 75: ['Snow', '❄️'], 80: ['Showers', '🌦️'], 81: ['Showers', '🌧️'], 82: ['Showers', '⛈️'], 95: ['Storm', '⛈️'], 96: ['Storm', '⛈️'], 99: ['Storm', '⛈️'] }

export default function WeatherWidget({ accent = '#06b6d4', theme = 'dark', city = 'Sydney', lat = -33.8688, lon = 151.2093 }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m')
      .then(r => r.json())
      .then(d => { setData(d.current); setLoading(false) })
      .catch(() => setLoading(false))
  }, [lat, lon])

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#ffffff' : '#1e293b'
  const muted = isDark ? '#475569' : '#e2e8f0'

  const code = data?.weather_code
  const [label, icon] = CODES[code] || ['Unknown', '🌡️']

  return (
    <div style={{ background: bg, padding: '20px 24px', borderRadius: 12, display: 'inline-block', minWidth: 200, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ color: accent, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{city}</div>
      {loading ? (
        <div style={{ color: fg, fontSize: 14 }}>Loading...</div>
      ) : data ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 44 }}>{icon}</div>
            <div>
              <div style={{ color: fg, fontSize: 34, fontWeight: 800, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{Math.round(data.temperature_2m)}°C</div>
              <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 12, marginTop: 2 }}>{label}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid ' + muted }}>
            <div>
              <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 10, textTransform: 'uppercase', fontWeight: 600 }}>Humidity</div>
              <div style={{ color: fg, fontSize: 14, fontWeight: 700 }}>{data.relative_humidity_2m}%</div>
            </div>
            <div>
              <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 10, textTransform: 'uppercase', fontWeight: 600 }}>Wind</div>
              <div style={{ color: fg, fontSize: 14, fontWeight: 700 }}>{Math.round(data.wind_speed_10m)} km/h</div>
            </div>
          </div>
        </>
      ) : <div style={{ color: fg, fontSize: 14 }}>Unable to load</div>}
    </div>
  )
}