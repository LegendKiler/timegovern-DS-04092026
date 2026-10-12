import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.posts

const EXPLAINERS = [
  { title: 'What the posts counter shows', body: 'This counter resets at midnight UTC and ticks up at about 5,800 posts per second. That is roughly 183 billion social media posts per year across all major platforms, based on Internet Live Stats aggregation. The counter shows posts since the start of the current UTC day.' },
  { title: 'Which platforms are included', body: 'The figure aggregates posts, tweets, shares, and public uploads across Facebook, Instagram, X (formerly Twitter), TikTok, Weibo, Reddit, LinkedIn, and Snapchat. It excludes private messages, WhatsApp, and direct messages, which are not publicly visible. It also excludes comments and reactions to existing posts.' },
  { title: 'Where posts come from', body: 'Facebook remains the largest single source by raw post volume, followed by Instagram and X. TikTok has the highest engagement per post but a lower total post count because videos take longer to produce. India, the United States, Brazil, and Indonesia are the four largest source countries by post volume.' },
  { title: 'How post volume is changing', body: 'Total post volume grew rapidly from 2010 to 2020, then plateaued as users shifted from public posting to private messaging and stories. Daily posts on X have fallen about 30 percent since 2022, while short-form video uploads have grown. The net effect is roughly flat global volume with a shift toward video and ephemeral content.' },
]

const FAQS = [
  { q: 'How many social media posts are made each day?', a: 'About 500 million per day worldwide, which is roughly 5,800 per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows posts since the start of the current UTC day.' },
  { q: 'Does this include WhatsApp messages?', a: 'No. WhatsApp, Messenger, and other private messaging are excluded because they are not publicly visible. Only public posts, tweets, and shares are counted.' },
  { q: 'Which platform has the most posts?', a: 'Facebook, followed by Instagram and X. TikTok has higher engagement per post but fewer total posts because video takes longer to produce.' },
  { q: 'Where does the data come from?', a: 'Internet Live Stats, which aggregates published platform transparency reports, earnings disclosures, and third-party research to estimate global post volume.' },
]

const RELATED = [
  { to: '/emails-sent-today', name: 'Emails Sent Today', desc: 'Emails worldwide today' },
  { to: '/google-searches-today', name: 'Google Searches Today', desc: 'Searches worldwide today' },
  { to: '/books-published-today', name: 'Books Published Today', desc: 'New book titles today' },
  { to: '/tvs-sold-today', name: 'TVs Sold Today', desc: 'Televisions sold today' },
]

export default function SocialMediaPostsTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}