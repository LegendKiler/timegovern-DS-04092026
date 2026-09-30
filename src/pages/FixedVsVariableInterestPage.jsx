import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Calculator, TrendingUp, Scale } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Which is better: fixed or variable?', a: 'Fixed is safer - predictable payments for the life of the loan. Variable can be cheaper if rates fall, but payments rise if rates climb. Choose based on how much certainty you need.' },
  { q: 'Are fixed rates always higher?', a: 'Usually yes. Lenders charge a premium for certainty. The gap is typically 0.25% to 1% at the start of a loan, but varies by market.' },
  { q: 'Can I switch from variable to fixed?', a: 'Often yes, sometimes for a fee. Many variable loans have a "fix" option that locks in the current rate for the remaining term.' },
  { q: 'What is a rate cap?', a: 'A cap limits how much a variable rate can rise - either per adjustment or over the life of the loan. Always check cap terms.' },
  { q: 'Which is better for a first home?', a: 'Most financial advisers recommend fixed for first-time buyers - certainty of payments matters more than potential savings.' },
  { q: 'Does a variable rate ever make sense?', a: 'Yes - if you can afford higher payments, have a long horizon, and rates are historically high (expected to fall), variable can save money.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Fixed vs Variable Interest Rates: Which Is Right for You?', description: 'The complete comparison of fixed and variable interest rates for mortgages, personal, and auto loans.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/fixed-vs-variable-interest-rates' }

export default function FixedVsVariableInterestPage() {
  useEffect(() => {
    document.title = 'Fixed vs Variable Interest Rates: Which Is Right for You? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Fixed vs variable interest rates compared. Understand the trade-offs, when each makes sense, and how to choose for your mortgage, auto, or personal loan.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Fixed vs Variable Interest Rates
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full mb-4">
            <Scale className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Finance - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Fixed vs Variable Interest Rates
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            One gives certainty. The other gives flexibility. Here is how to choose.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The core trade-off</h2>
          <p className="text-muted-foreground"><strong>Fixed rate:</strong> The interest rate stays the same for the entire loan. Your monthly payment never changes. You pay a premium for this certainty.</p>
          <p className="text-muted-foreground"><strong>Variable rate:</strong> The interest rate moves with the market (usually tied to a central bank rate). Payments rise and fall over time. Cheaper on average, but unpredictable.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Side-by-side comparison</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-black">Factor</th>
                  <th className="p-3 text-left font-black">Fixed</th>
                  <th className="p-3 text-left font-black">Variable</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3 font-bold">Monthly payment</td><td className="p-3">Never changes</td><td className="p-3">Changes with market</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Starting rate</td><td className="p-3">Usually higher</td><td className="p-3">Usually lower</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Predictability</td><td className="p-3">High</td><td className="p-3">Low</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Risk</td><td className="p-3">Rate locked</td><td className="p-3">Rate can rise sharply</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Best if</td><td className="p-3">Rates expected to rise</td><td className="p-3">Rates expected to fall</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Refinance cost</td><td className="p-3">Break fee may apply</td><td className="p-3">Often cheaper to exit</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">The numbers</h2>
          <p className="text-muted-foreground">$300,000 mortgage over 30 years:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Fixed at 6.5%:</strong> $1,896/month - never changes. Total interest: $382,632.</li>
            <li><strong>Variable at 5.75%:</strong> $1,750/month at start. Total interest if rates never move: $330,000. But if rates rise 2%, monthly jumps to $2,188.</li>
          </ul>
          <p className="text-muted-foreground">The variable loan starts $146/month cheaper but exposes you to rising payments. Whether that trade is worth it depends on how you would cope with a $400/month increase.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">When fixed makes sense</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>You are on a tight budget and cannot absorb payment increases.</li>
            <li>Rates are currently low relative to history.</li>
            <li>You plan to stay in the home or keep the loan for the full term.</li>
            <li>You are a first-time buyer.</li>
            <li>You value certainty and sleep better without rate risk.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">When variable makes sense</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>You can easily afford payments 2-3% higher than today.</li>
            <li>Rates are historically high and expected to fall.</li>
            <li>You plan to sell or refinance within 3-5 years.</li>
            <li>You have significant cash reserves to absorb rate shocks.</li>
            <li>You actively watch the market and can refinance at the right moment.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Hybrid options</h2>
          <p className="text-muted-foreground">Many lenders offer split loans - part fixed, part variable. This hedges your exposure. Example: 50% fixed at 6.5% and 50% variable at 5.75% gives you blended certainty with some upside if rates fall.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Fixed is a form of insurance. Variable is a bet. If you need certainty, take the insurance. If you can afford the risk and rates look favourable, take the bet. There is no universally correct answer - only what fits your situation.</p>
          <p className="text-muted-foreground">Use our <Link to="/loan-calculator" className="text-primary font-bold hover:underline">Loan Calculator</Link> to model both scenarios with your own numbers.</p>
        </div>

        <div className="my-8">
          <Link to="/loan-calculator" className="block rounded-2xl border-2 border-blue-500/30 bg-blue-500/5 hover:border-blue-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-blue-500 transition-colors">Model both scenarios</h3>
                <p className="text-sm text-muted-foreground">Free loan calculator with extra payment savings.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/how-to-calculate-loan-payments" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Loan Payments</h3>
              <p className="text-xs text-muted-foreground">Step-by-step with examples.</p>
            </Link>
            <Link to="/blog/what-is-compound-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is Compound Interest?</h3>
              <p className="text-xs text-muted-foreground">Why rates matter over the long term.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Fixed vs Variable Interest Rates'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> For informational purposes only. Not financial advice.
        </div>
      </div>
    </>
  )
}