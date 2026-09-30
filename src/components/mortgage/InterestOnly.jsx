import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Percent } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

export default function InterestOnly() {
  const [amount, setAmount] = useState('700000')
  const [rate, setRate] = useState('6.5')
  const [totalYears, setTotalYears] = useState('30')
  const [ioYears, setIoYears] = useState('5')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const total = parseInt(totalYears) || 0
    const ioY = parseInt(ioYears) || 0
    const piYears = total - ioY

    if (P <= 0 || r === 0) return null

    const ioPayment = P * r
    const piN = piYears * 12
    const piPayment = piN > 0 ? P * r * Math.pow(1 + r, piN) / (Math.pow(1 + r, piN) - 1) : 0

    const ioTotal = ioPayment * ioY * 12
    const piTotal = piPayment * piN
    const totalPaid = ioTotal + piTotal
    const totalInterest = totalPaid - P

    return { ioPayment, piPayment, ioTotal, piTotal, totalPaid, totalInterest, ioYears: ioY, piYears }
  }, [amount, rate, totalYears, ioYears])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, totalYears, ioYears }
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
      countrySlug: 'australia',
      title: 'Australian Interest-Only',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, totalYears, ioYears, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-md">
            <Percent className="h-4 w-4 text-white" />
          </div>
          Interest-Only Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Loan amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Total loan term (years)</label><Input type="number" value={totalYears} onChange={(e) => setTotalYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest-only period (years)</label><Input type="number" value={ioYears} onChange={(e) => setIoYears(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-2 border-pink-500/30">
                <div className="text-[10px] text-pink-600 uppercase tracking-widest font-bold mb-1">Interest-only payment</div>
                <div className="text-2xl md:text-3xl font-black text-pink-600 tabular-nums">{fmt(calc.ioPayment)}</div>
                <div className="text-xs text-muted-foreground mt-1">per month for {calc.ioYears} years</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30">
                <div className="text-[10px] text-violet-600 uppercase tracking-widest font-bold mb-1">P&I payment after</div>
                <div className="text-2xl md:text-3xl font-black text-violet-600 tabular-nums">{fmt(calc.piPayment)}</div>
                <div className="text-xs text-muted-foreground mt-1">per month for {calc.piYears} years</div>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Interest paid during IO</span><span className="font-bold tabular-nums">{fmt(calc.ioTotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Interest + principal after</span><span className="font-bold tabular-nums">{fmt(calc.piTotal)}</span></div>
              <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Total interest paid</span><span className="font-bold tabular-nums text-orange-600">{fmt(calc.totalInterest)}</span></div>
            </div>

            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
              Interest-only payments don't reduce your principal — after {calc.ioYears} years your balance is still {fmt(parseFloat(amount))}, and your payment jumps by {fmt(calc.piPayment - calc.ioPayment)}/month.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}