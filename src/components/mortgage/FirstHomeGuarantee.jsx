import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, CheckCircle2, XCircle } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

// 2026 FHBG rules (indicative)
const RULES = {
  single: { incomeCap: 125000, depositMin: 0.05, depositMax: 0.20, priceCap: { metro: 900000, regional: 750000 } },
  couple: { incomeCap: 200000, depositMin: 0.05, depositMax: 0.20, priceCap: { metro: 900000, regional: 750000 } },
}

export default function FirstHomeGuarantee() {
  const [status, setStatus] = useState('single')
  const [income, setIncome] = useState('100000')
  const [price, setPrice] = useState('750000')
  const [deposit, setDeposit] = useState('40000')
  const [region, setRegion] = useState('metro')

  const calc = useMemo(() => {
    const rule = RULES[status]
    const I = parseFloat(income) || 0
    const P = parseFloat(price) || 0
    const D = parseFloat(deposit) || 0
    const depositPct = P > 0 ? (D / P) * 100 : 0

    const checks = [
      { label: 'Income under ' + (rule.incomeCap).toLocaleString(), pass: I <= rule.incomeCap },
      { label: 'Deposit between 5% and 20%', pass: depositPct >= 5 && depositPct <= 20 },
      { label: 'Property under price cap ($' + rule.priceCap[region].toLocaleString() + ')', pass: P <= rule.priceCap[region] },
      { label: 'First home buyer (assuming yes)', pass: true },
    ]

    const eligible = checks.every(c => c.pass)
    const lmiSaved = P * 0.02 // ~2% indicative LMI at 95% LVR
    const loan = P - D
    const lvr = P > 0 ? (loan / P) * 100 : 0

    return { checks, eligible, lmiSaved, depositPct, lvr }
  }, [status, income, price, deposit, region])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { status, income, price, deposit, region }
const resultsMap = Object.fromEntries(
      Object.entries(calc).flatMap(([k, v]) => {
        if (typeof v === 'number' || typeof v === 'string') return [[k, v]]
        if (v && typeof v === 'object') {
          return Object.entries(v)
            .filter(([_, vv]) => typeof vv === 'number' || typeof vv === 'string')
            .map(([kk, vv]) => [k + '_' + kk, vv])
        }
        return []
      })
    )
    registerCalculation({
      type: 'first-home-guarantee',
      countrySlug: 'australia',
      title: 'Australian First Home Guarantee',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [status, income, price, deposit, region, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-md">
            <Users className="h-4 w-4 text-white" />
          </div>
          First Home Guarantee Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          <button onClick={() => setStatus('single')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (status === 'single' ? 'bg-primary text-white' : '')}>Single</button>
          <button onClick={() => setStatus('couple')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (status === 'couple' ? 'bg-primary text-white' : '')}>Couple / Joint</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Annual household income</label><Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Property price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Deposit available</label><Input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Property location</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              <option value="metro">Capital city / metro</option>
              <option value="regional">Regional area</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          {calc.checks.map((c, i) => (
            <div key={i} className={'flex items-center gap-2 p-3 rounded-xl border ' + (c.pass ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-red-500/5 border-red-500/30')}>
              {c.pass ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> : <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
              <span className={'text-sm font-medium ' + (c.pass ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400')}>{c.label}</span>
            </div>
          ))}
        </div>

        <div className={'rounded-xl p-5 border-2 ' + (calc.eligible ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30')}>
          <div className="text-[10px] uppercase tracking-widest font-bold mb-1">{calc.eligible ? 'You may be eligible' : 'Not eligible'}</div>
          <div className={'text-3xl font-black ' + (calc.eligible ? 'text-emerald-600' : 'text-red-600')}>
            {calc.eligible ? 'Save ' + fmt(calc.lmiSaved) + ' LMI' : 'Review the items above'}
          </div>
          {calc.eligible && <div className="text-xs text-muted-foreground mt-1">With a {calc.depositPct.toFixed(0)}% deposit, the government guarantees your loan so you skip LMI (LVR {calc.lvr.toFixed(1)}%).</div>}
        </div>
      </CardContent>
    </Card>
  )
}