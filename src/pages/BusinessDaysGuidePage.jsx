import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, AlertCircle, Lightbulb } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What does "business days" mean?', a: 'Business days (or working days) are days when businesses and banks are open — typically Monday to Friday, excluding public holidays. Weekends are not counted.' },
  { q: 'How many business days are in a month?', a: 'Between 20 and 23, depending on the month. February has 20; a 31-day month with no holidays has 23. Subtract one per public holiday that falls on a weekday.' },
  { q: 'Do business days include Saturdays?', a: 'In most countries, no. Some Muslim-majority countries (UAE, Saudi Arabia, Qatar) count Sunday through Thursday, treating Friday and Saturday as the weekend.' },
  { q: 'How are holidays handled?', a: 'Weekend holidays are typically ignored (they shift to Monday in some countries). Our calculator uses per-country holiday data and excludes them from the business-day count.' },
  { q: 'Do banks and businesses use the same calendar?', a: 'Banks follow the central bank calendar, which usually matches the government one but can differ for regional or bank-specific holidays. Check specific bank notices for exact payroll or settlement dates.' },
  { q: 'What is a "working day" vs "calendar day"?', a: 'Calendar days count every day including weekends. Working days count only Mon-Fri (or the local equivalent). A 30-calendar-day window is roughly 22 working days.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Business Days Explained: Working Days vs Calendar Days', datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/business-days-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: 'Business Days Guide', item: 'https://timegovern.com/blog/business-days-guide' }] }

export default function BusinessDaysGuidePage() {
  useEffect(() => {
    document.title = 'Business Days Explained: Working Days vs Calendar Days (2026 Guide) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'What business days mean, how they differ from calendar days, how many are in a month, and how to count them correctly across 200+ countries.')
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
        <span>Business Days Guide</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-emerald-500 mb-3">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Explainer</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Business Days Explained: Working Days vs Calendar Days</h1>
        <p className="text-lg text-muted-foreground mb-4">
          What counts as a business day, why it differs by country, and how to calculate them correctly.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>·</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="Business Days Explained" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <p>&quot;Allow 5 business days for delivery.&quot; &quot;Payment due in 30 working days.&quot; The phrase appears everywhere — and yet most people miscount by a day or two because they ignore weekends, holidays, or country-specific rules.</p>
          <p>This guide explains what business days mean, how they differ from calendar days, and how to count them correctly. Use the free <Link to="/business-days-calculator" className="text-emerald-600 font-semibold hover:underline">Business Days Calculator</Link> for an instant answer.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Definition: business days</h2>
          <p>A business day is any day on which normal commercial activity is expected. In most countries that means <strong>Monday through Friday, excluding public holidays</strong>. Weekends and holidays are not business days.</p>
          <p>Variants exist:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Banking day</strong> — a day when banks are open, sometimes excluding extra holidays specific to banks</li>
            <li><strong>Settlement day</strong> — a day when financial transactions settle (usually T+1 or T+2 business days)</li>
            <li><strong>Working day</strong> — synonym for business day; used more in legal and government contexts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Business days per month</h2>
          <div className="overflow-x-auto border border-border rounded-lg my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b"><tr><th className="text-left p-3 font-semibold">Month</th><th className="text-left p-3 font-semibold">Business days (no holidays)</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">January</td><td className="p-3 tabular-nums">22-23</td></tr>
                <tr className="border-b"><td className="p-3">February</td><td className="p-3 tabular-nums">20</td></tr>
                <tr className="border-b"><td className="p-3">March</td><td className="p-3 tabular-nums">22-23</td></tr>
                <tr className="border-b"><td className="p-3">April</td><td className="p-3 tabular-nums">21-22</td></tr>
                <tr className="border-b"><td className="p-3">May</td><td className="p-3 tabular-nums">21-23</td></tr>
                <tr className="border-b"><td className="p-3">June</td><td className="p-3 tabular-nums">21-22</td></tr>
                <tr className="border-b"><td className="p-3">July</td><td className="p-3 tabular-nums">22-23</td></tr>
                <tr className="border-b"><td className="p-3">August</td><td className="p-3 tabular-nums">21-23</td></tr>
                <tr className="border-b"><td className="p-3">September</td><td className="p-3 tabular-nums">21-22</td></tr>
                <tr className="border-b"><td className="p-3">October</td><td className="p-3 tabular-nums">22-23</td></tr>
                <tr className="border-b"><td className="p-3">November</td><td className="p-3 tabular-nums">21-22</td></tr>
                <tr><td className="p-3">December</td><td className="p-3 tabular-nums">21-23</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">Subtract one business day for each public holiday that falls on a weekday. In years with many national holidays (e.g. India, Colombia), a month can drop to 18-19 business days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Country differences</h2>
          <p>Weekends are not universal:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Most of the world:</strong> Saturday + Sunday is the weekend</li>
            <li><strong>UAE:</strong> Friday half day + Saturday; Sunday is a working day</li>
            <li><strong>Saudi Arabia, Qatar, Kuwait:</strong> Friday + Saturday is the weekend</li>
            <li><strong>Israel:</strong> Friday + Saturday is the weekend; Sunday is a working day</li>
            <li><strong>Parts of India:</strong> Some industries work Saturdays half-day; government offices do not</li>
          </ul>
          <div className="flex items-start gap-3 p-4 border border-amber-500/30 rounded-lg bg-amber-500/5 my-4">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm"><strong>Watch out:</strong> Our calculator uses Sat+Sun weekends for all countries. If you are calculating UAE or Gulf-region business days, verify manually.</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How to count business days</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong>Count all calendar days</strong> between the two dates (including both endpoints)</li>
            <li><strong>Subtract weekends</strong> — count of Saturdays and Sundays</li>
            <li><strong>Subtract public holidays</strong> — for each holiday on a weekday inside the range, minus one</li>
            <li><strong>Handle observable shifts</strong> — some holidays move to the next Monday if they fall on a weekend</li>
          </ol>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">If a deadline says &quot;5 business days,&quot; count from the day <strong>after</strong> the instruction date. Day 1 is the next business day.</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Common uses</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Payroll</strong> — payslip periods are often &quot;last business day of month&quot;</li>
            <li><strong>Shipping ETAs</strong> — &quot;5 business days&quot; is standard for regular mail</li>
            <li><strong>Legal contracts</strong> — notice periods are usually expressed in working days</li>
            <li><strong>Banking</strong> — settlement of stock trades happens in T+1 or T+2 business days</li>
            <li><strong>Project management</strong> — sprints and deadlines avoid weekends</li>
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
          <Link to="/business-days-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Business Days Calculator</div><div className="text-xs text-muted-foreground">Holiday-aware, 204 countries</div></Link>
          <Link to="/holidays" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Public Holidays</div><div className="text-xs text-muted-foreground">220 countries, 2026-2028</div></Link>
          <Link to="/days-between-dates" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Days Between Dates</div><div className="text-xs text-muted-foreground">Simple day counter</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center">
        <Link to="/business-days-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Open the calculator <ArrowRight className="h-4 w-4" /></Link>
      </section>
    </div>
  )
}