import { Link } from 'react-router-dom'
import { Home, ArrowRight, TrendingUp, Building2, Percent, RefreshCw, Key, Gift, Wallet } from 'lucide-react'
import CountryFlag from '../../components/CountryFlag'

const TOOLS = [
  { name: 'Repayment Mortgage', href: '/mortgage/uk/repayment', desc: 'Capital + interest monthly repayments', icon: Home, gradient: 'from-red-500 to-rose-500' },
  { name: 'Overpayment Calculator', href: '/mortgage/uk/overpayment', desc: 'Interest saved with overpayments', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Stamp Duty (SDLT)', href: '/mortgage/uk/stamp-duty', desc: 'England, Scotland & Wales', icon: Building2, gradient: 'from-orange-500 to-amber-500' },
  { name: 'Interest-Only', href: '/mortgage/uk/interest-only', desc: 'IO repayments + P&I after', icon: Percent, gradient: 'from-pink-500 to-rose-500' },
  { name: 'Remortgage Calculator', href: '/mortgage/uk/remortgage', desc: 'Break-even on switching deals', icon: RefreshCw, gradient: 'from-indigo-500 to-purple-500' },
  { name: 'Buy-to-Let Calculator', href: '/mortgage/uk/buy-to-let', desc: 'Rental yield, tax, and ICR', icon: Key, gradient: 'from-amber-500 to-orange-500' },
  { name: 'Rental Yield Calculator', href: '/mortgage/rental-yield', desc: 'Investment property analysis — yield, cash flow, DSCR', icon: Building2, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'First Home Buyer', href: '/mortgage/uk/first-home-buyer', desc: 'Lifetime ISA + Shared Ownership', icon: Gift, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Sell vs Refinance', href: '/mortgage/uk/sell-vs-refinance', desc: 'Compare net proceeds from selling vs cash-out refi', icon: RefreshCw, gradient: 'from-teal-500 to-cyan-500' },
  { name: 'Home Equity', href: '/mortgage/uk/home-equity', desc: 'Tappable equity + HELOC vs cash-out comparison', icon: Wallet, gradient: 'from-blue-500 to-indigo-500' },
]

export default function UkMortgagePage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950 to-blue-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(239,68,68,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.5) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-14 text-white">
          <Link to="/mortgage" className="text-xs font-bold text-red-300 hover:underline mb-4 inline-block">← All countries</Link>
          <div className="flex items-center gap-3 mb-4">
            <CountryFlag country="uk" size="xl" />
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">United Kingdom Mortgage Calculators</h1>
              <p className="text-red-200 text-sm mt-1">6 free tools with 2026 rates and SDLT/LBTT/LTT bands</p>
            </div>
          </div>
          <p className="text-white/70 max-w-3xl text-sm md:text-base mt-4 leading-relaxed">
            Repayment, overpayment, stamp duty, remortgage and buy-to-let calculators — all using UK lending conventions and current SDLT rules for England, Scotland and Wales.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map((t, i) => {
          const Icon = t.icon
          return (
            <Link key={i} to={t.href} className="group relative">
              <div className={'absolute -inset-0.5 bg-gradient-to-r ' + t.gradient + ' rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500'}></div>
              <div className="relative h-full p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/50 transition-all">
                <div className={'p-3 rounded-xl bg-gradient-to-br ' + t.gradient + ' shadow-lg w-fit mb-4'}><Icon className="h-5 w-5 text-white" strokeWidth={2.5} /></div>
                <h3 className="font-black text-base mb-1">{t.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                <div className="mt-4 text-xs font-bold text-primary flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}