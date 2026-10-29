#!/usr/bin/env node
// tools/patch-sitemap-blog.mjs
// Idempotent: appends <url> entries for any /blog route in src/App.jsx
// that is missing from public/sitemap-blog.xml.
// Line-index edit (insert before the single </urlset> line). No string-splice.

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = process.cwd()
const APP = resolve(ROOT, 'src/App.jsx')
const SM  = resolve(ROOT, 'public/sitemap-blog.xml')
const BASE = 'https://timegovern.com'
const TODAY = new Date().toISOString().slice(0, 10)

for (const p of [APP, SM]) {
  if (!existsSync(p)) { console.error(`MISSING FILE: ${p}`); process.exit(1) }
}

// ---- 1. Extract /blog routes from App.jsx (single source of truth) ----
const appSrc = readFileSync(APP, 'utf8')
const routes = new Set()
for (const m of appSrc.matchAll(/path="(\/blog[^"]*)"/g)) routes.add(m[1])
console.log(`App.jsx /blog routes: ${routes.size}`)
if (routes.size < 100) {
  console.error(`SANITY FAIL: only ${routes.size} /blog routes found (expected >100). Aborting.`)
  process.exit(1)
}

// ---- 2. Load + assert anchors ----
const smSrc = readFileSync(SM, 'utf8')
const eol = smSrc.includes('\r\n') ? '\r\n' : '\n'
const lines = smSrc.split(/\r?\n/)

const closeHits = lines.map((l, i) => ({ l: l.trim(), i })).filter(x => x.l === '</urlset>')
if (closeHits.length !== 1) {
  console.error(`ANCHOR FAIL: expected exactly 1 </urlset>, found ${closeHits.length}`)
  process.exit(1)
}
const openCount = lines.filter(l => /<urlset\b/.test(l)).length
if (openCount !== 1) {
  console.error(`ANCHOR FAIL: expected exactly 1 <urlset> opener, found ${openCount}`)
  process.exit(1)
}
const closeIdx = closeHits[0].i

// ---- 3. Diff ----
const existingPaths = new Set()
for (const m of smSrc.matchAll(/<loc>([^<]+)<\/loc>/g)) existingPaths.add(m[1].replace(BASE, ''))

const missing = [...routes].filter(r => !existingPaths.has(r)).sort()
console.log(`Existing in sitemap: ${existingPaths.size}`)
console.log(`Missing:             ${missing.length}`)
if (missing.length === 0) { console.log('OK: nothing to do.'); process.exit(0) }

// ---- 4. Match existing entry style ----
const hasChangefreq = /<changefreq>/.test(smSrc)
const hasPriority   = /<priority>/.test(smSrc)

// ---- 5. Backup ----
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const bak = `${SM}.before-coverage-${stamp}.bak`
copyFileSync(SM, bak)
console.log(`Backup: ${bak}`)

// ---- 6. Line-index insert ----
const insert = []
for (const r of missing) {
  insert.push('  <url>')
  insert.push(`    <loc>${BASE}${r}</loc>`)
  insert.push(`    <lastmod>${TODAY}</lastmod>`)
  if (hasChangefreq) insert.push('    <changefreq>monthly</changefreq>')
  if (hasPriority)   insert.push('    <priority>0.6</priority>')
  insert.push('  </url>')
}
const next = [...lines.slice(0, closeIdx), ...insert, ...lines.slice(closeIdx)]
writeFileSync(SM, next.join(eol), 'utf8')

// ---- 7. Self-verify ----
const after = readFileSync(SM, 'utf8')
const afterLocs = (after.match(/<loc>/g) || []).length
const expected = existingPaths.size + missing.length
if (afterLocs !== expected) {
  console.error(`VERIFY FAIL: <loc> count ${afterLocs} != expected ${expected}`)
  process.exit(1)
}
console.log(`RESULT: inserted ${missing.length} <url> entries before </urlset> (was line ${closeIdx + 1}).`)
console.log(`RESULT: sitemap-blog.xml now has ${afterLocs} <loc> entries (expected ${expected}).`)