import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Hash } from "lucide-react"

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

export default function WeekNumberCalculator() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const d = date ? new Date(date + 'T00:00:00') : new Date()
  const week = getISOWeek(d)
  const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000)
  const quarter = Math.ceil((d.getMonth() + 1) / 3)
  const daysInYear = ((d.getFullYear() % 4 === 0 && d.getFullYear() % 100 !== 0) || d.getFullYear() % 400 === 0) ? 366 : 365
  const pctOfYear = ((dayOfYear / daysInYear) * 100).toFixed(1)

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
            <Hash className="h-4 w-4 text-white" />
          </div>
          Week & Day Number
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Pick a date</label>
          <Input type="date" value={date} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setDate(e.target.value)} className="h-11" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 text-center border border-orange-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Week</div>
            <div className="text-3xl font-black text-orange-600 tabular-nums">{week}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 text-center border border-orange-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Day of Year</div>
            <div className="text-3xl font-black text-orange-600 tabular-nums">{dayOfYear}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-[10px] text-muted-foreground">Quarter</div><div className="font-bold">Q{quarter}</div></div>
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-[10px] text-muted-foreground">Days in Year</div><div className="font-bold">{daysInYear}</div></div>
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-[10px] text-muted-foreground">Year Progress</div><div className="font-bold text-emerald-600">{pctOfYear}%</div></div>
        </div>
      </CardContent>
    </Card>
  )
}