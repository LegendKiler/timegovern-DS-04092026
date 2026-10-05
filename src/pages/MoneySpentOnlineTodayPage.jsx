import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.moneyonline

const EXPLAINERS = [
  { title: "What the e-commerce counter shows", body: "This counter resets at midnight UTC and ticks up at about 200,000 US dollars per second - roughly 17 billion dollars per day. That is the total value of global online retail transactions. The rate comes from Statista Digital Market Outlook and UNCTAD e-commerce estimates for 2024." },
  { title: "Where the money goes", body: "China accounts for about 50 per cent of global e-commerce by value, followed by the United States at 20 per cent and the European Union at 15 per cent. Amazon, Alibaba, Pinduoduo, and JD.com together handle roughly half of all online retail transactions worldwide." },
  { title: "How e-commerce is changing", body: "Online retail grew from 1 per cent of total retail sales in 2000 to over 20 per cent in 2024. Mobile commerce - purchases made on phones - now accounts for 60 per cent of all e-commerce. Live shopping, social commerce, and same-day delivery are the fastest-growing segments." },
  { title: "The counterintuitive part", body: "E-commerce is growing, but it is not replacing physical retail. Total retail spending is also growing. The two are expanding together, with online taking share from specific categories like electronics, books, and apparel while physical stores dominate groceries, fuel, and services." }
]

const FAQS = [
  { q: "How much is spent online each day?", a: "About 17 billion US dollars per day worldwide, which is roughly 200,000 per second." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows e-commerce spending since the start of the current UTC day." },
  { q: "Which country does the most online shopping?", a: "China, with about 50 per cent of global e-commerce value, followed by the US and the EU." },
  { q: "What is the biggest e-commerce category?", a: "Consumer electronics, followed by apparel, then groceries and food delivery." },
  { q: "Where does the data come from?", a: "Statista Digital Market Outlook 2024 plus UNCTAD e-commerce estimates." }
]

const RELATED = [
  { to: "/gdp-clock", name: "Global GDP Clock", desc: "Global GDP today" },
  { to: "/emails-sent-today", name: "Emails Sent Clock", desc: "Emails today" },
  { to: "/google-searches-today", name: "Google Searches Clock", desc: "Searches today" },
  { to: "/world-population-clock", name: "World Population Clock", desc: "Live global population" }
]

export default function MoneySpentOnlineTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
