import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Target } from "lucide-react"

export default function BreakEvenCalculator() {
  const [fixed, setFixed] = useState('10000')
  const [price, setPrice] = useState('25')
  const [varCost, setVarCost] = useState('10')

  const result = useMemo(() => {
    const F = parseFloat(fixed), P = parseFloat(price), V = parseFloat(varCost)
    if ([F, P, V].some(isNaN)) return { err: 'Enter fixed costs, price and variable cost' }
    if (F < 0) return { err: 'Fixed costs must be non-negative' }
    if (P <= 0) return { err: 'Price must be positive' }
    if (V < 0) return { err: 'Variable cost must be non-negative' }
    const cm = P - V
    if (cm <= 0) return { err: 'Price must exceed variable cost per unit' }
    const unitsBE = F / cm
    const revenueBE = unitsBE * P
    return { unitsBE, revenueBE, cm, cmPct: (cm / P) * 100 }
  }, [fixed, price, varCost])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-md">
            <Target className="h-4 w-4 text-white" />
          </div>
          Break-Even Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Fixed costs ($)</label><Input type="number" value={fixed} onChange={e => setFixed(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Price ($)</label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Variable cost ($)</label><Input type="number" value={varCost} onChange={e => setVarCost(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 rounded-xl p-4 border border-orange-500/20 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Units to break even</div>
                <div className="text-2xl font-black text-orange-600 tabular-nums">{Math.ceil(result.unitsBE)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Revenue at break-even</div>
                <div className="text-2xl font-black text-orange-600 tabular-nums">${result.revenueBE.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-orange-500/20">
              <div><div className="text-xs text-muted-foreground">Contribution margin</div><div className="text-sm font-bold tabular-nums">${result.cm.toFixed(2)}/unit</div></div>
              <div><div className="text-xs text-muted-foreground">CM ratio</div><div className="text-sm font-bold tabular-nums">{result.cmPct.toFixed(1)}%</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Break-even units = fixed costs / (price − variable cost per unit). At break-even, total revenue equals total costs and profit is zero.
        </div>
      </CardContent>
    </Card>
  )
}