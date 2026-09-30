import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'
}
import { useGeo } from '../hooks/useGeo'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Plus, X, Sun, Moon, Globe, Search, Sparkles } from 'lucide-react'
import { CITIES, CITY_LIST, REGIONS } from '../data/cities'
import { useServerTime, describeDrift } from '../hooks/useServerTime'
import { useSupporterStatus, TIER_LIMITS } from '../hooks/useSupporterStatus'

const limit = 12

const readPins = () => {
  try {
    const raw = localStorage.getItem('timegovern_world_clock_pins')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return { list: parsed, customized: true }
    }
  } catch {}
  return { list: ['new-york', 'london', 'tokyo', 'sydney'], customized: false }
}

const formatTime = (tz, date) => {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(date)
}

const formatDate = (tz, date) => {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'short', day: 'numeric', month: 'short'
  }).format(date)
}

const isNight = (tz, date) => {
  const h = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false }).format(date), 10)
  return h < 6 || h >= 20
}

const getOffsetMinutes = (tz, date) => {
  const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' })
  const tzStr = date.toLocaleString('en-US', { timeZone: tz })
  return Math.round((new Date(tzStr).getTime() - new Date(utcStr).getTime()) / 60000)
}

const formatOffset = (min) => {
  const sign = min >= 0 ? '+' : '-'
  const abs = Math.abs(min)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return m === 0 ? 'UTC' + sign + h : 'UTC' + sign + h + ':' + String(m).padStart(2, '0')
}

export default function WorldClockPinned() {
  const [initial] = useState(readPins)
  const [pins, setPins] = useState(initial.list)
  const customizedRef = useRef(initial.customized)
  const [showPicker, setShowPicker] = useState(false)
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('All')
  const [now, setNow] = useState(new Date())
  const { geo } = useGeo()

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    try { localStorage.setItem('timegovern_world_clock_pins', JSON.stringify(pins)) } catch {}
  }, [pins])

  useEffect(() => {
    if (!geo?.timezone) return
    if (customizedRef.current) return
    const match = CITY_LIST.find(c => c.tz === geo.timezone)
    if (!match) return
    setPins(prev => {
      if (prev[0] === match.slug) return prev
      const filtered = prev.filter(s => s !== match.slug)
      return [match.slug, ...filtered].slice(0, limit)
    })
  }, [geo?.timezone])

  const addPin = (slug) => {
    if (pins.includes(slug)) { setPins(pins.filter(p => p !== slug)); return }
    if (pins.length >= limit) return
    setPins([...pins, slug])
  }

  const removePin = (slug) => {
    setPins(pins.filter(p => p !== slug))
  }

  const filteredCities = CITY_LIST.filter(c => {
    if (regionFilter !== 'All' && c.region !== regionFilter) return false
    if (search.trim() && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Pinned cities ({pins.length}/{limit})
            </h3>
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {showPicker ? 'Close picker' : 'Add city'}
            </button>
          </div>

          {pins.length === 0 ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">No cities pinned. Click "Add city" to start.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pins.map(slug => {
                const c = CITIES[slug]
                if (!c) return null
                const night = isNight(c.tz, now)
                const offset = getOffsetMinutes(c.tz, now)
                return (
                  <div key={slug} className="relative rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors group">
                    <button
                      onClick={() => removePin(slug)}
                      className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                      aria-label={'Remove ' + c.name}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      {night ? <Moon className="h-4 w-4 text-indigo-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
                      <h4 className="font-black text-sm">{c.name}</h4>
                    </div>
                    <div className="text-2xl md:text-3xl font-black tabular-nums text-foreground mb-1">
                      {formatTime(c.tz, now)}
                    </div>
                    <div className="text-[11px] text-muted-foreground mb-2">{formatDate(c.tz, now)}</div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                      {formatOffset(offset)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {pins.length >= limit && (
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
              <span>Free tier limit reached ({limit} cities). Supporter tier (50 cities) coming soon.</span>
            </div>
          )}
        </CardContent>
      </Card>

      {showPicker && (
        <Card className="border-border shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-black mb-4">Choose cities</h3>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search cities"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {REGIONS.map(r => (
                  <button key={r} onClick={() => setRegionFilter(r)} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === r ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{r}</button>
                ))}
                <button onClick={() => setRegionFilter('All')} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === 'All' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>All</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-80 overflow-y-auto">
              {filteredCities.map(c => {
                const active = pins.includes(c.slug)
                const disabled = !active && pins.length >= limit
                return (
                  <button
                    key={c.slug}
                    onClick={() => addPin(c.slug)}
                    disabled={disabled}
                    className={'text-left px-3 py-2 rounded-lg border text-xs transition ' +
                      (active ? 'border-primary bg-primary/10 text-primary font-bold' :
                        disabled ? 'border-border bg-muted/40 opacity-50 cursor-not-allowed' :
                          'border-border bg-card hover:border-primary/50')}
                  >
                    <div className="truncate">{c.name}</div>
                    <div className="text-[10px] text-muted-foreground">{c.region}</div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
