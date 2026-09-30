import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import ShareButtons from '../components/ShareButtons'
import { Link } from 'react-router-dom'
import { Coffee, ArrowRight, Clock, BookOpen, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQ = [
  { q: 'What time should I stop drinking coffee?', a: 'Most sleep experts recommend stopping caffeine 6 to 8 hours before bed. For a stronger buffer against sleep disruption, stop 10 to 12 hours before. The exact cut-off depends on your dose and your personal caffeine sensitivity.' },
  { q: 'Is 2 PM too late for coffee?', a: 'If you go to bed at 10 PM, 2 PM is 8 hours before bedtime - a reasonable cut-off for a single cup. If you are a slow metaboliser or drink a larger dose, 2 PM may still leave meaningful caffeine at bedtime. The safest universal rule is no caffeine after noon.' },
  { q: 'Does decaf really have no caffeine?', a: 'Decaf still contains 2 to 15mg of caffeine per cup. That is low enough to be safe for most people at any hour, but if you are highly sensitive or drinking multiple cups, it can add up.' },
  { q: 'Can I drink coffee after dinner if I have a high tolerance?', a: 'Tolerance affects how caffeine feels, not how it affects your sleep architecture. Even high-tolerance drinkers show reduced deep sleep when caffeine is present at bedtime. Try cutting off earlier for one week and compare how you feel.' },
  { q: 'What if I need caffeine to get through the afternoon?' , a: 'That need is often a sign of accumulated sleep debt. The fix is more sleep, not more caffeine. Try a 20-minute afternoon nap instead, or go to bed 30 minutes earlier for a week.' },
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
  headline: 'When to Stop Drinking Coffee for Better Sleep',
  description: 'Learn when to stop drinking coffee for better sleep. A practical guide based on your dose, sensitivity, and bedtime - with a free calculator.' ,
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-192.png' } },
  datePublished: new Date().toISOString().split('T')[0],
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://timegovern.com/blog/when-to-stop-drinking-coffee' },
}

export default function WhenToStopDrinkingCoffeePage() {
  useEffect(() => {
    document.title = 'When to Stop Drinking Coffee for Better Sleep | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Learn when to stop drinking coffee for better sleep. A practical guide based on your dose, sensitivity, and bedtime - with a free calculator.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-amber-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sun className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Sleep &amp; Caffeine</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              When to Stop Drinking Coffee for Better Sleep
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              There is no universal cut-off time - but there is a personalised one. Here is how to find yours.
            </p>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Everyone has heard the rule "no coffee after 2 PM." It is a decent starting point, but it ignores three things that matter more: <strong>how much you drink</strong>, <strong>how fast your body clears caffeine</strong>, and <strong>what time you go to bed</strong>. Here is how to compute your actual cut-off.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">The three variables</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dose</strong> - a single espresso (63mg) is very different from a large cold brew (300mg+)</li>
            <li><strong>Half-life</strong> - caffeine clears in 3 hours for fast metabolisers, 5 for average adults, 7+ for slow metabolisers</li>
            <li><strong>Bedtime</strong> - the earlier you go to bed, the earlier your cut-off must be</li>
          </ul>
          <p>
            Change any one of these and your cut-off time shifts. That is why a fixed rule does not work for everyone.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">The 30mg target</h2>
          <p>
            Sleep researchers generally consider <strong>under 30mg of caffeine at bedtime</strong> to be low enough to avoid measurable sleep disruption. Some very sensitive people need to target 10mg or less. Here is what a 30mg target means in practice:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-bold">Drink</th>
                  <th className="text-left p-3 font-bold">Caffeine</th>
                  <th className="text-left p-3 font-bold">Cut-off before bed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Green tea</td><td className="p-3">28mg</td><td className="p-3">~5 hours</td></tr>
                <tr className="border-t border-border"><td className="p-3">Espresso</td><td className="p-3">63mg</td><td className="p-3">~7 hours</td></tr>
                <tr className="border-t border-border"><td className="p-3">Coffee (240ml)</td><td className="p-3">95mg</td><td className="p-3">~8 hours</td></tr>
                <tr className="border-t border-border"><td className="p-3">Energy drink</td><td className="p-3">160mg</td><td className="p-3">~11 hours</td></tr>
                <tr className="border-t border-border"><td className="p-3">Pre-workout</td><td className="p-3">300mg</td><td className="p-3">~13 hours</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            These assume a 5-hour half-life. If you are a fast metaboliser, subtract 1-2 hours. If you are a slow metaboliser, add 2-4 hours.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">If you go to bed at 11 PM</h2>
          <p>
            This is the most common bedtime for adults. Here are your personal cut-offs:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Green tea</strong> - 6 PM</li>
            <li><strong>Espresso</strong> - 4 PM</li>
            <li><strong>Coffee</strong> - 3 PM</li>
            <li><strong>Energy drink</strong> - 12 PM (noon)</li>
            <li><strong>Pre-workout</strong> - 10 AM</li>
          </ul>
          <p>
            If that feels aggressive, remember: the trade-off is not "sleepy vs. awake," it is "awake now vs. restorative sleep tonight." A single afternoon coffee can cost you 30-60 minutes of deep sleep, which you will feel the next day.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Slow metabolisers - add hours</h2>
          <p>
            You are likely a slow metaboliser if:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You feel caffeine strongly and for a long time</li>
            <li>A 4 PM coffee keeps you up past midnight</li>
            <li>You get jittery or anxious after small amounts</li>
            <li>You take oral contraceptives (roughly doubles half-life)</li>
            <li>You are pregnant (half-life can extend to 15 hours)</li>
          </ul>
          <p>
            For slow metabolisers, the standard cut-offs above should be pushed back by 3-4 hours. An 11 PM bedtime might mean no caffeine after 9 or 10 AM.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Decaf is not zero caffeine</h2>
          <p>
            Decaf coffee still contains 2-15mg of caffeine per cup. That is low enough for most people at any hour, but not zero. If you are extremely caffeine-sensitive and drink 4 cups of decaf in the evening, you are still consuming meaningful amounts.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">When you need caffeine to function</h2>
          <p>
            If you cannot get through the afternoon without caffeine, that is usually <strong>a symptom of sleep debt</strong>, not a caffeine problem. The fix is not better timing - it is going to bed earlier. Try one week of no caffeine after noon and see if your energy levels stabilise.
          </p>

          <Card className="bg-amber-500/5 border-amber-500/20 mt-8">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <Coffee className="h-10 w-10 text-amber-500 shrink-0" />
              <div className="flex-1">
                <h3 className="font-black text-lg mb-1">Get your exact cut-off time</h3>
                <p className="text-sm text-muted-foreground">
                  Pick your drink, dose, sensitivity, and bedtime. The caffeine calculator tells you the latest time you can drink without affecting sleep.
                </p>
              </div>
              <Link
                to="/caffeine-calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors shrink-0"
              >
                Calculate my cut-off <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/caffeine-half-life" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine Half-Life Explained</h3>
              <p className="text-xs text-muted-foreground">How long caffeine really stays in your system - and why the number varies from person to person.</p>
            </Link>
            <Link to="/blog/caffeine-in-common-drinks" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine in Common Drinks</h3>
              <p className="text-xs text-muted-foreground">Exact mg for coffee, tea, soda, and energy drinks so you can plan your day.</p>
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
            <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only and is not a substitute for professional medical advice. If you have a heart condition, are pregnant, or take regular medication, speak with a healthcare professional before adjusting your caffeine intake.
          </div>

        </div>
      </article>
    </>
  )
}
