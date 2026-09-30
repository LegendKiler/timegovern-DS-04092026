import { useState } from 'react'
import { isWeekend } from 'date-fns'
import { isHoliday } from '../utils/holidays'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BusinessCalculators() {
  const [region, setRegion] = useState('US')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [days, setDays] = useState(null)
  const [startProj, setStartProj] = useState('')
  const [numDays, setNumDays] = useState(10)
  const [projEnd, setProjEnd] = useState('')

  const countBusiness = () => {
    if (!start || !end) return
    const s = new Date(start)
    const e = new Date(end)
    let count = 0
    let current = new Date(s)
    while (current <= e) {
      if (!isWeekend(current) && !isHoliday(current.toISOString().split('T')[0], region)) count++
      current.setDate(current.getDate() + 1)
    }
    setDays(count)
  }

  const projectDeadline = () => {
    if (!startProj) return
    const s = new Date(startProj)
    let count = 0
    let current = new Date(s)
    while (count < numDays) {
      current.setDate(current.getDate() + 1)
      if (!isWeekend(current) && !isHoliday(current.toISOString().split('T')[0], region)) count++
    }
    setProjEnd(current.toISOString().split('T')[0])
  }

  return (
    <Card>
      <CardHeader><CardTitle>Business Tools</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm">Region</label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="US">US</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="AU">AU</SelectItem>
              <SelectItem value="NZ">NZ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="font-medium mb-2">Working Day Counter</p>
          <div className="flex gap-2">
            <Input type="date" onClick={(e) => e.target.showPicker?.()} value={start} onChange={e => setStart(e.target.value)} />
            <Input type="date" onClick={(e) => e.target.showPicker?.()} value={end} onChange={e => setEnd(e.target.value)} />
          </div>
          <Button onClick={countBusiness} className="mt-2 w-full">Count</Button>
          {days !== null && <p className="mt-2 text-center font-semibold">{days} business days</p>}
        </div>
        <div>
          <p className="font-medium mb-2">Deadline Projector</p>
          <div className="flex gap-2">
            <Input type="date" onClick={(e) => e.target.showPicker?.()} value={startProj} onChange={e => setStartProj(e.target.value)} />
            <Input type="number" value={numDays} onChange={e => setNumDays(parseInt(e.target.value))} />
          </div>
          <Button onClick={projectDeadline} className="mt-2 w-full">Project</Button>
          {projEnd && <p className="mt-2 text-center font-semibold">End: {projEnd}</p>}
        </div>
      </CardContent>
    </Card>
  )
}