import { ICT_TOOLS, getToolBySlug, ICT_CATEGORIES } from './src/data/ictTools.js'

// Node <20 needs webcrypto polyfill
if (typeof crypto === 'undefined' || !crypto.subtle) {
  const { webcrypto } = await import('node:crypto')
  globalThis.crypto = webcrypto
}

// Convert "hex string" to base64 for test comparison
const hex = (s) => s.toLowerCase().replace(/\s+/g, '')

const cases = [
  { slug: 'base64',        mode: 'encode', fields: { text: 'Hello World' },    check: (o) => o === 'SGVsbG8gV29ybGQ=' },
  { slug: 'base64',        mode: 'decode', fields: { text: 'SGVsbG8gV29ybGQ=' }, check: (o) => o === 'Hello World' },
  { slug: 'url-encode',    mode: 'encode', fields: { text: 'hello world' },     check: (o) => o === 'hello%20world' },
  { slug: 'url-encode',    mode: 'decode', fields: { text: 'hello%20world' },   check: (o) => o === 'hello world' },
  { slug: 'html-entity',   mode: 'encode', fields: { text: '<a>' },             check: (o) => o === '&lt;a&gt;' },
  { slug: 'sha1',          fields: { text: 'test' }, check: (o) => hex(o) === 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3' },
  { slug: 'sha256',        fields: { text: 'test' }, check: (o) => hex(o) === '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' },
  { slug: 'sha512',        fields: { text: 'test' }, check: (o) => hex(o).startsWith('ee26b0dd4af7e749') },
  { slug: 'uuid-generator',fields: { count: '3' },  check: (o) => o.split('\n').length === 3 && /^[0-9a-f-]{36}$/i.test(o.split('\n')[0]) },
  { slug: 'random-string', fields: { length: '20', charset: 'alphanumeric' }, check: (o) => o.length === 20 && /^[A-Za-z0-9]+$/.test(o) },
  { slug: 'password-generator', fields: { length: '24' }, check: (o) => o.length === 24 },
  { slug: 'json-formatter', mode: 'pretty', fields: { text: '{"a":1}' }, check: (o) => o.includes('"a"') && o.includes('\n') },
  { slug: 'json-formatter', mode: 'minify', fields: { text: '{ "a" : 1 }' }, check: (o) => o === '{"a":1}' },
  { slug: 'case-converter', mode: 'camel', fields: { text: 'hello world test' }, check: (o) => o === 'helloWorldTest' },
  { slug: 'case-converter', mode: 'snake', fields: { text: 'helloWorld' }, check: (o) => o === 'hello_world' },
  { slug: 'character-counter', fields: { text: 'hello world' }, check: (o) => o.includes('Words: 2') && o.includes('Characters: 11') },
  { slug: 'lorem-ipsum',   fields: { paragraphs: '2' }, check: (o) => o.includes('Lorem ipsum') && o.split('\n\n').length === 2 },
  { slug: 'slug-generator',fields: { text: 'Hello World! How Are You?' }, check: (o) => o === 'hello-world-how-are-you' },
  { slug: 'reverse-text',  mode: 'chars', fields: { text: 'abc' }, check: (o) => o === 'cba' },
  { slug: 'reverse-text',  mode: 'words', fields: { text: 'one two three' }, check: (o) => o === 'three two one' },
  { slug: 'unix-timestamp',fields: { text: '1700000000' }, check: (o) => o.includes('2023') },
  { slug: 'number-base',   fields: { value: '255', fromBase: '10' }, check: (o) => o.includes('FF') && o.includes('11111111') },
  { slug: 'roman-numeral', fields: { text: '2024' }, check: (o) => o === 'MMXXIV' },
  { slug: 'roman-numeral', fields: { text: 'MMXXIV' }, check: (o) => o === '2024' },
  { slug: 'text-to-binary',mode: 'encode', fields: { text: 'Hi' }, check: (o) => o === '01001000 01101001' },
  { slug: 'text-to-binary',mode: 'decode', fields: { text: '01001000 01101001' }, check: (o) => o === 'Hi' },
  { slug: 'text-to-hex',   fields: { text: 'Hi' }, check: (o) => o === '48 69' },
  { slug: 'hex-to-text',   fields: { text: '48 69' }, check: (o) => o === 'Hi' },
  { slug: 'color-converter', fields: { text: '#FF0000' }, check: (o) => o.includes('rgb(255, 0, 0)') && o.includes('#FF0000') },
  { slug: 'color-converter', fields: { text: 'rgb(0,128,255)' }, check: (o) => o.includes('#0080FF') },
  { slug: 'caesar-cipher', mode: 'encode', fields: { text: 'abc', shift: '3' }, check: (o) => o === 'def' },
  { slug: 'caesar-cipher', mode: 'decode', fields: { text: 'def', shift: '3' }, check: (o) => o === 'abc' },
  { slug: 'rot13',         fields: { text: 'abc' }, check: (o) => o === 'nop' },
  { slug: 'text-to-morse', fields: { text: 'SOS' }, check: (o) => o === '... --- ...' },
  { slug: 'http-status',   fields: {}, check: (o) => o.includes('200 OK') && o.includes('404 Not Found') },
  { slug: 'url-parser',    fields: { text: 'https://example.com/path?id=1&sort=asc' }, check: (o) => o.includes('example.com') && o.includes('id = 1') && o.includes('sort = asc') },
  { slug: 'jwt-decoder',   fields: { text: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.sig' }, check: (o) => o.includes('"sub"') && o.includes('"1234"') },
]

// Header
console.log('')
console.log('=============================================================')
console.log('  ICT TOOLS FUNCTIONAL TEST')
console.log('=============================================================')
console.log('')

// Sanity: tools file exports
console.log('Tools loaded: ' + ICT_TOOLS.length)
const catCount = Object.keys(ICT_CATEGORIES).length
console.log('Categories:   ' + catCount)
console.log('')

let pass = 0, fail = 0
const failures = []

for (const c of cases) {
  const tool = getToolBySlug(c.slug)
  if (!tool) {
    console.log('  ✗ ' + c.slug + ' — TOOL NOT FOUND')
    failures.push(c.slug + ' (not found)')
    fail++
    continue
  }

  let output = ''
  try {
    if (tool.modes && tool.modes.length > 0) {
      const m = tool.modes.find(x => x.id === c.mode) || tool.modes[0]
      output = m.fn(c.fields)
    } else if (tool.transform) {
      output = tool.transform(c.fields)
    }
    if (output instanceof Promise) output = await output
    output = String(output)
  } catch (e) {
    console.log('  ✗ ' + c.slug + (c.mode ? ' [' + c.mode + ']' : '') + ' — THREW: ' + e.message)
    failures.push(c.slug + ' (threw)')
    fail++
    continue
  }

  const ok = c.check(output)
  if (ok) {
    console.log('  ✓ ' + c.slug.padEnd(22) + (c.mode || '').padEnd(10) + ' → ' + output.slice(0, 40).replace(/\n/g, ' ') + (output.length > 40 ? '...' : ''))
    pass++
  } else {
    console.log('  ✗ ' + c.slug.padEnd(22) + (c.mode || '').padEnd(10) + ' — UNEXPECTED: ' + output.slice(0, 60).replace(/\n/g, ' '))
    failures.push(c.slug + (c.mode ? ' [' + c.mode + ']' : ''))
    fail++
  }
}

console.log('')
console.log('=============================================================')
console.log('  PASS: ' + pass + '  |  FAIL: ' + fail)
console.log('=============================================================')

if (fail === 0) {
  console.log('  ALL TOOLS WORKING')
} else {
  console.log('  Failures:')
  failures.forEach(f => console.log('    - ' + f))
}
console.log('')