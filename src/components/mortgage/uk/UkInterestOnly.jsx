import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Percent } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UkInterestOnly() {
  const [amount, setAmount] = useState('250000')
  const [rate, setRate] = useState('4.5')
  const [term, setTerm] = useState('25')
  const [repayYears, setRepayYears] = useState('20')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const annualRate = (parseFloat(rate) || 0) / 100
    const r = annualRate / 12
    const rY = parseInt(repayYears) || 0
    if (P <= 0 || r === 0) return null

    const ioPayment = P * r
    const repayMonths = rY * 12
    const pi = repayMonths > 0 ? P * r * Math.pow(1 + r, repayMonths) / (Math.pow(1 + r, repayMonths) - 1) : 0
    const totalInterest = ioPayment * ((parseInt(term) || 0) - rY) * 12 + pi * repayMonths - P

    return { ioPayment, pi, totalInterest, remainingBalance: P }
  }, [amount, rate, term, repayYears])

  const fmt = (n) => '£' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, term, repayYears }
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
      type: 'interest-only',
      countrySlug: 'uk',
      title: 'UK Interest-Only',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, term, repayYears, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-md"><Percent className="h-4 w-4 text-white" /></div>UK Interest-Only Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Mortgage amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Total term (years)</label><Input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Repayment period after IO (years)</label><Input type="number" value={repayYears} onChange={(e) => setRepayYears(e.target.value)} className="h-11" /></div>
        </div>
        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-pink-500/10 border-2 border-pink-500/30">
                <div className="text-[10px] text-pink-600 uppercase tracking-widest font-bold mb-1">Interest-only payment</div>
                <div className="text-2xl md:text-3xl font-black text-pink-600 tabular-nums">{fmt(calc.ioPayment)}</div>
                <div className="text-xs text-muted-foreground mt-1">per month</div>
              </div>
              <div className="rounded-xl p-4 bg-violet-500/10 border-2 border-violet-500/30">
                <div className="text-[10px] text-violet-600 uppercase tracking-widest font-bold mb-1">P&I repayment after</div>
                <div className="text-2xl md:text-3xl font-black text-violet-600 tabular-nums">{fmt(calc.pi)}</div>
                <div className="text-xs text-muted-foreground mt-1">per month</div>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
              After the IO period, your balance is still £{Math.round(calc.remainingBalance).toLocaleString()} — you must pay the full principal during the repayment period or have a repayment vehicle (investment, sale of property, etc.) in place.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}