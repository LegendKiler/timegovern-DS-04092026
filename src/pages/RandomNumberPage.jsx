import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Dices, Sparkles, BookOpen, Coins, Shuffle, Hash, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import RandomNumberGenerator from '../components/RandomNumberGenerator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Is this random number generator truly random?', a: 'Yes - it uses crypto.getRandomValues(), the Web Cryptography API that draws from your operating system\u2019s cryptographic entropy pool. This is the same randomness source used for encryption keys, and it is far stronger than Math.random().' },
  { q: 'Can I generate multiple numbers at once?', a: 'Yes. Set "How many" to any number up to 1000 and the generator will produce that many values. Enable "Unique numbers" to ensure no duplicates appear in the output.' },
  { q: 'What does the dice roller do?', a: 'The Dice tab rolls up to 20 dice at once. You can choose from d4, d6, d8, d10, d12, d20, or d100 - the standard polyhedral dice used in tabletop games like D&D.' },
  { q: 'Can I pick a random name from a list?', a: 'Yes. Use the "Pick from list" tab - paste any list (one item per line) and choose how many random items to pick. Common for giveaways, raffles, and team selection.' },
  { q: 'What is the shuffle tab?', a: 'Shuffle randomly reorders any list you paste. Useful for randomising playlists, agendas, seating, tournament brackets, or task order.' },
  { q: 'Is my data private?', a: 'Yes. Everything runs in your browser - no numbers, lists, or results are ever sent to a server. No signup, no tracking, 100% private.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Random Number Generator', description: 'Free random number generator with dice, coin flip, list picker, and shuffle. Uses crypto.getRandomValues for strong randomness. No signup, 100% private.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/random-number-generator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Random numbers in any range', 'Dice: d4 to d100', 'Coin flip', 'Pick from list', 'Shuffle list', 'No signup, 100% private'] }

export default function RandomNumberPage() {
  useEffect(() => {
    document.title = 'Random Number Generator - Dice, Coin, Pick | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free random number generator. Generate numbers in any range, roll dice (d4-d100), flip coins, pick from lists, or shuffle. Uses crypto.getRandomValues. No signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-purple-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Dices className="h-10 w-10 md:h-14 md:w-14 text-purple-300" />
              Random Number Generator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Numbers, dice, coin flips, list picks, and shuffles - all powered by cryptographically strong randomness.
            </p>
          </div>
        </div>

        <RandomNumberGenerator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Random Number Generator" inputs={{ modes: 5 }} results={{ generated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Five tools in one</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Hash className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Numbers</h3><p className="text-xs text-muted-foreground">Any min/max range, up to 1000 values, optional unique constraint.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Dices className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Dice</h3><p className="text-xs text-muted-foreground">d4, d6, d8, d10, d12, d20, d100 - roll up to 20 at once.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Coins className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Coin</h3><p className="text-xs text-muted-foreground">Flip 1 to 50 coins at once - heads or tails.</p></CardContent></Card>
            <Card><CardContent className="p-5"><BookOpen className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Pick from list</h3><p className="text-xs text-muted-foreground">Paste any list, pick N random items. Perfect for giveaways.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Shuffle className="h-5 w-5 text-pink-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Shuffle</h3><p className="text-xs text-muted-foreground">Randomise any list - playlists, agendas, seating, brackets.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the generator</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick a tab: Number, Dice, Coin, Pick from list, or Shuffle.</li>
            <li>Set your options (range, how many, dice sides, or paste a list).</li>
            <li>Click Generate - the result appears below and updates instantly.</li>
            <li>Click Copy to copy the result to your clipboard.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/productivity-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/word-counter" className="block rounded-xl border border-border bg-card hover:border-blue-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-blue-500 mb-2" />
              <h3 className="font-bold mb-1">Word Counter</h3>
              <p className="text-xs text-muted-foreground">Count words, characters, and reading time.</p>
            </Link>
            <Link to="/countdown-timer" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Countdown Timer</h3>
              <p className="text-xs text-muted-foreground">Track live countdowns to any event.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Random Number Generator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> This tool is for informational and entertainment purposes. Results are not suitable for cryptographic key generation or gambling. No signup, no tracking.
        </div>
      </div>
    </>
  )
}