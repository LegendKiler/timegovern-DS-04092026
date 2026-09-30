import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CitySearch() {
  const [timeZones, setTimeZones] = useState([])
  const [selectedTz, setSelectedTz] = useState('')
  const [customName, setCustomName] = useState('')

  const addTimeZone = () => {
    if (selectedTz && !timeZones.some(tz => tz.tz === selectedTz)) {
      const tzName = customName || selectedTz.replace(/_/g, ' ')
      setTimeZones([...timeZones, { tz: selectedTz, name: tzName }])
      setCustomName('')
    }
  }

  const removeTimeZone = (index) => setTimeZones(timeZones.filter((_, i) => i !== index))

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Add Custom City</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2">
          {timeZones.map((tz, i) => (
            <div key={i} className="flex items-center justify-between bg-muted/50 rounded px-3 py-2">
              <span>{tz.name} ({tz.tz})</span>
              <Button variant="ghost" size="sm" onClick={() => removeTimeZone(i)}>✕</Button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Select value={selectedTz} onValueChange={setSelectedTz}>
            <SelectTrigger className="flex-1"><SelectValue placeholder="Select timezone" /></SelectTrigger>
            <SelectContent>
              {Intl.supportedValuesOf('timeZone').map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input placeholder="City name (optional)" value={customName} onChange={e => setCustomName(e.target.value)} className="flex-1" />
        </div>
        <Button onClick={addTimeZone} className="mt-2 w-full">Add City</Button>
      </CardContent>
    </Card>
  )
}