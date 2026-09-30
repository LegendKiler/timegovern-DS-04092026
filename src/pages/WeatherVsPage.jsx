import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeftRight, Sparkles, AlertCircle, ExternalLink, Cloud, CloudSun, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { COUNTRIES_DATA } from '../data/countries'
import { getWmoInfo } from '../lib/weatherUtils'
import { WEATHER_HUBS, getCanonicalPair } from '../data/weatherHubs'

const buildUrl = (lat, lng) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '1',
  })
  return 'https://api.open-meteo.com/v1/forecast?' + params.toString()
}

const fmtTemp = (c) => c == null ? '--' : Math.round(c) + ' C'

export default function WeatherVsPage() {
  const { city: cityA, city2: cityB } = useParams()
  const a = cityA ? getAstroCityBySlug(cityA) : null
  const b = cityB ? getAstroCityBySlug(cityB) : null

  // Canonicalize: ensure alphabetical order, else redirect
  const canonical = useMemo(() => {
    if (!cityA || !cityB) return null
    const [x, y] = getCanonicalPair(cityA, cityB)
    if (x !== cityA.toLowerCase() || y !== cityB.toLowerCase()) return [x, y]
    return null
  }, [cityA, cityB])

  const [wxA, setWxA] = useState(null)
  const [wxB, setWxB] = useState(null)
  const [err, setErr] = useState(null)
  const [climA, setClimA] = useState(null)
  const [climB, setClimB] = useState(null)

  useEffect(() => {
    if (!a || !b) return
    const ctrl = new AbortController()
    Promise.all([
      fetch(buildUrl(a.lat, a.lng), { signal: ctrl.signal }).then((r) => r.ok ? r.json() : null).catch(() => null),
      fetch(buildUrl(b.lat, b.lng), { signal: ctrl.signal }).then((r) => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/climate/' + a.slug + '.json').then((r) => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/climate/' + b.slug + '.json').then((r) => r.ok ? r.json() : null).catch(() => null),
    ]).then(([ra, rb, ca, cb]) => {
      setWxA(ra); setWxB(rb); setClimA(ca); setClimB(cb)
    }).catch((e) => { if (e.name !== 'AbortError') setErr(e.message) })
    return () => ctrl.abort()
  }, [a, b])

  useEffect(() => {
    if (!a || !b) return
    document.title = a.name + ' vs ' + b.name + ' - Weather & Climate Comparison | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Compare weather and climate between ' + a.name + ' and ' + b.name + '. Live conditions, annual averages, best months to visit, and time difference.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [a, b])

  if (canonical) return <Navigate to={'/weather/' + canonical[0] + '/vs/' + canonical[1]} replace />
  if ((cityA && !a) || (cityB && !b)) return <Navigate to="/weather" replace />

  if (!a || !b) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="rounded-3xl border border-border p-8 text-center">
          <ArrowLeftRight className="h-12 w-12 text-violet-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Pick two cities</h1>
          <Link to="/weather" className="text-primary font-bold hover:underline">Browse cities</Link>
        </div>
      </div>
    )
  }

  const countryA = COUNTRIES_DATA.find((c) => c.c2 === a.c2)
  const countryB = COUNTRIES_DATA.find((c) => c.c2 === b.c2)
  const tzA = wxA ? wxA.timezone : (countryA ? countryA.tz[0] : 'UTC')
  const tzB = wxB ? wxB.timezone : (countryB ? countryB.tz[0] : 'UTC')

  // Time difference
  const timeOffset = useMemo(() => {
    if (!wxA || !wxB) return null
    try {
      const now = new Date()
      const aT = new Date(now.toLocaleString('en-US', { timeZone: tzA }))
      const bT = new Date(now.toLocaleString('en-US', { timeZone: tzB }))
      return Math.round((bT - aT) / 3600000)
    } catch { return null }
  }, [wxA, wxB, tzA, tzB])

  const wmoA = wxA && wxA.current ? getWmoInfo(wxA.current.weather_code) : null
  const wmoB = wxB && wxB.current ? getWmoInfo(wxB.current.weather_code) : null

  const FAQ = [
    { q: 'Which is warmer, ' + a.name + ' or ' + b.name + '?', a: climA && climB ? (
      climA.annual.avgHigh > climB.annual.avgHigh
        ? a.name + ' is warmer on average, with annual highs of ' + climA.annual.avgHigh + ' C vs ' + climB.annual.avgHigh + ' C in ' + b.name + '.'
        : b.name + ' is warmer on average, with annual highs of ' + climB.annual.avgHigh + ' C vs ' + climA.annual.avgHigh + ' C in ' + a.name + '.'
    ) : 'Climate data loading.' },
    { q: 'Which city gets more rain, ' + a.name + ' or ' + b.name + '?', a: climA && climB ? (
      climA.annual.precip > climB.annual.precip
        ? a.name + ' gets more annual precipitation: ' + climA.annual.precip + ' mm vs ' + climB.annual.precip + ' mm in ' + b.name + '.'
        : b.name + ' gets more annual precipitation: ' + climB.annual.precip + ' mm vs ' + climA.annual.precip + ' mm in ' + a.name + '.'
    ) : 'Climate data loading.' },
    { q: 'What is the time difference between ' + a.name + ' and ' + b.name + '?', a: timeOffset !== null ? (timeOffset === 0 ? 'Both cities are in the same time zone.' : (timeOffset > 0 ? a.name + ' is ' + timeOffset + ' hours behind ' + b.name + '.' : b.name + ' is ' + Math.abs(timeOffset) + ' hours behind ' + a.name + '.')) : 'Time zone comparison loading.' },
    { q: 'What is the weather in ' + a.name + ' and ' + b.name + ' right now?', a: wxA && wxB && wmoA && wmoB ? ('Currently, ' + a.name + ' is ' + fmtTemp(wxA.current.temperature_2m) + ' with ' + wmoA.label.toLowerCase() + ', while ' + b.name + ' is ' + fmtTemp(wxB.current.temperature_2m) + ' with ' + wmoB.label.toLowerCase() + '.') : 'Live weather loading.' },
    { q: 'When is the best time to visit ' + a.name + '?', a: climA ? (a.name + ' is warmest in ' + climA.annual.hottestMonth + ' (avg high ' + climA.annual.hottestTemp + ' C) and coolest in ' + climA.annual.coldestMonth + '.') : 'Climate data loading.' },
    { q: 'When is the best time to visit ' + b.name + '?', a: climB ? (b.name + ' is warmest in ' + climB.annual.hottestMonth + ' (avg high ' + climB.annual.hottestTemp + ' C) and coolest in ' + climB.annual.coldestMonth + '.') : 'Climate data loading.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/weather" className="hover:text-primary">Weather</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">{a.name} vs {b.name}</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-indigo-950 to-sky-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-violet-200">Climate comparison - 30-year normals</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <ArrowLeftRight className="h-10 w-10 md:h-14 md:w-14 text-violet-300" />
              {a.name} vs {b.name}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Side-by-side weather and climate comparison.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Live conditions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2 border-sky-500/30">
              <CardContent className="p-6">
                <div className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">{countryA ? countryA.flag : ''} {a.name}</div>
                {wxA && wmoA ? (
                  <>
                    <div className="text-5xl font-black tabular-nums mb-1">{fmtTemp(wxA.current.temperature_2m)}</div>
                    <div className="text-sm text-muted-foreground mb-3">{wmoA.label}</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Feels like {fmtTemp(wxA.current.apparent_temperature)}</div>
                      <div>Humidity {wxA.current.relative_humidity_2m}%</div>
                      <div>Wind {Math.round(wxA.current.wind_speed_10m)} km/h</div>
                    </div>
                  </>
                ) : <div className="text-muted-foreground text-sm">Loading...</div>}
              </CardContent>
            </Card>
            <Card className="border-2 border-violet-500/30">
              <CardContent className="p-6">
                <div className="text-xs font-black uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">{countryB ? countryB.flag : ''} {b.name}</div>
                {wxB && wmoB ? (
                  <>
                    <div className="text-5xl font-black tabular-nums mb-1">{fmtTemp(wxB.current.temperature_2m)}</div>
                    <div className="text-sm text-muted-foreground mb-3">{wmoB.label}</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Feels like {fmtTemp(wxB.current.apparent_temperature)}</div>
                      <div>Humidity {wxB.current.relative_humidity_2m}%</div>
                      <div>Wind {Math.round(wxB.current.wind_speed_10m)} km/h</div>
                    </div>
                  </>
                ) : <div className="text-muted-foreground text-sm">Loading...</div>}
              </CardContent>
            </Card>
          </div>
        </div>

        {timeOffset !== null && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Time difference</h2>
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-black text-violet-500 tabular-nums mb-2">
                  {timeOffset === 0 ? 'Same time' : (Math.abs(timeOffset) + ' hours')}
                </div>
                <p className="text-sm text-muted-foreground">
                  {timeOffset === 0 ? (a.name + ' and ' + b.name + ' are in the same time zone.') :
                    (timeOffset > 0 ? (a.name + ' is ' + timeOffset + ' hours behind ' + b.name + '.') :
                      (b.name + ' is ' + Math.abs(timeOffset) + ' hours behind ' + a.name + '.'))}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {climA && climB && (
          <>
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Annual climate averages</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <div className="text-sm font-black text-sky-500 mb-3">{a.name}</div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg high</span><span className="font-black tabular-nums">{climA.annual.avgHigh} C</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg low</span><span className="font-black tabular-nums">{climA.annual.avgLow} C</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Annual rain</span><span className="font-black tabular-nums">{climA.annual.precip} mm</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Warmest month</span><span className="font-black">{climA.annual.hottestMonth}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Coolest month</span><span className="font-black">{climA.annual.coldestMonth}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Wettest month</span><span className="font-black">{climA.annual.wettestMonth}</span></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="text-sm font-black text-violet-500 mb-3">{b.name}</div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg high</span><span className="font-black tabular-nums">{climB.annual.avgHigh} C</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg low</span><span className="font-black tabular-nums">{climB.annual.avgLow} C</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Annual rain</span><span className="font-black tabular-nums">{climB.annual.precip} mm</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Warmest month</span><span className="font-black">{climB.annual.hottestMonth}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Coolest month</span><span className="font-black">{climB.annual.coldestMonth}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Wettest month</span><span className="font-black">{climB.annual.wettestMonth}</span></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Monthly highs comparison</h2>
              <Card className="border-border">
                <CardContent className="p-5 space-y-3">
                  {climA.months.map((m, i) => {
                    const mb = climB.months[i]
                    const maxV = Math.max(m.avgHigh, mb.avgHigh)
                    const minV = Math.min(m.avgHigh, mb.avgHigh)
                    const range = Math.max(1, maxV - minV)
                    const wA = ((m.avgHigh - minV) / range) * 60 + 20
                    const wB = ((mb.avgHigh - minV) / range) * 60 + 20
                    return (
                      <div key={m.m}>
                        <div className="text-xs font-bold mb-1">{m.name}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 text-[10px] text-sky-500 font-black">A</div>
                            <div className="flex-1 h-4 rounded bg-muted/30 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600" style={{ width: wA + '%' }} />
                            </div>
                            <div className="w-12 text-right text-[10px] font-bold tabular-nums">{m.avgHigh} C</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 text-[10px] text-violet-500 font-black">B</div>
                            <div className="flex-1 h-4 rounded bg-muted/30 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-violet-400 to-violet-600" style={{ width: wB + '%' }} />
                            </div>
                            <div className="w-12 text-right text-[10px] font-bold tabular-nums">{mb.avgHigh} C</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <p className="text-xs text-muted-foreground pt-2">
                    <span className="font-black text-sky-500">A</span> = {a.name}, <span className="font-black text-violet-500">B</span> = {b.name}
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">About this comparison</h2>
          <Card className="border-border">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm leading-relaxed">
                <strong>{a.name}</strong> is a city in <strong>{a.region}</strong> with a <strong>{a.climate}</strong> climate. {a.fact}
              </p>
              <p className="text-sm leading-relaxed">
                <strong>{b.name}</strong> is a city in <strong>{b.region}</strong> with a <strong>{b.climate}</strong> climate. {b.fact}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Both cities are popular destinations for travelers and remote workers. Comparing their climates helps decide the best time to visit each. Annual averages are based on 30-year climate normals. Live conditions update hourly.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Other comparisons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {WEATHER_HUBS.filter((h) => h !== a.slug && h !== b.slug).slice(0, 8).map((h) => {
              const other = getAstroCityBySlug(h)
              if (!other) return null
              const [x, y] = getCanonicalPair(a.slug, h)
              const otherCity = getAstroCityBySlug(y)
              return (
                <Link key={h} to={'/weather/' + x + '/vs/' + y} className="block rounded-xl border border-border bg-card hover:border-violet-400 p-3 transition-colors">
                  <div className="text-sm font-bold">{a.name} vs {otherCity.name}</div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Explore each city</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to={'/weather/' + a.slug} className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <CloudSun className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">{a.name} full weather</h3>
              <p className="text-xs text-muted-foreground">Live conditions and 7-day forecast.</p>
            </Link>
            <Link to={'/weather/' + b.slug} className="block rounded-xl border border-border bg-card hover:border-violet-400 p-5 transition-colors">
              <CloudSun className="h-5 w-5 text-violet-500 mb-2" />
              <h3 className="font-bold mb-1">{b.name} full weather</h3>
              <p className="text-xs text-muted-foreground">Live conditions and 7-day forecast.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-violet-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-violet-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Open-Meteo</h3>
              <p className="text-xs text-muted-foreground">Live weather data.</p>
            </a>
            <a href="https://power.larc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-violet-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-violet-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">NASA POWER</h3>
              <p className="text-xs text-muted-foreground">30-year climate normals.</p>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={a.name + ' vs ' + b.name + ' - TimeGovern'} />
        </div>
      </div>
    </>
  )
}