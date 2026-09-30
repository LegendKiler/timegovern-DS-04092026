import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FirstHomeBuyerCalculator from '../../components/mortgage/FirstHomeBuyerCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'
import CalculatorSidebar from '../../components/mortgage/CalculatorSidebar'

const COUNTRY_FHB = {
  'norway': {
    name: 'Norway', currency: 'NOK', hub: 'europe',
    gradient: 'from-red-600 via-white to-blue-600',
    schemes: 'Startlån (government loan for first-time buyers)',
    faqs: [
      { q: 'What is Startlån?', a: 'Government-funded loan program for first-time buyers who cannot get financing from a regular bank. Administered by Husbanken.' },
    ],
  },
  'australia': {
    name: 'Australia', currency: 'AUD', hub: 'australia',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    schemes: 'Home Guarantee (5% deposit, no LMI), First Home Owner Grant, stamp duty concession, FHSS',
    faqs: [
      { q: 'What is the Australian Home Guarantee?', a: 'Lets first home buyers buy with 5% deposit and no LMI. Saves $20,000-$30,000 on a typical purchase.' },
      { q: 'How much is the First Home Owner Grant?', a: 'Varies by state: NSW $10K, VIC $10K, QLD $30K, WA $10K, SA $15K, TAS $30K, NT $10K. Most require a new build.' },
      { q: 'What is the FHSS scheme?', a: 'First Home Super Saver. Contribute up to $15,000/year (max $50,000) into super, then release for a home deposit.' },
    ],
  },
  'india': {
    name: 'India', currency: 'INR', hub: 'india',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    schemes: 'PMAY (interest subsidy), Section 80EEA (₹1.5L interest deduction), Section 80C (₹1.5L principal)',
    faqs: [
      { q: 'What is PMAY?', a: 'Pradhan Mantri Awas Yojana. Credit-linked interest subsidy up to 6.5% on home loans for eligible income groups.' },
      { q: 'What is Section 80EEA?', a: 'Additional interest deduction of ₹1.5 lakh per year for first-time home buyers on affordable housing loans.' },
    ],
  },
  'portugal': {
    name: 'Portugal', currency: 'EUR', hub: 'europe',
    gradient: 'from-green-600 via-red-600 to-red-600',
    schemes: 'IMT exemption (under 35), 100% public mortgage guarantee (under 35)',
    faqs: [
      { q: 'Do under-35s pay IMT?', a: 'No — first-time buyers under 35 are exempt from IMT on purchases up to €316,772.' },
      { q: 'What is the 100% guarantee?', a: 'Government guarantees 100% of the mortgage for first-time buyers under 35.' },
    ],
  },
  'indonesia': {
    name: 'Indonesia', currency: 'IDR', hub: 'asia-pacific',
    gradient: 'from-red-600 via-white to-red-600',
    schemes: 'FLPP (5% subsidized mortgage rate), Tapera, BPHTB discount',
    faqs: [
      { q: 'What is FLPP?', a: 'Fasilitas Likuiditas Pembiayaan Perumahan — government subsidy on mortgage interest for low-income families.' },
    ],
  },
  'uk': {
    name: 'United Kingdom', currency: 'GBP', hub: 'uk',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    schemes: 'Lifetime ISA (25% bonus), Shared Ownership, First Homes, Mortgage Guarantee',
    faqs: [
      { q: 'What is a Lifetime ISA?', a: 'Save up to £4,000/year, government adds 25% bonus (max £1,000/year). Use toward first home under £450,000.' },
      { q: 'What is Shared Ownership?', a: 'Buy 25-75% of a property, rent the rest. Staircase up to 100% over time.' },
      { q: 'Do first-time buyers pay stamp duty?', a: 'No SDLT on first £425,000 if property is £625,000 or less. Above that, 5% applies.' },
    ],
  },
  'france': {
    name: 'France', currency: 'EUR', hub: 'europe',
    gradient: 'from-blue-600 via-white to-red-600',
    schemes: 'PTZ (Prêt à Taux Zéro — zero-interest loan), Pinel, Action Logement',
    faqs: [
      { q: 'What is the PTZ?', a: 'Prêt à Taux Zéro — a zero-interest loan for first-time buyers. Can fund up to 50% of the purchase price in some zones.' },
    ],
  },
  'singapore': {
    name: 'Singapore', currency: 'SGD', hub: 'asia-pacific',
    gradient: 'from-red-500 via-white to-red-500',
    schemes: 'CPF Housing Grant (up to S$80K), Enhanced CPF Housing Grant, Proximity Housing Grant',
    faqs: [
      { q: 'What is the CPF Housing Grant?', a: 'Direct government grant toward your first home. Singles up to S$40,000, couples up to S$80,000.' },
      { q: 'What is the Enhanced CPF Housing Grant?', a: 'Additional grant for lower-to-middle income families buying HDB flats. Up to S$80,000.' },
    ],
  },
  'spain': {
    name: 'Spain', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-yellow-500 to-red-600',
    schemes: 'ICO guarantees (100% mortgages for under-35s), regional subsidies',
    faqs: [
      { q: 'What is the ICO guarantee?', a: 'Government-backed mortgages covering up to 100% of the property price for under-35s and families with children.' },
    ],
  },
  'netherlands': {
    name: 'Netherlands', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-white to-blue-600',
    schemes: 'Starterslening (starter loan), transfer tax exemption for under-35s (0% up to €510K)',
    faqs: [
      { q: 'What is the Starterslening?', a: 'A municipal starter loan to bridge the gap between your mortgage and the property price. Up to €30,000 in many municipalities.' },
      { q: 'Do under-35s pay transfer tax?', a: 'No — the 2% transfer tax is waived for first-time buyers under 35 on properties up to €510,000.' },
    ],
  },
  'austria': {
    name: 'Austria', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-white to-red-600',
    schemes: 'Wohnbauförderung (state housing subsidy, up to €80K)',
    faqs: [
      { q: 'What is Wohnbauförderung?', a: 'State-level housing subsidy providing low-interest loans and grants for first-time buyers. Amount varies by state.' },
    ],
  },
  'pakistan': {
    name: 'Pakistan', currency: 'PKR', hub: 'asia-pacific',
    gradient: 'from-green-700 via-white to-green-700',
    schemes: 'PM Apna Ghar Program (subsidized 5% markup), Mera Pakistan Mera Ghar',
    faqs: [
      { q: 'What is PM Apna Ghar?', a: 'Government-subsidized housing loan with markup starting at 5% for low-income groups.' },
    ],
  },
  'usa': {
    name: 'United States', currency: 'USD', hub: 'usa',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    schemes: 'FHA (3.5% down), VA (0% for veterans), USDA (0% rural), Conventional 97, state HFA programs',
    faqs: [
      { q: 'What is an FHA loan?', a: 'Federal Housing Administration loan with 3.5% down (580+ credit). Upfront MIP 1.75% + annual MIP 0.55%.' },
      { q: 'What is a VA loan?', a: 'Veterans Affairs loan with 0% down for eligible service members. No monthly PMI; one-time funding fee.' },
      { q: 'What is USDA?', a: 'Rural development loan with 0% down for eligible rural areas. 1% upfront + 0.35% annual fee.' },
    ],
  },
  'canada': {
    name: 'Canada', currency: 'CAD', hub: 'canada',
    gradient: 'from-red-500 via-rose-500 to-orange-500',
    schemes: 'FHSA ($8K/yr), RRSP Home Buyers Plan ($35K), First-Time Buyer Tax Credit, GST rebate',
    faqs: [
      { q: 'What is the FHSA?', a: 'First Home Savings Account. Contribute up to $8,000/year, $40,000 lifetime. Contributions tax-deductible, withdrawals tax-free.' },
      { q: 'What is the RRSP Home Buyers Plan?', a: 'Withdraw up to $35,000 from RRSP tax-free for a first home. Repay over 15 years.' },
      { q: 'What about CMHC insurance?', a: 'Required if down payment is under 20%. Premium ranges from 2.4% to 4.0% of the loan.' },
    ],
  },
  'malaysia': {
    name: 'Malaysia', currency: 'MYR', hub: 'asia-pacific',
    gradient: 'from-blue-600 via-yellow-400 to-red-600',
    schemes: 'Skim Rumah Pertamaku (SRP), SJKP, MyDeposit, BSN MyHome',
    faqs: [
      { q: 'What is SRP?', a: 'Government scheme allowing 100% financing for first homes up to RM500,000. Income limit RM10,000/month.' },
      { q: 'What is MyDeposit?', a: 'Government provides 10% of the property price (up to RM30,000) as a down payment.' },
    ],
  },
  'germany': {
    name: 'Germany', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-yellow-500 to-black',
    schemes: 'KfW Wohneigentumsprogramm (subsidized loan), Jung kauft Alt (young buyer program), Baukindergeld',
    faqs: [
      { q: 'What is KfW 124?', a: 'Wohneigentumsprogramm — subsidized low-interest loans up to €100,000 for first-time buyers with income limits.' },
      { q: 'What is Jung kauft Alt?', a: 'Young buyer program providing subsidized loans for purchasing and renovating older properties.' },
      { q: 'What is Baukindergeld?', a: 'Government subsidy for families buying their first home. Replaced by other schemes in 2024+.' },
    ],
  },
  'poland': {
    name: 'Poland', currency: 'PLN', hub: 'europe',
    gradient: 'from-white via-red-600 to-red-600',
    schemes: 'Mieszkanie na Start (subsidized mortgage), Pierwsze klucze',
    faqs: [
      { q: 'What is Mieszkanie na Start?', a: 'Government-subsidized mortgage for first-time buyers. Subsidized interest for the first 10 years.' },
    ],
  },
  'belgium': {
    name: 'Belgium', currency: 'EUR', hub: 'europe',
    gradient: 'from-yellow-400 via-red-600 to-black',
    schemes: 'Reduced registration duties for first homes (2% Flanders, 3% Brussels/Wallonia)',
    faqs: [
      { q: 'How much are registration duties?', a: 'Standard is 12% in Flanders, 12.5% in Brussels and Wallonia. First-home buyers pay only 2% or 3%.' },
    ],
  },
  'ireland': {
    name: 'Ireland', currency: 'EUR', hub: 'europe',
    gradient: 'from-green-600 via-white to-orange-500',
    schemes: 'First Home Scheme (shared equity), Help to Buy (up to €30K tax rebate)',
    faqs: [
      { q: 'What is the First Home Scheme?', a: 'A €740M shared-equity scheme. Government takes 20-30% equity stake, reducing your mortgage.' },
      { q: 'What is Help to Buy?', a: 'A tax rebate of up to €30,000 for first-time buyers of new-build properties.' },
    ],
  },
  'italy': {
    name: 'Italy', currency: 'EUR', hub: 'europe',
    gradient: 'from-green-600 via-white to-red-600',
    schemes: 'Fondo Consap (80% guarantee), first home tax relief (2% vs 9% registration tax)',
    faqs: [
      { q: 'What is Fondo Consap?', a: 'State guarantee fund allowing under-36s to get up to 100% mortgages.' },
      { q: 'What is the prima casa tax benefit?', a: 'First home buyers pay only 2% registration tax (vs 9% for second homes).' },
    ],
  },
}

export default function CountryFirstHomeBuyerPage() {
  const { country } = useParams()
  const slug = country?.toLowerCase()
  const meta = COUNTRY_FHB[slug]

  useEffect(() => {
    if (meta) {
      document.title = meta.name + ' First Home Buyer Calculator 2026 | TimeGovern'
      const desc = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      desc.content = 'Free ' + meta.name + ' first home buyer calculator. ' + meta.schemes
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
        { label: 'First Home Buyer', href: null }]} />

      <Link to={'/mortgage/' + slug} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to {meta.name} tools
      </Link>

      <MortgageHero
        eyebrow={'First Home Buyer - ' + meta.name}
        title={meta.name + ' First Home Buyer Calculator'}
        subtitle={'Stack every ' + meta.name + ' first home buyer scheme into one total.'}
        gradient={meta.gradient}
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.name}</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.currency}</span>
        </>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 mt-6">
        <div className="space-y-6 min-w-0">
      <div className="mb-6 flex justify-end">
        <SaveCalculation type="first-home-buyer" countrySlug={slug} title={meta.name + ' First Home Buyer'} />
      </div>

      <div className="mb-10">
        <FirstHomeBuyerCalculator defaultCurrency={meta.currency} />
      </div>

      <MortgageSeoContent title={meta.name + ' first home buyer support'}>
        <p>{meta.name} offers the following schemes for first home buyers:</p>
        <p><strong>{meta.schemes}</strong></p>
        <p>The calculator above automatically applies the current {meta.name} rules to your inputs.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">{meta.name} first home buyer FAQ</h2>
        <div className="space-y-3">{meta.faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedMortgageTools items={[
          { name: meta.name + ' hub', href: '/mortgage/' + slug },
          { name: 'Rental Yield Calculator', href: '/mortgage/' + slug + '/rental-yield' },
          { name: 'All Mortgage Tools', href: '/mortgage' }]} />
      </section>
        </div>
        <CalculatorSidebar country={slug} tool="first-home-buyer" />
      </div>
    </div>
  )
}