import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"

const fmt = (n, d) => (n === null || isNaN(n) || !isFinite(n)) ? '\u2014' : n.toLocaleString('en-US', { maximumFractionDigits: d || 4 })

export default function CAGRCalculator() {
  const [begin, setBegin] = useState('10000')
  const [end, setEnd] = useState('25000')
  const [years, setYears] = useState('5')

  const result = useMemo(() => {
    const B = parseFloat(begin), E = parseFloat(end), Y = parseFloat(years)
    if ([B, E, Y].some(isNaN)) return { err: 'Enter beginning value, ending value, years' }
    if (B <= 0 || Y <= 0) return { err: 'Beginning value and years must be positive' }
    const cagr = Math.pow(E / B, 1 / Y) - 1
    const totalReturn = (E / B - 1) * 100
    const absoluteGain = E - B
    return { cagrPct: cagr * 100, totalReturn, absoluteGain }
  }, [begin, end, years])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          CAGR Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Beginning</label><Input type="number" value={begin} onChange={e => setBegin(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Ending</label><Input type="number" value={end} onChange={e => setEnd(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Years</label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-700/10 rounded-xl p-4 border border-emerald-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">CAGR</div>
              <div className="text-4xl font-black text-emerald-600 tabular-nums">{fmt(result.cagrPct, 2)}%</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-emerald-500/20">
              <div><div className="text-xs text-muted-foreground">Total return</div><div className="text-base font-bold text-emerald-600 tabular-nums">{fmt(result.totalReturn, 2)}%</div></div>
              <div><div className="text-xs text-muted-foreground">Absolute gain</div><div className="text-base font-bold text-emerald-600 tabular-nums">{fmt(result.absoluteGain, 0)}</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          CAGR = (ending / beginning)^(1 / years) - 1. It is the smoothed annual growth rate that would take you from start to finish.
        </div>
      </CardContent>
    </Card>
  )
}