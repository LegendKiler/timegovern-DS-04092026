import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SunCalc from 'suncalc'
import { Sunrise } from "lucide-react"

const cities = [
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
]

export default function SunriseSunsetTable() {
  const [data, setData] = useState([])

  useEffect(() => {
    const now = new Date()
    const cityData = cities.map(city => {
      const times = SunCalc.getTimes(now, city.lat, city.lon)
      return {
        name: city.name,
        sunrise: times.sunrise,
        sunset: times.sunset,
      }
    })
    setData(cityData)
  }, [])

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Sunrise className="h-5 w-5" /> Sunrise/Sunset Around the World</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left">City</th><th>Sunrise</th><th>Sunset</th></tr></thead>
            <tbody>
              {data.map((city, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{city.name}</td>
                  <td className="text-center">{city.sunrise.toLocaleTimeString()}</td>
                  <td className="text-center">{city.sunset.toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}