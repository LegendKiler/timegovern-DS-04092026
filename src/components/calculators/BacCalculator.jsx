import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wine } from "lucide-react"

export default function BacCalculator() {
  const [sex, setSex] = useState('male')
  const [weight, setWeight] = useState('70')
  const [drinks, setDrinks] = useState('2')
  const [oz, setOz] = useState('12')
  const [abv, setAbv] = useState('5')
  const [hours, setHours] = useState('2')
  const [result, setResult] = useState(null)

  const calc = () => {
    const w = parseFloat(weight)
    const n = parseFloat(drinks)
    const o = parseFloat(oz)
    const a = parseFloat(abv)
    const h = parseFloat(hours)
    if (!w || !n || !o || !a) return
    // Widmark formula: BAC% = (A*5.14 / (W*r)) - 0.015*H
    // A = alcohol in grams; 1 oz liquid at ABV% → grams = oz * ABV/100 * 29.5735 * 0.789
    const alcoholG = n * o * (a/100) * 29.5735 * 0.789
    const r = sex === 'male' ? 0.68 : 0.55
    const wLb = w * 2.20462
    let bac = (alcoholG * 100) / (wLb * r * 454) * 1000 // g → per lb
    // Simpler: Widmark in standard form using grams & lb
    bac = (alcoholG / (wLb * r)) * 100
    bac = bac - 0.015 * h
    if (bac < 0) bac = 0
    setResult({
      bac: bac.toFixed(3),
      soberHours: bac > 0 ? (bac / 0.015).toFixed(1) : '0',
      legal08: bac >= 0.08,
      legal05: bac >= 0.05,
      alcoholG: Math.round(alcoholG),
    })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md">
            <Wine className="h-4 w-4 text-white" />
          </div>
          BAC Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Sex</label>
            <select value={sex} onChange={e => setSex(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Weight (kg)</label>
            <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Drinks</label>
            <Input type="number" value={drinks} onChange={e => setDrinks(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Vol (oz)</label>
            <Input type="number" value={oz} onChange={e => setOz(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">ABV (%)</label>
            <Input type="number" value={abv} onChange={e => setAbv(e.target.value)} className="h-11" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Hours since first drink</label>
          <Input type="number" value={hours} onChange={e => setHours(e.target.value)} className="h-11" />
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">Calculate BAC</Button>
        {result && (
          <div className="space-y-2">
            <div className={`rounded-xl p-4 text-center border ${result.legal08 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Estimated BAC</div>
              <div className={`text-3xl font-black tabular-nums ${result.legal08 ? 'text-red-600' : 'text-emerald-600'}`}>{result.bac}%</div>
              <div className="text-xs text-muted-foreground mt-1">{result.alcoholG}g pure alcohol consumed</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Sober in</div><div className="font-bold tabular-nums">{result.soberHours}h</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Over 0.08?</div><div className="font-bold tabular-nums">{result.legal08 ? 'Yes' : 'No'}</div></div>
            </div>
            <p className="text-[11px] text-red-500 font-semibold text-center mt-2">Do not drive after drinking. This is an estimate only - never use it to decide if you can drive.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}