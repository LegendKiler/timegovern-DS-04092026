import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home } from "lucide-react"

const fmt = (n, d) => (n === null || isNaN(n) || !isFinite(n)) ? '\u2014' : n.toLocaleString('en-US', { maximumFractionDigits: d || 2 })

export default function DownPaymentCalculator() {
  const [price, setPrice] = useState('400000')
  const [pct, setPct] = useState('20')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')

  const result = useMemo(() => {
    const P = parseFloat(price), Pct = parseFloat(pct), R = parseFloat(rate), Y = parseFloat(years)
    if ([P, Pct, R, Y].some(isNaN)) return { err: 'Enter all four fields' }
    if (P <= 0 || Pct < 0 || Pct >= 100 || Y <= 0) return { err: 'Check price, down %, and term' }
    const down = P * Pct / 100
    const loan = P - down
    const n = Y * 12
    const r = R / 100 / 12
    const monthly = r === 0 ? loan / n : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const totalPaid = monthly * n
    const totalInterest = totalPaid - loan
    return { down, loan, monthly, totalInterest, totalCost: down + totalPaid }
  }, [price, pct, rate, years])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
            <Home className="h-4 w-4 text-white" />
          </div>
          Down Payment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price ($)</label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment (%)</label><Input type="number" value={pct} onChange={e => setPct(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (%)</label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Term (years)</label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-xl p-4 border border-amber-500/20 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">Down payment</div><div className="text-xl font-black text-amber-600 tabular-nums">${fmt(result.down, 0)}</div></div>
              <div><div className="text-xs text-muted-foreground">Loan amount</div><div className="text-xl font-black text-amber-600 tabular-nums">${fmt(result.loan, 0)}</div></div>
              <div><div className="text-xs text-muted-foreground">Monthly P and I</div><div className="text-xl font-black text-amber-600 tabular-nums">${fmt(result.monthly)}</div></div>
              <div><div className="text-xs text-muted-foreground">Total interest</div><div className="text-xl font-black text-amber-600 tabular-nums">${fmt(result.totalInterest, 0)}</div></div>
            </div>
            <div className="text-xs text-center text-muted-foreground pt-2 border-t border-amber-500/20">
              Total cost of home: ${fmt(result.totalCost, 0)} (down + all payments)
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Monthly principal and interest uses the standard amortization formula. Taxes, insurance, HOA and PMI are not included.
        </div>
      </CardContent>
    </Card>
  )
}