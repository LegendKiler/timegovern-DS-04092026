import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.diabetesDeaths

const EXPLAINERS = [
  { title: "About this counter", body: "About 1.5 million deaths per year are directly attributable to diabetes, per IDF estimates - roughly 4,110 per day. Total deaths with diabetes as a contributing factor are much higher, around 6.7 million per year." },
  { title: "The growing epidemic", body: "The number of people with diabetes has grown from 108 million in 1980 to 537 million in 2021, and is projected to reach 783 million by 2045. Most of the increase is type 2 diabetes in lower- and middle-income countries." },
  { title: "Where it hits hardest", body: "Diabetes prevalence is highest in the Middle East and North Africa, at around 15 per cent of adults. Pakistan, Kuwait, and Qatar lead at over 20 per cent. India, China, and the United States have the largest absolute numbers." }
]

const FAQS = [
  { q: "How many diabetes deaths per day?", a: "About 4,110 directly attributed to diabetes worldwide. Including diabetes as a contributing factor, roughly 18,300 per day." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows today's deaths so far." },
  { q: "Is diabetes growing?", a: "Yes - cases have roughly quintupled in forty years and continue to rise globally." },
  { q: "Where does the data come from?", a: "International Diabetes Federation, IDF Diabetes Atlas, 11th edition (2024)." }
]

const RELATED = [
  { to: "/newly-obese-today", name: "Newly Obese", desc: "Adults who became obese today" },
  { to: "/obese-adults-worldwide", name: "Obese Adults Worldwide", desc: "Live count" },
  { to: "/cancer-deaths-today", name: "Cancer Deaths", desc: "Cancer deaths today" },
  { to: "/deaths-clock", name: "Deaths Clock", desc: "All deaths today" }
]

export default function DiabetesDeathsTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
