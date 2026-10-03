import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

// --- 1) Country list ---
const ccSrc = readFileSync(join(root, 'src/data/countryCodes.js'), 'utf8')
const suppSrc = readFileSync(join(root, 'src/data/holidaysSupplement.js'), 'utf8')
const out = []
let m
const re = /code: '([A-Z]{2})', name: '([^']+)'/g
while ((m = re.exec(ccSrc)) !== null) out.push({ code: m[1], name: m[2] })
for (const code of ['PK','IN','AE','SA','TH','MY','IL','LK','NP','KW','QA','OM','JO','LB','MM','LA']) {
  const r = new RegExp(`  ${code}: \\{\\s*name: '([^']+)'`)
  const mm = r.exec(suppSrc)
  if (mm) out.push({ code, name: mm[1] })
}
const seen = new Set()
const countries = out.filter(c => !seen.has(c.code) && seen.add(c.code))
console.log('Countries:', countries.length)

// --- 2) sitemap-holidays.xml ---
const year = new Date().getFullYear()
const base = 'https://timegovern.com'
function gitLastMod(relPath) {
  try {
    const d = execSync('git log -1 --format=%cs -- "' + relPath + '"', { cwd: root }).toString().trim()
    return d || new Date().toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}
const today = gitLastMod('src/data/holidaysSupplement.js')
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
let n = 0
xml += `  <url><loc>${base}/holidays</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`; n++
for (const c of countries) {
  for (const y of [year, year+1]) {
    const cc = c.code.toLowerCase()
    xml += `  <url><loc>${base}/holidays/${cc}/${y}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`
    xml += `  <url><loc>${base}/holidays/${cc}/${y}/long-weekends</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`
    n += 2
  }
}
xml += '</urlset>\n'
writeFileSync(join(root, 'public/sitemap-holidays.xml'), xml)
console.log('sitemap-holidays.xml URLs:', n)

// --- 3) sitemap-index.xml ---
const idxPath = join(root, 'public/sitemap-index.xml')
let idx = readFileSync(idxPath, 'utf8')
if (!idx.includes('sitemap-holidays.xml')) {
  const entry = `  <sitemap><loc>${base}/sitemap-holidays.xml</loc><lastmod>${today}</lastmod></sitemap>\n`
  idx = idx.replace('</sitemapindex>', entry + '</sitemapindex>')
  writeFileSync(idxPath, idx)
  console.log('sitemap-index.xml patched')
} else { console.log('sitemap-index.xml already OK') }

// --- 4) searchIndex.js ---
const siPath = join(root, 'src/data/searchIndex.js')
let si = readFileSync(siPath, 'utf8')
if (si.includes('href: "/holidays"')) {
  console.log('searchIndex.js already OK')
} else {
  const close = si.lastIndexOf(']')
  const lines = [
    `  { name: "Public Holidays", href: "/holidays", tagline: "${countries.length} countries" },`,
    ...countries.map(c => `  { name: "${c.name} Holidays", href: "/holidays/${c.code.toLowerCase()}/${year}", tagline: "Public holidays" },`)
  ]
  si = si.slice(0, close) + lines.join('\n') + '\n' + si.slice(close)
  writeFileSync(siPath, si)
  console.log('searchIndex.js appended:', lines.length, 'entries')
}