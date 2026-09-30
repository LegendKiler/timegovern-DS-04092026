import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import ShareButtons from '../components/ShareButtons'
import { Link } from 'react-router-dom'
import { Moon, ArrowRight, Clock, RefreshCw, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQ = [
  { q: 'How long does it take to recover from sleep debt?', a: 'For mild debt under 6 hours, two to three good nights can reset you. Moderate debt of 6 to 12 hours typically takes 1 to 2 weeks of consistently adding 1 to 1.5 hours per night. Severe chronic debt may take 3 to 4 weeks, and full cognitive recovery from months of poor sleep can take longer.' },
  { q: 'Can you recover from sleep debt in one night?', a: 'No. One long lie-in restores alertness temporarily but does not reverse the metabolic and cognitive effects of accumulated debt. Recovery requires consistently sleeping more over several nights.' },
  { q: 'Is it better to sleep in on weekends or nap during the week?', a: 'Neither fully repays debt, but short weekday naps are less disruptive than weekend lie-ins. Sleeping in disrupts your circadian rhythm, creating social jetlag that makes Monday harder. A 20 to 30 minute afternoon nap is a safer recovery tool.' },
  { q: 'What is the fastest way to pay off sleep debt?', a: 'Go to bed 1 to 1.5 hours earlier than usual every night until your debt clears. Wake at the same time every day. Add a short 20 minute nap in the early afternoon if you cannot sleep earlier. Avoid caffeine after 2 PM.' },
  { q: 'Can you fully recover from years of poor sleep?', a: 'Most studies suggest yes, but recovery takes time. The body repairs deep sleep and hormonal balance over weeks of consistent good sleep. Long-term cardiovascular and metabolic effects may persist if poor sleep was chronic for years, so prioritize sleep now.' },
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
  headline: 'How to Recover from Sleep Debt: A Realistic Plan',
  description: 'A realistic, week-by-week plan to repay sleep debt. Learn how long recovery actually takes, what works, and what does not.',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-192.png' } },
  datePublished: new Date().toISOString().split('T')[0],
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://timegovern.com/blog/how-to-recover-from-sleep-debt' },
}

export default function HowToRecoverFromSleepDebtPage() {
  useEffect(() => {
    document.title = 'How to Recover from Sleep Debt: A Realistic Plan | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A realistic, week-by-week plan to repay sleep debt. Learn how long recovery actually takes, what works, and what does not.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <RefreshCw className="h-3.5 w-3.5 text-purple-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Recovery Guide</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              How to Recover from Sleep Debt: A Realistic Plan
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              One long lie-in will not fix a week of bad sleep. Here is what actually works, and how long it takes.
            </p>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            If you have built up sleep debt, the temptation is to sleep in on Saturday and call it even.
            The problem: <strong>one long sleep does not erase cumulative debt</strong>. The body repays sleep slowly,
            the same way it accumulates it. Here is a realistic plan.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">How long does recovery take?</h2>
          <p>
            It depends on how deep the debt goes. A useful rule of thumb:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-bold">Debt Level</th>
                  <th className="text-left p-3 font-bold">Typical Recovery</th>
                  <th className="text-left p-3 font-bold">Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Under 6 hours</td><td className="p-3">2-3 nights</td><td className="p-3">Add 1 hour per night</td></tr>
                <tr className="border-t border-border"><td className="p-3">6-12 hours</td><td className="p-3">1-2 weeks</td><td className="p-3">Add 1-1.5 hours per night</td></tr>
                <tr className="border-t border-border"><td className="p-3">12-20 hours</td><td className="p-3">2-3 weeks</td><td className="p-3">Add 1.5 hours per night + short naps</td></tr>
                <tr className="border-t border-border"><td className="p-3">Over 20 hours</td><td className="p-3">3-4 weeks</td><td className="p-3">Structured recovery + medical advice</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black tracking-tight mt-8">The recovery math</h2>
          <p>
            Sleep debt is repaid the same way it is created: one night at a time. The most effective strategy is to
            add <strong>1 to 1.5 extra hours per night</strong> until your balance reaches zero.
          </p>
          <div className="bg-muted/40 border border-border rounded-xl p-4 font-mono text-sm my-4">
            <div>Recovery nights = total_debt / extra_hours_per_night</div>
          </div>
          <p>
            If you owe 10 hours and add 1 hour per night, expect about 10 nights. If you owe 20 hours and add 1.5
            hours per night, expect about 13 nights. Simple and honest.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">A 7-night sample recovery plan</h2>
          <p>
            Suppose your sleep need is 8 hours and you have 12 hours of debt. Here is how a realistic week looks:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Night 1</strong> - bed 1 hour earlier, 9 hours sleep. Debt: 11h.</li>
            <li><strong>Night 2</strong> - 9 hours sleep. Debt: 10h.</li>
            <li><strong>Night 3</strong> - 9 hours sleep. Debt: 9h.</li>
            <li><strong>Night 4</strong> - 9 hours sleep. Debt: 8h.</li>
            <li><strong>Night 5</strong> - 9 hours sleep. Debt: 7h.</li>
            <li><strong>Night 6</strong> - 9 hours sleep. Debt: 6h.</li>
            <li><strong>Night 7</strong> - 9 hours sleep. Debt: 5h.</li>
          </ul>
          <p>
            Two weeks at this pace clears 12 hours of debt. But recovery only works if you <strong>keep waking at the
            same time</strong> every day - including weekends.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">What does not work</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Weekend lie-ins</strong> - disrupt your circadian rhythm and create social jetlag</li>
            <li><strong>Sleeping pills</strong> - do not restore natural sleep architecture</li>
            <li><strong>Energy drinks</strong> - mask fatigue without repaying debt</li>
            <li><strong>One very long sleep</strong> - the body cannot repay 20 hours of debt in 12 hours of sleep</li>
          </ul>

          <h2 className="text-2xl font-black tracking-tight mt-8">Habits that speed up recovery</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Same wake time daily</strong> - anchors your body clock</li>
            <li><strong>Morning sunlight within 30 minutes of waking</strong> - resets circadian rhythm</li>
            <li><strong>No caffeine after 2 PM</strong> - caffeine has a 5-hour half-life</li>
            <li><strong>Cool, dark bedroom</strong> - 18 degrees C is ideal</li>
            <li><strong>No screens 1 hour before bed</strong> - blue light delays melatonin</li>
            <li><strong>Light exercise in the morning, not evening</strong> - raises core temperature too late at night</li>
          </ul>

          <h2 className="text-2xl font-black tracking-tight mt-8">Naps done right</h2>
          <p>
            A short afternoon nap is a powerful recovery tool. Keep it to <strong>20 to 30 minutes</strong> - long
            enough to restore alertness, short enough to avoid grogginess. Nap before 3 PM so it does not push your
            bedtime later.
          </p>

          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <Moon className="h-10 w-10 text-indigo-500 shrink-0" />
              <div className="flex-1">
                <h3 className="font-black text-lg mb-1">Know your starting point</h3>
                <p className="text-sm text-muted-foreground">
                  Log your last 7 nights and see exactly how much sleep you owe - then follow the recovery plan above.
                </p>
              </div>
              <Link
                to="/sleep-debt-calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0"
              >
                Calculate my debt <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/what-is-sleep-debt" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">What Is Sleep Debt and How Is It Calculated?</h3>
              <p className="text-xs text-muted-foreground">The complete science behind sleep debt - what it is, how it accumulates, and why it matters.</p>
            </Link>
            <Link to="/blog/sleep-debt-by-age" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Sleep Debt by Age: How Much Do You Really Need?</h3>
              <p className="text-xs text-muted-foreground">How sleep needs change from teens to older adults - and what debt looks like at every age.</p>
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
            <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only and is not a substitute for professional medical advice. If you experience ongoing sleep problems or extreme fatigue, please speak to a healthcare professional.
          </div>

        </div>
      </article>
    </>
  )
}