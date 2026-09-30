import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Divide, Sparkles, BookOpen, Calculator, Percent, ArrowRight, Sigma } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import FractionCalculator from '../components/FractionCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do you add fractions with different denominators?', a: 'Find the least common multiple (LCM) of the denominators, convert both fractions to use that denominator, then add the numerators. For example: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.' },
  { q: 'How do you multiply fractions?', a: 'Multiply the numerators together and the denominators together. Then simplify. Example: 2/3 × 3/4 = 6/12 = 1/2.' },
  { q: 'How do you divide fractions?', a: 'Flip the second fraction (its reciprocal) and multiply. Example: 1/2 ÷ 3/4 = 1/2 × 4/3 = 4/6 = 2/3. Remember: "Keep, change, flip".' },
  { q: 'How do you simplify a fraction?', a: 'Divide the numerator and denominator by their greatest common divisor (GCD). Example: 8/12 → GCD is 4 → 8/12 = 2/3.' },
  { q: 'What is a mixed number?', a: 'A whole number plus a fraction, like 2 1/4. It is an alternative way to write an improper fraction (like 9/4) where the numerator is larger than the denominator.' },
  { q: 'What is a proper fraction?', a: 'A fraction where the numerator is smaller than the denominator (like 3/4). Its value is less than 1. An improper fraction has a numerator larger than the denominator (like 5/3), with value greater than 1.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Fraction Calculator', description: 'Free fraction calculator. Add, subtract, multiply, and divide fractions with automatic simplification, decimal, and mixed number results.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/fraction-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function FractionCalculatorPage() {
  useEffect(() => {
    document.title = 'Fraction Calculator - Add, Subtract, Multiply, Divide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free fraction calculator. Add, subtract, multiply, and divide fractions with automatic simplification, decimal, and mixed number results.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Free - Instant - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Divide className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Fraction Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Add, subtract, multiply, and divide any two fractions - with automatic simplification, decimal, and mixed number output.
            </p>
          </div>
        </div>

        <FractionCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Fraction" inputs={{ operation: 'fraction' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator does</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Divide className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">4 operations</h3><p className="text-xs text-muted-foreground">Add, subtract, multiply, and divide fractions of any size.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Calculator className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Auto-simplify</h3><p className="text-xs text-muted-foreground">Every result is reduced to its simplest form automatically.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Percent className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Decimal + mixed</h3><p className="text-xs text-muted-foreground">Get the answer as a fraction, decimal, and mixed number.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Enter the first fraction (numerator over denominator).</li>
            <li>Pick the operation: +, −, ×, or ÷.</li>
            <li>Enter the second fraction.</li>
            <li>Read the result - automatically simplified, with decimal and mixed number equivalents.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/percentage-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Percent className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Percentage Calculator</h3>
              <p className="text-xs text-muted-foreground">Percent of, increase, decrease.</p>
            </Link>
            <Link to="/math-tools" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Sigma className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">All Math Tools</h3>
              <p className="text-xs text-muted-foreground">Fractions, percentages, and more.</p>
            </Link>
            <Link to="/blog/how-to-add-fractions" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">How to Add Fractions</h3>
              <p className="text-xs text-muted-foreground">Step-by-step guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Fraction Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Verify critical calculations independently.
        </div>
      </div>
    </>
  )
}