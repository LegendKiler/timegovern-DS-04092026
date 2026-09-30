import { useEffect } from 'react'
import UkStampDuty from '../../components/mortgage/uk/UkStampDuty'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent } from '../../components/mortgage/MortgageLayout'
import SaveCalculation from '../../components/SaveCalculation'

export default function UkStampDutyPage() {
  useEffect(() => {
    document.title = 'Stamp Duty Calculator UK 2026 — SDLT, LBTT, LTT | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'UK stamp duty calculator covering England (SDLT), Scotland (LBTT), and Wales (LTT), with first-time buyer relief and additional property surcharge.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'Are these UK mortgage rates current?', a: 'The default rates reflect average UK market rates in early 2026. Enter your actual quoted rate for accurate results.' },
    { q: 'Is it free?', a: 'Yes, completely free. No signup, no account required, no data stored.' },
    { q: 'How does UK stamp duty differ from US/AU?', a: 'UK stamp duty (SDLT in England, LBTT in Scotland, LTT in Wales) has different bands and surcharges per region. The calculator handles all three.' },
    { q: 'What is the additional property surcharge?', a: 'A 3-5% surcharge on top of standard SDLT for buy-to-let and second homes — increased to 5% in October 2024.' },
    { q: 'Do first-time buyers still get relief?', a: 'Yes. In England, first-time buyers pay 0% on the first £425,000 (up to £625,000 property value). Scotland has a separate £175,000 nil-rate band for FTBs.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageHero eyebrow="UK Mortgage Tool" title="UK Stamp Duty Calculator" subtitle="SDLT for England & NI, LBTT for Scotland, LTT for Wales — with first-time buyer relief." gradient="from-orange-500 via-amber-500 to-yellow-500" meta={<><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🇬🇧 United Kingdom</span><span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">2026 rates</span></>} />
      <div className="mb-10"><UkStampDuty />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug="uk" />
      </div></div>

      <MortgageSeoContent title="About this UK mortgage tool">
        <p>Built specifically for the UK market with current 2026 rates, standard repayment formulas, and regional rules for England, Scotland, and Wales.</p>
        <p>All calculations run in your browser. Nothing is sent to our servers. Use the results for planning and comparisons — confirm exact figures with your lender or a regulated mortgage broker.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related UK mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'UK Mortgage Hub', href: '/mortgage/uk' },
          { name: 'Repayment', href: '/mortgage/uk/repayment' },
          { name: 'Overpayment', href: '/mortgage/uk/overpayment' },
          { name: 'Stamp Duty', href: '/mortgage/uk/stamp-duty' },
          { name: 'Remortgage', href: '/mortgage/uk/remortgage' },
          { name: 'All Countries', href: '/mortgage' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}} />
    </div>
  )
}