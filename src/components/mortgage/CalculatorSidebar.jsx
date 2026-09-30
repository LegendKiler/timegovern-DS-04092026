import { Link } from 'react-router-dom'
import { getTaxMeta } from '../../data/taxRates'
import { Calculator, Building2, ExternalLink, ArrowRight, Bookmark, TrendingUp, Home, DollarSign, Code2, FileText, Sparkles } from 'lucide-react'

// Tools available per country (based on sitemap coverage)
const TOOLS_BY_COUNTRY = {
  all: ['mortgage', 'rental-yield', 'sell-vs-refinance', 'home-equity'],
  fhb: ['first-home-buyer'],
  salary: ['salary'],
}

// Countries with FHB (20 total)
const FHB_COUNTRIES = new Set([
  'australia','usa','uk','canada','india','singapore','malaysia',
  'france','germany','spain','italy','netherlands','ireland',
  'portugal','poland','belgium','austria','norway','indonesia','pakistan',
])

// Countries with Salary (10 total)
const SALARY_COUNTRIES = new Set([
  'australia','usa','uk','canada','india','germany','france','japan','singapore','new-zealand',
])

const TOOL_META = {
  'mortgage':          { label: 'Mortgage Calculator',  icon: Home,       href: (c) => `/mortgage/${c}` },
  'salary':            { label: 'Salary Calculator',    icon: DollarSign, href: (c) => `/salary/${c}` },
  'rental-yield':      { label: 'Rental Yield',         icon: TrendingUp, href: (c) => `/mortgage/${c}/rental-yield` },
  'sell-vs-refinance': { label: 'Sell vs Refinance',    icon: Calculator, href: (c) => `/mortgage/${c}/sell-vs-refinance` },
  'home-equity':       { label: 'Home Equity',          icon: Calculator, href: (c) => `/mortgage/${c}/home-equity` },
  'first-home-buyer':  { label: 'First Home Buyer',     icon: Home,       href: (c) => `/mortgage/${c}/first-home-buyer` },
}

export default function CalculatorSidebar({ country, tool }) {
  const meta = getTaxMeta(country)
  if (!meta) return null

  // Build related tools list for this country
  const available = [...TOOLS_BY_COUNTRY.all]
  if (FHB_COUNTRIES.has(country)) available.push(...TOOLS_BY_COUNTRY.fhb)
  if (SALARY_COUNTRIES.has(country)) available.push(...TOOLS_BY_COUNTRY.salary)

  const related = available
    .filter(t => t !== tool)
    .map(t => ({ key: t, ...TOOL_META[t] }))

  return (
    <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
      {/* ── More tools for this country ── */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <h3 className="font-black text-sm">More {meta.name} tools</h3>
        </div>
        <ul className="space-y-1">
          {related.slice(0, 6).map((t) => {
            const Icon = t.icon
            return (
              <li key={t.key}>
                <Link
                  to={t.href(country)}
                  className="group flex items-center gap-2 p-2 rounded-lg text-xs font-semibold hover:bg-muted transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  <span className="flex-1 group-hover:text-primary transition-colors">{t.label}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── Official tax authority ── */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-4 w-4 text-emerald-600" />
          <h3 className="font-black text-sm text-emerald-700 dark:text-emerald-400">Official source</h3>
        </div>
        <a
          href={meta.authorityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline mb-2"
        >
          {meta.authority}
          <ExternalLink className="h-3 w-3" />
        </a>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Verified {meta.lastVerified} · Tax year {meta.taxYear}
        </p>
      </div>

      {/* ── Save your work CTA ── */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Bookmark className="h-4 w-4 text-emerald-300" />
          <h3 className="font-black text-sm">Save your work</h3>
        </div>
        <p className="text-xs text-white/70 leading-relaxed mb-3">
          Create a free account to save calculations, compare scenarios, and export PDFs.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-white/90 transition shadow"
        >
          Create free account <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  )
}