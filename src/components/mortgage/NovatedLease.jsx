import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Car, Info } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

const RESIDUAL = { 1: 65.63, 2: 56.25, 3: 46.88, 4: 37.50, 5: 28.13 }

export default function NovatedLeaseCalculator() {
  const [carPrice, setCarPrice] = useState('60000')
  const [term, setTerm] = useState('3')
  const [rate, setRate] = useState('7.5')
  const [salary, setSalary] = useState('120000')
  const [runningCosts, setRunningCosts] = useState('5000')
  const [isEV, setIsEV] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(carPrice) || 0
    const T = parseInt(term) || 3
    const r = (parseFloat(rate) || 0) / 100 / 12
    const S = parseFloat(salary) || 0
    const RC = parseFloat(runningCosts) || 0
    const n = T * 12

    // Residual (balloon) = car price Ã— ATO residual %
    const residual = P * (RESIDUAL[T] || 28.13) / 100

    // Financed amount (ignore GST on purchase for simplicity)
    const financed = P - residual / Math.pow(1 + r, n) // PV of residual

    // Monthly finance payment
    const financePayment = r === 0 ? financed / n : financed * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const monthlyRunning = RC / 12

    // Total monthly pre-tax package
    const packageMonthly = financePayment + monthlyRunning

    // Statutory FBT (20% of car price, grossed up, then taxed at 47%)
    const fbtTaxableValue = P * 0.2
    const fbtGrossed = fbtTaxableValue * 2.0802
    const fbtAnnual = isEV ? 0 : fbtGrossed * 0.47

    // ECM (Employee Contribution Method) — after-tax contribution to reduce FBT to zero
    const ecmAnnual = isEV ? 0 : fbtTaxableValue
    const ecmMonthly = ecmAnnual / 12

    // Pre-tax packaged amount
    const preTaxAnnual = (packageMonthly - ecmMonthly) * 12

    // Tax saving (assume 37% marginal rate + 2% Medicare = 39%)
    const taxRate = 0.39
    const taxSaving = preTaxAnnual * taxRate

    // Net annual cost
    const netAnnual = (packageMonthly * 12) - taxSaving

    return {
      residual, financePayment, packageMonthly, fbtAnnual, ecmMonthly, taxSaving, netAnnual,
      monthlyPreTax: packageMonthly - ecmMonthly,
      monthlyAfterTax: ecmMonthly,
      monthlyNet: (packageMonthly * 12 - taxSaving) / 12,
    }
  }, [carPrice, term, rate, salary, runningCosts, isEV])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { carPrice, term, rate, salary, runningCosts, isEV }
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
      type: 'novated-lease',
      countrySlug: 'australia',
      title: 'Australian Novated Lease',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [carPrice, term, rate, salary, runningCosts, isEV, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md">
            <Car className="h-4 w-4 text-white" />
          </div>
          Novated Lease Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Car price</label><Input type="number" value={carPrice} onChange={(e) => setCarPrice(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Lease term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {[1,2,3,4,5].map(y => <option key={y} value={y}>{y} year{y > 1 ? 's' : ''} (residual {RESIDUAL[y]}%)</option>)}
            </select>
          </div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Gross salary</label><Input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="h-11" /></div>
          <div className="md:col-span-2"><label className="text-sm font-semibold mb-1.5 block">Annual running costs (fuel, rego, insurance, servicing)</label><Input type="number" value={runningCosts} onChange={(e) => setRunningCosts(e.target.value)} className="h-11" /></div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <input type="checkbox" checked={isEV} onChange={(e) => setIsEV(e.target.checked)} className="h-4 w-4 accent-emerald-500" />
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Electric vehicle (FBT exempt)</span>
        </label>

        <div className="rounded-xl p-4 bg-muted/40 border border-border space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">ATO residual (balloon)</span><span className="font-bold tabular-nums">{fmt(calc.residual)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Monthly finance payment</span><span className="font-bold tabular-nums">{fmt(calc.financePayment)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">FBT (annual)</span><span className="font-bold tabular-nums">{isEV ? 'EXEMPT' : fmt(calc.fbtAnnual)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">ECM contribution (monthly)</span><span className="font-bold tabular-nums">{fmt(calc.ecmMonthly)}</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Monthly package</div>
            <div className="text-2xl font-black text-cyan-600 tabular-nums">{fmt(calc.packageMonthly)}</div>
          </div>
          <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Tax saving (annual)</div>
            <div className="text-2xl font-black text-emerald-600 tabular-nums">{fmt(calc.taxSaving)}</div>
          </div>
          <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Net monthly cost</div>
            <div className="text-2xl font-black text-amber-600 tabular-nums">{fmt(calc.monthlyNet)}</div>
          </div>
        </div>

        <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <span className="text-blue-700 dark:text-blue-400">Assumes 39% marginal tax rate (37% + 2% Medicare). Actual savings depend on your bracket. Check with your accountant for ATO-compliant figures.</span>
        </div>
      </CardContent>
    </Card>
  )
}