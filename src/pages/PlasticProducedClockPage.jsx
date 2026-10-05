import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.plastic

const EXPLAINERS = [
  { title: "What the plastic counter shows", body: "This counter resets at midnight UTC and ticks up at about 13 tonnes per second - roughly 410 million tonnes per year. That is more than the combined weight of every human on Earth. The rate comes from the OECD Global Plastics Outlook 2024." },
  { title: "Where plastic comes from", body: "About 90% of plastic is made from fossil fuels - oil, gas, and coal. Production has grown from 2 million tonnes per year in 1950 to over 400 million today, a growth rate that outpaces almost every other material in human history." },
  { title: "Where it goes", body: "Only 9% of all plastic ever produced has been recycled. About 12% has been incinerated, and the remaining 79% has accumulated in landfills or the natural environment. Roughly 11 million tonnes leak into the ocean every year." },
  { title: "The policy response", body: "In 2022, 175 countries agreed to negotiate a Global Plastics Treaty - the first legally binding international agreement on plastic pollution. Negotiations are ongoing, with a target of finalizing by the end of 2025." }
]

const FAQS = [
  { q: "How much plastic is produced each day?", a: "About 1.1 million tonnes per day worldwide, which is roughly 13 tonnes per second." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows plastic produced since the start of the current UTC day." },
  { q: "How much plastic is recycled?", a: "Globally, about 9% of plastic ever produced has been recycled. The rest is landfilled, incinerated, or leaked into the environment." },
  { q: "Which country produces the most plastic?", a: "China, with about 30% of global production, followed by the EU, US, and the rest of Asia." },
  { q: "Where does the data come from?", a: "OECD Global Plastics Outlook 2024, which aggregates production data from national statistics and industry associations." }
]

const RELATED = [
  { to: "/co2-emissions-clock", name: "CO2 Emissions Clock", desc: "Global emissions today" },
  { to: "/energy-use-clock", name: "Energy Use Clock", desc: "Primary energy today" },
  { to: "/water-used-clock", name: "Water Used Clock", desc: "Freshwater used today" },
  { to: "/world-population-clock", name: "World Population Clock", desc: "Live global population" }
]

export default function PlasticProducedClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
