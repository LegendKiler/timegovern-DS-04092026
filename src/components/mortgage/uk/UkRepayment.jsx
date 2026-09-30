import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, TrendingDown, Calendar, Copy, Check, PoundSterling } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

const FREQ = { monthly: { label: 'Monthly', per: 12 }, fortnightly: { label: 'Fortnightly', per: 26 }, weekly: { label: 'Weekly', per: 52 } }

export default function UkRepayment() {
  const [amount, setAmount] = useState('250000')
  const [rate, setRate] = useState('4.5')
  const [years, setYears] = useState('25')
  const [freq, setFreq] = useState('monthly')
  const [copied, setCopied] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    if (P <= 0 || n <= 0) return null
    const monthlyPayment = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const periodsPerYear = FREQ[freq].per
    const payment = monthlyPayment * 12 / periodsPerYear
    const totalPaid = monthlyPayment * n
    const totalInterest = totalPaid - P

    const schedule = []
    let bal = P, yi = 0, yp = 0
    for (let i = 1; i <= n; i++) {
      const int = bal * r
      const prin = monthlyPayment - int
      bal -= prin; yi += int; yp += prin
      if (i % 12 === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / 12), interest: yi, principal: yp, balance: Math.max(0, bal) })
        yi = 0; yp = 0
      }
    }
    return { payment, monthlyPayment, totalPaid, totalInterest, schedule, freqLabel: FREQ[freq].label.toLowerCase() }
  }, [amount, rate, years, freq])

  const fmt = (n) => '£' + Math.round(n).toLocaleString()
  const copy = async () => { if (!calc) return; await navigator.clipboard.writeText('Monthly: ' + fmt(calc.monthlyPayment) + ' | Total interest: ' + fmt(calc.totalInterest)); setCopied(true); setTimeout(() => setCopied(false), 2000) }


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, years, freq }
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
      type: 'repayment',
      countrySlug: 'uk',
      title: 'UK Repayment Mortgage',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, freq, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-md"><Home className="h-4 w-4 text-white" /></div>UK Repayment Mortgage Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Mortgage amount</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Payment frequency</label>
            <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {Object.entries(FREQ).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><PoundSterling className="h-3 w-3" /> Repayment</div>
                <div className="text-2xl md:text-3xl font-black text-red-600 tabular-nums">{fmt(calc.payment)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">per {calc.freqLabel}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Total interest</div>
                <div className="text-2xl md:text-3xl font-black text-orange-600 tabular-nums">{fmt(calc.totalInterest)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-slate-700/10 border border-slate-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Total repaid</div>
                <div className="text-2xl md:text-3xl font-black text-slate-700 dark:text-slate-300 tabular-nums">{fmt(calc.totalPaid)}</div>
              </div>
            </div>

            <button onClick={copy} className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted text-sm font-bold flex items-center justify-center gap-2">
              {copied ? <><Check className="h-4 w-4 text-emerald-500" /> Copied</> : <><Copy className="h-4 w-4" /> Copy summary</>}
            </button>

            <details className="border border-border rounded-xl overflow-hidden bg-card">
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">Amortization schedule</summary>
              <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur"><tr><th className="text-left p-2 font-bold">Year</th><th className="text-right p-2 font-bold">Interest</th><th className="text-right p-2 font-bold">Principal</th><th className="text-right p-2 font-bold">Balance</th></tr></thead>
                  <tbody>{calc.schedule.map((r, i) => (<tr key={i} className="border-t border-border/50"><td className="p-2">{r.year}</td><td className="text-right p-2 tabular-nums text-orange-600">{fmt(r.interest)}</td><td className="text-right p-2 tabular-nums text-emerald-600">{fmt(r.principal)}</td><td className="text-right p-2 tabular-nums font-bold">{fmt(r.balance)}</td></tr>))}</tbody>
                </table>
              </div>
            </details>
          </>
        )}
      </CardContent>
    </Card>
  )
}