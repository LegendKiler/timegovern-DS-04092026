import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '../context/UserContext'
import { CloudSun } from "lucide-react"

export default function WeatherRadar() {
  const { location } = useUser()
  const [hourly, setHourly] = useState([])

  useEffect(() => {
    if (!location?.latitude) return
    const lat = location.latitude
    const lon = location.longitude
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=auto&forecast_hours=24`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const hourlyData = data.hourly.time.map((time, i) => ({
          time: new Date(time),
          temp: data.hourly.temperature_2m[i],
          code: data.hourly.weathercode[i],
        }))
        setHourly(hourlyData)
      })
      .catch(() => {})
  }, [location])

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><CloudSun className="h-5 w-5" /> Hourly Forecast</CardTitle></CardHeader>
      <CardContent>
        {hourly.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="flex gap-2">
              {hourly.map((h, i) => (
                <div key={i} className="min-w-[60px] text-center bg-muted/30 rounded p-2">
                  <div className="text-xs">{h.time.getHours()}:00</div>
                  <div className="text-lg">{Math.round(h.temp)}°</div>
                </div>
              ))}
            </div>
          </div>
        ) : <p>Loading...</p>}
      </CardContent>
    </Card>
  )
}