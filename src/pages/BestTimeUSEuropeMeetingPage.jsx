import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, ArrowRight, BookOpen, Calculator, Users, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the best time for a global meeting?', a: 'The best time depends on which cities are involved. Use the Meeting Planner to find the UTC hour where most cities fall within 9am to 6pm working hours.' },
  { q: 'How do you handle teams that span too many time zones?', a: 'When no single hour works for everyone, rotate the inconvenient meeting time across regions. Nobody should have the same 6am call every week.' },
  { q: 'Should I schedule in UTC or local time?', a: 'Always send meeting invites with the meeting time in the recipient local time zone. Google Calendar and Outlook handle this automatically when the invite has the correct time zone.' },
  { q: 'What counts as working hours?', a: 'For most office workers, 9am to 6pm is the standard window. Some teams accept 8am or 7pm for occasional calls. Outside those hours is usually considered inconvenient.' },
  { q: 'How many time zones can a team span before it becomes a problem?', a: 'Beyond 3 to 4 time zones, real-time collaboration becomes difficult. Teams spanning more time zones need asynchronous first workflows and rotating meeting schedules.' },
  { q: 'What about daylight saving time?', a: 'Daylight saving shifts meeting times twice a year. The Meeting Planner handles these shifts automatically, but always verify before high-stakes calls.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Time for a US-Europe Meeting', description: 'Complete guide to scheduling global meetings across time zones.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/best-time-us-europe-meeting' }

export default function BestTimeUSEuropeMeetingPage() {
  useEffect(() => {
    document.title = 'Best Time for a US-Europe Meeting | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Best Time for a US-Europe Meeting - practical guide with the Meeting Planner tool.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Best Time for a US-Europe Meeting
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full mb-4">
            <Users className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Global teams - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Best Time for a US-Europe Meeting
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The complete playbook with practical tools and worked examples.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The core problem</h2>
          <p className="text-muted-foreground">When a team spans more than two time zones, no single hour is convenient for everyone. Someone wakes early, someone stays late. The goal is to find a window that minimises total inconvenience and is sustainable over the long term.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The three tiers</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Tier 1 - Work hours (9am to 6pm local):</strong> ideal for everyone. Aim for this whenever possible.</li>
            <li><strong>Tier 2 - Shoulder hours (7-9am and 6-9pm):</strong> acceptable for occasional calls. Not sustainable weekly.</li>
            <li><strong>Tier 3 - Sleep hours (9pm to 7am):</strong> do not schedule recurring meetings here. Reserve for emergencies.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Use the Meeting Planner</h2>
          <p className="text-muted-foreground">The free <Link to="/meeting-planner" className="text-primary font-bold hover:underline">Meeting Planner</Link> shows the full 24-hour heatmap for any set of 2 to 12 cities. Pick your cities, read the colour-coded grid, and the best window is highlighted automatically.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Real-world reference windows</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>US East Coast + Europe:</strong> 14:00 UTC works well (morning US, evening Europe).</li>
            <li><strong>US West Coast + Europe:</strong> 15:00 to 16:00 UTC (early morning US, evening Europe).</li>
            <li><strong>Europe + India:</strong> 09:00 to 10:00 UTC (morning Europe, afternoon India).</li>
            <li><strong>Europe + Singapore or Tokyo:</strong> 07:00 to 08:00 UTC (early morning Europe, late afternoon Asia).</li>
            <li><strong>US + Asia:</strong> very difficult. Rotate the burden across weeks.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Practical tips</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Rotate recurring meetings across time zones so no region always takes the inconvenient slot.</li>
            <li>Record meetings for the region that cannot attend live.</li>
            <li>Send invites with the meeting time in the recipient time zone, not your own.</li>
            <li>Accept that asynchronous first beats synchronous always at scale.</li>
            <li>Use the Meeting Planner before every recurring call cycle to verify DST has not shifted things.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try the tool</h2>
          <p className="text-muted-foreground">The <Link to="/meeting-planner" className="text-primary font-bold hover:underline">Meeting Planner</Link> runs entirely in your browser and shows the best window for your selected cities in less than a second.</p>
        </div>

        <div className="my-8">
          <Link to="/meeting-planner" className="block rounded-2xl border-2 border-sky-500/30 bg-sky-500/5 hover:border-sky-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-md"><CalendarClock className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-sky-500 transition-colors">Open the Meeting Planner</h3>
                <p className="text-sm text-muted-foreground">Free, up to 12 cities, no signup.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-sky-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/meeting-planner-guide" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Continue reading</h3>
              <p className="text-xs text-muted-foreground">Next in the series.</p>
            </Link>
            <Link to="/blog/best-time-europe-asia-meeting" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Clock className="h-5 w-5 text-primary mb-2" />
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='Best Time for a US-Europe Meeting' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}