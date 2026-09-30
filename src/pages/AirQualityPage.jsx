import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Wind, Sparkles, AlertCircle, ExternalLink, Cloud, Sun, CloudSun, Leaf } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { COUNTRIES_DATA } from '../data/countries'

const AQI_LEVELS = [
  { max: 20, label: 'Good', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/40', bar: 'bg-emerald-500/60', note: 'Air quality is excellent. No health concerns.' },
  { max: 40, label: 'Fair', color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-500/10 border-lime-500/40', bar: 'bg-lime-500/60', note: 'Air quality is acceptable for most people.' },
  { max: 60, label: 'Moderate', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/40', bar: 'bg-amber-500/60', note: 'Sensitive groups may notice mild effects.' },
  { max: 80, label: 'Poor', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10 border-orange-500/40', bar: 'bg-orange-500/60', note: 'Sensitive groups should reduce outdoor exertion.' },
  { max: 100, label: 'Very Poor', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10 border-rose-500/40', bar: 'bg-rose-500/60', note: 'Everyone may experience health effects. Limit outdoor activity.' },
  { max: 999, label: 'Extremely Poor', color: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-500/10 border-fuchsia-500/40', bar: 'bg-fuchsia-500/60', note: 'Health alert. Avoid outdoor activity if possible.' },
]

const getAqi = (pm25) => {
  if (pm25 == null) return null
  return AQI_LEVELS.find((l) => pm25 <= l.max) || AQI_LEVELS[AQI_LEVELS.length - 1]
}

const buildUrl = (lat, lng) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: 'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index,dust',
    hourly: 'pm10,pm2_5,uv_index',
    timezone: 'auto',
    forecast_days: '3',
  })
  return 'https://air-quality-api.open-meteo.com/v1/air-quality?' + params.toString()
}

const AIR_NOTE = {
  arid: 'Air quality is often affected by natural dust, especially during windy months. This can push PM10 readings higher than urban pollution alone would suggest.',
  tropical: 'Air quality varies seasonally. The wet season tends to wash out particulates, while the dry season may see higher PM2.5 from local sources and biomass burning.',
  temperate: 'Air quality is usually best in winter when weather patterns clean the air, and can degrade in still summer conditions.',
  continental: 'Air quality often peaks in winter due to heating emissions and temperature inversions, and improves in summer.',
  mediterranean: 'Air quality is generally good year-round, though summer heat can raise ozone levels and winter inversions can trap pollutants.',
  subtropical: 'Air quality can be affected by high humidity and heat, which accelerate ozone formation on still days.',
  polar: 'Air quality is typically excellent thanks to low local emissions and strong wind patterns, though seasonal transport of pollutants can occur.',
}

export default function AirQualityPage() {
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
    document.title = city.name + ' Air Quality - Live AQI, PM2.5 & UV Index | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Live air quality in ' + city.name + ' - PM2.5, PM10, ozone, NO2, SO2, CO, UV index and dust. Real-time AQI forecast.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city])

  if (citySlug && !city) return <Navigate to="/weather" replace />

  const country = city ? COUNTRIES_DATA.find((c) => c.c2 === city.c2) : null
  const peers = city ? ASTRO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 6) : []
  const current = data && data.current ? data.current : null
  const hourly = data && data.hourly ? data.hourly : null
  const aqi = current ? getAqi(current.pm2_5) : null

  const FAQ = current && aqi ? [
    { q: 'What is the air quality in ' + city.name + ' right now?', a: 'Air quality in ' + city.name + ' is currently ' + aqi.label + ' with PM2.5 at ' + Math.round(current.pm2_5) + ' ug/m3 and PM10 at ' + Math.round(current.pm10) + ' ug/m3.' },
    { q: 'Is the air quality safe in ' + city.name + '?', a: aqi.note },
    { q: 'What is PM2.5?', a: 'PM2.5 is fine particulate matter under 2.5 micrometres in diameter. It can penetrate deep into the lungs and bloodstream and is the most common measure of air quality impact on health.' },
    { q: 'What is the UV index in ' + city.name + '?', a: 'The current UV index is ' + (current.uv_index != null ? Math.round(current.uv_index * 10) / 10 : 'unavailable') + '. Values above 6 mean you should use sun protection.' },
    { q: 'How often is this updated?', a: 'Open-Meteo air quality data updates hourly using the CAMS European and global forecast models.' },
    { q: 'Where does this data come from?', a: 'Air quality data comes from the Copernicus Atmosphere Monitoring Service (CAMS), distributed through Open-Meteo. No API key, no tracking.' },
  ] : []

  const FAQ_SCHEMA = FAQ.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : null

  if (!city) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="rounded-3xl border border-border p-8 text-center">
          <Wind className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Pick a city</h1>
          <Link to="/weather" className="text-primary font-bold hover:underline">See all cities</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {FAQ_SCHEMA && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />}

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/weather" className="hover:text-primary">Weather</Link>
          <span className="mx-2">/</span>
          <Link to={'/weather/' + city.slug} className="hover:text-primary">{city.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">Air Quality</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">{country ? country.flag : ''} {city.region} - Live AQI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Wind className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              {city.name} Air Quality
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Live PM2.5, PM10, ozone, UV index and dust. Updated hourly from Copernicus CAMS.
            </p>
          </div>
        </div>

        {loading && (
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="animate-spin h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full" />
              <span className="text-sm">Loading live air quality...</span>
            </div>
          </CardContent></Card>
        )}

        {error && (
          <Card className="border-2 border-rose-500/30"><CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">Could not load air quality</div>
                <div className="text-sm text-muted-foreground">Check your internet connection and refresh. The climate and city information below is always available.</div>
              </div>
            </div>
          </CardContent></Card>
        )}

        {current && aqi && (
          <>
            <Card className={'border-2 ' + aqi.bg}>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Live AQI</div>
                  <div className={'text-xs font-black ' + aqi.color}>{aqi.label}</div>
                </div>
                <div className={'text-6xl md:text-7xl font-black tabular-nums mb-2 ' + aqi.color}>{Math.round(current.pm2_5)}</div>
                <div className="text-sm text-muted-foreground mb-4">PM2.5 (ug/m3)</div>
                <p className="text-sm text-muted-foreground">{aqi.note}</p>
              </CardContent></Card>

            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Current pollutants</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">PM2.5</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(current.pm2_5)}</div>
                  <div className="text-[10px] text-muted-foreground">ug/m3</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">PM10</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(current.pm10)}</div>
                  <div className="text-[10px] text-muted-foreground">ug/m3</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Ozone</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(current.ozone)}</div>
                  <div className="text-[10px] text-muted-foreground">ug/m3</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">NO2</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(current.nitrogen_dioxide)}</div>
                  <div className="text-[10px] text-muted-foreground">ug/m3</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">SO2</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(current.sulphur_dioxide)}</div>
                  <div className="text-[10px] text-muted-foreground">ug/m3</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">CO</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(current.carbon_monoxide)}</div>
                  <div className="text-[10px] text-muted-foreground">ug/m3</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Sun className="h-3 w-3" />UV Index</div>
                  <div className="text-2xl font-black tabular-nums">{current.uv_index != null ? Math.round(current.uv_index * 10) / 10 : '-'}</div>
                  <div className="text-[10px] text-muted-foreground">{current.uv_index != null ? (current.uv_index >= 6 ? 'High' : current.uv_index >= 3 ? 'Moderate' : 'Low') : ''}</div>
                </CardContent></Card>
                <Card><CardContent className="p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Leaf className="h-3 w-3" />Dust</div>
                  <div className="text-2xl font-black tabular-nums">{Math.round(current.dust || 0)}</div>
                  <div className="text-[10px] text-muted-foreground">ug/m3</div>
                </CardContent></Card>
              </div>
            </div>

            {hourly && hourly.pm2_5 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Next 24 hours</h2>
                <Card className="border-border">
                  <CardContent className="p-5">
                    <div className="space-y-1">
                      {hourly.time.slice(0, 24).map((t, i) => {
                        const v = hourly.pm2_5[i]
                        if (v == null) return null
                        const pct = Math.min(100, (v / 60) * 100)
                        const lvl = getAqi(v)
                        const hourLabel = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(t))
                        return (
                          <div key={t} className="flex items-center gap-3">
                            <div className="w-14 text-[10px] font-mono text-muted-foreground">{hourLabel}</div>
                            <div className="flex-1 h-5 rounded bg-muted/30 overflow-hidden">
                              <div className={'h-full rounded ' + (lvl ? lvl.bar : 'bg-slate-400')} style={{ width: pct + '%' }} />
                            </div>
                            <div className="w-12 text-right text-xs font-bold tabular-nums">{Math.round(v)}</div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">About air quality in {city.name}</h2>
          <Card className="border-border">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm leading-relaxed"><strong>{city.name}</strong> is a city in <strong>{city.region}</strong>. {city.fact}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{AIR_NOTE[city.climate]}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Data source: Copernicus Atmosphere Monitoring Service (CAMS), distributed via Open-Meteo. Hourly updates.</p>
            </CardContent>
          </Card>
        </div>

        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Air quality in nearby cities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.slug} to={'/weather/' + p.slug + '/air'} className="block rounded-xl border border-border bg-card hover:border-emerald-500 p-4 transition-colors group">
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
            <Link to={'/weather/' + city.slug + '/climate'} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Cloud className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Climate</h3>
              <p className="text-xs text-muted-foreground">30-year monthly averages.</p>
            </Link>
            <Link to={'/sun/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Sun className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Sun</h3>
              <p className="text-xs text-muted-foreground">Sunrise and sunset times.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://atmosphere.copernicus.eu/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Copernicus CAMS</h3>
              <p className="text-xs text-muted-foreground">Source of air quality data.</p>
            </a>
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Open-Meteo</h3>
              <p className="text-xs text-muted-foreground">Distribution layer we use.</p>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={city.name + ' Air Quality - TimeGovern'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Informational only. For official health advisories, check your local environmental agency.
        </div>
      </div>
    </>
  )
}