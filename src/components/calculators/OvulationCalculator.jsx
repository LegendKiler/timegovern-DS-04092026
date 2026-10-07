import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart } from "lucide-react"
import { COUNTRY_METADATA, getCountriesByRegion, REGION_ORDER } from '../../data/countryMetadata'

function addDays(date, days) {
  const d = new Date(date.getTime())
  d.setDate(d.getDate() + days)
  return d
}

function fmtShort(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function fmtFull(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
}

export default function OvulationCalculator({ initialCountryCode }) {
  const [countryCode, setCountryCode] = useState(initialCountryCode || 'US')
  const [lmp, setLmp] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 10)
    return d.toISOString().split('T')[0]
  })
  const [cycleLen, setCycleLen] = useState('28')
  const [luteal, setLuteal] = useState('14')

  const byRegion = useMemo(() => getCountriesByRegion(), [])
  const meta = COUNTRY_METADATA[countryCode] || {}
  const authority = (meta.healthAuthorityName && meta.healthAuthorityUrl)
    ? { name: meta.healthAuthorityName, url: meta.healthAuthorityUrl }
    : { name: 'World Health Organization', url: 'https://www.who.int/health-topics/maternal-health' }

  const calc = useMemo(() => {
    const lmpDate = new Date(lmp)
    if (isNaN(lmpDate.getTime())) return null
    const cl = parseInt(cycleLen) || 28
    const lp = parseInt(luteal) || 14
    const ovulationDay = cl - lp  // days after LMP
    const ovulationDate = addDays(lmpDate, ovulationDay)
    const fertileStart = addDays(lmpDate, ovulationDay - 5)
    const fertileEnd = addDays(lmpDate, ovulationDay + 1)
    const nextPeriod = addDays(lmpDate, cl)
    // Next cycle's ovulation
    const nextOvulation = addDays(nextPeriod, ovulationDay)
    return { ovulationDate, fertileStart, fertileEnd, nextPeriod, nextOvulation, cycleLen: cl, luteal: lp, ovulationDay }
  }, [lmp, cycleLen, luteal])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-md">
            <Heart className="h-4 w-4 text-white" />
          </div>
          Ovulation Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (for health guidance)</label>
          <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {REGION_ORDER.map(r => byRegion[r] && byRegion[r].length > 0 && (<optgroup key={r} label={r}>{byRegion[r].map(c => <option key={c.code} value={c.code}>{c.name}</option>)}</optgroup>))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">LMP date</label>
            <Input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Cycle (days)</label>
            <Input type="number" value={cycleLen} onChange={e => setCycleLen(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Luteal (days)</label>
            <Input type="number" value={luteal} onChange={e => setLuteal(e.target.value)} className="h-11" />
          </div>
        </div>
        {calc && (
          <>
            <div className="bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-fuchsia-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Estimated ovulation</div>
              <div className="text-2xl font-black text-fuchsia-600">{fmtFull(calc.ovulationDate)}</div>
              <div className="text-xs text-muted-foreground mt-1">Day {calc.ovulationDay} of a {calc.cycleLen}-day cycle</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Fertile window</div><div className="font-bold text-xs">{fmtShort(calc.fertileStart)} – {fmtShort(calc.fertileEnd)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Next period</div><div className="font-bold text-xs">{fmtFull(calc.nextPeriod)}</div></div>
            </div>
            <div className="text-xs text-muted-foreground border border-border rounded-lg p-3">
              <div className="font-semibold text-foreground mb-1">Guidance for {countryCode}</div>
              <a href={authority.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">{authority.name}</a>
            </div>
            <p className="text-[11px] text-amber-600 text-center">
              Ovulation timing varies naturally. Sperm survive up to 5 days, eggs 12-24 hours. This calculator is for education only.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}