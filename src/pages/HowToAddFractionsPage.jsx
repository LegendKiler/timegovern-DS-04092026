import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Divide, ArrowRight, BookOpen, Calculator, Plus, Percent } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the rule for adding fractions?', a: 'Fractions must share a common denominator before you can add. Find the least common multiple of both denominators, convert, then add numerators only. Example: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.' },
  { q: 'Why can you not add denominators directly?', a: 'Denominators tell you the size of each piece. Halves are not the same size as thirds. Adding them would be like adding 2 apples + 3 oranges and getting 5 of nothing.' },
  { q: 'What is the fastest way to add fractions?', a: 'Use the "butterfly method": cross-multiply, add the results for the numerator, multiply denominators for the denominator. Then simplify. Works for any two fractions.' },
  { q: 'Do you simplify the answer?', a: 'Always. 4/6 should be reduced to 2/3. Divide numerator and denominator by their greatest common divisor.' },
  { q: 'What about mixed numbers?', a: 'Convert to improper fractions first. 2 1/4 = (2 × 4 + 1)/4 = 9/4. Then add normally.' },
  { q: 'Can fractions be negative?', a: 'Yes. The sign goes with the numerator. So -3/4 = 3/(-4). Operations work the same way.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Add Fractions (Step-by-Step Guide)', description: 'The complete guide to adding fractions - common denominators, the butterfly method, and simplifying results.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-add-fractions' }

export default function HowToAddFractionsPage() {
  useEffect(() => {
    document.title = 'How to Add Fractions (Step-by-Step Guide) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to add fractions - common denominators, the butterfly method, and simplifying. Step-by-step guide with worked examples.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Add Fractions
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Plus className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Add Fractions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The rule is simple. The execution is where people get confused. Here is the step-by-step that actually sticks.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The golden rule</h2>
          <p className="text-muted-foreground">You can only add fractions when their denominators match. The denominator tells you the size of each piece. Halves and thirds are different sizes - you cannot add them directly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 1: Common denominator</h2>
          <p className="text-muted-foreground"><strong>Example:</strong> 2/5 + 1/3</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Find the LCM of 5 and 3 → 15.</li>
            <li>Convert: 2/5 = 6/15, and 1/3 = 5/15.</li>
            <li>Add numerators: 6 + 5 = 11.</li>
            <li>Result: 11/15 (already in simplest form).</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 2: The butterfly method</h2>
          <p className="text-muted-foreground">For any two fractions, there is a shortcut that always works:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-sm">
            a/b + c/d = (a×d + c×b) / (b×d)
          </p>
          <p className="text-muted-foreground"><strong>Example:</strong> 2/5 + 1/3 = (2×3 + 1×5) / (5×3) = 11/15.</p>
          <p className="text-muted-foreground">Same answer, one step. Great for mental math. Always simplify the result.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 3: Mixed numbers</h2>
          <p className="text-muted-foreground">If your fractions have whole numbers, convert to improper fractions first.</p>
          <p className="text-muted-foreground"><strong>Example:</strong> 1 1/2 + 2 1/4</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Convert: 1 1/2 = 3/2, and 2 1/4 = 9/4.</li>
            <li>Find LCD: 4.</li>
            <li>Convert: 3/2 = 6/4, and 9/4 stays the same.</li>
            <li>Add: 6/4 + 9/4 = 15/4.</li>
            <li>Convert back to mixed: 15/4 = 3 3/4.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Always simplify</h2>
          <p className="text-muted-foreground">After adding, check if the result can be simplified. Divide numerator and denominator by their greatest common divisor (GCD).</p>
          <p className="text-muted-foreground"><strong>Example:</strong> 4/8 → GCD is 4 → 4/8 = 1/2.</p>
          <p className="text-muted-foreground">Use our <Link to="/fraction-calculator" className="text-primary font-bold hover:underline">Fraction Calculator</Link> to see any addition instantly simplified.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Adding denominators.</strong> 1/2 + 1/3 is NOT 2/5. The denominators are sizes, not quantities.</li>
            <li><strong>Forgetting to convert.</strong> Only numerators get added - after conversion to a common denominator.</li>
            <li><strong>Not simplifying.</strong> 6/8 is technically correct but should be reduced to 3/4.</li>
            <li><strong>Getting mixed up with subtraction.</strong> Subtracting works the same way - common denominator first, then subtract numerators only.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence summary</h2>
          <p className="text-muted-foreground">Make the denominators match, add the numerators only, then simplify.</p>
        </div>

        <div className="my-8">
          <Link to="/fraction-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Try the Fraction Calculator</h3>
                <p className="text-sm text-muted-foreground">Add any two fractions - instant, simplified.</p>
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
            <Link to="/blog/how-to-simplify-fractions" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Simplify Fractions</h3>
              <p className="text-xs text-muted-foreground">The GCD method.</p>
            </Link>
            <Link to="/blog/fraction-to-decimal" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Percent className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Fraction to Decimal</h3>
              <p className="text-xs text-muted-foreground">Quick conversions.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Add Fractions'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}