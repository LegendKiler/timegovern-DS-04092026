import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sigma, ArrowRight, BookOpen, Calculator as CalcIcon, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a logarithm?', a: 'A logarithm is the inverse of exponentiation. log2(8) = 3 asks "2 to what power equals 8?". The answer is 3.' },
  { q: 'What is the difference between log and ln?', a: 'log usually means base 10; ln means base e (Euler number, about 2.718). log(1000) = 3, ln(e) = 1.' },
  { q: 'What is the natural logarithm?', a: 'ln uses base e. It appears naturally in calculus, physics, and any process with continuous growth or decay.' },
  { q: 'What is log base 2 used for?', a: 'Computer science: measuring data size (bits, bytes), algorithm complexity, and information entropy.' },
  { q: 'What are the log rules?', a: 'Three main rules: log(xy) = log(x) + log(y), log(x/y) = log(x) - log(y), log(x^n) = n times log(x).' },
  { q: 'Why can you not take log of a negative number?', a: 'Because no real exponent of a positive base gives a negative result. log(-5) is undefined in real numbers.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is a Logarithm? The Complete Guide', description: 'Logarithms explained - what they mean, the difference between log and ln, and the rules that make them useful.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/what-is-logarithm' }

export default function WhatIsLogarithmPage() {
  useEffect(() => {
    document.title = 'What Is a Logarithm? The Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Logarithms explained simply - what log and ln mean, the three log rules, and why they matter.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / What Is a Logarithm?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Sigma className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            What Is a Logarithm?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The reverse of an exponent - and one of the most useful tools in all of math.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence definition</h2>
          <p className="text-muted-foreground">A logarithm answers the question: <strong>To what power must I raise the base to get this number?</strong></p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-center">
            If b^n = x, then log_b(x) = n
          </p>

          <h2 className="text-2xl font-black mt-8 mb-3">A simple example</h2>
          <p className="text-muted-foreground">Ask: 2 to what power equals 8? Answer: 3, because 2^3 = 8. So log2(8) = 3.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Log vs ln: two common bases</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>log(x)</strong> - base 10. log(1000) = 3 because 10^3 = 1000.</li>
            <li><strong>ln(x)</strong> - base e (about 2.718). ln(e) = 1, ln(1) = 0.</li>
            <li><strong>log2(x)</strong> - base 2. Used in computer science.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Why e is special</h2>
          <p className="text-muted-foreground">e is about 2.718281828, a constant that appears naturally when calculating continuous growth. Money that compounds continuously, radioactive decay, population growth - all involve e and ln.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The three log rules</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Product:</strong> log(xy) = log(x) + log(y)</li>
            <li><strong>Quotient:</strong> log(x/y) = log(x) - log(y)</li>
            <li><strong>Power:</strong> log(x^n) = n times log(x)</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example</h2>
          <p className="text-muted-foreground">Simplify log(100 x 1000): log(100) + log(1000) = 2 + 3 = 5. Check: 10^5 = 100,000.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Real-world uses</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Earthquake magnitude (Richter scale)</strong> - base 10 log of energy</li>
            <li><strong>Sound loudness (decibels)</strong> - base 10 log of intensity</li>
            <li><strong>pH in chemistry</strong> - negative base 10 log</li>
            <li><strong>Compound interest</strong> - natural log to solve for time</li>
            <li><strong>Algorithm complexity</strong> - log2 appears in binary search</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Quick reference</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>log(1) = 0 (any base)</li>
            <li>log(10) = 1, log(100) = 2, log(1000) = 3</li>
            <li>ln(1) = 0, ln(e) = 1</li>
            <li>log(0) is undefined</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Our <Link to="/scientific-calculator" className="text-primary font-bold hover:underline">Scientific Calculator</Link> has both log and ln buttons. Try log(1000) and ln(e).</p>
        </div>

        <div className="my-8">
          <Link to="/scientific-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><CalcIcon className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Try log and ln</h3>
                <p className="text-sm text-muted-foreground">Full scientific calculator.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/degrees-vs-radians" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Degrees vs Radians</h3>
              <p className="text-xs text-muted-foreground">The complete comparison.</p>
            </Link>
            <Link to="/blog/how-to-use-scientific-calculator" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BarChart3 className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Use a Scientific Calculator</h3>
              <p className="text-xs text-muted-foreground">Trig, logs, powers.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'What Is a Logarithm?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}