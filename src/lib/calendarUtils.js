export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const MONTH_SLUGS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

export function getFirstWeekday(year, month) {
  return new Date(year, month - 1, 1).getDay()
}

export function getMonthName(month) {
  return MONTH_NAMES[month - 1] || ''
}

export function getMonthSlug(month) {
  return MONTH_SLUGS[month - 1] || ''
}

export function getMonthFromSlug(slug) {
  return MONTH_SLUGS.indexOf(String(slug).toLowerCase()) + 1
}

export function buildMonthGrid(year, month) {
  const firstDay = getFirstWeekday(year, month)
  const daysInMonth = getDaysInMonth(year, month)
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

export function getISOWeekYear(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  return d.getUTCFullYear()
}

export function getWeeksInYear(year) {
  // ISO year has 53 weeks if Jan 1 is Thursday, or if it is a leap year and Jan 1 is Wednesday
  const jan1 = new Date(year, 0, 1).getDay()
  const dec31 = new Date(year, 11, 31).getDay()
  return (jan1 === 4 || dec31 === 4) ? 53 : 52
}

export function getWeekStartDate(year, week) {
  // ISO week 1 starts on the Monday of the week containing Jan 4
  const jan4 = new Date(year, 0, 4)
  const jan4Day = jan4.getDay() || 7
  const week1Monday = new Date(year, 0, 4 - (jan4Day - 1))
  const target = new Date(week1Monday)
  target.setDate(week1Monday.getDate() + (week - 1) * 7)
  return target
}

export function getDayOfYear(year, month, day) {
  const start = new Date(year, 0, 0)
  const diff = new Date(year, month - 1, day) - start
  return Math.floor(diff / 86400000)
}

export function formatDateLong(date) {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

export function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}