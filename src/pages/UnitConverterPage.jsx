import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Ruler, Sparkles, BookOpen, Calculator, FlaskConical, Gauge, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import UnitConverter from '../components/UnitConverter'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a unit converter?', a: 'A unit converter changes a value from one measurement unit to another - for example 1 metre to feet, or 100 Celsius to Fahrenheit. TimeGovern Unit Converter handles 6 categories: length, weight, temperature, volume, area, and speed.' },
  { q: 'How accurate are the conversions?', a: 'The conversions use standard internationally-agreed conversion factors (SI, imperial, and US customary). Temperature conversions are exact formulas, and the other categories use precise constants. Results are accurate to 6 decimal places.' },
  { q: 'Does it handle metric and imperial?', a: 'Yes. The converter supports both metric (metres, kilograms, litres) and imperial/US customary (feet, pounds, gallons). You can convert between any two units within the same category.' },
  { q: 'Can I convert between Celsius, Fahrenheit, and Kelvin?', a: 'Yes - the Temperature category supports all three. Formulas used: F = C * 9/5 + 32, K = C + 273.15, and reverse for each direction.' },
  { q: 'Does it save my last used units?', a: 'Yes. Your last selected category, from-unit, and to-unit are saved to your browser storage, so the converter opens where you left off. No signup, no tracking.' },
  { q: 'Is the unit converter free?', a: 'Completely free with no signup required. Works on any device - phone, tablet, or desktop - and continues to work offline once loaded.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Unit Converter', description: 'Free online unit converter. Convert length, weight, temperature, volume, area, and speed between metric and imperial units. No signup, 100% private.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/unit-converter', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['6 categories: length, weight, temperature, volume, area, speed', 'Metric and imperial units', 'All-unit conversion table', 'Copy results to clipboard', 'No signup, 100% private'] }

export default function UnitConverterPage() {
  useEffect(() => {
    document.title = 'Unit Converter - Metric & Imperial | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online unit converter. Convert length, weight, temperature, volume, area, and speed between metric and imperial units. 6 categories, no signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Ruler className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              Unit Converter
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Convert length, weight, temperature, volume, area, and speed. Metric and imperial units in one place.
            </p>
          </div>
        </div>

        <UnitConverter />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Unit Converter" inputs={{ categories: 6 }} results={{ converted: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Six categories covered</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Ruler className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Length</h3><p className="text-xs text-muted-foreground">Millimetres, centimetres, metres, kilometres, inches, feet, yards, miles, nautical miles.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Calculator className="h-5 w-5 text-teal-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Weight</h3><p className="text-xs text-muted-foreground">Milligrams, grams, kilograms, tonnes, ounces, pounds, stone.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Gauge className="h-5 w-5 text-cyan-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Temperature</h3><p className="text-xs text-muted-foreground">Celsius, Fahrenheit, and Kelvin - all six conversion directions.</p></CardContent></Card>
            <Card><CardContent className="p-5"><FlaskConical className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Volume</h3><p className="text-xs text-muted-foreground">Millilitres, litres, cubic metres, teaspoons, tablespoons, cups, pints, quarts, gallons, fluid ounces.</p></CardContent></Card>
            <Card><CardContent className="p-5"><BookOpen className="h-5 w-5 text-teal-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Area</h3><p className="text-xs text-muted-foreground">Square metres, square feet, square yards, acres, hectares, square kilometres, square miles.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Gauge className="h-5 w-5 text-cyan-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Speed</h3><p className="text-xs text-muted-foreground">Metres per second, kilometres per hour, miles per hour, knots, feet per second.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the unit converter</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick a category - Length, Weight, Temperature, Volume, Area, or Speed.</li>
            <li>Enter the value you want to convert.</li>
            <li>Choose the unit you have and the unit you want.</li>
            <li>See the result instantly - plus a full table of that value in every other unit.</li>
            <li>Click the copy icon to copy any result to your clipboard.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/utility-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/caffeine-calculator" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine Calculator</h3>
              <p className="text-xs text-muted-foreground">See caffeine levels at bedtime.</p>
            </Link>
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Compare times across cities.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Unit Converter'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> This tool is for informational purposes only. Conversions use standard SI and imperial factors accurate to 6 decimal places. No signup, no tracking.
        </div>
      </div>
    </>
  )
}