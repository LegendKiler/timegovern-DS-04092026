import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2 } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

const STATES = {
  'Maharashtra': { duty: 5.0, metroCess: 1.0, reg: 1.0, womenRebate: 0.0 },
  'Delhi': { duty: 6.0, metroCess: 0, reg: 1.0, womenRebate: 2.0 },
  'Karnataka': { duty: 5.0, metroCess: 1.0, reg: 1.0, womenRebate: 0.0 },
  'Tamil Nadu': { duty: 7.0, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'Telangana': { duty: 6.0, metroCess: 0, reg: 0.5, womenRebate: 0.0 },
  'Gujarat': { duty: 4.9, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'Uttar Pradesh': { duty: 7.0, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'West Bengal': { duty: 5.0, metroCess: 1.0, reg: 1.0, womenRebate: 0.0 },
  'Rajasthan': { duty: 6.0, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'Punjab': { duty: 7.0, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'Haryana': { duty: 7.0, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'Kerala': { duty: 8.0, metroCess: 0, reg: 2.0, womenRebate: 0.0 },
  'Madhya Pradesh': { duty: 7.5, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'Bihar': { duty: 6.0, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
  'Odisha': { duty: 5.0, metroCess: 0, reg: 1.0, womenRebate: 0.0 },
}

function formatINR(n) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

export default function InStampDuty() {
  const [state, setState] = useState('Maharashtra')
  const [price, setPrice] = useState('8000000')
  const [female, setFemale] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(price) || 0
    const s = STATES[state]
    if (!s) return null
    let dutyRate = s.duty + s.metroCess
    if (female && s.womenRebate > 0) dutyRate = Math.max(0, dutyRate - s.womenRebate)
    const duty = P * dutyRate / 100
    const reg = P * s.reg / 100
    const total = duty + reg
    return { duty, reg, total, dutyRate, regRate: s.reg, effective: (total / P) * 100, rebate: female ? s.womenRebate : 0 }
  }, [state, price, female])

  const f = (n) => '₹' + formatINR(n)


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { state, price, female }
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
      type: 'stamp-duty',
      countrySlug: 'india',
      title: 'Indian Stamp Duty',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [state, price, female, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md"><Building2 className="h-4 w-4 text-white" /></div>Stamp Duty & Registration Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {Object.keys(STATES).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div><label className="text-sm font-semibold mb-1.5 block">Property value (₹)</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-pink-500/10 border border-pink-500/30">
          <input type="checkbox" checked={female} onChange={(e) => setFemale(e.target.checked)} className="h-4 w-4 accent-pink-500" />
          <span className="text-sm font-bold text-pink-700 dark:text-pink-400">Female buyer (2% rebate in Delhi, Haryana)</span>
        </label>

        {calc && (
          <>
            <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total upfront cost</div>
              <div className="text-3xl md:text-4xl font-black text-orange-600 tabular-nums">{f(calc.total)}</div>
              <div className="text-xs text-muted-foreground mt-2">{calc.effective.toFixed(2)}% of property value</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Stamp duty ({calc.dutyRate.toFixed(2)}%)</div>
                <div className="font-bold tabular-nums">{f(calc.duty)}</div>
              </div>
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Registration ({calc.regRate}%)</div>
                <div className="font-bold tabular-nums">{f(calc.reg)}</div>
              </div>
            </div>
            {calc.rebate > 0 && (
              <div className="rounded-lg p-3 bg-pink-500/10 border border-pink-500/30 text-xs text-pink-700 dark:text-pink-400">
                Female buyer rebate of {calc.rebate}% applied.
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}