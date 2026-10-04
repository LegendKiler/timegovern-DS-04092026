import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Lightbulb, AlertCircle } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do I calculate duration between two dates?', a: 'Subtract the earlier date from the later date. The difference is a millisecond count; divide by 86,400,000 to get whole days, then break the remainder into hours, minutes, and seconds.' },
  { q: 'What is the difference between days between and duration?', a: 'Days between counts whole calendar days. Duration includes hours, minutes, and seconds — useful for exact measurements like project runtimes or event countdowns.' },
  { q: 'Does the calculation include both endpoints?', a: 'Duration calculations are exclusive: the difference between Jan 1 and Jan 2 is one day. Some days-between calculators include the start date; check the result when precision matters.' },
  { q: 'Why do leap years matter?', a: 'A leap year adds one extra day (Feb 29). Over long durations, ignoring leap years can be off by a day per 4-year cycle. Modern date libraries handle this automatically.' },
  { q: 'How do I count duration in months?', a: 'Months are irregular — 28 to 31 days. The standard is calendar months: from Jan 15 to Mar 15 is exactly 2 months, regardless of day count.' },
  { q: 'What about time zones?', a: 'Duration between two local times in different zones must account for the offset. Our calculator assumes both dates are in your device time zone, which is correct for personal use.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: 'How to Calculate Duration Between Two Dates',
  datePublished: '2026-10-04', dateModified: '2026-10-04',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } },
  image: 'https://timegovern.com/icon-512.png',
  mainEntityOfPage: 'https://timegovern.com/blog/date-duration-guide',
}
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
  { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' },
  { '@type': 'ListItem', position: 3, name: 'Date Duration Guide', item: 'https://timegovern.com/blog/date-duration-guide' },
] }

export default function DateDurationGuidePage() {
  useEffect(() => {
    document.title = 'How to Calculate Duration Between Two Dates (Complete Guide) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Learn how to calculate duration between two dates — the formula, the leap year trap, and how to break the result into years, months, days, hours, minutes, and seconds.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/blog" className="hover:underline">Blog</Link>
        <span className="mx-1">/</span>
        <span>Date Duration Guide</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Guide</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Calculate Duration Between Two Dates</h1>
        <p className="text-lg text-muted-foreground mb-4">
          The formula, the leap-year trap, and how to break the result into years, months, days, hours, minutes, and seconds — without getting it wrong.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Updated 4 October 2026</span>
          <span>·</span>
          <span>7 min read</span>
        </div>
      </header>

      <ShareButtons title="How to Calculate Duration Between Two Dates" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <p>Calculating duration looks simple — just subtract one date from another. But when you need the answer in years, months, days, hours, minutes, and seconds, or when the range crosses a leap year or DST change, the arithmetic gets tricky fast.</p>
          <p>This guide covers the formula, the common traps, and how to break a duration into every unit. Use our free <Link to="/date-duration-calculator" className="text-emerald-600 font-semibold hover:underline">Date Duration calculator</Link> for the fast answer.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The formula</h2>
          <p>Duration between two dates = |B - A| where A and B are timestamps. The result is in milliseconds, which you then break into units:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Total seconds</strong> = milliseconds ÷ 1,000</li>
            <li><strong>Total minutes</strong> = seconds ÷ 60</li>
            <li><strong>Total hours</strong> = minutes ÷ 60</li>
            <li><strong>Total days</strong> = hours ÷ 24</li>
          </ul>
          <p>For the human-readable breakdown (2 years, 3 months, 5 days), you need calendar arithmetic, not just division — because months have 28 to 31 days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The leap-year trap</h2>
          <p>Every four years, February gets an extra day. If your duration spans a leap year and you use a fixed 365-day year, you will be off by one day. Modern date libraries handle this, but spreadsheets often do not.</p>
          <div className="flex items-start gap-3 p-4 border border-amber-500/30 rounded-lg bg-amber-500/5 my-4">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm"><strong>Watch out:</strong> Excel's <code>DAYS()</code> function handles leap years correctly, but manual date arithmetic often doesn't. Always cross-check long durations with a dedicated calculator.</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Breaking the result into units</h2>
          <p>To get "X years, Y months, Z days":</p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Count full years first (2019 to 2026 = 7 years)</li>
            <li>Then full calendar months from the last anniversary</li>
            <li>Then remaining days</li>
            <li>If hours/minutes/seconds matter, subtract date-only difference from the full timestamp difference</li>
          </ol>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">Most people only need <strong>days</strong> or <strong>whole months</strong>. Only reach for hour/minute precision when timing matters (SLAs, project runtimes, race results).</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Including the wrong endpoint.</strong> Jan 1 to Jan 2 is 1 day, not 2.</li>
            <li><strong>Ignoring DST.</strong> Clocks move by one hour twice a year — irrelevant for full-day durations, but it matters if you need exact hours.</li>
            <li><strong>Assuming all months are 30 days.</strong> The financial "30/360" convention exists, but calendar durations use actual month lengths.</li>
            <li><strong>Forgetting leap years.</strong> A duration spanning Feb 29 in a leap year is one day longer than the same range in a non-leap year.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">When to use each type</h2>
          <div className="overflow-x-auto border border-border rounded-lg my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b"><tr><th className="text-left p-3 font-semibold">Use case</th><th className="text-left p-3 font-semibold">Best unit</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">Project deadline</td><td className="p-3">Business days</td></tr>
                <tr className="border-b"><td className="p-3">Age</td><td className="p-3">Years, months, days</td></tr>
                <tr className="border-b"><td className="p-3">Event countdown</td><td className="p-3">Days, hours, minutes</td></tr>
                <tr className="border-b"><td className="p-3">Contract length</td><td className="p-3">Months</td></tr>
                <tr><td className="p-3">Runtime / SLA</td><td className="p-3">Hours, minutes, seconds</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Try it yourself</h2>
          <p>The fastest way is to use a dedicated calculator. Ours handles leap years, DST, and the calendar-month breakdown automatically.</p>
          <p><Link to="/date-duration-calculator" className="text-emerald-600 font-semibold hover:underline">Open the free Date Duration Calculator →</Link></p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">
            {FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}
          </div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/date-duration-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Date Duration</div><div className="text-xs text-muted-foreground">Exact duration between two date-times</div></Link>
          <Link to="/days-between-dates" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Days Between Dates</div><div className="text-xs text-muted-foreground">Whole-day difference</div></Link>
          <Link to="/business-days-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Business Days</div><div className="text-xs text-muted-foreground">Working days, holiday-aware</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center">
        <Link to="/date-duration-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Calculate duration now <ArrowRight className="h-4 w-4" /></Link>
      </section>
    </div>
  )
}