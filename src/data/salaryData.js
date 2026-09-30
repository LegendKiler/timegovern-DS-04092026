// Salary tax data for all supported countries.
// Each entry provides: name, flag, currency, authority, PDF link, calculator config, and 3 article slugs.

export const COUNTRIES = {
  usa: {
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    region: 'North America',
    authority: { name: 'Internal Revenue Service', url: 'https://www.irs.gov/' },
    pdfUrl: 'https://www.irs.gov/publications/p15',
    taxYear: '2025',
    taxFreeAllowance: 14600,
    brackets: [
      { min: 0,       max: 11600,   rate: 0.10 },
      { min: 11600,   max: 47150,   rate: 0.12 },
      { min: 47150,   max: 100525,  rate: 0.22 },
      { min: 100525,  max: 191950,  rate: 0.24 },
      { min: 191950,  max: 243725,  rate: 0.32 },
      { min: 243725,  max: 609350,  rate: 0.35 },
      { min: 609350,  max: Infinity, rate: 0.37 },
    ],
    hasStateInput: true,
    hasPreTax: true,
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    region: 'Western Europe',
    authority: { name: 'HMRC', url: 'https://www.gov.uk/income-tax-rates' },
    pdfUrl: 'https://www.gov.uk/government/publications/rates-and-allowances-income-tax',
    taxYear: '2025/26',
    taxFreeAllowance: 12570,
    // Personal allowance taper £1 for every £2 above £100k
    brackets: [
      { min: 0,     max: 37700,   rate: 0.20 },
      { min: 37700, max: 150000,  rate: 0.40 },   // rough simplification
      { min: 150000, max: Infinity, rate: 0.45 },
    ],
    nationalInsurance: {
      primaryThreshold: 12570,
      upperEarningsLimit: 50270,
      mainRate: 0.08,
      upperRate: 0.02,
    },
    hasStateInput: false,
    hasPreTax: true,
  },
  ireland: {
    name: 'Ireland',
    flag: '🇮🇪',
    currency: 'EUR',
    symbol: '€',
    region: 'Western Europe',
    authority: { name: 'Revenue Commissioners', url: 'https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/index.aspx' },
    pdfUrl: 'https://www.revenue.ie/en/tax-professionals/tdm/income-tax-capital-gains-tax-corporation-tax/',
    taxYear: '2025',
    taxFreeAllowance: 18000,
    brackets: [
      { min: 0,     max: 44000,   rate: 0.20 },
      { min: 44000, max: Infinity, rate: 0.40 },
    ],
    usc: {
      brackets: [
        { max: 12012,   rate: 0.005 },
        { max: 25760,   rate: 0.02 },
        { max: 70044,   rate: 0.04 },
        { max: Infinity, rate: 0.08 },
      ],
    },
    prsi: 0.0425,
    hasStateInput: false,
    hasPreTax: true,
  },
}

// Generic progressive bracket calculator
export function calcProgressive(income, brackets) {
  let tax = 0
  for (const b of brackets) {
    if (income > b.min) {
      const taxable = Math.min(income, b.max) - b.min
      tax += taxable * b.rate
    }
  }
  return tax
}

// Calculate take-home for a country
export function calculateTakeHome(countryCode, gross, preTax) {
  const c = COUNTRIES[countryCode]
  if (!c) return null
  const taxable = Math.max(0, gross - preTax - (c.taxFreeAllowance || 0))
  const incomeTax = calcProgressive(taxable, c.brackets || [])
  let ni = 0
  if (c.nationalInsurance) {
    const ni_ = c.nationalInsurance
    if (gross > ni_.primaryThreshold) {
      ni += (Math.min(gross, ni_.upperEarningsLimit) - ni_.primaryThreshold) * ni_.mainRate
    }
    if (gross > ni_.upperEarningsLimit) {
      ni += (gross - ni_.upperEarningsLimit) * ni_.upperRate
    }
  }
  let usc = 0
  if (c.usc) {
    usc = calcProgressive(gross - preTax, c.usc.brackets)
  }
  let prsi = 0
  if (c.prsi) {
    prsi = (gross - preTax) * c.prsi
  }
  const totalTax = incomeTax + ni + usc + prsi + medicare + acc + cpp + ei + gosi + grsia + localTax + socialInsurance + gosi + grsia
  const net = gross - preTax - totalTax
  return {
    gross,
    incomeTax,
    ni,
    usc,
    prsi,
    totalTax,
    net,
    effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0,
    monthlyNet: net / 12,
  }
}