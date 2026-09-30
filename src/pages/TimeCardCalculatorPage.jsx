import { useEffect } from 'react'
import TimeCardCalculator from '../components/calculators/TimeCardCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function TimeCardCalculatorPage() {
  useEffect(() => {
    document.title = 'Time Card Calculator — Weekly Hours & Payroll Calculator | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free time card calculator — enter weekly hours, automatically total hours worked and estimate pay based on your hourly rate.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How does a time card calculator work?', a: 'You enter a start time, end time, and break duration for each day. The calculator totals the hours for the week and multiplies by your hourly rate to estimate gross pay.' },
    { q: 'Can I use it for multiple employees?', a: 'Yes. Just refresh the page and enter new times. It works for any number of employees — one at a time.' },
    { q: 'What is the difference between regular and overtime hours?', a: 'Our calculator shows total hours. If you work over 40 hours in a week (US) or 38 hours (AU), check your local rules for overtime pay — usually 1.5x the regular rate.' },
    { q: 'Does it account for unpaid lunch breaks?', a: 'Yes. Enter the break in minutes and it will be deducted from the daily total before summing up.' },
    { q: 'Can I print or export the time card?', a: 'Use your browser\'s print function (Ctrl+P) to save as PDF or print. We\'re adding CSV export soon.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <PageHero
        eyebrow="Free Tool"
        title="Time Card Calculator"
        subtitle="Weekly timesheet calculator — total your hours, deduct breaks, and estimate pay. Perfect for freelancers, small business owners, and payroll."
        gradient="from-cyan-500 via-blue-500 to-indigo-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="time-card" title="Time Card Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <TimeCardCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Works for</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Freelancers billing hours</li>
              <li>• Small business payroll</li>
              <li>• Contractor timesheets</li>
              <li>• Shift workers</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Tips</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Add rows for extra days</li>
              <li>• Set break = 0 for paid breaks</li>
              <li>• Use for any hourly rate</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="What is a time card calculator?">
        <p>A time card calculator (also called a timesheet calculator) totals the hours you work in a week or pay period. Enter your daily start times, end times, and break durations, and the calculator automatically computes your total hours worked, in both hour-minute and decimal formats.</p>
        <p>Enter your hourly rate and the tool will estimate gross pay before tax. This is perfect for freelancers creating invoices, small business owners processing payroll, or anyone checking whether their payslip matches the hours worked.</p>
        <p>The calculator handles overnight shifts (e.g. 22:00 – 06:00) and shows the running total as you fill in more rows.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Hours Calculator', href: '/hours-calculator' },
          { name: 'Percentage Calculator', href: '/percentage-calculator' },
          { name: 'Days Between Dates', href: '/days-between-dates' },
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