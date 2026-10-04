import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.co2

const EXPLAINERS = [
  { title: 'What the CO2 counter shows', body: 'This counter resets at midnight UTC and ticks up at about 1,186 tonnes of CO2 per second - roughly 37.4 billion tonnes per year. The rate comes from the Global Carbon Budget 2024, the annual peer-reviewed assessment of global emissions.' },
  { title: 'Where emissions come from', body: 'Coal, oil, and gas account for roughly 90% of global CO2 emissions. Cement production and flaring contribute the rest. Electricity and heat generation is the single largest sector, followed by transport and industry.' },
  { title: 'Emissions are still rising', body: 'Global CO2 emissions reached an all-time high in 2024 despite rapid renewable buildout. The annual growth rate has slowed from 3% per year in the 2000s to under 1%, but emissions have not yet peaked. The Intergovernmental Panel on Climate Change says emissions must fall 43% below 2019 levels by 2030 to stay under 1.5 C.' },
  { title: 'The largest emitters', body: 'China emits roughly 11 billion tonnes per year, followed by the United States (5 billion), India (3 billion), and the EU (2.8 billion). Per capita, the ranking flips: Qatar, Kuwait, and the UAE emit more per person than any major economy.' },
]

const FAQS = [
  { q: 'How much CO2 is emitted each day?', a: 'About 102 million tonnes per day worldwide, which is roughly 1,186 tonnes per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC. The counter shows emissions since the start of the current UTC day.' },
  { q: 'Which country emits the most CO2?', a: 'China, with about 11 billion tonnes per year. The United States is second at around 5 billion tonnes.' },
  { q: 'What is a safe level of CO2 emissions?', a: 'The IPCC says global CO2 emissions must fall to net zero by 2050 to limit warming to 1.5 C. That is a 43% reduction from 2019 levels by 2030, then continued decline to zero by 2050.' },
  { q: 'Where does the data come from?', a: 'Global Carbon Budget 2024, published by the Global Carbon Project with contributions from more than 80 researchers worldwide.' },
]

const RELATED = [
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/energy-use-clock', name: 'Energy Use Clock', desc: 'Primary energy today' },
  { to: '/food-waste-clock', name: 'Food Waste Clock', desc: 'Food wasted today' },
  { to: '/births-clock', name: 'Births Clock', desc: 'Babies born today' },
]

export default function Co2EmissionsClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}