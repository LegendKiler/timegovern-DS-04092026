import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Lightbulb, Calculator, LineChart } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is a good ROI?", a: "The S&P 500 has averaged around 10% nominal per year over the last century. Anything above that is beating the market; anything below it is losing to a passive index fund." },
  { q: "How do I annualize ROI?", a: "Annualized ROI = ((1 + total ROI)^(1 / years)) - 1. A 60% return over 4 years annualizes to about 12.47% per year." },
  { q: "Is ROI the same as CAGR?", a: "Not exactly. ROI is the total return. CAGR is the annualized equivalent. When you annualize ROI correctly, it equals CAGR." },
  { q: "Should I use ROI or IRR?", a: "Use ROI or CAGR for simple one-time investments. Use IRR for projects with multiple cash flows at different times, such as a rental property with monthly income and periodic repairs." },
  { q: "How do I account for inflation in ROI?", a: "Compute nominal ROI first, then adjust: Real ROI = ((1 + nominal) / (1 + inflation)) - 1. Use the Inflation Calculator to get country-specific CPI data." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "ROI Guide: How to Calculate Return on Investment (and Annualize It)", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/roi-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "ROI Guide", item: 'https://timegovern.com/blog/roi-guide' }] }

export default function RoiGuidePage() {
  useEffect(() => {
    document.title = 'ROI Guide: How to Calculate Return on Investment (and Annualize It) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The ROI formula, worked examples, how to annualize ROI for multi-year investments, and why ROI and CAGR are not the same thing.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>ROI Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-violet-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">ROI Guide: How to Calculate Return on Investment (and Annualize It)</h1>
        <p className="text-lg text-muted-foreground mb-4">The ROI formula, worked examples, how to annualize ROI for multi-year investments, and why ROI and CAGR are not the same thing.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>Â·</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="ROI Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The ROI formula</h2>
          <p>ROI = (Gain - Cost) / Cost x 100. A $1,000 investment that returns $1,250 has a gain of $250, and ROI = 250 / 1000 = 25%.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Annualizing ROI</h2>
          <p>ROI tells you the total return, not the return per year. To annualize: Annualized ROI = ((1 + ROI)^(1 / years)) - 1.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Total ROI 60% over 4 years</li>
            <li>Annualized = 1.60^(1/4) - 1</li>
            <li>Annualized is approximately 12.47% per year</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why annualized matters</h2>
          <p>A 50% return sounds great. Over 10 years, it is only 4.14% per year, which is below an index fund. Over 1 year, it is exceptional. Comparing investments without annualizing is comparing apples to oranges.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">ROI vs CAGR</h2>
          <p>ROI is a total-return figure. CAGR (Compound Annual Growth Rate) is the annualized version and the same number as Annualized ROI when calculated correctly. Use ROI for single-period comparisons and CAGR for anything that spans more than one year.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Real (after-inflation) ROI</h2>
          <p>Nominal ROI is the raw percentage. Real ROI adjusts for inflation: Real ROI = ((1 + nominal) / (1 + inflation)) - 1. A 7% nominal return during 3% inflation is roughly 3.88% real.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/roi-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">ROI Calculator</div><div className="text-xs text-muted-foreground">Gain, annualized, CAGR</div></Link>
          <Link to="/inflation-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Inflation Calculator</div><div className="text-xs text-muted-foreground">Real vs nominal return</div></Link>
          <Link to="/simple-interest-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Simple Interest Calculator</div><div className="text-xs text-muted-foreground">I = P x r x t</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/roi-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
