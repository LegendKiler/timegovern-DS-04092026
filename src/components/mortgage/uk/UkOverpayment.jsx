import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp, Info } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UkOverpayment() {
  const [amount, setAmount] = useState('250000')
  const [rate, setRate] = useState('4.5')
  const [years, setYears] = useState('25')
  const [overpay, setOverpay] = useState('200')
  const [overpayType, setOverpayType] = useState('monthly')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    const O = parseFloat(overpay) || 0
    if (P <= 0 || n <= 0 || r === 0) return null

    const basePayment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const monthlyExtra = overpayType === 'monthly' ? O : 0

    let bal1 = P, m1 = 0, i1 = 0
    while (bal1 > 0 && m1 < 1200) { const int = bal1 * r; bal1 = bal1 + int - basePayment; i1 += int; m1++ }

    let bal2 = P, m2 = 0, i2 = 0
    const p2 = basePayment + monthlyExtra
    while (bal2 > 0 && m2 < 1200) { const int = bal2 * r; bal2 = bal2 + int - p2; i2 += int; m2++ }

    return { basePayment, baseInterest: i1, newInterest: i2, baseMonths: m1, newMonths: m2, savedInterest: i1 - i2, savedMonths: m1 - m2 }
  }, [amount, rate, years, overpay, overpayType])

  const fmt = (n) => '£' + Math.round(n).toLocaleString()
  const fmtTime = (m) => Math.floor(m / 12) + 'y ' + (m % 12) + 'm'


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, years, overpay, overpayType }
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
      type: 'overpayment',
      countrySlug: 'uk',
      title: 'UK Overpayment',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, overpay, overpayType, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><TrendingUp className="h-4 w-4 text-white" /></div>UK Overpayment Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Mortgage amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Overpayment type</label>
            <select value={overpayType} onChange={(e) => setOverpayType(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              <option value="monthly">Monthly overpayment</option>
              <option value="lump">One-off lump sum</option>
            </select>
          </div>
          <div className="md:col-span-2"><label className="text-sm font-semibold mb-1.5 block">{overpayType === 'monthly' ? 'Extra monthly payment' : 'One-off lump sum'}</label><Input type="number" value={overpay} onChange={(e) => setOverpay(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2">Without overpayment</div>
                <div className="text-sm mb-1">Monthly: <strong>{fmt(calc.basePayment)}</strong></div>
                <div className="text-sm mb-1">Interest: <strong>{fmt(calc.baseInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.baseMonths)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
                <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-2">With overpayment</div>
                <div className="text-sm mb-1 text-emerald-700">Interest: <strong>{fmt(calc.newInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.newMonths)}</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">You save</div>
              <div className="text-3xl md:text-4xl font-black tabular-nums">{fmt(calc.savedInterest)}</div>
              <div className="text-xs mt-1 opacity-90">Plus {fmtTime(calc.savedMonths)} off your mortgage</div>
            </div>

            <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-blue-700 dark:text-blue-400">Most UK lenders allow 10% of the balance as annual overpayment without early repayment charges (ERC). Check your lender's terms.</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}