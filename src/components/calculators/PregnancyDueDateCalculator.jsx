import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Baby } from "lucide-react"
import { COUNTRY_METADATA } from '../../data/countryMetadata'

const HEALTH_AUTHORITY = {
  US: { name: 'CDC (Centers for Disease Control and Prevention)', url: 'https://www.cdc.gov/pregnancy/' },
  GB: { name: 'NHS (National Health Service)', url: 'https://www.nhs.uk/pregnancy/' },
  AU: { name: 'healthdirect Australia', url: 'https://www.healthdirect.gov.au/pregnancy' },
  CA: { name: 'Health Canada', url: 'https://www.canada.ca/en/public-health/services/pregnancy.html' },
  IN: { name: 'Ministry of Health and Family Welfare', url: 'https://mohfw.gov.in/' },
  DE: { name: 'Bundeszentrale fur gesundheitliche Aufklarung', url: 'https://www.bzga.de/' },
  FR: { name: 'Sante publique France', url: 'https://www.santepubliquefrance.fr/' },
  JP: { name: 'Ministry of Health, Labour and Welfare', url: 'https://www.mhlw.go.jp/' },
  BR: { name: 'Ministerio da Saude', url: 'https://www.gov.br/saude/' },
  ZA: { name: 'Department of Health', url: 'https://www.health.gov.za/' }
}

function addDays(date, days) {
  const d = new Date(date.getTime())
  d.setDate(d.getDate() + days)
  return d
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
}

export default function PregnancyDueDateCalculator() {
  const [countryCode, setCountryCode] = useState('US')
  const [lmp, setLmp] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 60)
    return d.toISOString().split('T')[0]
  })
  const [cycleLen, setCycleLen] = useState('28')

  const sorted = useMemo(() => Object.values(COUNTRY_METADATA).sort((a, b) => a.code.localeCompare(b.code)), [])
  const authority = HEALTH_AUTHORITY[countryCode] || { name: 'World Health Organization', url: 'https://www.who.int/health-topics/maternal-health' }

  const calc = useMemo(() => {
    const lmpDate = new Date(lmp)
    if (isNaN(lmpDate.getTime())) return null
    const cycleAdj = (parseInt(cycleLen) || 28) - 28
    // Naegele's rule: due date = LMP + 280 days + (cycle length - 28)
    const dueDate = addDays(lmpDate, 280 + cycleAdj)
    const conceptionDate = addDays(lmpDate, 14 + cycleAdj)
    const secondTrimester = addDays(lmpDate, 98 + cycleAdj)
    const thirdTrimester = addDays(lmpDate, 189 + cycleAdj)
    const viability = addDays(lmpDate, 161 + cycleAdj) // 23 weeks
    const weeksPregnant = Math.floor(((new Date()) - lmpDate) / (7 * 24 * 3600 * 1000))
    const daysPregnant = Math.floor(((new Date()) - lmpDate) / (24 * 3600 * 1000))
    const daysRemaining = Math.max(0, Math.floor((dueDate - new Date()) / (24 * 3600 * 1000)))
    return { dueDate, conceptionDate, secondTrimester, thirdTrimester, viability, weeksPregnant, daysPregnant, daysRemaining, cycleAdj }
  }, [lmp, cycleLen])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-md">
            <Baby className="h-4 w-4 text-white" />
          </div>
          Pregnancy Due Date Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (for health guidance)</label>
          <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {sorted.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">First day of last period</label>
            <Input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Cycle length (days)</label>
            <Input type="number" value={cycleLen} onChange={e => setCycleLen(e.target.value)} className="h-11" />
          </div>
        </div>
        {calc && (
          <>
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-4 text-center border border-pink-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Estimated due date</div>
              <div className="text-2xl font-black text-pink-600">{fmtDate(calc.dueDate)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {calc.weeksPregnant}w {calc.daysPregnant - calc.weeksPregnant * 7}d pregnant · {calc.daysRemaining} days to go
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Conception (est.)</div><div className="font-bold text-xs">{fmtDate(calc.conceptionDate)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Second trimester</div><div className="font-bold text-xs">{fmtDate(calc.secondTrimester)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Third trimester</div><div className="font-bold text-xs">{fmtDate(calc.thirdTrimester)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Viability (23w)</div><div className="font-bold text-xs">{fmtDate(calc.viability)}</div></div>
            </div>
            <div className="text-xs text-muted-foreground border border-border rounded-lg p-3">
              <div className="font-semibold text-foreground mb-1">Guidance for {countryCode}</div>
              <a href={authority.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">{authority.name}</a>
            </div>
            <p className="text-[11px] text-amber-600 text-center">
              This is an estimate. Only about 4% of babies arrive on their due date. Consult a qualified healthcare professional for medical advice.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}