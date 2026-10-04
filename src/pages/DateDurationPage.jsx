import { useEffect } from 'react'
import DateDurationCalculator from '../components/calculators/DateDurationCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function DateDurationPage() {
  useEffect(() => {
    document.title = 'Date Duration Calculator — Exact Time Between Two Dates | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate the exact duration between two dates and times — years, months, days, hours, minutes, and seconds. Free online date duration calculator.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate duration between two dates?', a: 'Enter a start date and time, then an end date and time. The calculator returns the exact duration in years, months, days, hours, minutes, and seconds — plus the total in each unit.' },
    { q: 'Does it include time of day?', a: 'Yes. Unlike basic days-between calculators, this one accepts date AND time, so you can measure a duration down to the second.' },
    { q: 'What is the difference between Date Duration and Days Between Dates?', a: 'Days Between Dates counts whole days only. Date Duration breaks the result into years, months, days, hours, minutes, and seconds, and accounts for time of day.' },
    { q: 'Can I calculate negative durations?', a: 'The calculator uses absolute difference — swapping start and end gives the same result. Use the Date Add Calculator if you need signed arithmetic.' },
    { q: 'What can I use it for?', a: 'Project durations, age calculations down to the second, event countdowns, contract lengths, and precise time-since tracking.' },
    { q: 'Is it accurate across time zones?', a: 'Yes. Inputs are treated as local time on your device. If you need UTC specifically, adjust your device time zone before entering the dates.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Date Duration Calculator', description: 'Calculate the exact duration between two dates and times.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/date-duration-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero
        eyebrow="Free Tool"
        title="Date Duration"
        subtitle="Calculate the exact duration between two dates and times — years, months, days, hours, minutes, and seconds."
        gradient="from-indigo-500 via-purple-500 to-pink-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="date-duration" title="Date Duration" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <DateDurationCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Project timelines</li>
              <li>• Exact age in time units</li>
              <li>• Event countdowns</li>
              <li>• Contract lengths</li>
              <li>• Time since an event</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="Why use a date duration calculator?">
        <p>Counting whole days is easy — but a real duration often needs hours, minutes, and seconds. This calculator returns the exact difference between any two date-time points, broken into years, months, days, hours, minutes, and seconds, plus the grand total in each unit.</p>
        <p>Use it to measure project runtimes, count down to a launch with sub-day precision, calculate exact ages, or log time between events. All calculations run in your browser — nothing is uploaded.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Days Between Dates', href: '/days-between-dates' },
          { name: 'Business Days Calculator', href: '/business-days-calculator' },
          { name: 'Time Duration Calculator', href: '/time-duration-calculator' },
          { name: 'Age Calculator', href: '/age-calculator' },
        ]} />
      </section>
    </div>
  )
}