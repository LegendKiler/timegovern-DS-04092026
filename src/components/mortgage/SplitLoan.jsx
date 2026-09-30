import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calculator } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

export default function SplitLoan() {
  const [amount, setAmount] = useState('700000')
  const [years, setYears] = useState('30')
  const [fixedPct, setFixedPct] = useState('50')
  const [fixedRate, setFixedRate] = useState('6.0')
  const [varRate, setVarRate] = useState('6.5')

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const n = (parseInt(years) || 0) * 12
    const pct = Math.min(100, Math.max(0, parseFloat(fixedPct) || 0)) / 100
    const fr = (parseFloat(fixedRate) || 0) / 100 / 12
    const vr = (parseFloat(varRate) || 0) / 100 / 12

    if (P <= 0 || n <= 0) return null

    const fixedPortion = P * pct
    const varPortion = P * (1 - pct)

    const fixedPayment = fr === 0 ? fixedPortion / n : fixedPortion * fr * Math.pow(1 + fr, n) / (Math.pow(1 + fr, n) - 1)
    const varPayment = vr === 0 ? varPortion / n : varPortion * vr * Math.pow(1 + vr, n) / (Math.pow(1 + vr, n) - 1)

    const blendedRate = (parseFloat(fixedRate) * pct + parseFloat(varRate) * (1 - pct))

    const totalPayment = fixedPayment + varPayment
    const singleFixedPayment = fr === 0 ? P / n : P * fr * Math.pow(1 + fr, n) / (Math.pow(1 + fr, n) - 1)
    const singleVarPayment = vr === 0 ? P / n : P * vr * Math.pow(1 + vr, n) / (Math.pow(1 + vr, n) - 1)

    return { fixedPortion, varPortion, fixedPayment, varPayment, totalPayment, blendedRate, singleFixedPayment, singleVarPayment }
  }, [amount, years, fixedPct, fixedRate, varRate])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, years, fixedPct, fixedRate, varRate }
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
      type: 'split-loan',
      countrySlug: 'australia',
      title: 'Australian Split Loan',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, years, fixedPct, fixedRate, varRate, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 shadow-md">
            <Calculator className="h-4 w-4 text-white" />
          </div>
          Split Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Loan amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Loan term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Fixed portion (%)</label><Input type="number" value={fixedPct} onChange={(e) => setFixedPct(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Fixed rate (% p.a.)</label><Input type="number" step="0.01" value={fixedRate} onChange={(e) => setFixedRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Variable rate (% p.a.)</label><Input type="number" step="0.01" value={varRate} onChange={(e) => setVarRate(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Fixed portion</div>
                <div className="text-xl font-black text-blue-600 tabular-nums">{fmt(calc.fixedPortion)}</div>
                <div className="text-xs text-muted-foreground mt-1">{fmt(calc.fixedPayment)}/mo</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Variable portion</div>
                <div className="text-xl font-black text-emerald-600 tabular-nums">{fmt(calc.varPortion)}</div>
                <div className="text-xs text-muted-foreground mt-1">{fmt(calc.varPayment)}/mo</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-gradient-to-br from-slate-500/10 to-slate-700/10 border-2 border-slate-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total monthly repayment</div>
              <div className="text-4xl font-black text-slate-700 dark:text-slate-300 tabular-nums">{fmt(calc.totalPayment)}</div>
              <div className="text-xs text-muted-foreground mt-2">Blended rate: {calc.blendedRate.toFixed(2)}% p.a.</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}