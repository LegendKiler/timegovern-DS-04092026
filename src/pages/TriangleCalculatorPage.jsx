import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import TriangleCalculator from '../components/calculators/TriangleCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is SSS in a triangle?", a: "SSS means Side-Side-Side: you know all three side lengths and want to find the three angles plus the area. The calculator uses the law of cosines and Heron formula." },
  { q: "What is SAS in a triangle?", a: "SAS means Side-Angle-Side: you know two sides and the angle between them. The calculator finds the third side via the law of cosines, then the remaining angles." },
  { q: "How does the right-triangle mode work?", a: "Provide the two legs a and b of a right triangle. The calculator finds the hypotenuse via the Pythagorean theorem, then the two acute angles via arctangent." },
  { q: "What is the triangle inequality theorem?", a: "The sum of any two sides of a triangle must be greater than the third side. If a + b is less than or equal to c, no triangle can exist with those side lengths." },
  { q: "How do I find the area of a triangle?", a: "With all three sides (SSS), Heron formula is used: Area = sqrt(s x (s-a) x (s-b) x (s-c)), where s is the semi-perimeter. With two sides and an included angle (SAS), Area = 0.5 x a x b x sin(C)." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Triangle Calculator', description: 'Solve triangles from SSS, SAS or right-triangle inputs. Returns all sides, angles, area and perimeter.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/triangle-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function TriangleCalculatorPage() {
  useEffect(() => {
    document.title = 'Triangle Calculator - SSS, SAS, Right Triangle | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Solve triangles from SSS, SAS or right-triangle inputs. Returns all sides, angles, area and perimeter.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Triangle Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Solve triangles from SSS, SAS or right-triangle inputs. Returns all sides, angles, area and perimeter.</p>
          </div>
        </div>

        <TriangleCalculator />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/area-calculator" className="block rounded-xl border border-border bg-card hover:border-violet-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Area Calculator</h3><p className="text-xs text-muted-foreground">Rectangles, circles, triangles</p></Link>
            <Link to="/volume-calculator" className="block rounded-xl border border-border bg-card hover:border-violet-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Volume Calculator</h3><p className="text-xs text-muted-foreground">Cube, cylinder, sphere, cone</p></Link>
            <Link to="/percentage-calculator" className="block rounded-xl border border-border bg-card hover:border-violet-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Percentage Calculator</h3><p className="text-xs text-muted-foreground">Percent of a number</p></Link>
            <Link to="/math-tools" className="block rounded-xl border border-border bg-card hover:border-violet-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Math Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Triangle Calculator'} />
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-center">
          <Link to="/math-tools" className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            See all math tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}