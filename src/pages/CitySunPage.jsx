import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Sun, Sparkles, ArrowRight, ExternalLink, Globe, Moon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { getSunTimes, formatTime, formatDuration } from '../lib/astronomyUtils'
import { COUNTRIES_DATA } from '../data/countries'

export default function CitySunPage() {
  const { city: citySlug } = useParams()
  const city = citySlug ? getAstroCityBySlug(citySlug) : null

  const times = useMemo(() => city ? getSunTimes(new Date(), city.lat, city.lng) : null, [city])

  useEffect(() => {
    if (!city || !times) {
      document.title = 'Sunrise and Sunset Times - TimeGovern'
      return
    }
    document.title = city.name + ' Sunrise and Sunset Today - Twilight & Day Length | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Sunrise, sunset, civil twilight, nautical twilight, astronomical twilight, and day length for ' + city.name + ' today. Accurate NOAA calculations.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city, times])

  if (citySlug && !city) return <Navigate to="/sun" replace />

  const country = city ? COUNTRIES_DATA.find((c) => c.c2 === city.c2) : null
  const peerCities = city ? ASTRO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 3) : []
  const tz = country ? country.tz[0] : 'UTC'

  // HUB VIEW (no city selected)
  if (!city) {
    return (
      <>
        <div className="container mx-auto p-4 max-w-5xl space-y-8">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-red-950" />
            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Sun position - 45 ASTRO_CITIES</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
                <Sun className="h-10 w-10 md:h-14 md:w-14 text-amber-300" />
                Sun
              </h1>
              <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
                Sunrise, sunset, solar noon, day length, and twilight phases for any city.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Choose a city</h2>
            <Card className="border-border">
              <CardContent className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {ASTRO_CITIES.map((c) => (
                    <Link key={c.slug} to={'/sun/' + c.slug} className="rounded-lg border border-border/50 bg-card hover:border-amber-500 p-3 transition-colors">
                      <div className="text-sm font-bold">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{c.lat.toFixed(2)}, {c.lng.toFixed(2)}</div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Link to="/astronomy" className="text-sm font-bold text-primary hover:underline">Back to Sun and Moon</Link>
          </div>
        </div>
      </>
    )
  }

  // CITY VIEW
  const FAQ = [
    { q: 'What time is sunrise in ' + city.name + ' today?', a: 'Sunrise in ' + city.name + ' today is at ' + formatTime(times.sunrise, tz) + ' local time.' },
    { q: 'What time is sunset in ' + city.name + ' today?', a: 'Sunset in ' + city.name + ' today is at ' + formatTime(times.sunset, tz) + ' local time.' },
    { q: 'How long is the day in ' + city.name + ' today?', a: 'Day length in ' + city.name + ' today is ' + formatDuration(times.dayLengthMinutes) + ' from sunrise to sunset.' },
    { q: 'When is civil twilight in ' + city.name + '?', a: 'Civil twilight in ' + city.name + ' starts at ' + formatTime(times.civilDawn, tz) + ' (dawn) and ends at ' + formatTime(times.civilDusk, tz) + ' (dusk).' },
    { q: 'When is astronomical twilight in ' + city.name + '?', a: 'Astronomical twilight in ' + city.name + ' starts at ' + formatTime(times.astroDawn, tz) + ' and ends at ' + formatTime(times.astroDusk, tz) + '. Before dawn and after dusk, the sky is fully dark.' },
    { q: 'What is solar noon in ' + city.name + '?', a: 'Solar noon in ' + city.name + ' today is at ' + formatTime(times.solarNoon, tz) + '. This is when the sun is at its highest point.' },
  ]
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/astronomy" className="hover:text-primary">Sun and Moon</Link>
          <span className="mx-2">/</span>
          <Link to="/sun" className="hover:text-primary">Sun</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">{city.name}</span>
        </div>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-red-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">{country ? country.flag : ''} {city.lat.toFixed(2)}, {city.lng.toFixed(2)}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Sun className="h-10 w-10 md:h-14 md:w-14 text-amber-300" />
              {city.name}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Sunrise, sunset, and twilight for today.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Card className="border-2 border-amber-500/30"><CardContent className="p-6">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Sunrise</div>
            <div className="text-4xl font-black tabular-nums">{formatTime(times.sunrise, tz)}</div>
          </CardContent></Card>
          <Card className="border-2 border-orange-500/30"><CardContent className="p-6">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Sunset</div>
            <div className="text-4xl font-black tabular-nums">{formatTime(times.sunset, tz)}</div>
          </CardContent></Card>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Solar noon</div>
            <div className="text-xl font-black tabular-nums">{formatTime(times.solarNoon, tz)}</div>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Day length</div>
            <div className="text-xl font-black tabular-nums">{formatDuration(times.dayLengthMinutes)}</div>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Time zone</div>
            <div className="text-sm font-black font-mono">{tz}</div>
          </CardContent></Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Twilight phases</h2>
          <Card className="border-border">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-black">Phase</th>
                    <th className="text-right py-3 px-4 font-black">Dawn</th>
                    <th className="text-right py-3 px-4 font-black">Dusk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30"><td className="py-3 px-4 font-bold">Civil twilight</td><td className="py-3 px-4 text-right tabular-nums">{formatTime(times.civilDawn, tz)}</td><td className="py-3 px-4 text-right tabular-nums">{formatTime(times.civilDusk, tz)}</td></tr>
                  <tr className="border-b border-border/30"><td className="py-3 px-4 font-bold">Nautical twilight</td><td className="py-3 px-4 text-right tabular-nums">{formatTime(times.nauticalDawn, tz)}</td><td className="py-3 px-4 text-right tabular-nums">{formatTime(times.nauticalDusk, tz)}</td></tr>
                  <tr className="border-b border-border/30"><td className="py-3 px-4 font-bold">Astronomical twilight</td><td className="py-3 px-4 text-right tabular-nums">{formatTime(times.astroDawn, tz)}</td><td className="py-3 px-4 text-right tabular-nums">{formatTime(times.astroDusk, tz)}</td></tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* CITY_FACT_SECTION - unique content per page */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">About {city.name}</h2>
            <Card className="border-border">
              <CardContent className="p-5 space-y-3">
                <p className="text-sm leading-relaxed"><strong>{city.name}</strong> is a city in <strong>{city.region}</strong>. {city.fact}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {city.climate === 'temperate' && ('Because ' + city.name + ' has a temperate climate, day length varies noticeably through the year — long summer evenings and short winter days are typical.')}
                  {city.climate === 'tropical' && ('Because ' + city.name + ' has a tropical climate, day length stays between roughly 11 and 13 hours year-round, with little seasonal variation.')}
                  {city.climate === 'arid' && ('Because ' + city.name + ' is in an arid climate zone, clear skies dominate — often producing high-contrast sunrises and sunsets.')}
                  {city.climate === 'polar' && ('Because ' + city.name + ' is at a high latitude, day length swings dramatically between seasons, from near-constant daylight in summer to near-constant darkness in winter.')}
                  {city.climate === 'mediterranean' && ('Because ' + city.name + ' has a Mediterranean climate, summer days are notably longer than winter ones, with dry skies in the warm months.')}
                  {city.climate === 'subtropical' && ('Because ' + city.name + ' has a subtropical climate, summers are long and warm while winters stay mild and shorter.')}
                  {city.climate === 'continental' && ('Because ' + city.name + ' has a continental climate, the gap between summer and winter daylight is pronounced, with cold short-day winters and warm long-day summers.')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {city.hemisphere === 'N' && (city.name + ' sits in the Northern Hemisphere, so its longest days fall around the June solstice and its shortest around the December solstice.')}
                  {city.hemisphere === 'S' && (city.name + ' sits in the Southern Hemisphere, so its seasons are reversed from the Northern Hemisphere — the longest days fall around December and the shortest around June.')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to={'/moon/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Moon className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Moon</h3>
              <p className="text-xs text-muted-foreground">Moon phase for {city.name}.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in 45 ASTRO_CITIES.</p>
            </Link>
            {country && (
              <Link to={'/country-codes/' + country.c2.toLowerCase()} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
                <Globe className="h-5 w-5 text-emerald-500 mb-2" />
                <h3 className="font-bold mb-1">{country.name}</h3>
                <p className="text-xs text-muted-foreground">Country codes and facts.</p>
              </Link>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        {/* PEER_COMPARE_SUN */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How {city.name} compares</h2>
          <Card className="border-border">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-black">City</th>
                    <th className="text-right py-3 px-4 font-black">Sunrise</th>
                    <th className="text-right py-3 px-4 font-black">Sunset</th>
                    <th className="text-right py-3 px-4 font-black">Day length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30 bg-amber-500/5">
                    <td className="py-3 px-4 font-bold">{city.name} <span className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase ml-1">This city</span></td>
                    <td className="py-3 px-4 text-right tabular-nums">{formatTime(times.sunrise, tz)}</td>
                    <td className="py-3 px-4 text-right tabular-nums">{formatTime(times.sunset, tz)}</td>
                    <td className="py-3 px-4 text-right tabular-nums font-bold">{formatDuration(times.dayLengthMinutes)}</td>
                  </tr>
                  {peerCities.map((peer) => {
                    const peerTimes = getSunTimes(new Date(), peer.lat, peer.lng)
                    const peerCountry = COUNTRIES_DATA.find((c) => c.c2 === peer.c2)
                    const peerTz = peerCountry ? peerCountry.tz[0] : 'UTC'
                    const diffMin = peerTimes.dayLengthMinutes - times.dayLengthMinutes
                    const diffStr = diffMin === 0 ? 'same' : (diffMin > 0 ? '+' + formatDuration(Math.abs(diffMin)) : '-' + formatDuration(Math.abs(diffMin)))
                    return (
                      <tr key={peer.slug} className="border-b border-border/30">
                        <td className="py-3 px-4"><Link to={'/sun/' + peer.slug} className="font-bold hover:text-amber-500 transition-colors">{peer.name}</Link></td>
                        <td className="py-3 px-4 text-right tabular-nums">{formatTime(peerTimes.sunrise, peerTz)}</td>
                        <td className="py-3 px-4 text-right tabular-nums">{formatTime(peerTimes.sunset, peerTz)}</td>
                        <td className="py-3 px-4 text-right tabular-nums">
                          {formatDuration(peerTimes.dayLengthMinutes)}
                          <span className={'ml-2 text-[10px] font-black ' + (diffMin > 0 ? 'text-emerald-500' : diffMin < 0 ? 'text-rose-500' : 'text-muted-foreground')}>{diffStr}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground mt-3">
            Compared with other cities in <strong>{city.region}</strong>. Day length differences shown relative to {city.name}.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">More cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ASTRO_CITIES.filter((c) => c.slug !== city.slug).slice(0, 12).map((c) => (
              <Link key={c.slug} to={'/sun/' + c.slug} className="block rounded-xl border border-border bg-card hover:border-amber-400 p-3 transition-colors">
                <div className="text-sm font-bold">{c.name}</div>
                <div className="text-[10px] text-muted-foreground font-mono">Sun</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={city.name + ' Sun - TimeGovern'} />
        </div>
      </div>
    </>
  )
}