import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, BookOpen, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is compound interest in simple terms?', a: 'Compound interest is interest that earns interest. You earn interest on your original money, and then you earn interest on that interest. Over time this creates exponential growth.' },
  { q: 'How is compound interest different from simple interest?', a: 'Simple interest is calculated only on the original principal. Compound interest is calculated on principal plus accumulated interest. Over long periods, compound growth massively outperforms simple.' },
  { q: 'What is the compound interest formula?', a: 'A = P(1 + r/n)^(nt). A is final amount, P is principal, r is annual rate as decimal, n is compounding periods per year, t is years.' },
  { q: 'Why does starting early matter so much?', a: 'Because compounding is exponential. Ten extra years can mean 2-3x the final amount, even with smaller contributions. Time is the most powerful variable in the formula.' },
  { q: 'What is the rule of 72?', a: 'A quick mental math trick: divide 72 by your interest rate to estimate how many years it takes to double your money. At 8%, money doubles in about 9 years.' },
  { q: 'Can compound interest work against me?', a: 'Yes. Compound interest works both ways. Credit card debt at 20% APR compounds against you extremely fast. This is why paying off high-interest debt is always priority one.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is Compound Interest? A Complete Beginner Guide', description: 'The complete guide to understanding compound interest - how it works, why it matters, and how to use it.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/what-is-compound-interest' }

export default function WhatIsCompoundInterestPage() {
  useEffect(() => {
    document.title = 'What Is Compound Interest? A Complete Beginner Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The complete beginner guide to compound interest - how it works, the formula, why starting early matters, and how to use it to grow wealth.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Compound Interest
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Finance - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            What Is Compound Interest?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Compound interest is the single most important concept in personal finance. Einstein reportedly called it the eighth wonder of the world. Here is what it actually means, in plain English.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence definition</h2>
          <p className="text-muted-foreground">Compound interest is interest that earns interest. You earn money on your money, and then you earn money on the money you earned. It sounds trivial. Over decades, it is anything but.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Simple interest vs compound interest</h2>
          <p className="text-muted-foreground">Simple interest pays only on your original principal. If you invest $10,000 at 7% simple interest, you earn $700 every year forever. After 30 years you have $10,000 + (30 x $700) = $31,000.</p>
          <p className="text-muted-foreground">Compound interest pays on principal plus accumulated interest. Same $10,000 at 7% compounded annually grows to $10,000 x (1.07)^30 = $76,123. That is more than <strong>double</strong> the simple interest result, with zero extra effort.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The formula</h2>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-center text-base">
            A = P (1 + r/n)<sup>nt</sup>
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>A</strong> = final amount</li>
            <li><strong>P</strong> = principal (initial investment)</li>
            <li><strong>r</strong> = annual interest rate (as a decimal, e.g. 0.07)</li>
            <li><strong>n</strong> = compounding periods per year</li>
            <li><strong>t</strong> = time in years</li>
          </ul>
          <p className="text-muted-foreground">You do not need to memorise this. Our <Link to="/compound-interest-calculator" className="text-primary font-bold hover:underline">Compound Interest Calculator</Link> does the maths for you. But understanding the shape of the formula matters: every variable multiplies the result.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why starting early is the whole game</h2>
          <p className="text-muted-foreground">Compare two investors, both with 7% annual returns:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Anna</strong> invests $500/month from age 25 to 35, then stops. Total contributed: $60,000.</li>
            <li><strong>Ben</strong> invests $500/month from age 35 to 65. Total contributed: $180,000.</li>
          </ul>
          <p className="text-muted-foreground">At age 65, Anna has roughly $600,000. Ben has roughly $590,000. <strong>Anna contributed a third as much and ends up with more</strong>, because her money had 40 years to compound instead of 30. Those 10 extra years did more work than Ben's entire $180,000 of contributions.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The rule of 72</h2>
          <p className="text-muted-foreground">Quick mental shortcut: divide 72 by your interest rate to estimate the years to double your money. At 8%, money doubles in roughly 9 years. At 6%, about 12 years. At 12%, about 6 years.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The dark side: compounding against you</h2>
          <p className="text-muted-foreground">Compound interest works both ways. Credit card debt at 20% APR compounds against you extremely fast. A $5,000 balance left unpaid grows to $6,000 in a year, $7,200 in two years, and $25,000 in ten years if untouched. This is why paying off high-interest debt is always priority one - it is a guaranteed 20% return.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Practical next steps</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Open a tax-advantaged retirement account (401k, IRA, ISA, or your country's equivalent).</li>
            <li>Automate a monthly contribution - even $50 is fine to start.</li>
            <li>Increase contributions whenever your income rises.</li>
            <li>Leave it alone. Do not react to short-term market news.</li>
            <li>Use our calculator to see what your numbers look like at 20, 30, and 40 years.</li>
          </ol>
        </div>

        <div className="my-8">
          <Link to="/compound-interest-calculator" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Try the Compound Interest Calculator</h3>
                <p className="text-sm text-muted-foreground">Free, instant, 100% private. See what your money could become.</p>
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
            <Link to="/blog/compound-interest-vs-simple-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Compound vs Simple Interest</h3>
              <p className="text-xs text-muted-foreground">See the exact difference with numbers.</p>
            </Link>
            <Link to="/blog/how-to-calculate-compound-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Calculator className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Compound Interest</h3>
              <p className="text-xs text-muted-foreground">Step-by-step with real examples.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'What Is Compound Interest?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> This article is for informational purposes only and is not financial advice. Consult a licensed adviser for personal investment decisions.
        </div>
      </div>
    </>
  )
}