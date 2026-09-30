import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { CloudSun, Sparkles, ArrowRight, ExternalLink, Globe, AlertCircle, Wind, Droplets, Thermometer, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { COUNTRIES_DATA } from '../data/countries'
import { fetchWeather, getWmoInfo, formatTemp, formatWindDirection } from '../lib/weatherUtils'

const CLIMATE_NOTE = {
  temperate: 'Expect moderate seasons. Weather can shift quickly day to day, especially in spring and autumn.',
  tropical: 'Warm and humid year-round. Afternoon showers are common during the wet season.',
  arid: 'Hot days, cool nights, and very low rainfall. Clear skies dominate most of the year.',
  polar: 'Extreme seasonal swings. Long summer days and long winter nights with intense cold.',
  mediterranean: 'Dry, warm summers and mild, wet winters. Most rainfall falls between November and March.',
  subtropical: 'Long, hot summers and mild winters. Humidity is highest in late summer.',
  continental: 'Large temperature ranges between summer and winter. Cold winters and warm summers are typical.',
}

const fmtDay = (iso) => new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(iso))

export default function CityWeatherPage() {
  const { city: citySlug } = useParams()
  const city = citySlug ? getAstroCityBySlug(citySlug) : null

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!city) { setLoading(false); return }
    const ctrl = new AbortController()
    setLoading(true)
    setError(null)
    fetchWeather(city.lat, city.lng, ctrl.signal)
      .then((json) => { setData(json); setLoading(false) })
      .catch((err) => { if (err.name !== 'AbortError') { setError(err.message); setLoading(false) } })
    return () => ctrl.abort()
  }, [city])

  const country = city ? COUNTRIES_DATA.find((c) => c.c2 === city.c2) : null
  const peers = city ? ASTRO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 6) : []

  useEffect(() => {
    if (!city) return
    document.title = city.name + ' Weather - Live Conditions & 7-Day Forecast | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Live weather in ' + city.name + ' - current temperature, humidity, wind, and 7-day forecast. Powered by Open-Meteo.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city])

  if (citySlug && !city) return <Navigate to="/weather" replace />

  // HUB
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

  const current = data && data.current ? data.current : null
  const daily = data && data.daily ? data.daily : null
  const wmo = current ? getWmoInfo(current.weather_code) : null
  const tz = data ? data.timezone : (country ? country.tz[0] : 'UTC')

  const FAQ = [
    { q: 'What is the weather in ' + city.name + ' right now?', a: current ? 'Right now in ' + city.name + ' it is ' + formatTemp(current.temperature_2m) + ' with ' + wmo.label.toLowerCase() + '. Feels like ' + formatTemp(current.apparent_temperature) + '.' : 'Weather data loads on visit. Refresh this page for the latest conditions.' },
    { q: 'What is the 7-day forecast for ' + city.name + '?', a: daily ? 'The next week in ' + city.name + ' ranges from ' + formatTemp(Math.min.apply(null, daily.temperature_2m_min)) + ' to ' + formatTemp(Math.max.apply(null, daily.temperature_2m_max)) + ', with peak precipitation chance of ' + Math.max.apply(null, daily.precipitation_probability_max) + '%.' : 'Forecast loads on visit.' },
    { q: 'What is the climate like in ' + city.name + '?', a: city.name + ' has a ' + city.climate + ' climate. ' + CLIMATE_NOTE[city.climate] },
    { q: 'What hemisphere is ' + city.name + ' in?', a: city.name + ' is in the ' + (city.hemisphere === 'N' ? 'Northern' : 'Southern') + ' Hemisphere, so its seasons run ' + (city.hemisphere === 'N' ? 'with the calendar year (summer mid-year)' : 'opposite to the Northern Hemisphere (summer at year end)') + '.' },
    { q: 'Where does the weather data come from?', a: 'Data comes from Open-Meteo, which aggregates national weather models including NOAA GFS, DWD ICON, and MeteoFrance AROME. No tracking, no API key.' },
    { q: 'How current is the data?', a: 'Open-Meteo updates every hour. Each page load requests the freshest forecast.' },
  ]
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/weather" className="hover:text-primary">Weather</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">{city.name}</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-blue-950 to-indigo-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">{country ? country.flag : ''} {city.region} - {city.climate}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <CloudSun className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              {city.name}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Live weather and 7-day forecast.</p>
          </div>
        </div>

        {/* Current conditions */}
        <Card className="border-2 border-sky-500/30">
          <CardContent className="p-6">
            {loading && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="animate-spin h-5 w-5 border-2 border-sky-500 border-t-transparent rounded-full" />
                <span className="text-sm">Loading live weather...</span>
              </div>
            )}
            {error && (
              <div className="flex items-start gap-3 text-sm">
                <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">Could not load live weather</div>
                  <div className="text-muted-foreground">Check your internet connection or try again later. The climate and city information below is always available.</div>
                </div>
              </div>
            )}
            {current && (
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Now</div>
                  <div className="text-xs text-muted-foreground">{wmo.label}</div>
                </div>
                <div className="text-6xl md:text-7xl font-black tabular-nums mb-6">{formatTemp(current.temperature_2m)}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="rounded-lg bg-muted/40 p-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Thermometer className="h-3 w-3" />Feels like</div>
                    <div className="text-lg font-black tabular-nums">{formatTemp(current.apparent_temperature)}</div>
                  </div>
                  <div className="rounded-lg bg-muted/40 p-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Droplets className="h-3 w-3" />Humidity</div>
                    <div className="text-lg font-black tabular-nums">{current.relative_humidity_2m}%</div>
                  </div>
                  <div className="rounded-lg bg-muted/40 p-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Wind className="h-3 w-3" />Wind</div>
                    <div className="text-lg font-black tabular-nums">{Math.round(current.wind_speed_10m)} km/h {formatWindDirection(current.wind_direction_10m)}</div>
                  </div>
                  <div className="rounded-lg bg-muted/40 p-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Local time</div>
                    <div className="text-lg font-black">{new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 7-day forecast */}
        {daily && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">7-day forecast</h2>
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-black">Day</th>
                      <th className="text-left py-3 px-4 font-black">Condition</th>
                      <th className="text-right py-3 px-4 font-black">High</th>
                      <th className="text-right py-3 px-4 font-black">Low</th>
                      <th className="text-right py-3 px-4 font-black">Rain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daily.time.map((day, i) => {
                      const dWmo = getWmoInfo(daily.weather_code[i])
                      return (
                        <tr key={day} className="border-b border-border/30 hover:bg-primary/5">
                          <td className="py-2.5 px-4 font-bold">{i === 0 ? 'Today' : fmtDay(day)}</td>
                          <td className="py-2.5 px-4 text-muted-foreground">{dWmo.label}</td>
                          <td className="py-2.5 px-4 text-right tabular-nums">{formatTemp(daily.temperature_2m_max[i])}</td>
                          <td className="py-2.5 px-4 text-right tabular-nums text-muted-foreground">{formatTemp(daily.temperature_2m_min[i])}</td>
                          <td className="py-2.5 px-4 text-right tabular-nums">{daily.precipitation_probability_max[i]}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Unique content per page */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">About {city.name} weather</h2>
          <Card className="border-border">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm leading-relaxed"><strong>{city.name}</strong> is a city in <strong>{city.region}</strong>. {city.fact}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{city.name} has a <strong>{city.climate}</strong> climate. {CLIMATE_NOTE[city.climate]}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {city.hemisphere === 'N' ? ('As a Northern Hemisphere city, ' + city.name + ' experiences summer in June-August and winter in December-February.') : ('As a Southern Hemisphere city, ' + city.name + ' experiences summer in December-February and winter in June-August, opposite to the Northern Hemisphere.')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Same-region comparison */}
        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Weather in nearby cities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.slug} to={'/weather/' + p.slug} className="block rounded-xl border border-border bg-card hover:border-sky-500 p-4 transition-colors group">
                  <div className="text-sm font-bold group-hover:text-sky-500 transition-colors mb-1">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground">{p.climate} climate</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to={'/sun/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Sunrise className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Sun</h3>
              <p className="text-xs text-muted-foreground">Sunrise, sunset, twilight.</p>
            </Link>
            <Link to={'/moon/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Sunset className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Moon</h3>
              <p className="text-xs text-muted-foreground">Moon phase and illumination.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in every city.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Open-Meteo</h3>
              <p className="text-xs text-muted-foreground">Weather API we use.</p>
            </a>
            <a href="https://wmo.int/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">World Meteorological Org</h3>
              <p className="text-xs text-muted-foreground">Global weather standards body.</p>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={city.name + ' Weather - TimeGovern'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Informational only. For severe weather warnings, always check your national meteorological service.
        </div>
      </div>
    </>
  )
}