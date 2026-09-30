import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import SunCalc from 'suncalc'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoonStar } from "lucide-react"

export default function MoonAltitude() {
  const { location } = useUser()
  const [moon, setMoon] = useState(null)

  useEffect(() => {
    if (!location?.latitude) return
    const update = () => {
      const now = new Date()
      const moonPos = SunCalc.getMoonPosition(now, location.latitude, location.longitude)
      const moonIllum = SunCalc.getMoonIllumination(now)
      setMoon({
        altitude: (moonPos.altitude * 180 / Math.PI).toFixed(2),
        azimuth: (moonPos.azimuth * 180 / Math.PI).toFixed(2),
        illumination: (moonIllum.fraction * 100).toFixed(1),
        phase: moonIllum.phase,
      })
    }
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [location])

  if (!moon) return <Card><CardContent className="p-4">Loading moon data...</CardContent></Card>

  const phaseLabel = moon.phase < 0.25 ? "New Moon" : moon.phase < 0.5 ? "First Quarter" : moon.phase < 0.75 ? "Full Moon" : "Last Quarter"

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><MoonStar className="h-5 w-5" /> Precise Moon Data</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Altitude</span>{moon.altitude}°</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Azimuth</span>{moon.azimuth}°</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Illumination</span>{moon.illumination}%</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Phase</span>{phaseLabel}</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Updated every minute</p>
      </CardContent>
    </Card>
  )
}
