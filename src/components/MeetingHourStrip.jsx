import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Sun, Moon, Briefcase, Clock } from 'lucide-react'
import { CITIES, CITY_LIST, REGIONS } from '../data/cities'
import { buildHourStrip, bestOverlapHour, categoryColor, categoryLabel } from '../lib/meetingUtils'

export default function MeetingHourStrip() {
  const [selected, setSelected] = useState(['new-york', 'london', 'tokyo'])
  const [regionFilter, setRegionFilter] = useState('All')
  const [now, setNow] = useState(new Date())

  const filteredCities = regionFilter === 'All'
    ? CITY_LIST
    : CITY_LIST.filter(c => c.region === regionFilter)

  const rows = buildHourStrip(selected, now)
  const best = bestOverlapHour(selected, now)

  const toggle = (slug) => {
    if (selected.includes(slug)) {
      if (selected.length > 2) setSelected(selected.filter(s => s !== slug))
    } else {
      if (selected.length < 6) setSelected([...selected, slug])
    }
  }

  return (
    <div className="space-y-6">
      {/* City picker */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h3 className="text-lg font-black">Pick cities (2-6)</h3>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map(r => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === r ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}
                >{r}</button>
              ))}
              <button
                onClick={() => setRegionFilter('All')}
                className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === 'All' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}
              >All</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filteredCities.map(c => {
              const active = selected.includes(c.slug)
              return (
                <button
                  key={c.slug}
                  onClick={() => toggle(c.slug)}
                  className={'text-left px-3 py-2 rounded-lg border text-xs transition ' + (active ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-border bg-card hover:border-primary/50')}
                >
                  <div className="truncate">{c.name}</div>
                  <div className="text-[10px] text-muted-foreground">{c.region}</div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* The strip */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              24-hour view
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500"></span>Work (9-18)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-500"></span>Shoulder</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-rose-500"></span>Sleep</span>
            </div>
          </div>

          {/* Header — UTC hours */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[140px_repeat(24,1fr)] gap-0.5 mb-1">
                <div></div>
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} className="text-[9px] text-center text-muted-foreground font-mono">{String(h).padStart(2, '0')}</div>
                ))}
              </div>

              {/* Per-city rows */}
              {rows.map(row => (
                <div key={row.slug} className="grid grid-cols-[140px_repeat(24,1fr)] gap-0.5 mb-0.5">
                  <div className="text-xs font-bold truncate pr-2 flex items-center">{row.city}</div>
                  {row.cells.map((cell, i) => {
                    const color = categoryColor(cell.category)
                    return (
                      <div
                        key={i}
                        title={'UTC ' + String(cell.utcHour).padStart(2, '0') + ':00 = ' + String(cell.localHour).padStart(2, '0') + ':00 local (' + categoryLabel(cell.category) + ')'}
                        className={'h-6 rounded-sm bg-' + color + '-500/60 hover:bg-' + color + '-500 transition-colors cursor-help'}
                      />
                    )
                  })}
                </div>
              ))}

              {/* Summary row — aggregate score per UTC hour */}
              <div className="grid grid-cols-[140px_repeat(24,1fr)] gap-0.5 mt-2 pt-2 border-t border-border">
                <div className="text-xs font-bold pr-2 flex items-center">Overlap score</div>
                {Array.from({ length: 24 }, (_, h) => {
                  const score = Math.max(0, Math.min(100, best.score))
                  const cellScores = rows.map(r => r.cells[h].category)
                  const workCount = cellScores.filter(c => c === 'work').length
                  const pct = Math.round(workCount / rows.length * 100)
                  const bg = pct === 100 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  return (
                    <div
                      key={h}
                      title={'UTC ' + String(h).padStart(2, '0') + ':00 — ' + pct + '% of selected cities in work hours'}
                      className={'h-4 rounded-sm ' + bg + '/70 hover:opacity-100 transition-opacity'}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* Best overlap */}
          <div className="mt-6 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Best meeting window</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">
              {String(best.utcHour).padStart(2, '0')}:00 UTC
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              Overall overlap score: {best.score}/100
            </div>
            <div className="space-y-1">
              {best.breakdown.map(b => (
                <div key={b.slug} className="flex items-center justify-between text-xs">
                  <span className="font-bold">{b.city}</span>
                  <span className="flex items-center gap-2">
                    <span className="tabular-nums">{String(b.localHour).padStart(2, '0')}:00</span>
                    <span className={'px-2 py-0.5 rounded-full text-[10px] font-bold bg-' + categoryColor(b.category) + '-500/10 text-' + categoryColor(b.category) + '-600 dark:text-' + categoryColor(b.category) + '-400'}>
                      {categoryLabel(b.category)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}