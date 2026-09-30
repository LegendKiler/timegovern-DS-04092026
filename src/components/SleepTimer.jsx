import { useState, useEffect, useMemo } from 'react'
import { Moon, Sun, Clock, Zap, Coffee, AlertCircle, Copy, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const CYCLE_MIN = 90
const FALL_ASLEEP_MIN = 15
const STORAGE = 'tg_sleeptimer_v1'

function timeStrToDec(s) { const p = s.split(':'); return parseInt(p[0], 10) + parseInt(p[1] || '0', 10) / 60 }
function decToTime(d) {
  const total = ((Math.round(d * 60) % 1440) + 1440) % 1440
  const h = Math.floor(total / 60), m = total % 60
  const ap = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return h12 + ':' + String(m).padStart(2, '0') + ' ' + ap
}
function nowDec() { const d = new Date(); return d.getHours() + d.getMinutes() / 60 }

export default function SleepTimer() {
  const [tab, setTab] = useState('wake')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [cycles, setCycles] = useState(5)
  const [sleepNow, setSleepNow] = useState(true)
  const [copied, setCopied] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.wakeTime) setWakeTime(d.wakeTime)
        if (typeof d.cycles === 'number') setCycles(d.cycles)
        if (d.tab) setTab(d.tab)
      }
    } catch (e) {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE, JSON.stringify({ wakeTime, cycles, tab })) } catch (e) {}
  }, [wakeTime, cycles, tab, hydrated])

  // Wake-up mode: compute bedtimes that give full cycles ending at wakeTime
  const bedtimes = useMemo(() => {
    const wDec = timeStrToDec(wakeTime)
    const out = []
    for (let i = 1; i <= 7; i++) {
      const minutes = i * CYCLE_MIN + FALL_ASLEEP_MIN
      const bedDec = wDec - minutes / 60
      out.push({ cycles: i, time: decToTime(bedDec), hours: (minutes / 60).toFixed(2) })
    }
    return out
  }, [wakeTime])

  // Sleep now mode: compute wake times when falling asleep now
  const waketimes = useMemo(() => {
    const start = nowDec()
    const out = []
    for (let i = 1; i <= 7; i++) {
      const minutes = i * CYCLE_MIN + FALL_ASLEEP_MIN
      const wakeDec = start + minutes / 60
      out.push({ cycles: i, time: decToTime(wakeDec), hours: (minutes / 60).toFixed(2) })
    }
    return out
  }, [sleepNow])

  // Nap recommendations
  const NAPS = [
    { label: 'Power nap', minutes: 20, desc: 'Quick alertness boost, no grogginess', color: 'emerald', icon: Zap },
    { label: 'Full cycle', minutes: 90, desc: 'Complete sleep cycle - restores focus', color: 'indigo', icon: Moon },
    { label: 'Long nap', minutes: 60, desc: 'Catch-up sleep, may cause grogginess', color: 'amber', icon: Coffee },
  ]

  const copyResult = async () => {
    let text = ''
    if (tab === 'wake') {
      text = 'Best bedtimes for waking at ' + wakeTime + ':\n' + bedtimes.slice(0, 4).map(b => b.cycles + ' cycles: ' + b.time).join('\n')
    } else if (tab === 'now') {
      text = 'If you sleep now, wake up at:\n' + waketimes.slice(0, 4).map(w => w.cycles + ' cycles: ' + w.time).join('\n')
    } else {
      text = 'Nap options:\n' + NAPS.map(n => n.minutes + 'min - ' + n.label).join('\n')
    }
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch (e) {}
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => setTab('wake')} className={'flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-bold transition-all ' + (tab === 'wake' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>
          <Sun className="h-4 w-4" /> Wake-up time
        </button>
        <button onClick={() => { setSleepNow(!sleepNow); setTab('now') }} className={'flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-bold transition-all ' + (tab === 'now' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>
          <Moon className="h-4 w-4" /> Sleep now
        </button>
        <button onClick={() => setTab('nap')} className={'flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-bold transition-all ' + (tab === 'nap' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>
          <Zap className="h-4 w-4" /> Nap
        </button>
      </div>

      {tab === 'wake' && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <label className="block">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Sun className="h-3 w-3" /> I want to wake up at</div>
              <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="w-full px-3 py-3 rounded-lg border border-border bg-background text-lg font-bold tabular-nums" />
            </label>
            <p className="text-xs text-muted-foreground">We assume it takes about 15 minutes to fall asleep. Times below give you whole 90-minute cycles ending at your wake-up time.</p>
          </CardContent>
        </Card>
      )}

      {tab === 'nap' && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="text-xs text-muted-foreground">Naps work best when you stay inside the right window. Here are the three standard nap lengths - pick based on what you need.</div>
            <div className="space-y-2">
              {NAPS.map((n, i) => {
                const Icon = n.icon
                return (
                  <div key={i} className="flex items-start gap-3 px-3 py-3 rounded-lg bg-muted/40 border border-border">
                    <div className={'p-2 rounded-lg bg-' + n.color + '-500/10 border border-' + n.color + '-500/30 shrink-0'}>
                      <Icon className={'h-4 w-4 text-' + n.color + '-500'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="font-black text-sm">{n.label}</span>
                        <span className="text-xs font-bold text-muted-foreground">{n.minutes} min</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">{n.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/30 p-3 flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
              <span>Avoid naps between 30 and 60 minutes - you will wake up mid-deep-sleep and feel worse than before.</span>
            </div>
          </CardContent>
        </Card>
      )}

      {(tab === 'wake' || tab === 'now') && (
        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {tab === 'wake' ? 'Best times to fall asleep' : 'Best times to wake up'}
              </div>
              <button onClick={copyResult} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 text-xs font-bold transition-colors">
                {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
              </button>
            </div>
            <div className="space-y-2">
              {(tab === 'wake' ? bedtimes : waketimes).map((row, i) => {
                const highlight = (tab === 'wake' ? row.cycles === cycles : row.cycles === 5)
                return (
                  <div key={i} className={'flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors ' + (highlight ? 'bg-indigo-500/10 border-2 border-indigo-500/40' : 'bg-muted/40 border border-border')}>
                    <div className="flex items-center gap-3">
                      <div className={'p-2 rounded-lg ' + (highlight ? 'bg-indigo-500 text-white' : 'bg-muted text-muted-foreground')}>
                        <Moon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className={'font-black text-base tabular-nums ' + (highlight ? 'text-indigo-600 dark:text-indigo-400' : '')}>{row.time}</div>
                        <div className="text-[10px] text-muted-foreground">{row.cycles} cycle{row.cycles !== 1 ? 's' : ''} - {row.hours} hrs</div>
                      </div>
                    </div>
                    {highlight && <div className="text-[10px] font-black uppercase tracking-wider text-indigo-500">Recommended</div>}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>Times are calculated from a 90-minute sleep cycle plus 15 minutes to fall asleep. Actual needs vary - adjust the recommended cycle based on how you feel.</span>
      </div>
    </div>
  )
}