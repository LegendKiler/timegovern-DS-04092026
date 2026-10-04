import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Lightbulb, Calculator, TrendingUp } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is a good inflation rate?", a: "Most central banks target 2% per year. Below 1% risks deflation; above 4% starts to erode savings and wages noticeably within a single year." },
  { q: "Does inflation always reduce purchasing power?", a: "For cash held outside of interest-bearing accounts, yes. If your money earns a higher interest rate than inflation, your real purchasing power still grows." },
  { q: "How do I calculate inflation between two years?", a: "Use the CPI for each year: ((CPI_end / CPI_start) - 1) x 100. Or use the Inflation Calculator for 204 countries with World Bank data." },
  { q: "Why does my personal inflation rate differ from CPI?", a: "CPI averages a fixed basket. If you spend more on housing or food than the average household, your personal rate will differ. Housing costs in particular have outpaced headline CPI in most developed countries." },
  { q: "What is hyperinflation?", a: "Generally defined as inflation above 50% per month. It rapidly destroys the value of a currency. Zimbabwe in 2008 and Venezuela in recent years are the classic modern examples." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Inflation Guide: How to Calculate and Understand Inflation", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/inflation-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Inflation Guide", item: 'https://timegovern.com/blog/inflation-guide' }] }

export default function InflationGuidePage() {
  useEffect(() => {
    document.title = 'Inflation Guide: How to Calculate and Understand Inflation | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "How inflation erodes purchasing power, the CPI formula, worked examples, and how to compare nominal vs real value over time.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Inflation Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-red-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Inflation Guide: How to Calculate and Understand Inflation</h1>
        <p className="text-lg text-muted-foreground mb-4">How inflation erodes purchasing power, the CPI formula, worked examples, and how to compare nominal vs real value over time.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>Â·</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="Inflation Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What inflation actually is</h2>
          <p>Inflation is the rate at which the general price level of goods and services rises over time. A 3% annual rate means what cost $100 last year costs $103 this year.</p>
          <p>Central banks typically target around 2% because mild, predictable inflation encourages spending and investment while avoiding deflation traps.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The compounding formula</h2>
          <p>Future value under inflation is FV = PV x (1 + r)^n, where PV is present value, r is the annual rate, and n is the number of years.</p>
          <p>A single 3% year shrinks purchasing power by 3%. Ten 3% years shrink it by roughly 26%, because each year compounds on the last.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Worked example</h2>
          <p>What is $1,000 from 2010 worth in 2023 if average annual inflation was 2.5%?</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>FV = 1000 x 1.025^13</li>
            <li>FV is approximately 1000 x 1.3785</li>
            <li>FV is approximately $1,378.51</li>
            <li>So $1,000 in 2010 dollars buys what $1,378.51 buys in 2023.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Nominal vs real value</h2>
          <p>Nominal value is the number on the price tag. Real value is that number adjusted for inflation. A salary growing 2% per year while inflation runs at 3% is actually falling 1% per year in real terms, even though the nominal number keeps rising.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">CPI vs other measures</h2>
          <p>CPI tracks a basket of consumer goods. PCE tracks a broader set of expenditures. The World Bank annual CPI series is what our calculator uses, because it is available for 204 countries going back decades.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/inflation-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Inflation Calculator</div><div className="text-xs text-muted-foreground">204 countries, World Bank CPI</div></Link>
          <Link to="/roi-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">ROI Calculator</div><div className="text-xs text-muted-foreground">Return on investment</div></Link>
          <Link to="/simple-interest-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Simple Interest Calculator</div><div className="text-xs text-muted-foreground">I = P x r x t</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/inflation-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
