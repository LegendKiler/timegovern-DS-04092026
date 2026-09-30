import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { IndianRupee, Info, TrendingDown } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function formatINR(n) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

export default function InTaxBenefit() {
  const [loanAmount, setLoanAmount] = useState('5000000')
  const [rate, setRate] = useState('8.75')
  const [principal, setPrincipal] = useState('150000')
  const [regime, setRegime] = useState('old')
  const [taxSlab, setTaxSlab] = useState('30')

  const calc = useMemo(() => {
    const P = parseFloat(loanAmount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    // First year interest (approx)
    const firstYearInterest = P * r * 12 - (P * r * 0.20) // approximation
    const actualInterest = Math.min(firstYearInterest, P * (parseFloat(rate) / 100))
    const section24b = Math.min(actualInterest, 200000) // cap ₹2L
    const section80C = Math.min(parseFloat(principal) || 0, 150000) // cap ₹1.5L
    const slabRate = (parseFloat(taxSlab) || 30) / 100
    const cess = 0.04
    const taxSavingOld = regime === 'old' ? (section24b + section80C) * slabRate * (1 + cess) : 0
    const taxSavingNew = 0

    return { actualInterest, section24b, section80C, taxSaving: regime === 'old' ? taxSavingOld : taxSavingNew, regime }
  }, [loanAmount, rate, principal, regime, taxSlab])

  const f = (n) => '₹' + formatINR(n)


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { loanAmount, rate, principal, regime, taxSlab }
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
      type: 'tax-benefit',
      countrySlug: 'india',
      title: 'Indian Tax Benefit',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [loanAmount, rate, principal, regime, taxSlab, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><IndianRupee className="h-4 w-4 text-white" /></div>Tax Benefit Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          <button onClick={() => setRegime('old')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (regime === 'old' ? 'bg-primary text-white' : '')}>Old Regime</button>
          <button onClick={() => setRegime('new')} className={'flex-1 py-2 rounded-lg text-xs font-bold ' + (regime === 'new' ? 'bg-primary text-white' : '')}>New Regime</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Loan amount (₹)</label><Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (%)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Annual principal paid (₹)</label><Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="h-11" /></div>
          <div className="col-span-2">
            <label className="text-sm font-semibold mb-1.5 block">Your tax slab</label>
            <select value={taxSlab} onChange={(e) => setTaxSlab(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              <option value="5">5% (₹2.5L - ₹5L)</option>
              <option value="20">20% (₹5L - ₹10L)</option>
              <option value="30">30% (above ₹10L)</option>
            </select>
          </div>
        </div>

        {calc && (
          <>
            <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Section 24(b) interest deduction</span><span className="font-bold tabular-nums">{f(calc.section24b)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Section 80C principal deduction</span><span className="font-bold tabular-nums">{f(calc.section80C)}</span></div>
            </div>

            {regime === 'old' ? (
              <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center shadow-xl">
                <div className="text-xs uppercase font-bold opacity-90 mb-1">Annual tax saving (old regime)</div>
                <div className="text-2xl md:text-3xl font-black tabular-nums">{f(calc.taxSaving)}</div>
                <div className="text-xs mt-1 opacity-90">= 31.2% effective (slab + 4% cess)</div>
              </div>
            ) : (
              <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/30 text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <span>New tax regime (default from FY 2023-24) does NOT allow Section 24(b) or 80C deductions for home loans. Tax savings are ₹0.</span>
              </div>
            )}

            <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-amber-700 dark:text-amber-400">Old regime also allows ₹50,000 additional deduction under Section 80EEA for first-time buyers (subject to conditions). Consult your CA.</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}