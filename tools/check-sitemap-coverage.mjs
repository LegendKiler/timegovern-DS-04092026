#!/usr/bin/env node
// tools/check-sitemap-coverage.mjs
// Fails if any /blog route in src/App.jsx is missing from public/sitemap-blog.xml.
// --strict : exit 1 on missing (use in prebuild). Default: warn only (use in predev).

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const strict = process.argv.includes('--strict')
const ROOT = process.cwd()
const APP = resolve(ROOT, 'src/App.jsx')
const SM  = resolve(ROOT, 'public/sitemap-blog.xml')
const BASE = 'https://timegovern.com'

const appSrc = readFileSync(APP, 'utf8')
const routes = new Set()
for (const m of appSrc.matchAll(/path="(\/blog[^"]*)"/g)) routes.add(m[1])

const smSrc = readFileSync(SM, 'utf8')
const inSm = new Set()
for (const m of smSrc.matchAll(/<loc>([^<]+)<\/loc>/g)) inSm.add(m[1].replace(BASE, ''))

const missing = [...routes].filter(r => !inSm.has(r)).sort()
const orphan  = [...inSm].filter(r => !routes.has(r)).sort()

console.log(`[sitemap-coverage] routes=${routes.size} sitemap=${inSm.size} missing=${missing.length} orphan=${orphan.length}`)
if (missing.length) { console.log('MISSING:'); missing.forEach(r => console.log('  ' + r)) }
if (orphan.length)  { console.log('ORPHAN (sitemap URL has no route):'); orphan.forEach(r => console.log('  ' + r)) }

if (missing.length && strict) {
  console.error('[sitemap-coverage] FAIL: run `npm run sitemap:blog` then rebuild.')
  process.exit(1)
}
if (orphan.length && strict) {
  console.error('[sitemap-coverage] FAIL: orphan sitemap URLs (404 bait).')
  process.exit(1)
}