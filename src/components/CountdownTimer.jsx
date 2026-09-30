import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Bell, BellOff, CalendarClock, PartyPopper, Gift, TreePine, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const STORAGE = 'tg_countdowns_v1'
const MAX_ITEMS = 5

function pad(n) { return String(n).padStart(2, '0') }

function diffParts(ms) {
  if (ms < 0) return { d: 0, h: 0, m: 0, s: 0, overdue: true }
  const s = Math.floor(ms / 1000)
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, overdue: false }
}

function fmtTarget(iso) {
  try { return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) } catch (e) { return iso }
}

function nextNewYear() {
  const y = new Date().getFullYear()
  const target = new Date(y + 1, 0, 1, 0, 0, 0)
  return target.toISOString().slice(0, 16)
}

function nextChristmas() {
  const now = new Date()
  const y = now.getMonth() === 11 && now.getDate() > 25 ? now.getFullYear() + 1 : now.getFullYear()
  const target = new Date(y, 11, 25, 0, 0, 0)
  return target.toISOString().slice(0, 16)
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
    osc.frequency.value = 660
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
    osc.start()
    osc.stop(ctx.currentTime + 1.2)
  } catch (e) {}
}

export default function CountdownTimer() {
  const [now, setNow] = useState(Date.now())
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [soundOn, setSoundOn] = useState(true)
  const [notifOn, setNotifOn] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  const firedRef = useRef({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (raw) {
        const d = JSON.parse(raw)
        if (Array.isArray(d.items)) setItems(d.items)
        if (typeof d.soundOn === 'boolean') setSoundOn(d.soundOn)
        if (typeof d.notifOn === 'boolean') setNotifOn(d.notifOn)
      }
    } catch (e) {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE, JSON.stringify({ items, soundOn, notifOn })) } catch (e) {}
  }, [items, soundOn, notifOn, hydrated])

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    items.forEach(it => {
      const ms = new Date(it.target).getTime() - now
      if (ms <= 0 && !firedRef.current[it.id]) {
        firedRef.current[it.id] = true
        if (soundOn) playBeep()
        if (notifOn && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          try { new Notification('Countdown finished', { body: it.name }) } catch (e) {}
        }
      } else if (ms > 0 && firedRef.current[it.id]) {
        firedRef.current[it.id] = false
      }
    })
  }, [now, items, soundOn, notifOn])

  const add = () => {
    const cleanName = name.trim()
    if (!cleanName || !target) return
    if (items.length >= MAX_ITEMS) return
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    setItems([...items, { id, name: cleanName, target: new Date(target).toISOString() }])
    setName('')
    setTarget('')
  }

  const remove = (id) => setItems(items.filter(i => i.id !== id))

  const addPreset = (kind) => {
    if (items.length >= MAX_ITEMS) return
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    if (kind === 'ny') setItems([...items, { id, name: 'New Year', target: new Date(nextNewYear()).toISOString() }])
    if (kind === 'xmas') setItems([...items, { id, name: 'Christmas', target: new Date(nextChristmas()).toISOString() }])
  }

  const requestNotif = async () => {
    if (typeof Notification === 'undefined') return
    try {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') setNotifOn(true)
    } catch (e) {}
  }

  const sorted = [...items].sort((a, b) => new Date(a.target) - new Date(b.target))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-indigo-500/30">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Plus className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-black">Add countdown</h3>
            </div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Event name (e.g. Holiday)" maxLength={40} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium" />
            <input type="datetime-local" value={target} onChange={e => setTarget(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium" />
            <button onClick={add} disabled={!name.trim() || !target || items.length >= MAX_ITEMS} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Plus className="h-4 w-4" /> Add
            </button>
            <div className="flex items-center justify-between gap-2 pt-1">
              <button onClick={() => addPreset('ny')} disabled={items.length >= MAX_ITEMS} className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-muted hover:bg-muted/70 text-xs font-bold transition-colors disabled:opacity-40"><PartyPopper className="h-3.5 w-3.5" /> New Year</button>
              <button onClick={() => addPreset('xmas')} disabled={items.length >= MAX_ITEMS} className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-muted hover:bg-muted/70 text-xs font-bold transition-colors disabled:opacity-40"><TreePine className="h-3.5 w-3.5" /> Christmas</button>
            </div>
            <div className="flex items-center gap-3 text-xs pt-1">
              <button onClick={() => setSoundOn(s => !s)} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                {soundOn ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
                {soundOn ? 'Sound on' : 'Sound off'}
              </button>
              {typeof Notification !== 'undefined' && Notification.permission !== 'granted' && (
                <button onClick={requestNotif} className="text-indigo-500 hover:underline">Enable notifications</button>
              )}
              {typeof Notification !== 'undefined' && Notification.permission === 'granted' && (
                <button onClick={() => setNotifOn(s => !s)} className="text-muted-foreground hover:text-foreground">{notifOn ? 'Notif on' : 'Notif off'}</button>
              )}
            </div>
            <div className="text-[10px] text-muted-foreground">{items.length} / {MAX_ITEMS} countdowns</div>
          </CardContent>
        </Card>

        <Card className="bg-muted/40">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-black">How it works</h3>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• Add up to {MAX_ITEMS} countdowns</li>
              <li>• Ticks every second in your browser</li>
              <li>• Sound + notification at zero</li>
              <li>• Saved on your device only</li>
              <li>• No signup, 100% private</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {sorted.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center">
            <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <div className="text-sm font-bold mb-1">No countdowns yet</div>
            <div className="text-xs text-muted-foreground">Add one above or try the New Year preset.</div>
          </CardContent>
        </Card>
      )}

      {sorted.map((it) => {
        const ms = new Date(it.target).getTime() - now
        const p = diffParts(ms)
        const totalMs = new Date(it.target).getTime() - new Date(it.created || Date.now()).getTime()
        return (
          <Card key={it.id} className={'overflow-hidden ' + (p.overdue ? 'border-red-500/40 bg-red-500/5' : 'border-indigo-500/30')}>
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{p.overdue ? 'Time is up' : 'Counting down'}</div>
                  <h3 className="text-lg md:text-xl font-black truncate">{it.name}</h3>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{fmtTarget(it.target)}</div>
                </div>
                <button onClick={() => remove(it.id)} title="Remove" className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {p.overdue ? (
                <div className="text-center py-4">
                  <Gift className="h-10 w-10 text-red-500 mx-auto mb-2" />
                  <div className="text-3xl font-black text-red-500">Time is up!</div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center rounded-xl bg-muted/60 py-3">
                    <div className="text-2xl md:text-3xl font-black tabular-nums">{p.d}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Days</div>
                  </div>
                  <div className="text-center rounded-xl bg-muted/60 py-3">
                    <div className="text-2xl md:text-3xl font-black tabular-nums">{pad(p.h)}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Hours</div>
                  </div>
                  <div className="text-center rounded-xl bg-muted/60 py-3">
                    <div className="text-2xl md:text-3xl font-black tabular-nums">{pad(p.m)}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Minutes</div>
                  </div>
                  <div className="text-center rounded-xl bg-muted/60 py-3">
                    <div className="text-2xl md:text-3xl font-black tabular-nums">{pad(p.s)}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Seconds</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}