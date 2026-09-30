import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, Info } from "lucide-react"

function formatCurrency(n, symbol, locale) {
  try { return symbol + Math.round(n).toLocaleString(locale || 'en-US') }
  catch { return symbol + Math.round(n).toLocaleString() }
}

export default function UniversalStampDuty({ country }) {
  const c = country
  const [price, setPrice] = useState(c.name === 'Japan' ? '40000000' : '400000')

  const calc = useMemo(() => {
    const P = parseFloat(price) || 0
    if (!c.stampDuty) return null
    const [minRate, maxRate] = c.stampDuty.rateRange
    const avgRate = (minRate + maxRate) / 2
    return {
      min: P * minRate / 100,
      max: P * maxRate / 100,
      avg: P * avgRate / 100,
      minRate, maxRate, avgRate,
    }
  }, [price, c])

  const f = (n) => formatCurrency(n, c.currencySymbol, c.locale)

  if (!c.stampDuty) return null

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className={'p-2 rounded-xl bg-gradient-to-br ' + c.gradient + ' shadow-md'}>
            <Building2 className="h-4 w-4 text-white" />
          </div>
          {c.stampDuty.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Property price</label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" />
        </div>

        {calc && (
          <>
            <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Estimated transfer tax</div>
              <div className="text-2xl md:text-3xl font-black text-orange-600 tabular-nums">{f(calc.avg)}</div>
              <div className="text-xs text-muted-foreground mt-2">Range: {f(calc.min)} – {f(calc.max)}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Rate range</div>
                <div className="font-bold">{calc.minRate}–{calc.maxRate}%</div>
              </div>
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Effective rate</div>
                <div className="font-bold">{calc.avgRate.toFixed(2)}%</div>
              </div>
            </div>

            <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-blue-700 dark:text-blue-400">{c.stampDuty.notes}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}