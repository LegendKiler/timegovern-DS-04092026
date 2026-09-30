import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, TrendingDown } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function periodicRate(annualRate, ppy) {
  return Math.pow(1 + (annualRate / 100) / 2, 2 / ppy) - 1
}

export default function CaBiWeeklyAccelerated() {
  const [amount, setAmount] = useState('480000')
  const [rate, setRate] = useState('4.79')
  const [years, setYears] = useState('25')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const annualRate = parseFloat(rate) || 0
    const amortYears = parseInt(years) || 0
    if (P <= 0 || amortYears <= 0 || annualRate === 0) return null

    const cMonthly = periodicRate(annualRate, 12)
    const nMonthly = amortYears * 12
    const monthlyPayment = P * cMonthly * Math.pow(1 + cMonthly, nMonthly) / (Math.pow(1 + cMonthly, nMonthly) - 1)
    const monthlyInterest = monthlyPayment * nMonthly - P

    // Accelerated bi-weekly: pay half the monthly payment every 2 weeks
    const accBiweekly = monthlyPayment / 2
    const cBi = periodicRate(annualRate, 26)
    let bal = P, periods = 0, accInterest = 0
    while (bal > 0 && periods < 2000) {
      const i = bal * cBi
      bal = bal + i - accBiweekly
      accInterest += i
      periods++
    }

    const yearsSaved = (nMonthly - periods) / 26
    return { monthlyPayment, monthlyInterest, accBiweekly, accInterest, periods, yearsSaved, saved: monthlyInterest - accInterest }
  }, [amount, rate, years])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


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
      countrySlug: 'canada',
      title: 'Canadian Accelerated Bi-Weekly',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md"><Calendar className="h-4 w-4 text-white" /></div>Accelerated Bi-Weekly Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Mortgage amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Amortization (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
        </div>
        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2">Monthly</div>
                <div className="text-sm mb-1">Payment: <strong>{fmt(calc.monthlyPayment)}</strong></div>
                <div className="text-sm mb-1">Interest: <strong>{fmt(calc.monthlyInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">{years} year amortization</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30">
                <div className="text-[10px] text-cyan-600 uppercase tracking-widest font-bold mb-2">Accelerated bi-weekly</div>
                <div className="text-sm mb-1">Payment: <strong>{fmt(calc.accBiweekly)}</strong></div>
                <div className="text-sm mb-1 text-cyan-700">Interest: <strong>{fmt(calc.accInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">26 payments/yr — paid off faster</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">Total savings</div>
              <div className="text-4xl font-black tabular-nums">{fmt(calc.saved)}</div>
              <div className="text-xs mt-1 opacity-90">~{calc.yearsSaved.toFixed(1)} years off your mortgage</div>
            </div>
            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
              Accelerated bi-weekly = half the monthly payment every 2 weeks. You make 26 payments/year (13 months worth), cutting years off your amortization.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}