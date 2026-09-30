import { Link } from 'react-router-dom'
import { ChevronRight, HelpCircle, ArrowRight, Calculator } from "lucide-react"

export function FaqItem({ q, a }) {
  return (
    <details className="group border border-border rounded-xl p-4 bg-card hover:border-primary/50 transition">
      <summary className="flex items-center justify-between cursor-pointer font-semibold text-sm">
        <span className="flex items-start gap-2"><HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />{q}</span>
        <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
      </summary>
      <p className="text-sm text-muted-foreground mt-3 pl-6 leading-relaxed">{a}</p>
    </details>
  )
}

export function RelatedMortgageTools({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((t, i) => (
        <Link key={i} to={t.href} className="group p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition">
          <div className="font-bold text-sm group-hover:text-primary transition line-clamp-2">{t.name}</div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></div>
        </Link>
      ))}
    </div>
  )
}

export function MortgageSeoContent({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-black tracking-tight mb-4">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export function MortgageHero({ eyebrow, title, subtitle, gradient = "from-emerald-500 via-teal-500 to-cyan-500", meta = null }) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl">
      <div className={'absolute inset-0 bg-gradient-to-br ' + gradient}></div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 15% 30%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)' }}></div>
      <div className="relative z-10 p-8 md:p-12 text-white">
        {eyebrow && <div className="inline-block bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">{eyebrow}</div>}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 leading-[1.1]">{title}</h1>
        <p className="text-white/85 max-w-3xl text-sm md:text-base leading-relaxed">{subtitle}</p>
        {meta && <div className="mt-6 flex flex-wrap gap-2 text-xs">{meta}</div>}
      </div>
    </div>
  )
}

export function StatBox({ label, value, sub, gradient = "from-emerald-500/10 to-teal-500/10", color = "text-emerald-600" }) {
  return (
    <div className={'rounded-xl p-4 border border-border bg-gradient-to-br ' + gradient}>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{label}</div>
      <div className={'text-2xl md:text-3xl font-black tabular-nums ' + color}>{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground mt-1">{sub}</div>}
    </div>
  )
}
// ============================================================
// BREADCRUMB — Bank-grade navigation trail
// Follows industry pattern: Home > Mortgage > Region > Country
// ============================================================
export function MortgageBreadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 -mt-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="hover:text-primary hover:underline font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={'font-semibold ' + (isLast ? 'text-foreground' : '')}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-muted-foreground/40">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ============================================================
// BACK TO HUB BUTTON — Return to country/region hub
// Matches CommBank/Westpac "go up a level" pattern
// ============================================================
export function BackToHub({ label, href }) {
  return (
    <Link
      to={href}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to {label}
    </Link>
  )
}
