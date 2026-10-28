import { useEffect } from 'react';
import { setPageMeta } from '../lib/seo';
import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.divorces

const EXPLAINERS = [
  { title: "About this counter", body: "About 2.4 million divorces occur worldwide each year, or roughly 6,575 per day. This counter ticks through today's divorces at that rate, reset at midnight UTC." },
  { title: "Where divorce rates are highest", body: "Maldives, Kazakhstan, Russia, Belgium, and Belarus report the highest divorce rates per 1,000 people. Rates are lowest in the Philippines and Malta, where divorce is illegal or effectively unavailable." },
  { title: "Half of marriages end in divorce?", body: "In some countries, roughly half of marriages end in divorce, though this is not universal. In the United States, about 40 per cent of first marriages end in divorce. In India, divorce rates are under 2 per cent." }
]

const FAQS = [
  { q: "How many divorces happen per day?", a: "About 6,575 worldwide, or roughly 2.4 million per year." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows divorces so far today." },
  { q: "Which country has the highest divorce rate?", a: "Maldives has the highest reported rate, at around 5 per 1,000 people. Among larger countries, Russia and Kazakhstan lead." },
  { q: "Where does the data come from?", a: "UN World Marriage Data 2024, which compiles national civil registries." }
]

const RELATED = [
  { to: "/marriages-today", name: "Marriages Clock", desc: "Marriages today" },
  { to: "/world-population-clock", name: "World Population", desc: "Live population" },
  { to: "/births-clock", name: "Births Clock", desc: "Births today" },
  { to: "/deaths-clock", name: "Deaths Clock", desc: "Deaths today" }
]

export default function DivorcesTodayPage() {

  useEffect(() => {
    document.title = 'Divorces Today | TimeGovern';
    setPageMeta();
  }, []);
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
