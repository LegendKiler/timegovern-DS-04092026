import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock } from "lucide-react"

export default function PaybackPeriodCalculator() {
  const [investment, setInvestment] = useState('50000')
  const [cashFlow, setCashFlow] = useState('12000')
  const [discountRate, setDiscountRate] = useState('8')

  const result = useMemo(() => {
    const I = parseFloat(investment), CF = parseFloat(cashFlow), R = parseFloat(discountRate)
    if ([I, CF].some(isNaN)) return { err: 'Enter investment and annual cash flow' }
    if (I <= 0) return { err: 'Investment must be positive' }
    if (CF <= 0) return { err: 'Cash flow must be positive' }

    const simpleYears = I / CF

    let discYears = null
    if (!isNaN(R) && R >= 0) {
      const r = R / 100
      let cumulative = 0
      const maxYears = 100
      for (let y = 1; y <= maxYears; y++) {
        const disc = CF / Math.pow(1 + r, y)
        const prev = cumulative
        cumulative += disc
        if (cumulative >= I) {
          const fraction = (I - prev) / disc
          discYears = y - 1 + fraction
          break
        }
      }
    }
    return { simpleYears, discYears }
  }, [investment, cashFlow, discountRate])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-md">
            <Clock className="h-4 w-4 text-white" />
          </div>
          Payback Period Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Investment ($)</label><Input type="number" value={investment} onChange={e => setInvestment(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Annual cash flow ($)</label><Input type="number" value={cashFlow} onChange={e => setCashFlow(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Discount rate (%)</label><Input type="number" value={discountRate} onChange={e => setDiscountRate(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-700/10 rounded-xl p-4 border border-cyan-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Simple payback</div>
              <div className="text-3xl font-black text-cyan-600 tabular-nums">{result.simpleYears.toFixed(2)} years</div>
              <div className="text-xs text-muted-foreground mt-1">({(result.simpleYears * 12).toFixed(1)} months)</div>
            </div>
            {result.discYears !== null && (
              <div className="text-center pt-2 border-t border-cyan-500/20">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Discounted payback</div>
                <div className="text-2xl font-black text-cyan-600 tabular-nums">{result.discYears.toFixed(2)} years</div>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Simple payback = investment / annual cash flow. Discounted payback accounts for the time value of money by discounting each year back to present value.
        </div>
      </CardContent>
    </Card>
  )
}