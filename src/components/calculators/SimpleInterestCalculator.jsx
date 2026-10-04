import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('5')
  const [years, setYears] = useState('3')
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'simple-interest',
      countrySlug: null,
      title: 'Simple Interest',
      inputs: { principal, rate, years },
      results: result || {},
    })
  }, [principal, rate, years, result, registerCalculation])

  const calc = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate)
    const t = parseFloat(years)
    if (!p || isNaN(r) || !t) return
    const interest = p * (r / 100) * t
    const total = p + interest
    setResult({ principal: p, interest, total, rate: r, years: t })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
            <Coins className="h-4 w-4 text-white" />
          </div>
          Simple Interest
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Principal</label>
          <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="h-11" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Annual Rate (%)</label>
          <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="h-11" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Time (years)</label>
          <Input type="number" step="0.1" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" />
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Calculate</Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-blue-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Amount</div>
              <div className="text-3xl font-black text-blue-600 tabular-nums">{result.total.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Principal</div><div className="font-bold tabular-nums">{result.principal.toFixed(2)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Interest</div><div className="font-bold text-emerald-600 tabular-nums">{result.interest.toFixed(2)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Rate</div><div className="font-bold tabular-nums">{result.rate}%</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}