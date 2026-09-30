import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Activity, Sparkles, BookOpen, Heart, Target, TrendingUp, Info, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import BmiCalculator from '../components/BmiCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is BMI?', a: 'BMI (Body Mass Index) is a number calculated from your weight and height. It is used as a quick screening tool to categorise weight as underweight, normal, overweight, or obese. Formula: BMI = weight (kg) / height (m) squared.' },
  { q: 'What is a healthy BMI range?', a: 'For most adults, a BMI between 18.5 and 24.9 is considered healthy. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above falls into one of three obesity classes.' },
  { q: 'Is BMI accurate for everyone?', a: 'No. BMI does not distinguish between muscle and fat, so muscular athletes may have a BMI in the overweight range without excess body fat. It also does not account for age, sex, ethnicity, or body composition. It is a screening tool, not a diagnosis.' },
  { q: 'Does BMI work for children?', a: 'No. Children and teenagers use BMI-for-age percentiles rather than adult BMI categories, because body composition changes rapidly during growth. Our calculator is for adults 18 and over.' },
  { q: 'What is the difference between BMI and body fat percentage?', a: 'BMI estimates weight relative to height. Body fat percentage measures actual fat mass. Two people with the same BMI can have very different body fat levels. Body fat percentage is more accurate but requires measurement tools.' },
  { q: 'Is my data private?', a: 'Yes. All calculations run in your browser. Your weight and height are never sent to a server, stored, or shared. No signup, no tracking.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'BMI Calculator', description: 'Free online BMI calculator. Check your body mass index in metric or imperial units, with healthy weight range for your height. No signup, 100% private.', applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: 'https://timegovern.com/bmi-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Metric and imperial units', 'All 6 BMI categories', 'Healthy weight range for your height', 'Visual BMI scale', 'No signup, 100% private'] }

export default function BmiCalculatorPage() {
  useEffect(() => {
    document.title = 'BMI Calculator - Check Your Body Mass Index | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online BMI calculator. Check your body mass index in metric or imperial units, with healthy weight range for your height. 100% private, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-rose-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Activity className="h-10 w-10 md:h-14 md:w-14 text-rose-300" />
              BMI Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Check your Body Mass Index in metric or imperial units - with healthy weight range for your height.
            </p>
          </div>
        </div>

        <BmiCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="BMI Calculator" inputs={{ tracked: 'weight_height' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What the BMI calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Target className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Your BMI score</h3><p className="text-xs text-muted-foreground">Calculated to one decimal place with a colour-coded category.</p></CardContent></Card>
            <Card><CardContent className="p-5"><TrendingUp className="h-5 w-5 text-pink-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Healthy weight range</h3><p className="text-xs text-muted-foreground">The weight range that keeps you in the healthy BMI band for your exact height.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Heart className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Full category scale</h3><p className="text-xs text-muted-foreground">Visual BMI scale with all 6 categories from underweight to Class III obesity.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the BMI calculator</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick your preferred units - metric (kg, cm) or imperial (lb, ft + in).</li>
            <li>Enter your weight and height.</li>
            <li>See your BMI score update instantly with its category.</li>
            <li>Check the healthy weight range for your height.</li>
            <li>Click Copy result to save your BMI and category to the clipboard.</li>
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
            <Link to="/sleep-debt-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Sleep Debt Calculator</h3>
              <p className="text-xs text-muted-foreground">Find out how much sleep you owe - and how to recover.</p>
            </Link>
            <Link to="/caffeine-calculator" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine Calculator</h3>
              <p className="text-xs text-muted-foreground">See caffeine levels at bedtime.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'BMI Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> BMI is a screening tool, not a diagnosis. It does not account for muscle mass, body composition, age, sex, or ethnicity. Speak to a healthcare professional for a full assessment.
        </div>
      </div>
    </>
  )
}