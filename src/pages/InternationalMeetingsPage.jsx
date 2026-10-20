import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ChevronRight, Clock, Globe, Plane, Sparkles, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the best time for an international meeting?', a: 'There is no perfect time for a 4+ time zone team. The professional standard is rotating the meeting time quarterly so the burden of early mornings or late nights is shared equally among the team. For 2-3 time zones, aim for the overlap of standard business hours (9 AM to 5 PM).' },
  { q: 'How do I schedule a meeting across 3 time zones?', a: 'Use a visual time zone converter (like the one on TimeGovern) rather than doing math in your head. Find the "green zone" where all three cities fall between 8 AM and 6 PM. If no overlap exists, make the meeting asynchronous.' },
  { q: 'What is the golden hour in time zones?', a: 'The "golden hour" is the brief window when the working hours of two distant locations overlap. For example, New York and London usually overlap between 2 PM and 5 PM GMT. Sydney and San Francisco have almost zero overlap.' },
  { q: 'How do I handle Daylight Saving Time (DST)?', a: 'DST shifts can break meeting schedules twice a year. The US and Europe change clocks on different dates, creating a 2-3 week window where the time difference is one hour off. A good time zone tool automatically adjusts for DST.' },
  { q: 'Should I record every international meeting?', a: 'Yes. If a meeting happens outside someone\'s standard working hours, a recording and a written summary are mandatory. This respects their time and ensures no information is lost.' },
  { q: 'What tools are best for scheduling?', a: 'Use TimeGovern\'s Time Zone Converter to find the overlap, and your calendar app (Google Calendar, Outlook) to send the invite. Most calendars automatically translate the time for the recipient.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Convert Time Zones for International Meetings (2026 Guide)', description: 'A practical guide for remote teams to find the perfect meeting time across time zones and avoid scheduling nightmares.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: '2026-10-20', dateModified: '2026-10-20' }

const STEPS = [
  { n: 1, title: 'Identify your extremes', body: 'Find the team member furthest west and the one furthest east. Calculate the total time difference between them. If it is more than 9 hours, a single synchronous meeting is highly inefficient.' },
  { n: 2, title: 'Find the overlap window', body: 'Open a time zone converter and look for the block of time where everyone falls between 8 AM and 6 PM local time. This is your "green zone."' },
  { n: 3, title: 'Rotate the pain', body: 'If the green zone is tiny or non-existent, rotate the meeting time. One week it favors Europe, the next it favors the Americas, the next APAC. Nobody should suffer a 4 AM call three weeks in a row.' },
  { n: 4, title: 'Record everything', body: 'For anyone joining outside their normal hours, make the video recording and written action items accessible within 2 hours of the meeting ending.' },
  { n: 5, title: 'Use asynchronous default', body: 'Every meeting should be asked: "Could this have been a Loom video or a Slack thread?" Protect the synchronous time for real-time collaboration.' },
]

const CITIES = [
  { city: 'London', utc: 'UTC+0 / UTC+1', cc: 'gb' },
  { city: 'New York', utc: 'UTC-5 / UTC-4', cc: 'us' },
  { city: 'Sydney', utc: 'UTC+10 / UTC+11', cc: 'au' },
  { city: 'Tokyo', utc: 'UTC+9', cc: 'jp' },
  { city: 'Dubai', utc: 'UTC+4', cc: 'ae' },
  { city: 'San Francisco', utc: 'UTC-8 / UTC-7', cc: 'us' },
]
export default function InternationalMeetingsPage() {
  useEffect(() => {
    document.title = 'How to Convert Time Zones for International Meetings (2026) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A practical guide for remote teams to find the perfect meeting time across time zones. Stop doing math in your head and avoid scheduling nightmares.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-10">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-blue-950 to-indigo-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Globe className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Remote Work · Scheduling</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              How to Convert Time Zones for International Meetings
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              A practical guide for remote teams to find the perfect meeting time, rotate the pain fairly, and stop doing time zone math in your head.
            </p>
            <ShareButtons url="https://timegovern.com/blog/how-to-convert-time-zones-international-meetings" title="How to Convert Time Zones for International Meetings" />
          </div>
        </div>

        {/* INTRO */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            Scheduling a meeting across two time zones is easy. Scheduling one across four time zones is a logistical nightmare. The math gets complicated, Daylight Saving Time (DST) throws everything off twice a year, and someone always ends up on a 6:00 AM call.
          </p>
          <p>
            This guide will show you how to use a <Link to="/time-zone-converter" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">Time Zone Converter</Link> effectively, how to find the "golden window" for your team, and the exact process professional global teams use to keep everyone sane.
          </p>
        </div>

        {/* 5 STEPS */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Clock className="h-7 w-7 text-cyan-500" />
            The 5-Step Playbook
          </h2>
          <div className="space-y-3">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 text-white text-sm font-bold flex items-center justify-center">{s.n}</span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white mb-1">{s.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE MATH */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Globe className="h-7 w-7 text-emerald-500" />
            A Worked Example (The Painful Way)
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Imagine you need to schedule a meeting with team members in London, New York, Sydney, and Tokyo. You want to find a time that works for everyone.
          </p>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
              <div className="font-bold text-slate-900 dark:text-white mb-2">The Reality Check</div>
              <ul className="text-sm space-y-1">
                <li>• London (9 AM) = New York (4 AM) = Tokyo (6 PM) = Sydney (8 PM)</li>
                <li>• London (5 PM) = New York (12 PM) = Tokyo (2 AM) = Sydney (4 AM)</li>
              </ul>
              <p className="text-sm mt-2 font-semibold text-rose-700 dark:text-rose-400">
                There is ZERO overlap between standard 9-to-5 working hours for this group.
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you look at the <Link to="/time-zone-converter" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">overlap on the converter</Link>, you will see that the only window is roughly <strong>London 2:00 PM – 5:00 PM</strong>, which is <strong>New York 9:00 AM – 12:00 PM</strong>, but that forces Tokyo and Sydney to attend at 11:00 PM and midnight.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              In this scenario, a single meeting is impossible. You must split the meeting into two regional syncs, or assign someone to watch the recording and send async updates. This is why knowing how to use the <Link to="/world-clock" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">World Clock</Link> is vital.
            </p>
          </div>
        </section>
        {/* QUICK REFERENCE */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Plane className="h-7 w-7 text-amber-500" />
            Quick Reference: Common Meeting Hubs
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Standard UTC offsets for the most common business hubs. Remember that DST will shift these by one hour during the summer months.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CITIES.map((c) => (
              <Card key={c.city} className="border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="font-bold text-slate-900 dark:text-white">{c.city}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">{c.utc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 p-8 text-white text-center space-y-4">
          <Sparkles className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black">Find your overlap instantly</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Stop doing math in your head. Use our visual time zone converter to find the perfect slot for your team.
          </p>
          <Link to="/time-zone-converter" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition">
            Open Time Zone Converter <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="group border border-slate-200 dark:border-slate-800 rounded-xl">
                <summary className="cursor-pointer p-4 font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                  {f.q}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="px-4 pb-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Related guides</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link to="/blog/sync-team-time-off-time-zones" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">How to Sync Your Team&apos;s Time Off Across Time Zones</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">A playbook for distributed teams coordinating national holidays.</div>
            </Link>
            <Link to="/blog/best-time-to-take-leave-2026" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Best Time to Take Leave in 2026</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Turn 20 days into 50+ with country-specific timing.</div>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}