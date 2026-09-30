import { Link } from 'react-router-dom'
import { Home, ArrowRight, Shield, Calculator, Zap, Wallet, TrendingUp, Building2, Users, Percent, Gift, RefreshCw } from 'lucide-react'
import CountryFlag from '../../components/CountryFlag'

const TOOLS = [
  { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment', desc: 'Calculate monthly repayments and total interest', icon: Home, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Offset Account', href: '/mortgage/australia/offset-account', desc: 'Interest saved and years off with an offset', icon: Wallet, gradient: 'from-violet-500 to-purple-500' },
  { name: 'Stamp Duty', href: '/mortgage/australia/stamp-duty', desc: 'All 8 states & territories + FHB exemption', icon: Building2, gradient: 'from-orange-500 to-amber-500' },
  { name: 'LMI Calculator', href: '/mortgage/australia/lmi', desc: 'Lenders Mortgage Insurance premium', icon: Shield, gradient: 'from-blue-500 to-indigo-500' },
  { name: 'Novated Lease', href: '/mortgage/australia/novated-lease', desc: 'Pre-tax car lease with FBT & ECM', icon: Calculator, gradient: 'from-cyan-500 to-blue-500' },
  { name: 'Borrowing Power', href: '/mortgage/australia/borrowing-power', desc: 'How much you can borrow', icon: Zap, gradient: 'from-amber-500 to-orange-500' },
  { name: 'Extra Repayment', href: '/mortgage/australia/extra-repayment', desc: 'Interest saved with extra repayments', icon: TrendingUp, gradient: 'from-lime-500 to-green-500' },
  { name: 'Interest-Only', href: '/mortgage/australia/interest-only', desc: 'IO repayments and post-IO cost', icon: Percent, gradient: 'from-pink-500 to-rose-500' },
  { name: 'First Home Guarantee', href: '/mortgage/australia/first-home-guarantee', desc: '5% deposit, no LMI', icon: Users, gradient: 'from-teal-500 to-emerald-500' },
  { name: 'Split Loan', href: '/mortgage/australia/split-loan', desc: 'Fixed + variable split calculator', icon: Calculator, gradient: 'from-slate-500 to-slate-700' },
  { name: 'Rental Yield Calculator', href: '/mortgage/rental-yield', desc: 'Investment property analysis — yield, cash flow, DSCR', icon: Building2, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'First Home Buyer', href: '/mortgage/australia/first-home-buyer', desc: 'Stack stamp duty, grants, LMI waiver + FHSS', icon: Gift, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Sell vs Refinance', href: '/mortgage/australia/sell-vs-refinance', desc: 'Compare net proceeds from selling vs cash-out refi', icon: RefreshCw, gradient: 'from-teal-500 to-cyan-500' },
  { name: 'Home Equity', href: '/mortgage/australia/home-equity', desc: 'Tappable equity + HELOC vs cash-out comparison', icon: Wallet, gradient: 'from-blue-500 to-indigo-500' },
]

export default function AustraliaMortgagePage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(16,185,129,0.5) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-14 text-white">
          <Link to="/mortgage" className="text-xs font-bold text-emerald-300 hover:underline mb-4 inline-block">← All countries</Link>
          <div className="flex items-center gap-3 mb-4">
            <CountryFlag country="australia" size="xl" />
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Australian Mortgage Calculators</h1>
              <p className="text-emerald-200 text-sm mt-1">10 free tools built for AU home buyers and investors</p>
            </div>
          </div>
          <p className="text-white/70 max-w-3xl text-sm md:text-base mt-4 leading-relaxed">
            Every calculator uses Australian lending conventions — P&I amortization, offset accounts, ATO residual values, state stamp duty, LMI, and the FBT rules on novated leases.
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
                <div className={'p-3 rounded-xl bg-gradient-to-br ' + t.gradient + ' shadow-lg w-fit mb-4'}>
                  <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
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