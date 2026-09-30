import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Calendar, Moon, Clock, Activity, Zap, Wrench, DollarSign, ArrowRight, Search, Shield, CheckCircle2, Sparkles, BookOpen, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import Clocks from '../components/Clocks'
import WorldClocks from '../components/WorldClocks'

const CATEGORIES = [
  { name: 'Time', tagline: 'Live clocks', href: '/world-clock', icon: Clock, gradient: 'from-sky-500 to-blue-600', desc: 'World clock, time zone converter, meeting planner.' },
  { name: 'Weather', tagline: '656 cities', href: '/weather', icon: Globe, gradient: 'from-cyan-500 to-teal-600', desc: 'Live weather, climate, air quality, hourly.' },
  { name: 'Calendar', tagline: '4 tools', href: '/calendar', icon: Calendar, gradient: 'from-indigo-500 to-violet-600', desc: 'Calendar, week numbers, months, date math.' },
  { name: 'Countries', tagline: '118 countries', href: '/country-codes', icon: Globe, gradient: 'from-emerald-500 to-green-600', desc: 'Country codes, capitals, currency, API.' },
  { name: 'Astronomy', tagline: '656 sun and moon', href: '/astronomy', icon: Moon, gradient: 'from-slate-600 to-indigo-700', desc: 'Sunrise, sunset, twilight, moon phase.' },
  { name: 'Money', tagline: '45 countries', href: '/mortgage', icon: DollarSign, gradient: 'from-amber-500 to-orange-600', desc: 'Salary and mortgage calculators.' },
  { name: 'Sleep', tagline: '4 tools', href: '/sleep-tools', icon: Moon, gradient: 'from-purple-500 to-pink-600', desc: 'Sleep debt, cycles, caffeine, chronotype.' },
  { name: 'Health', tagline: '4 tools', href: '/health-tools', icon: Activity, gradient: 'from-rose-500 to-red-600', desc: 'BMI, calories, ideal weight, body fat.' },
  { name: 'Productivity', tagline: '3 tools', href: '/productivity-tools', icon: Zap, gradient: 'from-emerald-500 to-teal-600', desc: 'Pomodoro, word counter, focus timers.' },
  { name: 'Utility', tagline: '4 tools', href: '/utility-tools', icon: Wrench, gradient: 'from-slate-500 to-zinc-600', desc: 'Units, random numbers, conversions.' },
  { name: 'Travel', tagline: '4 tools', href: '/flights', icon: Globe, gradient: 'from-blue-500 to-indigo-600', desc: 'Flights, car rental, live flight map.' },
  { name: 'Developer', tagline: '6 tools', href: '/developer-tools', icon: Sparkles, gradient: 'from-fuchsia-500 to-purple-600', desc: 'QR codes, passwords, hashes, encoders.' },
]

const FEATURED = [
  { name: 'Sleep Debt Calculator', href: '/sleep-debt-calculator', icon: Moon, tagline: 'How much sleep you owe' },
  { name: 'Time Zone Converter', href: '/time-zone-converter', icon: Globe, tagline: 'Compare any two cities' },
  { name: 'World Clock', href: '/world-clock', icon: Clock, tagline: 'Live time in 136 cities' },
  { name: 'Pomodoro Timer', href: '/pomodoro-timer', icon: Zap, tagline: '25-minute focus sprints' },
  { name: 'Sleep Timer', href: '/sleep-timer', icon: Moon, tagline: '90-minute sleep cycles' },
  { name: 'BMI Calculator', href: '/bmi-calculator', icon: Activity, tagline: 'Metric and imperial' },
  { name: 'Word Counter', href: '/word-counter', icon: BookOpen, tagline: 'Live word and char count' },
  { name: 'Unit Converter', href: '/unit-converter', icon: Wrench, tagline: 'Length, weight, temp' },
  { name: 'Caffeine Calculator', href: '/caffeine-calculator', icon: Activity, tagline: 'Levels at bedtime' },
  { name: 'Age Calculator', href: '/age-calculator', icon: Clock, tagline: 'Exact age in days' },
  { name: 'Random Number Generator', href: '/random-number-generator', icon: Sparkles, tagline: 'RNG, dice, lists' },
  { name: 'Chronotype Quiz', href: '/chronotype-quiz', icon: Moon, tagline: 'Lion, Bear, Wolf, Dolphin' },
]

const ARTICLES = [
  { title: 'What Is Sleep Debt?', href: '/blog/what-is-sleep-debt', tag: 'Sleep' },
  { title: 'Caffeine Half-Life: How Long Does It Last?', href: '/blog/caffeine-half-life', tag: 'Caffeine' },
  { title: 'What Is the Pomodoro Technique?', href: '/blog/what-is-pomodoro-technique', tag: 'Productivity' },
]

const TRUST = [
  { icon: Shield, title: '100% private', desc: 'Everything runs in your browser.' },
  { icon: Zap, title: 'Instant', desc: 'No signup. No ads. No loading.' },
  { icon: Globe, title: '136 cities', desc: 'Time zones, worldwide.' },
  { icon: CheckCircle2, title: 'Free forever', desc: 'No credit card. No limits.' },
]

const FAQS = [
  { q: 'Is TimeGovern really free?', a: 'Yes. All tools are free with no signup. Optional account lets you save calculations across sessions.' },
  { q: 'How many tools are there?', a: '13 focused tools across sleep, time, health, productivity, and utility - plus mortgage and salary calculators covering 24 countries.' },
  { q: 'Do you collect my data?', a: 'No. Everything runs in your browser. Nothing is uploaded, logged, or shared.' },
  { q: 'Which countries are supported?', a: 'Mortgage covers 24 countries. Salary covers 10. All other tools are country-agnostic.' },
  { q: 'Can I embed these tools?', a: 'Yes. The Widgets section has embeddable clocks, countdowns, and calculators for your own site.' },
]

export default function HomePage() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'TimeGovern - Free Sleep, Time, Health & Productivity Tools'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free sleep, time, health, and productivity tools - sleep debt, time zone converter, world clock, Pomodoro, BMI, and more. No signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const results = query.trim()
    ? FEATURED.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.tagline.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="container mx-auto py-4">

      {/* ============ HERO ============ */}
      <div className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.6) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-16 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">13 tools - Free - No signup</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
            Every tool you need.<br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">Sleep, time, health &amp; more.</span>
          </h1>
          <p className="text-white/70 max-w-3xl mx-auto text-base md:text-xl leading-relaxed mb-8">
            Thirteen focused tools for the things you actually do every day. All free, all instant, all private.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools... (sleep, time zone, pomodoro, BMI)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium shadow-2xl outline-none focus:ring-4 focus:ring-cyan-400/30"
            />
            {results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white shadow-2xl overflow-hidden text-left z-20">
                {results.map((t) => {
                  const Icon = t.icon
                  return (
                    <Link key={t.href} to={t.href} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition">
                      <Icon className="h-5 w-5 text-indigo-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.tagline}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link to="/calculators" className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-white/90 transition shadow-lg">
              Browse all tools
            </Link>
            <Link to="/sleep-tools" className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition">
              Sleep toolkit
            </Link>
          </div>
        </div>
      </div>

      {/* ============ CATEGORIES ============ */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-black tracking-tight mb-2">Pick a category</h2>
          <p className="text-muted-foreground">Six toolkits - one for every kind of decision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            return (
              <Link key={cat.name} to={cat.href} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary hover:shadow-xl transition-all">
                <div className={'inline-flex p-3 rounded-xl bg-gradient-to-br ' + cat.gradient + ' shadow-md mb-4'}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-black group-hover:text-primary transition-colors">{cat.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{cat.tagline}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ============ FEATURED TOOLS ============ */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-black tracking-tight mb-2">Featured tools</h2>
          <p className="text-muted-foreground">The most-used tools across the site this month.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
          {FEATURED.map(tool => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} to={tool.href} className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold line-clamp-1">{tool.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{tool.tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-6">
          <Link to="/calculators" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition font-semibold">
            View all 13 tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ============ LIVE TIME WIDGETS ============ */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-black tracking-tight mb-2">Live now</h2>
          <p className="text-muted-foreground">Local time and world clocks - updated every second.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" /> Local Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Clocks />
            </CardContent>
          </Card>
          <Card className="border-border shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" /> World Clocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WorldClocks />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ LATEST ARTICLES ============ */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-black tracking-tight mb-2">Latest guides</h2>
          <p className="text-muted-foreground">Deep dives on sleep, caffeine, productivity, and time.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ARTICLES.map(a => (
            <Link key={a.href} to={a.href} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary hover:shadow-xl transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">{a.tag}</span>
              <h3 className="text-lg font-black mt-4 mb-2 group-hover:text-primary transition-colors leading-tight">{a.title}</h3>
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary mt-4">
                Read guide <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition font-semibold">
            Read all 21 guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST.map((t, i) => {
            const Icon = t.icon
            return (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 text-center">
                <div className="inline-flex p-2.5 rounded-xl bg-primary/10 border border-primary/20 mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="font-black text-sm mb-1">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-black tracking-tight mb-2">Frequently asked questions</h2>
        </div>
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="group border border-border rounded-xl bg-card overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between hover:bg-muted/30 transition">
                {f.q}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600"></div>
          <div className="relative z-10 p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-3">Start with any tool</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">No signup required. Optional free account lets you save calculations and compare scenarios side by side.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/calculators" className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-white/90 transition shadow-lg">
                Browse all tools
              </Link>
              <Link to="/auth" className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition">
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })}} />
    </div>
  )
}