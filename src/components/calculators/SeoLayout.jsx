import { Link } from 'react-router-dom'
import { ChevronRight, HelpCircle, ArrowRight } from "lucide-react"

export function FaqItem({ q, a }) {
  return (
    <details className="group border border-border rounded-xl p-4 bg-card hover:border-primary/50 transition">
      <summary className="flex items-center justify-between cursor-pointer font-semibold text-sm">
        <span className="flex items-start gap-2">
          <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          {q}
        </span>
        <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
      </summary>
      <p className="text-sm text-muted-foreground mt-3 pl-6 leading-relaxed">{a}</p>
    </details>
  )
}

export function RelatedTools({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((t, i) => (
        <Link key={i} to={t.href} className="group p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition">
          <div className="font-bold text-sm group-hover:text-primary transition">{t.name}</div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            Open <ArrowRight className="h-3 w-3" />
          </div>
        </Link>
      ))}
    </div>
  )
}

export function SeoContent({ title, children }) {
  return (
    <section className="prose prose-slate dark:prose-invert max-w-none mb-10">
      <h2 className="text-2xl font-black tracking-tight mb-4">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export function PageHero({ eyebrow, title, subtitle, gradient, children }) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl">
      <div className={'absolute inset-0 bg-gradient-to-br ' + gradient}></div>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
      <div className="relative z-10 p-8 md:p-12 text-white">
        {eyebrow && <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">{eyebrow}</div>}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 leading-[1.1]">{title}</h1>
        <p className="text-white/80 max-w-2xl text-sm md:text-base">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}