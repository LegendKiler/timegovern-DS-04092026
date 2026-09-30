import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Clock, Sparkles, AlertCircle, ExternalLink, Cloud, Sun, CloudSun, Wind, Droplets, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { COUNTRIES_DATA } from '../data/countries'
import { getWmoInfo } from '../lib/weatherUtils'

const buildUrl = (lat, lng) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    hourly: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,is_day,uv_index',
    daily: 'sunrise,sunset',
    timezone: 'auto',
    forecast_days: '3',
  })
  return 'https://api.open-meteo.com/v1/forecast?' + params.toString()
}

const fmtHour = (iso, tz) => {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso))
  } catch {
    return iso.slice(11, 16)
  }
}

const fmtDay = (iso) => {
  try {
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(iso))
  } catch {
    return ''
  }
}

const windDir = (deg) => {
  if (deg == null) return ''
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
  return dirs[Math.round(deg / 22.5) % 16]
}

const CLIMATE_NOTE = {
  temperate: 'Hourly temperatures can swing 10+ degrees from morning low to afternoon high, especially in spring and autumn.',
  tropical: 'Afternoon thunderstorms are common. Mornings are usually clearer, with rain building between 2pm and 6pm.',
  arid: 'Days are hot and dry, nights cool down sharply after sunset. Rain is rare year-round.',
  polar: 'Summer days stay bright late into the evening; winter daylight is limited to a few hours around midday.',
  mediterranean: 'Warm dry days and cool nights. Peak heat usually arrives between 2pm and 5pm local time.',
  subtropical: 'Hot humid afternoons with peak heat in the mid-afternoon. Brief thunderstorms common in late summer.',
  continental: 'Large day-night temperature swings are typical. Summer afternoons are warm, winter mornings very cold.',
}

export default function HourlyForecastPage() {
  const { city: citySlug } = useParams()
  const city = citySlug ? getAstroCityBySlug(citySlug) : null
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!city) { setLoading(false); return }
    const ctrl = new AbortController()
    setLoading(true); setError(null)
    fetch(buildUrl(city.lat, city.lng), { signal: ctrl.signal })
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
      .then((d) => { setData(d); setLoading(false) })
      .catch((e) => { if (e.name !== 'AbortError') { setError(e.message); setLoading(false) } })
    return () => ctrl.abort()
  }, [city])

  useEffect(() => {
    if (!city) return
    document.title = city.name + ' Hourly Weather - 48-Hour Forecast | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Hour-by-hour weather forecast for ' + city.name + ' - temperature, rain chance, wind, humidity, and UV index. Next 48 hours.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city])

  if (citySlug && !city) return <Navigate to="/weather" replace />

  if (!city) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="rounded-3xl border border-border p-8 text-center">
          <Clock className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Pick a city</h1>
          <Link to="/weather" className="text-primary font-bold hover:underline">See all cities</Link>
        </div>
      </div>
    )
  }

  const country = COUNTRIES_DATA.find((c) => c.c2 === city.c2)
  const peers = ASTRO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 6)
  const hourly = data && data.hourly ? data.hourly : null
  const tz = data ? data.timezone : (country ? country.tz[0] : 'UTC')

  // Find next 48 hours starting from now (rounded to hour)
  let rows = []
  let summary = null
  if (hourly && hourly.time) {
    const now = Date.now()
    const startIdx = hourly.time.findIndex((t) => new Date(t).getTime() >= now - 3600000)
    const idx = startIdx >= 0 ? startIdx : 0
    rows = hourly.time.slice(idx, idx + 48).map((t, i) => {
      const j = idx + i
      return {
        time: t,
        temp: hourly.temperature_2m[j],
        feels: hourly.apparent_temperature[j],
        humidity: hourly.relative_humidity_2m[j],
        rainChance: hourly.precipitation_probability[j],
        precip: hourly.precipitation[j],
        code: hourly.weather_code[j],
        wind: hourly.wind_speed_10m[j],
        windDir: hourly.wind_direction_10m[j],
        isDay: hourly.is_day[j],
        uv: hourly.uv_index[j],
      }
    })

    // Summary stats
    const temps = rows.map((r) => r.temp).filter((v) => v != null)
    const rainChances = rows.map((r) => r.rainChance).filter((v) => v != null)
    const windSpeeds = rows.map((r) => r.wind).filter((v) => v != null)
    if (temps.length > 0) {
      const warmest = rows.reduce((a, b) => (a.temp > b.temp ? a : b))
      const coolest = rows.reduce((a, b) => (a.temp < b.temp ? a : b))
      const rainiest = rows.reduce((a, b) => (a.rainChance > b.rainChance ? a : b))
      const windiest = rows.reduce((a, b) => (a.wind > b.wind ? a : b))
      summary = {
        minTemp: Math.round(Math.min.apply(null, temps)),
        maxTemp: Math.round(Math.max.apply(null, temps)),
        maxRain: Math.round(Math.max.apply(null, rainChances)),
        maxWind: Math.round(Math.max.apply(null, windSpeeds)),
        warmest,
        coolest,
        rainiest,
        windiest,
      }
    }
  }

  const FAQ = summary ? [
    { q: 'What is the warmest hour in ' + city.name + ' over the next 48 hours?', a: 'The warmest hour is expected at ' + fmtHour(summary.warmest.time, tz) + ' on ' + fmtDay(summary.warmest.time) + ' at around ' + Math.round(summary.warmest.temp) + ' C.' },
    { q: 'What is the coolest hour in ' + city.name + ' over the next 48 hours?', a: 'The coolest hour is expected at ' + fmtHour(summary.coolest.time, tz) + ' on ' + fmtDay(summary.coolest.time) + ' at around ' + Math.round(summary.coolest.temp) + ' C.' },
    { q: 'When is rain most likely in ' + city.name + '?', a: 'Peak rain chance in the next 48 hours is ' + summary.maxRain + '% around ' + fmtHour(summary.rainiest.time, tz) + ' on ' + fmtDay(summary.rainiest.time) + '.' },
    { q: 'How windy will it get in ' + city.name + '?', a: 'Winds are forecast to peak at around ' + summary.maxWind + ' km/h at ' + fmtHour(summary.windiest.time, tz) + '.' },
    { q: 'What is the temperature range in ' + city.name + ' over 48 hours?', a: 'Temperatures will range from ' + summary.minTemp + ' C to ' + summary.maxTemp + ' C over the next two days.' },
    { q: 'How often is the hourly forecast updated?', a: 'Open-Meteo updates hourly. Each visit to this page fetches the freshest forecast.' },
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
          <span className="text-foreground font-bold">Hourly</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">{country ? country.flag : ''} {city.region} - Next 48 hours</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Clock className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              {city.name} Hourly
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Hour-by-hour forecast for the next 48 hours.
            </p>
          </div>
        </div>

        {loading && (
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full" />
              <span className="text-sm">Loading hourly forecast...</span>
            </div>
          </CardContent></Card>
        )}

        {error && (
          <Card className="border-2 border-rose-500/30"><CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">Could not load hourly forecast</div>
                <div className="text-sm text-muted-foreground">Check your internet connection and refresh. The city information below is always available.</div>
              </div>
            </div>
          </CardContent></Card>
        )}

        {summary && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">48-hour summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="border-2 border-rose-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Warmest</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(summary.warmest.temp)} C</div>
                  <div className="text-[10px] text-muted-foreground">{fmtDay(summary.warmest.time)} at {fmtHour(summary.warmest.time, tz)}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-sky-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Coolest</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(summary.coolest.temp)} C</div>
                  <div className="text-[10px] text-muted-foreground">{fmtDay(summary.coolest.time)} at {fmtHour(summary.coolest.time, tz)}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-indigo-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Droplets className="h-3 w-3" />Peak rain</div>
                  <div className="text-2xl font-black tabular-nums">{summary.maxRain}%</div>
                  <div className="text-[10px] text-muted-foreground">{fmtDay(summary.rainiest.time)} at {fmtHour(summary.rainiest.time, tz)}</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-emerald-500/30">
                <CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Wind className="h-3 w-3" />Peak wind</div>
                  <div className="text-2xl font-black tabular-nums">{summary.maxWind} km/h</div>
                  <div className="text-[10px] text-muted-foreground">{fmtDay(summary.windiest.time)} at {fmtHour(summary.windiest.time, tz)}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {rows.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Hour by hour</h2>
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-3 font-black">Hour</th>
                      <th className="text-left py-3 px-3 font-black">Condition</th>
                      <th className="text-right py-3 px-3 font-black">Temp</th>
                      <th className="text-right py-3 px-3 font-black hidden md:table-cell">Feels</th>
                      <th className="text-right py-3 px-3 font-black">Rain</th>
                      <th className="text-right py-3 px-3 font-black hidden md:table-cell">Wind</th>
                      <th className="text-right py-3 px-3 font-black hidden lg:table-cell">Humidity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => {
                      const w = getWmoInfo(r.code)
                      const isNewDay = i > 0 && r.time.slice(0, 10) !== rows[i - 1].time.slice(0, 10)
                      return (
                        <tr key={r.time} className={'border-b border-border/30 ' + (isNewDay ? 'border-t-2 border-t-indigo-500/40 bg-indigo-500/5' : 'hover:bg-primary/5')}>
                          <td className="py-2.5 px-3 font-mono font-bold">
                            {isNewDay && <div className="text-[10px] text-indigo-500 font-black uppercase mb-0.5">{fmtDay(r.time)}</div>}
                            {fmtHour(r.time, tz)}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground">{w.label}</td>
                          <td className="py-2.5 px-3 text-right tabular-nums font-bold">{Math.round(r.temp)} C</td>
                          <td className="py-2.5 px-3 text-right tabular-nums hidden md:table-cell text-muted-foreground">{Math.round(r.feels)} C</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">
                            <span className={r.rainChance >= 50 ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''}>{r.rainChance}%</span>
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums hidden md:table-cell text-muted-foreground">{Math.round(r.wind)} km/h {windDir(r.windDir)}</td>
                          <td className="py-2.5 px-3 text-right tabular-nums hidden lg:table-cell text-muted-foreground">{r.humidity}%</td>
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
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">About hourly weather in {city.name}</h2>
          <Card className="border-border">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm leading-relaxed"><strong>{city.name}</strong> is a city in <strong>{city.region}</strong>. {city.fact}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{city.name} has a <strong>{city.climate}</strong> climate. {CLIMATE_NOTE[city.climate]}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {city.hemisphere === 'N' ? ('As a Northern Hemisphere city, ' + city.name + ' experiences its warmest hours in the early-to-mid afternoon during summer months.') : ('As a Southern Hemisphere city, ' + city.name + ' sees seasonal timing reversed from the Northern Hemisphere, with summer warmth at year end.')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">Forecast source: Open-Meteo hourly forecast model, updated hourly.</p>
            </CardContent>
          </Card>
        </div>

        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Hourly forecast in nearby cities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.slug} to={'/weather/' + p.slug + '/hourly'} className="block rounded-xl border border-border bg-card hover:border-indigo-500 p-4 transition-colors group">
                  <div className="text-sm font-bold group-hover:text-indigo-500 transition-colors mb-1">{p.name}</div>
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
            <Link to={'/weather/' + city.slug + '/air'} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Wind className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Air Quality</h3>
              <p className="text-xs text-muted-foreground">Live AQI and PM2.5.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Open-Meteo Forecast</h3>
              <p className="text-xs text-muted-foreground">Hourly forecast data source.</p>
            </a>
            <a href="https://wmo.int/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">World Meteorological Org</h3>
              <p className="text-xs text-muted-foreground">Weather code standard.</p>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={city.name + ' Hourly Weather - TimeGovern'} />
        </div>
      </div>
    </>
  )
}