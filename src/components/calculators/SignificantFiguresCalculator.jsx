import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Ruler } from "lucide-react"

function countSigFigs(s) {
  let str = String(s).trim()
  if (!str) return { count: 0, reason: 'Empty input' }
  if (str.includes('e') || str.includes('E')) return { count: -1, reason: 'Scientific notation - use mantissa only' }
  str = str.replace(/^[+-]/, '')
  if (/^\d+$/.test(str)) {
    const trimmed = str.replace(/^0+/, '')
    let c = trimmed.replace(/0+$/, '').length
    const trailingZeros = trimmed.length - c
    if (c === 0) return { count: 1, reason: 'Number is 0 or all zeros' }
    if (trailingZeros > 0 && !trimmed.includes('.')) return { count: c, reason: 'Trailing zeros without decimal point are not significant' }
    return { count: trimmed.length, reason: 'Trailing zeros after decimal are significant' }
  }
  if (str.includes('.')) {
    let leadingRemoved = str.replace(/^0+/, '')
    if (leadingRemoved === '' || leadingRemoved === '.') return { count: 1, reason: 'Only zeros after decimal' }
    return { count: leadingRemoved.replace('.', '').length, reason: 'All digits after leading zeros are significant' }
  }
  return { count: str.replace(/\./g, '').length, reason: 'Integer digits' }
}

function roundToSigFigs(n, sig) {
  if (!isFinite(n) || n === 0) return '0'
  const digits = Math.ceil(Math.log10(Math.abs(n)))
  const power = sig - digits
  const factor = Math.pow(10, power)
  const rounded = Math.round(n * factor) / factor
  return rounded.toString()
}

export default function SignificantFiguresCalculator() {
  const [input, setInput] = useState('0.004560')
  const [roundTo, setRoundTo] = useState('3')

  const result = useMemo(() => {
    const c = countSigFigs(input)
    if (c.count <= 0) return c
    const n = parseFloat(input)
    const sig = parseInt(roundTo)
    const rounded = !isNaN(sig) && sig >= 1 ? roundToSigFigs(n, sig) : null
    return { count: c.count, reason: c.reason, rounded }
  }, [input, roundTo])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
            <Ruler className="h-4 w-4 text-white" />
          </div>
          Significant Figures Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div><label className="text-sm font-semibold mb-1.5 block">Number</label><Input value={input} onChange={e => setInput(e.target.value)} placeholder="0.004560" className="h-11 font-mono" /></div>
        <div><label className="text-sm font-semibold mb-1.5 block">Round to N significant figures (optional)</label><Input type="number" value={roundTo} onChange={e => setRoundTo(e.target.value)} className="h-11" /></div>
        {result.count === -1 ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.reason}</div>
        ) : result.count === 0 ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.reason}</div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-xl p-4 border border-emerald-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Significant figures</div>
              <div className="text-3xl font-black text-emerald-600 tabular-nums">{result.count}</div>
            </div>
            <div className="text-xs text-center text-muted-foreground">{result.reason}</div>
            {result.rounded && (
              <div className="text-center pt-2 border-t border-emerald-500/20">
                <div className="text-xs text-muted-foreground mb-1">Rounded to {roundTo} sig figs</div>
                <div className="text-xl font-black text-emerald-600 tabular-nums">{result.rounded}</div>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          All non-zero digits are significant. Zeros between non-zero digits are significant. Leading zeros are never significant. Trailing zeros after a decimal point are significant.
        </div>
      </CardContent>
    </Card>
  )
}