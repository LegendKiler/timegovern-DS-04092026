import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RefreshCw } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UkRemortgage() {
  const [balance, setBalance] = useState('200000')
  const [currentRate, setCurrentRate] = useState('6.5')
  const [newRate, setNewRate] = useState('4.5')
  const [remainingYears, setRemainingYears] = useState('22')
  const [newYears, setNewYears] = useState('25')
  const [fees, setFees] = useState('1500')

  const calc = useMemo(() => {
    const P = parseFloat(balance) || 0
    const r1 = (parseFloat(currentRate) || 0) / 100 / 12
    const n1 = (parseInt(remainingYears) || 0) * 12
    const r2 = (parseFloat(newRate) || 0) / 100 / 12
    const n2 = (parseInt(newYears) || 0) * 12
    const f = parseFloat(fees) || 0
    if (P <= 0 || n1 <= 0 || n2 <= 0) return null

    const oldP = r1 === 0 ? P / n1 : P * r1 * Math.pow(1 + r1, n1) / (Math.pow(1 + r1, n1) - 1)
    const newP = r2 === 0 ? P / n2 : P * r2 * Math.pow(1 + r2, n2) / (Math.pow(1 + r2, n2) - 1)
    const monthlySavings = oldP - newP
    const breakEvenMonths = monthlySavings > 0 ? f / monthlySavings : null
    const lifetimeSavings = monthlySavings * n2 - f
    return { oldP, newP, monthlySavings, breakEvenMonths, lifetimeSavings }
  }, [balance, currentRate, newRate, remainingYears, newYears, fees])

  const fmt = (n) => '£' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { balance, currentRate, newRate, remainingYears, newYears, fees }
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
      type: 'remortgage',
      countrySlug: 'uk',
      title: 'UK Remortgage',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [balance, currentRate, newRate, remainingYears, newYears, fees, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><RefreshCw className="h-4 w-4 text-white" /></div>UK Remortgage Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Outstanding balance</label><Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Current rate (%)</label><Input type="number" step="0.01" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">New rate (%)</label><Input type="number" step="0.01" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Current remaining years</label><Input type="number" value={remainingYears} onChange={(e) => setRemainingYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">New term (years)</label><Input type="number" value={newYears} onChange={(e) => setNewYears(e.target.value)} className="h-11" /></div>
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Fees (arrangement + valuation + legal)</label><Input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="h-11" /></div>
        </div>
        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Current payment</div><div className="text-xl font-black tabular-nums">{fmt(calc.oldP)}</div></div>
              <div className="rounded-xl p-4 bg-indigo-500/10 border border-indigo-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">New payment</div><div className="text-xl font-black text-indigo-600 tabular-nums">{fmt(calc.newP)}</div></div>
            </div>
            {calc.breakEvenMonths && calc.breakEvenMonths > 0 ? (
              <div className="rounded-xl p-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center shadow-xl">
                <div className="text-xs uppercase font-bold opacity-90 mb-1">Break-even</div>
                <div className="text-4xl font-black">{Math.ceil(calc.breakEvenMonths)} months</div>
                <div className="text-xs mt-1 opacity-90">Save {fmt(calc.monthlySavings)}/month · Lifetime: {fmt(calc.lifetimeSavings)}</div>
              </div>
            ) : (
              <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/30 text-sm text-red-600">Remortgaging at this rate doesn't save money. New payment is higher than current.</div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}