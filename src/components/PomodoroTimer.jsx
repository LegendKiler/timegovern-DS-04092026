import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, SkipForward, Settings, Bell, BellOff, Coffee, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const MODES = {
  work:  { label: 'Focus',        color: 'indigo',  icon: Zap,    defaultMin: 25 },
  short: { label: 'Short break',  color: 'emerald', icon: Coffee, defaultMin: 5 },
  long:  { label: 'Long break',   color: 'amber',   icon: Coffee, defaultMin: 15 },
}

const PRESETS = {
  classic:  { work: 25, short: 5, long: 15, cycles: 4, label: 'Classic (25/5)' },
  deep:     { work: 50, short: 10, long: 30, cycles: 2, label: 'Deep work (50/10)' },
  sprint:   { work: 15, short: 3, long: 12, cycles: 4, label: 'Sprint (15/3)' },
  custom:   { work: 25, short: 5, long: 15, cycles: 4, label: 'Custom' },
}

const STORAGE = 'tg_pomodoro_v1'

function fmt(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0')
}

function playBeep() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
    osc.start()
    osc.stop(ctx.currentTime + 0.8)
  } catch (e) {}
}

export default function PomodoroTimer() {
  const [preset, setPreset] = useState('classic')
  const [durations, setDurations] = useState({ work: 25, short: 5, long: 15, cycles: 4 })
  const [mode, setMode] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
  const [notifOn, setNotifOn] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const endRef = useRef(null)
  const tickRef = useRef(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.preset) setPreset(d.preset)
        if (d.durations) setDurations(d.durations)
        if (typeof d.soundOn === 'boolean') setSoundOn(d.soundOn)
        if (typeof d.notifOn === 'boolean') setNotifOn(d.notifOn)
        if (typeof d.completed === 'number') setCompleted(d.completed)
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify({ preset, durations, soundOn, notifOn, completed })) } catch (e) {}
  }, [preset, durations, soundOn, notifOn, completed])

  useEffect(() => {
    if (running) {
      endRef.current = Date.now() + secondsLeft * 1000
    }
  }, [running])

  const advance = useCallback((nextMode, fromCompletion) => {
    const dur = durations[nextMode] * 60
    setMode(nextMode)
    setSecondsLeft(dur)
    setRunning(false)
    if (fromCompletion) {
      if (soundOn) playBeep()
      if (notifOn && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try { new Notification('Pomodoro', { body: MODES[nextMode].label + ' time!' }) } catch (e) {}
      }
    }
  }, [durations, soundOn, notifOn])

  const onComplete = useCallback(() => {
    let next = 'short'
    let newCompleted = completed
    if (mode === 'work') {
      newCompleted = completed + 1
      setCompleted(newCompleted)
      next = (newCompleted % durations.cycles === 0) ? 'long' : 'short'
    } else {
      next = 'work'
    }
    advance(next, true)
  }, [mode, completed, durations.cycles, advance])

  useEffect(() => {
    if (!running) { if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null } return }
    tickRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.round((endRef.current - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining <= 0) { clearInterval(tickRef.current); tickRef.current = null; onComplete() }
    }, 250)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [running, onComplete])

  const toggle = () => setRunning(r => !r)
  const reset = () => { setRunning(false); setSecondsLeft(durations[mode] * 60) }
  const skip = () => { const next = mode === 'work' ? 'short' : 'work'; advance(next, false) }

  const switchPreset = (key) => {
    setPreset(key)
    if (key !== 'custom') {
      const p = PRESETS[key]
      setDurations({ work: p.work, short: p.short, long: p.long, cycles: p.cycles })
      if (mode === 'work') { setSecondsLeft(p.work * 60); setRunning(false) }
    }
  }

  const updateDuration = (key, val) => {
    const n = Math.max(1, Math.min(120, parseInt(val) || 1))
    const next = { ...durations, [key]: n }
    setDurations(next)
    setPreset('custom')
    if (key === mode) { setRunning(false); setSecondsLeft(n * 60) }
  }

  const requestNotif = async () => {
    if (typeof Notification === 'undefined') return
    try {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') setNotifOn(true)
    } catch (e) {}
  }

  const total = durations[mode] * 60
  const progress = total > 0 ? (1 - secondsLeft / total) * 100 : 0
  const M = MODES[mode]
  const ModeIcon = M.icon
  const ringColor = M.color === 'indigo' ? '#6366f1' : M.color === 'emerald' ? '#10b981' : '#f59e0b'
  const circumference = 2 * Math.PI * 90
  const dashOffset = circumference * (1 - progress / 100)

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.keys(PRESETS).map(k => (
              <button key={k} onClick={() => switchPreset(k)} className={'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ' + (preset === k ? 'bg-indigo-500 text-white' : 'bg-muted hover:bg-muted/70 text-muted-foreground')}>
                {PRESETS[k].label}
              </button>
            ))}
          </div>

          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="8" />
              <circle cx="100" cy="100" r="90" fill="none" stroke={ringColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                <ModeIcon className="h-3.5 w-3.5" />
                {M.label}
              </div>
              <div className="text-5xl md:text-6xl font-black tabular-nums tracking-tight">{fmt(secondsLeft)}</div>
              <div className="text-xs text-muted-foreground mt-2">Session {completed + (mode === 'work' ? 1 : 0)}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button onClick={toggle} className={'inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white text-sm transition-colors ' + (running ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600')}>
              {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-muted hover:bg-muted/70 text-foreground text-sm font-bold transition-colors"><RotateCcw className="h-4 w-4" /> Reset</button>
            <button onClick={skip} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-muted hover:bg-muted/70 text-foreground text-sm font-bold transition-colors"><SkipForward className="h-4 w-4" /> Skip</button>
            <button onClick={() => setShowSettings(s => !s)} className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-muted hover:bg-muted/70 text-foreground transition-colors" title="Settings"><Settings className="h-4 w-4" /></button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button onClick={() => setSoundOn(s => !s)} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors" title="Toggle sound">
              {soundOn ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
              {soundOn ? 'Sound on' : 'Sound off'}
            </button>
            {typeof Notification !== 'undefined' && Notification.permission !== 'granted' && (
              <button onClick={requestNotif} className="text-indigo-500 hover:underline">Enable notifications</button>
            )}
            {typeof Notification !== 'undefined' && Notification.permission === 'granted' && (
              <button onClick={() => setNotifOn(s => !s)} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                {notifOn ? 'Notifications on' : 'Notifications off'}
              </button>
            )}
          </div>

          {showSettings && (
            <div className="w-full max-w-md pt-4 border-t border-border grid grid-cols-2 gap-3">
              <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Focus (min)</div><input type="number" min="1" max="120" value={durations.work} onChange={e => updateDuration('work', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-bold" /></label>
              <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Short break (min)</div><input type="number" min="1" max="60" value={durations.short} onChange={e => updateDuration('short', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-bold" /></label>
              <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Long break (min)</div><input type="number" min="1" max="60" value={durations.long} onChange={e => updateDuration('long', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-bold" /></label>
              <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Cycles before long</div><input type="number" min="2" max="10" value={durations.cycles} onChange={e => updateDuration('cycles', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-bold" /></label>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-muted/40 border border-border p-3"><div className="text-xs text-muted-foreground uppercase tracking-wider">Completed</div><div className="text-2xl font-black">{completed}</div></div>
        <div className="rounded-xl bg-muted/40 border border-border p-3"><div className="text-xs text-muted-foreground uppercase tracking-wider">Cycle</div><div className="text-2xl font-black">{completed % durations.cycles} / {durations.cycles}</div></div>
        <div className="rounded-xl bg-muted/40 border border-border p-3"><div className="text-xs text-muted-foreground uppercase tracking-wider">Total focus</div><div className="text-2xl font-black">{completed * durations.work} min</div></div>
      </div>

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed">
        <strong className="text-foreground">How it works:</strong> Focus for {durations.work} minutes, take a {durations.short}-minute break, repeat {durations.cycles} times, then take a {durations.long}-minute long break. Progress is saved on your device only.
      </div>
    </div>
  )
}