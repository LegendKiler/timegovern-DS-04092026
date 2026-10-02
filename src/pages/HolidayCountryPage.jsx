import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { setPageMeta } from '../lib/seo'
import { useHolidays } from '../hooks/useHolidays'
import { getHolidayCountry } from '../data/countryCodes'

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function icsEscape(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
}

function buildICS(countryName, year, holidays) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TimeGovern//Public Holidays//EN',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${icsEscape(countryName + ' Public Holidays ' + year)}`,
  ]
  for (const h of holidays) {
    const d = h.date.replace(/-/g, '')
    const next = new Date(h.date + 'T00:00:00')
    next.setDate(next.getDate() + 1)
    const nd = next.toISOString().slice(0, 10).replace(/-/g, '')
    lines.push(
      'BEGIN:VEVENT',
      `UID:${h.date}-${h.countryCode}-${icsEscape(h.name).replace(/\s/g, '_')}@timegovern.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${d}`,
      `DTEND;VALUE=DATE:${nd}`,
      `SUMMARY:${icsEscape(h.name)}`,
      `DESCRIPTION:${icsEscape((h.types || []).join(', ') + (h.supplemental ? ' (supplemental source)' : ''))}`,
      'END:VEVENT'
    )
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

function downloadICS(countryName, year, holidays) {
  const blob = new Blob([buildICS(countryName, year, holidays)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${countryName.toLowerCase().replace(/\s+/g, '-')}-holidays-${year}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function HolidayCountryPage() {
  const { country: code, year: yearParam } = useParams()
  const cc = (code || '').toUpperCase()
  const year = Number(yearParam)
  const meta = getHolidayCountry(cc)

  const validYear = Number.isInteger(year) && year >= 1970 && year <= 2100
  const { holidays, loading, error, fromCache, refresh } = useHolidays(validYear ? cc : null, validYear ? year : null)

  // SEO
  useEffect(() => {
    if (!meta) {
      document.title = 'Country not supported | TimeGovern Holidays'
      return
    }
    document.title = `${meta.name} Public Holidays ${year} — Full List | TimeGovern`
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
    m.content = `Complete list of public holidays in ${meta.name} for ${year}. Dates, names, and types. Download as calendar (.ics).`
    setPageMeta()
  }, [meta, year])

  if (code && !meta) {
    return (
      <div className="container mx-auto p-8 max-w-2xl">
        <h1 className="text-3xl font-black mb-3">Country not supported</h1>
        <p className="text-muted-foreground mb-4">
          We don't currently have holiday data for "{code}". See the full list of supported countries.
        </p>
        <Link to="/holidays" className="inline-block px-5 py-2 rounded-lg bg-primary text-primary-foreground font-bold">
          Browse all countries
        </Link>
      </div>
    )
  }

  if (!validYear) {
    const cur = new Date().getFullYear()
    return <Navigate to={`/holidays/${(code || '').toLowerCase()}/${cur}`} replace />
  }

  const byMonth = useMemo(() => {
    const out = {}
    for (const h of holidays) {
      const m = Number(h.date.slice(5, 7))
      if (!out[m]) out[m] = []
      out[m].push(h)
    }
    return out
  }, [holidays])

  const faqs = useMemo(() => {
    if (!meta) return []
    return [
      {
        q: `How many public holidays does ${meta.name} have in ${year}?`,
        a: `${meta.name} has ${holidays.length} public holidays listed for ${year}.`,
      },
      {
        q: `What is the next public holiday in ${meta.name}?`,
        a: (() => {
          const today = new Date().toISOString().slice(0, 10)
          const next = holidays.find(h => h.date >= today)
          return next ? `${next.name} on ${formatDate(next.date)}.` : 'All holidays for this year have passed.'
        })(),
      },
      {
        q: `Can I download ${meta.name} holidays for ${year}?`,
        a: `Yes. Use the "Download .ics" button to import all ${holidays.length} holidays into Google Calendar, Apple Calendar, or Outlook.`,
      },
    ]
  }, [meta, year, holidays])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="text-sm text-muted-foreground mb-4">
        <Link to="/holidays" className="hover:text-primary">← All countries</Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {meta ? `${meta.name} Public Holidays ${year}` : 'Loading…'}
        </h1>
        {meta && (
          <p className="text-muted-foreground mb-4">
            {holidays.length} public {holidays.length === 1 ? 'holiday' : 'holidays'} in {meta.name} for {year}
            {fromCache && <span className="ml-2 text-xs">(cached)</span>}
            {meta.supplemental && <span className="ml-2 text-xs">· supplemental source</span>}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadICS(meta?.name || cc, year, holidays)}
            disabled={!holidays.length}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
          >
            Download .ics
          </button>
          <button
            onClick={refresh}
            className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted"
          >
            Refresh
          </button>
          <select
            value={year}
            onChange={e => { window.location.href = `/holidays/${(code||'').toLowerCase()}/${e.target.value}` }}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {[year - 1, year, year + 1].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </header>

      {loading && <p className="text-muted-foreground">Loading holidays…</p>}
      {error && <p className="text-red-500">Failed to load: {error}</p>}

      {!loading && !error && holidays.length === 0 && meta && (
        <p className="text-muted-foreground">No holidays found for {meta.name} in {year}.</p>
      )}

      {!loading && holidays.length > 0 && (
        <div className="space-y-8">
          {Object.keys(byMonth).map(Number).sort((a, b) => a - b).map(m => (
            <section key={m}>
              <h2 className="text-xl font-semibold mb-3">{MONTHS[m - 1]}</h2>
              <div className="space-y-2">
                {byMonth[m].map((h, i) => (
                  <Card key={h.date + i}>
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">{h.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(h.date)}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground shrink-0">
                        {(h.types || []).join(' · ')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {meta && faqs.length > 0 && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map(f => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }),
            }}
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