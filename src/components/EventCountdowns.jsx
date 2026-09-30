import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

const events = [
  { name: "New Year 2027", date: "2027-01-01T00:00:00" },
  { name: "Christmas", date: "2026-12-25T00:00:00" },
  { name: "Easter", date: "2027-03-28T00:00:00" },
]

export default function EventCountdowns() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Countdown to Events</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map(event => {
            const diff = new Date(event.date) - now
            const days = Math.floor(diff / (1000*60*60*24))
            const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60))
            const mins = Math.floor((diff % (1000*60*60)) / (1000*60))
            const secs = Math.floor((diff % (1000*60)) / 1000)
            return (
              <div key={event.name} className="bg-muted/30 rounded p-3">
                <h3 className="font-semibold">{event.name}</h3>
                <div className="font-mono text-xl">{days}d {hours}h {mins}m {secs}s</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}