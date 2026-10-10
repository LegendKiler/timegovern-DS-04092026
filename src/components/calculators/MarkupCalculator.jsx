import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"

const fmtMoney = (n) => isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }) : '—'
const fmtPct = (n) => isFinite(n) ? n.toFixed(2) + '%' : '—'

export default function MarkupCalculator() {
  const [mode, setMode] = useState('cost-markup')
  const [cost, setCost] = useState('50')
  const [markup, setMarkup] = useState('40')
  const [price, setPrice] = useState('100')
  const [margin, setMargin] = useState('20')

  const result = useMemo(() => {
    if (mode === 'cost-markup') {
      const c = parseFloat(cost), m = parseFloat(markup)
      if ([c, m].some(isNaN)) return { err: 'Enter cost and markup %' }
      const sellPrice = c * (1 + m / 100)
      const profit = sellPrice - c
      const marginPct = sellPrice > 0 ? (profit / sellPrice) * 100 : 0
      return { cost: c, sellPrice, profit, markupPct: m, marginPct }
    }
    if (mode === 'cost-price') {
      const c = parseFloat(cost), p = parseFloat(price)
      if ([c, p].some(isNaN)) return { err: 'Enter cost and selling price' }
      if (c <= 0) return { err: 'Cost must be positive' }
      const profit = p - c
      const markupPct = (profit / c) * 100
      const marginPct = p > 0 ? (profit / p) * 100 : 0
      return { cost: c, sellPrice: p, profit, markupPct, marginPct }
    }
    if (mode === 'margin') {
      const c = parseFloat(cost), mg = parseFloat(margin)
      if ([c, mg].some(isNaN)) return { err: 'Enter cost and margin %' }
      if (mg >= 100) return { err: 'Margin must be below 100%' }
      const sellPrice = c / (1 - mg / 100)
      const profit = sellPrice - c
      const markupPct = c > 0 ? (profit / c) * 100 : 0
      return { cost: c, sellPrice, profit, markupPct, marginPct: mg }
    }
    return { err: 'Unknown mode' }
  }, [mode, cost, markup, price, margin])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Markup Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Input mode</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="cost-markup">Cost + markup %</option>
            <option value="cost-price">Cost + selling price</option>
            <option value="margin">Cost + margin %</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Cost ($)</label><Input type="number" value={cost} onChange={e => setCost(e.target.value)} className="h-11" /></div>
          {mode === 'cost-markup' && <div><label className="text-sm font-semibold mb-1.5 block">Markup %</label><Input type="number" value={markup} onChange={e => setMarkup(e.target.value)} className="h-11" /></div>}
          {mode === 'cost-price' && <div><label className="text-sm font-semibold mb-1.5 block">Selling price ($)</label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} className="h-11" /></div>}
          {mode === 'margin' && <div><label className="text-sm font-semibold mb-1.5 block">Margin %</label><Input type="number" value={margin} onChange={e => setMargin(e.target.value)} className="h-11" /></div>}
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-700/10 rounded-xl p-4 border border-emerald-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Selling price</div>
              <div className="text-3xl font-black text-emerald-600 tabular-nums">{fmtMoney(result.sellPrice)}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-emerald-500/20">
              <div><div className="text-xs text-muted-foreground">Profit</div><div className="text-sm font-bold tabular-nums">{fmtMoney(result.profit)}</div></div>
              <div><div className="text-xs text-muted-foreground">Markup</div><div className="text-sm font-bold tabular-nums">{fmtPct(result.markupPct)}</div></div>
              <div><div className="text-xs text-muted-foreground">Margin</div><div className="text-sm font-bold tabular-nums">{fmtPct(result.marginPct)}</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Markup = (price - cost) / cost. Margin = (price - cost) / price. Markup is always higher than margin for the same profit.
        </div>
      </CardContent>
    </Card>
  )
}