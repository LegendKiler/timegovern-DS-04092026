import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HardDrive } from "lucide-react"

const UNITS = [
  { id: 'b', name: 'Bytes (B)', bytes: 1 },
  { id: 'kb', name: 'Kilobytes (KB)', bytes: 1024 },
  { id: 'mb', name: 'Megabytes (MB)', bytes: 1024 ** 2 },
  { id: 'gb', name: 'Gigabytes (GB)', bytes: 1024 ** 3 },
  { id: 'tb', name: 'Terabytes (TB)', bytes: 1024 ** 4 },
  { id: 'pb', name: 'Petabytes (PB)', bytes: 1024 ** 5 },
  { id: 'bit', name: 'Bits (b)', bytes: 0.125 }
]

export default function DataStorageConverter() {
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('gb')

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return { err: 'Enter a number' }
    const unit = UNITS.find(u => u.id === from)
    const bytes = v * unit.bytes
    const out = {}
    for (const u of UNITS) out[u.id] = bytes / u.bytes
    return out
  }, [value, from])

  const fmt = (n) => {
    if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(4)
    return n.toLocaleString('en-US', { maximumFractionDigits: 6 })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-slate-600 to-gray-800 shadow-md">
            <HardDrive className="h-4 w-4 text-white" />
          </div>
          Data Storage Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Value</label><Input type="number" value={value} onChange={e => setValue(e.target.value)} className="h-11" /></div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">From</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
              {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-slate-600/10 to-gray-800/10 rounded-xl p-4 border border-slate-500/20 space-y-2">
            {UNITS.map(u => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-semibold">{u.name}</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">{fmt(result[u.id])}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Uses binary units: 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB. Note: storage manufacturers often use decimal (1000-based) units, so a "1 TB" drive shows less in your OS.
        </div>
      </CardContent>
    </Card>
  )
}