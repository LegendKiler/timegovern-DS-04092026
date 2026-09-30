import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, TrendingDown, Calendar, Copy, Check, DollarSign } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

// Canadian semi-annual compounding: c = (1 + rate/2)^(2/p) âˆ’ 1
function periodicRate(annualRate, paymentsPerYear) {
  return Math.pow(1 + (annualRate / 100) / 2, 2 / paymentsPerYear) - 1
}

export default function CaMortgagePayment() {
  const [price, setPrice] = useState('600000')
  const [down, setDown] = useState('120000')
  const [rate, setRate] = useState('4.79')
  const [years, setYears] = useState('25')
  const [freq, setFreq] = useState('monthly')
  const [copied, setCopied] = useState(false)

  const FREQ = { monthly: 12, 'bi-weekly': 26, 'accelerated-bi-weekly': 26, weekly: 52, 'accelerated-weekly': 52, 'semi-monthly': 24 }

  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const D = parseFloat(down) || 0
    const baseLoan = Math.max(0, P0 - D)
    const lvr = P0 > 0 ? (baseLoan / P0) * 100 : 0

    // CMHC insurance
    let cmhcRate = 0
    if (lvr > 95) cmhcRate = 0
    else if (lvr > 90) cmhcRate = 0.0400
    else if (lvr > 85) cmhcRate = 0.0310
    else if (lvr > 80) cmhcRate = 0.0280
    else cmhcRate = 0
    const cmhc = baseLoan * cmhcRate
    const P = baseLoan + cmhc
    const annualRate = parseFloat(rate) || 0
    const amortYears = parseInt(years) || 0

    const ppy = FREQ[freq]
    const c = periodicRate(annualRate, ppy)
    const n = amortYears * ppy
    if (P <= 0 || n <= 0 || c === 0) return null

    const payment = P * c * Math.pow(1 + c, n) / (Math.pow(1 + c, n) - 1)
    const totalPaid = payment * n
    const totalInterest = totalPaid - P

    // Accelerated: half monthly payment every 2 weeks (26 payments)
    const cMonthly = periodicRate(annualRate, 12)
    const monthlyPayment = P * cMonthly * Math.pow(1 + cMonthly, amortYears * 12) / (Math.pow(1 + cMonthly, amortYears * 12) - 1)
    const accBiweekly = monthlyPayment / 2
    const cBi = periodicRate(annualRate, 26)
    let balAcc = P, monthsAcc = 0, intAcc = 0
    while (balAcc > 0 && monthsAcc < 1200) { const i = balAcc * cBi; balAcc = balAcc + i - accBiweekly; intAcc += i; monthsAcc++ }
    const accSavings = totalInterest - intAcc
    const accYears = Math.floor((amortYears * 12 - monthsAcc) / 12)

    // Amortization schedule
    const schedule = []
    let bal = P, yi = 0, yp = 0
    for (let i = 1; i <= n; i++) {
      const int = bal * c, prin = payment - int
      bal -= prin; yi += int; yp += prin
      if (i % ppy === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / ppy), interest: yi, principal: yp, balance: Math.max(0, bal) })
        yi = 0; yp = 0
      }
    }
    return { baseLoan, lvr, cmhc, cmhcRate, loan: P, payment, totalPaid, totalInterest, schedule, accBiweekly, accSavings, accYears, monthlyPayment }
  }, [price, down, rate, years, freq])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()
  const copy = async () => { if (!calc) return; await navigator.clipboard.writeText('Payment: ' + fmt(calc.payment) + ' | Total interest: ' + fmt(calc.totalInterest)); setCopied(true); setTimeout(() => setCopied(false), 2000) }


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, down, rate, years, freq }
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
      type: 'mortgage',
      countrySlug: 'canada',
      title: 'Canadian Mortgage Payment',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, down, rate, years, freq, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-md"><Home className="h-4 w-4 text-white" /></div>Canadian Mortgage Payment Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment</label><Input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Amortization (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold mb-1.5 block">Payment frequency</label>
            <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              <option value="monthly">Monthly</option><option value="semi-monthly">Semi-Monthly</option><option value="bi-weekly">Bi-Weekly</option><option value="accelerated-bi-weekly">Accelerated Bi-Weekly</option><option value="weekly">Weekly</option><option value="accelerated-weekly">Accelerated Weekly</option>
            </select>
          </div>
        </div>

        {calc && (
          <>
            {calc.cmhcRate > 0 && (
              <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30 text-sm">
                <div className="text-[10px] text-blue-600 uppercase tracking-widest font-bold mb-2">CMHC Insurance (required — LVR {calc.lvr.toFixed(1)}%)</div>
                <div className="flex justify-between"><span className="text-muted-foreground">Premium rate</span><span className="font-bold">{(calc.cmhcRate * 100).toFixed(2)}%</span></div>
                <div className="flex justify-between mt-1"><span className="text-muted-foreground">Premium (added to loan)</span><span className="font-bold tabular-nums">{fmt(calc.cmhc)}</span></div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><DollarSign className="h-3 w-3" /> Payment</div>
                <div className="text-2xl font-black text-red-600 tabular-nums">{fmt(calc.payment)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">per {freq.replace('-', ' ')}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Total interest</div>
                <div className="text-2xl font-black text-orange-600 tabular-nums">{fmt(calc.totalInterest)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-slate-700/10 border border-slate-500/20 col-span-2 md:col-span-1">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Total repaid</div>
                <div className="text-2xl font-black text-slate-700 dark:text-slate-300 tabular-nums">{fmt(calc.totalPaid)}</div>
              </div>
            </div>

            {calc.accSavings > 0 && (
              <div className="rounded-xl p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-sm">
                <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-1">Accelerated bi-weekly saves you</div>
                <div className="flex justify-between items-baseline"><span className="text-2xl font-black text-emerald-600 tabular-nums">{fmt(calc.accSavings)}</span><span className="text-xs text-muted-foreground">~{calc.accYears} years faster</span></div>
                <div className="text-[10px] text-muted-foreground mt-1">Pay {fmt(calc.accBiweekly)} every 2 weeks (26 payments/yr = extra monthly payment)</div>
              </div>
            )}

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

            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
              ðŸ‡¨ðŸ‡¦ Canadian mortgages use semi-annual compounding (Interest Act). Monthly rate = (1 + rate/2)^(1/6) âˆ’ 1, not rate/12.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}