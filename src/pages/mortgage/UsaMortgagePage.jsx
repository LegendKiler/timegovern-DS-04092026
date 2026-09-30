import { Link } from 'react-router-dom'
import { Home, ArrowRight, Shield, Calculator, Zap, Calendar, Building2, RefreshCw, AlertCircle, Key, Gift, Wallet } from 'lucide-react'
import CountryFlag from '../../components/CountryFlag'

const TOOLS = [
  { name: 'Mortgage Amortization', href: '/mortgage/usa/amortization', desc: 'Full PITI breakdown + amortization schedule', icon: Home, gradient: 'from-blue-500 to-indigo-500' },
  { name: 'Bi-Weekly Payment', href: '/mortgage/usa/biweekly', desc: 'See savings by paying half-monthly every 2 weeks', icon: Calendar, gradient: 'from-cyan-500 to-blue-500' },
  { name: 'FHA Loan', href: '/mortgage/usa/fha', desc: '3.5% down + MIP calculator', icon: Shield, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'VA Loan', href: '/mortgage/usa/va', desc: '0% down + funding fee — no PMI ever', icon: Shield, gradient: 'from-blue-700 to-indigo-700' },
  { name: 'PMI Calculator', href: '/mortgage/usa/pmi', desc: 'Private Mortgage Insurance premium', icon: AlertCircle, gradient: 'from-red-500 to-rose-500' },
  { name: 'Property Tax', href: '/mortgage/usa/property-tax', desc: 'All 50 states by effective rate', icon: Building2, gradient: 'from-orange-500 to-amber-500' },
  { name: 'Rent vs Buy', href: '/mortgage/usa/rent-vs-buy', desc: 'Which is cheaper over time?', icon: Key, gradient: 'from-purple-500 to-indigo-500' },
  { name: 'Refinance Break-Even', href: '/mortgage/usa/refinance', desc: 'Months to recoup closing costs', icon: RefreshCw, gradient: 'from-indigo-500 to-purple-500' },
  { name: 'Rental Yield Calculator', href: '/mortgage/rental-yield', desc: 'Investment property analysis — yield, cash flow, DSCR', icon: Building2, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'First Home Buyer', href: '/mortgage/usa/first-home-buyer', desc: 'FHA, VA, USDA, and state programs', icon: Gift, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Sell vs Refinance', href: '/mortgage/usa/sell-vs-refinance', desc: 'Compare net proceeds from selling vs cash-out refi', icon: RefreshCw, gradient: 'from-teal-500 to-cyan-500' },
  { name: 'Home Equity', href: '/mortgage/usa/home-equity', desc: 'Tappable equity + HELOC vs cash-out comparison', icon: Wallet, gradient: 'from-blue-500 to-indigo-500' },
]

export default function UsaMortgagePage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.5) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-14 text-white">
          <Link to="/mortgage" className="text-xs font-bold text-blue-300 hover:underline mb-4 inline-block">← All countries</Link>
          <div className="flex items-center gap-3 mb-4">
            <CountryFlag country="usa" size="xl" />
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">United States Mortgage Calculators</h1>
              <p className="text-blue-200 text-sm mt-1">8 free tools with 2026 rates and PITI breakdowns</p>
            </div>
          </div>
          <p className="text-white/70 max-w-3xl text-sm md:text-base mt-4 leading-relaxed">
            Everything American home buyers and refinancers need — FHA, VA, PMI, bi-weekly, property tax, and PITI calculations with current 2026 rates.
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