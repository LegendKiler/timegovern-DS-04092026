import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, ArrowRight, BookOpen, Coffee, Calculator, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the fairest way to split a bill?', a: 'For equal consumption (similar meals, similar drinks): equal shares. For unequal consumption: each person pays their meal cost plus their proportional share of any shared items and tip.' },
  { q: 'Should the tip be split equally?', a: 'If the service covered everyone at the table equally, yes. If one person ordered much more, a proportional split is fairer. In practice most groups split the total evenly.' },
  { q: 'How do I split a bill with non-drinkers?', a: 'Track drinks separately. Non-drinkers should not subsidise the drinkers. Separate the drinks bill from the food bill, then split each proportionally.' },
  { q: 'What if someone ordered something expensive?', a: 'That person should pay for their own item plus a proportional share of shared items and tip. Apps like Splitwise handle this without awkwardness.' },
  { q: 'What is the easiest way to split a bill?', a: 'For casual meals, equal split of the total. For complex meals, use an app or our Tip Calculator with the "split between people" field.' },
  { q: 'Is it rude to ask for separate checks?', a: 'In the US and Canada, no - it is standard. In parts of Europe and Asia it is less common but generally accepted. Ask at the start of the meal, not the end.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Split a Bill Fairly (Without the Awkwardness)', description: 'Practical methods for splitting restaurant bills between friends, couples, and groups - including when to split equally and when to track individually.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-split-bill' }

export default function HowToSplitBillPage() {
  useEffect(() => {
    document.title = 'How to Split a Bill Fairly (Without the Awkwardness) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Practical methods for splitting restaurant bills between friends, couples, and groups. Includes when equal split is fine and when to track individually.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Split a Bill Fairly
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full mb-4">
            <Users className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Lifestyle - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Split a Bill Fairly
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The group dinner split is one of the most reliable sources of awkwardness between friends. Here are the methods that actually work.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Method 1: Equal split (the default)</h2>
          <p className="text-muted-foreground">Divide the total (including tip) by the number of people. Simple, fast, and fine when everyone ordered at a similar price point.</p>
          <p className="text-muted-foreground"><strong>Works when:</strong> Everyone ordered similarly, no one had dramatically more or less, and nobody is on a tight budget.</p>
          <p className="text-muted-foreground"><strong>Fails when:</strong> One person had two cocktails and a steak while another had a salad and water. The water drinker is subsidising the drinker.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 2: Pay for your own</h2>
          <p className="text-muted-foreground">Each person calculates their own meal plus a fair share of shared items (appetizers, sides) and tip. This is the fairest method but requires itemising.</p>
          <p className="text-muted-foreground"><strong>How to do it:</strong></p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Take a photo of the receipt</li>
            <li>Each person highlights their items</li>
            <li>Shared items (appetizers, bread, wine bottles) are split equally</li>
            <li>Tax is proportional to each person's subtotal</li>
            <li>Tip is proportional to each person's subtotal</li>
          </ol>
          <p className="text-muted-foreground"><strong>Best for:</strong> Groups where consumption differs significantly, or when one or two people are on strict budgets.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 3: Split by category</h2>
          <p className="text-muted-foreground">Separate food from drinks. Split food evenly, then each person pays for their own drinks. This is the classic solution to the drinker/non-drinker problem.</p>
          <p className="text-muted-foreground"><strong>Works when:</strong> Food is roughly equal but alcohol consumption varies wildly. Which is most adult dinners.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 4: Use an app</h2>
          <p className="text-muted-foreground">Splitwise, Tricount, and Settle Up track who paid what across multiple meals and settle up periodically. This eliminates the awkwardness of intra-meal settling entirely.</p>
          <p className="text-muted-foreground"><strong>Best for:</strong> Friend groups who eat together regularly. Instead of splitting every meal, track running balances and settle monthly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The social dynamics</h2>
          <p className="text-muted-foreground">Even with a fair method, social dynamics can make the split awkward. A few guidelines:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Discuss before ordering.</strong> "Are we splitting evenly or separately?" takes 10 seconds and prevents all awkwardness.</li>
            <li><strong>Do not audit the receipt in front of the table.</strong> If someone wants to pay for their own, do it quietly.</li>
            <li><strong>Do not silently resent the drinkers.</strong> Say something. "I will just pay for my own food and water" is not rude.</li>
            <li><strong>Do not embarrass the person on a budget.</strong> If someone ordered cheaply, let them pay their share without commentary.</li>
            <li><strong>Tip proportionally.</strong> Everyone pays their share of the tip. Do not have the highest orderer skip the tip.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The tipping question</h2>
          <p className="text-muted-foreground">Tip calculations follow the same split as the bill. If four people split equally, each pays 25% of the tip. If one person had the expensive meal, they should still pay their proportional share of the tip - the server's effort was proportional to the total bill.</p>
          <p className="text-muted-foreground">Use our <Link to="/tip-calculator" className="text-primary font-bold hover:underline">Tip Calculator</Link> with the "split between people" field to see tip-per-person and total-per-person instantly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Couples and consistent groups</h2>
          <p className="text-muted-foreground">For couples eating with other couples, the equal split is standard and works fine as long as both couples have similar tastes. If one couple consistently orders much more, consider the category split or an app.</p>
          <p className="text-muted-foreground">The friction comes from unconscious patterns, not one-off meals. If you notice a recurring imbalance, raise it once and then move on. The relationship is worth more than the $20.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What not to do</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Do not nickel-and-dime friends.</strong> "$3.50 for half the bread" is worse than losing a few dollars.</li>
            <li><strong>Do not offer to pay the whole bill if you cannot afford it.</strong> Say "let us split it" instead.</li>
            <li><strong>Do not let one person always pay.</strong> Track it and reciprocate.</li>
            <li><strong>Do not fight over the tip.</strong> If someone wants to tip more, let them.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Equal split is fine until it is not. When it stops being fine (someone is subsidising someone else's expensive choices), switch to paying-your-own or the category split. Apps like Splitwise eliminate the problem entirely for regular groups.</p>
          <p className="text-muted-foreground">The best method is the one that gets agreed on before the meal, not after the bill arrives.</p>
        </div>

        <div className="my-8">
          <Link to="/tip-calculator" className="block rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 hover:border-rose-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-md"><Coffee className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-rose-500 transition-colors">Split any bill instantly</h3>
                <p className="text-sm text-muted-foreground">Enter bill + people count, get per-person amount.</p>
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
              <p className="text-xs text-muted-foreground">The by-country tip guide.</p>
            </Link>
            <Link to="/blog/tipping-culture-around-world" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <DollarSign className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Tipping Culture Around the World</h3>
              <p className="text-xs text-muted-foreground">Why norms vary so much.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Split a Bill Fairly'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}