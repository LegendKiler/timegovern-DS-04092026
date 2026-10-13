import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.newlyhungry

const EXPLAINERS = [
  { title: 'What the newly hungry counter shows', body: 'This counter resets at midnight UTC and ticks up at about 0.5 people per second. That is roughly 16 million people per year who fall into acute food insecurity, based on the Global Report on Food Crises. The counter shows people who crossed into acute food insecurity since the start of the current UTC day.' },
  { title: 'What acute food insecurity means', body: 'Acute food insecurity is the IPC Phase 3 or higher classification. At Phase 3 (Crisis), households have food consumption gaps or are marginally able to meet minimum needs only by depleting essential assets. At Phase 5 (Catastrophe or Famine), households face starvation, death, and destitution. The threshold is not hunger in the everyday sense, it is a measurable crisis level.' },
  { title: 'What drives people into food insecurity', body: 'Conflict is the largest single driver, accounting for about 70 percent of acute food insecurity. Climate shocks (drought, flooding, cyclones) drive another 20 percent. Economic shocks, including food price spikes and currency collapse, drive the remaining 10 percent. In practice most crises are compound, for example drought in a conflict zone with collapsed local currency.' },
  { title: 'How acute food insecurity is changing', body: 'The number of acutely food-insecure people has risen sharply since 2016. It roughly doubled between 2019 and 2023, driven by the COVID-19 economic shock, the Ukraine war food and fertilizer disruption, and conflicts in Sudan, Gaza, and the Sahel. 2024 was the fifth consecutive year above 250 million people, a level not seen since the 2008 food crisis.' },
]

const FAQS = [
  { q: 'How many people fall into food insecurity each day?', a: 'About 43,000 people per day worldwide, which is roughly 0.5 per second, or around 16 million per year.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows people who crossed into acute food insecurity since the start of the current UTC day.' },
  { q: 'What is the difference between hunger and food insecurity?', a: 'Hunger is the physical sensation of not having enough food. Food insecurity is a broader condition where a person lacks reliable access to sufficient, safe, nutritious food. A person can be food insecure without feeling hungry every day.' },
  { q: 'What is the main cause?', a: 'Conflict, which drives about 70 percent of acute food insecurity. Climate shocks account for another 20 percent, and economic shocks for the remaining 10 percent.' },
  { q: 'Where does the data come from?', a: 'The Global Report on Food Crises, produced by the Food Security Information Network with data from 16 partner organisations including the WFP, FAO, and UNICEF.' },
]

const RELATED = [
  { to: '/acute-food-insecurity-people', name: 'People Facing Acute Food Insecurity', desc: 'Current acute food insecurity' },
  { to: '/hunger-deaths-today', name: 'Deaths From Hunger Today', desc: 'Hunger-related deaths today' },
  { to: '/undernourished-people', name: 'Undernourished People Worldwide', desc: 'People currently undernourished' },
  { to: '/food-waste-clock', name: 'Food Waste Clock', desc: 'Food wasted worldwide today' },
]

export default function NewlyHungryTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}