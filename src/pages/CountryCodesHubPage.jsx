import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Globe, Phone, ChevronRight, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getAllCountries } from '../data/countryProfiles'
import { setPageMeta } from '../lib/seo'

const COUNTRIES = getAllCountries().sort((a, b) => a.name.localeCompare(b.name));

export default function CountryCodesHubPage() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'International Country Codes & Dialing Codes Directory | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Complete directory of international country dialing codes, area codes, capitals, and statistics for 250+ countries worldwide.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  const q = query.trim().toLowerCase()
  const filtered = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.dialCode.includes(q) || 
    c.capital.toLowerCase().includes(q) ||
    c.iso2.toLowerCase() === q
  )

  return (
    <div className="container mx-auto p-4 max-w-6xl space-y-8 py-8">
      
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950" />
        <div className="relative z-10 p-8 md:p-12 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
            <Globe className="h-3.5 w-3.5 text-blue-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Global Directory</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            International Country Codes
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            Find the dialing code, capital city, and time zone for any country in the world. Perfect for international travel and remote work.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by country, dial code (e.g. +1), or capital..."
              autoComplete="off"
              spellCheck="false"
              style={{ color: '#0f172a', WebkitTextFillColor: '#0f172a', colorScheme: 'light' }}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white placeholder-slate-400 font-medium shadow-2xl outline-none focus:ring-4 focus:ring-blue-400/30"
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {q ? `Search Results (${filtered.length})` : `All Countries (${filtered.length})`}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No countries match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <Link key={c.iso2} to={`/country/${c.iso2.toLowerCase()}`}>
                <Card className="hover:border-blue-400 dark:hover:border-blue-600 transition-colors h-full group">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                      {c.iso2}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg text-slate-900 dark:text-white truncate">
                        {c.name}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                          <Phone className="h-3 w-3" /> {c.dialCode || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="h-3 w-3" /> {c.capital}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors self-center" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}