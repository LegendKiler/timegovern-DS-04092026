import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import RentalYieldCalculator from '../../components/mortgage/RentalYieldCalculator'
import SaveCalculation from '../../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../../components/mortgage/MortgageLayout'
import CalculatorSidebar from '../../components/mortgage/CalculatorSidebar'

// ============================================================
// COUNTRY META — currency, region, benchmarks, SEO content
// ============================================================
const COUNTRY_META = {
  // ===== Original 5 hubs =====
  australia: {
    name: 'Australia', flag: '🇦🇺', currency: 'AUD', hub: 'australia',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    benchmarks: [
      'Sydney: 2.5–3.5% gross',
      'Melbourne: 3–4% gross',
      'Brisbane: 4–5% gross',
      'Perth: 4.5–5.5% gross',
      'Regional: 5–7% gross',
    ],
    avgYield: '3.8%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Australia?', a: 'Capital-city averages sit at 3–4% gross. Brisbane and Perth are stronger at 4–5.5%. Regional areas often hit 6%+ but carry higher vacancy risk. High-yield suburbs are typically 20+ km from CBDs.' },
      { q: 'How does negative gearing affect my yield?', a: 'Negative gearing lets you deduct the shortfall between rental income and expenses (including the full mortgage interest) against your taxable income. Most Australian investment properties run negative cash flow but produce tax savings plus capital growth.' },
      { q: 'What is the DSCR requirement in Australia?', a: 'Australian lenders don\'t use DSCR for standard residential loans — they assess on rental income + your salary. DSCR matters for commercial property and some expat loans (typically 1.25x).' },
      { q: 'What costs should I include for an AU investment property?', a: 'Council rates (~$2,000/yr), landlord insurance (~$1,500/yr), property management (5–10% of rent), strata fees for units ($3,000–$10,000/yr), repairs and maintenance (~1% of value/yr).' },
    ],
  },
  usa: {
    name: 'United States', flag: '🇺🇸', currency: 'USD', hub: 'usa',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    benchmarks: [
      'San Francisco: 2–3% gross',
      'New York: 3–4% gross',
      'Austin: 4–5% gross',
      'Atlanta: 5–6% gross',
      'Midwest: 6–8% gross',
    ],
    avgYield: '5.5%',
    negativeGearing: false,
    faqs: [
      { q: 'What is a good cap rate in the US?', a: '4–6% is standard for stable markets (NYC, SF), 6–8% for balanced markets (Austin, Dallas), 8%+ for high-yield markets (Cleveland, Memphis). Higher cap = higher risk and vacancy.' },
      { q: 'What is the 1% rule in US real estate?', a: 'A rule of thumb: monthly rent should be at least 1% of the property price. E.g., $200,000 property → $2,000/mo rent. Most coastal markets fail this test; Midwest and South markets often pass it.' },
      { q: 'What is a good DSCR for US investment loans?', a: 'Most DSCR lenders require 1.20–1.25 minimum. Some allow 1.0 for strong borrowers. Below 1.0 means the property cannot cover its own mortgage.' },
      { q: 'What expenses do US landlords need to plan for?', a: 'Property tax (0.3–2.5% of value depending on state), landlord insurance (~1% of value), property management (8–12% of rent), vacancy (5–10% of gross), maintenance (1% of value/yr), and HOA fees for condos.' },
    ],
  },
  uk: {
    name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', hub: 'uk',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    benchmarks: [
      'London: 3–4% gross',
      'Manchester: 5–6% gross',
      'Birmingham: 5–6% gross',
      'Liverpool: 6–7% gross',
      'Newcastle: 6–8% gross',
    ],
    avgYield: '5.2%',
    negativeGearing: false,
    faqs: [
      { q: 'What is a good rental yield in the UK?', a: 'London averages 3–4%. The North of England (Liverpool, Manchester, Newcastle) is where yields are strongest at 5–8%. Scotland and Wales offer solid 5–6% in urban areas.' },
      { q: 'How does Section 24 affect UK landlords?', a: 'Section 24 removed the ability to deduct mortgage interest as an expense. Instead, you get a 20% tax credit on interest. This hits higher-rate taxpayers hardest and pushes many into higher brackets.' },
      { q: 'What is stamp duty for a UK investment property?', a: 'You pay standard SDLT plus a 5% additional-property surcharge. On a £300,000 buy-to-let that is roughly £11,500 in SDLT. Scotland (LBTT) and Wales (LTT) have similar schemes.' },
      { q: 'Can I rent out a leasehold flat in the UK?', a: 'Yes, but check the lease for restrictions. Many leases require freeholder consent. You also need to budget for ground rent and service charges, which can eat 15–25% of gross yield.' },
    ],
  },
  canada: {
    name: 'Canada', flag: '🇨🇦', currency: 'CAD', hub: 'canada',
    gradient: 'from-red-500 via-rose-500 to-orange-500',
    benchmarks: [
      'Vancouver: 2.5–3.5% gross',
      'Toronto: 3–4% gross',
      'Montreal: 4–5% gross',
      'Calgary: 5–6% gross',
      'Halifax: 5–6% gross',
    ],
    avgYield: '4.5%',
    negativeGearing: false,
    faqs: [
      { q: 'What is a good rental yield in Canada?', a: 'Vancouver and Toronto are the tightest at 2.5–4%. Calgary, Edmonton, Halifax, and Montreal offer stronger yields at 4.5–6%. Prairie cities often have the best cash flow.' },
      { q: 'What is the difference between gross and net yield in Canada?', a: 'Gross yield ignores all costs. Net yield subtracts property tax, insurance, condo fees, management, and repairs. Canadian condo fees ($300–$800/mo) can dramatically reduce net yield.' },
      { q: 'Can I use a HELOC for a Canadian investment property?', a: 'Yes — many Canadian investors use a Home Equity Line of Credit to fund a down payment on an investment property. Interest is tax-deductible against investment income.' },
      { q: 'What taxes apply to Canadian rental income?', a: 'Rental income is taxed at your marginal rate. Non-residents pay 25% withholding tax on gross rent (or file Section 216 to have it applied to net income).' },
    ],
  },
  india: {
    name: 'India', flag: '🇮🇳', currency: 'INR', hub: 'india',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    benchmarks: [
      'Mumbai: 2–3% gross',
      'Delhi NCR: 2.5–3.5% gross',
      'Bangalore: 3–4% gross',
      'Pune: 3–4% gross',
      'Hyderabad: 3–4% gross',
    ],
    avgYield: '3%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in India?', a: 'Indian metros are some of the world\'s lowest-yield property markets: Mumbai 2–3%, Delhi NCR 2.5–3.5%, Bangalore and Pune 3–4%. Investors buy for capital appreciation, not rental income.' },
      { q: 'How is rental income taxed in India?', a: 'You pay tax at your slab rate. A 30% standard deduction for repairs is allowed under Section 24(a), plus home loan interest under Section 24(b) up to ₹2 lakh/year.' },
      { q: 'What is TDS on rent in India?', a: 'If the monthly rent exceeds ₹50,000, the tenant must deduct 5% TDS under Section 194-IB. Non-resident landlords are subject to 30% TDS under Section 195.' },
      { q: 'What is the maintenance cost for an Indian property?', a: 'Society maintenance typically runs ₹3–₹10 per sq ft per month. For a 1,000 sq ft flat that is ₹3,000–₹10,000/mo — often 15–25% of gross rent.' },
    ],
  },
  // ===== European countries =====
  france: {
    name: 'France', flag: '🇫🇷', currency: 'EUR', hub: 'europe',
    gradient: 'from-blue-600 via-indigo-600 to-red-600',
    benchmarks: ['Paris: 3–3.5% gross', 'Lyon: 4–4.5% gross', 'Marseille: 4.5–5% gross', 'Bordeaux: 4–4.5% gross', 'Lille: 5–5.5% gross'],
    avgYield: '4.3%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in France?', a: 'Central Paris is 3–3.5% — one of the lowest in Europe. Regional cities (Lille, Le Havre, Saint-Étienne) reach 5–7%. The best combination of yield and security is usually in mid-size university cities.' },
      { q: 'How are French rental incomes taxed?', a: 'Two regimes: Micro-foncier (30% flat deduction, revenue <€15,000) or Régime réel (actual expenses + interest deductible). The LMNP regime with amortization can dramatically reduce taxable income.' },
    ],
  },
  germany: {
    name: 'Germany', flag: '🇩🇪', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-yellow-500 to-black',
    benchmarks: ['Munich: 2.5–3.5% gross', 'Berlin: 3–4% gross', 'Hamburg: 3–4% gross', 'Frankfurt: 3.5–4.5% gross', 'Leipzig: 4.5–5.5% gross'],
    avgYield: '3.8%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Germany?', a: 'Munich is Germany\'s most expensive market at 2.5–3.5%. Berlin, Hamburg, and Frankfurt sit at 3–4%. Eastern cities (Leipzig, Dresden) and the Ruhr Valley offer 4.5–6%.' },
      { q: 'How does German rental regulation affect yields?', a: 'The Mietpreisbremse (rent brake) caps increases in tight markets. Tenants have strong rights. This means lower turnover but also slower rent growth — factor 1.5–2% rent growth into your projections.' },
    ],
  },
  spain: {
    name: 'Spain', flag: '🇪🇸', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-yellow-500 to-red-600',
    benchmarks: ['Madrid: 4–5% gross', 'Barcelona: 3.5–4.5% gross', 'Valencia: 5–6% gross', 'Seville: 5–6% gross', 'Malaga: 5.5–6.5% gross'],
    avgYield: '5%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Spain?', a: 'Barcelona and Madrid are lowest at 3.5–5%. Valencia, Seville, and Malaga offer 5–6.5%. Coastal holiday-let markets can reach 7%+ but carry seasonality risk.' },
      { q: 'Can foreigners buy investment property in Spain?', a: 'Yes, with no restrictions. You need an NIE number and typically pay 10–12% in acquisition costs (ITP 6–10% + notary + registry). Mortgages are available up to 70% LTV for non-residents.' },
    ],
  },
  italy: {
    name: 'Italy', flag: '🇮🇹', currency: 'EUR', hub: 'europe',
    gradient: 'from-green-600 via-white to-red-600',
    benchmarks: ['Milan: 3.5–4.5% gross', 'Rome: 4–5% gross', 'Florence: 4–5% gross', 'Naples: 5–6% gross', 'Turin: 5–6% gross'],
    avgYield: '4.5%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Italy?', a: 'Milan and Rome are lowest at 3.5–5%. Northern industrial cities (Turin, Genoa) and southern cities (Naples, Bari) reach 5–6%. Short-term rentals in Tuscany and Amalfi have higher gross yields but heavy seasonality.' },
      { q: 'What is cedolare secca in Italy?', a: 'A flat 21% tax regime for residential rentals (10% for regulated long-term contracts). It replaces IRPEF, addizionali, and registration tax — often dramatically reducing tax vs the standard regime.' },
    ],
  },
  netherlands: {
    name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-white to-blue-600',
    benchmarks: ['Amsterdam: 3–4% gross', 'Rotterdam: 4.5–5.5% gross', 'The Hague: 4–5% gross', 'Utrecht: 3.5–4.5% gross', 'Eindhoven: 5–6% gross'],
    avgYield: '4.5%',
    negativeGearing: false,
    faqs: [
      { q: 'What is a good rental yield in the Netherlands?', a: 'Amsterdam is tightest at 3–4%. Rotterdam, The Hague, and Eindhoven offer 4.5–6%. New regulations have tightened rent controls, but investor demand remains strong.' },
      { q: 'What taxes apply to Dutch rental income?', a: 'Rental income falls in Box 3 (wealth tax) rather than Box 1. You pay a notional return on the property value, not actual rent. This can be favourable for high-income earners.' },
    ],
  },
  switzerland: {
    name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', hub: 'europe',
    gradient: 'from-red-600 via-white to-red-600',
    benchmarks: ['Zurich: 2.5–3.5% gross', 'Geneva: 2.5–3% gross', 'Basel: 3–3.5% gross', 'Bern: 3–4% gross', 'Lausanne: 3–3.5% gross'],
    avgYield: '3.2%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Switzerland?', a: 'Zurich and Geneva are among the world\'s most expensive cities — 2.5–3.5% gross yields. Other cantons offer 3–4%. Very low mortgage rates (1.5–2.5%) make leveraged cash flow work despite low gross yield.' },
      { q: 'Can foreigners buy Swiss investment property?', a: 'Restricted. Non-residents need a permit for most property purchases. EU/EFTA citizens with a B permit can buy. Non-EU/EFTA citizens face strict quotas.' },
    ],
  },
  sweden: {
    name: 'Sweden', flag: '🇸🇪', currency: 'SEK', hub: 'europe',
    gradient: 'from-blue-600 via-yellow-400 to-blue-600',
    benchmarks: ['Stockholm: 2.5–3.5% gross', 'Gothenburg: 3.5–4.5% gross', 'Malmo: 4–5% gross', 'Uppsala: 3–4% gross', 'Linköping: 4–4.5% gross'],
    avgYield: '3.8%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Sweden?', a: 'Stockholm yields are compressed at 2.5–3.5%. Second-tier cities (Malmo, Orebro, Norrkoping) reach 4–5%. Swedish investors typically accept lower yields for capital growth and long-term stability.' },
      { q: 'How are Swedish rental incomes taxed?', a: 'You can deduct 40,000 SEK plus interest and operating costs. The remaining net income is taxed at 30%. Capital gains on sale are taxed at 22%.' },
    ],
  },
  ireland: {
    name: 'Ireland', flag: '🇮🇪', currency: 'EUR', hub: 'europe',
    gradient: 'from-green-600 via-white to-orange-500',
    benchmarks: ['Dublin: 3.5–4.5% gross', 'Cork: 4.5–5.5% gross', 'Galway: 4.5–5.5% gross', 'Limerick: 5–6% gross', 'Waterford: 5.5–6.5% gross'],
    avgYield: '4.8%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Ireland?', a: 'Dublin sits at 3.5–4.5%. Cork, Galway, and Limerick offer 4.5–6%. Rural Ireland has higher yields but much greater vacancy risk.' },
      { q: 'What are the Irish rent pressure zones?', a: 'Rent Pressure Zones (RPZ) cap rent increases at CPI or 2% per year, whichever is lower. Most urban areas are now RPZs. This caps income growth but improves tenant stability.' },
    ],
  },
  portugal: {
    name: 'Portugal', flag: '🇵🇹', currency: 'EUR', hub: 'europe',
    gradient: 'from-green-600 via-red-600 to-red-600',
    benchmarks: ['Lisbon: 3.5–4.5% gross', 'Porto: 4–5% gross', 'Braga: 4.5–5.5% gross', 'Coimbra: 4.5–5.5% gross', 'Algarve: 5–7% gross'],
    avgYield: '4.8%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Portugal?', a: 'Lisbon is 3.5–4.5%. Porto sits at 4–5%. Braga, Coimbra, and Algarve are stronger at 4.5–7%. Portugal has been one of Europe\'s hottest markets for foreign buyers.' },
      { q: 'What is the NHR tax regime?', a: 'The Non-Habitual Resident regime gives 10 years of favourable tax treatment. It was modified in 2024 but remains attractive for many categories of foreign income.' },
    ],
  },
  poland: {
    name: 'Poland', flag: '🇵🇱', currency: 'PLN', hub: 'europe',
    gradient: 'from-white via-red-600 to-red-600',
    benchmarks: ['Warsaw: 4–5% gross', 'Krakow: 4.5–5.5% gross', 'Wroclaw: 4.5–5.5% gross', 'Gdansk: 5–6% gross', 'Poznan: 5–6% gross'],
    avgYield: '5.2%',
    negativeGearing: false,
    faqs: [
      { q: 'What is a good rental yield in Poland?', a: 'Polish markets offer some of Europe\'s best yields: Warsaw 4–5%, second-tier cities (Krakow, Wroclaw) 4.5–5.5%, and coastal/tourist areas 6%+.' },
      { q: 'What taxes apply to Polish rental income?', a: 'Two options: flat 8.5% ryczałt (up to 100,000 PLN) or 12.5% (above), OR the standard scale (12% and 32%). The ryczałt is usually better for small investors.' },
    ],
  },
  belgium: {
    name: 'Belgium', flag: '🇧🇪', currency: 'EUR', hub: 'europe',
    gradient: 'from-yellow-400 via-red-600 to-black',
    benchmarks: ['Brussels: 3.5–4.5% gross', 'Antwerp: 4–5% gross', 'Ghent: 4–5% gross', 'Leuven: 3.5–4.5% gross', 'Liege: 5–6% gross'],
    avgYield: '4.5%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Belgium?', a: 'Brussels and university cities (Leuven, Ghent) are 3.5–5%. Regional cities (Liege, Charleroi, Mons) offer 5–6%. Belgian investors often value stability over maximum yield.' },
      { q: 'How does Belgium tax rental income?', a: 'Rental income is taxed on a notional cadastral value rather than actual rent — historically very low. However, second-property owners pay more, and reforms are ongoing.' },
    ],
  },
  austria: {
    name: 'Austria', flag: '🇦🇹', currency: 'EUR', hub: 'europe',
    gradient: 'from-red-600 via-white to-red-600',
    benchmarks: ['Vienna: 3–4% gross', 'Graz: 4–4.5% gross', 'Linz: 4–4.5% gross', 'Salzburg: 3.5–4.5% gross', 'Innsbruck: 3.5–4.5% gross'],
    avgYield: '4%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Austria?', a: 'Vienna consistently ranks in the world\'s most liveable cities — yields are 3–4%. Regional cities (Graz, Linz) reach 4–4.5%. Rental regulation is tight, favouring long-term stability.' },
      { q: 'How is Austrian rental income taxed?', a: 'Rental income is taxed at your marginal rate (up to 55%). A 1.5% flat deduction for wear-and-tear is allowed, plus depreciation on the building (1.5%/yr).' },
    ],
  },
  denmark: {
    name: 'Denmark', flag: '🇩🇰', currency: 'DKK', hub: 'europe',
    gradient: 'from-red-600 via-white to-red-600',
    benchmarks: ['Copenhagen: 3–4% gross', 'Aarhus: 4–4.5% gross', 'Odense: 4–5% gross', 'Aalborg: 4.5–5% gross', 'Esbjerg: 5–6% gross'],
    avgYield: '4.3%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Denmark?', a: 'Copenhagen is the tightest at 3–4%. Aarhus, Odense, and Aalborg offer 4–5%. Denmark has some of Europe\'s strongest tenant protections, so long-term rents are stable.' },
      { q: 'What is the Danish mortgage bond system?', a: 'Danish mortgages are funded by selling bonds. Investors can often "buy back" their bond at a discount if rates have risen, dramatically reducing their debt. This is unique to Denmark.' },
    ],
  },
  norway: {
    name: 'Norway', flag: '🇳🇴', currency: 'NOK', hub: 'europe',
    gradient: 'from-red-600 via-white to-blue-600',
    benchmarks: ['Oslo: 2.5–3.5% gross', 'Bergen: 3.5–4.5% gross', 'Trondheim: 3.5–4.5% gross', 'Stavanger: 4–5% gross', 'Tromso: 4–5% gross'],
    avgYield: '4%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Norway?', a: 'Oslo is 2.5–3.5%. Bergen, Trondheim, and Stavanger offer 3.5–5%. Norway\'s high income levels support rents, and mortgages are widely available at 3–5% rates.' },
      { q: 'How is Norwegian rental income taxed?', a: 'Rental income is taxed at 22% flat. You can deduct 22% on interest, maintenance, and depreciation. The system is straightforward — no special regimes for small landlords.' },
    ],
  },
  // ===== Asia-Pacific =====
  japan: {
    name: 'Japan', flag: '🇯🇵', currency: 'JPY', hub: 'asia-pacific',
    gradient: 'from-red-600 via-white to-red-600',
    benchmarks: ['Tokyo: 3–4% gross', 'Osaka: 4–5% gross', 'Nagoya: 4.5–5.5% gross', 'Fukuoka: 5–6% gross', 'Sapporo: 5–6% gross'],
    avgYield: '4.5%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Japan?', a: 'Tokyo central is 3–4%. Osaka, Nagoya, and second-tier cities offer 4–6%. Older buildings (10+ years) can yield 6–8% but depreciate faster.' },
      { q: 'Why are Japanese properties so cheap?', a: 'Japan\'s population is declining, and buildings depreciate to near-zero over 30 years. The land holds value; the building doesn\'t. Investors target land value plus rental cash flow.' },
      { q: 'Can foreigners buy property in Japan?', a: 'Yes, with no restrictions on ownership. You can get financing with permanent residency. Without PR, options are limited but some banks (Suruga, Shinsei) lend to foreign residents.' },
    ],
  },
  singapore: {
    name: 'Singapore', flag: '🇸🇬', currency: 'SGD', hub: 'asia-pacific',
    gradient: 'from-red-600 via-white to-red-600',
    benchmarks: ['CCR (Core Central): 2.5–3.5% gross', 'RCR (Rest of Central): 3–4% gross', 'OCR (Outside Central): 3.5–4.5% gross'],
    avgYield: '3.5%',
    negativeGearing: false,
    faqs: [
      { q: 'What is a good rental yield in Singapore?', a: 'CCR is tightest at 2.5–3.5%. OCR and suburban areas offer 3.5–4.5%. Very few markets in Singapore reach 5%+ — investors buy for capital growth and stability.' },
      { q: 'What is ABSD for foreign investors?', a: 'Additional Buyer\'s Stamp Duty for foreigners is 60%. For Singapore citizens buying a 2nd property, it is 20%. This dramatically reduces net yields for foreign buyers.' },
      { q: 'What are the ongoing costs of Singapore property?', a: 'Property tax (10–20% of annual value for non-owner-occupied), maintenance/condo fees ($300–$1,500/mo), agent fees (half-month rent per year), and income tax at your marginal rate.' },
    ],
  },
  malaysia: {
    name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', hub: 'asia-pacific',
    gradient: 'from-blue-600 via-yellow-400 to-red-600',
    benchmarks: ['Kuala Lumpur: 3.5–4.5% gross', 'Penang: 4–5% gross', 'Johor Bahru: 4.5–5.5% gross', 'Kota Kinabalu: 5–6% gross'],
    avgYield: '4.8%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Malaysia?', a: 'KL city centre is 3.5–4.5%. Penang and Johor Bahru offer 4–5.5%. Malaysian yields are decent by Asian standards, but recent oversupply has pushed some areas down.' },
      { q: 'Can foreigners buy Malaysian property?', a: 'Yes, but there is usually a minimum price threshold (RM1,000,000+ depending on state). MM2H visa holders get relaxed rules. You can own freehold in most cases.' },
    ],
  },
  indonesia: {
    name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', hub: 'asia-pacific',
    gradient: 'from-red-600 via-white to-red-600',
    benchmarks: ['Jakarta: 4–5% gross', 'Bali: 5–8% gross', 'Surabaya: 5–6% gross', 'Bandung: 5–6% gross', 'Yogyakarta: 5–7% gross'],
    avgYield: '5.5%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Indonesia?', a: 'Jakarta is 4–5%. Bali (especially Canggu, Seminyak, Ubud) commands 5–8% thanks to strong short-term rental demand. Surabaya and Bandung offer 5–6%.' },
      { q: 'Can foreigners own property in Indonesia?', a: 'Foreigners cannot own freehold land, but can use Hak Pakai (Right to Use) or own strata-title apartments. New 2023 rules expanded foreign ownership.' },
    ],
  },
  pakistan: {
    name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', hub: 'asia-pacific',
    gradient: 'from-green-700 via-white to-green-700',
    benchmarks: ['Karachi: 3.5–4.5% gross', 'Lahore: 4–5% gross', 'Islamabad: 4–5% gross', 'Rawalpindi: 4.5–5.5% gross'],
    avgYield: '4.5%',
    negativeGearing: true,
    faqs: [
      { q: 'What is a good rental yield in Pakistan?', a: 'Karachi is 3.5–4.5%. Lahore and Islamabad offer 4–5%. Rents are usually paid annually in advance, and rents track inflation closely.' },
      { q: 'Can overseas Pakistanis buy property?', a: 'Yes, overseas Pakistanis can buy property freely and repatriate rental income. Specialized NRP (Non-Resident Pakistani) bank accounts make remittances easier.' },
    ],
  },
}

export default function CountryRentalYieldPage() {
  const { country } = useParams()
  const slug = country?.toLowerCase()
  const meta = COUNTRY_META[slug]

  useEffect(() => {
    if (meta) {
      document.title = meta.name + ' Rental Yield Calculator 2026 — Investment Property Analysis | TimeGovern'
      const desc = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      desc.content = 'Free ' + meta.name + ' investment property calculator. Calculate gross yield, net yield, cash flow, DSCR, and 10-year projection with local benchmarks.'
      if (!desc.parentNode) document.head.appendChild(desc)
    }
  }, [meta])

  if (!meta) return <Navigate to="/mortgage" replace />

  const hubHref = '/mortgage/' + meta.hub
  const hubLabel = meta.hub === 'europe' ? 'Europe' : meta.hub === 'asia-pacific' ? 'Asia-Pacific' : meta.name

  return (
    <div className="container mx-auto p-4 max-w-5xl">

      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage', href: '/mortgage' },
        { label: hubLabel, href: hubHref },
        { label: meta.name, href: '/mortgage/' + slug },
        { label: 'Rental Yield', href: null },
      ]} />

      <Link to={'/mortgage/' + slug} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to {meta.name} tools
      </Link>

      <MortgageHero
        eyebrow={'Investment Property · ' + meta.name}
        title={meta.name + ' Rental Yield Calculator'}
        subtitle={'Calculate gross yield, net yield, cash flow, DSCR, and 10-year projections for any ' + meta.name + ' investment property.'}
        gradient={meta.gradient}
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.flag} {meta.name}</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">{meta.currency}</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Avg yield: {meta.avgYield}</span>
        </>}
      />
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 mt-6">
        <div className="space-y-6 min-w-0">
      <div className="mb-6 flex justify-end">
        <SaveCalculation type="rental-yield" countrySlug={slug} title={meta.name + ' Investment Property'} />
      </div>

      <div className="mb-10">
        <RentalYieldCalculator defaultCurrency={meta.currency} />
      </div>

      <MortgageSeoContent title={'Investing in ' + meta.name + ' property'}>
        <p>{meta.name} offers a distinct investment property market with average gross yields around <strong>{meta.avgYield}</strong>. {meta.negativeGearing ? 'Negative gearing is available, allowing you to offset losses against other income.' : 'Rental income is taxed at your marginal rate, and deductions for interest and operating costs are typically allowed.'}</p>
        <p>Use the calculator above to model your specific property. Enter the local currency values, and the calculator automatically applies the correct formulas — no need to convert to AUD or USD.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-4">{meta.name} rental yield benchmarks (2026)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {meta.benchmarks.map((b, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card">
              <div className="text-sm font-semibold">{b}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">{meta.name} investment FAQ</h2>
        <div className="space-y-3">{meta.faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related {meta.name} tools</h2>
        <RelatedMortgageTools items={[
          { name: meta.name + ' hub', href: '/mortgage/' + slug },
          { name: 'Home Loan Repayment', href: '/mortgage/australia/home-loan-repayment' },
          { name: 'Borrowing Power', href: '/mortgage/australia/borrowing-power' },
          { name: 'Stamp Duty', href: '/mortgage/australia/stamp-duty' },
          { name: 'All Mortgage Tools', href: '/mortgage' },
          { name: 'All Countries', href: '/mortgage' },
        ]} />
      </section>
        </div>
        <CalculatorSidebar country={slug} tool="rental-yield" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: meta.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
    </div>
  )
}