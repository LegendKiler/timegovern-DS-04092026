// Per-country local facts used to generate unique content on country calculator pages.
// Values are 2026 approximations from World Bank, Trading Economics, and central bank publications.

export const COUNTRY_FACTS = {
  US: { name: 'United States', currency: 'USD', symbol: '$', autoLoan: '6.9-8.5%', creditCard: '20-29%', mortgage: '6.5-7.5%', banks: 'Chase, Wells Fargo, Bank of America', note: 'APR varies by credit score and loan term; credit unions often beat banks by 1-2%.' },
  GB: { name: 'United Kingdom', currency: 'GBP', symbol: 'GBP ', autoLoan: '5.9-11%', creditCard: '21-24%', mortgage: '4.5-5.5%', banks: 'Barclays, HSBC, Lloyds, NatWest', note: 'FCA regulates all consumer credit. Rates depend on BoE base rate and your credit history.' },
  IN: { name: 'India', currency: 'INR', symbol: 'Rs ', autoLoan: '8-12%', creditCard: '36-42%', mortgage: '8-9.5%', banks: 'HDFC, ICICI, SBI, Axis', note: 'RBI sets the repo rate; auto loans from PSU banks are usually 1-2% cheaper than private banks.' },
  PK: { name: 'Pakistan', currency: 'PKR', symbol: 'Rs ', autoLoan: '13-18%', creditCard: '35-45%', mortgage: '10-14%', banks: 'HBL, MCB, UBL, Meezan', note: 'SBP monetary policy affects all consumer rates; Islamic banks offer Shariah-compliant alternatives.' },
  CA: { name: 'Canada', currency: 'CAD', symbol: 'C$', autoLoan: '6.5-9%', creditCard: '19-22%', mortgage: '5-6.5%', banks: 'RBC, TD, Scotiabank, BMO', note: 'Mortgage terms are typically 5 years max; OSFI stress-test rules apply at regulated lenders.' },
  AU: { name: 'Australia', currency: 'AUD', symbol: 'A$', autoLoan: '6-11%', creditCard: '18-22%', mortgage: '6-7%', banks: 'CBA, Westpac, ANZ, NAB', note: 'RBA cash rate drives all variable rates. Offset accounts can cut years off a mortgage.' },
  DE: { name: 'Germany', currency: 'EUR', symbol: 'EUR ', autoLoan: '5-8%', creditCard: '15-19%', mortgage: '3.5-4.5%', banks: 'Deutsche Bank, Commerzbank, ING-DiBa', note: 'Bundesbank regulates consumer credit. German mortgages often come with 10-15 year fixed terms.' },
  FR: { name: 'France', currency: 'EUR', symbol: 'EUR ', autoLoan: '4-7%', creditCard: '18-22%', mortgage: '3.5-4.5%', banks: 'BNP Paribas, Socit Gnrale, Crdit Agricole', note: 'French mortgages include mandatory insurance (assurance emprunteur) of about 0.3-0.5% of loan balance.' },
  JP: { name: 'Japan', currency: 'JPY', symbol: 'Y', autoLoan: '2-4%', creditCard: '15-18%', mortgage: '1-2%', banks: 'MUFG, Mizuho, SMBC, Japan Post Bank', note: 'The Bank of Japan has kept rates ultra-low for decades; mortgage rates are among the lowest in the world.' },
  CN: { name: 'China', currency: 'CNY', symbol: 'Y', autoLoan: '4-8%', creditCard: '18.25%', mortgage: '3.5-4.5%', banks: 'ICBC, CCB, ABC, Bank of China', note: 'PBoC sets the loan prime rate (LPR); mortgages typically track LPR plus a spread.' },
  BR: { name: 'Brazil', currency: 'BRL', symbol: 'R$', autoLoan: '18-28%', creditCard: '180-440%', mortgage: '10-12%', banks: 'Ita, Bradesco, Santander Brasil', note: 'Brazilian credit card rates are among the highest in the world; Selic rate drives all lending.' },
  MX: { name: 'Mexico', currency: 'MXN', symbol: 'MX$', autoLoan: '12-16%', creditCard: '30-50%', mortgage: '10-13%', banks: 'BBVA, Banorte, Santander, Citibanamex', note: 'Infonavit provides mortgage financing for private-sector workers; rates are typically 1-2% below commercial banks.' },
  ZA: { name: 'South Africa', currency: 'ZAR', symbol: 'R', autoLoan: '11-14%', creditCard: '20-24%', mortgage: '10.5-12%', banks: 'Standard Bank, FNB, Absa, Nedbank', note: 'Prime rate is set by SARB; all consumer lending is priced relative to prime.' },
  NG: { name: 'Nigeria', currency: 'NGN', symbol: 'NGN ', autoLoan: '20-30%', creditCard: '24-36%', mortgage: '18-22%', banks: 'GTBank, Access, Zenith, First Bank', note: 'CBN sets the MPR; high inflation has pushed consumer lending rates above 20%.' },
  EG: { name: 'Egypt', currency: 'EGP', symbol: 'EGP ', autoLoan: '18-24%', creditCard: '25-35%', mortgage: '15-20%', banks: 'NBE, Banque Misr, CIB', note: 'CBE rate hikes since 2022 pushed consumer lending rates up sharply.' },
  AE: { name: 'UAE', currency: 'AED', symbol: 'AED ', autoLoan: '3-6%', creditCard: '30-40%', mortgage: '4-5.5%', banks: 'Emirates NBD, FAB, ADCB, Mashreq', note: 'No personal income tax. Mortgages are typically capped at 80% LTV for expats, 85% for citizens.' },
  SA: { name: 'Saudi Arabia', currency: 'SAR', symbol: 'SAR ', autoLoan: '5-8%', creditCard: '20-30%', mortgage: '5-7%', banks: 'Al Rajhi, SNB, Riyad Bank, SAB', note: 'SAMA regulates lending. Islamic (Murabaha) financing is standard for retail products.' },
  TR: { name: 'Turkey', currency: 'TRY', symbol: 'TRY ', autoLoan: '30-50%', creditCard: '40-60%', mortgage: '25-40%', banks: 'Ziraat, I? Bankas?, Garanti, Akbank', note: 'CBRT policy rates have been extremely volatile since 2021; consumer lending rates reflect this.' },
  MY: { name: 'Malaysia', currency: 'MYR', symbol: 'RM ', autoLoan: '4-7%', creditCard: '15-18%', mortgage: '4-5%', banks: 'Maybank, CIMB, Public Bank, RHB', note: 'BNM sets the overnight policy rate. Islamic banking is widely available alongside conventional.' },
  SG: { name: 'Singapore', currency: 'SGD', symbol: 'S$', autoLoan: '3-5%', creditCard: '26-28%', mortgage: '4-5%', banks: 'DBS, OCBC, UOB', note: 'MAS uses exchange-rate policy rather than interest rates. Mortgage rates often track SORA.' },
  TH: { name: 'Thailand', currency: 'THB', symbol: 'THB ', autoLoan: '4-7%', creditCard: '18-20%', mortgage: '5-7%', banks: 'Bangkok Bank, Kasikornbank, SCB', note: 'Bank of Thailand sets policy rate; auto loans from captive finance arms are often cheaper than banks.' },
  ID: { name: 'Indonesia', currency: 'IDR', symbol: 'Rp ', autoLoan: '8-12%', creditCard: '22-30%', mortgage: '8-11%', banks: 'BCA, Mandiri, BNI, BRI', note: 'Bank Indonesia rate sets the floor. OJK regulates all consumer lending.' },
  PH: { name: 'Philippines', currency: 'PHP', symbol: 'PHP ', autoLoan: '8-13%', creditCard: '20-30%', mortgage: '7-9%', banks: 'BDO, BPI, Metrobank, Landbank', note: 'BSP policy rate drives consumer lending. Pag-IBIG offers subsidized housing loans.' },
  VN: { name: 'Vietnam', currency: 'VND', symbol: 'VND ', autoLoan: '8-12%', creditCard: '25-35%', mortgage: '9-12%', banks: 'Vietcombank, BIDV, VietinBank, Techcombank', note: 'SBV manages rates through the refinancing rate. Foreign ownership rules affect mortgage products.' },
  KR: { name: 'South Korea', currency: 'KRW', symbol: 'KRW ', autoLoan: '4-7%', creditCard: '15-20%', mortgage: '4-6%', banks: 'KB, Shinhan, Hana, Woori', note: 'Bank of Korea base rate drives all lending. DSR rules limit total debt service ratio.' },
  IL: { name: 'Israel', currency: 'ILS', symbol: 'ILS ', autoLoan: '5-9%', creditCard: '12-18%', mortgage: '5-7%', banks: 'Bank Hapoalim, Bank Leumi, Mizrahi', note: 'Bank of Israel rate decisions affect variable-rate mortgages; most loans are prime-linked.' },
  BD: { name: 'Bangladesh', currency: 'BDT', symbol: 'BDT ', autoLoan: '10-14%', creditCard: '25-35%', mortgage: '9-12%', banks: 'BRAC, City, Islami, Dutch-Bangla', note: 'Bangladesh Bank caps lending rates for some categories; auto loans have no such cap.' },
  LK: { name: 'Sri Lanka', currency: 'LKR', symbol: 'LKR ', autoLoan: '14-18%', creditCard: '28-36%', mortgage: '12-16%', banks: 'Commercial Bank, Sampath, HNB, BOC', note: 'CBSL policy rates rose sharply in 2022-2023; rates have been easing since mid-2024.' },
  NZ: { name: 'New Zealand', currency: 'NZD', symbol: 'NZ$', autoLoan: '7-12%', creditCard: '19-22%', mortgage: '6.5-8%', banks: 'ANZ, ASB, BNZ, Westpac NZ', note: 'RBNZ OCR drives mortgage rates. Most fixed terms are 1-3 years.' },
  CH: { name: 'Switzerland', currency: 'CHF', symbol: 'CHF ', autoLoan: '3-6%', creditCard: '12-15%', mortgage: '1.5-2.5%', banks: 'UBS, Credit Suisse (UBS), Raiffeisen, ZKB', note: 'SNB policy rate has been low for years. Swiss mortgages often use SARON-linked variable rates.' },
  SE: { name: 'Sweden', currency: 'SEK', symbol: 'kr ', autoLoan: '4-7%', creditCard: '15-20%', mortgage: '4-5%', banks: 'Swedbank, Handelsbanken, SEB, Nordea', note: 'Riksbank policy rate drives variable mortgage rates. Swedish mortgages are often 3-month variable.' },
  NO: { name: 'Norway', currency: 'NOK', symbol: 'kr ', autoLoan: '5-8%', creditCard: '18-22%', mortgage: '5-6.5%', banks: 'DNB, Nordea, SpareBank 1', note: 'Norges Bank policy rate drives lending. Mortgage regulations cap LTV at 85% in Oslo.' },
  DK: { name: 'Denmark', currency: 'DKK', symbol: 'kr ', autoLoan: '4-7%', creditCard: '15-20%', mortgage: '3.5-5%', banks: 'Danske Bank, Nykredit, Jyske Bank', note: 'Danish mortgage bonds (realkredit) are unique — the loan is funded by selling bonds, often cheaper than bank loans.' },
  FI: { name: 'Finland', currency: 'EUR', symbol: 'EUR ', autoLoan: '4-7%', creditCard: '15-20%', mortgage: '3.5-5%', banks: 'Nordea, OP, Danske', note: 'Euribor rates drive Finnish mortgages; 12-month Euribor is the most common reference.' },
  IE: { name: 'Ireland', currency: 'EUR', symbol: 'EUR ', autoLoan: '6-10%', creditCard: '20-23%', mortgage: '3.5-4.5%', banks: 'AIB, Bank of Ireland, Ulster (closing)', note: 'Central Bank of Ireland mortgage rules cap borrowing at 3.5x income and 90% LTV for first-time buyers.' },
  PT: { name: 'Portugal', currency: 'EUR', symbol: 'EUR ', autoLoan: '5-8%', creditCard: '17-22%', mortgage: '3.5-5%', banks: 'Caixa Geral, Millennium BCP, Novo Banco', note: 'Euribor-linked mortgages are standard; 12-month Euribor is most common.' },
  ES: { name: 'Spain', currency: 'EUR', symbol: 'EUR ', autoLoan: '5-8%', creditCard: '18-22%', mortgage: '3.5-4.5%', banks: 'Santander, BBVA, CaixaBank, Sabadell', note: 'Euribor is the standard reference rate. Fixed-rate mortgages have grown to over 60% of new lending.' },
  IT: { name: 'Italy', currency: 'EUR', symbol: 'EUR ', autoLoan: '5-8%', creditCard: '17-21%', mortgage: '3.5-5%', banks: 'Intesa Sanpaolo, UniCredit, BPER', note: 'Euribor-linked mortgages are common. Italian mortgage spreads are wider than French or German.' },
  GR: { name: 'Greece', currency: 'EUR', symbol: 'EUR ', autoLoan: '6-10%', creditCard: '18-23%', mortgage: '4-5.5%', banks: 'Alpha, Eurobank, NBG, Piraeus', note: 'Greek banks tightened lending after the 2010s debt crisis; spreads remain wider than EU average.' },
  PL: { name: 'Poland', currency: 'PLN', symbol: 'z? ', autoLoan: '6-10%', creditCard: '18-22%', mortgage: '5-7%', banks: 'PKO BP, Pekao, mBank, Santander Polska', note: 'WIBOR rate drives most existing mortgages; new loans increasingly use WIRON.' },
  RU: { name: 'Russia', currency: 'RUB', symbol: 'RUB ', autoLoan: '15-25%', creditCard: '25-40%', mortgage: '15-20%', banks: 'Sberbank, VTB, Gazprombank', note: 'CBR key rate spiked to 20%+ in 2022; consumer lending rates remain elevated.' },
  AR: { name: 'Argentina', currency: 'ARS', symbol: 'AR$', autoLoan: '60-90%', creditCard: '80-120%', mortgage: '40-80%', banks: 'Banco Nacin, Santander Ro, BBVA Argentina', note: 'Argentine rates are extremely volatile due to chronic inflation and currency controls.' },
  CL: { name: 'Chile', currency: 'CLP', symbol: 'CLP$', autoLoan: '10-15%', creditCard: '20-30%', mortgage: '4.5-6%', banks: 'Banco de Chile, Santander Chile, BCI', note: 'BCCh policy rate drives lending. Chilean mortgages are typically 20-30 year terms in UF units.' },
  AT: { name: 'Austria', currency: 'EUR', symbol: 'EUR ', autoLoan: '5-8%', creditCard: '15-20%', mortgage: '3.5-5%', banks: 'Erste, Raiffeisen, Bank Austria', note: 'Euribor-linked mortgages dominate. Austrian regulators apply strict income-to-loan rules.' },
  BE: { name: 'Belgium', currency: 'EUR', symbol: 'EUR ', autoLoan: '4-7%', creditCard: '15-20%', mortgage: '3.5-4.5%', banks: 'KBC, BNP Paribas Fortis, Belfius, ING', note: 'Belgian mortgages often come with 20-25 year fixed terms. Registration fees vary by region.' }
};

export const CALCULATOR_INTROS = {
  'auto-loan-calculator': {
    heading: 'Auto loan rates and local context',
    template: 'Auto loan rates in {name} typically range from {autoLoan} APR. Major lenders include {banks}. {note}'
  },
  'credit-card-payoff-calculator': {
    heading: 'Credit card rates and payoff tips',
    template: 'Credit cards in {name} carry APRs of roughly {creditCard}. {note} A $5,000 balance at the mid-range rate takes years to clear on minimum payments — see the numbers above.'
  },
  'retirement-calculator': {
    heading: 'Retirement planning in {name}',
    template: 'Retirement savings in {name} work best when you account for local inflation and currency. {note} Use the calculator above to model your own target.'
  },
  'investment-calculator': {
    heading: 'Investment returns in {name}',
    template: 'Investment growth in {name} depends on local inflation, taxes and market returns. {note} Small differences in annual return compound dramatically over 20-30 years.'
  },
  'pregnancy-due-date-calculator': {
    heading: 'Pregnancy care in {name}',
    template: 'Pregnancy due dates are calculated the same way worldwide (Naegele rule), but prenatal care schedules vary. {note}'
  },
  'ovulation-calculator': {
    heading: 'Ovulation and fertility in {name}',
    template: 'Ovulation timing is universal, but access to fertility support varies by country. {note}'
  },
  'grade-calculator': {
    heading: 'Grading systems in {name}',
    template: 'Grade scales in {name} have their own conventions. {note} Use the calculator above to convert between weighted scores and final grades.'
  }
};