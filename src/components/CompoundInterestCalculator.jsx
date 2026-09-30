import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Copy, Check } from 'lucide-react'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(20)
  const [frequency, setFrequency] = useState('monthly')
  const [copied, setCopied] = useState(false)

  const periodsPerYear = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12, daily: 365 }[frequency]
  const r = rate / 100
  const t = years
  const n = periodsPerYear

  // Compound interest on principal
  const principalGrowth = principal * Math.pow(1 + r / n, n * t)

  // Future value of monthly contributions (using monthly compounding approximation)
  const monthlyRate = r / 12
  const months = t * 12
  const contributionsFV = monthlyRate > 0
    ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
    : monthly * months

  const total = principalGrowth + contributionsFV
  const contributed = principal + monthly * months
  const interest = total - contributed

  const results = [
    { label: 'Final balance', value: fmt(total), color: 'emerald' },
    { label: 'Total contributed', value: fmt(contributed), color: 'slate' },
    { label: 'Interest earned', value: fmt(interest), color: 'indigo' },
  ]

  const copyResults = () => {
    const text = `Compound Interest Results\n\nPrincipal: ${fmt(principal)}\nMonthly contribution: ${fmt(monthly)}\nRate: ${rate}% (${frequency})\nYears: ${years}\n\nFinal balance: ${fmt(total)}\nTotal contributed: ${fmt(contributed)}\nInterest earned: ${fmt(interest)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Compound Interest Calculator</h2>
            <p className="text-xs text-muted-foreground">See how your money grows over time</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold mb-1.5 block">Initial principal ($)</label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)} min="0" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Monthly contribution ($)</label>
            <Input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} min="0" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Annual interest rate (%)</label>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} min="0" max="50" step="0.1" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Years</label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} min="1" max="100" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold mb-1.5 block">Compounding frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="annually">Annually</option>
              <option value="semiannually">Semi-annually</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly (recommended)</option>
              <option value="daily">Daily</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {results.map((r) => (
            <div key={r.label} className={'rounded-xl border-2 p-4 bg-' + r.color + '-500/5 border-' + r.color + '-500/30'}>
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">{r.label}</div>
              <div className={'text-lg md:text-2xl font-black text-' + r.color + '-600 dark:text-' + r.color + '-400'}>{r.value}</div>
            </div>
          ))}
        </div>

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}