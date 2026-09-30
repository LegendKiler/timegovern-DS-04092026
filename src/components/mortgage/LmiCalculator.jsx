import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

// Indicative LMI rates by LVR (Helia 2025 schedule)
function lmiRate(lvr) {
  if (lvr <= 80) return 0
  if (lvr <= 82) return 0.0076
  if (lvr <= 83) return 0.0092
  if (lvr <= 84) return 0.0112
  if (lvr <= 85) return 0.0141
  if (lvr <= 86) return 0.0167
  if (lvr <= 87) return 0.0197
  if (lvr <= 88) return 0.0234
  if (lvr <= 89) return 0.0279
  if (lvr <= 90) return 0.0325
  if (lvr <= 91) return 0.0383
  if (lvr <= 92) return 0.0458
  if (lvr <= 93) return 0.0552
  if (lvr <= 94) return 0.0667
  if (lvr <= 95) return 0.0807
  return null
}

export default function LmiCalculator() {
  const [price, setPrice] = useState('800000')
  const [deposit, setDeposit] = useState('100000')

  const calc = useMemo(() => {
    const P = parseFloat(price) || 0
    const D = parseFloat(deposit) || 0
    const loan = Math.max(0, P - D)
    const lvr = P > 0 ? (loan / P) * 100 : 0
    const rate = lmiRate(lvr)
    const lmi = rate === null ? 0 : loan * rate
    const gst = lmi * 0.1
    const qldDuty = 0 // stamp on LMI only in QLD, ignore for simplicity
    const total = lmi + gst + qldDuty
    return { loan, lvr, rate, lmi, gst, total, eligible: rate !== null && lvr > 80 }
  }, [price, deposit])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, deposit }
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
      type: 'lmi',
      countrySlug: 'australia',
      title: 'Australian LMI',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, deposit, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
            <Shield className="h-4 w-4 text-white" />
          </div>
          LMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Property price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Deposit</label><Input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="h-11" /></div>
        </div>

        <div className="rounded-xl p-4 bg-muted/40 border border-border">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Loan amount</span>
            <span className="font-bold tabular-nums">{fmt(calc.loan)}</span>
          </div>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">LVR (Loan-to-Value Ratio)</span>
            <span className="font-bold tabular-nums">{calc.lvr.toFixed(2)}%</span>
          </div>
        </div>

        {calc.lvr <= 80 ? (
          <div className="rounded-xl p-4 bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
            <div>
              <div className="font-bold text-emerald-600">No LMI required</div>
              <div className="text-xs text-muted-foreground">Your deposit is 20% or more of the property value.</div>
            </div>
          </div>
        ) : calc.eligible ? (
          <>
            <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-2 border-blue-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">LMI premium</div>
              <div className="text-4xl font-black text-blue-600 tabular-nums">{fmt(calc.lmi)}</div>
              <div className="text-xs text-muted-foreground mt-2">+ 10% GST = {fmt(calc.total)} total</div>
            </div>
            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>LMI is usually capitalised onto your loan. It protects the lender, not you.</span>
            </div>
          </>
        ) : (
          <div className="rounded-xl p-4 bg-red-500/10 border-2 border-red-500/30 flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500 shrink-0" />
            <div>
              <div className="font-bold text-red-600">LVR over 95% — most lenders decline</div>
              <div className="text-xs text-muted-foreground">Increase your deposit or explore the First Home Guarantee.</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}