import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Scale } from "lucide-react"

const UNITS = [
  { id: 'mg', name: 'Milligrams (mg)', kg: 1e-6 },
  { id: 'g', name: 'Grams (g)', kg: 0.001 },
  { id: 'kg', name: 'Kilograms (kg)', kg: 1 },
  { id: 't', name: 'Metric tons (t)', kg: 1000 },
  { id: 'oz', name: 'Ounces (oz)', kg: 0.028349523125 },
  { id: 'lb', name: 'Pounds (lb)', kg: 0.45359237 },
  { id: 'st', name: 'Stone (st)', kg: 6.35029318 },
  { id: 'ton', name: 'US tons', kg: 907.18474 }
]

export default function WeightConverter() {
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('kg')

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return { err: 'Enter a number' }
    const unit = UNITS.find(u => u.id === from)
    const kg = v * unit.kg
    const out = {}
    for (const u of UNITS) out[u.id] = kg / u.kg
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
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md">
            <Scale className="h-4 w-4 text-white" />
          </div>
          Weight Converter
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
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-xl p-4 border border-emerald-500/20 space-y-2">
            {UNITS.map(u => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-semibold">{u.name}</span>
                <span className="font-mono font-bold text-emerald-600 tabular-nums">{fmt(result[u.id])}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          1 pound = 0.45359237 kg exactly. 1 ounce = 1/16 pound. 1 stone = 14 pounds. 1 US ton = 2000 pounds.
        </div>
      </CardContent>
    </Card>
  )
}