#!/usr/bin/env node
// tools/patch-legal-routes.mjs
// Idempotent: routes 9 orphaned legal pages into App.jsx, SiteMap.jsx, sitemap-core.xml.
// Line-index edits. Anchor-asserted. Writes nothing if any verify fails.

import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = process.cwd()
const APP  = resolve(ROOT, 'src/App.jsx')
const SMAP = resolve(ROOT, 'src/pages/SiteMap.jsx')
const SMC  = resolve(ROOT, 'public/sitemap-core.xml')
const BACKUPS = resolve(ROOT, '_backups')
const BASE  = 'https://timegovern.com'
const TODAY = new Date().toISOString().slice(0, 10)

for (const p of [APP, SMAP, SMC]) {
  if (!existsSync(p)) { console.error(`MISSING: ${p}`); process.exit(1) }
}
if (!existsSync(BACKUPS)) mkdirSync(BACKUPS, { recursive: true })

const stamp = new Date().toISOString().replace(/[:.]/g, '-')

const PAGES = [
  { name: 'AfricaPrivacy',        slug: 'africa-privacy',        label: 'Africa Privacy' },
  { name: 'IndiaPrivacy',         slug: 'india-privacy',         label: 'India Privacy' },
  { name: 'SingaporePrivacy',     slug: 'singapore-privacy',     label: 'Singapore Privacy' },
  { name: 'LatinAmericaPrivacy',  slug: 'latin-america-privacy', label: 'Latin America Privacy' },
  { name: 'MiddleEastPrivacy',    slug: 'middle-east-privacy',   label: 'Middle East Privacy' },
  { name: 'SouthAsiaPrivacy',     slug: 'south-asia-privacy',    label: 'South Asia Privacy' },
  { name: 'UsPrivacy',            slug: 'us-privacy',            label: 'US Privacy' },
  { name: 'UsPrivacyState',       slug: 'us-privacy-state',      label: 'US State Privacy' },
  { name: 'AsiaPacificPrivacy',   slug: 'asia-pacific-privacy',  label: 'Asia Pacific Privacy' },
]

// ===== App.jsx =====
const appSrc0 = readFileSync(APP, 'utf8')
const appEol  = appSrc0.includes('\r\n') ? '\r\n' : '\n'
const appLines = appSrc0.split(/\r?\n/)

const impHits = appLines
  .map((l, i) => ({ l, i }))
  .filter(x => x.l.includes("const PrivacySettings = lazy(() => import('./pages/legal/PrivacySettings'))"))
if (impHits.length !== 1) {
  console.error(`APP ANCHOR FAIL (import): found ${impHits.length} matches`)
  process.exit(1)
}
const impIdx = impHits[0].i
const impIndent = (appLines[impIdx].match(/^(\s*)/) || ['', ''])[1]

const missingImports = PAGES.filter(p => !appSrc0.includes(`const ${p.name} = lazy(`))
if (missingImports.length) {
  const insert = missingImports.map(p => `${impIndent}const ${p.name} = lazy(() => import('./pages/legal/${p.name}'))`)
  appLines.splice(impIdx + 1, 0, ...insert)
}

const routeHits = appLines
  .map((l, i) => ({ l, i }))
  .filter(x => x.l.includes('path="/privacy-settings"') && x.l.includes('<PrivacySettings />'))
if (routeHits.length !== 1) {
  console.error(`APP ANCHOR FAIL (route): found ${routeHits.length} matches`)
  process.exit(1)
}
const routeIdx = routeHits[0].i
const routeIndent = (appLines[routeIdx].match(/^(\s*)/) || ['', ''])[1]

const missingRoutes = PAGES.filter(p => !appSrc0.includes(`path="/${p.slug}"`))
if (missingRoutes.length) {
  const insert = missingRoutes.map(p => `${routeIndent}<Route path="/${p.slug}" element={<${p.name} />} />`)
  appLines.splice(routeIdx + 1, 0, ...insert)
}

// ===== SiteMap.jsx =====
const smapSrc0 = readFileSync(SMAP, 'utf8')
const smapEol  = smapSrc0.includes('\r\n') ? '\r\n' : '\n'
const smapLines = smapSrc0.split(/\r?\n/)

const anchorText = '{ to: "/privacy", label: "Privacy" },'
const smapHits = smapLines
  .map((l, i) => ({ l, i }))
  .filter(x => x.l.trim() === anchorText)
if (smapHits.length !== 1) {
  console.error(`SMAP ANCHOR FAIL: found ${smapHits.length} matches for "${anchorText}"`)
  process.exit(1)
}
const smapIdx = smapHits[0].i
const smapIndent = (smapLines[smapIdx].match(/^(\s*)/) || ['', '  '])[1]

const missingSmap = PAGES.filter(p => !smapSrc0.includes(`to: "/${p.slug}"`))
if (missingSmap.length) {
  const insert = missingSmap.map(p => `${smapIndent}{ to: "/${p.slug}", label: "${p.label}" },`)
  smapLines.splice(smapIdx + 1, 0, ...insert)
}

// ===== sitemap-core.xml =====
const smcSrc0 = readFileSync(SMC, 'utf8')
const smcEol  = smcSrc0.includes('\r\n') ? '\r\n' : '\n'
const smcLines = smcSrc0.split(/\r?\n/)

const closeHits = smcLines.map((l, i) => ({ l, i })).filter(x => x.l.trim() === '</urlset>')
if (closeHits.length !== 1) {
  console.error(`SMC ANCHOR FAIL (close): found ${closeHits.length} </urlset>`)
  process.exit(1)
}
const closeIdx = closeHits[0].i

const openHits = smcLines.map((l, i) => ({ l, i })).filter(x => /<urlset\b/.test(x.l))
if (openHits.length !== 1) {
  console.error(`SMC ANCHOR FAIL (open): found ${openHits.length} <urlset>`)
  process.exit(1)
}

const hasLastmod    = /<lastmod>/.test(smcSrc0)
const hasChangefreq = /<changefreq>/.test(smcSrc0)
const hasPriority   = /<priority>/.test(smcSrc0)
const urlLineSample = smcLines.find(l => l.trim() === '<url>')
const xmlIndent     = urlLineSample ? (urlLineSample.match(/^(\s*)/) || ['', '  '])[1] : '  '
const xmlChildIndent = xmlIndent + '  '

const missingXml = PAGES.filter(p => !smcSrc0.includes(`<loc>${BASE}/${p.slug}</loc>`))
if (missingXml.length) {
  const insert = []
  for (const p of missingXml) {
    insert.push(`${xmlIndent}<url>`)
    insert.push(`${xmlChildIndent}<loc>${BASE}/${p.slug}</loc>`)
    if (hasLastmod)    insert.push(`${xmlChildIndent}<lastmod>${TODAY}</lastmod>`)
    if (hasChangefreq) insert.push(`${xmlChildIndent}<changefreq>monthly</changefreq>`)
    if (hasPriority)   insert.push(`${xmlChildIndent}<priority>0.6</priority>`)
    insert.push(`${xmlIndent}</url>`)
  }
  smcLines.splice(closeIdx, 0, ...insert)
}

// ===== Verify in-memory before writing =====
{
  const aj = appLines.join('\n')
  for (const p of PAGES) {
    if (!aj.includes(`const ${p.name} = lazy(`)) { console.error(`VERIFY: App missing import ${p.name}`); process.exit(1) }
    if (!aj.includes(`path="/${p.slug}"`))      { console.error(`VERIFY: App missing route ${p.slug}`);    process.exit(1) }
  }
  const sj = smapLines.join('\n')
  for (const p of PAGES) {
    if (!sj.includes(`to: "/${p.slug}"`))       { console.error(`VERIFY: SiteMap missing ${p.slug}`);     process.exit(1) }
  }
  const xj = smcLines.join('\n')
  for (const p of PAGES) {
    if (!xj.includes(`<loc>${BASE}/${p.slug}</loc>`)) { console.error(`VERIFY: sitemap-core missing ${p.slug}`); process.exit(1) }
  }
  if (!xj.trimEnd().endsWith('</urlset>')) { console.error('VERIFY: sitemap-core does not end with </urlset>'); process.exit(1) }
}

// ===== Backups + writes =====
for (const [file, label] of [[APP, 'App.jsx'], [SMAP, 'SiteMap.jsx'], [SMC, 'sitemap-core.xml']]) {
  const bak = resolve(BACKUPS, `${label}.before-legal-${stamp}.bak`)
  copyFileSync(file, bak)
  console.log(`Backup: ${bak}`)
}

writeFileSync(APP, appLines.join(appEol), 'utf8')
writeFileSync(SMAP, smapLines.join(smapEol), 'utf8')
writeFileSync(SMC, smcLines.join(smcEol), 'utf8')

console.log(`RESULT: App.jsx   +${missingImports.length} imports, +${missingRoutes.length} routes`)
console.log(`RESULT: SiteMap.jsx +${missingSmap.length} entries`)
console.log(`RESULT: sitemap-core.xml +${missingXml.length} URLs`)