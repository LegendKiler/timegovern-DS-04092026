import { COUNTRIES_DATA, REGIONS } from '../src/data/countries.js'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')

const apiDir = resolve(root, 'public/api')
if (!existsSync(apiDir)) mkdirSync(apiDir, { recursive: true })

const payload = {
  meta: {
    source: 'TimeGovern',
    url: 'https://timegovern.com/country-codes',
    license: 'CC BY 4.0',
    attribution: 'Please credit TimeGovern with a link back to https://timegovern.com/country-codes',
    generated: new Date().toISOString(),
    count: COUNTRIES_DATA.length,
  },
  regions: REGIONS,
  countries: COUNTRIES_DATA,
}

writeFileSync(resolve(apiDir, 'countries.json'), JSON.stringify(payload, null, 2))

const escape = (v) => '"' + String(v).replace(/"/g, '""') + '"'
const headers = ['country','iso2','iso3','dial','capital','currency','symbol','area_km2','population','gdp_bn_usd','timezones','emergency','region']
const rows = [headers.join(',')]
for (const c of COUNTRIES_DATA) {
  rows.push([
    escape(c.name), c.c2, c.c3, escape(c.dial), escape(c.capital),
    c.currency, escape(c.symbol), c.area, c.pop, c.gdp,
    escape(c.tz.join('|')), escape(c.emergency), escape(c.region)
  ].join(','))
}
writeFileSync(resolve(apiDir, 'countries.csv'), rows.join('\n'))

console.log('Generated: public/api/countries.json')
console.log('Generated: public/api/countries.csv')
console.log('Countries:', COUNTRIES_DATA.length)