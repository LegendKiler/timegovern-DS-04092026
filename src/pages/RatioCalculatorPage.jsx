import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Percent, Sparkles, BookOpen, Calculator, Divide, BarChart3, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import RatioCalculator from '../components/RatioCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a ratio?', a: 'A ratio compares two quantities. 3:2 means for every 3 of the first thing, there are 2 of the second. Ratios can be written with a colon (3:2), as a fraction (3/2), or in words (3 to 2).' },
  { q: 'How do I simplify a ratio?', a: 'Find the greatest common divisor (GCD) of both numbers, then divide both by it. Example: 15:25 → GCD is 5 → 3:5.' },
  { q: 'What is a proportion?', a: 'A proportion is an equation stating that two ratios are equal: A:B = C:D. If you know three values, you can solve for the fourth.' },
  { q: 'How do I solve a proportion?', a: 'Cross-multiply: A × D = B × C. Then solve for the unknown. Example: 3:4 = 6:? gives 3 × ? = 4 × 6, so ? = 8.' },
  { q: 'What is the difference between ratio and fraction?', a: 'A fraction represents a part of a whole (3/4 of a cake). A ratio compares two separate quantities (3 cups flour to 4 cups sugar).' },
  { q: 'Where are ratios used in real life?', a: 'Cooking (recipes), betting odds, maps (scale 1:50,000), finance (debt-to-income), chemistry (mixing ratios), and photography (aspect ratios).' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Ratio Calculator', description: 'Free ratio calculator. Simplify ratios and solve proportions (A:B = C:D) instantly.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/ratio-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function RatioCalculatorPage() {
  useEffect(() => {
    document.title = 'Ratio Calculator - Simplify Ratios & Solve Proportions | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free ratio calculator. Simplify any ratio to lowest terms and solve proportions (A:B = C:D) instantly. No signup, 100% private.'
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
              <Percent className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Ratio Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Simplify any ratio and solve proportions instantly.
            </p>
          </div>
        </div>

        <RatioCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Ratio" inputs={{ dataType: 'ratio' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator does</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Divide className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Simplify ratios</h3><p className="text-xs text-muted-foreground">Reduce any ratio to its lowest terms (like simplifying a fraction).</p></CardContent></Card>
            <Card><CardContent className="p-5"><Calculator className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Solve proportions</h3><p className="text-xs text-muted-foreground">Find the missing value in A:B = C:? using cross-multiplication.</p></CardContent></Card>
            <Card><CardContent className="p-5"><BarChart3 className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Decimal and percent</h3><p className="text-xs text-muted-foreground">See each part as a decimal and as a percent of the total.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Choose "Simplify ratio" or "Solve proportion".</li>
            <li>Simplify: enter both numbers - get lowest terms, decimal, and percentages.</li>
            <li>Solve: enter three of the four values in A:B = C:D - the fourth is computed.</li>
            <li>Copy the result for use in cooking, engineering, or homework.</li>
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
              <p className="text-xs text-muted-foreground">Add, subtract, multiply, divide fractions.</p>
            </Link>
            <Link to="/percentage-calculator" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Percent className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Percentage Calculator</h3>
              <p className="text-xs text-muted-foreground">Percent of, increase, decrease.</p>
            </Link>
            <Link to="/math-tools" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <BarChart3 className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">All Math Tools</h3>
              <p className="text-xs text-muted-foreground">Fractions, stats, calculator, and more.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Ratio Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}