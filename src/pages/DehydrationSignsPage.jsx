import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, BookOpen, Droplets, AlertTriangle, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What are the first signs of dehydration?', a: 'Thirst, dry mouth, dark yellow urine, and fatigue. Thirst is already a late signal - you are mildly dehydrated by the time you feel it.' },
  { q: 'Can dehydration cause headaches?', a: 'Yes. Dehydration is a common trigger for tension headaches and migraines. Even 1-2% body water loss can cause symptoms.' },
  { q: 'How fast does dehydration happen?', a: 'Mild dehydration can occur within a few hours of not drinking. Severe dehydration during exercise can develop in 30-60 minutes of heavy sweating without fluid replacement.' },
  { q: 'What should I drink for dehydration?', a: 'For mild dehydration, water. For moderate to severe (heavy sweating, exercise over 90 min), use an electrolyte drink - plain water alone can worsen sodium imbalance.' },
  { q: 'Is dark urine always dehydration?', a: 'Usually, but certain foods (beets, asparagus), medications, and supplements (B vitamins) can darken urine. Pair urine colour with other symptoms before concluding.' },
  { q: 'When is dehydration a medical emergency?', a: 'Confusion, rapid heartbeat, rapid breathing, sunken eyes, no urine for 8+ hours, or fainting. Seek emergency care immediately.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Dehydration Signs: How to Spot and Fix Them', description: 'The complete guide to dehydration signs - from early warnings to emergencies - with hydration fixes that actually work.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/dehydration-signs' }

export default function DehydrationSignsPage() {
  useEffect(() => {
    document.title = 'Dehydration Signs: How to Spot and Fix Them | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Dehydration signs explained - from early warning signs like dark urine and headaches to emergencies. Plus how to rehydrate correctly.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Dehydration Signs
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full mb-4">
            <Activity className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Health - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Dehydration Signs
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Dehydration is easy to miss. Your body gives clear signals - if you know what to look for.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Why dehydration is easy to miss</h2>
          <p className="text-muted-foreground">By the time you feel thirsty, you are already mildly dehydrated. Thirst is a lagging signal - it fires when the body has lost roughly 1-2% of its water. Performance (mental and physical) is already impaired at that point.</p>
          <p className="text-muted-foreground">This is why athletes, older adults, and people with physically demanding jobs are advised to drink on a schedule, not just when thirsty.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Early signs</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Thirst (already a late signal)</li>
            <li>Dry mouth and lips</li>
            <li>Dark yellow urine</li>
            <li>Mild fatigue or sluggishness</li>
            <li>Decreased concentration</li>
            <li>Mild headache</li>
          </ul>
          <p className="text-muted-foreground"><strong>Fix:</strong> Drink 500 ml of water (about 2 glasses). Symptoms should improve within 30 minutes.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Moderate signs</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Amber or orange urine</li>
            <li>Dry skin with poor elasticity</li>
            <li>Persistent headache</li>
            <li>Dizziness or lightheadedness</li>
            <li>Rapid heartbeat</li>
            <li>Muscle cramps</li>
            <li>Reduced sweating during exercise</li>
          </ul>
          <p className="text-muted-foreground"><strong>Fix:</strong> Drink 500-1000 ml over the next hour. If you have been sweating heavily, use an electrolyte drink instead of plain water.</p>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 my-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-amber-700 dark:text-amber-400">Emergency:</strong> Seek immediate medical help for confusion, fainting, rapid breathing, no urine for 8+ hours, or a weak/rapid pulse. These indicate severe dehydration.
            </div>
          </div>

          <h2 class="text-2xl font-black mt-8 mb-3">Who is at higher risk</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Older adults</strong> - thirst signal weakens with age</li>
            <li><strong>Infants and children</strong> - small bodies, high fluid needs</li>
            <li><strong>Athletes and outdoor workers</strong> - heavy sweating</li>
            <li><strong>People with illness</strong> - vomiting, diarrhoea, fever</li>
            <li><strong>Diabetics</strong> - increased urination</li>
            <li><strong>People on diuretics</strong> - medication increases fluid loss</li>
          </ul>

          <h2 class="text-2xl font-black mt-8 mb-3">How to rehydrate properly</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Mild dehydration:</strong> Water. 500 ml now, then sip steadily.</li>
            <li><strong>Moderate (heavy sweat, exercise):</strong> Electrolyte drink - water alone can worsen sodium dilution.</li>
            <li><strong>After illness (vomiting/diarrhoea):</strong> Oral rehydration solution (ORS) - available at any pharmacy.</li>
            <li><strong>Prevention:</strong> Spread 2-3 litres across the day. Drink before you are thirsty.</li>
          </ol>

          <h2 class="text-2xl font-black mt-8 mb-3">Prevention: the daily habit</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Start the day with a glass of water.</li>
            <li>Keep a bottle at your desk and sip throughout.</li>
            <li>Drink a glass before every meal.</li>
            <li>Increase intake during exercise - 500-700 ml per hour.</li>
            <li>Add electrolytes for sessions over 90 minutes.</li>
          </ul>

          <h2 class="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">American College of Sports Medicine position stand, 2007. European Food Safety Authority (EFSA) dietary reference values for water, 2010. WHO oral rehydration guidance.</p>
        </div>

        <div className="my-8">
          <Link to="/water-intake-calculator" className="block rounded-2xl border-2 border-sky-500/30 bg-sky-500/5 hover:border-sky-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md"><Droplets className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-sky-500 transition-colors">Calculate your daily water target</h3>
                <p className="text-sm text-muted-foreground">Personalised by weight, activity, and climate.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-sky-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/how-much-water-should-i-drink" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How Much Water Should I Drink?</h3>
              <p className="text-xs text-muted-foreground">The complete daily intake guide.</p>
            </Link>
            <Link to="/blog/does-coffee-dehydrate-you" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Does Coffee Dehydrate You?</h3>
              <p className="text-xs text-muted-foreground">The science behind the myth.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Dehydration Signs'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Seek emergency care for severe symptoms.
        </div>
      </div>
    </>
  )
}