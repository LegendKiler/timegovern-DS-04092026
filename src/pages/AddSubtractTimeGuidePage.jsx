import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Lightbulb, Calculator } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do I add hours and minutes?', a: 'Convert both values to the smallest unit (seconds or minutes), add them, then convert back. 2h 30m + 1h 45m = 3h 75m = 4h 15m after carrying 60 minutes into 1 hour.' },
  { q: 'How do I subtract time?', a: 'Same process, but subtract. If the result goes negative, add 24 hours to wrap around midnight. 03:00 minus 05:00 = 22:00 the previous day.' },
  { q: 'How do I convert minutes to decimal hours?', a: 'Divide minutes by 60. 45 minutes = 0.75 hours. Payroll systems use decimal hours: 7h 45m = 7.75.' },
  { q: 'Can I add time across midnight?', a: 'Yes. If the result exceeds 24 hours, subtract 24 and increment the day. 22:00 + 4 hours = 02:00 the next day.' },
  { q: 'How do I add days and hours together?', a: 'Treat days as 24 hours each. 2 days + 5 hours = 53 hours. For a full date-time calculation with months and years, use the Date Duration Calculator instead.' },
  { q: 'What is military time?', a: 'A 24-hour clock format (e.g. 14:30 instead of 2:30 PM). It avoids AM/PM ambiguity and is standard in aviation, military, and most of the world outside the US.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Add and Subtract Time (Hours, Minutes, Seconds)', datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/add-subtract-time-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: 'Add and Subtract Time Guide', item: 'https://timegovern.com/blog/add-subtract-time-guide' }] }

export default function AddSubtractTimeGuidePage() {
  useEffect(() => {
    document.title = 'How to Add and Subtract Time (Hours, Minutes, Seconds) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Learn how to add and subtract hours, minutes, and seconds — including the carry-over rules, decimal hours, and wrapping past midnight.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Add &amp; Subtract Time</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-orange-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Add and Subtract Time</h1>
        <p className="text-lg text-muted-foreground mb-4">The carry-over rules, decimal hours, and what happens when the result crosses midnight.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>·</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="How to Add and Subtract Time" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <p>Adding time looks easy until you hit the carry-over rules. 2h 30m plus 1h 45m is not 3h 75m — it is 4h 15m, because 75 minutes carries into 1 hour and 15 minutes.</p>
          <p>This guide covers the rules, worked examples, and how to handle the two tricky cases: decimal hours and crossing midnight. Try the <Link to="/time-duration-calculator" className="text-emerald-600 font-semibold hover:underline">Time Duration Calculator</Link> for instant results.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The three units</h2>
          <p>Time uses base-60 (sexagesimal) arithmetic for minutes and seconds, but base-24 for hours:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>60 seconds</strong> = 1 minute</li>
            <li><strong>60 minutes</strong> = 1 hour</li>
            <li><strong>24 hours</strong> = 1 day</li>
          </ul>
          <p>When you add two times, each unit carries at its base limit — seconds carry at 60, minutes carry at 60, hours carry at 24.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Adding time — worked example</h2>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Calculator className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm font-mono space-y-1">
              <div>2h 30m + 1h 45m</div>
              <div>= (2+1)h (30+45)m</div>
              <div>= 3h 75m</div>
              <div>= 3h + 1h 15m (carry 60 minutes)</div>
              <div>= <strong>4h 15m</strong></div>
            </div>
          </div>
          <p>Same for seconds: if seconds reach 60, carry to minutes. If minutes reach 60, carry to hours.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Subtracting time — worked example</h2>
          <p>Subtract the smaller units first. If any unit goes negative, borrow from the next bigger unit:</p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Calculator className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm font-mono space-y-1">
              <div>5h 10m − 2h 45m</div>
              <div>= 5h 10m − 2h 45m</div>
              <div>Borrow: 5h 10m → 4h 70m</div>
              <div>= (4−2)h (70−45)m</div>
              <div>= <strong>2h 25m</strong></div>
            </div>
          </div>
          <p>Borrowing from hours adds 60 to minutes. Same for borrowing minutes to seconds.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Decimal hours</h2>
          <p>Payroll and time-tracking systems use decimal hours because they are easier to multiply by an hourly rate. To convert:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>15 minutes = 0.25 hours</li>
            <li>30 minutes = 0.50 hours</li>
            <li>45 minutes = 0.75 hours</li>
          </ul>
          <p>To convert manually: divide minutes by 60. So 7h 45m = 7.75 hours. Multiply by $25/hour → $193.75.</p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm"><strong>Rule of thumb:</strong> 6 minutes = 0.1 hours. So 6 min → 0.1, 12 min → 0.2, 30 min → 0.5, 45 min → 0.75.</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Crossing midnight</h2>
          <p>If you add time and the hour total exceeds 24, subtract 24 and increment the day:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>22:00 + 4h = 26:00 → 02:00 the next day</li>
            <li>23:30 + 45m = 24:15 → 00:15 the next day</li>
            <li>01:00 − 3h = −02:00 → 22:00 the previous day</li>
          </ul>
          <p>This is standard for shift work, flight times, and any calculation where a task spans two calendar days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Forgetting to carry 60 minutes into an hour</li>
            <li>Mixing decimal hours and clock minutes (1.5 hours = 1h 30m, not 1h 50m)</li>
            <li>Not handling overnight shifts correctly (22:00 to 06:00 = 8h, not 16h)</li>
            <li>Treating AM/PM boundaries as different days — 11:30 PM to 12:30 AM is only 1 hour</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/time-duration-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Time Duration Calculator</div><div className="text-xs text-muted-foreground">Between / Add / Subtract modes</div></Link>
          <Link to="/hours-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Hours Calculator</div><div className="text-xs text-muted-foreground">Multiple rows, break deduction</div></Link>
          <Link to="/time-card-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Time Card Calculator</div><div className="text-xs text-muted-foreground">Weekly payroll with rate</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/time-duration-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}