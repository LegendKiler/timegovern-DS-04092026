// scripts/generate-currency-sitemap.mjs
// Generates public/sitemap-currency.xml from PAIR_PAGE_CURRENCIES in src/data/currencies.js
// Run: node scripts/generate-currency-sitemap.mjs

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { PAIR_PAGE_CURRENCIES } from '../src/data/currencies.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'public', 'sitemap-currency.xml')
const today = new Date().toISOString().slice(0, 10)

const urls = []
urls.push({ loc: 'https://timegovern.com/currency-converter', priority: '0.9', freq: 'daily' })

for (const from of PAIR_PAGE_CURRENCIES) {
  for (const to of PAIR_PAGE_CURRENCIES) {
    if (from === to) continue
    urls.push({
      loc: `https://timegovern.com/currency/${from.toLowerCase()}-to-${to.toLowerCase()}`,
      priority: '0.7',
      freq: 'daily',
    })
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`

writeFileSync(outPath, xml, 'utf8')
console.log(`Wrote ${urls.length} URLs to ${outPath}`)