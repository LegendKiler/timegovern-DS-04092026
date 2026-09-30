import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Percent, ArrowRight, BookOpen, Calculator, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a ratio?', a: 'A ratio compares two quantities by division: A:B means A divided by B. Ratios describe proportions, scaling, and relationships between quantities.' },
  { q: 'Where are ratios used in real life?', a: 'Cooking (2:1 rice to water), betting odds (5:1), maps (1:50,000), finance (debt-to-income ratio), chemistry (mixing ratios), and photography (16:9 aspect ratio).' },
  { q: 'What is aspect ratio?', a: 'The ratio of width to height in an image or screen. 16:9 is widescreen TV, 4:3 is older TV, 1:1 is square, 21:9 is cinema ultrawide.' },
  { q: 'What is a debt-to-income ratio?', a: 'Your monthly debt payments divided by your monthly gross income. Lenders typically want it below 36% for mortgage approval.' },
  { q: 'What are betting odds?', a: 'A ratio of potential profit to stake. 5:1 means you win $5 for every $1 you stake (plus your $1 back).' },
  { q: 'What is a mixing ratio?', a: 'The proportion of one substance to another. Example: concrete is often mixed 1:2:3 (cement:sand:aggregate).' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Ratio in Real Life: 8 Common Uses', description: 'How ratios are used in cooking, finance, photography, maps, and more - with concrete examples of each.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/ratio-in-real-life' }

export default function RatioInRealLifePage() {
  useEffect(() => {
    document.title = 'Ratio in Real Life: 8 Common Uses | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How ratios are used in real life - cooking, finance, photography, maps, chemistry, and more, with concrete examples.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Ratio in Real Life
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Percent className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Ratio in Real Life
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Ratios are everywhere - you just may not have called them that. Here are eight everyday examples.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">1. Cooking</h2>
          <p className="text-muted-foreground">Recipes are ratios. "2 cups flour to 1 cup sugar" is a 2:1 ratio. Scaling a recipe from 4 to 6 servings means multiplying every ingredient by 1.5.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Rice: 1 part rice : 2 parts water</li>
            <li>Vinaigrette: 3 parts oil : 1 part vinegar</li>
            <li>Bread: 5 parts flour : 3 parts water (baker's percentage)</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">2. Betting odds</h2>
          <p className="text-muted-foreground">Bookmakers quote odds as ratios: 5:1 means you win $5 for every $1 staked. 5:1 also implies a 1/(5+1) = 16.7% chance of winning.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">3. Maps and scale</h2>
          <p className="text-muted-foreground">A map scale of 1:50,000 means 1 cm on the map equals 50,000 cm (500 m) on the ground. Every map is a ratio between drawing and reality.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">4. Photography and screen aspect ratios</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>1:1</strong> - square (Instagram grid posts)</li>
            <li><strong>4:3</strong> - older TVs, most smartphone photos</li>
            <li><strong>3:2</strong> - standard 35mm camera film, DSLRs</li>
            <li><strong>16:9</strong> - widescreen TV, YouTube, most video</li>
            <li><strong>21:9</strong> - cinema ultrawide, some monitors</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">5. Finance: debt-to-income and more</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Debt-to-income (DTI):</strong> monthly debt ÷ monthly income. Lenders want under 36% for mortgages.</li>
            <li><strong>Price-to-earnings (P/E):</strong> stock price ÷ earnings per share. Used to judge if a stock is expensive.</li>
            <li><strong>Current ratio:</strong> current assets ÷ current liabilities. Measures a company's ability to pay short-term debts.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">6. Chemistry: mixing ratios</h2>
          <p className="text-muted-foreground">Water is H₂O - a 2:1 ratio of hydrogen to oxygen atoms. Recipes for concrete are ratios (1:2:3 cement:sand:aggregate). Every chemical reaction is a ratio of reactants.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">7. Sports statistics</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Batting average in cricket: runs ÷ dismissals</li>
            <li>Win-loss ratio in any sport</li>
            <li>Points per game, goals per game</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">8. Everyday decisions</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Comparing price per unit at the supermarket (g/$)</li>
            <li>Splitting a bill based on consumption</li>
            <li>Fuel efficiency (miles per gallon)</li>
            <li>Coffee strength (coffee to water ratio)</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Ratios are a universal tool for comparing quantities and scaling them. Learning to work with ratios fluently makes cooking, finance, engineering, and everyday decisions faster and more accurate.</p>
          <p className="text-muted-foreground">Our <Link to="/ratio-calculator" className="text-primary font-bold hover:underline">Ratio Calculator</Link> simplifies ratios and solves proportions instantly.</p>
        </div>

        <div className="my-8">
          <Link to="/ratio-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Try the Ratio Calculator</h3>
                <p className="text-sm text-muted-foreground">Simplify and solve proportions instantly.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/how-to-simplify-ratio" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Simplify a Ratio</h3>
              <p className="text-xs text-muted-foreground">The GCD method.</p>
            </Link>
            <Link to="/blog/how-to-solve-proportions" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BarChart3 className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Solve Proportions</h3>
              <p className="text-xs text-muted-foreground">Cross-multiplication explained.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Ratio in Real Life'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}