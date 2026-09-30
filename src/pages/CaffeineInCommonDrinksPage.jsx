import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import ShareButtons from '../components/ShareButtons'
import { Link } from 'react-router-dom'
import { Coffee, ArrowRight, BookOpen, Clock, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQ = [
  { q: 'How much caffeine is in a cup of coffee?', a: 'A 240ml cup of brewed coffee contains about 95mg of caffeine. A single espresso shot has around 63mg. Cold brew, drip coffee, and French press can range from 100 to 200mg per cup depending on the beans, roast, and brewing strength.' },
  { q: 'Is espresso stronger than regular coffee?', a: 'Per millilitre, yes - espresso has a much higher concentration. Per serving, no. A 30ml espresso shot has about 63mg of caffeine, while a 240ml brewed coffee has about 95mg. Espresso tastes stronger but delivers less caffeine per drink.' },
  { q: 'How much caffeine is in tea?', a: 'Black tea has about 47mg per 240ml, green tea about 28mg, and white tea about 15mg. Herbal teas like chamomile and peppermint are caffeine-free because they do not come from the tea plant.' },
  { q: 'How much caffeine is in energy drinks?', a: 'A standard 250ml energy drink contains about 80mg. Larger 500ml cans can contain 160mg. Some high-caffeine energy drinks, pre-workouts, and "shot" products exceed 200mg per serving.' },
  { q: 'What is the daily safe limit for caffeine?', a: 'The FDA and EFSA consider up to 400mg per day safe for healthy adults - roughly 4 cups of coffee. Pregnant women should stay under 200mg. Adolescents should stay under 100mg. Individual tolerance varies widely.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Much Caffeine Is in Coffee, Tea, and Energy Drinks?',
  description: 'Exact caffeine content for coffee, tea, soda, and energy drinks - backed by USDA data - so you can plan your day without wrecking your sleep.' ,
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-192.png' } },
  datePublished: new Date().toISOString().split('T')[0],
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://timegovern.com/blog/caffeine-in-common-drinks' },
}

export default function CaffeineInCommonDrinksPage() {
  useEffect(() => {
    document.title = 'Caffeine in Coffee, Tea & Energy Drinks: Full Chart | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Exact caffeine content for coffee, tea, soda, and energy drinks - backed by USDA data - so you can plan your day without wrecking your sleep.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-900 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Caffeine Data</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              How Much Caffeine Is in Coffee, Tea, and Energy Drinks?
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              A complete reference of caffeine content across popular drinks - so you know exactly what you are putting in your body.
            </p>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Caffeine content is not obvious from taste, size, or color. A small espresso has less than a large cold brew. A "healthy" green tea has more than you might expect. Here is a practical reference, with typical values that match USDA and manufacturer data.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Coffee</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl">
              <thead className="bg-muted/40">
                <tr><th className="text-left p-3 font-bold">Drink</th><th className="text-left p-3 font-bold">Serving</th><th className="text-left p-3 font-bold">Caffeine</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Espresso</td><td className="p-3">30ml shot</td><td className="p-3">63mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Brewed coffee</td><td className="p-3">240ml</td><td className="p-3">95mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Latte</td><td className="p-3">Small (2 shots)</td><td className="p-3">126mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Cold brew</td><td className="p-3">240ml</td><td className="p-3">150-200mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Decaf</td><td className="p-3">240ml</td><td className="p-3">2-15mg</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Espresso looks strongest but has less per serving. Cold brew has the most, because of extended steeping. A large cold brew can exceed 300mg - close to the entire daily recommended limit for adults.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Tea</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl">
              <thead className="bg-muted/40">
                <tr><th className="text-left p-3 font-bold">Drink</th><th className="text-left p-3 font-bold">Serving</th><th className="text-left p-3 font-bold">Caffeine</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Black tea</td><td className="p-3">240ml</td><td className="p-3">47mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Green tea</td><td className="p-3">240ml</td><td className="p-3">28mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Oolong</td><td className="p-3">240ml</td><td className="p-3">38mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">White tea</td><td className="p-3">240ml</td><td className="p-3">15mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Herbal (chamomile, mint)</td><td className="p-3">240ml</td><td className="p-3">0mg</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Herbal teas are caffeine-free - they are not made from the tea plant. Matcha is an exception to the green tea numbers: a single serving can contain 60-70mg because you consume the whole leaf.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Soda and energy drinks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl">
              <thead className="bg-muted/40">
                <tr><th className="text-left p-3 font-bold">Drink</th><th className="text-left p-3 font-bold">Serving</th><th className="text-left p-3 font-bold">Caffeine</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Cola</td><td className="p-3">355ml can</td><td className="p-3">34mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Diet cola</td><td className="p-3">355ml can</td><td className="p-3">42mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Energy drink</td><td className="p-3">250ml</td><td className="p-3">80mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Large energy drink</td><td className="p-3">500ml</td><td className="p-3">160mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Pre-workout</td><td className="p-3">1 scoop</td><td className="p-3">200-300mg</td></tr>
                <tr className="border-t border-border"><td className="p-3">Caffeine tablet</td><td className="p-3">1 tablet</td><td className="p-3">100-200mg</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Pre-workout supplements are the biggest hidden source. Many users take 200-300mg in a single scoop before an evening workout, then wonder why they cannot fall asleep at 11 PM.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Daily safe limits</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Healthy adults</strong> - up to 400mg per day (roughly 4 cups of coffee)</li>
            <li><strong>Pregnant women</strong> - up to 200mg per day</li>
            <li><strong>Adolescents (12-18)</strong> - no more than 100mg per day</li>
            <li><strong>Children under 12</strong> - none recommended</li>
          </ul>
          <p>
            These are total daily limits, not per-drink limits. Four coffees spread across the day is 380mg. Add a can of cola and you are over.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">How to use this data</h2>
          <p>
            If you sleep poorly despite good habits, track your total caffeine for a week. Many people discover they are consuming 300-500mg per day without realising. Cutting total intake - not just afternoon coffee - often fixes sleep within a week.
          </p>
          <p>
            If you want to know how much is still in your system at bedtime, use the numbers above in the caffeine calculator. It handles the decay math for you.
          </p>

          <Card className="bg-amber-500/5 border-amber-500/20 mt-8">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <Coffee className="h-10 w-10 text-amber-500 shrink-0" />
              <div className="flex-1">
                <h3 className="font-black text-lg mb-1">See your caffeine at bedtime</h3>
                <p className="text-sm text-muted-foreground">
                  Pick a drink, set your time, and get the exact mg remaining in your blood at bedtime.
                </p>
              </div>
              <Link
                to="/caffeine-calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors shrink-0"
              >
                Open Calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/caffeine-half-life" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine Half-Life Explained</h3>
              <p className="text-xs text-muted-foreground">How long caffeine stays in your system, and what speeds up or slows down clearance.</p>
            </Link>
            <Link to="/blog/when-to-stop-drinking-coffee" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">When to Stop Drinking Coffee</h3>
              <p className="text-xs text-muted-foreground">Find your personalised cut-off time for better sleep tonight.</p>
            </Link>
          </div>

          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <h3 className="font-bold mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
          <ShareButtons url={window.location.href} title={document.title} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8">
            <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only and is not a substitute for professional medical advice. Caffeine sensitivity varies widely. If you are pregnant, taking medication, or have a heart condition, consult a healthcare professional.
          </div>

        </div>
      </article>
    </>
  )
}
