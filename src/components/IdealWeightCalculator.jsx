import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Scale, Copy, Check } from 'lucide-react'

export default function IdealWeightCalculator() {
  const [units, setUnits] = useState('metric')
  const [gender, setGender] = useState('male')
  const [heightCm, setHeightCm] = useState(175)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)
  const [copied, setCopied] = useState(false)

  const cm = units === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54
  const inchesOver5ft = Math.max(0, cm / 2.54 - 60)

  // Clinical formulas (kg)
  const devine   = gender === 'male' ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft
  const robinson = gender === 'male' ? 52 + 1.9 * inchesOver5ft : 49 + 1.7 * inchesOver5ft
  const miller   = gender === 'male' ? 56.2 + 1.41 * inchesOver5ft : 53.1 + 1.36 * inchesOver5ft
  const hamwi    = gender === 'male' ? 48.0 + 2.7 * inchesOver5ft : 45.5 + 2.2 * inchesOver5ft

  // Healthy BMI range (18.5-24.9)
  const m = cm / 100
  const bmiMin = 18.5 * m * m
  const bmiMax = 24.9 * m * m

  const kgToLbs = (kg) => kg * 2.20462
  const fmt = (kg) => units === 'metric' ? kg.toFixed(1) + ' kg' : kgToLbs(kg).toFixed(1) + ' lbs'

  const copyResults = () => {
    const text = `Ideal Weight Calculator\n\nHeight: ${cm.toFixed(0)} cm\nGender: ${gender}\n\nDevine: ${fmt(devine)}\nRobinson: ${fmt(robinson)}\nMiller: ${fmt(miller)}\nHamwi: ${fmt(hamwi)}\nHealthy BMI range: ${fmt(bmiMin)} to ${fmt(bmiMax)}`
    navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Ideal Weight Calculator</h2>
            <p className="text-xs text-muted-foreground">4 clinical formulas + healthy BMI range</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setUnits('metric')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'metric' ? 'bg-amber-500 text-white' : 'bg-muted hover:bg-muted/70')}>Metric</button>
          <button onClick={() => setUnits('imperial')} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (units === 'imperial' ? 'bg-amber-500 text-white' : 'bg-muted hover:bg-muted/70')}>Imperial</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold mb-1.5 block">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {units === 'metric' ? (
            <div>
              <label className="text-xs font-bold mb-1.5 block">Height (cm)</label>
              <Input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value) || 0)} min="120" max="230" />
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold mb-1.5 block">Height (ft / in)</label>
              <div className="flex gap-2">
                <Input type="number" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value) || 0)} min="4" max="7" placeholder="ft" />
                <Input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value) || 0)} min="0" max="11" placeholder="in" />
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Devine (1974)</div>
            <div className="text-lg md:text-xl font-black text-amber-600 dark:text-amber-400">{fmt(devine)}</div>
            <div className="text-[10px] text-muted-foreground mt-1">Most widely used for drug dosing</div>
          </div>
          <div className="rounded-xl border-2 border-orange-500/30 bg-orange-500/5 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Robinson (1983)</div>
            <div className="text-lg md:text-xl font-black text-orange-600 dark:text-orange-400">{fmt(robinson)}</div>
            <div className="text-[10px] text-muted-foreground mt-1">Modified for modern populations</div>
          </div>
          <div className="rounded-xl border-2 border-rose-500/30 bg-rose-500/5 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Miller (1983)</div>
            <div className="text-lg md:text-xl font-black text-rose-600 dark:text-rose-400">{fmt(miller)}</div>
            <div className="text-[10px] text-muted-foreground mt-1">Linear approximation</div>
          </div>
          <div className="rounded-xl border-2 border-pink-500/30 bg-pink-500/5 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Hamwi (1964)</div>
            <div className="text-lg md:text-xl font-black text-pink-600 dark:text-pink-400">{fmt(hamwi)}</div>
            <div className="text-[10px] text-muted-foreground mt-1">Oldest of the four</div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5 mb-6">
          <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Healthy BMI range (18.5 - 24.9)</div>
          <div className="text-lg md:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {fmt(bmiMin)} <span className="text-sm text-muted-foreground font-normal">to</span> {fmt(bmiMax)}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Based on your height - the most reliable target range</div>
        </div>

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}