import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Zap, Info } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

export default function BorrowingPower() {
  const [income, setIncome] = useState('120000')
  const [partnerIncome, setPartnerIncome] = useState('0')
  const [expenses, setExpenses] = useState('3000')
  const [dependents, setDependents] = useState('0')
  const [existingDebt, setExistingDebt] = useState('0')
  const [deposit, setDeposit] = useState('150000')

  const calc = useMemo(() => {
    const totalIncome = (parseFloat(income) || 0) + (parseFloat(partnerIncome) || 0)
    const monthlyExpenses = (parseFloat(expenses) || 0) + (parseInt(dependents) || 0) * 500
    const existing = parseFloat(existingDebt) || 0
    const D = parseFloat(deposit) || 0

    // Assessment rate: typical lender buffer +3% over actual (7% used)
    const assessmentRate = 0.09 // 9% assessed rate (conservative)
    const monthlyRate = assessmentRate / 12
    const n = 30 * 12

    // Net monthly income (assume 30% tax)
    const netMonthly = (totalIncome / 12) * 0.7
    const surplus = netMonthly - monthlyExpenses - existing

    // Max payment = 35% of net income (HEM benchmark)
    const maxPayment = netMonthly * 0.35

    // Borrowing power = PV of maxPayment
    const bp = monthlyRate === 0 ? 0 : maxPayment * (Math.pow(1 + monthlyRate, n) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, n))

    const maxProperty = bp + D
    const lvr = maxProperty > 0 ? (bp / maxProperty) * 100 : 0

    return { totalIncome, netMonthly, surplus, maxPayment, borrowingPower: bp, maxProperty, lvr, assessmentRate: 9 }
  }, [income, partnerIncome, expenses, dependents, existingDebt, deposit])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { income, partnerIncome, expenses, dependents, existingDebt, deposit }
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
      type: 'borrowing-power',
      countrySlug: 'australia',
      title: 'Australian Borrowing Power',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [income, partnerIncome, expenses, dependents, existingDebt, deposit, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
            <Zap className="h-4 w-4 text-white" />
          </div>
          Borrowing Power Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Your annual income</label><Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Partner income (optional)</label><Input type="number" value={partnerIncome} onChange={(e) => setPartnerIncome(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Monthly expenses</label><Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Dependents</label><Input type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Existing monthly debt</label><Input type="number" value={existingDebt} onChange={(e) => setExistingDebt(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Deposit available</label><Input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="h-11" /></div>
        </div>

        <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Net monthly income</span><span className="font-bold tabular-nums">{fmt(calc.netMonthly)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Less expenses + debt</span><span className="font-bold tabular-nums">âˆ’{fmt(calc.netMonthly - calc.surplus)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Max monthly repayment (35% cap)</span><span className="font-bold tabular-nums">{fmt(calc.maxPayment)}</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Borrowing power</div>
            <div className="text-3xl md:text-4xl font-black text-amber-600 tabular-nums">{fmt(calc.borrowingPower)}</div>
            <div className="text-xs text-muted-foreground mt-1">At {calc.assessmentRate}% assessment rate</div>
          </div>
          <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Max property price</div>
            <div className="text-3xl md:text-4xl font-black text-emerald-600 tabular-nums">{fmt(calc.maxProperty)}</div>
            <div className="text-xs text-muted-foreground mt-1">LVR {calc.lvr.toFixed(1)}% with your deposit</div>
          </div>
        </div>

        <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <span className="text-blue-700 dark:text-blue-400">Estimates only. Lenders apply HEM benchmarks, credit scores, and their own policy — actual borrowing power may differ.</span>
        </div>
      </CardContent>
    </Card>
  )
}