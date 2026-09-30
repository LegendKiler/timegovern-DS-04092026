import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, CheckCircle2, AlertCircle } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function cmhcRate(lvr) {
  if (lvr <= 65) return 0.0060
  if (lvr <= 75) return 0.0170
  if (lvr <= 80) return 0.0240
  if (lvr <= 85) return 0.0280
  if (lvr <= 90) return 0.0310
  if (lvr <= 95) return 0.0400
  return null
}

export default function CaCmhc() {
  const [price, setPrice] = useState('600000')
  const [down, setDown] = useState('60000')

  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const D = parseFloat(down) || 0
    const loan = Math.max(0, P0 - D)
    const lvr = P0 > 0 ? (loan / P0) * 100 : 0
    const rate = cmhcRate(lvr)
    const premium = rate === null ? 0 : loan * rate
    const eligible = P0 <= 1500000 && rate !== null
    return { loan, lvr, rate, premium, eligible, downPct: P0 > 0 ? (D / P0) * 100 : 0 }
  }, [price, down])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, down }
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
      type: 'cmhc',
      countrySlug: 'canada',
      title: 'Canadian CMHC Insurance',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, down, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md"><Shield className="h-4 w-4 text-white" /></div>CMHC Insurance Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment</label><Input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="h-11" /></div>
        </div>
        <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Loan amount</span><span className="font-bold tabular-nums">{fmt(calc.loan)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Down payment</span><span className="font-bold tabular-nums">{calc.downPct.toFixed(1)}%</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">LTV (Loan-to-Value)</span><span className="font-bold tabular-nums">{calc.lvr.toFixed(1)}%</span></div>
        </div>
        {!calc.eligible && calc.lvr > 80 ? (
          <div className="rounded-xl p-4 bg-red-500/10 border-2 border-red-500/30 flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500 shrink-0" />
            <div><div className="font-bold text-red-600">Not eligible for CMHC insurance</div><div className="text-xs text-muted-foreground">Property exceeds $1.5M cap, or LVR over 95%.</div></div>
          </div>
        ) : calc.lvr <= 80 ? (
          <div className="rounded-xl p-4 bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
            <div><div className="font-bold text-emerald-600">No CMHC insurance required</div><div className="text-xs text-muted-foreground">Your down payment is 20% or more.</div></div>
          </div>
        ) : (
          <>
            <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-2 border-blue-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">CMHC Premium (LVR {calc.lvr.toFixed(1)}%)</div>
              <div className="text-4xl font-black text-blue-600 tabular-nums">{fmt(calc.premium)}</div>
              <div className="text-xs text-muted-foreground mt-2">Rate: {(calc.rate * 100).toFixed(2)}% · Added to your mortgage balance</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3 bg-muted/40 border border-border"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Base loan</div><div className="font-bold tabular-nums">{fmt(calc.loan)}</div></div>
              <div className="rounded-xl p-3 bg-blue-500/10 border border-blue-500/20"><div className="text-[10px] text-blue-600 uppercase font-bold mb-1">Total loan + premium</div><div className="font-bold tabular-nums text-blue-600">{fmt(calc.loan + calc.premium)}</div></div>
            </div>
            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
              You pay interest on the CMHC premium for the entire amortization. A higher down payment lowers the premium rate.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}