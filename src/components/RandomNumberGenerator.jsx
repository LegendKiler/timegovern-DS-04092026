import { useState } from 'react'
import { Dices, Coins, RefreshCw, Copy, Check, Shuffle, List, Hash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const TABS = [
  { id: 'number', label: 'Number', icon: Hash },
  { id: 'dice', label: 'Dice', icon: Dices },
  { id: 'coin', label: 'Coin', icon: Coins },
  { id: 'pick', label: 'Pick from list', icon: List },
  { id: 'shuffle', label: 'Shuffle', icon: Shuffle }
]

const DICE_SIDES = [4, 6, 8, 10, 12, 20, 100]

function cryptoRand() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint32Array(1)
    crypto.getRandomValues(arr)
    return arr[0] / 4294967296
  }
  return Math.random()
}

function randInt(min, max) {
  return Math.floor(cryptoRand() * (max - min + 1)) + min
}

export default function RandomNumberGenerator() {
  const [tab, setTab] = useState('number')
  const [copied, setCopied] = useState(false)

  // Number
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [qty, setQty] = useState(1)
  const [unique, setUnique] = useState(true)
  const [numbers, setNumbers] = useState([42])

  // Dice
  const [sides, setSides] = useState(6)
  const [diceCount, setDiceCount] = useState(1)
  const [diceResults, setDiceResults] = useState([4])

  // Coin
  const [coinCount, setCoinCount] = useState(1)
  const [coinResults, setCoinResults] = useState(['Heads'])

  // Pick from list
  const [listInput, setListInput] = useState('Alice\nBob\nCharlie\nDiana\nEve')
  const [pickCount, setPickCount] = useState(1)
  const [picks, setPicks] = useState(['Charlie'])

  // Shuffle
  const [shuffleInput, setShuffleInput] = useState('1\n2\n3\n4\n5')
  const [shuffled, setShuffled] = useState(['3', '1', '5', '2', '4'])

  const generate = () => {
    if (tab === 'number') {
      const lo = Math.min(min, max)
      const hi = Math.max(min, max)
      const count = Math.max(1, Math.min(1000, qty || 1))
      const out = []
      if (unique && (hi - lo + 1) >= count) {
        const pool = new Set()
        while (pool.size < count) pool.add(randInt(lo, hi))
        setNumbers([...pool])
      } else {
        for (let i = 0; i < count; i++) out.push(randInt(lo, hi))
        setNumbers(out)
      }
    } else if (tab === 'dice') {
      const out = []
      const n = Math.max(1, Math.min(20, diceCount || 1))
      for (let i = 0; i < n; i++) out.push(randInt(1, sides))
      setDiceResults(out)
    } else if (tab === 'coin') {
      const out = []
      const n = Math.max(1, Math.min(50, coinCount || 1))
      for (let i = 0; i < n; i++) out.push(cryptoRand() < 0.5 ? 'Heads' : 'Tails')
      setCoinResults(out)
    } else if (tab === 'pick') {
      const items = listInput.split('\n').map(s => s.trim()).filter(s => s.length > 0)
      if (items.length === 0) return
      const n = Math.max(1, Math.min(items.length, pickCount || 1))
      const shuffledItems = [...items].sort(() => cryptoRand() - 0.5)
      setPicks(shuffledItems.slice(0, n))
    } else if (tab === 'shuffle') {
      const items = shuffleInput.split('\n').map(s => s.trim()).filter(s => s.length > 0)
      const shuffledItems = [...items].sort(() => cryptoRand() - 0.5)
      setShuffled(shuffledItems)
    }
  }

  const resultText = () => {
    if (tab === 'number') return numbers.join(', ')
    if (tab === 'dice') return diceResults.join(', ')
    if (tab === 'coin') return coinResults.join(', ')
    if (tab === 'pick') return picks.join(', ')
    if (tab === 'shuffle') return shuffled.join(', ')
    return ''
  }

  const copyResult = async () => {
    try { await navigator.clipboard.writeText(resultText()); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch (e) {}
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-2">
        {TABS.map(t => {
          const I = t.icon
          const active = tab === t.id
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={'flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border text-[10px] font-bold transition-all ' + (active ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>
              <I className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      <Card>
        <CardContent className="p-5 md:p-6 space-y-4">
          {tab === 'number' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Min</div><input type="number" value={min} onChange={e => setMin(parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold tabular-nums" /></label>
                <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Max</div><input type="number" value={max} onChange={e => setMax(parseInt(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold tabular-nums" /></label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">How many</div><input type="number" value={qty} onChange={e => setQty(parseInt(e.target.value) || 1)} min="1" max="1000" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold tabular-nums" /></label>
                <label className="flex items-center gap-2 mt-5">
                  <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="w-4 h-4 accent-indigo-500" />
                  <span className="text-xs font-bold">Unique numbers</span>
                </label>
              </div>
            </>
          )}

          {tab === 'dice' && (
            <>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Sides</div>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {DICE_SIDES.map(s => (
                    <button key={s} onClick={() => setSides(s)} className={'py-2 rounded-lg text-xs font-bold border transition-all ' + (sides === s ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>d{s}</button>
                  ))}
                </div>
              </div>
              <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">How many dice</div><input type="number" value={diceCount} onChange={e => setDiceCount(parseInt(e.target.value) || 1)} min="1" max="20" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold tabular-nums" /></label>
            </>
          )}

          {tab === 'coin' && (
            <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">How many coins</div><input type="number" value={coinCount} onChange={e => setCoinCount(parseInt(e.target.value) || 1)} min="1" max="50" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold tabular-nums" /></label>
          )}

          {tab === 'pick' && (
            <>
              <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">List (one per line)</div><textarea value={listInput} onChange={e => setListInput(e.target.value)} rows={5} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium resize-y" /></label>
              <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">How many to pick</div><input type="number" value={pickCount} onChange={e => setPickCount(parseInt(e.target.value) || 1)} min="1" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold tabular-nums" /></label>
            </>
          )}

          {tab === 'shuffle' && (
            <label className="block"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">List to shuffle (one per line)</div><textarea value={shuffleInput} onChange={e => setShuffleInput(e.target.value)} rows={5} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium resize-y" /></label>
          )}

          <button onClick={generate} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors">
            <RefreshCw className="h-4 w-4" /> Generate
          </button>
        </CardContent>
      </Card>

      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-transparent">
        <CardContent className="p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Result</div>
            <button onClick={copyResult} title="Copy result" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 text-xs font-bold transition-colors">
              {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(tab === 'number' ? numbers : tab === 'dice' ? diceResults : tab === 'coin' ? coinResults : tab === 'pick' ? picks : shuffled).map((v, i) => (
              <div key={i} className="inline-flex items-center justify-center min-w-[3rem] px-4 py-2 rounded-xl bg-background border border-indigo-500/40 text-base font-black tabular-nums">{v}</div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Shuffle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>Uses cryptographically strong randomness (crypto.getRandomValues) when available. Everything runs in your browser - no signup, no tracking.</span>
      </div>
    </div>
  )
}