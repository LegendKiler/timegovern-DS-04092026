import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Timer } from "lucide-react"

const DISTS = [
  { k: '5k', label: '5K', km: 5 },
  { k: '10k', label: '10K', km: 10 },
  { k: 'hm', label: 'Half marathon', km: 21.0975 },
  { k: 'fm', label: 'Marathon', km: 42.195 },
]

function secToTime(s) {
  if (!isFinite(s) || s <= 0) return '--'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.round(s % 60)
  if (h > 0) return h + 'h ' + m + 'm ' + sec + 's'
  return m + 'm ' + sec + 's'
}

export default function PaceCalculator() {
  const [mode, setMode] = useState('time') // 'time' = from distance+time; 'pace' = from distance+pace; 'dist' = from time+pace
  const [distKm, setDistKm] = useState('10')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('50')
  const [seconds, setSeconds] = useState('0')
  const [paceMin, setPaceMin] = useState('5')
  const [paceSec, setPaceSec] = useState('0')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (mode === 'time') {
      const d = parseFloat(distKm)
      const t = parseInt(hours)*3600 + parseInt(minutes)*60 + parseInt(seconds)
      if (!d || !t) return
      const paceSec = t / d
      setResult({
        kind: 'pace',
        distance: d,
        timeSec: t,
        pacePerKm: secToTime(paceSec),
        pacePerMi: secToTime(paceSec * 1.609344),
        speedKmh: (d / (t/3600)).toFixed(2),
      })
    } else if (mode === 'pace') {
      const d = parseFloat(distKm)
      const p = parseInt(paceMin)*60 + parseInt(paceSec)
      if (!d || !p) return
      const t = d * p
      setResult({
        kind: 'time',
        distance: d,
        pacePerKm: secToTime(p),
        timeSec: t,
        timeFormatted: secToTime(t),
        speedKmh: (d / (t/3600)).toFixed(2),
      })
    } else {
      const t = parseInt(hours)*3600 + parseInt(minutes)*60 + parseInt(seconds)
      const p = parseInt(paceMin)*60 + parseInt(paceSec)
      if (!t || !p) return
      const d = t / p
      setResult({
        kind: 'dist',
        distance: d.toFixed(3),
        pacePerKm: secToTime(p),
        timeSec: t,
        timeFormatted: secToTime(t),
      })
    }
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 shadow-md">
            <Timer className="h-4 w-4 text-white" />
          </div>
          Pace Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Solve for</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="time">Pace (from distance + time)</option>
            <option value="pace">Time (from distance + pace)</option>
            <option value="dist">Distance (from time + pace)</option>
          </select>
        </div>
        {(mode === 'time' || mode === 'pace') && (
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Distance (km)</label>
            <Input type="number" value={distKm} onChange={e => setDistKm(e.target.value)} className="h-11" />
          </div>
        )}
        {(mode === 'time' || mode === 'dist') && (
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Time</label>
            <div className="grid grid-cols-3 gap-2">
              <Input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="h" className="h-11" />
              <Input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="m" className="h-11" />
              <Input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} placeholder="s" className="h-11" />
            </div>
          </div>
        )}
        {(mode === 'pace' || mode === 'dist') && (
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Pace (per km)</label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" value={paceMin} onChange={e => setPaceMin(e.target.value)} placeholder="min" className="h-11" />
              <Input type="number" value={paceSec} onChange={e => setPaceSec(e.target.value)} placeholder="sec" className="h-11" />
            </div>
          </div>
        )}
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-sky-500 to-blue-500 text-white">Calculate</Button>
        {result && (
          <div className="space-y-2">
            {result.kind === 'pace' && (
              <>
                <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl p-4 text-center border border-sky-500/20">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Pace per km</div>
                  <div className="text-3xl font-black text-sky-600 tabular-nums">{result.pacePerKm}</div>
                  <div className="text-xs text-muted-foreground mt-1">per mile: {result.pacePerMi}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Distance</div><div className="font-bold tabular-nums">{result.distance} km</div></div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Speed</div><div className="font-bold tabular-nums">{result.speedKmh} km/h</div></div>
                </div>
              </>
            )}
            {result.kind === 'time' && (
              <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl p-4 text-center border border-sky-500/20">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Finish time for {result.distance} km</div>
                <div className="text-3xl font-black text-sky-600 tabular-nums">{result.timeFormatted}</div>
                <div className="text-xs text-muted-foreground mt-1">{result.pacePerKm}/km · {result.speedKmh} km/h</div>
              </div>
            )}
            {result.kind === 'dist' && (
              <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl p-4 text-center border border-sky-500/20">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Distance covered</div>
                <div className="text-3xl font-black text-sky-600 tabular-nums">{result.distance} km</div>
                <div className="text-xs text-muted-foreground mt-1">in {result.timeFormatted} at {result.pacePerKm}/km</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}