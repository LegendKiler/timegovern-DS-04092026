import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Sparkles, Code2, Globe, Building2, Zap, MessageSquare, CheckCircle2, ArrowRight, ExternalLink, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const SERVICES = [
  {
    icon: Code2,
    title: 'Custom widget development',
    color: 'cyan',
    desc: 'Custom embedded clocks, calendars, countdowns, or country cards built to match your brand. Responsive, accessible, lightweight.',
    bullets: ['Branded styling and colors', 'Lightweight iframe or script embed', 'Works on any CMS or static site', 'Typical turnaround: 3-5 business days'],
  },
  {
    icon: Globe,
    title: 'Data licensing and API access',
    color: 'emerald',
    desc: 'Bulk licensing of our country, timezone, calendar, and astronomy datasets. Higher rate limits, SLA, and support.',
    bullets: ['Country and timezone datasets', 'Calendar and week-number data', 'Astronomy (sun/moon) calculations', 'Commercial license, no attribution required'],
  },
  {
    icon: Building2,
    title: 'Time zone consulting',
    color: 'indigo',
    desc: 'Help designing scheduling, distributed team coordination, or cross-border compliance systems around time zones.',
    bullets: ['Meeting-scheduling architecture', 'DST and edge-case handling', 'Global team overlap analysis', 'Async workflow design'],
  },
  {
    icon: Zap,
    title: 'White-label deployment',
    color: 'amber',
    desc: 'Full TimeGovern toolset deployed under your domain with your branding. Ready in days, not months.',
    bullets: ['Your subdomain or domain', 'Your logo, colors, and copy', 'Optional feature subset', 'Managed updates and uptime'],
  },
]

const COLOR_MAP = {
  cyan: { bg: 'from-cyan-500/10 to-cyan-500/0', border: 'border-cyan-500/30', icon: 'text-cyan-500', accent: 'text-cyan-500' },
  emerald: { bg: 'from-emerald-500/10 to-emerald-500/0', border: 'border-emerald-500/30', icon: 'text-emerald-500', accent: 'text-emerald-500' },
  indigo: { bg: 'from-indigo-500/10 to-indigo-500/0', border: 'border-indigo-500/30', icon: 'text-indigo-500', accent: 'text-indigo-500' },
  amber: { bg: 'from-amber-500/10 to-amber-500/0', border: 'border-amber-500/30', icon: 'text-amber-500', accent: 'text-amber-500' },
}

const FAQ = [
  { q: 'Do you offer custom development?', a: 'Yes. We build custom time, calendar, and astronomy widgets for clients who need something specific. Reach out with your requirements and we will scope it in 1-2 business days.' },
  { q: 'Can I license your country and timezone data?', a: 'Yes. Our datasets are available under a commercial license for bulk use, with SLA and no attribution requirement. See /api-docs for the free tier that includes attribution.' },
  { q: 'Do you offer white-label deployments?', a: 'Yes. We can deploy the full TimeGovern toolset under your domain with your branding. Typical setup is 5-10 business days depending on scope.' },
  { q: 'What is the typical pricing?', a: 'Custom widgets start around $500. Data licensing scales with usage. White-label deployments are quoted per project. Reach out with specifics for a fast estimate.' },
  { q: 'Do you work with agencies?', a: 'Yes. We have a partner program for agencies who want to embed time and calendar tools in their clients websites. Contact us for partner rates.' },
  { q: 'How do I get started?', a: 'Send an email to hello@timegovern.com with a short description of what you need. We respond within one business day with next steps or a scoping call.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const SERVICE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Service', name: 'TimeGovern Services', description: 'Custom time and calendar widgets, data licensing, time zone consulting, and white-label deployments.', provider: { '@type': 'Organization', name: 'TimeGovern', url: 'https://timegovern.com' }, areaServed: 'Worldwide', serviceType: ['Custom widget development', 'Data licensing', 'Time zone consulting', 'White-label deployment'] }

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services - Custom Widgets, Data Licensing, Consulting | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Custom time and calendar widgets, country data licensing, time zone consulting, and white-label deployments. Built by the team behind TimeGovern.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Custom work - Data - Consulting</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Briefcase className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              Services
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Custom widgets, bulk data licensing, time zone consulting, and white-label deployments. All built by the team that runs TimeGovern.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What we offer</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((s) => {
              const colors = COLOR_MAP[s.color]
              const Icon = s.icon
              return (
                <Card key={s.title} className={'border-2 ' + colors.border + ' bg-gradient-to-br ' + colors.bg}>
                  <CardContent className="p-6">
                    <Icon className={'h-8 w-8 mb-3 ' + colors.icon} />
                    <h3 className="text-xl font-black mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-1.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className={'h-3.5 w-3.5 mt-0.5 shrink-0 ' + colors.icon} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How it works</h2>
          <Card className="border-border">
            <CardContent className="p-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-black text-sm flex items-center justify-center">1</div>
                  <div>
                    <h3 className="font-bold mb-1">Tell us what you need</h3>
                    <p className="text-sm text-muted-foreground">Email hello@timegovern.com with a short description. Use cases, timeline, and any constraints help us respond faster.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-black text-sm flex items-center justify-center">2</div>
                  <div>
                    <h3 className="font-bold mb-1">Scoping call or written estimate</h3>
                    <p className="text-sm text-muted-foreground">Within 1-2 business days we send a written scope with fixed price, timeline, and deliverables. No surprise fees.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black text-sm flex items-center justify-center">3</div>
                  <div>
                    <h3 className="font-bold mb-1">Build and hand off</h3>
                    <p className="text-sm text-muted-foreground">We build, test, and deliver. Widgets ship as embeddable HTML or script tags. Data ships as JSON/CSV or a live API endpoint.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-black text-sm flex items-center justify-center">4</div>
                  <div>
                    <h3 className="font-bold mb-1">Optional ongoing support</h3>
                    <p className="text-sm text-muted-foreground">Month-to-month support and updates if you want a single point of contact for time and calendar tooling.</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Who we work with</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5">
              <Building2 className="h-6 w-6 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">SaaS and platforms</h3>
              <p className="text-xs text-muted-foreground">Embed time, calendar, or country data into your product without building it yourself.</p>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <Globe className="h-6 w-6 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Agencies</h3>
              <p className="text-xs text-muted-foreground">White-label tools for your clients websites. Partner rates available.</p>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <Briefcase className="h-6 w-6 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Data teams</h3>
              <p className="text-xs text-muted-foreground">Bulk licensing of country, timezone, and astronomy data with SLA.</p>
            </CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Contact</h2>
          <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-md shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black mb-2">Get in touch</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Email is the fastest way to reach us. We respond within one business day, usually much faster.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="mailto:hello@timegovern.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition">
                      <Mail className="h-4 w-4" />
                      hello@timegovern.com
                    </a>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border font-bold text-sm hover:border-primary transition">
                      <MessageSquare className="h-4 w-4" />
                      Contact form
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/api-docs" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Code2 className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">Free Country API</h3>
              <p className="text-xs text-muted-foreground">JSON and CSV endpoints, no key required.</p>
            </Link>
            <Link to="/widgets" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Zap className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Widget Library</h3>
              <p className="text-xs text-muted-foreground">Embeddable clocks, calendars, and cards.</p>
            </Link>
            <Link to="/about" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Building2 className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">About TimeGovern</h3>
              <p className="text-xs text-muted-foreground">Mission, team, and values.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Services - TimeGovern'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Pricing and timelines above are indicative. Send us your specifics for a fixed quote.
        </div>
      </div>
    </>
  )
}