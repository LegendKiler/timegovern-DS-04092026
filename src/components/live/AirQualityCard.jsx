import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FreshnessBadge from './FreshnessBadge'
import { Button } from "@/components/ui/button"
import { Wind, RefreshCw, Loader2, MapPin } from "lucide-react"

function aqiInfo(aqi) {
  if (aqi <= 20) return { label: 'Good', color: 'text-emerald-600', bg: 'bg-emerald-500' }
  if (aqi <= 40) return { label: 'Fair', color: 'text-lime-600', bg: 'bg-lime-500' }
  if (aqi <= 60) return { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-500' }
  if (aqi <= 80) return { label: 'Poor', color: 'text-orange-600', bg: 'bg-orange-500' }
  if (aqi <= 100) return { label: 'Very Poor', color: 'text-red-600', bg: 'bg-red-500' }
  return { label: 'Hazardous', color: 'text-purple-600', bg: 'bg-purple-600' }
}

export default function AirQualityCard() {
  const [air, setAir] = useState(null)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAir = async (lat, lon, name) => {
    setLoading(true); setError('')
    try {
      const res = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=' + lat + '&longitude=' + lon + '&current=pm10,pm2_5,european_aqi,us_aqi')
      if (!res.ok) throw new Error('Server ' + res.status)
      const data = await res.json()
      setAir(data.current)
      setLocation(name)
    } catch (e) {
      setError(e.message || 'Failed to load air quality')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const name = d.city ? (d.city + ', ' + (d.country_code || '')) : 'Your location'
        fetchAir(d.latitude || -33.8688, d.longitude || 151.2093, name)
      })
      .catch(() => fetchAir(-33.8688, 151.2093, 'Sydney, AU'))
  }, [])

  const aqi = air?.european_aqi ?? air?.us_aqi ?? 0
  const info = aqiInfo(aqi)
  const pct = Math.min((aqi / 120) * 100, 100)

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-500/10 to-green-500/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-teal-500" /> Air Quality <FreshnessBadge status="hourly" />
          </span>
          <Button variant="ghost" size="sm" onClick={() => fetchAir(-33.8688, 151.2093, location)} disabled={loading}>
            <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded mb-3">{error}</div>}

        {loading && !air && (
          <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-teal-500" /></div>
        )}

        {air && (
          <>
            <div className="text-center mb-4">
              <div className="text-6xl font-black tabular-nums mb-1" style={{ color: aqi <= 40 ? '#059669' : aqi <= 60 ? '#ca8a04' : aqi <= 80 ? '#ea580c' : '#dc2626' }}>
                {aqi}
              </div>
              <div className={'text-lg font-bold ' + info.color}>{info.label}</div>
              <div className="text-xs text-muted-foreground mt-1">European AQI</div>
            </div>

            {/* AQI bar */}
            <div className="relative h-3 rounded-full overflow-hidden mb-4 bg-gradient-to-r from-emerald-500 via-yellow-500 via-orange-500 to-red-500">
              <div className="absolute top-0 bottom-0 w-1 bg-white border border-black shadow" style={{ left: 'calc(' + pct + '% - 2px)' }}></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <div className="text-lg font-bold tabular-nums">{air.pm2_5?.toFixed(1) || '—'}</div>
                <div className="text-xs text-muted-foreground">PM2.5 µg/m³</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <div className="text-lg font-bold tabular-nums">{air.pm10?.toFixed(1) || '—'}</div>
                <div className="text-xs text-muted-foreground">PM10 µg/m³</div>
              </div>
            </div>

            {location && (
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-3">
                <MapPin className="h-3 w-3" /> {location}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}