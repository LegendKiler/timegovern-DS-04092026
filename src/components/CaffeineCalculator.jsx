import { useState, useMemo, useEffect } from 'react'
import { Coffee, Moon, Shield, Clock, Zap } from 'lucide-react'
import ShareButtons from './ShareButtons'
import SaveCalculation from './SaveCalculation'
import { Card, CardContent } from '@/components/ui/card'

const STORAGE_KEY = 'tg_caffeine_v1'
const SAFE_MG = 30

const PRESETS = [
  { id: 'espresso', label: 'Espresso',     sub: '30ml shot',   mg: 63 },
  { id: 'coffee',   label: 'Coffee',       sub: '240ml cup',   mg: 95 },
  { id: 'latte',    label: 'Latte',        sub: 'small',       mg: 63 },
  { id: 'tea',      label: 'Black Tea',    sub: '240ml',       mg: 47 },
  { id: 'green',    label: 'Green Tea',    sub: '240ml',       mg: 28 },
  { id: 'cola',     label: 'Cola',         sub: '355ml can',   mg: 34 },
  { id: 'energy',   label: 'Energy Drink', sub: '250ml',       mg: 80 },
  { id: 'custom',   label: 'Custom',       sub: 'enter mg',    mg: 100 },
]

const SENSITIVITY = [
  { id: 'low',    label: 'Low',    half: 7, desc: 'Slow metabolism' },
  { id: 'normal', label: 'Normal', half: 5, desc: 'Typical adult' },
  { id: 'high',   label: 'High',   half: 3, desc: 'Fast metabolism' },
]

function timeStrToDec(str) {
  if (!str) return 0
  const parts = str.split(':')
  return Number(parts[0]) + Number(parts[1] || 0) / 60
}

function decToDisplay(dec) {
  const total = ((Math.round(dec * 60) % 1440) + 1440) % 1440
  const h = Math.floor(total / 60)
  const m = total % 60
  const ap = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return h12 + ':' + String(m).padStart(2, '0') + ' ' + ap
}

function remainingMg(dose, halfLife, hoursElapsed) {
  return dose * Math.pow(0.5, hoursElapsed / halfLife)
}

function hoursToReach(dose, halfLife, targetMg) {
  if (dose <= targetMg) return 0
  return halfLife * (Math.log(dose / targetMg) / Math.log(2))
}

function disruption(mg) {
  if (mg < 30)  return { label: 'Minimal',     color: 'emerald', msg: 'Unlikely to affect sleep. Sweet dreams.' }
  if (mg < 60)  return { label: 'Mild',        color: 'yellow',  msg: 'May delay sleep onset by 15-30 minutes.' }
  if (mg < 100) return { label: 'Moderate',    color: 'orange',  msg: 'Likely to reduce deep sleep quality tonight.' }
  return              { label: 'Significant', color: 'red',     msg: 'High chance of disrupted sleep and delayed onset.' }
}

export default function CaffeineCalculator() {
  const [presetId, setPresetId] = useState('coffee')
  const [dose, setDose] = useState(95)
  const [drinkTime, setDrinkTime] = useState('14:00')
  const [bedtime, setBedtime] = useState('23:00')
  const [sensitivity, setSensitivity] = useState('normal')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const d = JSON.parse(raw)
      if (d.presetId) setPresetId(d.presetId)
      if (typeof d.dose === 'number') setDose(d.dose)
      if (d.drinkTime) setDrinkTime(d.drinkTime)
      if (d.bedtime) setBedtime(d.bedtime)
      if (d.sensitivity) setSensitivity(d.sensitivity)
    } catch (e) {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ presetId, dose, drinkTime, bedtime, sensitivity })) } catch (e) {}
  }, [presetId, dose, drinkTime, bedtime, sensitivity])

  const pickPreset = (id) => {
    setPresetId(id)
    const p = PRESETS.find(x => x.id === id)
    if (p && id !== 'custom') setDose(p.mg)
  }

  const halfLife = (SENSITIVITY.find(s => s.id === sensitivity) || SENSITIVITY[1]).half

  const calc = useMemo(() => {
    const drinkDec = timeStrToDec(drinkTime)
    const bedDec = timeStrToDec(bedtime)

    let hoursToBed = bedDec - drinkDec
    if (hoursToBed < 0) hoursToBed += 24

    const atBedtime = remainingMg(dose, halfLife, hoursToBed)
    const hoursNeeded = hoursToReach(dose, halfLife, SAFE_MG)
    const lastCallDec = bedDec - hoursNeeded

    const points = []
    const maxHours = 24
    for (let h = 0; h <= maxHours; h += 0.5) {
      const mg = remainingMg(dose, halfLife, h)
      const x = (h / maxHours) * 100
      const y = 100 - (mg / dose) * 100
      points.push(x + ',' + y)
    }

    const thresholdY = 100 - (SAFE_MG / dose) * 100
    const bedX = Math.min(100, (hoursToBed / maxHours) * 100)

    return {
      hoursToBed, atBedtime,
      lastCallDisplay: decToDisplay(lastCallDec),
      clearHours: hoursNeeded,
      curvePoints: points.join(' '),
      thresholdY, bedX,
    }
  }, [dose, halfLife, drinkTime, bedtime])

  const dis = disruption(calc.atBedtime)

  const barColor =
    dis.color === 'emerald' ? 'bg-emerald-500' :
    dis.color === 'yellow'  ? 'bg-yellow-500'  :
    dis.color === 'orange'  ? 'bg-orange-500'  : 'bg-red-500'

  const badgeCls =
    dis.color === 'emerald' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' :
    dis.color === 'yellow'  ? 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30'   :
    dis.color === 'orange'  ? 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30'   :
                              'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 text-xs bg-emerald-500/5 border border-emerald-500/20 rounded-full px-4 py-2 max-w-fit mx-auto">
        <Shield className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-muted-foreground">
          <strong className="text-emerald-700 dark:text-emerald-400">100% private</strong> - your data never leaves your device
        </span>
      </div>

      <Card>
        <CardContent className="p-5 md:p-6 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Choose your drink</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => pickPreset(p.id)}
                  className={'px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-all ' +
                    (presetId === p.id ? 'bg-amber-500 text-white border-amber-500' : 'bg-card border-border text-muted-foreground hover:border-amber-400')}
                >
                  <div>{p.label}</div>
                  <div className={'text-[10px] font-normal ' + (presetId === p.id ? 'text-white/80' : 'opacity-70')}>
                    {p.sub} - {p.mg}mg
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Caffeine dose</label>
              <span className="text-lg font-black text-amber-600 dark:text-amber-400">{dose}mg</span>
            </div>
            <input
              type="range" min="10" max="400" step="5" value={dose}
              onChange={e => { setDose(parseInt(e.target.value)); setPresetId('custom') }}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Your caffeine sensitivity</label>
            <div className="grid grid-cols-3 gap-2">
              {SENSITIVITY.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSensitivity(s.id)}
                  className={'px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-all ' +
                    (sensitivity === s.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}
                >
                  <div>{s.label}</div>
                  <div className={'text-[10px] font-normal ' + (sensitivity === s.id ? 'text-white/80' : 'opacity-70')}>
                    {s.half}h half-life
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Drink time</label>
              <input
                type="time" value={drinkTime}
                onChange={e => setDrinkTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Bedtime</label>
              <input
                type="time" value={bedtime}
                onChange={e => setBedtime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-bold"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className={'h-1.5 ' + barColor} />
        <CardContent className="p-5 md:p-6 space-y-5">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Caffeine remaining at your bedtime
            </div>
            <div className="text-5xl md:text-6xl font-black tracking-tight mb-3">
              {Math.round(calc.atBedtime)}<span className="text-2xl md:text-3xl">mg</span>
            </div>
            <div className={'inline-block px-3 py-1 rounded-full text-xs font-bold border ' + badgeCls}>
              {dis.label} sleep impact
            </div>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">{dis.msg}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                <Clock className="h-3 w-3" /> Last Call
              </div>
              <div className="text-2xl font-black tracking-tight">{calc.lastCallDisplay}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Latest time for this dose to stay under 30mg at bedtime
              </div>
            </div>
            <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-1">
                <Zap className="h-3 w-3" /> Time to clear
              </div>
              <div className="text-2xl font-black tracking-tight">{calc.clearHours.toFixed(1)}h</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Until caffeine drops below 30mg
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Caffeine decay over 24 hours</div>
            <div className="relative w-full" style={{ aspectRatio: '16/6' }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.3" />
                <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.3" />
                {calc.thresholdY >= 0 && calc.thresholdY <= 100 && (
                  <line x1="0" y1={calc.thresholdY} x2="100" y2={calc.thresholdY}
                    stroke="#10b981" strokeOpacity="0.5" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
                )}
                {calc.bedX >= 0 && calc.bedX <= 100 && (
                  <line x1={calc.bedX} y1="0" x2={calc.bedX} y2="100"
                    stroke="#6366f1" strokeOpacity="0.4" strokeWidth="0.4" strokeDasharray="1 1" />
                )}
                <polyline
                  points={calc.curvePoints}
                  fill="none" stroke="#f59e0b" strokeWidth="0.8"
                  strokeLinecap="round" strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
              <span>0h</span>
              <span>12h after drink</span>
              <span>24h</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-amber-500"></span> Caffeine
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-emerald-500"></span> 30mg safe
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-indigo-500"></span> Bedtime
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-500/5 border border-slate-500/20 p-3 text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Note:</strong> Caffeine has an average half-life of 5 hours but varies
            widely from 3 to 7 hours depending on genetics, medications, smoking, and liver function.
            Adjust the sensitivity above to match your own body.
          </div>
          <div className="flex justify-end pt-2"><SaveCalculation type="calculation" title="Caffeine" inputs={{presetId, dose, drinkTime, bedtime, sensitivity}} results={{atBedtime: calc.atBedtime, lastCall: calc.lastCallDisplay, clearHours: calc.clearHours, impact: dis.label}} /></div>
          <div className="pt-2 border-t border-border">
            <ShareButtons url={window.location.href} title={document.title} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
