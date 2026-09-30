import { useEffect } from 'react'
import CaMortgagePayment from '../../components/mortgage/ca/CaMortgagePayment'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function CaMortgagePaymentPage() {
  useEffect(() => {
    document.title = 'Canadian Mortgage Payment Calculator 2026 — Semi-Annual Compounding | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free Canadian mortgage calculator with semi-annual compounding, CMHC insurance, and accelerated bi-weekly payment comparison.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'Why does Canadian mortgage math differ from US calculators?', a: 'Canadian fixed-rate mortgages compound semi-annually (Interest Act), not monthly. A 4.79% rate gives a monthly periodic rate of ~0.3946% vs 0.3992% for a US-style monthly compound. Over 25 years that gap matters by thousands of dollars.' },
    { q: 'What is the difference between term and amortization?', a: 'Amortization is how long the loan takes to fully repay (usually 25 years). Term is how long your rate is locked (usually 5 years). At renewal you negotiate a new rate — the payment isn\'t fixed for the whole loan.' },
    { q: 'Is CMHC insurance mandatory?', a: 'Yes, if your down payment is under 20% (LTV over 80%). Premium is 4.00% at 95% LTV, 3.10% at 90%, 2.80% at 85%. It\'s added to your mortgage balance and you pay interest on it.' },
    { q: 'What is the OSFI stress test?', a: 'You must qualify at the higher of your contract rate +2% or 5.25% floor. This reduces your max mortgage but protects against rate rises at renewal.' },
    { q: 'Do I need to switch lenders at renewal?', a: 'No. Staying with your lender avoids re-qualifying for the stress test. Shopping around may get a lower rate but you must re-qualify if you switch.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageHero eyebrow="Canadian Mortgage Tool" title="Canadian Mortgage Payment Calculator" subtitle="Monthly, bi-weekly, and accelerated payments with semi-annual compounding and CMHC insurance built in." gradient="from-red-500 via-rose-500 to-pink-500" meta={<><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🇨🇦 Canada</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">2026 rates</span></>} />
      <div className="mb-10"><CaMortgagePayment />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="canada" />
      </div></div>

      <MortgageSeoContent title="About this Canadian mortgage tool">
        <p>Built specifically for the Canadian market with 2026 rates, semi-annual compounding required by the Interest Act, and CMHC default insurance rules.</p>
        <p>All calculations run in your browser. Nothing is sent to our servers. Use the results for planning and comparisons — confirm exact figures with your lender or a licensed mortgage broker.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related Canadian mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Canada Mortgage Hub', href: '/mortgage/canada' },
          { name: 'CMHC Insurance', href: '/mortgage/canada/cmhc-insurance' },
          { name: 'Affordability', href: '/mortgage/canada/affordability' },
          { name: 'Accelerated Bi-Weekly', href: '/mortgage/canada/bi-weekly-accelerated' },
          { name: 'Renewal Calculator', href: '/mortgage/canada/renewal' },
          { name: 'All Countries', href: '/mortgage' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}} />
    </div>
  )
}