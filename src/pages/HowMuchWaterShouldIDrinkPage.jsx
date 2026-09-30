import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, ArrowRight, BookOpen, Calculator, Activity, Coffee } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Is 8 glasses of water a day enough?', a: 'It is a useful minimum for most adults but not a personalised target. Weight, activity, and climate can raise the daily need to 3-4 litres. Use a weight-based calculation for accuracy.' },
  { q: 'Does coffee dehydrate you?', a: 'No. Moderate caffeine (up to 400 mg/day, about 4 cups) has a mild diuretic effect that does not offset the fluid consumed. Coffee and tea count toward daily hydration.' },
  { q: 'Do I need to drink 8 glasses of pure water a day?', a: 'No. About 20-30% of your water intake comes from food. Soups, fruits, vegetables, and other beverages all contribute. Water is the easiest source but not the only one.' },
  { q: 'How do I know if I am dehydrated?', a: 'Most reliable sign: urine colour. Pale yellow = well hydrated. Dark yellow = mild dehydration. Amber/orange = moderate. Also watch for thirst, dry mouth, headache, and fatigue.' },
  { q: 'Should I drink more water when exercising?', a: 'Yes. Add roughly 500-700 ml per hour of moderate exercise, more in heat. For sessions over 90 minutes, consider electrolyte replacement.' },
  { q: 'Can drinking too much water be dangerous?', a: 'Yes - hyponatremia. It occurs from drinking several litres per hour, usually during extreme endurance events. Spread water intake across the day and never exceed 1 litre per hour during exercise.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How Much Water Should I Drink? Complete Guide', description: 'The complete guide to daily water intake - how much you actually need, why 8 glasses is a myth, and how to tell if you are dehydrated.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-much-water-should-i-drink' }

export default function HowMuchWaterShouldIDrinkPage() {
  useEffect(() => {
    document.title = 'How Much Water Should I Drink? Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How much water should you drink per day? The real answer - weight-based targets, the 8 glasses myth, and how to tell if you are dehydrated.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How Much Water Should I Drink?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full mb-4">
            <Droplets className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Health - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How Much Water Should I Drink?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The 8-glasses rule is a myth. Here is the real answer, based on your weight, activity, and climate.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Where the 8-glasses myth came from</h2>
          <p className="text-muted-foreground">The "8 glasses of water a day" rule traces back to a 1945 US Food and Nutrition Board recommendation that suggested about 2.5 litres of water daily for adults. Crucially, the same document noted that <em>most of this quantity is contained in prepared foods</em>.</p>
          <p className="text-muted-foreground">That second half got lost in retelling. What remained was a convenient marketing message that water brands happily reinforced for decades.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The real guideline</h2>
          <p className="text-muted-foreground">Most adults need roughly <strong>35 ml of water per kg of body weight</strong> per day. That is:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>60 kg adult → ~2.1 litres/day</li>
            <li>75 kg adult → ~2.6 litres/day</li>
            <li>90 kg adult → ~3.2 litres/day</li>
          </ul>
          <p className="text-muted-foreground">Add extra for exercise (500-700 ml per hour) and hot climates (500-1000 ml). Pregnancy and breastfeeding also increase needs.</p>
          <p className="text-muted-foreground">Use our <Link to="/water-intake-calculator" className="text-primary font-bold hover:underline">Water Intake Calculator</Link> to get your exact number.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What counts as water intake?</h2>
          <p className="text-muted-foreground">It is not just plain water. Total daily hydration includes:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Water</strong> - obviously</li>
            <li><strong>Coffee and tea</strong> - the mild diuretic effect does not offset the fluid consumed</li>
            <li><strong>Juice, milk, soda, sports drinks</strong> - count as fluid but come with sugar and other trade-offs</li>
            <li><strong>Soup, broth, smoothies</strong> - very high water content</li>
            <li><strong>Fruits and vegetables</strong> - up to 90% water (cucumber, watermelon, lettuce)</li>
          </ul>
          <p className="text-muted-foreground">Roughly 20-30% of daily hydration comes from food. The calculator target is total water - you do not need to drink all of it as plain water.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to tell if you are dehydrated</h2>
          <p className="text-muted-foreground">The most reliable self-check is urine colour:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Pale yellow</strong> - well hydrated</li>
            <li><strong>Dark yellow</strong> - mild dehydration; drink more</li>
            <li><strong>Amber or orange</strong> - moderate dehydration</li>
            <li><strong>Brown</strong> - severe; seek medical advice</li>
          </ul>
          <p className="text-muted-foreground">Other signs: persistent thirst, dry mouth, headache, fatigue, dark urine, infrequent urination, and dizziness.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Can you drink too much?</h2>
          <p className="text-muted-foreground">Yes - though it is rare. Drinking too much water in a short time dilutes the sodium in your blood, causing hyponatremia. It mostly affects endurance athletes who drink litres per hour during long events.</p>
          <p className="text-muted-foreground">Guidelines: do not exceed 1 litre per hour during exercise. Spread water throughout the day. For sessions over 90 minutes, add electrolytes.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Practical hydration habits</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Start the day with a glass of water - you wake up mildly dehydrated.</li>
            <li>Keep a bottle on your desk and sip through the day.</li>
            <li>Drink before you feel thirsty - thirst is a late signal.</li>
            <li>Add a glass before each meal.</li>
            <li>Increase intake during exercise and hot weather.</li>
            <li>Do not force it - spread throughout the day rather than chugging.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">European Food Safety Authority (EFSA) dietary reference values for water, 2010. American College of Sports Medicine position stand on exercise and fluid replacement. US National Academies of Sciences, Engineering, and Medicine, 2004.</p>
        </div>

        <div className="my-8">
          <Link to="/water-intake-calculator" className="block rounded-2xl border-2 border-sky-500/30 bg-sky-500/5 hover:border-sky-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-sky-500 transition-colors">Calculate your water target</h3>
                <p className="text-sm text-muted-foreground">Weight + activity + climate - personalised.</p>
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
            <Link to="/blog/dehydration-signs" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Activity className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Dehydration Signs to Watch For</h3>
              <p className="text-xs text-muted-foreground">Early warning signs and how to fix them.</p>
            </Link>
            <Link to="/blog/does-coffee-dehydrate-you" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Coffee className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Does Coffee Dehydrate You?</h3>
              <p className="text-xs text-muted-foreground">The science behind the myth.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How Much Water Should I Drink?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. If you have kidney disease, heart failure, or take diuretics, consult your doctor before changing fluid intake.
        </div>
      </div>
    </>
  )
}