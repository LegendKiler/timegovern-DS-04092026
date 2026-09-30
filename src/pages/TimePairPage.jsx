import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {Globe, Sparkles, ArrowRight, Clock, MapPin, BookOpen, Users} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import TimeZonePairComparison from '../components/TimeZonePairComparison'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { getPair, CITIES } from '../data/timePairs'

export default function TimePairPage() {
  const { pair } = useParams()
  const data = getPair(pair)

  useEffect(() => {
    if (!data) return
    const title = `${data.a.name} to ${data.b.name} Time Converter`
    document.title = `${title} - Current Time Difference | TimeGovern`
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = `What time is it in ${data.a.name} and ${data.b.name} right now? Live clocks, current time difference, and the best meeting overlap window.`
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [data])

  if (!data) {
    return <Navigate to="/time-zone-converter" replace />
  }

  const { a, b, slugA, slugB } = data

  const FAQ = [
    { q: `What is the time difference between ${a.name} and ${b.name}?`, a: `The time difference between ${a.name} (${a.timezone}) and ${b.name} (${b.timezone}) changes twice a year because of daylight saving time. Use the live clocks above for the exact current difference.` },
    { q: `What time is it in ${b.name} right now?`, a: `The live clock above shows the current time in ${b.name}, updated every second. It uses the ${b.timezone} time zone which handles daylight saving automatically.` },
    { q: `What is the best time for a meeting between ${a.name} and ${b.name}?`, a: `The best overlap window is shown above - it finds a time when it is a reasonable working hour in both cities. If no perfect overlap exists, the tool shows the closest possible window.` },
    { q: `Does ${b.name} observe daylight saving time?`, a: `${b.name} (${b.timezone}) may or may not observe DST depending on the region. Our live clocks always use the correct current offset.` },
    { q: 'How do I convert other times?', a: `Use the time difference above to calculate manually, or open our full Time Zone Converter to convert any time between any two cities.` },
    { q: 'Is this data up to date?', a: 'Yes. The clocks use your browser\'s Intl API with the IANA time zone database - the same source used by operating systems worldwide.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const WEBPAGE_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebPage', name: `${a.name} to ${b.name} Time Converter`, description: `Live clocks and time difference between ${a.name} and ${b.name}.`, url: `https://timegovern.com/time/${slugA}-to-${slugB}` }

  // Related pairs
  const relatedPairs = [
    { to: `/time/${slugA}-to-tokyo`, from: a.name, toCity: 'Tokyo' },
    { to: `/time/${slugA}-to-london`, from: a.name, toCity: 'London' },
    { to: `/time/${slugA}-to-new-york`, from: a.name, toCity: 'New York' },
    { to: `/time/${slugA}-to-dubai`, from: a.name, toCity: 'Dubai' },
  ].filter(p => !p.to.includes(slugB)).slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Live - Free - No signup</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight flex items-center gap-3">
              <Globe className="h-9 w-9 md:h-12 md:w-12 text-sky-300 shrink-0" />
              {a.name} to {b.name}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Live clocks, current time difference, and the best meeting window for a call between {a.name} and {b.name}.
            </p>
          </div>
        </div>

        <TimeZonePairComparison cityA={a.name} cityB={b.name} tzA={a.timezone} tzB={b.timezone} />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use this converter</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Clock className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Live clocks</h3><p className="text-xs text-muted-foreground">Both clocks update every second with the correct offset for today.</p></CardContent></Card>
            <Card><CardContent className="p-5"><MapPin className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Time difference</h3><p className="text-xs text-muted-foreground">See whether {b.name} is ahead or behind {a.name}, by how many hours.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Users className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Best meeting window</h3><p className="text-xs text-muted-foreground">A 1-hour overlap that works for both cities in a standard working day.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related conversions</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {relatedPairs.map((p) => (
              <Link key={p.to} to={p.to} className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
                <ArrowRight className="h-4 w-4 text-primary mb-2" />
                <h3 className="font-bold mb-1 text-sm">{p.from} to {p.toCity}</h3>
                <p className="text-xs text-muted-foreground">Live time difference</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">All time tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/time-tools" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">All Time Tools</h3>
              <p className="text-xs text-muted-foreground">Hub - every time calculator.</p>
            </Link>
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Any pair of cities.</p>
            </Link>
            <Link to="/blog/how-to-schedule-meetings-across-time-zones" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Meeting Scheduling Guide</h3>
              <p className="text-xs text-muted-foreground">For global teams.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={`${a.name} to ${b.name} Time Converter`} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Time zone rules change occasionally. Always verify current rules for critical scheduling.
        </div>
      </div>
    </>
  )
}