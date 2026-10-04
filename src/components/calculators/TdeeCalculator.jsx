import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"

const ACTIVITY = [
  { k: 'sed', label: 'Sedentary', mult: 1.2, desc: 'Desk job, little exercise' },
  { k: 'light', label: 'Light', mult: 1.375, desc: '1-3 workouts/week' },
  { k: 'mod', label: 'Moderate', mult: 1.55, desc: '3-5 workouts/week' },
  { k: 'high', label: 'High', mult: 1.725, desc: '6-7 workouts/week' },
  { k: 'athlete', label: 'Athlete', mult: 1.9, desc: '2x/day training' },
]

export default function TdeeCalculator() {
  const [sex, setSex] = useState('male')
  const [weight, setWeight] = useState('70')
  const [height, setHeight] = useState('175')
  const [age, setAge] = useState('30')
  const [activity, setActivity] = useState('mod')
  const [result, setResult] = useState(null)

  const calc = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age)
    if (!w || !h || !a) return
    const bmr = sex === 'male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161
    const mult = ACTIVITY.find(x => x.k === activity).mult
    const tdee = Math.round(bmr * mult)
    setResult({
      bmr: Math.round(bmr),
      tdee,
      cut: Math.round(tdee * 0.8),
      cutAggressive: Math.round(tdee * 0.75),
      bulk: Math.round(tdee * 1.1),
      bulkAggressive: Math.round(tdee * 1.15),
    })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
            <Flame className="h-4 w-4 text-white" />
          </div>
          TDEE Calculator
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
            <label className="text-sm font-semibold mb-1.5 block">Age</label>
            <Input type="number" value={age} onChange={e => setAge(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Weight (kg)</label>
            <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Height (cm)</label>
            <Input type="number" value={height} onChange={e => setHeight(e.target.value)} className="h-11" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Activity level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {ACTIVITY.map(o => <option key={o.k} value={o.k}>{o.label} - {o.desc}</option>)}
          </select>
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-orange-500 to-red-500 text-white">Calculate TDEE</Button>
        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 text-center border border-orange-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Maintenance calories (TDEE)</div>
              <div className="text-3xl font-black text-orange-600 tabular-nums">{result.tdee}</div>
              <div className="text-xs text-muted-foreground mt-1">BMR: {result.bmr} kcal/day</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Cut (-20%)</div><div className="font-bold tabular-nums">{result.cut}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Cut (-25%)</div><div className="font-bold tabular-nums">{result.cutAggressive}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Bulk (+10%)</div><div className="font-bold tabular-nums">{result.bulk}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Bulk (+15%)</div><div className="font-bold tabular-nums">{result.bulkAggressive}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}