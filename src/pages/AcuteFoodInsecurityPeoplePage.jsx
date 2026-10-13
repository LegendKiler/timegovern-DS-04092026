import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.foodinsecure

const EXPLAINERS = [
  { title: 'What the acute food insecurity counter shows', body: 'This counter shows the current number of people facing acute food insecurity, growing at about 0.5 per second. That is roughly 16 million additional people per year, based on the Global Report on Food Crises. The current base figure is 282 million people as of 2024, spread across 59 countries and territories.' },
  { title: 'What acute food insecurity means', body: 'Acute food insecurity is the IPC Phase 3 or higher classification. At Phase 3 (Crisis), households have food consumption gaps or can barely meet minimum needs by depleting essential assets. At Phase 4 (Emergency), they face very high acute malnutrition and excess mortality. At Phase 5 (Catastrophe or Famine), starvation, death, and destitution are evident. Roughly 1.1 million people were in Phase 5 in 2024.' },
  { title: 'Where acute food insecurity is concentrated', body: 'About 70 percent of the global total is in ten countries: the Democratic Republic of the Congo, Nigeria, Sudan, Afghanistan, Ethiopia, Yemen, Bangladesh, Pakistan, Syria, and Myanmar. The DRC alone accounts for 25 million people. Sudan has the fastest-growing crisis, with about 20 million people acutely food insecure and famine conditions confirmed in parts of Darfur and Kordofan.' },
  { title: 'How the crisis has grown', body: 'The number of acutely food-insecure people has risen every year since 2016 except one. It roughly doubled between 2019 and 2023, driven by the COVID-19 economic shock, the Ukraine war food and fertilizer disruption, and conflicts in Sudan, Gaza, and the Sahel. 2024 was the fifth consecutive year above 250 million people, a level not seen since the 2008 food crisis. The UN now calls this a global food security emergency.' },
]

const FAQS = [
  { q: 'How many people face acute food insecurity?', a: 'About 282 million people as of 2024, spread across 59 countries and territories. Roughly 1.1 million were in the most severe Phase 5 category.' },
  { q: 'Is the number growing or shrinking?', a: 'Growing every year since 2016 except one. It roughly doubled between 2019 and 2023 and has remained above 250 million since.' },
  { q: 'Which country has the worst crisis?', a: 'Sudan has the fastest-growing crisis, with famine conditions confirmed in parts of Darfur and Kordofan. The Democratic Republic of the Congo has the highest absolute total, at about 25 million people.' },
  { q: 'What is IPC Phase 5?', a: 'The most severe food insecurity classification, meaning starvation, death, and destitution are evident. Roughly 1.1 million people were in Phase 5 in 2024, mostly in Sudan, Gaza, and South Sudan.' },
  { q: 'Where does the data come from?', a: 'The Global Report on Food Crises, produced by the Food Security Information Network with data from 16 partner organisations including WFP, FAO, and UNICEF.' },
]

const RELATED = [
  { to: '/newly-hungry-today', name: 'People Newly Food Insecure Today', desc: 'Falling into food insecurity today' },
  { to: '/hunger-deaths-today', name: 'Deaths From Hunger Today', desc: 'Hunger-related deaths today' },
  { to: '/undernourished-people', name: 'Undernourished People Worldwide', desc: 'People currently undernourished' },
  { to: '/food-waste-clock', name: 'Food Waste Clock', desc: 'Food wasted worldwide today' },
]

export default function AcuteFoodInsecurityPeoplePage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}