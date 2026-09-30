import { useEffect } from 'react'
import InBalanceTransfer from '../../components/mortgage/in/InBalanceTransfer'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function InBalanceTransferPage() {
  useEffect(() => {
    document.title = 'Home Loan Balance Transfer Calculator India | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Indian home loan balance transfer calculator. Compare current EMI with new lender EMI plus fees.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How is EMI calculated in India?', a: 'EMI uses monthly compounding: EMI = P × r × (1+r)^n / [(1+r)^n − 1], where P = loan amount, r = annual rate / 12 / 100, and n = tenure in months. Indian banks follow this formula uniformly.' },
    { q: 'Is prepayment free on Indian home loans?', a: 'Yes. RBI mandates ZERO prepayment penalty on floating-rate home loans for individual borrowers (since 2014). Fixed-rate loans may have 1-2% penalty — check your agreement.' },
    { q: 'What is FOIR?', a: 'Fixed Obligation to Income Ratio — the percentage of monthly income a bank allows for total EMIs. Typical banks use 40-55% depending on income level. Higher income = higher FOIR allowed.' },
    { q: 'What are the tax benefits?', a: 'Old regime: Section 24(b) interest deduction up to ₹2 lakh, Section 80C principal up to ₹1.5 lakh. New regime (default): no home loan deductions.' },
    { q: 'How much down payment is required?', a: 'RBI caps LTV: 90% for loans up to ₹30 lakh, 80% for ₹30-75 lakh, 75% above ₹75 lakh. So minimum down payment is 10-25% depending on property price.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageHero eyebrow="Indian Mortgage Tool" title="Balance Transfer Calculator" subtitle="Switch to a lower-rate lender and see your monthly and lifetime savings." gradient="from-indigo-500 via-purple-500 to-pink-500" meta={<><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🇮🇳 India</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">2026 rates</span></>} />
      <div className="mb-10"><InBalanceTransfer />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="india" />
      </div></div>

      <MortgageSeoContent title="About this Indian home loan tool">
        <p>Built specifically for the Indian market with 2026 rates, RBI rules, and the monthly compounding EMI formula used uniformly by all Indian banks.</p>
        <p>All calculations run in your browser. Nothing is sent to our servers. Use the results for planning and comparisons — confirm exact figures with your bank or a licensed mortgage advisor.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related Indian home loan tools</h2>
        <RelatedMortgageTools items={[
          { name: 'India Mortgage Hub', href: '/mortgage/india' },
          { name: 'EMI Calculator', href: '/mortgage/india/emi' },
          { name: 'Prepayment', href: '/mortgage/india/prepayment' },
          { name: 'Balance Transfer', href: '/mortgage/india/balance-transfer' },
          { name: 'Eligibility', href: '/mortgage/india/eligibility' },
          { name: 'All Countries', href: '/mortgage' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}} />
    </div>
  )
}