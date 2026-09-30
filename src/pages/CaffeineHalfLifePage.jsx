import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import ShareButtons from '../components/ShareButtons'
import { Link } from 'react-router-dom'
import { Coffee, ArrowRight, Clock, BookOpen, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQ = [
  { q: 'What is the half-life of caffeine?', a: 'The average half-life of caffeine is about 5 hours in healthy adults. This means that 5 hours after drinking a coffee, half the caffeine is still in your bloodstream. After 10 hours, 25% remains. After 15 hours, 12.5% remains.' },
  { q: 'Does caffeine half-life vary between people?', a: 'Yes, dramatically. Fast metabolisers and smokers clear caffeine in about 3 hours. Slow metabolisers, pregnant women, and people on certain medications may take 7 hours or longer. Genetics play a major role in how fast your liver processes caffeine.' },
  { q: 'How long until caffeine is completely out of your system?', a: 'It takes roughly 5 half-lives for a substance to be effectively eliminated. For caffeine that is about 25 hours on average - longer if you are a slow metaboliser. Trace amounts can be detected for up to 40 to 50 hours.' },
  { q: 'Does coffee tolerance affect caffeine half-life?', a: 'Tolerance affects how your brain responds to caffeine but does not change how fast your liver clears it. Regular coffee drinkers still have the same half-life - they just feel the effects less because their adenosine receptors have adapted.' },
  { q: 'What speeds up or slows down caffeine metabolism?', a: 'Smoking speeds it up by about 50%. Oral contraceptives, pregnancy, liver disease, and certain antibiotics slow it down significantly. Grapefruit juice and some medications also extend caffeine effects.' },
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
  headline: 'Caffeine Half-Life: How Long Does It Really Stay in Your System?',
  description: 'The average caffeine half-life is 5 hours - but it ranges from 3 to 7 depending on genetics, medications, and lifestyle. Learn what affects your own clearance rate.',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-192.png' } },
  datePublished: new Date().toISOString().split('T')[0],
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://timegovern.com/blog/caffeine-half-life' },
}

export default function CaffeineHalfLifePage() {
  useEffect(() => {
    document.title = 'Caffeine Half-Life: How Long Does It Stay? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The average caffeine half-life is 5 hours - but it ranges from 3 to 7 depending on genetics, medications, and lifestyle. Learn what affects your own clearance rate.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Caffeine Science</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Caffeine Half-Life: How Long Does It Really Stay in Your System?
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              The average half-life is 5 hours - but that number varies wildly. Here is what determines how long caffeine stays in your blood.
            </p>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            If you drink coffee in the afternoon, the question is not whether caffeine is still in your system at bedtime - it is how much. The answer depends on a number called the <strong>caffeine half-life</strong>, and understanding it changes how you plan your day.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">What is a half-life?</h2>
          <p>
            A half-life is the time it takes your body to eliminate half of a substance. For caffeine, that is roughly <strong>5 hours</strong> in healthy adults. Five hours after a 100mg coffee, 50mg remains. Five hours after that, 25mg. Five hours after that, 12.5mg.
          </p>
          <p>
            This is exponential decay - the amount drops fast at first, then slower. By the time you hit 5 half-lives, only about 3% of the original dose remains. For caffeine, that is around 25 hours. But the effects on sleep can linger much longer than the numbers suggest.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">The 5-hour average - and why you might be different</h2>
          <p>
            The "5 hours" number is an average. Real-world half-life ranges from 3 to 7 hours depending on several factors:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Genetics</strong> - variations in the CYP1A2 gene determine how fast your liver processes caffeine</li>
            <li><strong>Smoking</strong> - cuts half-life to about 3 hours by speeding up liver enzymes</li>
            <li><strong>Pregnancy</strong> - extends half-life to 15 hours or more, especially in the third trimester</li>
            <li><strong>Oral contraceptives</strong> - roughly double the half-life</li>
            <li><strong>Liver disease</strong> - significantly slows clearance</li>
            <li><strong>Certain medications</strong> - some antibiotics, antidepressants, and heart medications slow it down</li>
          </ul>

          <h2 className="text-2xl font-black tracking-tight mt-8">How much caffeine is left at bedtime?</h2>
          <p>
            Say you drink a 95mg coffee at 2 PM and go to bed at 11 PM - 9 hours later. At a 5-hour half-life:
          </p>
          <div className="bg-muted/40 border border-border rounded-xl p-4 font-mono text-sm my-4">
            <div>9 hours ÷ 5 = 1.8 half-lives</div>
            <div>95mg × 0.5^1.8 ≈ 27mg remaining at bedtime</div>
          </div>
          <p>
            That 27mg is enough to measurably reduce deep sleep, delay sleep onset, and increase night wakings - even if you do not "feel" the caffeine. Caffeine blocks adenosine, the chemical that builds up in your brain all day to make you sleepy. Even a small amount interferes with that process.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Why caffeine affects sleep more than it feels like</h2>
          <p>
            Subjectively, you might feel fine. The half-life math does not care. Studies using sleep trackers show that caffeine consumed 6 hours before bed reduces total sleep time by around an hour and cuts slow-wave (deep) sleep by up to 20%. You will not feel the difference overnight - but your recovery, mood, and cognitive performance the next day will show it.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">The last-call time for your bedtime</h2>
          <p>
            A useful rule: aim for <strong>less than 30mg</strong> of caffeine at bedtime. Work backwards from your dose:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>95mg coffee</strong> - stop 8 hours before bed</li>
            <li><strong>200mg double coffee or energy drink</strong> - stop 11 hours before bed</li>
            <li><strong>400mg pre-workout</strong> - stop 14 hours before bed</li>
            <li><strong>28mg green tea</strong> - stop 5 hours before bed</li>
          </ul>

          <h2 className="text-2xl font-black tracking-tight mt-8">What about coffee tolerance?</h2>
          <p>
            Regular coffee drinkers often say caffeine "does not affect them anymore." This is partially true - the subjective effects fade because your brain adapts. But the half-life is unchanged. The adenosine blockade still happens. Sleep architecture is still affected. You have simply stopped noticing.
          </p>

          <Card className="bg-amber-500/5 border-amber-500/20 mt-8">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <Coffee className="h-10 w-10 text-amber-500 shrink-0" />
              <div className="flex-1">
                <h3 className="font-black text-lg mb-1">Find your personal last-call time</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your dose, drink time, bedtime, and sensitivity. Our caffeine calculator shows exactly how much is left in your system at bedtime and the latest time you can drink.
                </p>
              </div>
              <Link
                to="/caffeine-calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors shrink-0"
              >
                Try the Calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/when-to-stop-drinking-coffee" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">When to Stop Drinking Coffee for Better Sleep</h3>
              <p className="text-xs text-muted-foreground">A practical guide to finding your personal cut-off time based on dose, sensitivity, and bedtime.</p>
            </Link>
            <Link to="/blog/caffeine-in-common-drinks" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">How Much Caffeine Is in Common Drinks?</h3>
              <p className="text-xs text-muted-foreground">Exact caffeine content for coffee, tea, soda, and energy drinks - backed by USDA data.</p>
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
            <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only and is not a substitute for professional medical advice. Caffeine metabolism varies widely. If you are pregnant, taking medication, or have a heart condition, please consult a healthcare professional.
          </div>

        </div>
      </article>
    </>
  )
}
