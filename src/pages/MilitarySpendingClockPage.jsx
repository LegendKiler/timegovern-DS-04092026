import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.milspend

const EXPLAINERS = [
  { title: 'What the military spending counter shows', body: 'This counter resets at midnight UTC and ticks up at about 77,500 US dollars per second. That is roughly 2.44 trillion dollars of global military expenditure per year, based on the SIPRI Military Expenditure Database for 2024. The counter shows spending since the start of the current UTC day, not a projected annual total.' },
  { title: 'How military spending is split', body: 'Military budgets are usually split into four categories: personnel (salaries, pensions, health care for troops), operations and maintenance (fuel, training, spare parts), procurement (new weapons and vehicles), and research and development. Personnel is typically the largest category in Western countries, while procurement dominates in fast-modernizing militaries such as China and India.' },
  { title: 'Where military spending is concentrated', body: 'The top five spenders in 2024 were the United States at 997 billion dollars, China at an estimated 314 billion, Russia at 149 billion, India at 86 billion, and Saudi Arabia at 80 billion. Together they account for about 60 percent of global military spending. The United States alone spends more than the next ten countries combined.' },
  { title: 'How military spending is changing', body: 'Global military spending rose 9.4 percent in 2024, the steepest year-on-year increase since at least the end of the Cold War. It was the tenth consecutive year of growth. The main drivers are the war in Ukraine, tensions in the Middle East, and rising defense budgets across NATO, where members have committed to spending at least 2 percent of GDP on defense.' },
]

const FAQS = [
  { q: 'How much is spent on the military each day?', a: 'About 6.7 billion US dollars per day worldwide, which is roughly 77,500 dollars per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows military spending since the start of the current UTC day.' },
  { q: 'Which country spends the most on its military?', a: 'The United States, at about 997 billion dollars per year, or 37 percent of global military spending.' },
  { q: 'What is the NATO 2 percent target?', a: 'A commitment by NATO members to spend at least 2 percent of their GDP on defense. As of 2024, more than 20 of the 32 members were meeting it, up from only 3 in 2014.' },
  { q: 'Where does the data come from?', a: 'The SIPRI Military Expenditure Database, maintained by the Stockholm International Peace Research Institute. It is the standard reference used by governments, researchers, and journalists worldwide.' },
]

const RELATED = [
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/gdp-clock', name: 'GDP Clock', desc: 'Global economic output today' },
  { to: '/health-spending-clock', name: 'Health Spending Clock', desc: 'Global health spend today' },
  { to: '/education-spending-clock', name: 'Education Spending Clock', desc: 'Global education spend today' },
]

export default function MilitarySpendingClockPage() {

  useEffect(() => {
    document.title = 'Military Spending Clock | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}