import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.healthspend

const EXPLAINERS = [
  { title: 'What the health spending counter shows', body: 'This counter resets at midnight UTC and ticks up at about 317,000 US dollars per second. That is roughly 10 trillion dollars of global health expenditure per year, based on the WHO Global Health Expenditure Database. The counter shows spending since the start of the current UTC day, not a projected annual total.' },
  { title: 'How health spending is split', body: 'Globally, about 50 percent of health spending comes from government budgets, roughly 35 percent is paid out of pocket by patients, and the rest comes from voluntary health insurance and external aid. The split varies enormously. In the United Kingdom, government funds about 80 percent. In India and Nigeria, out-of-pocket payments are closer to 50 to 60 percent.' },
  { title: 'Where health spending is concentrated', body: 'The United States accounts for roughly 45 percent of global health spending while having only 4 percent of the world population. The next largest spenders are China, Germany, Japan, and the United Kingdom. Per person, the US spends about 13,500 dollars per year, while the world average is closer to 1,200 dollars. Low-income countries often spend under 100 dollars per person per year.' },
  { title: 'How health spending is changing', body: 'Global health spending has roughly tripled since 2000, and it is growing faster than global GDP in most high-income countries. Aging populations, chronic disease, and expensive new treatments are the main drivers. The COVID-19 pandemic caused a one-time jump of about 10 percent in 2020 and 2021, then spending settled back to its long-run trend.' },
]

const FAQS = [
  { q: 'How much is spent on health care each day?', a: 'About 27.4 billion US dollars per day worldwide, which is roughly 317,000 dollars per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows health spending since the start of the current UTC day.' },
  { q: 'Which country spends the most on health care?', a: 'The United States, at about 4.5 trillion dollars per year. That is more than the next ten countries combined.' },
  { q: 'What does out-of-pocket spending mean?', a: 'It is money patients pay directly to doctors, hospitals, and pharmacies, without insurance or government reimbursement. It totals about 3.5 trillion dollars globally per year.' },
  { q: 'Where does the data come from?', a: 'The WHO Global Health Expenditure Database, which compiles national health accounts reported by member states. It is the standard reference used by researchers and policymakers worldwide.' },
]

const RELATED = [
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/gdp-clock', name: 'GDP Clock', desc: 'Global economic output today' },
  { to: '/education-spending-clock', name: 'Education Spending Clock', desc: 'Global education spend today' },
  { to: '/military-spending-clock', name: 'Military Spending Clock', desc: 'Global defense spend today' },
]

export default function HealthSpendingClockPage() {

  useEffect(() => {
    document.title = 'Health Spending Clock | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}