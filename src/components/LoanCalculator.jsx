import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Copy, Check } from 'lucide-react'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const fmt2 = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

export default function LoanCalculator() {
  const [amount, setAmount] = useState(250000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)
  const [extra, setExtra] = useState(0)
  const [copied, setCopied] = useState(false)

  const monthlyRate = (rate / 100) / 12
  const totalMonths = years * 12
  const monthlyPayment = monthlyRate > 0
    ? amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : amount / totalMonths
  const totalPaid = monthlyPayment * totalMonths
  const totalInterest = totalPaid - amount

  // With extra payments
  const effectivePayment = monthlyPayment + extra
  let balance = amount
  let monthsWithExtra = 0
  let totalInterestWithExtra = 0
  while (balance > 0 && monthsWithExtra < totalMonths * 2) {
    const interest = balance * monthlyRate
    const principal = Math.min(effectivePayment - interest, balance)
    balance -= principal
    totalInterestWithExtra += interest
    monthsWithExtra++
  }
  const monthsSaved = totalMonths - monthsWithExtra
  const interestSaved = totalInterest - totalInterestWithExtra

  const results = [
    { label: 'Monthly payment', value: fmt2(monthlyPayment), color: 'emerald' },
    { label: 'Total interest', value: fmt(totalInterest), color: 'amber' },
    { label: 'Total paid', value: fmt(totalPaid), color: 'slate' }
  ]

  const copyResults = () => {
    const text = `Loan Calculator Results\n\nAmount: ${fmt(amount)}\nRate: ${rate}%\nTerm: ${years} years\n\nMonthly payment: ${fmt2(monthlyPayment)}\nTotal interest: ${fmt(totalInterest)}\nTotal paid: ${fmt(totalPaid)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Loan Calculator</h2>
            <p className="text-xs text-muted-foreground">Monthly payments, total interest, and payoff time</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold mb-1.5 block">Loan amount ($)</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} min="0" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Annual interest rate (%)</label>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} min="0" max="30" step="0.1" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Loan term (years)</label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} min="1" max="50" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Extra monthly payment ($)</label>
            <Input type="number" value={extra} onChange={(e) => setExtra(Number(e.target.value) || 0)} min="0" />
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

        {extra > 0 && monthsSaved > 0 && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 mb-6">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">With ${extra}/month extra</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Time saved:</span> <strong>{Math.floor(monthsSaved / 12)}y {monthsSaved % 12}m</strong></div>
              <div><span className="text-muted-foreground">Interest saved:</span> <strong className="text-emerald-600">{fmt(interestSaved)}</strong></div>
            </div>
          </div>
        )}

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}