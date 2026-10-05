import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.searches

const EXPLAINERS = [
  { title: "What the searches counter shows", body: "This counter resets at midnight UTC and ticks up at about 98,000 Google searches per second - roughly 8.5 billion per day. The rate comes from Internet Live Stats, which estimates Google volume from public disclosures, Google Trends data, and third-party analytics." },
  { title: "Why Google does not publish this", body: "Google stopped publishing exact search volume in 2012, when the last reported number was 100 billion per month. Current estimates are reverse-engineered from Google Trends, advertising platform disclosures, and web analytics data. No source is exact, but the order of magnitude is well established." },
  { title: "What people search for", body: "Weather, news, and celebrity names dominate daily top terms. The single most-searched brand in Google history is Facebook. Personal names outnumber brand searches by roughly 3 to 1. About 15 per cent of all Google queries have never been searched before." },
  { title: "Search is changing", body: "AI chatbots, voice assistants, and social discovery are shifting some queries away from Google. But Google still handles more than 90 per cent of traditional search traffic worldwide, and total search volume continues to grow about 5 to 8 per cent per year." }
]

const FAQS = [
  { q: "How many Google searches happen each day?", a: "About 8.5 billion per day worldwide, which is roughly 98,000 per second." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows searches since the start of the current UTC day." },
  { q: "Is Google search volume growing?", a: "Yes - roughly 10-15 per cent per year in the 2010s, slowing to 5-8 per cent in the 2020s as AI assistants and social discovery absorb some queries." },
  { q: "What is the most searched term?", a: "Weather terms lead daily. The most-searched brand in history is Facebook. Personal names outnumber brand searches by roughly 3 to 1." },
  { q: "Where does the data come from?", a: "Internet Live Stats, using Google Trends data plus third-party estimates from Comscore and Similarweb." }
]

const RELATED = [
  { to: "/emails-sent-today", name: "Emails Sent Clock", desc: "Emails today" },
  { to: "/world-population-clock", name: "World Population Clock", desc: "Live global population" },
  { to: "/money-spent-online-today", name: "Money Spent Online", desc: "E-commerce today" },
  { to: "/gdp-clock", name: "Global GDP Clock", desc: "Global GDP today" }
]

export default function GoogleSearchesTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
