import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.hungerdeaths

const EXPLAINERS = [
  { title: 'What the hunger deaths counter shows', body: 'This counter resets at midnight UTC and ticks up at about 0.29 people per second. That is roughly 9.2 million hunger-related deaths per year, based on WFP and FAO State of Food Security estimates. The counter shows deaths since the start of the current UTC day.' },
  { title: 'What counts as a hunger-related death', body: 'The figure includes deaths from acute malnutrition, starvation, and diseases that become fatal because the body is weakened by chronic hunger. It also includes deaths from complications during childbirth in severely undernourished mothers. It does not count deaths where hunger is a contributing but not the primary factor, such as most heart disease or cancer deaths.' },
  { title: 'Where hunger deaths are concentrated', body: 'More than 90 percent of hunger-related deaths occur in sub-Saharan Africa and South Asia. The countries with the highest absolute totals are Somalia, Yemen, Afghanistan, South Sudan, and the Democratic Republic of the Congo. Children under five account for roughly 45 percent of all hunger deaths, even though they make up only about 9 percent of the global population.' },
  { title: 'How hunger deaths are changing', body: 'Global hunger deaths fell steadily from about 12 million per year in 2000 to under 8 million by 2019, then rose again during the pandemic and the Ukraine war food price shock. The 2024 figure of 9.2 million is roughly where we were in 2015. Climate shocks, conflict, and disrupted fertilizer supply are the three biggest drivers of the recent reversal.' },
]

const FAQS = [
  { q: 'How many people die from hunger each day?', a: 'About 25,000 per day worldwide, which is roughly 0.29 per second, or around 9.2 million per year.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows deaths since the start of the current UTC day.' },
  { q: 'Which countries have the most hunger deaths?', a: 'Somalia, Yemen, Afghanistan, South Sudan, and the Democratic Republic of the Congo. Sub-Saharan Africa and South Asia account for more than 90 percent of the global total.' },
  { q: 'Are children more affected than adults?', a: 'Yes. Children under five are about 45 percent of hunger deaths despite being less than 10 percent of the population. Chronic undernutrition in early childhood also causes lifelong stunting and cognitive impairment.' },
  { q: 'Where does the data come from?', a: 'The WFP and FAO State of Food Security and Nutrition report, which combines household surveys, mortality tracking, and humanitarian agency reporting from crisis-affected regions.' },
]

const RELATED = [
  { to: '/undernourished-people', name: 'Undernourished People Worldwide', desc: 'People currently undernourished' },
  { to: '/newly-hungry-today', name: 'People Newly Food Insecure Today', desc: 'Falling into food insecurity today' },
  { to: '/acute-food-insecurity-people', name: 'People Facing Acute Food Insecurity', desc: 'Current acute food insecurity' },
  { to: '/deaths-clock', name: 'Deaths Clock', desc: 'All deaths worldwide today' },
]

export default function HungerDeathsTodayPage() {

  useEffect(() => {
    document.title = 'Hunger Deaths Today | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}