import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Hourglass } from "lucide-react"

export default function TimeDurationCalculator() {
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('17:30')
  const [breakMin, setBreakMin] = useState('30')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!start || !end) return
    const [sh, sm] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    let startMin = sh * 60 + sm
    let endMin = eh * 60 + em
    if (endMin < startMin) endMin += 1440 // next day
    let totalMin = endMin - startMin
    const breakMins = parseInt(breakMin) || 0
    totalMin -= breakMins
    if (totalMin < 0) totalMin = 0

    const hours = Math.floor(totalMin / 60)
    const mins = totalMin % 60
    setResult({ hours, mins, totalMin, decimal: (totalMin / 60).toFixed(2) })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-md">
            <Hourglass className="h-4 w-4 text-white" />
          </div>
          Time Duration Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Start time</label>
            <Input type="time" value={start} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setStart(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">End time</label>
            <Input type="time" value={end} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setEnd(e.target.value)} className="h-11" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Break (minutes)</label>
          <Input type="number" value={breakMin} onChange={(e) => setBreakMin(e.target.value)} min={0} className="h-11" />
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-amber-500 to-yellow-500 text-white">Calculate Duration</Button>

        {result && (
          <div className="space-y-3 pt-2">
            <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl p-4 text-center border border-amber-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Duration</div>
              <div className="text-4xl font-black text-amber-600 tabular-nums">{result.hours}<span className="text-lg">h</span> {String(result.mins).padStart(2, '0')}<span className="text-lg">m</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Decimal hours</div><div className="font-bold">{result.decimal}h</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Total minutes</div><div className="font-bold">{result.totalMin}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}