import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, ChevronRight, Globe, Sparkles, TrendingUp, Trophy, Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Which country has the most public holidays?', a: 'India tops the list with 17-21 gazetted public holidays per year, depending on state. Colombia, the Philippines, and Lebanon are close behind at 18-20 each. Sri Lanka varies wildly (15-25) because its Poya days follow the lunar calendar.' },
  { q: 'Why do some countries have so many public holidays?', a: 'Three main factors: religious diversity (countries with multiple faiths celebrate each one), colonial history (former British and Spanish colonies inherited Christian feast days plus their own independence days), and labour law tradition (many European and Latin American countries enshrine 15+ statutory days by law).' },
  { q: 'Does the US have few public holidays?', a: 'Yes - the US has just 11 federal holidays and is one of the lowest in the developed world. It compensates with generous employer leave policies (many give 15-25 paid days off per year). The UK has only 8 bank holidays, Australia 8-13 depending on state.' },
  { q: 'Which country has the fewest public holidays?', a: 'Saudi Arabia and Qatar have some of the lowest official counts at 8-10 per year, though Islamic holidays are culturally observed even when not gazetted. Mexico also has surprisingly few at 7-8 nationwide.' },
  { q: 'Do more holidays mean more time off?', a: 'Not necessarily. Some countries with few public holidays (like the US, UK, and Australia) have stronger annual leave entitlements - 20-25 paid days by law. Countries with many public holidays often have weaker annual leave policies, so the total paid days off evens out.' },
  { q: 'What is the difference between a public holiday and a gazetted holiday?', a: 'A public holiday (or bank holiday) is when banks, schools, and most businesses close. A gazetted holiday is one officially notified by government but may not close everything - some are state-level, optional, or observance-only. TimeGovern lists all types and labels each one.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Which Countries Have the Most Public Holidays?', description: 'A ranked look at the countries with the most public holidays in 2026, why they have them, and how it affects time off.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: '2026-10-03', dateModified: '2026-10-03' }

const TOP_COUNTRIES = [
  { rank: 1, cc: 'in', name: 'India', count: 17, note: 'Three national holidays plus 14 gazetted religious and cultural days. State-level additions can push the total past 21.', tag: 'Highest' },
  { rank: 2, cc: 'lb', name: 'Lebanon', count: 20, note: 'Unique mix of Christian and Muslim holidays - Christmas, Easter, Eid al-Fitr, Eid al-Adha, Ashura, and Armenian Orthodox Christmas all observed.', tag: 'Most diverse' },
  { rank: 3, cc: 'co', name: 'Colombia', count: 18, note: 'Many Catholic feast days, several of which are moved to the following Monday under the "Ley Emiliani" to create long weekends.' },
  { rank: 4, cc: 'ph', name: 'Philippines', count: 18, note: 'Regular holidays + special non-working days. The list is updated annually and includes both Catholic and Islamic observances.' },
  { rank: 5, cc: 'ar', name: 'Argentina', count: 19, note: 'Combines Catholic holidays, historical anniversaries, and 3-4 "bridge" days the government adds each year to encourage tourism.' },
  { rank: 6, cc: 'jp', name: 'Japan', count: 16, note: 'The only country with no religious public holidays. Every single day is a secular national event - and Japan also has "substitute holidays" when one falls on a Sunday.' },
  { rank: 7, cc: 'lk', name: 'Sri Lanka', count: 15, note: 'Can hit 25 in years where the monthly Poya (full moon) days are gazetted. A mix of Buddhist, Hindu, Muslim, and Christian holidays.' },
  { rank: 8, cc: 'id', name: 'Indonesia', count: 16, note: 'Six religions are officially recognised, and each contributes public holidays. Plus the "cuti bersama" (joint leave) days, which add 4-6 more.' },
  { rank: 9, cc: 'th', name: 'Thailand', count: 16, note: 'Buddhist holy days, royal anniversaries, and traditional celebrations like Songkran. The list changes when royal events add extra days.' },
  { rank: 10, cc: 'np', name: 'Nepal', count: 14, note: 'A blend of Hindu, Buddhist, and national holidays. Dashain and Tihar are the two biggest - each spanning multiple days.' },
]

const TIERS = [
  { range: '18-21', label: 'The top tier', examples: 'India, Lebanon, Colombia, Philippines, Argentina', note: 'Multi-faith calendars plus strong labour law tradition' },
  { range: '14-17', label: 'High', examples: 'Japan, Indonesia, Thailand, Nepal, Sri Lanka', note: 'Diverse religious or royal calendars, often substitute-holiday rules' },
  { range: '11-13', label: 'Medium', examples: 'Germany, Malaysia, UAE, Myanmar, Qatar, Jordan', note: 'Typical European or Gulf standard' },
  { range: '8-10', label: 'Low', examples: 'UK, US, France, Australia, Canada, Mexico', note: 'Few statutory days, offset by generous annual leave allowances' },
]
export default function MostPublicHolidaysPage() {
  useEffect(() => {
    document.title = 'Which Countries Have the Most Public Holidays? 2026 Ranking | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Ranked list of countries with the most public holidays in 2026 - India, Lebanon, Colombia, Philippines, Argentina, Japan and more. Full tier breakdown and why it matters.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-10">

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-rose-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Trophy className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Global Ranking · 2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Which Countries Have the Most Public Holidays?
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              A ranked breakdown of the top 10 countries by public holiday count in 2026, plus why some nations have three times more days off than others.
            </p>
            <ShareButtons url="https://timegovern.com/blog/countries-with-most-public-holidays" title="Which Countries Have the Most Public Holidays?" />
          </div>
        </div>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            Some countries give their citizens 20 paid holidays a year. Others give 8. The gap isnt random - its the result of religion, colonial history, labour law, and sometimes just government policy on tourism.
          </p>
          <p>
            This ranking uses 2026 data from the <Link to="/holidays" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">TimeGovern public holidays hub</Link>. Every count is verifiable - click through any country to see its full 2026 list, its long weekends, and the exact dates.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Award className="h-7 w-7 text-amber-500" />
            The Top 10
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ranked by total gazetted public holidays in 2026, national-level only (not counting state or provincial additions):
          </p>
          <div className="grid gap-3">
            {TOP_COUNTRIES.map((c) => (
              <Card key={c.cc} className="border-l-4 border-l-amber-500">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-lg flex items-center justify-center">
                    {c.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                      <Link to={`/holidays/${c.cc}/2026`} className="font-bold text-lg text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400">
                        {c.name}
                      </Link>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {c.count} days
                      </span>
                      {c.tag && (
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                          {c.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{c.note}</p>
                    <Link to={`/holidays/${c.cc}/2026`} className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
                      See {c.name} 2026 holidays <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-cyan-500" />
            The four tiers
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Most countries fall into one of four groups. Heres where the world splits:
          </p>
          <div className="grid gap-2">
            {TIERS.map((t) => (
              <div key={t.range} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-black text-lg text-slate-900 dark:text-white">{t.range}</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.label}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 font-mono mb-1">{t.examples}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{t.note}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Lightbulb className="h-7 w-7 text-yellow-500" />
            Why some countries have 3x more
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Three forces explain almost all of the variation:
          </p>
          <ol className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">1</span>
              <span><strong>Religious diversity.</strong> Lebanon, India, Indonesia, and Sri Lanka each officially recognise 3-6 faiths. Every major holiday of every faith becomes a public holiday. The result is a calendar that never has a quiet month.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">2</span>
              <span><strong>Colonial and independence history.</strong> Former Spanish and British colonies inherited Christian feast days, then added their own independence days, revolution days, and founding fathers birthdays. Colombia and the Philippines are textbook cases.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">3</span>
              <span><strong>Labour law tradition.</strong> European and Latin American countries typically enshrine a minimum number of statutory paid days in law. Anglo countries (US, UK, Australia) rely more on employer-provided annual leave.</span>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Globe className="h-7 w-7 text-rose-500" />
            The catch: more holidays doesnt mean more time off
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Raw holiday count is misleading on its own. India has 17 holidays but no statutory annual leave entitlement. The US has 11 holidays but the average worker gets 15-25 paid vacation days. The UK has 8 bank holidays plus a legal minimum of 28 days annual leave.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>What actually matters is total paid days off</strong> - public holidays plus statutory annual leave. By that measure, most of Western Europe and Australia rank near the top, and the number of public holidays is only half the story.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            For planning a trip or a break, focus on <Link to="/holidays" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">finding long weekends in your country</Link> rather than the raw count. A country with 12 well-spaced Mondays beats one with 18 holidays that all cluster in the same two months.
          </p>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 p-8 text-white text-center space-y-4">
          <Trophy className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black">See your country</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Full 2026 and 2027 holiday lists for 220 countries, with long-weekend finders and .ics calendar export.
          </p>
          <Link to="/holidays" className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition">
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
            <Link to="/blog/best-time-to-take-leave-2026" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">Best Time to Take Leave in 2026</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Turn 20 days into 50+ with country-specific timing.</div>
            </Link>
            <Link to="/blog/how-to-maximise-long-weekends-2026" className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition">
              <div className="font-semibold text-slate-900 dark:text-white mb-1">How to Maximise Long Weekends in 2026</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Every long weekend, by country, plus the bridge-day strategy.</div>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}