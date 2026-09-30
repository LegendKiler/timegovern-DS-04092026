import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Grid3x3, Download, Users, Clock } from 'lucide-react'
import { CITIES, CITY_LIST, REGIONS } from '../data/cities'
import { fullDayHeatmap, classifyHour, categoryColor, getLocalHour } from '../lib/meetingUtils'

const formatHour = (h) => String(h).padStart(2, '0') + ':00'

export default function MeetingHeatmapExtended() {
  const [selected, setSelected] = useState(['new-york', 'london', 'paris', 'tokyo', 'sydney'])
  const [regionFilter, setRegionFilter] = useState('All')
  const [durationHours, setDurationHours] = useState(1)
  const [now] = useState(new Date())
  const canvasRef = useRef(null)

  const filteredCities = regionFilter === 'All'
    ? CITY_LIST
    : CITY_LIST.filter(c => c.region === regionFilter)

  const heatmap = fullDayHeatmap(selected, now)

  // Compute best window for the chosen duration
  const bestForDuration = (() => {
    if (selected.length === 0) return null
    let best = { startHour: 0, totalScore: -Infinity }
    for (let h = 0; h < 24; h++) {
      let total = 0
      for (let k = 0; k < durationHours; k++) {
        const idx = (h + k) % 24
        total += heatmap[idx].score
      }
      if (total > best.totalScore) {
        best = { startHour: h, totalScore: total }
      }
    }
    return best
  })()

  const toggle = (slug) => {
    if (selected.includes(slug)) {
      if (selected.length > 2) setSelected(selected.filter(s => s !== slug))
    } else {
      if (selected.length < 12) setSelected([...selected, slug])
    }
  }

  const selectedCities = selected.map(slug => ({ slug, ...CITIES[slug] })).filter(c => c.name)

  const exportPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cellW = 24
    const cellH = 24
    const labelW = 130
    const headerH = 30
    const width = labelW + cellW * 24 + 40
    const height = headerH + cellH * (selectedCities.length + 2) + 60

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 16px sans-serif'
    ctx.fillText('Meeting Heatmap - TimeGovern.com', 20, 25)

    // Hour labels
    ctx.fillStyle = '#94a3b8'
    ctx.font = '10px monospace'
    for (let h = 0; h < 24; h++) {
      ctx.fillText(formatHour(h).slice(0, 2), labelW + h * cellW + 4, headerH + 12)
    }

    const colors = { work: '#10b981', shoulder: '#f59e0b', sleep: '#ef4444' }

    selectedCities.forEach((city, row) => {
      const y = headerH + 20 + row * cellH

      // City label
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 12px sans-serif'
      ctx.fillText(city.name, 20, y + 16)

      for (let h = 0; h < 24; h++) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), h, 0, 0))
        const lh = getLocalHour(city.tz, d)
        const cat = classifyHour(lh)
        ctx.fillStyle = colors[cat]
        ctx.globalAlpha = 0.7
        ctx.fillRect(labelW + h * cellW + 1, y + 2, cellW - 2, cellH - 4)
        ctx.globalAlpha = 1
      }
    })

    // Score row
    const yScore = headerH + 20 + selectedCities.length * cellH
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px sans-serif'
    ctx.fillText('Overlap score', 20, yScore + 16)

    heatmap.forEach((h, i) => {
      const pct = h.score
      ctx.fillStyle = pct === 100 ? '#10b981' : pct >= 60 ? '#f59e0b' : pct >= 30 ? '#f97316' : '#ef4444'
      ctx.globalAlpha = 0.7
      ctx.fillRect(labelW + i * cellW + 1, yScore + 2, cellW - 2, 16)
      ctx.globalAlpha = 1
    })

    // Footer
    ctx.fillStyle = '#94a3b8'
    ctx.font = '11px sans-serif'
    ctx.fillText('Generated ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC', 20, height - 20)

    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'meeting-heatmap-' + Date.now() + '.png'
    link.href = url
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* City picker */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Cities ({selected.length}/12)
            </h3>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map(r => (
                <button key={r} onClick={() => setRegionFilter(r)} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === r ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{r}</button>
              ))}
              <button onClick={() => setRegionFilter('All')} className={'px-3 py-1 rounded-lg text-xs font-bold transition ' + (regionFilter === 'All' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>All</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
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

      {/* Duration + export */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs font-bold mb-2">Meeting duration</div>
              <div className="flex gap-2">
                {[0.5, 1, 1.5, 2].map(d => (
                  <button key={d} onClick={() => setDurationHours(d)} className={'px-4 py-2 rounded-lg text-sm font-bold transition ' + (durationHours === d ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>
                    {d === 0.5 ? '30 min' : d + 'h'}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={exportPng} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PNG
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap with day boundary markers */}
      <Card className="border-border shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-black mb-4 flex items-center gap-2">
            <Grid3x3 className="h-5 w-5 text-primary" />
            Extended heatmap
          </h3>

          {selected.length === 0 ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">Pick at least one city.</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">

                {/* UTC hour header */}
                <div className="grid grid-cols-[130px_repeat(24,1fr)] gap-0.5 mb-1">
                  <div></div>
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} className="text-[9px] text-center text-muted-foreground font-mono">{String(h).padStart(2, '0')}</div>
                  ))}
                </div>

                {/* Rows with day boundary shading */}
                {selectedCities.map(city => (
                  <div key={city.slug} className="grid grid-cols-[130px_repeat(24,1fr)] gap-0.5 mb-0.5">
                    <div className="text-xs font-bold truncate pr-2 flex items-center">{city.name}</div>
                    {Array.from({ length: 24 }, (_, utcH) => {
                      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), utcH, 0, 0))
                      const lh = getLocalHour(city.tz, d)
                      const cat = classifyHour(lh)
                      const color = categoryColor(cat)
                      const isDayBoundary = lh === 0
                      return (
                        <div
                          key={utcH}
                          title={'UTC ' + formatHour(utcH) + ' = ' + formatHour(lh) + ' local (' + cat + ')'}
                          className={'h-6 rounded-sm bg-' + color + '-500/60 hover:bg-' + color + '-500 transition-colors cursor-help relative ' + (isDayBoundary ? 'ring-2 ring-white/60' : '')}
                        />
                      )
                    })}
                  </div>
                ))}

                {/* Score row */}
                <div className="grid grid-cols-[130px_repeat(24,1fr)] gap-0.5 mt-3 pt-3 border-t border-border">
                  <div className="text-xs font-bold pr-2 flex items-center">Overlap score</div>
                  {heatmap.map(h => {
                    const pct = h.score
                    const bg = pct === 100 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : pct >= 30 ? 'bg-orange-500' : 'bg-rose-500'
                    return <div key={h.utcHour} title={'Score ' + pct + '/100'} className={'h-4 rounded-sm ' + bg + '/70'} />
                  })}
                </div>
              </div>
            </div>
          )}

          {selected.length > 0 && bestForDuration && (
            <div className="mt-6 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Best {durationHours === 0.5 ? '30-minute' : durationHours + ' hour'} window</div>
              <div className="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">
                {formatHour(bestForDuration.startHour)} — {formatHour((bestForDuration.startHour + Math.ceil(durationHours)) % 24)} UTC
              </div>
              <div className="text-xs text-muted-foreground">Total score across {durationHours === 0.5 ? 'both 30-minute slots' : 'all ' + Math.ceil(durationHours) + ' hours'}: {bestForDuration.totalScore}</div>
            </div>
          )}

          {/* Hidden canvas for export */}
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>

      {/* Hourly breakdown table */}
      {selected.length > 0 && (
        <Card className="border-border shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Hourly breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-black sticky left-0 bg-card">UTC</th>
                    {selectedCities.map(c => (
                      <th key={c.slug} className="text-left py-2 px-2 font-black whitespace-nowrap">{c.name}</th>
                    ))}
                    <th className="text-right py-2 px-2 font-black">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmap.map(h => (
                    <tr key={h.utcHour} className="border-b border-border/30">
                      <td className="py-1.5 px-2 tabular-nums font-bold sticky left-0 bg-card">{formatHour(h.utcHour)}</td>
                      {h.breakdown.map(b => (
                        <td key={b.slug} className="py-1.5 px-2 tabular-nums">
                          <span className={'inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-' + categoryColor(b.category) + '-500/10 text-' + categoryColor(b.category) + '-600 dark:text-' + categoryColor(b.category) + '-400'}>
                            {formatHour(b.localHour)}
                          </span>
                        </td>
                      ))}
                      <td className={'py-1.5 px-2 text-right tabular-nums font-bold ' + (h.score === 100 ? 'text-emerald-600' : h.score >= 60 ? 'text-amber-600' : 'text-rose-600')}>
                        {h.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}