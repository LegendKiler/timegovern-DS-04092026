import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, TrendingUp, TrendingDown, Percent, Info } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

const CURRENCIES = [
  { code: 'AUD', symbol: '$', label: 'AUD ($)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'CAD', symbol: 'CA$', label: 'CAD (CA$)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  { code: 'SGD', symbol: 'S$', label: 'SGD (S$)' },
  { code: 'NZD', symbol: 'NZ$', label: 'NZD (NZ$)' },
  { code: 'CHF', symbol: 'CHF', label: 'CHF' },
]

const DEFAULT_BY_CURRENCY = {
  AUD: { price: 700000, rent: 550, deposit: 140000 },
  USD: { price: 400000, rent: 2400, deposit: 80000 },
  EUR: { price: 350000, rent: 1400, deposit: 70000 },
  GBP: { price: 280000, rent: 1200, deposit: 56000 },
  CAD: { price: 550000, rent: 2400, deposit: 110000 },
  INR: { price: 5000000, rent: 25000, deposit: 1000000 },
  JPY: { price: 40000000, rent: 150000, deposit: 8000000 },
  SGD: { price: 1200000, rent: 4000, deposit: 300000 },
  NZD: { price: 650000, rent: 550, deposit: 130000 },
  CHF: { price: 600000, rent: 2200, deposit: 120000 },
}

function fmtCurrency(n, symbol) {
  if (n === null || n === undefined || isNaN(n)) return symbol + '0'
  return symbol + Math.round(n).toLocaleString('en-US')
}

function fmtPercent(n) {
  if (n === null || n === undefined || isNaN(n)) return '0.00%'
  return n.toFixed(2) + '%'
}

export default function RentalYieldCalculator({ defaultCurrency = 'AUD' }) {
  const [currency, setCurrency] = useState(defaultCurrency)
  const c = CURRENCIES.find(x => x.code === currency) || CURRENCIES[0]

  const d = DEFAULT_BY_CURRENCY[currency] || DEFAULT_BY_CURRENCY.AUD
  const [price, setPrice] = useState(String(d.price))
  const [deposit, setDeposit] = useState(String(d.deposit))
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const [rentFreq, setRentFreq] = useState('weekly')
  const [rent, setRent] = useState(String(d.rent))
  const [vacancyWeeks, setVacancyWeeks] = useState('2')
  const [expenses, setExpenses] = useState('6000')
  const [growth, setGrowth] = useState('5')
  const [mgmtFee, setMgmtFee] = useState('7')

  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const D = parseFloat(deposit) || 0
    const loan = Math.max(0, P0 - D)
    const annualRate = parseFloat(rate) || 0
    const r = annualRate / 100 / 12
    const n = (parseInt(years) || 0) * 12
    const rentNum = parseFloat(rent) || 0
    const vacWeeks = parseFloat(vacancyWeeks) || 0
    const annualExpenses = parseFloat(expenses) || 0
    const growthRate = parseFloat(growth) || 0
    const mgmtPct = (parseFloat(mgmtFee) || 0) / 100

    const grossAnnualRent = rentFreq === 'weekly' ? rentNum * 52
                          : rentFreq === 'fortnightly' ? rentNum * 26
                          : rentNum * 12

    const vacancyLoss = rentFreq === 'weekly' ? rentNum * vacWeeks
                       : rentFreq === 'fortnightly' ? (rentNum / 2) * vacWeeks
                       : (rentNum / 4.33) * vacWeeks

    const effectiveAnnualRent = grossAnnualRent - vacancyLoss
    const mgmtCost = effectiveAnnualRent * mgmtPct
    const totalExpenses = annualExpenses + mgmtCost
    const noi = effectiveAnnualRent - totalExpenses

    const monthlyPayment = (r === 0 || n === 0) ? 0 : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const annualMortgage = monthlyPayment * 12

    const grossYield = P0 > 0 ? (grossAnnualRent / P0) * 100 : 0
    const netYield = P0 > 0 ? (noi / P0) * 100 : 0
    const capRate = netYield

    const annualCashFlow = noi - annualMortgage
    const weeklyCashFlow = annualCashFlow / 52
    const monthlyCashFlow = annualCashFlow / 12

    const upfrontCosts = P0 * 0.05
    const totalInvested = D + upfrontCosts
    const cocReturn = totalInvested > 0 ? (annualCashFlow / totalInvested) * 100 : 0
    const dscr = annualMortgage > 0 ? noi / annualMortgage : null

    const breakEvenAnnual = totalExpenses + annualMortgage
    const breakEvenWeekly = breakEvenAnnual / 52

    const projection = []
    let propertyValue = P0
    let loanBalance = loan
    let cumulativeCashFlow = 0
    for (let y = 1; y <= 10; y++) {
      propertyValue = propertyValue * (1 + growthRate / 100)
      let yearInterest = 0, yearPrincipal = 0
      for (let m = 0; m < 12; m++) {
        const int = loanBalance * r
        const prin = monthlyPayment - int
        loanBalance = Math.max(0, loanBalance - prin)
        yearInterest += int
        yearPrincipal += prin
      }
      cumulativeCashFlow += annualCashFlow
      projection.push({
        year: y,
        value: propertyValue,
        loanBalance,
        equity: propertyValue - loanBalance,
        cumulativeCashFlow,
        totalReturn: (propertyValue - loanBalance) - D + cumulativeCashFlow,
      })
    }

    return {
      loan, grossAnnualRent, effectiveAnnualRent, vacancyLoss, mgmtCost, totalExpenses, noi,
      monthlyPayment, annualMortgage, grossYield, netYield, capRate,
      annualCashFlow, weeklyCashFlow, monthlyCashFlow,
      upfrontCosts, totalInvested, cocReturn, dscr, breakEvenWeekly,
      projection, growthRate,
    }
  }, [price, deposit, rate, years, rent, rentFreq, vacancyWeeks, expenses, growth, mgmtFee])

  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    registerCalculation({
      type: 'rental-yield',
      countrySlug: currency.toLowerCase(),
      title: 'Investment Property - ' + currency,
      inputs: { price, deposit, rate, years, rent, rentFreq, vacancyWeeks, expenses, growth, mgmtFee, currency },
      results: {
        gross_yield: calc.grossYield,
        net_yield: calc.netYield,
        annual_cash_flow: calc.annualCashFlow,
        weekly_cash_flow: calc.weeklyCashFlow,
        monthly_payment: calc.monthlyPayment,
        dscr: calc.dscr,
      },
    })
  }, [price, deposit, rate, years, rent, rentFreq, vacancyWeeks, expenses, growth, mgmtFee, currency, calc, registerCalculation])

  const f = (n) => fmtCurrency(n, c.symbol)

  const updateCurrency = (newCur) => {
    setCurrency(newCur)
    const dd = DEFAULT_BY_CURRENCY[newCur] || DEFAULT_BY_CURRENCY.AUD
    setPrice(String(dd.price))
    setDeposit(String(dd.deposit))
    setRent(String(dd.rent))
  }

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            Investment Property / Rental Yield Calculator
          </CardTitle>
          <select value={currency} onChange={(e) => updateCurrency(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-semibold">
            {CURRENCIES.map(x => <option key={x.code} value={x.code}>{x.label}</option>)}
          </select>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Property</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div><label className="text-sm font-semibold mb-1.5 block">Property price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">Deposit</label><Input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">Loan term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Rental Income</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold mb-1.5 block">Rent</label>
              <div className="flex gap-2">
                <Input type="number" value={rent} onChange={(e) => setRent(e.target.value)} className="h-11 flex-1" />
                <select value={rentFreq} onChange={(e) => setRentFreq(e.target.value)}
                  className="px-3 border border-border rounded-lg bg-background text-foreground text-sm h-11">
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div><label className="text-sm font-semibold mb-1.5 block">Vacancy (weeks/yr)</label><Input type="number" step="0.5" value={vacancyWeeks} onChange={(e) => setVacancyWeeks(e.target.value)} className="h-11" /></div>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Annual Expenses</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div><label className="text-sm font-semibold mb-1.5 block">Fixed costs (rates, insurance, repairs)</label><Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">Property manager fee (% of rent)</label><Input type="number" step="0.5" value={mgmtFee} onChange={(e) => setMgmtFee(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">Growth rate (%/yr)</label><Input type="number" step="0.5" value={growth} onChange={(e) => setGrowth(e.target.value)} className="h-11" /></div>
          </div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
                <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Percent className="h-3 w-3" /> Gross yield</div>
                <div className="text-2xl font-black text-emerald-600 tabular-nums">{fmtPercent(calc.grossYield)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30">
                <div className="text-[10px] text-cyan-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Net yield</div>
                <div className="text-2xl font-black text-cyan-600 tabular-nums">{fmtPercent(calc.netYield)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
                <div className="text-[10px] text-amber-600 uppercase tracking-widest font-bold mb-1">Cash-on-cash</div>
                <div className="text-2xl font-black text-amber-600 tabular-nums">{fmtPercent(calc.cocReturn)}</div>
              </div>
              <div className={'rounded-xl p-4 bg-gradient-to-br border-2 ' + (calc.dscr && calc.dscr >= 1.25 ? 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30' : 'from-red-500/10 to-rose-500/10 border-red-500/30')}>
                <div className={'text-[10px] uppercase tracking-widest font-bold mb-1 ' + (calc.dscr && calc.dscr >= 1.25 ? 'text-emerald-600' : 'text-red-600')}>DSCR</div>
                <div className={'text-2xl font-black tabular-nums ' + (calc.dscr && calc.dscr >= 1.25 ? 'text-emerald-600' : 'text-red-600')}>{calc.dscr ? calc.dscr.toFixed(2) : '—'}</div>
              </div>
            </div>

            <div className={'rounded-xl p-5 border-2 ' + (calc.annualCashFlow >= 0 ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/40' : 'bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/40')}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 text-muted-foreground">
                  {calc.annualCashFlow >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  Annual cash flow (before tax)
                </div>
                <span className={'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ' + (calc.annualCashFlow >= 0 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')}>
                  {calc.annualCashFlow >= 0 ? 'Positive' : 'Negative'}
                </span>
              </div>
              <div className={'text-3xl md:text-4xl font-black tabular-nums ' + (calc.annualCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600')}>{f(calc.annualCashFlow)}</div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                <span>Weekly: <strong className="text-foreground">{f(calc.weeklyCashFlow)}</strong></span>
                <span>Monthly: <strong className="text-foreground">{f(calc.monthlyCashFlow)}</strong></span>
              </div>
            </div>

            <details className="border border-border rounded-xl overflow-hidden bg-card" open>
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">Full breakdown</summary>
              <div className="p-4 space-y-2 text-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Income</div>
                <div className="flex justify-between"><span className="text-muted-foreground">Gross annual rent</span><span className="font-mono font-bold tabular-nums">{f(calc.grossAnnualRent)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Less vacancy</span><span className="font-mono font-bold tabular-nums text-red-500">−{f(calc.vacancyLoss)}</span></div>
                <div className="flex justify-between border-t border-border pt-2"><span className="text-muted-foreground">Effective annual rent</span><span className="font-mono font-bold tabular-nums">{f(calc.effectiveAnnualRent)}</span></div>

                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4 mb-2">Expenses</div>
                <div className="flex justify-between"><span className="text-muted-foreground">Fixed costs</span><span className="font-mono font-bold tabular-nums">{f(parseFloat(expenses))}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Management ({mgmtFee}%)</span><span className="font-mono font-bold tabular-nums">{f(calc.mgmtCost)}</span></div>
                <div className="flex justify-between border-t border-border pt-2"><span className="font-semibold">Total operating expenses</span><span className="font-mono font-bold tabular-nums text-red-500">−{f(calc.totalExpenses)}</span></div>

                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4 mb-2">Net Operating Income</div>
                <div className="flex justify-between"><span className="font-semibold">NOI (annual)</span><span className="font-mono font-bold tabular-nums text-emerald-600">{f(calc.noi)}</span></div>

                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4 mb-2">Financing</div>
                <div className="flex justify-between"><span className="text-muted-foreground">Loan amount</span><span className="font-mono font-bold tabular-nums">{f(calc.loan)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Monthly P&amp;I</span><span className="font-mono font-bold tabular-nums">{f(calc.monthlyPayment)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Annual mortgage</span><span className="font-mono font-bold tabular-nums text-red-500">−{f(calc.annualMortgage)}</span></div>
              </div>
            </details>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Break-even weekly rent</div>
                <div className="text-2xl font-black tabular-nums">{f(calc.breakEvenWeekly)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Rent needed to cover all costs</div>
              </div>
              <div className="rounded-xl p-4 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total cash invested</div>
                <div className="text-2xl font-black tabular-nums">{f(calc.totalInvested)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Deposit + ~5% upfront costs</div>
              </div>
            </div>

            <details className="border border-border rounded-xl overflow-hidden bg-card">
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">10-year projection ({calc.growthRate}% growth/yr)</summary>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                    <tr>
                      <th className="text-left p-2 font-bold">Year</th>
                      <th className="text-right p-2 font-bold">Property</th>
                      <th className="text-right p-2 font-bold">Loan balance</th>
                      <th className="text-right p-2 font-bold">Equity</th>
                      <th className="text-right p-2 font-bold">Cumulative cash flow</th>
                      <th className="text-right p-2 font-bold">Total return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.projection.map((row, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="p-2 font-semibold">{row.year}</td>
                        <td className="text-right p-2 font-mono tabular-nums">{f(row.value)}</td>
                        <td className="text-right p-2 font-mono tabular-nums text-red-600">{f(row.loanBalance)}</td>
                        <td className="text-right p-2 font-mono tabular-nums text-emerald-600">{f(row.equity)}</td>
                        <td className={'text-right p-2 font-mono tabular-nums ' + (row.cumulativeCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600')}>{f(row.cumulativeCashFlow)}</td>
                        <td className={'text-right p-2 font-mono font-bold tabular-nums ' + (row.totalReturn >= 0 ? 'text-emerald-600' : 'text-red-600')}>{f(row.totalReturn)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <div className="text-blue-700 dark:text-blue-400 space-y-1">
                <p><strong>Gross yield benchmarks:</strong> 3-4% low, 4-6% good, 6-8% strong, 8%+ excellent</p>
                <p><strong>DSCR:</strong> Most lenders want ≥1.25. Yours: <strong>{calc.dscr ? calc.dscr.toFixed(2) : 'N/A'}</strong></p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}