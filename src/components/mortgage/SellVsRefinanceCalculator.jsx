import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, TrendingUp, TrendingDown, Percent, DollarSign, RefreshCw, Info, CheckCircle2, XCircle } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'
import AuthorityLink from './AuthorityLink'
import { SELL_REFI_TAX } from '../../data/taxRates'

// ============================================================
// COUNTRY TAX RULES — verified 2026
// ============================================================
// COUNTRY_TAX_RULES imported from data/taxRates.js
const COUNTRY_TAX_RULES = SELL_REFI_TAX

// ============================================================
// BUYER FIELDS — which options show per country
// ============================================================
const BUYER_FIELDS = {
  AUD: { isInvestment: true,  isPrimary: true  },
  USD: { isInvestment: true,  isPrimary: true  },
  GBP: { isInvestment: true,  isPrimary: true  },
  CAD: { isInvestment: true,  isPrimary: true  },
  INR: { isInvestment: true,  isPrimary: true  },
  SGD: { isInvestment: true,  isPrimary: true  },
  MYR: { isInvestment: true,  isPrimary: true  },
  EUR: { isInvestment: true,  isPrimary: true  },
  JPY: { isInvestment: true,  isPrimary: true  },
  NOK: { isInvestment: true,  isPrimary: true  },
  PLN: { isInvestment: true,  isPrimary: true  },
  PKR: { isInvestment: true,  isPrimary: true  },
  IDR: { isInvestment: true,  isPrimary: true  },
  CHF: { isInvestment: true,  isPrimary: true  },
  SEK: { isInvestment: true,  isPrimary: true  },
  DKK: { isInvestment: true,  isPrimary: true  },
}

const CURRENCIES = [
  { code: 'AUD', label: 'AU ($)' },
  { code: 'USD', label: 'US ($)' },
  { code: 'GBP', label: 'UK (£)' },
  { code: 'CAD', label: 'CA (CA$)' },
  { code: 'INR', label: 'IN (₹)' },
  { code: 'SGD', label: 'SG (S$)' },
  { code: 'MYR', label: 'MY (RM)' },
  { code: 'EUR', label: 'EU (€)' },
  { code: 'JPY', label: 'JP (¥)' },
  { code: 'NOK', label: 'NO (kr)' },
  { code: 'PLN', label: 'PL (zł)' },
  { code: 'PKR', label: 'PK (₨)' },
  { code: 'IDR', label: 'ID (Rp)' },
  { code: 'CHF', label: 'CH (CHF)' },
  { code: 'SEK', label: 'SE (kr)' },
  { code: 'DKK', label: 'DK (kr)' },
]

function fmt(n, symbol) {
  if (n === null || n === undefined || isNaN(n)) return symbol + '0'
  return symbol + Math.round(Math.abs(n)).toLocaleString('en-US')
}

function fmtPercent(n) {
  if (n === null || n === undefined || isNaN(n)) return '0.00%'
  return n.toFixed(2) + '%'
}

export default function SellVsRefinanceCalculator({ defaultCurrency = 'AUD' }) {
  const [currency, setCurrency] = useState(defaultCurrency)
  const rule = COUNTRY_TAX_RULES[currency] || COUNTRY_TAX_RULES.AUD
  const fields = BUYER_FIELDS[currency] || BUYER_FIELDS.AUD

  // Common defaults by currency
  const defaults = {
    AUD: { value: 900000, mortgage: 500000, original: 600000, currentRate: 6.0, refiRate: 5.5, yearsOwned: 5, refiCosts: 3000, sellCosts: 2.5 },
    USD: { value: 500000, mortgage: 320000, original: 380000, currentRate: 6.5, refiRate: 6.0, yearsOwned: 5, refiCosts: 5000, sellCosts: 8.0 },
    GBP: { value: 400000, mortgage: 250000, original: 280000, currentRate: 5.0, refiRate: 4.5, yearsOwned: 5, refiCosts: 1500, sellCosts: 2.5 },
    CAD: { value: 700000, mortgage: 450000, original: 500000, currentRate: 5.5, refiRate: 5.0, yearsOwned: 5, refiCosts: 3000, sellCosts: 5.0 },
    INR: { value: 8000000, mortgage: 5000000, original: 6000000, currentRate: 9.0, refiRate: 8.5, yearsOwned: 5, refiCosts: 50000, sellCosts: 6.0 },
    SGD: { value: 1500000, mortgage: 900000, original: 1200000, currentRate: 3.5, refiRate: 3.0, yearsOwned: 5, refiCosts: 3000, sellCosts: 2.0 },
    MYR: { value: 700000, mortgage: 450000, original: 500000, currentRate: 4.5, refiRate: 4.0, yearsOwned: 5, refiCosts: 5000, sellCosts: 3.0 },
    EUR: { value: 400000, mortgage: 240000, original: 280000, currentRate: 4.0, refiRate: 3.5, yearsOwned: 5, refiCosts: 3000, sellCosts: 6.0 },
    JPY: { value: 40000000, mortgage: 25000000, original: 30000000, currentRate: 1.5, refiRate: 1.2, yearsOwned: 5, refiCosts: 300000, sellCosts: 5.0 },
    NOK: { value: 5000000, mortgage: 3000000, original: 3500000, currentRate: 5.5, refiRate: 5.0, yearsOwned: 5, refiCosts: 15000, sellCosts: 2.5 },
    PLN: { value: 700000, mortgage: 400000, original: 500000, currentRate: 7.5, refiRate: 7.0, yearsOwned: 5, refiCosts: 3000, sellCosts: 3.0 },
    PKR: { value: 30000000, mortgage: 15000000, original: 20000000, currentRate: 20.0, refiRate: 18.0, yearsOwned: 5, refiCosts: 100000, sellCosts: 3.0 },
    IDR: { value: 2500000000, mortgage: 1200000000, original: 1500000000, currentRate: 11.0, refiRate: 10.0, yearsOwned: 5, refiCosts: 5000000, sellCosts: 2.5 },
    CHF: { value: 1200000, mortgage: 700000, original: 800000, currentRate: 2.0, refiRate: 1.7, yearsOwned: 5, refiCosts: 5000, sellCosts: 3.0 },
    SEK: { value: 5000000, mortgage: 3000000, original: 3500000, currentRate: 4.5, refiRate: 4.0, yearsOwned: 5, refiCosts: 15000, sellCosts: 2.5 },
    DKK: { value: 3500000, mortgage: 2000000, original: 2500000, currentRate: 4.5, refiRate: 4.0, yearsOwned: 5, refiCosts: 10000, sellCosts: 3.0 },
  }
  const d = defaults[currency] || defaults.AUD

  const [propertyType, setPropertyType] = useState('primary')
  const [value, setValue] = useState(String(d.value))
  const [mortgage, setMortgage] = useState(String(d.mortgage))
  const [original, setOriginal] = useState(String(d.original))
  const [currentRate, setCurrentRate] = useState(String(d.currentRate))
  const [refiRate, setRefiRate] = useState(String(d.refiRate))
  const [yearsOwned, setYearsOwned] = useState(String(d.yearsOwned))
  const [refiCosts, setRefiCosts] = useState(String(d.refiCosts))
  const [sellCosts, setSellCosts] = useState(String(d.sellCosts))
  const [remainingTerm, setRemainingTerm] = useState('25')
  const [refiTerm, setRefiTerm] = useState('30')

  // Update defaults when currency changes
  useEffect(() => {
    const nd = defaults[currency] || defaults.AUD
    setValue(String(nd.value))
    setMortgage(String(nd.mortgage))
    setOriginal(String(nd.original))
    setCurrentRate(String(nd.currentRate))
    setRefiRate(String(nd.refiRate))
    setYearsOwned(String(nd.yearsOwned))
    setRefiCosts(String(nd.refiCosts))
    setSellCosts(String(nd.sellCosts))
  }, [currency])

  const calc = useMemo(() => {
    const P = parseFloat(value) || 0
    const M = parseFloat(mortgage) || 0
    const O = parseFloat(original) || 0
    const cRate = (parseFloat(currentRate) || 0) / 100
    const rRate = (parseFloat(refiRate) || 0) / 100
    const yOwned = parseInt(yearsOwned) || 0
    const rc = parseFloat(refiCosts) || 0
    const scPct = (parseFloat(sellCosts) || 0) / 100
    const remTerm = parseInt(remainingTerm) || 25
    const rTerm = parseInt(refiTerm) || 30

    // ----- SELL SCENARIO -----
    const sellCostAmount = P * scPct
    const grossGain = P - O
    const isPrimary = propertyType === 'primary'

    // Tax calculation
    let taxableGain = 0
    let taxOwed = 0
    let exemption = 0
    let taxNote = ''

    if (rule.primaryResidenceExempt && isPrimary) {
      taxableGain = 0
      taxOwed = 0
      exemption = grossGain
      // Country-specific note
      if (currency === 'USD') {
        taxNote = 'Section 121 exclusion — gain up to $500K (married) / $250K (single) is tax-free'
      } else if (currency === 'JPY') {
        taxNote = '¥30M deduction applies — gain under this is tax-free'
      } else if (currency === 'GBP') {
        taxNote = 'Private Residence Relief — no CGT on your main home'
      } else if (currency === 'CAD') {
        taxNote = 'Principal Residence Exemption — gain is tax-free'
      } else if (currency === 'AUD') {
        taxNote = 'Main residence exemption — no CGT on your home'
      } else if (currency === 'INR') {
        taxNote = 'Section 54 exemption if gain is reinvested in another home'
      } else if (currency === 'SGD') {
        taxNote = 'No CGT in Singapore — gains are tax-free'
      } else {
        taxNote = 'Primary residence exempt from CGT'
      }
    } else {
      taxableGain = Math.max(0, grossGain)

      // USD Section 121 exclusion
      if (currency === 'USD' && isPrimary) {
        const section121 = 500000 // assume couple
        exemption = Math.min(section121, taxableGain)
        taxableGain = Math.max(0, taxableGain - exemption)
      }

      // JPY ¥30M deduction for primary
      if (currency === 'JPY' && isPrimary && rule.primaryDeduction) {
        exemption = Math.min(rule.primaryDeduction, taxableGain)
        taxableGain = Math.max(0, taxableGain - exemption)
      }

      // INR Section 54 (full exemption if reinvested — assume partial)
      if (currency === 'INR' && isPrimary && rule.section54Exempt) {
        exemption = taxableGain * 0.5 // assume 50% reinvested
        taxableGain = taxableGain - exemption
        taxNote = 'Assumes 50% reinvestment (Section 54)'
      }

      // PLN 5-year rule
      if (currency === 'PLN' && rule.fiveYearRule && yOwned >= 5) {
        taxableGain = 0
        taxNote = 'Held >5 years — CGT exempt'
      }

      // SGD SSD (Seller's Stamp Duty)
      if (currency === 'SGD' && yOwned < 3) {
        taxOwed = P * (rule.ssdRate || 0)
        taxNote = 'Seller Stamp Duty (sold within 3 years)'
      } else {
        taxOwed = taxableGain * rule.cgtRate
      }

      // USD depreciation recapture (investment only)
      if (currency === 'USD' && !isPrimary && rule.depreciationRecapture) {
        // Assume 27.5yr depreciation on building portion (assume 80% of original)
        const buildingValue = O * 0.8
        const annualDep = buildingValue / 27.5
        const totalDep = annualDep * yOwned
        const recapture = totalDep * rule.depreciationRecaptureRate
        taxOwed += recapture
        taxNote = 'Investment property — Section 121 does not apply. 25% depreciation recapture on previous deductions.'
      }
    }

    const netProceeds = P - sellCostAmount - M - taxOwed

    // ----- REFINANCE SCENARIO -----
    const cashOut = Math.max(0, P * 0.8 - M - rc) // max 80% LTV, minus costs
    const newLoan = M + cashOut + rc

    // Current monthly payment
    const currentMonthlyRate = cRate / 12
    const currentMonths = remTerm * 12
    const currentPayment = currentMonthlyRate === 0 ? M / currentMonths : M * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths) / (Math.pow(1 + currentMonthlyRate, currentMonths) - 1)
    const currentTotalRemaining = currentPayment * currentMonths
    const currentRemainingInterest = currentTotalRemaining - M

    // Refinance monthly payment
    const refiMonthlyRate = rRate / 12
    const refiMonths = rTerm * 12
    const refiPayment = refiMonthlyRate === 0 ? newLoan / refiMonths : newLoan * refiMonthlyRate * Math.pow(1 + refiMonthlyRate, refiMonths) / (Math.pow(1 + refiMonthlyRate, refiMonths) - 1)
    const refiTotal = refiPayment * refiMonths
    const refiTotalInterest = refiTotal - newLoan

    // Monthly payment difference
    const monthlyDiff = refiPayment - currentPayment

    // Amortization reset penalty: extra interest from extending term
    const resetPenalty = refiTotalInterest - currentRemainingInterest

    // ----- BREAK-EVEN -----
    // If you sell, you get netProceeds today (cash in hand)
    // If you refinance, you get cashOut today but owe newLoan
    // Break-even: how long until refinance's monthly savings (if any) recover the difference
    const cashDiff = netProceeds - cashOut
    const breakEvenMonths = monthlyDiff < 0 ? cashDiff / Math.abs(monthlyDiff) : Infinity

    // ----- 5-YEAR PROJECTION -----
    const appreciation = 0.04 // assume 4%/yr
    const projection = []
    for (let y = 1; y <= 5; y++) {
      const futureValue = P * Math.pow(1 + appreciation, y)
      // After sell + invest at 6%
      const sellInvested = netProceeds * Math.pow(1.06, y)
      // After refinance (keep property, pay down loan)
      let bal = newLoan
      for (let m = 0; m < 12 * y; m++) {
        const int = bal * refiMonthlyRate
        const prin = refiPayment - int
        bal = Math.max(0, bal - prin)
      }
      const refiPosition = futureValue - bal + cashOut * Math.pow(1.06, y)

      projection.push({
        year: y,
        futureValue,
        sellPosition: sellInvested,
        refiPosition,
        difference: refiPosition - sellInvested,
      })
    }

    // Recommendation
    let recommendation = ''
    if (breakEvenMonths !== Infinity && breakEvenMonths > 0 && breakEvenMonths <= 60) {
      recommendation = 'Refinance — recovers costs within 5 years'
    } else if (monthlyDiff < 0) {
      recommendation = 'Refinance — lower monthly payment'
    } else if (netProceeds > cashOut) {
      recommendation = 'Sell — higher immediate cash'
    } else {
      recommendation = 'Refinance — better long-term position'
    }

    return {
      sellCostAmount, grossGain, taxableGain, taxOwed, exemption, taxNote,
      netProceeds, cashOut, newLoan,
      currentPayment, refiPayment, monthlyDiff,
      currentRemainingInterest, refiTotalInterest, resetPenalty,
      breakEvenMonths, projection, recommendation,
      isPrimary, P, M, O,
    }
  }, [value, mortgage, original, currentRate, refiRate, yearsOwned, refiCosts, sellCosts, remainingTerm, refiTerm, currency, propertyType, rule])

  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    registerCalculation({
      type: 'sell-vs-refinance',
      countrySlug: currency.toLowerCase(),
      title: 'Sell vs Refinance - ' + currency,
      inputs: { value, mortgage, original, currentRate, refiRate, yearsOwned, refiCosts, sellCosts, remainingTerm, refiTerm, currency, propertyType },
      results: {
        net_proceeds: calc.netProceeds,
        cash_out: calc.cashOut,
        monthly_payment_diff: calc.monthlyDiff,
        reset_penalty: calc.resetPenalty,
        tax_owed: calc.taxOwed,
      },
    })
  }, [value, mortgage, original, currentRate, refiRate, yearsOwned, refiCosts, sellCosts, remainingTerm, refiTerm, currency, propertyType, calc, registerCalculation])

  const f = (n) => fmt(n, rule.symbol)

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
              <RefreshCw className="h-4 w-4 text-white" />
            </div>
            Sell vs Refinance Calculator
          </CardTitle>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-semibold">
            {CURRENCIES.map(x => <option key={x.code} value={x.code}>{x.label}</option>)}
          </select>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* Property Type */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Property type</div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setPropertyType('primary')}
              className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (propertyType === 'primary' ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
              Primary residence
            </button>
            <button onClick={() => setPropertyType('investment')}
              className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (propertyType === 'investment' ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
              Investment property
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Current property value</label>
            <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Original purchase price</label>
            <Input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Mortgage balance</label>
            <Input type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Current rate (% p.a.)</label>
            <Input type="number" step="0.01" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Refinance rate (% p.a.)</label>
            <Input type="number" step="0.01" value={refiRate} onChange={(e) => setRefiRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Years owned</label>
            <Input type="number" value={yearsOwned} onChange={(e) => setYearsOwned(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Remaining term (years)</label>
            <Input type="number" value={remainingTerm} onChange={(e) => setRemainingTerm(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Refinance term (years)</label>
            <Input type="number" value={refiTerm} onChange={(e) => setRefiTerm(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Selling costs (% of price)</label>
            <Input type="number" step="0.1" value={sellCosts} onChange={(e) => setSellCosts(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Refinance costs</label>
            <Input type="number" value={refiCosts} onChange={(e) => setRefiCosts(e.target.value)} className="h-11" />
          </div>
        </div>

        {calc && (
          <>
            {/* Headline recommendation */}
            <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">Recommendation</div>
              <div className="text-2xl md:text-3xl font-black">{calc.recommendation}</div>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-5 border-2 border-amber-500/30 bg-amber-500/5">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-2">
                  <Home className="h-4 w-4" /> Sell now
                </div>
                <div className="text-3xl font-black text-amber-600 tabular-nums mb-3">{f(calc.netProceeds)}</div>
                <div className="text-xs text-muted-foreground mb-3">Net cash in hand after all costs and tax</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Sale price</span><span className="font-mono">{f(calc.P)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Selling costs</span><span className="font-mono text-red-500">-{f(calc.sellCostAmount)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Mortgage payoff</span><span className="font-mono text-red-500">-{f(calc.M)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tax owed</span><span className="font-mono text-red-500">-{f(calc.taxOwed)}</span></div>
                </div>
                {calc.taxNote && (
                  <div className="mt-3 text-[10px] text-amber-600 bg-amber-500/10 p-2 rounded">{calc.taxNote}</div>
                )}
              </div>

              <div className="rounded-xl p-5 border-2 border-emerald-500/30 bg-emerald-500/5">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" /> Refinance now
                </div>
                <div className="text-3xl font-black text-emerald-600 tabular-nums mb-3">{f(calc.cashOut)}</div>
                <div className="text-xs text-muted-foreground mb-3">Tax-free cash out (max 80% LTV)</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">New loan</span><span className="font-mono">{f(calc.newLoan)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Current payment</span><span className="font-mono">{f(calc.currentPayment)}/mo</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">New payment</span><span className="font-mono">{f(calc.refiPayment)}/mo</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Monthly change</span>
                    <span className={'font-mono font-bold ' + (calc.monthlyDiff < 0 ? 'text-emerald-600' : 'text-red-500')}>{calc.monthlyDiff < 0 ? '' : '+'}{f(calc.monthlyDiff)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl p-4 bg-card border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Break-even</div>
                <div className="text-lg font-black tabular-nums">{calc.breakEvenMonths === Infinity ? 'N/A' : Math.round(calc.breakEvenMonths) + ' mo'}</div>
              </div>
              <div className="rounded-xl p-4 bg-card border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Reset penalty</div>
                <div className="text-lg font-black tabular-nums text-red-500">{f(calc.resetPenalty)}</div>
              </div>
              <div className="rounded-xl p-4 bg-card border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Lifetime interest (refi)</div>
                <div className="text-lg font-black tabular-nums">{f(calc.refiTotalInterest)}</div>
              </div>
              <div className="rounded-xl p-4 bg-card border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Tax owed on sale</div>
                <div className="text-lg font-black tabular-nums text-amber-600">{f(calc.taxOwed)}</div>
              </div>
            </div>

            {/* 5-year projection */}
            <details className="border border-border rounded-xl overflow-hidden bg-card" open>
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">5-year projection (property @ 4%/yr, cash @ 6%/yr)</summary>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left p-2 font-bold">Year</th>
                      <th className="text-right p-2 font-bold">Property value</th>
                      <th className="text-right p-2 font-bold">Sell + invest</th>
                      <th className="text-right p-2 font-bold">Refinance + invest</th>
                      <th className="text-right p-2 font-bold">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.projection.map((row, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="p-2 font-semibold">{row.year}</td>
                        <td className="text-right p-2 font-mono tabular-nums">{f(row.futureValue)}</td>
                        <td className="text-right p-2 font-mono tabular-nums text-amber-600">{f(row.sellPosition)}</td>
                        <td className="text-right p-2 font-mono tabular-nums text-emerald-600">{f(row.refiPosition)}</td>
                        <td className={'text-right p-2 font-mono font-bold tabular-nums ' + (row.difference >= 0 ? 'text-emerald-600' : 'text-red-500')}>{f(row.difference)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            {/* Info */}
                  <AuthorityLink currency={currency} />

<div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-blue-700 dark:text-blue-400">
                Tax estimates are simplified. Actual CGT/recapture depends on your circumstances, income bracket, and holding period. Consult a tax professional before deciding.
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}