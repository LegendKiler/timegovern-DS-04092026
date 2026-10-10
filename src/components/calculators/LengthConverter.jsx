import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Ruler } from "lucide-react"

const UNITS = [
  { id: 'mm', name: 'Millimeters (mm)', meters: 0.001 },
  { id: 'cm', name: 'Centimeters (cm)', meters: 0.01 },
  { id: 'm', name: 'Meters (m)', meters: 1 },
  { id: 'km', name: 'Kilometers (km)', meters: 1000 },
  { id: 'in', name: 'Inches (in)', meters: 0.0254 },
  { id: 'ft', name: 'Feet (ft)', meters: 0.3048 },
  { id: 'yd', name: 'Yards (yd)', meters: 0.9144 },
  { id: 'mi', name: 'Miles (mi)', meters: 1609.344 },
  { id: 'nmi', name: 'Nautical miles (nmi)', meters: 1852 }
]

export default function LengthConverter() {
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('m')

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return { err: 'Enter a number' }
    const unit = UNITS.find(u => u.id === from)
    const meters = v * unit.meters
    const out = {}
    for (const u of UNITS) out[u.id] = meters / u.meters
    return out
  }, [value, from])

  const fmt = (n) => {
    if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(4)
    return n.toLocaleString('en-US', { maximumFractionDigits: 6 })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-md">
            <Ruler className="h-4 w-4 text-white" />
          </div>
          Length Converter
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
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-xl p-4 border border-blue-500/20 space-y-2 max-h-64 overflow-y-auto">
            {UNITS.map(u => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-semibold">{u.name}</span>
                <span className="font-mono font-bold text-blue-600 tabular-nums">{fmt(result[u.id])}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          1 inch = 2.54 cm exactly. 1 foot = 12 inches. 1 mile = 5280 feet. 1 nautical mile = 1852 meters.
        </div>
      </CardContent>
    </Card>
  )
}