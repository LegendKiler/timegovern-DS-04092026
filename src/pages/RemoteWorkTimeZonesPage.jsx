import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ChevronRight, Clock, Globe, Laptop, Sparkles, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the ideal time zone overlap for remote teams?', a: 'Aim for at least 3 to 4 hours of overlapping work hours per day. This allows for real-time collaboration and quick decision-making without forcing anyone to wake up at 3 AM.' },
  { q: 'How do you handle time zones in a fully remote company?', a: 'Make asynchronous communication the default. Document everything, record videos, and use tools like Slack or Notion. Reserve synchronous meetings only for brainstorming or sensitive feedback.' },
  { q: 'How do you prevent burnout in global teams?', a: 'Never let the same person take the "bad" time slot every week. Rotate meeting times so the burden is shared. If a meeting is at 7 AM for Europe, make it at 9 PM for Asia the next time.' },
  { q: 'What is an asynchronous standup?', a: 'Instead of a 15-minute morning meeting, team members post their updates in a shared channel (e.g., "What I did yesterday, what I will do today, blockers"). This respects time zones completely.' },
  { q: 'How do I schedule across Daylight Saving Time (DST)?', a: 'The US and Europe change their clocks on different dates. Your meeting could be off by an hour for 2-3 weeks a year. Use a tool like TimeGovern that automatically adjusts for DST.' },
  { q: 'Are there tools to help with time zone management?', a: 'Yes. Use TimeGovern\'s World Clock to see everyone\'s local time at a glance, and the Time Zone Converter to find the perfect overlap window for your team.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Remote Work Time Zones: How to Manage a Global Team in 2026', description: 'A complete guide to managing remote teams across time zones. Learn to schedule meetings, prevent burnout, and build an async-first culture.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: '2026-10-21', dateModified: '2026-10-21' }

const RULES = [
  { n: 1, title: 'The 4-Hour Overlap Rule', body: 'Every team needs a "core hours" window of at least 4 hours where everyone is online. Outside of this window, work should be asynchronous.' },
  { n: 2, title: 'Rotate the Pain', body: 'If a meeting is at 6 AM for Australia and 5 PM for California, next week make it at 7 AM for California and 4 PM for Australia. Share the burden equally.' },
  { n: 3, title: 'Async by Default', body: 'Before booking a meeting, ask: "Can this be a Loom video?" Record your screen, explain your thoughts, and let the team reply on their own schedule.' },
  { n: 4, title: 'Respect Public Holidays', body: 'A public holiday in Germany means your German team is offline. Track it using a shared holiday calendar so you don\'t expect a reply on Whit Monday.' },
  { n: 5, title: 'Document Everything', body: 'If a decision was made in a 3 AM meeting for the Asia team, write it down. The company wiki is your single source of truth, not someone\'s memory.' },
]

export default function RemoteWorkTimeZonesPage() {
  useEffect(() => {
    document.title = 'Remote Work Time Zones: How to Manage a Global Team | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A complete guide to managing remote teams across time zones. Learn to schedule meetings, prevent burnout, and build an async-first culture.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-10">

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Laptop className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Remote Work · Time Zones</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Remote Work Time Zones: Managing a Global Team
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              A practical playbook for distributed teams to schedule meetings, prevent burnout, and build an async-first culture across multiple time zones.
            </p>
            <ShareButtons url="https://timegovern.com/blog/remote-work-time-zones" title="Remote Work Time Zones: How to Manage a Global Team in 2026" />
          </div>
        </div>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            Working across time zones is one of the greatest challenges of the modern remote company. When done poorly, it leads to burnout, lost productivity, and a feeling of isolation among team members.
          </p>
          <p>
            But when done right, time zones become your superpower. You get 24-hour productivity, and your team never has to work late nights. Here is our playbook for managing a global team effectively, using tools like the <Link to="/world-clock" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">World Clock</Link>.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Clock className="h-7 w-7 text-emerald-500" />
            The 5 Rules of Global Remote Work
          </h2>
          <div className="space-y-3">
            {RULES.map((s) => (
              <div key={s.n} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">{s.n}</span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white mb-1">{s.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Globe className="h-7 w-7 text-cyan-500" />
            Holiday Harmony
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Did you know that Germany has 9 public holidays, but the UK only has 8? And if you have a team member in India, they might have 17! If you don't track these, you will schedule meetings on days when half your team is legally off.
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Use the <Link to="/holidays" className="text-emerald-600 dark:text-emerald-400 hover:underline">TimeGovern Public Holidays Hub</Link> to sync your team's time off:
            </p>
            <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
              <li>1. Export the .ics file for each team member's country.</li>
              <li>2. Subscribe to it in your team's shared calendar.</li>
              <li>3. Set a rule: "No meetings on these dates."</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-white text-center space-y-4">
          <Sparkles className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black">Find your team's overlap</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Stop doing time zone math in your head. Use our visual converter to find the perfect meeting slot.
          </p>
          <Link to="/time-zone-converter" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition">
            Open Time Zone Converter <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

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

        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Related guides</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link to="/blog/how-to-convert-time-zones-international-meetings" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">How to Convert Time Zones for International Meetings</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">The step-by-step playbook for scheduling.</div>
            </Link>
            <Link to="/blog/sync-team-time-off-time-zones" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">How to Sync Your Team's Time Off</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">A practical playbook for distributed teams.</div>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}