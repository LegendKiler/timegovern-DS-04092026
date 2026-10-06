import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PiggyBank } from "lucide-react"
import { COUNTRY_METADATA, getSortedCountries } from '../../data/countryMetadata'

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', INR: '₹', BRL: 'R$', MXN: 'MX$', ZAR: 'R', NZD: 'NZ$', CHF: 'CHF ', SEK: 'kr ', NOK: 'kr ', DKK: 'kr ', KRW: '₩', SGD: 'S$', HKD: 'HK$', TRY: '₺', RUB: '₽', PLN: 'zł ', ILS: '₪', AED: 'AED ', SAR: 'SAR ', ARS: 'AR$', CLP: 'CLP$', THB: '฿', MYR: 'RM ', IDR: 'Rp ', PHP: '₱', VND: '₫', EGP: 'E£', NGN: '₦', PKR: '₨ ', BDT: '৳' }

export default function RetirementCalculator() {
  const [countryCode, setCountryCode] = useState('US')
  const [currentAge, setCurrentAge] = useState('30')
  const [retireAge, setRetireAge] = useState('65')
  const [currentSavings, setCurrentSavings] = useState('50000')
  const [monthly, setMonthly] = useState('500')
  const [returnRate, setReturnRate] = useState('7')
  const [withdrawalRate, setWithdrawalRate] = useState('4')

  const meta = COUNTRY_METADATA[countryCode] || {}
  const sym = CURRENCY_SYMBOLS[meta.currency] || '$'
  const sorted = useMemo(() => getSortedCountries(), [])

  const calc = useMemo(() => {
    const years = Math.max(0, (parseInt(retireAge) || 0) - (parseInt(currentAge) || 0))
    const r = (parseFloat(returnRate) || 0) / 100 / 12
    const m = parseFloat(monthly) || 0
    const start = parseFloat(currentSavings) || 0
    let bal = start
    for (let i = 0; i < years * 12; i++) bal = bal * (1 + r) + m
    const finalBalance = bal
    const monthlyIncome = finalBalance * ((parseFloat(withdrawalRate) || 0) / 100) / 12
    const totalContributions = start + m * years * 12
    return { years, finalBalance, monthlyIncome, totalContributions, growth: finalBalance - totalContributions }
  }, [currentAge, retireAge, currentSavings, monthly, returnRate, withdrawalRate])

  const fmt = (n) => sym + (n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
            <PiggyBank className="h-4 w-4 text-white" />
          </div>
          Retirement Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (currency)</label>
          <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {sorted.map(c => <option key={c.code} value={c.code}>{c.name} — {c.currency || 'N/A'}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Current age</label>
            <Input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Retirement age</label>
            <Input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Current savings</label>
            <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Monthly contribution</label>
            <Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Annual return (%)</label>
            <Input type="number" step="0.1" value={returnRate} onChange={e => setReturnRate(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Withdrawal rate (%)</label>
            <Input type="number" step="0.1" value={withdrawalRate} onChange={e => setWithdrawalRate(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 text-center border border-emerald-500/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Nest egg at {retireAge}</div>
          <div className="text-3xl font-black text-emerald-600 tabular-nums">{fmt(calc.finalBalance)}</div>
          <div className="text-xs text-muted-foreground mt-1">Over {calc.years} years</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Contrib.</div><div className="font-bold tabular-nums">{fmt(calc.totalContributions)}</div></div>
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Growth</div><div className="font-bold tabular-nums">{fmt(calc.growth)}</div></div>
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Monthly inc.</div><div className="font-bold tabular-nums">{fmt(calc.monthlyIncome)}</div></div>
        </div>
      </CardContent>
    </Card>
  )
}