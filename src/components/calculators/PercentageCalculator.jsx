import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Percent } from "lucide-react"

export default function PercentageCalculator() {
  const [mode, setMode] = useState('of')
  const [a, setA] = useState('15')
  const [b, setB] = useState('200')
  const [c, setC] = useState('30')
  const [d, setD] = useState('150')

  const pctResult = mode === 'of' ? (parseFloat(a || 0) / 100) * parseFloat(b || 0) : mode === 'is' ? (parseFloat(a || 0) / parseFloat(b || 1)) * 100 : ((parseFloat(d || 0) - parseFloat(c || 0)) / parseFloat(c || 1)) * 100
  const modes = [
    { id: 'of', label: 'X% of Y' },
    { id: 'is', label: 'X is what % of Y' },
    { id: 'change', label: '% increase/decrease' },
  ]

  let result = null, formula = ''
  if (mode === 'of') {
    const r = (parseFloat(a || 0) / 100) * parseFloat(b || 0)
    result = r.toFixed(2)
    formula = a + '% × ' + b + ' = ' + result
  } else if (mode === 'is') {
    const r = (parseFloat(a || 0) / parseFloat(b || 1)) * 100
    result = r.toFixed(2) + '%'
    formula = a + ' is ' + result + ' of ' + b
  } else {
    const change = ((parseFloat(d || 0) - parseFloat(c || 0)) / parseFloat(c || 1)) * 100
    result = (change > 0 ? '+' : '') + change.toFixed(2) + '%'
    formula = c + ' → ' + d + ' = ' + result
  }


  const { registerCalculation } = useCalculation()
  useEffect(() => {
    registerCalculation({
      type: 'percentage',
      countrySlug: null,
      title: 'Percentage Calculator',
      inputs: { mode, a, b, c, d },
      results: { result: pctResult },
    })
  }, [mode, a, b, c, d, pctResult, registerCalculation])
  return (
    <Card className="border shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-md">
            <Percent className="h-4 w-4 text-white" />
          </div>
          Percentage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 bg-muted p-1 rounded-xl">
          {modes.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              className={'py-2 rounded-lg text-[11px] font-bold transition ' + (mode === m.id ? 'bg-primary text-white' : 'hover:bg-background')}>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'of' && (
          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="flex items-center gap-2">
              <Input type="number" value={a} onChange={(e) => setA(e.target.value)} className="h-11 text-center font-bold" />
              <span className="text-muted-foreground text-sm font-bold">%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-bold">of</span>
              <Input type="number" value={b} onChange={(e) => setB(e.target.value)} className="h-11 text-center font-bold" />
            </div>
          </div>
        )}

        {mode === 'is' && (
          <div className="grid grid-cols-2 gap-3 items-center">
            <Input type="number" value={a} onChange={(e) => setA(e.target.value)} className="h-11 text-center font-bold" placeholder="X" />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-bold">is what % of</span>
              <Input type="number" value={b} onChange={(e) => setB(e.target.value)} className="h-11 text-center font-bold" placeholder="Y" />
            </div>
          </div>
        )}

        {mode === 'change' && (
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <div className="text-xs text-muted-foreground mb-1">From</div>
              <Input type="number" value={c} onChange={(e) => setC(e.target.value)} className="h-11 text-center font-bold" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">To</div>
              <Input type="number" value={d} onChange={(e) => setD(e.target.value)} className="h-11 text-center font-bold" />
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-500/20 rounded-xl p-5 text-center">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Result</div>
          <div className="text-4xl font-black text-fuchsia-600 tabular-nums mb-2">{result}</div>
          <div className="text-xs text-muted-foreground font-mono">{formula}</div>
        </div>
      </CardContent>
    </Card>
  )
}