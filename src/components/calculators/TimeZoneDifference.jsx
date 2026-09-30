import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

const CITIES = {
  'Sydney': 'Australia/Sydney', 'Melbourne': 'Australia/Melbourne', 'Perth': 'Australia/Perth',
  'Auckland': 'Pacific/Auckland', 'London': 'Europe/London', 'Paris': 'Europe/Paris',
  'Berlin': 'Europe/Berlin', 'Rome': 'Europe/Rome', 'New York': 'America/New_York',
  'Los Angeles': 'America/Los_Angeles', 'Toronto': 'America/Toronto', 'Tokyo': 'Asia/Tokyo',
  'Singapore': 'Asia/Singapore', 'Hong Kong': 'Asia/Hong_Kong', 'Dubai': 'Asia/Dubai',
  'Mumbai': 'Asia/Kolkata', 'Delhi': 'Asia/Kolkata', 'Karachi': 'Asia/Karachi',
  'Bangkok': 'Asia/Bangkok', 'Johannesburg': 'Africa/Johannesburg', 'Cairo': 'Africa/Cairo',
  'São Paulo': 'America/Sao_Paulo', 'Mexico City': 'America/Mexico_City',
}
const CITY_LIST = Object.keys(CITIES).sort()

function getOffset(tz, d = new Date()) {
  const dtf = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
  const parts = dtf.formatToParts(d)
  const asUTC = Date.UTC(
    parseInt(parts.find(p => p.type === 'year').value),
    parseInt(parts.find(p => p.type === 'month').value) - 1,
    parseInt(parts.find(p => p.type === 'day').value),
    parseInt(parts.find(p => p.type === 'hour').value),
    parseInt(parts.find(p => p.type === 'minute').value)
  )
  return Math.round((asUTC - d.getTime()) / 60000)
}

export default function TimeZoneDifference() {
  const [from, setFrom] = useState('Sydney')
  const [to, setTo] = useState('London')
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const diffMin = getOffset(CITIES[to]) - getOffset(CITIES[from])
  const diffH = diffMin / 60
  const label = diffMin === 0 ? 'Same time' : (diffH > 0 ? '+' : '') + diffH.toFixed(diffMin % 60 === 0 ? 0 : 1) + 'h'

  const fmtOffset = (mins) => {
    const sign = mins >= 0 ? '+' : '-'
    const a = Math.abs(mins)
    return 'UTC' + sign + String(Math.floor(a / 60)).padStart(2, '0') + ':' + String(a % 60).padStart(2, '0')
  }

  const fromTime = new Intl.DateTimeFormat('en-AU', { timeZone: CITIES[from], hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())
  const toTime = new Intl.DateTimeFormat('en-AU', { timeZone: CITIES[to], hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md">
            <Globe className="h-4 w-4 text-white" />
          </div>
          Time Zone Difference
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">City A</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground text-sm">
              {CITY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">City B</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground text-sm">
              {CITY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-xl p-6 text-center border border-indigo-500/20">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Difference</div>
          <div className="text-4xl font-black text-indigo-600 tabular-nums">{label}</div>
          <div className="text-xs text-muted-foreground mt-2">{fmtOffset(getOffset(CITIES[from]))} → {fmtOffset(getOffset(CITIES[to]))}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">{from}</div>
            <div className="text-2xl font-black tabular-nums">{fromTime}</div>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">{to}</div>
            <div className="text-2xl font-black tabular-nums text-indigo-600">{toTime}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}