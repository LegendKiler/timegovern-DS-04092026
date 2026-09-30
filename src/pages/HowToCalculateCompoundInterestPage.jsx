import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the step-by-step formula for compound interest?', a: 'A = P(1 + r/n)^(nt). First divide the annual rate by compounding periods. Add 1. Raise to the power of periods times years. Multiply by principal.' },
  { q: 'How do I calculate it with monthly contributions?', a: 'Calculate compound growth on the principal separately, then add the future value of an annuity for the monthly contributions. Our calculator handles both automatically.' },
  { q: 'Can I calculate compound interest in Excel?', a: 'Yes. Use =FV(rate/n, n*years, -monthly_contribution, -principal) for the future value including monthly contributions.' },
  { q: 'How do I calculate continuous compounding?', a: 'Use A = Pe^(rt) where e is Euler number (about 2.718). Continuous compounding is the theoretical maximum.' },
  { q: 'What is a realistic rate to use?', a: 'For long-term stock market returns, 7% is a common inflation-adjusted assumption. Nominal returns have averaged closer to 10% historically.' },
  { q: 'How do I account for inflation?', a: 'Subtract inflation from your return rate. If nominal returns are 10% and inflation is 3%, use 7% as your real rate for a sense of purchasing power.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Calculate Compound Interest (Step-by-Step)', description: 'Learn the exact steps to calculate compound interest by hand, in Excel, or with a free calculator.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-calculate-compound-interest' }

export default function HowToCalculateCompoundInterestPage() {
  useEffect(() => {
    document.title = 'How to Calculate Compound Interest (Step-by-Step) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Learn how to calculate compound interest step-by-step, by hand, in Excel, or with our free calculator. Includes worked examples.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Calculate Compound Interest
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Calculator className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Finance - 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Calculate Compound Interest
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Three ways to do it: by hand with the formula, in a spreadsheet, or with a calculator. All three produce the same answer.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Method 1: By hand (the formula)</h2>
          <p className="text-muted-foreground"><strong>Formula:</strong> A = P(1 + r/n)<sup>nt</sup></p>
          <p className="text-muted-foreground">Worked example. You invest $5,000 at 6% compounded monthly for 15 years.</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>P = 5000, r = 0.06, n = 12, t = 15</li>
            <li>r/n = 0.06 / 12 = 0.005</li>
            <li>1 + r/n = 1.005</li>
            <li>n x t = 12 x 15 = 180</li>
            <li>1.005^180 = 2.4541</li>
            <li>A = 5000 x 2.4541 = <strong>$12,270.50</strong></li>
          </ol>
          <p className="text-muted-foreground">So your $5,000 grew to $12,270.50 over 15 years at 6% compounded monthly - a gain of $7,270.50.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 2: With monthly contributions</h2>
          <p className="text-muted-foreground">Most real-world investing includes regular contributions. The formula splits into two parts:</p>
          <p className="text-muted-foreground"><strong>Part A:</strong> Future value of principal (formula above)</p>
          <p className="text-muted-foreground"><strong>Part B:</strong> Future value of monthly contributions = PMT x [((1 + i)^n - 1) / i] x (1 + i)</p>
          <p className="text-muted-foreground">Where PMT is monthly contribution, i is monthly rate, and n is number of months.</p>
          <p className="text-muted-foreground">Worked example: $5,000 principal + $300/month at 6% for 15 years.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Part A (principal): $12,270.50</li>
            <li>Part B (contributions): $300 x [((1.005)^180 - 1) / 0.005] x 1.005 = $88,090</li>
            <li><strong>Total: $100,360</strong></li>
          </ul>
          <p className="text-muted-foreground">You contributed $5,000 + ($300 x 180) = $59,000. The other <strong>$41,360</strong> is interest earned. That is compound interest doing the heavy lifting.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 3: In Excel or Google Sheets</h2>
          <p className="text-muted-foreground">The FV function handles everything:</p>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-sm">
            =FV(rate/12, years*12, -monthly_contribution, -principal)
          </p>
          <p className="text-muted-foreground">Example: =FV(0.06/12, 15*12, -300, -5000) returns $100,359.51 - matching the hand-calculated result.</p>
          <p className="text-muted-foreground">The negative signs are Excel convention (money flowing out of your pocket is negative).</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 4: With a calculator (fastest)</h2>
          <p className="text-muted-foreground">Skip the maths entirely. Our <Link to="/compound-interest-calculator" className="text-primary font-bold hover:underline">free Compound Interest Calculator</Link> lets you change any input and see the result instantly. No formulas, no Excel, no manual arithmetic. It also handles edge cases like annual vs monthly compounding correctly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Adjusting for inflation</h2>
          <p className="text-muted-foreground">Nominal returns overstate real purchasing power. If you want to know what your investment is actually worth in today's money, use the real rate:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-center text-sm">
            Real rate = Nominal rate - Inflation rate
          </p>
          <p className="text-muted-foreground">If your returns average 10% and inflation averages 3%, your real rate is 7%. Over 30 years, this changes the outcome enormously: $10,000 at 10% nominal becomes $174,494, but at 7% real becomes $76,123 in today's purchasing power.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Confusing nominal and real rates.</strong> Always adjust for inflation when planning long term.</li>
            <li><strong>Using the wrong compounding frequency.</strong> Monthly vs daily produces meaningfully different results.</li>
            <li><strong>Ignoring contributions.</strong> For most people, monthly contributions matter more than the starting principal.</li>
            <li><strong>Forgetting taxes and fees.</strong> Real-world returns are always lower than the formula predicts.</li>
          </ul>
        </div>

        <div className="my-8">
          <Link to="/compound-interest-calculator" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Use the free calculator</h3>
                <p className="text-sm text-muted-foreground">Skip the maths - get instant results.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/what-is-compound-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is Compound Interest?</h3>
              <p className="text-xs text-muted-foreground">The complete beginner's guide.</p>
            </Link>
            <Link to="/blog/compound-interest-vs-simple-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Compound vs Simple Interest</h3>
              <p className="text-xs text-muted-foreground">The exact difference with numbers.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Calculate Compound Interest'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> For informational purposes only. Not financial advice.
        </div>
      </div>
    </>
  )
}