import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Star } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UsVa() {
  const [price, setPrice] = useState('400000')
  const [rate, setRate] = useState('6.0')
  const [years, setYears] = useState('30')
  const [usage, setUsage] = useState('first')
  const [downPct, setDownPct] = useState('0')
  const [exempt, setExempt] = useState(false)
  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const dPct = parseFloat(downPct) || 0
    const D = P0 * dPct / 100
    const baseLoan = P0 - D
    let feePct = 0
    if (!exempt) {
      if (dPct >= 10) feePct = 0.0125
      else if (dPct >= 5) feePct = 0.015
      else feePct = usage === 'first' ? 0.0215 : 0.033
    }
    const fundingFee = baseLoan * feePct
    const loan = baseLoan + fundingFee
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    const pi = r === 0 ? loan / n : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    return { D, baseLoan, fundingFee, feePct: (feePct * 100).toFixed(2), loan, pi }
  }, [price, rate, years, usage, downPct, exempt])
  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, rate, years, usage, downPct, exempt }
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
      type: 'va',
      countrySlug: 'usa',
      title: 'US VA Loan',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, rate, years, usage, downPct, exempt, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-700 shadow-md"><Shield className="h-4 w-4 text-white" /></div>VA Loan Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          <button onClick={() => setUsage('first')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (usage === 'first' ? 'bg-primary text-white' : '')}>First use</button>
          <button onClick={() => setUsage('subsequent')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (usage === 'subsequent' ? 'bg-primary text-white' : '')}>Subsequent use</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment (%)</label><Input type="number" value={downPct} onChange={(e) => setDownPct(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <input type="checkbox" checked={exempt} onChange={(e) => setExempt(e.target.checked)} className="h-4 w-4 accent-blue-500" />
          <span className="text-sm font-bold text-blue-700 dark:text-blue-400">Funding fee exempt (disability)</span>
        </label>
        {calc && (<>
          <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Down payment</span><span className="font-bold tabular-nums">{fmt(calc.D)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">VA funding fee ({calc.feePct}%)</span><span className="font-bold tabular-nums">{fmt(calc.fundingFee)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total loan</span><span className="font-bold tabular-nums">{fmt(calc.loan)}</span></div>
          </div>
          <div className="rounded-xl p-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center shadow-xl">
            <Star className="h-5 w-5 mx-auto mb-1 opacity-90" />
            <div className="text-xs uppercase font-bold opacity-90 mb-1">Monthly P&amp;I (no PMI ever)</div>
            <div className="text-4xl font-black tabular-nums">{fmt(calc.pi)}</div>
          </div>
        </>)}
      </CardContent>
    </Card>
  )
}