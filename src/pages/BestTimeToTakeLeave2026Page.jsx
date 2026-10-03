import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ChevronRight, Plane, Sparkles, Sun, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the best month to take leave in 2026?', a: 'It depends on your country. In the UK, May and August offer the best leave-to-holiday ratios. In the US, November and December. In Australia, April and December. The pattern is: find months with a bank holiday next to a weekend and bridge with 1-2 days of leave.' },
  { q: 'How do I find long weekends in 2026?', a: 'A "long weekend" happens when a public holiday falls on a Monday or Friday, or when a holiday sits next to a weekend. TimeGovern shows a full list per country at /holidays/{country}/2026/long-weekends.' },
  { q: 'How many days of leave do I need for a 9-day break?', a: 'Usually just 4. Book the Tuesday-Thursday after a Monday bank holiday, add the weekend before or after, and a 9-day block costs 4 days of leave.' },
  { q: 'Which countries have the most public holidays?', a: 'India, Colombia, and the Philippines typically lead with 18-21 public holidays per year. Nepal and Sri Lanka are close behind. The full ranked list is on the /holidays hub.' },
  { q: 'Is it better to take leave in spring or summer?', a: 'Spring months (April-June) usually deliver the best balance of weather, fewer crowds, and cheaper flights. Summer is peak season — more expensive, more crowded, but school-holiday friendly.' },
  { q: 'Do public holidays count as paid leave?', a: 'In most countries, yes — public holidays are statutory paid days off. Your annual leave entitlement is separate. Check your local employment law for exact rules.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Time to Take Leave in 2026', description: 'How to maximise your 2026 annual leave by targeting public holidays, long weekends, and bridge days.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: '2026-10-03', dateModified: '2026-10-03' }

const COUNTRIES = [
  { cc: 'gb', flag: '🇬🇧', name: 'United Kingdom', best: 'May + August', note: 'Two bank holiday Mondays in May, one in August — 3 long weekends for 6 days of leave.' },
  { cc: 'us', flag: '🇺🇸', name: 'United States', best: 'November + December', note: 'Thanksgiving and Christmas are the strongest anchors. July 4th mid-week is best bridged.' },
  { cc: 'au', flag: '🇦🇺', name: 'Australia', best: 'April + December', note: 'Easter and Christmas fall near weekends most years. Anzac Day bridges easily.' },
  { cc: 'de', flag: '🇩🇪', name: 'Germany', best: 'May + October', note: 'Nine nationwide holidays — May alone has 3, October has German Unity Day.' },
  { cc: 'fr', flag: '🇫🇷', name: 'France', best: 'May', note: 'Four public holidays in May alone. The "pont" (bridge) culture is famous for a reason.' },
  { cc: 'in', flag: '🇮🇳', name: 'India', best: 'March + October', note: 'Holi, Diwali, and multiple regional holidays — 17-21 days total depending on state.' },
]

export default function BestTimeToTakeLeave2026Page() {
  useEffect(() => {
    document.title = 'Best Time to Take Leave in 2026 - Maximise Your Annual Leave | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The best months to take annual leave in 2026 by country - how to turn 20 days into 50+ by targeting public holidays and long weekends.'
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
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Time Off · 2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Best Time to Take Leave in 2026
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              Turn 20 days of annual leave into 50+ by targeting public holidays, long weekends, and bridge days. Full country-by-country breakdown.
            </p>
            <ShareButtons url="https://timegovern.com/blog/best-time-to-take-leave-2026" title="Best Time to Take Leave in 2026" />
          </div>
        </div>

        {/* INTRO */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            Most people burn their annual leave one week at a time and never think about it again. That is a mistake. With a small amount of planning around <Link to="/holidays" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">public holidays in your country</Link>, the same 20 days can deliver double the time off — without asking for extra leave.
          </p>
          <p>
            This guide breaks down the best time to take leave in 2026 by country, how long weekends work, and the exact bridging strategy professionals use.
          </p>
        </div>

        {/* WHY TIMING MATTERS */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Calendar className="h-7 w-7 text-indigo-500" />
            Why timing beats total days
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A public holiday is a paid day off that everyone gets. If it lands on a Tuesday, the Monday between it and the weekend is a "bridge day" — book one day of leave, get a 4-day break. If it lands mid-week and you take 2 days on either side, you get 9 days off for 4 days of leave.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            The multiplier is brutal: <strong>well-timed leave is often worth 2-3x the days you spend</strong>. The trick is knowing which dates to target.
          </p>
        </section>

        {/* COUNTRY TABLE */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Sun className="h-7 w-7 text-amber-500" />
            Best months by country
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Each country has its own peak leave months — the months where a small amount of leave stretches furthest. Here are the strongest 2026 windows:
          </p>
          <div className="grid gap-3">
            {COUNTRIES.map((c) => (
              <Card key={c.cc} className="border-l-4 border-l-indigo-500">
                <CardContent className="p-4 flex items-start gap-4">
                  <span className="text-3xl">{c.flag}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                      <Link to={`/holidays/${c.cc}/2026`} className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                        {c.name}
                      </Link>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        Best: {c.best}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{c.note}</p>
                    <Link to={`/holidays/${c.cc}/2026/long-weekends`} className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mt-2">
                      See {c.name} long weekends <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* THE BRIDGE STRATEGY */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Clock className="h-7 w-7 text-cyan-500" />
            The 4-day leave → 9-day break formula
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            This is the strategy that turns an average leave allowance into something that feels unlimited. Here is how it works in practice.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Example: UK August bank holiday (Mon 31 Aug 2026)</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Take leave Tue 25 – Fri 28 Aug (4 days)</li>
                <li>• Weekend Sat 22 – Sun 23 Aug is free</li>
                <li>• Bank holiday Mon 31 Aug is free</li>
                <li>• <strong>Total break: Sat 22 Aug → Mon 31 Aug = 10 days off for 4 days of leave</strong></li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Example: US Thanksgiving (Thu 26 Nov 2026)</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Take leave Mon 23 – Wed 25 Nov (3 days)</li>
                <li>• Thanksgiving Thu 26 + "Black Friday" Fri 27 free</li>
                <li>• Weekend Sat 28 – Sun 29 Nov free</li>
                <li>• <strong>Total break: Sat 21 Nov → Sun 29 Nov = 9 days off for 3 days of leave</strong></li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Find the same pattern in your own country by looking at the <Link to="/holidays" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">public holidays hub</Link>, then filter for Mondays and Fridays — those are the days that bridge best.
          </p>
        </section>

        {/* 5 RULES */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <MapPin className="h-7 w-7 text-rose-500" />
            Five rules for maximising leave
          </h2>
          <ol className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">1</span>
              <span><strong>Target Monday and Friday holidays.</strong> These deliver the highest leave-to-days-off ratio because they extend an existing weekend.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">2</span>
              <span><strong>Book bridge days, not full weeks.</strong> Two single days placed before and after a Wednesday holiday often beat a 5-day block.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">3</span>
              <span><strong>Cross-reference two countries.</strong> If you work remotely or have flexible location, use the country with the best upcoming holiday window — see the <Link to="/holidays" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">full country list</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">4</span>
              <span><strong>Request leave early.</strong> Peak long-weekend dates get booked out 3-6 months ahead in most workplaces.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">5</span>
              <span><strong>Never waste a floating holiday.</strong> Many companies offer 1-3 "personal" or "floating" days. Attach them to existing bridges.</span>
            </li>
          </ol>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white text-center space-y-4">
          <Plane className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black">Plan your 2026 leave now</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Pick your country, see every public holiday and long weekend, download the .ics file to your calendar.
          </p>
          <Link to="/holidays" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition">
            Open holidays hub <ArrowRight className="h-4 w-4" />
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
            <Link to="/blog/how-to-schedule-meetings-across-time-zones" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Scheduling Meetings Across Time Zones</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">A practical playbook for global team meetings.</div>
            </Link>
            <Link to="/blog/why-different-countries-have-different-times" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Why Different Countries Have Different Times</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">The history of the world time zone system.</div>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}