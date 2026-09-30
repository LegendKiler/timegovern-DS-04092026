import { useState, useEffect, useMemo } from 'react'
import { Plus, X, Globe, Sun, Moon, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const ALL_CITIES = [
  { tz: 'Pacific/Auckland', label: 'Auckland', region: 'Oceania' },
  { tz: 'Pacific/Fiji', label: 'Suva (Fiji)', region: 'Oceania' },
  { tz: 'Pacific/Apia', label: 'Apia', region: 'Oceania' },
  { tz: 'Pacific/Tongatapu', label: "Nuku'alofa", region: 'Oceania' },
  { tz: 'Pacific/Noumea', label: 'Noumea', region: 'Oceania' },
  { tz: 'Pacific/Port_Moresby', label: 'Port Moresby', region: 'Oceania' },
  { tz: 'Pacific/Guadalcanal', label: 'Honiara', region: 'Oceania' },
  { tz: 'Australia/Sydney', label: 'Sydney', region: 'Oceania' },
  { tz: 'Australia/Melbourne', label: 'Melbourne', region: 'Oceania' },
  { tz: 'Australia/Brisbane', label: 'Brisbane', region: 'Oceania' },
  { tz: 'Australia/Adelaide', label: 'Adelaide', region: 'Oceania' },
  { tz: 'Australia/Perth', label: 'Perth', region: 'Oceania' },
  { tz: 'Australia/Hobart', label: 'Hobart', region: 'Oceania' },
  { tz: 'Australia/Darwin', label: 'Darwin', region: 'Oceania' },
  { tz: 'Asia/Tokyo', label: 'Tokyo', region: 'Asia' },
  { tz: 'Asia/Seoul', label: 'Seoul', region: 'Asia' },
  { tz: 'Asia/Pyongyang', label: 'Pyongyang', region: 'Asia' },
  { tz: 'Asia/Shanghai', label: 'Shanghai', region: 'Asia' },
  { tz: 'Asia/Hong_Kong', label: 'Hong Kong', region: 'Asia' },
  { tz: 'Asia/Taipei', label: 'Taipei', region: 'Asia' },
  { tz: 'Asia/Ulaanbaatar', label: 'Ulaanbaatar', region: 'Asia' },
  { tz: 'Asia/Vladivostok', label: 'Vladivostok', region: 'Asia' },
  { tz: 'Asia/Novosibirsk', label: 'Novosibirsk', region: 'Asia' },
  { tz: 'Asia/Yekaterinburg', label: 'Yekaterinburg', region: 'Asia' },
  { tz: 'Asia/Singapore', label: 'Singapore', region: 'Asia' },
  { tz: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur', region: 'Asia' },
  { tz: 'Asia/Bangkok', label: 'Bangkok', region: 'Asia' },
  { tz: 'Asia/Jakarta', label: 'Jakarta', region: 'Asia' },
  { tz: 'Asia/Manila', label: 'Manila', region: 'Asia' },
  { tz: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh City', region: 'Asia' },
  { tz: 'Asia/Phnom_Penh', label: 'Phnom Penh', region: 'Asia' },
  { tz: 'Asia/Vientiane', label: 'Vientiane', region: 'Asia' },
  { tz: 'Asia/Yangon', label: 'Yangon', region: 'Asia' },
  { tz: 'Asia/Brunei', label: 'Bandar Seri Begawan', region: 'Asia' },
  { tz: 'Asia/Kolkata', label: 'Mumbai / Delhi', region: 'Asia' },
  { tz: 'Asia/Karachi', label: 'Karachi', region: 'Asia' },
  { tz: 'Asia/Dhaka', label: 'Dhaka', region: 'Asia' },
  { tz: 'Asia/Kathmandu', label: 'Kathmandu', region: 'Asia' },
  { tz: 'Asia/Colombo', label: 'Colombo', region: 'Asia' },
  { tz: 'Asia/Tashkent', label: 'Tashkent', region: 'Asia' },
  { tz: 'Asia/Almaty', label: 'Almaty', region: 'Asia' },
  { tz: 'Asia/Dubai', label: 'Dubai', region: 'Middle East' },
  { tz: 'Asia/Riyadh', label: 'Riyadh', region: 'Middle East' },
  { tz: 'Asia/Tehran', label: 'Tehran', region: 'Middle East' },
  { tz: 'Asia/Baghdad', label: 'Baghdad', region: 'Middle East' },
  { tz: 'Asia/Jerusalem', label: 'Jerusalem', region: 'Middle East' },
  { tz: 'Asia/Beirut', label: 'Beirut', region: 'Middle East' },
  { tz: 'Asia/Amman', label: 'Amman', region: 'Middle East' },
  { tz: 'Asia/Kuwait', label: 'Kuwait City', region: 'Middle East' },
  { tz: 'Asia/Qatar', label: 'Doha', region: 'Middle East' },
  { tz: 'Asia/Muscat', label: 'Muscat', region: 'Middle East' },
  { tz: 'Asia/Damascus', label: 'Damascus', region: 'Middle East' },
  { tz: 'Asia/Baku', label: 'Baku', region: 'Middle East' },
  { tz: 'Asia/Tbilisi', label: 'Tbilisi', region: 'Middle East' },
  { tz: 'Asia/Yerevan', label: 'Yerevan', region: 'Middle East' },
  { tz: 'Europe/London', label: 'London', region: 'Europe' },
  { tz: 'Europe/Dublin', label: 'Dublin', region: 'Europe' },
  { tz: 'Europe/Paris', label: 'Paris', region: 'Europe' },
  { tz: 'Europe/Brussels', label: 'Brussels', region: 'Europe' },
  { tz: 'Europe/Amsterdam', label: 'Amsterdam', region: 'Europe' },
  { tz: 'Europe/Berlin', label: 'Berlin', region: 'Europe' },
  { tz: 'Europe/Zurich', label: 'Zurich', region: 'Europe' },
  { tz: 'Europe/Vienna', label: 'Vienna', region: 'Europe' },
  { tz: 'Europe/Rome', label: 'Rome', region: 'Europe' },
  { tz: 'Europe/Madrid', label: 'Madrid', region: 'Europe' },
  { tz: 'Europe/Lisbon', label: 'Lisbon', region: 'Europe' },
  { tz: 'Europe/Oslo', label: 'Oslo', region: 'Europe' },
  { tz: 'Europe/Stockholm', label: 'Stockholm', region: 'Europe' },
  { tz: 'Europe/Copenhagen', label: 'Copenhagen', region: 'Europe' },
  { tz: 'Europe/Helsinki', label: 'Helsinki', region: 'Europe' },
  { tz: 'Atlantic/Reykjavik', label: 'Reykjavik', region: 'Europe' },
  { tz: 'Europe/Tallinn', label: 'Tallinn', region: 'Europe' },
  { tz: 'Europe/Riga', label: 'Riga', region: 'Europe' },
  { tz: 'Europe/Vilnius', label: 'Vilnius', region: 'Europe' },
  { tz: 'Europe/Warsaw', label: 'Warsaw', region: 'Europe' },
  { tz: 'Europe/Prague', label: 'Prague', region: 'Europe' },
  { tz: 'Europe/Budapest', label: 'Budapest', region: 'Europe' },
  { tz: 'Europe/Bucharest', label: 'Bucharest', region: 'Europe' },
  { tz: 'Europe/Sofia', label: 'Sofia', region: 'Europe' },
  { tz: 'Europe/Belgrade', label: 'Belgrade', region: 'Europe' },
  { tz: 'Europe/Zagreb', label: 'Zagreb', region: 'Europe' },
  { tz: 'Europe/Athens', label: 'Athens', region: 'Europe' },
  { tz: 'Europe/Istanbul', label: 'Istanbul', region: 'Europe' },
  { tz: 'Europe/Kiev', label: 'Kyiv', region: 'Europe' },
  { tz: 'Europe/Moscow', label: 'Moscow', region: 'Europe' },
  { tz: 'Europe/Minsk', label: 'Minsk', region: 'Europe' },
  { tz: 'Africa/Cairo', label: 'Cairo', region: 'Africa' },
  { tz: 'Africa/Casablanca', label: 'Casablanca', region: 'Africa' },
  { tz: 'Africa/Algiers', label: 'Algiers', region: 'Africa' },
  { tz: 'Africa/Tunis', label: 'Tunis', region: 'Africa' },
  { tz: 'Africa/Lagos', label: 'Lagos', region: 'Africa' },
  { tz: 'Africa/Accra', label: 'Accra', region: 'Africa' },
  { tz: 'Africa/Abidjan', label: 'Abidjan', region: 'Africa' },
  { tz: 'Africa/Dakar', label: 'Dakar', region: 'Africa' },
  { tz: 'Africa/Khartoum', label: 'Khartoum', region: 'Africa' },
  { tz: 'Africa/Addis_Ababa', label: 'Addis Ababa', region: 'Africa' },
  { tz: 'Africa/Nairobi', label: 'Nairobi', region: 'Africa' },
  { tz: 'Africa/Kampala', label: 'Kampala', region: 'Africa' },
  { tz: 'Africa/Dar_es_Salaam', label: 'Dar es Salaam', region: 'Africa' },
  { tz: 'Africa/Lusaka', label: 'Lusaka', region: 'Africa' },
  { tz: 'Africa/Harare', label: 'Harare', region: 'Africa' },
  { tz: 'Africa/Maputo', label: 'Maputo', region: 'Africa' },
  { tz: 'Africa/Johannesburg', label: 'Johannesburg', region: 'Africa' },
  { tz: 'Africa/Windhoek', label: 'Windhoek', region: 'Africa' },
  { tz: 'America/New_York', label: 'New York', region: 'North America' },
  { tz: 'America/Chicago', label: 'Chicago', region: 'North America' },
  { tz: 'America/Denver', label: 'Denver', region: 'North America' },
  { tz: 'America/Los_Angeles', label: 'Los Angeles', region: 'North America' },
  { tz: 'America/Phoenix', label: 'Phoenix', region: 'North America' },
  { tz: 'America/Anchorage', label: 'Anchorage', region: 'North America' },
  { tz: 'Pacific/Honolulu', label: 'Honolulu', region: 'North America' },
  { tz: 'America/Toronto', label: 'Toronto', region: 'North America' },
  { tz: 'America/Vancouver', label: 'Vancouver', region: 'North America' },
  { tz: 'America/Edmonton', label: 'Edmonton', region: 'North America' },
  { tz: 'America/Winnipeg', label: 'Winnipeg', region: 'North America' },
  { tz: 'America/Halifax', label: 'Halifax', region: 'North America' },
  { tz: 'America/Mexico_City', label: 'Mexico City', region: 'North America' },
  { tz: 'America/Cancun', label: 'Cancun', region: 'North America' },
  { tz: 'America/Guatemala', label: 'Guatemala City', region: 'North America' },
  { tz: 'America/Costa_Rica', label: 'San Jose', region: 'North America' },
  { tz: 'America/Panama', label: 'Panama City', region: 'North America' },
  { tz: 'America/Havana', label: 'Havana', region: 'North America' },
  { tz: 'America/Jamaica', label: 'Kingston', region: 'North America' },
  { tz: 'America/Santo_Domingo', label: 'Santo Domingo', region: 'North America' },
  { tz: 'America/Puerto_Rico', label: 'San Juan', region: 'North America' },
  { tz: 'America/Sao_Paulo', label: 'Sao Paulo', region: 'South America' },
  { tz: 'America/Buenos_Aires', label: 'Buenos Aires', region: 'South America' },
  { tz: 'America/Santiago', label: 'Santiago', region: 'South America' },
  { tz: 'America/Lima', label: 'Lima', region: 'South America' },
  { tz: 'America/Bogota', label: 'Bogota', region: 'South America' },
  { tz: 'America/Caracas', label: 'Caracas', region: 'South America' },
  { tz: 'America/La_Paz', label: 'La Paz', region: 'South America' },
  { tz: 'America/Guayaquil', label: 'Quito', region: 'South America' },
  { tz: 'America/Asuncion', label: 'Asuncion', region: 'South America' },
  { tz: 'America/Montevideo', label: 'Montevideo', region: 'South America' },
  { tz: 'UTC', label: 'UTC', region: 'UTC' },
]

const DEFAULT_ZONES = ['Europe/London', 'America/New_York', 'Asia/Tokyo', 'Australia/Sydney']
const STORAGE = 'tg_worldclock_v1'
const MAX_CITIES = 8

function getTime(date, tz) {
  try { return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(date) } catch (e) { return '--:--:--' }
}

function getDate(date, tz) {
  try { return new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', day: '2-digit', month: 'short' }).format(date) } catch (e) { return '' }
}

function getHour(date, tz) {
  try { return parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false }).format(date), 10) } catch (e) { return 12 }
}

function getOffset(date, tz) {
  try {
    const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
    const local = new Date(date.toLocaleString('en-US', { timeZone: tz }))
    return Math.round((local - utc) / 3600000)
  } catch (e) { return 0 }
}

function isDay(date, tz) {
  const h = getHour(date, tz)
  return h >= 6 && h < 18
}

export default function WorldClock() {
  const [now, setNow] = useState(new Date())
  const [zones, setZones] = useState(DEFAULT_ZONES)
  const [picker, setPicker] = useState('')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (raw) {
        const d = JSON.parse(raw)
        if (Array.isArray(d.zones) && d.zones.length > 0) setZones(d.zones)
      }
    } catch (e) {}
    setHydrated(true)
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE, JSON.stringify({ zones })) } catch (e) {}
  }, [zones, hydrated])

  const localTz = useMemo(() => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone } catch (e) { return 'UTC' }
  }, [])
  const localOffset = useMemo(() => getOffset(now, localTz), [now, localTz])

  const add = () => { if (!picker || zones.includes(picker) || zones.length >= MAX_CITIES) return; setZones([...zones, picker]); setPicker('') }
  const remove = (tz) => setZones(zones.filter(z => z !== tz))
  const available = ALL_CITIES.filter(c => !zones.includes(c.tz))
  const cityLabel = (tz) => (ALL_CITIES.find(c => c.tz === tz) || { label: tz.split('/').pop().replace(/_/g, ' ') }).label

  const localTime = getTime(now, localTz)
  const localDate = getDate(now, localTz)
  const localIsDay = isDay(now, localTz)

  return (
    <div className="space-y-6">
      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-transparent">
        <CardContent className="p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${localIsDay ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-indigo-500/10 border border-indigo-500/30'}`}>
              {localIsDay ? <Sun className="h-6 w-6 text-amber-500" /> : <Moon className="h-6 w-6 text-indigo-500" />}
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your local time</div>
              <div className="text-3xl md:text-4xl font-black tracking-tight tabular-nums">{localTime}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{localDate} - {localTz.replace(/_/g, ' ')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {zones.map(tz => {
          const offset = getOffset(now, tz)
          const diff = offset - localOffset
          const time = getTime(now, tz)
          const date = getDate(now, tz)
          const day = isDay(now, tz)
          return (
            <Card key={tz} className="relative overflow-hidden">
              <button onClick={() => remove(tz)} className="absolute top-2 right-2 z-10 p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors" title={`Remove ${cityLabel(tz)}`}>
                <X className="h-3.5 w-3.5" />
              </button>
              <CardContent className="p-4 pt-5">
                <div className="flex items-center justify-between gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 pr-7">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {cityLabel(tz)}
                  </div>
                  {day ? <Sun className="h-3 w-3 text-amber-500" /> : <Moon className="h-3 w-3 text-indigo-400" />}
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tight tabular-nums mb-1">{time}</div>
                <div className="text-[11px] text-muted-foreground">{date}</div>
                <div className="text-[11px] font-bold mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {diff === 0 ? 'Same as yours' : diff > 0 ? `+${diff}h ahead` : `${Math.abs(diff)}h behind`}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add a city
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={picker} onChange={e => setPicker(e.target.value)} disabled={zones.length >= MAX_CITIES} className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium disabled:opacity-40">
              <option value="">Choose a city...</option>
              {["Oceania","Asia","Middle East","Europe","Africa","North America","South America","UTC"].map(region => { const items = available.filter(c => c.region === region); if (items.length === 0) return null; return (<optgroup key={region} label={region}>{items.map(c => <option key={c.tz} value={c.tz}>{c.label}</option>)}</optgroup>) })}
            </select>
            <button onClick={add} disabled={!picker || zones.length >= MAX_CITIES} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            {zones.length > 0 && (<button onClick={() => setZones(DEFAULT_ZONES)} className="text-xs text-muted-foreground hover:text-foreground underline">Reset to defaults</button>)}
            <div className="text-[10px] text-muted-foreground ml-auto">{zones.length} / {MAX_CITIES} cities · {ALL_CITIES.length} available</div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>Times update every second. Cities are saved on your device only - no account, no tracking, 100% private.</span>
      </div>
    </div>
  )
}