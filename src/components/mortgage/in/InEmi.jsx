import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, TrendingDown, Calendar, Copy, Check, IndianRupee } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function formatINR(n) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

export default function InEmi() {
  const [amount, setAmount] = useState('5000000')
  const [rate, setRate] = useState('8.75')
  const [years, setYears] = useState('20')
  const [copied, setCopied] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseInt(years) || 0) * 12
    if (P <= 0 || n <= 0 || r === 0) return null
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const totalPaid = emi * n
    const totalInterest = totalPaid - P

    const schedule = []
    let bal = P, yi = 0, yp = 0
    for (let i = 1; i <= n; i++) {
      const int = bal * r, prin = emi - int
      bal -= prin; yi += int; yp += prin
      if (i % 12 === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / 12), interest: yi, principal: yp, balance: Math.max(0, bal) })
        yi = 0; yp = 0
      }
    }
    return { emi, totalPaid, totalInterest, schedule, interestPct: (totalInterest / totalPaid) * 100 }
  }, [amount, rate, years])

  const f = (n) => '₹' + formatINR(n)
  const copy = async () => { if (!calc) return; await navigator.clipboard.writeText('EMI: ' + f(calc.emi) + ' | Total interest: ' + f(calc.totalInterest)); setCopied(true); setTimeout(() => setCopied(false), 2000) }


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { amount, rate, years }
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
      type: 'emi',
      countrySlug: 'india',
      title: 'Indian Home Loan EMI',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [amount, rate, years, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md"><Home className="h-4 w-4 text-white" /></div>Home Loan EMI Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Loan amount (₹)</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div className="md:col-span-2"><label className="text-sm font-semibold mb-1.5 block">Tenure (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><IndianRupee className="h-3 w-3" /> Monthly EMI</div>
                <div className="text-xl md:text-2xl font-black text-orange-600 tabular-nums">{f(calc.emi)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Total interest</div>
                <div className="text-xl md:text-2xl font-black text-red-600 tabular-nums">{f(calc.totalInterest)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-slate-700/10 border border-slate-500/20">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Total repaid</div>
                <div className="text-xl md:text-2xl font-black text-slate-700 dark:text-slate-300 tabular-nums">{f(calc.totalPaid)}</div>
              </div>
            </div>

            {/* Visual breakdown bar */}
            <div className="rounded-xl p-4 bg-muted/40 border border-border">
              <div className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Principal vs Interest</div>
              <div className="flex h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500" style={{ width: (100 - calc.interestPct) + '%' }}></div>
                <div className="bg-red-500" style={{ width: calc.interestPct + '%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className="text-emerald-600 font-bold">Principal {(100 - calc.interestPct).toFixed(1)}%</span>
                <span className="text-red-600 font-bold">Interest {calc.interestPct.toFixed(1)}%</span>
              </div>
            </div>

            <button onClick={copy} className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted text-sm font-bold flex items-center justify-center gap-2">
              {copied ? <><Check className="h-4 w-4 text-emerald-500" /> Copied</> : <><Copy className="h-4 w-4" /> Copy summary</>}
            </button>

            <details className="border border-border rounded-xl overflow-hidden bg-card">
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">Yearly amortization schedule</summary>
              <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur"><tr><th className="text-left p-2 font-bold">Year</th><th className="text-right p-2 font-bold">Interest</th><th className="text-right p-2 font-bold">Principal</th><th className="text-right p-2 font-bold">Balance</th></tr></thead>
                  <tbody>{calc.schedule.map((row, i) => (<tr key={i} className="border-t border-border/50"><td className="p-2">{row.year}</td><td className="text-right p-2 tabular-nums text-red-600">₹{formatINR(row.interest)}</td><td className="text-right p-2 tabular-nums text-emerald-600">₹{formatINR(row.principal)}</td><td className="text-right p-2 tabular-nums font-bold">₹{formatINR(row.balance)}</td></tr>))}</tbody>
                </table>
              </div>
            </details>
          </>
        )}
      </CardContent>
    </Card>
  )
}