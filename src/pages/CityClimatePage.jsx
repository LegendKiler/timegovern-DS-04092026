import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Cloud, Sparkles, Wind, Droplets, ExternalLink, Sun, Sunset, CloudSun, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { COUNTRIES_DATA } from '../data/countries'

const CLIMATE_NOTE = {
  temperate: 'Moderate seasons with changeable weather. Spring and autumn are transition periods.',
  tropical: 'Warm and humid year-round. The wet season brings frequent afternoon showers.',
  arid: 'Hot days, cool nights, and very low rainfall. Clear skies dominate.',
  polar: 'Extreme seasonal swings. Long summer days and intense cold in winter.',
  mediterranean: 'Dry, warm summers and mild, wet winters with most rain from late autumn through early spring.',
  subtropical: 'Long hot summers and mild winters. Humidity peaks in late summer.',
  continental: 'Large temperature ranges between summer and winter. Cold winters, warm summers.',
}

export default function CityClimatePage() {
  const { city: citySlug } = useParams()
  const city = citySlug ? getAstroCityBySlug(citySlug) : null
  const [climate, setClimate] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!city) { setLoading(false); return }
    setLoading(true)
    setError(null)
    fetch('/api/climate/' + city.slug + '.json')
      .then((r) => { if (!r.ok) throw new Error('Climate data not found'); return r.json() })
      .then((d) => { setClimate(d); setLoading(false) })
      .catch((e) => { setError(e.message); setLoading(false) })
  }, [city])

  const country = city ? COUNTRIES_DATA.find((c) => c.c2 === city.c2) : null
  const peers = city ? ASTRO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 6) : []

  useEffect(() => {
    if (!city) return
    document.title = city.name + ' Climate - Monthly Averages & Weather Normals | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Climate averages for ' + city.name + ' based on 30-year normals (1991-2020). Monthly highs, lows, rainfall, and wind with annual summary.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city])

  if (citySlug && !city) return <Navigate to="/weather" replace />

  if (!city) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="rounded-3xl border border-border p-8 text-center">
          <CloudSun className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Pick a city</h1>
          <Link to="/weather" className="text-primary font-bold hover:underline">See all cities</Link>
        </div>
      </div>
    )
  }

  const FAQ = climate ? [
    { q: 'What is the hottest month in ' + city.name + '?', a: 'The hottest month is usually ' + climate.annual.hottestMonth + ' with average highs around ' + climate.annual.hottestTemp + ' C.' },
    { q: 'What is the coldest month in ' + city.name + '?', a: 'The coldest month is usually ' + climate.annual.coldestMonth + ' with average lows around ' + climate.annual.coldestTemp + ' C.' },
    { q: 'How much rain does ' + city.name + ' get per year?', a: city.name + ' receives about ' + climate.annual.precip + ' mm of precipitation per year on average.' },
    { q: 'When is the wettest month in ' + city.name + '?', a: 'The wettest month is typically ' + climate.annual.wettestMonth + ' averaging around ' + climate.annual.wettestPrecip + ' mm.' },
    { q: 'What is the climate like in ' + city.name + '?', a: city.name + ' has a ' + city.climate + ' climate. ' + CLIMATE_NOTE[city.climate] },
    { q: 'Where does this data come from?', a: 'From the Open-Meteo historical archive based on ERA5 reanalysis. Period: ' + climate.period + '.' },
  ] : []

  const FAQ_SCHEMA = FAQ.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : null
  const DATASET_SCHEMA = climate ? { '@context': 'https://schema.org', '@type': 'Dataset', name: city.name + ' Climate Averages', description: '30-year monthly climate normals for ' + city.name, temporalCoverage: climate.period } : null

  return (
    <>
      {FAQ_SCHEMA && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />}
      {DATASET_SCHEMA && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(DATASET_SCHEMA) }} />}

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/weather" className="hover:text-primary">Weather</Link>
          <span className="mx-2">/</span>
          <Link to={'/weather/' + city.slug} className="hover:text-primary">{city.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">Climate</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-sky-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">{country ? country.flag : ''} {city.region} - 30-year normals</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Cloud className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              {city.name} Climate
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Monthly averages and annual summary based on 30-year climate normals.
            </p>
          </div>
        </div>

        {loading && (
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="animate-spin h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full" />
              <span className="text-sm">Loading climate data...</span>
            </div>
          </CardContent></Card>
        )}

        {error && (
          <Card className="border-2 border-rose-500/30"><CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">Climate data not available</div>
                <div className="text-sm text-muted-foreground">Run <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">node scripts/fetch-climate.mjs</code> to generate this city file.</div>
              </div>
            </div>
          </CardContent></Card>
        )}

        {climate && (
          <>
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Quick climate info</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="border-2 border-rose-500/30"><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" />Hottest</div>
                  <div className="text-lg font-black">{climate.annual.hottestMonth}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{climate.annual.hottestTemp} C avg high</div>
                </CardContent></Card>
                <Card className="border-2 border-sky-500/30"><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" />Coldest</div>
                  <div className="text-lg font-black">{climate.annual.coldestMonth}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{climate.annual.coldestTemp} C avg low</div>
                </CardContent></Card>
                <Card className="border-2 border-indigo-500/30"><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Droplets className="h-3 w-3" />Wettest</div>
                  <div className="text-lg font-black">{climate.annual.wettestMonth}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{climate.annual.wettestPrecip} mm</div>
                </CardContent></Card>
                <Card className="border-2 border-emerald-500/30"><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Wind className="h-3 w-3" />Windiest</div>
                  <div className="text-lg font-black">{climate.annual.windiestMonth}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{climate.annual.windiestSpeed} km/h</div>
                </CardContent></Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Annual averages</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Average high</div>
                  <div className="text-2xl font-black tabular-nums">{climate.annual.avgHigh} C</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Average low</div>
                  <div className="text-2xl font-black tabular-nums">{climate.annual.avgLow} C</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Annual rain</div>
                  <div className="text-2xl font-black tabular-nums">{climate.annual.precip}<span className="text-sm font-normal text-muted-foreground ml-1">mm</span></div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Period</div>
                  <div className="text-base font-black">{climate.period}</div>
                </CardContent></Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Monthly averages</h2>
              <Card className="border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-3 font-black">Month</th>
                        <th className="text-right py-3 px-3 font-black">High</th>
                        <th className="text-right py-3 px-3 font-black">Low</th>
                        <th className="text-right py-3 px-3 font-black">Rain</th>
                        <th className="text-right py-3 px-3 font-black hidden md:table-cell">Wind</th>
                      </tr>
                    </thead>
                    <tbody>
                      {climate.months.map((m) => (
                        <tr key={m.m} className="border-b border-border/30 hover:bg-primary/5">
                          <td className="py-2.5 px-3 font-bold">{m.name}</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">{m.avgHigh} C</td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{m.avgLow} C</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">{m.precip} mm</td>
                          <td className="py-2.5 px-3 text-right tabular-nums hidden md:table-cell text-muted-foreground">{m.wind} km/h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Temperature by month</h2>
              <Card className="border-border">
                <CardContent className="p-5">
                  <div className="space-y-1.5">
                    {climate.months.map((m) => {
                      const maxH = Math.max.apply(null, climate.months.map((x) => x.avgHigh))
                      const minH = Math.min.apply(null, climate.months.map((x) => x.avgHigh))
                      const range = maxH - minH || 1
                      const pct = ((m.avgHigh - minH) / range) * 80 + 20
                      return (
                        <div key={m.m} className="flex items-center gap-3">
                          <div className="w-10 text-xs font-bold text-muted-foreground">{m.name}</div>
                          <div className="flex-1 h-6 rounded bg-muted/30 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded" style={{ width: pct + '%' }} />
                          </div>
                          <div className="w-14 text-right text-xs font-bold tabular-nums">{m.avgHigh} C</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">About {city.name} climate</h2>
              <Card className="border-border">
                <CardContent className="p-5 space-y-3">
                  <p className="text-sm leading-relaxed"><strong>{city.name}</strong> is a city in <strong>{city.region}</strong>. {city.fact}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{city.name} has a <strong>{city.climate}</strong> climate. {CLIMATE_NOTE[city.climate]}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {city.hemisphere === 'N' ? ('As a Northern Hemisphere city, ' + city.name + ' sees its warmest months from June to August and coldest from December to February.') : ('As a Southern Hemisphere city, ' + city.name + ' sees its warmest months from December to February and coldest from June to August.')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Climate in nearby cities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.slug} to={'/weather/' + p.slug + '/climate'} className="block rounded-xl border border-border bg-card hover:border-emerald-500 p-4 transition-colors group">
                  <div className="text-sm font-bold group-hover:text-emerald-500 transition-colors mb-1">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground">{p.climate} climate</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to={'/weather/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <CloudSun className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Weather</h3>
              <p className="text-xs text-muted-foreground">Live conditions and 7-day forecast.</p>
            </Link>
            <Link to={'/sun/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Sun className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Sun</h3>
              <p className="text-xs text-muted-foreground">Sunrise and sunset times.</p>
            </Link>
            <Link to={'/moon/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Sunset className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Moon</h3>
              <p className="text-xs text-muted-foreground">Moon phase and illumination.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Open-Meteo Archive</h3>
              <p className="text-xs text-muted-foreground">Source of climate normals.</p>
            </a>
            <a href="https://wmo.int/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">WMO</h3>
              <p className="text-xs text-muted-foreground">Climatological normals standard.</p>
            </a>
          </div>
        </div>

        {FAQ.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={city.name + ' Climate - TimeGovern'} />
        </div>
      </div>
    </>
  )
}