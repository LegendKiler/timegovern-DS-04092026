import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

export default function ExtraRepayment() {
  const [amount, setAmount] = useState('700000')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const [extra, setExtra] = useState('500')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    const E = parseFloat(extra) || 0
    if (P <= 0 || n <= 0 || r === 0) return null

    const basePayment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)

    let bal1 = P, m1 = 0, i1 = 0
    while (bal1 > 0 && m1 < 1200) { const i = bal1 * r; bal1 = bal1 + i - basePayment; i1 += i; m1++ }

    let bal2 = P, m2 = 0, i2 = 0
    const p2 = basePayment + E
    while (bal2 > 0 && m2 < 1200) { const i = bal2 * r; bal2 = bal2 + i - p2; i2 += i; m2++ }

    return {
      basePayment, withExtra: p2,
      baseInterest: i1, newInterest: i2,
      baseMonths: m1, newMonths: m2,
      savedInterest: i1 - i2,
      savedMonths: m1 - m2,
    }
  }, [amount, rate, years, extra])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()
  const fmtTime = (m) => Math.floor(m / 12) + 'y ' + (m % 12) + 'm'


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, years, extra }
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
      type: 'extra-repayment',
      countrySlug: 'australia',
      title: 'Australian Extra Repayment',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, extra, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-lime-500 to-green-500 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Extra Repayment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Loan amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Loan term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Extra monthly repayment</label><Input type="number" value={extra} onChange={(e) => setExtra(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2">Without extra</div>
                <div className="text-sm mb-1">Repayment: <strong>{fmt(calc.basePayment)}</strong></div>
                <div className="text-sm mb-1">Interest: <strong>{fmt(calc.baseInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.baseMonths)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-lime-500/10 to-green-500/10 border-2 border-lime-500/30">
                <div className="text-[10px] text-lime-600 uppercase tracking-widest font-bold mb-2">With extra {fmt(parseFloat(extra))}/mo</div>
                <div className="text-sm mb-1">Repayment: <strong>{fmt(calc.withExtra)}</strong></div>
                <div className="text-sm mb-1 text-lime-700">Interest: <strong>{fmt(calc.newInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.newMonths)}</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-gradient-to-r from-lime-500 to-green-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">You save</div>
              <div className="text-3xl md:text-4xl font-black tabular-nums">{fmt(calc.savedInterest)}</div>
              <div className="text-xs mt-1 opacity-90">Plus {fmtTime(calc.savedMonths)} off your loan</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}