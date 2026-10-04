import { useEffect } from 'react'
import DiscountCalculator from '../components/calculators/DiscountCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function DiscountCalculatorPage() {
  useEffect(() => {
    document.title = 'Discount Calculator — Final Price, Savings, Effective Discount | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate the final price after a discount, the amount you save, and the effective discount when multiple discounts or tax apply. Free online discount calculator.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate a discount?', a: 'Multiply the original price by the discount percentage, then subtract from the original. For $100 at 20% off: 100 × 0.20 = $20 saved, final price $80.' },
    { q: 'How do stacked discounts work?', a: 'They multiply, not add. 20% off then 10% off is not 30% off — it is 1 − (1−0.20)(1−0.10) = 28% off. Same for "extra 10% off at checkout".' },
    { q: 'What is effective discount?', a: 'The combined discount after applying stacking and before tax. It tells you the real percentage saved compared to the original price.' },
    { q: 'How do I add tax after a discount?', a: 'Apply the discount first, then multiply by (1 + tax rate). Discounts apply to the pre-tax price in most jurisdictions.' },
    { q: 'How do I reverse a discount?', a: 'Divide the sale price by (1 − discount). A $80 item at 20% off came from 80 ÷ 0.80 = $100.' },
    { q: 'Do credit card rewards count as a discount?', a: 'Technically yes, but they are applied after checkout. Use this calculator for point-of-sale discounts; card rewards are separate.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Discount Calculator', description: 'Calculate final price, savings, and effective discount, including stacked discounts.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/discount-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero eyebrow="Free Tool" title="Discount Calculator" subtitle="Work out the final price, amount saved, and effective discount — including stacked discounts and tax." gradient="from-amber-500 via-orange-500 to-red-500" />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="discount" title="Discount Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <DiscountCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Black Friday & sales</li>
              <li>• Stacked store coupons</li>
              <li>• Trade / wholesale discounts</li>
              <li>• Reverse-engineer original price</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="How discounts work">
        <p>A discount is a reduction from the original price, usually expressed as a percentage. Single discounts are straightforward: multiply, subtract. Where it gets tricky is when stores stack discounts — "20% off, then extra 10% off". Those do not add up to 30%.</p>
        <p>This calculator handles the common cases: single discount, stacked discounts, and discounts plus tax. It shows the final price, the amount saved, and the effective discount percentage.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Sales Tax Calculator', href: '/sales-tax-calculator' },
          { name: 'Tip Calculator', href: '/tip-calculator' },
          { name: 'Percentage Calculator', href: '/percentage-calculator' },
          { name: 'Inflation Calculator', href: '/inflation-calculator' },
        ]} />
      </section>
    </div>
  )
}