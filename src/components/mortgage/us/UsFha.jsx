import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UsFha() {
  const [price, setPrice] = useState('350000')
  const [credit, setCredit] = useState('680')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const score = parseInt(credit) || 0
    const downPct = score >= 580 ? 0.035 : 0.10
    const D = P0 * downPct
    const baseLoan = P0 - D
    const upfrontMip = baseLoan * 0.0175
    const loan = baseLoan + upfrontMip
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    const pi = r === 0 ? loan / n : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const annualMipRate = downPct >= 0.05 ? 0.0050 : 0.0055
    const monthlyMip = baseLoan * annualMipRate / 12
    return { downPct: (downPct * 100).toFixed(1), D, baseLoan, upfrontMip, loan, pi, monthlyMip, total: pi + monthlyMip }
  }, [price, credit, rate, years])
  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, credit, rate, years }
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
      type: 'fha',
      countrySlug: 'usa',
      title: 'US FHA Loan',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, credit, rate, years, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Shield className="h-4 w-4 text-white" /></div>FHA Loan Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Credit score</label><Input type="number" value={credit} onChange={(e) => setCredit(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
        </div>
        {calc && (<>
          <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Minimum down ({calc.downPct}%)</span><span className="font-bold tabular-nums">{fmt(calc.D)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Upfront MIP (1.75%)</span><span className="font-bold tabular-nums">{fmt(calc.upfrontMip)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total loan</span><span className="font-bold tabular-nums">{fmt(calc.loan)}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">P&amp;I</div><div className="text-2xl font-black text-emerald-600 tabular-nums">{fmt(calc.pi)}</div></div>
            <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Annual MIP/mo</div><div className="text-2xl font-black text-blue-600 tabular-nums">{fmt(calc.monthlyMip)}</div></div>
          </div>
          <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center shadow-xl"><div className="text-xs uppercase font-bold opacity-90 mb-1">Total monthly</div><div className="text-4xl font-black tabular-nums">{fmt(calc.total)}</div></div>
        </>)}
      </CardContent>
    </Card>
  )
}