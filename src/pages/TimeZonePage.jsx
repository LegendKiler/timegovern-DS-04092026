import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Globe, Sparkles, BookOpen, Clock, Plane, Briefcase, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import TimeZoneConverter from '../components/TimeZoneConverter'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do I convert time between time zones?', a: 'Enter or select your source time zone, then add the destinations you care about. The converter shows the equivalent local time in each zone, plus how many hours ahead or behind they are.' },
  { q: 'Does daylight saving time affect the conversion?', a: 'Yes - the converter uses the IANA time zone database, so daylight saving transitions are handled automatically. You do not need to adjust manually for DST.' },
  { q: 'What is the best time for a meeting across time zones?', a: 'Pick the zone where most attendees are and check the columns for each other zone. Aim for 9 AM to 6 PM in as many zones as possible. Our converter shows working hours in each column so you can spot the overlap instantly.' },
  { q: 'How many time zones are there?', a: 'There are 24 standard time zones based on longitude, but the IANA database recognises about 600 zone identifiers because of historical offsets, DST rules, and regional variations.' },
  { q: 'Is the time zone converter free?', a: 'Yes, completely free. It runs entirely in your browser - no signup, no tracking, and your zone list is stored only on your device.' },
  { q: 'Can I save my time zone list?', a: 'Yes. Sign in and click Save to store your favourite zones. Free accounts can save up to 5 configurations; Pro accounts have unlimited saves.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Time Zone Converter', description: 'Free time zone converter. Compare times across cities worldwide, plan meetings, and schedule across time zones.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/time-zone-converter', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['24+ major world cities', 'Real-time updates', 'Daylight saving handled automatically', 'No signup, 100% private'] }

export default function TimeZonePage() {
  useEffect(() => {
    document.title = 'Time Zone Converter - Compare Times Worldwide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free time zone converter. Compare times across cities worldwide, plan meetings across time zones, and schedule calls. No signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Globe className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Time Zone Converter
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Compare times across any cities worldwide. Plan meetings, schedule calls, and never miss a timezone again.
            </p>
          </div>
        </div>

        <TimeZoneConverter />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Time Zone Converter" inputs={{ zones: ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'] }} results={{ converted: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Why time zone conversion matters</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Plane className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Travel planning</h3><p className="text-xs text-muted-foreground">Know exactly when you land, what time to book hotels, and when to call home.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Briefcase className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Global meetings</h3><p className="text-xs text-muted-foreground">Find the overlap window that works for London, New York, and Sydney.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Clock className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Remote work</h3><p className="text-xs text-muted-foreground">Schedule stand-ups and deadlines without waking anyone at 3 AM.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/time-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/sleep-debt-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Sleep Debt Calculator</h3>
              <p className="text-xs text-muted-foreground">Find out how much sleep you owe - and how to recover.</p>
            </Link>
            <Link to="/caffeine-calculator" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine &amp; Sleep Calculator</h3>
              <p className="text-xs text-muted-foreground">See how much caffeine is left in your system at bedtime.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Learn about time zones</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/why-different-countries-have-different-times" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Why Different Times?</h3><p className="text-xs text-muted-foreground">The history and science of time zones.</p></Link>
            <Link to="/blog/how-to-schedule-meetings-across-time-zones" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Scheduling Meetings</h3><p className="text-xs text-muted-foreground">Practical guide for global teams.</p></Link>
          </div>
        </div>

                <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Time Zone Converter'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Times are calculated using the IANA time zone database and update every 15 seconds. Your zone list is stored only on this device.
        </div>
      </div>
    </>
  )
}