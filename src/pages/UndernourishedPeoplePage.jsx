import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.undernourished

const EXPLAINERS = [
  { title: 'What the undernourished counter shows', body: 'This counter shows the current number of undernourished people worldwide, growing slowly at about 0.03 per second. That is roughly 950,000 additional undernourished people per year, based on FAO State of Food Security estimates. The current base figure is 735 million people as of 2024.' },
  { title: 'What undernourishment means', body: 'Undernourishment means a persons habitual food intake is below the minimum dietary energy requirement for an active, healthy life. It is a chronic condition, unlike acute food insecurity, which is a crisis state. A person can be undernourished for years without being in an acute crisis. The FAO measures it through national food balance sheets and household consumption surveys.' },
  { title: 'Where undernourishment is concentrated', body: 'About 90 percent of undernourished people live in Asia and sub-Saharan Africa. India alone accounts for roughly 195 million undernourished people, more than any other country. Sub-Saharan Africa has the highest share of population undernourished, above 20 percent in most countries. Latin America and the Caribbean have reduced undernourishment to around 6 percent of population.' },
  { title: 'How undernourishment is changing', body: 'Global undernourishment fell from about 810 million in 2000 to a low of 615 million in 2015, then reversed. The pandemic, the Ukraine war food price spike, and climate shocks pushed the number back up to 735 million by 2024. The UN Sustainable Development Goal of zero hunger by 2030 is now considered unreachable on current trends. Without major changes, 600 million people will still be undernourished in 2030.' },
]

const FAQS = [
  { q: 'How many people are undernourished worldwide?', a: 'About 735 million people as of 2024, roughly 9 percent of the global population.' },
  { q: 'Is the number growing or shrinking?', a: 'It fell steadily from 2000 to 2015, then reversed. It has been roughly flat at 730 to 740 million since 2020.' },
  { q: 'Which country has the most undernourished people?', a: 'India, at about 195 million people. China and Nigeria are next, though Chinas number has fallen sharply since 2000.' },
  { q: 'What is the difference between undernourishment and hunger?', a: 'Hunger is the physical sensation. Undernourishment is the chronic condition of not getting enough calories over time, measured against minimum dietary energy requirements.' },
  { q: 'Where does the data come from?', a: 'The FAO State of Food Security and Nutrition report, which uses national food balance sheets, household consumption surveys, and demographic data to estimate the undernourished population.' },
]

const RELATED = [
  { to: '/hunger-deaths-today', name: 'Deaths From Hunger Today', desc: 'Hunger-related deaths today' },
  { to: '/newly-hungry-today', name: 'People Newly Food Insecure Today', desc: 'Falling into food insecurity today' },
  { to: '/acute-food-insecurity-people', name: 'People Facing Acute Food Insecurity', desc: 'Current acute food insecurity' },
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
]

export default function UndernourishedPeoplePage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}