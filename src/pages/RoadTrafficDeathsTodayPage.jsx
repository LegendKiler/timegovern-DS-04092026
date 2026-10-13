import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.roaddeaths

const EXPLAINERS = [
  { title: 'What the road deaths counter shows', body: 'This counter resets at midnight UTC and ticks up at about 0.043 people per second. That is roughly 1.35 million road traffic deaths per year, based on the WHO Global Status Report on Road Safety. The counter shows deaths since the start of the current UTC day.' },
  { title: 'What counts as a road traffic death', body: 'The WHO counts any death within 30 days of a road traffic crash where the crash was the underlying cause. This includes drivers, passengers, pedestrians, cyclists, and motorcyclists. It excludes deaths from non-traffic vehicle accidents (such as farm machinery) and deaths from medical emergencies that caused the crash, such as a heart attack at the wheel.' },
  { title: 'Where road deaths are concentrated', body: 'Low- and middle-income countries account for about 90 percent of global road deaths despite having only 60 percent of the world vehicles. The highest absolute totals are in India, China, Nigeria, Brazil, and Indonesia. The highest death rates per 100,000 people are in sub-Saharan Africa and parts of the Middle East. Pedestrians and motorcyclists make up more than half of all road deaths globally.' },
  { title: 'How road deaths are changing', body: 'Global road deaths have stayed roughly flat at 1.3 to 1.4 million per year since 2000, despite vehicle numbers tripling. This reflects improved vehicle safety, better road design, and stronger enforcement in high-income countries, offset by rapid motorization in low- and middle-income countries. The UN Decade of Action for Road Safety targets a 50 percent reduction by 2030, which current trends will not achieve.' },
]

const FAQS = [
  { q: 'How many people die in road accidents each day?', a: 'About 3,700 people per day worldwide, which is roughly 0.043 per second, or around 1.35 million per year.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows road traffic deaths since the start of the current UTC day.' },
  { q: 'Which country has the most road deaths?', a: 'India, with about 300,000 road deaths per year. China is second at around 250,000. Nigeria, Brazil, and Indonesia round out the top five.' },
  { q: 'Are pedestrians included?', a: 'Yes. The WHO counts all road users: drivers, passengers, pedestrians, cyclists, and motorcyclists. Pedestrians and motorcyclists together make up more than half of all road deaths globally.' },
  { q: 'Where does the data come from?', a: 'The WHO Global Status Report on Road Safety, which compiles national police and health ministry data, correcting for known under-reporting in many countries.' },
]

const RELATED = [
  { to: '/smoking-deaths-today', name: 'Deaths From Smoking Today', desc: 'Tobacco-related deaths today' },
  { to: '/alcohol-deaths-today', name: 'Alcohol-Related Deaths Today', desc: 'Alcohol-related deaths today' },
  { to: '/cigarettes-smoked-today', name: 'Cigarettes Smoked Today', desc: 'Cigarettes smoked worldwide today' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'All deaths worldwide today' },
]

export default function RoadTrafficDeathsTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}