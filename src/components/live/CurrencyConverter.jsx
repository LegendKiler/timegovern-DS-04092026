import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FreshnessBadge from './FreshnessBadge'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, RefreshCw, ArrowRightLeft, TrendingUp, Loader2 } from "lucide-react"
import SearchableCurrencySelect from '../SearchableCurrencySelect'
import { CURRENCIES, CURRENCY_REGION_ORDER, getCurrency, formatCurrencyAmount } from '../../data/currencies'

// Group currencies by region in the canonical order
function groupByRegion() {
  const groups = {}
  for (const c of CURRENCIES) {
    if (!groups[c.region]) groups[c.region] = []
    groups[c.region].push(c)
  }
  return CURRENCY_REGION_ORDER
    .filter((r) => groups[r])
    .map((r) => ({ region: r, currencies: groups[r].slice().sort((a, b) => a.code.localeCompare(b.code)) }))
}



export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('AUD')
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState(null)
  const [rateDate, setRateDate] = useState(null)

  const fetchRates = async (base) => {
    setLoading(true); setError('')
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/' + base)
      if (!res.ok) throw new Error('Server ' + res.status)
      const data = await res.json()
      if (data.result === 'error') throw new Error(data['error-type'] || 'API error')
      setRates(data.rates)
      setUpdated(new Date())
      setRateDate(data.time_last_update_utc || null)
    } catch (e) {
      setError(e.message || 'Failed to load rates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRates(from) }, [from])

  const swap = () => { setFrom(to); setTo(from) }

  const fromMeta = getCurrency(from)
  const toMeta = getCurrency(to)

  const numericAmount = parseFloat(amount || 0)
  const result = rates && rates[to] ? formatCurrencyAmount(numericAmount * rates[to], to) : '\u2014'
  const rate = rates && rates[to] ? rates[to].toFixed(4) : '\u2014'

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" /> Currency Converter <FreshnessBadge status="hourly" />
          </span>
          <Button variant="ghost" size="sm" onClick={() => fetchRates(from)} disabled={loading} aria-label="Refresh rates">
            <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded">{error}</div>}

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Amount</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11 text-lg font-semibold" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <SearchableCurrencySelect value={from} onChange={setFrom} disabled={loading} label="From" />

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swap} className="rounded-full" aria-label="Swap currencies">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <SearchableCurrencySelect value={to} onChange={setTo} disabled={loading} label="To" />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mt-2">
          {loading ? (
            <div className="flex items-center justify-center py-4"><Loader2 className="h-6 w-6 animate-spin text-emerald-500" /></div>
          ) : (
            <>
              <div className="text-xs text-muted-foreground mb-1">Converted Amount</div>
              <div className="text-2xl font-black text-emerald-600 tabular-nums">{result}</div>
              <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> 1 {from} = {rate} {to}
                {fromMeta && toMeta ? ' \u00B7 ' + fromMeta.name + ' \u2192 ' + toMeta.name : ''}
              </div>
            </>
          )}
        </div>

        {rateDate && <p className="text-xs text-muted-foreground text-center">Rates as of {rateDate}</p>}
        {!rateDate && updated && <p className="text-xs text-muted-foreground text-center">Updated {updated.toLocaleTimeString()}</p>}
      </CardContent>
    </Card>
  )
}