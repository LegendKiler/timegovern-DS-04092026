import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Sparkles, BookOpen, Globe, ArrowRight, Clock, CheckCircle2, Moon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import TeamAlignment from '../components/TeamAlignment'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What does Team Alignment do?', a: 'It shows you, for any chosen meeting time, what each of your team cities is experiencing locally. Every city is classified as Available (working hours), Shoulder (early morning or evening), or Sleeping (deep night).' },
  { q: 'How do I choose the meeting time?', a: 'Use the UTC hour slider to pick any hour of the day, or tap one of the quick preset buttons (00, 04, 08, 12, 16, 20 UTC). The tool updates all cities instantly.' },
  { q: 'Why UTC and not my local time?', a: 'UTC is the universal reference. Every city is compared against the same UTC moment, which removes any ambiguity about whose local time is being used.' },
  { q: 'How many cities can I add?', a: 'Between 2 and 12 cities. For more cities, use the Meeting Planner which handles a larger heatmap. For simpler two-city comparisons, use the Time Zone Converter.' },
  { q: 'What counts as Available vs Shoulder?', a: 'Available is 9am to 6pm local (standard working hours). Shoulder is 7-9am or 6-9pm local (early morning or evening, tolerable for occasional calls). Everything else is Sleeping.' },
  { q: 'Does it handle daylight saving time?', a: 'Yes. All classifications are computed live in the browser using the IANA time zone database, so DST is always accounted for.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Team Alignment Tool', description: 'See each city on your global team in their local time for any meeting hour. Free, up to 12 cities, no signup.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/team-alignment', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function TeamAlignmentPage() {
  useEffect(() => {
    document.title = 'Team Alignment - Global Team Time Zone Status | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'See each city on your global team in their local time for any meeting hour. Available, Shoulder, or Sleeping status. Free, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-purple-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Free - Up to 12 cities - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Users className="h-10 w-10 md:h-14 md:w-14 text-purple-300" />
              Team Alignment
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              See each city on your team in their local time. Available, Shoulder, or Sleeping at a glance.
            </p>
          </div>
        </div>

        <TeamAlignment />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this tool shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><CheckCircle2 className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Availability groups</h3><p className="text-xs text-muted-foreground">Cities split into Available, Shoulder, and Sleeping groups.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Any meeting hour</h3><p className="text-xs text-muted-foreground">Slide to any UTC hour and see the local time in every city.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Moon className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Ideal vs Problematic</h3><p className="text-xs text-muted-foreground">Overall verdict shows whether the slot works for everyone.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick your team cities from the grid (2 to 12 cities).</li>
            <li>Slide the UTC hour to the meeting time you are considering.</li>
            <li>Read the top card: how many cities are Available, and the overall verdict.</li>
            <li>Scan the three groups to see who is Available, on Shoulder, or Sleeping.</li>
            <li>Use the full breakdown table below for exact local times and days.</li>
          </ol>
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
            <Link to="/meeting-planner" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Meeting Planner</h3>
              <p className="text-xs text-muted-foreground">24-hour heatmap with scoring.</p>
            </Link>
            <Link to="/meeting-hour-strip" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Users className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Meeting Hour Strip</h3>
              <p className="text-xs text-muted-foreground">Simpler 2-6 city view.</p>
            </Link>
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Any two cities, any time.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Team Alignment'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Working hours assumed 9am-6pm local. For informational purposes only.
        </div>
      </div>
    </>
  )
}