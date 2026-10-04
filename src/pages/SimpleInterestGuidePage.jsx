import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Lightbulb, Calculator, Coins } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is the simple interest formula?", a: "I = P x r x t. Principal times rate (as a decimal) times time in years. Total owed or earned is P + I." },
  { q: "When is simple interest used instead of compound?", a: "Short-term consumer loans, auto loans, and some business loans use simple interest because the calculation is transparent and the term is short. Long-term savings and mortgages use compound interest." },
  { q: "How much more is compound than simple?", a: "It depends on the rate and term. At 6% for 30 years, compound roughly doubles the total versus simple. At 6% for 2 years, the difference is only about 0.4%." },
  { q: "Does simple interest apply monthly or annually?", a: "The formula is generic. Use r and t in matching units. If r is the annual rate, t is in years. If r is the monthly rate, t is in months." },
  { q: "What is a 360-day year?", a: "A day-count convention where each month is treated as 30 days. Common in commercial loans. It slightly increases interest compared to a 365-day year." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Simple Interest Guide: Formula, Worked Examples, and When It Applies", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/simple-interest-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Simple Interest Guide", item: 'https://timegovern.com/blog/simple-interest-guide' }] }

export default function SimpleInterestGuidePage() {
  useEffect(() => {
    document.title = 'Simple Interest Guide: Formula, Worked Examples, and When It Applies | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The simple interest formula I = P x r x t, worked examples, how it differs from compound interest, and where each one is used in real life.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Simple Interest Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-amber-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Simple Interest Guide: Formula, Worked Examples, and When It Applies</h1>
        <p className="text-lg text-muted-foreground mb-4">The simple interest formula I = P x r x t, worked examples, how it differs from compound interest, and where each one is used in real life.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>Â·</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Simple Interest Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The simple interest formula</h2>
          <p>I = P x r x t, where P is the principal, r is the annual interest rate as a decimal, and t is the time in years. Total = P + I.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>P = $5,000, r = 6%, t = 3 years</li>
            <li>I = 5000 x 0.06 x 3 = $900</li>
            <li>Total = $5,900</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why simple interest is "simple"</h2>
          <p>Interest is always calculated on the original principal only. It never compounds. Year 1 earns $300 on $5,000 at 6%. Year 2 also earns $300. Year 3 also earns $300. Nothing is added back to the base.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Simple vs compound</h2>
          <p>Compound interest calculates each period on the growing balance, so interest earns interest. Over long periods the difference is dramatic.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>$5,000 at 6% simple for 30 years: total = $14,000</li>
            <li>$5,000 at 6% compounded annually for 30 years: total = $28,717</li>
            <li>The compound version is roughly double after three decades.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where simple interest is used</h2>
          <p>Auto loans, personal loans, short-term business loans, and some student loans use simple interest. Most savings accounts and mortgages use compound interest (or amortized compounding equivalents).</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Day-count conventions</h2>
          <p>When t is not a whole number of years, lenders use a day-count convention. The two common ones are 360-day (banker) and 365-day. A 90-day loan at 6% on $10,000 earns $150 under 360-day or about $147.95 under 365-day. The rate on the loan document tells you which one applies.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/simple-interest-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Simple Interest Calculator</div><div className="text-xs text-muted-foreground">I = P x r x t</div></Link>
          <Link to="/roi-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">ROI Calculator</div><div className="text-xs text-muted-foreground">Gain, annualized, CAGR</div></Link>
          <Link to="/inflation-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Inflation Calculator</div><div className="text-xs text-muted-foreground">Real vs nominal value</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/simple-interest-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
