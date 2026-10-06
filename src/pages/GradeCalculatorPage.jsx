import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import GradeCalculator from '../components/calculators/GradeCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How is a weighted grade calculated?", a: "Each grade is multiplied by its weight, the products are summed, then divided by the total weight. For example, 85% weighted at 40% plus 92% weighted at 60% gives (85x0.4) + (92x0.6) = 89.2%." },
  { q: "What grading scale does each country use?", a: "The US uses a 4.0 GPA scale with letter grades. The UK uses class honours (First, 2:1, 2:2, Third). Germany uses 1-6 with 1 the best. France uses 0-20. India uses grades O, A+, A, B+, B, C, F. Most of Asia uses a 100-point percentage scale." },
  { q: "Can I mix scales in one calculation?", a: "No. Enter all grades as percentages (0-100) and the calculator converts the weighted average into the selected country scale automatically." },
  { q: "What is the difference between weighted and simple average?", a: "Simple average treats all grades equally. Weighted average gives higher-weight assignments more influence. Most courses use weighted averages for exams, papers, and participation." },
  { q: "Is this the same as GPA?", a: "The US 4.0 output is equivalent to a GPA score for the given percentage average, but full GPA calculations also track credit hours per course. For a proper GPA see our GPA Calculator." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Grade Calculator', description: 'Calculate weighted grades and see your result in US GPA, UK class, German, French, Indian, or percentage scales. 204 countries supported.', applicationCategory: 'EducationApplication', operatingSystem: 'Web', url: 'https://timegovern.com/grade-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function GradeCalculatorPage() {
  useEffect(() => {
    document.title = 'Grade Calculator - Free | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Calculate weighted grades and see your result in US GPA, UK class, German, French, Indian, or percentage scales. 204 countries supported.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br amber-950 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Grade Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Calculate weighted grades and see your result in US GPA, UK class, German, French, Indian, or percentage scales. 204 countries supported.</p>
          </div>
        </div>

        <GradeCalculator />

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
            <Link to="/gpa-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">GPA Calculator</h3><p className="text-xs text-muted-foreground">Credit-weighted GPA</p></Link>
            <Link to="/percentage-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Percentage Calculator</h3><p className="text-xs text-muted-foreground">Percent of a number</p></Link>
            <Link to="/average-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Average Calculator</h3><p className="text-xs text-muted-foreground">Mean, median, mode</p></Link>
            <Link to="/math-tools" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Math Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Grade Calculator'} />
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
