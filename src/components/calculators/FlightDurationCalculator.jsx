import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plane, ArrowRight } from "lucide-react"

// Timezone map (subset)
const CITIES = {
  'Sydney': { tz: 'Australia/Sydney', lat: -33.87, lon: 151.21 },
  'Melbourne': { tz: 'Australia/Melbourne', lat: -37.81, lon: 144.96 },
  'London': { tz: 'Europe/London', lat: 51.51, lon: -0.13 },
  'Paris': { tz: 'Europe/Paris', lat: 48.86, lon: 2.35 },
  'New York': { tz: 'America/New_York', lat: 40.71, lon: -74.01 },
  'Los Angeles': { tz: 'America/Los_Angeles', lat: 34.05, lon: -118.24 },
  'Tokyo': { tz: 'Asia/Tokyo', lat: 35.68, lon: 139.69 },
  'Dubai': { tz: 'Asia/Dubai', lat: 25.20, lon: 55.27 },
  'Singapore': { tz: 'Asia/Singapore', lat: 1.35, lon: 103.82 },
  'Hong Kong': { tz: 'Asia/Hong_Kong', lat: 22.32, lon: 114.17 },
  'Mumbai': { tz: 'Asia/Kolkata', lat: 19.08, lon: 72.88 },
  'Delhi': { tz: 'Asia/Kolkata', lat: 28.61, lon: 77.21 },
  'Karachi': { tz: 'Asia/Karachi', lat: 24.86, lon: 67.01 },
  'Berlin': { tz: 'Europe/Berlin', lat: 52.52, lon: 13.40 },
  'Rome': { tz: 'Europe/Rome', lat: 41.90, lon: 12.50 },
  'Johannesburg': { tz: 'Africa/Johannesburg', lat: -26.20, lon: 28.05 },
  'Cairo': { tz: 'Africa/Cairo', lat: 30.04, lon: 31.24 },
  'São Paulo': { tz: 'America/Sao_Paulo', lat: -23.55, lon: -46.63 },
}

const CITY_LIST = Object.keys(CITIES).sort()

function distanceKm(a, b) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

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

export default function FlightDurationCalculator() {
  const [from, setFrom] = useState('Sydney')
  const [to, setTo] = useState('London')

  const dist = from !== to ? distanceKm(CITIES[from], CITIES[to]) : 0

  // Estimate flight time — average 850 km/h + 30 min for takeoff/landing
  const flightHours = dist > 0 ? dist / 850 + 0.5 : 0
  const flightLabel = (() => {
    if (flightHours === 0) return '—'
    const h = Math.floor(flightHours)
    const m = Math.round((flightHours - h) * 60)
    return h + 'h ' + m + 'm'
  })()

  // Timezone diff
  const tzDiffMin = getOffset(CITIES[to].tz) - getOffset(CITIES[from].tz)
  const tzDiffH = tzDiffMin / 60
  const tzLabel = tzDiffMin === 0 ? 'Same time' : (tzDiffH > 0 ? '+' : '') + tzDiffH.toFixed(tzDiffMin % 60 === 0 ? 0 : 1) + 'h'

  // Departure arrival demo (if you leave at 10:00 local)
  const sampleDep = new Date()
  sampleDep.setHours(10, 0, 0, 0)
  const arrivalUTC = sampleDep.getTime() + flightHours * 3600000
  const arrivalLocalOffset = getOffset(CITIES[to].tz) + arrivalUTC - arrivalUTC // placeholder, use simpler calc
  // Simplest: departure local time = 10:00 from-city. Arrival local = 10:00 + flight + (to_offset - from_offset)
  const offsetDiff = tzDiffMin / 60
  const arrivalLocalHours = 10 + flightHours + offsetDiff
  const arrivalNormalized = ((arrivalLocalHours % 24) + 24) % 24
  const arrH = Math.floor(arrivalNormalized)
  const arrM = Math.round((arrivalNormalized - arrH) * 60)
  const dayShift = Math.floor(arrivalLocalHours / 24)

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 shadow-md">
            <Plane className="h-4 w-4 text-white" />
          </div>
          Flight Duration Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground text-sm">
              {CITY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground text-sm">
              {CITY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <span>{from}</span>
          <ArrowRight className="h-3 w-3" />
          <span>{to}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl p-4 border border-sky-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Distance</div>
            <div className="text-2xl font-black text-sky-600 tabular-nums">{Math.round(dist).toLocaleString()}<span className="text-sm ml-1">km</span></div>
          </div>
          <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl p-4 border border-sky-500/20">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Flight time</div>
            <div className="text-2xl font-black text-sky-600 tabular-nums">{flightLabel}</div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Timezone diff</span><span className="font-bold">{tzLabel}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Leave at 10:00 local</span><span className="font-bold text-sky-600">Arrive {String(arrH).padStart(2, '0')}:{String(arrM).padStart(2, '0')} local{dayShift !== 0 ? (dayShift > 0 ? ' (+' + dayShift + 'd)' : ' (' + dayShift + 'd)') : ''}</span></div>
        </div>

        <p className="text-[10px] text-muted-foreground text-center">Estimates based on 850 km/h average · Real flights vary</p>
      </CardContent>
    </Card>
  )
}