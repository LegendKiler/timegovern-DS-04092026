import { useEffect } from 'react'
import DaysBetweenCalculator from '../components/calculators/DaysBetweenCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function DaysBetweenDatesPage() {
  useEffect(() => {
    document.title = 'Days Between Dates Calculator — Count Days Between Two Dates | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate the exact number of days, weeks, months, and business days between any two dates. Free online days-between-dates calculator.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I count the days between two dates?', a: 'Pick a start date and an end date. The calculator returns the difference in total days, weeks, months, and business days (excluding weekends).' },
    { q: 'Does it include the end date?', a: 'The calculator uses the difference between the two dates — the start date is included, the end date is not. This matches the standard "days between" convention.' },
    { q: 'What are business days?', a: 'Business days (or working days) exclude Saturdays and Sundays. Our calculator counts them automatically. Public holidays are not currently excluded.' },
    { q: 'Can I calculate negative differences?', a: 'The calculator uses absolute difference, so swapping start and end dates returns the same result.' },
    { q: 'What is it used for?', a: 'Countdowns to events, project duration estimation, age differences, loan terms, subscription periods, and legal deadlines.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <PageHero
        eyebrow="Free Tool"
        title="Days Between Dates"
        subtitle="Instantly count the number of days, weeks, months, and business days between any two dates. Ideal for countdowns, deadlines, and project planning."
        gradient="from-blue-500 via-cyan-500 to-teal-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="days-between" title="Days Between Dates" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <DaysBetweenCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Days until a holiday</li>
              <li>• Project deadlines</li>
              <li>• Age differences</li>
              <li>• Countdown timers</li>
              <li>• Contract periods</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="Why use a days-between calculator?">
        <p>Manually counting days between dates is error-prone, especially when you need to skip weekends or account for month lengths. This calculator returns an accurate count instantly — total days, weeks, months, and business days — so you can plan with confidence.</p>
        <p>Use it to count down to a wedding or holiday, estimate a project timeline, calculate the length of a subscription or lease, or find out how old someone is in days. All calculations use the standard convention where the start date counts as day 1 and the end date does not.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Age Calculator', href: '/age-calculator' },
          { name: 'Hours Calculator', href: '/hours-calculator' },
          { name: 'Time Card Calculator', href: '/time-card-calculator' },
          { name: 'All Calculators', href: '/calculators' },
        ]} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
    
      {/* Save button — added by Save Everywhere feature */}</div>
  )
}