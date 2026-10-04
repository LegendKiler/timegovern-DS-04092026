import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import LiveCounter from './LiveCounter'
import ShareButtons from '../ShareButtons'
import { setPageMeta } from '../../lib/seo'

export default function MetricPage({ metric, explainers, faqs, related }) {
  useEffect(() => {
    document.title = metric.label + ' - Live Counter | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', metric.description + ' Source: ' + metric.source + '.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [metric])

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: metric.label, description: metric.description, applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com' + metric.route, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className={'absolute inset-0 bg-gradient-to-br ' + metric.gradient} />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Live - Updated Every Second</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8">{metric.label}</h1>
            <LiveCounter metric={metric} size="lg" />
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Source: {metric.source} - <a href={metric.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">view data</a>
        </div>

        {explainers.map((sec, i) => (
          <div key={i}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">{sec.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{sec.body}</p>
          </div>
        ))}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related counters</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {related.map((r, i) => (
              <Link key={i} to={r.to} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
                <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
                <h3 className="font-bold mb-1 text-sm">{r.name}</h3>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : metric.label} />
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-center">
          <Link to="/worldometers" className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            See all live counters <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}