import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Activity, Copy, Check } from 'lucide-react'

const CATEGORIES = {
  male: [
    { max: 5,  label: 'Essential fat',  color: 'rose' },
    { max: 13, label: 'Athletic',       color: 'emerald' },
    { max: 17, label: 'Fitness',        color: 'emerald' },
    { max: 24, label: 'Average',        color: 'amber' },
    { max: 100, label: 'Obese',         color: 'rose' },
  ],
  female: [
    { max: 13, label: 'Essential fat',  color: 'rose' },
    { max: 20, label: 'Athletic',       color: 'emerald' },
    { max: 24, label: 'Fitness',        color: 'emerald' },
    { max: 31, label: 'Average',        color: 'amber' },
    { max: 100, label: 'Obese',         color: 'rose' },
  ],
}

export default function BodyFatCalculator() {
  const [units, setUnits] = useState('metric')
  const [gender, setGender] = useState('male')
  const [height, setHeight] = useState(175)          // cm
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)
  const [weight, setWeight] = useState(75)           // kg
  const [weightLbs, setWeightLbs] = useState(165)
  const [neck, setNeck] = useState(38)               // cm
  const [neckIn, setNeckIn] = useState(15)
  const [waist, setWaist] = useState(85)             // cm
  const [waistIn, setWaistIn] = useState(33.5)
  const [hip, setHip] = useState(95)                 // cm - female only
  const [hipIn, setHipIn] = useState(37.5)
  const [copied, setCopied] = useState(false)

  // Convert everything to cm for calculation
  const heightCm = units === 'metric' ? height : (heightFt * 12 + heightIn) * 2.54
  const neckCm = units === 'metric' ? neck : neckIn * 2.54
  const waistCm = units === 'metric' ? waist : waistIn * 2.54
  const hipCm = units === 'metric' ? hip : hipIn * 2.54
  const weightKg = units === 'metric' ? weight : weightLbs * 0.453592

  // US Navy method
  let bodyFat = null
  if (gender === 'male' && heightCm > 0 && neckCm > 0 && waistCm > 0 && waistCm > neckCm) {
    // male: 86.010*log10(waist-neck) - 70.041*log10(height) + 36.76
    bodyFat = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76
  } else if (gender === 'female' && heightCm > 0 && neckCm > 0 && waistCm > 0 && hipCm > 0 && (waistCm + hipCm) > neckCm) {
    // female: 163.205*log10(waist+hip-neck) - 97.684*log10(height) - 78.387
    bodyFat = 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387
  }

  if (bodyFat !== null) bodyFat = Math.max(2, Math.min(65, bodyFat))

  const fatMass = bodyFat !== null ? weightKg * (bodyFat / 100) : 0
  const leanMass = bodyFat !== null ? weightKg - fatMass : 0

  const category = bodyFat !== null ? CATEGORIES[gender].find(c => bodyFat <= c.max) : null

  const copyResults = () => {
    if (bodyFat === null) return
    const text = `Body Fat Calculator (US Navy method)\n\nGender: ${gender}\nBody fat: ${bodyFat.toFixed(1)}%\nCategory: ${category?.label}\nFat mass: ${fatMass.toFixed(1)} kg\nLean mass: ${leanMass.toFixed(1)} kg`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const metricInputs = (
    <>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Height (cm)</label>
        <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} min="120" max="230" />
      </div>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Weight (kg)</label>
        <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value) || 0)} min="30" max="250" step="0.1" />
      </div>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Neck circumference (cm)</label>
        <Input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value) || 0)} min="20" max="60" step="0.1" />
      </div>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Waist circumference (cm)</label>
        <Input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value) || 0)} min="40" max="180" step="0.1" />
      </div>
      {gender === 'female' && (
        <div>
          <label className="text-xs font-bold mb-1.5 block">Hip circumference (cm)</label>
          <Input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value) || 0)} min="50" max="180" step="0.1" />
        </div>
      )}
    </>
  )

  const imperialInputs = (
    <>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Height (ft / in)</label>
        <div className="flex gap-2">
          <Input type="number" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value) || 0)} min="4" max="7" placeholder="ft" />
          <Input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value) || 0)} min="0" max="11" placeholder="in" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Weight (lbs)</label>
        <Input type="number" value={weightLbs} onChange={(e) => setWeightLbs(Number(e.target.value) || 0)} min="66" max="550" step="0.5" />
      </div>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Neck circumference (in)</label>
        <Input type="number" value={neckIn} onChange={(e) => setNeckIn(Number(e.target.value) || 0)} min="8" max="24" step="0.1" />
      </div>
      <div>
        <label className="text-xs font-bold mb-1.5 block">Waist circumference (in)</label>
        <Input type="number" value={waistIn} onChange={(e) => setWaistIn(Number(e.target.value) || 0)} min="16" max="70" step="0.1" />
      </div>
      {gender === 'female' && (
        <div>
          <label className="text-xs font-bold mb-1.5 block">Hip circumference (in)</label>
          <Input type="number" value={hipIn} onChange={(e) => setHipIn(Number(e.target.value) || 0)} min="20" max="70" step="0.1" />
        </div>
      )}
    </>
  )

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-md">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Body Fat Calculator</h2>
            <p className="text-xs text-muted-foreground">US Navy method - most accurate without calipers</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setUnits('metric')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'metric' ? 'bg-rose-500 text-white' : 'bg-muted hover:bg-muted/70')}>Metric</button>
          <button onClick={() => setUnits('imperial')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'imperial' ? 'bg-rose-500 text-white' : 'bg-muted hover:bg-muted/70')}>Imperial</button>
        </div>

        <div className="mb-4">
          <label className="text-xs font-bold mb-1.5 block">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {units === 'metric' ? metricInputs : imperialInputs}
        </div>

        {bodyFat !== null ? (
          <>
            <div className="rounded-xl border-2 border-rose-500/30 bg-rose-500/5 p-6 mb-4 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Your body fat percentage</div>
              <div className="text-4xl md:text-5xl font-black text-rose-600 dark:text-rose-400 mb-2">
                {bodyFat.toFixed(1)}<span className="text-xl">%</span>
              </div>
              {category && (
                <div className={'inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-' + category.color + '-500/10 text-' + category.color + '-600 dark:text-' + category.color + '-400 border border-' + category.color + '-500/30'}>
                  {category.label}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Fat mass</div>
                <div className="text-lg font-black">{fatMass.toFixed(1)} <span className="text-xs">kg</span></div>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Lean mass</div>
                <div className="text-lg font-black">{leanMass.toFixed(1)} <span className="text-xs">kg</span></div>
              </div>
            </div>

            <Button onClick={copyResults} variant="outline" className="w-full">
              {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
            </Button>
          </>
        ) : (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
            Enter your measurements to calculate. For the US Navy formula to work, waist must be larger than neck.
          </div>
        )}
      </CardContent>
    </Card>
  )
}