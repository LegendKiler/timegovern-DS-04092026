import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.births

const EXPLAINERS = [
  { title: 'What the births counter shows', body: 'This counter resets at midnight UTC and ticks up at about 4.25 babies per second - roughly 134 million births per year worldwide. The rate is derived from UN World Population Prospects 2024 annual totals.' },
  { title: 'Why births per second is not constant', body: 'Births peak between 1 AM and 6 AM in most countries, which is when most women go into labour. They slow midday and rise again in the evening. The counter shows the average rate across a full 24-hour cycle, not the actual second-by-second count.' },
  { title: 'Where births are concentrated', body: 'India and China together account for about 25 million births per year. Sub-Saharan Africa is the fastest-growing region - Nigeria alone has more than 5 million births per year and is projected to become the third most populous country by 2050.' },
  { title: 'How birth rates are changing', body: 'Global fertility has fallen from 5.0 children per woman in 1950 to around 2.3 today. More than half the world now lives in countries with below-replacement fertility (under 2.1). The population keeps growing because of population momentum - young age structures in high-fertility regions.' },
]

const FAQS = [
  { q: 'How many babies are born each day?', a: 'About 367,000 per day worldwide, which is roughly 4.25 per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows babies born since the start of the current UTC day.' },
  { q: 'What is the busiest hour for births?', a: 'Between 1 AM and 6 AM in most countries. Approximately 60% of spontaneous births occur during the night hours.' },
  { q: 'Which country has the most births?', a: 'India, with about 23 million births per year, followed by China (around 10 million), Nigeria (around 5 million), and Pakistan (around 5 million).' },
  { q: 'Is the source reliable?', a: 'Yes. The rate comes from UN World Population Prospects 2024, which is the standard reference used by governments and researchers worldwide.' },
]

const RELATED = [
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'Deaths worldwide today' },
  { to: '/co2-emissions-clock', name: 'CO2 Emissions Clock', desc: 'Global emissions today' },
  { to: '/food-waste-clock', name: 'Food Waste Clock', desc: 'Food wasted today' },
]

export default function BirthsClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}