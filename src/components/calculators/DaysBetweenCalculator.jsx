import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarRange } from "lucide-react"

export default function DaysBetweenCalculator() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    registerCalculation({
      type: 'days-between',
      countrySlug: null,
      title: 'Days Between Dates',
      inputs: { from, to },
      results: result || {},
    })
  }, [from, to, result, registerCalculation])

  const calc = () => {
    if (!from || !to) return
    const a = new Date(from)
    const b = new Date(to)
    const diffMs = Math.abs(b - a)
    const days = Math.floor(diffMs / 86400000)
    const weeks = Math.floor(days / 7)
    const months = Math.abs((b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()))
    const years = Math.floor(months / 12)

    const businessDays = (() => {
      let count = 0
      const start = new Date(Math.min(a, b))
      const end = new Date(Math.max(a, b))
      const cur = new Date(start)
      while (cur <= end) {
        const dow = cur.getDay()
        if (dow !== 0 && dow !== 6) count++
        cur.setDate(cur.getDate() + 1)
      }
      return count
    })()

    const hours = days * 24
    const minutes = hours * 60
    setResult({ days, weeks, months, years, hours, minutes, businessDays })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
            <CalendarRange className="h-4 w-4 text-white" />
          </div>
          Days Between Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">From</label>
            <Input type="date" value={from} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setFrom(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">To</label>
            <Input type="date" value={to} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setTo(e.target.value)} className="h-11" />
          </div>
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Calculate</Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-blue-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total days</div>
              <div className="text-4xl font-black text-blue-600 tabular-nums">{result.days.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Weeks</div><div className="font-bold">{result.weeks.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Months</div><div className="font-bold">{result.months.toLocaleString()}</div></div>
              <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20"><div className="text-xs text-emerald-600">Business Days</div><div className="font-bold text-emerald-600">{result.businessDays.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Hours</div><div className="font-bold">{result.hours.toLocaleString()}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}