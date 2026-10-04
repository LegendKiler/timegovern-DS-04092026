import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function DateDurationCalculator() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'date-duration',
      countrySlug: null,
      title: 'Date Duration',
      inputs: { from, to },
      results: result || {},
    })
  }, [from, to, result, registerCalculation])

  const calc = () => {
    if (!from || !to) return
    const a = new Date(from)
    const b = new Date(to)
    if (isNaN(a) || isNaN(b)) return
    const diffMs = Math.abs(b - a)
    const totalSeconds = Math.floor(diffMs / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const totalDays = Math.floor(totalHours / 24)

    const start = a < b ? a : b
    const end = a < b ? b : a
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()
    let hours = end.getHours() - start.getHours()
    let minutes = end.getMinutes() - start.getMinutes()
    let seconds = end.getSeconds() - start.getSeconds()

    if (seconds < 0) { seconds += 60; minutes-- }
    if (minutes < 0) { minutes += 60; hours-- }
    if (hours < 0) { hours += 24; days-- }
    if (days < 0) {
      const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate()
      days += prevMonthDays
      months--
    }
    if (months < 0) { months += 12; years-- }

    setResult({ years, months, days, hours, minutes, seconds, totalDays, totalHours, totalMinutes, totalSeconds })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
            <Clock className="h-4 w-4 text-white" />
          </div>
          Date Duration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">From</label>
            <Input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">To</label>
            <Input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} className="h-11" />
          </div>
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">Calculate Duration</Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-indigo-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Duration</div>
              <div className="text-2xl font-black text-indigo-600 tabular-nums">
                {result.years}y {result.months}m {result.days}d
              </div>
              <div className="text-sm font-semibold text-indigo-500 mt-1 tabular-nums">
                {result.hours}h {result.minutes}m {result.seconds}s
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Total Days</div><div className="font-bold tabular-nums">{result.totalDays.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Total Hours</div><div className="font-bold tabular-nums">{result.totalHours.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Total Minutes</div><div className="font-bold tabular-nums">{result.totalMinutes.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Total Seconds</div><div className="font-bold tabular-nums">{result.totalSeconds.toLocaleString()}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}