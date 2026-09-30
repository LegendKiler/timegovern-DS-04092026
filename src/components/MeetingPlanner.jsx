import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarClock, Users, Trophy, Zap, Building2 } from 'lucide-react'
import { CITIES, CITY_LIST, REGIONS } from '../data/cities'
import { fullDayHeatmap, classifyHour, categoryColor, getLocalHour } from '../lib/meetingUtils'

const SCENARIOS = {
  'us-europe': { label: 'US + Europe', cities: ['new-york','chicago','los-angeles','london','paris','berlin','madrid'] },
  'europe-asia': { label: 'Europe + Asia', cities: ['london','paris','berlin','mumbai','singapore','tokyo','shanghai'] },
  'us-asia': { label: 'US + Asia', cities: ['new-york','los-angeles','tokyo','singapore','sydney'] },
  'global': { label: 'Global (US + EU + APAC)', cities: ['new-york','london','paris','tokyo','singapore','sydney'] }
}

export default function MeetingPlanner() {
  const [selected, setSelected] = useState(['new-york','london','paris','tokyo','sydney'])
  const [regionFilter, setRegionFilter] = useState('All')
  const [now] = useState(new Date())

  const filteredCities = regionFilter === 'All'
    ? CITY_LIST
    : CITY_LIST.filter(c => c.region === regionFilter)

  const heatmap = fullDayHeatmap(selected, now)
  const best = heatmap.reduce((a, b) => a.rawScore > b.rawScore ? a : b)
  const worst = heatmap.reduce((a, b) => a.rawScore < b.rawScore ? a : b)

  const toggle = (slug) => {
    if (selected.includes(slug)) {
      if (selected.length > 2) setSelected(selected.filter(s => s !== slug))
    } else {
      if (selected.length < 12) setSelected([...selected, slug])
    }
  }

  const applyScenario = (key) => {
    setSelected(SCENARIOS[key].cities)
  }

  // Precompute selected city list for display
  const selectedCities = selected.map(slug => ({ slug, ...CITIES[slug] })).filter(c => c.name)

  return (
    <div className="space-y-6">

      {/* Scenario quick-select */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-5">
          <h3 className="text-sm font-black mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Quick scenarios
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(SCENARIOS).map(([key, s]) => (
              <button
                key={key}
                onClick={() => applyScenario(key)}
                className="text-left px-3 py-2 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="text-xs font-bold">{s.label}</div>
                <div className="text-[10px] text-muted-foreground">{s.cities.length} cities</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* City picker */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Pick cities (2-12) — {selected.length} selected
            </h3>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map(r => (
                <button key={r} onClick={() => setRegionFilter(r)} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === r ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{r}</button>
              ))}
              <button onClick={() => setRegionFilter('All')} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === 'All' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>All</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto">
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
          <div className="mt-3 flex gap-2">
            <button onClick={() => setSelected([])} className="text-xs text-muted-foreground hover:text-rose-500 transition-colors">Clear</button>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              24-hour heatmap
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500"></span>Work</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-500"></span>Shoulder</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-rose-500"></span>Sleep</span>
            </div>
          </div>

          {selected.length === 0 ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">Pick at least one city to see the heatmap.</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">

                {/* UTC hour header */}
                <div className="grid grid-cols-[140px_repeat(24,1fr)] gap-0.5 mb-1">
                  <div></div>
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} className="text-[9px] text-center text-muted-foreground font-mono">{String(h).padStart(2, '0')}</div>
                  ))}
                </div>

                {/* Per-city rows */}
                {selectedCities.map(city => (
                  <div key={city.slug} className="grid grid-cols-[140px_repeat(24,1fr)] gap-0.5 mb-0.5">
                    <div className="text-xs font-bold truncate pr-2 flex items-center">{city.name}</div>
                    {Array.from({ length: 24 }, (_, utcH) => {
                      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), utcH, 0, 0))
                      const lh = getLocalHour(city.tz, d)
                      const cat = classifyHour(lh)
                      const color = categoryColor(cat)
                      return (
                        <div key={utcH} title={'UTC ' + String(utcH).padStart(2, '0') + ':00 = ' + String(lh).padStart(2, '0') + ':00 ' + cat} className={'h-6 rounded-sm bg-' + color + '-500/60 hover:bg-' + color + '-500 transition-colors cursor-help'} />
                      )
                    })}
                  </div>
                ))}

                {/* Aggregate score bar */}
                <div className="grid grid-cols-[140px_repeat(24,1fr)] gap-0.5 mt-3 pt-3 border-t border-border">
                  <div className="text-xs font-bold pr-2 flex items-center">Overlap score</div>
                  {heatmap.map(h => {
                    const pct = h.score
                    const bg = pct === 100 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : pct >= 30 ? 'bg-orange-500' : 'bg-rose-500'
                    return (
                      <div key={h.utcHour} title={'UTC ' + String(h.utcHour).padStart(2, '0') + ':00 — score ' + pct + '/100'} className={'h-4 rounded-sm ' + bg + '/70 hover:opacity-100 transition-opacity'} />
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best + worst windows */}
      {selected.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-2 border-emerald-500/30 bg-emerald-500/5 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-5 w-5 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Best window</span>
              </div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">
                {String(best.utcHour).padStart(2, '0')}:00 UTC
              </div>
              <div className="text-xs text-muted-foreground mb-4">Overall score: {best.score}/100</div>
              <div className="space-y-1.5">
                {best.breakdown.map(b => (
                  <div key={b.slug} className="flex items-center justify-between text-xs">
                    <span className="font-bold">{b.city}</span>
                    <span className="flex items-center gap-2">
                      <span className="tabular-nums">{String(b.localHour).padStart(2, '0')}:00</span>
                      <span className={'px-2 py-0.5 rounded-full text-[10px] font-bold bg-' + categoryColor(b.category) + '-500/10 text-' + categoryColor(b.category) + '-600 dark:text-' + categoryColor(b.category) + '-400'}>{b.category}</span>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-rose-500/30 bg-rose-500/5 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock className="h-5 w-5 text-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Avoid</span>
              </div>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400 mb-1">
                {String(worst.utcHour).padStart(2, '0')}:00 UTC
              </div>
              <div className="text-xs text-muted-foreground mb-4">Overall score: {worst.score}/100</div>
              <div className="space-y-1.5">
                {worst.breakdown.map(b => (
                  <div key={b.slug} className="flex items-center justify-between text-xs">
                    <span className="font-bold">{b.city}</span>
                    <span className="flex items-center gap-2">
                      <span className="tabular-nums">{String(b.localHour).padStart(2, '0')}:00</span>
                      <span className={'px-2 py-0.5 rounded-full text-[10px] font-bold bg-' + categoryColor(b.category) + '-500/10 text-' + categoryColor(b.category) + '-600 dark:text-' + categoryColor(b.category) + '-400'}>{b.category}</span>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}