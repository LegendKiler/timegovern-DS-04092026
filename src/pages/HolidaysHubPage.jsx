import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HOLIDAY_COUNTRIES_BY_REGION, REGION_ORDER } from '../data/countryCodes'

export default function HolidaysHubPage() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const [q, setQ] = useState('')

  const query = q.trim().toLowerCase()
  const filtered = query
    ? Object.fromEntries(
        REGION_ORDER.map(r => [
          r,
          (HOLIDAY_COUNTRIES_BY_REGION[r] || []).filter(
            c =>
              c.name.toLowerCase().includes(query) ||
              c.code.toLowerCase().includes(query)
          ),
        ])
      )
    : HOLIDAY_COUNTRIES_BY_REGION

  const totalMatches = Object.values(filtered).reduce(
    (n, arr) => n + (arr?.length || 0),
    0
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Public Holidays</h1>
        <p className="text-muted-foreground mb-6">
          Browse public holidays for {totalMatches} countries and territories
          worldwide. Pick a country and year to see the full calendar.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search country or code (e.g. Germany, DE)…"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="sm:max-w-md"
          />
          <select
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {[currentYear - 1, currentYear, currentYear + 1].map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </header>

      {totalMatches === 0 && (
        <p className="text-muted-foreground">No countries match "{q}".</p>
      )}

      {REGION_ORDER.map(region => {
        const list = filtered[region] || []
        if (!list.length) return null
        return (
          <section key={region} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-baseline gap-2">
              {region}
              <span className="text-sm font-normal text-muted-foreground">
                ({list.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {list.map(c => (
                <Link
                  key={c.code}
                  to={`/holidays/${c.code.toLowerCase()}/${year}`}
                  className="block"
                >
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardContent className="p-3">
                      <div className="font-medium text-sm truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {c.code} · {year}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}