import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Globe, ArrowRight, BookOpen, Coffee, Users, Heart, History } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Why does the US tip so much more than Europe?', a: 'The US has a "tipped minimum wage" - as low as $2.13/hour federally - assuming tips make up the difference. Europe requires employers to pay full minimum wage, so tips are genuinely optional.' },
  { q: 'Why is tipping rude in Japan?', a: 'Japanese culture emphasises omotenashi - hospitality as a duty, not a transaction. Accepting a tip implies the service was not already given properly. A small gift is the appropriate way to show appreciation.' },
  { q: 'Was tipping always expected in the US?', a: 'No. Tipping was imported from Europe in the late 1800s and initially resisted as anti-democratic. It became entrenched during Prohibition and the Depression as a way for restaurants to reduce wage costs.' },
  { q: 'Do tips actually go to staff?', a: 'Not always. In the US, federal law now prohibits tip pooling with management, but enforcement varies. In many countries, a "service charge" on the bill may not be distributed to staff at all.' },
  { q: 'Is tipping increasing or decreasing globally?', a: 'Increasing in the US (driven by digital payment prompts), decreasing in Europe as card terminals add "no tip" defaults. Australia and New Zealand remain stable at near-zero.' },
  { q: 'What should I do if I do not want to tip?', a: 'In countries where tipping is optional (UK, EU, AU, NZ), simply pay the bill. In the US, ask yourself honestly whether you would accept $2.13/hour for that job - if not, the tip is doing real work.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Tipping Culture Around the World Explained', description: 'Why tipping norms differ so dramatically between countries - history, economics, and cultural values explained.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/tipping-culture-around-world' }

export default function TippingCultureAroundWorldPage() {
  useEffect(() => {
    document.title = 'Tipping Culture Around the World Explained | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Why tipping is expected in the US, optional in Europe, and rude in Japan. The history, economics, and cultural values behind global tipping norms.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Tipping Culture Around the World
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full mb-4">
            <Globe className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Culture - 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Tipping Culture Around the World
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            A 20% tip is generous in New York, mildly awkward in Paris, and rude in Tokyo. Here is why.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The three tipping models</h2>
          <p className="text-muted-foreground">Around the world, three distinct models have emerged:</p>
          <div className="grid md:grid-cols-3 gap-3 my-4">
            <Card><CardContent className="p-4">
              <h3 className="font-black mb-2 text-sm text-emerald-600">1. Tipping-as-wage (US, Canada)</h3>
              <p className="text-xs text-muted-foreground">Servers earn below minimum wage, tips make up the rest. Tipping is functionally mandatory.</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <h3 className="font-black mb-2 text-sm text-indigo-600">2. Tipping-as-optional (UK, EU)</h3>
              <p className="text-xs text-muted-foreground">Servers earn full minimum wage. Tipping is genuinely optional, seen as a reward for good service.</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <h3 className="font-black mb-2 text-sm text-rose-600">3. Tipping-as-rude (Japan, AU, NZ)</h3>
              <p className="text-xs text-muted-foreground">Servers earn full wage. Tipping implies the service was not properly compensated or was transactional.</p>
            </CardContent></Card>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">The history: how the US got here</h2>
          <p className="text-muted-foreground">Tipping is not uniquely American - it was imported from Europe in the late 1800s by wealthy Americans returning from grand tours. Initially, it was fiercely resisted. Newspapers ran editorials calling it anti-democratic - it created a servant class.</p>
          <p className="text-muted-foreground">Several states briefly passed anti-tipping laws in the early 1900s. All were repealed by 1926. The real shift came during Prohibition (1920-1933) and the Great Depression, when restaurant owners used tips to justify paying staff less.</p>
          <p className="text-muted-foreground">In 1938, the Fair Labor Standards Act formalised a "tipped minimum wage" - lower than the standard minimum - assuming tips made up the difference. That framework still exists today.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why Europe said no</h2>
          <p className="text-muted-foreground">Europe took a different path. Strong labour movements through the 20th century won full minimum wages for service workers. When employers have to pay a proper wage, tips become genuinely optional bonuses rather than income.</p>
          <p className="text-muted-foreground">Result: In most of Europe, leaving no tip is completely fine. Leaving 5-10% for good service is a nice gesture. The US model looks bizarre from there.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why Japan finds it rude</h2>
          <p className="text-muted-foreground">Japanese culture has a concept called omotenashi - a form of hospitality given as a duty, not a transaction. The service is expected to be excellent, and the price already reflects it.</p>
          <p className="text-muted-foreground">Accepting a tip implies the service was not already properly given, or that the customer is buying special treatment. It also breaks the neat social contract of paying exactly what is asked.</p>
          <p className="text-muted-foreground">If a Japanese host truly helps you in a way you want to recognise, a small gift - regional sweets, a branded item from your home country - is more appropriate than cash.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Australia and New Zealand: the "non-tipping" anglosphere</h2>
          <p className="text-muted-foreground">Australia and New Zealand are English-speaking Western countries with strong minimum wage laws and no tipping tradition. Servers earn $22-30 AUD/hour. Tipping is not expected and, when offered, is often awkwardly declined or shared across the whole team.</p>
          <p className="text-muted-foreground">If you want to tip in Australia, round up or leave 5-10% at a high-end restaurant. Do not tip like you are in the US - it confuses everyone.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The digital tipping creep</h2>
          <p className="text-muted-foreground">Since 2020, card terminals and delivery apps have started prompting for tips in places they never did before - coffee shops, takeout counters, fast casual. This "tip creep" is a distinctly American phenomenon and has driven up tipping rates.</p>
          <p className="text-muted-foreground">Interestingly, some US customers are pushing back. Digital tips at counter-service venues have been flat or declining in some surveys, while sit-down restaurant tips have risen.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The practical takeaway</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>US, Canada:</strong> Tip 15-22% at restaurants. It is not optional in practice.</li>
            <li><strong>UK, Ireland:</strong> 10-15% if no service charge. Ask for it to be removed if the service was poor.</li>
            <li><strong>Western Europe:</strong> 5-10% or round up. Not expected.</li>
            <li><strong>Southern Europe:</strong> 0-5%. Often a cover charge (coperto) replaces tipping.</li>
            <li><strong>Australia, NZ:</strong> Optional. Round up for good service.</li>
            <li><strong>Japan, Korea:</strong> Do not tip. It is rude.</li>
            <li><strong>India, Southeast Asia:</strong> 5-10% at nicer restaurants. Often already added to the bill.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Tipping reflects the underlying economics and values of a country. In the US it is wage replacement. In Europe it is a genuine bonus. In Japan it is a breach of protocol. When travelling, learn the local norm and follow it - do not export your home country's habits.</p>
        </div>

        <div className="my-8">
          <Link to="/tip-calculator" className="block rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 hover:border-rose-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-md"><Coffee className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-rose-500 transition-colors">Country-aware tip calculator</h3>
                <p className="text-sm text-muted-foreground">Presets for US, UK, EU, AU, JP. Free, offline.</p>
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
            <Link to="/blog/how-much-to-tip" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How Much to Tip</h3>
              <p className="text-xs text-muted-foreground">The complete by-country guide.</p>
            </Link>
            <Link to="/blog/how-to-split-bill" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Users className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Split a Bill Fairly</h3>
              <p className="text-xs text-muted-foreground">Practical methods for groups.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Tipping Culture Around the World'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}