import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.gdp

const EXPLAINERS = [
  { title: "What the GDP counter shows", body: "This counter resets at midnight UTC and ticks up at about 3.49 million US dollars per second - roughly 110 trillion dollars per year. The rate comes from the World Bank World Development Indicators, which compiles national GDP data from every country." },
  { title: "What GDP measures", body: "Gross Domestic Product is the total market value of all finished goods and services produced within a country in a year. It counts household consumption, business investment, government spending, and net exports. It does not count unpaid work, black-market activity, or environmental damage - all of which matter for well-being." },
  { title: "The largest economies", body: "The United States is the largest economy at around 29 trillion dollars, followed by China at 18 trillion, Germany at 4.7 trillion, and Japan at 4.1 trillion. In purchasing power parity terms China is closer to the US, but nominal GDP is the standard comparison for financial flows and debt." },
  { title: "How fast the world economy grows", body: "Global GDP grew at an average of 3.5 per cent per year from 1960 to 2000, slowed to 2.5 per cent per year in the 2010s, and dropped sharply during the 2020 pandemic before recovering. The IMF projects long-run global growth of 2.7 per cent per year through 2030." }
]

const FAQS = [
  { q: "What is the current global GDP?", a: "About 110 trillion US dollars per year, growing at 2.5 to 3 per cent annually." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows global GDP produced since the start of the current UTC day." },
  { q: "Which country has the largest economy?", a: "The United States at around 29 trillion dollars, followed by China at around 18 trillion, Germany at 4.7 trillion, and Japan at 4.1 trillion." },
  { q: "What is GDP per capita?", a: "Global GDP per capita is about 13,500 dollars. The highest is Luxembourg at around 130,000; the lowest is Burundi at about 240." },
  { q: "Where does the data come from?", a: "World Bank World Development Indicators, indicator NY.GDP.MKTP.CD, which compiles national GDP data from every country." }
]

const RELATED = [
  { to: "/money-spent-online-today", name: "Money Spent Online", desc: "E-commerce today" },
  { to: "/world-population-clock", name: "World Population Clock", desc: "Live global population" },
  { to: "/energy-use-clock", name: "Energy Use Clock", desc: "Primary energy today" },
  { to: "/co2-emissions-clock", name: "CO2 Emissions Clock", desc: "Global emissions today" }
]

export default function GdpClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
