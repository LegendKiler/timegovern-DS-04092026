import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"

export default function UnixTimestampConverter() {
  const [ts, setTs] = useState('')
  const [date, setDate] = useState('')
  const [result, setResult] = useState(null)

  const now = Math.floor(Date.now() / 1000)

  const tsToDate = () => {
    if (!ts) return
    const n = parseInt(ts)
    if (isNaN(n)) return setResult({ error: 'Invalid timestamp' })
    const d = new Date(n * 1000)
    setResult({
      type: 'tsToDate',
      iso: d.toISOString(),
      local: d.toLocaleString(),
      utc: d.toUTCString(),
      relative: getRelative(d),
    })
  }

  const dateToTs = () => {
    if (!date) return
    const d = new Date(date)
    setResult({
      type: 'dateToTs',
      seconds: Math.floor(d.getTime() / 1000),
      ms: d.getTime(),
    })
  }

  const getRelative = (d) => {
    const diff = Date.now() - d.getTime()
    const past = diff > 0
    const sec = Math.abs(diff) / 1000
    let unit = 'seconds', n = sec
    if (sec > 60) { n = sec / 60; unit = 'minutes' }
    if (n > 60) { n = n / 60; unit = 'hours' }
    if (n > 24) { n = n / 24; unit = 'days' }
    if (n > 30) { n = n / 30; unit = 'months' }
    return Math.floor(n) + ' ' + unit + (past ? ' ago' : ' from now')
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-md">
            <Terminal className="h-4 w-4 text-white" />
          </div>
          Unix Timestamp
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-slate-950 text-emerald-400 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
          <span>Now:</span>
          <span className="font-bold">{now}</span>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block">Timestamp → Date</label>
          <div className="flex gap-2">
            <Input type="number" value={ts} onChange={(e) => setTs(e.target.value)} placeholder={String(now)} className="h-11 font-mono" />
            <Button onClick={tsToDate} className="h-11 bg-slate-800 hover:bg-slate-700 text-white">Convert</Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block">Date → Timestamp</label>
          <div className="flex gap-2">
            <Input type="datetime-local" value={date} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setDate(e.target.value)} className="h-11" />
            <Button onClick={dateToTs} className="h-11 bg-slate-800 hover:bg-slate-700 text-white">Convert</Button>
          </div>
        </div>

        {result && !result.error && result.type === 'tsToDate' && (
          <div className="space-y-2 text-sm">
            <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">ISO 8601</div><div className="font-mono font-bold text-xs break-all">{result.iso}</div></div>
            <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Local</div><div className="font-bold">{result.local}</div></div>
            <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">UTC</div><div className="font-bold">{result.utc}</div></div>
            <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20"><div className="text-xs text-muted-foreground">Relative</div><div className="font-bold text-amber-600">{result.relative}</div></div>
          </div>
        )}

        {result && !result.error && result.type === 'dateToTs' && (
          <div className="space-y-2 text-sm">
            <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Seconds</div><div className="font-mono font-bold text-lg">{result.seconds}</div></div>
            <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Milliseconds</div><div className="font-mono font-bold">{result.ms}</div></div>
          </div>
        )}

        {result?.error && <div className="text-red-500 text-sm">{result.error}</div>}
      </CardContent>
    </Card>
  )
}