import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Coffee, Copy, Check, Users } from 'lucide-react'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

const QUICK_TIPS = [10, 15, 18, 20, 25]

const COUNTRIES = [
  { code: 'US', label: 'United States', tip: 20, note: 'Standard 18-20% at restaurants' },
  { code: 'CA', label: 'Canada', tip: 15, note: '15-20% at restaurants' },
  { code: 'UK', label: 'United Kingdom', tip: 10, note: '10-15% or optional service charge' },
  { code: 'AU', label: 'Australia', tip: 0, note: 'Not expected - staff earn minimum wage' },
  { code: 'NZ', label: 'New Zealand', tip: 0, note: 'Not expected' },
  { code: 'EU', label: 'Europe (general)', tip: 5, note: 'Rounding up or 5-10% for good service' },
  { code: 'JP', label: 'Japan', tip: 0, note: 'Not customary - can be considered rude' },
  { code: 'IN', label: 'India', tip: 10, note: '10% at restaurants, 5-10% for delivery' },
]

export default function TipCalculator() {
  const [bill, setBill] = useState(85)
  const [tipPct, setTipPct] = useState(20)
  const [people, setPeople] = useState(2)
  const [country, setCountry] = useState('US')
  const [copied, setCopied] = useState(false)

  const tip = bill * (tipPct / 100)
  const total = bill + tip
  const perPerson = people > 0 ? total / people : total
  const tipPerPerson = people > 0 ? tip / people : tip

  const activeCountry = COUNTRIES.find(c => c.code === country)

  const copyResults = () => {
    const text = `Tip Calculator\n\nBill: ${fmt(bill)}\nTip (${tipPct}%): ${fmt(tip)}\nTotal: ${fmt(total)}\nPeople: ${people}\nPer person: ${fmt(perPerson)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const applyCountryTip = (code) => {
    setCountry(code)
    const c = COUNTRIES.find(x => x.code === code)
    if (c) setTipPct(c.tip)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-md">
            <Coffee className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Tip Calculator</h2>
            <p className="text-xs text-muted-foreground">Calculate tips and split bills, country-aware</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold mb-1.5 block">Bill amount ($)</label>
            <Input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value) || 0)} min="0" step="0.01" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Number of people</label>
            <Input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value) || 1)} min="1" max="50" />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-bold mb-1.5 block">Country preset</label>
          <select value={country} onChange={(e) => applyCountryTip(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>{c.label} - {c.tip}% typical</option>
            ))}
          </select>
          {activeCountry && (
            <p className="text-xs text-muted-foreground mt-1.5">{activeCountry.note}</p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold">Tip percentage</label>
            <span className="text-sm font-black text-rose-500">{tipPct}%</span>
          </div>
          <input type="range" min="0" max="50" value={tipPct} onChange={(e) => setTipPct(Number(e.target.value))} className="w-full accent-rose-500" />
          <div className="flex gap-2 mt-3">
            {QUICK_TIPS.map(t => (
              <button key={t} onClick={() => setTipPct(t)} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (tipPct === t ? 'bg-rose-500 text-white' : 'bg-muted hover:bg-muted/70')}>
                {t}%
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border-2 p-4 bg-rose-500/5 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Tip amount</div>
            <div className="text-lg md:text-2xl font-black text-rose-600 dark:text-rose-400">{fmt(tip)}</div>
          </div>
          <div className="rounded-xl border-2 p-4 bg-emerald-500/5 border-emerald-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Total bill</div>
            <div className="text-lg md:text-2xl font-black text-emerald-600 dark:text-emerald-400">{fmt(total)}</div>
          </div>
        </div>

        {people > 1 && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">Split between {people} people</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Tip each:</span> <strong>{fmt(tipPerPerson)}</strong></div>
              <div><span className="text-muted-foreground">Each pays:</span> <strong>{fmt(perPerson)}</strong></div>
            </div>
          </div>
        )}

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}