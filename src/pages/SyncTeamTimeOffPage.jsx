import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ChevronRight, Clock, Globe, MapPin, Sparkles, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do you manage time off across a distributed team?', a: 'Three steps: (1) keep one shared calendar of every team member\'s public holidays, (2) set a "no meeting" rule on each person\'s national holidays, (3) plan around the intersection of long weekends, not the union. TimeGovern shows every team member\'s holidays at /holidays/{country}/{year}.' },
  { q: 'What is the best tool for tracking team holidays?', a: 'Any shared calendar works if it covers every team member\'s country. Most teams use Google Calendar or Outlook plus a reference like TimeGovern to seed the holiday dates at the start of each year. Export each country as .ics and subscribe once.' },
  { q: 'How many time zones can a team span before it becomes unmanageable?', a: 'Practically, three time zones is the sweet spot for daily synchronous work. Four to six zones forces async-first culture (shared docs, decisions logged). Seven-plus time zones only works with a follow-the-sun model where no one is expected to attend every meeting.' },
  { q: 'Should holidays be treated as "out of office" or "available"?', a: 'Treat them as out of office. Public holidays are legally protected in most countries - expecting someone to work on their national day is a cultural misstep even if it is not prohibited. Mark them as hard blocks in your team calendar.' },
  { q: 'How do you handle overlapping holidays?', a: 'Overlap is a gift - it is the window when most of the team is off at the same time. Plan team-wide offsites and reset periods around these clusters. The US Thanksgiving + European late-November holidays is a common one.' },
  { q: 'What is the ideal meeting time for a 4-zone team?', a: 'There is no single time that works for everyone. The professional pattern is a rotating schedule - one week tilted toward APAC, next toward EMEA, next toward Americas. Accept that someone will be off-hours each week and make recordings mandatory.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Sync Your Team\'s Time Off Across Time Zones', description: 'A practical playbook for distributed teams to coordinate national holidays, avoid scheduling conflicts, and respect every member\'s local days off.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: '2026-10-03', dateModified: '2026-10-03' }

const STEPS = [
  { n: 1, title: 'Build the team holiday map', body: 'List every team member and their country. For each, pull the full year of public holidays from /holidays/{cc}/2026. That is your baseline - every date on this map is a day that person is legally off.' },
  { n: 2, title: 'Identify the overlap windows', body: 'Find dates where multiple countries share a holiday (Christmas, New Year, Good Friday in most Western countries). These are your free team-wide reset periods - plan offsites, all-hands, and quarterly reviews here.' },
  { n: 3, title: 'Segment by region', body: 'Group members by region (APAC, EMEA, Americas). Each region has its own holiday cluster - Japan\'s Golden Week, Europe\'s May cluster, the US Thanksgiving. Plan regional syncs around these, not the global calendar.' },
  { n: 4, title: 'Set hard no-meeting rules', body: 'Every recurring meeting should be blocked on every attendee\'s national holidays. Most calendar tools support this natively - subscribe to each country\'s .ics once, set "no meetings" on those dates.' },
  { n: 5, title: 'Rotate the painful slots', body: 'With 3+ time zones, some meetings will always be pre-dawn or late-night for someone. Rotate the slot quarterly so the burden is shared. Track it. Nobody should be the permanent 6am person.' },
  { n: 6, title: 'Make async the default', body: 'The best distributed teams treat synchronous meetings as the exception. Written updates, recorded demos, and shared docs cover 80% of what a meeting would. Reserve synchronous time for decisions and unblocking.' },
]

const PITFALLS = [
  { title: 'Assuming "public holiday" means the same thing everywhere', detail: 'A US employee on Juneteenth is off. A UK employee has no equivalent that day. A Japanese employee may be working through it but off for Showa Day in April. Every calendar is different.' },
  { title: 'Booking meetings during local lunch', detail: 'In Spain, 2-4pm is lunch. In Japan, 12-1pm. In the US, 12-1pm is often a working lunch. Respect local norms, not a uniform "12pm = lunch" assumption.' },
  { title: 'Ignoring substitute holidays', detail: 'When Christmas falls on a Saturday, the UK and Australia observe a substitute on Monday. The US does not. That is one whole extra day some team members have off, and one day the team still needs coverage.' },
  { title: 'Forgetting half-day holidays', detail: 'Christmas Eve, New Year\'s Eve, and the day before Thanksgiving are often half-days in the US. In Germany, Heiligabend is effectively a half-day by convention. Plan around these or you will lose an afternoon.' },
]
export default function SyncTeamTimeOffPage() {
  useEffect(() => {
    document.title = 'How to Sync Your Team\'s Time Off Across Time Zones | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A practical playbook for distributed teams to coordinate national holidays, avoid scheduling conflicts, and respect every member\'s local days off.'
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
              <Users className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">For Distributed Teams · 2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              How to Sync Your Team&apos;s Time Off Across Time Zones
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              A practical playbook for coordinating national holidays across a distributed team, avoiding scheduling conflicts, and respecting every member&apos;s local days off.
            </p>
            <ShareButtons url="https://timegovern.com/blog/sync-team-time-off-time-zones" title="How to Sync Your Team's Time Off Across Time Zones" />
          </div>
        </div>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            If you have ever scheduled a meeting on Brazil&apos;s Carnival Monday or been surprised that your German colleague was off on October 3, you know the pain. Time zones are hard enough. Layer on top of them fifteen different national holiday calendars, half-days, substitute holidays, and religious observances and the scheduling puzzle gets impossible.
          </p>
          <p>
            This guide is the playbook we use. It works for teams of three and teams of thirty. The core resource is the <Link to="/holidays" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">TimeGovern public holidays hub</Link> - one place to look up any country&apos;s full year of holidays, with long-weekend finders and .ics export.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Clock className="h-7 w-7 text-emerald-500" />
            The 6-step playbook
          </h2>
          <div className="space-y-3">
            {STEPS.map((s) => (
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
            A worked example
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A team of six across four countries: two in the UK, one in Germany, one in the US (California), one in India, one in Australia (Sydney).
          </p>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
              <div className="font-bold text-slate-900 dark:text-white mb-2">Shared off days (all four countries)</div>
              <ul className="text-sm space-y-1">
                <li>• January 1 - New Year&apos;s Day</li>
                <li>• December 25 - Christmas Day</li>
                <li>• Good Friday (2026-04-03 - US works, three others off)</li>
              </ul>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Use these for team-wide events, offsites, and quarterly reviews.</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
              <div className="font-bold text-slate-900 dark:text-white mb-2">Regions that cluster</div>
              <ul className="text-sm space-y-1">
                <li>• Europe (UK + DE): Easter Monday, May 4, May 25, Whit Monday</li>
                <li>• APAC (IN + AU): Diwali, Anzac Day, Independence Day (IN)</li>
                <li>• US-only: Thanksgiving week, Juneteenth, July 4</li>
              </ul>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Plan regional syncs around these windows, not the global calendar.</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
              <div className="font-bold text-slate-900 dark:text-white mb-2">Painful slots to rotate</div>
              <ul className="text-sm space-y-1">
                <li>• Monday 9am ET = 2pm UK = 3pm DE = 6:30pm IN = 11pm AU</li>
                <li>• Australia is the permanent loser in this slot</li>
                <li>Rotate the meeting to Tuesday 8am AU time once a month</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <MapPin className="h-7 w-7 text-rose-500" />
            Four common pitfalls
          </h2>
          <div className="grid gap-3">
            {PITFALLS.map((p, i) => (
              <Card key={i} className="border-l-4 border-l-rose-500">
                <CardContent className="p-4">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">{p.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{p.detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Calendar className="h-7 w-7 text-emerald-500" />
            The one-time setup
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Do this once at the start of each year and the rest takes care of itself:
          </p>
          <ol className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">1</span>
              <span>For each team member&apos;s country, open <Link to="/holidays" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">/holidays</Link>, navigate to the country page, and download the .ics file.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">2</span>
              <span>In your team calendar (Google, Outlook, or similar), subscribe to each .ics once - most calendars auto-update when the source changes.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">3</span>
              <span>Name each subscription clearly: &quot;UK Holidays - Alice&quot;, &quot;Germany Holidays - Bernd&quot;. Colleagues instantly see whose day off is whose.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">4</span>
              <span>Add a &quot;no meeting&quot; rule for each subscription - most tools let you set this when you subscribe.</span>
            </li>
          </ol>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Total time: 15-20 minutes for a team of five. Once done, it lasts the whole year.
          </p>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-white text-center space-y-4">
          <Sparkles className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black">Build your team holiday map</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Look up any country&apos;s full year of public holidays, download as .ics, and share with your team calendar.
          </p>
          <Link to="/holidays" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition">
            Open holidays hub <ArrowRight className="h-4 w-4" />
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
            <Link to="/blog/how-to-maximise-long-weekends-2026" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">How to Maximise Long Weekends in 2026</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Every long weekend by country, plus the bridge-day strategy.</div>
            </Link>
            <Link to="/blog/best-time-to-take-leave-2026" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Best Time to Take Leave in 2026</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Turn 20 days into 50+ with country-specific timing.</div>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}