import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Moon, Clock, Activity, Zap, Wrench, Coffee, Brain, Globe, CalendarClock, Timer, Ruler, Type, Dices, Cake, Sparkles, ArrowRight, Search, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const CATEGORIES = [
  {
    key: 'sleep',
    name: 'Sleep',
    hub: '/sleep-tools',
    hubLabel: 'Sleep toolkit',
    icon: Moon,
    accent: 'indigo',
    tools: [
      { to: '/sleep-debt-calculator', name: 'Sleep Debt Calculator', desc: 'Find out exactly how much sleep you owe and get a personalised recovery plan.', icon: Moon },
      { to: '/sleep-timer', name: 'Sleep Timer', desc: 'Best times to fall asleep or wake up based on 90-minute sleep cycles.', icon: Sparkles },
      { to: '/caffeine-calculator', name: 'Caffeine Calculator', desc: 'See how much caffeine is left in your system at bedtime.', icon: Coffee },
      { to: '/chronotype-quiz', name: 'Chronotype Quiz', desc: 'Are you a Lion, Bear, Wolf, or Dolphin? Discover your natural body clock.', icon: Brain },
    ],
  },
  {
    key: 'time',
    name: 'Time',
    hub: '/time-tools',
    hubLabel: 'Time toolkit',
    icon: Clock,
    accent: 'sky',
    tools: [
      { to: '/time-zone-converter', name: 'Time Zone Converter', desc: 'Compare times across cities worldwide with offset badges and DST handling.', icon: Globe },
      { to: '/world-clock', name: 'World Clock', desc: 'Live time in up to 8 cities from 136 worldwide, with day/night indicators.', icon: Clock },
      { to: '/countdown-timer', name: 'Countdown Timer', desc: 'Track up to 5 countdowns to any event with days, hours, minutes, seconds.', icon: CalendarClock },
    ],
  },
  {
    key: 'productivity',
    name: 'Productivity',
    hub: '/productivity-tools',
    hubLabel: 'Productivity toolkit',
    icon: Zap,
    accent: 'emerald',
    tools: [
      { to: '/pomodoro-timer', name: 'Pomodoro Timer', desc: 'Focus in 25-minute sprints with automatic breaks and session tracking.', icon: Timer },
      { to: '/word-counter', name: 'Word Counter', desc: 'Live word, character, and reading time count with top keywords for SEO.', icon: Type },
      { to: '/random-number-generator', name: 'Random Number Generator', desc: 'Numbers, dice, coin flips, list picker, and shuffle.', icon: Dices },
    ],
  },
  {
    key: 'health',
    name: 'Health',
    hub: '/health-tools',
    hubLabel: 'Health toolkit',
    icon: Activity,
    accent: 'rose',
    tools: [
      { to: '/bmi-calculator', name: 'BMI Calculator', desc: 'Check your body mass index in metric or imperial units with healthy weight range.', icon: Activity },
      { to: '/age-calculator', name: 'Age Calculator', desc: 'Find your exact age in years, months, days - plus heartbeats, minutes alive, and more.', icon: Cake },
    ],
  },
  {
    key: 'utility',
    name: 'Utility',
    hub: '/utility-tools',
    hubLabel: 'Utility toolkit',
    icon: Wrench,
    accent: 'amber',
    tools: [
      { to: '/unit-converter', name: 'Unit Converter', desc: 'Convert length, weight, temperature, volume, area, and speed between metric and imperial.', icon: Ruler },
    ],
  },
]

const ALL_TOOLS = CATEGORIES.flatMap(c => c.tools)
const TOTAL = ALL_TOOLS.length

const FAQ = [
  { q: 'How many free tools are on TimeGovern?', a: 'Thirteen focused tools across sleep, time, health, productivity, and utility - plus mortgage and salary calculators for 24 countries. Every tool is free with no signup.' },
  { q: 'Which calculator should I start with?', a: 'If you feel tired often, start with the Sleep Debt Calculator. If you work across time zones, try the Time Zone Converter. If you struggle to focus, use the Pomodoro Timer.' },
  { q: 'Are these tools really free?', a: 'Yes. No credit card, no trial, no limits. The tools run entirely in your browser - nothing is sent to a server.' },
  { q: 'Do you collect any data?', a: 'No. Your inputs and results stay on your device. There is no tracking, no advertising, and no upload of personal data.' },
  { q: 'Do the tools work on mobile?', a: 'Yes. All calculators are responsive and work on phones, tablets, laptops, and desktops in any modern browser.' },
  { q: 'Can I embed these calculators on my website?', a: 'Yes. The Widgets section has embeddable versions of the clocks, countdowns, and several calculators for your own site.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'All Free Calculators & Tools', description: 'Every free calculator and tool on TimeGovern - sleep, time, health, productivity, and utility.', url: 'https://timegovern.com/calculators' }

export default function CalculatorsPage() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'All Free Calculators & Tools - TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Every free calculator and tool on TimeGovern - sleep, time, health, productivity, and utility. 13 tools, no signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  const q = query.trim().toLowerCase()
  const filtered = q
    ? CATEGORIES.map(c => ({ ...c, tools: c.tools.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) })).filter(c => c.tools.length > 0)
    : CATEGORIES

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-10">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">{TOTAL} tools - Free - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Wrench className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              All calculators
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
              Every tool in one place. Search below or browse by category.
            </p>
            <div className="max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all tools..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium shadow-2xl outline-none focus:ring-4 focus:ring-cyan-400/30"
              />
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No tools match "{query}". Try "sleep", "time", or "BMI".
          </div>
        )}

        {filtered.map((cat) => {
          const CatIcon = cat.icon
          return (
            <section key={cat.key}>
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className={'p-2 rounded-lg bg-' + cat.accent + '-500/10 border border-' + cat.accent + '-500/30'}>
                    <CatIcon className={'h-5 w-5 text-' + cat.accent + '-500'} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{cat.name}</h2>
                    <p className="text-xs text-muted-foreground">{cat.tools.length} {cat.tools.length === 1 ? 'tool' : 'tools'}</p>
                  </div>
                </div>
                <Link to={cat.hub} className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 shrink-0">
                  {cat.hubLabel} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {cat.tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <Link key={tool.to} to={tool.to} className="block rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg p-5 transition-all group">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black mb-1 text-sm group-hover:text-primary transition-colors">{tool.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{tool.desc}</p>
                          <div className="text-[11px] font-bold text-primary inline-flex items-center gap-1">
                            Open tool <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* CTA to blog */}
        <section>
          <Link to="/blog" className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-black group-hover:text-primary transition-colors">Guides & deep dives</h3>
                <p className="text-sm text-muted-foreground">21 articles on sleep, caffeine, productivity, and time.</p>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'All Calculators'} />
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> All calculators are for informational purposes only and are not a substitute for professional advice. Verify critical decisions with a qualified professional.
        </div>
      </div>
    </>
  )
}