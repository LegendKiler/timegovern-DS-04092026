import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.newlyobese

const EXPLAINERS = [
  { title: 'What the newly obese counter shows', body: 'This counter resets at midnight UTC and ticks up at about 0.95 adults per second. That is roughly 30 million adults per year who cross the threshold into clinical obesity, based on WHO Global Health Observatory data. The counter shows adults who became obese since the start of the current UTC day.' },
  { title: 'How obesity is defined', body: 'Clinical obesity is defined as a body mass index (BMI) of 30 or higher. BMI is weight in kilograms divided by height in meters squared. The threshold is the same for men and women, though body composition differs. A 5 foot 9 inch person is obese above 203 pounds. A 5 foot 4 inch person is obese above 174 pounds.' },
  { title: 'Where new obesity is concentrated', body: 'The United States and Mexico still add the most obese adults in absolute terms, but the fastest growth rate is now in middle-income countries: Brazil, Egypt, India, Indonesia, and South Africa. In many of these countries, rising incomes have shifted diets toward processed food and sugar-sweetened beverages while physical activity has declined. Adult obesity rates exceed 30 percent in the US, Mexico, and much of the Gulf.' },
  { title: 'How obesity rates are changing', body: 'Global adult obesity has more than doubled since 1990, from about 200 million adults to over 1 billion in 2024. If current trends continue, the WHO projects 1.9 billion obese adults by 2035. Childhood obesity is rising even faster. The economic cost of obesity-related disease is estimated at 2 trillion dollars per year, roughly 2.8 percent of global GDP.' },
]

const FAQS = [
  { q: 'How many adults become obese each day?', a: 'About 82,000 adults per day worldwide, which is roughly 0.95 per second, or around 30 million per year.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows adults who crossed the obesity threshold since the start of the current UTC day.' },
  { q: 'What BMI counts as obese?', a: 'A BMI of 30 or higher. That is roughly 203 pounds at 5 foot 9 inches, or 174 pounds at 5 foot 4 inches.' },
  { q: 'Which countries are gaining obese adults fastest?', a: 'Middle-income countries such as Brazil, Egypt, India, Indonesia, and South Africa. Absolute numbers remain highest in the United States, but the growth rate has shifted to emerging markets.' },
  { q: 'Where does the data come from?', a: 'The WHO Global Health Observatory, which compiles measured height and weight data from national health surveys and extrapolates trends using demographic models.' },
]

const RELATED = [
  { to: '/obese-adults-worldwide', name: 'Obese Adults Worldwide', desc: 'Adults currently obese' },
  { to: '/hunger-deaths-today', name: 'Deaths From Hunger Today', desc: 'Hunger-related deaths today' },
  { to: '/undernourished-people', name: 'Undernourished People Worldwide', desc: 'People currently undernourished' },
  { to: '/world-population-clock', name: 'World Population Clock', desc: 'Live global population' },
]

export default function NewlyObeseTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}