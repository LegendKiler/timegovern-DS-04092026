import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import HomeEquityCalculator from '../../components/mortgage/HomeEquityCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'
import CalculatorSidebar from '../../components/mortgage/CalculatorSidebar'

const COUNTRY_HE = {
  australia: { name: 'Australia', currency: 'AUD', hub: 'australia', gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    taxNote: 'Interest is tax-deductible only if the borrowed funds are used for investment purposes. Not deductible for personal use.',
    faqs: [
      { q: 'How much equity can I access in Australia?', a: 'Most Australian lenders allow up to 80% LTV without LMI. Some go to 90% with lenders mortgage insurance. Subtract your mortgage from the 80% cap to find your tappable equity.' },
      { q: 'Is home equity interest tax-deductible in Australia?', a: 'Only if the borrowed funds are used for investment (e.g., buying an investment property or shares). Personal use is not deductible.' },
      { q: 'What is the difference between redraw and a home equity loan?', a: 'Redraw accesses extra payments you have already made on your mortgage. A home equity loan is new borrowing against your equity. Redraw is usually free; a home equity loan has new interest.' },
    ] },
  usa: { name: 'United States', currency: 'USD', hub: 'usa', gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    taxNote: 'Interest deductible if used to buy, build, or substantially improve the home, up to $750K of total mortgage debt.',
    faqs: [
      { q: 'Is HELOC interest tax-deductible in the US?', a: 'Yes, if you use the funds to buy, build, or substantially improve the home that secures the loan. Personal expenses like cars or credit cards are not deductible.' },
      { q: 'What is the maximum I can borrow?', a: 'Most HELOC lenders allow up to 80-85% combined LTV. On a $500,000 home with a $300,000 mortgage, you could typically borrow up to $100,000-$125,000.' },
      { q: 'HELOC vs home equity loan vs cash-out refi?', a: 'HELOC is variable, flexible, interest-only during draw. Home equity loan is fixed-rate, fixed term. Cash-out refi replaces your whole mortgage — best when rates are lower than your current one.' },
    ] },
  uk: { name: 'United Kingdom', currency: 'GBP', hub: 'uk', gradient: 'from-red-500 via-rose-500 to-pink-500',
    taxNote: 'Interest on homeowner loans is generally not tax-deductible for personal use. Deductible for buy-to-let investment properties (with Section 24 restrictions).',
    faqs: [
      { q: 'How do I release equity from my UK home?', a: 'Options include a further advance from your current lender, a remortgage with equity release, a homeowner loan (second charge), or a lifetime mortgage (age 55+).' },
      { q: 'Is UK home equity interest tax-deductible?', a: 'Not for personal use. For buy-to-let properties, some relief is available but Section 24 restricts the deduction to a 20% tax credit.' },
    ] },
  canada: { name: 'Canada', currency: 'CAD', hub: 'canada', gradient: 'from-red-500 via-rose-500 to-orange-500',
    taxNote: 'Interest is not deductible for personal use, but IS deductible if the borrowed funds are invested (Smith Manoeuvre strategy).',
    faqs: [
      { q: 'What is a readvanceable mortgage?', a: 'A Canadian mortgage that combines a traditional mortgage with a HELOC in one product. As you pay down principal, your HELOC limit increases automatically.' },
      { q: 'Is home equity interest tax-deductible in Canada?', a: 'Only if the funds are used for investment purposes (the Smith Manoeuvre). Personal use is not deductible.' },
    ] },
  india: { name: 'India', currency: 'INR', hub: 'india', gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    taxNote: 'Interest deductible for business or investment use. For Loan Against Property used for home purchase, Section 24 and 80EEA deductions may apply.',
    faqs: [
      { q: 'What is a Loan Against Property (LAP) in India?', a: 'A secured loan against your residential or commercial property, typically up to 65-70% of market value. Interest rates are lower than personal loans.' },
      { q: 'Is LAP interest tax-deductible?', a: 'Yes, if the funds are used for business or investment. For home purchase, Section 24 and 80EEA deductions may apply.' },
    ] },
  singapore: { name: 'Singapore', currency: 'SGD', hub: 'asia-pacific', gradient: 'from-red-500 via-white to-red-500',
    taxNote: 'Interest on home loans is generally not tax-deductible for personal or investment property.',
    faqs: [
      { q: 'How do I access home equity in Singapore?', a: 'Options include term loans, overdraft facilities, or refinancing. There is no traditional HELOC product in Singapore.' },
      { q: 'Is home loan interest tax-deductible?', a: 'No — Singapore does not allow deduction of home loan interest against income.' },
    ] },
  malaysia: { name: 'Malaysia', currency: 'MYR', hub: 'asia-pacific', gradient: 'from-blue-600 via-yellow-400 to-red-600',
    taxNote: 'Interest is tax-deductible if the property is rented out and generates taxable income.',
    faqs: [
      { q: 'Can I refinance to access equity in Malaysia?', a: 'Yes — cash-out refinancing is common. Most banks allow up to 90% LTV for residential properties.' },
      { q: 'Is interest tax-deductible?', a: 'Yes, if the property is rented out and the interest relates to generating rental income.' },
    ] },
  japan: { name: 'Japan', currency: 'JPY', hub: 'asia-pacific', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Interest is tax-deductible for rental properties. For primary residence, a tax credit (not deduction) may apply for the first 10-13 years.',
    faqs: [
      { q: 'Can foreigners access home equity in Japan?', a: 'Yes, with permanent residency. Without PR, options are limited but some banks (Suruga, Shinsei) lend to foreign residents.' },
      { q: 'Is Japanese home loan interest tax-deductible?', a: 'For rental properties, yes. For primary residence, a tax credit (Jyusyo loan) applies instead of a deduction.' },
    ] },
  indonesia: { name: 'Indonesia', currency: 'IDR', hub: 'asia-pacific', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Interest on personal home loans is generally not tax-deductible.',
    faqs: [
      { q: 'How do I access home equity in Indonesia?', a: 'Options include KPR refinancing, top-up mortgages, or a new loan against the property. Most banks allow up to 80% LTV.' },
      { q: 'Is interest tax-deductible?', a: 'Generally no for personal use. Business or investment use may qualify.' },
    ] },
  pakistan: { name: 'Pakistan', currency: 'PKR', hub: 'asia-pacific', gradient: 'from-green-700 via-white to-green-700',
    taxNote: 'Interest deductible for business or investment purposes. Filer status affects deduction benefits.',
    faqs: [
      { q: 'Can I access home equity in Pakistan?', a: 'Yes — most banks offer Home Equity Loans or Personal Loans secured against property. Up to 50-60% of property value.' },
      { q: 'Is interest tax-deductible?', a: 'Yes, if used for business or investment purposes. Tax filers get more benefits than non-filers.' },
    ] },
  france: { name: 'France', currency: 'EUR', hub: 'europe', gradient: 'from-blue-600 via-white to-red-600',
    taxNote: 'Interest deductible for rental properties. Not deductible for primary residence.',
    faqs: [
      { q: 'How do I access equity in France?', a: 'Options include rachat de credit (refinance), pret travaux (renovation loan), or credit immobilier (second mortgage).' },
      { q: 'Is French mortgage interest tax-deductible?', a: 'For rental properties, yes — the interest is deductible against rental income. Not for primary residence.' },
    ] },
  germany: { name: 'Germany', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-yellow-500 to-black',
    taxNote: 'Interest is tax-deductible if the property is let. Not deductible for owner-occupied primary residence.',
    faqs: [
      { q: 'How do I access home equity in Germany?', a: 'A Zweitkredit (second loan) or Umschuldung (refinance). Most German banks allow up to 80% LTV for second-charge loans.' },
      { q: 'Is interest tax-deductible in Germany?', a: 'Only for rental properties. Primary residence interest is not deductible.' },
    ] },
  spain: { name: 'Spain', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-yellow-500 to-red-600',
    taxNote: 'Interest deductible for rental properties. Primary residence has limited deductions.',
    faqs: [
      { q: 'How do I access home equity in Spain?', a: 'Hipoteca de ampliación (extended mortgage) or segunda hipoteca (second mortgage). Up to 80% LTV for residents.' },
      { q: 'Is Spanish mortgage interest tax-deductible?', a: 'Rental property interest is deductible. Primary residence deductions are limited to pre-2013 mortgages for residents.' },
    ] },
  italy: { name: 'Italy', currency: 'EUR', hub: 'europe', gradient: 'from-green-600 via-white to-red-600',
    taxNote: 'Interest deductible for rental properties. Primary residence has a limited 19% deduction.',
    faqs: [
      { q: 'How do I access home equity in Italy?', a: 'Prestito ipotecario (mortgage loan) or surroga (refinancing). Up to 80% LTV for residents.' },
      { q: 'Is Italian mortgage interest tax-deductible?', a: 'For rental properties, yes. For primary residence, a 19% deduction on interest up to 4,000 EUR per year applies.' },
    ] },
  netherlands: { name: 'Netherlands', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-white to-blue-600',
    taxNote: 'Interest is deductible for primary residence (Box 1) at your marginal rate. Investment property falls in Box 3.',
    faqs: [
      { q: 'How do I access home equity in the Netherlands?', a: 'Options include a tweede hypotheek (second mortgage), overbruggingskrediet (bridge loan), or increasing your existing mortgage.' },
      { q: 'Is Dutch mortgage interest tax-deductible?', a: 'Yes, for primary residence in Box 1. The deduction is at your marginal tax rate (up to 37.05% in 2024+).' },
    ] },
  ireland: { name: 'Ireland', currency: 'EUR', hub: 'europe', gradient: 'from-green-600 via-white to-orange-500',
    taxNote: 'Interest deductible for rental properties (75% cap). Not deductible for primary residence.',
    faqs: [
      { q: 'How do I access home equity in Ireland?', a: 'Top-up mortgage from your current lender, remortgage, or a separate home equity loan.' },
      { q: 'Is Irish mortgage interest tax-deductible?', a: 'For rental properties, 75% of interest is deductible against rental income. Not for primary residence.' },
    ] },
  portugal: { name: 'Portugal', currency: 'EUR', hub: 'europe', gradient: 'from-green-600 via-red-600 to-red-600',
    taxNote: 'Interest deductible for rental properties. Primary residence deductions eliminated in 2012.',
    faqs: [
      { q: 'How do I access home equity in Portugal?', a: 'A segunda hipoteca (second mortgage) or refinancing. Non-residents can access equity with tighter LTV limits.' },
      { q: 'Is Portuguese mortgage interest tax-deductible?', a: 'For rental properties, yes. Primary residence deductions were eliminated for loans after 2011.' },
    ] },
  belgium: { name: 'Belgium', currency: 'EUR', hub: 'europe', gradient: 'from-yellow-400 via-red-600 to-black',
    taxNote: 'Interest deductible for primary residence (regional rules — Flanders, Wallonia, Brussels differ).',
    faqs: [
      { q: 'How do I access home equity in Belgium?', a: 'A tweede hypotheek (second mortgage) or refinancing. Rules vary by region (Flanders, Wallonia, Brussels).' },
      { q: 'Is Belgian mortgage interest tax-deductible?', a: 'Yes for primary residence, but the deduction has been reduced in recent years. Regional rules apply.' },
    ] },
  austria: { name: 'Austria', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Interest deductible if the property is let. Not deductible for owner-occupied primary residence.',
    faqs: [
      { q: 'How do I access home equity in Austria?', a: 'A zweite Hypothek (second mortgage) or a refinancing. Bank Austria and Erste offer competitive rates.' },
      { q: 'Is Austrian mortgage interest tax-deductible?', a: 'Only for rental properties. Primary residence is not deductible.' },
    ] },
  norway: { name: 'Norway', currency: 'NOK', hub: 'europe', gradient: 'from-red-600 via-white to-blue-600',
    taxNote: 'Interest deductible against general income for both primary residence and investment properties. 22% flat rate.',
    faqs: [
      { q: 'How do I access home equity in Norway?', a: 'Most Norwegian mortgages include a flexible credit facility (rammekreditt). You can also increase your loan.' },
      { q: 'Is Norwegian mortgage interest tax-deductible?', a: 'Yes — 22% flat rate deduction on all mortgage interest. This applies to both primary and investment properties.' },
    ] },
  poland: { name: 'Poland', currency: 'PLN', hub: 'europe', gradient: 'from-white via-red-600 to-red-600',
    taxNote: 'Interest deductible only for rental properties. Not deductible for primary residence.',
    faqs: [
      { q: 'How do I access home equity in Poland?', a: 'A kredyt hipoteczny (mortgage loan) or pożyczka hipoteczna (home equity loan). Up to 80% LTV for residents.' },
      { q: 'Is Polish mortgage interest tax-deductible?', a: 'Only for rental properties. Primary residence interest is not deductible.' },
    ] },
  switzerland: { name: 'Switzerland', currency: 'CHF', hub: 'europe', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Interest is deductible but capped at the lower of the actual interest or the imputed rental value of the property.',
    faqs: [
      { q: 'How do I access home equity in Switzerland?', a: 'A second mortgage (2nd Hypothek) via a Swiss bank. Foreigners may face restrictions depending on permit status.' },
      { q: 'Is Swiss mortgage interest tax-deductible?', a: 'Yes, but capped. The deduction cannot exceed the imputed rental value of your property.' },
    ] },
  sweden: { name: 'Sweden', currency: 'SEK', hub: 'europe', gradient: 'from-blue-600 via-yellow-400 to-blue-600',
    taxNote: 'Interest deductible at 30% on first SEK 100,000, then 21% above that. Applies to both primary and investment properties.',
    faqs: [
      { q: 'How do I access home equity in Sweden?', a: 'Options include a utökat bolån (increased mortgage) or a nytt lån (new loan). Up to 85% LTV.' },
      { q: 'Is Swedish mortgage interest tax-deductible?', a: 'Yes — 30% on interest up to SEK 100,000, then 21% above that. One of the most generous in Europe.' },
    ] },
  denmark: { name: 'Denmark', currency: 'DKK', hub: 'europe', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Interest deductible but capped at approximately 50,000-100,000 DKK per year (rate depends on income).',
    faqs: [
      { q: 'How do I access home equity in Denmark?', a: 'A boligkredit (home equity line) or a lån (new loan). You can borrow up to 80% LTV plus 15% as a top-up loan.' },
      { q: 'Is Danish mortgage interest tax-deductible?', a: 'Yes, but capped. The exact rate depends on your income and total interest paid.' },
    ] },
}

export default function CountryHomeEquityPage() {
  const { country } = useParams()
  const slug = country?.toLowerCase()
  const meta = COUNTRY_HE[slug]

  useEffect(() => {
    if (meta) {
      document.title = meta.name + ' Home Equity Calculator 2026 | TimeGovern'
      const desc = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      desc.content = 'Free ' + meta.name + ' home equity calculator. Find your tappable equity, compare HELOC vs cash-out, with ' + meta.name + ' tax rules.'
      if (!desc.parentNode) document.head.appendChild(desc)
    }
  }, [meta])

  if (!meta) return <Navigate to="/mortgage" replace />

  const hubHref = '/mortgage/' + meta.hub
  const hubLabel = meta.hub === 'europe' ? 'Europe' : meta.hub === 'asia-pacific' ? 'Asia-Pacific' : meta.name

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: hubLabel, href: hubHref },
        { label: meta.name, href: '/mortgage/' + slug },
        { label: 'Home Equity', href: null },
      ]} />

      <Link to={'/mortgage/' + slug} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to {meta.name} tools
      </Link>

      <MortgageHero
        eyebrow={'Equity Tool - ' + meta.name}
        title={meta.name + ' Home Equity Calculator'}
        subtitle={'Find your tappable equity and compare borrowing options with ' + meta.name + ' tax rules.'}
        gradient={meta.gradient}
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.name}</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.currency}</span>
        </>}
      />
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 mt-6">
        <div className="space-y-6 min-w-0">
      <div className="mb-6 flex justify-end">
        <SaveCalculation type="home-equity" countrySlug={slug} title={meta.name + ' Home Equity'} />
      </div>

      <div className="mb-10">
        <HomeEquityCalculator defaultCurrency={meta.currency} />
      </div>

      <MortgageSeoContent title={meta.name + ' home equity tax rules'}>
        <p><strong>{meta.taxNote}</strong></p>
        <p>The calculator above applies {meta.name} tax rules automatically to your scenario. Toggle between home improvement, investment, and personal use to see how deductibility changes.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">{meta.name} FAQ</h2>
        <div className="space-y-3">{meta.faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedMortgageTools items={[
          { name: meta.name + ' hub', href: '/mortgage/' + slug },
          { name: 'Sell vs Refinance', href: '/mortgage/' + slug + '/sell-vs-refinance' },
          { name: 'Rental Yield Calculator', href: '/mortgage/' + slug + '/rental-yield' },
          { name: 'First Home Buyer', href: '/mortgage/' + slug + '/first-home-buyer' },
          { name: 'All Mortgage Tools', href: '/mortgage' },
        ]} />
      </section>
        </div>
        <CalculatorSidebar country={slug} tool="home-equity" />
      </div>
    </div>
  )
}