import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Flame, Copy, Check } from 'lucide-react'

const ACTIVITY = [
  { key: 'sedentary',  label: 'Sedentary',         desc: 'Little or no exercise',           factor: 1.2 },
  { key: 'light',      label: 'Lightly active',    desc: '1-3 days/week exercise',          factor: 1.375 },
  { key: 'moderate',   label: 'Moderately active', desc: '3-5 days/week exercise',          factor: 1.55 },
  { key: 'very',       label: 'Very active',       desc: '6-7 days/week exercise',          factor: 1.725 },
  { key: 'extreme',    label: 'Extremely active',  desc: 'Physical job + 2x training/day',  factor: 1.9 },
]

export default function CalorieCalculator() {
  const [units, setUnits] = useState('metric')
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState(30)
  const [weight, setWeight] = useState(75)
  const [height, setHeight] = useState(175)
  const [weightLbs, setWeightLbs] = useState(165)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)
  const [activity, setActivity] = useState('moderate')
  const [copied, setCopied] = useState(false)

  // Compute in metric internally
  const kg = units === 'metric' ? weight : weightLbs * 0.453592
  const cm = units === 'metric' ? height : (heightFt * 12 + heightIn) * 2.54

  // Mifflin-St Jeor
  const bmr = gender === 'male'
    ? 10 * kg + 6.25 * cm - 5 * age + 5
    : 10 * kg + 6.25 * cm - 5 * age - 161

  const factor = ACTIVITY.find(a => a.key === activity)?.factor || 1.2
  const tdee = bmr * factor

  const cut = Math.max(1200, tdee - 500)
  const mildCut = Math.max(1200, tdee - 250)
  const bulk = tdee + 300

  const results = [
    { label: 'BMR', sub: 'At rest',                  value: Math.round(bmr),  color: 'slate',   note: 'Basal Metabolic Rate - what you burn doing nothing.' },
    { label: 'TDEE', sub: 'Maintenance',             value: Math.round(tdee), color: 'emerald', note: 'Total Daily Energy Expenditure - your daily burn.' },
    { label: 'Cut', sub: 'Lose ~0.5kg/week',         value: Math.round(cut),  color: 'rose',    note: '500 kcal deficit per day.' },
    { label: 'Mild cut', sub: 'Lose ~0.25kg/week',   value: Math.round(mildCut), color: 'amber', note: '250 kcal deficit - easier to sustain.' },
    { label: 'Bulk', sub: 'Lean muscle gain',        value: Math.round(bulk), color: 'blue',    note: '300 kcal surplus - minimal fat gain.' },
  ]

  const copyResults = () => {
    const text = `Calorie / TDEE Calculator\n\nAge: ${age}\nGender: ${gender}\nWeight: ${kg.toFixed(1)} kg\nHeight: ${cm.toFixed(0)} cm\nActivity: ${activity}\n\nBMR: ${Math.round(bmr)} kcal/day\nTDEE (maintenance): ${Math.round(tdee)} kcal/day\nLose ~0.5kg/week: ${Math.round(cut)} kcal/day\nLose ~0.25kg/week: ${Math.round(mildCut)} kcal/day\nLean bulk: ${Math.round(bulk)} kcal/day`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Calorie & TDEE Calculator</h2>
            <p className="text-xs text-muted-foreground">Mifflin-St Jeor equation - the modern clinical standard</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setUnits('metric')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'metric' ? 'bg-emerald-500 text-white' : 'bg-muted hover:bg-muted/70')}>Metric</button>
          <button onClick={() => setUnits('imperial')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'imperial' ? 'bg-emerald-500 text-white' : 'bg-muted hover:bg-muted/70')}>Imperial</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-bold mb-1.5 block">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Age</label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 0)} min="15" max="100" />
          </div>
          {units === 'metric' ? (
            <>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Weight (kg)</label>
                <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value) || 0)} min="30" max="250" step="0.1" />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Height (cm)</label>
                <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} min="120" max="230" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Weight (lbs)</label>
                <Input type="number" value={weightLbs} onChange={(e) => setWeightLbs(Number(e.target.value) || 0)} min="66" max="550" step="0.5" />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Height (ft / in)</label>
                <div className="flex gap-2">
                  <Input type="number" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value) || 0)} min="4" max="7" placeholder="ft" />
                  <Input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value) || 0)} min="0" max="11" placeholder="in" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mb-6">
          <label className="text-xs font-bold mb-1.5 block">Activity level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
            {ACTIVITY.map(a => (
              <option key={a.key} value={a.key}>{a.label} - {a.desc} ({a.factor}x)</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {results.map((r) => (
            <div key={r.label} className={'rounded-xl border-2 p-4 bg-' + r.color + '-500/5 border-' + r.color + '-500/30'}>
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">{r.label}</div>
              <div className={'text-xl md:text-2xl font-black text-' + r.color + '-600 dark:text-' + r.color + '-400'}>{r.value} <span className="text-xs">kcal</span></div>
              <div className="text-[10px] text-muted-foreground mt-1">{r.sub}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-muted/50 p-4 text-xs text-muted-foreground mb-6">
          <strong className="text-foreground">Formula used:</strong> Mifflin-St Jeor equation - the most accurate BMR predictor for the general population, as recommended by the Academy of Nutrition and Dietetics.
        </div>

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}