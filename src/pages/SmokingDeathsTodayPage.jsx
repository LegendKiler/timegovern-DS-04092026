import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.smokingdeaths

const EXPLAINERS = [
  { title: 'What the smoking deaths counter shows', body: 'This counter resets at midnight UTC and ticks up at about 0.28 people per second. That is roughly 8.7 million tobacco-related deaths per year, based on the WHO Tobacco Fact Sheet. The counter shows deaths since the start of the current UTC day.' },
  { title: 'What counts as a smoking death', body: 'The figure includes deaths from lung cancer, chronic obstructive pulmonary disease, heart disease, stroke, and other conditions causally linked to tobacco use. It also includes deaths from second-hand smoke exposure. Roughly 1.3 million of the annual total are non-smokers exposed to second-hand smoke. It does not include deaths from vaping or smokeless tobacco, which are tracked separately.' },
  { title: 'Where smoking deaths are concentrated', body: 'China accounts for about 2.5 million tobacco deaths per year, more than any other country. India, the United States, Russia, and Indonesia round out the top five. Low- and middle-income countries now account for roughly 80 percent of global tobacco deaths. Smoking-related deaths typically lag smoking prevalence by 20 to 30 years, so countries with rising smoking today will see deaths rise through 2050.' },
  { title: 'How smoking deaths are changing', body: 'Global tobacco deaths have risen from about 5.4 million per year in 2000 to 8.7 million today, driven by population growth in countries where smoking remains common. The WHO projects tobacco deaths will remain above 8 million per year through 2030 and only fall significantly after 2050. Smoking remains the single largest preventable cause of death worldwide.' },
]

const FAQS = [
  { q: 'How many people die from smoking each day?', a: 'About 24,000 people per day worldwide, which is roughly 0.28 per second, or around 8.7 million per year.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows tobacco-related deaths since the start of the current UTC day.' },
  { q: 'Which country has the most smoking deaths?', a: 'China, at about 2.5 million tobacco deaths per year. India, the United States, Russia, and Indonesia are next.' },
  { q: 'Do second-hand smoke deaths count?', a: 'Yes. About 1.3 million of the annual total are non-smokers exposed to second-hand smoke, mostly women and children in low- and middle-income countries.' },
  { q: 'Where does the data come from?', a: 'The WHO Tobacco Fact Sheet and the Global Burden of Disease study, which combine national mortality records with epidemiological modelling of smoking-attributable fractions.' },
]

const RELATED = [
  { to: '/cigarettes-smoked-today', name: 'Cigarettes Smoked Today', desc: 'Cigarettes smoked worldwide today' },
  { to: '/alcohol-deaths-today', name: 'Alcohol-Related Deaths Today', desc: 'Alcohol-related deaths today' },
  { to: '/road-traffic-deaths-today', name: 'Road Traffic Deaths Today', desc: 'Road accident deaths today' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'All deaths worldwide today' },
]

export default function SmokingDeathsTodayPage() {

  useEffect(() => {
    document.title = 'Smoking Deaths Today | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}