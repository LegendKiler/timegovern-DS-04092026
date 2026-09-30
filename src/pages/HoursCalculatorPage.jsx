import { useEffect } from 'react'
import HoursCalculator from '../components/calculators/HoursCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function HoursCalculatorPage() {
  useEffect(() => {
    document.title = 'Hours Calculator — Calculate Work Hours, Time Between Times | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free hours calculator — add or subtract work hours, calculate time between two times, and total daily or weekly work hours instantly.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How do I calculate work hours?', a: 'Enter your start and end times for each day. The calculator automatically subtracts break time and sums up the total hours worked. Works across midnight shifts too.' },
    { q: 'Can I add multiple rows for a whole week?', a: 'Yes. Click "Add row" to add entries for every day of the week. The calculator sums them all and shows a grand total.' },
    { q: 'Does it handle overnight shifts?', a: 'Yes. If the end time is earlier than the start time (e.g. 22:00 to 06:00), the calculator treats it as the next day and adds 24 hours.' },
    { q: 'How are breaks deducted?', a: 'Enter the break duration in minutes per row. The calculator subtracts it from the total for that row before summing up.' },
    { q: 'Is the hours calculator free?', a: 'Completely free, no signup required. Works on desktop and mobile.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <PageHero
        eyebrow="Free Tool"
        title="Hours Calculator"
        subtitle="Calculate work hours, total time between start and end times, and weekly totals — with automatic break deductions and overnight shift support."
        gradient="from-lime-500 via-green-500 to-emerald-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="hours" title="Hours Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <HoursCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Quick tips</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Time format: 24-hour (14:30) or 12-hour (2:30 PM)</li>
              <li>• Breaks entered in minutes</li>
              <li>• Add up to 7+ rows for a full week</li>
              <li>• Overnight shifts handled automatically</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Also try</div>
            <a href="/time-card-calculator" className="font-bold text-sm hover:text-primary transition block">Time Card Calculator →</a>
            <p className="text-xs text-muted-foreground mt-1">Weekly payroll with hourly rate</p>
          </div>
        </div>
      </div>

      <SeoContent title="How to use the hours calculator">
        <p>The Hours Calculator computes the total time between a start time and an end time, subtracts any breaks you specify, and totals the result across multiple rows. It's the fastest way to figure out hours worked for a shift, a timesheet, or a project log.</p>
        <p>To use it: enter your start time in the first field, end time in the second, and any unpaid break in the third. If your end time is earlier than your start time, the tool treats it as an overnight shift and adds 24 hours automatically. Click "Add row" to include additional days or shifts — you'll see a running total.</p>
        <p>Common uses include tracking freelance billable hours, calculating shift differentials, verifying payslip hours, and logging study or gym sessions.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Time Card Calculator', href: '/time-card-calculator' },
          { name: 'Time Duration Calculator', href: '/calculators' },
          { name: 'Days Between Dates', href: '/days-between-dates' },
          { name: 'Percentage Calculator', href: '/percentage-calculator' },
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