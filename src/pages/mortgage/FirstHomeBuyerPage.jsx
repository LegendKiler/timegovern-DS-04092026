import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FirstHomeBuyerCalculator from '../../components/mortgage/FirstHomeBuyerCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'

export default function FirstHomeBuyerPage() {
  useEffect(() => {
    document.title = 'First Home Buyer Calculator 2026 — Total Government Support | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free first home buyer calculator. Stack stamp duty exemptions, government grants, Home Guarantee, and FHSS into one number. Works for 24 countries.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'What government support is available for first home buyers?', a: 'It depends on your country. In Australia: Home Guarantee (5% deposit, no LMI), First Home Owner Grant (state-based), stamp duty concessions, and the First Home Super Saver scheme. In the US: FHA, VA, USDA, and state-level grants. In the UK: Lifetime ISA and Shared Ownership. Our calculator stacks these into one total.' },
    { q: 'What is the Home Guarantee and how much LMI does it save?', a: 'The Australian Home Guarantee lets first home buyers purchase with just 5% deposit and no Lenders Mortgage Insurance. On a $750,000 purchase that saves $20,000-$30,000 in LMI alone — often more valuable than any cash grant.' },
    { q: 'Why does stamp duty saving matter so much?', a: 'Stamp duty is one of the biggest upfront costs. First home buyer concessions can reduce it to $0. In NSW, buying at $750,000 as a first home buyer saves $29,000+. In the UK, first-time buyers pay no SDLT on the first £425,000 — saving up to £6,250.' },
    { q: 'Can I combine multiple schemes?', a: 'Yes — and this is where our calculator shines. Most buyers can stack a government grant + stamp duty concession + Home Guarantee (LMI waiver) + FHSS release. No single government page adds these together.' },
    { q: 'How does the First Home Super Saver (FHSS) scheme work?', a: 'You make voluntary contributions into your super (up to $15,000/year, $50,000 total), and can release them for a home deposit. Because contributions are taxed at 15% (vs your marginal rate), you save on tax. Our calculator estimates how much you can release.' },
    { q: 'Do I need a 20% deposit?', a: 'No. With the Home Guarantee (AU), FHA (US), or Help to Buy (UK), you can buy with as little as 3-5% deposit. Our calculator shows you the minimum required vs standard 20%.' },
    { q: 'What if I don\'t qualify for any schemes?', a: 'You can still buy with the standard 20% deposit. If you have less, you\'ll typically pay LMI (AU) or PMI (US). Our calculator shows all scenarios so you can plan.' }]

  return (
    <div className="container mx-auto p-4 max-w-5xl">

      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: 'First Home Buyer', href: null }]} />

      <Link to="/mortgage" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Mortgage Hub
      </Link>

      <MortgageHero
        eyebrow="First Home Buyer Tool"
        title="First Home Buyer Calculator"
        subtitle="Stack every government scheme — stamp duty concession, grant, Home Guarantee (LMI waiver), and FHSS — into one total. Works for 24 countries."
        gradient="from-emerald-500 via-teal-500 to-cyan-500"
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">🌏 24 countries</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Scheme stacking</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Eligibility check</span>
        </>}
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="first-home-buyer" title="First Home Buyer Calculation" />
      </div>

      <div className="mb-10">
        <FirstHomeBuyerCalculator defaultCurrency="AUD" />
      </div>

      <MortgageSeoContent title="How much support can first home buyers get?">
        <p>First home buyer support is fragmented. A typical buyer needs to check: the Home Guarantee scheme (federal), the First Home Owner Grant (state), stamp duty concession (state), and the First Home Super Saver (federal). No single government page adds these up.</p>
        <p>Our calculator does the stacking for you. Enter your property price, income, and current savings, and it returns the total government support you can claim — stamp duty saved, grant amount, LMI waived, and FHSS release.</p>
        <p>It also runs an eligibility check against each scheme's rules, so you can see at a glance which ones apply to your situation.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'Stamp Duty Calculator', href: '/mortgage/australia/stamp-duty' },
          { name: 'Borrowing Power', href: '/mortgage/australia/borrowing-power' },
          { name: 'LMI Calculator', href: '/mortgage/australia/lmi' },
          { name: 'Rental Yield Calculator', href: '/mortgage/australia/rental-yield' },
          { name: 'All Mortgage Tools', href: '/mortgage' }]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
    </div>
  )
}