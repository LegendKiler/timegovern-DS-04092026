import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Hash } from "lucide-react"

const ROMAN_MAP = [
  ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90],
  ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
]

function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null
  let out = ''
  let rem = n
  for (const [sym, val] of ROMAN_MAP) {
    while (rem >= val) { out += sym; rem -= val }
  }
  return out
}

function fromRoman(s) {
  const str = String(s).toUpperCase().replace(/\s+/g, '')
  if (!/^[IVXLCDM]+$/.test(str)) return null
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let total = 0
  for (let i = 0; i < str.length; i++) {
    const cur = values[str[i]]
    const next = values[str[i + 1]] || 0
    if (cur < next) total -= cur
    else total += cur
  }
  // Validate canonical round-trip
  if (toRoman(total) !== str) return null
  return total
}

export default function RomanNumeralCalculator() {
  const [mode, setMode] = useState('num2roman')
  const [input, setInput] = useState('2026')

  const output = useMemo(() => {
    if (mode === 'num2roman') {
      const n = parseInt(input)
      if (isNaN(n)) return { value: '—', valid: false, msg: 'Enter a number 1-3999' }
      const r = toRoman(n)
      return r ? { value: r, valid: true } : { value: '—', valid: false, msg: 'Number must be 1-3999' }
    } else {
      const n = fromRoman(input)
      return n ? { value: n.toLocaleString('en-US'), valid: true } : { value: '—', valid: false, msg: 'Not a valid Roman numeral' }
    }
  }, [input, mode])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-600 shadow-md">
            <Hash className="h-4 w-4 text-white" />
          </div>
          Roman Numeral Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Convert</label>
          <select value={mode} onChange={e => { setMode(e.target.value); setInput(e.target.value === 'num2roman' ? '2026' : 'MMXXVI') }} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="num2roman">Number → Roman</option>
            <option value="roman2num">Roman → Number</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">{mode === 'num2roman' ? 'Number (1-3999)' : 'Roman numeral'}</label>
          <Input value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'num2roman' ? '2026' : 'MMXXVI'} className="h-11" />
        </div>
        <div className="bg-gradient-to-br from-slate-500/10 to-zinc-600/10 rounded-xl p-4 text-center border border-slate-500/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Result</div>
          <div className="text-3xl font-black text-slate-600 tabular-nums">{output.value}</div>
          {!output.valid && <div className="text-xs text-amber-600 mt-1">{output.msg}</div>}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          Standard Roman numerals support values 1 to 3999 (no zero, no negatives). Larger numbers historically used a vinculum — a bar over the numeral to multiply by 1000.
        </div>
      </CardContent>
    </Card>
  )
}