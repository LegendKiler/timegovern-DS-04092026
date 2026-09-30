import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Droplets, Copy, Check, Coffee, Activity, Sun } from 'lucide-react'

const ACTIVITY_LEVELS = [
  { key: 'sedentary',  label: 'Sedentary',       desc: 'Little or no exercise',       add: 0 },
  { key: 'light',      label: 'Light exercise',  desc: '1-3 days/week',               add: 0.35 },
  { key: 'moderate',   label: 'Moderate',        desc: '3-5 days/week',               add: 0.5 },
  { key: 'intense',    label: 'Intense',         desc: '6-7 days/week',               add: 0.7 },
]

const CLIMATES = [
  { key: 'temperate', label: 'Temperate (15-25°C)',  add: 0 },
  { key: 'hot',       label: 'Hot (25-32°C)',        add: 0.5 },
  { key: 'very-hot',  label: 'Very hot (32°C+)',     add: 1.0 },
  { key: 'cold',      label: 'Cold (<15°C)',         add: 0 },
]

export default function WaterIntakeCalculator() {
  const [units, setUnits] = useState('metric')
  const [weight, setWeight] = useState(75)
  const [weightLbs, setWeightLbs] = useState(165)
  const [activity, setActivity] = useState('moderate')
  const [climate, setClimate] = useState('temperate')
  const [pregnant, setPregnant] = useState(false)
  const [breastfeeding, setBreastfeeding] = useState(false)
  const [copied, setCopied] = useState(false)

  const kg = units === 'metric' ? weight : weightLbs * 0.453592
  const activityAdd = ACTIVITY_LEVELS.find(a => a.key === activity)?.add || 0
  const climateAdd = CLIMATES.find(c => c.key === climate)?.add || 0

  // Base: ~35 ml per kg (standard guideline). Common formula.
  let litres = (kg * 35) / 1000
  // Convert to glasses (250ml) for easier reading
  // Add activity (in litres) and climate adjustments
  litres += activityAdd + climateAdd
  // Pregnancy / breastfeeding additions per EFSA/NASEM
  if (pregnant) litres += 0.3
  if (breastfeeding) litres += 0.7

  // Clamp to safe range
  litres = Math.max(1.5, Math.min(6.0, litres))

  const cups = Math.round(litres * 4)   // 250ml cups
  const glasses8oz = Math.round(litres * 4.227) // 8 oz = 237ml
  const flOz = Math.round(litres * 33.814)
  const bottles = (litres / 0.5).toFixed(1)  // 500ml bottles

  const copyResults = () => {
    const text = `Water Intake Calculator\n\nWeight: ${kg.toFixed(1)} kg\nActivity: ${activity}\nClimate: ${climate}\n\nRecommended daily intake: ${litres.toFixed(2)} L\nThat is about ${cups} x 250ml glasses\nOr ${bottles} x 500ml bottles\nOr ${flOz} fl oz`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Water Intake Calculator</h2>
            <p className="text-xs text-muted-foreground">Personalised daily hydration target</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setUnits('metric')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'metric' ? 'bg-sky-500 text-white' : 'bg-muted hover:bg-muted/70')}>Metric (kg)</button>
          <button onClick={() => setUnits('imperial')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'imperial' ? 'bg-sky-500 text-white' : 'bg-muted hover:bg-muted/70')}>Imperial (lbs)</button>
        </div>

        <div className="mb-4">
          <label className="text-xs font-bold mb-1.5 block">Body weight ({units === 'metric' ? 'kg' : 'lbs'})</label>
          {units === 'metric' ? (
            <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value) || 0)} min="30" max="250" step="0.1" />
          ) : (
            <Input type="number" value={weightLbs} onChange={(e) => setWeightLbs(Number(e.target.value) || 0)} min="66" max="550" step="0.5" />
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-bold mb-1.5 flex items-center gap-1"><Activity className="h-3.5 w-3.5" /> Exercise level</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
              {ACTIVITY_LEVELS.map(a => (<option key={a.key} value={a.key}>{a.label} - {a.desc}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 flex items-center gap-1"><Sun className="h-3.5 w-3.5" /> Climate</label>
            <select value={climate} onChange={(e) => setClimate(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
              {CLIMATES.map(c => (<option key={c.key} value={c.key}>{c.label}</option>))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border cursor-pointer hover:border-sky-400 transition">
            <input type="checkbox" checked={pregnant} onChange={(e) => { setPregnant(e.target.checked); if (e.target.checked) setBreastfeeding(false) }} className="accent-sky-500" />
            <span className="text-sm font-semibold">Pregnant</span>
          </label>
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border cursor-pointer hover:border-sky-400 transition">
            <input type="checkbox" checked={breastfeeding} onChange={(e) => { setBreastfeeding(e.target.checked); if (e.target.checked) setPregnant(false) }} className="accent-sky-500" />
            <span className="text-sm font-semibold">Breastfeeding</span>
          </label>
        </div>

        <div className="rounded-xl border-2 border-sky-500/30 bg-sky-500/5 p-6 mb-4 text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Your daily water target</div>
          <div className="text-4xl md:text-5xl font-black text-sky-600 dark:text-sky-400 mb-2">
            {litres.toFixed(2)} <span className="text-xl">L</span>
          </div>
          <div className="text-sm text-muted-foreground">
            About <strong>{cups} x 250ml glasses</strong> · {bottles} x 500ml bottles · {flOz} fl oz
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl border border-border p-3 text-center">
            <Coffee className="h-4 w-4 text-sky-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Glasses (250ml)</div>
            <div className="text-lg font-black">{cups}</div>
          </div>
          <div className="rounded-xl border border-border p-3 text-center">
            <Droplets className="h-4 w-4 text-cyan-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Bottles (500ml)</div>
            <div className="text-lg font-black">{bottles}</div>
          </div>
          <div className="rounded-xl border border-border p-3 text-center">
            <Droplets className="h-4 w-4 text-teal-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Fluid ounces</div>
            <div className="text-lg font-black">{flOz}</div>
          </div>
        </div>

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}