import { useState, useEffect, useMemo } from 'react'
import { Plus, X, MapPin, Globe, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const PRESET_ZONES = [
  { id: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { id: 'America/New_York', label: 'New York (US Eastern)' },
  { id: 'America/Chicago', label: 'Chicago (US Central)' },
  { id: 'America/Denver', label: 'Denver (US Mountain)' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (US Pacific)' },
  { id: 'America/Sao_Paulo', label: 'Sao Paulo' },
  { id: 'Europe/London', label: 'London' },
  { id: 'Europe/Paris', label: 'Paris' },
  { id: 'Europe/Berlin', label: 'Berlin' },
  { id: 'Europe/Moscow', label: 'Moscow' },
  { id: 'Africa/Cairo', label: 'Cairo' },
  { id: 'Africa/Johannesburg', label: 'Johannesburg' },
  { id: 'Asia/Dubai', label: 'Dubai' },
  { id: 'Asia/Kolkata', label: 'Mumbai / Delhi' },
  { id: 'Asia/Bangkok', label: 'Bangkok' },
  { id: 'Asia/Singapore', label: 'Singapore' },
  { id: 'Asia/Shanghai', label: 'Shanghai' },
  { id: 'Asia/Hong_Kong', label: 'Hong Kong' },
  { id: 'Asia/Tokyo', label: 'Tokyo' },
  { id: 'Asia/Seoul', label: 'Seoul' },
  { id: 'Australia/Perth', label: 'Perth' },
  { id: 'Australia/Adelaide', label: 'Adelaide' },
  { id: 'Australia/Brisbane', label: 'Brisbane' },
  { id: 'Australia/Sydney', label: 'Sydney' },
  { id: 'Australia/Melbourne', label: 'Melbourne' },
  { id: 'Pacific/Auckland', label: 'Auckland' },
]

const DEFAULT_ZONES = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney']

function getTimeInZone(date, tz) {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
  } catch (e) { return '--:--' }
}

function getDateInZone(date, tz) {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', day: '2-digit', month: 'short' }).format(date)
  } catch (e) { return '' }
}

function getOffsetHours(date, tz) {
  try {
    const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' })
    const tzStr = date.toLocaleString('en-US', { timeZone: tz })
    return Math.round((new Date(tzStr) - new Date(utcStr)) / 3600000)
  } catch (e) { return 0 }
}

export default function TimeZoneConverter() {
  const [now, setNow] = useState(new Date())
  const [zones, setZones] = useState(DEFAULT_ZONES)
  const [picker, setPicker] = useState('')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tg_tz_zones')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) setZones(parsed)
      }
    } catch (e) {}
    setHydrated(true)
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem('tg_tz_zones', JSON.stringify(zones)) } catch (e) {}
  }, [zones, hydrated])

  const localTz = useMemo(() => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone } catch (e) { return 'UTC' }
  }, [])
  const localOffset = useMemo(() => getOffsetHours(now, localTz), [now, localTz])
  const localTime = useMemo(() => getTimeInZone(now, localTz), [now, localTz])
  const localDate = useMemo(() => getDateInZone(now, localTz), [now, localTz])

  const addZone = () => { if (!picker || zones.includes(picker)) return; setZones([...zones, picker]); setPicker('') }
  const removeZone = (tz) => setZones(zones.filter(z => z !== tz))
  const available = PRESET_ZONES.filter(z => !zones.includes(z.id))

  return (
    <div className="space-y-6">
      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-transparent">
        <CardContent className="p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
              <MapPin className="h-6 w-6 text-indigo-500" />
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
          const offset = getOffsetHours(now, tz)
          const diff = offset - localOffset
          const time = getTimeInZone(now, tz)
          const date = getDateInZone(now, tz)
          const city = tz.split('/').pop().replace(/_/g, ' ')
          return (
            <Card key={tz} className="relative overflow-hidden">
              <button onClick={() => removeZone(tz)} className="absolute top-2 right-2 z-10 p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors" title={'Remove ' + city}>
                <X className="h-3.5 w-3.5" />
              </button>
              <CardContent className="p-4 pt-5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 pr-7">
                  <Globe className="h-3 w-3" />
                  {city}
                </div>
                <div className="text-3xl font-black tracking-tight tabular-nums mb-1">{time}</div>
                <div className="text-[11px] text-muted-foreground">{date}</div>
                <div className="text-[11px] font-bold mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {diff === 0 ? 'Same as yours' : diff > 0 ? '+' + diff + 'h ahead' : Math.abs(diff) + 'h behind'}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add time zone
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={picker} onChange={(e) => setPicker(e.target.value)} className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium">
              <option value="">Choose a city...</option>
              {available.map(z => (<option key={z.id} value={z.id}>{z.label}</option>))}
            </select>
            <button onClick={addZone} disabled={!picker} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          {zones.length > 1 && (
            <button onClick={() => setZones(DEFAULT_ZONES)} className="mt-3 text-xs text-muted-foreground hover:text-foreground underline">
              Reset to defaults
            </button>
          )}
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>Times update every 15 seconds. Your zone list is saved to this device only - no account, no tracking, 100% private.</span>
      </div>
    </div>
  )
}