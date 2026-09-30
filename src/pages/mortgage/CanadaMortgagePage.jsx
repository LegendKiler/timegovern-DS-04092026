import { Link } from 'react-router-dom'
import { Home, ArrowRight, Shield, Zap, Calendar, Building2, RefreshCw, Gift, Wallet } from 'lucide-react'
import CountryFlag from '../../components/CountryFlag'

const TOOLS = [
  { name: 'Mortgage Payment', href: '/mortgage/canada/mortgage-payment', desc: 'Semi-annual compounding + CMHC built in', icon: Home, gradient: 'from-red-500 to-rose-500' },
  { name: 'CMHC Insurance', href: '/mortgage/canada/cmhc-insurance', desc: 'Premium tiers by LTV (4.00% to 0.60%)', icon: Shield, gradient: 'from-blue-500 to-indigo-500' },
  { name: 'Land Transfer Tax', href: '/mortgage/canada/land-transfer-tax', desc: 'All 10 provinces + Toronto double tax', icon: Building2, gradient: 'from-orange-500 to-amber-500' },
  { name: 'Affordability (GDS/TDS)', href: '/mortgage/canada/affordability', desc: 'Stress test + max mortgage qualification', icon: Zap, gradient: 'from-amber-500 to-orange-500' },
  { name: 'Accelerated Bi-Weekly', href: '/mortgage/canada/bi-weekly-accelerated', desc: 'Save interest with 26 payments/year', icon: Calendar, gradient: 'from-cyan-500 to-blue-500' },
  { name: 'Mortgage Renewal', href: '/mortgage/canada/renewal', desc: 'Payment shock + amortization options', icon: RefreshCw, gradient: 'from-indigo-500 to-purple-500' },
  { name: 'Rental Yield Calculator', href: '/mortgage/rental-yield', desc: 'Investment property analysis — yield, cash flow, DSCR', icon: Building2, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'First Home Buyer', href: '/mortgage/canada/first-home-buyer', desc: 'FHSA + RRSP Home Buyers Plan + CMHC', icon: Gift, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Sell vs Refinance', href: '/mortgage/canada/sell-vs-refinance', desc: 'Compare net proceeds from selling vs cash-out refi', icon: RefreshCw, gradient: 'from-teal-500 to-cyan-500' },
  { name: 'Home Equity', href: '/mortgage/canada/home-equity', desc: 'Tappable equity + HELOC vs cash-out comparison', icon: Wallet, gradient: 'from-blue-500 to-indigo-500' },
]

export default function CanadaMortgagePage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950 to-rose-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(239,68,68,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(225,29,72,0.5) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-14 text-white">
          <Link to="/mortgage" className="text-xs font-bold text-red-300 hover:underline mb-4 inline-block">← All countries</Link>
          <div className="flex items-center gap-3 mb-4">
            <CountryFlag country="canada" size="xl" />
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Canadian Mortgage Calculators</h1>
              <p className="text-red-200 text-sm mt-1">6 free tools with semi-annual compounding and CMHC</p>
            </div>
          </div>
          <p className="text-white/70 max-w-3xl text-sm md:text-base mt-4 leading-relaxed">
            Every calculator uses Canadian lending conventions — semi-annual compounding under the Interest Act, CMHC default insurance, provincial land transfer tax, OSFI stress test, and GDS/TDS qualification.
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