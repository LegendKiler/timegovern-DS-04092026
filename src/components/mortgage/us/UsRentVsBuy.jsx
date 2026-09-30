import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, Key } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

export default function UsRentVsBuy() {
  const [price, setPrice] = useState('450000')
  const [down, setDown] = useState('90000')
  const [rate, setRate] = useState('6.5')
  const [rent, setRent] = useState('2200')
  const [years, setYears] = useState('7')
  const [appreciation, setAppreciation] = useState('3.5')
  const calc = useMemo(() => {
    const P0 = parseFloat(price) || 0
    const D = parseFloat(down) || 0
    const P = P0 - D
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = 30 * 12
    const pi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const holdYears = parseInt(years) || 7
    const holdMonths = holdYears * 12
    const maintRate = 0.01, taxRate = 0.011
    const monthlyCosts = pi + (P0 * (maintRate + taxRate)) / 12
    // Remaining balance after hold
    let bal = P, intPaid = 0
    for (let i = 0; i < holdMonths; i++) { const int = bal * r; bal -= (pi - int); intPaid += int }
    const appreciationRate = (parseFloat(appreciation) || 0) / 100
    const homeValue = P0 * Math.pow(1 + appreciationRate, holdYears)
    const sellingCosts = homeValue * 0.06
    const equity = homeValue - sellingCosts - bal
    const totalBuyCost = D + monthlyCosts * holdMonths
    const totalRentCost = (parseFloat(rent) || 0) * holdMonths
    const rentInvested = D * Math.pow(1.07, holdYears) - D
    return { pi, monthlyCosts, bal, homeValue, sellingCosts, equity, totalBuyCost, totalRentCost, rentInvested, netBuy: totalBuyCost - equity, netRent: totalRentCost - rentInvested, holdYears }
  }, [price, down, rate, rent, years, appreciation])
  const fmt = (n) => '$' + Math.round(n).toLocaleString()
  const winner = calc.netBuy < calc.netRent ? 'BUY' : 'RENT'

  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { price, down, rate, rent, years, appreciation }
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
      type: 'rent-vs-buy',
      countrySlug: 'usa',
      title: 'US Rent vs Buy',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [price, down, rate, rent, years, appreciation, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md"><Home className="h-4 w-4 text-white" /></div>Rent vs Buy Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Home price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Down payment</label><Input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Rate (% p.a.)</label><Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Monthly rent</label><Input type="number" value={rent} onChange={(e) => setRent(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Years holding</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Appreciation (%/yr)</label><Input type="number" step="0.1" value={appreciation} onChange={(e) => setAppreciation(e.target.value)} className="h-11" /></div>
        </div>
        <div className={`rounded-xl p-5 border-2 ${winner === 'BUY' ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30' : 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30'}`}>
          <div className="text-[10px] uppercase tracking-widest font-bold mb-1">After {calc.holdYears} years</div>
          <div className={`text-3xl font-black ${winner === 'BUY' ? 'text-emerald-600' : 'text-blue-600'}`}>{winner} WINS</div>
          <div className="text-xs text-muted-foreground mt-2">Buy: {fmt(calc.netBuy)} net cost · Rent: {fmt(calc.netRent)} net cost</div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl p-4 bg-emerald-500/5 border border-emerald-500/20">
            <div className="text-[10px] text-emerald-600 uppercase font-bold mb-2">Buying</div>
            <div className="space-y-1 text-xs"><div className="flex justify-between"><span className="text-muted-foreground">Monthly cost</span><strong>{fmt(calc.monthlyCosts)}</strong></div><div className="flex justify-between"><span className="text-muted-foreground">Home value ({calc.holdYears}y)</span><strong>{fmt(calc.homeValue)}</strong></div><div className="flex justify-between"><span className="text-muted-foreground">Equity</span><strong className="text-emerald-600">{fmt(calc.equity)}</strong></div></div>
          </div>
          <div className="rounded-xl p-4 bg-blue-500/5 border border-blue-500/20">
            <div className="text-[10px] text-blue-600 uppercase font-bold mb-2">Renting</div>
            <div className="space-y-1 text-xs"><div className="flex justify-between"><span className="text-muted-foreground">Monthly rent</span><strong>{fmt(parseFloat(rent))}</strong></div><div className="flex justify-between"><span className="text-muted-foreground">Invested down pmt</span><strong>{fmt(calc.rentInvested)}</strong></div><div className="flex justify-between"><span className="text-muted-foreground">Total rent</span><strong className="text-blue-600">{fmt(calc.totalRentCost)}</strong></div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}