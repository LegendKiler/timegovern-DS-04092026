import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingDown } from "lucide-react"

const fmtMoney = (n) => isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }) : '—'

export default function PresentValueCalculator() {
  const [fv, setFv] = useState('100000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('20')
  const [compounds, setCompounds] = useState('12')

  const result = useMemo(() => {
    const FV = parseFloat(fv), R = parseFloat(rate), Y = parseFloat(years), N = parseFloat(compounds)
    if ([FV, R, Y, N].some(isNaN)) return { err: 'Enter all four values' }
    if (N <= 0) return { err: 'Compounding frequency must be positive' }
    if (Y < 0) return { err: 'Years must be non-negative' }
    const r = R / 100 / N
    const periods = Y * N
    if (1 + r === 0) return { err: 'Invalid rate' }
    const pv = FV / Math.pow(1 + r, periods)
    const discount = FV - pv
    return { pv, discount, discountPct: FV > 0 ? (discount / FV) * 100 : 0 }
  }, [fv, rate, years, compounds])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-pink-700 shadow-md">
            <TrendingDown className="h-4 w-4 text-white" />
          </div>
          Present Value Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Future value ($)</label><Input type="number" value={fv} onChange={e => setFv(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Annual rate (%)</label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Years</label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Compounding</label>
            <select value={compounds} onChange={e => setCompounds(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-rose-500/10 to-pink-700/10 rounded-xl p-4 border border-rose-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Present value</div>
              <div className="text-3xl font-black text-rose-600 tabular-nums">{fmtMoney(result.pv)}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-rose-500/20">
              <div><div className="text-xs text-muted-foreground">Discount amount</div><div className="text-sm font-bold tabular-nums">{fmtMoney(result.discount)}</div></div>
              <div><div className="text-xs text-muted-foreground">Discount %</div><div className="text-sm font-bold tabular-nums">{result.discountPct.toFixed(2)}%</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          PV = FV / (1 + r/n)^(n x t). A dollar today is worth more than a dollar in the future because money can earn interest. This is the core of time value of money.
        </div>
      </CardContent>
    </Card>
  )
}