// Open-Meteo client utilities. No API key required.
// Docs: https://open-meteo.com/en/docs

export const WMO_CODES = {
  0: { label: 'Clear sky', tone: 'sunny' },
  1: { label: 'Mainly clear', tone: 'sunny' },
  2: { label: 'Partly cloudy', tone: 'cloudy' },
  3: { label: 'Overcast', tone: 'cloudy' },
  45: { label: 'Fog', tone: 'fog' },
  48: { label: 'Rime fog', tone: 'fog' },
  51: { label: 'Light drizzle', tone: 'rain' },
  53: { label: 'Drizzle', tone: 'rain' },
  55: { label: 'Heavy drizzle', tone: 'rain' },
  56: { label: 'Freezing drizzle', tone: 'rain' },
  57: { label: 'Freezing drizzle', tone: 'rain' },
  61: { label: 'Light rain', tone: 'rain' },
  63: { label: 'Rain', tone: 'rain' },
  65: { label: 'Heavy rain', tone: 'rain' },
  66: { label: 'Freezing rain', tone: 'rain' },
  67: { label: 'Freezing rain', tone: 'rain' },
  71: { label: 'Light snow', tone: 'snow' },
  73: { label: 'Snow', tone: 'snow' },
  75: { label: 'Heavy snow', tone: 'snow' },
  77: { label: 'Snow grains', tone: 'snow' },
  80: { label: 'Light showers', tone: 'rain' },
  81: { label: 'Showers', tone: 'rain' },
  82: { label: 'Violent showers', tone: 'rain' },
  85: { label: 'Snow showers', tone: 'snow' },
  86: { label: 'Heavy snow showers', tone: 'snow' },
  95: { label: 'Thunderstorm', tone: 'storm' },
  96: { label: 'Thunderstorm with hail', tone: 'storm' },
  99: { label: 'Severe thunderstorm', tone: 'storm' },
}

export function getWmoInfo(code) {
  return WMO_CODES[code] || { label: 'Unknown', tone: 'cloudy' }
}

export function buildOpenMeteoUrl(lat, lng) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: '7',
  })
  return 'https://api.open-meteo.com/v1/forecast?' + params.toString()
}

export async function fetchWeather(lat, lng, signal) {
  const url = buildOpenMeteoUrl(lat, lng)
  const res = await fetch(url, signal ? { signal } : undefined)
  if (!res.ok) throw new Error('Weather API returned ' + res.status)
  return res.json()
}

export function formatWindDirection(deg) {
  if (deg === null || deg === undefined) return ''
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
  const idx = Math.round(deg / 22.5) % 16
  return dirs[idx]
}

export function formatTemp(c) {
  if (c === null || c === undefined) return '--'
  return Math.round(c) + '\u00B0C'
}