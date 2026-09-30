import { useState, useMemo, useEffect } from 'react'
import { Moon, Sun, Shield, Share2, RotateCcw, TrendingUp, Clock } from 'lucide-react'
import ShareButtons from './ShareButtons'
import SaveCalculation from './SaveCalculation'
import { Card, CardContent } from '@/components/ui/card'

const STORAGE_KEY = 'tg_sleep_debt_v1'

const AGE_BANDS = [
  { id: 'teen',   label: 'Teen',        sub: '14-17', need: 9,   range: '8-10 hrs' },
  { id: 'young',  label: 'Young Adult', sub: '18-25', need: 8,   range: '7-9 hrs' },
  { id: 'adult',  label: 'Adult',       sub: '26-64', need: 8,   range: '7-9 hrs' },
  { id: 'senior', label: 'Older Adult', sub: '65+',   need: 7.5, range: '7-8 hrs' },
]

const SEVERITY = [
  { max: 0.5,  label: 'On Track', cls: 'bg-emerald-500', badgeCls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30', msg: 'Your sleep is on track. Keep it up!' },
  { max: 6,    label: 'Mild',     cls: 'bg-yellow-500',  badgeCls: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30',   msg: 'Small sleep debt. A few good nights will clear it.' },
  { max: 12,   label: 'Moderate', cls: 'bg-orange-500',  badgeCls: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30',   msg: 'Noticeable sleep debt. Prioritise recovery this week.' },
  { max: 20,   label: 'Severe',   cls: 'bg-red-500',     badgeCls: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30',               msg: 'Significant sleep debt. Consider speaking to a doctor if this persists.' },
  { max: Infinity, label: 'Extreme', cls: 'bg-rose-600', badgeCls: 'bg-rose-600/15 text-rose-700 dark:text-rose-300 border-rose-600/30',           msg: 'Extreme sleep debt. Please speak to a healthcare professional.' },
]

const severityFor = (debt) => SEVERITY.find(s => debt < s.max) || SEVERITY[SEVERITY.length - 1]

function fmtHrs(h) {
  const m = Math.round(h * 60)
  const H = Math.floor(m / 60)
  const M = m % 60
  if (H === 0) return M + 'm'
  if (M === 0) return H + 'h'
  return H + 'h ' + M + 'm'
}

function fmtTime(dec24) {
  const total = ((Math.round(dec24 * 60) % 1440) + 1440) % 1440
  const h = Math.floor(total / 60)
  const m = total % 60
  const ap = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return h12 + ':' + String(m).padStart(2, '0') + ' ' + ap
}

const NIGHTS = 14
const DEFAULT_HOURS = 8

export default function SleepDebtCalculator() {
  const [ageBand, setAgeBand] = useState('adult')
  const [need, setNeed] = useState(8)
  const [win, setWin] = useState(7)
  const [nights, setNights] = useState(() => Array.from({ length: NIGHTS }, () => ({ h: DEFAULT_HOURS, nap: 0 })))
  const [wake, setWake] = useState(7)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const d = JSON.parse(raw)
      if (d.ageBand) setAgeBand(d.ageBand)
      if (typeof d.need === 'number') setNeed(d.need)
      if (d.win) setWin(d.win)
      if (Array.isArray(d.nights) && d.nights.length === NIGHTS) setNights(d.nights)
      if (typeof d.wake === 'number') setWake(d.wake)
    } catch (e) {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ageBand, need, win, nights, wake })) } catch (e) {}
  }, [ageBand, need, win, nights, wake])

  const pickBand = (id) => {
    setAgeBand(id)
    const b = AGE_BANDS.find(x => x.id === id)
    if (b) setNeed(b.need)
  }

  const updateNight = (i, key, val) => {
    setNights(p => p.map((n, idx) => idx === i ? { ...n, [key]: val } : n))
  }

  const calc = useMemo(() => {
    const slice = nights.slice(0, win)
    const per = slice.map(n => {
      const napH = (n.nap || 0) / 60
      const total = (n.h || 0) + napH
      const deficit = Math.max(0, need - total)
      return { h: n.h || 0, nap: n.nap || 0, total, deficit, belowTarget: total < need }
    })
    const debt = per.reduce((a, x) => a + x.deficit, 0)
    const avg = per.reduce((a, x) => a + x.total, 0) / win
    const recovery = debt > 0.01 ? Math.ceil(debt / 1) : 0
    const bedtime = wake - (need + 0.25 + (debt > 0.01 ? 1 : 0))
    const maxV = Math.max(need, ...per.map(x => x.total))
    return { per, debt, avg, recovery, bedtime, maxV }
  }, [nights, win, need, wake])

  const sev = severityFor(calc.debt)

  const share = async () => {
    const url = 'https://timegovern.com/sleep-debt-calculator'
    const text = 'I owe my body ' + fmtHrs(calc.debt) + ' of sleep. Calculate yours -> ' + url
    try {
      if (navigator.share) await navigator.share({ title: 'My Sleep Debt', text, url })
      else { await navigator.clipboard.writeText(text); alert('Copied to clipboard!') }
    } catch (e) {}
  }

  const reset = () => {
    setNights(Array.from({ length: NIGHTS }, () => ({ h: DEFAULT_HOURS, nap: 0 })))
    setNeed(8); setAgeBand('adult'); setWin(7); setWake(7)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 text-xs bg-emerald-500/5 border border-emerald-500/20 rounded-full px-4 py-2 max-w-fit mx-auto">
        <Shield className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-muted-foreground"><strong className="text-emerald-700 dark:text-emerald-400">100% private</strong> - your data never leaves your device</span>
      </div>

      <Card>
        <CardContent className="p-5 md:p-6 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Your age group</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {AGE_BANDS.map(b => (
                <button key={b.id} onClick={() => pickBand(b.id)}
                  className={'px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-all ' +
                    (ageBand === b.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>
                  <div>{b.label}</div>
                  <div className={'text-[10px] font-normal ' + (ageBand === b.id ? 'text-white/80' : 'opacity-70')}>
                    {b.sub} - {b.range}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nightly sleep need</label>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{need}h</span>
            </div>
            <input type="range" min="5" max="12" step="0.25" value={need}
              onChange={e => setNeed(parseFloat(e.target.value))}
              className="w-full accent-indigo-500" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Tracking window</label>
            <div className="flex gap-2">
              {[7, 10, 14].map(w => (
                <button key={w} onClick={() => setWin(w)}
                  className={'px-4 py-2 rounded-full text-xs font-bold border transition-all ' +
                    (win === w ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>
                  {w} days
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your last {win} nights</label>
              <button onClick={reset} className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {nights.slice(0, win).map((n, i) => (
                <div key={i} className="flex items-center gap-2 bg-muted/40 rounded-xl p-2">
                  <div className="text-xs font-semibold text-muted-foreground w-24 shrink-0">
                    {i === 0 ? 'Last night' : (i + 1) + ' nights ago'}
                  </div>
                  <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                    <Moon className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <input type="number" min="0" max="14" step="0.25" value={n.h}
                      onChange={e => updateNight(i, 'h', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 rounded-lg border border-border bg-background text-sm font-bold text-center" />
                    <span className="text-[10px] text-muted-foreground mr-2">hrs</span>
                    <Sun className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <input type="number" min="0" max="180" step="5" value={n.nap}
                      onChange={e => updateNight(i, 'nap', parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 rounded-lg border border-border bg-background text-sm font-bold text-center" />
                    <span className="text-[10px] text-muted-foreground">min nap</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border">
        <div className={'h-1.5 ' + sev.cls} />
        <CardContent className="p-5 md:p-6 space-y-5">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Sleep Debt</div>
            <div className="text-5xl md:text-6xl font-black tracking-tight mb-3">
              {calc.debt < 0.05 ? '0h' : fmtHrs(calc.debt)}
            </div>
            <div className={'inline-block px-3 py-1 rounded-full text-xs font-bold border ' + sev.badgeCls}>
              {sev.label}
            </div>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">{sev.msg}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3">
            <Stat iconEl={<Clock className="h-3 w-3" />} label={'Avg over ' + win + 'n'} value={fmtHrs(calc.avg)} sub={'of ' + need + 'h needed'} />
            <Stat iconEl={<TrendingUp className="h-3 w-3" />} label="Recovery time" value={calc.recovery > 0 ? '~' + calc.recovery + ' nights' : 'On track'} sub="at +1h/night" />
            <Stat iconEl={<Moon className="h-3 w-3" />} label="Tonight's bedtime" value={fmtTime(calc.bedtime)} sub={'wake at ' + fmtTime(wake)} colSpan="col-span-2 md:col-span-1" />
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Nightly sleep vs target</div>
            <div className="relative h-32 flex items-end gap-1.5">
              <div className="absolute left-0 right-0 border-t-2 border-dashed border-indigo-500/40 z-10" style={{ bottom: ((need / calc.maxV) * 100) + '%' }}>
                <span className="absolute right-0 -top-5 text-[10px] font-bold text-indigo-500">{need}h target</span>
              </div>
              {calc.per.map((n, i) => {
                const pct = (n.total / calc.maxV) * 100
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 relative z-20">
                    <div className={'w-full rounded-t-sm ' + (n.belowTarget ? 'bg-orange-400' : 'bg-emerald-500')}
                      style={{ height: pct + '%', minHeight: '4px' }} title={fmtHrs(n.total)} />
                  </div>
                )
              })}
            </div>
            <div className="flex gap-1.5 mt-2">
              {calc.per.map((_, i) => (
                <div key={i} className="flex-1 text-[9px] text-muted-foreground text-center truncate">
                  {i === 0 ? 'Last' : '-' + i}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <label className="text-xs font-bold text-muted-foreground">Wake-up time</label>
            <input type="time"
              value={String(Math.floor(wake)).padStart(2, '0') + ':' + String(Math.round((wake % 1) * 60)).padStart(2, '0')}
              onChange={e => { const parts = e.target.value.split(':'); setWake(Number(parts[0]) + Number(parts[1]) / 60) }}
              className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm font-bold" />
          </div>

                  <div className="flex justify-end pt-2"><SaveCalculation type="calculation" title="Sleep Debt" inputs={{ageBand, need, win, wake, nights}} results={{debt: calc.debt, avg: calc.avg, recovery: calc.recovery, bedtime: calc.bedtime}} /></div>
          <div className="pt-2 border-t border-border">
          <ShareButtons url={window.location.href} title={document.title} />
        </div>
        </CardContent>
      </Card>

      {calc.debt > 0.05 && (
        <Card className="border-border">
          <CardContent className="p-5 md:p-6 space-y-4">
            <div>
              <h3 className="text-lg font-black tracking-tight mb-1">Your Recovery Plan</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Add <strong className="text-foreground">+1 hour</strong> per night and you will clear your{' '}
                <strong className="text-foreground">{fmtHrs(calc.debt)}</strong> debt in about{' '}
                <strong className="text-foreground">{calc.recovery} nights</strong>.
              </p>
            </div>

            <div className="space-y-2">
              {Array.from({ length: Math.min(calc.recovery, 7) }).map((_, i) => {
                const projectedDebt = Math.max(0, calc.debt - (i + 1))
                const isFinal = projectedDebt < 0.05
                return (
                  <div
                    key={i}
                    className={
                      'flex items-center gap-3 rounded-xl p-3 ' +
                      (i === 0 ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-muted/40')
                    }
                  >
                    <div className="text-xs font-black w-20 shrink-0">
                      {i === 0 ? 'Tonight' : 'Night ' + (i + 1)}
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Moon className="h-3 w-3 text-indigo-500" />
                        Bed <strong className="text-foreground">{fmtTime(calc.bedtime)}</strong>
                      </span>
                      <span className="opacity-40">·</span>
                      <span className="flex items-center gap-1">
                        <Sun className="h-3 w-3 text-amber-500" />
                        Wake <strong className="text-foreground">{fmtTime(wake)}</strong>
                      </span>
                      <span className="opacity-40">·</span>
                      <span>{fmtHrs(need + 1)} sleep</span>
                    </div>
                    <div
                      className={
                        'text-[11px] font-black shrink-0 ' +
                        (isFinal ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-500')
                      }
                    >
                      {isFinal ? '0h - cleared' : fmtHrs(projectedDebt) + ' left'}
                    </div>
                  </div>
                )
              })}
            </div>

            {calc.recovery > 7 && (
              <p className="text-[11px] text-muted-foreground pt-2 border-t border-border">
                Showing the first 7 nights. Total recovery: <strong className="text-foreground">{calc.recovery} nights</strong>.
              </p>
            )}

            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3 text-[11px] text-muted-foreground leading-relaxed">
              <strong className="text-emerald-700 dark:text-emerald-400">Tip:</strong> Waking at the same time every day - even on weekends - trains your circadian rhythm and speeds up recovery.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function Stat({ iconEl, label, value, sub, colSpan }) {
  return (
    <div className={'rounded-xl bg-muted/40 p-3 ' + (colSpan || '')}>
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
        {iconEl} {label}
      </div>
      <div className="text-lg font-black tracking-tight">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
    </div>
  )
}