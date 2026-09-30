import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ArrowRight, Clock, BookOpen, Timer, Target, Brain } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the best productivity app?', a: 'The best app is the one you will actually use. For focus, TimeGovern Pomodoro Timer or Forest works well. For tasks, Todoist or Things. For notes, Obsidian or Notion. For time blocking, Sunsama or Motion.' },
  { q: 'Are free productivity apps as good as paid ones?', a: 'For most users, yes. Free tiers of Todoist, Notion, Forest, and browser-based tools like TimeGovern cover the core needs. Paid plans add collaboration, integrations, and unlimited storage.' },
  { q: 'Do productivity apps actually work?', a: 'They work when they remove friction and enforce a habit. They do not work if you spend more time configuring them than using them. Start with one app, use it daily for a week, then add another only if needed.' },
  { q: 'What is the best free Pomodoro app?', a: 'TimeGovern Pomodoro Timer is a strong free option - no signup, works in any browser, includes presets and custom durations, and runs entirely in your browser. Forest is the best free mobile option.' },
  { q: 'What is the best app for time blocking?', a: 'Sunsama and Motion are the leaders in time blocking for professionals, but both are paid. For free time blocking, Google Calendar plus the TimeGovern Pomodoro Timer is a solid combination.' },
  { q: 'How many productivity apps should I use?', a: 'Two or three at most - one for tasks, one for focus, and optionally one for notes. More apps means more context switching, which defeats the purpose of using them.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'The Best Productivity Apps in 2026', description: 'The best productivity apps for focus, tasks, notes, and time blocking - compared for 2026 with free and paid options.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function BestProductivityAppsPage() {
  useEffect(() => {
    document.title = 'The Best Productivity Apps in 2026 | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The best productivity apps for focus, tasks, notes, and time blocking - compared for 2026 with free and paid options.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Zap className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Tools Compared</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">The Best Productivity Apps in 2026</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Six categories, dozens of apps. Here are the ones that actually earn their place in a daily workflow.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>The productivity app market is saturated. Most of what you install you will abandon within a week. The rule that matters: fewer apps, used consistently, beats a sophisticated setup you never open.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Best for focus: Pomodoro timers</h2>
          <p>A Pomodoro timer is the single highest-value productivity tool most people can add. It converts open-ended tasks into defined 25-minute sprints. Two options stand out:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>TimeGovern Pomodoro</strong> - free, browser-based, no signup, includes presets and custom durations</li>
            <li><strong>Forest</strong> - gamified, plants virtual trees as you focus; works on mobile and desktop</li>
          </ul>
          <h2 className="text-2xl font-black tracking-tight mt-8">Best for tasks: Todoist and Things</h2>
          <p>Todoist is the strongest cross-platform task manager with a generous free tier. Things 3 (Mac and iOS only) is cleaner and faster but paid. Both handle the essentials - projects, due dates, priorities - without overwhelming the user.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Best for notes: Obsidian and Notion</h2>
          <p>Obsidian stores notes as plain markdown files on your device - fully private, works offline, no vendor lock-in. Notion is web-first, better for teams and databases. For personal knowledge management, Obsidian wins. For collaborative work, Notion wins.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Best for time blocking: Sunsama and Motion</h2>
          <p>Time blocking means scheduling specific tasks into specific hours. Sunsama and Motion both automate this from your task list, but both are paid (around 20 dollars per month). A free alternative: Google Calendar plus a Pomodoro timer.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Best for writing: Ulysses and iA Writer</h2>
          <p>Both are distraction-free markdown editors with clean typography and export options. Ulysses is more powerful (Mac and iOS), iA Writer is more minimal (all platforms).</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Best for sleep and time: TimeGovern</h2>
          <p>Sleep debt, caffeine levels, chronotype, world clock, time zones, countdown, unit converter, word counter, and random generator - all free, no signup, all in one place. Not an app store download - just open the browser.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Try the free Pomodoro timer</h3><p className="text-sm text-muted-foreground">25-minute focus sessions with auto-advance breaks, sound alerts, and session tracking.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Start Timer <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/deep-work-guide" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><Brain className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1">Deep Work Guide</h3><p className="text-xs text-muted-foreground">How to focus in a distracted world.</p></Link><Link to="/blog/how-to-stop-procrastinating" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><Target className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1">Stop Procrastinating</h3><p className="text-xs text-muted-foreground">7 science-backed strategies.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Best Productivity Apps'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Features and pricing change frequently - check each app for current details.</div>
        </div>
      </article>
    </>
  )
}