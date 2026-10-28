import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.eduspend

const EXPLAINERS = [
  { title: 'What the education spending counter shows', body: 'This counter resets at midnight UTC and ticks up at about 177,500 US dollars per second. That is roughly 5.6 trillion dollars of global education expenditure per year, based on the UNESCO Institute for Statistics. The counter shows spending since the start of the current UTC day, not a projected annual total.' },
  { title: 'How education spending is split', body: 'About 60 percent of global education spending goes to primary and secondary schooling, 25 percent to tertiary education, and the rest to pre-primary, vocational, and adult education. Roughly 75 percent comes from public budgets and 25 percent from private sources, mostly household tuition and fees. In low-income countries, the private share is often much higher.' },
  { title: 'Where education spending is concentrated', body: 'The United States spends about 1.3 trillion dollars per year on education, more than any other country. China, Germany, Japan, and the United Kingdom round out the top five. As a share of GDP, however, the leaders are different: Norway, Denmark, and Sweden spend over 6 percent of GDP on education, while many low-income countries spend under 3 percent.' },
  { title: 'How education spending is changing', body: 'Global education spending has roughly tripled since 2000, driven by rising enrollment, higher teacher salaries, and the spread of digital learning tools. As a share of GDP, however, global spending has been flat at about 4.3 percent. The UN Sustainable Development Goal 4 calls for universal quality education by 2030, which UNESCO estimates would require an additional 100 billion dollars per year in low and middle income countries.' },
]

const FAQS = [
  { q: 'How much is spent on education each day?', a: 'About 15.3 billion US dollars per day worldwide, which is roughly 177,500 dollars per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows education spending since the start of the current UTC day.' },
  { q: 'Which country spends the most on education?', a: 'The United States, at about 1.3 trillion dollars per year. China is second at roughly 800 billion dollars.' },
  { q: 'What share of GDP goes to education?', a: 'The global average is about 4.3 percent of GDP. High-income countries average around 5.5 percent, while low-income countries average closer to 3.5 percent.' },
  { q: 'Where does the data come from?', a: 'The UNESCO Institute for Statistics, which collects education expenditure data from national governments through the annual UIS survey. It is the official source for SDG 4 tracking.' },
]

const RELATED = [
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/gdp-clock', name: 'GDP Clock', desc: 'Global economic output today' },
  { to: '/health-spending-clock', name: 'Health Spending Clock', desc: 'Global health spend today' },
  { to: '/military-spending-clock', name: 'Military Spending Clock', desc: 'Global defense spend today' },
]

export default function EducationSpendingClockPage() {

  useEffect(() => {
    document.title = 'Education Spending Clock | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}