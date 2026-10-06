import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import CreditCardPayoffCalculator from '../components/calculators/CreditCardPayoffCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How does credit card interest work?", a: "Credit card interest compounds monthly on your remaining balance. Each month, the interest is added to the balance, then your payment is subtracted. That is why small payments can take decades." },
  { q: "What is a minimum payment?", a: "Typically 1-3% of your balance plus interest. Minimum payments are designed to keep you in debt longer - paying only the minimum on a 20% APR card can take 10+ years." },
  { q: "Should I pay more than the minimum?", a: "Always. Even doubling the minimum payment can cut years off the payoff time. The calculator shows exactly how much interest you save." },
  { q: "What if my payment is below the interest charge?", a: "The balance grows forever. The calculator will warn you when this happens - increase the payment above the monthly interest charge to make progress." },
  { q: "Does this include new purchases?", a: "No. It assumes the balance stays fixed and you make no new charges. Real cards will grow with new spending, so treat this as best-case." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Credit Card Payoff Calculator', description: 'See how long it takes to pay off credit card debt and how much interest you will pay. Works in any currency.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/credit-card-payoff-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function CreditCardPayoffCalculatorPage() {
  useEffect(() => {
    document.title = 'Credit Card Payoff Calculator - Free | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "See how long it takes to pay off credit card debt and how much interest you will pay. Works in any currency.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br rose-950 via-pink-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Credit Card Payoff Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">See how long it takes to pay off credit card debt and how much interest you will pay. Works in any currency.</p>
          </div>
        </div>

        <CreditCardPayoffCalculator />

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
            <Link to="/loan-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Loan Calculator</h3><p className="text-xs text-muted-foreground">Amortized loan payments</p></Link>
            <Link to="/compound-interest-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Compound Interest</h3><p className="text-xs text-muted-foreground">How interest compounds</p></Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Finance Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Credit Card Payoff Calculator'} />
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-center">
          <Link to="/finance-tools" className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            See all finance tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
