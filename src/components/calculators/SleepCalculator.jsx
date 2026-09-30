import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Moon } from "lucide-react"

export default function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState('07:00')
  const [mode, setMode] = useState('wake')

  // Sleep cycles are ~90 minutes, plus ~15 min to fall asleep
  const CYCLE_MIN = 90
  const FALL_ASLEEP_MIN = 15

  const calculate = () => {
    const times = []
    if (mode === 'wake') {
      // User wants to wake at wakeTime — calculate bedtimes
      const [h, m] = wakeTime.split(':').map(Number)
      const wake = new Date()
      wake.setHours(h, m, 0, 0)
      for (let cycles = 6; cycles >= 4; cycles--) {
        const bedtime = new Date(wake.getTime() - (cycles * CYCLE_MIN + FALL_ASLEEP_MIN) * 60000)
        times.push({ cycles, time: bedtime })
      }
    } else {
      // User sleeps NOW — calculate wake times
      const now = new Date()
      for (let cycles = 4; cycles <= 6; cycles++) {
        const wake = new Date(now.getTime() + (cycles * CYCLE_MIN + FALL_ASLEEP_MIN) * 60000)
        times.push({ cycles, time: wake })
      }
    }
    return times
  }

  const times = calculate()

  const fmt = (d) => d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
            <Moon className="h-4 w-4 text-white" />
          </div>
          Sleep Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          <button onClick={() => setMode('wake')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (mode === 'wake' ? 'bg-primary text-white' : '')}>I want to wake at</button>
          <button onClick={() => setMode('sleep')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (mode === 'sleep' ? 'bg-primary text-white' : '')}>I'm sleeping now</button>
        </div>

        {mode === 'wake' && (
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Wake up time</label>
            <Input type="time" value={wakeTime} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setWakeTime(e.target.value)} className="h-11" />
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground text-center">
            {mode === 'wake' ? 'Best bedtimes:' : 'Best wake-up times:'}
          </div>
          {times.map((t, i) => (
            <div key={i} className={'flex items-center justify-between p-3 rounded-xl border ' + (t.cycles === 5 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-muted/50 border-border')}>
              <div className="text-2xl font-black tabular-nums">{fmt(t.time)}</div>
              <div className="text-right">
                <div className={'text-xs font-bold ' + (t.cycles === 5 ? 'text-emerald-600' : 'text-muted-foreground')}>{t.cycles} cycles</div>
                <div className="text-[10px] text-muted-foreground">~{t.cycles * 1.5}h sleep</div>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-muted-foreground text-center pt-2">Cycle = 90 min · Includes 15 min to fall asleep</p>
        </div>
      </CardContent>
    </Card>
  )
}