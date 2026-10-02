import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const pub  = join(root, 'public')
const data = join(root, 'src/data')

const ccSrc   = readFileSync(join(data, 'countryCodes.js'), 'utf8')
const suppSrc = readFileSync(join(data, 'holidaysSupplement.js'), 'utf8')

const countries = []
let m
const nagerRe = /\{ code: '([A-Z]{2})', name: '([^']+)', region: '([^']+)' \}/g
while ((m = nagerRe.exec(ccSrc)) !== null) countries.push({ code: m[1], name: m[2] })
const suppRe = /^\s{2}([A-Z]{2}): \{\r?\n\s*name: '([^']+)'/gm
while ((m = suppRe.exec(suppSrc)) !== null) countries.push({ code: m[1], name: m[2] })

console.log('Countries found:', countries.length)

const year = new Date().getFullYear()
const years = [year, year + 1]
const base = 'https://timegovern.com'
const today = new Date().toISOString().slice(0, 10)

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
let n = 0
xml += `  <url><loc>${base}/holidays</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`
n++
for (const c of countries) {
  const cc = c.code.toLowerCase()
  for (const y of years) {
    xml += `  <url><loc>${base}/holidays/${cc}/${y}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`
    xml += `  <url><loc>${base}/holidays/${cc}/${y}/long-weekends</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`
    n += 2
  }
}
xml += '</urlset>\n'
writeFileSync(join(pub, 'sitemap-holidays.xml'), xml)
console.log('sitemap-holidays.xml URLs:', n)

const idxPath = join(pub, 'sitemap-index.xml')
let idx = readFileSync(idxPath, 'utf8')
if (!idx.includes('sitemap-holidays.xml')) {
  const entry = `  <sitemap><loc>${base}/sitemap-holidays.xml</loc><lastmod>${today}</lastmod></sitemap>\n`
  idx = idx.replace('</sitemapindex>', entry + '</sitemapindex>')
  writeFileSync(idxPath, idx)
  console.log('sitemap-index.xml updated')
} else {
  console.log('sitemap-index.xml already has holidays')
}

const siPath = join(data, 'searchIndex.js')
let si = readFileSync(siPath, 'utf8')
if (si.includes('href: "/holidays"')) {
  console.log('searchIndex.js already has /holidays')
} else {
  const closeIdx = si.lastIndexOf(']')
  if (closeIdx < 0) { console.error('No closing bracket'); process.exit(1) }
  const lines = []
  lines.push(`  { name: "Public Holidays", href: "/holidays", tagline: "${countries.length} countries" },`)
  for (const c of countries) {
    lines.push(`  { name: "${c.name} Holidays", href: "/holidays/${c.code.toLowerCase()}/${year}", tagline: "Public holidays" },`)
  }
  si = si.slice(0, closeIdx) + '\n' + lines.join('\n') + '\n' + si.slice(closeIdx)
  writeFileSync(siPath, si)
  console.log('searchIndex.js appended:', lines.length, 'entries')
}