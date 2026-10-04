import { useEffect } from 'react'
import TimeDurationCalculator from '../components/calculators/TimeDurationCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function TimeDurationPage() {
  useEffect(() => {
    document.title = 'Time Duration Calculator — Add, Subtract & Measure Time | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate the duration between two times, or add and subtract hours, minutes, and seconds. Free online time duration calculator.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate time between two times?', a: 'Enter a start time and an end time. The calculator returns the exact duration in hours, minutes, and seconds. Overnight ranges (e.g. 22:00 to 06:00) are handled automatically.' },
    { q: 'Can I add or subtract time?', a: 'Yes. Switch to Add or Subtract mode, enter a base time, then specify hours, minutes, and seconds to add or remove.' },
    { q: 'Does it handle overnight shifts?', a: 'Yes. If the end time is earlier than the start time, the calculator treats it as the next day and adds 24 hours.' },
    { q: 'Can I use it for work hours?', a: 'For timesheets with breaks and multiple rows, use the Hours Calculator or Time Card Calculator instead — they are designed for payroll workflows.' },
    { q: 'What format do I enter time in?', a: 'Use the time picker (24-hour format). Seconds are supported. All calculations run in your browser.' },
    { q: 'Can I subtract across midnight?', a: 'Yes. Add/Subtract mode handles wrap-around correctly, so 01:00 - 03:00 = 22:00 (previous day) when needed.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Time Duration Calculator', description: 'Calculate duration between two times, or add and subtract hours, minutes, and seconds.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/time-duration-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero
        eyebrow="Free Tool"
        title="Time Duration"
        subtitle="Measure duration between two times, or add and subtract hours, minutes, and seconds — with automatic overnight handling."
        gradient="from-orange-500 via-red-500 to-rose-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="time-duration" title="Time Duration" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <TimeDurationCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Shift length calculation</li>
              <li>• Event duration</li>
              <li>• Flight & travel time</li>
              <li>• Study session timing</li>
              <li>• Cooking & workout timers</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="About the time duration calculator">
        <p>Time duration measures the gap between two clock times, or adds/subtracts time from a starting point. This calculator supports all three modes — Between, Add, and Subtract — and shows the result in both 24-hour clock and readable form (e.g. "7h 30m 0s").</p>
        <p>Overnight ranges are handled automatically — enter 22:00 to 06:00 and the calculator treats the end as the next morning. Add/Subtract mode accepts hours, minutes, and seconds and wraps around midnight when needed.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Hours Calculator', href: '/hours-calculator' },
          { name: 'Time Card Calculator', href: '/time-card-calculator' },
          { name: 'Date Duration Calculator', href: '/date-duration-calculator' },
          { name: 'Days Between Dates', href: '/days-between-dates' },
        ]} />
      </section>
    </div>
  )
}