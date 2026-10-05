import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.emails

const EXPLAINERS = [
  { title: "What the emails counter shows", body: "This counter resets at midnight UTC and ticks up at about 4.54 million emails per second - roughly 392 billion per day. The rate comes from the Radicati Group Email Statistics Report 2024-2028, the standard industry reference for global email volume." },
  { title: "What is actually in those emails", body: "About 60 per cent of all email traffic is spam, marketing, or transactional mail sent by businesses. Only the remaining 40 per cent is personal correspondence between individuals. Gmail, Outlook, and Yahoo together host more than half of all mailboxes worldwide." },
  { title: "How much is real versus filtered", body: "The Radicati report counts every SMTP transaction, including mail that gets filtered before reaching an inbox. Of the 392 billion emails sent daily, roughly 235 billion are filtered or blocked. Real person-to-person email is closer to 15-20 billion per day." },
  { title: "Email is not dying", body: "Despite a decade of predictions about its demise, email volume has grown every year since 2000. Business email continues to rise as more companies digitise. Personal email has plateaued, replaced by WhatsApp, WeChat, and iMessage for one-to-one chat, but email remains the backbone of business communication." }
]

const FAQS = [
  { q: "How many emails are sent each day?", a: "About 392 billion per day worldwide, which is roughly 4.5 million per second." },
  { q: "When does the counter reset?", a: "At midnight UTC. The counter shows emails sent since the start of the current UTC day." },
  { q: "How much email is spam?", a: "About 60 per cent of all email is spam, marketing, or transactional. Real person-to-person email is closer to 15-20 billion per day." },
  { q: "Which country sends the most email?", a: "The United States, followed by China, the United Kingdom, and Germany. US users account for roughly 30 per cent of global email volume." },
  { q: "Where does the data come from?", a: "Radicati Group Email Statistics Report 2024-2028, published by The Radicati Group, a technology market research firm." }
]

const RELATED = [
  { to: "/google-searches-today", name: "Google Searches Clock", desc: "Searches today" },
  { to: "/world-population-clock", name: "World Population Clock", desc: "Live global population" },
  { to: "/money-spent-online-today", name: "Money Spent Online", desc: "E-commerce today" },
  { to: "/gdp-clock", name: "Global GDP Clock", desc: "Global GDP today" }
]

export default function EmailsSentTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}
