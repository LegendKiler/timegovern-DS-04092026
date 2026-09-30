import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, CheckCircle2, AlertTriangle, Moon, Sun, Clock, Globe } from 'lucide-react'
import { CITIES, CITY_LIST, REGIONS } from '../data/cities'
import { classifyHour, categoryColor, getLocalHour } from '../lib/meetingUtils'

const formatLocalTime = (tz, date) => {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
}

const formatLocalDate = (tz, date) => {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(date)
}

const STATUS_GROUPS = [
  { key: 'work',     label: 'Available',      icon: CheckCircle2, color: 'emerald', desc: 'In working hours' },
  { key: 'shoulder', label: 'Shoulder',        icon: AlertTriangle,color: 'amber',   desc: 'Outside core hours, still possible' },
  { key: 'sleep',    label: 'Sleeping',        icon: Moon,         color: 'rose',    desc: 'Outside reasonable hours' }
]

export default function TeamAlignment() {
  const [selected, setSelected] = useState(['new-york','london','paris','tokyo','sydney','dubai'])
  const [meetingUtcHour, setMeetingUtcHour] = useState(14)
  const [regionFilter, setRegionFilter] = useState('All')
  const [now] = useState(new Date())

  const filteredCities = regionFilter === 'All'
    ? CITY_LIST
    : CITY_LIST.filter(c => c.region === regionFilter)

  const toggle = (slug) => {
    if (selected.includes(slug)) {
      if (selected.length > 2) setSelected(selected.filter(s => s !== slug))
    } else {
      if (selected.length < 12) setSelected([...selected, slug])
    }
  }

  // Build the meeting date at the chosen UTC hour
  const meetingDate = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), meetingUtcHour, 0, 0
  ))

  // Classify each selected city at the meeting time
  const cityStatus = selected.map(slug => {
    const c = CITIES[slug]
    if (!c) return null
    const localHour = getLocalHour(c.tz, meetingDate)
    const category = classifyHour(localHour)
    return {
      slug,
      name: c.name,
      region: c.region,
      tz: c.tz,
      localHour,
      localTime: formatLocalTime(c.tz, meetingDate),
      localDate: formatLocalDate(c.tz, meetingDate),
      category
    }
  }).filter(Boolean)

  // Group by status
  const grouped = {
    work: cityStatus.filter(c => c.category === 'work'),
    shoulder: cityStatus.filter(c => c.category === 'shoulder'),
    sleep: cityStatus.filter(c => c.category === 'sleep')
  }

  const totalAvailable = grouped.work.length
  const totalPossible = grouped.work.length + grouped.shoulder.length
  const overallScore = cityStatus.length > 0
    ? Math.round((totalAvailable * 100 + grouped.shoulder.length * 40) / (cityStatus.length * 100) * 100)
    : 0

  return (
    <div className="space-y-6">

      {/* Meeting time picker */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-black mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Meeting time (UTC)
          </h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold">Hour of day</label>
              <span className="text-sm font-black text-primary tabular-nums">{String(meetingUtcHour).padStart(2, '0')}:00 UTC</span>
            </div>
            <input
              type="range"
              min="0"
              max="23"
              value={meetingUtcHour}
              onChange={(e) => setMeetingUtcHour(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="grid grid-cols-6 gap-2 mt-3">
              {[0, 4, 8, 12, 16, 20].map(h => (
                <button key={h} onClick={() => setMeetingUtcHour(h)} className={'py-2 rounded-lg text-xs font-bold transition ' + (meetingUtcHour === h ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>
                  {String(h).padStart(2, '0')}:00
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* City picker */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Team cities (2-12) — {selected.length} selected
            </h3>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map(r => (
                <button key={r} onClick={() => setRegionFilter(r)} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === r ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{r}</button>
              ))}
              <button onClick={() => setRegionFilter('All')} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === 'All' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>All</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
            {filteredCities.map(c => {
              const active = selected.includes(c.slug)
              return (
                <button key={c.slug} onClick={() => toggle(c.slug)} className={'text-left px-3 py-2 rounded-lg border text-xs transition ' + (active ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-border bg-card hover:border-primary/50')}>
                  <div className="truncate">{c.name}</div>
                  <div className="text-[10px] text-muted-foreground">{c.region}</div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Overall status */}
      <Card className={'border-2 shadow-xl ' + (totalAvailable === cityStatus.length ? 'border-emerald-500/30 bg-emerald-500/5' : totalPossible === cityStatus.length ? 'border-amber-500/30 bg-amber-500/5' : 'border-rose-500/30 bg-rose-500/5')}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Meeting at {String(meetingUtcHour).padStart(2, '0')}:00 UTC</div>
              <div className="text-3xl font-black tabular-nums mb-1">
                {totalAvailable} / {cityStatus.length} <span className="text-base font-normal text-muted-foreground">available</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {totalPossible} can make it (work or shoulder) — score {overallScore}/100
              </div>
            </div>
            <div className={'inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ' + (totalAvailable === cityStatus.length ? 'bg-emerald-500 text-white' : totalPossible === cityStatus.length ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white')}>
              {totalAvailable === cityStatus.length ? <><CheckCircle2 className="h-4 w-4" /> Ideal</> : totalPossible === cityStatus.length ? <><AlertTriangle className="h-4 w-4" /> Partial</> : <><Moon className="h-4 w-4" /> Problematic</>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grouped status */}
      <div className="grid md:grid-cols-3 gap-4">
        {STATUS_GROUPS.map(g => {
          const cities = grouped[g.key]
          const Icon = g.icon
          return (
            <Card key={g.key} className={'border-2 border-' + g.color + '-500/30 bg-' + g.color + '-500/5 shadow-xl'}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={'h-5 w-5 text-' + g.color + '-500'} />
                  <div>
                    <div className={'text-[10px] font-black uppercase tracking-widest text-' + g.color + '-600 dark:text-' + g.color + '-400'}>{g.label}</div>
                    <div className="text-[10px] text-muted-foreground">{g.desc}</div>
                  </div>
                  <span className={'ml-auto text-xs font-black text-' + g.color + '-600 dark:text-' + g.color + '-400'}>{cities.length}</span>
                </div>
                {cities.length === 0 ? (
                  <div className="text-xs text-muted-foreground italic">None</div>
                ) : (
                  <div className="space-y-2">
                    {cities.map(c => (
                      <div key={c.slug} className="flex items-center justify-between text-xs">
                        <span className="font-bold truncate">{c.name}</span>
                        <span className="tabular-nums text-muted-foreground shrink-0 ml-2">{c.localTime}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed table */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-black mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Full breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-black">City</th>
                  <th className="text-left py-2 px-2 font-black">Local time</th>
                  <th className="text-left py-2 px-2 font-black">Day</th>
                  <th className="text-right py-2 px-2 font-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {cityStatus.map(c => (
                  <tr key={c.slug} className="border-b border-border/50">
                    <td className="py-2 px-2 font-bold">{c.name}</td>
                    <td className="py-2 px-2 tabular-nums">{c.localTime}</td>
                    <td className="py-2 px-2 text-muted-foreground">{c.localDate}</td>
                    <td className="py-2 px-2 text-right">
                      <span className={'inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-' + categoryColor(c.category) + '-500/10 text-' + categoryColor(c.category) + '-600 dark:text-' + categoryColor(c.category) + '-400'}>
                        {c.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}