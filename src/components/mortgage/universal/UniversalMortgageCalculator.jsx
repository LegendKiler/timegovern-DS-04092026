import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, TrendingDown, Calendar, Copy, Check } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

// Format currency using the country's locale
function formatCurrency(n, symbol, locale) {
  try {
    return symbol + Math.round(n).toLocaleString(locale || 'en-US')
  } catch {
    return symbol + Math.round(n).toLocaleString()
  }
}

// Periodic rate based on compounding method
function periodicRate(annualRate, ppy, method) {
  if (method === 'semi-annual') {
    return Math.pow(1 + (annualRate / 100) / 2, 2 / ppy) - 1
  }
  return annualRate / 100 / ppy
}

const FREQ = { monthly: 12, 'bi-weekly': 26, weekly: 52, 'semi-monthly': 24 }

export default function UniversalMortgageCalculator({ country }) {
  const c = country
  const defaultDown = c.defaultLTV ? Math.round(100 - c.defaultLTV) : 20

  const [price, setPrice] = useState(c.name === 'Japan' ? '40000000' : c.name === 'Pakistan' ? '15000000' : c.name === 'Indonesia' ? '1500000000' : '400000')
  const [downPct, setDownPct] = useState(String(defaultDown))
  const [rate, setRate] = useState(String(c.defaultRate || 4))
  const [years, setYears] = useState(String(c.defaultYears || 25))
  const [freq, setFreq] = useState('monthly')
  const [copied, setCopied] = useState(false)

  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const dPct = parseFloat(downPct) || 0
    const D = P0 * dPct / 100
    const P = P0 - D
    const annualRate = parseFloat(rate) || 0
    const amortYears = parseInt(years) || 0
    const ppy = FREQ[freq]
    const r = periodicRate(annualRate, ppy, c.compounding || 'monthly')
    const n = amortYears * ppy
    if (P <= 0 || n <= 0 || r === 0) return null

    const payment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const totalPaid = payment * n
    const totalInterest = totalPaid - P

    const schedule = []
    let bal = P, yi = 0, yp = 0
    for (let i = 1; i <= n; i++) {
      const int = bal * r, prin = payment - int
      bal -= prin; yi += int; yp += prin
      if (i % ppy === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / ppy), interest: yi, principal: yp, balance: Math.max(0, bal) })
        yi = 0; yp = 0
      }
    }
    return { downPayment: D, loan: P, payment, totalPaid, totalInterest, schedule, ltv: (P / P0) * 100 }
  }, [price, downPct, rate, years, freq, c])

  const f = (n) => formatCurrency(n, c.currencySymbol, c.locale)
  const copy = async () => { if (!calc) return; await navigator.clipboard.writeText('Payment: ' + f(calc.payment) + ' | Interest: ' + f(calc.totalInterest)); setCopied(true); setTimeout(() => setCopied(false), 2000) }


  // Push current calculation to context
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, downPct, rate, years, freq }
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
      countrySlug: c.name?.toLowerCase() || 'unknown',
      title: c.name + ' Mortgage Calculator',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, downPct, rate, years, freq, calc, c, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className={'p-2 rounded-xl bg-gradient-to-br ' + c.gradient + ' shadow-md'}>
            <Home className="h-4 w-4 text-white" />
          </div>
          {c.name} Mortgage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Property price</label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Down payment (%) — typical {defaultDown}%</label>
            <Input type="number" value={downPct} onChange={(e) => setDownPct(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label>
            <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Term (years)</label>
            <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold mb-1.5 block">Payment frequency</label>
            <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              <option value="monthly">Monthly</option>
              <option value="semi-monthly">Semi-Monthly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border-2 border-emerald-500/40">
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-bold mb-1">Payment</div>
                <div className="text-xl md:text-2xl font-black tabular-nums text-emerald-700 dark:text-emerald-300">{f(calc.payment)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">per {freq.replace('-', ' ')}</div>
              </div>
              <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Total interest</div>
                <div className="text-xl md:text-2xl font-black text-red-600 tabular-nums">{f(calc.totalInterest)}</div>
              </div>
              <div className="rounded-xl p-4 bg-slate-500/10 border border-slate-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Total paid</div>
                <div className="text-xl md:text-2xl font-black text-slate-700 dark:text-slate-300 tabular-nums">{f(calc.totalPaid)}</div>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Down payment</span><span className="font-bold tabular-nums">{f(calc.downPayment)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Loan amount</span><span className="font-bold tabular-nums">{f(calc.loan)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">LTV</span><span className="font-bold tabular-nums">{calc.ltv.toFixed(1)}%</span></div>
              {c.stampDuty && (
                <div className="flex justify-between pt-2 border-t border-border"><span className="text-muted-foreground">{c.stampDuty.name}</span><span className="font-bold">{c.stampDuty.rateRange[0]}–{c.stampDuty.rateRange[1]}%</span></div>
              )}
            </div>

            <button onClick={copy} className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted text-sm font-bold flex items-center justify-center gap-2">
              {copied ? <><Check className="h-4 w-4 text-emerald-500" /> Copied</> : <><Copy className="h-4 w-4" /> Copy summary</>}
            </button>

            <details className="border border-border rounded-xl overflow-hidden bg-card">
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">Amortization schedule</summary>
              <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                    <tr><th className="text-left p-2 font-bold">Year</th><th className="text-right p-2 font-bold">Interest</th><th className="text-right p-2 font-bold">Principal</th><th className="text-right p-2 font-bold">Balance</th></tr>
                  </thead>
                  <tbody>
                    {calc.schedule.map((r, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="p-2">{r.year}</td>
                        <td className="text-right p-2 tabular-nums text-red-600">{f(r.interest)}</td>
                        <td className="text-right p-2 tabular-nums text-emerald-600">{f(r.principal)}</td>
                        <td className="text-right p-2 tabular-nums font-bold">{f(r.balance)}</td>
                      </tr>
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