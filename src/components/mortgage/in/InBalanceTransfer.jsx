import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RefreshCw, TrendingDown, AlertCircle } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function formatINR(n) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

export default function InBalanceTransfer() {
  const [balance, setBalance] = useState('4000000')
  const [currentRate, setCurrentRate] = useState('9.5')
  const [remainingYears, setRemainingYears] = useState('18')
  const [newRate, setNewRate] = useState('8.5')
  const [newYears, setNewYears] = useState('20')
  const [fees, setFees] = useState('25000')

  const calc = useMemo(() => {
    const P = parseFloat(balance) || 0
    const r1 = (parseFloat(currentRate) || 0) / 100 / 12
    const n1 = (parseInt(remainingYears) || 0) * 12
    const r2 = (parseFloat(newRate) || 0) / 100 / 12
    const n2 = (parseInt(newYears) || 0) * 12
    const fees2 = parseFloat(fees) || 0
    if (P <= 0 || n1 <= 0 || n2 <= 0) return null

    const emi1 = P * r1 * Math.pow(1 + r1, n1) / (Math.pow(1 + r1, n1) - 1)
    const emi2 = P * r2 * Math.pow(1 + r2, n2) / (Math.pow(1 + r2, n2) - 1)
    const monthlySavings = emi1 - emi2
    const total1 = emi1 * n1
    const total2 = emi2 * n2 + fees2
    const lifetimeSavings = total1 - total2
    const breakEvenMonths = monthlySavings > 0 ? fees2 / monthlySavings : null

    return { emi1, emi2, monthlySavings, total1, total2, lifetimeSavings, breakEvenMonths }
  }, [balance, currentRate, remainingYears, newRate, newYears, fees])

  const f = (n) => '₹' + formatINR(n)


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { balance, currentRate, remainingYears, newRate, newYears, fees }
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
      type: 'balance-transfer',
      countrySlug: 'india',
      title: 'Indian Balance Transfer',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [balance, currentRate, remainingYears, newRate, newYears, fees, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><RefreshCw className="h-4 w-4 text-white" /></div>Balance Transfer Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Outstanding balance (₹)</label><Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Current rate (%)</label><Input type="number" step="0.01" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Remaining years</label><Input type="number" value={remainingYears} onChange={(e) => setRemainingYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">New rate (%)</label><Input type="number" step="0.01" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">New tenure (years)</label><Input type="number" value={newYears} onChange={(e) => setNewYears(e.target.value)} className="h-11" /></div>
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Transfer fees + processing (₹)</label><Input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Current EMI</div>
                <div className="text-lg font-black tabular-nums">{f(calc.emi1)}</div>
              </div>
              <div className="rounded-xl p-4 bg-indigo-500/10 border border-indigo-500/20">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">New EMI</div>
                <div className="text-lg font-black text-indigo-600 tabular-nums">{f(calc.emi2)}</div>
              </div>
            </div>

            {calc.lifetimeSavings > 0 ? (
              <div className="rounded-xl p-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center shadow-xl">
                <div className="text-xs uppercase font-bold opacity-90 mb-1">Lifetime savings</div>
                <div className="text-2xl md:text-3xl font-black tabular-nums">{f(calc.lifetimeSavings)}</div>
                <div className="text-xs mt-1 opacity-90">Monthly savings: {f(calc.monthlySavings)}{calc.breakEvenMonths && ` · Break-even in ${Math.ceil(calc.breakEvenMonths)} months`}</div>
              </div>
            ) : (
              <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/30 text-sm text-red-600 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Balance transfer at this rate doesn't save money. New total cost exceeds current total cost.</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}