import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import OvulationCalculator from '../components/calculators/OvulationCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How is ovulation calculated?", a: "Ovulation typically happens 14 days before the next period starts (the luteal phase). The calculator subtracts the luteal phase length from your cycle length to find the ovulation day." },
  { q: "When is the fertile window?", a: "Sperm survive up to 5 days in the reproductive tract, and an egg lives 12-24 hours after ovulation. The fertile window is therefore roughly 5 days before ovulation through 1 day after." },
  { q: "Is ovulation always 14 days before the period?", a: "Usually, but not always. The luteal phase is more consistent than the follicular phase — most people have a luteal phase of 12-16 days. Stress, illness, and travel can shift ovulation." },
  { q: "Can I use this to conceive or avoid pregnancy?", a: "For conception planning it works well. For contraception, the rhythm method has a significant failure rate — it is not recommended as a primary contraceptive." },
  { q: "Is this medical advice?", a: "No. It is educational. Talk to your doctor or national health authority for personal guidance — the calculator links to them based on your country." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Ovulation Calculator', description: 'Estimate your ovulation date and fertile window based on cycle length and luteal phase. Country-specific health authority guidance for 204 countries.', applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: 'https://timegovern.com/ovulation-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function OvulationCalculatorPage() {
  useEffect(() => {
    document.title = 'Ovulation Calculator - Free | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Estimate your ovulation date and fertile window based on cycle length and luteal phase. Country-specific health authority guidance for 204 countries.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br fuchsia-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Ovulation Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Estimate your ovulation date and fertile window based on cycle length and luteal phase. Country-specific health authority guidance for 204 countries.</p>
          </div>
        </div>

        <OvulationCalculator />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/pregnancy-due-date-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Pregnancy Due Date</h3><p className="text-xs text-muted-foreground">Estimated delivery date</p></Link>
            <Link to="/age-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Age Calculator</h3><p className="text-xs text-muted-foreground">Exact age in days</p></Link>
            <Link to="/bmi-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">BMI Calculator</h3><p className="text-xs text-muted-foreground">Body mass index</p></Link>
            <Link to="/health-tools" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Health Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Ovulation Calculator'} />
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-center">
          <Link to="/health-tools" className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            See all health tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
