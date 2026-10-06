import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"
import { COUNTRY_METADATA, getCountriesByRegion, REGION_ORDER } from '../../data/countryMetadata'

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', INR: '₹', BRL: 'R$', MXN: 'MX$', ZAR: 'R', NZD: 'NZ$', CHF: 'CHF ', SEK: 'kr ', NOK: 'kr ', DKK: 'kr ', KRW: '₩', SGD: 'S$', HKD: 'HK$', TRY: '₺', RUB: '₽', PLN: 'zł ', ILS: '₪', AED: 'AED ', SAR: 'SAR ', ARS: 'AR$', CLP: 'CLP$', THB: '฿', MYR: 'RM ', IDR: 'Rp ', PHP: '₱', VND: '₫', EGP: 'E£', NGN: '₦', PKR: '₨ ', BDT: '৳' }

export default function InvestmentCalculator() {
  const [countryCode, setCountryCode] = useState('US')
  const [initial, setInitial] = useState('10000')
  const [monthly, setMonthly] = useState('500')
  const [years, setYears] = useState('20')
  const [rate, setRate] = useState('8')

  const meta = COUNTRY_METADATA[countryCode] || {}
  const sym = CURRENCY_SYMBOLS[meta.currency] || '$'
  const byRegion = useMemo(() => getCountriesByRegion(), [])

  const calc = useMemo(() => {
    const p0 = parseFloat(initial) || 0
    const m = parseFloat(monthly) || 0
    const y = parseFloat(years) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = y * 12
    const fvInit = p0 * Math.pow(1 + r, n)
    const fvCont = r > 0 ? m * (Math.pow(1 + r, n) - 1) / r : m * n
    const total = fvInit + fvCont
    const contributed = p0 + m * n
    const interest = total - contributed
    return { total, contributed, interest, years: y }
  }, [initial, monthly, years, rate])

  const fmt = (n) => sym + (n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Investment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (currency)</label>
          <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {REGION_ORDER.map(r => byRegion[r] && byRegion[r].length > 0 && (<optgroup key={r} label={r}>{byRegion[r].map(c => <option key={c.code} value={c.code}>{c.name} — {c.currency || 'N/A'}</option>)}</optgroup>))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Initial amount</label>
            <Input type="number" value={initial} onChange={e => setInitial(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Monthly contribution</label>
            <Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Years</label>
            <Input type="number" value={years} onChange={e => setYears(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Annual return (%)</label>
            <Input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className="h-11" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-xl p-4 text-center border border-violet-500/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Value after {calc.years} years</div>
          <div className="text-3xl font-black text-violet-600 tabular-nums">{fmt(calc.total)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Contributed</div><div className="font-bold tabular-nums">{fmt(calc.contributed)}</div></div>
          <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Interest earned</div><div className="font-bold tabular-nums">{fmt(calc.interest)}</div></div>
        </div>
      </CardContent>
    </Card>
  )
}