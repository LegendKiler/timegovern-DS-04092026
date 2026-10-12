import MetricPage from '../components/worldometers/MetricPage'
import { WORLD_RATES } from '../data/worldRates'

const metric = WORLD_RATES.books

const EXPLAINERS = [
  { title: 'What the books counter shows', body: 'This counter resets at midnight UTC and ticks up at about 0.07 new titles per second. That is roughly 2.2 million new book titles published worldwide per year, based on the UNESCO Institute for Statistics. The counter shows titles published since the start of the current UTC day.' },
  { title: 'What counts as a book title', body: 'UNESCO counts a title as any published work of 49 pages or more, issued to the public, with an ISBN. That includes print, ebooks, and audiobooks. Self-published titles are included when they carry an ISBN. The figure excludes magazines, newspapers, and academic journal articles.' },
  { title: 'Where books are published', body: 'China, the United States, and the United Kingdom are the three largest publishers by title count. China alone publishes around 440,000 new titles per year. The United States publishes about 300,000, and the UK about 190,000. Together they account for roughly 40 percent of global output. India, Japan, and Germany round out the top six.' },
  { title: 'How book publishing is changing', body: 'Title output has grown about tenfold since 1950, but average sales per title have fallen sharply. Self-publishing and print-on-demand have flooded the market with niche titles. Ebooks peaked around 2014 at roughly 25 percent of the US market and have since settled near 15 percent, as print has staged a partial comeback.' },
]

const FAQS = [
  { q: 'How many books are published each day?', a: 'About 6,000 new titles per day worldwide, which is roughly 0.07 per second.' },
  { q: 'When does the counter reset?', a: 'At midnight UTC (Coordinated Universal Time). The counter shows titles published since the start of the current UTC day.' },
  { q: 'Which country publishes the most books?', a: 'China, with about 440,000 new titles per year. The United States is second at around 300,000.' },
  { q: 'Does this include self-published books?', a: 'Yes, when they carry an ISBN. Self-published and print-on-demand titles now make up a large share of total output, especially in the United States.' },
  { q: 'Where does the data come from?', a: 'The UNESCO Institute for Statistics, which collects publishing data from national ISBN agencies and library catalogues. It is the standard reference for global book production.' },
]

const RELATED = [
  { to: '/emails-sent-today', name: 'Emails Sent Today', desc: 'Emails worldwide today' },
  { to: '/google-searches-today', name: 'Google Searches Today', desc: 'Searches worldwide today' },
  { to: '/social-media-posts-today', name: 'Social Media Posts Today', desc: 'Posts worldwide today' },
  { to: '/mobile-phones-sold-today', name: 'Mobile Phones Sold Today', desc: 'Phones sold today' },
]

export default function BooksPublishedTodayPage() {
  return <MetricPage metric={metric} explainers={EXPLAINERS} faqs={FAQS} related={RELATED} />
}