import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Thermometer } from "lucide-react"

const UNITS = [
  { id: 'C', name: 'Celsius (°C)' },
  { id: 'F', name: 'Fahrenheit (°F)' },
  { id: 'K', name: 'Kelvin (K)' },
  { id: 'R', name: 'Rankine (°R)' }
]

function toCelsius(v, u) {
  if (u === 'C') return v
  if (u === 'F') return (v - 32) * 5 / 9
  if (u === 'K') return v - 273.15
  if (u === 'R') return (v - 491.67) * 5 / 9
  return NaN
}
function fromCelsius(c, u) {
  if (u === 'C') return c
  if (u === 'F') return c * 9 / 5 + 32
  if (u === 'K') return c + 273.15
  if (u === 'R') return (c + 273.15) * 9 / 5
  return NaN
}

export default function TemperatureConverter() {
  const [value, setValue] = useState('25')
  const [from, setFrom] = useState('C')

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return { err: 'Enter a number' }
    const c = toCelsius(v, from)
    if (from === 'K' && v < 0) return { err: 'Kelvin cannot be negative (absolute zero)' }
    if (from === 'R' && v < 0) return { err: 'Rankine cannot be negative' }
    if (c < -273.15) return { err: 'Below absolute zero — impossible temperature' }
    return {
      C: fromCelsius(c, 'C'),
      F: fromCelsius(c, 'F'),
      K: fromCelsius(c, 'K'),
      R: fromCelsius(c, 'R')
    }
  }, [value, from])

  const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 4 })

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-md">
            <Thermometer className="h-4 w-4 text-white" />
          </div>
          Temperature Converter
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
          <div className="bg-gradient-to-br from-red-500/10 to-orange-600/10 rounded-xl p-4 border border-red-500/20 space-y-2">
            {UNITS.map(u => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-semibold">{u.name}</span>
                <span className="font-mono font-bold text-red-600 tabular-nums">{fmt(result[u.id])}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          °F = °C x 9/5 + 32. K = °C + 273.15. °R = (°C + 273.15) x 9/5. Absolute zero is -273.15 °C, 0 K, -459.67 °F.
        </div>
      </CardContent>
    </Card>
  )
}