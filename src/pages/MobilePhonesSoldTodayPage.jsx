import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.phones

const EXPLAINERS = [
  { title: 'What the phones counter shows', body: 'This counter resets at midnight UTC and ticks up at about 38 mobile phones per second. That is roughly 1.2 billion units sold worldwide per year, based on the IDC Worldwide Quarterly Mobile Phone Tracker. The counter shows units sold since the start of the current UTC day.' },
  { title: 'What counts as a mobile phone', body: 'The figure includes both smartphones and feature phones, across all brands and price points. It excludes tablets, smartwatches, and cellular modems. Refurbished and second-hand sales are excluded because they do not represent new production. The global installed base, by contrast, is around 7 billion active devices.' },
  { title: 'Where phones are sold', body: 'China is the largest single market at roughly 280 million units per year, followed by India at 150 million, the United States at 130 million, and Brazil at 45 million. Smartphone share is above 90 percent in most markets, but feature phones still dominate in parts of sub-Saharan Africa and South Asia. The average selling price is around 350 dollars globally.' },
  { title: 'How phone sales are changing', body: 'Global unit sales peaked around 2016 at 1.5 billion per year and have since settled near 1.2 billion. The slowdown reflects longer replacement cycles, better durability, and market saturation in high-income countries. Growth now comes mainly from India, Africa, and Southeast Asia. Premium phones above 800 dollars are the fastest-growing segment even as total units fall.' },
]

const FAQS = [
  { q: 'How many phones are sold each day?', a: 'About 3.3 million per day worldwide, which is roughly 38 per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows units sold since the start of the current UTC day.' },
  { q: 'Which country buys the most phones?', a: 'China, at about 280 million units per year. India is second at around 150 million.' },
  { q: 'Are phone sales growing or shrinking?', a: 'Roughly flat. Global unit sales peaked around 1.5 billion in 2016 and have settled near 1.2 billion per year. Growth now comes mainly from emerging markets.' },
  { q: 'Where does the data come from?', a: 'The IDC Worldwide Quarterly Mobile Phone Tracker, which compiles shipment data reported by manufacturers and verified against channel inventory and retail sell-through.' },
]

const RELATED = [
  { to: '/tvs-sold-today', name: 'TVs Sold Today', desc: 'Televisions sold worldwide today' },
  { to: '/social-media-posts-today', name: 'Social Media Posts Today', desc: 'Posts worldwide today' },
  { to: '/emails-sent-today', name: 'Emails Sent Today', desc: 'Emails worldwide today' },
  { to: '/books-published-today', name: 'Books Published Today', desc: 'New book titles today' },
]

export default function MobilePhonesSoldTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}