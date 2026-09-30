import { useState, useMemo, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Copy, Check, TrendingDown, DollarSign, Calendar } from "lucide-react"

const FREQ = { weekly: { label: 'Weekly', periods: 52 }, fortnightly: { label: 'Fortnightly', periods: 26 }, monthly: { label: 'Monthly', periods: 12 } }

export default function HomeLoanRepayment({ defaults = {} }) {
  const [amount, setAmount] = useState(defaults.amount || '700000')
  const [rate, setRate] = useState(defaults.rate || '6.5')
  const [years, setYears] = useState(defaults.years || '30')
  const [frequency, setFrequency] = useState('monthly')
  const [copied, setCopied] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const annualRate = (parseFloat(rate) || 0) / 100
    const term = parseInt(years) || 0
    const periodsPerYear = FREQ[frequency].periods
    const r = annualRate / periodsPerYear
    const n = term * periodsPerYear

    if (P <= 0 || n <= 0) return null
    const payment = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPaid = payment * n
    const totalInterest = totalPaid - P

    // Amortization schedule (yearly)
    const schedule = []
    let balance = P
    let yearInterest = 0
    let yearPrincipal = 0
    for (let i = 1; i <= n; i++) {
      const interest = balance * r
      const principal = payment - interest
      balance -= principal
      yearInterest += interest
      yearPrincipal += principal
      if (i % periodsPerYear === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / periodsPerYear), interest: yearInterest, principal: yearPrincipal, balance: Math.max(0, balance) })
        yearInterest = 0; yearPrincipal = 0
      }
    }
    return { payment, totalPaid, totalInterest, schedule }}, [amount, rate, years, frequency])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  // Push to context so SaveCalculation can capture current inputs/results
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const amountNum = parseFloat(amount) || 0
    const rateNum = parseFloat(rate) || 0
    const yearsNum = parseInt(years) || 0
    console.log('📊 registerCalculation fired:', calc.payment, calc.totalInterest)
    registerCalculation({
      type: 'mortgage',
      countrySlug: 'australia',
      title: 'Australian Home Loan',
      inputs: {
        loan_amount: amountNum,
        interest_rate: rateNum,
        term_years: yearsNum,
        frequency: frequency,
      },
      results: {
        payment: Math.round(calc.payment || 0),
        total_interest: Math.round(calc.totalInterest || 0),
        total_paid: Math.round(calc.totalPaid || 0),
      },
    })
  }, [amount, rate, years, frequency, calc, registerCalculation])
  const copy = async () => { if (!calc) return; await navigator.clipboard.writeText('Monthly repayment: ' + fmt(calc.payment) + ' | Total interest: ' + fmt(calc.totalInterest)); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
            <Home className="h-4 w-4 text-white" />
          </div>
          Home Loan Repayment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Loan amount</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label>
            <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Loan term (years)</label>
            <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Repayment frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {Object.entries(FREQ).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><DollarSign className="h-3 w-3" /> Repayment</div>
                <div className="text-2xl md:text-3xl font-black text-emerald-600 tabular-nums">{fmt(calc.payment)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">per {frequency === 'monthly' ? 'month' : frequency === 'fortnightly' ? 'fortnight' : 'week'}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Total interest</div>
                <div className="text-2xl md:text-3xl font-black text-orange-600 tabular-nums">{fmt(calc.totalInterest)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">over {years} years</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-slate-700/10 border border-slate-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Total repaid</div>
                <div className="text-2xl md:text-3xl font-black text-slate-700 dark:text-slate-300 tabular-nums">{fmt(calc.totalPaid)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">principal + interest</div>
              </div>
            </div>

            <Button onClick={copy} variant="outline" className="w-full h-10">
              {copied ? <><Check className="h-4 w-4 mr-2 text-emerald-500" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy summary</>}
            </Button>

            <details className="border border-border rounded-xl overflow-hidden bg-card">
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30 hover:bg-muted/50">Amortization schedule</summary>
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur"><tr><th className="text-left p-2 font-bold">Year</th><th className="text-right p-2 font-bold">Interest</th><th className="text-right p-2 font-bold">Principal</th><th className="text-right p-2 font-bold">Balance</th></tr></thead>
                  <tbody>
                    {calc.schedule.map((r, i) => (
                      <tr key={i} className="border-t border-border/50"><td className="p-2">{r.year}</td><td className="text-right p-2 tabular-nums text-orange-600">{fmt(r.interest)}</td><td className="text-right p-2 tabular-nums text-emerald-600">{fmt(r.principal)}</td><td className="text-right p-2 tabular-nums font-bold">{fmt(r.balance)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </>
        )}
      </CardContent>
    </Card>
  )
}