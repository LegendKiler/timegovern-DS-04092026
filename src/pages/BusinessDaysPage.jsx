import { useEffect } from 'react'
import BusinessDaysCalculator from '../components/calculators/BusinessDaysCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function BusinessDaysPage() {
  useEffect(() => {
    document.title = 'Business Days Calculator — Working Days Between Two Dates | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate working days between two dates, excluding weekends and public holidays. Supports 15+ countries. Free online business days calculator.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate business days between two dates?', a: 'Enter a start date and end date, choose your country, and click Calculate. The tool excludes weekends and (optionally) public holidays for the selected country.' },
    { q: 'Does it exclude public holidays?', a: 'Yes, when you tick "Exclude public holidays". The calculator fetches the holiday list for the selected country and year, and skips those dates.' },
    { q: 'Which countries are supported?', a: 'Currently 15: United States, United Kingdom, Australia, Canada, India, Germany, France, New Zealand, Pakistan, UAE, Saudi Arabia, Singapore, Japan, China, and South Africa.' },
    { q: 'What if a holiday falls on a weekend?', a: 'Observed weekend holidays are handled per the source data — if a country shifts a holiday to Monday, that is the date we exclude.' },
    { q: 'Does it count the start and end dates?', a: 'Yes, both endpoints are included in the count. If you need exclusive counting, subtract one business day from the result.' },
    { q: 'Can I use this for payroll?', a: 'Yes — but verify the country holiday list first, as some payroll-specific holidays (bank holidays, regional days) may not be included.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Business Days Calculator', description: 'Calculate working days between two dates excluding weekends and public holidays.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/business-days-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero
        eyebrow="Free Tool"
        title="Business Days Calculator"
        subtitle="Count working days between two dates — excludes weekends and public holidays for 15+ countries."
        gradient="from-emerald-500 via-teal-500 to-cyan-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="business-days" title="Business Days" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <BusinessDaysCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Project deadlines</li>
              <li>• Payroll & invoicing</li>
              <li>• Contract terms</li>
              <li>• Legal notice periods</li>
              <li>• Shipping & delivery ETAs</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Also try</div>
            <a href="/holidays" className="font-bold text-sm hover:text-primary transition block">Public Holidays →</a>
            <p className="text-xs text-muted-foreground mt-1">220 countries, 2026-2028</p>
          </div>
        </div>
      </div>

      <SeoContent title="How to use the business days calculator">
        <p>Business days (also called working days) exclude Saturdays, Sundays, and public holidays. This calculator returns the exact number of working days between any two dates, and breaks the total into weekdays, weekend days, and holidays so you can see where the time is going.</p>
        <p>Pick a start date, an end date, and your country. Toggle "Exclude public holidays" to add country-specific holidays to the skip list. The calculator uses TimeGovern's holiday data, which covers 220 countries for 2026–2028.</p>
        <p>Common uses include project timelines, payroll calculations, contract notice periods, shipping ETAs, and legal deadlines.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Days Between Dates', href: '/days-between-dates' },
          { name: 'Date Duration Calculator', href: '/date-duration-calculator' },
          { name: 'Public Holidays', href: '/holidays' },
          { name: 'Long Weekends Planner', href: '/holidays' },
        ]} />
      </section>
    </div>
  )
}