import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, ArrowRight, BookOpen, Globe, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How much should I tip at a restaurant in the US?', a: '20% for standard service, 18% minimum, 22-25% for excellent service. Servers rely on tips for most of their income in the US, so tipping is expected at table-service restaurants.' },
  { q: 'Do I tip on the pre-tax or post-tax bill?', a: 'Technically on pre-tax - you should not tip on government tax. Most people tip on the total for simplicity, and the difference is small.' },
  { q: 'Should I tip on takeout?', a: 'In the US, 10% is a reasonable baseline for takeout, more if the order was complex or packed specially. In most other countries, tipping on takeout is unusual.' },
  { q: 'What is a service charge, and is it the tip?', a: 'A service charge is an automatic fee added by the venue (often 10-15%), usually distributed to staff. In the UK, it is legal to ask it be removed. In the US, service charges are rare and sometimes not distributed to staff - you may still want to tip.' },
  { q: 'Should I tip on a bad service experience?', a: 'In the US, still tip 10-15% unless something was seriously wrong. Speak to the manager about the problem rather than punishing the server, who may not be responsible.' },
  { q: 'How do I tip when paying by card?', a: 'Most card readers and apps prompt for a tip percentage. If not, write the tip amount on the receipt. Tips on card are usually paid to staff but can be delayed or partially withheld in some venues.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How Much to Tip: The Complete Guide (2026)', description: 'How much to tip at restaurants, bars, hotels, delivery, and taxis - with country-specific guidelines.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-much-to-tip' }

export default function HowMuchToTipPage() {
  useEffect(() => {
    document.title = 'How Much to Tip: The Complete Guide (2026) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How much to tip at restaurants, bars, hotels, delivery, and taxis. Includes country-specific guidelines for US, UK, Europe, Australia, and Asia.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How Much to Tip
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full mb-4">
            <Coffee className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Lifestyle - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How Much to Tip
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Tipping norms are local. What is expected in New York is rude in Tokyo and unnecessary in Sydney. Here is the global guide.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Why tipping is so different around the world</h2>
          <p className="text-muted-foreground">In the US, restaurant servers rely on tips for the bulk of their income - the federal tipped minimum wage is $2.13/hour. Tipping is not a bonus; it is the pay.</p>
          <p className="text-muted-foreground">In Australia, New Zealand, and most of Europe, servers earn a full minimum wage. Tipping is genuinely optional and often not expected. In Japan, leaving a tip can be considered rude because it implies the service was not already properly compensated.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Tipping by country (restaurants)</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-black">Country</th>
                  <th className="p-3 text-left font-black">Typical tip</th>
                  <th className="p-3 text-left font-black">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">United States</td><td className="p-3 font-bold">18-22%</td><td className="p-3">Expected. Servers rely on it.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Canada</td><td className="p-3 font-bold">15-20%</td><td className="p-3">Expected but slightly lower than US.</td></tr>
                <tr className="border-t border-border"><td className="p-3">United Kingdom</td><td className="p-3 font-bold">10-15%</td><td className="p-3">Often a service charge - check the bill.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Germany, France</td><td className="p-3 font-bold">5-10%</td><td className="p-3">Round up or small tip.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Italy, Spain</td><td className="p-3 font-bold">0-10%</td><td className="p-3">Coperto (cover charge) is common.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Australia</td><td className="p-3 font-bold">0-10%</td><td className="p-3">Not expected. Round up for good service.</td></tr>
                <tr className="border-t border-border"><td className="p-3">New Zealand</td><td className="p-3 font-bold">0%</td><td className="p-3">Not expected. Optional.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Japan</td><td className="p-3 font-bold">0%</td><td className="p-3">Rude. Do not tip.</td></tr>
                <tr className="border-t border-border"><td className="p-3">India</td><td className="p-3 font-bold">10%</td><td className="p-3">Expected at nicer restaurants.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Brazil</td><td className="p-3 font-bold">10%</td><td className="p-3">Often already added to the bill.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">Use our <Link to="/tip-calculator" className="text-primary font-bold hover:underline">Tip Calculator</Link> with country presets to apply these instantly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Tipping by service (US norms)</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Sit-down restaurant:</strong> 18-22%</li>
            <li><strong>Counter service / takeout:</strong> 10%</li>
            <li><strong>Delivery:</strong> 10-15% or $3-5 minimum</li>
            <li><strong>Bartender:</strong> $1-2 per drink, or 15-20% on a tab</li>
            <li><strong>Taxi / rideshare:</strong> 10-15%</li>
            <li><strong>Hotel housekeeping:</strong> $2-5/day</li>
            <li><strong>Hotel bellhop:</strong> $2-5 per bag</li>
            <li><strong>Valet:</strong> $2-5 on pickup</li>
            <li><strong>Haircut / salon:</strong> 15-20%</li>
            <li><strong>Food delivery (Uber Eats, DoorDash):</strong> 10-15%</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Tipping by service (UK / EU norms)</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Restaurant:</strong> 10-15% if no service charge added</li>
            <li><strong>Counter service:</strong> Not expected, tip jars optional</li>
            <li><strong>Delivery:</strong> £1-3 or €2-5</li>
            <li><strong>Pub drink:</strong> Round up or offer to buy the bartender one (rare)</li>
            <li><strong>Taxi:</strong> 5-10% or round up</li>
            <li><strong>Hotel housekeeping:</strong> €2-5/day</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Tipping where it is not customary</h2>
          <p className="text-muted-foreground">In Australia, New Zealand, Japan, and much of Scandinavia, tipping is not part of the culture. Service staff are paid a living wage, and tipping can be awkward or even insulting.</p>
          <p className="text-muted-foreground">In Japan specifically: do not leave cash on the table. Do not hand money directly to staff. If you want to show appreciation, a small gift is more culturally appropriate than cash.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common tipping mistakes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Tipping on tax.</strong> Technically you should tip on pre-tax. Small difference, but correct.</li>
            <li><strong>Not checking the bill for service charge.</strong> Many UK, EU, and Indian restaurants add 10-15% automatically. Do not tip twice.</li>
            <li><strong>Tipping in Japan.</strong> Do not.</li>
            <li><strong>Tipping in Australia like you are in the US.</strong> Nothing wrong with it, but not expected - locals will find it odd.</li>
            <li><strong>Reducing tip for kitchen issues.</strong> If the food was wrong but the server was great, tip normally and speak to the manager.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Tipping is local. Learn the norm for wherever you are, use our country presets as a starting point, and adjust for service quality. When in doubt, err on the higher side in the US and lower side elsewhere.</p>
        </div>

        <div className="my-8">
          <Link to="/tip-calculator" className="block rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 hover:border-rose-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-md"><Coffee className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-rose-500 transition-colors">Try the Tip Calculator</h3>
                <p className="text-sm text-muted-foreground">Country presets + bill splitting. Free, offline.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/tipping-culture-around-world" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Globe className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Tipping Culture Around the World</h3>
              <p className="text-xs text-muted-foreground">Why tipping varies so much.</p>
            </Link>
            <Link to="/blog/how-to-split-bill" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Users className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Split a Bill Fairly</h3>
              <p className="text-xs text-muted-foreground">Practical methods that work.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How Much to Tip'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Tipping norms change. Verify local expectations for high-value services.
        </div>
      </div>
    </>
  )
}