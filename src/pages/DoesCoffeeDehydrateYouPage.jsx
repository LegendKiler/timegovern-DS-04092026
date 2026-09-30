import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, ArrowRight, BookOpen, Droplets, FlaskConical, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Does coffee dehydrate you?', a: 'Not in normal amounts. The mild diuretic effect of caffeine (up to 400 mg/day) does not offset the fluid consumed. Coffee contributes to daily hydration, same as water.' },
  { q: 'How much caffeine is too much?', a: 'Most health authorities recommend no more than 400 mg of caffeine per day for adults - roughly 4 cups of coffee. Above that, dehydration risk and other side effects increase.' },
  { q: 'Is tea as hydrating as water?', a: 'Yes, essentially. Tea is 99% water and the caffeine dose is usually smaller than coffee. Herbal teas contain no caffeine and are especially hydrating.' },
  { q: 'What about energy drinks?', a: 'They contain caffeine and often high sugar, so they are less healthy than water or coffee but still count as fluid. Not recommended as primary hydration.' },
  { q: 'Does alcohol dehydrate you?', a: 'Yes, alcohol is a genuine diuretic and does increase fluid loss. Alcohol does not count toward water intake, and it worsens dehydration during the hangover phase.' },
  { q: 'Should I drink more water if I drink coffee?', a: 'Not necessary if total daily fluid intake meets your target. The idea that you need extra water to compensate for coffee is a myth.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Does Coffee Dehydrate You? The Science Behind the Myth', description: 'Coffee and dehydration - what the research actually shows, how much caffeine is too much, and what counts as fluid intake.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/does-coffee-dehydrate-you' }

export default function DoesCoffeeDehydrateYouPage() {
  useEffect(() => {
    document.title = 'Does Coffee Dehydrate You? The Science Behind the Myth | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Does coffee dehydrate you? The research says no - moderate caffeine does not offset the fluid consumed. Here is the full story.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Does Coffee Dehydrate You?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full mb-4">
            <FlaskConical className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Science - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Does Coffee Dehydrate You?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Short answer: no. Longer answer: it depends on how much you drink, and the myth has a specific origin.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence answer</h2>
          <p className="text-muted-foreground">Moderate coffee consumption (up to about 4 cups/day, roughly 400 mg caffeine) does not cause net fluid loss. The water in coffee more than offsets its mild diuretic effect.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Where the myth came from</h2>
          <p className="text-muted-foreground">Early research on caffeine and hydration focused on concentrated doses of pure caffeine, not coffee. At doses above 500 mg, caffeine acts as a diuretic - it increases urine output.</p>
          <p className="text-muted-foreground">What those studies missed: a cup of coffee is 98-99% water. The fluid you consume is far greater than the extra fluid you excrete. Only at high doses (above 500 mg caffeine) does the diuretic effect start to offset fluid intake.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What the research says</h2>
          <p className="text-muted-foreground">Multiple controlled studies have tested this directly:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>2014 study (Killer, Blannin, Jeukendrup) - found no difference in hydration markers between drinking coffee vs water.</li>
            <li>2015 review (Institute for Scientific Information on Coffee) - concluded moderate coffee contributes to daily fluid intake, similar to water.</li>
            <li>Regular coffee drinkers develop tolerance to caffeine's diuretic effect within 3-5 days.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">How much is too much?</h2>
          <p className="text-muted-foreground">Most health authorities recommend no more than <strong>400 mg of caffeine per day</strong> for healthy adults. That is roughly:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>4 standard cups of coffee (240 ml each)</li>
            <li>8 standard cups of black tea</li>
            <li>2 energy drinks</li>
            <li>10 cans of cola</li>
          </ul>
          <p className="text-muted-foreground">Above 400 mg, dehydration risk increases, along with anxiety, insomnia, and digestive issues. Pregnant women should limit to 200 mg/day.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What actually dehydrates you</h2>
          <p className="text-muted-foreground">If coffee is not the villain, what is?</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Alcohol</strong> - a genuine diuretic. Does not count toward fluid intake.</li>
            <li><strong>Very high caffeine doses</strong> - above 500 mg in a single session.</li>
            <li><strong>Heavy sweating</strong> - exercise, heat, fever.</li>
            <li><strong>Illness</strong> - vomiting, diarrhoea.</li>
            <li><strong>Certain medications</strong> - diuretics, some blood pressure medicines.</li>
            <li><strong>High-sodium meals</strong> - increase fluid needs to process sodium.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Do I need extra water if I drink coffee?</h2>
          <p className="text-muted-foreground">No. If your total daily fluid intake meets your hydration target (weight-based, plus activity and climate adjustments), coffee counts as part of it. You do not need to "compensate" with extra water.</p>
          <p className="text-muted-foreground">That said, coffee is a mild diuretic and the effect is stronger in people who do not drink it regularly. On the day you drink a triple espresso for the first time in months, add a glass of water. Regular coffee drinkers have no adjustment needed.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Useful context: caffeine timing</h2>
          <p className="text-muted-foreground">Coffee has a bigger impact on sleep than on hydration. Caffeine has a half-life of 5-6 hours in adults - meaning half is still in your system 6 hours after drinking. Avoid coffee after 2pm if you are sensitive or aiming for quality sleep.</p>
          <p className="text-muted-foreground">For sleep-specific guidance, try our <Link to="/caffeine-calculator" className="text-primary font-bold hover:underline">Caffeine Calculator</Link>.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">Killer SC, Blannin AK, Jeukendrup AE. "No Evidence of Dehydration with Moderate Daily Coffee Intake." PLoS ONE, 2014. Institute for Scientific Information on Coffee. "Caffeine and hydration." 2015. European Food Safety Authority (EFSA) caffeine safety assessment, 2015.</p>
        </div>

        <div className="my-8">
          <Link to="/water-intake-calculator" className="block rounded-2xl border-2 border-sky-500/30 bg-sky-500/5 hover:border-sky-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md"><Droplets className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-sky-500 transition-colors">Calculate your hydration target</h3>
                <p className="text-sm text-muted-foreground">Personalised daily water intake.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-sky-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/how-much-water-should-i-drink" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How Much Water Should I Drink?</h3>
              <p className="text-xs text-muted-foreground">The complete daily intake guide.</p>
            </Link>
            <Link to="/blog/dehydration-signs" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Calculator className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Dehydration Signs to Watch For</h3>
              <p className="text-xs text-muted-foreground">Early warning signs and how to fix them.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Does Coffee Dehydrate You?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}