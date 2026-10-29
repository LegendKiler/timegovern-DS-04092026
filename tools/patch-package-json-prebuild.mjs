#!/usr/bin/env node
// tools/patch-package-json-prebuild.mjs
// Idempotent: wires coverage checker into prebuild + adds sitemap:blog script.
// Line-index edit of package.json. Re-parses to verify JSON stays valid.

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const PKG = resolve(process.cwd(), 'package.json')
if (!existsSync(PKG)) { console.error('MISSING package.json'); process.exit(1) }

const src = readFileSync(PKG, 'utf8')
const eol = src.includes('\r\n') ? '\r\n' : '\n'
const lines = src.split(/\r?\n/)

const alreadyWired     = src.includes('check-sitemap-coverage.mjs')
const alreadyHasScript = /"sitemap:blog"\s*:/.test(src)
if (alreadyWired && alreadyHasScript) {
  console.log('RESULT: already patched (prebuild has checker, sitemap:blog exists). No-op.')
  process.exit(0)
}

const prebuildHits = lines.map((l, i) => ({ l, i })).filter(x => /^\s*"prebuild"\s*:/.test(x.l))
if (prebuildHits.length !== 1) {
  console.error(`ANCHOR FAIL: expected exactly 1 "prebuild" line, found ${prebuildHits.length}`)
  process.exit(1)
}
const pbIdx  = prebuildHits[0].i
const pbLine = lines[pbIdx]
const indent = (pbLine.match(/^(\s*)/) || ['', '      '])[1]
const pbHasComma = /,\s*$/.test(pbLine)

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const bak = `${PKG}.before-prebuild-${stamp}.bak`
copyFileSync(PKG, bak)
console.log(`Backup: ${bak}`)

const NEW_PB = 'node scripts/prebuild.mjs && node tools/check-sitemap-coverage.mjs --strict'
const NEW_PB_LINE = `${indent}"prebuild": "${NEW_PB}"${pbHasComma ? ',' : ''}`
const NEW_SB_LINE = `${indent}"sitemap:blog": "node tools/patch-sitemap-blog.mjs",`

const needPbEdit    = !alreadyWired
const needSbInsert  = !alreadyHasScript

if (needPbEdit)   lines[pbIdx] = NEW_PB_LINE
if (needSbInsert) lines.splice(pbIdx, 0, NEW_SB_LINE)

const next = lines.join(eol)
let parsed
try { parsed = JSON.parse(next) } catch (e) {
  console.error(`VERIFY FAIL: JSON.parse threw: ${e.message}`)
  process.exit(1)
}
if (parsed.scripts.prebuild !== NEW_PB) {
  console.error(`VERIFY FAIL: prebuild = "${parsed.scripts.prebuild}" (expected "${NEW_PB}")`)
  process.exit(1)
}
if (parsed.scripts['sitemap:blog'] !== 'node tools/patch-sitemap-blog.mjs') {
  console.error(`VERIFY FAIL: sitemap:blog = "${parsed.scripts['sitemap:blog']}"`)
  process.exit(1)
}

writeFileSync(PKG, next, 'utf8')
console.log(`RESULT: prebuild = "${NEW_PB}"`)
console.log(`RESULT: sitemap:blog = "${parsed.scripts['sitemap:blog']}"`)
console.log(`RESULT: package.json re-parsed cleanly (${Object.keys(parsed.scripts).length} scripts).`)