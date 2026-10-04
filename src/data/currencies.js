// src/data/currencies.js
// Full ISO 4217 active currency list for TimeGovern currency tools.
// Used by: src/components/CurrencyConverter.jsx, src/components/live/CurrencyConverter.jsx,
//          src/pages/CurrencyConverterPage.jsx, src/pages/CurrencyPairPage.jsx
// Last updated: 2026-10-03

export const CURRENCIES = [
  // ── Major / G10 ──
  { code: "USD", name: "US Dollar", symbol: "$", flag: "\u{1F1FA}\u{1F1F8}", country: "United States", region: "North America", popular: true },
  { code: "EUR", name: "Euro", symbol: "\u20AC", flag: "\u{1F1EA}\u{1F1FA}", country: "Eurozone", region: "Europe", popular: true },
  { code: "GBP", name: "British Pound", symbol: "\u00A3", flag: "\u{1F1EC}\u{1F1E7}", country: "United Kingdom", region: "Europe", popular: true },
  { code: "JPY", name: "Japanese Yen", symbol: "\u00A5", flag: "\u{1F1EF}\u{1F1F5}", country: "Japan", region: "Asia", popular: true },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "\u{1F1E6}\u{1F1FA}", country: "Australia", region: "Oceania", popular: true },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "\u{1F1E8}\u{1F1E6}", country: "Canada", region: "North America", popular: true },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "\u{1F1E8}\u{1F1ED}", country: "Switzerland", region: "Europe", popular: true },
  { code: "CNY", name: "Chinese Yuan", symbol: "\u00A5", flag: "\u{1F1E8}\u{1F1F3}", country: "China", region: "Asia", popular: true },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "\u{1F1F3}\u{1F1FF}", country: "New Zealand", region: "Oceania", popular: true },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "\u{1F1ED}\u{1F1F0}", country: "Hong Kong", region: "Asia", popular: true },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "\u{1F1F8}\u{1F1EC}", country: "Singapore", region: "Asia", popular: true },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "\u{1F1F8}\u{1F1EA}", country: "Sweden", region: "Europe", popular: true },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "\u{1F1F3}\u{1F1F4}", country: "Norway", region: "Europe", popular: true },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "\u{1F1E9}\u{1F1F0}", country: "Denmark", region: "Europe", popular: true },
  { code: "KRW", name: "South Korean Won", symbol: "\u20A9", flag: "\u{1F1F0}\u{1F1F7}", country: "South Korea", region: "Asia", popular: true },

  // ── Asia / Pacific ──
  { code: "INR", name: "Indian Rupee", symbol: "\u20B9", flag: "\u{1F1EE}\u{1F1F3}", country: "India", region: "Asia", popular: true },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "\u{1F1EE}\u{1F1E9}", country: "Indonesia", region: "Asia", popular: true },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "\u{1F1F2}\u{1F1FE}", country: "Malaysia", region: "Asia", popular: true },
  { code: "PHP", name: "Philippine Peso", symbol: "\u20B1", flag: "\u{1F1F5}\u{1F1ED}", country: "Philippines", region: "Asia", popular: true },
  { code: "THB", name: "Thai Baht", symbol: "\u0E3F", flag: "\u{1F1F9}\u{1F1ED}", country: "Thailand", region: "Asia", popular: true },
  { code: "VND", name: "Vietnamese Dong", symbol: "\u20AB", flag: "\u{1F1FB}\u{1F1F3}", country: "Vietnam", region: "Asia", popular: true },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$", flag: "\u{1F1F9}\u{1F1FC}", country: "Taiwan", region: "Asia", popular: false },
  { code: "MOP", name: "Macanese Pataca", symbol: "MOP$", flag: "\u{1F1F2}\u{1F1F4}", country: "Macau", region: "Asia", popular: false },
  { code: "BND", name: "Brunei Dollar", symbol: "B$", flag: "\u{1F1E7}\u{1F1F3}", country: "Brunei", region: "Asia", popular: false },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K", flag: "\u{1F1F2}\u{1F1F2}", country: "Myanmar", region: "Asia", popular: false },
  { code: "KHR", name: "Cambodian Riel", symbol: "\u17DB", flag: "\u{1F1F0}\u{1F1ED}", country: "Cambodia", region: "Asia", popular: false },
  { code: "LAK", name: "Lao Kip", symbol: "\u20AD", flag: "\u{1F1F1}\u{1F1E6}", country: "Laos", region: "Asia", popular: false },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "\u20AE", flag: "\u{1F1F2}\u{1F1F3}", country: "Mongolia", region: "Asia", popular: false },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "\u09F3", flag: "\u{1F1E7}\u{1F1E9}", country: "Bangladesh", region: "Asia", popular: true },
  { code: "PKR", name: "Pakistani Rupee", symbol: "\u20A8", flag: "\u{1F1F5}\u{1F1F0}", country: "Pakistan", region: "Asia", popular: true },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", flag: "\u{1F1F1}\u{1F1F0}", country: "Sri Lanka", region: "Asia", popular: false },
  { code: "NPR", name: "Nepalese Rupee", symbol: "Rs", flag: "\u{1F1F3}\u{1F1F5}", country: "Nepal", region: "Asia", popular: false },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu.", flag: "\u{1F1E7}\u{1F1F9}", country: "Bhutan", region: "Asia", popular: false },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf", flag: "\u{1F1F2}\u{1F1FB}", country: "Maldives", region: "Asia", popular: false },
  { code: "AFN", name: "Afghan Afghani", symbol: "\u060B", flag: "\u{1F1E6}\u{1F1EB}", country: "Afghanistan", region: "Asia", popular: false },

  // ── Central Asia / Caucasus ──
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "\u20B8", flag: "\u{1F1F0}\u{1F1FF}", country: "Kazakhstan", region: "Asia", popular: false },
  { code: "UZS", name: "Uzbekistani Som", symbol: "so\u02BCm", flag: "\u{1F1FA}\u{1F1FF}", country: "Uzbekistan", region: "Asia", popular: false },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "\u0405\u041C", flag: "\u{1F1F9}\u{1F1EF}", country: "Tajikistan", region: "Asia", popular: false },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "m", flag: "\u{1F1F9}\u{1F1F2}", country: "Turkmenistan", region: "Asia", popular: false },
  { code: "KGS", name: "Kyrgystani Som", symbol: "\u0441\u043E\u043C", flag: "\u{1F1F0}\u{1F1EC}", country: "Kyrgyzstan", region: "Asia", popular: false },
  { code: "GEL", name: "Georgian Lari", symbol: "\u20BE", flag: "\u{1F1EC}\u{1F1EA}", country: "Georgia", region: "Asia", popular: false },
  { code: "AMD", name: "Armenian Dram", symbol: "\u058F", flag: "\u{1F1E6}\u{1F1F2}", country: "Armenia", region: "Asia", popular: false },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "\u20BC", flag: "\u{1F1E6}\u{1F1FF}", country: "Azerbaijan", region: "Asia", popular: false },

  // ── Middle East ──
  { code: "AED", name: "UAE Dirham", symbol: "\u062F.\u0625", flag: "\u{1F1E6}\u{1F1EA}", country: "United Arab Emirates", region: "Middle East", popular: true },
  { code: "SAR", name: "Saudi Riyal", symbol: "\uFDFC", flag: "\u{1F1F8}\u{1F1E6}", country: "Saudi Arabia", region: "Middle East", popular: true },
  { code: "QAR", name: "Qatari Riyal", symbol: "\uFDFC", flag: "\u{1F1F6}\u{1F1E6}", country: "Qatar", region: "Middle East", popular: true },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "\u062F.\u0643", flag: "\u{1F1F0}\u{1F1FC}", country: "Kuwait", region: "Middle East", popular: false },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".\u062F.\u0628", flag: "\u{1F1E7}\u{1F1ED}", country: "Bahrain", region: "Middle East", popular: false },
  { code: "OMR", name: "Omani Rial", symbol: ".\u0631.\u0639", flag: "\u{1F1F4}\u{1F1F2}", country: "Oman", region: "Middle East", popular: false },
  { code: "JOD", name: "Jordanian Dinar", symbol: "\u062F.\u0627", flag: "\u{1F1EF}\u{1F1F4}", country: "Jordan", region: "Middle East", popular: false },
  { code: "ILS", name: "Israeli New Shekel", symbol: "\u20AA", flag: "\u{1F1EE}\u{1F1F1}", country: "Israel", region: "Middle East", popular: true },
  { code: "LBP", name: "Lebanese Pound", symbol: "\u0644.\u0644", flag: "\u{1F1F1}\u{1F1E7}", country: "Lebanon", region: "Middle East", popular: false },
  { code: "IQD", name: "Iraqi Dinar", symbol: "\u0639.\u062F", flag: "\u{1F1EE}\u{1F1F6}", country: "Iraq", region: "Middle East", popular: false },
  { code: "IRR", name: "Iranian Rial", symbol: "\uFDFC", flag: "\u{1F1EE}\u{1F1F7}", country: "Iran", region: "Middle East", popular: false },
  { code: "YER", name: "Yemeni Rial", symbol: "\uFDFC", flag: "\u{1F1FE}\u{1F1EA}", country: "Yemen", region: "Middle East", popular: false },
  { code: "SYP", name: "Syrian Pound", symbol: "\u00A3", flag: "\u{1F1F8}\u{1F1FE}", country: "Syria", region: "Middle East", popular: false },

  // ── Europe (non-euro) ──
  { code: "TRY", name: "Turkish Lira", symbol: "\u20BA", flag: "\u{1F1F9}\u{1F1F7}", country: "Turkey", region: "Europe", popular: true },
  { code: "RUB", name: "Russian Ruble", symbol: "\u20BD", flag: "\u{1F1F7}\u{1F1FA}", country: "Russia", region: "Europe", popular: true },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "\u20B4", flag: "\u{1F1FA}\u{1F1E6}", country: "Ukraine", region: "Europe", popular: false },
  { code: "PLN", name: "Polish Z\u0142oty", symbol: "z\u0142", flag: "\u{1F1F5}\u{1F1F1}", country: "Poland", region: "Europe", popular: true },
  { code: "CZK", name: "Czech Koruna", symbol: "K\u010D", flag: "\u{1F1E8}\u{1F1FF}", country: "Czech Republic", region: "Europe", popular: true },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "\u{1F1ED}\u{1F1FA}", country: "Hungary", region: "Europe", popular: true },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flag: "\u{1F1F7}\u{1F1F4}", country: "Romania", region: "Europe", popular: false },
  { code: "BGN", name: "Bulgarian Lev", symbol: "\u043B\u0432", flag: "\u{1F1E7}\u{1F1EC}", country: "Bulgaria", region: "Europe", popular: false },
  { code: "ISK", name: "Icelandic Kr\u00F3na", symbol: "kr", flag: "\u{1F1EE}\u{1F1F8}", country: "Iceland", region: "Europe", popular: false },
  { code: "RSD", name: "Serbian Dinar", symbol: "\u0434\u0438\u043D", flag: "\u{1F1F7}\u{1F1F8}", country: "Serbia", region: "Europe", popular: false },
  { code: "MKD", name: "Macedonian Denar", symbol: "\u0434\u0435\u043D", flag: "\u{1F1F2}\u{1F1F0}", country: "North Macedonia", region: "Europe", popular: false },
  { code: "ALL", name: "Albanian Lek", symbol: "L", flag: "\u{1F1E6}\u{1F1F1}", country: "Albania", region: "Europe", popular: false },
  { code: "BAM", name: "Bosnia-Herzegovina Mark", symbol: "KM", flag: "\u{1F1E7}\u{1F1E6}", country: "Bosnia and Herzegovina", region: "Europe", popular: false },
  { code: "MDL", name: "Moldovan Leu", symbol: "L", flag: "\u{1F1F2}\u{1F1E9}", country: "Moldova", region: "Europe", popular: false },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br", flag: "\u{1F1E7}\u{1F1FE}", country: "Belarus", region: "Europe", popular: false },

  // ── Americas ──
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$", flag: "\u{1F1F2}\u{1F1FD}", country: "Mexico", region: "North America", popular: true },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "\u{1F1E7}\u{1F1F7}", country: "Brazil", region: "South America", popular: true },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "\u{1F1E6}\u{1F1F7}", country: "Argentina", region: "South America", popular: true },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flag: "\u{1F1E8}\u{1F1F1}", country: "Chile", region: "South America", popular: false },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "\u{1F1E8}\u{1F1F4}", country: "Colombia", region: "South America", popular: false },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", flag: "\u{1F1F5}\u{1F1EA}", country: "Peru", region: "South America", popular: false },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U", flag: "\u{1F1FA}\u{1F1FE}", country: "Uruguay", region: "South America", popular: false },
  { code: "PYG", name: "Paraguayan Guarani", symbol: "\u20B2", flag: "\u{1F1F5}\u{1F1FE}", country: "Paraguay", region: "South America", popular: false },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs.", flag: "\u{1F1E7}\u{1F1F4}", country: "Bolivia", region: "South America", popular: false },
  { code: "VES", name: "Venezuelan Bol\u00EDvar", symbol: "Bs.", flag: "\u{1F1FB}\u{1F1EA}", country: "Venezuela", region: "South America", popular: false },
  { code: "GYD", name: "Guyanese Dollar", symbol: "$", flag: "\u{1F1EC}\u{1F1FE}", country: "Guyana", region: "South America", popular: false },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$", flag: "\u{1F1F8}\u{1F1F7}", country: "Suriname", region: "South America", popular: false },

  // ── Caribbean / Atlantic ──
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "TT$", flag: "\u{1F1F9}\u{1F1F9}", country: "Trinidad and Tobago", region: "Caribbean", popular: false },
  { code: "JMD", name: "Jamaican Dollar", symbol: "J$", flag: "\u{1F1EF}\u{1F1F2}", country: "Jamaica", region: "Caribbean", popular: false },
  { code: "BBD", name: "Barbadian Dollar", symbol: "Bds$", flag: "\u{1F1E7}\u{1F1E7}", country: "Barbados", region: "Caribbean", popular: false },
  { code: "BSD", name: "Bahamian Dollar", symbol: "B$", flag: "\u{1F1E7}\u{1F1F8}", country: "Bahamas", region: "Caribbean", popular: false },
  { code: "BZD", name: "Belize Dollar", symbol: "BZ$", flag: "\u{1F1E7}\u{1F1FF}", country: "Belize", region: "Caribbean", popular: false },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "EC$", flag: "\u{1F1E6}\u{1F1EC}", country: "East Caribbean", region: "Caribbean", popular: false },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "CI$", flag: "\u{1F1F0}\u{1F1FE}", country: "Cayman Islands", region: "Caribbean", popular: false },
  { code: "BMD", name: "Bermudian Dollar", symbol: "BD$", flag: "\u{1F1E7}\u{1F1F2}", country: "Bermuda", region: "Caribbean", popular: false },
  { code: "AWG", name: "Aruban Florin", symbol: "Afl.", flag: "\u{1F1E6}\u{1F1FC}", country: "Aruba", region: "Caribbean", popular: false },
  { code: "ANG", name: "Netherlands Antillean Guilder", symbol: "NA\u0192", flag: "\u{1F1E8}\u{1F1FC}", country: "Cura\u00E7ao", region: "Caribbean", popular: false },
  { code: "HTG", name: "Haitian Gourde", symbol: "G", flag: "\u{1F1ED}\u{1F1F9}", country: "Haiti", region: "Caribbean", popular: false },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$", flag: "\u{1F1E9}\u{1F1F4}", country: "Dominican Republic", region: "Caribbean", popular: false },
  { code: "CUP", name: "Cuban Peso", symbol: "$MN", flag: "\u{1F1E8}\u{1F1FA}", country: "Cuba", region: "Caribbean", popular: false },

  // ── Africa ──
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "\u{1F1FF}\u{1F1E6}", country: "South Africa", region: "Africa", popular: true },
  { code: "EGP", name: "Egyptian Pound", symbol: "E\u00A3", flag: "\u{1F1EA}\u{1F1EC}", country: "Egypt", region: "Africa", popular: true },
  { code: "NGN", name: "Nigerian Naira", symbol: "\u20A6", flag: "\u{1F1F3}\u{1F1EC}", country: "Nigeria", region: "Africa", popular: true },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "\u{1F1F0}\u{1F1EA}", country: "Kenya", region: "Africa", popular: true },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "\u20B5", flag: "\u{1F1EC}\u{1F1ED}", country: "Ghana", region: "Africa", popular: true },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", flag: "\u{1F1F9}\u{1F1FF}", country: "Tanzania", region: "Africa", popular: false },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "\u{1F1FA}\u{1F1EC}", country: "Uganda", region: "Africa", popular: false },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK", flag: "\u{1F1FF}\u{1F1F2}", country: "Zambia", region: "Africa", popular: false },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT", flag: "\u{1F1F2}\u{1F1FF}", country: "Mozambique", region: "Africa", popular: false },
  { code: "BWP", name: "Botswanan Pula", symbol: "P", flag: "\u{1F1E7}\u{1F1FC}", country: "Botswana", region: "Africa", popular: false },
  { code: "NAD", name: "Namibian Dollar", symbol: "N$", flag: "\u{1F1F3}\u{1F1E6}", country: "Namibia", region: "Africa", popular: false },
  { code: "MUR", name: "Mauritian Rupee", symbol: "\u20A8", flag: "\u{1F1F2}\u{1F1FA}", country: "Mauritius", region: "Africa", popular: false },
  { code: "SCR", name: "Seychellois Rupee", symbol: "\u20A8", flag: "\u{1F1F8}\u{1F1E8}", country: "Seychelles", region: "Africa", popular: false },
  { code: "MAD", name: "Moroccan Dirham", symbol: "\u062F.\u0645.", flag: "\u{1F1F2}\u{1F1E6}", country: "Morocco", region: "Africa", popular: true },
  { code: "TND", name: "Tunisian Dinar", symbol: "\u062F.\u062A", flag: "\u{1F1F9}\u{1F1F3}", country: "Tunisia", region: "Africa", popular: false },
  { code: "DZD", name: "Algerian Dinar", symbol: "\u062F.\u062C", flag: "\u{1F1E9}\u{1F1FF}", country: "Algeria", region: "Africa", popular: false },
  { code: "LYD", name: "Libyan Dinar", symbol: "\u0644.\u062F", flag: "\u{1F1F1}\u{1F1FE}", country: "Libya", region: "Africa", popular: false },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "\u{1F1EA}\u{1F1F9}", country: "Ethiopia", region: "Africa", popular: false },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA", flag: "\u{1F1E8}\u{1F1F2}", country: "Central Africa", region: "Africa", popular: false },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA", flag: "\u{1F1F8}\u{1F1F3}", country: "West Africa", region: "Africa", popular: false },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw", flag: "\u{1F1F7}\u{1F1FC}", country: "Rwanda", region: "Africa", popular: false },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu", flag: "\u{1F1E7}\u{1F1EE}", country: "Burundi", region: "Africa", popular: false },
  { code: "CDF", name: "Congolese Franc", symbol: "FC", flag: "\u{1F1E8}\u{1F1E9}", country: "DR Congo", region: "Africa", popular: false },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz", flag: "\u{1F1E6}\u{1F1F4}", country: "Angola", region: "Africa", popular: false },
  { code: "STN", name: "S\u00E3o Tom\u00E9 Dobra", symbol: "Db", flag: "\u{1F1F8}\u{1F1F9}", country: "S\u00E3o Tom\u00E9 and Pr\u00EDncipe", region: "Africa", popular: false },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$", flag: "\u{1F1E8}\u{1F1FB}", country: "Cape Verde", region: "Africa", popular: false },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D", flag: "\u{1F1EC}\u{1F1F2}", country: "Gambia", region: "Africa", popular: false },
  { code: "GNF", name: "Guinean Franc", symbol: "FG", flag: "\u{1F1EC}\u{1F1F3}", country: "Guinea", region: "Africa", popular: false },
  { code: "LRD", name: "Liberian Dollar", symbol: "L$", flag: "\u{1F1F1}\u{1F1F7}", country: "Liberia", region: "Africa", popular: false },
  { code: "SLE", name: "Sierra Leonean Leone", symbol: "Le", flag: "\u{1F1F8}\u{1F1F1}", country: "Sierra Leone", region: "Africa", popular: false },
  { code: "LSL", name: "Lesotho Loti", symbol: "L", flag: "\u{1F1F1}\u{1F1F8}", country: "Lesotho", region: "Africa", popular: false },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "L", flag: "\u{1F1F8}\u{1F1FF}", country: "Eswatini", region: "Africa", popular: false },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "Z$", flag: "\u{1F1FF}\u{1F1FC}", country: "Zimbabwe", region: "Africa", popular: false },
  { code: "SDG", name: "Sudanese Pound", symbol: "\u062C.\u0633", flag: "\u{1F1F8}\u{1F1E9}", country: "Sudan", region: "Africa", popular: false },
  { code: "SSP", name: "South Sudanese Pound", symbol: "\u00A3", flag: "\u{1F1F8}\u{1F1F8}", country: "South Sudan", region: "Africa", popular: false },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh", flag: "\u{1F1F8}\u{1F1F4}", country: "Somalia", region: "Africa", popular: false },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj", flag: "\u{1F1E9}\u{1F1EF}", country: "Djibouti", region: "Africa", popular: false },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk", flag: "\u{1F1EA}\u{1F1F7}", country: "Eritrea", region: "Africa", popular: false },
  { code: "KMF", name: "Comorian Franc", symbol: "CF", flag: "\u{1F1F0}\u{1F1F2}", country: "Comoros", region: "Africa", popular: false },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar", flag: "\u{1F1F2}\u{1F1EC}", country: "Madagascar", region: "Africa", popular: false },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK", flag: "\u{1F1F2}\u{1F1FC}", country: "Malawi", region: "Africa", popular: false },

  // ── Oceania ──
  { code: "FJD", name: "Fijian Dollar", symbol: "FJ$", flag: "\u{1F1EB}\u{1F1EF}", country: "Fiji", region: "Oceania", popular: false },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K", flag: "\u{1F1F5}\u{1F1EC}", country: "Papua New Guinea", region: "Oceania", popular: false },
  { code: "WST", name: "Samoan Tala", symbol: "T", flag: "\u{1F1FC}\u{1F1F8}", country: "Samoa", region: "Oceania", popular: false },
  { code: "TOP", name: "Tongan Pa\u02BBanga", symbol: "T$", flag: "\u{1F1F9}\u{1F1F4}", country: "Tonga", region: "Oceania", popular: false },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT", flag: "\u{1F1FB}\u{1F1FA}", country: "Vanuatu", region: "Oceania", popular: false },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "SI$", flag: "\u{1F1F8}\u{1F1E7}", country: "Solomon Islands", region: "Oceania", popular: false },
  { code: "XPF", name: "CFP Franc", symbol: "\u20A3", flag: "\u{1F1F5}\u{1F1EB}", country: "French Polynesia", region: "Oceania", popular: false },

  // ── API parity additions (2026-10-04) ──
  { code: "CNH", name: "Chinese Yuan (Offshore)", symbol: "\u00A5", flag: "\u{1F1ED}\u{1F1F0}", country: "Hong Kong", region: "Asia", popular: true },
  { code: "CLF", name: "Chilean Unit of Account (UF)", symbol: "UF", flag: "\u{1F1E8}\u{1F1F1}", country: "Chile", region: "South America", popular: false },
  { code: "CRC", name: "Costa Rican Col\u00F3n", symbol: "\u20A1", flag: "\u{1F1E8}\u{1F1F7}", country: "Costa Rica", region: "North America", popular: false },
  { code: "FKP", name: "Falkland Islands Pound", symbol: "\u00A3", flag: "\u{1F1EB}\u{1F1F0}", country: "Falkland Islands", region: "South America", popular: false },
  { code: "FOK", name: "Faroese Kr\u00F3na", symbol: "kr", flag: "\u{1F1EB}\u{1F1F4}", country: "Faroe Islands", region: "Europe", popular: false },
  { code: "GGP", name: "Guernsey Pound", symbol: "\u00A3", flag: "\u{1F1EC}\u{1F1EC}", country: "Guernsey", region: "Europe", popular: false },
  { code: "GIP", name: "Gibraltar Pound", symbol: "\u00A3", flag: "\u{1F1EC}\u{1F1EE}", country: "Gibraltar", region: "Europe", popular: false },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q", flag: "\u{1F1EC}\u{1F1F9}", country: "Guatemala", region: "North America", popular: false },
  { code: "HNL", name: "Honduran Lempira", symbol: "L", flag: "\u{1F1ED}\u{1F1F3}", country: "Honduras", region: "North America", popular: false },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", flag: "\u{1F1ED}\u{1F1F7}", country: "Croatia", region: "Europe", popular: false },
  { code: "IMP", name: "Isle of Man Pound", symbol: "\u00A3", flag: "\u{1F1EE}\u{1F1F2}", country: "Isle of Man", region: "Europe", popular: false },
  { code: "JEP", name: "Jersey Pound", symbol: "\u00A3", flag: "\u{1F1EF}\u{1F1EA}", country: "Jersey", region: "Europe", popular: false },
  { code: "KID", name: "Kiribati Dollar", symbol: "$", flag: "\u{1F1F0}\u{1F1EE}", country: "Kiribati", region: "Oceania", popular: false },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "UM", flag: "\u{1F1F2}\u{1F1F7}", country: "Mauritania", region: "Africa", popular: false },
  { code: "NIO", name: "Nicaraguan C\u00F3rdoba", symbol: "C$", flag: "\u{1F1F3}\u{1F1EE}", country: "Nicaragua", region: "North America", popular: false },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/.", flag: "\u{1F1F5}\u{1F1E6}", country: "Panama", region: "North America", popular: false },
  { code: "SHP", name: "Saint Helena Pound", symbol: "\u00A3", flag: "\u{1F1F8}\u{1F1ED}", country: "Saint Helena", region: "Africa", popular: false },
  { code: "SLL", name: "Sierra Leonean Leone (old)", symbol: "Le", flag: "\u{1F1F8}\u{1F1F1}", country: "Sierra Leone", region: "Africa", popular: false },
  { code: "TVD", name: "Tuvaluan Dollar", symbol: "$", flag: "\u{1F1F9}\u{1F1FB}", country: "Tuvalu", region: "Oceania", popular: false },
  { code: "XCG", name: "Caribbean Guilder", symbol: "\u0192", flag: "\u{1F1E8}\u{1F1FC}", country: "Cura\u00E7ao", region: "Caribbean", popular: false },
  { code: "XDR", name: "IMF Special Drawing Rights", symbol: "SDR", flag: "\u{1F1FA}\u{1F1F3}", country: "International", region: "Europe", popular: false },
  { code: "ZWG", name: "Zimbabwe Gold", symbol: "ZiG", flag: "\u{1F1FF}\u{1F1FC}", country: "Zimbabwe", region: "Africa", popular: false },
];

// Top pairs for /currency/:pair programmatic SEO pages.
// 20 majors cross-product ≈ 380 pairs. Expand by editing this list.
export const POPULAR_CURRENCIES = CURRENCIES.filter((c) => c.popular).map((c) => c.code);

// Curated 20-currency list for /currency/:pair programmatic SEO pages.
// 20 × 19 = 380 one-directional pairs. Add a code here to grow the set.
export const PAIR_PAGE_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "NZD",
  "HKD", "SGD", "SEK", "NOK", "DKK", "KRW", "BRL", "MXN", "ZAR", "AED",
];

// Region order for grouped dropdowns
export const CURRENCY_REGION_ORDER = [
  "North America",
  "South America",
  "Europe",
  "Middle East",
  "Asia",
  "Africa",
  "Oceania",
  "Caribbean",
];

export function getCurrency(code) {
  return CURRENCIES.find((c) => c.code === code);
}

export function formatCurrencyAmount(value, code) {
  const c = getCurrency(code);
  if (!c) return value.toFixed(2);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      maximumFractionDigits: value >= 1000 ? 0 : 2,
    }).format(value);
  } catch {
    return `${c.symbol}${value.toFixed(2)}`;
  }
}