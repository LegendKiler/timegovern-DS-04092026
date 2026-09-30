import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function pmiRate(lvr, score) {
  const base = lvr > 95 ? 0.0115 : lvr > 90 ? 0.0095 : lvr > 85 ? 0.0078 : 0.0058
  if (score >= 760) return base * 0.7
  if (score >= 700) return base * 0.9
  if (score >= 660) return base
  return base * 1.2
}

export default function UsPmi() {
  const [price, setPrice] = useState('400000')
  const [down, setDown] = useState('60000')
  const [credit, setCredit] = useState('720')
  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const D = parseFloat(down) || 0
    const P = P0 - D
    const lvr = P0 > 0 ? (P / P0) * 100 : 0
    const score = parseInt(credit) || 0
    const rate = lvr <= 80 ? 0 : pmiRate(lvr, score)
    const monthly = P * rate / 12
    const annual = monthly * 12
    return { P, lvr, rate: (rate * 100).toFixed(3), monthly, annual }
  }, [price, down, credit])
  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, down, credit }
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
      type: 'pmi',
      countrySlug: 'usa',
      title: 'US PMI',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, down, credit, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-md"><AlertCircle className="h-4 w-4 text-white" /></div>PMI Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment</label><Input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="h-11" /></div>
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Credit score</label><Input type="number" value={credit} onChange={(e) => setCredit(e.target.value)} className="h-11" /></div>
        </div>
        {calc.lvr <= 80 ? (
          <div className="rounded-xl p-4 bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
            <div><div className="font-bold text-emerald-600">No PMI required</div><div className="text-xs text-muted-foreground">LVR {calc.lvr.toFixed(1)}% — you have 20%+ equity.</div></div>
          </div>
        ) : (
          <>
            <div className="rounded-xl p-5 bg-gradient-to-br from-red-500/10 to-rose-500/10 border-2 border-red-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Monthly PMI ({calc.rate}% rate)</div>
              <div className="text-4xl font-black text-red-600 tabular-nums">{fmt(calc.monthly)}</div>
              <div className="text-xs text-muted-foreground mt-2">Annual cost: {fmt(calc.annual)} · LVR {calc.lvr.toFixed(1)}%</div>
            </div>
            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
              PMI can be removed once your LVR reaches 80% (by request) or 78% (automatic) — typically after 2-5 years of payments.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}