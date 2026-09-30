import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, BookOpen, Globe, Users, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Why use a world clock instead of checking manually?', a: 'A world clock keeps multiple cities visible at once, updating every second. It removes the mental arithmetic of converting between time zones and reduces scheduling mistakes.' },
  { q: 'How many cities should I track?', a: 'Track the cities you actually work with. Most remote workers need 4 to 8: home city, main team cities, and one or two regular clients. More than 12 becomes visual noise.' },
  { q: 'What is the difference between UTC and GMT?', a: 'UTC (Coordinated Universal Time) is the modern standard. GMT (Greenwich Mean Time) is a time zone observed in the UK during winter. In practice they show the same time, but UTC is precise and never shifts for daylight saving.' },
  { q: 'Do world clocks handle daylight saving?', a: 'Good ones do. Our World Clock uses the IANA time zone database, which is updated whenever any country changes its daylight saving rules.' },
  { q: 'Why do some cities have 30 or 45 minute offsets?', a: 'A few regions use non-hour offsets. India is UTC+05:30, Nepal is UTC+05:45, and parts of Australia are UTC+09:30. These are historical and political, not mistakes.' },
  { q: 'Can I save my city list?', a: 'Yes. Our World Clock saves your pinned cities to your browser local storage. They persist across sessions on the same device without an account.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Cities to Track for Remote Work', description: 'Complete guide with tools and practical tips.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/best-cities-remote-work' }

export default function BestCitiesRemoteWorkPage() {
  useEffect(() => {
    document.title = 'Best Cities to Track for Remote Work | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Best Cities to Track for Remote Work - full guide with practical tools.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Best Cities to Track for Remote Work
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Globe className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Time zones - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Best Cities to Track for Remote Work
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            A practical guide for anyone working across time zones.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The case for a world clock</h2>
          <p className="text-muted-foreground">If you work with people in other cities, the mental load of tracking time zones is real. A quick glance at a well-configured world clock saves minutes every day and prevents scheduling mistakes.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to configure yours</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Add your home city first - it is your anchor.</li>
            <li>Add every city where you have a regular team member.</li>
            <li>Add client cities if you work with them regularly.</li>
            <li>Keep the list under 12 - beyond that it becomes visual noise.</li>
            <li>Review the list every few months and remove cities you no longer need.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Use the World Clock</h2>
          <p className="text-muted-foreground">The free <Link to="/world-clock" className="text-primary font-bold hover:underline">World Clock</Link> lets you pin up to 12 cities with live time, day/night icons, and UTC offsets. Your selections save automatically in the browser.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Day and night visualization</h2>
          <p className="text-muted-foreground">The sun and moon icons make it obvious who is likely available. If a city shows a moon, it is late evening or early morning there - not a good time for a call unless it is a scheduled exception.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">UTC offsets explained</h2>
          <p className="text-muted-foreground">Every time zone is defined by its offset from UTC. Most offsets are whole hours. A few are half-hour (India, UTC+05:30) or quarter-hour (Nepal, UTC+05:45). When offsets look strange, it is usually a historical or political reason, not a bug.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Pair with the Meeting Planner</h2>
          <p className="text-muted-foreground">The World Clock tells you what time it is right now. The <Link to="/meeting-planner" className="text-primary font-bold hover:underline">Meeting Planner</Link> tells you what time to schedule a meeting. Together they cover both use cases.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Try the tool</h2>
          <p className="text-muted-foreground">Open the <Link to="/world-clock" className="text-primary font-bold hover:underline">World Clock</Link> and pin your cities. It runs entirely in your browser and updates every second.</p>
        </div>

        <div className="my-8">
          <Link to="/world-clock" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Clock className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Open the World Clock</h3>
                <p className="text-sm text-muted-foreground">Pin up to 12 cities. Free, no signup.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/world-clock-guide" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Continue reading</h3>
              <p className="text-xs text-muted-foreground">Next in the series.</p>
            </Link>
            <Link to="/blog/day-night-around-world" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Sun className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Deep dive</h3>
              <p className="text-xs text-muted-foreground">Full breakdown.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='Best Cities to Track for Remote Work' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}