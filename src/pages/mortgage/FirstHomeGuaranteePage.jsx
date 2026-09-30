import { useEffect } from 'react'
import FirstHomeGuarantee from '../../components/mortgage/FirstHomeGuarantee'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function FirstHomeGuaranteePage() {
  useEffect(() => {
    document.title = 'First Home Guarantee Calculator Australia | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Check eligibility for the Australian First Home Guarantee scheme. Save LMI with a 5% deposit.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How is this calculator different from a standard mortgage calculator?', a: 'This calculator is built specifically for the Australian market and uses local conventions including ATO rates, state-based rules, and Australian lending practices. It gives more accurate results than generic international tools.' },
    { q: 'Are the results accurate?', a: 'The calculations use the standard formulas published by the ATO, state revenue offices, and Australian lenders. Results are indicative — your bank may apply slightly different rules. Always confirm with your lender or a licensed broker.' },
    { q: 'Is it free?', a: 'Yes, completely free. No signup, no account required. Just enter your numbers and see instant results.' },
    { q: 'Can I use it on mobile?', a: 'Yes. The calculator is fully responsive and works on phones, tablets, and desktops.' },
    { q: 'Do you store my data?', a: 'No. All calculations run in your browser. Nothing is sent to our servers or stored.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageHero eyebrow="Australian Mortgage Tool" title="First Home Guarantee Calculator" subtitle="Check eligibility for the government's 5% deposit scheme and see how much LMI you save." gradient="from-teal-500 via-emerald-500 to-cyan-500" />
      <div className="mb-10"><FirstHomeGuarantee />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="australia" />
      </div></div>

      <MortgageSeoContent title="About this calculator">
        <p>This tool is designed for Australian home buyers, investors, and homeowners who want quick, accurate answers without a finance degree. Enter your numbers and see instant results.</p>
        <p>All calculations use standard Australian formulas. Where ATO rates or state government rules apply, they're built into the calculator so you get accurate results for your situation.</p>
        <p>Remember: this tool provides estimates only. Before making any financial decision, speak with a licensed mortgage broker, financial adviser, or your lender.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'Offset Account', href: '/mortgage/australia/offset-account' },
          { name: 'Stamp Duty', href: '/mortgage/australia/stamp-duty' },
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