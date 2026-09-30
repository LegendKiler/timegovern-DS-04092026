import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Timer, ArrowRight, Clock, BookOpen, Smartphone, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the best Pomodoro app?', a: 'The best app depends on your needs. Forest is great for gamification, Be Focused is ideal for Apple users, Session is best for iOS productivity, and TimeGovern Pomodoro is the fastest no-install option with no signup required.' },
  { q: 'Are Pomodoro apps free?', a: 'Most have a free tier. Forest, Be Focused, and Session have paid upgrades for advanced features. TimeGovern Pomodoro Timer is completely free with no account needed.' },
  { q: 'Do I need an app to use the Pomodoro Technique?', a: 'No. Any timer works - a phone clock, a kitchen timer, or a browser-based timer. Apps add tracking, integration with tasks, and cross-device sync, but they are not required to use the method.' },
  { q: 'Which Pomodoro app has the best UI?', a: 'Session (iOS) and Be Focused (Mac/iOS) are usually praised for clean design. Forest is charming but more gimmicky. TimeGovern is minimal and browser-based for quick sessions.' },
  { q: 'Can I use Pomodoro on my phone?', a: 'Yes - all Pomodoro apps work on phones. If you prefer zero-install, open TimeGovern in your phone browser and add it to your home screen.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Pomodoro Apps in 2026 (Compared)', description: 'The best Pomodoro timer apps compared - Forest, Session, Be Focused, Focus To-Do, and no-install browser options.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

const APPS = [
  { name: 'TimeGovern Pomodoro', platform: 'Web (any browser)', price: 'Free', best: 'Zero-install, no signup', color: 'indigo', link: '/pomodoro-timer' },
  { name: 'Forest', platform: 'iOS, Android, Chrome', price: 'Free + premium', best: 'Gamification (plant trees)', color: 'emerald' },
  { name: 'Session', platform: 'iOS, macOS, Web', price: 'Free trial + subscription', best: 'Beautiful design + focus analytics', color: 'amber' },
  { name: 'Be Focused', platform: 'iOS, macOS', price: 'Free + premium', best: 'Apple ecosystem sync', color: 'sky' },
  { name: 'Focus To-Do', platform: 'All platforms', price: 'Free + premium', best: 'Pomodoro + task management', color: 'purple' },
  { name: 'Pomofocus', platform: 'Web', price: 'Free', best: 'Simple browser timer', color: 'red' },
]

export default function BestPomodoroAppsPage() {
  useEffect(() => {
    document.title = 'Best Pomodoro Apps in 2026 (Compared) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The best Pomodoro timer apps compared for 2026 - Forest, Session, Be Focused, Focus To-Do, and no-install browser options like TimeGovern.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Smartphone className="h-3.5 w-3.5 text-red-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-200">Tools Compared</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Best Pomodoro Apps in 2026 (Compared)</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Six popular Pomodoro timers compared by platform, price, and what each does best.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Pomodoro apps fall into three categories: gamified mobile apps that keep you motivated, productivity ecosystems that combine tasks and timers, and simple browser timers for when you just want to start. Here is how the leading options compare.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Quick comparison</h2>
          <div className="space-y-3">
            {APPS.map((a, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Timer className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-black text-sm">{a.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{a.price}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mb-1"><strong className="text-foreground">Platform:</strong> {a.platform}</div>
                    <div className="text-[11px] text-muted-foreground"><strong className="text-foreground">Best for:</strong> {a.best}</div>
                    {a.link && <Link to={a.link} className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-indigo-500 hover:underline">Open now <ArrowRight className="h-3 w-3" /></Link>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <h2 className="text-2xl font-black tracking-tight mt-8">If you want zero install: browser timers</h2>
          <p>If you do not want another app, a browser-based Pomodoro timer is the fastest way to start. Open the page, click Start, and the timer runs. No download, no account, no notification permissions unless you want them. The <Link to="/pomodoro-timer" className="text-indigo-500 hover:underline font-bold">TimeGovern Pomodoro Timer</Link> includes presets, sound alerts, and session tracking - all without leaving the browser.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">If gamification motivates you: Forest</h2>
          <p>Forest plants a virtual tree when you complete a focus session. If you leave the app or pick up your phone, the tree dies. This visual stakes-based approach works well for people who struggle with phone distraction. The app also contributes to real tree planting through a partnership with Trees for the Future.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">If you want task integration: Focus To-Do</h2>
          <p>Focus To-Do combines a Pomodoro timer with a full task manager. You create tasks, assign pomodoros, and track how many sessions each task takes. This is useful if you want to estimate future work based on past data.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">If you are in the Apple ecosystem: Be Focused</h2>
          <p>Be Focused syncs across iPhone, iPad, Mac, and Apple Watch. If you live in Apple's world, this is the most seamless option. The design is clean and the stats are useful, though the free version has limitations.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">What really matters</h2>
          <p>The app you use matters far less than the practice itself. Any of these tools will help you work in focused sprints if you actually start the timer. Pick one, use it for a week, and adjust based on what works for you.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">No-install Pomodoro timer</h3><p className="text-sm text-muted-foreground">Free, works in any browser, no signup. Start a 25-minute focus session right now.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Open Timer <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/what-is-pomodoro-technique" className="block rounded-xl border border-border bg-card hover:border-red-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1">What Is the Pomodoro Technique?</h3><p className="text-xs text-muted-foreground">Complete guide for beginners.</p></Link><Link to="/blog/why-25-minutes-pomodoro" className="block rounded-xl border border-border bg-card hover:border-red-400 p-5 transition-colors"><Clock className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1">Why 25 Minutes?</h3><p className="text-xs text-muted-foreground">The science behind the Pomodoro length.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Best Pomodoro Apps'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. App features and pricing change frequently. This comparison reflects features as of early 2026 - check each app for current details.</div>
        </div>
      </article>
    </>
  )
}