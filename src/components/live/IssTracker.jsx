import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FreshnessBadge from './FreshnessBadge'
import { Button } from "@/components/ui/button"
import { Satellite, RefreshCw, Loader2, Globe, Gauge, Navigation } from "lucide-react"

export default function IssTracker() {
  const [iss, setIss] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchIss = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
      if (!res.ok) throw new Error('Server ' + res.status)
      const data = await res.json()
      setIss(data)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message || 'Failed to load ISS position')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIss()
    const id = setInterval(fetchIss, 5000) // ISS moves fast, update every 5s
    return () => clearInterval(id)
  }, [])

  const lat = iss?.latitude || 0
  const lon = iss?.longitude || 0

  // Simple equirectangular projection onto a 360x180 box
  const xPct = ((lon + 180) / 360) * 100
  const yPct = ((90 - lat) / 180) * 100

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-indigo-500" /> ISS Tracker <FreshnessBadge status="live" />
          </span>
          <Button variant="ghost" size="sm" onClick={fetchIss} disabled={loading}>
            <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded mb-3">{error}</div>}

        {loading && !iss && (
          <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-indigo-500" /></div>
        )}

        {iss && (
          <>
            {/* Simple world map with ISS position */}
            <div className="relative w-full aspect-[2/1] bg-blue-50 dark:bg-blue-950/50 rounded-lg overflow-hidden mb-4 border border-border">
              {/* Very simple land-marker dots — better than nothing, keeps it lightweight */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle at 20% 40%, #3b82f6 1px, transparent 1px), radial-gradient(circle at 70% 30%, #3b82f6 1px, transparent 1px), radial-gradient(circle at 45% 60%, #3b82f6 1px, transparent 1px), radial-gradient(circle at 80% 70%, #3b82f6 1px, transparent 1px)',
                backgroundSize: '100% 100%'
              }}></div>

              {/* Latitude/Longitude grid */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.15) 1px, transparent 1px)',
                backgroundSize: '10% 20%'
              }}></div>

              {/* ISS marker */}
              <div
                className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                style={{ left: xPct + '%', top: yPct + '%' }}
              >
                <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-75"></div>
                <div className="absolute inset-0 rounded-full bg-indigo-600 border-2 border-white shadow-lg"></div>
              </div>

              {/* Equator line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-border"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-lg p-3">
                <Globe className="h-4 w-4 text-indigo-500 mb-1" />
                <div className="text-xs text-muted-foreground">Latitude</div>
                <div className="font-bold tabular-nums">{lat.toFixed(3)}°</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <Globe className="h-4 w-4 text-indigo-500 mb-1" />
                <div className="text-xs text-muted-foreground">Longitude</div>
                <div className="font-bold tabular-nums">{lon.toFixed(3)}°</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <Gauge className="h-4 w-4 text-indigo-500 mb-1" />
                <div className="text-xs text-muted-foreground">Altitude</div>
                <div className="font-bold tabular-nums">{iss.altitude?.toFixed(0)} km</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <Navigation className="h-4 w-4 text-indigo-500 mb-1" />
                <div className="text-xs text-muted-foreground">Velocity</div>
                <div className="font-bold tabular-nums">{iss.velocity?.toFixed(0)} km/h</div>
              </div>
            </div>

            {lastUpdated && <p className="text-xs text-muted-foreground text-center mt-3">Updated {lastUpdated.toLocaleTimeString()} · Refreshes every 5s</p>}
          </>
        )}
      </CardContent>
    </Card>
  )
}