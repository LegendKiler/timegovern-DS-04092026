import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export default function SaveableWorldClocks() {
  const [clocks, setClocks] = useState([])
  const [selectedTz, setSelectedTz] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('customClocks')
    if (saved) setClocks(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('customClocks', JSON.stringify(clocks))
  }, [clocks])

  const addClock = () => {
    if (selectedTz && !clocks.includes(selectedTz)) {
      setClocks([...clocks, selectedTz])
      setSelectedTz('')
    }
  }

  const removeClock = (tz) => setClocks(clocks.filter(c => c !== tz))

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> Custom World Clocks</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {clocks.map(tz => (
            <div key={tz} className="flex justify-between items-center bg-muted/50 rounded px-3 py-2">
              <span>{tz}</span>
              <Button variant="ghost" size="sm" onClick={() => removeClock(tz)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Select value={selectedTz} onValueChange={setSelectedTz}>
            <SelectTrigger className="flex-1"><SelectValue placeholder="Select timezone" /></SelectTrigger>
            <SelectContent>
              {Intl.supportedValuesOf('timeZone').map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={addClock}>Add</Button>
        </div>
      </CardContent>
    </Card>
  )
}