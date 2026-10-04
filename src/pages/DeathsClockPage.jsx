import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.deaths

const EXPLAINERS = [
  { title: 'What the deaths counter shows', body: 'This counter resets at midnight UTC and ticks up at about 1.97 deaths per second - roughly 62 million deaths per year worldwide. The rate comes from UN World Population Prospects 2024.' },
  { title: 'What causes most deaths worldwide', body: 'Ischaemic heart disease and stroke account for about 27% of all deaths. Lower respiratory infections, COPD, and lung cancer follow. In low-income countries, infectious diseases and neonatal conditions still dominate; in high-income countries, chronic non-communicable diseases do.' },
  { title: 'Why global deaths are rising', body: 'Deaths are rising in absolute terms because the world population is larger and older than ever. The global average life expectancy is around 73 years, but the population aged 65+ is growing faster than any other group. More old people means more deaths, even as age-specific mortality improves.' },
  { title: 'The death rate is falling', body: 'The crude death rate - deaths per 1,000 people per year - has fallen from 20 in 1950 to about 7.6 today. Improved sanitation, vaccines, antibiotics, and safer childbirth are the main drivers. The absolute number of deaths rises only because the population base is much larger.' },
]

const FAQS = [
  { q: 'How many people die each day?', a: 'About 170,000 per day worldwide, which is roughly 1.97 per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC. The counter shows deaths since the start of the current UTC day.' },
  { q: 'What is the leading cause of death globally?', a: 'Ischaemic heart disease (around 9 million per year), followed by stroke (around 6.5 million), and lower respiratory infections (around 2.5 million).' },
  { q: 'Is the death rate increasing?', a: 'The crude death rate is falling - from 20 per 1,000 in 1950 to 7.6 today. The absolute number of deaths rises because the global population is much larger and older.' },
  { q: 'Where does this data come from?', a: 'UN World Population Prospects 2024, plus WHO Global Health Estimates for cause-of-death breakdowns.' },
]

const RELATED = [
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/births-clock', name: 'Births Clock', desc: 'Babies born today' },
  { to: '/co2-emissions-clock', name: 'CO2 Emissions Clock', desc: 'Global emissions today' },
  { to: '/energy-use-clock', name: 'Energy Use Clock', desc: 'Primary energy today' },
]

export default function DeathsClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}