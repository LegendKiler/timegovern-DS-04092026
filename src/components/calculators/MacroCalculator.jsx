import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Utensils } from "lucide-react"

const ACTIVITY = [
  { k: 'sed', label: 'Sedentary (little exercise)', mult: 1.2 },
  { k: 'light', label: 'Light (1-3 days/week)', mult: 1.375 },
  { k: 'mod', label: 'Moderate (3-5 days/week)', mult: 1.55 },
  { k: 'high', label: 'High (6-7 days/week)', mult: 1.725 },
  { k: 'athlete', label: 'Athlete (2x/day)', mult: 1.9 },
]
const GOALS = [
  { k: 'cut', label: 'Cut (-20% calories)' },
  { k: 'maintain', label: 'Maintain' },
  { k: 'bulk', label: 'Bulk (+15% calories)' },
]

export default function MacroCalculator() {
  const [sex, setSex] = useState('male')
  const [weight, setWeight] = useState('70')
  const [height, setHeight] = useState('175')
  const [age, setAge] = useState('30')
  const [activity, setActivity] = useState('mod')
  const [goal, setGoal] = useState('maintain')
  const [result, setResult] = useState(null)

  const calc = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age)
    if (!w || !h || !a) return
    const bmr = sex === 'male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161
    const mult = ACTIVITY.find(x => x.k === activity).mult
    let cal = bmr * mult
    if (goal === 'cut') cal *= 0.8
    if (goal === 'bulk') cal *= 1.15
    cal = Math.round(cal)
    const proteinPct = goal === 'cut' ? 0.35 : goal === 'bulk' ? 0.25 : 0.30
    const fatPct = 0.25
    const carbPct = 1 - proteinPct - fatPct
    const proteinG = Math.round(cal * proteinPct / 4)
    const fatG = Math.round(cal * fatPct / 9)
    const carbG = Math.round(cal * carbPct / 4)
    setResult({ cal, proteinG, fatG, carbG, proteinPct, fatPct, carbPct, bmr: Math.round(bmr) })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md">
            <Utensils className="h-4 w-4 text-white" />
          </div>
          Macro Calculator
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
          <label className="text-sm font-semibold mb-1.5 block">Activity</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {ACTIVITY.map(o => <option key={o.k} value={o.k}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {GOALS.map(o => <option key={o.k} value={o.k}>{o.label}</option>)}
          </select>
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">Calculate Macros</Button>
        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-xl p-4 text-center border border-violet-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Daily calories</div>
              <div className="text-3xl font-black text-violet-600 tabular-nums">{result.cal}</div>
              <div className="text-xs text-muted-foreground mt-1">BMR: {result.bmr} kcal</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Protein</div><div className="font-bold tabular-nums">{result.proteinG}g</div><div className="text-[10px] text-muted-foreground">{Math.round(result.proteinPct*100)}%</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Fat</div><div className="font-bold tabular-nums">{result.fatG}g</div><div className="text-[10px] text-muted-foreground">{Math.round(result.fatPct*100)}%</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Carbs</div><div className="font-bold tabular-nums">{result.carbG}g</div><div className="text-[10px] text-muted-foreground">{Math.round(result.carbPct*100)}%</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}