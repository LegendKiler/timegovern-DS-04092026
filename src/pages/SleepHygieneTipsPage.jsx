import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Moon, ArrowRight, Clock, BookOpen, Coffee, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is sleep hygiene?', a: 'Sleep hygiene is the set of daily habits and environmental factors that support consistent, high-quality sleep. It covers bedtime routine, light exposure, temperature, caffeine timing, screen use, and wake-time consistency.' },
  { q: 'What is the most important sleep hygiene rule?', a: 'Wake up at the same time every day, including weekends. This single habit anchors the circadian rhythm more than any other factor. Inconsistency is the fastest way to break sleep quality.' },
  { q: 'Should I avoid screens before bed?', a: 'Ideally yes for the last 60 minutes. Blue light from screens delays melatonin release. If you must use a device, enable night mode, lower brightness, and avoid stimulating content like news or social media.' },
  { q: 'What temperature is best for sleep?', a: 'Around 18 degrees Celsius (65 degrees Fahrenheit) is ideal for most adults. A cool bedroom helps the body drop its core temperature, which is a biological trigger for sleep onset.' },
  { q: 'Does caffeine affect sleep hours later?', a: 'Yes. Caffeine has a 5-hour half-life. A coffee at 2 PM still leaves about 25mg in your system at 10 PM, which is enough to reduce deep sleep even if you do not notice it.' },
  { q: 'How long does it take to fix bad sleep hygiene?', a: 'Most people notice improvement within 3 to 7 days of consistent practice. Full reset of the circadian rhythm typically takes 2 to 4 weeks of a stable wake time and light exposure.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Sleep Hygiene: 12 Rules for Better Sleep', description: 'The 12 sleep hygiene rules backed by sleep science - bedtime routine, light, temperature, caffeine, and why wake-time consistency matters most.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function SleepHygieneTipsPage() {
  useEffect(() => {
    document.title = 'Sleep Hygiene: 12 Rules for Better Sleep | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The 12 sleep hygiene rules backed by sleep science - bedtime routine, light, temperature, caffeine, and why wake-time consistency matters most.'
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
              <Moon className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Sleep Science</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Sleep Hygiene: 12 Rules for Better Sleep</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Sleep quality is not luck. It is the result of a dozen small habits done consistently. Here are the ones that matter most.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Sleep hygiene is a clinical term for the habits and environment that support healthy sleep. Decades of research have narrowed it down to a small set of rules that consistently work.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">1. Wake at the same time every day</h2>
          <p>This is the single most important rule. A consistent wake time anchors the circadian rhythm more than any other habit. Weekends included - sleeping in on Saturday creates "social jetlag" that takes days to recover from.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">2. Get morning sunlight within 30 minutes</h2>
          <p>Bright light on the eyes in the first half hour after waking signals the brain to stop producing melatonin and start the circadian clock. Ten minutes of outdoor light beats any indoor lamp.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">3. Keep your bedroom cool</h2>
          <p>Around 18 degrees Celsius (65 Fahrenheit) is ideal. Core body temperature needs to drop for sleep onset. A cool room helps that drop happen faster.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">4. Keep your bedroom dark</h2>
          <p>Blackout curtains, eye masks, or just covering LED lights make a measurable difference. Even dim light suppresses melatonin and lowers sleep quality.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">5. Cut caffeine after 2 PM</h2>
          <p>Caffeine has a 5-hour half-life. A 2 PM coffee leaves about 25mg in your system at 10 PM, enough to reduce deep sleep. For slow metabolisers, stop earlier.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">6. Avoid alcohol within 3 hours of bed</h2>
          <p>Alcohol helps you fall asleep but fragments sleep in the second half of the night and suppresses REM. Even one glass can measurably reduce sleep quality.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">7. No large meals close to bed</h2>
          <p>Heavy meals within 2 hours of bed trigger digestion that raises core temperature and disrupts sleep. If you need to eat late, keep it light.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">8. No screens 60 minutes before bed</h2>
          <p>Blue light delays melatonin. If you must use a device, enable night mode, lower brightness, and avoid stimulating content. A physical book is the safest choice.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">9. Keep a consistent wind-down ritual</h2>
          <p>Brush teeth, dim lights, read, journal, breathe - any short, repeatable sequence trains the brain that sleep is coming. The specifics matter less than the consistency.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">10. Exercise earlier in the day</h2>
          <p>Regular exercise improves sleep depth, but vigorous workouts within 3 hours of bed raise core temperature and delay sleep onset. Morning or early afternoon is ideal.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">11. Do not lie awake in bed</h2>
          <p>If you cannot sleep after 20 minutes, get up and do something calm in dim light until you feel sleepy. Lying awake trains the brain to associate the bed with frustration.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">12. Do not nap late or long</h2>
          <p>Short afternoon naps (20-30 minutes) are fine, but long or late naps reduce sleep pressure and make falling asleep at night harder.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Moon className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Check your sleep debt</h3><p className="text-sm text-muted-foreground">Log your last 7 nights and see exactly how much sleep you owe - plus a recovery plan.</p></div><Link to="/sleep-debt-calculator" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Calculate <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/what-is-sleep-debt" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">What Is Sleep Debt?</h3><p className="text-xs text-muted-foreground">The science behind sleep debt.</p></Link><Link to="/blog/how-much-sleep-do-you-need" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">How Much Sleep Do You Need?</h3><p className="text-xs text-muted-foreground">Sleep needs by age.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Sleep Hygiene Tips'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. If you experience chronic sleep problems, speak to a healthcare professional.</div>
        </div>
      </article>
    </>
  )
}