import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.energy

const EXPLAINERS = [
  { title: 'What the energy counter shows', body: 'This counter resets at midnight UTC and ticks up at about 20,000 gigajoules per second - roughly 1.7 exajoules per day, or 630 exajoules per year. That is the total primary energy consumed worldwide. The rate comes from the IEA World Energy Outlook 2024.' },
  { title: 'What counts as primary energy', body: 'Primary energy is energy in its raw form before conversion - coal, oil, natural gas, nuclear, hydro, wind, and solar. It is measured in joules because the units normalize across sources. One exajoule is about 278 billion kilowatt-hours, or roughly what a mid-sized country uses in a year.' },
  { title: 'Where energy comes from', body: 'Fossil fuels still supply about 80% of global primary energy. Oil is the largest single source (30%), followed by coal (26%) and natural gas (23%). Nuclear is 5%, hydro 7%, and all other renewables (wind, solar, biomass, geothermal) together make up the remaining 9%.' },
  { title: 'The energy transition in numbers', body: 'Renewable capacity is growing faster than any energy source in history - solar and wind added more than 500 GW in 2024 alone. But total energy demand is also growing, so the fossil share is falling slowly. Electricity generation is decarbonizing much faster than transport, heating, or industry.' },
]

const FAQS = [
  { q: 'How much energy does the world use each day?', a: 'About 1.7 exajoules per day worldwide, or roughly 20,000 gigajoules per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC. The counter shows energy consumed since the start of the current UTC day.' },
  { q: 'What is the difference between primary energy and electricity?', a: 'Primary energy is the raw energy content of fuels before conversion. Electricity is a secondary form. Roughly two-thirds of primary energy is lost as waste heat during conversion.' },
  { q: 'Which country uses the most energy?', a: 'China, with about 160 exajoules per year. The United States is second at around 95 exajoules. Per capita, Qatar, Singapore, and the UAE use the most.' },
  { q: 'Where does the data come from?', a: 'IEA World Energy Outlook 2024, published by the International Energy Agency in Paris.' },
]

const RELATED = [
  { to: '/co2-emissions-clock', name: 'CO2 Emissions Clock', desc: 'Global emissions today' },
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/food-waste-clock', name: 'Food Waste Clock', desc: 'Food wasted today' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'Deaths worldwide today' },
]

export default function EnergyUseClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}