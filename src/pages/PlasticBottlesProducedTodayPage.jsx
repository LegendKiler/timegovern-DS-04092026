import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.plasticBottles

const EXPLAINERS = [
  { title: "About this counter", body: "An estimated 500 billion single-use plastic bottles are produced globally each year. That is roughly 1.37 billion per day, or about 15,854 per second." },
  { title: "Where they go", body: "Fewer than half are recycled. Roughly 8 million tonnes of plastic enters the ocean each year, and by 2050 there could be more plastic by weight in the ocean than fish." },
  { title: "The petrochemistry of plastic", body: "Most bottles are made from PET, which is derived from petroleum. Producing one 1-litre PET bottle uses about 0.3 litres of oil equivalent - roughly enough energy to power a light bulb for 6 hours." }
]

const FAQS = [
  { q: "How many plastic bottles per day?", a: "About 1.37 billion worldwide, or 500 billion per year." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows today's production so far." },
  { q: "How many are recycled?", a: "Less than half globally - rates vary from under 10 per cent in much of Asia and Africa to over 90 per cent in Norway and Germany." },
  { q: "Where does the data come from?", a: "Euromonitor International and Plastic Oceans Foundation estimates." }
]

const RELATED = [
  { to: "/plastic-produced-clock", name: "All Plastic Produced", desc: "Total plastic today" },
  { to: "/forest-loss-clock", name: "Forest Loss Clock", desc: "Forest lost today" },
  { to: "/co2-emissions-clock", name: "CO2 Emissions", desc: "Emissions today" },
  { to: "/water-used-clock", name: "Water Used Clock", desc: "Water used today" }
]

export default function PlasticBottlesProducedTodayPage() {

  useEffect(() => {
    document.title = 'Plastic Bottles Produced Today | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
