import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.tvs

const EXPLAINERS = [
  { title: 'What the TVs counter shows', body: 'This counter resets at midnight UTC and ticks up at about 6.4 televisions per second. That is roughly 200 million TV sets sold worldwide per year, based on Statista Consumer Electronics Outlook. The counter shows units sold since the start of the current UTC day.' },
  { title: 'What counts as a TV', body: 'The figure includes LCD, OLED, QLED, Mini-LED, and plasma sets with a screen size of 20 inches or larger. It excludes computer monitors, digital signage, and phone screens. Both smart and non-smart televisions are counted. Sales are tracked at the retail point, so units still in warehouses are not included.' },
  { title: 'Where TVs are sold', body: 'China, the United States, and India are the three largest TV markets by units sold. China alone accounts for roughly 40 million sets per year. The United States is next at about 35 million, and India at about 20 million. Together they account for just under half of global sales. Average screen size has grown from 32 inches in 2010 to 50 inches today.' },
  { title: 'How TV sales are changing', body: 'Global TV sales peaked around 2015 at about 230 million units per year and have declined slowly since. The drop is driven by longer replacement cycles, better build quality, and competition from phones and tablets for casual viewing. The shift is toward larger, more expensive sets rather than more units. 8K adoption remains low outside Japan and South Korea.' },
]

const FAQS = [
  { q: 'How many TVs are sold each day?', a: 'About 548,000 per day worldwide, which is roughly 6.4 per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows units sold since the start of the current UTC day.' },
  { q: 'Which country buys the most TVs?', a: 'China, at about 40 million sets per year. The United States is second at around 35 million.' },
  { q: 'Are TV sales growing or shrinking?', a: 'Shrinking slowly. Global sales peaked around 230 million units in 2015 and are now near 200 million per year. Average screen size is growing even as unit sales fall.' },
  { q: 'Where does the data come from?', a: 'Statista Consumer Electronics Outlook, which aggregates retail point-of-sale data, manufacturer shipments, and industry association reports from national markets.' },
]

const RELATED = [
  { to: '/mobile-phones-sold-today', name: 'Mobile Phones Sold Today', desc: 'Phones sold worldwide today' },
  { to: '/social-media-posts-today', name: 'Social Media Posts Today', desc: 'Posts worldwide today' },
  { to: '/emails-sent-today', name: 'Emails Sent Today', desc: 'Emails worldwide today' },
  { to: '/books-published-today', name: 'Books Published Today', desc: 'New book titles today' },
]

export default function TvsSoldTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}