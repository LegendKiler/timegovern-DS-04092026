import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.population

const EXPLAINERS = [
  { title: 'What the population counter shows', body: 'The world population counter ticks upward at the current net growth rate - births minus deaths - around 2.22 people per second. That is roughly 70 million people per year. The base value is the UN World Population Prospects mid-2026 estimate.' },
  { title: 'Why the number grows unevenly', body: 'Births peak in the early morning hours in most time zones, and death rates are seasonal. The counter smooths these bursts out to show a constant average, which is what matters for year-over-year comparison. Real-world population change is never perfectly linear across a single day.' },
  { title: 'When we will hit 9 billion', body: 'Under the UN medium-fertility projection, the world population reaches 9 billion around 2037. Growth is slowing: annual additions peaked at roughly 92 million per year in the late 1980s and are projected to fall below 40 million per year by 2050. Peak population is projected around 10.3 billion in the 2080s.' },
  { title: 'Where the growth is happening', body: 'More than half of the projected population increase to 2050 is concentrated in nine countries: India, Nigeria, Pakistan, the Democratic Republic of the Congo, Ethiopia, Tanzania, Indonesia, Egypt, and the United States. Sub-Saharan Africa accounts for the largest share.' },
]

const FAQS = [
  { q: 'How often does the counter update?', a: 'It ticks roughly every 80 milliseconds while the tab is visible, giving the appearance of continuous motion. The underlying value is recomputed from the current time on every tick.' },
  { q: 'What is the current world population?', a: 'Around 8.18 billion at the start of 2026. The exact figure updates in real time above.' },
  { q: 'Will world population ever stop growing?', a: 'Yes. UN projections suggest peak population around 10.3 billion in the 2080s, followed by slow decline. Fertility rates have already fallen below replacement level in most of Europe, East Asia, and the Americas.' },
  { q: 'Is this counter accurate?', a: 'The counter is accurate to the rate - roughly 70 million net additions per year globally. Individual births and deaths happen in bursts that the counter smooths out.' },
  { q: 'What is the source?', a: 'UN World Population Prospects 2024, published by the United Nations Department of Economic and Social Affairs.' },
]

const RELATED = [
  { to: '/births-clock', name: 'Births Clock', desc: 'Babies born worldwide today' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'Deaths worldwide today' },
  { to: '/co2-emissions-clock', name: 'CO2 Emissions Clock', desc: 'Global emissions today' },
  { to: '/energy-use-clock', name: 'Energy Use Clock', desc: 'Primary energy today' },
]

export default function WorldPopulationClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}