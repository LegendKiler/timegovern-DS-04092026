import { useEffect } from 'react'
import UnixTimestampConverter from '../components/calculators/UnixTimestampConverter'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function UnixTimestampPage() {
  useEffect(() => {
    document.title = 'Unix Timestamp Converter — Epoch Time to Date | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Convert Unix timestamps to human-readable dates, or convert any date to a Unix epoch timestamp. Free, instant, works offline.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'What is a Unix timestamp?', a: 'A Unix timestamp is the number of seconds that have passed since 1 January 1970 at 00:00:00 UTC (excluding leap seconds). It is the standard way computers track time.' },
    { q: 'Why 1970?', a: 'The Unix epoch was set to 1970 because that was the year the Unix operating system was being developed at Bell Labs. It stuck as the industry standard.' },
    { q: 'Is the timestamp seconds or milliseconds?', a: 'Unix timestamps are typically in seconds. JavaScript and some APIs use milliseconds — divide by 1000 to convert to standard Unix time.' },
    { q: 'What is the Year 2038 problem?', a: 'Systems that store Unix time in a 32-bit signed integer overflow on 19 January 2038. Modern 64-bit systems are unaffected.' },
    { q: 'Does it account for time zones?', a: 'A Unix timestamp is timezone-agnostic — it always represents a moment in UTC. The converter shows both UTC and your local time for convenience.' },
    { q: 'What is the current Unix time?', a: 'The top of the tool updates every second, showing the current Unix timestamp in real time.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Unix Timestamp Converter', description: 'Convert Unix epoch timestamps to dates and back, with live current timestamp.', applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: 'https://timegovern.com/unix-timestamp-converter', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero
        eyebrow="Free Tool"
        title="Unix Timestamp Converter"
        subtitle="Convert Unix epoch timestamps to human dates, or any date to a Unix timestamp — with a live current-time display."
        gradient="from-slate-500 via-zinc-500 to-stone-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="unix-timestamp" title="Unix Timestamp" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <UnixTimestampConverter />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Common uses</div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• API debugging</li>
              <li>• Log file analysis</li>
              <li>• Database timestamp conversion</li>
              <li>• JWT/expiry verification</li>
              <li>• Cron schedule math</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="About Unix time">
        <p>Unix time (also called epoch time or POSIX time) is the number of seconds since 1 January 1970 at 00:00:00 UTC. It is how most computers internally represent moments in time, and it is timezone-independent — the same Unix timestamp represents the same instant everywhere on Earth.</p>
        <p>This converter works both directions: paste a timestamp to get a readable date, or pick a date to get its Unix timestamp. The current Unix time updates live every second at the top of the tool.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'How UTC Time Works', href: '/blog/how-utc-time-works' },
          { name: 'Time Zone Converter', href: '/time-zone-converter' },
          { name: 'Hours Calculator', href: '/hours-calculator' },
          { name: 'Date Duration', href: '/date-duration-calculator' },
        ]} />
      </section>
    </div>
  )
}