import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, ArrowRight, BookOpen, DollarSign, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the formula for a loan payment?', a: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]. M is monthly payment, P is principal, r is monthly rate (annual/12), n is total months.' },
  { q: 'Why do early payments have more interest?', a: 'Because interest is calculated on the current balance. Early on, the balance is highest, so interest is highest. As you pay down principal, the interest portion shrinks.' },
  { q: 'How do I calculate a car loan payment?', a: 'Same formula. Use the car price minus down payment as principal, the APR divided by 12 as r, and the term in months as n.' },
  { q: 'Does a 15-year loan save money vs 30-year?', a: 'Yes, dramatically. A 15-year mortgage has higher monthly payments but roughly half the total interest of a 30-year. The exact savings depend on the rate difference.' },
  { q: 'What happens if I miss a payment?', a: 'Late fees apply immediately, and the missed amount is added to your balance. Missed payments also damage your credit score. Always pay at least the minimum.' },
  { q: 'How do I pay off a loan faster?', a: 'Pay extra toward principal every month. Even small amounts compound over the loan term - a $100 extra monthly payment can save years and thousands in interest.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Calculate Loan Payments (Step-by-Step)', description: 'The exact formula for loan payments, with worked examples for mortgage, auto, and personal loans.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-calculate-loan-payments' }

export default function HowToCalculateLoanPaymentsPage() {
  useEffect(() => {
    document.title = 'How to Calculate Loan Payments (Step-by-Step) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Learn how to calculate loan payments step-by-step with the exact formula. Includes worked examples for mortgage, auto, and personal loans.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Calculate Loan Payments
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full mb-4">
            <Calculator className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Finance - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Calculate Loan Payments
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The exact formula lenders use, why early payments are mostly interest, and how to pay off any loan faster.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The formula</h2>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-center text-base">
            M = P x [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>M</strong> = monthly payment</li>
            <li><strong>P</strong> = principal (amount borrowed)</li>
            <li><strong>r</strong> = monthly interest rate (annual rate / 12)</li>
            <li><strong>n</strong> = total number of monthly payments (years x 12)</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example - mortgage</h2>
          <p className="text-muted-foreground">$300,000 mortgage at 6.5% APR for 30 years.</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>r = 0.065 / 12 = 0.0054167</li>
            <li>n = 30 x 12 = 360</li>
            <li>(1+r)^n = (1.0054167)^360 = 7.0074</li>
            <li>Numerator = 0.0054167 x 7.0074 = 0.037955</li>
            <li>Denominator = 7.0074 - 1 = 6.0074</li>
            <li>M = 300000 x (0.037955 / 6.0074) = <strong>$1,896.20/month</strong></li>
          </ol>
          <p className="text-muted-foreground">Over 360 payments that totals $682,632. You borrowed $300,000 and will pay $382,632 in interest - more than the loan itself.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why early payments are mostly interest</h2>
          <p className="text-muted-foreground">Interest each month is calculated on the current balance. In month 1 of the mortgage above:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Balance: $300,000</li>
            <li>Interest this month: $300,000 x 0.0054167 = $1,625</li>
            <li>Your payment: $1,896.20</li>
            <li>Principal paid: $271.20 (14% of the payment)</li>
          </ul>
          <p className="text-muted-foreground">By month 300, the balance is much smaller and the split flips. This is why early extra payments are so powerful - they reduce the balance immediately, saving interest on every future month.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example - car loan</h2>
          <p className="text-muted-foreground">$35,000 car loan at 7% APR for 5 years.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>r = 0.07 / 12 = 0.0058333</li>
            <li>n = 60 months</li>
            <li>M = 35000 x [0.0058333 x (1.0058333)^60] / [(1.0058333)^60 - 1] = <strong>$693.05/month</strong></li>
            <li>Total paid: $41,583</li>
            <li>Total interest: $6,583</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">How extra payments save you money</h2>
          <p className="text-muted-foreground">Add $200/month to the mortgage example. New payoff time: 25 years, 4 months. Total interest drops from $382,632 to $309,000 - saving over <strong>$73,000</strong> and 4.5 years.</p>
          <p className="text-muted-foreground">This is the single most effective lever most borrowers have. Use our <Link to="/loan-calculator" className="text-primary font-bold hover:underline">Loan Calculator</Link> to see your own numbers.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to do this in Excel</h2>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-sm">
            =PMT(rate/12, years*12, -loan_amount)
          </p>
          <p className="text-muted-foreground">Example: =PMT(0.065/12, 30*12, -300000) returns $1,896.20 - matching the hand calculation.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Tips for getting a better rate</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Improve your credit score before applying - 740+ gets the best rates.</li>
            <li>Shop at least 3 lenders - rate quotes vary by 1-2%.</li>
            <li>Put down 20%+ to avoid PMI on a mortgage.</li>
            <li>Consider a shorter term - lower rate and less total interest.</li>
            <li>Refinance if rates drop 1% or more below your current rate.</li>
          </ol>
        </div>

        <div className="my-8">
          <Link to="/loan-calculator" className="block rounded-2xl border-2 border-blue-500/30 bg-blue-500/5 hover:border-blue-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-blue-500 transition-colors">Try the Loan Calculator</h3>
                <p className="text-sm text-muted-foreground">Free, instant, 100% private. See your monthly payment in seconds.</p>
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
            <Link to="/blog/fixed-vs-variable-interest-rates" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Fixed vs Variable Rates</h3>
              <p className="text-xs text-muted-foreground">Which is right for your loan?</p>
            </Link>
            <Link to="/blog/what-is-compound-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <DollarSign className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is Compound Interest?</h3>
              <p className="text-xs text-muted-foreground">Understanding loan costs starts with compounding.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Calculate Loan Payments'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> For informational purposes only. Not financial advice.
        </div>
      </div>
    </>
  )
}