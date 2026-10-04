import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Receipt } from "lucide-react"

const PRESETS = [
  { label: 'Custom rate', rate: null },
  { label: 'US - California', rate: 7.25 },
  { label: 'US - New York', rate: 4.0 },
  { label: 'US - Texas', rate: 6.25 },
  { label: 'US - Florida', rate: 6.0 },
  { label: 'US - Washington', rate: 6.5 },
  { label: 'UK VAT (20%)', rate: 20 },
  { label: 'Germany VAT (19%)', rate: 19 },
  { label: 'France VAT (20%)', rate: 20 },
  { label: 'Australia GST (10%)', rate: 10 },
  { label: 'Canada GST (5%)', rate: 5 },
  { label: 'India GST (18%)', rate: 18 },
  { label: 'UAE VAT (5%)', rate: 5 },
  { label: 'Singapore GST (9%)', rate: 9 },
]

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState('100')
  const [rate, setRate] = useState('7.25')
  const [mode, setMode] = useState('add')
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'sales-tax',
      countrySlug: null,
      title: 'Sales Tax',
      inputs: { amount, rate, mode },
      results: result || {},
    })
  }, [amount, rate, mode, result, registerCalculation])

  const calc = () => {
    const a = parseFloat(amount)
    const r = parseFloat(rate)
    if (isNaN(a) || isNaN(r)) return
    if (mode === 'add') {
      const tax = a * r / 100
      setResult({ base: a, tax, total: a + tax, rate: r, mode: 'add' })
    } else {
      const base = a / (1 + r / 100)
      const tax = a - base
      setResult({ base, tax, total: a, rate: r, mode: 'remove' })
    }
  }

  const pickPreset = (label) => {
    const p = PRESETS.find(x => x.label === label)
    if (p && p.rate != null) setRate(String(p.rate))
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
            <Receipt className="h-4 w-4 text-white" />
          </div>
          Sales Tax / VAT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-1 p-1 rounded-lg bg-muted">
          <button onClick={() => { setMode('add'); setResult(null) }} className={'flex-1 py-2 text-xs font-bold rounded-md transition ' + (mode==='add' ? 'bg-background shadow' : 'text-muted-foreground')}>Add Tax</button>
          <button onClick={() => { setMode('remove'); setResult(null) }} className={'flex-1 py-2 text-xs font-bold rounded-md transition ' + (mode==='remove' ? 'bg-background shadow' : 'text-muted-foreground')}>Remove Tax</button>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block">{mode === 'add' ? 'Amount (before tax)' : 'Amount (with tax)'}</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" />
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block">Tax Rate (%)</label>
          <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" />
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block">Quick preset</label>
          <select onChange={(e) => pickPreset(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground text-sm">
            <option value="">-- Select region --</option>
            {PRESETS.map(p => <option key={p.label} value={p.label}>{p.label}{p.rate != null ? ' — ' + p.rate + '%' : ''}</option>)}
          </select>
        </div>

        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 text-white">Calculate</Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 text-center border border-purple-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</div>
              <div className="text-3xl font-black text-purple-600 tabular-nums">{result.total.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Base</div><div className="font-bold tabular-nums">{result.base.toFixed(2)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Tax ({result.rate}%)</div><div className="font-bold tabular-nums">{result.tax.toFixed(2)}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}