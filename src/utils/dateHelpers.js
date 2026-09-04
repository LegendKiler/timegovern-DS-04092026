import { format, getWeek, getDayOfYear as dateFnsGetDayOfYear, getISOWeek } from 'date-fns'

export function getWeekNumber(date) {
  return getWeek(date, { weekStartsOn: 1 })
}

export function getUTCWeekNumber(date) {
  return getISOWeek(date) // ISO week number (Monday-based)
}

export function getDayOfYear(date) {
  return dateFnsGetDayOfYear(date)
}

export function formatDate(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(date, timeZone, hour12 = false) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12,
  }).format(date)
}

export function getUTCOffset(timeZone, date = new Date()) {
  const tz = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
  const parts = tz.formatToParts(date)
  const offset = parts.find(p => p.type === 'timeZoneName')
  return offset ? offset.value : ''
}

export function getDSTStatus(timeZone, date = new Date()) {
  const jan = new Date(date.getFullYear(), 0, 1)
  const jul = new Date(date.getFullYear(), 6, 1)
  const isDST = (d) => {
    const tz = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
    const parts = tz.formatToParts(d)
    const offset = parts.find(p => p.type === 'timeZoneName').value
    return offset === 'GMT+1' || offset === 'GMT-4' // simplistic but works for example
  }
  return isDST(date) ? 'DST' : 'Standard'
}