import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import SunCalc from 'suncalc'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun } from "lucide-react"

export default function SolarAltitude() {
  const { location } = useUser()
  const [solar, setSolar] = useState(null)

  useEffect(() => {
    if (!location?.latitude) return
    const update = () => {
      const now = new Date()
      const sunPos = SunCalc.getPosition(now, location.latitude, location.longitude)
      const alt = sunPos.altitude * 180 / Math.PI
      const az = sunPos.azimuth * 180 / Math.PI
      setSolar({ altitude: alt.toFixed(2), azimuth: az.toFixed(2) })
    }
    update()
    const timer = setInterval(update, 60000) // update every minute
    return () => clearInterval(timer)
  }, [location])

  if (!solar) return <Card><CardContent className="p-4">Loading...</CardContent></Card>

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Sun className="h-5 w-5 text-yellow-500" /> Solar Position</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Altitude</span>{solar.altitude}°</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Azimuth</span>{solar.azimuth}°</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Updated every minute</p>
      </CardContent>
    </Card>
  )
}
