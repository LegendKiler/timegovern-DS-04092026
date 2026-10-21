export const COUNTRY_PROFILES = {
  al: { name: "Albania", iso2: "AL", iso3: "ALB", dialCode: "+355", capital: "Tirana", population: "2,866,952", area: "28,748 KM²", currency: "Lek (ALL)", languages: "Albanian", timezone: "Europe/Tirane", cityForTime: "tirana" },
  dz: { name: "Algeria", iso2: "DZ", iso3: "DZA", dialCode: "+213", capital: "Algiers", population: "43,851,044", area: "2,381,741 KM²", currency: "Dinar (DZD)", languages: "Arabic", timezone: "Africa/Algiers", cityForTime: "algiers" },
  us: { name: "United States", iso2: "US", iso3: "USA", dialCode: "+1", capital: "Washington, D.C.", population: "331,002,651", area: "9,833,520 KM²", currency: "US Dollar (USD)", languages: "English", timezone: "America/New_York", cityForTime: "new-york" },
  gb: { name: "United Kingdom", iso2: "GB", iso3: "GBR", dialCode: "+44", capital: "London", population: "67,886,011", area: "243,610 KM²", currency: "Pound (GBP)", languages: "English", timezone: "Europe/London", cityForTime: "london" },
  eg: { name: "Egypt", iso2: "EG", iso3: "EGY", dialCode: "+20", capital: "Cairo", population: "102,334,404", area: "1,002,450 KM²", currency: "Pound (EGP)", languages: "Arabic", timezone: "Africa/Cairo", cityForTime: "cairo" }
}
export const getAllCountries = () => Object.values(COUNTRY_PROFILES);
export const getCountryProfile = (code) => COUNTRY_PROFILES[code.toLowerCase()];