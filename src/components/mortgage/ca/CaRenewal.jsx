import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RefreshCw, TrendingUp, AlertCircle } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function periodicRate(annualRate, ppy) {
  return Math.pow(1 + (annualRate / 100) / 2, 2 / ppy) - 1
}

export default function CaRenewal() {
  const [balance, setBalance] = useState('480000')
  const [currentRate, setCurrentRate] = useState('1.99')
  const [remainingYears, setRemainingYears] = useState('20')
  const [newRate, setNewRate] = useState('4.79')
  const [newAmort, setNewAmort] = useState('25')

  const calc = useMemo(() => {
    const P = parseFloat(balance) || 0
    const cOld = periodicRate(parseFloat(currentRate) || 0, 12)
    const nOld = (parseInt(remainingYears) || 0) * 12
    const cNew = periodicRate(parseFloat(newRate) || 0, 12)
    const nNew = (parseInt(newAmort) || 0) * 12

    if (P <= 0) return null
    const oldPayment = cOld === 0 ? P / nOld : P * cOld * Math.pow(1 + cOld, nOld) / (Math.pow(1 + cOld, nOld) - 1)
    const newPayment = cNew === 0 ? P / nNew : P * cNew * Math.pow(1 + cNew, nNew) / (Math.pow(1 + cNew, nNew) - 1)
    const increase = newPayment - oldPayment
    const annualIncrease = increase * 12
    const pctIncrease = oldPayment > 0 ? (increase / oldPayment) * 100 : 0

    // If extending amortization to 30
    const n30 = 30 * 12
    const payment30 = cNew === 0 ? P / n30 : P * cNew * Math.pow(1 + cNew, n30) / (Math.pow(1 + cNew, n30) - 1)
    const saving30 = newPayment - payment30

    return { oldPayment, newPayment, increase, annualIncrease, pctIncrease, payment30, saving30 }
  }, [balance, currentRate, remainingYears, newRate, newAmort])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { balance, currentRate, remainingYears, newRate, newAmort }
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
      type: 'renewal',
      countrySlug: 'canada',
      title: 'Canadian Mortgage Renewal',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [balance, currentRate, remainingYears, newRate, newAmort, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><RefreshCw className="h-4 w-4 text-white" /></div>Mortgage Renewal Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Current balance</label><Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Current rate (%)</label><Input type="number" step="0.01" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Remaining years</label><Input type="number" value={remainingYears} onChange={(e) => setRemainingYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">New rate (%)</label><Input type="number" step="0.01" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">New amortization</label><Input type="number" value={newAmort} onChange={(e) => setNewAmort(e.target.value)} className="h-11" /></div>
        </div>
        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Current payment</div>
                <div className="text-xl font-black tabular-nums">{fmt(calc.oldPayment)}</div>
              </div>
              <div className="rounded-xl p-4 bg-indigo-500/10 border border-indigo-500/20">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">New payment</div>
                <div className="text-xl font-black text-indigo-600 tabular-nums">{fmt(calc.newPayment)}</div>
              </div>
            </div>
            {calc.increase > 0 ? (
              <div className="rounded-xl p-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-center shadow-xl">
                <div className="text-xs uppercase font-bold opacity-90 mb-1 flex items-center justify-center gap-1"><TrendingUp className="h-4 w-4" /> Payment shock</div>
                <div className="text-4xl font-black tabular-nums">+{fmt(calc.increase)}/mo</div>
                <div className="text-xs mt-1 opacity-90">+{fmt(calc.annualIncrease)}/year · {calc.pctIncrease.toFixed(1)}% increase</div>
              </div>
            ) : (
              <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center shadow-xl">
                <div className="text-xs uppercase font-bold opacity-90 mb-1">You save</div>
                <div className="text-4xl font-black tabular-nums">{fmt(Math.abs(calc.increase))}/mo</div>
              </div>
            )}
            {calc.increase > 0 && calc.saving30 > 0 && (
              <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs text-blue-700 dark:text-blue-400 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Extend amortization to 30 years â†’ {fmt(calc.payment30)}/mo (saves {fmt(calc.saving30)}/mo, but adds ~$60K+ in lifetime interest).</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}