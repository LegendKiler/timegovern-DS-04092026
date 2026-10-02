import { SUPPLEMENTAL_HOLIDAYS } from './holidaysSupplement'

// Countries supported by the Nager.Date public-holiday API.
// Authoritative list verified 2026-10-01 against:
//   https://date.nager.at/api/v3/AvailableCountries (204 entries)
//
// Notes:
//   - 'UK' is NOT a valid code -- use 'GB'.
//   - 'IN', 'AE', 'SA', 'TH', 'MY', 'IL' are not currently supported.
//   - Non-ASCII display names use \uXXXX escapes so the file survives
//     any terminal encoding (same convention as data/countryNames.js).

const NAGER_COUNTRIES = [
  // ---------------- Europe ----------------
  { code: 'AD', name: 'Andorra', region: 'Europe' },
  { code: 'AL', name: 'Albania', region: 'Europe' },
  { code: 'AT', name: 'Austria', region: 'Europe' },
  { code: 'AX', name: '\u00c5land Islands', region: 'Europe' },
  { code: 'BA', name: 'Bosnia and Herzegovina', region: 'Europe' },
  { code: 'BE', name: 'Belgium', region: 'Europe' },
  { code: 'BG', name: 'Bulgaria', region: 'Europe' },
  { code: 'BY', name: 'Belarus', region: 'Europe' },
  { code: 'CH', name: 'Switzerland', region: 'Europe' },
  { code: 'CY', name: 'Cyprus', region: 'Europe' },
  { code: 'CZ', name: 'Czechia', region: 'Europe' },
  { code: 'DE', name: 'Germany', region: 'Europe' },
  { code: 'DK', name: 'Denmark', region: 'Europe' },
  { code: 'EE', name: 'Estonia', region: 'Europe' },
  { code: 'ES', name: 'Spain', region: 'Europe' },
  { code: 'FI', name: 'Finland', region: 'Europe' },
  { code: 'FO', name: 'Faroe Islands', region: 'Europe' },
  { code: 'FR', name: 'France', region: 'Europe' },
  { code: 'GB', name: 'United Kingdom', region: 'Europe' },
  { code: 'GG', name: 'Guernsey', region: 'Europe' },
  { code: 'GI', name: 'Gibraltar', region: 'Europe' },
  { code: 'GR', name: 'Greece', region: 'Europe' },
  { code: 'HR', name: 'Croatia', region: 'Europe' },
  { code: 'HU', name: 'Hungary', region: 'Europe' },
  { code: 'IE', name: 'Ireland', region: 'Europe' },
  { code: 'IM', name: 'Isle of Man', region: 'Europe' },
  { code: 'IS', name: 'Iceland', region: 'Europe' },
  { code: 'IT', name: 'Italy', region: 'Europe' },
  { code: 'JE', name: 'Jersey', region: 'Europe' },
  { code: 'LI', name: 'Liechtenstein', region: 'Europe' },
  { code: 'LT', name: 'Lithuania', region: 'Europe' },
  { code: 'LU', name: 'Luxembourg', region: 'Europe' },
  { code: 'LV', name: 'Latvia', region: 'Europe' },
  { code: 'MC', name: 'Monaco', region: 'Europe' },
  { code: 'MD', name: 'Moldova', region: 'Europe' },
  { code: 'ME', name: 'Montenegro', region: 'Europe' },
  { code: 'MK', name: 'North Macedonia', region: 'Europe' },
  { code: 'MT', name: 'Malta', region: 'Europe' },
  { code: 'NL', name: 'Netherlands', region: 'Europe' },
  { code: 'NO', name: 'Norway', region: 'Europe' },
  { code: 'PL', name: 'Poland', region: 'Europe' },
  { code: 'PT', name: 'Portugal', region: 'Europe' },
  { code: 'RO', name: 'Romania', region: 'Europe' },
  { code: 'RS', name: 'Serbia', region: 'Europe' },
  { code: 'RU', name: 'Russia', region: 'Europe' },
  { code: 'SE', name: 'Sweden', region: 'Europe' },
  { code: 'SI', name: 'Slovenia', region: 'Europe' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', region: 'Europe' },
  { code: 'SK', name: 'Slovakia', region: 'Europe' },
  { code: 'SM', name: 'San Marino', region: 'Europe' },
  { code: 'UA', name: 'Ukraine', region: 'Europe' },
  { code: 'VA', name: 'Vatican City', region: 'Europe' },

  // ---------------- North America ----------------
  { code: 'BM', name: 'Bermuda', region: 'North America' },
  { code: 'CA', name: 'Canada', region: 'North America' },
  { code: 'GL', name: 'Greenland', region: 'North America' },
  { code: 'MX', name: 'Mexico', region: 'North America' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', region: 'North America' },
  { code: 'US', name: 'United States', region: 'North America' },

  // ---------------- Central America ----------------
  { code: 'BZ', name: 'Belize', region: 'Central America' },
  { code: 'CR', name: 'Costa Rica', region: 'Central America' },
  { code: 'GT', name: 'Guatemala', region: 'Central America' },
  { code: 'HN', name: 'Honduras', region: 'Central America' },
  { code: 'NI', name: 'Nicaragua', region: 'Central America' },
  { code: 'PA', name: 'Panama', region: 'Central America' },
  { code: 'SV', name: 'El Salvador', region: 'Central America' },

  // ---------------- Caribbean ----------------
  { code: 'AG', name: 'Antigua and Barbuda', region: 'Caribbean' },
  { code: 'AI', name: 'Anguilla', region: 'Caribbean' },
  { code: 'AW', name: 'Aruba', region: 'Caribbean' },
  { code: 'BB', name: 'Barbados', region: 'Caribbean' },
  { code: 'BL', name: 'Saint Barth\u00e9lemy', region: 'Caribbean' },
  { code: 'BQ', name: 'Caribbean Netherlands', region: 'Caribbean' },
  { code: 'BS', name: 'Bahamas', region: 'Caribbean' },
  { code: 'CU', name: 'Cuba', region: 'Caribbean' },
  { code: 'CW', name: 'Cura\u00e7ao', region: 'Caribbean' },
  { code: 'DM', name: 'Dominica', region: 'Caribbean' },
  { code: 'DO', name: 'Dominican Republic', region: 'Caribbean' },
  { code: 'GD', name: 'Grenada', region: 'Caribbean' },
  { code: 'GP', name: 'Guadeloupe', region: 'Caribbean' },
  { code: 'HT', name: 'Haiti', region: 'Caribbean' },
  { code: 'JM', name: 'Jamaica', region: 'Caribbean' },
  { code: 'KN', name: 'Saint Kitts and Nevis', region: 'Caribbean' },
  { code: 'KY', name: 'Cayman Islands', region: 'Caribbean' },
  { code: 'LC', name: 'Saint Lucia', region: 'Caribbean' },
  { code: 'MF', name: 'Saint Martin', region: 'Caribbean' },
  { code: 'MQ', name: 'Martinique', region: 'Caribbean' },
  { code: 'MS', name: 'Montserrat', region: 'Caribbean' },
  { code: 'PR', name: 'Puerto Rico', region: 'Caribbean' },
  { code: 'SX', name: 'Sint Maarten', region: 'Caribbean' },
  { code: 'TC', name: 'Turks and Caicos Islands', region: 'Caribbean' },
  { code: 'TT', name: 'Trinidad and Tobago', region: 'Caribbean' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', region: 'Caribbean' },
  { code: 'VG', name: 'British Virgin Islands', region: 'Caribbean' },
  { code: 'VI', name: 'U.S. Virgin Islands', region: 'Caribbean' },

  // ---------------- South America ----------------
  { code: 'AR', name: 'Argentina', region: 'South America' },
  { code: 'BO', name: 'Bolivia', region: 'South America' },
  { code: 'BR', name: 'Brazil', region: 'South America' },
  { code: 'CL', name: 'Chile', region: 'South America' },
  { code: 'CO', name: 'Colombia', region: 'South America' },
  { code: 'EC', name: 'Ecuador', region: 'South America' },
  { code: 'FK', name: 'Falkland Islands', region: 'South America' },
  { code: 'GF', name: 'French Guiana', region: 'South America' },
  { code: 'GY', name: 'Guyana', region: 'South America' },
  { code: 'PE', name: 'Peru', region: 'South America' },
  { code: 'PY', name: 'Paraguay', region: 'South America' },
  { code: 'SR', name: 'Suriname', region: 'South America' },
  { code: 'UY', name: 'Uruguay', region: 'South America' },
  { code: 'VE', name: 'Venezuela', region: 'South America' },

  // ---------------- Asia ----------------
  { code: 'AM', name: 'Armenia', region: 'Asia' },
  { code: 'BD', name: 'Bangladesh', region: 'Asia' },
  { code: 'CN', name: 'China', region: 'Asia' },
  { code: 'GE', name: 'Georgia', region: 'Asia' },
  { code: 'HK', name: 'Hong Kong', region: 'Asia' },
  { code: 'ID', name: 'Indonesia', region: 'Asia' },
  { code: 'JP', name: 'Japan', region: 'Asia' },
  { code: 'KH', name: 'Cambodia', region: 'Asia' },
  { code: 'KR', name: 'South Korea', region: 'Asia' },
  { code: 'KZ', name: 'Kazakhstan', region: 'Asia' },
  { code: 'MN', name: 'Mongolia', region: 'Asia' },
  { code: 'PH', name: 'Philippines', region: 'Asia' },
  { code: 'SG', name: 'Singapore', region: 'Asia' },
  { code: 'VN', name: 'Vietnam', region: 'Asia' },

  // ---------------- Middle East ----------------
  { code: 'BH', name: 'Bahrain', region: 'Middle East' },
  { code: 'IQ', name: 'Iraq', region: 'Middle East' },
  { code: 'SY', name: 'Syria', region: 'Middle East' },
  { code: 'TR', name: 'T\u00fcrkiye', region: 'Middle East' },
  { code: 'YE', name: 'Yemen', region: 'Middle East' },

  // ---------------- Africa ----------------
  { code: 'AO', name: 'Angola', region: 'Africa' },
  { code: 'BF', name: 'Burkina Faso', region: 'Africa' },
  { code: 'BI', name: 'Burundi', region: 'Africa' },
  { code: 'BJ', name: 'Benin', region: 'Africa' },
  { code: 'BW', name: 'Botswana', region: 'Africa' },
  { code: 'CD', name: 'DR Congo', region: 'Africa' },
  { code: 'CF', name: 'Central African Republic', region: 'Africa' },
  { code: 'CG', name: 'Republic of the Congo', region: 'Africa' },
  { code: 'CI', name: 'Ivory Coast', region: 'Africa' },
  { code: 'CM', name: 'Cameroon', region: 'Africa' },
  { code: 'CV', name: 'Cape Verde', region: 'Africa' },
  { code: 'DJ', name: 'Djibouti', region: 'Africa' },
  { code: 'DZ', name: 'Algeria', region: 'Africa' },
  { code: 'EG', name: 'Egypt', region: 'Africa' },
  { code: 'ER', name: 'Eritrea', region: 'Africa' },
  { code: 'ET', name: 'Ethiopia', region: 'Africa' },
  { code: 'GA', name: 'Gabon', region: 'Africa' },
  { code: 'GH', name: 'Ghana', region: 'Africa' },
  { code: 'GM', name: 'Gambia', region: 'Africa' },
  { code: 'GN', name: 'Guinea', region: 'Africa' },
  { code: 'GQ', name: 'Equatorial Guinea', region: 'Africa' },
  { code: 'GW', name: 'Guinea-Bissau', region: 'Africa' },
  { code: 'KE', name: 'Kenya', region: 'Africa' },
  { code: 'KM', name: 'Comoros', region: 'Africa' },
  { code: 'LR', name: 'Liberia', region: 'Africa' },
  { code: 'LS', name: 'Lesotho', region: 'Africa' },
  { code: 'LY', name: 'Libya', region: 'Africa' },
  { code: 'MA', name: 'Morocco', region: 'Africa' },
  { code: 'MG', name: 'Madagascar', region: 'Africa' },
  { code: 'ML', name: 'Mali', region: 'Africa' },
  { code: 'MR', name: 'Mauritania', region: 'Africa' },
  { code: 'MW', name: 'Malawi', region: 'Africa' },
  { code: 'MZ', name: 'Mozambique', region: 'Africa' },
  { code: 'NA', name: 'Namibia', region: 'Africa' },
  { code: 'NE', name: 'Niger', region: 'Africa' },
  { code: 'NG', name: 'Nigeria', region: 'Africa' },
  { code: 'RW', name: 'Rwanda', region: 'Africa' },
  { code: 'SC', name: 'Seychelles', region: 'Africa' },
  { code: 'SD', name: 'Sudan', region: 'Africa' },
  { code: 'SH', name: 'Saint Helena', region: 'Africa' },
  { code: 'SL', name: 'Sierra Leone', region: 'Africa' },
  { code: 'SN', name: 'Senegal', region: 'Africa' },
  { code: 'SO', name: 'Somalia', region: 'Africa' },
  { code: 'SS', name: 'South Sudan', region: 'Africa' },
  { code: 'ST', name: 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', region: 'Africa' },
  { code: 'SZ', name: 'Eswatini', region: 'Africa' },
  { code: 'TD', name: 'Chad', region: 'Africa' },
  { code: 'TG', name: 'Togo', region: 'Africa' },
  { code: 'TN', name: 'Tunisia', region: 'Africa' },
  { code: 'TZ', name: 'Tanzania', region: 'Africa' },
  { code: 'UG', name: 'Uganda', region: 'Africa' },
  { code: 'ZA', name: 'South Africa', region: 'Africa' },
  { code: 'ZM', name: 'Zambia', region: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', region: 'Africa' },

  // ---------------- Oceania ----------------
  { code: 'AU', name: 'Australia', region: 'Oceania' },
  { code: 'CC', name: 'Cocos (Keeling) Islands', region: 'Oceania' },
  { code: 'CK', name: 'Cook Islands', region: 'Oceania' },
  { code: 'CX', name: 'Christmas Island', region: 'Oceania' },
  { code: 'FM', name: 'Micronesia', region: 'Oceania' },
  { code: 'KI', name: 'Kiribati', region: 'Oceania' },
  { code: 'MH', name: 'Marshall Islands', region: 'Oceania' },
  { code: 'MP', name: 'Northern Mariana Islands', region: 'Oceania' },
  { code: 'NC', name: 'New Caledonia', region: 'Oceania' },
  { code: 'NF', name: 'Norfolk Island', region: 'Oceania' },
  { code: 'NR', name: 'Nauru', region: 'Oceania' },
  { code: 'NU', name: 'Niue', region: 'Oceania' },
  { code: 'NZ', name: 'New Zealand', region: 'Oceania' },
  { code: 'PF', name: 'French Polynesia', region: 'Oceania' },
  { code: 'PG', name: 'Papua New Guinea', region: 'Oceania' },
  { code: 'PN', name: 'Pitcairn Islands', region: 'Oceania' },
  { code: 'PW', name: 'Palau', region: 'Oceania' },
  { code: 'SB', name: 'Solomon Islands', region: 'Oceania' },
  { code: 'TK', name: 'Tokelau', region: 'Oceania' },
  { code: 'TO', name: 'Tonga', region: 'Oceania' },
  { code: 'TV', name: 'Tuvalu', region: 'Oceania' },
  { code: 'VU', name: 'Vanuatu', region: 'Oceania' },
  { code: 'WF', name: 'Wallis and Futuna', region: 'Oceania' },
  { code: 'WS', name: 'Samoa', region: 'Oceania' },
]

const SUPPLEMENTAL_ENTRIES = Object.entries(SUPPLEMENTAL_HOLIDAYS).map(([code, d]) => ({
  code,
  name: d.name,
  region: d.region,
  supplemental: true,
}))

export const HOLIDAY_COUNTRIES = [...NAGER_COUNTRIES, ...SUPPLEMENTAL_ENTRIES]

// Preferred display order for the /holidays hub.
export const REGION_ORDER = [
  'Europe',
  'North America',
  'Central America',
  'Caribbean',
  'South America',
  'Asia',
  'Middle East',
  'Africa',
  'Oceania',
]

export const HOLIDAY_COUNTRIES_BY_REGION = REGION_ORDER.reduce((acc, r) => {
  acc[r] = HOLIDAY_COUNTRIES.filter(c => c.region === r)
  return acc
}, {})

const BY_CODE = Object.fromEntries(
  HOLIDAY_COUNTRIES.map(c => [c.code, c])
)

export function getHolidayCountry(code) {
  if (!code) return null
  return BY_CODE[String(code).toUpperCase()] || null
}

export function isHolidayCountrySupported(code) {
  return !!getHolidayCountry(code)
}