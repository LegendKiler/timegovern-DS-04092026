import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight } from "lucide-react"

export default function TimeDifferenceTool() {
  const [tz1, setTz1] = useState('UTC')
  const [tz2, setTz2] = useState('America/New_York')

  const getOffset = (tz) => {
    const now = new Date()
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' }).formatToParts(now)
    return parts.find(p => p.type === 'timeZoneName')?.value || ''
  }

  const diff = getOffset(tz1) + ' to ' + getOffset(tz2)

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><ArrowLeftRight className="h-5 w-5" /> Time Difference</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Select value={tz1} onValueChange={setTz1}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>{Intl.supportedValuesOf('timeZone').map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={tz2} onValueChange={setTz2}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>{Intl.supportedValuesOf('timeZone').map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}</SelectContent>
        </Select>
        <p className="text-center font-semibold">{diff}</p>
      </CardContent>
    </Card>
  )
}