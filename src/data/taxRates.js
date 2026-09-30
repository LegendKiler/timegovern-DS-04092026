// ============================================================
// TAX METADATA — for 24 countries
// Rates verified against official sources. Update lastVerified when reviewed.
// ============================================================

export const TAX_METADATA = {
  australia: {
    name: 'Australia',
    authority: 'Australian Taxation Office (ATO)',
    authorityUrl: 'https://www.ato.gov.au',
    taxYear: '2025-26',
    lastVerified: '2026-07-01',
  },
  usa: {
    name: 'United States',
    authority: 'Internal Revenue Service (IRS)',
    authorityUrl: 'https://www.irs.gov',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  uk: {
    name: 'United Kingdom',
    authority: 'HM Revenue & Customs (HMRC)',
    authorityUrl: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
    taxYear: '2025-26',
    lastVerified: '2026-04-06',
  },
  canada: {
    name: 'Canada',
    authority: 'Canada Revenue Agency (CRA)',
    authorityUrl: 'https://www.canada.ca/en/revenue-agency.html',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  india: {
    name: 'India',
    authority: 'Central Board of Direct Taxes (CBDT)',
    authorityUrl: 'https://www.incometaxindia.gov.in',
    taxYear: 'FY 2025-26',
    lastVerified: '2026-04-01',
  },
  singapore: {
    name: 'Singapore',
    authority: 'Inland Revenue Authority of Singapore (IRAS)',
    authorityUrl: 'https://www.iras.gov.sg',
    taxYear: 'YA 2026',
    lastVerified: '2026-04-01',
  },
  malaysia: {
    name: 'Malaysia',
    authority: 'Lembaga Hasil Dalam Negeri (LHDN)',
    authorityUrl: 'https://www.hasil.gov.my',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  japan: {
    name: 'Japan',
    authority: 'National Tax Agency (NTA)',
    authorityUrl: 'https://www.nta.go.jp/english/',
    taxYear: '2025',
    lastVerified: '2026-04-01',
  },
  indonesia: {
    name: 'Indonesia',
    authority: 'Direktorat Jenderal Pajak (DJP)',
    authorityUrl: 'https://www.pajak.go.id',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  pakistan: {
    name: 'Pakistan',
    authority: 'Federal Board of Revenue (FBR)',
    authorityUrl: 'https://www.fbr.gov.pk',
    taxYear: '2025-26',
    lastVerified: '2026-07-01',
  },
  france: {
    name: 'France',
    authority: 'Direction generale des Finances publiques (DGFiP)',
    authorityUrl: 'https://www.impots.gouv.fr',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  germany: {
    name: 'Germany',
    authority: 'Bundesministerium der Finanzen (BMF)',
    authorityUrl: 'https://www.bundesfinanzministerium.de',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  spain: {
    name: 'Spain',
    authority: 'Agencia Estatal de Administracion Tributaria (AEAT)',
    authorityUrl: 'https://sede.agenciatributaria.gob.es',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  italy: {
    name: 'Italy',
    authority: 'Agenzia delle Entrate',
    authorityUrl: 'https://www.agenziaentrate.gov.it',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  netherlands: {
    name: 'Netherlands',
    authority: 'Belastingdienst',
    authorityUrl: 'https://www.belastingdienst.nl',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  switzerland: {
    name: 'Switzerland',
    authority: 'Eidgenossische Steuerverwaltung (ESTV)',
    authorityUrl: 'https://www.estv.admin.ch',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  sweden: {
    name: 'Sweden',
    authority: 'Skatteverket',
    authorityUrl: 'https://www.skatteverket.se',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  ireland: {
    name: 'Ireland',
    authority: 'Revenue Commissioners',
    authorityUrl: 'https://www.revenue.ie',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  portugal: {
    name: 'Portugal',
    authority: 'Autoridade Tributaria e Aduaneira',
    authorityUrl: 'https://www.portaldasfinancas.gov.pt',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  poland: {
    name: 'Poland',
    authority: 'Krajowa Administracja Skarbowa (KAS)',
    authorityUrl: 'https://www.podatki.gov.pl',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  belgium: {
    name: 'Belgium',
    authority: 'FOD Financien / SPF Finances',
    authorityUrl: 'https://finance.belgium.be',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  austria: {
    name: 'Austria',
    authority: 'Bundesministerium fur Finanzen (BMF)',
    authorityUrl: 'https://www.bmf.gv.at',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  denmark: {
    name: 'Denmark',
    authority: 'Skattestyrelsen',
    authorityUrl: 'https://www.skat.dk',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
  norway: {
    name: 'Norway',
    authority: 'Skatteetaten',
    authorityUrl: 'https://www.skatteetaten.no',
    taxYear: '2025',
    lastVerified: '2026-01-15',
  },
}

export function getTaxMeta(slug) {
  return TAX_METADATA[slug?.toLowerCase()] || null
}
// ============================================================
// SALARY TAX CONFIG — brackets, social rates, defaults per country
// Used by SalaryCalculator.jsx
// ============================================================
export const SALARY_TAX = {
  australia: {
    name: 'Australia', currency: 'AUD', symbol: '$', flag: 'AU',
    authority: 'Australian Taxation Office (ATO)',
    authorityUrl: 'https://www.ato.gov.au',
    taxYear: '2024-25',
    stdDeduction: 0,
    brackets: [
      { min: 0, max: 18200, rate: 0 },
      { min: 18200, max: 45000, rate: 0.16 },
      { min: 45000, max: 135000, rate: 0.30 },
      { min: 135000, max: 190000, rate: 0.37 },
      { min: 190000, max: null, rate: 0.45 },
    ],
    socialRate: 0.02,
    socialLabel: 'Medicare Levy (2%)',
    defaultSalary: 90000,
    notes: 'Superannuation (11.5%) is paid by your employer on top of your salary and does not reduce your take-home pay.',
  },
  usa: {
    name: 'United States', currency: 'USD', symbol: '$', flag: 'US',
    authority: 'Internal Revenue Service (IRS)',
    authorityUrl: 'https://www.irs.gov',
    taxYear: '2024',
    stdDeduction: 14600,
    brackets: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: null, rate: 0.37 },
    ],
    socialRate: 0.0765,
    socialLabel: 'FICA (Social Security 6.2% + Medicare 1.45%)',
    defaultSalary: 80000,
    notes: 'Federal tax only. State income tax varies (0% in TX/FL to 13.3% in CA). Social Security capped at $168,600 of wages for 2024.',
  },
  uk: {
    name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: 'UK',
    authority: 'HM Revenue & Customs (HMRC)',
    authorityUrl: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
    taxYear: '2024-25',
    stdDeduction: 12570,
    brackets: [
      { min: 0, max: 37700, rate: 0.20 },
      { min: 37700, max: 125140, rate: 0.40 },
      { min: 125140, max: null, rate: 0.45 },
    ],
    socialRate: 0.08,
    socialLabel: 'National Insurance Class 1 (8% on £12,570-£50,270, 2% above)',
    defaultSalary: 45000,
    notes: 'Personal allowance £12,570 tapers above £100,000. Scottish taxpayers have different bands.',
  },
  canada: {
    name: 'Canada', currency: 'CAD', symbol: 'CA$', flag: 'CA',
    authority: 'Canada Revenue Agency (CRA)',
    authorityUrl: 'https://www.canada.ca/en/revenue-agency.html',
    taxYear: '2024',
    stdDeduction: 15705,
    brackets: [
      { min: 0, max: 55867, rate: 0.15 },
      { min: 55867, max: 111733, rate: 0.205 },
      { min: 111733, max: 173205, rate: 0.26 },
      { min: 173205, max: 246752, rate: 0.29 },
      { min: 246752, max: null, rate: 0.33 },
    ],
    socialRate: 0.0703,
    socialLabel: 'CPP (5.95%) + EI (1.66%)',
    defaultSalary: 75000,
    notes: 'Federal tax only. Provincial tax varies from 4% (Nunavut) to 25.75% (Newfoundland).',
  },
  india: {
    name: 'India', currency: 'INR', symbol: 'Rs.', flag: 'IN',
    authority: 'Central Board of Direct Taxes (CBDT)',
    authorityUrl: 'https://www.incometaxindia.gov.in',
    taxYear: '2024-25 (New Regime)',
    stdDeduction: 75000,
    brackets: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 700000, rate: 0.05 },
      { min: 700000, max: 1000000, rate: 0.10 },
      { min: 1000000, max: 1200000, rate: 0.15 },
      { min: 1200000, max: 1500000, rate: 0.20 },
      { min: 1500000, max: null, rate: 0.30 },
    ],
    socialRate: 0.12,
    socialLabel: 'EPF employee contribution (12%)',
    defaultSalary: 1200000,
    notes: 'New tax regime (no deductions). Section 87A rebate up to Rs.25,000 if income under Rs.7L.',
  },
  germany: {
    name: 'Germany', currency: 'EUR', symbol: 'EUR ', flag: 'DE',
    authority: 'Bundesministerium der Finanzen (BMF)',
    authorityUrl: 'https://www.bundesfinanzministerium.de',
    taxYear: '2024',
    stdDeduction: 0,
    brackets: [
      { min: 0, max: 11604, rate: 0 },
      { min: 11604, max: 17005, rate: 0.19 },
      { min: 17005, max: 66760, rate: 0.33 },
      { min: 66760, max: 277825, rate: 0.42 },
      { min: 277825, max: null, rate: 0.45 },
    ],
    socialRate: 0.20,
    socialLabel: 'Social contributions (pension 9.3% + health 7.3% + care + unemployment)',
    defaultSalary: 60000,
    notes: 'Progressive zones 2 and 3 use formulas; simplified here with average rates. Solidarity surcharge applies only to high earners.',
  },
  france: {
    name: 'France', currency: 'EUR', symbol: 'EUR ', flag: 'FR',
    authority: 'Direction generale des Finances publiques (DGFiP)',
    authorityUrl: 'https://www.impots.gouv.fr',
    taxYear: '2024',
    stdDeduction: 0,
    brackets: [
      { min: 0, max: 11294, rate: 0 },
      { min: 11294, max: 28797, rate: 0.11 },
      { min: 28797, max: 82341, rate: 0.30 },
      { min: 82341, max: 177106, rate: 0.41 },
      { min: 177106, max: null, rate: 0.45 },
    ],
    socialRate: 0.22,
    socialLabel: 'Social contributions (approximately 22%)',
    defaultSalary: 45000,
    notes: 'Quotient familial (family splitting) can significantly reduce tax for families. This calc assumes single filer.',
  },
  japan: {
    name: 'Japan', currency: 'JPY', symbol: 'Y', flag: 'JP',
    authority: 'National Tax Agency (NTA)',
    authorityUrl: 'https://www.nta.go.jp/english/',
    taxYear: '2024',
    stdDeduction: 480000,
    brackets: [
      { min: 0, max: 1950000, rate: 0.05 },
      { min: 1950000, max: 3300000, rate: 0.10 },
      { min: 3300000, max: 6950000, rate: 0.20 },
      { min: 6950000, max: 9000000, rate: 0.23 },
      { min: 9000000, max: 18000000, rate: 0.33 },
      { min: 18000000, max: 40000000, rate: 0.40 },
      { min: 40000000, max: null, rate: 0.45 },
    ],
    socialRate: 0.15,
    socialLabel: 'Social insurance (pension + health + employment)',
    defaultSalary: 6000000,
    notes: 'Includes 10% local residence tax in some regions. Reconstruction surtax (2.1%) added on top of income tax.',
  },
  singapore: {
    name: 'Singapore', currency: 'SGD', symbol: 'S$', flag: 'SG',
    authority: 'Inland Revenue Authority of Singapore (IRAS)',
    authorityUrl: 'https://www.iras.gov.sg',
    taxYear: 'YA 2024',
    stdDeduction: 0,
    brackets: [
      { min: 0, max: 20000, rate: 0 },
      { min: 20000, max: 30000, rate: 0.02 },
      { min: 30000, max: 40000, rate: 0.035 },
      { min: 40000, max: 80000, rate: 0.07 },
      { min: 80000, max: 120000, rate: 0.115 },
      { min: 120000, max: 160000, rate: 0.15 },
      { min: 160000, max: 200000, rate: 0.18 },
      { min: 200000, max: 240000, rate: 0.19 },
      { min: 240000, max: 280000, rate: 0.195 },
      { min: 280000, max: 320000, rate: 0.20 },
      { min: 320000, max: 500000, rate: 0.22 },
      { min: 500000, max: 1000000, rate: 0.23 },
      { min: 1000000, max: null, rate: 0.24 },
    ],
    socialRate: 0.20,
    socialLabel: 'CPF employee contribution (20% for under-55s)',
    defaultSalary: 84000,
    notes: 'CPF rate varies by age (20% under 55, declines after). No capital gains tax. Very favourable tax regime.',
  },
  'new-zealand': {
    name: 'New Zealand', currency: 'NZD', symbol: 'NZ$', flag: 'NZ',
    authority: 'Inland Revenue (IRD)',
    authorityUrl: 'https://www.ird.govt.nz',
    taxYear: '2024-25',
    stdDeduction: 0,
    brackets: [
      { min: 0, max: 14000, rate: 0.105 },
      { min: 14000, max: 48000, rate: 0.175 },
      { min: 48000, max: 70000, rate: 0.30 },
      { min: 70000, max: 180000, rate: 0.33 },
      { min: 180000, max: null, rate: 0.39 },
    ],
    socialRate: 0.0167,
    socialLabel: 'ACC earners levy (1.67%)',
    defaultSalary: 80000,
    notes: 'KiwiSaver (3% default) is voluntary. No general capital gains tax. No stamp duty.',
  },
}

export function getSalaryTax(country) {
  return SALARY_TAX[country?.toLowerCase()] || SALARY_TAX.australia
}

// ============================================================
// FIRST HOME BUYER SCHEMES — country-specific grants, stamp duty concessions
// Used by FirstHomeBuyerCalculator.jsx
// ============================================================
export const FHB_SCHEMES = {
 AUD: {
 country: 'Australia', flag: '', symbol: '$',
 defaultPrice: 750000, defaultIncome: 130000, defaultSavings: 50000,
 guaranteedDeposit: 5, standardDeposit: 20,
 lmiAt: 20,
 stampDutyByState: {
 NSW: { brackets: [[0,18000,0.0125],[18000,38000,0.015],[38000,103000,0.0175],[103000,387000,0.035],[387000,1300000,0.045],[1300000,Infinity,0.055]], fhbExempt: 800000, fhbConcession: 1000000 },
 VIC: { brackets: [[0,25000,0.014],[25000,130000,0.024],[130000,960000,0.06],[960000,2000000,0.055],[2000000,Infinity,0.065]], fhbExempt: 600000, fhbConcession: 750000 },
 QLD: { brackets: [[0,5000,0],[5000,75000,0.015],[75000,540000,0.035],[540000,1000000,0.045],[1000000,Infinity,0.0575]], fhbExempt: 700000, fhbConcession: 800000 },
 WA: { brackets: [[0,120000,0.019],[120000,150000,0.0285],[150000,360000,0.038],[360000,725000,0.0475],[725000,Infinity,0.0515]], fhbExempt: 500000, fhbConcession: 600000 },
 SA: { brackets: [[0,12000,0.01],[12000,30000,0.02],[30000,50000,0.03],[50000,100000,0.035],[100000,200000,0.04],[200000,300000,0.045],[300000,500000,0.05],[500000,Infinity,0.055]], fhbExempt: 0, fhbConcession: 0 },
 TAS: { brackets: [[0,3000,0],[3000,25000,0.015],[25000,75000,0.0225],[75000,200000,0.035],[200000,375000,0.04],[375000,725000,0.0425],[725000,Infinity,0.045]], fhbExempt: 750000, fhbConcession: 750000 },
 ACT: { brackets: [[0,200000,0.004],[200000,300000,0.014],[300000,500000,0.024],[500000,750000,0.033],[750000,1000000,0.043],[1000000,1455000,0.0545],[1455000,Infinity,0.0675]], fhbExempt: 1020000, fhbConcession: 1020000 },
 NT: { brackets: [[0,525000,0.0495],[525000,Infinity,0.0495]], fhbExempt: 0, fhbConcession: 0 },
 },
 fhogByState: { NSW: 10000, VIC: 10000, QLD: 30000, WA: 10000, SA: 15000, TAS: 30000, ACT: 0, NT: 10000 },
 fhogNewBuildOnly: true,
 fhss: { maxRelease: 50000, perYearCap: 15000 },
 guarantee: { priceCapCity: 900000, priceCapRegional: 750000, singleIncomeCap: 125000, coupleIncomeCap: 200000 },
 hasScheme: true,
 },
 USD: {
 country: 'United States', flag: '', symbol: '$',
 defaultPrice: 400000, defaultIncome: 90000, defaultSavings: 30000,
 guaranteedDeposit: 0, standardDeposit: 20,
 lmiAt: 20,
 hasScheme: true,
 schemes: {
 fha: { depositPct: 3.5, minScore: 580, upfrontMip: 0.0175, annualMip: 0.0055 },
 va: { depositPct: 0, fundingFee: 0.0215, exempt: false },
 usda: { depositPct: 0, guaranteeFee: 0.01 },
 conventional97: { depositPct: 3, pmi: true },
 },
 },
 GBP: {
 country: 'United Kingdom', flag: '', symbol: '',
 defaultPrice: 300000, defaultIncome: 60000, defaultSavings: 40000,
 guaranteedDeposit: 5, standardDeposit: 10,
 lmiAt: 90,
 hasScheme: true,
 schemes: {
 lifetimeISA: { bonusPct: 25, maxBonusPerYear: 1000, maxPropertyPrice: 450000 },
 helpToBuy: { equityLoanPct: 20, londonExtra: 20, interestFreeYears: 5, maxPropertyPrice: 600000 },
 sharedOwnership: { minSharePct: 25, maxSharePct: 75 },
 stampDutyRelief: { fhbExemptUpTo: 425000, fhbMaxPrice: 625000 },
 },
 },
 CAD: {
 country: 'Canada', flag: '', symbol: 'CA$',
 defaultPrice: 600000, defaultIncome: 100000, defaultSavings: 60000,
 guaranteedDeposit: 5, standardDeposit: 20,
 lmiAt: 20,
 hasScheme: true,
 schemes: {
 rrspHBP: { maxWithdrawal: 35000, repayYears: 15 },
 fthbi: { equityPct: 5, newBuildPct: 10, maxPrice: 722000, maxIncome: 150000 },
 cmhcTiers: [
 { maxLtv: 95, premium: 0.0400 },
 { maxLtv: 90, premium: 0.0310 },
 { maxLtv: 85, premium: 0.0280 },
 { maxLtv: 80, premium: 0.0240 },
 ],
 },
 },
 INR: {
 country: 'India', flag: '', symbol: '',
 defaultPrice: 5000000, defaultIncome: 1500000, defaultSavings: 1000000,
 guaranteedDeposit: 10, standardDeposit: 20,
 lmiAt: 20,
 hasScheme: true,
 schemes: {
 pmay: { interestSubsidy: 0.065, maxLoanAmount: 6000000, incomeCap: 1800000 },
 section80EEA: { interestDeduction: 150000 },
 section80C: { principalDeduction: 150000 },
 },
 },


 SGD: {
 country: 'Singapore', flag: '', symbol: 'S$',
 defaultPrice: 800000, defaultIncome: 120000, defaultSavings: 160000,
 guaranteedDeposit: 20, standardDeposit: 25,
 lmiAt: 20,
 hasScheme: true,
 schemes: {
 hdbGrant: { singles: 40000, couples: 80000 },
 cpfHousing: { usablePct: 1.0 },
 },
 },
 MYR: {
 country: 'Malaysia', flag: '', symbol: 'RM',
 defaultPrice: 500000, defaultIncome: 100000, defaultSavings: 50000,
 guaranteedDeposit: 10, standardDeposit: 20,
 lmiAt: 20,
 hasScheme: true,
 schemes: {
 myDeposit: { maxAssist: 30000, priceCap: 500000 },
 },
 },


 EUR: {
  country: 'Europe', flag: '', symbol: '\u20AC',
  defaultPrice: 400000, defaultIncome: 70000, defaultSavings: 60000,
  guaranteedDeposit: 10, standardDeposit: 20,
  lmiAt: 20,
  hasScheme: false,
  schemes: {},
 },

 PKR: {
  country: 'Pakistan', flag: '', symbol: '\u20A8',
  defaultPrice: 15000000, defaultIncome: 3000000, defaultSavings: 2000000,
  guaranteedDeposit: 15, standardDeposit: 25,
  lmiAt: 20,
  hasScheme: true,
  schemes: {
   apnaGhar: { markupRate: 0.05, termYears: 20 },
  },
 },

 NOK: {
  country: 'Norway', flag: '', symbol: 'kr',
  defaultPrice: 4000000, defaultIncome: 700000, defaultSavings: 500000,
  guaranteedDeposit: 15, standardDeposit: 25,
  lmiAt: 20,
  hasScheme: true,
  schemes: {
   startlan: { maxLoan: 3000000, incomeCap: 600000 },
  },
 },

 PLN: {
  country: 'Poland', flag: '', symbol: 'zl',
  defaultPrice: 600000, defaultIncome: 120000, defaultSavings: 100000,
  guaranteedDeposit: 10, standardDeposit: 20,
  lmiAt: 20,
  hasScheme: true,
  schemes: {
   mieszkanieNaStart: { subsidizedYears: 10, incomeCap: 120000 },
  },
 },

 IDR: {
  country: 'Indonesia', flag: '', symbol: 'Rp',
  defaultPrice: 1500000000, defaultIncome: 300000000, defaultSavings: 300000000,
  guaranteedDeposit: 10, standardDeposit: 20,
  lmiAt: 20,
  hasScheme: true,
  schemes: {
   flpp: { fixedRate: 0.05, termYears: 20 },
  },
 },}

export function getFhbSchemes(currency) {
  return FHB_SCHEMES[currency] || FHB_SCHEMES.AUD
}


// ============================================================
// SELL VS REFINANCE — country-specific CGT and depreciation rules
// Used by SellVsRefinanceCalculator.jsx
// ============================================================
export const SELL_REFI_TAX = {
  AUD: {
    country: 'Australia', symbol: '$',
    cgtRate: 0.235, // 50% discount, top marginal ~47% = ~23.5% effective
    primaryResidenceExempt: true,
    investmentCGT: true,
    depreciationRecapture: false, // AU uses CGT, not recapture
  },
  USD: {
    country: 'United States', symbol: '$',
    cgtRate: 0.20, // Long-term capital gains top rate
    primaryResidenceExempt: true,
    primaryExemptSingle: 250000,
    primaryExemptCouple: 500000,
    investmentCGT: true,
    depreciationRecapture: true,
    depreciationRecaptureRate: 0.25,
  },
  GBP: {
    country: 'United Kingdom', symbol: '£',
    cgtRate: 0.24, // 2024+ rate for residential
    primaryResidenceExempt: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  CAD: {
    country: 'Canada', symbol: 'CA$',
    cgtRate: 0.165, // 50% inclusion * ~33% top rate
    primaryResidenceExempt: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  INR: {
    country: 'India', symbol: '₹',
    cgtRate: 0.20, // LTCG with indexation (2024 changes)
    primaryResidenceExempt: false,
    section54Exempt: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  SGD: {
    country: 'Singapore', symbol: 'S$',
    cgtRate: 0,
    primaryResidenceExempt: true,
    ssdRate: 0.04, // Seller's Stamp Duty if sold within 3 years
    investmentCGT: false,
    depreciationRecapture: false,
  },
  MYR: {
    country: 'Malaysia', symbol: 'RM',
    cgtRate: 0.10, // RPGT for citizens (holding 3-5 years)
    primaryResidenceExempt: false,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  EUR: {
    country: 'Europe', symbol: '€',
    cgtRate: 0.20, // varies by country
    primaryResidenceExempt: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  JPY: {
    country: 'Japan', symbol: '¥',
    cgtRate: 0.20,
    primaryResidenceExempt: true,
    primaryDeduction: 30000000,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  NOK: {
    country: 'Norway', symbol: 'kr',
    cgtRate: 0.22,
    primaryResidenceExempt: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  PLN: {
    country: 'Poland', symbol: 'zł',
    cgtRate: 0.19,
    primaryResidenceExempt: false,
    fiveYearRule: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  PKR: {
    country: 'Pakistan', symbol: '₨',
    cgtRate: 0.15, // depends on holding period
    primaryResidenceExempt: false,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  IDR: {
    country: 'Indonesia', symbol: 'Rp',
    cgtRate: 0.025,
    primaryResidenceExempt: false,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  CHF: {
    country: 'Switzerland', symbol: 'CHF',
    cgtRate: 0.12,
    primaryResidenceExempt: false,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  SEK: {
    country: 'Sweden', symbol: 'kr',
    cgtRate: 0.22,
    primaryResidenceExempt: false,
    deferredTax: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
  DKK: {
    country: 'Denmark', symbol: 'kr',
    cgtRate: 0.22,
    primaryResidenceExempt: true,
    investmentCGT: true,
    depreciationRecapture: false,
  },
}

export function getSellRefiTax(currency) {
  return SELL_REFI_TAX[currency] || SELL_REFI_TAX.AUD
}

// ============================================================
// CURRENCY → COUNTRY SLUG MAP
// Used to resolve official tax authority for each calculator
// ============================================================
export const CURRENCY_TO_COUNTRY = {
  AUD: 'australia', USD: 'usa', GBP: 'uk', CAD: 'canada', INR: 'india',
  SGD: 'singapore', MYR: 'malaysia', JPY: 'japan', IDR: 'indonesia', PKR: 'pakistan',
  EUR: 'france', CHF: 'switzerland', SEK: 'sweden', DKK: 'denmark', NOK: 'norway', PLN: 'poland',
}

export function getAuthorityByCurrency(currency) {
  const slug = CURRENCY_TO_COUNTRY[currency]
  return slug ? getTaxMeta(slug) : null
}