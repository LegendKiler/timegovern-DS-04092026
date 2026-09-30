import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calculator as CalcIcon, ArrowRight, BookOpen, Sigma } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What are sin, cos, and tan?', a: 'They are trigonometric functions that relate angles to side lengths in a right triangle. sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.' },
  { q: 'When do I use DEG vs RAD mode?', a: 'Use DEG when the angle is in degrees (0-360), which is most everyday situations. Use RAD when the angle is in radians (0-2π), which is standard in calculus and physics.' },
  { q: 'What is the unit circle?', a: 'A circle with radius 1 centred at the origin. It defines sin, cos, and tan for all angles, not just those in a right triangle.' },
  { q: 'Why does sin(0) = 0 and cos(0) = 1?', a: 'At angle 0°, the opposite side of the triangle is 0 (so sin = 0), and the adjacent side equals the hypotenuse (so cos = 1).' },
  { q: 'What is the range of sin and cos?', a: 'Both range from -1 to +1. tan has no range limits - it can be any real number but is undefined at 90°, 270°, etc.' },
  { q: 'How do I find an angle from a side ratio?', a: 'Use the inverse functions: asin, acos, or atan. Example: if sin(x) = 0.5, then x = asin(0.5) = 30°.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Use a Scientific Calculator: Trig Basics', description: 'The complete beginner guide to using a scientific calculator for trigonometric functions - sin, cos, tan, and their inverses.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-use-scientific-calculator' }

export default function HowToUseScientificCalculatorPage() {
  useEffect(() => {
    document.title = 'How to Use a Scientific Calculator: Trig Basics | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to use a scientific calculator for trigonometry - sin, cos, tan, inverse functions, DEG vs RAD, and common mistakes.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Use a Scientific Calculator
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <CalcIcon className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Use a Scientific Calculator
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The three buttons everyone gets wrong - sin, cos, and tan - and how to actually use them.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The three trig functions</h2>
          <p className="text-muted-foreground">In a right triangle, they relate angles to side ratios:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>sin (sine)</strong> = opposite ÷ hypotenuse</li>
            <li><strong>cos (cosine)</strong> = adjacent ÷ hypotenuse</li>
            <li><strong>tan (tangent)</strong> = opposite ÷ adjacent</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">DEG vs RAD - the biggest source of confusion</h2>
          <p className="text-muted-foreground">Angles can be measured two ways:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Degrees:</strong> A full circle is 360°. Standard in everyday use.</li>
            <li><strong>Radians:</strong> A full circle is 2π ≈ 6.283. Standard in calculus and physics.</li>
          </ul>
          <p className="text-muted-foreground">180° = π radians. So 90° = π/2 ≈ 1.5708 radians.</p>
          <p className="text-muted-foreground"><strong>If your answer looks wrong, check the mode first.</strong> sin(30) gives 0.5 in DEG mode but -0.988 in RAD mode.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common exact values to know</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Angle</th><th className="p-3 text-right font-black">sin</th><th className="p-3 text-right font-black">cos</th><th className="p-3 text-right font-black">tan</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">0°</td><td className="p-3 text-right">0</td><td className="p-3 text-right">1</td><td className="p-3 text-right">0</td></tr>
                <tr className="border-t border-border"><td className="p-3">30°</td><td className="p-3 text-right">0.5</td><td className="p-3 text-right">0.866</td><td className="p-3 text-right">0.577</td></tr>
                <tr className="border-t border-border"><td className="p-3">45°</td><td className="p-3 text-right">0.707</td><td className="p-3 text-right">0.707</td><td className="p-3 text-right">1</td></tr>
                <tr className="border-t border-border"><td className="p-3">60°</td><td className="p-3 text-right">0.866</td><td className="p-3 text-right">0.5</td><td className="p-3 text-right">1.732</td></tr>
                <tr className="border-t border-border"><td className="p-3">90°</td><td className="p-3 text-right">1</td><td className="p-3 text-right">0</td><td className="p-3 text-right">undefined</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">These come up constantly in homework and exams. Memorise the 30-45-60 set.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Inverse functions: finding angles</h2>
          <p className="text-muted-foreground">If you know a ratio and need the angle, use the inverse:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>asin (arcsin)</strong> - if sin(x) = 0.5, then x = asin(0.5) = 30°.</li>
            <li><strong>acos (arccos)</strong> - if cos(x) = 0.5, then x = acos(0.5) = 60°.</li>
            <li><strong>atan (arctan)</strong> - if tan(x) = 1, then x = atan(1) = 45°.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Logarithms and powers</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>log</strong> - logarithm base 10. log(1000) = 3.</li>
            <li><strong>ln</strong> - natural logarithm, base e. ln(e) = 1.</li>
            <li><strong>^</strong> - power. 2^10 = 1024.</li>
            <li><strong>√</strong> - square root. √(144) = 12.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Wrong mode.</strong> The #1 issue. Always check DEG/RAD before trig.</li>
            <li><strong>Missing parentheses.</strong> sin(30) + 5 is not the same as sin(30+5).</li>
            <li><strong>Order of operations.</strong> Use parentheses to group: (2+3)*4 = 20, not 2+3*4 = 14.</li>
            <li><strong>Mixing units.</strong> Do not switch between degrees and radians in the same calculation.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Our <Link to="/scientific-calculator" className="text-primary font-bold hover:underline">Scientific Calculator</Link> has all these functions with DEG/RAD toggle and calculation history.</p>
        </div>

        <div className="my-8">
          <Link to="/scientific-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><CalcIcon className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Try the Scientific Calculator</h3>
                <p className="text-sm text-muted-foreground">Trig, logs, powers - all in one place.</p>
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
            <Link to="/blog/what-is-logarithm" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Sigma className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is a Logarithm?</h3>
              <p className="text-xs text-muted-foreground">Log and ln explained.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Use a Scientific Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}