// src/lib/regionCompare.js
import * as popMod from '../data/countryPopulations'
import * as gdpMod from '../data/countryGdp'
import * as leMod from '../data/countryLifeExpectancy'
import * as co2Mod from '../data/countryCo2'
import * as energyMod from '../data/countryEnergy'
import * as waterMod from '../data/countryWater'
import { REGION_ORDER } from '../data/countryCodes'

function pickArr(mod, ...names) {
  for (const n of names) if (Array.isArray(mod[n])) return mod[n]
  throw new Error('regionCompare: no array in ' + Object.keys(mod).join(','))
}

const POPULATIONS = pickArr(popMod, 'COUNTRY_POPULATIONS', 'COUNTRY_POPULATION')
const GDP_DATA = pickArr(gdpMod, 'COUNTRY_GDP')
const LE_DATA = pickArr(leMod, 'COUNTRY_LIFE_EXPECTANCY')
const CO2_DATA = pickArr(co2Mod, 'COUNTRY_CO2')
const ENERGY_DATA = pickArr(energyMod, 'COUNTRY_ENERGY', 'COUNTRY_ENERGY_USE')
const WATER_DATA = pickArr(waterMod, 'COUNTRY_WATER')

function slugify(s) { return s.toLowerCase().replace(/\s+/g, '-') }

export const REGION_SLUGS = Object.fromEntries(REGION_ORDER.map(r => [r, slugify(r)]))
export const REGION_BY_SLUG = Object.fromEntries(REGION_ORDER.map(r => [slugify(r), r]))
export const REGION_ORDER_LIST = REGION_ORDER

export const METRICS = {
  'population': {
    slug: 'population', label: 'Population', data: POPULATIONS, valueField: 'population',
    unit: 'people', aggregate: 'sum',
    formatLong: v => v.toLocaleString('en-US'),
    formatShort: v => v >= 1e9 ? (v/1e9).toFixed(2) + 'B' : (v/1e6).toFixed(1) + 'M',
    color: 'violet', countryRoute: c => '/population/' + c.toLowerCase(),
  },
  'gdp': {
    slug: 'gdp', label: 'GDP', data: GDP_DATA, valueField: 'value',
    unit: 'USD billions', aggregate: 'sum',
    formatLong: v => '$' + (v * 1e9).toLocaleString('en-US'),
    formatShort: v => v >= 1000 ? '$' + (v/1000).toFixed(2) + 'T' : '$' + v.toFixed(1) + 'B',
    color: 'emerald', countryRoute: c => '/gdp/' + c.toLowerCase(),
  },
  'life-expectancy': {
    slug: 'life-expectancy', label: 'Life Expectancy', data: LE_DATA, valueField: 'value',
    unit: 'years', aggregate: 'avg-weighted', weightField: 'value',
    formatLong: v => v.toFixed(2) + ' years',
    formatShort: v => v.toFixed(1) + ' yrs',
    color: 'violet', countryRoute: c => '/life-expectancy/' + c.toLowerCase(),
  },
  'co2-emissions': {
    slug: 'co2-emissions', label: 'CO2 Emissions', data: CO2_DATA, valueField: 'value',
    unit: 'Mt CO2e', aggregate: 'sum',
    formatLong: v => v.toFixed(2) + ' Mt CO2e',
    formatShort: v => v.toFixed(1) + ' Mt',
    color: 'emerald', countryRoute: c => '/co2-emissions/' + c.toLowerCase(),
  },
  'energy': {
    slug: 'energy', label: 'Energy Use', data: ENERGY_DATA, valueField: 'value',
    unit: 'Mtoe', aggregate: 'sum',
    formatLong: v => v.toFixed(2) + ' Mtoe',
    formatShort: v => v.toFixed(1) + ' Mtoe',
    color: 'orange', countryRoute: c => '/energy/' + c.toLowerCase(),
  },
  'water': {
    slug: 'water', label: 'Water Use', data: WATER_DATA, valueField: 'value',
    unit: 'billion m3', aggregate: 'sum',
    formatLong: v => v.toFixed(2) + ' bn m3',
    formatShort: v => v.toFixed(1) + ' bn m3',
    color: 'sky', countryRoute: c => '/water/' + c.toLowerCase(),
  },
}

export function getCountriesInRegion(regionName) {
  return POPULATIONS
    .filter(c => c.region === regionName)
    .map(c => ({ code: c.code, name: c.name, region: c.region }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function regionAggregate(regionName, metricSlug) {
  const m = METRICS[metricSlug]
  if (!m) return null
  const countries = getCountriesInRegion(regionName)
  const codes = new Set(countries.map(c => c.code))
  const matching = m.data.filter(d => codes.has(d.code))
  if (m.aggregate === 'sum') {
    const sum = matching.reduce((s, d) => s + (d[m.valueField] || 0), 0)
    return { value: sum, count: matching.length }
  }
  if (m.aggregate === 'avg-weighted') {
    const popByCode = Object.fromEntries(POPULATIONS.map(p => [p.code, p.population]))
    let wsum = 0, wtot = 0
    for (const d of matching) {
      const w = popByCode[d.code] || 0
      if (w > 0 && d[m.valueField] != null) { wsum += d[m.valueField] * w; wtot += w }
    }
    return { value: wtot > 0 ? wsum / wtot : 0, count: matching.length }
  }
  return { value: 0, count: matching.length }
}

export function getCountryMetric(code, metricSlug) {
  const m = METRICS[metricSlug]
  if (!m) return null
  const upper = String(code).toUpperCase()
  return m.data.find(d => d.code === upper) || null
}

export function getCountryRow(code) {
  const upper = String(code).toUpperCase()
  const pop = POPULATIONS.find(c => c.code === upper)
  if (!pop) return null
  return { code: upper, name: pop.name, region: pop.region }
}
