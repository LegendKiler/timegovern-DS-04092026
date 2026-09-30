import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function DatePatternFinder() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [results, setResults] = useState(null)

  const find = () => {
    const y = parseInt(year)
    if (isNaN(y)) return

    const palindromes = []      // e.g., 10-10-10 or 11-11-11
    const sequential = []        // e.g., 12-13-14
    const repeats = []           // e.g., 20-20-20

    for (let m = 1; m <= 12; m++) {
      const maxDay = new Date(y, m, 0).getDate()
      for (let d = 1; d <= maxDay; d++) {
        const dd = String(d).padStart(2, '0')
        const mm = String(m).padStart(2, '0')
        const yyyy = String(y).padStart(4, '0')
        const yy = String(y).slice(-2)

        // Repeating like 10-10-10
        if (mm === dd && dd === yy) {
          repeats.push({ month: m, day: d, label: mm + '/' + dd + '/' + yy })
        }

        // Sequential like 12-13-14 (mm-dd-yy)
        if (parseInt(mm) + 1 === parseInt(dd) && parseInt(dd) + 1 === parseInt(yy)) {
          sequential.push({ month: m, day: d, label: mm + '/' + dd + '/' + yy })
        }

        // Palindrome like 12-02-21 (mm-dd-yy reversed)
        const forward = mm + dd + yy
        const reversed = forward.split('').reverse().join('')
        if (forward === reversed) {
          palindromes.push({ month: m, day: d, label: mm + '/' + dd + '/' + yy })
        }
      }
    }

    setResults({ palindromes, sequential, repeats })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          Date Pattern Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className="h-11" />
          <Button onClick={find} className="h-11 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6">Find</Button>
        </div>

        {results && (
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-violet-600 mb-2">Palindromic dates (12-02-21)</div>
              {results.palindromes.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">{results.palindromes.map((p, i) => <span key={i} className="bg-violet-500/10 border border-violet-500/30 text-violet-700 dark:text-violet-400 px-2 py-1 rounded text-xs font-mono">{p.label}</span>)}</div>
              ) : <div className="text-xs text-muted-foreground">None this year</div>}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-pink-600 mb-2">Sequential dates (11-12-13)</div>
              {results.sequential.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">{results.sequential.map((p, i) => <span key={i} className="bg-pink-500/10 border border-pink-500/30 text-pink-700 dark:text-pink-400 px-2 py-1 rounded text-xs font-mono">{p.label}</span>)}</div>
              ) : <div className="text-xs text-muted-foreground">None this year</div>}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-2">Repeating dates (10-10-10)</div>
              {results.repeats.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">{results.repeats.map((p, i) => <span key={i} className="bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded text-xs font-mono">{p.label}</span>)}</div>
              ) : <div className="text-xs text-muted-foreground">None this year</div>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}