import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"
import { COUNTRY_METADATA, getSortedCountries } from '../../data/countryMetadata'

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', INR: '₹', BRL: 'R$', MXN: 'MX$', ZAR: 'R', NZD: 'NZ$', CHF: 'CHF ', SEK: 'kr ', NOK: 'kr ', DKK: 'kr ', KRW: '₩', SGD: 'S$', HKD: 'HK$', TRY: '₺', RUB: '₽', PLN: 'zł ', ILS: '₪', AED: 'AED ', SAR: 'SAR ', ARS: 'AR$', CLP: 'CLP$', THB: '฿', MYR: 'RM ', IDR: 'Rp ', PHP: '₱', VND: '₫', EGP: 'E£', NGN: '₦', PKR: '₨ ', BDT: '৳' }

export default function CreditCardPayoffCalculator() {
  const [countryCode, setCountryCode] = useState('US')
  const [balance, setBalance] = useState('5000')
  const [apr, setApr] = useState('19.99')
  const [payment, setPayment] = useState('200')

  const meta = COUNTRY_METADATA[countryCode] || {}
  const sym = CURRENCY_SYMBOLS[meta.currency] || '$'
  const sorted = useMemo(() => getSortedCountries(), [])

  const calc = useMemo(() => {
    const b0 = parseFloat(balance) || 0
    const monthlyRate = (parseFloat(apr) || 0) / 100 / 12
    const pay = parseFloat(payment) || 0
    if (pay <= 0 || b0 <= 0) return { months: 0, totalInterest: 0, totalPaid: 0, warning: 'Enter a positive balance and payment' }
    if (monthlyRate > 0 && pay <= b0 * monthlyRate) return { months: -1, totalInterest: 0, totalPaid: 0, warning: 'Payment is too low — balance will grow forever' }
    let bal = b0
    let months = 0
    let totalInterest = 0
    while (bal > 0 && months < 1200) {
      const interest = bal * monthlyRate
      totalInterest += interest
      bal = bal + interest - pay
      months++
      if (bal < 0) bal = 0
    }
    return { months, totalInterest, totalPaid: b0 + totalInterest, warning: null }
  }, [balance, apr, payment])

  const fmt = (n) => sym + (n || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })
  const timeStr = calc.months > 0
    ? (Math.floor(calc.months / 12) > 0 ? Math.floor(calc.months / 12) + 'y ' + (calc.months % 12) + 'm' : calc.months + ' months')
    : '—'

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-md">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          Credit Card Payoff Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (currency)</label>
          <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {sorted.map(c => <option key={c.code} value={c.code}>{c.name} — {c.currency || 'N/A'}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Current balance</label>
          <Input type="number" value={balance} onChange={e => setBalance(e.target.value)} className="h-11" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">APR (%)</label>
            <Input type="number" step="0.01" value={apr} onChange={e => setApr(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Monthly payment</label>
            <Input type="number" value={payment} onChange={e => setPayment(e.target.value)} className="h-11" />
          </div>
        </div>
        {calc.warning && (
          <div className="text-sm text-amber-600 bg-amber-500/10 p-3 rounded-lg text-center">{calc.warning}</div>
        )}
        {!calc.warning && calc.months > 0 && (
          <>
            <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-xl p-4 text-center border border-rose-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Time to payoff</div>
              <div className="text-3xl font-black text-rose-600 tabular-nums">{timeStr}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Total interest</div><div className="font-bold tabular-nums">{fmt(calc.totalInterest)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Total paid</div><div className="font-bold tabular-nums">{fmt(calc.totalPaid)}</div></div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}