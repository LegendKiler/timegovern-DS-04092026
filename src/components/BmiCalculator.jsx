import { useState, useMemo } from 'react'
import { Activity, Scale, Ruler, Heart, Copy, Check, Info, Target, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const CATEGORIES = [
  { id: 'under',    label: 'Underweight', range: '< 18.5',    color: 'sky',     bg: 'bg-sky-500',     badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',         msg: 'Below healthy range. Consider speaking to a healthcare professional about healthy weight gain.' },
  { id: 'normal',   label: 'Normal',      range: '18.5 - 24.9', color: 'emerald', bg: 'bg-emerald-500', badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30', msg: 'Your weight is in the healthy range. Keep up your current habits.' },
  { id: 'over',     label: 'Overweight',  range: '25 - 29.9',  color: 'yellow',  bg: 'bg-yellow-500',  badge: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30',   msg: 'Above healthy range. Small sustained changes to diet and activity can help.' },
  { id: 'obese1',   label: 'Obese (Class I)',   range: '30 - 34.9', color: 'orange', bg: 'bg-orange-500', badge: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30', msg: 'Higher health risk. Speak to a doctor about a personalised plan.' },
  { id: 'obese2',   label: 'Obese (Class II)',  range: '35 - 39.9', color: 'red',    bg: 'bg-red-500',    badge: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30',             msg: 'Significant health risk. Medical guidance is recommended.' },
  { id: 'obese3',   label: 'Obese (Class III)', range: '>= 40',     color: 'rose',   bg: 'bg-rose-600',   badge: 'bg-rose-600/15 text-rose-700 dark:text-rose-300 border-rose-600/30',         msg: 'Very high health risk. Please consult a healthcare professional.' },
]

function classify(bmi) {
  if (bmi < 18.5) return CATEGORIES[0]
  if (bmi < 25) return CATEGORIES[1]
  if (bmi < 30) return CATEGORIES[2]
  if (bmi < 35) return CATEGORIES[3]
  if (bmi < 40) return CATEGORIES[4]
  return CATEGORIES[5]
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState('metric')
  // Metric
  const [kg, setKg] = useState(70)
  const [cm, setCm] = useState(175)
  // Imperial
  const [lb, setLb] = useState(154)
  const [ft, setFt] = useState(5)
  const [inch, setInch] = useState(9)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    let weightKg, heightM
    if (unit === 'metric') {
      weightKg = kg
      heightM = cm / 100
    } else {
      weightKg = lb * 0.453592
      heightM = (ft * 12 + inch) * 0.0254
    }
    if (!heightM || !weightKg) return null
    const bmi = weightKg / (heightM * heightM)
    const cat = classify(bmi)
    // Healthy weight range for this height (BMI 18.5 - 24.9)
    const minHealthyKg = 18.5 * heightM * heightM
    const maxHealthyKg = 24.9 * heightM * heightM
    let healthyRange
    if (unit === 'metric') {
      healthyRange = minHealthyKg.toFixed(1) + ' - ' + maxHealthyKg.toFixed(1) + ' kg'
    } else {
      const minLb = minHealthyKg / 0.453592
      const maxLb = maxHealthyKg / 0.453592
      healthyRange = minLb.toFixed(0) + ' - ' + maxLb.toFixed(0) + ' lb'
    }
    return { bmi, cat, healthyRange, weightKg, heightM }
  }, [unit, kg, cm, lb, ft, inch])

  const copyStats = async () => {
    if (!result) return
    const s = 'BMI: ' + result.bmi.toFixed(1) + '\nCategory: ' + result.cat.label + '\nHealthy range: ' + result.healthyRange
    try { await navigator.clipboard.writeText(s); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch (e) {}
  }

  const bmiValue = result ? result.bmi : 0
  const barPercent = Math.max(0, Math.min(100, ((bmiValue - 15) / 30) * 100))

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5 md:p-6 space-y-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Units</div>
            <div className="flex gap-2">
              <button onClick={() => setUnit('metric')} className={'flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ' + (unit === 'metric' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>Metric (kg / cm)</button>
              <button onClick={() => setUnit('imperial')} className={'flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ' + (unit === 'imperial' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>Imperial (lb / ft)</button>
            </div>
          </div>

          {unit === 'metric' ? (
            <>
              <label className="block">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Scale className="h-3 w-3" /> Weight (kg)</div>
                <input type="number" value={kg} min="1" max="500" step="0.1" onChange={e => setKg(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-base font-bold tabular-nums" />
              </label>
              <label className="block">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Ruler className="h-3 w-3" /> Height (cm)</div>
                <input type="number" value={cm} min="50" max="250" step="0.1" onChange={e => setCm(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-base font-bold tabular-nums" />
              </label>
            </>
          ) : (
            <>
              <label className="block">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Scale className="h-3 w-3" /> Weight (lb)</div>
                <input type="number" value={lb} min="1" max="1000" step="0.1" onChange={e => setLb(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-base font-bold tabular-nums" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Ruler className="h-3 w-3" /> Height (ft)</div>
                  <input type="number" value={ft} min="1" max="8" onChange={e => setFt(parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-base font-bold tabular-nums" />
                </label>
                <label className="block">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Height (in)</div>
                  <input type="number" value={inch} min="0" max="11" onChange={e => setInch(parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-base font-bold tabular-nums" />
                </label>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {result && (
        <>
          <Card className="overflow-hidden">
            <div className={'h-1.5 ' + result.cat.bg} />
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your BMI</div>
              <div className="text-6xl md:text-7xl font-black tracking-tight tabular-nums">{result.bmi.toFixed(1)}</div>
              <div className={'inline-block px-4 py-1.5 rounded-full text-xs font-bold border ' + result.cat.badge}>
                {result.cat.label}
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">{result.cat.msg}</p>
              <button onClick={copyStats} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted hover:bg-muted/70 text-xs font-bold transition-colors">
                {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy result</>}
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">BMI scale</div>
              <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-sky-500 via-emerald-500 via-yellow-500 via-orange-500 via-red-500 to-rose-600">
                <div className="absolute top-[-4px] w-1 h-5 bg-foreground rounded-full shadow-lg" style={{ left: 'calc(' + barPercent + '% - 2px)' }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
                <span>45</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="border-emerald-500/30">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <Target className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Healthy weight for your height</div>
                  <div className="text-lg font-black">{result.healthyRange}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-indigo-500/30">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your measurements</div>
                  <div className="text-lg font-black">{result.weightKg.toFixed(1)} kg, {result.heightM.toFixed(2)} m</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" /> All BMI categories
              </div>
              <div className="space-y-2">
                {CATEGORIES.map(cat => {
                  const active = cat.id === result.cat.id
                  return (
                    <div key={cat.id} className={'flex items-center justify-between gap-2 px-3 py-2 rounded-lg ' + (active ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-muted/40')}>
                      <div className="flex items-center gap-2">
                        <div className={'w-2.5 h-2.5 rounded-full ' + cat.bg} />
                        <span className="text-xs font-bold">{cat.label}</span>
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground tabular-nums">{cat.range}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>BMI is a screening tool, not a diagnosis. It does not account for muscle mass, body composition, age, sex, or ethnicity. Athletes and muscular people may have a high BMI without excess fat. Consult a healthcare professional for a full assessment.</span>
      </div>
    </div>
  )
}