import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public/data/holidays')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const ccSrc = readFileSync(join(root, 'src/data/countryCodes.js'), 'utf8')
const suppSrc = readFileSync(join(root, 'src/data/holidaysSupplement.js'), 'utf8')
const seen = new Set()
const countries = []
for (const m of ccSrc.matchAll(/code: '([A-Z]{2})'/g)) {
  if (!seen.has(m[1])) { seen.add(m[1]); countries.push(m[1]) }
}
const SUPP = ['PK','IN','AE','SA','TH','MY','IL','LK','NP','KW']
const suppList = new Set(SUPP)
console.log('Total countries:', countries.length)
console.log('Supplemental (skipped):', SUPP.length)

const thisYear = new Date().getFullYear()
const years = [thisYear, thisYear + 1, thisYear + 2]
console.log('Years:', years.join(', '))
console.log('Files to generate:', countries.length * years.length)

let ok = 0, fail = 0, skipped = 0
for (const cc of countries) {
  if (suppList.has(cc)) { skipped++; continue }
  for (const y of years) {
    const outFile = join(outDir, `${cc}-${y}.json`)
    if (existsSync(outFile)) {
      console.log(`SKIP ${cc}-${y}  (already exists)`)
      skipped++
      continue
    }
    try {
      const res = await fetch(`https://date.nager.at/api/v4/Holidays/${cc}/${y}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      writeFileSync(outFile, JSON.stringify({ countryCode: cc, year: y, holidays: data }))
      console.log(`OK   ${cc}-${y}  ${data.length} holidays`)
      ok++
    } catch (e) {
      console.log(`FAIL ${cc}-${y}: ${e.message}`)
      fail++
    }
    await new Promise(r => setTimeout(r, 80))
  }
}

console.log(`\n=== SUMMARY ===`)
console.log(`OK:      ${ok}`)
console.log(`FAIL:    ${fail}`)
console.log(`SKIPPED: ${skipped}`)
console.log(`Output:  public/data/holidays/`)