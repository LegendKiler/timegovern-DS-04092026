import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Lightbulb, Calculator, Percent } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How do I calculate a discount?", a: "Multiply the original price by the discount rate, then subtract. Or multiply by (1 - rate). $80 at 25% off = 80 x 0.75 = $60." },
  { q: "Do two 20% discounts equal 40% off?", a: "No. Two stacked 20% discounts give an effective 36% off, because the second applies to the already-reduced price." },
  { q: "How do I find the original price from a sale price?", a: "Divide the sale price by (1 - discount). $60 after 25% off means 60 / 0.75 = $80." },
  { q: "Is 30% off better than buy-one-get-one?", a: "Depends. BOGO on identically-priced items is effectively 50% off per item, which beats 30% off. On differently-priced items, BOGO usually means the cheaper one is free, which may be less than 50%." },
  { q: "Do discounts apply before or after tax?", a: "In most jurisdictions, discounts reduce the taxable amount, so tax is charged on the discounted price. Store coupons and manufacturer coupons may be treated differently." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Discount Guide: How to Calculate Percent Off and Stacked Discounts", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/discount-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Discount Guide", item: 'https://timegovern.com/blog/discount-guide' }] }

export default function DiscountGuidePage() {
  useEffect(() => {
    document.title = 'Discount Guide: How to Calculate Percent Off and Stacked Discounts | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The percent-off formula, how to reverse a discount to find original price, how stacked discounts work, and the mistakes shoppers make.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Discount Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-emerald-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Discount Guide: How to Calculate Percent Off and Stacked Discounts</h1>
        <p className="text-lg text-muted-foreground mb-4">The percent-off formula, how to reverse a discount to find original price, how stacked discounts work, and the mistakes shoppers make.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>Â·</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Discount Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The percent-off formula</h2>
          <p>Sale price = Original x (1 - discount). Savings = Original x discount.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>$80 with 25% off: 80 x 0.75 = $60</li>
            <li>Savings: 80 x 0.25 = $20</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Reverse: finding the original price</h2>
          <p>If you know the sale price and the discount percentage, divide to find the original: Original = Sale / (1 - discount).</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>$60 after 25% off: 60 / 0.75 = $80</li>
            <li>$42 after 30% off: 42 / 0.70 = $60</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Stacked discounts</h2>
          <p>Two stacked discounts do not add. 20% off then 10% off is not 30% off.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Original $100</li>
            <li>After 20%: $80</li>
            <li>After another 10%: $72</li>
            <li>Effective discount: 28%, not 30%</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Reverse-stacked: order matters?</h2>
          <p>For percent discounts, order does not matter. 20 then 10 gives the same price as 10 then 20, because multiplication is commutative. What does matter is when a fixed-dollar coupon and a percent discount stack, since the coupon usually applies after the percentage.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Common mistakes</h2>
          <p>Adding stacked percentages is the biggest one. The second one applies to the already-reduced price, so the effective rate is always less than the sum. The second mistake is forgetting that tax is charged on the sale price, not the original.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/discount-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Discount Calculator</div><div className="text-xs text-muted-foreground">Percent off and stacked</div></Link>
          <Link to="/sales-tax-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Sales Tax Calculator</div><div className="text-xs text-muted-foreground">Add or reverse tax</div></Link>
          <Link to="/roi-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">ROI Calculator</div><div className="text-xs text-muted-foreground">Return on investment</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/discount-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
