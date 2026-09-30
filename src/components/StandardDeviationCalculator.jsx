import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sigma, Copy, Check, Trash2 } from 'lucide-react'

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState('12, 15, 18, 22, 25, 28, 31, 35')
  const [copied, setCopied] = useState(false)

  const numbers = input
    .split(/[\s,;\n]+/)
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n))

  const n = numbers.length
  const sum = numbers.reduce((a, b) => a + b, 0)
  const mean = n > 0 ? sum / n : 0

  const sorted = [...numbers].sort((a, b) => a - b)
  const median = n === 0 ? 0
    : n % 2 === 1
      ? sorted[(n - 1) / 2]
      : (sorted[n / 2 - 1] + sorted[n / 2]) / 2

  const squaredDiffs = numbers.map((x) => Math.pow(x - mean, 2))
  const variancePop = n > 0 ? squaredDiffs.reduce((a, b) => a + b, 0) / n : 0
  const varianceSample = n > 1 ? squaredDiffs.reduce((a, b) => a + b, 0) / (n - 1) : 0
  const sdPop = Math.sqrt(variancePop)
  const sdSample = Math.sqrt(varianceSample)

  const min = n > 0 ? sorted[0] : 0
  const max = n > 0 ? sorted[n - 1] : 0
  const range = max - min

  const fmt = (x) => Number(x).toFixed(4).replace(/\.?0+$/, '')

  const copyResults = () => {
    const text = `Standard Deviation\n\nCount: ${n}\nSum: ${fmt(sum)}\nMean: ${fmt(mean)}\nMedian: ${fmt(median)}\nRange: ${fmt(range)}\n\nPopulation SD (σ): ${fmt(sdPop)}\nSample SD (s): ${fmt(sdSample)}\nPopulation variance: ${fmt(variancePop)}\nSample variance: ${fmt(varianceSample)}`
    navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const results = [
    { label: 'Count (n)',              value: n,             color: 'slate' },
    { label: 'Sum',                    value: fmt(sum),      color: 'slate' },
    { label: 'Mean (x̄)',               value: fmt(mean),     color: 'indigo' },
    { label: 'Median',                 value: fmt(median),   color: 'indigo' },
    { label: 'Min',                    value: fmt(min),      color: 'slate' },
    { label: 'Max',                    value: fmt(max),      color: 'slate' },
    { label: 'Range',                  value: fmt(range),    color: 'slate' },
  ]

  const sdResults = [
    { label: 'Population SD (σ)',      value: fmt(sdPop),    note: 'Use when you have all data', color: 'purple' },
    { label: 'Sample SD (s)',          value: fmt(sdSample), note: 'Use when you have a sample', color: 'indigo' },
    { label: 'Population variance (σ²)', value: fmt(variancePop), note: 'σ squared', color: 'purple' },
    { label: 'Sample variance (s²)',   value: fmt(varianceSample), note: 's squared', color: 'indigo' },
  ]

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
            <Sigma className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Standard Deviation Calculator</h2>
            <p className="text-xs text-muted-foreground">Paste any list of numbers - separated by comma, space, or newline</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-bold mb-1.5 block">Data set</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 12, 15, 18, 22, 25"
            className="w-full h-28 px-3 py-2 rounded-md border border-input bg-background text-sm font-mono resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-muted-foreground">
              {n} valid number{n === 1 ? '' : 's'} detected
            </div>
            <button onClick={() => setInput('')} className="text-xs text-muted-foreground hover:text-rose-500 flex items-center gap-1 transition-colors">
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          </div>
        </div>

        {n === 0 ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
            Enter at least one number to calculate.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {sdResults.map((r) => (
                <div key={r.label} className={'rounded-xl border-2 p-4 bg-' + r.color + '-500/5 border-' + r.color + '-500/30'}>
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">{r.label}</div>
                  <div className={'text-lg md:text-xl font-black text-' + r.color + '-600 dark:text-' + r.color + '-400 tabular-nums'}>{r.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{r.note}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {results.map((r) => (
                <div key={r.label} className="rounded-xl border border-border p-3">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">{r.label}</div>
                  <div className="text-base md:text-lg font-black tabular-nums">{r.value}</div>
                </div>
              ))}
            </div>

            <Button onClick={copyResults} variant="outline" className="w-full">
              {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}