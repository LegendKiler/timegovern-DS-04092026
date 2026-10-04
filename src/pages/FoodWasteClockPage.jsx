import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.foodwaste

const EXPLAINERS = [
  { title: 'What the food waste counter shows', body: 'This counter resets at midnight UTC and ticks up at about 40 tonnes of food per second - roughly 1.05 billion tonnes per year. That is about one-fifth of all food produced for human consumption. The rate comes from the UNEP Food Waste Index 2024.' },
  { title: 'What counts as food waste', body: 'The UNEP counts food waste at the household, retail, and food-service levels. It excludes food lost at the farm or during transport, which is counted separately as "food loss". Combined, loss and waste account for roughly one-third of global food production.' },
  { title: 'Where waste happens', body: 'Households are the largest source, accounting for 60% of total food waste. Food service (restaurants, canteens) is 28%, and retail is 12%. The pattern is similar across income levels - food waste is a rich-country and poor-country problem alike.' },
  { title: 'The climate impact', body: 'Food waste generates 8-10% of global greenhouse gas emissions - roughly four times the emissions of the entire aviation industry. If food waste were a country, it would be the third-largest emitter after China and the United States.' },
]

const FAQS = [
  { q: 'How much food is wasted each day?', a: 'About 2.9 million tonnes per day worldwide, which is roughly 40 tonnes per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC. The counter shows food wasted since the start of the current UTC day.' },
  { q: 'Which country wastes the most food?', a: 'China, India, and Nigeria waste the most in absolute terms. Per capita, household food waste is highest in the United States, Australia, and parts of Europe.' },
  { q: 'What is the difference between food loss and food waste?', a: 'Food loss happens between harvest and retail - on farms, in storage, in transit. Food waste happens at retail, food service, and household level. Both together account for about one-third of all food produced.' },
  { q: 'Where does the data come from?', a: 'UNEP Food Waste Index Report 2024, published by the United Nations Environment Programme.' },
]

const RELATED = [
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
  { to: '/co2-emissions-clock', name: 'CO2 Emissions Clock', desc: 'Global emissions today' },
  { to: '/energy-use-clock', name: 'Energy Use Clock', desc: 'Primary energy today' },
  { to: '/births-clock', name: 'Births Clock', desc: 'Babies born today' },
]

export default function FoodWasteClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}