import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarCheck } from "lucide-react"

function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 }

export default function LeapYearChecker() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [result, setResult] = useState(null)

  const check = () => {
    const y = parseInt(year)
    if (isNaN(y) || y < 1) return
    const leap = isLeap(y)
    const next = (() => { let ny = y + 1; while (!isLeap(ny)) ny++; return ny })()
    const prev = (() => { let py = y - 1; while (!isLeap(py)) py--; return py })()
    setResult({ leap, next, prev, days: leap ? 366 : 365 })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-md">
            <CalendarCheck className="h-4 w-4 text-white" />
          </div>
          Leap Year Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Year</label>
          <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} min={1} max={9999} className="h-11" />
        </div>
        <button onClick={check} className="w-full h-11 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold">Check</button>

        {result && (
          <div className="space-y-3">
            <div className={'rounded-xl p-6 text-center ' + (result.leap ? 'bg-emerald-500/10 border-2 border-emerald-500/30' : 'bg-red-500/10 border-2 border-red-500/30')}>
              <div className="text-5xl font-black mb-2">{result.leap ? '✅' : '❌'}</div>
              <div className={'text-2xl font-black ' + (result.leap ? 'text-emerald-600' : 'text-red-600')}>
                {result.leap ? 'Leap Year!' : 'Not a Leap Year'}
              </div>
              <div className="text-xs text-muted-foreground mt-2">{year} has {result.days} days</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Previous leap</div><div className="font-bold">{result.prev}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Next leap</div><div className="font-bold">{result.next}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}