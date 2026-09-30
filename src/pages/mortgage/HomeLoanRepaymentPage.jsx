import { useEffect } from 'react'
import HomeLoanRepayment from '../../components/mortgage/HomeLoanRepayment'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, StatBox, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function HomeLoanRepaymentPage() {
  useEffect(() => {
    document.title = 'Home Loan Repayment Calculator Australia 2026 | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free Australian home loan repayment calculator. Calculate weekly, fortnightly, or monthly repayments and total interest over your loan term.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How are Australian home loan repayments calculated?', a: 'Repayments are calculated using principal and interest (P&I) amortization. Your fixed repayment covers both interest on the outstanding balance and principal reduction. The formula is: P × r × (1+r)^n / [(1+r)^n − 1] where P = loan amount, r = monthly rate, n = total payments.' },
    { q: 'Is it better to pay weekly, fortnightly, or monthly?', a: 'Fortnightly and weekly payments reduce interest faster because you make 26 or 52 smaller payments per year instead of 12 larger ones — effectively an extra monthly repayment each year. The savings are modest but meaningful over 30 years.' },
    { q: 'What interest rate should I use?', a: 'Use your actual loan rate from your lender. For estimates, use the current market rate (typically 6-6.5% for owner-occupier P&I in 2026). Add 0.5% for an investment loan or if you have a low deposit.' },
    { q: 'Does this include fees and charges?', a: 'No — the calculator shows principal and interest only. Add your annual package fee (typically $300-$400), plus stamp duty, LMI, and other upfront costs separately.' },
    { q: 'How much can I save by making extra repayments?', a: 'Even $100 extra per month on a $700,000 loan at 6.5% can save over $100,000 in interest and cut 3-4 years off a 30-year term. Use our Offset Account or Extra Repayment calculators for exact numbers.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
            <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: 'Australia', href: '/mortgage/australia' },
        { label: 'Home Loan Repayment', href: null },
      ]} />
<MortgageHero
        eyebrow="Australian Mortgage Tool"
        title="Home Loan Repayment Calculator"
        subtitle="Calculate your weekly, fortnightly, or monthly home loan repayments and see the total interest over the life of your loan."
        gradient="from-emerald-500 via-teal-500 to-cyan-500"
        meta={<><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🇦🇺 Australia</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">P&amp;I formula</span></>}
      />

      <div className="mb-10">
        <HomeLoanRepayment />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="australia" />
      </div>
      </div>

      <MortgageSeoContent title="How Australian home loan repayments work">
        <p>Australian home loans use principal and interest (P&amp;I) amortization — the same model used in the US, UK, and Canada. Your monthly repayment is set at the start of the loan and stays the same (unless you refinance or your rate changes on a variable loan).</p>
        <p>In the early years, most of your repayment goes to interest. As the balance drops, a larger share goes to principal. By the end of the loan, you're mostly paying principal. Use the amortization table below the calculator to see the split, year by year.</p>
        <p>Fixed vs variable: fixed loans lock your rate for 1-5 years; variable loans move with the RBA cash rate. Most Australian borrowers split between the two.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Offset Account Calculator', href: '/mortgage/australia/offset-account' },
          { name: 'Stamp Duty Calculator', href: '/mortgage/australia/stamp-duty' },
          { name: 'LMI Calculator', href: '/mortgage/australia/lmi' },
          { name: 'Extra Repayment Calculator', href: '/mortgage/australia/extra-repayment' },
          { name: 'Borrowing Power Calculator', href: '/mortgage/australia/borrowing-power' },
          { name: 'All Australian Tools', href: '/mortgage/australia' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
    </div>
  )
}