import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SellVsRefinanceCalculator from '../../components/mortgage/SellVsRefinanceCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'

export default function SellVsRefinancePage() {
  useEffect(() => {
    document.title = 'Sell vs Refinance Calculator 2026 — Which Is Better? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free sell vs refinance calculator. Compare net proceeds from selling against cash-out refinance — including capital gains tax, depreciation recapture, and lifetime interest.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'What is the difference between selling and refinancing?', a: 'Selling realizes your equity as cash (triggering capital gains tax). Refinancing extracts cash as a new loan — tax-free — while you keep the property. The tax difference is often tens of thousands.' },
    { q: 'What is depreciation recapture?', a: 'In the US, if you depreciated an investment property, the IRS "recaptures" that depreciation at 25% when you sell. Most calculators ignore this — ours includes it.' },
    { q: 'What is the amortization reset penalty?', a: 'If you refinance into a new 30-year term, you reset the amortization clock. That adds years of interest payments compared to your remaining term. Our calculator shows the exact penalty.' },
    { q: 'Should I sell or refinance my investment property?', a: 'It depends on your goals. Selling gives immediate cash but triggers tax. Refinancing keeps the asset and cash flow but adds debt. Our 5-year projection shows which wins long-term.' },
    { q: 'Is cash-out refinance tax-free?', a: 'Yes — refinancing is a loan, not income. The cash you extract is tax-free (in most countries). Selling, however, may trigger capital gains tax on your gain.' },
    { q: 'What is the break-even point?', a: 'The number of months until the refinance path\'s lower payments (if any) recover the difference in upfront cash. Under 60 months is usually a strong refinance case.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: 'Sell vs Refinance', href: null },
      ]} />

      <Link to="/mortgage" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Mortgage Hub
      </Link>

      <MortgageHero
        eyebrow="Decision Tool"
        title="Sell vs Refinance Calculator"
        subtitle="Compare net proceeds from selling against cash-out refinance — including capital gains tax, depreciation recapture, and lifetime interest."
        gradient="from-emerald-500 via-teal-500 to-cyan-500"
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">24 countries</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Tax-aware</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">5-year projection</span>
        </>}
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="sell-vs-refinance" title="Sell vs Refinance Calculation" />
      </div>

      <div className="mb-10">
        <SellVsRefinanceCalculator defaultCurrency="AUD" />
      </div>

      <MortgageSeoContent title="When should you sell vs refinance?">
        <p>Most homeowners with equity face a choice: cash out by selling, or cash out by refinancing. The two paths have very different tax and cash flow implications.</p>
        <p><strong>Selling</strong> gives you immediate net cash after paying off the mortgage, selling costs, and capital gains tax. You walk away clean.</p>
        <p><strong>Refinancing</strong> gives you tax-free cash (it's a loan), but you keep the property and increase your mortgage. You also extend the amortization, which adds years of interest.</p>
        <p>Our calculator runs both scenarios side by side — including depreciation recapture, amortization reset penalty, and a 5-year projection so you can see which path wins.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'Refinance Calculator', href: '/mortgage/usa/refinance' },
          { name: 'Rental Yield Calculator', href: '/mortgage/australia/rental-yield' },
          { name: 'First Home Buyer', href: '/mortgage/australia/first-home-buyer' },
          { name: 'All Mortgage Tools', href: '/mortgage' },
        ]} />
      </section>
    </div>
  )
}