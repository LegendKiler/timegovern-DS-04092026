#!/usr/bin/env node
// tools/patch-package-json-postbuild.mjs
// Idempotent: adds "postbuild": "node scripts/prerender.mjs --all" to package.json.

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const PKG = resolve(process.cwd(), 'package.json')
if (!existsSync(PKG)) { console.error('MISSING package.json'); process.exit(1) }

const src = readFileSync(PKG, 'utf8')
if (/"postbuild"\s*:/.test(src)) { console.log('RESULT: postbuild already present. No-op.'); process.exit(0) }

const eol = src.includes('\r\n') ? '\r\n' : '\n'
const lines = src.split(/\r?\n/)

const hits = lines.map((l, i) => ({ l, i })).filter(x => /^\s*"prebuild"\s*:/.test(x.l))
if (hits.length !== 1) { console.error(`ANCHOR FAIL: found ${hits.length} "prebuild" lines`); process.exit(1) }
const idx = hits[0].i
const indent = (lines[idx].match(/^(\s*)/) || ['', '      '])[1]
const hasComma = /,\s*$/.test(lines[idx])

const NEW_PB  = 'node scripts/prebuild.mjs && node tools/check-sitemap-coverage.mjs --strict'
const NEW_PO  = 'node scripts/prerender.mjs --all'
const PB_LINE = `${indent}"prebuild": "${NEW_PB}",`
const PO_LINE = `${indent}"postbuild": "${NEW_PO}"${hasComma ? '' : ''}`

// Rewrite prebuild line to always end with comma (since postbuild follows)
lines[idx] = PB_LINE
lines.splice(idx + 1, 0, PO_LINE)

const next = lines.join(eol)
let parsed
try { parsed = JSON.parse(next) } catch (e) { console.error(`VERIFY FAIL: ${e.message}`); process.exit(1) }
if (parsed.scripts.prebuild !== NEW_PB)  { console.error('VERIFY FAIL: prebuild'); process.exit(1) }
if (parsed.scripts.postbuild !== NEW_PO) { console.error('VERIFY FAIL: postbuild'); process.exit(1) }

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const bak = `${PKG}.before-postbuild-${stamp}.bak`
copyFileSync(PKG, bak)
writeFileSync(PKG, next, 'utf8')

console.log(`Backup: ${bak}`)
console.log(`RESULT: prebuild  = "${NEW_PB}"`)
console.log(`RESULT: postbuild = "${NEW_PO}"`)
console.log(`RESULT: package.json re-parsed cleanly (${Object.keys(parsed.scripts).length} scripts).`)