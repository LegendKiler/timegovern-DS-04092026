import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import AmortizationCalculator from '../components/calculators/AmortizationCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is an amortization schedule?", a: "An amortization schedule is a table of every payment on a loan showing how much goes to interest, how much to principal, and the remaining balance. Early payments are mostly interest; late payments are mostly principal." },
  { q: "Why is most of my early payment interest?", a: "Interest is charged on the remaining balance. At the start, the balance is at its highest, so interest is highest. As the balance falls, more of each payment goes to principal." },
  { q: "What is the amortization formula?", a: "Monthly payment M = P x r x (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly rate (APR divided by 12) and n is total months. This produces a fixed payment for the life of the loan." },
  { q: "How can I pay off my mortgage faster?", a: "Make extra principal payments. Every extra dollar goes directly to principal, shortens the loan term and reduces total interest. Even one extra payment a year can shave years off a 30-year mortgage." },
  { q: "What is the difference between amortization and simple interest?", a: "Simple interest charges interest only on the principal. Amortization charges interest on the declining balance, so total interest paid is a fixed function of the schedule, not the principal alone." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Amortization Calculator', description: 'Calculate monthly loan payment and view the amortization schedule for a fixed-rate loan.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/amortization-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function AmortizationCalculatorPage() {
  useEffect(() => {
    document.title = 'Amortization Calculator | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Free amortization calculator with full payment schedule. See monthly loan payment, total interest, and total cost for any fixed-rate loan. Works in any currency, no signup.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-cyan-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Amortization Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Free amortization calculator with full payment schedule. See monthly loan payment, total interest, and total cost for any fixed-rate loan. Works in any currency, no signup.</p>
          </div>
        </div>

        <AmortizationCalculator />

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
            <Link to="/down-payment-calculator" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Down Payment Calculator</h3><p className="text-xs text-muted-foreground">Mortgage down payment</p></Link>
            <Link to="/credit-card-payoff-calculator" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Credit Card Payoff</h3><p className="text-xs text-muted-foreground">Minimum payment payoff</p></Link>
            <Link to="/investment-calculator" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Investment Calculator</h3><p className="text-xs text-muted-foreground">Compound growth</p></Link>
            <Link to="/money-tools" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Money Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Amortization Calculator'} />
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-center">
          <Link to="/money-tools" className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            See all money tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}