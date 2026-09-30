import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EquinoxSolsticeTracker() {
  const year = new Date().getFullYear()
  const nextEvent = { name: "December Solstice", date: new Date(`${year}-12-21T00:00:00`) }
  const daysLeft = Math.ceil((nextEvent.date - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Next Astronomical Event</CardTitle></CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{nextEvent.name}</p>
        <p className="text-2xl font-bold text-primary">{nextEvent.date.toDateString()}</p>
        <p className="mt-2 text-sm text-muted-foreground">in {daysLeft} days</p>
      </CardContent>
    </Card>
  )
}
