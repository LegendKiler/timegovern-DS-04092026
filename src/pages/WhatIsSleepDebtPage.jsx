import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import ShareButtons from '../components/ShareButtons'
import { Link } from 'react-router-dom'
import { Moon, ArrowRight, BookOpen, RefreshCw, Users, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQ = [
  { q: 'What is a normal amount of sleep debt?', a: 'There is no "normal" sleep debt - any ongoing deficit is worth addressing. Research suggests even 5 hours of accumulated debt affects alertness and mood. A healthy target is zero, meaning you consistently meet your nightly sleep need.' },
  { q: 'Can you die from sleep debt?', a: 'Sleep debt itself does not directly cause death, but chronic severe sleep deprivation increases risk of cardiovascular disease, diabetes, obesity, and accidents. It also impairs immune function. If you are experiencing extreme fatigue, speak with a doctor.' },
  { q: 'How long does it take to recover from sleep debt?', a: 'For mild debt (under 6 hours), a couple of good nights can reset you. Moderate debt (6 to 12 hours) typically takes 1 to 2 weeks of consistent extra sleep. Severe chronic debt may take 3 to 4 weeks, and full cognitive recovery from months of poor sleep can take longer.' },
  { q: 'Is 6 hours of sleep enough?', a: 'For most adults, no. The National Sleep Foundation recommends 7 to 9 hours. A small percentage of people have a genetic variant that allows them to function on 6 hours, but this is rare. Most people who think they need only 6 hours are chronically sleep-deprived.' },
  { q: 'Does sleep debt affect weight?', a: 'Yes. Sleep debt disrupts the hormones ghrelin and leptin that regulate hunger and satiety, increases cortisol, and reduces insulin sensitivity. Studies show that people who consistently sleep under 6 hours are significantly more likely to be overweight.' },
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
  headline: 'What Is Sleep Debt and How Is It Calculated?',
  description: 'Sleep debt is the cumulative shortfall between the sleep you need and the sleep you actually get. Learn how it is calculated, why it matters, and how to recover.',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-192.png' } },
  datePublished: new Date().toISOString().split('T')[0],
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://timegovern.com/blog/what-is-sleep-debt' },
}

export default function WhatIsSleepDebtPage() {
  useEffect(() => {
    document.title = 'What Is Sleep Debt and How Is It Calculated? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Sleep debt is the cumulative shortfall between the sleep you need and the sleep you actually get. Learn how it is calculated, why it matters, and how to recover.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <BookOpen className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Sleep Science</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              What Is Sleep Debt and How Is It Calculated?
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Sleep debt is the cumulative shortfall between the sleep your body needs and the sleep it actually gets.
              Here is how it works, why it matters, and how to recover.
            </p>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            You know the feeling: groggy mornings, mid-afternoon crashes, and a fog that never quite lifts.
            That feeling has a name - <strong>sleep debt</strong> - and it accumulates the same way financial debt does.
            Miss an hour here, an hour there, and the balance grows. Left unchecked, it affects everything from
            your mood to your metabolism to your long-term health.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">What is sleep debt?</h2>
          <p>
            Sleep debt is the <strong>cumulative difference between the amount of sleep you need and the amount you actually get</strong>.
            If your body needs 8 hours a night but you sleep 6.5, you accumulate 1.5 hours of debt each night.
            Over a week, that is more than 10 hours of missing sleep - the equivalent of pulling an all-nighter.
          </p>
          <p>
            Sleep debt is not a moral failing. It is a biological fact. Your body keeps score whether you want it to or not.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">How does sleep debt accumulate?</h2>
          <p>Sleep debt accumulates through two mechanisms:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Daily shortfall</strong> - sleeping less than your nightly need on any given night.</li>
            <li><strong>Compounding effect</strong> - each shortfall adds to the previous ones, so the debt grows non-linearly in terms of how tired you feel.</li>
          </ul>
          <p>
            Crucially, <strong>surplus sleep does not create negative debt</strong>. Sleeping 10 hours when you need 8
            does not "bank" credit. Your body simply stops accumulating for that night. This is why you cannot
            "prepay" sleep - you can only reduce the balance.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">The math behind sleep debt</h2>
          <p>The formula is straightforward:</p>
          <div className="bg-muted/40 border border-border rounded-xl p-4 font-mono text-sm my-4">
            <div>Per-night deficit = max(0, sleep_need - actual_hours)</div>
            <div className="mt-1">Total sleep debt = sum of per-night deficits over window</div>
          </div>
          <p>
            Most sleep scientists track debt over a <strong>7 to 14 day rolling window</strong>. A 14-day window gives
            more weight to recent nights while smoothing out a single bad night.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Sleep need by age</h2>
          <p>The National Sleep Foundation recommends different amounts depending on age:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-bold">Age Group</th>
                  <th className="text-left p-3 font-bold">Recommended</th>
                  <th className="text-left p-3 font-bold">May be appropriate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Teens (14-17)</td><td className="p-3">8-10 hours</td><td className="p-3">7-11 hours</td></tr>
                <tr className="border-t border-border"><td className="p-3">Young adults (18-25)</td><td className="p-3">7-9 hours</td><td className="p-3">6-11 hours</td></tr>
                <tr className="border-t border-border"><td className="p-3">Adults (26-64)</td><td className="p-3">7-9 hours</td><td className="p-3">6-10 hours</td></tr>
                <tr className="border-t border-border"><td className="p-3">Older adults (65+)</td><td className="p-3">7-8 hours</td><td className="p-3">5-9 hours</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black tracking-tight mt-8">Signs you have sleep debt</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Waking up tired even after a full night</li>
            <li>Needing an alarm clock - and still hitting snooze</li>
            <li>Falling asleep within 5 minutes of lying down</li>
            <li>Afternoon energy crashes</li>
            <li>Irritability, anxiety, or low mood</li>
            <li>Difficulty concentrating or remembering things</li>
            <li>Increased appetite, especially for sugar and carbs</li>
          </ul>

          <h2 className="text-2xl font-black tracking-tight mt-8">Why you cannot catch up with one long sleep</h2>
          <p>
            Sleeping in on Saturday feels good, but it does not erase the week's debt. Research shows that
            <strong>recovery sleep restores alertness but does not fully reverse metabolic damage</strong> caused by
            chronic sleep loss. Weekend catch-up sleep also disrupts your circadian rhythm, creating a
            "social jetlag" effect that starts the next week already off-balance.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Health consequences of long-term sleep debt</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cardiovascular</strong> - higher risk of hypertension, heart attack, and stroke</li>
            <li><strong>Metabolic</strong> - weight gain, insulin resistance, Type 2 diabetes</li>
            <li><strong>Cognitive</strong> - memory loss, reduced focus, slower reaction time</li>
            <li><strong>Mental health</strong> - anxiety, depression, mood swings</li>
            <li><strong>Immune</strong> - more frequent illness, slower recovery</li>
          </ul>

          <h2 className="text-2xl font-black tracking-tight mt-8">How to recover from sleep debt</h2>
          <p>
            There is only one way to repay sleep debt: <strong>sleep more</strong>. The most effective strategy is
            to add <strong>1 to 1.5 extra hours per night</strong> until your balance reaches zero. A realistic
            timeline for 15 hours of debt would be roughly 10 to 15 nights.
          </p>
          <p>Supporting habits make recovery faster:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Wake at the same time every day</strong>, including weekends - this anchors your circadian rhythm</li>
            <li><strong>Get morning sunlight</strong> within 30 minutes of waking</li>
            <li><strong>Avoid caffeine after 2 PM</strong> - caffeine has a 5-hour half-life</li>
            <li><strong>Keep your bedroom cool and dark</strong> - around 18 degrees C</li>
            <li><strong>Take short naps (20-30 min)</strong> if you cannot sleep earlier</li>
          </ul>

          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <Moon className="h-10 w-10 text-indigo-500 shrink-0" />
              <div className="flex-1">
                <h3 className="font-black text-lg mb-1">Calculate your own sleep debt</h3>
                <p className="text-sm text-muted-foreground">
                  Free tool. Log your last 7 nights and see exactly how much sleep you owe - plus a personalised recovery plan. No signup, 100% private.
                </p>
              </div>
              <Link
                to="/sleep-debt-calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0"
              >
                Try the Calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/how-to-recover-from-sleep-debt" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <RefreshCw className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How to Recover from Sleep Debt</h3>
              <p className="text-xs text-muted-foreground">A realistic plan for repaying sleep debt - week by week, backed by science.</p>
            </Link>
            <Link to="/blog/sleep-debt-by-age" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Users className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Sleep Debt by Age</h3>
              <p className="text-xs text-muted-foreground">How sleep needs change from teens to older adults - and what debt looks like at every age.</p>
            </Link><Link to="/blog/how-much-sleep-do-you-need" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">How Much Sleep Do You Need?</h3><p className="text-xs text-muted-foreground">Sleep needs by age.</p></Link>
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
            <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational
            purposes only and is not a substitute for professional medical advice. If you experience ongoing sleep problems
            or extreme fatigue, please speak to a healthcare professional.
          </div>

        </div>
      </article>
    </>
  )
}