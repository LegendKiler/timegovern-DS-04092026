import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Copy, Check } from 'lucide-react'
import { COUNTRIES, calculateTakeHome } from '../data/salaryData'

const fmtMoney = (n, currency, symbol) => {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)
  } catch {
    return symbol + Math.round(n).toLocaleString()
  }
}

export default function SalaryCalculatorGeneric({ countryCode }) {
  const c = COUNTRIES[countryCode]
  const [gross, setGross] = useState(50000)
  const [preTax, setPreTax] = useState(0)
  const [copied, setCopied] = useState(false)

  if (!c) return null
  const result = calculateTakeHome(countryCode, gross, preTax)

  const cur = c.currency
  const sym = c.symbol
  const fmt = (n) => fmtMoney(n, cur, sym)

  const rows = [
    { label: 'Gross annual',     value: fmt(result.gross),   color: 'slate' },
    { label: 'Income tax',       value: fmt(result.incomeTax), color: 'rose' },
  ]
  if (result.ni > 0) rows.push({ label: 'National Insurance', value: fmt(result.ni), color: 'amber' })
  if (result.usc > 0) rows.push({ label: 'USC', value: fmt(result.usc), color: 'orange' })
  if (result.prsi > 0) rows.push({ label: 'PRSI', value: fmt(result.prsi), color: 'orange' })
  if (result.medicare > 0) rows.push({ label: 'Medicare Levy', value: fmt(result.medicare), color: 'orange' })
  if (result.acc > 0) rows.push({ label: 'ACC Levy', value: fmt(result.acc), color: 'orange' })
  if (result.cpp > 0) rows.push({ label: 'CPP', value: fmt(result.cpp), color: 'orange' })
  if (result.ei > 0) rows.push({ label: 'EI', value: fmt(result.ei), color: 'orange' })
  if (result.gosi > 0) rows.push({ label: 'GOSI', value: fmt(result.gosi), color: 'orange' })
  if (result.grsia > 0) rows.push({ label: 'GRSIA', value: fmt(result.grsia), color: 'orange' })
  if (result.socialInsurance > 0) rows.push({ label: 'Social Insurance', value: fmt(result.socialInsurance), color: 'amber' })
  if (result.localTax > 0) rows.push({ label: 'Local Tax', value: fmt(result.localTax), color: 'orange' })
  if (result.epf > 0) rows.push({ label: 'EPF (employee)', value: fmt(result.epf), color: 'amber' })
  if (result.cess > 0) rows.push({ label: 'Health & Education Cess', value: fmt(result.cess), color: 'orange' })
  if (result.eobi > 0) rows.push({ label: 'EOBI', value: fmt(result.eobi), color: 'orange' })
  if (result.pension > 0) rows.push({ label: 'Pension', value: fmt(result.pension), color: 'amber' })
  if (result.nhf > 0) rows.push({ label: 'NHF', value: fmt(result.nhf), color: 'orange' })
  if (result.nssf > 0) rows.push({ label: 'NSSF', value: fmt(result.nssf), color: 'orange' })
  if (result.shif > 0) rows.push({ label: 'SHIF', value: fmt(result.shif), color: 'orange' })
  if (result.housingLevy > 0) rows.push({ label: 'Housing Levy', value: fmt(result.housingLevy), color: 'orange' })
  if (result.uif > 0) rows.push({ label: 'UIF', value: fmt(result.uif), color: 'orange' })
  if (result.inss > 0) rows.push({ label: 'INSS', value: fmt(result.inss), color: 'amber' })
  if (result.imss > 0) rows.push({ label: 'IMSS', value: fmt(result.imss), color: 'amber' })
  rows.push({ label: 'Total deductions', value: fmt(result.totalTax), color: 'red' })
  rows.push({ label: 'Net annual',       value: fmt(result.net),     color: 'emerald' })
  rows.push({ label: 'Net monthly',      value: fmt(result.monthlyNet), color: 'emerald' })

  const copyResults = () => {
    const text = `${c.name} Salary Calculator (${c.taxYear})\n\nGross: ${fmt(gross)}\nPre-tax: ${fmt(preTax)}\n\nIncome tax: ${fmt(result.incomeTax)}` +
      (result.ni > 0 ? `\nNI: ${fmt(result.ni)}` : '') +
      (result.usc > 0 ? `\nUSC: ${fmt(result.usc)}` : '') +
      (result.prsi > 0 ? `\nPRSI: ${fmt(result.prsi)}` : '') +
      `\nTotal deductions: ${fmt(result.totalTax)}\nNet annual: ${fmt(result.net)}\nNet monthly: ${fmt(result.monthlyNet)}\nEffective rate: ${result.effectiveRate.toFixed(1)}%`
    navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">{c.name} Salary Calculator</h2>
            <p className="text-xs text-muted-foreground">{c.taxYear} tax year - {sym}{cur}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold mb-1.5 block">Gross annual salary ({sym})</label>
            <Input type="number" value={gross} onChange={(e) => setGross(Number(e.target.value) || 0)} min="0" step="1000" />
          </div>
          <div>
            <label className="text-xs font-bold mb-1.5 block">Pre-tax deductions ({sym}/year)</label>
            <Input type="number" value={preTax} onChange={(e) => setPreTax(Number(e.target.value) || 0)} min="0" step="500" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {rows.map((r) => (
            <div key={r.label} className={'rounded-xl border-2 p-4 bg-' + r.color + '-500/5 border-' + r.color + '-500/30'}>
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">{r.label}</div>
              <div className={'text-base md:text-lg font-black text-' + r.color + '-600 dark:text-' + r.color + '-400 tabular-nums'}>{r.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 mb-4">
          <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Effective tax rate</div>
          <div className="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400">{result.effectiveRate.toFixed(1)}%</div>
        </div>

        <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 mb-4 text-xs text-muted-foreground">
          <strong className="text-sky-700 dark:text-sky-400">Official source:</strong> {c.authority.name} - <a href={c.authority.url} target="_blank" rel="noopener noreferrer" className="underline">{c.authority.url.replace('https://', '')}</a>
        </div>

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}