import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import RentalYieldCalculator from '../../components/mortgage/RentalYieldCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'

export default function RentalYieldPage() {
  useEffect(() => {
    document.title = 'Investment Property Calculator 2026 Ã¢€\u201d Rental Yield, Cash Flow & DSCR | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free investment property calculator Ã¢€\u201d gross rental yield, net yield, cash flow, DSCR, cap rate, and 10-year projection. Works for any country.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'What is gross rental yield?', a: 'Gross rental yield is annual rental income divided by the property price, expressed as a percentage. Formula: (Annual Rent Ãƒ· Property Price) Ãƒ— 100. It ignores expenses Ã¢€\u201d useful for a quick comparison between properties.' },
    { q: 'What is net rental yield?', a: 'Net rental yield accounts for all operating expenses (rates, insurance, management fees, maintenance, vacancy) but not mortgage payments. It is the more accurate measure of a property\'s income potential. Net Yield = (Net Operating Income Ãƒ· Property Price) Ãƒ— 100.' },
    { q: 'What is a good rental yield?', a: 'Benchmarks: 3-4% is considered low (typical in expensive markets like Sydney and London), 4-6% is good, 6-8% is strong, and 8%+ is excellent (common in regional areas and emerging markets). The right target depends on your strategy Ã¢€\u201d high-growth areas often have lower yields.' },
    { q: 'What is DSCR and why does it matter?', a: 'DSCR (Debt Service Coverage Ratio) is Net Operating Income divided by annual mortgage payments. It measures whether the rental income covers the loan. Most lenders require DSCR Ã¢â€°¥ 1.25 for investment property loans. Our calculator shows yours instantly.' },
    { q: 'What is cash-on-cash return?', a: 'Cash-on-cash return measures the annual cash flow against the total cash you invested upfront (deposit + upfront costs). Formula: (Annual Cash Flow Ãƒ· Total Cash Invested) Ãƒ— 100. It tells you the return on your actual money, not the total property value.' },
    { q: 'Is negative gearing bad?', a: 'Not always. Negative cash flow (rent doesn\'t cover all costs) is common in high-growth markets. Investors accept short-term losses for long-term capital growth and tax deductions. The 10-year projection in our calculator shows the full picture.' },
    { q: 'How do I use this calculator across countries?', a: 'Select your currency from the dropdown. All values (price, rent, expenses) are then entered in that currency. The formulas are identical worldwide Ã¢€\u201d only the currency symbol changes.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">

      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: 'Investment Property', href: null },
      ]} />

      <Link to="/mortgage" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Mortgage Hub
      </Link>

      <MortgageHero
        eyebrow="Investment Property Tool"
        title="Investment Property Calculator"
        subtitle="Calculate gross rental yield, net yield, cash flow, DSCR, and a full 10-year projection for any rental property Ã¢€\u201d anywhere in the world."
        gradient="from-emerald-500 via-teal-500 to-cyan-500"
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Ã°Å¸Å’ Worldwide</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">10 currencies</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">DSCR included</span>
        </>}
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="rental-yield" title="Investment Property Rental Yield" />
      </div>

      <div className="mb-10">
        <RentalYieldCalculator defaultCurrency="AUD" />
      </div>

      <MortgageSeoContent title="How to evaluate an investment property">
        <p>Before buying an investment property, you need to answer four questions: How much rent will it earn? What will it cost to run? Will the rent cover the mortgage? And what will it be worth in 10 years? This calculator answers all four.</p>
        <p>Start with the property price and your deposit Ã¢€\u201d that determines your loan amount and monthly repayment. Then enter the rent (weekly, fortnightly, or monthly) and your expected vacancy weeks per year. Realistic vacancy assumptions are 2-4 weeks for most markets, higher in oversupplied areas.</p>
        <p>Next, enter your annual expenses: council rates, insurance, repairs, strata/body corporate fees, and property manager fees (typically 5-10% of collected rent). The calculator subtracts these plus the mortgage payment to give you the annual cash flow Ã¢€\u201d the number that determines whether the investment is positively or negatively geared.</p>
        <p>The DSCR (Debt Service Coverage Ratio) is critical for financing Ã¢€\u201d lenders usually want 1.25 or higher. If yours is below this, you may struggle to get an investment loan approved.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related mortgage tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'Borrowing Power', href: '/mortgage/australia/borrowing-power' },
          { name: 'Stamp Duty', href: '/mortgage/australia/stamp-duty' },
          { name: 'Offset Account', href: '/mortgage/australia/offset-account' },
          { name: 'All Mortgage Tools', href: '/mortgage' },
          { name: 'All Calculators', href: '/calculators' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
    </div>
  )
}