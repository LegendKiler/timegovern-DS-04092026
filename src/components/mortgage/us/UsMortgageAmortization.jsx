import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, DollarSign, TrendingDown, Calendar, Copy, Check } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UsMortgageAmortization() {
  const [price, setPrice] = useState('450000')
  const [down, setDown] = useState('90000')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const [taxRate, setTaxRate] = useState('1.1')
  const [insurance, setInsurance] = useState('1800')
  const [copied, setCopied] = useState(false)

  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const D = parseFloat(down) || 0
    const P = P0 - D
    const annualRate = parseFloat(rate) || 0
    const r = annualRate / 100 / 12
    const n = (parseInt(years) || 0) * 12
    if (P <= 0 || n <= 0) return null

    const pi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const monthlyTax = (P0 * (parseFloat(taxRate) || 0) / 100) / 12
    const monthlyIns = (parseFloat(insurance) || 0) / 12
    const lvr = P0 > 0 ? (P / P0) * 100 : 0
    let pmi = 0
    if (lvr > 80) {
      const pmiRate = lvr > 95 ? 0.0115 : lvr > 90 ? 0.0095 : 0.0078
      pmi = P * pmiRate / 12
    }
    const total = pi + monthlyTax + monthlyIns + pmi
    const totalPaid = pi * n
    const totalInterest = totalPaid - P

    const schedule = []
    let bal = P, yi = 0, yp = 0
    for (let i = 1; i <= n; i++) {
      const int = bal * r, prin = pi - int
      bal -= prin; yi += int; yp += prin
      if (i % 12 === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / 12), interest: yi, principal: yp, balance: Math.max(0, bal) })
        yi = 0; yp = 0
      }
    }
    return { pi, monthlyTax, monthlyIns, pmi, total, totalInterest, totalPaid, lvr, schedule, loan: P }
  }, [price, down, rate, years, taxRate, insurance])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()
  const copy = async () => { if (!calc) return; await navigator.clipboard.writeText('Monthly PITI: ' + fmt(calc.total) + ' | Total interest: ' + fmt(calc.totalInterest)); setCopied(true); setTimeout(() => setCopied(false), 2000) }


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, down, rate, years, taxRate, insurance }
const resultsMap = Object.fromEntries(
      Object.entries(calc).flatMap(([k, v]) => {
        if (typeof v === 'number' || typeof v === 'string') return [[k, v]]
        if (v && typeof v === 'object') {
          return Object.entries(v)
            .filter(([_, vv]) => typeof vv === 'number' || typeof vv === 'string')
            .map(([kk, vv]) => [k + '_' + kk, vv])
        }
        return []
      })
    )
    registerCalculation({
      type: 'mortgage',
      countrySlug: 'usa',
      title: 'US Mortgage Amortization',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, down, rate, years, taxRate, insurance, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md"><Home className="h-4 w-4 text-white" /></div>
          US Mortgage Amortization Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment</label><Input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Interest rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Loan term (years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Property tax rate (%/yr)</label><Input type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Annual insurance ($)</label><Input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="h-11" /></div>
        </div>

        {calc && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="rounded-xl p-3 bg-blue-500/10 border border-blue-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold">P&amp;I</div><div className="text-lg font-black text-blue-600 tabular-nums">{fmt(calc.pi)}</div></div>
              <div className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold">Tax</div><div className="text-lg font-black text-emerald-600 tabular-nums">{fmt(calc.monthlyTax)}</div></div>
              <div className="rounded-xl p-3 bg-orange-500/10 border border-orange-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold">Insurance</div><div className="text-lg font-black text-orange-600 tabular-nums">{fmt(calc.monthlyIns)}</div></div>
              <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/20"><div className="text-[10px] text-muted-foreground uppercase font-bold">PMI</div><div className="text-lg font-black text-red-600 tabular-nums">{calc.pmi > 0 ? fmt(calc.pmi) : '—'}</div></div>
            </div>

            <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-2 border-blue-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total monthly payment (PITI)</div>
              <div className="text-4xl font-black text-blue-600 tabular-nums">{fmt(calc.total)}</div>
              <div className="text-xs text-muted-foreground mt-2">LVR {calc.lvr.toFixed(1)}% · Total interest over loan: {fmt(calc.totalInterest)}</div>
            </div>

            <button onClick={copy} className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted text-sm font-bold flex items-center justify-center gap-2">
              {copied ? <><Check className="h-4 w-4 text-emerald-500" /> Copied</> : <><Copy className="h-4 w-4" /> Copy summary</>}
            </button>

            <details className="border border-border rounded-xl overflow-hidden bg-card">
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">Amortization schedule</summary>
              <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/80 backdrop-blur"><tr><th className="text-left p-2 font-bold">Year</th><th className="text-right p-2 font-bold">Interest</th><th className="text-right p-2 font-bold">Principal</th><th className="text-right p-2 font-bold">Balance</th></tr></thead>
                  <tbody>{calc.schedule.map((r, i) => (<tr key={i} className="border-t border-border/50"><td className="p-2">{r.year}</td><td className="text-right p-2 tabular-nums text-orange-600">{fmt(r.interest)}</td><td className="text-right p-2 tabular-nums text-emerald-600">{fmt(r.principal)}</td><td className="text-right p-2 tabular-nums font-bold">{fmt(r.balance)}</td></tr>))}</tbody>
                </table>
              </div>
            </details>
          </>
        )}
      </CardContent>
    </Card>
  )
}