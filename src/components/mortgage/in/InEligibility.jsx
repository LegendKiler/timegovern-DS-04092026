import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Zap, Info, CheckCircle2 } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

function formatINR(n) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

export default function InEligibility() {
  const [income, setIncome] = useState('150000')
  const [partnerIncome, setPartnerIncome] = useState('0')
  const [existingEmi, setExistingEmi] = useState('0')
  const [rate, setRate] = useState('8.75')
  const [years, setYears] = useState('20')
  const [age, setAge] = useState('30')

  const calc = useMemo(() => {
    const monthlyIncome = (parseFloat(income) || 0) + (parseFloat(partnerIncome) || 0)
    const existing = parseFloat(existingEmi) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    // Tenure capped by age: max 65 years old at loan end
    const ageVal = parseInt(age) || 30
    const maxTenure = Math.max(5, Math.min(parseInt(years) || 20, 65 - ageVal))
    const n = maxTenure * 12

    // FOIR bands (indicative 2026): 40% for <₹50K, 50% for ₹50K-₹1L, 55% for >₹1L
    let foir = 0.50
    if (monthlyIncome < 50000) foir = 0.40
    else if (monthlyIncome < 100000) foir = 0.50
    else foir = 0.55

    const maxEmi = monthlyIncome * foir - existing
    const maxLoan = r === 0 ? maxEmi * n : maxEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))

    return { monthlyIncome, maxEmi, maxLoan, foir: foir * 100, maxTenure, cappedByAge: maxTenure < (parseInt(years) || 20) }
  }, [income, partnerIncome, existingEmi, rate, years, age])

  const f = (n) => '₹' + formatINR(n)


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { income, partnerIncome, existingEmi, rate, years, age }
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
      type: 'eligibility',
      countrySlug: 'india',
      title: 'Indian Loan Eligibility',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [income, partnerIncome, existingEmi, rate, years, age, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"><Zap className="h-4 w-4 text-white" /></div>Home Loan Eligibility Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Your monthly income (₹)</label><Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Co-applicant income</label><Input type="number" value={partnerIncome} onChange={(e) => setPartnerIncome(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Existing EMIs (₹)</label><Input type="number" value={existingEmi} onChange={(e) => setExistingEmi(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Your age</label><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (%)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Tenure preference (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
        </div>

        <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Combined monthly income</span><span className="font-bold tabular-nums">{f(calc.monthlyIncome)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">FOIR applied</span><span className="font-bold">{calc.foir}%</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Max EMI</span><span className="font-bold tabular-nums">{f(calc.maxEmi)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Max tenure</span><span className="font-bold">{calc.maxTenure} years</span></div>
        </div>

        <div className="rounded-xl p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Maximum loan eligibility</div>
          <div className="text-3xl md:text-4xl font-black text-amber-600 tabular-nums">{f(calc.maxLoan)}</div>
          <div className="text-xs text-muted-foreground mt-2">At {rate}% for {calc.maxTenure} years</div>
        </div>

        {calc.cappedByAge && (
          <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Tenure capped at {calc.maxTenure} years — most Indian banks require loan to end by age 65-70.
          </div>
        )}

        <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-2">
          <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <span className="text-amber-700 dark:text-amber-400">FOIR (Fixed Obligation to Income Ratio) bands: 40% (income &lt;₹50K), 50% (₹50K-₹1L), 55% (income &gt;₹1L). Actual eligibility depends on CIBIL score, employer category, and lender policy.</span>
        </div>
      </CardContent>
    </Card>
  )
}