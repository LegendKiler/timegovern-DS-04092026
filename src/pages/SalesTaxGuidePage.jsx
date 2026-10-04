import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Lightbulb, Calculator, Receipt } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How do I calculate sales tax backwards?", a: "Divide the total by (1 + rate). If the total is $108 and tax is 8%, the pre-tax price is 108 / 1.08 = $100." },
  { q: "Which US states have no sales tax?", a: "Delaware, Montana, New Hampshire, and Oregon have no statewide sales tax. Alaska has no state tax but allows local taxes." },
  { q: "Is sales tax the same as VAT?", a: "No. Sales tax is collected once at the point of final sale. VAT is collected at every stage of the supply chain and refunded to businesses, so only the final consumer bears it." },
  { q: "Are groceries taxed?", a: "In most US states, unprepared groceries are exempt from sales tax. Prepared food, candy, and soda are usually taxed." },
  { q: "Do online purchases charge sales tax?", a: "Yes in most cases. After the 2018 South Dakota v. Wayfair ruling, states can require online sellers to collect sales tax even without a physical presence." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Sales Tax Guide: How to Calculate Sales Tax and Reverse It", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/sales-tax-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Sales Tax Guide", item: 'https://timegovern.com/blog/sales-tax-guide' }] }

export default function SalesTaxGuidePage() {
  useEffect(() => {
    document.title = 'Sales Tax Guide: How to Calculate Sales Tax and Reverse It | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "How sales tax works, the multiply and divide formulas, US state rate ranges, sales tax vs VAT, and how to back out tax from a total.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Sales Tax Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-blue-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Sales Tax Guide: How to Calculate Sales Tax and Reverse It</h1>
        <p className="text-lg text-muted-foreground mb-4">How sales tax works, the multiply and divide formulas, US state rate ranges, sales tax vs VAT, and how to back out tax from a total.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>Â·</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="Sales Tax Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Sales tax in one sentence</h2>
          <p>Sales tax is a percentage added to the price of a good or service at the point of sale. The seller collects it from the buyer and remits it to the government.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The two formulas</h2>
          <p>Adding tax: Total = Price x (1 + rate). Removing tax: Price = Total / (1 + rate).</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>$50 at 8% tax: 50 x 1.08 = $54.00</li>
            <li>$54 including 8% tax: 54 / 1.08 = $50.00</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Worked example</h2>
          <p>A laptop is listed at $1,299. Sales tax is 7.25%.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Tax = 1299 x 0.0725 = $94.18</li>
            <li>Total = 1299 + 94.18 = $1,393.18</li>
            <li>Reverse check: 1393.18 / 1.0725 = $1,299.00</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">US state rates</h2>
          <p>State-level sales tax in the US ranges from 0% (Delaware, Montana, New Hampshire, Oregon) to 7.25% (California). Local county and city taxes often stack on top, pushing combined rates above 10% in some zip codes. The Sales Tax Calculator lets you enter any combined rate.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Sales tax vs VAT</h2>
          <p>VAT is collected at every stage of production and refunded down the chain, so the final consumer bears the full rate. Sales tax is collected once at the point of final sale. The price impact for the buyer is the same; the reporting burden differs.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/sales-tax-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Sales Tax Calculator</div><div className="text-xs text-muted-foreground">Add or reverse tax</div></Link>
          <Link to="/discount-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Discount Calculator</div><div className="text-xs text-muted-foreground">Percent off and stacked deals</div></Link>
          <Link to="/roi-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">ROI Calculator</div><div className="text-xs text-muted-foreground">Return on investment</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/sales-tax-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
