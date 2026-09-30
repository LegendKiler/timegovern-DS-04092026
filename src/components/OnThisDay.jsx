import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History } from "lucide-react"

const events = [
  { date: '2026-09-06', events: ['First recorded use of the word "robot"', 'Last day of the 1928 Olympics'] },
  { date: '2026-09-07', events: ['Brazil declares independence from Portugal', 'First issue of the "New York Daily News"'] },
  // Add more as needed
]

export default function OnThisDay() {
  const [todayEvents, setTodayEvents] = useState([])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const found = events.find(e => e.date === today)
    setTodayEvents(found?.events || ['No known events for today'])
  }, [])

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> On This Day</CardTitle></CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1">
          {todayEvents.map((event, i) => <li key={i}>{event}</li>)}
        </ul>
      </CardContent>
    </Card>
  )
}
