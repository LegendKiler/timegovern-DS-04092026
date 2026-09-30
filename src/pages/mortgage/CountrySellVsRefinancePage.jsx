import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SellVsRefinanceCalculator from '../../components/mortgage/SellVsRefinanceCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'
import CalculatorSidebar from '../../components/mortgage/CalculatorSidebar'

const COUNTRY_SVR = {
  australia: { name: 'Australia', currency: 'AUD', hub: 'australia', gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    taxNote: 'CGT with 50% discount for >12mo holdings. Main residence exempt.',
    faqs: [
      { q: 'Do I pay CGT when I sell my Australian home?', a: 'Your main residence is exempt from CGT. Investment properties are subject to CGT with a 50% discount if held over 12 months.' },
      { q: 'Is cash-out refinance tax-free in Australia?', a: 'Yes — refinancing is a loan, not income. The cash you extract is not taxed.' },
      { q: 'What costs should I factor in when selling?', a: 'Agent commission (2-3%), marketing, conveyancing (~$1,500), and CGT on any gain.' },
    ] },
  usa: { name: 'United States', currency: 'USD', hub: 'usa', gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    taxNote: 'Section 121 exclusion: $250K single / $500K married. Depreciation recapture 25% on investment.',
    faqs: [
      { q: 'What is the Section 121 exclusion?', a: 'If you lived in the home 2 of the last 5 years, you can exclude up to $250K (single) or $500K (married) of gain from capital gains tax.' },
      { q: 'What is depreciation recapture?', a: 'On investment properties, the IRS "recaptures" the depreciation you claimed at 25%. This is in addition to capital gains tax.' },
      { q: 'Is a cash-out refinance taxable?', a: 'No — it is a loan, not income. The cash is tax-free.' },
    ] },
  uk: { name: 'United Kingdom', currency: 'GBP', hub: 'uk', gradient: 'from-red-500 via-rose-500 to-pink-500',
    taxNote: 'Private Residence Relief for main home. Investment property CGT at 24% (2024+).',
    faqs: [
      { q: 'Do I pay CGT when I sell my UK home?', a: 'Your main home is usually covered by Private Residence Relief (no CGT). Investment properties are subject to CGT at 24%.' },
      { q: 'How does remortgaging compare to selling?', a: 'Remortgaging is a loan — tax-free cash. Selling triggers CGT on any gain (for investment property).' },
    ] },
  canada: { name: 'Canada', currency: 'CAD', hub: 'canada', gradient: 'from-red-500 via-rose-500 to-orange-500',
    taxNote: 'Principal Residence Exemption for main home. Investment property: 50% inclusion.',
    faqs: [
      { q: 'Do I pay tax when I sell my Canadian home?', a: 'Your principal residence is exempt. Investment properties include 50% of the gain in taxable income.' },
      { q: 'Is refinancing tax-free in Canada?', a: 'Yes — the cash from refinancing is not taxed as income.' },
    ] },
  india: { name: 'India', currency: 'INR', hub: 'india', gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    taxNote: 'LTCG 20% with indexation. Section 54 exempts if reinvested in another home.',
    faqs: [
      { q: 'What is Section 54?', a: 'If you reinvest the capital gain from selling a home into another residential property, you can claim exemption from LTCG up to the amount reinvested.' },
      { q: 'How is LTCG calculated in India?', a: 'Long-term capital gains (held over 24 months) are taxed at 20% with indexation benefit.' },
    ] },
  singapore: { name: 'Singapore', currency: 'SGD', hub: 'asia-pacific', gradient: 'from-red-500 via-white to-red-500',
    taxNote: 'No capital gains tax. Seller Stamp Duty (SSD) 4-12% if sold within 3 years.',
    faqs: [
      { q: 'Does Singapore have capital gains tax?', a: 'No CGT. But Seller Stamp Duty (SSD) applies if you sell within 3 years — 4% to 12% depending on holding period.' },
      { q: 'Is cash-out refinance tax-free?', a: 'Yes — refinancing is a loan, not income.' },
    ] },
  malaysia: { name: 'Malaysia', currency: 'MYR', hub: 'asia-pacific', gradient: 'from-blue-600 via-yellow-400 to-red-600',
    taxNote: 'RPGT 10% for citizens (held 3-5 years). Exempt after 5 years.',
    faqs: [
      { q: 'What is RPGT?', a: 'Real Property Gains Tax. For Malaysian citizens: 30% if sold in year 1, scaling down to 0% after 5 years.' },
      { q: 'Do I pay tax when selling my home?', a: 'Primary residence may qualify for exemptions. Investment properties are subject to RPGT.' },
    ] },
  japan: { name: 'Japan', currency: 'JPY', hub: 'asia-pacific', gradient: 'from-red-600 via-white to-red-600',
    taxNote: '¥30M deduction for primary residence. Investment property: 20.315% CGT.',
    faqs: [
      { q: 'What is the ¥30M deduction?', a: 'If you sell your primary residence, ¥30M of gain is tax-free. If sold after 10 years, this increases to ¥20M additional deduction.' },
      { q: 'Is refinancing tax-free in Japan?', a: 'Yes — refinancing proceeds are a loan, not income.' },
    ] },
  indonesia: { name: 'Indonesia', currency: 'IDR', hub: 'asia-pacific', gradient: 'from-red-600 via-white to-red-600',
    taxNote: '2.5% final tax on sale price (for most properties).',
    faqs: [
      { q: 'How much tax on selling property in Indonesia?', a: 'A 2.5% final tax on the sale price applies to most property sales. Some exemptions exist for low-income first-time sellers.' },
    ] },
  pakistan: { name: 'Pakistan', currency: 'PKR', hub: 'asia-pacific', gradient: 'from-green-700 via-white to-green-700',
    taxNote: 'CGT depends on holding period and filer status. 15% standard for filers.',
    faqs: [
      { q: 'What is capital gains tax on property in Pakistan?', a: 'For tax filers, CGT ranges from 15% (held 1-3 years) down to 0% (held 6+ years). Non-filers pay higher rates.' },
    ] },
  france: { name: 'France', currency: 'EUR', hub: 'europe', gradient: 'from-blue-600 via-white to-red-600',
    taxNote: 'Primary residence exempt. Investment property CGT 19% + 17.2% social charges.',
    faqs: [
      { q: 'Do I pay tax on my French home sale?', a: 'Your résidence principale is exempt from capital gains tax. Investment properties are taxed at 19% + 17.2% social charges, with taper relief after 5 years.' },
    ] },
  germany: { name: 'Germany', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-yellow-500 to-black',
    taxNote: '10-year speculative period. Primary residence exempt. Investment: tax-free after 10 years.',
    faqs: [
      { q: 'What is the 10-year rule in Germany?', a: 'Investment property held over 10 years is fully exempt from capital gains tax. Before 10 years, gains are taxed at your marginal income tax rate.' },
      { q: 'Is my German home exempt from CGT?', a: 'If you lived in it yourself and sell within the year of moving out, it is exempt.' },
    ] },
  spain: { name: 'Spain', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-yellow-500 to-red-600',
    taxNote: 'Primary residence may roll over. Investment property CGT 19-23%.',
    faqs: [
      { q: 'What is the CGT on Spanish property?', a: 'Between 19% and 23% for residents. Non-residents pay 19% with a 3% withholding at sale.' },
    ] },
  italy: { name: 'Italy', currency: 'EUR', hub: 'europe', gradient: 'from-green-600 via-white to-red-600',
    taxNote: 'Primary residence exempt after 5 years. Investment property CGT 26%.',
    faqs: [
      { q: 'Is primary residence exempt from CGT in Italy?', a: 'Primary residence is exempt if you have lived in it (or your family) for most of the 5 years before sale.' },
    ] },
  netherlands: { name: 'Netherlands', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-white to-blue-600',
    taxNote: 'Primary residence exempt (Box 1). Investment property taxed in Box 3.',
    faqs: [
      { q: 'Do I pay tax on my Dutch home sale?', a: 'Your primary residence is in Box 1 and is exempt from capital gains tax. Investment property falls in Box 3 with notional wealth tax.' },
    ] },
  ireland: { name: 'Ireland', currency: 'EUR', hub: 'europe', gradient: 'from-green-600 via-white to-orange-500',
    taxNote: 'Principal Private Residence relief. Investment CGT 33%.',
    faqs: [
      { q: 'Do I pay CGT when selling my Irish home?', a: 'Your principal private residence is exempt. Investment property is subject to 33% CGT.' },
    ] },
  portugal: { name: 'Portugal', currency: 'EUR', hub: 'europe', gradient: 'from-green-600 via-red-600 to-red-600',
    taxNote: 'Primary residence exempt (with reinvestment). Investment CGT 28%.',
    faqs: [
      { q: 'Is Portuguese property CGT exempt for residents?', a: 'If you reinvest the proceeds in another primary residence in Portugal or the EU within 36 months, you can defer or reduce the tax.' },
    ] },
  belgium: { name: 'Belgium', currency: 'EUR', hub: 'europe', gradient: 'from-yellow-400 via-red-600 to-black',
    taxNote: 'No CGT on primary residence. Investment: 16.5% (or 25% for short holdings).',
    faqs: [
      { q: 'Does Belgium tax property gains?', a: 'Primary residence sale is not taxed. Investment property has different rules depending on holding period and construction.' },
    ] },
  austria: { name: 'Austria', currency: 'EUR', hub: 'europe', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Primary residence exempt after 10 years or if owner-occupied. Investment: 30% CGT.',
    faqs: [
      { q: 'Is primary residence exempt from CGT in Austria?', a: 'Yes — if you lived in it as your main residence, or if held over 10 years, it is exempt.' },
    ] },
  norway: { name: 'Norway', currency: 'NOK', hub: 'europe', gradient: 'from-red-600 via-white to-blue-600',
    taxNote: 'Primary residence exempt if lived in 12+ of last 24 months. Investment: 22%.',
    faqs: [
      { q: 'Do I pay tax on Norwegian home sale?', a: 'Primary residence is exempt if you lived in it at least 12 of the last 24 months. Investment property is taxed at 22%.' },
    ] },
  poland: { name: 'Poland', currency: 'PLN', hub: 'europe', gradient: 'from-white via-red-600 to-red-600',
    taxNote: '5-year rule for CGT exemption. Investment CGT 19%.',
    faqs: [
      { q: 'What is the 5-year rule in Poland?', a: 'If you hold a property for 5+ years, gains are exempt. Before 5 years, CGT is 19%.' },
    ] },
  switzerland: { name: 'Switzerland', currency: 'CHF', hub: 'europe', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Cantonal CGT. Primary residence relief if reinvested. Investment: variable rate.',
    faqs: [
      { q: 'How is CGT calculated in Switzerland?', a: 'CGT is cantonal and varies from 0% to 40%. Primary residence may be deferred if reinvested.' },
    ] },
  sweden: { name: 'Sweden', currency: 'SEK', hub: 'europe', gradient: 'from-blue-600 via-yellow-400 to-blue-600',
    taxNote: 'Capital gains 22% on 22/30 of gain. Primary residence can defer via "uppskov".',
    faqs: [
      { q: 'What is uppskov in Sweden?', a: 'A deferral system allowing you to postpone CGT by reinvesting in another home. You pay a small tax on the deferred amount each year.' },
    ] },
  denmark: { name: 'Denmark', currency: 'DKK', hub: 'europe', gradient: 'from-red-600 via-white to-red-600',
    taxNote: 'Primary residence exempt (one-home rule). Investment: up to 42%.',
    faqs: [
      { q: 'Do I pay tax when selling my Danish home?', a: 'Your primary residence is exempt if you owned and lived in it. Investment properties are taxed at up to 42%.' },
    ] },
}

export default function CountrySellVsRefinancePage() {
  const { country } = useParams()
  const slug = country?.toLowerCase()
  const meta = COUNTRY_SVR[slug]

  useEffect(() => {
    if (meta) {
      document.title = meta.name + ' Sell vs Refinance Calculator 2026 | TimeGovern'
      const desc = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      desc.content = 'Free ' + meta.name + ' sell vs refinance calculator. Compare net proceeds from selling against cash-out refinance with local tax rules.'
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
        { label: 'Sell vs Refinance', href: null },
      ]} />

      <Link to={'/mortgage/' + slug} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to {meta.name} tools
      </Link>

      <MortgageHero
        eyebrow={'Decision Tool - ' + meta.name}
        title={meta.name + ' Sell vs Refinance Calculator'}
        subtitle={'Compare selling your ' + meta.name + ' property against a cash-out refinance, with ' + meta.name + ' tax rules built in.'}
        gradient={meta.gradient}
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.name}</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.currency}</span>
        </>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 mt-6">
        <div className="space-y-6 min-w-0">
      <div className="mb-6 flex justify-end">
        <SaveCalculation type="sell-vs-refinance" countrySlug={slug} title={meta.name + ' Sell vs Refinance'} />
      </div>

      <div className="mb-10">
        <SellVsRefinanceCalculator defaultCurrency={meta.currency} />
      </div>

      <MortgageSeoContent title={meta.name + ' tax rules for selling vs refinancing'}>
        <p><strong>{meta.taxNote}</strong></p>
        <p>The calculator above applies {meta.name} tax rules automatically to your scenario. Compare the net proceeds from selling against the tax-free cash from refinancing.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">{meta.name} FAQ</h2>
        <div className="space-y-3">{meta.faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedMortgageTools items={[
          { name: meta.name + ' hub', href: '/mortgage/' + slug },
          { name: 'Rental Yield Calculator', href: '/mortgage/' + slug + '/rental-yield' },
          { name: 'Home Loan Repayment', href: '/mortgage/' + slug + '/home-loan-repayment' },
          { name: 'All Mortgage Tools', href: '/mortgage' },
        ]} />
      </section>
        </div>
        <CalculatorSidebar country={slug} tool="sell-vs-refinance" />
      </div>
    </div>
  )
}