import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"

const fmt = (n, d) => (n === null || isNaN(n) || !isFinite(n)) ? '\u2014' : n.toLocaleString('en-US', { maximumFractionDigits: d || 2 })

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState('5000')
  const [apr, setApr] = useState('19.99')
  const [payment, setPayment] = useState('250')

  const result = useMemo(() => {
    const P = parseFloat(balance), R = parseFloat(apr), M = parseFloat(payment)
    if ([P, R, M].some(isNaN)) return { err: 'Enter balance, APR, monthly payment' }
    if (P <= 0) return { err: 'Balance must be positive' }
    if (M <= 0) return { err: 'Payment must be positive' }
    const monthlyRate = R / 100 / 12
    if (M <= P * monthlyRate) return { err: 'Payment too low - does not cover monthly interest' }
    let bal = P, months = 0, totalInt = 0
    while (bal > 0.01 && months < 600) {
      const int = bal * monthlyRate
      const princ = Math.min(M - int, bal)
      bal = bal - princ
      totalInt += int
      months++
    }
    return { months, totalInt, totalPaid: P + totalInt }
  }, [balance, apr, payment])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-red-700 shadow-md">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          Debt Payoff Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Balance ($)</label><Input type="number" value={balance} onChange={e => setBalance(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">APR (%)</label><Input type="number" value={apr} onChange={e => setApr(e.target.value)} className="h-11" /></div>
          <div className="col-span-2"><label className="text-sm font-semibold mb-1.5 block">Monthly payment ($)</label><Input type="number" value={payment} onChange={e => setPayment(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-rose-500/10 to-red-700/10 rounded-xl p-4 border border-rose-500/20 space-y-3">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">Months</div><div className="text-2xl font-black text-rose-600 tabular-nums">{result.months}</div></div>
              <div><div className="text-xs text-muted-foreground">Total interest</div><div className="text-lg font-bold text-rose-600 tabular-nums">${fmt(result.totalInt)}</div></div>
              <div><div className="text-xs text-muted-foreground">Total paid</div><div className="text-lg font-bold text-rose-600 tabular-nums">${fmt(result.totalPaid)}</div></div>
            </div>
            <div className="text-xs text-center text-muted-foreground pt-2 border-t border-rose-500/20">
              That is {(result.months / 12).toFixed(1)} years to become debt-free.
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Assumes fixed APR, no new charges. If payment only covers monthly interest, the balance never falls.
        </div>
      </CardContent>
    </Card>
  )
}