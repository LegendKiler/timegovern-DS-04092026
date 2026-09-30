import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code2, ArrowRight } from 'lucide-react'
import { ICT_TOOLS, ICT_CATEGORIES } from '../data/ictTools'

export default function IctHubPage() {
  useEffect(() => {
    document.title = 'ICT Tools 2026 — 30 Free Developer & Network Tools | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online developer tools: Base64, SHA-256, JWT decoder, UUID generator, JSON formatter, regex, subnet, color converter, and more. No signup, no ads.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  // Group tools by category
  const grouped = Object.keys(ICT_CATEGORIES).map(key => ({
    key,
    meta: ICT_CATEGORIES[key],
    tools: ICT_TOOLS.filter(t => t.category === key),
  })).filter(g => g.tools.length > 0)

  return (
    <div className="container mx-auto p-4 max-w-7xl">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.6) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-14 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <Code2 className="h-3.5 w-3.5 text-indigo-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">{ICT_TOOLS.length} Developer Tools</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-[1.05]">
            ICT Tools<br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">for Developers</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
            {ICT_TOOLS.length} free tools for encoding, hashing, tokens, text, and network development. All run in your browser — no uploads, no tracking.
          </p>
        </div>
      </div>

      {/* Categories */}
      {grouped.map((g) => (
        <section key={g.key} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className={'h-1 w-12 rounded-full bg-gradient-to-r ' + g.meta.gradient}></div>
            <h2 className="text-2xl font-black tracking-tight">{g.meta.name}</h2>
            <span className="text-xs text-muted-foreground">({g.tools.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.tools.map(t => (
              <Link
                key={t.slug}
                to={'/ict/' + t.slug}
                className="group p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">{t.name}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Info footer */}
      <div className="rounded-2xl p-5 bg-muted/40 border border-border text-xs text-muted-foreground">
        <strong className="text-foreground">Privacy:</strong> All tools run entirely in your browser using JavaScript. No data is sent to any server. Nothing is logged or tracked.
      </div>
    </div>
  )
}