import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Sparkles, Download, ExternalLink, Globe, FileJson, FileSpreadsheet, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Is this country data API free?', a: 'Yes. The API is completely free for any use, including commercial. No API key, no rate limit, no signup.' },
  { q: 'What license is the data under?', a: 'The data is provided under CC BY 4.0. You can use it anywhere for free, but we ask for attribution with a link back to https://timegovern.com/country-codes.' },
  { q: 'How often is the data updated?', a: 'We refresh the data when major changes occur (new countries, currency changes, updated populations or GDP). The meta.generated field in the JSON shows the last update.' },
  { q: 'Can I use this API in a mobile app?', a: 'Yes. The JSON endpoint is a plain HTTPS request with no authentication, so it works from any language or platform, including iOS, Android, and desktop apps.' },
  { q: 'Is there a rate limit?', a: 'No rate limit on our end. Just use reasonable caching in your application so you are not re-fetching on every request.' },
  { q: 'How many countries does the API cover?', a: 'Over 100 countries with ISO codes, dialing codes, capitals, currencies, area, population, GDP, timezones, and emergency numbers.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

const EXAMPLE_JSON = `{
  "meta": {
    "source": "TimeGovern",
    "url": "https://timegovern.com/country-codes",
    "license": "CC BY 4.0",
    "generated": "2026-09-27T19:30:00.000Z",
    "count": 118
  },
  "regions": ["North America", "Europe", ...],
  "countries": [
    {
      "c2": "US",
      "c3": "USA",
      "name": "United States",
      "dial": "+1",
      "capital": "Washington, D.C.",
      "currency": "USD",
      "symbol": "$",
      "area": 9833520,
      "pop": 335000000,
      "gdp": 28781,
      "tz": ["America/New_York", "..."],
      "emergency": "911",
      "region": "North America"
    }
  ]
}`

export default function ApiDocsPage() {
  useEffect(() => {
    document.title = 'Free Country Data API - JSON and CSV | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free country data API - ISO codes, dialing codes, capitals, currencies, populations, GDP, timezones, and emergency numbers. JSON and CSV. No API key, no rate limit.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Free - No API key - No rate limit</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Code2 className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              Country Data API
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              JSON and CSV endpoints for country codes, capitals, currencies, populations, GDP, timezones, and emergency numbers.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Endpoints</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border shadow-xl">
              <CardContent className="p-6">
                <FileJson className="h-6 w-6 text-cyan-500 mb-3" />
                <h3 className="font-black mb-1">JSON</h3>
                <p className="text-sm text-muted-foreground mb-4">Full country data as JSON with metadata.</p>
                <a href="/api/countries.json" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-500 hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  /api/countries.json
                </a>
              </CardContent>
            </Card>
            <Card className="border-border shadow-xl">
              <CardContent className="p-6">
                <FileSpreadsheet className="h-6 w-6 text-emerald-500 mb-3" />
                <h3 className="font-black mb-1">CSV</h3>
                <p className="text-sm text-muted-foreground mb-4">Same data, spreadsheet-ready format.</p>
                <a href="/api/countries.csv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:underline">
                  <Download className="h-4 w-4" />
                  /api/countries.csv
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Example response</h2>
          <Card className="border-border shadow-xl">
            <CardContent className="p-0">
              <pre className="text-xs leading-relaxed overflow-x-auto p-6 bg-muted/30 font-mono">{EXAMPLE_JSON}</pre>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Fields</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-black">Field</th>
                  <th className="text-left py-3 px-3 font-black">Type</th>
                  <th className="text-left py-3 px-3 font-black">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">c2</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">ISO 3166-1 alpha-2 code (US, GB, DE)</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">c3</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">ISO 3166-1 alpha-3 code (USA, GBR, DEU)</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">name</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">Common English name</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">dial</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">International dialing code (+1, +44)</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">capital</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">Capital city</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">currency</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">ISO 4217 currency code</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">area</td><td className="py-2 px-3 text-muted-foreground">number</td><td className="py-2 px-3 text-muted-foreground">Area in square kilometres</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">pop</td><td className="py-2 px-3 text-muted-foreground">number</td><td className="py-2 px-3 text-muted-foreground">Population estimate</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">gdp</td><td className="py-2 px-3 text-muted-foreground">number</td><td className="py-2 px-3 text-muted-foreground">GDP in USD billions</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">tz</td><td className="py-2 px-3 text-muted-foreground">string[]</td><td className="py-2 px-3 text-muted-foreground">IANA timezone identifiers</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">emergency</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">Primary emergency number</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-3 font-mono font-bold">region</td><td className="py-2 px-3 text-muted-foreground">string</td><td className="py-2 px-3 text-muted-foreground">Continental region</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Quick start</h2>
          <Card className="border-border shadow-xl">
            <CardContent className="p-6">
              <div className="text-xs font-bold text-muted-foreground mb-2">JavaScript</div>
              <pre className="text-xs leading-relaxed overflow-x-auto p-4 bg-muted/30 rounded-lg font-mono mb-4">{`const res = await fetch('https://timegovern.com/api/countries.json')
const data = await res.json()
console.log(data.countries.length, 'countries loaded')`}</pre>

              <div className="text-xs font-bold text-muted-foreground mb-2">Python</div>
              <pre className="text-xs leading-relaxed overflow-x-auto p-4 bg-muted/30 rounded-lg font-mono mb-4">{`import requests
data = requests.get('https://timegovern.com/api/countries.json').json()
print(len(data['countries']), 'countries loaded')`}</pre>

              <div className="text-xs font-bold text-muted-foreground mb-2">cURL</div>
              <pre className="text-xs leading-relaxed overflow-x-auto p-4 bg-muted/30 rounded-lg font-mono">{`curl https://timegovern.com/api/countries.json`}</pre>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/country-codes" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">Country Codes Table</h3>
              <p className="text-xs text-muted-foreground">Browse the full data interactively.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in every timezone.</p>
            </Link>
            <Link to="/salary" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Salary Calculators</h3>
              <p className="text-xs text-muted-foreground">21 countries, official tax data.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Country Data API'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">License:</strong> Data provided under CC BY 4.0. Please link back to <span className="font-mono">https://timegovern.com/country-codes</span> when you use it publicly.
        </div>
      </div>
    </>
  )
}