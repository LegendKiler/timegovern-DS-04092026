import { Link } from 'react-router-dom'
import { ArrowRight, Globe } from 'lucide-react'
import { COUNTRIES, HUBS } from '../../components/mortgage/universal/data/countries'

export default function EuropeanHubPage() {
  const hub = HUBS.europe
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.5) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-14 text-white">
          <Link to="/mortgage" className="text-xs font-bold text-blue-300 hover:underline mb-4 inline-block">← All hubs</Link>
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">European Mortgage Calculators</h1>
              <p className="text-blue-200 text-sm mt-1">14 countries · Local rates, taxes, and rules</p>
            </div>
          </div>
          <p className="text-white/70 max-w-3xl text-sm md:text-base mt-4 leading-relaxed">
            Every European market uses local rates, tax rules, and terminology. Pick your country for accurate numbers.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {hub.countries.map(slug => {
          const c = COUNTRIES[slug]
          if (!c) return null
          return (
            <Link key={slug} to={'/mortgage/' + slug} className="group relative">
              <div className={'absolute -inset-0.5 bg-gradient-to-r ' + c.gradient + ' rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500'}></div>
              <div className="relative h-full p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <h3 className="font-black text-base">{c.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{c.currency} · {c.defaultRate}% typical</p>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground space-y-0.5 mb-3">
                  <div>Term: {c.defaultYears} years</div>
                  <div>LTV: {c.defaultLTV}%</div>
                  {c.stampDuty && <div>{c.stampDuty.name}: {c.stampDuty.rateRange[0]}–{c.stampDuty.rateRange[1]}%</div>}
                </div>
                <div className="text-xs font-bold text-primary flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}