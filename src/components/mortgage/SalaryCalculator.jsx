import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DollarSign, TrendingUp, Info, Building2, ExternalLink, Calculator, Wallet, Percent } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'
import AuthorityLink from './AuthorityLink'

import { SALARY_TAX as COUNTRY_TAX, getSalaryTax } from '../../data/taxRates'

const COUNTRY_LIST = Object.keys(COUNTRY_TAX)

function fmt(n, symbol) {
  if (n === null || n === undefined || isNaN(n)) return symbol + '0'
  return symbol + Math.round(n).toLocaleString('en-US')
}

function fmtPct(n) {
  if (isNaN(n)) return '0.0%'
  return n.toFixed(1) + '%'
}

export default function SalaryCalculator({ defaultCountry = 'australia' }) {
  const [countryKey, setCountryKey] = useState(defaultCountry)
  const rule = COUNTRY_TAX[countryKey] || COUNTRY_TAX.australia
  const d = rule

  const [salary, setSalary] = useState(String(rule.defaultSalary))
  const [bonus, setBonus] = useState('0')
  const [preTax, setPreTax] = useState('0')

  useEffect(() => {
    const r = COUNTRY_TAX[countryKey] || COUNTRY_TAX.australia
    setSalary(String(r.defaultSalary))
    setBonus('0')
    setPreTax('0')
  }, [countryKey])

  const calc = useMemo(() => {
    const r = COUNTRY_TAX[countryKey] || COUNTRY_TAX.australia
    const gross = (parseFloat(salary) || 0) + (parseFloat(bonus) || 0)
    const preTaxDed = parseFloat(preTax) || 0
    const taxableIncome = Math.max(0, gross - (r.stdDeduction || 0) - preTaxDed)

    // Income tax on progressive brackets
    let incomeTax = 0
    const bracketBreakdown = []
    for (const b of r.brackets) {
      const upper = b.max === null ? taxableIncome : Math.min(taxableIncome, b.max)
      const taxable = upper - b.min
      if (taxable > 0) {
        const taxForBracket = taxable * b.rate
        incomeTax += taxForBracket
        bracketBreakdown.push({ from: b.min, to: upper, rate: b.rate, tax: taxForBracket })
      }
    }

    // Social contributions (flat)
    const socialContrib = gross * (r.socialRate || 0)

    const totalDeductions = incomeTax + socialContrib + preTaxDed
    const netAnnual = Math.max(0, gross - totalDeductions)
    const netMonthly = netAnnual / 12
    const netWeekly = netAnnual / 52
    const netFortnightly = netAnnual / 26

    const effectiveTaxRate = gross > 0 ? (incomeTax / gross) * 100 : 0
    const effectiveTotalRate = gross > 0 ? (totalDeductions / gross) * 100 : 0

    return {
      gross, taxableIncome, incomeTax, socialContrib, preTaxDed,
      totalDeductions, netAnnual, netMonthly, netWeekly, netFortnightly,
      effectiveTaxRate, effectiveTotalRate, bracketBreakdown,
      stdDeduction: r.stdDeduction || 0,
    }
  }, [salary, bonus, preTax, countryKey])

  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    registerCalculation({
      type: 'salary',
      countrySlug: countryKey,
      title: 'Salary - ' + rule.name,
      inputs: { salary, bonus, preTax, country: countryKey },
      results: {
        gross: calc.gross,
        net_annual: calc.netAnnual,
        net_monthly: calc.netMonthly,
        income_tax: calc.incomeTax,
        social: calc.socialContrib,
      },
    })
  }, [salary, bonus, preTax, countryKey, calc, registerCalculation, rule])

  const f = (n) => fmt(n, rule.symbol)

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            Salary Calculator
          </CardTitle>
          <select value={countryKey} onChange={(e) => setCountryKey(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-semibold">
            {COUNTRY_LIST.map(k => (
              <option key={k} value={k}>{COUNTRY_TAX[k].name}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* Info banner */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-blue-700 dark:text-blue-400">
            <strong>{rule.taxYear} rates</strong> - {rule.name}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Annual gross salary</label>
            <Input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Annual bonus (optional)</label>
            <Input type="number" value={bonus} onChange={(e) => setBonus(e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Pre-tax deductions (optional)</label>
            <Input type="number" value={preTax} onChange={(e) => setPreTax(e.target.value)} className="h-11" />
          </div>
        </div>

        {calc && (
          <>
            {/* Headline */}
            <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-center shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">Net annual take-home</div>
              <div className="text-3xl md:text-5xl font-black tabular-nums">{f(calc.netAnnual)}</div>
              <div className="text-xs mt-2 opacity-90">{f(calc.netMonthly)} per month</div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl p-4 bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30">
                <div className="text-[10px] text-red-600 uppercase tracking-widest font-bold mb-1">Income tax</div>
                <div className="text-xl font-black text-red-600 tabular-nums">{f(calc.incomeTax)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                <div className="text-[10px] text-amber-600 uppercase tracking-widest font-bold mb-1">Social</div>
                <div className="text-xl font-black text-amber-600 tabular-nums">{f(calc.socialContrib)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
                <div className="text-[10px] text-blue-600 uppercase tracking-widest font-bold mb-1">Effective rate</div>
                <div className="text-xl font-black text-blue-600 tabular-nums">{fmtPct(calc.effectiveTotalRate)}</div>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30">
                <div className="text-[10px] text-violet-600 uppercase tracking-widest font-bold mb-1">Per week</div>
                <div className="text-xl font-black text-violet-600 tabular-nums">{f(calc.netWeekly)}</div>
              </div>
            </div>

            {/* Breakdown */}
            <details className="border border-border rounded-xl overflow-hidden bg-card" open>
              <summary className="p-3 cursor-pointer font-bold text-sm bg-muted/30">Full breakdown</summary>
              <div className="p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Gross salary</span><span className="font-mono font-bold tabular-nums">{f(calc.gross)}</span></div>
                {calc.stdDeduction > 0 && (
                  <div className="flex justify-between"><span className="text-muted-foreground">Standard deduction</span><span className="font-mono text-red-500">-{f(calc.stdDeduction)}</span></div>
                )}
                {calc.preTaxDed > 0 && (
                  <div className="flex justify-between"><span className="text-muted-foreground">Pre-tax deductions</span><span className="font-mono text-red-500">-{f(calc.preTaxDed)}</span></div>
                )}
                <div className="flex justify-between border-t pt-2"><span className="font-semibold">Taxable income</span><span className="font-mono font-bold tabular-nums">{f(calc.taxableIncome)}</span></div>

                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4 mb-2">Tax brackets applied</div>
                {calc.bracketBreakdown.map((b, i) => (
                  <div key={i} className="flex justify-between text-xs"><span className="text-muted-foreground">{f(b.from)} - {f(b.to)} @ {(b.rate * 100).toFixed(0)}%</span><span className="font-mono">{f(b.tax)}</span></div>
                ))}

                <div className="flex justify-between border-t pt-2 mt-2"><span className="text-muted-foreground">Income tax total</span><span className="font-mono font-bold text-red-500">{f(calc.incomeTax)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{rule.socialLabel}</span><span className="font-mono font-bold text-red-500">{f(calc.socialContrib)}</span></div>
                <div className="flex justify-between border-t pt-2"><span className="font-semibold">Total deductions</span><span className="font-mono font-bold text-red-500">-{f(calc.totalDeductions)}</span></div>
                <div className="flex justify-between border-t-2 border-emerald-500 pt-2 mt-2"><span className="font-bold text-emerald-600">Net take-home</span><span className="font-mono font-black text-emerald-600">{f(calc.netAnnual)}</span></div>
              </div>
            </details>

            {/* Frequency table */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Weekly</div>
                <div className="text-base font-black tabular-nums">{f(calc.netWeekly)}</div>
              </div>
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Fortnightly</div>
                <div className="text-base font-black tabular-nums">{f(calc.netFortnightly)}</div>
              </div>
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Monthly</div>
                <div className="text-base font-black tabular-nums">{f(calc.netMonthly)}</div>
              </div>
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Annual</div>
                <div className="text-base font-black tabular-nums">{f(calc.netAnnual)}</div>
              </div>
            </div>

            {/* Country notes */}
            <div className="rounded-lg p-3 bg-emerald-500/10 border border-emerald-500/30 text-xs flex items-start gap-2">
              <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-emerald-700 dark:text-emerald-400">
                <strong>{rule.name} note:</strong> {rule.notes}
              </div>
            </div>

            {/* Authority link */}
            <div className="rounded-lg p-4 bg-muted/40 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Official tax authority</div>
              </div>
              <a href={rule.authorityUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline">
                {rule.authority}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <p className="text-[10px] text-muted-foreground mt-2">
                Always verify rates and rules with the official authority before making financial decisions.
              </p>
            </div>

            {/* Disclaimer */}
                  <AuthorityLink currency={rule.currency} />

<div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
              <strong>Disclaimer:</strong> Estimates only. This calculator simplifies complex tax rules (regional rates, caps, exemptions). Consult a qualified tax professional or the official authority before making decisions.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}