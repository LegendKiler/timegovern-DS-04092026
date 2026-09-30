import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, TrendingUp, Gift, Shield, Wallet, Info, CheckCircle2, XCircle, Percent, Building2 } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'
import AuthorityLink from './AuthorityLink'
import { FHB_SCHEMES } from '../../data/taxRates'

// ============================================================
// COUNTRY SCHEME CONFIG
// All amounts are local currency
// ============================================================
// COUNTRY_SCHEMES imported from data/taxRates.js
const COUNTRY_SCHEMES = FHB_SCHEMES

// Calculate stamp duty for AU
function calcAuStampDuty(state, price) {
 const s = COUNTRY_SCHEMES.AUD.stampDutyByState[state]
 if (!s) return { base: 0, fhbExempt: 0, fhbConcession: 0 }
 let base = 0
 for (const [min, max, rate] of s.brackets) {
 if (price > min) base += (Math.min(price, max) - min) * rate
 }
 return { base, fhbExempt: s.fhbExempt, fhbConcession: s.fhbConcession }
}

// Calculate UK stamp duty (SDLT)
function calcUkStampDuty(price, isFirstBuyer) {
 const bands = [[0,250000,0],[250000,925000,0.05],[925000,1500000,0.10],[1500000,Infinity,0.12]]
 const fhbBands = [[0,425000,0],[425000,625000,0.05],[625000,Infinity,0.10]]
 let duty = 0
 if (isFirstBuyer && price <= 625000) {
 for (const [min, max, rate] of fhbBands) {
 if (price > min) duty += (Math.min(price, max) - min) * rate
 }
 } else {
 for (const [min, max, rate] of bands) {
 if (price > min) duty += (Math.min(price, max) - min) * rate
 }
 }
 return duty
}

function fmt(n, symbol) {
 if (n === null || n === undefined || isNaN(n)) return symbol + '0'
 return symbol + Math.round(Math.abs(n)).toLocaleString('en-US')
}

// Which buyer-type buttons show per country.
// AU: new-build matters (FHOG), regional matters (Home Guarantee cap)
// US: regional matters (USDA rural), new-build does not
// UK: new-build matters (Help to Buy / First Homes)
// CA: new-build matters (FTHBI gives more for new builds)
// Others: only single/couple matters
const BUYER_FIELDS = {
  AUD: { couple: true,  newBuild: true,  regional: true  },
  USD: { couple: true,  newBuild: false, regional: true  },
  GBP: { couple: true,  newBuild: true,  regional: false },
  CAD: { couple: true,  newBuild: true,  regional: false },
  INR: { couple: true,  newBuild: false, regional: false },
  SGD: { couple: true,  newBuild: false, regional: false },
  MYR: { couple: true,  newBuild: false, regional: false },
  EUR: { couple: true,  newBuild: false, regional: false },
  JPY: { couple: true,  newBuild: false, regional: false },
  PKR: { couple: true,  newBuild: false, regional: false },
  NOK: { couple: true,  newBuild: false, regional: false },
  PLN: { couple: true,  newBuild: false, regional: false },
  IDR: { couple: true,  newBuild: false, regional: false },
}
export default function FirstHomeBuyerCalculator({ defaultCurrency = 'AUD' }) {
 const [currency, setCurrency] = useState(defaultCurrency)
 const scheme = COUNTRY_SCHEMES[currency]
  if (!scheme) {
    return <div className="p-8 text-center text-red-500">Currency {currency} not configured. Please report this.</div>
  }
  const fields = BUYER_FIELDS[currency] || BUYER_FIELDS.AUD

 const [price, setPrice] = useState(String(scheme.defaultPrice))
 const [income, setIncome] = useState(String(scheme.defaultIncome))
 const [savings, setSavings] = useState(String(scheme.defaultSavings))
 const [isCouple, setIsCouple] = useState(false)
 const [isNewBuild, setIsNewBuild] = useState(true)
 const [isRegional, setIsRegional] = useState(false)
 const [auState, setAuState] = useState('NSW')

 // Update defaults when currency changes
 useEffect(() => {
 setPrice(String(scheme.defaultPrice))
 setIncome(String(scheme.defaultIncome))
 setSavings(String(scheme.defaultSavings))
 }, [currency])

 const calc = useMemo(() => {
 const P = parseFloat(price) || 0
 const I = parseFloat(income) || 0
 const S = parseFloat(savings) || 0

 // Basic calculations
 const minDepositPct = scheme.guaranteedDeposit
 const minDeposit = P * (minDepositPct / 100)
 const standardDeposit = P * (scheme.standardDeposit / 100)

 // LMI avoided (if under guaranteed scheme)
 const lmiThreshold = P * (scheme.lmiAt / 100)
 const wouldOweLMI = S < lmiThreshold
 // Estimated LMI (1.5-3% of loan depending on LVR)
 const lvr = P > 0 ? ((P - S) / P) * 100 : 0
 let lmiRate = 0
 if (lvr > 95) lmiRate = 0.035
 else if (lvr > 90) lmiRate = 0.028
 else if (lvr > 85) lmiRate = 0.018
 else if (lvr > 80) lmiRate = 0.012
 const estimatedLMI = wouldOweLMI ? (P - S) * lmiRate : 0

 // Country-specific scheme stacking
 let stampDuty = 0
 let stampDutySaved = 0
 let grant = 0
 let fhssRelease = 0
 let extraSchemes = []
 let eligibility = []

 if (currency === 'AUD') {
 // Stamp duty
 const sd = calcAuStampDuty(auState, P)
 stampDuty = sd.base
 // FHB concession
 if (P <= sd.fhbExempt && sd.fhbExempt > 0) {
 stampDutySaved = sd.base
 stampDuty = 0
 eligibility.push({ label: 'Stamp duty full exemption (' + auState + ')', pass: true })
 } else if (P <= sd.fhbConcession && sd.fhbConcession > 0) {
 const concession = ((sd.fhbConcession - P) / (sd.fhbConcession - sd.fhbExempt)) * sd.base
 stampDutySaved = concession
 stampDuty = sd.base - concession
 eligibility.push({ label: 'Stamp duty concession (' + auState + ')', pass: true })
 } else {
 eligibility.push({ label: 'Stamp duty full price (' + auState + ')', pass: true })
 }

 // FHOG
 const fhog = scheme.fhogByState[auState] || 0
 if (fhog > 0 && (!scheme.fhogNewBuildOnly || isNewBuild)) {
 grant = fhog
 eligibility.push({ label: 'First Home Owner Grant', pass: true })
 } else if (fhog > 0 && scheme.fhogNewBuildOnly && !isNewBuild) {
 eligibility.push({ label: 'FHOG requires a new build', pass: false })
 }

 // FHSS
 fhssRelease = Math.min(S * 0.3, scheme.fhss.maxRelease)

 // Home Guarantee check
 const priceCap = isRegional ? scheme.guarantee.priceCapRegional : scheme.guarantee.priceCapCity
 const incomeCap = isCouple ? scheme.guarantee.coupleIncomeCap : scheme.guarantee.singleIncomeCap
 const guaranteePricePass = P <= priceCap
 const guaranteeIncomePass = I <= incomeCap
 const guaranteeDepositPass = S >= minDeposit

 eligibility.push({ label: 'Home Guarantee - price cap (' + fmt(priceCap, scheme.symbol) + ')', pass: guaranteePricePass })
 eligibility.push({ label: 'Home Guarantee - income cap (' + fmt(incomeCap, scheme.symbol) + ')', pass: guaranteeIncomePass })
 eligibility.push({ label: 'Home Guarantee - 5% deposit met', pass: guaranteeDepositPass })

 const guaranteeEligible = guaranteePricePass && guaranteeIncomePass && guaranteeDepositPass

 // If guarantee eligible, LMI is waived
 const lmiAvoided = guaranteeEligible ? estimatedLMI : 0

 return {
 minDeposit, standardDeposit, stampDuty, stampDutySaved, grant, fhssRelease,
 estimatedLMI, lmiAvoided, guaranteeEligible,
 totalSupport: stampDutySaved + grant + lmiAvoided + fhssRelease,
 totalUpfront: minDeposit + stampDuty,
 surplus: S - (minDeposit + stampDuty),
 eligibility, extraSchemes,
 }
 }

 if (currency === 'USD') {
 const sc = scheme.schemes
 // FHA
 const fhaDeposit = P * (sc.fha.depositPct / 100)
 const fhaUpfrontMip = (P - fhaDeposit) * sc.fha.upfrontMip
 eligibility.push({ label: 'FHA 3.5% down + 1.75% upfront MIP', pass: true })

 // VA (assume eligible)
 eligibility.push({ label: 'VA loan eligibility (veteran)', pass: false })

 // USDA (assume not rural)
 if (isRegional) eligibility.push({ label: 'USDA rural loan eligible', pass: true })
 else eligibility.push({ label: 'USDA - not in a rural area', pass: false })

 // Conventional 97
 const conv97Deposit = P * 0.03
 eligibility.push({ label: 'Conventional 97% - 3% down', pass: true })

 const totalSupport = 0
 return {
 minDeposit: fhaDeposit, standardDeposit: P * 0.20, stampDuty: 0, stampDutySaved: 0,
 grant: 0, fhssRelease: 0, estimatedLMI: 0, lmiAvoided: 0,
 guaranteeEligible: false, totalSupport, totalUpfront: fhaDeposit + fhaUpfrontMip,
 surplus: S - fhaDeposit - fhaUpfrontMip, eligibility,
 extraSchemes: [{ label: 'Upfront MIP', value: fhaUpfrontMip }],
 }
 }

 if (currency === 'GBP') {
 const sc = scheme.schemes
 const sdltBase = calcUkStampDuty(P, false)
 const sdltFhb = calcUkStampDuty(P, true)
 stampDutySaved = sdltBase - sdltFhb
 stampDuty = sdltFhb

 // Lifetime ISA
 const lisaBonus = Math.min(S * 0.25, 1000)
 if (P <= sc.lifetimeISA.maxPropertyPrice) {
 grant += lisaBonus
 eligibility.push({ label: 'Lifetime ISA 25% bonus', pass: true })
 } else {
 eligibility.push({ label: 'LISA - property over 450K', pass: false })
 }

 // Help to Buy (closed to new applicants - historical)
 eligibility.push({ label: 'Help to Buy ISA (closed)', pass: false })

 return {
 minDeposit: P * (scheme.guaranteedDeposit / 100),
 standardDeposit: P * (scheme.standardDeposit / 100),
 stampDuty, stampDutySaved, grant, fhssRelease: 0,
 estimatedLMI: 0, lmiAvoided: 0, guaranteeEligible: false,
 totalSupport: stampDutySaved + grant,
 totalUpfront: P * 0.05 + stampDuty,
 surplus: S - P * 0.05 - stampDuty,
 eligibility, extraSchemes: [],
 }
 }

 if (currency === 'CAD') {
 const sc = scheme.schemes
 // RRSP HBP
 const hbp = Math.min(S * 0.5, sc.rrspHBP.maxWithdrawal)
 grant += hbp
 eligibility.push({ label: 'RRSP Home Buyers\' Plan', pass: true })

 // CMHC insurance tiers
 const downPct = P > 0 ? (S / P) * 100 : 0
 let cmhcPremium = 0
 if (downPct < 20) {
 for (const tier of sc.cmhcTiers) {
 if (downPct <= 100 - tier.maxLtv + 20) { cmhcPremium = (P - S) * tier.premium; break }
 }
 }

 return {
 minDeposit: P * 0.05, standardDeposit: P * 0.20,
 stampDuty: 0, stampDutySaved: 0, grant, fhssRelease: 0,
 estimatedLMI: cmhcPremium, lmiAvoided: 0, guaranteeEligible: false,
 totalSupport: grant, totalUpfront: S, surplus: 0,
 eligibility, extraSchemes: [],
 }
 }

 if (currency === 'INR') {
 const sc = scheme.schemes
 const pmay = sc.pmay
 if (P <= pmay.maxLoanAmount && I <= pmay.incomeCap) {
 const subsidy = (P - S) * pmay.interestSubsidy
 grant = subsidy
 eligibility.push({ label: 'PMAY interest subsidy', pass: true })
 } else {
 eligibility.push({ label: 'PMAY - price/income exceeds cap', pass: false })
 }
 const taxDeduction = sc.section80EEA.interestDeduction + sc.section80C.principalDeduction

 return {
 minDeposit: P * 0.10, standardDeposit: P * 0.20,
 stampDuty: P * 0.06, stampDutySaved: 0, grant,
 fhssRelease: taxDeduction, estimatedLMI: 0, lmiAvoided: 0,
 guaranteeEligible: false, totalSupport: grant + taxDeduction,
 totalUpfront: P * 0.10 + P * 0.06,
 surplus: S - P * 0.10 - P * 0.06, eligibility,
 }
 }

 if (currency === 'SGD') {
 const sc = scheme.schemes
 const grantAmount = isCouple ? sc.hdbGrant.couples : sc.hdbGrant.singles
 grant = grantAmount
 eligibility.push({ label: 'HDB CPF Housing Grant', pass: true })

 return {
 minDeposit: P * 0.20, standardDeposit: P * 0.25,
 stampDuty: 0, stampDutySaved: 0, grant, fhssRelease: 0,
 estimatedLMI: 0, lmiAvoided: 0, guaranteeEligible: false,
 totalSupport: grant, totalUpfront: P * 0.20, surplus: S - P * 0.20,
 eligibility, extraSchemes: [],
 }
 }

 // Generic fallback
 return {
 minDeposit: minDeposit,
 standardDeposit,
 stampDuty: P * 0.05,
 stampDutySaved: 0,
 grant: 0, fhssRelease: 0,
 estimatedLMI, lmiAvoided: 0, guaranteeEligible: false,
 totalSupport: 0,
 totalUpfront: minDeposit + P * 0.05,
 surplus: S - minDeposit - P * 0.05,
 eligibility: [{ label: 'Country-specific schemes not yet available', pass: false }],
 extraSchemes: [],
 }
 }, [price, income, savings, currency, isCouple, isNewBuild, isRegional, auState, scheme])

 const { registerCalculation } = useCalculation()
 useEffect(() => {
 if (!calc) return
 registerCalculation({
 type: 'first-home-buyer',
 countrySlug: currency.toLowerCase(),
 title: 'First Home Buyer - ' + currency,
 inputs: { price, income, savings, currency, isCouple, isNewBuild, isRegional, auState },
 results: {
 deposit_required: calc.minDeposit,
 total_government_support: calc.totalSupport,
 stamp_duty_saved: calc.stampDutySaved,
 lmi_avoided: calc.lmiAvoided,
 grant: calc.grant,
 },
 })
 }, [price, income, savings, currency, isCouple, isNewBuild, isRegional, auState, calc, registerCalculation])

 const f = (n) => fmt(n, scheme.symbol)

 return (
 <Card className="border-2 shadow-xl bg-card">
 <CardHeader>
 <div className="flex items-center justify-between flex-wrap gap-3">
 <CardTitle className="flex items-center gap-2 text-lg">
 <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
 <Home className="h-4 w-4 text-white" />
 </div>
 First Home Buyer Calculator
 </CardTitle>
 <select value={currency} onChange={(e) => setCurrency(e.target.value)}
 className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-semibold">
 {Object.entries(COUNTRY_SCHEMES).map(([k, v]) => (
 <option key={k} value={k}>{v.flag} {k}</option>
 ))}
 </select>
 </div>
 </CardHeader>
 <CardContent className="space-y-5">

 {/* Buyer Type */}
 <div>
 <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Buyer</div>
 <div className="flex gap-2 flex-wrap">
 {fields.couple && (
              <>
                <button onClick={() => setIsCouple(false)}
                  className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (!isCouple ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
                  Single
                </button>
                <button onClick={() => setIsCouple(true)}
                  className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (isCouple ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
                  Couple
                </button>
              </>
            )}
            {fields.newBuild && (
              <>
                <button onClick={() => setIsNewBuild(true)}
                  className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (isNewBuild ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
                  New build
                </button>
                <button onClick={() => setIsNewBuild(false)}
                  className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (!isNewBuild ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
                  Established
                </button>
              </>
            )}
            {fields.regional && (
              <button onClick={() => setIsRegional(!isRegional)}
                className={'px-4 py-2 rounded-lg text-xs font-bold border transition ' + (isRegional ? 'bg-primary text-white border-primary' : 'bg-muted border-transparent')}>
                {isRegional ? 'Regional (selected)' : 'Regional area'}
              </button>
            )}
 </div>
 </div>

 {/* Inputs */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 <div>
 <label className="text-sm font-semibold mb-1.5 block">Property price</label>
 <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" />
 </div>
 <div>
 <label className="text-sm font-semibold mb-1.5 block">{isCouple ? 'Household income' : 'Your income'} (annual)</label>
 <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-11" />
 </div>
 <div>
 <label className="text-sm font-semibold mb-1.5 block">Savings / deposit ready</label>
 <Input type="number" value={savings} onChange={(e) => setSavings(e.target.value)} className="h-11" />
 </div>
 {currency === 'AUD' && (
 <div className="md:col-span-3">
 <label className="text-sm font-semibold mb-1.5 block">State</label>
 <select value={auState} onChange={(e) => setAuState(e.target.value)}
 className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
 {Object.keys(scheme.stampDutyByState).map(s => <option key={s} value={s}>{s}</option>)}
 </select>
 </div>
 )}
 </div>

 {calc && (
 <>
 {/* Headline: Total Government Support */}
 <div className="rounded-xl p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-center shadow-xl">
 <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1 flex items-center justify-center gap-2">
 <Gift className="h-4 w-4" /> Total government support
 </div>
 <div className="text-4xl md:text-5xl font-black tabular-nums">
 {f(calc.totalSupport)}
 </div>
 <div className="text-xs mt-2 opacity-90">
 {scheme.country}
 </div>
 </div>

 {/* Support breakdown */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
 <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-1">Stamp duty saved</div>
 <div className="text-xl font-black text-emerald-600 tabular-nums">{f(calc.stampDutySaved)}</div>
 </div>
 <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
 <div className="text-[10px] text-amber-600 uppercase tracking-widest font-bold mb-1">Grant</div>
 <div className="text-xl font-black text-amber-600 tabular-nums">{f(calc.grant)}</div>
 </div>
 <div className="rounded-xl p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
 <div className="text-[10px] text-blue-600 uppercase tracking-widest font-bold mb-1">LMI avoided</div>
 <div className="text-xl font-black text-blue-600 tabular-nums">{f(calc.lmiAvoided)}</div>
 </div>
 <div className="rounded-xl p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30">
 <div className="text-[10px] text-violet-600 uppercase tracking-widest font-bold mb-1">Tax / FHSS</div>
 <div className="text-xl font-black text-violet-600 tabular-nums">{f(calc.fhssRelease)}</div>
 </div>
 </div>

 {/* Deposit position */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 <div className="rounded-xl p-5 bg-muted/40 border border-border">
 <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Min deposit required ({scheme.guaranteedDeposit}%)</div>
 <div className="text-2xl font-black tabular-nums">{f(calc.minDeposit)}</div>
 <div className="text-xs text-muted-foreground mt-1">Standard 20%: {f(calc.standardDeposit)}</div>
 </div>
 <div className={'rounded-xl p-5 border ' + (calc.surplus >= 0 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30')}>
 <div className={'text-[10px] uppercase tracking-widest font-bold mb-1 ' + (calc.surplus >= 0 ? 'text-emerald-600' : 'text-red-600')}>
 {calc.surplus >= 0 ? 'Surplus after upfront costs' : 'Shortfall'}
 </div>
 <div className={'text-2xl font-black tabular-nums ' + (calc.surplus >= 0 ? 'text-emerald-600' : 'text-red-600')}>
 {f(calc.surplus)}
 </div>
 <div className="text-xs text-muted-foreground mt-1">Based on your current savings</div>
 </div>
 </div>

 {/* Eligibility checklist */}
 <div className="rounded-xl border border-border bg-card overflow-hidden">
 <div className="p-3 bg-muted/30 border-b border-border">
 <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Eligibility check</div>
 </div>
 <div className="p-4 space-y-2">
 {calc.eligibility.map((e, i) => (
 <div key={i} className="flex items-start gap-2 text-sm">
 {e.pass ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />}
 <span className={e.pass ? 'text-foreground' : 'text-muted-foreground'}>{e.label}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Info */}
       <AuthorityLink currency={currency} />

<div className="rounded-lg p-3 bg-blue-500/10 border border-blue-500/30 text-xs flex items-start gap-2">
 <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
 <span className="text-blue-700 dark:text-blue-400">
 Estimates only. Actual scheme eligibility depends on current government rules, property type, and lender assessment. Confirm with your bank or a mortgage broker before committing.
 </span>
 </div>
 </>
 )}
 </CardContent>
 </Card>
 )
}