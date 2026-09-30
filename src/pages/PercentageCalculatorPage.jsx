import { useEffect } from 'react'
import PercentageCalculator from '../components/calculators/PercentageCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function PercentageCalculatorPage() {
  useEffect(() => {
    document.title = 'Percentage Calculator — % of Number, % Change, % Difference | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free percentage calculator — find X% of Y, what percentage one number is of another, and percent increase or decrease instantly.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate a percentage of a number?', a: 'Multiply the number by the percentage, then divide by 100. For example, 15% of 200 = (15 × 200) / 100 = 30. Our calculator does this automatically when you use the "X% of Y" mode.' },
    { q: 'How do I find what percentage one number is of another?', a: 'Divide the first number by the second, then multiply by 100. For example, 30 is (30/150) × 100 = 20% of 150. Use the "X is what % of Y" mode.' },
    { q: 'How do I calculate percent increase or decrease?', a: 'Subtract the original from the new value, divide by the original, and multiply by 100. Use the "% increase/decrease" mode.' },
    { q: 'What about discounts and tips?', a: 'For a 20% tip on a $50 bill, use "20% of 50" = $10. For a discount, subtract the same result from the original price.' },
    { q: 'Does the calculator round?', a: 'Results are shown to 2 decimal places for precision.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <PageHero
        eyebrow="Free Tool"
        title="Percentage Calculator"
        subtitle="Three calculators in one — X% of Y, X is what % of Y, and percentage change between two values. Instant results, no signup."
        gradient="from-fuchsia-500 via-pink-500 to-rose-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="percentage" title="Percentage Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <PercentageCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Discounts & sales tax</li>
              <li>• Tips at restaurants</li>
              <li>• Grade percentages</li>
              <li>• Business growth %</li>
              <li>• Body fat / fitness metrics</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="Three percentage modes explained">
        <p><strong>X% of Y</strong> — The classic. Enter 15 in the first box and 200 in the second to get 30. Use this for tips, discounts, sales tax, commission, and any "percentage of" calculation.</p>
        <p><strong>X is what % of Y</strong> — Reverse percentages. Enter 30 and 150 to find out that 30 is 20% of 150. Use this for test scores, market share, or any ratio comparison.</p>
        <p><strong>% increase / decrease</strong> — Enter a starting value and an ending value to see the percentage change. Great for tracking growth, price changes, or performance metrics.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Hours Calculator', href: '/hours-calculator' },
          { name: 'Time Card Calculator', href: '/time-card-calculator' },
          { name: 'Age Calculator', href: '/age-calculator' },
          { name: 'All Calculators', href: '/calculators' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
    
      {/* Save button — added by Save Everywhere feature */}</div>
  )
}