import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Binary } from "lucide-react"

const BASES = [
  { id: 'bin', name: 'Binary (base 2)', valid: /^[01]+$/, radix: 2, prefix: '0b' },
  { id: 'oct', name: 'Octal (base 8)', valid: /^[0-7]+$/, radix: 8, prefix: '0o' },
  { id: 'dec', name: 'Decimal (base 10)', valid: /^[0-9]+$/, radix: 10, prefix: '' },
  { id: 'hex', name: 'Hexadecimal (base 16)', valid: /^[0-9a-fA-F]+$/, radix: 16, prefix: '0x' }
]

export default function BinaryHexConverter() {
  const [inputBase, setInputBase] = useState('dec')
  const [input, setInput] = useState('255')

  const result = useMemo(() => {
    const base = BASES.find(b => b.id === inputBase)
    const cleaned = input.trim().replace(/^(0b|0o|0x)/i, '')
    if (!cleaned) return { err: 'Enter a value' }
    if (!base.valid.test(cleaned)) return { err: 'Invalid characters for ' + base.name }
    const n = parseInt(cleaned, base.radix)
    if (isNaN(n)) return { err: 'Could not parse' }
    return {
      dec: n.toString(10),
      bin: n.toString(2),
      oct: n.toString(8),
      hex: n.toString(16).toUpperCase(),
      groupedBin: n.toString(2).padStart(Math.ceil(n.toString(2).length / 4) * 4, '0').match(/.{1,4}/g).join(' ')
    }
  }, [inputBase, input])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-slate-600 to-gray-800 shadow-md">
            <Binary className="h-4 w-4 text-white" />
          </div>
          Binary / Hex Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Input base</label>
          <select value={inputBase} onChange={e => setInputBase(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {BASES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Value</label>
          <Input value={input} onChange={e => setInput(e.target.value)} placeholder="255" className="h-11 font-mono" />
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-slate-600/10 to-gray-800/10 rounded-xl p-4 border border-slate-500/20 space-y-2">
            {[
              { label: 'Decimal', value: result.dec },
              { label: 'Binary', value: result.groupedBin },
              { label: 'Octal', value: result.oct },
              { label: 'Hexadecimal', value: result.hex }
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground font-semibold">{r.label}</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums break-all text-right">{r.value}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Binary groups of 4 bits map to one hex digit. 0b prefix means binary, 0o means octal, 0x means hex - the converter accepts and strips them automatically.
        </div>
      </CardContent>
    </Card>
  )
}