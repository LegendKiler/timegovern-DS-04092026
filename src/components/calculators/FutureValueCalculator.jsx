import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"

const fmtMoney = (n) => isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }) : '—'

export default function FutureValueCalculator() {
  const [pv, setPv] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [compounds, setCompounds] = useState('12')
  const [pmt, setPmt] = useState('0')

  const result = useMemo(() => {
    const PV = parseFloat(pv), R = parseFloat(rate), Y = parseFloat(years), N = parseFloat(compounds), PMT = parseFloat(pmt) || 0
    if ([PV, R, Y, N].some(isNaN)) return { err: 'Enter PV, rate, years and compounding frequency' }
    if (Y < 0 || N <= 0) return { err: 'Years must be non-negative, compounding must be positive' }
    const r = R / 100 / N
    const periods = Y * N
    const fvLump = PV * Math.pow(1 + r, periods)
    let fvAnnuity = 0
    if (PMT !== 0 && r !== 0) {
      fvAnnuity = PMT * ((Math.pow(1 + r, periods) - 1) / r)
    } else if (PMT !== 0) {
      fvAnnuity = PMT * periods
    }
    const totalFV = fvLump + fvAnnuity
    const totalContrib = PV + PMT * periods
    return { totalFV, totalContrib, interest: totalFV - totalContrib, fvLump, fvAnnuity }
  }, [pv, rate, years, compounds, pmt])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Future Value Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Present value ($)</label><Input type="number" value={pv} onChange={e => setPv(e.target.value)} className="h-11" /></div>
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
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Monthly deposit ($, optional)</label><Input type="number" value={pmt} onChange={e => setPmt(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-700/10 rounded-xl p-4 border border-violet-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Future value</div>
              <div className="text-3xl font-black text-violet-600 tabular-nums">{fmtMoney(result.totalFV)}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-violet-500/20">
              <div><div className="text-xs text-muted-foreground">Total contributed</div><div className="text-sm font-bold tabular-nums">{fmtMoney(result.totalContrib)}</div></div>
              <div><div className="text-xs text-muted-foreground">Interest earned</div><div className="text-sm font-bold text-emerald-600 tabular-nums">{fmtMoney(result.interest)}</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          FV = PV x (1 + r/n)^(n x t) for lump sum. Monthly deposit FV = PMT x ((1 + r/n)^(n x t) - 1) / (r/n). Compounding frequency affects the effective annual rate.
        </div>
      </CardContent>
    </Card>
  )
}