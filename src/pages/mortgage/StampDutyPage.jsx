import { useEffect } from 'react'
import StampDuty from '../../components/mortgage/StampDuty'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function StampDutyPage() {
  useEffect(() => {
    document.title = 'Stamp Duty Calculator Australia 2026 — All 8 States | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Australian stamp duty calculator for all 8 states and territories. Includes first home buyer exemptions and foreign buyer surcharges.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How is stamp duty calculated in Australia?', a: 'Stamp duty (also called transfer duty or land transfer duty) is a state-based tax on property purchases. Each state has its own bracket table — the higher the property price, the higher the marginal rate. The calculator shows the exact duty for your purchase price and state.' },
    { q: 'Which state has the cheapest stamp duty?', a: 'For a $700,000 property, the cheapest states are typically ACT (~$24,000) and QLD (~$24,500). NSW and VIC are the most expensive at roughly $27,000-$30,000.' },
    { q: 'Do first home buyers pay stamp duty?', a: 'It depends on the state and the price. Most states offer full exemption below a threshold (e.g. NSW $800,000, VIC $600,000) and a concession up to a higher cap. Use the "First home buyer" toggle above to see your saving.' },
    { q: 'What is the foreign buyer surcharge?', a: 'Most states charge an extra 7-9% surcharge on top of standard stamp duty for foreign buyers. NSW is highest at 9%, followed by VIC, QLD, SA, and WA at 7-8%.' },
    { q: 'When is stamp duty paid?', a: 'In most states, stamp duty is paid at settlement (typically 30-90 days after exchange). Some states require payment within 3 months of exchange.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageHero
        eyebrow="Australian Property Tax"
        title="Stamp Duty Calculator"
        subtitle="Calculate transfer duty for any property in Australia — all 8 states and territories, with first home buyer exemptions and foreign buyer surcharges."
        gradient="from-orange-500 via-amber-500 to-red-500"
        meta={<><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🇦🇺 8 states</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">FHB exemptions</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Foreign surcharge</span></>}
      />

      <div className="mb-10"><StampDuty />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="australia" />
      </div></div>

      <MortgageSeoContent title="Stamp duty in Australia — 2026 rates">
        <p>Stamp duty is one of the biggest upfront costs when buying property in Australia. Unlike income tax, it's a one-off state-based tax paid at settlement. Rates vary significantly between states, so where you buy matters as much as how much you spend.</p>
        <p>The calculator above uses the current 2026-27 bracket tables for all 8 states and territories. Toggle "First home buyer" to see the exempt or concession threshold for your state. Toggle "Foreign buyer" to add the additional surcharge.</p>
        <p>Tip: If you're close to a threshold (e.g. $800,000 in NSW for FHB exemption), even a small change in the price can wipe out tens of thousands in savings.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'LMI Calculator', href: '/mortgage/australia/lmi' },
          { name: 'First Home Guarantee', href: '/mortgage/australia/first-home-guarantee' },
          { name: 'Borrowing Power', href: '/mortgage/australia/borrowing-power' },
          { name: 'All Australian Tools', href: '/mortgage/australia' },
          { name: 'Mortgage Home', href: '/mortgage' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
    </div>
  )
}