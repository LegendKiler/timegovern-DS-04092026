import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Briefcase, Loader2 } from "lucide-react"

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'ZA', name: 'South Africa' },
]

export default function BusinessDaysCalculator() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [country, setCountry] = useState('US')
  const [excludeHolidays, setExcludeHolidays] = useState(true)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'business-days',
      countrySlug: country.toLowerCase(),
      title: 'Business Days',
      inputs: { from, to, country, excludeHolidays },
      results: result || {},
    })
  }, [from, to, country, excludeHolidays, result, registerCalculation])

  const calc = async () => {
    if (!from || !to) return
    setLoading(true)
    try {
      const a = new Date(from)
      const b = new Date(to)
      if (isNaN(a) || isNaN(b)) { setLoading(false); return }
      const start = new Date(Math.min(a, b))
      const end = new Date(Math.max(a, b))

      const holidaySet = new Set()
      if (excludeHolidays) {
        const years = new Set()
        for (let y = start.getFullYear(); y <= end.getFullYear(); y++) years.add(y)
        for (const y of years) {
          try {
            const res = await fetch('/data/holidays/' + country.toLowerCase() + '/' + y + '.json')
            if (res.ok) {
              const data = await res.json()
              const list = Array.isArray(data) ? data : (data?.holidays || [])
              for (const h of list) {
                const d = (typeof h === 'string') ? h : (h.date || h.iso || null)
                if (d) holidaySet.add(d)
              }
            }
          } catch {}
        }
      }

      let businessDays = 0
      let weekendDays = 0
      let holidayDays = 0
      const cur = new Date(start)
      while (cur <= end) {
        const dow = cur.getDay()
        const iso = cur.getFullYear() + '-' + String(cur.getMonth()+1).padStart(2,'0') + '-' + String(cur.getDate()).padStart(2,'0')
        const isWeekend = dow === 0 || dow === 6
        const isHoliday = holidaySet.has(iso)
        if (isWeekend) weekendDays++
        else if (isHoliday) holidayDays++
        else businessDays++
        cur.setDate(cur.getDate() + 1)
      }

      const totalDays = Math.floor((end - start) / 86400000) + 1
      setResult({ businessDays, weekendDays, holidayDays, totalDays })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          Business Days
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">From</label>
            <Input type="date" value={from} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setFrom(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">To</label>
            <Input type="date" value={to} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setTo(e.target.value)} className="h-11" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (for holidays)</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={excludeHolidays} onChange={(e) => setExcludeHolidays(e.target.checked)} className="h-4 w-4" />
          Exclude public holidays
        </label>
        <Button onClick={calc} disabled={loading} className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Calculate Business Days'}
        </Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 text-center border border-emerald-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Business Days</div>
              <div className="text-4xl font-black text-emerald-600 tabular-nums">{result.businessDays.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Total</div><div className="font-bold tabular-nums">{result.totalDays}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Weekend</div><div className="font-bold tabular-nums">{result.weekendDays}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Holidays</div><div className="font-bold tabular-nums">{result.holidayDays}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}