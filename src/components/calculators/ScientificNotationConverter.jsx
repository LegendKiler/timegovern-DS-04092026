import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Hash } from "lucide-react"

export default function ScientificNotationConverter() {
  const [mode, setMode] = useState('to-sci')
  const [input, setInput] = useState('12345.678')

  const result = useMemo(() => {
    const s = String(input).trim()
    if (!s) return { err: 'Enter a value' }

    if (mode === 'to-sci') {
      const n = parseFloat(s)
      if (isNaN(n)) return { err: 'Enter a valid number' }
      if (n === 0) return { sci: '0', mantissa: '0', exponent: '0' }
      const exp = Math.floor(Math.log10(Math.abs(n)))
      const mantissa = n / Math.pow(10, exp)
      return {
        sci: mantissa.toFixed(6).replace(/\.?0+$/, '') + ' x 10^' + exp,
        mantissa: mantissa.toFixed(6).replace(/\.?0+$/, ''),
        exponent: String(exp)
      }
    } else {
      // from sci: expected "m x 10^e" or "m*10^e" or "me+n"
      const m = s.match(/^(-?\d+(\.\d+)?)\s*[x*]\s*10\s*\^?\s*(-?\d+)$/i)
      if (!m) return { err: 'Format: 1.23 x 10^4' }
      const mantissa = parseFloat(m[1])
      const exp = parseInt(m[3])
      const dec = mantissa * Math.pow(10, exp)
      return { sci: s, mantissa: String(mantissa), exponent: String(exp), decimal: dec.toLocaleString('en-US', { maximumFractionDigits: 10 }) }
    }
  }, [input, mode])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
            <Hash className="h-4 w-4 text-white" />
          </div>
          Scientific Notation Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Direction</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="to-sci">Decimal to Scientific</option>
            <option value="from-sci">Scientific to Decimal</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Input</label>
          <Input value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'to-sci' ? '12345.678' : '1.2345678 x 10^4'} className="h-11" />
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-xl p-4 border border-indigo-500/20 space-y-2">
            {mode === 'to-sci' ? (
              <>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Scientific</div>
                  <div className="text-2xl font-black text-indigo-600 tabular-nums">{result.sci}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-indigo-500/20">
                  <div><div className="text-xs text-muted-foreground">Mantissa</div><div className="font-bold tabular-nums">{result.mantissa}</div></div>
                  <div><div className="text-xs text-muted-foreground">Exponent</div><div className="font-bold tabular-nums">{result.exponent}</div></div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Decimal</div>
                  <div className="text-2xl font-black text-indigo-600 tabular-nums">{result.decimal}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-indigo-500/20">
                  <div><div className="text-xs text-muted-foreground">Mantissa</div><div className="font-bold tabular-nums">{result.mantissa}</div></div>
                  <div><div className="text-xs text-muted-foreground">Exponent</div><div className="font-bold tabular-nums">{result.exponent}</div></div>
                </div>
              </>
            )}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Scientific notation: m x 10^e, where 1 is less than or equal to |m| and |m| is less than 10. Used for very large or very small numbers.
        </div>
      </CardContent>
    </Card>
  )
}