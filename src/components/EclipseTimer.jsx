import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EclipseTimer() {
  const eclipse = { name: "Total Solar Eclipse", date: new Date("2026-08-12T18:00:00") }
  const diff = eclipse.date - new Date()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secs = Math.floor((diff % (1000 * 60)) / 1000)

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Upcoming Eclipse</CardTitle></CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{eclipse.name}</p>
        <p className="text-2xl font-bold text-primary">{eclipse.date.toDateString()}</p>
        <div className="mt-3 font-mono text-2xl">{days}d {hours}h {mins}m {secs}s</div>
      </CardContent>
    </Card>
  )
}
