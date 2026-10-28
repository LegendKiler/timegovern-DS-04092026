import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.obese

const EXPLAINERS = [
  { title: 'What the obese adults counter shows', body: 'This counter shows the current number of obese adults worldwide, growing at about 0.95 per second. That is roughly 30 million additional obese adults per year, based on WHO Global Health Observatory data. The current base figure is 1 billion adults as of 2024, roughly 1 in 8 adults globally.' },
  { title: 'What counts as obese', body: 'Clinical obesity is a body mass index (BMI) of 30 or higher. BMI is weight in kilograms divided by height in meters squared. The threshold is the same for men and women, though the health risks differ by body composition and ethnicity. Some countries use lower thresholds for South Asian and East Asian populations because of different body fat distributions at the same BMI.' },
  { title: 'Where obese adults are concentrated', body: 'The United States has the largest absolute number of obese adults, around 100 million. China is second at about 85 million, and India third at 60 million. As a share of population, the highest rates are in Pacific island nations (Nauru, Samoa, Tonga above 45 percent), the Gulf states, and the United States (about 40 percent). No country has reversed its obesity rate in the past 30 years.' },
  { title: 'How obesity trends are changing', body: 'Global adult obesity has more than doubled since 1990 and more than quadrupled since 1975. The WHO projects 1.9 billion obese adults by 2035 if current trends continue. The economic cost of obesity-related disease is estimated at 2 trillion dollars per year, roughly 2.8 percent of global GDP. Childhood obesity rates are rising faster than adult rates in most countries, which will feed into adult obesity for decades.' },
]

const FAQS = [
  { q: 'How many obese adults are there worldwide?', a: 'About 1 billion adults as of 2024, roughly 1 in 8 adults globally.' },
  { q: 'Is the number growing or shrinking?', a: 'Growing fast. Global adult obesity has doubled since 1990. The WHO projects 1.9 billion obese adults by 2035.' },
  { q: 'Which country has the most obese adults?', a: 'The United States, at about 100 million adults. China is second at around 85 million and India third at 60 million.' },
  { q: 'Which country has the highest obesity rate?', a: 'Pacific island nations such as Nauru, Samoa, and Tonga, at over 45 percent of adults. Among large countries, the United States and Mexico are near 40 percent.' },
  { q: 'Where does the data come from?', a: 'The WHO Global Health Observatory, which compiles measured height and weight data from national health surveys and uses demographic modelling to estimate trends.' },
]

const RELATED = [
  { to: '/newly-obese-today', name: 'Adults Who Became Obese Today', desc: 'New obesity cases today' },
  { to: '/undernourished-people', name: 'Undernourished People Worldwide', desc: 'People currently undernourished' },
  { to: '/hunger-deaths-today', name: 'Deaths From Hunger Today', desc: 'Hunger-related deaths today' },
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
]

export default function ObeseAdultsWorldwidePage() {

  useEffect(() => {
    document.title = 'Obese Adults Worldwide | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}