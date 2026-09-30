import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Globe, Sparkles, ArrowRight, Flag, BookOpen, Clock, Phone, DollarSign, Users, MapPin, Building2, AlertCircle, ExternalLink, Copy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRIES_DATA, REGIONS } from '../data/countries'
import { NATIVE_NAMES } from '../data/countryNames'
import { COUNTRIES as SALARY_COUNTRIES } from '../data/salaryData'

const formatNumber = (n) => {
  if (!n && n !== 0) return '-'
  return new Intl.NumberFormat('en-US').format(n)
}

const formatTimeInTZ = (tz, date) => {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(date)
  } catch {
    return '--:--:--'
  }
}

const formatDateInTZ = (tz, date) => {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short' }).format(date)
  } catch {
    return ''
  }
}

const isNightInTZ = (tz, date) => {
  try {
    const h = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false }).format(date), 10)
    return h < 6 || h >= 20
  } catch {
    return false
  }
}

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function CountryPage() {
  const { c2 } = useParams()
  const [now, setNow] = useState(new Date())
  const [copied, setCopied] = useState(false)

  const country = COUNTRIES_DATA.find((c) => c.c2.toLowerCase() === String(c2).toLowerCase())

  useEffect(() => {
    if (!country) return
    document.title = country.name + ' Country Code, Dial Code, Capital & Facts | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = country.name + ' - ISO codes, dialing code (' + country.dial + '), capital (' + country.capital + '), currency (' + country.currency + '), population, timezones, emergency numbers, and how to call internationally.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [country])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!country) {
    return <Navigate to="/country-codes" replace />
  }

  const related = COUNTRIES_DATA.filter((c) => c.region === country.region && c.c2 !== country.c2).slice(0, 8)

  const embedCode = '<iframe src="https://timegovern.com/embed/country/' + country.c2.toLowerCase() + '.html" width="340" height="400" style="border:0;border-radius:16px;max-width:100%" title="' + country.name + ' country info"></iframe>'

  const FAQ = [
    { q: 'What is the country code for ' + country.name + '?', a: 'The ISO 3166-1 alpha-2 code for ' + country.name + ' is ' + country.c2 + '. The alpha-3 code is ' + country.c3 + '. The international dialing code is ' + country.dial + '.' },
    { q: 'How do I call ' + country.name + ' from abroad?', a: 'Dial your country exit code (00 in most countries, 011 in the US and Canada), then ' + country.dial.replace('+', '') + ', then the local number without any leading zero.' },
    { q: 'What is the capital of ' + country.name + '?', a: 'The capital of ' + country.name + ' is ' + country.capital + '.' },
    { q: 'What currency does ' + country.name + ' use?', a: country.name + ' uses the ' + country.currency + ' (' + country.symbol + ').' },
    { q: 'What is the emergency number in ' + country.name + '?', a: 'The emergency number in ' + country.name + ' is ' + country.emergency + '. This reaches police, ambulance, and fire services.' },
    { q: 'How many time zones does ' + country.name + ' have?', a: country.name + ' spans ' + country.tz.length + ' time zone' + (country.tz.length === 1 ? '' : 's') + ': ' + country.tz.join(', ') + '.' },
    ...(NATIVE_NAMES[country.c2] ? [{ q: 'What is ' + country.name + ' called in its local language?', a: 'In its local language, ' + country.name + ' is called ' + NATIVE_NAMES[country.c2].native + (NATIVE_NAMES[country.c2].romanized ? ' (pronounced ' + NATIVE_NAMES[country.c2].romanized + ')' : '') + '.' }] : []),
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const COUNTRY_SCHEMA = { '@context': 'https://schema.org', '@type': 'Country', name: country.name, alternateName: country.c3, identifier: country.c2, url: 'https://timegovern.com/country-codes/' + country.c2.toLowerCase() }
  const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Country Codes', item: 'https://timegovern.com/country-codes' }, { '@type': 'ListItem', position: 2, name: country.name, item: 'https://timegovern.com/country-codes/' + country.c2.toLowerCase() } ] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COUNTRY_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          <Link to="/country-codes" className="hover:text-primary">Country Codes</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">{country.name}</span>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">{country.region} - ISO {country.c2}</span>
            </div>
            <div className="flex items-center gap-5 mb-4">
              <span className="text-6xl md:text-7xl">{country.flag}</span>
              <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">{country.name}</h1>
                {NATIVE_NAMES[country.c2] && (
                  <p className="text-lg md:text-xl text-white/50 mt-1">{NATIVE_NAMES[country.c2].native} - {NATIVE_NAMES[country.c2].romanized}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Phone className="h-3 w-3" /> {country.dial}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Flag className="h-3 w-3" /> {country.c2} / {country.c3}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Building2 className="h-3 w-3" /> {country.capital}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <DollarSign className="h-3 w-3" /> {country.currency}
              </div>
            </div>
          </div>
        </div>

        {/* Key facts */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Key facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">ISO 2-letter</div>
              <div className="text-xl font-black font-mono">{country.c2}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">ISO 3-letter</div>
              <div className="text-xl font-black font-mono">{country.c3}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Dialing code</div>
              <div className="text-xl font-black font-mono">{country.dial}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Capital</div>
              <div className="text-base font-black">{country.capital}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Currency</div>
              <div className="text-base font-black">{country.currency} <span className="text-sm font-normal text-muted-foreground">{country.symbol}</span></div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Area</div>
              <div className="text-base font-black tabular-nums">{formatNumber(country.area)} <span className="text-xs font-normal text-muted-foreground">km2</span></div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Population</div>
              <div className="text-base font-black tabular-nums">{formatNumber(country.pop)}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">GDP</div>
              <div className="text-base font-black tabular-nums">${formatNumber(country.gdp)}B</div>
            </CardContent></Card>
          </div>
        </div>

        {/* Native name */}
        {NATIVE_NAMES[country.c2] && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Native name</h2>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-8 flex-wrap">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Native</div>
                    <div className="text-2xl md:text-3xl font-black">{NATIVE_NAMES[country.c2].native}</div>
                  </div>
                  {NATIVE_NAMES[country.c2].romanized && (
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Romanized</div>
                      <div className="text-2xl md:text-3xl font-black text-muted-foreground">{NATIVE_NAMES[country.c2].romanized}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">English</div>
                    <div className="text-2xl md:text-3xl font-black text-muted-foreground">{country.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {/* Live time */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Current local time</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {country.tz.map((tz) => (
              <Card key={tz} className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-cyan-500" />
                    <span className="text-xs font-bold font-mono text-muted-foreground">{tz}</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black tabular-nums mb-1">{formatTimeInTZ(tz, now)}</div>
                  <div className="text-xs text-muted-foreground">{formatDateInTZ(tz, now)}</div>
                  <div className={'mt-3 inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ' + (isNightInTZ(tz, now) ? 'bg-indigo-500/10 text-indigo-500' : 'bg-amber-500/10 text-amber-500')}>
                    {isNightInTZ(tz, now) ? 'Night' : 'Day'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to dial */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to dial {country.name}</h2>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                <span className="px-3 py-1.5 rounded-lg bg-muted font-mono font-bold">[your exit code]</span>
                <span className="text-muted-foreground">then</span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-mono font-bold text-emerald-600 dark:text-emerald-400">{country.dial}</span>
                <span className="text-muted-foreground">then</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted font-mono font-bold">[local number]</span>
              </div>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm text-muted-foreground">
                <li>Dial your country exit code. This is <strong>011</strong> in the US and Canada, or <strong>00</strong> in most other countries.</li>
                <li>Enter {country.name} dialing code <strong>{country.dial}</strong>.</li>
                <li>Enter the local number, dropping any leading zero.</li>
              </ol>
              <div className="mt-4 rounded-lg bg-rose-500/5 border border-rose-500/20 p-3 text-xs text-muted-foreground flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Emergency in {country.name}: <strong className="text-rose-600 dark:text-rose-400 font-mono">{country.emergency}</strong></span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related tools */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Explore {country.name} tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {country.salarySlug && SALARY_COUNTRIES[country.salarySlug] ? (
              <Link to={'/salary/' + country.salarySlug} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
                <DollarSign className="h-5 w-5 text-emerald-500 mb-2" />
                <h3 className="font-bold mb-1">Salary Calculator</h3>
                <p className="text-xs text-muted-foreground">Take-home pay with {country.name} tax brackets.</p>
              </Link>
            ) : (
              <Link to="/salary" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
                <DollarSign className="h-5 w-5 text-emerald-500 mb-2" />
                <h3 className="font-bold mb-1">Salary Calculators</h3>
                <p className="text-xs text-muted-foreground">21 countries supported.</p>
              </Link>
            )}
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in {country.name} cities.</p>
            </Link>
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Convert {country.name} time to any city.</p>
            </Link>
          </div>
        </div>

        {/* Related countries */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">More {country.region} countries</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map((c) => (
                <Link key={c.c2} to={'/country-codes/' + c.c2.toLowerCase()} className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-4 transition-colors group">
                  <div className="text-3xl mb-2">{c.flag}</div>
                  <div className="text-sm font-bold mb-0.5 group-hover:text-cyan-500 transition-colors">{c.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{c.c2} - {c.dial}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Official sources */}
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

        {/* Embed */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Embed this country card</h2>
          <Card className="border-border shadow-xl">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground mb-3">
                Free to embed on any website. The card shows live local time and links back to this page.
              </p>
              <pre className="text-xs p-3 bg-muted/30 rounded-lg overflow-x-auto font-mono whitespace-pre-wrap break-all mb-3 text-muted-foreground">{embedCode}</pre>
              <button
                type="button"
                onClick={() => { if (navigator.clipboard) { navigator.clipboard.writeText(embedCode).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) } }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy embed code'}
              </button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : country.name} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Data is for informational purposes only. Verify critical details with the official sources above.
        </div>
      </div>
    </>
  )
}