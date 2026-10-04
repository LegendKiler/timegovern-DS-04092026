import { useEffect } from 'react'
import SimpleInterestCalculator from '../components/calculators/SimpleInterestCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function SimpleInterestCalculatorPage() {
  useEffect(() => {
    document.title = 'Simple Interest Calculator — I = PRT Formula | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate simple interest using the I = PRT formula. Find total interest, final amount, and rate for any principal, rate, and time period.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'What is simple interest?', a: 'Interest calculated only on the original principal — never on accumulated interest. Formula: I = P × R × T (principal × rate × time).' },
    { q: 'How is simple interest different from compound interest?', a: 'Compound interest earns interest on interest. Over long periods compound grows much faster. Simple interest is linear; compound is exponential.' },
    { q: 'What is the formula?', a: 'I = P × R × T. P = principal, R = annual rate (as a decimal), T = time in years. Total = P + I.' },
    { q: 'What is simple interest used for?', a: 'Car loans, short-term personal loans, some savings accounts, and simple business loans. Also the default method for legal judgements and certain tax calculations.' },
    { q: 'How do I find the rate if I know the interest?', a: 'R = I / (P × T). Rearranging the same formula gives you any missing variable.' },
    { q: 'How do I convert months to years?', a: 'Divide by 12. 6 months = 0.5 years. Enter decimal years in the time field.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Simple Interest Calculator', description: 'Calculate simple interest using the I = PRT formula.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/simple-interest-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero eyebrow="Free Tool" title="Simple Interest Calculator" subtitle="Calculate interest using the I = PRT formula — principal, rate, and time." gradient="from-blue-500 via-cyan-500 to-teal-500" />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="simple-interest" title="Simple Interest Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <SimpleInterestCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">The formula</div>
            <div className="text-sm font-mono p-3 bg-muted/50 rounded-lg text-center">
              I = P × R × T
            </div>
            <ul className="text-xs space-y-2 text-muted-foreground mt-3">
              <li>P = principal</li>
              <li>R = annual rate</li>
              <li>T = time in years</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="Simple interest vs compound interest">
        <p>Simple interest is calculated only on the initial principal. Compound interest is calculated on both the principal and any previously earned interest.</p>
        <p>The difference is dramatic over time. $10,000 at 5% for 30 years: simple interest yields $25,000 total ($10,000 + $15,000 interest). Compound interest yields over $43,000 — a 72% difference.</p>
        <p>Use simple interest for car loans, short-term personal loans, and legal calculations. Use compound interest for savings accounts, retirement, and long-term investments.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Compound Interest', href: '/compound-interest-calculator' },
          { name: 'ROI Calculator', href: '/roi-calculator' },
          { name: 'Loan Calculator', href: '/loan-calculator' },
          { name: 'Inflation Calculator', href: '/inflation-calculator' },
        ]} />
      </section>
    </div>
  )
}