import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Calculator, Divide, Percent } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What does simplifying a fraction mean?', a: 'Writing the same value with the smallest possible numerator and denominator. 6/8 = 3/4 - both are equal, but 3/4 is simplified.' },
  { q: 'How do I simplify a fraction?', a: 'Find the greatest common divisor (GCD) of the numerator and denominator. Divide both by it. Example: 12/18 → GCD is 6 → 12/18 = 2/3.' },
  { q: 'What is the greatest common divisor?', a: 'The largest number that divides both the numerator and denominator without leaving a remainder. For 12 and 18, it is 6.' },
  { q: 'How do I find the GCD?', a: 'Use the Euclidean algorithm: divide the larger number by the smaller, then divide the smaller by the remainder, and so on until the remainder is 0. The last non-zero remainder is the GCD.' },
  { q: 'When do I simplify?', a: 'Always, when presenting a final answer. Intermediate steps do not need to be simplified, but the final result should be.' },
  { q: 'Can any fraction be simplified?', a: 'If the GCD is 1, the fraction is already simplified (called "reduced" or "in lowest terms"). 3/7 cannot be simplified further because 3 and 7 share no common factor.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Simplify Fractions: The Complete Guide', description: 'How to simplify fractions using the GCD, the Euclidean algorithm, and quick tricks for common cases.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-simplify-fractions' }

export default function HowToSimplifyFractionsPage() {
  useEffect(() => {
    document.title = 'How to Simplify Fractions: The Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to simplify fractions using the GCD. Includes the Euclidean algorithm and quick tricks for common cases.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Simplify Fractions
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Divide className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 4 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Simplify Fractions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The GCD method, the Euclidean algorithm, and shortcuts for the fractions you see most often.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">What simplifying actually does</h2>
          <p className="text-muted-foreground">A fraction is a number. 6/8 and 3/4 represent the exact same value. Simplifying is just writing it with the smallest possible numerator and denominator.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The method: divide by the GCD</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Find the greatest common divisor (GCD) of numerator and denominator.</li>
            <li>Divide both by the GCD.</li>
            <li>The result is simplified.</li>
          </ol>
          <p className="text-muted-foreground"><strong>Example:</strong> Simplify 24/36.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>GCD of 24 and 36 is 12</li>
            <li>24 ÷ 12 = 2, 36 ÷ 12 = 3</li>
            <li>Result: 2/3</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Finding the GCD: Euclidean algorithm</h2>
          <p className="text-muted-foreground">Works for any pair. Repeat: divide larger by smaller, then divide the smaller by the remainder, until the remainder is 0.</p>
          <p className="text-muted-foreground"><strong>Example:</strong> GCD of 48 and 18.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>48 ÷ 18 = 2 remainder 12</li>
            <li>18 ÷ 12 = 1 remainder 6</li>
            <li>12 ÷ 6 = 2 remainder 0</li>
            <li>GCD = 6</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Quick tricks for common cases</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Both even?</strong> Divide both by 2.</li>
            <li><strong>Both end in 0 or 5?</strong> Divide both by 5.</li>
            <li><strong>Sum of digits divisible by 3?</strong> Divide both by 3.</li>
            <li><strong>Both divisible by 10?</strong> Move the decimal point one place left on each.</li>
          </ul>
          <p className="text-muted-foreground">For most school problems, dividing by 2 or 5 gets you to simplest form in one or two steps.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">When can you not simplify?</h2>
          <p className="text-muted-foreground">If the GCD is 1, the fraction is already in lowest terms. Example: 3/7. 3 and 7 share no factor other than 1.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Practice examples</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>8/12 → GCD 4 → <strong>2/3</strong></li>
            <li>15/25 → GCD 5 → <strong>3/5</strong></li>
            <li>42/56 → GCD 14 → <strong>3/4</strong></li>
            <li>72/108 → GCD 36 → <strong>2/3</strong></li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Using a calculator</h2>
          <p className="text-muted-foreground">The <Link to="/fraction-calculator" className="text-primary font-bold hover:underline">Fraction Calculator</Link> simplifies automatically. Enter any numerator and denominator, and the result is always in lowest terms.</p>
        </div>

        <div className="my-8">
          <Link to="/fraction-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Auto-simplify any fraction</h3>
                <p className="text-sm text-muted-foreground">Instant, free, no signup.</p>
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
            <Link to="/blog/how-to-add-fractions" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Add Fractions</h3>
              <p className="text-xs text-muted-foreground">Step-by-step with examples.</p>
            </Link>
            <Link to="/blog/fraction-to-decimal" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Percent className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Fraction to Decimal</h3>
              <p className="text-xs text-muted-foreground">Quick conversion methods.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Simplify Fractions'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}