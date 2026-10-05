import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.forestloss

const EXPLAINERS = [
  { title: "What the forest loss counter shows", body: "This counter resets at midnight UTC and ticks up at about 0.32 hectares per second - roughly 10 million hectares per year. That is an area the size of Iceland lost every year. The rate comes from the FAO Global Forest Resources Assessment 2020, which covers 1990-2020 net forest loss." },
  { title: "Where forests are disappearing", body: "Tropical regions account for more than 90% of net forest loss. Brazil, the Democratic Republic of the Congo, and Indonesia together account for about half of all primary forest loss. Temperate and boreal forests are roughly stable, with regrowth offsetting harvest." },
  { title: "Why it matters", body: "Forests absorb about 2 billion tonnes of CO2 per year - roughly 5% of annual emissions. When forests are cleared, that carbon is released and the sink is lost. Deforestation also drives biodiversity loss, soil erosion, and disruption of regional rainfall patterns." },
  { title: "The good news", body: "Net forest loss has fallen from 16 million hectares per year in the 1990s to about 10 million per year in 2015-2020. Reforestation in China, India, and Europe has offset losses elsewhere. Some countries - including Vietnam and South Korea - have reversed deforestation entirely." }
]

const FAQS = [
  { q: "How much forest is lost each day?", a: "About 27,400 hectares per day worldwide, which is roughly 0.32 hectares per second." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows forest lost since the start of the current UTC day." },
  { q: "Which country loses the most forest?", a: "Brazil, with roughly 1.5 million hectares of primary forest lost per year, followed by the Democratic Republic of the Congo and Indonesia." },
  { q: "Is forest loss reversible?", a: "Yes - forests regenerate over decades if they are left alone. However, primary forest (never cleared) takes centuries to reform and has biodiversity that secondary forest cannot fully replace." },
  { q: "Where does the data come from?", a: "FAO Global Forest Resources Assessment 2020, which is the standard reference used by the UN and national governments." }
]

const RELATED = [
  { to: "/co2-emissions-clock", name: "CO2 Emissions Clock", desc: "Global emissions today" },
  { to: "/world-population-clock", name: "World Population Clock", desc: "Live global population" },
  { to: "/food-waste-clock", name: "Food Waste Clock", desc: "Food wasted today" },
  { to: "/energy-use-clock", name: "Energy Use Clock", desc: "Primary energy today" }
]

export default function ForestLossClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
