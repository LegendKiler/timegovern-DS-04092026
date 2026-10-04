import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Beef } from "lucide-react"

const LEVELS = [
  { k: 'sed', label: 'Sedentary adult', lo: 0.8, hi: 1.0 },
  { k: 'active', label: 'Active (regular exercise)', lo: 1.2, hi: 1.6 },
  { k: 'strength', label: 'Strength training / building muscle', lo: 1.6, hi: 2.2 },
  { k: 'endurance', label: 'Endurance athlete', lo: 1.2, hi: 1.4 },
  { k: 'cut', label: 'Cutting (preserve muscle)', lo: 2.0, hi: 2.4 },
  { k: 'older', label: 'Older adult (60+)', lo: 1.0, hi: 1.2 },
]

export default function ProteinCalculator() {
  const [weight, setWeight] = useState('70')
  const [level, setLevel] = useState('active')
  const [result, setResult] = useState(null)

  const calc = () => {
    const w = parseFloat(weight)
    if (!w) return
    const l = LEVELS.find(x => x.k === level)
    setResult({
      lo: Math.round(w * l.lo),
      hi: Math.round(w * l.hi),
      perKgLo: l.lo,
      perKgHi: l.hi,
      label: l.label,
    })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 shadow-md">
            <Beef className="h-4 w-4 text-white" />
          </div>
          Protein Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Weight (kg)</label>
          <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="h-11" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Activity level</label>
          <select value={level} onChange={e => setLevel(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {LEVELS.map(o => <option key={o.k} value={o.k}>{o.label}</option>)}
          </select>
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-rose-500 to-red-500 text-white">Calculate Protein</Button>
        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-xl p-4 text-center border border-rose-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Daily protein target</div>
              <div className="text-3xl font-black text-rose-600 tabular-nums">{result.lo}-{result.hi}g</div>
              <div className="text-xs text-muted-foreground mt-1">{result.label}</div>
            </div>
            <p className="text-[11px] text-muted-foreground text-center">Range based on {result.perKgLo}-{result.perKgHi} g per kg of body weight</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}