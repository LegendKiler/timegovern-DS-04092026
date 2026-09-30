// ============================================================
// UNIVERSAL MORTGAGE COUNTRY CONFIG
// Add a new country here → it automatically works everywhere
// ============================================================

export const COUNTRIES = {
  // ============ EUROPE ============
  france: {
    name: 'France', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€',
    locale: 'fr-FR', compounding: 'monthly',
    gradient: 'from-blue-600 via-white to-red-600',
    hub: 'europe',
    defaultRate: 3.5, defaultYears: 20, defaultLTV: 80,
    stampDuty: { name: 'Frais de notaire', rateRange: [7.0, 8.0], notes: 'Includes transfer duty, notary fees, and registration' },
    loanTypes: ['Fixed rate', 'Variable rate', 'Capped rate'],
    taxAuthority: { name: 'DGFiP', url: 'https://www.impots.gouv.fr' },
    faqs: [
      { q: 'How much are the closing costs in France?', a: 'Frais de notaire total around 7-8% of the purchase price for existing properties, or 2-3% for new builds. This covers transfer duty, notary fees, and registration.' },
      { q: 'What is the typical French mortgage rate?', a: 'As of 2026, fixed rates average 3-3.5% for 20-year terms. Variable rates are typically tied to the Euribor.' },
      { q: 'Can non-residents get a French mortgage?', a: 'Yes. Non-residents can borrow up to 80% LTV from French banks, though the process takes longer and documentation requirements are stricter.' },
    ],
  },

  germany: {
    name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€',
    locale: 'de-DE', compounding: 'monthly',
    gradient: 'from-black via-red-600 to-yellow-400',
    hub: 'europe',
    defaultRate: 3.8, defaultYears: 25, defaultLTV: 80,
    stampDuty: { name: 'Grunderwerbsteuer', rateRange: [3.5, 6.5], notes: 'Varies by state (Bundesland) from 3.5% to 6.5%' },
    loanTypes: ['Annuitätendarlehen (annuity)', 'Festzins (fixed)', 'Volltilger (full repayment)'],
    taxAuthority: { name: 'BZSt', url: 'https://www.bzst.de' },
    faqs: [
      { q: 'What is Grunderwerbsteuer?', a: 'German property transfer tax, ranging from 3.5% to 6.5% depending on state. Bavaria is lowest at 3.5%, Brandenburg and NRW are highest at 6.5%.' },
      { q: 'What is Sondertilgung?', a: 'Free annual extra repayment of typically 5% of the original loan amount. Standard in German mortgages — take advantage of it to pay off faster without penalty.' },
      { q: 'Are German mortgages fixed or variable?', a: 'Most German mortgages are fixed for 5-15 years, then renegotiated. Full-term fixed rates (20-30 years) are available but less common.' },
    ],
  },

  spain: {
    name: 'Spain', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€',
    locale: 'es-ES', compounding: 'monthly',
    gradient: 'from-red-600 via-yellow-400 to-red-600',
    hub: 'europe',
    defaultRate: 3.6, defaultYears: 25, defaultLTV: 80,
    stampDuty: { name: 'ITP + AJD', rateRange: [6.0, 10.0], notes: 'ITP 6-10% (varies by region) plus AJD 0.5-1.5%' },
    loanTypes: ['Hipoteca fija', 'Hipoteca variable', 'Hipoteca mixta'],
    taxAuthority: { name: 'AEAT', url: 'https://sede.agenciatributaria.gob.es' },
    faqs: [
      { q: 'How much are closing costs in Spain?', a: 'ITP (property transfer tax) is 6-10% depending on region, plus AJD stamp duty 0.5-1.5%, plus notary and registry ~1-2%. Total typically 10-12%.' },
      { q: 'What is the max LTV for Spanish mortgages?', a: '80% for residents, 60-70% for non-residents. Some banks offer higher LTV with private mortgage insurance.' },
      { q: 'Are Spanish mortgages fixed or variable?', a: 'Historically variable (Euribor-linked), but fixed-rate mortgages have grown in popularity since 2019 and now make up 70%+ of new loans.' },
    ],
  },

  italy: {
    name: 'Italy', flag: '🇮🇹', currency: 'EUR', currencySymbol: '€',
    locale: 'it-IT', compounding: 'monthly',
    gradient: 'from-green-600 via-white to-red-600',
    hub: 'europe',
    defaultRate: 3.9, defaultYears: 25, defaultLTV: 80,
    stampDuty: { name: 'Imposta di registro', rateRange: [2.0, 9.0], notes: '2% for prima casa (main residence), 9% for second homes' },
    loanTypes: ['Mutuo a tasso fisso', 'Mutuo a tasso variabile', 'Mutuo a tasso misto'],
    taxAuthority: { name: 'Agenzia Entrate', url: 'https://www.agenziaentrate.gov.it' },
    faqs: [
      { q: 'How does Italian property tax work?', a: 'Imposta di registro is 2% for main residence (prima casa) or 9% for second homes. Plus a fixed €50 + 1% if the seller is a company.' },
      { q: 'What is the substitute tax?', a: 'A 0.25% imposta sostitutiva on the mortgage amount is often waived or paid by the bank for first homes.' },
      { q: 'What LTV can I get in Italy?', a: 'Typically 80% for main residence. Some banks offer up to 100% for young buyers (under 36) with the Consap guarantee.' },
    ],
  },

  netherlands: {
    name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', currencySymbol: '€',
    locale: 'nl-NL', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-blue-600',
    hub: 'europe',
    defaultRate: 4.0, defaultYears: 30, defaultLTV: 100,
    stampDuty: { name: 'Overdrachtsbelasting', rateRange: [0.0, 10.4], notes: '0% for first home under 35 (up to €510K), 2% for owner-occupied, 10.4% for investors' },
    loanTypes: ['Annuïteitenhypotheek', 'Lineaire hypotheek', 'Aflossingsvrij'],
    taxAuthority: { name: 'Belastingdienst', url: 'https://www.belastingdienst.nl' },
    faqs: [
      { q: 'What is NHG?', a: 'Nationale Hypotheek Garantie — a government-backed guarantee that reduces your interest rate and covers lenders if you can\'t pay. Max purchase price €435,000 (2026).' },
      { q: 'Is mortgage interest tax-deductible?', a: 'Yes. For 30 years, mortgage interest is deductible in Box 1 (owner-occupied). New loans must be annuity or linear to qualify.' },
      { q: 'Can I get 100% LTV in the Netherlands?', a: 'Yes. Dutch mortgages allow up to 100% LTV for the purchase price. Costs like transfer tax and fees must be paid from savings.' },
    ],
  },

  switzerland: {
    name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', currencySymbol: 'CHF',
    locale: 'de-CH', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-red-600',
    hub: 'europe',
    defaultRate: 2.0, defaultYears: 25, defaultLTV: 80,
    stampDuty: { name: 'Handänderungssteuer', rateRange: [1.0, 3.3], notes: 'Varies by canton (1-3.3%)' },
    loanTypes: ['Festhypothek', 'SARON-Hypothek', 'Variable Hypothek'],
    taxAuthority: { name: 'EFD', url: 'https://www.efd.admin.ch' },
    faqs: [
      { q: 'Why are Swiss mortgages interest-only?', a: 'Swiss mortgages are typically structured as interest-only on the second tranche (above 65% LTV). Only the first tranche requires amortization.' },
      { q: 'Can I use my pension to buy a house?', a: 'Yes. You can withdraw or pledge 2nd and 3rd pillar pension funds to buy a home — up to the full amount for owner-occupied property.' },
      { q: 'What is the amortization requirement?', a: 'You must amortize down to 65% LTV within 15 years (or by retirement age). The 65% balance can remain interest-only.' },
    ],
  },

  sweden: {
    name: 'Sweden', flag: '🇸🇪', currency: 'SEK', currencySymbol: 'kr',
    locale: 'sv-SE', compounding: 'monthly',
    gradient: 'from-blue-600 via-yellow-400 to-blue-600',
    hub: 'europe',
    defaultRate: 4.2, defaultYears: 30, defaultLTV: 85,
    stampDuty: { name: 'Stämpelskatt', rateRange: [1.5, 4.25], notes: '1.5% for individuals, 4.25% for companies' },
    loanTypes: ['Bundet lån (fixed)', 'Rörligt lån (variable)'],
    taxAuthority: { name: 'Skatteverket', url: 'https://www.skatteverket.se' },
    faqs: [
      { q: 'What is the Swedish amortization rule?', a: 'Mortgages above 50% LTV must amortize at least 1% per year. Above 70% LTV, at least 2%. This is a legal requirement since 2016.' },
      { q: 'What LTV is allowed in Sweden?', a: 'Maximum 85% LTV. The 15% down payment must come from savings — no loans allowed.' },
      { q: 'Is there a mortgage interest deduction?', a: 'Yes. 30% tax deduction on interest up to 100,000 SEK, then 21% above that.' },
    ],
  },

  ireland: {
    name: 'Ireland', flag: '🇮🇪', currency: 'EUR', currencySymbol: '€',
    locale: 'en-IE', compounding: 'monthly',
    gradient: 'from-green-600 via-white to-orange-500',
    hub: 'europe',
    defaultRate: 4.2, defaultYears: 30, defaultLTV: 90,
    stampDuty: { name: 'Stamp Duty', rateRange: [1.0, 2.0], notes: '1% up to €1M, 2% above' },
    loanTypes: ['Fixed rate', 'Variable rate', 'Tracker'],
    taxAuthority: { name: 'Revenue', url: 'https://www.revenue.ie' },
    faqs: [
      { q: 'What is the Central Bank lending rule?', a: 'First-time buyers can borrow 4x income with 10% deposit (90% LTV). Second-time buyers: 3.5x income, 20% deposit. Exceptions exist above these limits.' },
      { q: 'Can I get a 100% mortgage in Ireland?', a: 'No. The minimum deposit is 10% for first-time buyers and 20% for others.' },
      { q: 'What is a tracker mortgage?', a: 'A mortgage that follows the ECB rate plus a fixed margin. Popular before 2008 but rarely offered by lenders today.' },
    ],
  },

  portugal: {
    name: 'Portugal', flag: '🇵🇹', currency: 'EUR', currencySymbol: '€',
    locale: 'pt-PT', compounding: 'monthly',
    gradient: 'from-green-600 via-red-600 to-red-600',
    hub: 'europe',
    defaultRate: 3.8, defaultYears: 30, defaultLTV: 80,
    stampDuty: { name: 'IMT + Imposto do Selo', rateRange: [0.8, 8.0], notes: 'IMT 0-8% by bracket, plus 0.8% stamp duty' },
    loanTypes: ['Taxa fixa', 'Taxa variável', 'Taxa mista'],
    taxAuthority: { name: 'AT', url: 'https://www.portaldasfinancas.gov.pt' },
    faqs: [
      { q: 'What are typical Portuguese closing costs?', a: 'IMT is 0-8% (with a young buyer exemption for main residence), plus 0.8% stamp duty, plus notary and registry ~€1,500.' },
      { q: 'Can I get 100% LTV in Portugal?', a: 'No, maximum is 80% for residents and 60-70% for non-residents.' },
      { q: 'Is Portugal popular with foreign buyers?', a: 'Yes. Golden Visa (until 2023) and NHR tax regime made Portugal very popular. Both programs have been modified but interest remains strong.' },
    ],
  },

  poland: {
    name: 'Poland', flag: '🇵🇱', currency: 'PLN', currencySymbol: 'zł',
    locale: 'pl-PL', compounding: 'monthly',
    gradient: 'from-white via-red-600 to-red-600',
    hub: 'europe',
    defaultRate: 6.5, defaultYears: 25, defaultLTV: 80,
    stampDuty: { name: 'PCC + Taksa notarialna', rateRange: [2.0, 3.0], notes: 'PCC 2% plus notary fees ~1%' },
    loanTypes: ['Stała stopa', 'Zmienna stopa'],
    taxAuthority: { name: 'KAS', url: 'https://www.gov.pl/web/kas' },
    faqs: [
      { q: 'What is PCC in Poland?', a: 'PCC (Powszechne Poświadczenie Cywilnoprawne) is a 2% transfer tax on second-hand property purchases.' },
      { q: 'Are Polish mortgages fixed or variable?', a: 'Historically variable (WIBOR-linked), but fixed-rate mortgages have grown since 2022 and now dominate new lending.' },
      { q: 'Can foreigners buy property in Poland?', a: 'EU citizens can buy without restrictions. Non-EU citizens need a permit from the Ministry of Interior.' },
    ],
  },

  belgium: {
    name: 'Belgium', flag: '🇧🇪', currency: 'EUR', currencySymbol: '€',
    locale: 'nl-BE', compounding: 'monthly',
    gradient: 'from-black via-yellow-400 to-red-600',
    hub: 'europe',
    defaultRate: 3.7, defaultYears: 25, defaultLTV: 90,
    stampDuty: { name: 'Registration duty', rateRange: [2.0, 12.5], notes: '2% Flanders, 5% Wallonia (own home), 12.5% Brussels' },
    loanTypes: ['Vaste rente', 'Variabele rente'],
    taxAuthority: { name: 'FPS Finance', url: 'https://finance.belgium.be' },
    faqs: [
      { q: 'Why do Belgian registration fees vary so much?', a: 'Registration duty is set by region: 2% in Flanders (was 6% before 2022), 5% in Wallonia for own home, 12.5% in Brussels. Major difference when choosing where to buy.' },
      { q: 'What is the typical Belgian LTV?', a: 'Up to 90% for young buyers, 80% standard. Some banks still offer 100% for strong profiles.' },
      { q: 'Are Belgian mortgages fixed or variable?', a: 'Long-term fixed (20-25 years) is most popular. Variable rates are less common than in other EU countries.' },
    ],
  },

  austria: {
    name: 'Austria', flag: '🇦🇹', currency: 'EUR', currencySymbol: '€',
    locale: 'de-AT', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-red-600',
    hub: 'europe',
    defaultRate: 4.0, defaultYears: 25, defaultLTV: 80,
    stampDuty: { name: 'Grunderwerbsteuer', rateRange: [3.5, 3.5], notes: '3.5% flat, plus 1.1% registration' },
    loanTypes: ['Fixzins', 'Variabler Zins'],
    taxAuthority: { name: 'BMF', url: 'https://www.bmf.gv.at' },
    faqs: [
      { q: 'What are the Austrian purchase costs?', a: 'Grunderwerbsteuer 3.5% + registration 1.1% + notary ~1.5% + agent ~3% = about 9-10% total.' },
      { q: 'What LTV is standard in Austria?', a: '80% LTV is standard. Since 2022, KIM-V regulation caps LTV at 80% and debt-to-income at 35%.' },
      { q: 'Are Austrian mortgages fixed or variable?', a: 'Most common: 10-20 year fixed. Full-term fixed (25+ years) is available but less popular.' },
    ],
  },

  denmark: {
    name: 'Denmark', flag: '🇩🇰', currency: 'DKK', currencySymbol: 'kr',
    locale: 'da-DK', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-red-600',
    hub: 'europe',
    defaultRate: 4.0, defaultYears: 30, defaultLTV: 80,
    stampDuty: { name: 'Tinglysningsafgift', rateRange: [0.6, 1.5], notes: '0.6% of mortgage deed + 1.5% of property value' },
    loanTypes: ['Fastforrentet lån', 'Variabelt lån (F1-F10)', 'Afdragsfrit lån'],
    taxAuthority: { name: 'Skattestyrelsen', url: 'https://www.skat.dk' },
    faqs: [
      { q: 'What is the Danish mortgage bond system?', a: 'Denmark has a unique system where mortgages are funded by bonds. Borrowers effectively sell bonds to investors — this keeps rates low and predictable.' },
      { q: 'Can I get a 100% mortgage in Denmark?', a: 'No. Top-up loans (boliglån) can go above 80%, but the main mortgage is capped at 80% LTV.' },
      { q: 'What is afdragsfrit?', a: 'Interest-only mortgage. Very common in Denmark, especially for older borrowers or those with high equity.' },
    ],
  },

  norway: {
    name: 'Norway', flag: '🇳🇴', currency: 'NOK', currencySymbol: 'kr',
    locale: 'nb-NO', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-blue-600',
    hub: 'europe',
    defaultRate: 5.5, defaultYears: 25, defaultLTV: 85,
    stampDuty: { name: 'Dokumentavgift', rateRange: [2.5, 2.5], notes: '2.5% of property value for freehold' },
    loanTypes: ['Fastrente', 'Flytende rente'],
    taxAuthority: { name: 'Skatteetaten', url: 'https://www.skatteetaten.no' },
    faqs: [
      { q: 'What is the Norwegian lending rule?', a: 'Utlånsforskriften: max 85% LTV, max 5x gross income, and stress test at rate + 3%. Oslo has additional restrictions.' },
      { q: 'Can I borrow more than 5x income?', a: 'Banks have a small flexibility quota (10% of lending volume) to exceed limits, but the 5x rule is strict.' },
      { q: 'Is mortgage interest tax-deductible?', a: 'Yes. 22% tax deduction on all mortgage interest.' },
    ],
  },

  // ============ ASIA-PACIFIC ============
  japan: {
    name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥',
    locale: 'ja-JP', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-red-600',
    hub: 'asia-pacific',
    defaultRate: 1.5, defaultYears: 35, defaultLTV: 90,
    stampDuty: { name: '登録免許税 + 不動産取得税', rateRange: [1.5, 3.0], notes: 'Registration tax ~1.5%, acquisition tax 3% (reduced for new builds)' },
    loanTypes: ['Flat 35', '変動金利 (variable)', '固定金利 (fixed)'],
    taxAuthority: { name: 'NTA', url: 'https://www.nta.go.jp' },
    faqs: [
      { q: 'Why are Japanese mortgage rates so low?', a: 'The Bank of Japan has kept rates near zero for decades. Variable rates are ~0.4-0.6%, 10-year fixed ~1.0-1.5%, Flat 35 ~1.5-2%.' },
      { q: 'What is Flat 35?', a: 'A government-backed 35-year fixed-rate mortgage offered by the Japan Housing Finance Agency. Rate stays fixed for the entire 35 years.' },
      { q: 'Can foreigners get Japanese mortgages?', a: 'Yes, with permanent residency it is straightforward. Without PR, options are limited but some banks (Suruga, Shinsei) lend to foreign residents.' },
    ],
  },

  singapore: {
    name: 'Singapore', flag: '🇸🇬', currency: 'SGD', currencySymbol: 'S$',
    locale: 'en-SG', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-red-600',
    hub: 'asia-pacific',
    defaultRate: 3.0, defaultYears: 25, defaultLTV: 75,
    stampDuty: { name: 'BSD + ABSD', rateRange: [1.0, 60.0], notes: 'BSD 1-6%, plus ABSD 20% for citizens (2nd), 60% for foreigners' },
    loanTypes: ['HDB loan', 'Bank loan (fixed)', 'Bank loan (floating)'],
    taxAuthority: { name: 'IRAS', url: 'https://www.iras.gov.sg' },
    faqs: [
      { q: 'What is ABSD?', a: 'Additional Buyer\'s Stamp Duty. For foreigners, it is 60%. For Singapore citizens buying a 2nd property, 20%. Huge factor in property decisions.' },
      { q: 'What is TDSR?', a: 'Total Debt Servicing Ratio — total monthly debt payments capped at 55% of gross monthly income. Applies to all property loans.' },
      { q: 'Can I use CPF for a mortgage?', a: 'Yes. CPF Ordinary Account can be used for down payment and monthly mortgage payments for both HDB and private property.' },
    ],
  },

  malaysia: {
    name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', currencySymbol: 'RM',
    locale: 'ms-MY', compounding: 'monthly',
    gradient: 'from-blue-600 via-yellow-400 to-red-600',
    hub: 'asia-pacific',
    defaultRate: 4.3, defaultYears: 30, defaultLTV: 90,
    stampDuty: { name: 'Duti Setem', rateRange: [1.0, 4.0], notes: '1% first RM100K, 2% next RM400K, 3% next RM500K, 4% above' },
    loanTypes: ['Fixed rate', 'Variable (BR-linked)', 'Semi-flexi', 'Full-flexi'],
    taxAuthority: { name: 'LHDN', url: 'https://www.hasil.gov.my' },
    faqs: [
      { q: 'What is the max tenure in Malaysia?', a: 'Maximum 35 years or until age 70 (whichever is earlier). Most common is 30 years.' },
      { q: 'Can foreigners buy property in Malaysia?', a: 'Yes, but minimum price thresholds apply (typically RM1M+ depending on state). MM2H visa holders have relaxed rules.' },
      { q: 'What is BR?', a: 'Base Rate — the reference rate set by each bank. Your mortgage rate is BR + spread. Replaced BLR in 2015.' },
    ],
  },

  indonesia: {
    name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', currencySymbol: 'Rp',
    locale: 'id-ID', compounding: 'monthly',
    gradient: 'from-red-600 via-white to-red-600',
    hub: 'asia-pacific',
    defaultRate: 10.5, defaultYears: 15, defaultLTV: 80,
    stampDuty: { name: 'BPHTB + PPN', rateRange: [5.0, 16.0], notes: 'BPHTB 5% buyer, PPN 11-16% on new builds' },
    loanTypes: ['KPR fixed', 'KPR floating', 'KPR mixed'],
    taxAuthority: { name: 'DJP', url: 'https://www.pajak.go.id' },
    faqs: [
      { q: 'What is KPR?', a: 'Kredit Pemilikan Rumah — Indonesian mortgage. Rates are typically fixed for the first 1-3 years, then floating (tied to BI rate + margin).' },
      { q: 'What is BPHTB?', a: 'Bea Perolehan Hak atas Tanah dan Bangunan — 5% acquisition tax paid by the buyer, on top of the purchase price.' },
      { q: 'Can foreigners buy property in Indonesia?', a: 'Foreigners cannot own freehold land, but can buy "Right to Use" (Hak Pakai) and strata title apartments. New rules (2023) expanded foreign ownership.' },
    ],
  },

  pakistan: {
    name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', currencySymbol: '₨',
    locale: 'en-PK', compounding: 'monthly',
    gradient: 'from-green-700 via-white to-green-700',
    hub: 'asia-pacific',
    defaultRate: 20.5, defaultYears: 20, defaultLTV: 85,
    stampDuty: { name: 'Stamp duty + registration', rateRange: [3.0, 5.0], notes: 'Varies by province: 3% (Punjab), 4% (Sindh), 5% (KP)' },
    loanTypes: ['KIBOR-linked', 'Fixed rate', 'Diminishing Musharakah (Islamic)'],
    taxAuthority: { name: 'FBR', url: 'https://www.fbr.gov.pk' },
    faqs: [
      { q: 'What is KIBOR?', a: 'Karachi Interbank Offered Rate. Most Pakistani mortgages are KIBOR + 2-4% spread. Rates reset quarterly or semi-annually.' },
      { q: 'What is Diminishing Musharakah?', a: 'Sharia-compliant mortgage where the bank and customer co-own the property. Customer gradually buys out the bank\'s share.' },
      { q: 'Can overseas Pakistanis get a mortgage?', a: 'Yes, through specialized non-resident products. Requires a local co-signer in most cases.' },
    ],
  },
}

export const HUBS = {
  europe: {
    name: 'Europe',
    slug: 'europe',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    countries: [
      'france','germany','spain','italy','netherlands','switzerland','sweden','ireland',
      'portugal','poland','belgium','austria','denmark','norway'
    ],
  },
  'asia-pacific': {
    name: 'Asia-Pacific',
    slug: 'asia-pacific',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    countries: [
      'japan','singapore','malaysia','indonesia','pakistan'
    ],
  },
}

export function getCountry(slug) {
  return COUNTRIES[slug.toLowerCase()]
}