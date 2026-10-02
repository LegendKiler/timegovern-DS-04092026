import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { setPageMeta } from '../lib/seo'
import { useHolidays } from '../hooks/useHolidays'
import { getHolidayCountry } from '../data/countryCodes'

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

// UTC-noon helpers to avoid timezone drift
const dateAt = iso => new Date(iso + 'T12:00:00Z')
const isoOf   = d   => d.toISOString().slice(0, 10)
const addDays = (iso, n) => { const d = dateAt(iso); d.setUTCDate(d.getUTCDate() + n); return isoOf(d) }
const dowOf   = iso => dateAt(iso).getUTCDay()

function formatRange(startIso, endIso) {
  const s = dateAt(startIso), e = dateAt(endIso)
  if (s.getUTCMonth() === e.getUTCMonth()) {
    return `${s.getUTCDate()}–${e.getUTCDate()} ${MONTHS[s.getUTCMonth()]} ${s.getUTCFullYear()}`
  }
  return `${s.getUTCDate()} ${MONTHS[s.getUTCMonth()]} – ${e.getUTCDate()} ${MONTHS[e.getUTCMonth()]} ${s.getUTCFullYear()}`
}

function isWeekendDow(dow) { return dow === 0 || dow === 6 }

function findLongWeekends(holidays) {
  const globalOnly = holidays.filter(h => h.global !== false)
  const holidaySet = new Set(globalOnly.map(h => h.date))
  const seen = new Set()
  const out = []

  for (const h of globalOnly) {
    if (seen.has(h.date)) continue
    const dow = dowOf(h.date)
    // Only start blocks from a Friday, Saturday, Sunday or Monday holiday
    if (![5, 6, 0, 1].includes(dow)) continue

    let start = h.date
    let end = h.date

    // extend backwards
    while (true) {
      const prev = addDays(start, -1)
      const pd = dowOf(prev)
      if (holidaySet.has(prev) || isWeekendDow(pd)) start = prev
      else break
    }
    // extend forwards
    while (true) {
      const next = addDays(end, 1)
      const nd = dowOf(next)
      if (holidaySet.has(next) || isWeekendDow(nd)) end = next
      else break
    }

    const days = Math.round((dateAt(end) - dateAt(start)) / 86400000) + 1
    if (days < 3) continue

    const inBlock = globalOnly.filter(hh => hh.date >= start && hh.date <= end)
    const byDate = new Map()
    for (const hh of inBlock) {
      if (!byDate.has(hh.date)) byDate.set(hh.date, { ...hh })
      else byDate.get(hh.date).name = byDate.get(hh.date).name + ' \u00b7 ' + hh.name
    }
    const blockHolidays = [...byDate.values()]
    for (const bh of blockHolidays) seen.add(bh.date)

    out.push({
      start, end, days,
      holidays: blockHolidays,
      weekendDays: days - blockHolidays.length,
    })
  }

  return out.sort((a, b) => a.start.localeCompare(b.start))
}

function icsEscape(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
}
function buildICS(countryName, year, longWeekends) {
  const lines = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//TimeGovern//Long Weekends//EN','CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${icsEscape(countryName + ' Long Weekends ' + year)}`,
  ]
  for (const lw of longWeekends) {
    const d  = lw.start.replace(/-/g, '')
    const nd = addDays(lw.end, 1).replace(/-/g, '')
    const title = lw.holidays.map(h => h.name).join(' + ')
    lines.push(
      'BEGIN:VEVENT',
      `UID:lw-${lw.start}-${lw.end}@timegovern.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${d}`,
      `DTEND;VALUE=DATE:${nd}`,
      `SUMMARY:${icsEscape(lw.days + '-day weekend: ' + title)}`,
      `DESCRIPTION:${icsEscape('Holidays: ' + title)}`,
      'END:VEVENT'
    )
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}
function downloadICS(countryName, year, longWeekends) {
  const blob = new Blob([buildICS(countryName, year, longWeekends)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${countryName.toLowerCase().replace(/\s+/g, '-')}-long-weekends-${year}.ics`
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function LongWeekendsPage() {
  const { country: code, year: yearParam } = useParams()
  const cc = (code || '').toUpperCase()
  const year = Number(yearParam)
  const meta = getHolidayCountry(cc)
  const validYear = Number.isInteger(year) && year >= 1970 && year <= 2100

  const { holidays, loading, error } = useHolidays(validYear ? cc : null, validYear ? year : null)

  const longWeekends = useMemo(() => findLongWeekends(holidays), [holidays])

  useEffect(() => {
    if (!meta) {
      document.title = 'Country not supported | TimeGovern Holidays'
      return
    }
    document.title = `${meta.name} Long Weekends ${year} — Best Time Off | TimeGovern`
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
    m.content = `${longWeekends.length} long weekends in ${meta.name} for ${year}. Plan your time off around Friday and Monday public holidays.`
    setPageMeta()
  }, [meta, year, longWeekends.length])

  if (code && !meta) {
    return (
      <div className="container mx-auto p-8 max-w-2xl">
        <h1 className="text-3xl font-black mb-3">Country not supported</h1>
        <Link to="/holidays" className="inline-block px-5 py-2 rounded-lg bg-primary text-primary-foreground font-bold">Browse all countries</Link>
      </div>
    )
  }

  if (!validYear) {
    const cur = new Date().getFullYear()
    return <Navigate to={`/holidays/${(code || '').toLowerCase()}/${cur}/long-weekends`} replace />
  }

  const faqs = meta ? [
    {
      q: `How many long weekends does ${meta.name} have in ${year}?`,
      a: `${meta.name} has ${longWeekends.length} long weekends in ${year} where a public holiday falls next to a weekend.`,
    },
    {
      q: `What is the best long weekend in ${meta.name} in ${year}?`,
      a: longWeekends.length
        ? (() => {
            const best = longWeekends.reduce((a, b) => b.days > a.days ? b : a, longWeekends[0])
            return `The longest is a ${best.days}-day weekend from ${formatRange(best.start, best.end)}.`
          })()
        : 'No long weekends were found for this year.',
    },
  ] : []

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="text-sm text-muted-foreground mb-4">
        <Link to={`/holidays/${(code||'').toLowerCase()}/${year}`} className="hover:text-primary">← {meta?.name || cc} holidays {year}</Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {meta ? `${meta.name} Long Weekends ${year}` : 'Loading…'}
        </h1>
        {meta && (
          <p className="text-muted-foreground mb-4">
            {longWeekends.length} long {longWeekends.length === 1 ? 'weekend' : 'weekends'} in {year} — public holidays that sit next to a weekend.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadICS(meta?.name || cc, year, longWeekends)}
            disabled={!longWeekends.length}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
          >
            Download .ics
          </button>
          <select
            value={year}
            onChange={e => { window.location.href = `/holidays/${(code||'').toLowerCase()}/${e.target.value}/long-weekends` }}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {[year - 1, year, year + 1].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </header>

      {loading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-red-500">Failed to load: {error}</p>}

      {!loading && longWeekends.length === 0 && meta && (
        <p className="text-muted-foreground">No long weekends found for {meta.name} in {year}.</p>
      )}

      {!loading && longWeekends.length > 0 && (
        <div className="space-y-3">
          {longWeekends.map((lw, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">{lw.days}-day weekend</div>
                    <div className="text-sm text-muted-foreground mb-2">{formatRange(lw.start, lw.end)}</div>
                    <ul className="text-sm space-y-1">
                      {lw.holidays.map(h => (
                        <li key={h.date}>
                          <span className="font-medium">{h.name}</span>{' '}
                          <span className="text-muted-foreground">— {DAYS[dowOf(h.date)]}, {h.date}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs text-right shrink-0">
                    <div className="font-bold text-primary text-lg">{lw.days}</div>
                    <div className="text-muted-foreground">days off</div>
                    <div className="text-muted-foreground mt-1">{lw.weekendDays} weekend</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {meta && faqs.length > 0 && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org', '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            }) }}
          />
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i}>
                  <div className="font-medium">{f.q}</div>
                  <div className="text-muted-foreground text-sm">{f.a}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}