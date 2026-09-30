import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Cake, Sparkles, BookOpen, Calendar, Heart, Gift, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import AgeCalculator from '../components/AgeCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How does the age calculator work?', a: 'Enter your date of birth and the calculator shows your exact age in years, months, and days. It also counts the total days, weeks, hours, minutes, and seconds you have been alive, plus how many days until your next birthday.' },
  { q: 'Does it handle leap years?', a: 'Yes. The calculator uses JavaScript date arithmetic which accounts for leap years automatically. If you were born on 29 February, your next birthday countdown adjusts for non-leap years.' },
  { q: 'What if I was born today?', a: 'If you enter today as your birth date, the calculator will show 0 years, 0 months, and 0 days. This is technically accurate - you have not yet completed a full day of life.' },
  { q: 'Can I calculate age for a past or future date?', a: 'The calculator is designed to show your age today. It requires a birth date in the past. For historical figures, the same formula applies - just enter their birth date.' },
  { q: 'Why do some countries count age differently?', a: 'In most Western countries age is counted from birth (0 at birth). In traditional East Asian systems, a person is considered 1 year old at birth and gains a year each Lunar New Year. Our calculator uses the Western system.' },
  { q: 'Is my birth date private?', a: 'Yes. All calculations run in your browser. Your birth date is never sent to a server, stored, or shared. No signup, no tracking.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Age Calculator', description: 'Free online age calculator. Find your exact age in years, months, days, hours, and seconds - plus your next birthday countdown. No signup, 100% private.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/age-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Exact age in years, months, days', 'Total days, weeks, hours, minutes', 'Next birthday countdown', 'Day of week you were born', 'No signup, 100% private'] }

export default function AgeCalculatorPage() {
  useEffect(() => {
    document.title = 'Age Calculator - Find Your Exact Age | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online age calculator. Find your exact age in years, months, days, hours, and seconds - plus your next birthday countdown. 100% private, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-950 via-rose-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-pink-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-pink-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Cake className="h-10 w-10 md:h-14 md:w-14 text-pink-300" />
              Age Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Your exact age in years, months, days - plus total time alive, next birthday countdown, and day of week you were born.
            </p>
          </div>
        </div>

        <AgeCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Age Calculator" inputs={{ tracked: 'birthdate' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What the age calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Calendar className="h-5 w-5 text-pink-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Exact age</h3><p className="text-xs text-muted-foreground">Years, months, and days since your birth - calculated to the second.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Gift className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Next birthday</h3><p className="text-xs text-muted-foreground">Live countdown of the days remaining until your next birthday.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Heart className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Fun facts</h3><p className="text-xs text-muted-foreground">Total hours, minutes, heartbeats, and the day of week you were born.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the age calculator</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Enter your date of birth using the date picker.</li>
            <li>See your exact age in years, months, and days instantly.</li>
            <li>Scroll down for total time alive - days, weeks, hours, minutes.</li>
            <li>Check the countdown to your next birthday.</li>
            <li>Click Copy stats to save the results to your clipboard.</li>
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
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/health-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/countdown-timer" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Countdown Timer</h3>
              <p className="text-xs text-muted-foreground">Track countdowns to any event.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in 136 cities worldwide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Age Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> This tool is for informational purposes only. All calculations run in your browser - your birth date is never sent anywhere. No signup, no tracking.
        </div>
      </div>
    </>
  )
}