import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, Loader2 } from "lucide-react"

const COUNTRIES = [
  { code: 'US', name: 'United States' }, { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' }, { code: 'CA', name: 'Canada' },
  { code: 'NZ', name: 'New Zealand' }, { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' }, { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' }, { code: 'NL', name: 'Netherlands' },
  { code: 'CH', name: 'Switzerland' }, { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' }, { code: 'DK', name: 'Denmark' },
  { code: 'IE', name: 'Ireland' }, { code: 'PL', name: 'Poland' },
  { code: 'IN', name: 'India' }, { code: 'PK', name: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh' }, { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' }, { code: 'KR', name: 'South Korea' },
  { code: 'SG', name: 'Singapore' }, { code: 'MY', name: 'Malaysia' },
  { code: 'ID', name: 'Indonesia' }, { code: 'PH', name: 'Philippines' },
  { code: 'TH', name: 'Thailand' }, { code: 'VN', name: 'Vietnam' },
  { code: 'AE', name: 'UAE' }, { code: 'SA', name: 'Saudi Arabia' },
  { code: 'QA', name: 'Qatar' }, { code: 'TR', name: 'Turkey' },
  { code: 'ZA', name: 'South Africa' }, { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' }, { code: 'EG', name: 'Egypt' },
  { code: 'BR', name: 'Brazil' }, { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' }, { code: 'CL', name: 'Chile' },
]

export default function InflationCalculator() {
  const [amount, setAmount] = useState('1000')
  const [startYear, setStartYear] = useState('2010')
  const [endYear, setEndYear] = useState(String(new Date().getFullYear() - 1))
  const [country, setCountry] = useState('US')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'inflation',
      countrySlug: country.toLowerCase(),
      title: 'Inflation',
      inputs: { amount, startYear, endYear, country },
      results: result || {},
    })
  }, [amount, startYear, endYear, country, result, registerCalculation])

  const calc = async () => {
    const a = parseFloat(amount)
    const y0 = parseInt(startYear)
    const y1 = parseInt(endYear)
    if (!a || !y0 || !y1 || y0 >= y1) return
    setLoading(true)
    try {
      const url = 'https://api.worldbank.org/v2/country/' + country + '/indicator/FP.CPI.TOTL.ZG?format=json&per_page=100&date=' + y0 + ':' + y1
      const res = await fetch(url)
      const json = await res.json()
      const rows = Array.isArray(json) ? json[1] : null
      if (!rows || rows.length === 0) { setResult({ error: 'No inflation data for this period' }); setLoading(false); return }

      const rates = {}
      for (const r of rows) {
        if (r.value != null) rates[parseInt(r.date)] = r.value
      }

      let value = a
      let cumulative = 0
      let yearsUsed = 0
      for (let y = y0 + 1; y <= y1; y++) {
        const rate = rates[y]
        if (rate == null) continue
        value = value * (1 + rate / 100)
        cumulative += rate
        yearsUsed++
      }

      if (yearsUsed === 0) { setResult({ error: 'No data' }); setLoading(false); return }

      const avgRate = cumulative / yearsUsed
      const totalChange = ((value - a) / a) * 100
      const purchasingPowerLost = ((a - value) / a) * 100

      setResult({
        originalValue: a,
        adjustedValue: value,
        totalChangePct: totalChange,
        avgRate,
        yearsUsed,
        purchasingPowerLost,
        startYear: y0,
        endYear: y1,
      })
    } catch (e) {
      setResult({ error: 'Failed to fetch data' })
    } finally {
      setLoading(false)
    }
  }

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Inflation Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Amount</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Start Year</label>
            <Input type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">End Year</label>
            <Input type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} className="h-11" />
          </div>
        </div>
        <Button onClick={calc} disabled={loading} className="w-full h-11 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Calculate Inflation'}
        </Button>

        {result && !result.error && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 text-center border border-red-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {fmt(result.originalValue)} in {result.startYear} = 
              </div>
              <div className="text-3xl font-black text-red-600 tabular-nums">{fmt(result.adjustedValue)}</div>
              <div className="text-xs text-muted-foreground mt-1">in {result.endYear}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Total change</div><div className="font-bold tabular-nums">{result.totalChangePct.toFixed(1)}%</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Avg/yr</div><div className="font-bold tabular-nums">{result.avgRate.toFixed(2)}%</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Years</div><div className="font-bold tabular-nums">{result.yearsUsed}</div></div>
            </div>
            <p className="text-[11px] text-muted-foreground text-center">Data: World Bank CPI (FP.CPI.TOTL.ZG)</p>
          </div>
        )}
        {result && result.error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg text-center">{result.error}</div>
        )}
      </CardContent>
    </Card>
  )
}