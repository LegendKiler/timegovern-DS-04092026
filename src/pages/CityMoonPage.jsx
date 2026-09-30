import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Moon, Sun, Sparkles, ArrowRight, ExternalLink, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES, getAstroCityBySlug } from '../data/astroCities'
import { getMoonPhase, getMoonPhaseInfo, getNextMoonPhases } from '../lib/astronomyUtils'
import { COUNTRIES_DATA } from '../data/countries'

const fmtDate = (d) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(d)

export default function CityMoonPage() {
  const { city: citySlug } = useParams()
  const city = citySlug ? getAstroCityBySlug(citySlug) : null

  const moon = useMemo(() => getMoonPhase(new Date()), [])
  const info = useMemo(() => getMoonPhaseInfo(moon.phase), [moon.phase])
  const next = useMemo(() => getNextMoonPhases(new Date()), [])

  useEffect(() => {
    if (!city) {
      document.title = 'Moon Phase Today - TimeGovern'
      return
    }
    document.title = city.name + ' Moon Phase Today - Illumination & Next Full Moon | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Moon phase today in ' + city.name + ' - ' + info.name + ' with ' + Math.round(moon.illumination * 100) + '% illumination. Next new and full moon dates.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city, info.name, moon.illumination])

  if (citySlug && !city) return <Navigate to="/moon" replace />

  // HUB VIEW
  if (!city) {
    return (
      <>
        <div className="container mx-auto p-4 max-w-5xl space-y-8">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">{info.name} - {Math.round(moon.illumination * 100)}%</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
                <Moon className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
                Moon
              </h1>
              <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
                Current phase, illumination, moon age, and next new and full moon.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <Card className="border-2 border-indigo-500/30"><CardContent className="p-6 text-center">
              <div className="text-6xl mb-3">{info.emoji}</div>
              <div className="text-lg font-black mb-1">{info.name}</div>
              <div className="text-xs text-muted-foreground">Current phase</div>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Illumination</div>
              <div className="text-4xl font-black tabular-nums">{Math.round(moon.illumination * 100)}%</div>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Moon age</div>
              <div className="text-4xl font-black tabular-nums">{moon.age}<span className="text-base font-normal text-muted-foreground ml-1">days</span></div>
            </CardContent></Card>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Card><CardContent className="p-5">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Next new moon</div>
              <div className="text-lg font-black">{fmtDate(next.nextNewMoon)}</div>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Next full moon</div>
              <div className="text-lg font-black">{fmtDate(next.nextFullMoon)}</div>
            </CardContent></Card>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Choose a city</h2>
            <Card className="border-border">
              <CardContent className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {ASTRO_CITIES.map((c) => (
                    <Link key={c.slug} to={'/moon/' + c.slug} className="rounded-lg border border-border/50 bg-card hover:border-indigo-500 p-3 transition-colors">
                      <div className="text-sm font-bold">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{c.lat.toFixed(2)}, {c.lng.toFixed(2)}</div>
                    </Link>
                  ))}
                </div>
              </CardContent></Card>
            </div>
          <div className="text-center">
            <Link to="/astronomy" className="text-sm font-bold text-primary hover:underline">Back to Sun and Moon</Link>
          </div>
        </div>
      </>
    )
  }

  // CITY VIEW
  const country = COUNTRIES_DATA.find((c) => c.c2 === city.c2)
  const peerCities = ASTRO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 3)
  const FAQ = [
    { q: 'What is the moon phase today in ' + city.name + '?', a: 'Today the moon is in its ' + info.name + ' phase, with ' + Math.round(moon.illumination * 100) + '% illumination.' },
    { q: 'When is the next full moon in ' + city.name + '?', a: 'The next full moon is on ' + fmtDate(next.nextFullMoon) + '.' },
    { q: 'When is the next new moon in ' + city.name + '?', a: 'The next new moon is on ' + fmtDate(next.nextNewMoon) + '.' },
    { q: 'What is moon age?', a: 'Moon age is the number of days since the last new moon. Today the moon is ' + moon.age + ' days old.' },
    { q: 'How often does the moon cycle?', a: 'A complete lunar cycle takes about 29.5 days. This is called a synodic month.' },
    { q: 'Does the moon phase differ by city?', a: 'The phase is essentially the same globally at any given moment. Only local viewing times and moonrise/moonset differ by location.' },
  ]
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/astronomy" className="hover:text-primary">Sun and Moon</Link>
          <span className="mx-2">/</span>
          <Link to="/moon" className="hover:text-primary">Moon</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">{city.name}</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">{country ? country.flag : ''} {info.name}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Moon className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              {city.name} Moon
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Moon phase, illumination, and moon age for {city.name}.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card className="border-2 border-indigo-500/30"><CardContent className="p-6 text-center">
            <div className="text-6xl mb-3">{info.emoji}</div>
            <div className="text-lg font-black mb-1">{info.name}</div>
            <div className="text-xs text-muted-foreground">Current phase</div>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Illumination</div>
            <div className="text-4xl font-black tabular-nums">{Math.round(moon.illumination * 100)}%</div>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Moon age</div>
            <div className="text-4xl font-black tabular-nums">{moon.age}<span className="text-base font-normal text-muted-foreground ml-1">days</span></div>
          </CardContent></Card>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Next new moon</div>
            <div className="text-lg font-black">{fmtDate(next.nextNewMoon)}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Next full moon</div>
            <div className="text-lg font-black">{fmtDate(next.nextFullMoon)}</div>
          </CardContent></Card>
        </div>

        {/* CITY_FACT_SECTION - unique content per page */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">About {city.name}</h2>
          <Card className="border-border">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm leading-relaxed"><strong>{city.name}</strong> is a city in <strong>{city.region}</strong>. {city.fact}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {city.hemisphere === 'N' && ('As a Northern Hemisphere city, ' + city.name + ' sees the moon follow the same general path as in other northern latitudes — higher in the sky during summer months.')}
                {city.hemisphere === 'S' && ('As a Southern Hemisphere city, ' + city.name + ' sees the moon travel the opposite arc from northern cities — a detail that surprises visitors from the north.')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {city.climate === 'arid' && ('Clear desert skies around ' + city.name + ' make it an excellent location for moon watching when the moon is visible.')}
                {city.climate === 'temperate' && ('Mixed cloud cover in ' + city.name + ' means the best nights for viewing the moon vary through the year, with clearer skies often in the colder months.')}
                {city.climate === 'tropical' && ('Frequent cloud cover around ' + city.name + ' during the wet season can obscure the moon, making dry-season nights the best viewing time.')}
                {city.climate === 'mediterranean' && ('The dry summers of ' + city.name + ' typically offer the clearest skies for moon watching.')}
                {city.climate === 'subtropical' && ('Humidity around ' + city.name + ' can add haze near the horizon, but the moon is usually clear once it rises higher.')}
                {city.climate === 'continental' && ('Crisp clear air around ' + city.name + ' in winter months often gives some of the sharpest moon views of the year.')}
                {city.climate === 'polar' && ('At this latitude, ' + city.name + ' experiences long periods of moon visibility or invisibility depending on the season.')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to={'/sun/' + city.slug} className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Sun className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">{city.name} Sun</h3>
              <p className="text-xs text-muted-foreground">Sunrise, sunset, twilight.</p>
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

        {/* PEER_COMPARE_MOON */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Compare with nearby cities</h2>
          <Card className="border-border">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground mb-4">
                The moon phase is the same across all locations at any moment. What differs is local time and viewing angle.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {peerCities.map((peer) => (
                  <Link key={peer.slug} to={'/moon/' + peer.slug} className="block rounded-lg border border-border bg-card hover:border-indigo-500 p-3 transition-colors">
                    <div className="font-bold text-sm mb-1">{peer.name}</div>
                    <div className="text-[10px] text-muted-foreground">{peer.hemisphere === city.hemisphere ? 'Same hemisphere' : 'Opposite hemisphere'}</div>
                    <div className="text-[10px] text-muted-foreground">Same {info.name.toLowerCase()}</div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Moon in other cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ASTRO_CITIES.filter((c) => c.slug !== city.slug).slice(0, 12).map((c) => (
              <Link key={c.slug} to={'/moon/' + c.slug} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-3 transition-colors">
                <div className="text-sm font-bold">{c.name}</div>
                <div className="text-[10px] text-muted-foreground font-mono">Moon</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={city.name + ' Moon - TimeGovern'} />
        </div>
      </div>
    </>
  )
}