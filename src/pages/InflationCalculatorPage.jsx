import { useEffect } from 'react'
import InflationCalculator from '../components/calculators/InflationCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function InflationCalculatorPage() {
  useEffect(() => {
    document.title = 'Inflation Calculator — Historical Value of Money by Country | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'See what any amount of money is worth after inflation. Uses live World Bank CPI data for 40+ countries. Free online inflation calculator.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate inflation?', a: 'Multiply the original amount by (1 + annual inflation rate) for each year. The result is the equivalent amount at the end of the period. Our calculator does this year by year using World Bank CPI data.' },
    { q: 'Where does the inflation data come from?', a: 'The World Bank Open Data API, indicator FP.CPI.TOTL.ZG — the Consumer Price Index inflation rate, published annually for every country.' },
    { q: 'How accurate is it?', a: 'Very accurate for historical periods where official CPI data exists. Actual purchasing power for a specific basket of goods may differ slightly based on your spending pattern.' },
    { q: 'Does inflation affect all countries the same?', a: 'No. Emerging markets often see 5-15% annual inflation, while developed economies typically see 2-3%. Hyperinflation periods (e.g. Zimbabwe, Argentina) can exceed 100% per year.' },
    { q: 'What is purchasing power?', a: 'Purchasing power is how much goods and services a unit of currency can buy. When inflation rises 3% in a year, purchasing power falls 3% — the same amount of money buys less.' },
    { q: 'Why 1000, not 100?', a: 'Larger base amounts make the inflation impact more obvious. You can enter any amount — the percentage change is the same.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Inflation Calculator', description: 'Calculate historical value of money using World Bank CPI data.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/inflation-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero eyebrow="Free Tool" title="Inflation Calculator" subtitle="See what any amount of money is worth after inflation — using live World Bank CPI data for 40+ countries." gradient="from-red-500 via-orange-500 to-amber-500" />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="inflation" title="Inflation Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <InflationCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Live data source</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• World Bank Open Data</li>
              <li>• Indicator: FP.CPI.TOTL.ZG</li>
              <li>• 40+ countries supported</li>
              <li>• Free, no API key required</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="What is inflation?">
        <p>Inflation is the rate at which prices for goods and services rise over time. When inflation is 3% per year, something that costs $100 today will cost $103 next year.</p>
        <p>This calculator uses official World Bank CPI data to show what any historical amount of money is worth today. Enter an amount, pick your country, and select a year range to see the effect of cumulative inflation.</p>
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
          { name: 'ROI Calculator', href: '/roi-calculator' },
          { name: 'Loan Calculator', href: '/loan-calculator' },
        ]} />
      </section>
    </div>
  )
}