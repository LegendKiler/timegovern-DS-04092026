import { useEffect } from 'react'
import OffsetAccount from '../../components/mortgage/OffsetAccount'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function OffsetAccountPage() {
  useEffect(() => {
    document.title = 'Offset Account Calculator Australia — Interest Savings | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Australian offset account calculator. See how much interest you save and how many years you shave off your home loan with an offset balance.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How does an offset account work in Australia?', a: 'An offset account is a transaction account linked to your home loan. The balance in the offset reduces the loan balance used to calculate interest, but your repayment stays the same. So more of your repayment goes to principal, and you pay the loan off faster.' },
    { q: 'How much interest can I save with a $100,000 offset?', a: 'On a $700,000 loan at 6.5% over 30 years, a $100,000 offset saves roughly $250,000-$300,000 in interest and cuts 5-7 years off the loan, depending on your loan structure.' },
    { q: 'Is an offset account worth the annual fee?', a: 'Usually yes, if you keep a meaningful balance (typically $20,000+). Offset accounts often come with a package fee of $300-$400/year — the interest savings usually exceed this within the first year.' },
    { q: 'Full offset vs partial offset — what is the difference?', a: 'A 100% offset account offsets the full balance against your loan. A partial offset only offsets a portion — check your lender\'s terms.' },
    { q: 'Does an offset account affect my tax?', a: 'For an owner-occupied loan, no tax implications. For an investment loan, the offset effectively reduces your deductible interest — so a redraw is often more tax-efficient than an offset for investors.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageHero
        eyebrow="Australian Mortgage Tool"
        title="Offset Account Calculator"
        subtitle="See exactly how much interest you save and how many years come off your home loan with an offset balance."
        gradient="from-violet-500 via-purple-500 to-fuchsia-500"
        meta={<><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🇦🇺 Australia</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Compares 3 scenarios</span></>}
      />

      <div className="mb-10"><OffsetAccount />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="australia" />
      </div></div>

      <MortgageSeoContent title="What is an offset account?">
        <p>An offset account is a savings or transaction account linked to your home loan. The balance in that account is subtracted from your loan balance when your lender calculates daily interest.</p>
        <p>For example: if you owe $700,000 and have $100,000 in an offset, you're only charged interest on $600,000 — but your repayment stays the same as if you owed the full $700,000. That means more of your repayment goes toward principal, so you pay off the loan faster.</p>
        <p>The three scenarios above show the difference between a base loan, an offset-only loan, and an offset + extra repayments loan. The savings grow with the size of your offset balance.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'Extra Repayment', href: '/mortgage/australia/extra-repayment' },
          { name: 'Stamp Duty Calculator', href: '/mortgage/australia/stamp-duty' },
          { name: 'LMI Calculator', href: '/mortgage/australia/lmi' },
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