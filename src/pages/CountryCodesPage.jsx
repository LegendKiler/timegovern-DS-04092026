import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, Sparkles, Search, Download, ArrowUpDown, ArrowRight, Flag, BookOpen, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRIES_DATA, REGIONS } from '../data/countries'
import { NATIVE_NAMES } from '../data/countryNames'

const FAQ = [
  { q: 'What is a country code?', a: 'A country code is a short identifier for a country used internationally. The two most common types are ISO 3166 codes (2-letter and 3-letter, for example US and USA) and international dialing codes (for example +1 for the United States).' },
  { q: 'What is the difference between ISO 2-letter and 3-letter codes?', a: 'ISO 3166-1 alpha-2 codes are two letters (US, GB, DE) and are used in domains, currencies, and country flags. ISO 3166-1 alpha-3 codes are three letters (USA, GBR, DEU) and are used in passports, banking, and international standards.' },
  { q: 'How do I dial an international phone number?', a: 'Start with your country exit code (00 in most countries, 011 in the US and Canada), then the destination country dial code (for example +44 for the UK), then the local number without its leading zero.' },
  { q: 'What is an emergency number?', a: 'An emergency number is a short phone number to reach police, fire, or ambulance. Common numbers are 911 (US, Canada), 112 (EU, many countries), 999 (UK, UAE, Singapore), and 000 (Australia).' },
  { q: 'How many countries are in this list?', a: 'This list covers the most commonly referenced countries. It includes ISO codes, dialing codes, capitals, currencies, areas, populations, GDP, time zones, and emergency numbers.' },
  { q: 'Can I download this data?', a: 'Yes. Click the Download CSV button to export the full table as a CSV file. You can also view the raw JSON by visiting /api/countries.json once it is live.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const DATASET_SCHEMA = { '@context': 'https://schema.org', '@type': 'Dataset', name: 'Country Codes and Data', description: 'Comprehensive country data - ISO codes, dialing codes, capitals, currencies, populations, GDP, time zones, and emergency numbers.', url: 'https://timegovern.com/country-codes' }

const SORTABLE = [
  { key: 'name', label: 'Country' },
  { key: 'c2', label: 'ISO2' },
  { key: 'c3', label: 'ISO3' },
  { key: 'dial', label: 'Dial' },
  { key: 'capital', label: 'Capital' },
  { key: 'currency', label: 'Currency' },
  { key: 'area', label: 'Area (km2)' },
  { key: 'pop', label: 'Population' },
  { key: 'gdp', label: 'GDP (B USD)' },
  { key: 'region', label: 'Region' },
  { key: 'emergency', label: 'Emergency' },
]

const formatNumber = (n) => {
  if (!n && n !== 0) return ''
  return new Intl.NumberFormat('en-US').format(n)
}

const downloadCsv = (rows) => {
  const headers = ['Country', 'ISO2', 'ISO3', 'Dial', 'Capital', 'Currency', 'Symbol', 'Area_km2', 'Population', 'GDP_BN_USD', 'Timezones', 'Emergency', 'Region']
  const lines = [headers.join(',')]
  for (const c of rows) {
    const row = [
      '"' + c.name + '"',
      c.c2,
      c.c3,
      '"' + c.dial + '"',
      '"' + c.capital + '"',
      c.currency,
      '"' + c.symbol + '"',
      c.area,
      c.pop,
      c.gdp,
      c.tz.length,
      '"' + c.emergency + '"',
      '"' + c.region + '"',
    ]
    lines.push(row.join(','))
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'timegovern-country-codes-' + new Date().toISOString().slice(0, 10) + '.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function CountryCodesPage() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')

  useEffect(() => {
    document.title = 'Country Codes - ISO, Dialing, Capital, Currency, Population | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Complete country code reference - ISO 2-letter and 3-letter codes, international dialing codes, capitals, currencies, area, population, GDP, timezones, and emergency numbers.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  const filtered = useMemo(() => {
    let rows = COUNTRIES_DATA
    if (region !== 'All') rows = rows.filter((c) => c.region === region)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      rows = rows.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.c2.toLowerCase().includes(q) ||
        c.c3.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q) ||
        c.dial.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
      )
    }
    const sorted = [...rows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
      const as = String(av).toLowerCase()
      const bs = String(bv).toLowerCase()
      if (as < bs) return sortDir === 'asc' ? -1 : 1
      if (as > bs) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [query, region, sortKey, sortDir])

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(DATASET_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-7xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">{COUNTRIES_DATA.length} countries - Free - Downloadable</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Globe className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              Country Codes
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              ISO codes, dialing codes, capitals, currencies, areas, populations, GDP, timezones, and emergency numbers - all in one table.
            </p>
          </div>
        </div>

        {/* Search + filter + download */}
        <Card className="border-border shadow-xl">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search country, capital, ISO code, dial code, currency"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="All">All regions</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <button
                onClick={() => downloadCsv(filtered)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition"
              >
                <Download className="h-4 w-4" />
                Download CSV
              </button>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Showing {filtered.length} of {COUNTRIES_DATA.length} countries
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-border shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-black sticky left-0 bg-muted/50 min-w-[180px]">Country</th>
                  <th className="text-left py-3 px-3 font-black cursor-pointer hover:text-primary" onClick={() => toggleSort('c2')}>
                    <span className="inline-flex items-center gap-1">ISO2 <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-left py-3 px-3 font-black cursor-pointer hover:text-primary hidden md:table-cell" onClick={() => toggleSort('c3')}>
                    <span className="inline-flex items-center gap-1">ISO3 <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-left py-3 px-3 font-black cursor-pointer hover:text-primary" onClick={() => toggleSort('dial')}>
                    <span className="inline-flex items-center gap-1">Dial <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-left py-3 px-3 font-black hidden lg:table-cell">Capital</th>
                  <th className="text-left py-3 px-3 font-black hidden lg:table-cell">Currency</th>
                  <th className="text-right py-3 px-3 font-black cursor-pointer hover:text-primary hidden xl:table-cell" onClick={() => toggleSort('area')}>
                    <span className="inline-flex items-center gap-1">Area km2 <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-right py-3 px-3 font-black cursor-pointer hover:text-primary hidden md:table-cell" onClick={() => toggleSort('pop')}>
                    <span className="inline-flex items-center gap-1">Population <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-right py-3 px-3 font-black cursor-pointer hover:text-primary hidden xl:table-cell" onClick={() => toggleSort('gdp')}>
                    <span className="inline-flex items-center gap-1">GDP $B <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-center py-3 px-3 font-black hidden xl:table-cell">TZ</th>
                  <th className="text-left py-3 px-3 font-black hidden xl:table-cell">Emergency</th>
                  <th className="text-left py-3 px-3 font-black hidden md:table-cell">Region</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.c2} className="border-b border-border/30 hover:bg-primary/5 transition-colors">
                    <td className="py-2 px-3 font-bold sticky left-0 bg-card">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{c.flag}</span>
                        <div>
                        <Link to={"/country-codes/" + c.c2.toLowerCase()} className="hover:text-primary transition-colors">{c.name}</Link>
                        {NATIVE_NAMES[c.c2] && (
                          <div className="text-[10px] text-muted-foreground font-normal leading-tight">{NATIVE_NAMES[c.c2].native}</div>
                        )}
                      </div>
                      </div>
                    </td>
                    <td className="py-2 px-3 font-mono font-bold">{c.c2}</td>
                    <td className="py-2 px-3 font-mono hidden md:table-cell">{c.c3}</td>
                    <td className="py-2 px-3 font-mono">{c.dial}</td>
                    <td className="py-2 px-3 hidden lg:table-cell text-muted-foreground">{c.capital}</td>
                    <td className="py-2 px-3 hidden lg:table-cell">
                      <span className="font-mono font-bold">{c.currency}</span>
                      <span className="text-muted-foreground ml-1">{c.symbol}</span>
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums hidden xl:table-cell">{formatNumber(c.area)}</td>
                    <td className="py-2 px-3 text-right tabular-nums hidden md:table-cell">{formatNumber(c.pop)}</td>
                    <td className="py-2 px-3 text-right tabular-nums hidden xl:table-cell">{formatNumber(c.gdp)}</td>
                    <td className="py-2 px-3 text-center hidden xl:table-cell">{c.tz.length}</td>
                    <td className="py-2 px-3 font-mono hidden xl:table-cell">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">{c.emergency}</span>
                    </td>
                    <td className="py-2 px-3 text-muted-foreground hidden md:table-cell">{c.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cross-sell */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in cities from every region.</p>
            </Link>
            <Link to="/salary" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Flag className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Salary Calculators</h3>
              <p className="text-xs text-muted-foreground">21 countries with official tax brackets.</p>
            </Link>
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Any two cities, any time.</p>
            </Link>
          </div>
        </div>

        {/* Official sources */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Free country data API</h2>
          <Card className="border-border shadow-xl">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Use this data programmatically in your own apps. Free, no API key, no rate limit, CC BY 4.0 license.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <a href="/api/countries.json" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-4 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <ExternalLink className="h-4 w-4 text-cyan-500" />
                    <span className="font-mono text-xs font-bold">/api/countries.json</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Full data as JSON</p>
                </a>
                <a href="/api/countries.csv" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-4 transition-colors">
                  <Download className="h-4 w-4 text-emerald-500 mb-1" />
                  <div className="font-mono text-xs font-bold">/api/countries.csv</div>
                  <p className="text-xs text-muted-foreground">Same data, CSV format</p>
                </a>
              </div>
              <Link to="/api-docs" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                Read the API docs <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <a href="https://www.iso.org/iso-3166-country-codes.html" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">ISO 3166</h3>
              <p className="text-xs text-muted-foreground">Official country code standard.</p>
            </a>
            <a href="https://www.itu.int/en/ITU-T/inr/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">ITU</h3>
              <p className="text-xs text-muted-foreground">International dialing codes authority.</p>
            </a>
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">IANA Time Zones</h3>
              <p className="text-xs text-muted-foreground">Timezone database used globally.</p>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Country Codes'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Data is for informational purposes only. Verify critical details with the official sources listed above.
        </div>
      </div>
    </>
  )
}