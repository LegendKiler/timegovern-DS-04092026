import { useEffect } from 'react'
import RoiCalculator from '../components/calculators/RoiCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function RoiCalculatorPage() {
  useEffect(() => {
    document.title = 'ROI Calculator — Return on Investment with CAGR | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate return on investment (ROI) and compound annual growth rate (CAGR) from any initial and final value. Free, instant, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'What is ROI?', a: 'Return on Investment — the percentage gain or loss relative to the amount invested. Formula: (final − initial) / initial × 100.' },
    { q: 'What is CAGR?', a: 'Compound Annual Growth Rate — the smoothed annual rate that takes you from the initial value to the final value over the holding period. It accounts for compounding.' },
    { q: 'What is a good ROI?', a: 'The S&P 500 has averaged about 10% per year over the long run (7% after inflation). Anything above that consistently is considered good. Real estate, small business, and venture investments carry higher risk and often higher returns.' },
    { q: 'How is CAGR different from average return?', a: 'CAGR is the geometric mean — it accounts for compounding. Average return is arithmetic. If you gain 50% then lose 50%, average is 0% but CAGR is −13.4%.' },
    { q: 'Does ROI include fees?', a: 'Not unless you enter the net final value. If you have trading fees or management fees, subtract them from the final value before entering.' },
    { q: 'How do I calculate annualised ROI?', a: 'Use the CAGR field. Enter the holding period in years, and CAGR shows the equivalent yearly rate that matches your total ROI.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'ROI Calculator', description: 'Calculate return on investment and CAGR from any initial and final value.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/roi-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero eyebrow="Free Tool" title="ROI Calculator" subtitle="Calculate return on investment and compound annual growth rate (CAGR) from any initial and final value." gradient="from-emerald-500 via-green-500 to-teal-500" />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="roi" title="ROI Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <RoiCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Stock & ETF performance</li>
              <li>• Real estate returns</li>
              <li>• Business investments</li>
              <li>• Project payback analysis</li>
              <li>• Portfolio comparison</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="What is ROI?">
        <p>Return on Investment measures how much you gained (or lost) relative to what you put in. It is the simplest performance metric and works for any investment — stocks, real estate, a small business, or a marketing campaign.</p>
        <p>Simple ROI does not account for time. That is where CAGR comes in: it converts the total return into an equivalent annual rate, so you can fairly compare a 5-year investment against a 10-year one.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Compound Interest', href: '/compound-interest-calculator' },
          { name: 'Simple Interest', href: '/simple-interest-calculator' },
          { name: 'Inflation Calculator', href: '/inflation-calculator' },
          { name: 'Loan Calculator', href: '/loan-calculator' },
        ]} />
      </section>
    </div>
  )
}