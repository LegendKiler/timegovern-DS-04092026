import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FreshnessBadge from './FreshnessBadge'
import { Button } from "@/components/ui/button"
import { Activity, RefreshCw, MapPin, Clock, Loader2, ExternalLink } from "lucide-react"

function timeAgo(ms) {
  const s = Math.floor((Date.now() - ms) / 1000)
  if (s < 60) return s + 's ago'
  const m = Math.floor(s / 60)
  if (m < 60) return m + 'm ago'
  const h = Math.floor(m / 60)
  if (h < 24) return h + 'h ago'
  return Math.floor(h / 24) + 'd ago'
}

function magColor(mag) {
  if (mag >= 6) return 'bg-red-500'
  if (mag >= 5) return 'bg-orange-500'
  if (mag >= 4) return 'bg-amber-500'
  return 'bg-emerald-500'
}

export default function EarthquakeFeed() {
  const [quakes, setQuakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchQuakes = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
      if (!res.ok) throw new Error('Server ' + res.status)
      const data = await res.json()
      const items = (data.features || []).slice(0, 15).map(f => ({
        id: f.id,
        mag: f.properties.mag,
        place: f.properties.place,
        time: f.properties.time,
        url: f.properties.url,
        depth: f.geometry.coordinates[2],
      }))
      setQuakes(items)
    } catch (e) {
      setError(e.message || 'Failed to load earthquakes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuakes()
    const id = setInterval(fetchQuakes, 300000) // refresh every 5 min
    return () => clearInterval(id)
  }, [])

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-500" /> Earthquakes (24h) <FreshnessBadge status="live" />
          </span>
          <Button variant="ghost" size="sm" onClick={fetchQuakes} disabled={loading}>
            <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded mb-3">{error}</div>}

        {loading && quakes.length === 0 && (
          <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-red-500" /></div>
        )}

        {!loading && quakes.length === 0 && (
          <div className="text-center py-6 text-muted-foreground text-sm">No significant earthquakes in the last 24h</div>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {quakes.map(q => (
            <a key={q.id} href={q.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition group">
              <div className={'w-12 h-12 rounded-lg ' + magColor(q.mag) + ' flex items-center justify-center text-white font-black text-lg shrink-0'}>
                {q.mag.toFixed(1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium line-clamp-1">{q.place}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {timeAgo(q.time)}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {q.depth.toFixed(0)} km deep</span>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 mt-1" />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-3">Magnitude 4.5+ · Source: USGS</p>
      </CardContent>
    </Card>
  )
}