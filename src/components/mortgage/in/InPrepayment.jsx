import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp, Info, IndianRupee } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function formatINR(n) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

export default function InPrepayment() {
  const [amount, setAmount] = useState('5000000')
  const [rate, setRate] = useState('8.75')
  const [years, setYears] = useState('20')
  const [extra, setExtra] = useState('10000')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    const E = parseFloat(extra) || 0
    if (P <= 0 || n <= 0 || r === 0) return null

    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)

    // Without prepayment
    let bal1 = P, m1 = 0, i1 = 0
    while (bal1 > 0 && m1 < 1200) { const int = bal1 * r; bal1 = bal1 + int - emi; i1 += int; m1++ }

    // With monthly extra
    let bal2 = P, m2 = 0, i2 = 0
    const pay2 = emi + E
    while (bal2 > 0 && m2 < 1200) { const int = bal2 * r; bal2 = bal2 + int - pay2; i2 += int; m2++ }

    return { emi, baseInterest: i1, newInterest: i2, baseMonths: m1, newMonths: m2, savedInterest: i1 - i2, savedMonths: m1 - m2 }
  }, [amount, rate, years, extra])

  const f = (n) => '₹' + formatINR(n)
  const fmtTime = (m) => {
    const y = Math.floor(m / 12), mo = m % 12
    return (y > 0 ? y + 'y ' : '') + mo + 'm'
  }


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
      type: 'prepayment',
      countrySlug: 'india',
      title: 'Indian Prepayment',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, extra, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><TrendingUp className="h-4 w-4 text-white" /></div>Prepayment Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Loan amount (₹)</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Tenure (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Extra monthly payment (₹)</label><Input type="number" value={extra} onChange={(e) => setExtra(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2">Without prepay</div>
                <div className="text-sm mb-1">EMI: <strong>₹{formatINR(calc.emi)}</strong></div>
                <div className="text-sm mb-1">Interest: <strong>₹{formatINR(calc.baseInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.baseMonths)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
                <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-2">With prepay</div>
                <div className="text-sm mb-1">Payment: <strong>₹{formatINR(calc.emi + parseFloat(extra))}</strong></div>
                <div className="text-sm mb-1 text-emerald-700">Interest: <strong>₹{formatINR(calc.newInterest)}</strong></div>
                <div className="text-xs text-muted-foreground">Paid off in {fmtTime(calc.newMonths)}</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">Total savings</div>
              <div className="text-2xl md:text-3xl font-black tabular-nums">₹{formatINR(calc.savedInterest)}</div>
              <div className="text-xs mt-1 opacity-90">Plus {fmtTime(calc.savedMonths)} off your loan tenure</div>
            </div>

            <div className="rounded-lg p-3 bg-emerald-500/10 border border-emerald-500/30 text-xs flex items-start gap-2">
              <Info className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-emerald-700 dark:text-emerald-400">RBI mandates ZERO prepayment penalty on floating-rate home loans for individual borrowers. Prepay early — even small monthly amounts save lakhs over 20 years.</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}