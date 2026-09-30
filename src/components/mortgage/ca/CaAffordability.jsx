import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Zap, Info, CheckCircle2, XCircle } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

// Canadian periodic rate for semi-annual compounding
function periodicRate(annualRate, ppy) {
  return Math.pow(1 + (annualRate / 100) / 2, 2 / ppy) - 1
}

export default function CaAffordability() {
  const [income, setIncome] = useState('120000')
  const [partnerIncome, setPartnerIncome] = useState('0')
  const [down, setDown] = useState('120000')
  const [rate, setRate] = useState('4.79')
  const [otherDebts, setOtherDebts] = useState('500')
  const [taxes, setTaxes] = useState('4500')
  const [heating, setHeating] = useState('150')
  const [condoFees, setCondoFees] = useState('0')

  const calc = useMemo(() => {
    const totalIncome = (parseFloat(income) || 0) + (parseFloat(partnerIncome) || 0)
    const D = parseFloat(down) || 0
    const contractRate = parseFloat(rate) || 0
    const other = parseFloat(otherDebts) || 0
    const annualTax = parseFloat(taxes) || 0
    const monthlyHeat = parseFloat(heating) || 0
    const monthlyCondo = parseFloat(condoFees) || 0

    // Stress test: higher of contract+2% or 5.25% floor
    const stressRate = Math.max(contractRate + 2, 5.25)

    // Monthly income
    const monthlyIncome = totalIncome / 12

    // Estimate max mortgage using GDS 39%
    // GDS = (mortgage payment + taxes + heat + 50% condo) / monthly income â‰¤ 0.39
    const c = periodicRate(stressRate, 12)
    const n = 25 * 12

    // Solve for P: GDS cap = max housing cost
    const maxHousingCost = monthlyIncome * 0.39
    const otherHousingCosts = (annualTax / 12) + monthlyHeat + (monthlyCondo * 0.5)
    const maxMortgagePayment = Math.max(0, maxHousingCost - otherHousingCosts)

    // P = payment Ã— [(1+c)^n âˆ’ 1] / [c(1+c)^n]
    const maxMortgageGDS = c === 0 ? maxMortgagePayment * n : maxMortgagePayment * (Math.pow(1 + c, n) - 1) / (c * Math.pow(1 + c, n))

    // Also check TDS 44%
    const maxTDS = monthlyIncome * 0.44
    const maxTDSMortgagePayment = Math.max(0, maxTDS - otherHousingCosts - other)
    const maxMortgageTDS = c === 0 ? maxTDSMortgagePayment * n : maxTDSMortgagePayment * (Math.pow(1 + c, n) - 1) / (c * Math.pow(1 + c, n))

    // Binding constraint = smaller of the two
    const maxMortgage = Math.min(maxMortgageGDS, maxMortgageTDS)
    const binding = maxMortgageGDS < maxMortgageTDS ? 'GDS' : 'TDS'
    const maxProperty = maxMortgage + D

    // Verify with actual stress payment
    const stressPayment = maxMortgage * c / (1 - Math.pow(1 + c, -n))
    const actualGDS = (stressPayment + otherHousingCosts) / monthlyIncome * 100
    const actualTDS = (stressPayment + otherHousingCosts + other) / monthlyIncome * 100

    return {
      totalIncome, stressRate, maxMortgage, maxProperty, binding,
      maxMonthlyPayment: stressPayment, actualGDS, actualTDS,
      gdsPass: actualGDS <= 39, tdsPass: actualTDS <= 44,
    }
  }, [income, partnerIncome, down, rate, otherDebts, taxes, heating, condoFees])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { income, partnerIncome, down, rate, otherDebts, taxes, heating, condoFees }
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
      type: 'affordability',
      countrySlug: 'canada',
      title: 'Canadian Affordability',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [income, partnerIncome, down, rate, otherDebts, taxes, heating, condoFees, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"><Zap className="h-4 w-4 text-white" /></div>Canadian Affordability Calculator (GDS/TDS)</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Your annual income</label><Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Partner income</label><Input type="number" value={partnerIncome} onChange={(e) => setPartnerIncome(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment</label><Input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Contract rate (%)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Other monthly debts</label><Input type="number" value={otherDebts} onChange={(e) => setOtherDebts(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Annual property tax</label><Input type="number" value={taxes} onChange={(e) => setTaxes(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Monthly heating</label><Input type="number" value={heating} onChange={(e) => setHeating(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Monthly condo fees</label><Input type="number" value={condoFees} onChange={(e) => setCondoFees(e.target.value)} className="h-11" /></div>
        </div>

        <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Stress test rate</span><span className="font-bold">{calc.stressRate.toFixed(2)}% (rate + 2% or 5.25% floor)</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Monthly income</span><span className="font-bold tabular-nums">{fmt(calc.totalIncome / 12)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Max monthly payment (stress test)</span><span className="font-bold tabular-nums">{fmt(calc.maxMonthlyPayment)}</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Max mortgage</div>
            <div className="text-3xl md:text-4xl font-black text-amber-600 tabular-nums">{fmt(calc.maxMortgage)}</div>
            <div className="text-xs text-muted-foreground mt-1">Limited by {calc.binding}</div>
          </div>
          <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Max property price</div>
            <div className="text-3xl md:text-4xl font-black text-emerald-600 tabular-nums">{fmt(calc.maxProperty)}</div>
            <div className="text-xs text-muted-foreground mt-1">With {fmt(parseFloat(down))} down</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={'rounded-xl p-3 border ' + (calc.gdsPass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30')}>
            <div className="flex items-center gap-2 mb-1">{calc.gdsPass ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-500" />}<span className="text-[10px] uppercase font-bold">GDS: {calc.actualGDS.toFixed(1)}%</span></div>
            <div className="text-[10px] text-muted-foreground">Cap 39% for insured</div>
          </div>
          <div className={'rounded-xl p-3 border ' + (calc.tdsPass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30')}>
            <div className="flex items-center gap-2 mb-1">{calc.tdsPass ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-500" />}<span className="text-[10px] uppercase font-bold">TDS: {calc.actualTDS.toFixed(1)}%</span></div>
            <div className="text-[10px] text-muted-foreground">Cap 44% for insured</div>
          </div>
        </div>

        <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <span className="text-blue-700 dark:text-blue-400">Canadian stress test: qualify at rate+2% or 5.25% floor. GDS 39% (housing costs) and TDS 44% (all debts) for insured mortgages. Uninsured: GDS 35% / TDS 42%.</span>
        </div>
      </CardContent>
    </Card>
  )
}