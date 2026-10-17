import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Baby, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { WORLD_BIRTHS_BY_YEAR } from '../data/worldBirthsByYear'

const FAQ = [
  { q: 'How far back does the data go?', a: 'This page lists estimated global live births for every year from 1960 to 2024, derived from World Bank population and crude birth rate data.' },
  { q: 'How are annual births calculated?', a: 'World population each year is multiplied by that year crude birth rate per 1000 people. Formula: births = population x (birth rate / 1000).' },
  { q: 'Have global births peaked?', a: 'Annual birth counts rose through the 20th century and plateaued around 130-140 million per year in the 2010s-2020s. Population keeps rising because death rates fell faster than birth rates.' },
  { q: 'Where does the data come from?', a: 'Derived from World Bank SP.POP.TOTL (population) and SP.DYN.CBRT.IN (crude birth rate), both World aggregates.' },
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'World Births by Year', description: 'Estimated global births for every year from 1960 to 2024.', url: 'https://timegovern.com/births-by-year' }

export default function BirthsByYearPage() {
  useEffect(() => {
    document.title = 'World Births by Year (' + WORLD_BIRTHS_BY_YEAR[0].year + '-' + WORLD_BIRTHS_BY_YEAR[WORLD_BIRTHS_BY_YEAR.length-1].year + ') | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Estimated global births for every year from ' + WORLD_BIRTHS_BY_YEAR[0].year + ' to ' + WORLD_BIRTHS_BY_YEAR[WORLD_BIRTHS_BY_YEAR.length-1].year + '. Source: World Bank.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  const reversed = [...WORLD_BIRTHS_BY_YEAR].reverse()
  const min = WORLD_BIRTHS_BY_YEAR[0], max = WORLD_BIRTHS_BY_YEAR[WORLD_BIRTHS_BY_YEAR.length-1]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-rose-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200">{WORLD_BIRTHS_BY_YEAR.length} years</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Baby className="h-10 w-10 md:h-14 md:w-14 text-rose-300" />
              World Births by Year
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Estimated global live births for every year from {min.year} to {max.year}. Click any year for detail.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {reversed.map(r => (
            <Link key={r.year} to={'/births-by-year/' + r.year} className="rounded-xl border border-border bg-card hover:border-rose-400 p-3 transition-colors">
              <div className="text-xs text-muted-foreground tabular-nums">{r.year}</div>
              <div className="font-black tabular-nums text-lg">{(r.value / 1e6).toFixed(1)}M</div>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'World Births by Year'} />
        </div>
      </div>
    </>
  )
}
