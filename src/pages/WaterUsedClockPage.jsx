import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.water

const EXPLAINERS = [
  { title: "What the water counter shows", body: "This counter resets at midnight UTC and ticks up at about 127,000 cubic metres per second - roughly 4,000 cubic kilometres per year. That is the total freshwater withdrawn from rivers, lakes, and aquifers for human use. The rate comes from FAO AQUASTAT." },
  { title: "Where the water goes", body: "About 70% of freshwater withdrawals go to agriculture - irrigation for crops and livestock. Industry uses about 19% (mostly for cooling in power plants, manufacturing, and mining). Municipal use - drinking, cooking, sanitation - accounts for the remaining 11%." },
  { title: "The groundwater crisis", body: "Roughly 30% of freshwater comes from groundwater - ancient aquifers that refill over centuries, not years. In major food-producing regions including the US High Plains, the North China Plain, and northwestern India, aquifers are being depleted faster than they recharge. Some will be effectively exhausted within decades." },
  { title: "Water stress", body: "Two billion people live in countries facing high water stress - where demand exceeds 40% of renewable supply. By 2050, that number is projected to reach 5 billion. Climate change is intensifying the problem by shifting rainfall patterns and reducing snowpack in mountain regions." }
]

const FAQS = [
  { q: "How much water is used each day?", a: "About 11 billion cubic metres per day worldwide, which is roughly 127,000 cubic metres per second." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows freshwater withdrawn since the start of the current UTC day." },
  { q: "Which country uses the most water?", a: "India, China, and the United States together account for about 40% of global freshwater withdrawals, mostly for irrigation." },
  { q: "Is water actually running out?", a: "Freshwater is renewable, but not evenly distributed. Regions facing chronic shortages include the Middle East, North Africa, and parts of western North America and South Asia. Globally, demand is still rising." },
  { q: "Where does the data come from?", a: "FAO AQUASTAT, the UN Food and Agriculture Organization global water information system." }
]

const RELATED = [
  { to: "/food-waste-clock", name: "Food Waste Clock", desc: "Food wasted today" },
  { to: "/co2-emissions-clock", name: "CO2 Emissions Clock", desc: "Global emissions today" },
  { to: "/forest-loss-clock", name: "Forest Loss Clock", desc: "Forest lost today" },
  { to: "/world-population-clock", name: "World Population Clock", desc: "Live global population" }
]

export default function WaterUsedClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
