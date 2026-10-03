import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Sparkles, ArrowRight, Moon, Coffee, Zap, Globe, Sun, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const ARTICLES = [
  { to: '/blog/what-is-sleep-debt', title: 'What Is Sleep Debt?', desc: 'The complete guide to understanding how sleep debt builds up and how it affects your body.', tag: 'sleep', tagLabel: 'Sleep', icon: Moon, featured: true },
  { to: '/blog/how-to-recover-from-sleep-debt', title: 'How to Recover from Sleep Debt', desc: 'Practical recovery strategies backed by sleep science - and how long it actually takes.', tag: 'sleep', tagLabel: 'Sleep', icon: Moon },
  { to: '/blog/sleep-debt-by-age', title: 'Sleep Debt by Age', desc: 'How much sleep you need at every age, and what shortfall looks like for each group.', tag: 'sleep', tagLabel: 'Sleep', icon: Moon },
  { to: '/blog/how-much-sleep-do-you-need', title: 'How Much Sleep Do You Need?', desc: 'The science-backed answer by age, activity level, and lifestyle.', tag: 'sleep', tagLabel: 'Sleep', icon: Moon },
  { to: '/blog/sleep-debt-and-weight-gain', title: 'Sleep Debt and Weight Gain', desc: 'How chronic sleep loss affects hunger hormones, metabolism, and body weight.', tag: 'sleep', tagLabel: 'Sleep', icon: Moon },
  { to: '/blog/sleep-hygiene-tips', title: 'Sleep Hygiene: 12 Rules', desc: 'Twelve evidence-based habits for deeper, more consistent sleep.', tag: 'sleep', tagLabel: 'Sleep', icon: Moon },

  { to: '/blog/caffeine-half-life', title: 'Caffeine Half-Life Explained', desc: 'How long caffeine actually stays in your system and why it varies so much.', tag: 'caffeine', tagLabel: 'Caffeine', icon: Coffee },
  { to: '/blog/when-to-stop-drinking-coffee', title: 'When to Stop Drinking Coffee', desc: 'The exact cut-off time for your last coffee to protect your sleep.', tag: 'caffeine', tagLabel: 'Caffeine', icon: Coffee },
  { to: '/blog/caffeine-in-common-drinks', title: 'Caffeine in Common Drinks', desc: 'The full caffeine breakdown - coffee, tea, soda, energy drinks, and more.', tag: 'caffeine', tagLabel: 'Caffeine', icon: Coffee },
  { to: '/blog/best-time-to-drink-coffee', title: 'Best Time to Drink Coffee', desc: 'Why your morning coffee works better at 9:30 than 7:00.', tag: 'caffeine', tagLabel: 'Caffeine', icon: Coffee },
  { to: '/blog/caffeine-withdrawal', title: 'Caffeine Withdrawal Timeline', desc: 'Day-by-day what to expect, and how to minimise the symptoms.', tag: 'caffeine', tagLabel: 'Caffeine', icon: Coffee },

  { to: '/blog/what-is-pomodoro-technique', title: 'What Is the Pomodoro Technique?', desc: 'The complete guide to the 25-minute focus method used by millions.', tag: 'productivity', tagLabel: 'Productivity', icon: Zap },
  { to: '/blog/why-25-minutes-pomodoro', title: 'Why 25 Minutes?', desc: 'The science behind the Pomodoro interval - and when to adjust it.', tag: 'productivity', tagLabel: 'Productivity', icon: Zap },
  { to: '/blog/best-pomodoro-apps', title: 'Best Pomodoro Apps', desc: 'The top focus timers tested and ranked for 2026.', tag: 'productivity', tagLabel: 'Productivity', icon: Zap },
  { to: '/blog/how-to-stop-procrastinating', title: 'How to Stop Procrastinating', desc: 'Seven science-backed strategies that actually work.', tag: 'productivity', tagLabel: 'Productivity', icon: Zap },
  { to: '/blog/best-study-techniques', title: 'Best Study Techniques', desc: 'Active recall, spaced repetition, and the methods that beat re-reading.', tag: 'productivity', tagLabel: 'Productivity', icon: Zap },
  { to: '/blog/deep-work-guide', title: 'Deep Work Guide', desc: 'How to build long, distraction-free focus blocks that actually stick.', tag: 'productivity', tagLabel: 'Productivity', icon: Zap },
  { to: '/blog/best-productivity-apps', title: 'Best Productivity Apps', desc: 'The shortlist of tools that earn their place in your workflow.', tag: 'productivity', tagLabel: 'Productivity', icon: Zap },

  { to: '/blog/why-different-countries-have-different-times', title: 'Why Different Countries Have Different Times', desc: 'The history and logic behind the world time zone system.', tag: 'time', tagLabel: 'Time', icon: Globe },
  { to: '/blog/how-to-schedule-meetings-across-time-zones', title: 'Scheduling Meetings Across Time Zones', desc: 'A practical playbook for global team meetings that work for everyone.', tag: 'time', tagLabel: 'Time', icon: Globe },
  { to: '/blog/best-time-to-take-leave-2026', title: 'Best Time to Take Leave in 2026', desc: 'Turn 20 days into 50+ by targeting public holidays and long weekends.', tag: 'time', tagLabel: 'Time', icon: Globe },
  { to: '/blog/how-to-maximise-long-weekends-2026', title: 'How to Maximise Long Weekends in 2026', desc: 'Every long weekend by country, plus the bridge-day multiplier.', tag: 'time', tagLabel: 'Time', icon: Globe },

  { to: '/blog/morning-routine-guide', title: 'Morning Routine Guide', desc: 'Build a morning routine that sets up the whole day - without the hype.', tag: 'habits', tagLabel: 'Habits', icon: Sun },
]

const TAGS = [
  { key: 'all', label: 'All', count: ARTICLES.length },
  { key: 'sleep', label: 'Sleep', count: ARTICLES.filter(a => a.tag === 'sleep').length },
  { key: 'caffeine', label: 'Caffeine', count: ARTICLES.filter(a => a.tag === 'caffeine').length },
  { key: 'productivity', label: 'Productivity', count: ARTICLES.filter(a => a.tag === 'productivity').length },
  { key: 'time', label: 'Time', count: ARTICLES.filter(a => a.tag === 'time').length },
  { key: 'habits', label: 'Habits', count: ARTICLES.filter(a => a.tag === 'habits').length },
]

const FAQ = [
  { q: 'What topics does the TimeGovern blog cover?', a: 'Sleep science, caffeine timing, productivity techniques, time zones, and daily habits - all grounded in research and written for practical use.' },
  { q: 'How often are new articles published?', a: 'New guides are added regularly. Subscribe to the newsletter at the bottom of any page to be notified when new content goes live.' },
  { q: 'Are the articles free to read?', a: 'Yes, every article is completely free with no signup, no paywall, and no ads inside the content.' },
  { q: 'Where do the sources come from?', a: 'Articles cite peer-reviewed research from sleep science, chronobiology, and productivity literature. Sources are linked in each article.' },
  { q: 'Can I suggest a topic?', a: 'Yes. Use the contact page to suggest a topic or ask a question. Reader questions often become new articles.' },
  { q: 'Is this medical advice?', a: 'No. Articles are for informational purposes only. For medical concerns, especially around sleep or health, please consult a qualified professional.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const BLOG_SCHEMA = { '@context': 'https://schema.org', '@type': 'Blog', name: 'TimeGovern Guides', description: 'Practical guides on sleep, caffeine, productivity, and time.', url: 'https://timegovern.com/blog' }

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'Guides & Articles - Sleep, Caffeine & Productivity | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Practical guides on sleep science, caffeine timing, productivity techniques, and time zones. 23 free articles, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  const featured = ARTICLES.find(a => a.featured)
  const q = query.trim().toLowerCase()
  const filtered = ARTICLES.filter(a => {
    if (a.featured && activeTag === 'all' && !q) return false
    if (activeTag !== 'all' && a.tag !== activeTag) return false
    if (q && !a.title.toLowerCase().includes(q) && !a.desc.toLowerCase().includes(q)) return false
    return true
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-10">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">{ARTICLES.length} articles - Free - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <BookOpen className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              Guides & deep dives
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              Practical articles on sleep, caffeine, productivity, and time - written for real life.
            </p>
            <div className="max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium shadow-2xl outline-none focus:ring-4 focus:ring-cyan-400/30"
              />
            </div>
          </div>
        </div>

        {/* TAG FILTERS */}
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => {
            const isActive = activeTag === tag.key
            return (
              <button
                key={tag.key}
                onClick={() => setActiveTag(tag.key)}
                className={'px-4 py-2 rounded-xl text-sm font-bold transition-all border ' + (isActive ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:border-primary hover:text-primary')}
              >
                {tag.label}
                <span className={'ml-2 text-[10px] font-black ' + (isActive ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{tag.count}</span>
              </button>
            )
          })}
        </div>

        {/* FEATURED POST */}
        {featured && activeTag === 'all' && !q && (
          <Link to={featured.to} className="block group">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 hover:border-primary hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shrink-0">
                  <Moon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white bg-indigo-500 px-2.5 py-1 rounded-full">Featured</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{featured.tagLabel}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors leading-tight">{featured.title}</h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 max-w-2xl">{featured.desc}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Read the guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* GRID */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No articles match your search.
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((a) => {
            const Icon = a.icon
            return (
              <Link key={a.to} to={a.to} className="group block rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg p-6 transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-2.5 py-1 rounded-full self-center">{a.tagLabel}</span>
                </div>
                <h3 className="text-lg font-black mb-2 group-hover:text-primary transition-colors leading-tight">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{a.desc}</p>
                <div className="text-xs font-bold text-primary inline-flex items-center gap-1">
                  Read guide <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA to calculators */}
        <section>
          <Link to="/calculators" className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-black group-hover:text-primary transition-colors">Try a calculator</h3>
                <p className="text-sm text-muted-foreground">13 free tools - sleep debt, time zones, Pomodoro, BMI, and more.</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </section>

        {/* Share */}
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Guides'} />
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Articles are for informational purposes only and are not a substitute for professional medical advice.
        </div>
      </div>
    </>
  )
}