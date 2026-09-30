import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Heart, Check, X, ArrowRight, Star, Users, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { useSupporterStatus, TIER_LIMITS } from '../hooks/useSupporterStatus'

const FAQ = [
  { q: 'What is the supporter tier?', a: 'The supporter tier is a paid tier that unlocks higher limits on the world clock and other tools. It is entirely optional. All core tools remain free forever.' },
  { q: 'What do supporters get?', a: 'Supporters can pin up to 50 cities on the World Clock (vs 12 free) and get early access to new features before general release.' },
  { q: 'How much does it cost?', a: 'We have not opened the supporter tier for public purchase yet. It is coming soon. Currently the tier exists for testing and early access.' },
  { q: 'Do I need a supporter tier to use the tools?', a: 'No. Everything essential works without it. The supporter tier is a way to say thank you and get higher limits. Core tools stay free.' },
  { q: 'Will my free tier be reduced in the future?', a: 'No. Whatever you can do for free today will remain free. We only add features on top - we do not take them away.' },
  { q: 'How do I try the supporter tier?', a: 'For testing, add ?supporter=1 to any page URL to enable the supporter tier. To turn it off, add ?supporter=0. This is for demo purposes only.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

export default function SupportPage() {
  const { tier, isSupporter, setSupporter } = useSupporterStatus()

  useEffect(() => {
    document.title = 'Support TimeGovern - Optional Supporter Tier'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Support TimeGovern with an optional supporter tier. Higher limits on the World Clock, early access to new features, and no impact on the free tools.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  const freeFeatures = [
    { text: '12 pinned cities on World Clock', ok: true },
    { text: 'All meeting planner tools', ok: true },
    { text: 'All time zone converters', ok: true },
    { text: 'All calculators and tools', ok: true },
    { text: '50 pinned cities on World Clock', ok: false },
    { text: 'Early access to new features', ok: false },
  ]

  const supporterFeatures = [
    { text: '12 pinned cities on World Clock', ok: true },
    { text: 'All meeting planner tools', ok: true },
    { text: 'All time zone converters', ok: true },
    { text: 'All calculators and tools', ok: true },
    { text: '50 pinned cities on World Clock', ok: true },
    { text: 'Early access to new features', ok: true },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-rose-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200">Optional - Coming soon</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Heart className="h-10 w-10 md:h-14 md:w-14 text-rose-300" />
              Support TimeGovern
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Optional supporter tier with higher limits and early access. All core tools stay free.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Tier comparison</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-slate-500" />
                  <h3 className="text-xl font-black">Free</h3>
                </div>
                <div className="text-3xl font-black mb-4">$0</div>
                <ul className="space-y-2">
                  {freeFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {f.ok ? <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> : <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />}
                      <span className={f.ok ? '' : 'text-muted-foreground'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-rose-500/30 bg-rose-500/5 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-rose-500" />
                  <h3 className="text-xl font-black">Supporter</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-rose-500 px-2 py-0.5 rounded-full">Soon</span>
                </div>
                <div className="text-3xl font-black mb-4 text-rose-600 dark:text-rose-400">TBA</div>
                <ul className="space-y-2">
                  {supporterFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {f.ok ? <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> : <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />}
                      <span className={f.ok ? '' : 'text-muted-foreground'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Test the supporter tier</h2>
          <Card className="border-border shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm font-bold mb-1">Current tier: <span className={'font-black ' + (isSupporter ? 'text-rose-500' : 'text-slate-500')}>{tier.toUpperCase()}</span></div>
                  <div className="text-xs text-muted-foreground">World Clock limit: {isSupporter ? TIER_LIMITS.supporter : TIER_LIMITS.free} cities</div>
                </div>
                <button onClick={() => setSupporter(!isSupporter)} className={'px-5 py-2 rounded-lg font-bold text-sm transition ' + (isSupporter ? 'bg-muted hover:bg-muted/70' : 'bg-rose-500 text-white hover:opacity-90')}>
                  {isSupporter ? 'Switch to free' : 'Enable supporter (demo)'}
                </button>
              </div>
              <div className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <strong>Demo mode:</strong> This toggle only affects your browser. Real supporter tiers will be tied to your account once the payment system is live. You can also use the URL param <span className="font-mono bg-background px-1.5 py-0.5 rounded">?supporter=1</span> to enable.
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Try the tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <Zap className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Pin up to 12 or 50 cities.</p>
            </Link>
            <Link to="/meeting-planner" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <Users className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Meeting Planner</h3>
              <p className="text-xs text-muted-foreground">Heatmap for up to 12 cities.</p>
            </Link>
            <Link to="/team-alignment" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Check className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Team Alignment</h3>
              <p className="text-xs text-muted-foreground">See each city in their day.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Support TimeGovern'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> The supporter tier is not yet available for purchase. This page is a preview.
        </div>
      </div>
    </>
  )
}