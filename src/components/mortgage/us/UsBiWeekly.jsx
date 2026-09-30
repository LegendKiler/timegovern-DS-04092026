import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UsBiWeekly() {
  const [amount, setAmount] = useState('360000')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    if (P <= 0 || n <= 0 || r === 0) return null
    const monthly = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const biweekly = monthly / 2
    // Bi-weekly: 26 payments/year â†’ equivalent to 13 monthly payments
    let bal = P, months = 0, interest = 0
    const rBi = (parseFloat(rate) || 0) / 100 / 26
    while (bal > 0 && months < 1200) { const i = bal * rBi; bal = bal + i - biweekly; interest += i; months++ }
    const baseMonths = n
    const baseInterest = monthly * n - P
    return { monthly, biweekly, biInterest: interest, biMonths: months, baseMonths, baseInterest, saved: baseInterest - interest, savedMonths: baseMonths - months }
  }, [amount, rate, years])
  const fmt = (n) => '$' + Math.round(n).toLocaleString()
  const fmtTime = (m) => Math.floor(m / 26) + 'y ' + Math.floor((m % 26) / 2) + 'm'

  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, years }
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
      type: 'biweekly',
      countrySlug: 'usa',
      title: 'US Bi-Weekly Payment',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md"><Calendar className="h-4 w-4 text-white" /></div>Bi-Weekly Payment Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Loan amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
        </div>
        {calc && (<>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4 bg-muted/40 border border-border"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Monthly</div><div className="text-sm mb-1">Payment: <strong>{fmt(calc.monthly)}</strong></div><div className="text-sm">Interest: <strong>{fmt(calc.baseInterest)}</strong></div><div className="text-xs text-muted-foreground">{fmtTime(calc.baseMonths)} term</div></div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30"><div className="text-[10px] text-cyan-600 uppercase font-bold mb-2">Bi-weekly</div><div className="text-sm mb-1">Payment: <strong>{fmt(calc.biweekly)}</strong></div><div className="text-sm text-cyan-700">Interest: <strong>{fmt(calc.biInterest)}</strong></div><div className="text-xs text-muted-foreground">{fmtTime(calc.biMonths)} term</div></div>
          </div>
          <div className="rounded-xl p-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center shadow-xl"><div className="text-xs uppercase font-bold opacity-90 mb-1">You save</div><div className="text-3xl font-black tabular-nums">{fmt(calc.saved)}</div><div className="text-xs mt-1 opacity-90">Plus {fmtTime(calc.savedMonths)} off your loan</div></div>
        </>)}
      </CardContent>
    </Card>
  )
}