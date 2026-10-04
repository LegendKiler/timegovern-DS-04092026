import { useEffect } from 'react'
import SalesTaxCalculator from '../components/calculators/SalesTaxCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function SalesTaxCalculatorPage() {
  useEffect(() => {
    document.title = 'Sales Tax Calculator — Add or Remove Tax (VAT, GST) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate sales tax, VAT, or GST on any amount. Add tax to a price or remove it from a total. Includes quick presets for US states, UK, EU, Australia, and more.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate sales tax?', a: 'Multiply the pre-tax amount by the tax rate as a decimal. For $100 at 7.25%, tax = $100 × 0.0725 = $7.25, total = $107.25.' },
    { q: 'How do I remove tax from a total?', a: 'Divide the total by (1 + rate). For $107.25 at 7.25%, pre-tax = 107.25 ÷ 1.0725 = $100. Tax = $7.25.' },
    { q: 'What is the difference between VAT and sales tax?', a: 'Sales tax is added once at point of sale. VAT (Value Added Tax) is collected at every stage of the supply chain and included in the displayed price in most countries outside the US.' },
    { q: 'What is GST?', a: 'Goods and Services Tax — a type of VAT used in Australia, Canada, India, Singapore, New Zealand, and several other countries. Same math, different name.' },
    { q: 'Do US states have different sales tax rates?', a: 'Yes. US sales tax varies by state (0-7.25%) and often by county and city. California is highest at 7.25% state-level; Delaware, Montana, New Hampshire, and Oregon have no state sales tax.' },
    { q: 'Is the rate the same for every product?', a: 'No. Many countries apply reduced rates to food, books, medicine, and children s clothing. This calculator uses the standard rate you enter.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Sales Tax Calculator', description: 'Add or remove sales tax, VAT, or GST from any amount with regional presets.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/sales-tax-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero eyebrow="Free Tool" title="Sales Tax Calculator" subtitle="Add or remove sales tax, VAT, or GST on any amount — with quick presets for 14 regions." gradient="from-purple-500 via-pink-500 to-rose-500" />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="sales-tax" title="Sales Tax Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <SalesTaxCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Quick presets included</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• US: CA, NY, TX, FL, WA</li>
              <li>• UK VAT (20%)</li>
              <li>• Germany (19%), France (20%)</li>
              <li>• Australia GST (10%)</li>
              <li>• Canada GST (5%)</li>
              <li>• India GST (18%)</li>
              <li>• UAE VAT (5%)</li>
              <li>• Singapore GST (9%)</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="How sales tax works">
        <p>Sales tax is added to the price of most goods and services at the point of sale. Unlike VAT, it is only collected once — when the end consumer buys. This makes it simpler for businesses but the final price depends on where you buy.</p>
        <p>The calculator supports both directions: add tax to a net price (to work out the gross), or remove tax from a gross amount (to work out the net). Use it for invoices, pricing decisions, or reverse-engineering a receipt.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Discount Calculator', href: '/discount-calculator' },
          { name: 'Tip Calculator', href: '/tip-calculator' },
          { name: 'Percentage Calculator', href: '/percentage-calculator' },
          { name: 'Inflation Calculator', href: '/inflation-calculator' },
        ]} />
      </section>
    </div>
  )
}