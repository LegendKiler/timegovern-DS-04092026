import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Car } from "lucide-react"
import { COUNTRY_METADATA, getCountriesByRegion, REGION_ORDER } from '../../data/countryMetadata'
import { useGeoCountry } from '../../hooks/useGeoCountry'

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', INR: '₹', BRL: 'R$', MXN: 'MX$', ZAR: 'R', NZD: 'NZ$', CHF: 'CHF ', SEK: 'kr ', NOK: 'kr ', DKK: 'kr ', KRW: '₩', SGD: 'S$', HKD: 'HK$', TRY: '₺', RUB: '₽', PLN: 'zł ', ILS: '₪', AED: 'AED ', SAR: 'SAR ', ARS: 'AR$', CLP: 'CLP$', THB: '฿', MYR: 'RM ', IDR: 'Rp ', PHP: '₱', VND: '₫', EGP: 'E£', NGN: '₦', PKR: '₨ ', BDT: '৳' }

export default function AutoLoanCalculator({ initialCountryCode, onCountryChange }) {
  const [countryCode, setCountryCode] = useState(initialCountryCode || '')
  const geoCountry = useGeoCountry()
  useEffect(() => {
    if (!countryCode && geoCountry) setCountryCode(geoCountry)
  }, [geoCountry])
  const [price, setPrice] = useState('30000')
  const [downPayment, setDownPayment] = useState('5000')
  const [termMonths, setTermMonths] = useState('60')
  const [rate, setRate] = useState('6.9')

  const meta = COUNTRY_METADATA[countryCode] || {}
  const sym = CURRENCY_SYMBOLS[meta.currency] || '$'

  const byRegion = useMemo(() => getCountriesByRegion(), [])

  const calc = useMemo(() => {
    const p = parseFloat(price) || 0
    const d = parseFloat(downPayment) || 0
    const n = parseInt(termMonths) || 1
    const r = (parseFloat(rate) || 0) / 100 / 12
    const principal = Math.max(0, p - d)
    let monthly
    if (r === 0) monthly = principal / n
    else monthly = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const total = monthly * n
    const interest = total - principal
    return { monthly, total, interest, principal, loanAmount: principal }
  }, [price, downPayment, termMonths, rate])

  const fmt = (n) => sym + (n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
            <Car className="h-4 w-4 text-white" />
          </div>
          Auto Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (currency)</label>
          <select value={countryCode} onChange={e => { setCountryCode(e.target.value); if (onCountryChange) onCountryChange(e.target.value) }} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="">Select a country</option>
            {REGION_ORDER.map(r => byRegion[r] && byRegion[r].length > 0 && (<optgroup key={r} label={r}>{byRegion[r].map(c => <option key={c.code} value={c.code}>{c.name} — {c.currency || 'N/A'}</option>)}</optgroup>))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Vehicle price</label>
            <Input type="number" value={price} onChange={e => setPrice(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Down payment</label>
            <Input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Term (months)</label>
            <Input type="number" value={termMonths} onChange={e => setTermMonths(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Interest rate (%)</label>
            <Input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 text-center border border-blue-500/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Monthly payment</div>
          <div className="text-3xl font-black text-blue-600 tabular-nums">{fmt(calc.monthly)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Total interest</div><div className="font-bold tabular-nums">{fmt(calc.interest)}</div></div>
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Total cost</div><div className="font-bold tabular-nums">{fmt(calc.total)}</div></div>
        </div>
      </CardContent>
    </Card>
  )
}
