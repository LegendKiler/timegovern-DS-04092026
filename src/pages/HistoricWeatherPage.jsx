import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { History, Sparkles, AlertCircle, ExternalLink, Cloud, Sun, CloudSun, TrendingUp, TrendingDown, Droplets, Wind } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { COUNTRIES_DATA } from '../data/countries'
import { getWmoInfo } from '../lib/weatherUtils'

// Build URL for the archive API — last 30 days
const buildArchiveUrl = (lat, lng) => {
  const end = new Date()
  end.setDate(end.getDate() - 1) // yesterday (archive lags by ~1 day)
  const start = new Date(end)
  start.setDate(start.getDate() - 29) // 30 days total

  const fmt = (d) => d.toISOString().slice(0, 10)
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    start_date: fmt(start),
    end_date: fmt(end),
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code',
    timezone: 'auto',
  })
  return 'https://archive-api.open-meteo.com/v1/archive?' + params.toString()
}

const fmtDay = (iso) => {
  try {
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(iso))
  } catch {
    return iso
  }
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function HistoricWeatherPage() {
  const { city: citySlug } = useParams()
  const city = citySlug ? getAstroCityBySlug(citySlug) : null
  const [hist, setHist] = useState(null)
  const [climate, setClimate] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch historic weather
  useEffect(() => {
    if (!city) { setLoading(false); return }
    const ctrl = new AbortController()
    setLoading(true); setError(null)
    fetch(buildArchiveUrl(city.lat, city.lng), { signal: ctrl.signal })
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
      .then((d) => { setHist(d); setLoading(false) })
      .catch((e) => { if (e.name !== 'AbortError') { setError(e.message); setLoading(false) } })
    return () => ctrl.abort()
  }, [city])

  // Fetch climate normals (static)
  useEffect(() => {
    if (!city) return
    fetch('/api/climate/' + city.slug + '.json')
      .then((r) => r.ok ? r.json() : null)
      .then((d) => setClimate(d))
      .catch(() => setClimate(null))
  }, [city])

  useEffect(() => {
    if (!city) return
    document.title = city.name + ' Past Weather - Last 30 Days vs Climate Normals | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Past 30 days of weather in ' + city.name + ' compared to 1991-2020 climate averages. Daily highs, lows, rain, and wind.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city])

  if (citySlug && !city) return <Navigate to="/weather" replace />

  if (!city) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="rounded-3xl border border-border p-8 text-center">
          <History className="h-12 w-12 text-slate-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Pick a city</h1>
          <Link to="/weather" className="text-primary font-bold hover:underline">See all cities</Link>
        </div>
      </div>
    )
  }

  const country = COUNTRIES_DATA.find((c) => c.c2 === city.c2)
  const peers = ASTRO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 6)
  const daily = hist && hist.daily ? hist.daily : null
  const tz = hist ? hist.timezone : (country ? country.tz[0] : 'UTC')

  // Build rows with date, high, low, precip, wind, condition
  let rows = []
  let stats = null
  let comparison = null

  if (daily && daily.time) {
    rows = daily.time.map((t, i) => ({
      date: t,
      high: daily.temperature_2m_max[i],
      low: daily.temperature_2m_min[i],
      precip: daily.precipitation_sum[i],
      wind: daily.wind_speed_10m_max[i],
      code: daily.weather_code[i],
    }))

    const highs = rows.map((r) => r.high).filter((v) => v != null)
    const lows = rows.map((r) => r.low).filter((v) => v != null)
    const precips = rows.map((r) => r.precip).filter((v) => v != null)
    const winds = rows.map((r) => r.wind).filter((v) => v != null)

    if (highs.length > 0) {
      const hottest = rows.reduce((a, b) => (a.high > b.high ? a : b))
      const coldest = rows.reduce((a, b) => (a.low < b.low ? a : b))
      const rainiest = rows.reduce((a, b) => (a.precip > b.precip ? a : b))
      const windiest = rows.reduce((a, b) => (a.wind > b.wind ? a : b))
      stats = {
        avgHigh: Math.round(highs.reduce((s, v) => s + v, 0) / highs.length * 10) / 10,
        avgLow: Math.round(lows.reduce((s, v) => s + v, 0) / lows.length * 10) / 10,
        totalPrecip: Math.round(precips.reduce((s, v) => s + v, 0) * 10) / 10,
        avgWind: Math.round(winds.reduce((s, v) => s + v, 0) / winds.length * 10) / 10,
        hottest,
        coldest,
        rainiest,
        windiest,
      }
    }

    // Compare to climate normals for the current month
    if (climate && stats) {
      const currentMonth = new Date().getMonth() + 1
      const normals = climate.months.find((m) => m.m === currentMonth)
      if (normals) {
        comparison = {
          month: normals.name,
          normalHigh: normals.avgHigh,
          normalLow: normals.avgLow,
          normalPrecip: normals.precip * 30, // rough monthly estimate
          highDiff: Math.round((stats.avgHigh - normals.avgHigh) * 10) / 10,
          lowDiff: Math.round((stats.avgLow - normals.avgLow) * 10) / 10,
          precipDiff: Math.round((stats.totalPrecip - normals.precip * 30) * 10) / 10,
        }
      }
    }
  }

  const fmtDelta = (v, unit) => {
    if (v == null || isNaN(v)) return ''
    const sign = v > 0 ? '+' : ''
    return sign + v + unit
  }

  const FAQ = stats ? [
    { q: 'What was the weather like in ' + city.name + ' this past month?', a: 'Over the last 30 days in ' + city.name + ', average highs were ' + stats.avgHigh + ' C and average lows were ' + stats.avgLow + ' C. Total precipitation was ' + stats.totalPrecip + ' mm.' },
    { q: 'What was the hottest day in ' + city.name + ' this month?', a: 'The hottest day was ' + fmtDay(stats.hottest.date) + ' with a high of ' + Math.round(stats.hottest.high) + ' C.' },
    { q: 'What was the coldest day in ' + city.name + ' this month?', a: 'The coldest day was ' + fmtDay(stats.coldest.date) + ' with a low of ' + Math.round(stats.coldest.low) + ' C.' },
    { q: 'How much rain fell in ' + city.name + ' this month?', a: 'Total precipitation was ' + stats.totalPrecip + ' mm over the last 30 days. The wettest day was ' + fmtDay(stats.rainiest.date) + ' with ' + Math.round(stats.rainiest.precip * 10) / 10 + ' mm.' },
    { q: 'Was ' + city.name + ' warmer or cooler than normal this month?', a: comparison ? ('Compared to the ' + comparison.month + ' 1991-2020 average, ' + city.name + ' averaged ' + fmtDelta(comparison.highDiff, ' C') + ' on highs and ' + fmtDelta(comparison.lowDiff, ' C') + ' on lows.') : ('Climate comparison data not available for ' + city.name + '.') },
    { q: 'Where does this historical data come from?', a: 'Historical weather data from the Open-Meteo archive, based on ERA5 reanalysis by ECMWF. Climate normals from NASA POWER.' },
  ] : []

  const FAQ_SCHEMA = FAQ.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : null

  return (
    <>
      {FAQ_SCHEMA && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />}

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/weather" className="hover:text-primary">Weather</Link>
          <span className="mx-2">/</span>
          <Link to={'/weather/' + city.slug} className="hover:text-primary">{city.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">Past Weather</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-slate-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{country ? country.flag : ''} {city.region} - Last 30 days</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <History className="h-10 w-10 md:h-14 md:w-14 text-slate-300" />
              {city.name} Past Weather
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Actual weather over the last 30 days, compared to 30-year climate normals.
            </p>
          </div>
        </div>

        {loading && (
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="animate-spin h-5 w-5 border-2 border-slate-500 border-t-transparent rounded-full" />
              <span className="text-sm">Loading historical weather...</span>
            </div>
          </CardContent></Card>
        )}

        {error && (
          <Card className="border-2 border-rose-500/30"><CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">Could not load historical data</div>
                <div className="text-sm text-muted-foreground">The Open-Meteo archive may be temporarily unavailable. Try refreshing. City information below is always available.</div>
              </div>
            </div>
          </CardContent></Card>
        )}

        {stats && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">30-day summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="border-2 border-rose-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Average high</div>
                  <div className="text-2xl font-black tabular-nums">{stats.avgHigh} C</div>
                  {comparison && <div className={'text-[10px] font-bold ' + (comparison.highDiff > 0 ? 'text-rose-500' : comparison.highDiff < 0 ? 'text-sky-500' : 'text-muted-foreground')}>{fmtDelta(comparison.highDiff, ' C')} vs normal</div>}
                </CardContent>
              </Card>
              <Card className="border-2 border-sky-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Average low</div>
                  <div className="text-2xl font-black tabular-nums">{stats.avgLow} C</div>
                  {comparison && <div className={'text-[10px] font-bold ' + (comparison.lowDiff > 0 ? 'text-rose-500' : comparison.lowDiff < 0 ? 'text-sky-500' : 'text-muted-foreground')}>{fmtDelta(comparison.lowDiff, ' C')} vs normal</div>}
                </CardContent>
              </Card>
              <Card className="border-2 border-indigo-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Droplets className="h-3 w-3" />Total rain</div>
                  <div className="text-2xl font-black tabular-nums">{stats.totalPrecip} mm</div>
                  {comparison && <div className={'text-[10px] font-bold ' + (comparison.precipDiff > 0 ? 'text-indigo-500' : comparison.precipDiff < 0 ? 'text-amber-500' : 'text-muted-foreground')}>{fmtDelta(comparison.precipDiff, ' mm')} vs normal</div>}
                </CardContent>
              </Card>
              <Card className="border-2 border-emerald-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Wind className="h-3 w-3" />Average wind</div>
                  <div className="text-2xl font-black tabular-nums">{stats.avgWind} km/h</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {stats && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Extremes in the last 30 days</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card>
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" />Hottest</div>
                  <div className="text-lg font-black">{fmtDay(stats.hottest.date)}</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{Math.round(stats.hottest.high)} C</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><TrendingDown className="h-3 w-3" />Coldest</div>
                  <div className="text-lg font-black">{fmtDay(stats.coldest.date)}</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{Math.round(stats.coldest.low)} C</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Droplets className="h-3 w-3" />Wettest</div>
                  <div className="text-lg font-black">{fmtDay(stats.rainiest.date)}</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{Math.round(stats.rainiest.precip * 10) / 10} mm</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Wind className="h-3 w-3" />Windiest</div>
                  <div className="text-lg font-black">{fmtDay(stats.windiest.date)}</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{Math.round(stats.windiest.wind)} km/h</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {comparison && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Compared to {comparison.month} normals</h2>
            <Card className="border-2 border-slate-500/30 bg-gradient-to-br from-slate-500/5 to-zinc-500/5">
              <CardContent className="p-6">
                <p className="text-sm leading-relaxed mb-4">
                  This {comparison.month} has been <strong>{comparison.highDiff > 0.5 ? 'warmer' : comparison.highDiff < -0.5 ? 'cooler' : 'near-normal'}</strong> than the 1991-2020 average in {city.name}.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="rounded-lg bg-background/50 p-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Highs vs normal</div>
                    <div className={'text-xl font-black tabular-nums ' + (comparison.highDiff > 0 ? 'text-rose-500' : comparison.highDiff < 0 ? 'text-sky-500' : '')}>{fmtDelta(comparison.highDiff, ' C')}</div>
                    <div className="text-[10px] text-muted-foreground">Normal: {comparison.normalHigh} C</div>
                  </div>
                  <div className="rounded-lg bg-background/50 p-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Lows vs normal</div>
                    <div className={'text-xl font-black tabular-nums ' + (comparison.lowDiff > 0 ? 'text-rose-500' : comparison.lowDiff < 0 ? 'text-sky-500' : '')}>{fmtDelta(comparison.lowDiff, ' C')}</div>
                    <div className="text-[10px] text-muted-foreground">Normal: {comparison.normalLow} C</div>
                  </div>
                  <div className="rounded-lg bg-background/50 p-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Rain vs normal</div>
                    <div className={'text-xl font-black tabular-nums ' + (comparison.precipDiff > 0 ? 'text-indigo-500' : comparison.precipDiff < 0 ? 'text-amber-500' : '')}>{fmtDelta(comparison.precipDiff, ' mm')}</div>
                    <div className="text-[10px] text-muted-foreground">Normal: {Math.round(comparison.normalPrecip)} mm</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {rows.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Daily record</h2>
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-3 font-black">Date</th>
                      <th className="text-left py-3 px-3 font-black">Condition</th>
                      <th className="text-right py-3 px-3 font-black">High</th>
                      <th className="text-right py-3 px-3 font-black">Low</th>
                      <th className="text-right py-3 px-3 font-black">Rain</th>
                      <th className="text-right py-3 px-3 font-black hidden md:table-cell">Wind</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice().reverse().map((r) => {
                      const w = getWmoInfo(r.code)
                      return (
                        <tr key={r.date} className="border-b border-border/30 hover:bg-primary/5">
                          <td className="py-2.5 px-3 font-bold">{fmtDay(r.date)}</td>
                          <td className="py-2.5 px-3 text-muted-foreground">{w.label}</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">{Math.round(r.high)} C</td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{Math.round(r.low)} C</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">{r.precip ? Math.round(r.precip * 10) / 10 : 0} mm</td>
                          <td className="py-2.5 px-3 text-right tabular-nums hidden md:table-cell text-muted-foreground">{Math.round(r.wind)} km/h</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">About past weather in {city.name}</h2>
          <Card className="border-border">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm leading-relaxed"><strong>{city.name}</strong> is a city in <strong>{city.region}</strong>. {city.fact}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{city.name} has a <strong>{city.climate}</strong> climate. Historical data reflects actual observed conditions over the last 30 days.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This page compares recent weather to 30-year climate normals (1991-2020). Differences can show how this month compares to typical conditions. A warmer-than-normal month does not imply climate change on its own — short-term variability is normal.
              </p>
            </CardContent>
          </Card>
        </div>

        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Past weather in nearby cities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.slug} to={'/weather/' + p.slug + '/historic'} className="block rounded-xl border border-border bg-card hover:border-slate-500 p-4 transition-colors group">
                  <div className="text-sm font-bold group-hover:text-slate-500 transition-colors mb-1">{p.name}</div>
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
            <Link to={'/weather/' + city.slug + '/climate'} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Cloud className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Climate</h3>
              <p className="text-xs text-muted-foreground">30-year monthly averages.</p>
            </Link>
            <Link to={'/weather/' + city.slug + '/hourly'} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <History className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Hourly</h3>
              <p className="text-xs text-muted-foreground">Next 48 hours forecast.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-slate-500 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-slate-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Open-Meteo Archive</h3>
              <p className="text-xs text-muted-foreground">ERA5 historical weather.</p>
            </a>
            <a href="https://power.larc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-slate-500 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-slate-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">NASA POWER</h3>
              <p className="text-xs text-muted-foreground">Climate normals source.</p>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={city.name + ' Past Weather - TimeGovern'} />
        </div>
      </div>
    </>
  )
}