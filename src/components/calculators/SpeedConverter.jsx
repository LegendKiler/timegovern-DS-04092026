import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Gauge } from "lucide-react"

const UNITS = [
  { id: 'mps', name: 'Meters per second (m/s)', mps: 1 },
  { id: 'kph', name: 'Kilometers per hour (km/h)', mps: 1 / 3.6 },
  { id: 'mph', name: 'Miles per hour (mph)', mps: 0.44704 },
  { id: 'kn', name: 'Knots (kn)', mps: 0.514444 },
  { id: 'fps', name: 'Feet per second (ft/s)', mps: 0.3048 }
]

export default function SpeedConverter() {
  const [value, setValue] = useState('100')
  const [from, setFrom] = useState('kph')

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return { err: 'Enter a number' }
    const unit = UNITS.find(u => u.id === from)
    const mps = v * unit.mps
    const out = {}
    for (const u of UNITS) out[u.id] = mps / u.mps
    return out
  }, [value, from])

  const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 4 })

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-md">
            <Gauge className="h-4 w-4 text-white" />
          </div>
          Speed Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Value</label><Input type="number" value={value} onChange={e => setValue(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">From</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
              {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-600/10 rounded-xl p-4 border border-amber-500/20 space-y-2">
            {UNITS.map(u => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-semibold">{u.name}</span>
                <span className="font-mono font-bold text-amber-600 tabular-nums">{fmt(result[u.id])}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          1 km/h = 0.2778 m/s. 1 mph = 1.609 km/h. 1 knot = 1.852 km/h = 1 nautical mile per hour. Speed of light = 299,792,458 m/s.
        </div>
      </CardContent>
    </Card>
  )
}