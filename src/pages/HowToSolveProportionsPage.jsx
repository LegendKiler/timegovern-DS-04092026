import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Percent, ArrowRight, BookOpen, Calculator, Divide } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a proportion?', a: 'A proportion is an equation stating that two ratios are equal. A:B = C:D. It is a fundamental tool for scaling recipes, maps, currencies, and chemistry.' },
  { q: 'How do I solve a proportion?', a: 'Cross-multiply: A × D = B × C. Then solve for the missing value. Example: 3/4 = x/12 → 3×12 = 4×x → 36 = 4x → x = 9.' },
  { q: 'Why does cross-multiplication work?', a: 'Because multiplying both sides of A/B = C/D by B×D gives A×D = C×B. It is algebraically equivalent to the original equation.' },
  { q: 'Can proportions have unknowns on both sides?', a: 'Yes. Example: (x+2)/3 = (x-1)/4. Cross-multiply, then solve the resulting linear equation.' },
  { q: 'Where are proportions used?', a: 'Cooking (scaling recipes), engineering (map scales, model ratios), finance (currency conversion), chemistry (balancing equations), and any situation where you need to scale.' },
  { q: 'What is the rule of three?', a: 'A classic method to solve proportions with one unknown: given A:B = C:?, the answer is ? = (B×C)/A. This is exactly what our calculator does.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Solve Proportions (Cross-Multiplication)', description: 'How to solve proportions with cross-multiplication - the rule of three, worked examples, and real-world uses.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-solve-proportions' }

export default function HowToSolveProportionsPage() {
  useEffect(() => {
    document.title = 'How to Solve Proportions (Cross-Multiplication) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to solve proportions using cross-multiplication - the rule of three, worked examples, and real-world uses in cooking, maps, and finance.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Solve Proportions
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Percent className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Solve Proportions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The single method that solves every proportion problem - cross-multiplication.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">What is a proportion?</h2>
          <p className="text-muted-foreground">A proportion says two ratios are equal: A:B = C:D. If you know three values, you can solve for the fourth.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Cross-multiplication</h2>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-center">
            A / B = C / D &nbsp;→&nbsp; A × D = B × C
          </p>
          <p className="text-muted-foreground">Multiply diagonally, set the results equal, solve for the unknown.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked examples</h2>

          <p className="text-muted-foreground"><strong>Example 1:</strong> 3 / 4 = x / 12</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Cross-multiply: 3 × 12 = 4 × x → 36 = 4x</li>
            <li>Divide both sides by 4: x = <strong>9</strong></li>
          </ul>

          <p className="text-muted-foreground"><strong>Example 2 (rule of three):</strong> 5 kg of flour costs $8. How much do 12 kg cost?</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Set up: 5 kg / $8 = 12 kg / x</li>
            <li>Cross-multiply: 5 × x = 8 × 12 → 5x = 96</li>
            <li>Divide: x = <strong>$19.20</strong></li>
          </ul>

          <p className="text-muted-foreground"><strong>Example 3:</strong> Map scale 1:50,000. Two towns are 3.5 cm apart on the map. How far apart are they in real life?</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>1 cm / 50,000 cm = 3.5 cm / x</li>
            <li>x = 50,000 × 3.5 = <strong>175,000 cm = 1.75 km</strong></li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The rule of three</h2>
          <p className="text-muted-foreground">A shortcut for proportions with one unknown:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-center text-sm">
            Given A:B = C:x, then x = (B × C) / A
          </p>
          <p className="text-muted-foreground">This is exactly what our calculator does when you use the "Solve proportion" mode.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Real-world uses</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Cooking:</strong> scale a recipe from 4 servings to 7</li>
            <li><strong>Finance:</strong> currency conversion (5 EUR = 5.5 USD, so 100 EUR = ?)</li>
            <li><strong>Construction:</strong> concrete mix ratios</li>
            <li><strong>Chemistry:</strong> balancing chemical equations</li>
            <li><strong>Photography:</strong> printing an image at a given aspect ratio</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Mismatched units.</strong> Both sides of a proportion must use the same units. Convert first if needed.</li>
            <li><strong>Reversing a ratio.</strong> If you flip one side, flip the other too.</li>
            <li><strong>Adding instead of multiplying.</strong> Proportions scale multiplicatively, not additively.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Our <Link to="/ratio-calculator" className="text-primary font-bold hover:underline">Ratio Calculator</Link> has a "Solve proportion" mode - enter three values, get the fourth instantly.</p>
        </div>

        <div className="my-8">
          <Link to="/ratio-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Solve any proportion</h3>
                <p className="text-sm text-muted-foreground">Enter 3 values, get the 4th.</p>
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
            <Link to="/blog/how-to-simplify-ratio" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Simplify a Ratio</h3>
              <p className="text-xs text-muted-foreground">The GCD method.</p>
            </Link>
            <Link to="/blog/how-to-simplify-fractions" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Divide className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Simplify Fractions</h3>
              <p className="text-xs text-muted-foreground">Same GCD method.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Solve Proportions'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}