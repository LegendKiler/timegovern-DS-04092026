import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Sun, Moon, Globe, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { CITY_LIST, getCity } from '../data/cities'
import { useGeo } from '../hooks/useGeo'

const fmtTime = (tz, d) => new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(d)
const fmtDate = (tz, d) => new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d)
const offsetLabel = (tz, d) => {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(d)
    const t = parts.find(p => p.type === 'timeZoneName')
    return t ? t.value : 'UTC'
  } catch { return 'UTC' }
}
const getOffsetMin = (tzStr, d) => {
  const utc = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }))
  const loc = new Date(d.toLocaleString('en-US', { timeZone: tzStr }))
  return (loc - utc) / 60000
}

export default function TimeInCityPage() {
  const { city: slug } = useParams()
  const city = slug ? getCity(slug) : null
  const [now, setNow] = useState(new Date())
  const { geo } = useGeo()

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!city) {
      document.title = 'Current Time in Any City - Live World Clock | TimeGovern'
      return
    }
    document.title = 'Current Time in ' + city.name + ', ' + city.country + ' - Live Clock | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'What time is it in ' + city.name + '? Live local time, date, UTC offset, and time difference to your location. Updates every second.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [city])

  if (slug && !city) return <Navigate to="/time-in" replace />

  const byRegion = useMemo(() => CITY_LIST.reduce((acc, c) => {
    (acc[c.region] = acc[c.region] || []).push(c)
    return acc
  }, {}), [])

  if (!city) {
    return (
      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 md:p-12 text-white">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3">Time in Any City</h1>
          <p className="text-white/80 text-lg">Live local time, UTC offset, and date for {CITY_LIST.length} major cities worldwide.</p>
        </div>
        {Object.entries(byRegion).map(([region, list]) => (
          <div key={region}>
            <h2 className="text-2xl font-black mb-3">{region}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {list.map(c => (
                <Link key={c.slug} to={'/time-in/' + c.slug} className="p-3 rounded-xl border border-border hover:border-primary hover:shadow-lg transition">
                  <div className="font-bold text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{fmtTime(c.tz, new Date())}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const tz = city.tz
  const offset = offsetLabel(tz, now)
  const userTz = geo && geo.timezone ? geo.timezone : null
  const diffHours = (!userTz || userTz === tz) ? 0 : Math.round(((getOffsetMin(tz, now) - getOffsetMin(userTz, now)) / 60) * 2) / 2
  const peers = CITY_LIST.filter(c => c.region === city.region && c.slug !== city.slug).slice(0, 6)

  const faq = [
    { q: 'What time is it in ' + city.name + ' right now?', a: 'It is ' + fmtTime(tz, now) + ' in ' + city.name + ' on ' + fmtDate(tz, now) + ' (' + offset + '). This page updates every second.' },
    { q: 'Does ' + city.name + ' observe daylight saving time?', a: city.name + ' follows the IANA time zone ' + tz + '. DST is applied automatically based on the current date. Current offset: ' + offset + '.' },
    { q: 'What is the time difference between ' + city.name + ' and my location?', a: userTz ? (diffHours === 0 ? city.name + ' is in the same time zone as your location (' + userTz + ').' : city.name + ' is ' + Math.abs(diffHours) + ' hours ' + (diffHours > 0 ? 'ahead of' : 'behind') + ' your location (' + userTz + ').') : 'Enable location access in your browser to see the exact difference to your city.' },
    { q: 'What is the IANA time zone for ' + city.name + '?', a: city.name + ' uses the IANA time zone ' + tz + '.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      }) }} />

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8 md:p-12 text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="h-3 w-3 text-cyan-300" /> Live Clock
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Time in {city.name}</h1>
        <p className="text-white/70 mb-6">{city.country} - {city.region} - {tz}</p>
        <div className="text-5xl md:text-7xl font-black tracking-tight mb-2 tabular-nums">{fmtTime(tz, now)}</div>
        <div className="text-white/80 text-lg">{fmtDate(tz, now)}</div>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-sm">
            <div className="text-white/60 text-xs uppercase">UTC Offset</div>
            <div className="font-bold">{offset}</div>
          </div>
          {userTz && userTz !== tz && (
            <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-sm">
              <div className="text-white/60 text-xs uppercase">vs Your Location</div>
              <div className="font-bold">{diffHours > 0 ? '+' : ''}{diffHours}h</div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <ShareButtons url={'https://timegovern.com/time-in/' + city.slug} title={'Time in ' + city.name} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Link to={'/weather/' + city.slug} className="p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition">
          <Globe className="h-5 w-5 text-cyan-500 mb-2" />
          <div className="font-bold">Weather in {city.name}</div>
          <div className="text-xs text-muted-foreground">Live conditions + forecast</div>
        </Link>
        <Link to={'/sun/' + city.slug} className="p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition">
          <Sun className="h-5 w-5 text-amber-500 mb-2" />
          <div className="font-bold">Sunrise & Sunset</div>
          <div className="text-xs text-muted-foreground">Today in {city.name}</div>
        </Link>
        <Link to={'/moon/' + city.slug} className="p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition">
          <Moon className="h-5 w-5 text-indigo-500 mb-2" />
          <div className="font-bold">Moon Phase</div>
          <div className="text-xs text-muted-foreground">Tonight in {city.name}</div>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-black tracking-tight mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faq.map((f, i) => (
            <Card key={i}><CardContent className="p-4">
              <div className="font-bold text-sm mb-1">{f.q}</div>
              <div className="text-sm text-muted-foreground">{f.a}</div>
            </CardContent></Card>
          ))}
        </div>
      </div>

      {peers.length > 0 && (
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-4">Other Cities in {city.region}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {peers.map(c => (
              <Link key={c.slug} to={'/time-in/' + c.slug} className="p-3 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition">
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-muted-foreground tabular-nums">{fmtTime(c.tz, now)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}