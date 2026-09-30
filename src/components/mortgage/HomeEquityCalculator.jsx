import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, TrendingUp, DollarSign, Percent, Info, Calculator, Wallet, Landmark, PiggyBank } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'
import AuthorityLink from './AuthorityLink'

// ============================================================
// COUNTRY TAX RULES — verified 2026
// interestDeductible: 'primary' | 'investment' | 'partial' | 'none'
// ============================================================
const COUNTRY_TAX_RULES = {
  AUD: { country: 'Australia', symbol: '$', interestDeductible: 'investment', marginalTaxRate: 0.37, notes: 'Interest is tax-deductible only if the borrowed funds are used for investment purposes (e.g., buying an investment property or shares). Not deductible for personal use.' },
  USD: { country: 'United States', symbol: '$', interestDeductible: 'primary', marginalTaxRate: 0.24, debtCap: 750000, notes: 'Interest is deductible if used to buy, build, or substantially improve the home (up to $750K total mortgage debt). Not deductible for personal expenses like cars or credit cards.' },
  GBP: { country: 'United Kingdom', symbol: '£', interestDeductible: 'investment', marginalTaxRate: 0.40, notes: 'Interest on homeowner loans is generally not tax-deductible for personal use. Deductible for buy-to-let investment properties (with Section 24 restrictions).' },
  CAD: { country: 'Canada', symbol: 'CA$', interestDeductible: 'investment', marginalTaxRate: 0.43, notes: 'Interest is not deductible for personal use, but IS deductible if the borrowed funds are invested (Smith Manoeuvre strategy).' },
  INR: { country: 'India', symbol: '₹', interestDeductible: 'partial', marginalTaxRate: 0.30, notes: 'Interest deductible for business or investment use. For Loan Against Property used for home purchase, Section 24 and 80EEA deductions may apply.' },
  SGD: { country: 'Singapore', symbol: 'S$', interestDeductible: 'none', marginalTaxRate: 0.22, notes: 'Interest on home loans is generally not tax-deductible for personal or investment property.' },
  MYR: { country: 'Malaysia', symbol: 'RM', interestDeductible: 'investment', marginalTaxRate: 0.26, notes: 'Interest is tax-deductible if the property is rented out and generates taxable income.' },
  EUR: { country: 'Europe', symbol: '€', interestDeductible: 'primary', marginalTaxRate: 0.35, notes: 'Varies by country. Germany, Netherlands, and Belgium allow deductions for primary residence. France, Spain, Italy allow for rental properties.' },
  JPY: { country: 'Japan', symbol: '¥', interestDeductible: 'investment', marginalTaxRate: 0.33, notes: 'Interest is tax-deductible for rental properties. For primary residence, a tax credit (not deduction) may apply for the first 10-13 years.' },
  NOK: { country: 'Norway', symbol: 'kr', interestDeductible: 'primary', marginalTaxRate: 0.22, notes: 'Interest is deductible against general income for both primary residence and investment properties. 22% flat rate on interest deduction.' },
  PLN: { country: 'Poland', symbol: 'zł', interestDeductible: 'investment', marginalTaxRate: 0.32, notes: 'Interest deductible only for rental properties (not primary residence).' },
  PKR: { country: 'Pakistan', symbol: '₨', interestDeductible: 'investment', marginalTaxRate: 0.35, notes: 'Interest deductible for business or investment purposes. Filer status affects deduction benefits.' },
  IDR: { country: 'Indonesia', symbol: 'Rp', interestDeductible: 'none', marginalTaxRate: 0.30, notes: 'Interest on personal home loans is generally not tax-deductible.' },
  CHF: { country: 'Switzerland', symbol: 'CHF', interestDeductible: 'partial', marginalTaxRate: 0.35, notes: 'Interest is deductible but capped at the lower of the actual interest or the imputed rental value of the property.' },
  SEK: { country: 'Sweden', symbol: 'kr', interestDeductible: 'primary', marginalTaxRate: 0.30, notes: 'Interest deductible at 30% on the first SEK 100,000 and 21% above that, for both primary residence and investment properties.' },
  DKK: { country: 'Denmark', symbol: 'kr', interestDeductible: 'partial', marginalTaxRate: 0.42, notes: 'Interest deductible, but there is a cap on the deductible amount (capped at approximately 50,000-100,000 DKK per year).' },
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

export default function HomeEquityCalculator({ defaultCurrency = 'AUD' }) {
  const [currency, setCurrency] = useState(defaultCurrency)
  const rule = COUNTRY_TAX_RULES[currency] || COUNTRY_TAX_RULES.AUD

  const defaults = {
    AUD: { value: 900000, mortgage: 450000, currentRate: 6.0, helocRate: 7.5, heLoanRate: 6.5, refiRate: 5.8, cashAmount: 100000 },
    USD: { value: 500000, mortgage: 280000, currentRate: 6.5, helocRate: 8.5, heLoanRate: 7.5, refiRate: 6.2, cashAmount: 80000 },
    GBP: { value: 400000, mortgage: 200000, currentRate: 5.0, helocRate: 7.0, heLoanRate: 6.0, refiRate: 4.8, cashAmount: 50000 },
    CAD: { value: 700000, mortgage: 400000, currentRate: 5.5, helocRate: 7.0, heLoanRate: 6.5, refiRate: 5.2, cashAmount: 80000 },
    INR: { value: 8000000, mortgage: 3500000, currentRate: 9.0, helocRate: 10.5, heLoanRate: 9.5, refiRate: 8.7, cashAmount: 1500000 },
    SGD: { value: 1500000, mortgage: 700000, currentRate: 3.5, helocRate: 5.0, heLoanRate: 4.0, refiRate: 3.2, cashAmount: 200000 },
    MYR: { value: 700000, mortgage: 350000, currentRate: 4.5, helocRate: 6.0, heLoanRate: 5.5, refiRate: 4.3, cashAmount: 100000 },
    EUR: { value: 400000, mortgage: 200000, currentRate: 4.0, helocRate: 5.5, heLoanRate: 5.0, refiRate: 3.8, cashAmount: 50000 },
    JPY: { value: 40000000, mortgage: 20000000, currentRate: 1.5, helocRate: 3.0, heLoanRate: 2.5, refiRate: 1.3, cashAmount: 5000000 },
    NOK: { value: 5000000, mortgage: 2500000, currentRate: 5.5, helocRate: 7.5, heLoanRate: 6.5, refiRate: 5.3, cashAmount: 500000 },
    PLN: { value: 700000, mortgage: 350000, currentRate: 7.5, helocRate: 9.5, heLoanRate: 8.5, refiRate: 7.2, cashAmount: 100000 },
    PKR: { value: 30000000, mortgage: 12000000, currentRate: 20.0, helocRate: 24.0, heLoanRate: 22.0, refiRate: 19.0, cashAmount: 5000000 },
    IDR: { value: 2500000000, mortgage: 1000000000, currentRate: 11.0, helocRate: 13.5, heLoanRate: 12.5, refiRate: 10.5, cashAmount: 300000000 },
    CHF: { value: 1200000, mortgage: 600000, currentRate: 2.0, helocRate: 3.5, heLoanRate: 3.0, refiRate: 1.8, cashAmount: 200000 },
    SEK: { value: 5000000, mortgage: 2500000, currentRate: 4.5, helocRate: 6.5, heLoanRate: 5.5, refiRate: 4.3, cashAmount: 500000 },
    DKK: { value: 3500000, mortgage: 1800000, currentRate: 4.5, helocRate: 6.5, heLoanRate: 5.5, refiRate: 4.3, cashAmount: 400000 },
  }
  const d = defaults[currency] || defaults.AUD

  const [value, setValue] = useState(String(d.value))
  const [mortgage, setMortgage] = useState(String(d.mortgage))
  const [maxLtv, setMaxLtv] = useState('80')
  const [currentRate, setCurrentRate] = useState(String(d.currentRate))
  const [helocRate, setHelocRate] = useState(String(d.helocRate))
  const [heLoanRate, setHeLoanRate] = useState(String(d.heLoanRate))
  const [refiRate, setRefiRate] = useState(String(d.refiRate))
  const [cashAmount, setCashAmount] = useState(String(d.cashAmount))
  const [growthRate, setGrowthRate] = useState('4')
  const [useCase, setUseCase] = useState('home_improve') // home_improve | invest | personal

  useEffect(() => {
    const nd = defaults[currency] || defaults.AUD
    setValue(String(nd.value))
    setMortgage(String(nd.mortgage))
    setCurrentRate(String(nd.currentRate))
    setHelocRate(String(nd.helocRate))
    setHeLoanRate(String(nd.heLoanRate))
    setRefiRate(String(nd.refiRate))
    setCashAmount(String(nd.cashAmount))
  }, [currency])

  const calc = useMemo(() => {
    const V = parseFloat(value) || 0
    const M = parseFloat(mortgage) || 0
    const ltvCap = (parseFloat(maxLtv) || 80) / 100
    const cRate = (parseFloat(currentRate) || 0) / 100
    const hRate = (parseFloat(helocRate) || 0) / 100
    const hlRate = (parseFloat(heLoanRate) || 0) / 100
    const rRate = (parseFloat(refiRate) || 0) / 100
    const cash = parseFloat(cashAmount) || 0
    const growth = (parseFloat(growthRate) || 0) / 100

    // Current position
    const equity = Math.max(0, V - M)
    const ltv = V > 0 ? (M / V) * 100 : 0
    const maxBorrowableAtCap = V * ltvCap
    const tappableEquity = Math.max(0, maxBorrowableAtCap - M)
    const availableToBorrow = Math.min(cash, tappableEquity)

    // Tax deductibility
    let interestDeductiblePct = 0
    if (rule.interestDeductible === 'primary' && useCase === 'home_improve') interestDeductiblePct = 1.0
    else if (rule.interestDeductible === 'investment' && useCase === 'invest') interestDeductiblePct = 1.0
    else if (rule.interestDeductible === 'partial') interestDeductiblePct = 0.5

    const isDeductible = interestDeductiblePct > 0
    const marginalRate = rule.marginalTaxRate || 0

    // Product comparison (all borrowing $cash)
    // 1. HELOC — interest-only draw period, then P&I
    const helocAnnualInterest = cash * hRate
    const helocMonthlyInterest = helocAnnualInterest / 12
    const helocAfterTaxMonthly = helocMonthlyInterest * (1 - interestDeductiblePct * marginalRate)
    const helocTaxSavingsAnnual = helocAnnualInterest * interestDeductiblePct * marginalRate

    // 2. Home Equity Loan — fixed, 15yr term
    const heLoanMonthlyRate = hlRate / 12
    const heLoanMonths = 15 * 12
    const heLoanPayment = heLoanMonthlyRate === 0 ? cash / heLoanMonths : cash * heLoanMonthlyRate * Math.pow(1 + heLoanMonthlyRate, heLoanMonths) / (Math.pow(1 + heLoanMonthlyRate, heLoanMonths) - 1)
    const heLoanTotalInterest = heLoanPayment * heLoanMonths - cash
    const heLoanAfterTaxPayment = heLoanPayment - (heLoanTotalInterest / heLoanMonths) * interestDeductiblePct * marginalRate

    // 3. Cash-out Refinance — replaces whole mortgage
    const newLoan = M + cash
    const refiMonthlyRate = rRate / 12
    const refiMonths = 30 * 12
    const refiPayment = refiMonthlyRate === 0 ? newLoan / refiMonths : newLoan * refiMonthlyRate * Math.pow(1 + refiMonthlyRate, refiMonths) / (Math.pow(1 + refiMonthlyRate, refiMonths) - 1)
    // Current payment for comparison
    const currentMonthlyRate = cRate / 12
    const currentMonths = 25 * 12
    const currentPayment = currentMonthlyRate === 0 ? M / currentMonths : M * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths) / (Math.pow(1 + currentMonthlyRate, currentMonths) - 1)
    const refiMonthlyDiff = refiPayment - currentPayment
    const refiLifetimeExtra = refiPayment * refiMonths - newLoan

    // Equity growth projection (15 years)
    const projection = []
    let propValue = V
    let loanBalance = M
    // Assume principal paydown at current rate with remaining term 25yr
    const monthlyPrincipalPayment = currentPayment
    for (let y = 1; y <= 15; y++) {
      propValue = propValue * (1 + growth)
      // Pay down mortgage for a year
      for (let m = 0; m < 12; m++) {
        const int = loanBalance * currentMonthlyRate
        const prin = Math.max(0, monthlyPrincipalPayment - int)
        loanBalance = Math.max(0, loanBalance - prin)
      }
      projection.push({
        year: y,
        propertyValue: propValue,
        mortgageBalance: loanBalance,
        equity: propValue - loanBalance,
        tappable: Math.max(0, propValue * ltvCap - loanBalance),
      })
    }

    // Recommendation
    let recommendation = ''
    if (tappableEquity < cash) {
      recommendation = 'Not enough tappable equity at ' + maxLtv + '% LTV'
    } else if (heLoanPayment < helocMonthlyInterest * 1.5) {
      recommendation = 'Home Equity Loan — lowest monthly cost'
    } else if (refiMonthlyDiff < 0) {
      recommendation = 'Cash-out Refinance — lower monthly payment'
    } else {
      recommendation = 'HELOC — flexible access to cash'
    }

    return {
      equity, ltv, tappableEquity, availableToBorrow, maxBorrowableAtCap,
      helocMonthlyInterest, helocAfterTaxMonthly, helocTaxSavingsAnnual,
      heLoanPayment, heLoanAfterTaxPayment, heLoanTotalInterest,
      refiPayment, refiMonthlyDiff, refiLifetimeExtra, currentPayment, newLoan,
      projection, recommendation, isDeductible, interestDeductiblePct, marginalRate,
      cash, V, M,
    }
  }, [value, mortgage, maxLtv, currentRate, helocRate, heLoanRate, refiRate, cashAmount, growthRate, useCase, currency, rule])

  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    registerCalculation({
      type: 'home-equity',
      countrySlug: currency.toLowerCase(),
      title: 'Home Equity - ' + currency,
      inputs: { value, mortgage, maxLtv, currentRate, helocRate, heLoanRate, refiRate, cashAmount, growthRate, useCase, currency },
      results: {
        equity: calc.equity,
        ltv: calc.ltv,
        tappable_equity: calc.tappableEquity,
        available_to_borrow: calc.availableToBorrow,
        heloc_monthly: calc.helocMonthlyInterest,
      },
    })
  }, [value, mortgage, maxLtv, currentRate, helocRate, heLoanRate, refiRate, cashAmount, growthRate, useCase, currency, calc, registerCalculation])

  const f = (n) => fmt(n, rule.symbol)

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
              <Home className="h-4 w-4 text-white" />
            </div>
            Home Equity Calculator
          </CardTitle>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-semibold">
            {CURRENCIES.map(x => <option key={x.code} value={x.code}>{x.label}</option>)}
          </select>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* Use case */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">What will you use the funds for?</div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setUseCase('home_improve')}
              className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (useCase === 'home_improve' ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
              Home improvement
            </button>
            <button onClick={() => setUseCase('invest')}
              className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (useCase === 'invest' ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
              Investment
            </button>
            <button onClick={() => setUseCase('personal')}
              className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (useCase === 'personal' ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
              Personal use
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
            <label className="text-sm font-semibold mb-1.5 block">Mortgage balance</label>
            <Input type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Max LTV cap (%)</label>
            <Input type="number" value={maxLtv} onChange={(e) => setMaxLtv(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Cash you want to access</label>
            <Input type="number" value={cashAmount} onChange={(e) => setCashAmount(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Growth rate (%/yr)</label>
            <Input type="number" step="0.1" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Current mortgage rate (%)</label>
            <Input type="number" step="0.01" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">HELOC rate (%)</label>
            <Input type="number" step="0.01" value={helocRate} onChange={(e) => setHelocRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Home equity loan rate (%)</label>
            <Input type="number" step="0.01" value={heLoanRate} onChange={(e) => setHeLoanRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Cash-out refi rate (%)</label>
            <Input type="number" step="0.01" value={refiRate} onChange={(e) => setRefiRate(e.target.value)} className="h-11" />
          </div>
        </div>

        {calc && (
          <>
            {/* Headline: Current position */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
                <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Home className="h-3 w-3" /> Total equity</div>
                <div className="text-2xl font-black text-emerald-600 tabular-nums">{f(calc.equity)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-2 border-blue-500/30">
                <div className="text-[10px] text-blue-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Percent className="h-3 w-3" /> LTV</div>
                <div className="text-2xl font-black text-blue-600 tabular-nums">{fmtPercent(calc.ltv)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
                <div className="text-[10px] text-amber-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Wallet className="h-3 w-3" /> Tappable equity</div>
                <div className="text-2xl font-black text-amber-600 tabular-nums">{f(calc.tappableEquity)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30">
                <div className="text-[10px] text-violet-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><PiggyBank className="h-3 w-3" /> Available to borrow</div>
                <div className="text-2xl font-black text-violet-600 tabular-nums">{f(calc.availableToBorrow)}</div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">Recommendation</div>
              <div className="text-xl md:text-2xl font-black">{calc.recommendation}</div>
            </div>

            {/* Product comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* HELOC */}
              <div className="rounded-xl p-5 border-2 border-blue-500/30 bg-blue-500/5">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2"><Landmark className="h-4 w-4" /> HELOC</div>
                <div className="text-2xl font-black text-blue-600 tabular-nums mb-1">{f(calc.helocMonthlyInterest)}<span className="text-sm font-normal">/mo</span></div>
                <div className="text-[10px] text-muted-foreground mb-3">Interest-only during draw period</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Annual interest</span><span className="font-mono">{f(calc.helocMonthlyInterest * 12)}</span></div>
                  {calc.isDeductible && (
                    <>
                      <div className="flex justify-between"><span className="text-muted-foreground">Tax savings</span><span className="font-mono text-emerald-600">+{f(calc.helocTaxSavingsAnnual)}</span></div>
                      <div className="flex justify-between border-t pt-1"><span className="font-semibold">After-tax cost</span><span className="font-mono font-bold">{f(calc.helocAfterTaxMonthly)}/mo</span></div>
                    </>
                  )}
                </div>
                <div className="text-[10px] text-blue-600 mt-2">Flexible — pay as you go</div>
              </div>

              {/* Home Equity Loan */}
              <div className="rounded-xl p-5 border-2 border-emerald-500/30 bg-emerald-500/5">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-2"><Home className="h-4 w-4" /> Home Equity Loan</div>
                <div className="text-2xl font-black text-emerald-600 tabular-nums mb-1">{f(calc.heLoanPayment)}<span className="text-sm font-normal">/mo</span></div>
                <div className="text-[10px] text-muted-foreground mb-3">Fixed rate, 15-year term</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total interest</span><span className="font-mono">{f(calc.heLoanTotalInterest)}</span></div>
                  {calc.isDeductible && (
                    <div className="flex justify-between border-t pt-1"><span className="font-semibold">After-tax payment</span><span className="font-mono font-bold">{f(calc.heLoanAfterTaxPayment)}/mo</span></div>
                  )}
                </div>
                <div className="text-[10px] text-emerald-600 mt-2">Predictable fixed payments</div>
              </div>

              {/* Cash-out Refi */}
              <div className="rounded-xl p-5 border-2 border-amber-500/30 bg-amber-500/5">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 flex items-center gap-2"><Calculator className="h-4 w-4" /> Cash-out Refi</div>
                <div className="text-2xl font-black text-amber-600 tabular-nums mb-1">{f(calc.refiPayment)}<span className="text-sm font-normal">/mo</span></div>
                <div className="text-[10px] text-muted-foreground mb-3">New 30-year mortgage</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">New loan balance</span><span className="font-mono">{f(calc.newLoan)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Monthly change vs current</span>
                    <span className={'font-mono font-bold ' + (calc.refiMonthlyDiff < 0 ? 'text-emerald-600' : 'text-red-500')}>{calc.refiMonthlyDiff >= 0 ? '+' : ''}{f(calc.refiMonthlyDiff)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1"><span className="font-semibold">Lifetime extra interest</span><span className="font-mono font-bold text-red-500">{f(calc.refiLifetimeExtra)}</span></div>
                </div>
                <div className="text-[10px] text-amber-600 mt-2">Resets amortization — 30yr term</div>
              </div>
            </div>

            {/* Tax deductibility note */}
            <div className={'rounded-lg p-4 border ' + (calc.isDeductible ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30')}>
              <div className="flex items-start gap-2">
                <Landmark className={'h-4 w-4 shrink-0 mt-0.5 ' + (calc.isDeductible ? 'text-emerald-600' : 'text-amber-600')} />
                <div className="text-xs">
                  <div className={'font-bold mb-1 ' + (calc.isDeductible ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400')}>
                    {calc.isDeductible ? '✓ Interest is tax-deductible for your scenario' : '✗ Interest is NOT tax-deductible for this use case'}
                  </div>
                  <div className="text-muted-foreground">{rule.notes}</div>
                  {calc.isDeductible && (
                    <div className="mt-2 text-emerald-700 dark:text-emerald-400">
                      You save <strong>{f(calc.helocTaxSavingsAnnual)}</strong>/year in tax (marginal rate {(calc.marginalRate * 100).toFixed(0)}%)
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 15-year equity projection */}
            <details className="border border-border rounded-xl overflow-hidden bg-card" open>
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">15-year equity projection ({growthRate}% growth/yr)</summary>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                    <tr>
                      <th className="text-left p-2 font-bold">Year</th>
                      <th className="text-right p-2 font-bold">Property value</th>
                      <th className="text-right p-2 font-bold">Mortgage balance</th>
                      <th className="text-right p-2 font-bold">Equity</th>
                      <th className="text-right p-2 font-bold">Tappable at {maxLtv}%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.projection.map((row, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="p-2 font-semibold">{row.year}</td>
                        <td className="text-right p-2 font-mono tabular-nums">{f(row.propertyValue)}</td>
                        <td className="text-right p-2 font-mono tabular-nums text-red-600">{f(row.mortgageBalance)}</td>
                        <td className="text-right p-2 font-mono tabular-nums text-emerald-600 font-bold">{f(row.equity)}</td>
                        <td className="text-right p-2 font-mono tabular-nums text-amber-600">{f(row.tappable)}</td>
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
                Tax rules vary by individual circumstances. Consult a tax professional before making borrowing decisions. Product availability differs by lender and country.
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}