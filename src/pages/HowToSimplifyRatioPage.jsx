import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Percent, ArrowRight, BookOpen, Calculator, Divide } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a ratio?', a: 'A ratio compares two quantities. 3:2 means for every 3 of the first thing, there are 2 of the second. Ratios can be written 3:2, 3/2, or "3 to 2".' },
  { q: 'What does it mean to simplify a ratio?', a: 'Write it with the smallest possible whole numbers. 15:25 simplifies to 3:5. The relationship is the same, just easier to work with.' },
  { q: 'How do I simplify a ratio?', a: 'Find the greatest common divisor (GCD) of both numbers and divide both by it. Example: GCD of 24 and 36 is 12, so 24:36 = 2:3.' },
  { q: 'What is the difference between a ratio and a fraction?', a: 'A fraction represents a part of a whole (3/4 of a cake). A ratio compares two separate quantities (3 cups flour to 4 cups sugar).' },
  { q: 'Can ratios have decimals?', a: 'Yes, but they are easier to work with as whole numbers. 1.5:2 can be rewritten as 3:4 by multiplying both sides by 2.' },
  { q: 'Can ratios be negative?', a: 'Ratios are usually positive since they compare physical quantities. Negative ratios only appear in formal math contexts.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Simplify a Ratio (Step-by-Step)', description: 'How to simplify ratios using the GCD - with worked examples and common real-world uses.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-simplify-ratio' }

export default function HowToSimplifyRatioPage() {
  useEffect(() => {
    document.title = 'How to Simplify a Ratio (Step-by-Step) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to simplify ratios - the GCD method, worked examples, and common real-world uses in cooking, finance, and engineering.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Simplify a Ratio
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Percent className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 4 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Simplify a Ratio
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Just like simplifying a fraction - same method, different notation.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The method</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Find the GCD of both numbers.</li>
            <li>Divide both sides by the GCD.</li>
            <li>Write the result as A:B in lowest terms.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked examples</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>15:25 → GCD is 5 → <strong>3:5</strong></li>
            <li>24:36 → GCD is 12 → <strong>2:3</strong></li>
            <li>100:150 → GCD is 50 → <strong>2:3</strong></li>
            <li>45:60 → GCD is 15 → <strong>3:4</strong></li>
            <li>72:108 → GCD is 36 → <strong>2:3</strong></li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Quick tricks</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Both even?</strong> Divide by 2 (and repeat if needed).</li>
            <li><strong>Both end in 0 or 5?</strong> Divide by 5.</li>
            <li><strong>Sum of digits divisible by 3?</strong> Divide by 3.</li>
            <li><strong>Both divisible by 10?</strong> Drop a zero from each.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Ratios with decimals or fractions</h2>
          <p className="text-muted-foreground">Convert to whole numbers first:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>1.5:2 → multiply both by 2 → 3:4</li>
            <li>0.25:0.5 → multiply both by 4 → 1:2</li>
            <li>1/2 : 1/3 → multiply both by 6 → 3:2</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Real-world uses</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Cooking:</strong> recipes like "2 parts rice to 3 parts water" (2:3)</li>
            <li><strong>Betting odds:</strong> 5:1 means you win $5 for every $1 staked</li>
            <li><strong>Maps:</strong> scale 1:50,000 means 1 cm on the map = 50,000 cm on the ground</li>
            <li><strong>Finance:</strong> debt-to-income ratio, price-to-earnings ratio</li>
            <li><strong>Chemistry:</strong> mixing ratios (2:1 hydrogen to oxygen for water)</li>
            <li><strong>Photography:</strong> aspect ratios (16:9 widescreen, 4:3, 1:1)</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Ratio vs fraction</h2>
          <p className="text-muted-foreground">A fraction is a part of a whole (3/4 of a cake). A ratio compares two separate quantities (3 cups flour to 4 cups sugar). 3:4 and 3/4 look similar but mean different things.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Our <Link to="/ratio-calculator" className="text-primary font-bold hover:underline">Ratio Calculator</Link> simplifies any ratio instantly and shows the decimal and percent breakdown.</p>
        </div>

        <div className="my-8">
          <Link to="/ratio-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Simplify any ratio</h3>
                <p className="text-sm text-muted-foreground">Instant results with decimal + percent.</p>
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
            <Link to="/blog/how-to-solve-proportions" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Solve Proportions</h3>
              <p className="text-xs text-muted-foreground">Cross-multiplication explained.</p>
            </Link>
            <Link to="/blog/how-to-simplify-fractions" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Divide className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Simplify Fractions</h3>
              <p className="text-xs text-muted-foreground">The same GCD method.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Simplify a Ratio'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}