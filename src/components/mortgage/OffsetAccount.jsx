import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp, Wallet } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

export default function OffsetAccount() {
  const [amount, setAmount] = useState('700000')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const [offset, setOffset] = useState('100000')
  const [extra, setExtra] = useState('0')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    const O = parseFloat(offset) || 0
    const E = parseFloat(extra) || 0

    if (P <= 0 || n <= 0 || r === 0) return null

    const basePayment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)

    // Scenario 1: Base
    let bal1 = P, months1 = 0, int1 = 0
    while (bal1 > 0 && months1 < 1200) { const i = bal1 * r; bal1 = bal1 + i - basePayment; int1 += i; months1++ }

    // Scenario 2: Offset only (payment stays same, effective interest on (P - O))
    let bal2 = P, months2 = 0, int2 = 0
    while (bal2 > 0 && months2 < 1200) {
      const effective = Math.max(0, bal2 - O)
      const i = effective * r
      bal2 = bal2 + i - basePayment
      int2 += i; months2++
    }

    // Scenario 3: Offset + extra
    let bal3 = P, months3 = 0, int3 = 0
    const payment3 = basePayment + E
    while (bal3 > 0 && months3 < 1200) {
      const effective = Math.max(0, bal3 - O)
      const i = effective * r
      bal3 = bal3 + i - payment3
      int3 += i; months3++
    }

    return {
      base: { months: months1, interest: int1, payment: basePayment },
      offsetOnly: { months: months2, interest: int2, payment: basePayment },
      combined: { months: months3, interest: int3, payment: payment3 },
    }
  }, [amount, rate, years, offset, extra])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()
  const fmtTime = (m) => Math.floor(m / 12) + 'y ' + (m % 12) + 'm'


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, years, offset, extra }
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
      type: 'offset',
      countrySlug: 'australia',
      title: 'Australian Offset Account',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, offset, extra, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-md">
            <Wallet className="h-4 w-4 text-white" />
          </div>
          Offset Account Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Loan amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Loan term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Offset balance</label><Input type="number" value={offset} onChange={(e) => setOffset(e.target.value)} className="h-11" /></div>
          <div className="md:col-span-2"><label className="text-sm font-semibold mb-1.5 block">Extra monthly repayment (optional)</label><Input type="number" value={extra} onChange={(e) => setExtra(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2">Base loan</div>
                <div className="text-sm font-bold mb-1">Interest: {fmt(calc.base.interest)}</div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.base.months)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30">
                <div className="text-[10px] text-violet-600 uppercase tracking-widest font-bold mb-2">With offset only</div>
                <div className="text-sm font-bold mb-1 text-violet-700">Interest: {fmt(calc.offsetOnly.interest)}</div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.offsetOnly.months)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
                <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-2">Offset + extra</div>
                <div className="text-sm font-bold mb-1 text-emerald-700">Interest: {fmt(calc.combined.interest)}</div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.combined.months)}</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">Total saved with offset + extra</div>
              <div className="text-3xl md:text-4xl font-black tabular-nums">{fmt(calc.base.interest - calc.combined.interest)}</div>
              <div className="text-xs mt-1 opacity-90">Plus {fmtTime(calc.base.months - calc.combined.months)} off your loan</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}