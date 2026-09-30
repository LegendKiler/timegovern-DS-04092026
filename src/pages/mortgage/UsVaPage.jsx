import { useEffect } from 'react'
import UsVa from '../../components/mortgage/us/UsVa'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function UsVaPage() {
  useEffect(() => {
    document.title = 'VA Loan Calculator 2026 — 0% Down, No PMI | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'VA loan calculator with funding fee (2.15% first use, 3.3% subsequent). No down payment, no PMI ever.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How accurate is this calculator?', a: 'It uses the standard US mortgage formula and current 2026 rates. Your bank may apply slightly different terms based on credit score, property type, and lender policy.' },
    { q: 'Is it free?', a: 'Yes, completely free. No signup required, no data stored.' },
    { q: 'What is PITI?', a: 'PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a typical US mortgage payment.' },
    { q: 'Does this work for investment properties?', a: 'The math is the same but investment property rates are typically 0.5-1% higher. Use a higher rate in the calculator.' },
    { q: 'Do I need a specific credit score?', a: 'Conventional loans typically require 620+, FHA 500-580+, VA no minimum but lenders usually want 620+.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageHero eyebrow="US Mortgage Tool" title="VA Loan Calculator" subtitle="0% down, no PMI, with the VA funding fee built in. For eligible veterans and service members." gradient="from-blue-700 via-indigo-700 to-purple-700" meta={<><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🇺🇸 United States</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">2026 rates</span></>} />
      <div className="mb-10"><UsVa />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="usa" />
      </div></div>

      <MortgageSeoContent title="About this US mortgage tool">
        <p>Built specifically for the US market with current 2026 rates, standard amortization formulas, and local terminology (PITI, PMI, MIP, FHA, VA).</p>
        <p>All calculations run in your browser. Nothing is sent to our servers. Use the results for planning and comparisons — confirm exact figures with your lender.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related US mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'US Mortgage Hub', href: '/mortgage/usa' },
          { name: 'Amortization', href: '/mortgage/usa/amortization' },
          { name: 'Bi-Weekly Payment', href: '/mortgage/usa/biweekly' },
          { name: 'PMI Calculator', href: '/mortgage/usa/pmi' },
          { name: 'Refinance', href: '/mortgage/usa/refinance' },
          { name: 'All Countries', href: '/mortgage' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}} />
    </div>
  )
}