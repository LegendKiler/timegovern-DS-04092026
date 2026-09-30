import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import HomeEquityCalculator from '../../components/mortgage/HomeEquityCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'

export default function HomeEquityPage() {
  useEffect(() => {
    document.title = 'Home Equity Calculator 2026 — How Much Can You Borrow? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free home equity calculator. Find your tappable equity, compare HELOC vs home equity loan vs cash-out refinance, and see 15-year equity growth with country-specific tax rules.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'What is home equity?', a: 'Home equity is the difference between your property value and what you owe on the mortgage. If your home is worth $500,000 and you owe $300,000, you have $200,000 in equity.' },
    { q: 'What is tappable equity?', a: 'Tappable equity is the portion you can actually borrow against, typically up to 80% of your property value minus your mortgage balance. Lenders use this to determine how much you can access.' },
    { q: 'What is the difference between HELOC, home equity loan, and cash-out refinance?', a: 'A HELOC is a revolving line of credit you draw from as needed. A home equity loan is a fixed lump sum with fixed payments. Cash-out refinance replaces your entire mortgage with a larger one, giving you the difference in cash.' },
    { q: 'Is home equity interest tax-deductible?', a: 'It depends on your country and what you use the funds for. In the US, interest is deductible if used to buy, build, or improve the home. In Australia, only if used for investment purposes. See our country-specific calculator.' },
    { q: 'How much can I borrow against my home?', a: 'Most lenders allow you to borrow up to 80% of your property value (some go to 85-90% with conditions). Subtract your current mortgage from that amount — that is your tappable equity.' },
    { q: 'Can I access equity without refinancing?', a: 'Yes — a HELOC or home equity loan lets you access equity without touching your existing mortgage rate or term. This is often cheaper than a full refinance if your current rate is low.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: 'Home Equity', href: null },
      ]} />

      <Link to="/mortgage" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Mortgage Hub
      </Link>

      <MortgageHero
        eyebrow="Equity Tool"
        title="Home Equity Calculator"
        subtitle="Find your tappable equity, compare HELOC vs home equity loan vs cash-out refinance, and see 15-year equity growth with country-specific tax rules."
        gradient="from-emerald-500 via-teal-500 to-cyan-500"
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">24 countries</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Tax-aware</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">15-year projection</span>
        </>}
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="home-equity" title="Home Equity Calculation" />
      </div>

      <div className="mb-10">
        <HomeEquityCalculator defaultCurrency="AUD" />
      </div>

      <MortgageSeoContent title="How to access your home equity">
        <p>Home equity is one of the most valuable assets for most homeowners. But how you access it matters — three products (HELOC, home equity loan, cash-out refinance) each have different rates, terms, and tax implications.</p>
        <p>Our calculator shows all three side by side, plus a 15-year equity projection so you can see how your position grows over time.</p>
        <p>Tax deductibility depends on your country and use case — we apply the correct rules automatically when you select your currency.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Sell vs Refinance', href: '/mortgage/australia/sell-vs-refinance' },
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'Offset Account', href: '/mortgage/australia/offset-account' },
          { name: 'Rental Yield Calculator', href: '/mortgage/australia/rental-yield' },
          { name: 'All Mortgage Tools', href: '/mortgage' },
        ]} />
      </section>
    </div>
  )
}