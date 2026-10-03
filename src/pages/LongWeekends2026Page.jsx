import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ChevronRight, Sparkles, Sun, Clock, PartyPopper, Plane } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What counts as a long weekend in 2026?', a: 'A long weekend happens when a public holiday falls on a Friday or Monday, extending your normal Saturday-Sunday break to three days. It also counts when a holiday lands on Tuesday or Thursday and you can bridge the gap with one day of leave.' },
  { q: 'Which country has the most long weekends in 2026?', a: 'Ireland and the UK top the list with 9-10 usable long weekends each, thanks to their Monday-anchored bank holidays. Germany, Canada, and Australia follow with 7-8.' },
  { q: 'How do I find my country long weekends?', a: 'Open the TimeGovern holidays hub, pick your country, then click the long weekends link on the country page. You get a clean list of every long weekend that year, plus the exact dates.' },
  { q: 'What is a bridge day?', a: 'A bridge day is an ordinary working day that sits between a public holiday and a weekend. Taking it off extends the break by 2-4 days for the cost of one day of leave.' },
  { q: 'Do long weekends include holidays that fall on a Saturday?', a: 'Usually not directly - but many countries move Saturday holidays to the following Monday. The UK, Australia, New Zealand, and Ireland all do this. TimeGovern automatically accounts for substitute days.' },
  { q: 'Are long weekends the best time to travel?', a: 'For short trips within your country, yes. For international travel, no - long weekends are peak days on every flight, train, and hotel. Use them for regional breaks, save the big trips for mid-week departures.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Maximise Long Weekends in 2026', description: 'Every long weekend in 2026 by country, plus the bridge-day strategy that turns 10 days of leave into 40+ days off.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: '2026-10-03', dateModified: '2026-10-03' }

const COUNTRIES = [
  { cc: 'gb', flag: 'GB', name: 'United Kingdom', count: 8, best: 'Jan 5 · Apr 3 · Apr 6 · May 4 · May 25 · Aug 31 · Dec 25 · Dec 28' },
  { cc: 'ie', flag: 'IE', name: 'Ireland', count: 9, best: 'Mar 17 · Apr 6 · May 4 · Jun 1 · Aug 3 · Oct 26 · Dec 25 · Dec 28' },
  { cc: 'us', flag: 'US', name: 'United States', count: 7, best: 'Jan 19 · Feb 16 · May 25 · Jul 3 · Sep 7 · Oct 12 · Nov 26-27' },
  { cc: 'au', flag: 'AU', name: 'Australia', count: 8, best: 'Jan 26 · Apr 3 · Apr 6 · Apr 27 · Jun 8 · Dec 25 · Dec 28' },
  { cc: 'de', flag: 'DE', name: 'Germany', count: 6, best: 'Apr 3 · Apr 6 · May 1 · May 14 · May 25 · Dec 25' },
  { cc: 'ca', flag: 'CA', name: 'Canada', count: 7, best: 'Feb 16 · Apr 3 · May 18 · Jul 1 · Sep 7 · Oct 12 · Dec 25' },
  { cc: 'fr', flag: 'FR', name: 'France', count: 6, best: 'Apr 6 · May 1 · May 8 · May 14 · May 25 · Dec 25' },
  { cc: 'nz', flag: 'NZ', name: 'New Zealand', count: 9, best: 'Jan 1-2 · Feb 6 · Apr 3 · Apr 6 · Apr 27 · Jun 1 · Oct 26 · Dec 25-28' },
]

const MONTHS = [
  { month: 'January', note: 'New Years Day + MLK Day (US) - 2 anchors in week 1 and week 3.' },
  { month: 'February', note: 'Presidents Day (US), Family Day (CA), Waitangi Day (NZ) - one solid Monday anchor.' },
  { month: 'March', note: 'St Patricks Day (IE) - mid-week bridge opportunity. Purim in Israel.' },
  { month: 'April', note: 'Good Friday + Easter Monday stack back-to-back in most Western countries. The single best leave month of the year.' },
  { month: 'May', note: 'Peak month for Europe - four public holidays in France alone. UK, IE, DE, FR, CA all have anchors.' },
  { month: 'June', note: 'Kings Birthday (UK, NZ) + June bank holiday (IE). Solid but less dense.' },
  { month: 'July', note: 'Independence Day (US), Canada Day, Bastille Day (FR). All bridge-able with mid-week timing.' },
  { month: 'August', note: 'Summer bank holiday (UK, IE). One big anchor before the Autumn stretch.' },
  { month: 'September', note: 'Labor Day (US, CA). One final summer anchor.' },
  { month: 'October', note: 'Columbus Day (US), Labour Day (NZ, IE), German Unity Day. Multiple Monday anchors.' },
  { month: 'November', note: 'Thanksgiving (US) - the strongest single bridge weekend of the year. Veterans Day mid-week.' },
  { month: 'December', note: 'Christmas + New Years Day cluster. The last two weeks of the year are the most bridgeable in most countries.' },
]
export default function LongWeekends2026Page() {
  useEffect(() => {
    document.title = 'How to Maximise Long Weekends in 2026 - Every Date by Country | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Every long weekend in 2026 by country - UK, US, Australia, Germany, Ireland, France, Canada, New Zealand. Bridge-day strategy included.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-10">

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-fuchsia-950 to-indigo-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <PartyPopper className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Long Weekends · 2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              How to Maximise Long Weekends in 2026
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              Every long weekend in 2026, broken down by country. Plus the bridge-day strategy that turns 10 days of leave into 40+ days off.
            </p>
            <ShareButtons url="https://timegovern.com/blog/how-to-maximise-long-weekends-2026" title="How to Maximise Long Weekends in 2026" />
          </div>
        </div>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            A long weekend is the cheapest travel currency there is. Three days off costs nothing. Nine days off for four days of leave is the multiplier most people never unlock. This guide shows you every long weekend in 2026 and the exact bridging days to squeeze more out of each one.
          </p>
          <p>
            Start by finding your country on the <Link to="/holidays" className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold hover:underline">TimeGovern public holidays hub</Link> - it lists every holiday and every long weekend for 220 countries across 2026, 2027, and 2028.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Calendar className="h-7 w-7 text-fuchsia-500" />
            What counts as a long weekend
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            There are three patterns that turn a normal weekend into a long one. All three show up in the TimeGovern long-weekend lists automatically:
          </p>
          <ol className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-fuchsia-500 text-white text-sm font-bold flex items-center justify-center">1</span>
              <span><strong>Monday holiday.</strong> The classic - Friday-Sunday off, plus Monday. Nothing to book. The UK has five of these in 2026 alone.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-fuchsia-500 text-white text-sm font-bold flex items-center justify-center">2</span>
              <span><strong>Friday holiday.</strong> Same effect, opposite anchor. Good Friday, Anzac Day (in years it falls on Friday), Black Friday (US), and many national days.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-fuchsia-500 text-white text-sm font-bold flex items-center justify-center">3</span>
              <span><strong>Bridge day.</strong> A Tuesday or Thursday holiday. Take the day in between off and you get 4 days off for 1 day of leave. This is where the real leverage is.</span>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Sun className="h-7 w-7 text-amber-500" />
            2026 long weekends by country
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Eight of the most-searched countries, ranked by total number of natural long weekends. Click through to see the full list with month grouping and .ics export.
          </p>
          <div className="grid gap-3">
            {COUNTRIES.map((c) => (
              <Card key={c.cc} className="border-l-4 border-l-fuchsia-500">
                <CardContent className="p-4 flex items-start gap-4">
                  <span className="text-3xl font-bold text-slate-400 w-10">{c.flag}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                      <Link to={`/holidays/${c.cc}/2026`} className="font-bold text-slate-900 dark:text-white hover:text-fuchsia-600 dark:hover:text-fuchsia-400">
                        {c.name}
                      </Link>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {c.count} long weekends
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-mono mb-2">{c.best}</p>
                    <Link to={`/holidays/${c.cc}/2026/long-weekends`} className="inline-flex items-center gap-1 text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline">
                      See all {c.name} long weekends <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Clock className="h-7 w-7 text-cyan-500" />
            Month-by-month strength
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Not every month is equal. Some are packed with anchors, others are leave deserts. Here is how 2026 lines up:
          </p>
          <div className="grid gap-2">
            {MONTHS.map((m) => (
              <div key={m.month} className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex-shrink-0 w-20 font-bold text-slate-900 dark:text-white text-sm">{m.month}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{m.note}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>April and May 2026 are the two strongest months</strong> in the Western calendar. Easter falls in early April and Ascension / Whit Monday cluster in mid-to-late May. If you are only taking one long leave block this year, book it around one of those two months.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-amber-500" />
            The bridge-day multiplier
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A natural long weekend is 3 days. A bridge extends it to 4 or 9. Two examples from 2026:
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-fuchsia-50 dark:from-rose-950/40 dark:to-fuchsia-950/40 border border-fuchsia-200 dark:border-fuchsia-900">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">UK Christmas 2026 to 10 days off for 3 days of leave</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>Fri 25 Dec - Christmas Day (holiday)</li>
                <li>Sat 26 + Sun 27 Dec - weekend</li>
                <li>Mon 28 Dec - Boxing Day substitute (holiday)</li>
                <li>Take leave Tue 29 - Thu 31 Dec (3 days)</li>
                <li>Fri 1 Jan 2027 - New Year (holiday, next year)</li>
                <li>Sat 2 + Sun 3 Jan - weekend</li>
                <li><strong>Total: 10 days off for 3 days of leave.</strong></li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/40 dark:to-cyan-950/40 border border-cyan-200 dark:border-cyan-900">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">US Thanksgiving 2026 to 9 days for 3 days of leave</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>Take leave Mon 23 - Wed 25 Nov (3 days)</li>
                <li>Thu 26 Nov - Thanksgiving</li>
                <li>Fri 27 Nov - many employers observe</li>
                <li>Sat 28 + Sun 29 Nov - weekend</li>
                <li><strong>Total: 9 days off for 3 days of leave.</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 p-8 text-white text-center space-y-4">
          <Plane className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black">Find yours</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Pick your country on the holidays hub, then click through to its long-weekends page.
          </p>
          <Link to="/holidays" className="inline-flex items-center gap-2 bg-white text-fuchsia-700 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition">
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
            <Link to="/blog/best-time-to-take-leave-2026" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-fuchsia-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Best Time to Take Leave in 2026</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Turn 20 days into 50+ with country-specific timing.</div>
            </Link>
            <Link to="/blog/how-to-schedule-meetings-across-time-zones" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-fuchsia-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Scheduling Meetings Across Time Zones</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">A practical playbook for global team meetings.</div>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}