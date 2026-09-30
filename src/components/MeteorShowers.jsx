import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

const showers = [
  { name: 'Perseids', peak: 'Aug 12', intensity: 'High' },
  { name: 'Geminids', peak: 'Dec 14', intensity: 'Very High' },
  { name: 'Leonids', peak: 'Nov 17', intensity: 'Medium' },
  { name: 'Orionids', peak: 'Oct 21', intensity: 'Medium' },
]

export default function MeteorShowers() {
  const nextShower = showers.reduce((next, current) => {
    const currentDate = new Date(current.peak + ', 2026')
    const nextDate = new Date(next.peak + ', 2026')
    const now = new Date()
    if (currentDate > now && currentDate < nextDate) return current
    return next
  }, showers[0])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" /> Upcoming Meteor Showers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {showers.map(s => (
            <div key={s.name} className="flex justify-between items-center bg-muted/30 rounded p-2">
              <span>{s.name}</span>
              <span className="text-sm text-muted-foreground">{s.peak} - {s.intensity}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2">Next: {nextShower.name} on {nextShower.peak}</p>
      </CardContent>
    </Card>
  )
}
