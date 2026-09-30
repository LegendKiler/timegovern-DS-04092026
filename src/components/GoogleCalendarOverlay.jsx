import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarRange } from "lucide-react"

export default function GoogleCalendarOverlay() {
  const [zones, setZones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo'])
  const [selectedZone, setSelectedZone] = useState('')

  const addZone = () => {
    if (selectedZone && !zones.includes(selectedZone)) {
      setZones([...zones, selectedZone])
      setSelectedZone('')
    }
  }

  const removeZone = (zone) => setZones(zones.filter(z => z !== zone))

  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8am to 7pm

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarRange className="h-5 w-5" /> Meeting Overlap Finder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">Add timezones to see overlapping working hours.</p>
        <div className="space-y-2 mb-4">
          {zones.map(zone => (
            <div key={zone} className="flex items-center justify-between bg-muted/30 rounded px-3 py-2">
              <span>{zone}</span>
              <Button variant="ghost" size="sm" onClick={() => removeZone(zone)}>✕</Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="flex-1"><SelectValue placeholder="Add timezone" /></SelectTrigger>
            <SelectContent>
              {Intl.supportedValuesOf('timeZone').map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={addZone}>Add</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Timezone</th>
                {hours.map(h => <th key={h} className="text-center">{h}:00</th>)}
              </tr>
            </thead>
            <tbody>
              {zones.map(zone => (
                <tr key={zone}>
                  <td className="py-2">{zone}</td>
                  {hours.map(h => {
                    const now = new Date()
                    const localHour = parseInt(now.toLocaleString('en-US', { timeZone: zone, hour: 'numeric', hour12: false }))
                    const isWorking = localHour >= 9 && localHour <= 17
                    return (
                      <td key={h} className={`text-center p-1 ${isWorking ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {isWorking ? '✅' : ''}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
