import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { COUNTRIES, HUBS } from '../../components/mortgage/universal/data/countries'
import UniversalMortgageCalculator from '../../components/mortgage/universal/UniversalMortgageCalculator'
import UniversalStampDuty from '../../components/mortgage/universal/UniversalStampDuty'
import SaveCalculation from '../../components/SaveCalculation'
import TrustBadge from '../../components/mortgage/TrustBadge'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'
import { ArrowLeft } from 'lucide-react'
import CountryFlag from '../../components/CountryFlag'
import CalculatorSidebar from '../../components/mortgage/CalculatorSidebar'
// First Home Buyer: only 7 countries with strong government schemes
const FHB_COUNTRIES = new Set([
  'australia',
  'usa',
  'uk',
  'canada',
  'india',
  'singapore',
  'malaysia',
  'france',
  'germany',
  'spain',
  'italy',
  'netherlands',
  'ireland',
  'portugal',
  'poland',
  'belgium',
  'austria',
  'norway',
  'indonesia',
  'pakistan',
])


export default function CountryMortgagePage() {
  const { country: slug } = useParams()
  const c = COUNTRIES[slug?.toLowerCase()]

  useEffect(() => {
    if (c) {
      document.title = c.name + ' Mortgage Calculator 2026 | TimeGovern'
      const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      meta.content = 'Free ' + c.name + ' mortgage calculator with ' + c.defaultRate + '% typical rates, ' + c.defaultYears + '-year terms, and local tax rules.'
      if (!meta.parentNode) document.head.appendChild(meta)
    }
  }, [c])

  if (!c) return <Navigate to="/mortgage" replace />

  // Find which hub this country belongs to
  const hub = HUBS[c.hub]
  const hubLabel = c.hub === 'europe' ? 'Europe' : c.hub === 'asia-pacific' ? 'Asia-Pacific' : 'Mortgage'
  const hubHref = '/mortgage/' + c.hub

  // Build related tools list — FHB only if country has a real scheme
  const relatedTools = [
    { name: 'Home Equity', href: '/mortgage/' + slug + '/home-equity' },
    { name: 'Sell vs Refinance', href: '/mortgage/' + slug + '/sell-vs-refinance' },
    ...(FHB_COUNTRIES.has(slug?.toLowerCase()) ? [{ name: 'First Home Buyer Calculator', href: '/mortgage/' + slug + '/first-home-buyer' }] : []),
    { name: 'Mortgage overview', href: '/mortgage' },
    { name: 'All ' + hubLabel + ' countries', href: hubHref },
    { name: 'Australia hub', href: '/mortgage/australia' },
    { name: 'USA hub', href: '/mortgage/usa' },
    { name: 'UK hub', href: '/mortgage/uk' },
    { name: 'Canada hub', href: '/mortgage/canada' }]
  return (
    <div className="container mx-auto p-4 max-w-5xl">

      {/* Breadcrumb trail: Home > Mortgage > [Region] > [Country] */}
      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: hubLabel, href: hubHref },
        { label: c.name, href: null }]} />

      {/* Back to hub button */}
      <Link
        to={hubHref}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {hubLabel}
      </Link>

      <MortgageHero
        eyebrow={'Mortgage Tool · ' + c.name}
        title={c.name + ' Mortgage Calculator'}
        subtitle={'Calculate monthly repayments, total interest, and amortization with ' + c.name + ' rates and local tax rules.'}
        gradient={c.gradient}
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium"><CountryFlag country={slug} size="sm" className="inline-block mr-1.5 align-middle" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 mt-6">
        <div className="space-y-6 min-w-0"> {c.name}</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{c.currency} · {c.defaultRate}% typical</span>
          {c.compounding === 'semi-annual' && <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Semi-annual compounding</span>}
        </>}
      />

      <div className="mb-10 space-y-6">
        <TrustBadge country={slug} />
        <UniversalMortgageCalculator country={c} />
        <UniversalStampDuty country={c} />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="mortgage" countrySlug={slug} title={c.name + ' Mortgage Calculator'} />
      </div>
      </div>

      {c.faqs && c.faqs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-black tracking-tight mb-5">{c.name} mortgage FAQ</h2>
          <div className="space-y-3">
            {c.faqs.map((f, i) => <FaqItem key={i} {...f} />)}
          </div>
        </section>
      )}

      {/* Related tools Ã¢€\u201d all stay within country/region context */}
      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">More {c.name} tools &amp; resources</h2>
        <RelatedMortgageTools items={relatedTools} />
      </section>

      {/* Navigate to other countries in the same hub */}
      {hub && hub.countries && hub.countries.length > 1 && (
        <section className="mb-10">
          <h2 className="text-2xl font-black tracking-tight mb-5">Other {hubLabel} countries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hub.countries.filter(s => s !== slug).slice(0, 8).map(s => {
              const other = COUNTRIES[s]
              if (!other) return null
              return (
                <Link
                  key={s}
                  to={'/mortgage/' + s}
                  className="group p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center"
                >
                  <div className="text-2xl mb-1">{other.flag}</div>
                  <div className="text-xs font-bold group-hover:text-primary">{other.name}</div>
                </Link>
              )
            })}
          </div>
        </section>
        </div>
        <CalculatorSidebar country={slug} tool="mortgage" />
      </div>
      )}

      {c.taxAuthority && (
        <div className="rounded-xl p-4 bg-muted/40 border border-border text-sm">
          <p className="text-muted-foreground">Tax authority: <a href={c.taxAuthority.url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">{c.taxAuthority.name}</a></p>
        </div>
      )}
    </div>
  )
}