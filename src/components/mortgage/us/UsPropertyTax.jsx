import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2 } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

const RATES = { 'New Jersey': 2.11, 'Illinois': 1.88, 'Connecticut': 1.54, 'Vermont': 1.51, 'New Hampshire': 1.50, 'Texas': 1.47, 'Pennsylvania': 1.44, 'New York': 1.40, 'Ohio': 1.32, 'Iowa': 1.29, 'Wisconsin': 1.28, 'Nebraska': 1.27, 'Kansas': 1.26, 'Rhode Island': 1.21, 'Michigan': 1.15, 'Massachusetts': 1.11, 'Florida': 0.83, 'California': 0.71, 'Colorado': 0.55, 'Nevada': 0.47, 'Alabama': 0.38, 'Hawaii': 0.27 }

export default function UsPropertyTax() {
  const [state, setState] = useState('California')
  const [price, setPrice] = useState('500000')
  const calc = useMemo(() => {
    const P = parseFloat(price) || 0
    const rate = RATES[state] || 1
    const annual = P * rate / 100
    return { annual, monthly: annual / 12, rate }
  }, [state, price])
  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { state, price }
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
      type: 'property-tax',
      countrySlug: 'usa',
      title: 'US Property Tax',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [state, price, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md"><Building2 className="h-4 w-4 text-white" /></div>Property Tax Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {Object.entries(RATES).sort((a,b) => b[1] - a[1]).map(([k, v]) => <option key={k} value={k}>{k} ({v}%)</option>)}
            </select>
          </div>
          <div><label className="text-sm font-semibold mb-1.5 block">Home value</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-orange-500/10 border border-orange-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Annual tax</div><div className="text-2xl font-black text-orange-600 tabular-nums">{fmt(calc.annual)}</div></div>
          <div className="rounded-xl p-4 bg-amber-500/10 border border-amber-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Monthly (escrow)</div><div className="text-2xl font-black text-amber-600 tabular-nums">{fmt(calc.monthly)}</div></div>
        </div>
        <div className="rounded-xl p-4 bg-muted/40 border border-border text-xs text-muted-foreground">Effective rate: {calc.rate}% · Median US rate: ~1.07%</div>
      </CardContent>
    </Card>
  )
}