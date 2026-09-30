import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, TrendingUp, AlertCircle } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UkBuyToLet() {
  const [price, setPrice] = useState('300000')
  const [deposit, setDeposit] = useState('75000')
  const [rate, setRate] = useState('5.5')
  const [rent, setRent] = useState('1400')
  const [taxBand, setTaxBand] = useState('40')
  const [costs, setCosts] = useState('3500')

  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const D = parseFloat(deposit) || 0
    const P = P0 - D
    const r = (parseFloat(rate) || 0) / 100 / 12
    const R = parseFloat(rent) || 0
    const band = (parseFloat(taxBand) || 0) / 100
    const C = parseFloat(costs) || 0

    const annualRent = R * 12
    const mortgagePayment = P * r * Math.pow(1 + r, 300) / (Math.pow(1 + r, 300) - 1)
    const annualMortgage = mortgagePayment * 12
    const annualInterest = P * (parseFloat(rate) || 0) / 100

    // UK tax: Section 24 — only 20% tax credit on finance costs
    const taxableIncome = annualRent - C
    const taxBeforeCredit = taxableIncome * band
    const taxCredit = annualInterest * 0.20
    const tax = Math.max(0, taxBeforeCredit - taxCredit)

    const netAnnual = annualRent - annualMortgage - C - tax
    const grossYield = P0 > 0 ? (annualRent / P0) * 100 : 0
    const netYield = P0 > 0 ? (netAnnual / P0) * 100 : 0

    // Stress test: 5.5% ICR (Interest Coverage Ratio)
    const stressRate = 0.055
    const stressInterest = P * stressRate
    const icr = stressInterest > 0 ? annualRent / stressInterest : 0

    return { annualRent, annualMortgage, monthlyPayment: mortgagePayment, tax, netAnnual, monthlyNet: netAnnual / 12, grossYield, netYield, icr }
  }, [price, deposit, rate, rent, taxBand, costs])

  const fmt = (n) => '£' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, deposit, rate, rent, taxBand, costs }
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
      type: 'buy-to-let',
      countrySlug: 'uk',
      title: 'UK Buy-to-Let',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, deposit, rate, rent, taxBand, costs, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"><Building2 className="h-4 w-4 text-white" /></div>UK Buy-to-Let Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Property price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Deposit</label><Input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Monthly rent</label><Input type="number" value={rent} onChange={(e) => setRent(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Your tax band</label>
            <select value={taxBand} onChange={(e) => setTaxBand(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              <option value="20">Basic (20%)</option>
              <option value="40">Higher (40%)</option>
              <option value="45">Additional (45%)</option>
            </select>
          </div>
          <div><label className="text-sm font-semibold mb-1.5 block">Annual costs (letting fees, insurance, maintenance)</label><Input type="number" value={costs} onChange={(e) => setCosts(e.target.value)} className="h-11" /></div>
        </div>
        {calc && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold">Gross yield</div><div className="text-lg font-black text-emerald-600 tabular-nums">{calc.grossYield.toFixed(2)}%</div></div>
              <div className="rounded-xl p-3 bg-blue-500/10 border border-blue-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold">Net yield</div><div className="text-lg font-black text-blue-600 tabular-nums">{calc.netYield.toFixed(2)}%</div></div>
              <div className="rounded-xl p-3 bg-amber-500/10 border border-amber-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold">Tax/yr</div><div className="text-lg font-black text-amber-600 tabular-nums">{fmt(calc.tax)}</div></div>
              <div className={'rounded-xl p-3 border ' + (calc.icr >= 1.45 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20')}><div className="text-[10px] text-muted-foreground uppercase font-bold">ICR</div><div className={'text-lg font-black tabular-nums ' + (calc.icr >= 1.45 ? 'text-emerald-600' : 'text-red-600')}>{calc.icr.toFixed(2)}</div></div>
            </div>

            <div className={'rounded-xl p-5 border-2 ' + (calc.monthlyNet > 0 ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30' : 'bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/30')}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Net monthly cash flow</div>
              <div className={'text-4xl font-black tabular-nums ' + (calc.monthlyNet > 0 ? 'text-emerald-600' : 'text-red-600')}>{fmt(calc.monthlyNet)}</div>
              <div className="text-xs text-muted-foreground mt-2">Rent {fmt(parseFloat(rent))} âˆ’ mortgage {fmt(calc.monthlyPayment)} âˆ’ costs âˆ’ tax</div>
            </div>

            {calc.icr < 1.45 && (
              <div className="rounded-lg p-3 bg-red-500/10 border border-red-500/30 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-red-700 dark:text-red-400">ICR below 1.45 — most UK lenders require 145% interest coverage for higher-rate taxpayers.</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}