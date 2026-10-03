import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ChevronRight, Globe, Scale, Sparkles, Umbrella, Waves } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Which country has the most public holidays - UK, US, Australia, or Germany?', a: 'Germany wins with 9-13 nationwide holidays (varies by state). Australia is next with 8-13 (varies by state/territory). The UK has 8 bank holidays nationwide. The US has 11 federal holidays, the lowest of the four.' },
  { q: 'Do all four countries give Christmas Day off?', a: 'Yes - Christmas Day (Dec 25) is a public holiday in all four. The UK, Australia, and Germany also observe Boxing Day (Dec 26). The US does not - only Christmas Day itself.' },
  { q: 'Which country has the best long weekends in 2026?', a: 'Australia, thanks to its Monday-anchored holidays (Anzac Day when it falls on Monday, Labour Day in most states, King\'s Birthday in June). The UK follows closely with 5 Monday bank holidays.' },
  { q: 'Do Germany and Australia have state-level holidays?', a: 'Yes - both countries have nationwide plus state/territory holidays. Germany ranges from 9 (Berlin) to 13 (Bavaria) statutory days. Australia ranges from 8 (Tasmania without regional shows) to 13 (WA or NT depending on year).' },
  { q: 'Is Easter Monday a holiday everywhere?', a: 'UK, Australia, and Germany all observe Easter Monday. The US does not - Easter Sunday is not a federal holiday in the US at all. Good Friday is a holiday in 3 of the 4 (not US federal).' },
  { q: 'Which of the four countries has Thanksgiving?', a: 'Only the US. Thanksgiving (4th Thursday of November) is uniquely American. Canada has its own Thanksgiving in October, but the UK, Australia, and Germany do not observe it.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Public Holidays 2026: UK vs US vs Australia vs Germany', description: 'A side-by-side comparison of public holidays in the UK, US, Australia, and Germany for 2026 - which days each observes, which overlap, and where they differ.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: '2026-10-03', dateModified: '2026-10-03' }

const COUNTRIES = [
  { cc: 'gb', name: 'United Kingdom', flag: '🇬🇧', count: 8, tone: 'border-indigo-500', color: 'text-indigo-600 dark:text-indigo-400' },
  { cc: 'us', name: 'United States', flag: '🇺🇸', count: 11, tone: 'border-blue-500', color: 'text-blue-600 dark:text-blue-400' },
  { cc: 'au', name: 'Australia', flag: '🇦🇺', count: 8, tone: 'border-amber-500', color: 'text-amber-600 dark:text-amber-400' },
  { cc: 'de', name: 'Germany', flag: '🇩🇪', count: 9, tone: 'border-rose-500', color: 'text-rose-600 dark:text-rose-400' },
]

const SHARED = [
  { name: 'New Year\'s Day', date: 'Jan 1', gb: true, us: true, au: true, de: true },
  { name: 'Good Friday', date: 'Apr 3', gb: true, us: false, au: true, de: true },
  { name: 'Easter Monday', date: 'Apr 6', gb: true, us: false, au: true, de: true },
  { name: 'Labour Day / May Day', date: 'May 1 (GB/EU) / May 4 (UK 2026) / Sep 7 (US)', gb: true, us: true, au: true, de: true, note: 'Different dates' },
  { name: 'Christmas Day', date: 'Dec 25', gb: true, us: true, au: true, de: true },
  { name: 'Boxing Day', date: 'Dec 26', gb: true, us: false, au: true, de: true },
]

const UNIQUE = [
  { cc: 'gb', name: 'UK-only', items: ['Early May bank holiday (May 4)', 'Spring bank holiday (May 25)', 'Summer bank holiday (Aug 31)', 'Boxing Day substitute (Dec 28)'] },
  { cc: 'us', name: 'US-only', items: ['MLK Day (Jan 19)', 'Presidents Day (Feb 16)', 'Memorial Day (May 25)', 'Juneteenth (Jun 19)', 'Independence Day (Jul 3-4)', 'Labor Day (Sep 7)', 'Columbus Day (Oct 12)', 'Veterans Day (Nov 11)', 'Thanksgiving (Nov 26)', 'Black Friday (Nov 27)'] },
  { cc: 'au', name: 'Australia-only', items: ['Australia Day (Jan 26)', 'Anzac Day (Apr 27 - observed)', 'King\'s Birthday (varies by state)', 'Melbourne Cup (VIC)', 'Reconciliation Day (ACT)'] },
  { cc: 'de', name: 'Germany-only', items: ['Epiphany (Jan 6 - regional)', 'International Women\'s Day (Mar 8 - Berlin)', 'Ascension Day (May 14)', 'Whit Monday (May 25)', 'Corpus Christi (regional)', 'German Unity Day (Oct 3)', 'Reformation Day (regional, Oct 31)', 'All Saints\' Day (regional, Nov 1)'] },
]
export default function PublicHolidaysComparisonPage() {
  useEffect(() => {
    document.title = 'Public Holidays 2026: UK vs US vs Australia vs Germany | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Side-by-side comparison of public holidays in 2026 for the UK, US, Australia, and Germany - which days overlap, which are unique, and how many you get.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-10">

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Scale className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Four Nations · 2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Public Holidays 2026: UK vs US vs Australia vs Germany
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              A side-by-side look at every public holiday in 2026 for the four biggest English-speaking expat destinations. Which days overlap, which are unique, and where the count diverges.
            </p>
            <ShareButtons url="https://timegovern.com/blog/public-holidays-2026-comparison" title="Public Holidays 2026: UK vs US vs Australia vs Germany" />
          </div>
        </div>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            If you have worked in more than one of these four countries, you already know the answer: public holiday culture is genuinely different. The US treats them as federal-only. The UK stacks them on Mondays. Australia has state-level variation. Germany varies by Bundesland.
          </p>
          <p>
            This comparison pulls 2026 data from the <Link to="/holidays" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">TimeGovern public holidays hub</Link>. Every count is verifiable - click any country card to see the full 2026 list, its long weekends, and calendar export.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Globe className="h-7 w-7 text-indigo-500" />
            At a glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COUNTRIES.map((c) => (
              <Link key={c.cc} to={`/holidays/${c.cc}/2026`} className={`block p-4 rounded-xl border-2 ${c.tone} bg-white dark:bg-slate-900 hover:shadow-lg transition`}>
                <div className="text-3xl mb-1">{c.flag}</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">{c.name}</div>
                <div className={`text-2xl font-black ${c.color}`}>{c.count}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500">nationwide holidays</div>
              </Link>
            ))}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Note: Australia and Germany have state-level additions that can push their count higher. The number shown is nationwide only.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Calendar className="h-7 w-7 text-emerald-500" />
            Shared holidays
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Six days that appear (mostly) across the four calendars:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="text-left p-3 font-bold text-slate-900 dark:text-white">Holiday</th>
                  <th className="p-3 font-bold text-indigo-600 dark:text-indigo-400">UK</th>
                  <th className="p-3 font-bold text-blue-600 dark:text-blue-400">US</th>
                  <th className="p-3 font-bold text-amber-600 dark:text-amber-400">AU</th>
                  <th className="p-3 font-bold text-rose-600 dark:text-rose-400">DE</th>
                </tr>
              </thead>
              <tbody>
                {SHARED.map((h, i) => (
                  <tr key={i} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="p-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{h.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">{h.date}</div>
                    </td>
                    <td className="text-center p-3">{h.gb ? '✓' : '—'}</td>
                    <td className="text-center p-3">{h.us ? '✓' : '—'}</td>
                    <td className="text-center p-3">{h.au ? '✓' : '—'}</td>
                    <td className="text-center p-3">{h.de ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-amber-500" />
            What each country has on its own
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {UNIQUE.map((u) => (
              <Card key={u.cc} className="border-l-4 border-l-slate-400">
                <CardContent className="p-4">
                  <div className="font-bold text-slate-900 dark:text-white mb-2">{u.name}</div>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {u.items.map((it, i) => (
                      <li key={i}>• {it}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Waves className="h-7 w-7 text-cyan-500" />
            Three practical takeaways
          </h2>
          <ol className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500 text-white text-sm font-bold flex items-center justify-center">1</span>
              <span><strong>If you are choosing where to live for time off,</strong> Germany wins on pure holiday count (9-13 depending on state), but Australia wins on long-weekend quality - Monday-anchored holidays that consistently stretch to 3-day breaks. The US is the worst on both metrics, with only 11 federal holidays and few Monday placements.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500 text-white text-sm font-bold flex items-center justify-center">2</span>
              <span><strong>If you are planning a specific trip in 2026,</strong> the best long weekend clusters are: Germany in May (four holidays in one month), the UK in May (two Monday bank holidays), and Australia around Easter (Good Friday + Easter Monday + school holidays).</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500 text-white text-sm font-bold flex items-center justify-center">3</span>
              <span><strong>If you are coordinating cross-border teams,</strong> expect the US to be working through every European holiday except Christmas. Plan important meetings accordingly - Easter Monday and May Day are the two most-missed days on US calendars.</span>
            </li>
          </ol>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-slate-800 to-indigo-900 p-8 text-white text-center space-y-4">
          <Umbrella className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black">See each country in full</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Full 2026 lists, long weekends, and .ics calendar export for all four - plus 216 other countries.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {COUNTRIES.map((c) => (
              <Link key={c.cc} to={`/holidays/${c.cc}/2026`} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-2 rounded-full hover:bg-white/20 transition text-sm font-semibold">
                {c.flag} {c.name}
              </Link>
            ))}
          </div>
          <Link to="/holidays" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition mt-2">
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
            <Link to="/blog/countries-with-most-public-holidays" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Which Countries Have the Most Public Holidays?</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Top 10 ranked globally - India, Lebanon, Colombia, and more.</div>
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