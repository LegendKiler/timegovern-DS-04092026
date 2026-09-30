import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FreshnessBadge from './FreshnessBadge'
import { Button } from "@/components/ui/button"
import { Cloud, RefreshCw, Droplets, Wind, Loader2, MapPin } from "lucide-react"

// WMO weather codes -> description + emoji
const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy drizzle', icon: '🌧️' },
  61: { label: 'Light rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Light snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  81: { label: 'Rain showers', icon: '🌧️' },
  82: { label: 'Violent showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm + hail', icon: '⛈️' },
  99: { label: 'Heavy thunderstorm', icon: '⛈️' },
}

export default function WeatherCard() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeather = async (lat, lon, name) => {
    setLoading(true); setError('')
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto')
      if (!res.ok) throw new Error('Server ' + res.status)
      const data = await res.json()
      setWeather(data.current)
      setLocation(name)
    } catch (e) {
      setError(e.message || 'Failed to load weather')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Try IP-based location first
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const lat = d.latitude || -33.8688
        const lon = d.longitude || 151.2093
        const name = d.city ? (d.city + ', ' + (d.country_code || '')) : 'Your location'
        fetchWeather(lat, lon, name)
      })
      .catch(() => fetchWeather(-33.8688, 151.2093, 'Sydney, AU'))
  }, [])

  const code = weather?.weather_code
  const wInfo = WEATHER_CODES[code] || { label: 'Unknown', icon: '🌡️' }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-500" /> Live Weather <FreshnessBadge status="hourly" />
          </span>
          <Button variant="ghost" size="sm" onClick={() => location && fetchWeather(-33.8688, 151.2093, location)} disabled={loading}>
            <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded mb-3">{error}</div>}

        {loading && !weather && (
          <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
        )}

        {weather && (
          <div className="text-center">
            <div className="text-6xl mb-2">{wInfo.icon}</div>
            <div className="text-5xl font-black text-blue-600 tabular-nums mb-1">
              {Math.round(weather.temperature_2m)}°C
            </div>
            <div className="text-sm text-muted-foreground mb-4">{wInfo.label}</div>

            {location && (
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                <MapPin className="h-3 w-3" /> {location}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-lg p-3">
                <Droplets className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{weather.relative_humidity_2m}%</div>
                <div className="text-xs text-muted-foreground">Humidity</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <Wind className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{Math.round(weather.wind_speed_10m)}</div>
                <div className="text-xs text-muted-foreground">km/h wind</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}