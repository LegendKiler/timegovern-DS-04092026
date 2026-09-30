import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Percent } from "lucide-react"

export default function PercentageOfTimeCalculator() {
  const [value, setValue] = useState('2')
  const [unit, setUnit] = useState('hours')

  const unitsToSeconds = { seconds: 1, minutes: 60, hours: 3600, days: 86400, weeks: 604800, months: 2628000, years: 31536000 }
  const seconds = parseFloat(value || 0) * unitsToSeconds[unit]

  const out = {
    seconds: seconds,
    minutes: seconds / 60,
    hours: seconds / 3600,
    days: seconds / 86400,
    weeks: seconds / 604800,
    years: seconds / 31536000,
    pctOfDay: (seconds / 86400) * 100,
    pctOfWeek: (seconds / 604800) * 100,
    pctOfYear: (seconds / 31536000) * 100,
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-md">
            <Percent className="h-4 w-4 text-white" />
          </div>
          Percentage of Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="h-11" />
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="h-11 px-3 border border-border rounded-lg bg-background text-foreground">
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-teal-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">% of Day</div>
            <div className="text-2xl font-black text-teal-600 tabular-nums">{out.pctOfDay.toFixed(4)}%</div>
          </div>
          <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-teal-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">% of Week</div>
            <div className="text-2xl font-black text-teal-600 tabular-nums">{out.pctOfWeek.toFixed(4)}%</div>
          </div>
          <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-teal-500/20 col-span-2">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">% of Year</div>
            <div className="text-3xl font-black text-teal-600 tabular-nums">{out.pctOfYear.toFixed(4)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/50 p-2.5 rounded-lg flex justify-between"><span className="text-muted-foreground">Seconds</span><span className="font-bold tabular-nums">{out.seconds.toLocaleString()}</span></div>
          <div className="bg-muted/50 p-2.5 rounded-lg flex justify-between"><span className="text-muted-foreground">Minutes</span><span className="font-bold tabular-nums">{out.minutes.toLocaleString()}</span></div>
          <div className="bg-muted/50 p-2.5 rounded-lg flex justify-between"><span className="text-muted-foreground">Hours</span><span className="font-bold tabular-nums">{out.hours.toLocaleString()}</span></div>
          <div className="bg-muted/50 p-2.5 rounded-lg flex justify-between"><span className="text-muted-foreground">Days</span><span className="font-bold tabular-nums">{out.days.toFixed(2)}</span></div>
        </div>
      </CardContent>
    </Card>
  )
}