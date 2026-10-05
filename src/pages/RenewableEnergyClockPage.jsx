import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.renewable

const EXPLAINERS = [
  { title: "What the renewable counter shows", body: "This counter resets at midnight UTC and ticks up at about 2,860 gigajoules per second - roughly 90 exajoules per year. That is the total renewable primary energy consumed globally, including hydro, wind, solar, bioenergy, and geothermal. The rate comes from IEA Renewables 2024." },
  { title: "What counts as renewable", body: "The IEA tracks 'modern renewables' - hydro, wind, solar PV, concentrated solar, bioenergy, geothermal, and marine. Traditional biomass (wood and dung burned for cooking) is tracked separately because it is not sustainable and drives deforestation. Renewable energy supplied about 14% of global primary energy in 2024." },
  { title: "The growth story", body: "Solar and wind are the fastest-growing energy sources in history. Global renewable capacity added more than 500 GW in 2024 alone - roughly 30% of installed capacity. Renewables now supply more than 30% of global electricity, up from 20% in 2010." },
  { title: "What is still needed", body: "To hit net-zero by 2050, renewable energy must supply roughly 60% of primary energy, up from 14% today. That means adding renewable capacity at three times the current rate every year for the next two decades. Electrifying transport, heating, and industry is the other half of the equation." }
]

const FAQS = [
  { q: "How much renewable energy is produced each day?", a: "About 247 exajoules per year, or roughly 2,860 gigajoules per second." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows renewable energy consumed since the start of the current UTC day." },
  { q: "What percentage of world energy is renewable?", a: "About 14% of global primary energy, or roughly 30% of global electricity, in 2024." },
  { q: "Which country uses the most renewable energy?", a: "China, by absolute volume, with about 30% of global renewable consumption. Per capita, Iceland, Norway, and Sweden lead on renewable share, mostly from hydro and geothermal." },
  { q: "Where does the data come from?", a: "IEA Renewables 2024, published by the International Energy Agency." }
]

const RELATED = [
  { to: "/energy-use-clock", name: "Energy Use Clock", desc: "Primary energy today" },
  { to: "/co2-emissions-clock", name: "CO2 Emissions Clock", desc: "Global emissions today" },
  { to: "/forest-loss-clock", name: "Forest Loss Clock", desc: "Forest lost today" },
  { to: "/plastic-produced-clock", name: "Plastic Produced Clock", desc: "Plastic produced today" }
]

export default function RenewableEnergyClockPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
