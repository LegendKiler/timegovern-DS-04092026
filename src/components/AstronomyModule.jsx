import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import SunCalc from 'suncalc'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoonStar } from "lucide-react"

// Fallback times (New York approximate)
const fallbackTimes = {
  sunrise: new Date(new Date().setHours(6, 30, 0, 0)),
  sunset: new Date(new Date().setHours(19, 30, 0, 0)),
  dawn: new Date(new Date().setHours(5, 45, 0, 0)),
  dusk: new Date(new Date().setHours(20, 15, 0, 0)),
  nauticalDawn: new Date(new Date().setHours(5, 15, 0, 0)),
  nauticalDusk: new Date(new Date().setHours(20, 45, 0, 0)),
  astroDawn: new Date(new Date().setHours(4, 45, 0, 0)),
  astroDusk: new Date(new Date().setHours(21, 15, 0, 0)),
}

export default function AstronomyModule() {
  const { location } = useUser()
  const [times, setTimes] = useState(null)
  const [moon, setMoon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const lat = location?.latitude ?? 40.7128
      const lng = location?.longitude ?? -74.0060
      const now = new Date()

      const sunTimes = SunCalc.getTimes(now, lat, lng)
      const moonPos = SunCalc.getMoonPosition(now, lat, lng)
      const moonIllum = SunCalc.getMoonIllumination(now)

      // Moon age derived from phase (0-1) * 29.53 days
      const moonAge = moonIllum.phase * 29.53

      setTimes({
        sunrise: sunTimes.sunrise,
        sunset: sunTimes.sunset,
        dawn: sunTimes.dawn,
        dusk: sunTimes.dusk,
        nauticalDawn: sunTimes.nauticalDawn,
        nauticalDusk: sunTimes.nauticalDusk,
        astroDawn: sunTimes.nightEnd,
        astroDusk: sunTimes.night,
      })
      setMoon({
        altitude: (moonPos.altitude * 180 / Math.PI).toFixed(2),
        azimuth: (moonPos.azimuth * 180 / Math.PI).toFixed(2),
        illumination: (moonIllum.fraction * 100).toFixed(1),
        phase: moonIllum.phase,
        age: moonAge.toFixed(1),
      })
      setError(null)
    } catch (err) {
      console.error("SunCalc error:", err)
      setTimes(fallbackTimes)
      setMoon({
        altitude: "25.3",
        azimuth: "180.2",
        illumination: "62.5",
        phase: 0.5,
        age: "14.8",
      })
      setError("Using fallback data (SunCalc failed)")
    }
  }, [location])

  if (!times) return <Card><CardContent className="p-6">Loading astronomy data...</CardContent></Card>

  const moonLabel = moon.phase < 0.25 ? "New Moon" : moon.phase < 0.5 ? "First Quarter" : moon.phase < 0.75 ? "Full Moon" : "Last Quarter"

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MoonStar className="h-5 w-5" /> Astronomy
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-yellow-500 text-sm mb-2">{error}</p>}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Sunrise</span><span className="font-mono">{formatTime(times.sunrise)}</span></div>
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Sunset</span><span className="font-mono">{formatTime(times.sunset)}</span></div>
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Civil Dawn</span><span className="font-mono">{formatTime(times.dawn)}</span></div>
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Civil Dusk</span><span className="font-mono">{formatTime(times.dusk)}</span></div>
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Nautical Dawn</span><span className="font-mono">{formatTime(times.nauticalDawn)}</span></div>
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Nautical Dusk</span><span className="font-mono">{formatTime(times.nauticalDusk)}</span></div>
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Astro Dawn</span><span className="font-mono">{formatTime(times.astroDawn)}</span></div>
          <div className="bg-muted/50 p-2 rounded"><span className="block text-muted-foreground">Astro Dusk</span><span className="font-mono">{formatTime(times.astroDusk)}</span></div>
        </div>
        {moon && (
          <div className="mt-4 p-3 bg-muted/50 rounded">
            <p className="font-semibold flex items-center gap-2"><MoonStar className="h-4 w-4" /> {moonLabel}</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div><span className="text-muted-foreground">Illumination:</span> {moon.illumination}%</div>
              <div><span className="text-muted-foreground">Moon Age:</span> {moon.age} days</div>
              <div><span className="text-muted-foreground">Altitude:</span> {moon.altitude}°</div>
              <div><span className="text-muted-foreground">Azimuth:</span> {moon.azimuth}°</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
