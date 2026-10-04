import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

export default function RoiCalculator() {
  const [initial, setInitial] = useState('10000')
  const [final, setFinal] = useState('15000')
  const [years, setYears] = useState('')
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'roi',
      countrySlug: null,
      title: 'ROI',
      inputs: { initial, final, years },
      results: result || {},
    })
  }, [initial, final, years, result, registerCalculation])

  const calc = () => {
    const i = parseFloat(initial)
    const f = parseFloat(final)
    const y = parseFloat(years)
    if (!i || isNaN(f) || i === 0) return
    const gain = f - i
    const roi = (gain / i) * 100
    let cagr = null
    if (!isNaN(y) && y > 0) cagr = (Math.pow(f / i, 1 / y) - 1) * 100
    setResult({ initial: i, final: f, gain, roi, cagr, years: y })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Initial Investment</label>
          <Input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} className="h-11" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Final Value</label>
          <Input type="number" value={final} onChange={(e) => setFinal(e.target.value)} className="h-11" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Holding Period (years) — optional</label>
          <Input type="number" step="0.1" value={years} onChange={(e) => setYears(e.target.value)} className="h-11" placeholder="e.g. 5" />
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-emerald-500 to-green-500 text-white">Calculate ROI</Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl p-4 text-center border border-emerald-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Return on Investment</div>
              <div className={'text-4xl font-black tabular-nums ' + (result.roi >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                {result.roi >= 0 ? '+' : ''}{result.roi.toFixed(2)}%
              </div>
            </div>
            <div className={'grid gap-2 text-sm ' + (result.cagr !== null ? 'grid-cols-3' : 'grid-cols-2')}>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Gain</div><div className={'font-bold tabular-nums ' + (result.gain >= 0 ? 'text-emerald-600' : 'text-red-600')}>{result.gain >= 0 ? '+' : ''}{result.gain.toFixed(2)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Final</div><div className="font-bold tabular-nums">{result.final.toFixed(2)}</div></div>
              {result.cagr !== null && (
                <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">CAGR</div><div className="font-bold tabular-nums">{result.cagr.toFixed(2)}%</div></div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}