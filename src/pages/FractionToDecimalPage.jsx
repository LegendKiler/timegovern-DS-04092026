import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Percent, ArrowRight, BookOpen, Calculator, Divide } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do I convert a fraction to a decimal?', a: 'Divide the numerator by the denominator. Example: 3/4 = 3 ÷ 4 = 0.75.' },
  { q: 'How do I convert a decimal to a fraction?', a: 'Write the decimal as a fraction over a power of 10, then simplify. Example: 0.75 = 75/100 = 3/4.' },
  { q: 'What about repeating decimals?', a: 'Repeating decimals (like 0.333...) can be converted using algebra. For 1/3, multiply by 3: 0.333 × 3 = 1. So 0.333 = 1/3.' },
  { q: 'Which fractions have exact decimal forms?', a: 'Only fractions whose denominators are powers of 2, 5, or a product of both (like 2, 4, 5, 8, 10, 20, 25, 40, 50). Others repeat.' },
  { q: 'How do I convert a fraction to a percentage?', a: 'Convert to decimal first (numerator ÷ denominator), then multiply by 100. Example: 1/4 = 0.25 = 25%.' },
  { q: 'What are the most common fraction-decimal conversions?', a: '1/2=0.5, 1/3=0.333..., 1/4=0.25, 1/5=0.2, 1/8=0.125, 3/4=0.75, 2/3=0.666...' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Fraction to Decimal: Quick Conversion Guide', description: 'How to convert fractions to decimals and decimals to fractions - including repeating decimals and the most common conversions.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/fraction-to-decimal' }

export default function FractionToDecimalPage() {
  useEffect(() => {
    document.title = 'Fraction to Decimal: Quick Conversion Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to convert fractions to decimals - the simple division method, repeating decimals, and the most common conversions to memorise.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Fraction to Decimal
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Percent className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 4 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Fraction to Decimal
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The simplest conversion in math - plus a few tricks for the awkward ones.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The method</h2>
          <p className="text-muted-foreground"><strong>Divide numerator by denominator.</strong></p>
          <p className="text-muted-foreground">That is it. 3/4 means 3 divided by 4 = 0.75.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common conversions to memorise</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Fraction</th><th className="p-3 text-right font-black">Decimal</th><th className="p-3 text-right font-black">Percent</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">1/2</td><td className="p-3 text-right">0.5</td><td className="p-3 text-right">50%</td></tr>
                <tr className="border-t border-border"><td className="p-3">1/3</td><td className="p-3 text-right">0.333...</td><td className="p-3 text-right">33.3%</td></tr>
                <tr className="border-t border-border"><td className="p-3">2/3</td><td className="p-3 text-right">0.666...</td><td className="p-3 text-right">66.7%</td></tr>
                <tr className="border-t border-border"><td className="p-3">1/4</td><td className="p-3 text-right">0.25</td><td className="p-3 text-right">25%</td></tr>
                <tr className="border-t border-border"><td className="p-3">3/4</td><td className="p-3 text-right">0.75</td><td className="p-3 text-right">75%</td></tr>
                <tr className="border-t border-border"><td className="p-3">1/5</td><td className="p-3 text-right">0.2</td><td className="p-3 text-right">20%</td></tr>
                <tr className="border-t border-border"><td className="p-3">1/8</td><td className="p-3 text-right">0.125</td><td className="p-3 text-right">12.5%</td></tr>
                <tr className="border-t border-border"><td className="p-3">5/8</td><td className="p-3 text-right">0.625</td><td className="p-3 text-right">62.5%</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">Which fractions convert cleanly?</h2>
          <p className="text-muted-foreground">Only fractions whose denominator is a power of 2, 5, or a product of both convert to exact decimal form. Examples: 2, 4, 5, 8, 10, 16, 20, 25, 40, 50, 100.</p>
          <p className="text-muted-foreground">Other denominators (3, 6, 7, 9, 11) produce repeating decimals.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Repeating decimals</h2>
          <p className="text-muted-foreground">1/3 = 0.333... forever. We write it as 0.3 with a bar over the 3.</p>
          <p className="text-muted-foreground">Common repeating examples:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>1/3 = 0.333...</li>
            <li>2/3 = 0.666...</li>
            <li>1/6 = 0.1666...</li>
            <li>1/7 = 0.142857142857... (a famous repeating pattern)</li>
            <li>1/9 = 0.111...</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Reverse: decimal to fraction</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Write the decimal over the appropriate power of 10: 0.75 = 75/100.</li>
            <li>Simplify: GCD of 75 and 100 is 25 → 75/100 = 3/4.</li>
          </ol>
          <p className="text-muted-foreground">For repeating decimals, use algebra:</p>
          <p className="text-muted-foreground">x = 0.333...<br/>10x = 3.333...<br/>10x − x = 3<br/>9x = 3<br/>x = 1/3</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Fraction → percent</h2>
          <p className="text-muted-foreground">Convert to decimal first, then multiply by 100.</p>
          <p className="text-muted-foreground">3/5 = 0.6 = 60%.</p>
          <p className="text-muted-foreground">Or skip the decimal: multiply numerator by 100 and divide by denominator. 3 × 100 ÷ 5 = 60%.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Use a calculator</h2>
          <p className="text-muted-foreground">The <Link to="/fraction-calculator" className="text-primary font-bold hover:underline">Fraction Calculator</Link> shows both the fraction result and its decimal equivalent for any operation.</p>
        </div>

        <div className="my-8">
          <Link to="/fraction-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Convert any fraction</h3>
                <p className="text-sm text-muted-foreground">Fraction, decimal, and mixed number - all at once.</p>
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
            <Link to="/blog/how-to-simplify-fractions" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Divide className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Simplify Fractions</h3>
              <p className="text-xs text-muted-foreground">The GCD method.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Fraction to Decimal'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}