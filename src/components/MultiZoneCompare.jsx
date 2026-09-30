import { useState, useEffect } from 'react'
import { format } from 'date-fns-tz'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cities = [
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Sydney", tz: "Australia/Sydney" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "Paris", tz: "Europe/Paris" },
]

export default function MultiZoneCompare() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Time Zone Comparison</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {cities.map(city => (
            <div key={city.tz} className="flex justify-between items-center bg-muted/50 rounded p-3">
              <span className="font-medium">{city.name}</span>
              <span className="font-mono">{format(time, "HH:mm:ss", { timeZone: city.tz })}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}