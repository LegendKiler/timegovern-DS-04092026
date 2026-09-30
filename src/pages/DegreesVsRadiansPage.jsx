import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sigma, ArrowRight, BookOpen, Calculator as CalcIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the difference between degrees and radians?', a: 'Both measure angles. Degrees split a circle into 360 parts; radians split it into 2π parts. 180 degrees = π radians.' },
  { q: 'Why do we have two units?', a: 'Degrees are convenient for navigation and everyday use (360 has many divisors). Radians arise naturally in calculus and physics.' },
  { q: 'How do I convert degrees to radians?', a: 'Multiply by π/180. Example: 90° × π/180 = π/2 ≈ 1.5708 radians.' },
  { q: 'How do I convert radians to degrees?', a: 'Multiply by 180/π. Example: π/3 × 180/π = 60°.' },
  { q: 'Which mode should I use on my calculator?', a: 'DEG for everyday math, geometry, navigation. RAD for calculus, physics, and any function that uses exponential or trig derivatives.' },
  { q: 'Why does my calculator give weird answers?', a: 'Almost always because it is in the wrong mode. Check DEG/RAD before using sin, cos, or tan.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Degrees vs Radians: What Is the Difference?', description: 'Degrees vs radians explained - conversion formulas, common values, and why radians matter in calculus.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/degrees-vs-radians' }

export default function DegreesVsRadiansPage() {
  useEffect(() => {
    document.title = 'Degrees vs Radians: What Is the Difference? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Degrees vs radians explained - conversion formulas, common values, and why radians matter in calculus.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Degrees vs Radians
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Sigma className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Degrees vs Radians
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Two ways to measure angles. One is human-friendly, one is math-friendly. Here is when to use each.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The fundamental definition</h2>
          <p className="text-muted-foreground"><strong>Degrees:</strong> A full circle is 360 degrees. Chosen because 360 has many divisors (2, 3, 4, 5, 6, 8, 9, 10, 12...). Easy for mental math.</p>
          <p className="text-muted-foreground"><strong>Radians:</strong> A full circle is 2π radians. Chosen because it arises naturally from the geometry of circles.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The key relationship</h2>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-center text-base">
            180° = π radians
          </p>
          <p className="text-muted-foreground">Everything else follows from this one equation.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Conversions</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Degrees to Radians:</strong> multiply by π/180</li>
            <li><strong>Radians to Degrees:</strong> multiply by 180/π</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Common values</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Degrees</th><th className="p-3 text-left font-black">Radians</th><th className="p-3 text-right font-black">Radians (approx)</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">0°</td><td className="p-3">0</td><td className="p-3 text-right">0</td></tr>
                <tr className="border-t border-border"><td className="p-3">30°</td><td className="p-3">π/6</td><td className="p-3 text-right">0.5236</td></tr>
                <tr className="border-t border-border"><td className="p-3">45°</td><td className="p-3">π/4</td><td className="p-3 text-right">0.7854</td></tr>
                <tr className="border-t border-border"><td className="p-3">60°</td><td className="p-3">π/3</td><td className="p-3 text-right">1.0472</td></tr>
                <tr className="border-t border-border"><td className="p-3">90°</td><td className="p-3">π/2</td><td className="p-3 text-right">1.5708</td></tr>
                <tr className="border-t border-border"><td className="p-3">180°</td><td className="p-3">π</td><td className="p-3 text-right">3.1416</td></tr>
                <tr className="border-t border-border"><td className="p-3">270°</td><td className="p-3">3π/2</td><td className="p-3 text-right">4.7124</td></tr>
                <tr className="border-t border-border"><td className="p-3">360°</td><td className="p-3">2π</td><td className="p-3 text-right">6.2832</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">Why radians matter</h2>
          <p className="text-muted-foreground">Radians are not just an alternative - they are the natural unit for angles:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>The derivative of sin(x) is cos(x) <strong>only</strong> in radians.</li>
            <li>Arc length = radius × angle <strong>only</strong> in radians.</li>
            <li>Area of a sector = ½ × radius² × angle <strong>only</strong> in radians.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Rule of thumb</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Use DEG</strong> for everyday problems, geometry, navigation, carpentry.</li>
            <li><strong>Use RAD</strong> for calculus, physics, differential equations.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Our <Link to="/scientific-calculator" className="text-primary font-bold hover:underline">Scientific Calculator</Link> has a DEG/RAD toggle. Switch between them to see how sin(30) changes.</p>
        </div>

        <div className="my-8">
          <Link to="/scientific-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><CalcIcon className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Try DEG vs RAD</h3>
                <p className="text-sm text-muted-foreground">Live scientific calculator with mode toggle.</p>
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
            <Link to="/blog/how-to-use-scientific-calculator" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Use a Scientific Calculator</h3>
              <p className="text-xs text-muted-foreground">Trig basics explained.</p>
            </Link>
            <Link to="/blog/what-is-logarithm" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Sigma className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is a Logarithm?</h3>
              <p className="text-xs text-muted-foreground">Log and ln explained.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Degrees vs Radians'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}