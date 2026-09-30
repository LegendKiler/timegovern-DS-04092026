import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import ShareButtons from '../components/ShareButtons'
import { Link } from 'react-router-dom'
import { Moon, ArrowRight, Users, BookOpen, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQ = [
  { q: 'Do older adults need less sleep?', a: 'Older adults need slightly less - about 7 to 8 hours, compared with 7 to 9 for younger adults. But the bigger change is sleep quality: older adults spend less time in deep sleep and wake more often during the night. This makes sleep debt accumulate faster even at the same hours.' },
  { q: 'How much sleep does a teenager need?', a: 'Teens aged 14 to 17 need 8 to 10 hours per night. Their circadian rhythm naturally shifts later, making early school start times a major cause of teenage sleep debt. Most teens are chronically sleep-deprived.' },
  { q: 'Do children have sleep debt?', a: 'Yes. School-age children aged 6 to 13 need 9 to 11 hours. Sleep debt in children shows up as irritability, difficulty concentrating, and even hyperactivity - often mistaken for ADHD.' },
  { q: 'Does sleep need change with age?', a: 'Yes. Total sleep need decreases slightly across the lifespan, but never below 7 hours for healthy adults. What changes most is the ability to stay asleep - older adults wake more often, so they accumulate debt more easily.' },
  { q: 'How do I check my sleep debt for my age?', a: 'Use the sleep need for your age group as your baseline (8 hours for adults 26-64, 7.5 for 65+, 9 for teens), then subtract each night actual sleep and add the deficits. Our free calculator does this automatically.' },
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
  headline: 'Sleep Debt by Age: How Much Sleep Do You Really Need?',
  description: 'Sleep needs change across the lifespan. See recommended hours for every age group and how sleep debt accumulates for teens, adults, and older adults.',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-192.png' } },
  datePublished: new Date().toISOString().split('T')[0],
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://timegovern.com/blog/sleep-debt-by-age' },
}

export default function SleepDebtByAgePage() {
  useEffect(() => {
    document.title = 'Sleep Debt by Age: How Much Sleep Do You Need? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Sleep needs change across the lifespan. See recommended hours for every age group and how sleep debt accumulates for teens, adults, and older adults.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Users className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Age &amp; Sleep</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Sleep Debt by Age: How Much Sleep Do You Really Need?
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Recommended hours change from teens to older adults. Here is how sleep needs shift - and what debt
              looks like at every age.
            </p>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Sleep need is not a single number. It changes with age - and the way debt accumulates changes with it.
            An 8-hour target for a teenager looks very different than an 8-hour target for a 70-year-old.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Recommended sleep by age</h2>
          <p>
            The National Sleep Foundation publishes ranges that most sleep scientists use as a baseline.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-bold">Age</th>
                  <th className="text-left p-3 font-bold">Recommended</th>
                  <th className="text-left p-3 font-bold">Typical Debt Profile</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Teens (14-17)</td><td className="p-3">8-10 hours</td><td className="p-3">High debt - circadian shift + early school</td></tr>
                <tr className="border-t border-border"><td className="p-3">Young adults (18-25)</td><td className="p-3">7-9 hours</td><td className="p-3">Moderate-high - social + academic load</td></tr>
                <tr className="border-t border-border"><td className="p-3">Adults (26-64)</td><td className="p-3">7-9 hours</td><td className="p-3">Very high - work, kids, screens</td></tr>
                <tr className="border-t border-border"><td className="p-3">Older adults (65+)</td><td className="p-3">7-8 hours</td><td className="p-3">Moderate - fragmented sleep, waking more</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black tracking-tight mt-8">Teens (14-17): the most sleep-deprived group</h2>
          <p>
            Teens need <strong>8 to 10 hours</strong>, but their circadian rhythm naturally shifts 1 to 2 hours later
            during puberty. Combined with early school start times, this creates chronic sleep debt in most teenagers.
            The consequences go beyond tiredness: poorer grades, higher rates of anxiety and depression, and more
            accidents.
          </p>
          <p>
            Studies suggest most teens get 7 hours or less on school nights. That is <strong>1 to 3 hours of debt per
            night</strong> - a huge cumulative load by Friday.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Young adults (18-25): the transition trap</h2>
          <p>
            Sleep need drops slightly to <strong>7 to 9 hours</strong>, but university schedules, part-time jobs, and
            irregular social rhythms mean sleep timing is chaotic. Debt accumulates from inconsistency as much as from
            short nights. This age group also has the highest rates of late-night screen use.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Adults (26-64): the busy decade</h2>
          <p>
            Adults still need <strong>7 to 9 hours</strong>. But work demands, young children, and evening screen use
            push most people below 7. Research suggests <strong>1 in 3 adults is chronically sleep-deprived</strong>.
            The debt shows up as brain fog, weight gain, and increased cardiovascular risk.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Older adults (65+): lighter, not shorter</h2>
          <p>
            Older adults need <strong>7 to 8 hours</strong> - slightly less than middle-aged adults. The bigger
            change is <strong>sleep quality</strong>. Deep slow-wave sleep declines naturally, and night waking
            becomes more common. This fragmentation means older adults accumulate debt faster even when total time
            in bed looks adequate.
          </p>
          <p>
            Daytime naps become more common in this group, which can be a healthy recovery tool - but napping too
            late or too long can push bedtime later and worsen the cycle.
          </p>

          <h2 className="text-2xl font-black tracking-tight mt-8">Why sleep needs change</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Brain development</strong> - teens need more sleep for learning and emotional regulation</li>
            <li><strong>Hormonal shifts</strong> - melatonin release timing shifts later in puberty</li>
            <li><strong>Sleep architecture</strong> - deep sleep declines with age, reducing restorative value</li>
            <li><strong>Circadian rhythm</strong> - the body clock advances (gets earlier) as we age past 60</li>
          </ul>

          <h2 className="text-2xl font-black tracking-tight mt-8">How to check your sleep debt for your age</h2>
          <p>
            Use the recommended hours for your age group as your baseline, then subtract what you actually sleep
            each night. Add the daily deficits. That total is your sleep debt.
          </p>
          <p>
            Our calculator handles this automatically - including an age-group selector that adjusts your target sleep
            need. It works for every age from teen to older adult, no signup required.
          </p>

          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <Moon className="h-10 w-10 text-indigo-500 shrink-0" />
              <div className="flex-1">
                <h3 className="font-black text-lg mb-1">Calculate your debt for your age</h3>
                <p className="text-sm text-muted-foreground">
                  Free tool. Pick your age group, log your last 7 nights, and see exactly how much sleep you owe. 100% private.
                </p>
              </div>
              <Link
                to="/sleep-debt-calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0"
              >
                Open Calculator <ArrowRight className="h-4 w-4" />
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
            <Link to="/blog/how-to-recover-from-sleep-debt" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <RefreshCw className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How to Recover from Sleep Debt</h3>
              <p className="text-xs text-muted-foreground">A realistic plan for repaying sleep debt - week by week, backed by science.</p>
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