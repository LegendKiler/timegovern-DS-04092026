import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calculator as CalcIcon, Sparkles, BookOpen, Percent, Divide, Sigma, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ScientificCalculator from '../components/ScientificCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What functions does this scientific calculator have?', a: 'Trigonometric (sin, cos, tan and their inverses), logarithmic (log base 10, natural log), square root, powers, constants (π, e), and full arithmetic with parentheses.' },
  { q: 'What is DEG vs RAD mode?', a: 'DEG (degrees) and RAD (radians) are two ways to measure angles. 180 degrees = π radians. Use DEG for everyday math and RAD for calculus and physics. Most people should use DEG.' },
  { q: 'How do I enter a power like 2 to the 5?', a: 'Use the ^ button. Example: 2^5 = 32. For square root, use √ followed by the number in parentheses, e.g. √(16) = 4.' },
  { q: 'Why does sin(30) give 0.5 in DEG mode?', a: 'In degrees, sin(30°) = 0.5 - a well-known exact value. In RAD mode, sin(30 radians) gives a different answer because 30 radians is not 30 degrees.' },
  { q: 'Can I see the history of my calculations?', a: 'Yes. The last 5 calculations appear below the keypad. Click any to load its result back into the display.' },
  { q: 'Is the calculator accurate?', a: 'Yes, within floating-point precision. Results are shown to 10 decimal places. This is the same accuracy as professional scientific calculators for most uses.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Scientific Calculator', description: 'Free online scientific calculator with trig, log, powers, and DEG/RAD modes. Full keyboard support, no signup.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/scientific-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function ScientificCalculatorPage() {
  useEffect(() => {
    document.title = 'Scientific Calculator - Free Online | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online scientific calculator with trigonometric functions, logarithms, powers, and DEG/RAD modes. No signup, works offline.'
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
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Free - Full scientific - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <CalcIcon className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Scientific Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Full scientific calculator with trigonometric functions, logarithms, powers, and DEG/RAD modes.
            </p>
          </div>
        </div>

        <ScientificCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Scientific" inputs={{ type: 'scientific' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator offers</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><CalcIcon className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Trig functions</h3><p className="text-xs text-muted-foreground">sin, cos, tan and their inverses - with DEG or RAD mode toggle.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Sigma className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Logs & powers</h3><p className="text-xs text-muted-foreground">log, ln, exponentiation, square root, and constants π and e.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Percent className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">History</h3><p className="text-xs text-muted-foreground">Last 5 calculations stored. Click any to reuse the result.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Switch to DEG mode for everyday math, RAD for calculus and physics.</li>
            <li>Tap buttons to build your expression - it displays as you go.</li>
            <li>Use ( and ) for grouping. Example: (2+3)*4 = 20.</li>
            <li>Use ^ for powers. Example: 2^10 = 1024.</li>
            <li>Press = to calculate. Recent calculations appear below.</li>
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
            <Link to="/fraction-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Divide className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Fraction Calculator</h3>
              <p className="text-xs text-muted-foreground">Simplify and operate on fractions.</p>
            </Link>
            <Link to="/percentage-calculator" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Percent className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Percentage Calculator</h3>
              <p className="text-xs text-muted-foreground">Percent of, increase, decrease.</p>
            </Link>
            <Link to="/standard-deviation-calculator" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <Sigma className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">Standard Deviation</h3>
              <p className="text-xs text-muted-foreground">Statistics from any data set.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Scientific Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Results shown to 10 decimal places.
        </div>
      </div>
    </>
  )
}