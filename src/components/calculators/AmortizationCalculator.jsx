import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart3 } from "lucide-react"

const fmt = (n, d) => (n === null || isNaN(n) || !isFinite(n)) ? '\u2014' : n.toLocaleString('en-US', { maximumFractionDigits: d || 2 })

export default function AmortizationCalculator() {
  const [principal, setPrincipal] = useState('250000')
  const [rate, setRate] = useState('6')
  const [years, setYears] = useState('30')

  const result = useMemo(() => {
    const P = parseFloat(principal), R = parseFloat(rate), Y = parseFloat(years)
    if ([P, R, Y].some(isNaN)) return { err: 'Enter loan amount, rate, term' }
    if (P <= 0 || Y <= 0) return { err: 'Amount and term must be positive' }
    const n = Y * 12
    const r = R / 100 / 12
    const monthly = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const rows = []
    let bal = P
    for (let i = 1; i <= n && i <= 360; i++) {
      const int = bal * r
      const princ = monthly - int
      bal = bal - princ
      rows.push({ i, int, princ, bal })
    }
    const totalInt = rows.reduce((s, x) => s + x.int, 0)
    return { monthly, rows: rows.slice(0, 12), totalInt, totalPaid: P + totalInt, n }
  }, [principal, rate, years])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-700 shadow-md">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          Amortization Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-3"><label className="text-sm font-semibold mb-1.5 block">Loan amount ($)</label><Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (%)</label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="h-11" /></div>
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Term (years)</label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-700/10 rounded-xl p-4 border border-teal-500/20 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><div className="text-xs text-muted-foreground">Monthly payment</div><div className="text-xl font-black text-teal-600 tabular-nums">${fmt(result.monthly)}</div></div>
                <div><div className="text-xs text-muted-foreground">Total interest</div><div className="text-lg font-bold text-teal-600 tabular-nums">${fmt(result.totalInt, 0)}</div></div>
                <div><div className="text-xs text-muted-foreground">Total paid</div><div className="text-lg font-bold text-teal-600 tabular-nums">${fmt(result.totalPaid, 0)}</div></div>
              </div>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-muted/50 px-3 py-2 text-xs font-bold grid grid-cols-4 gap-2">
                <span>Month</span><span className="text-right">Interest</span><span className="text-right">Principal</span><span className="text-right">Balance</span>
              </div>
              <div className="max-h-48 overflow-y-auto text-xs">
                {result.rows.map(r => (
                  <div key={r.i} className="grid grid-cols-4 gap-2 px-3 py-1.5 border-t border-border tabular-nums">
                    <span>{r.i}</span>
                    <span className="text-right text-rose-600">${r.int.toFixed(2)}</span>
                    <span className="text-right text-emerald-600">${r.princ.toFixed(2)}</span>
                    <span className="text-right">${r.bal.toFixed(2)}</span>
                  </div>
                ))}
                <div className="px-3 py-2 text-xs text-center text-muted-foreground border-t border-border">
                  First 12 months of {result.n} total.
                </div>
              </div>
            </div>
          </>
        )}
        <div className="text-xs text-muted-foreground text-center">
          M = P x r x (1+r)^n / ((1+r)^n - 1). Interest first, then principal - that is why early payments are mostly interest.
        </div>
      </CardContent>
    </Card>
  )
}