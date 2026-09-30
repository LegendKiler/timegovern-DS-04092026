// Time zone pair data + city database for programmatic pages
// URL pattern: /time/[city-a]-to-[city-b]

export const CITIES = {
  'new-york':    { name: 'New York',     timezone: 'America/New_York',    country: 'USA',        region: 'North America' },
  'los-angeles': { name: 'Los Angeles',  timezone: 'America/Los_Angeles', country: 'USA',        region: 'North America' },
  'chicago':     { name: 'Chicago',      timezone: 'America/Chicago',     country: 'USA',        region: 'North America' },
  'toronto':     { name: 'Toronto',      timezone: 'America/Toronto',     country: 'Canada',     region: 'North America' },
  'mexico-city': { name: 'Mexico City',  timezone: 'America/Mexico_City', country: 'Mexico',     region: 'North America' },
  'sao-paulo':   { name: 'Sao Paulo',    timezone: 'America/Sao_Paulo',   country: 'Brazil',     region: 'South America' },
  'buenos-aires':{ name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: 'Argentina', region: 'South America' },
  'london':      { name: 'London',       timezone: 'Europe/London',       country: 'UK',         region: 'Europe' },
  'paris':       { name: 'Paris',        timezone: 'Europe/Paris',        country: 'France',     region: 'Europe' },
  'berlin':      { name: 'Berlin',       timezone: 'Europe/Berlin',       country: 'Germany',    region: 'Europe' },
  'madrid':      { name: 'Madrid',       timezone: 'Europe/Madrid',       country: 'Spain',      region: 'Europe' },
  'rome':        { name: 'Rome',         timezone: 'Europe/Rome',         country: 'Italy',      region: 'Europe' },
  'amsterdam':   { name: 'Amsterdam',    timezone: 'Europe/Amsterdam',    country: 'Netherlands',region: 'Europe' },
  'stockholm':   { name: 'Stockholm',    timezone: 'Europe/Stockholm',    country: 'Sweden',     region: 'Europe' },
  'dubai':       { name: 'Dubai',        timezone: 'Asia/Dubai',          country: 'UAE',        region: 'Middle East' },
  'istanbul':    { name: 'Istanbul',     timezone: 'Europe/Istanbul',     country: 'Turkey',     region: 'Middle East' },
  'moscow':      { name: 'Moscow',       timezone: 'Europe/Moscow',       country: 'Russia',     region: 'Europe' },
  'cairo':       { name: 'Cairo',        timezone: 'Africa/Cairo',        country: 'Egypt',      region: 'Africa' },
  'johannesburg':{ name: 'Johannesburg', timezone: 'Africa/Johannesburg', country: 'South Africa', region: 'Africa' },
  'lagos':       { name: 'Lagos',        timezone: 'Africa/Lagos',        country: 'Nigeria',    region: 'Africa' },
  'mumbai':      { name: 'Mumbai',       timezone: 'Asia/Kolkata',        country: 'India',      region: 'Asia' },
  'delhi':       { name: 'New Delhi',    timezone: 'Asia/Kolkata',        country: 'India',      region: 'Asia' },
  'singapore':   { name: 'Singapore',    timezone: 'Asia/Singapore',      country: 'Singapore',  region: 'Asia' },
  'hong-kong':   { name: 'Hong Kong',    timezone: 'Asia/Hong_Kong',      country: 'China',      region: 'Asia' },
  'shanghai':    { name: 'Shanghai',     timezone: 'Asia/Shanghai',       country: 'China',      region: 'Asia' },
  'tokyo':       { name: 'Tokyo',        timezone: 'Asia/Tokyo',          country: 'Japan',      region: 'Asia' },
  'seoul':       { name: 'Seoul',        timezone: 'Asia/Seoul',          country: 'South Korea',region: 'Asia' },
  'bangkok':     { name: 'Bangkok',      timezone: 'Asia/Bangkok',        country: 'Thailand',   region: 'Asia' },
  'sydney':      { name: 'Sydney',       timezone: 'Australia/Sydney',    country: 'Australia',  region: 'Oceania' },
  'melbourne':   { name: 'Melbourne',    timezone: 'Australia/Melbourne', country: 'Australia',  region: 'Oceania' },
  'auckland':    { name: 'Auckland',     timezone: 'Pacific/Auckland',    country: 'New Zealand',region: 'Oceania' },
}

// 100 highest-value pairs to generate programmatically
export const TOP_PAIRS = [
  'new-york-to-london','london-to-new-york','new-york-to-tokyo','tokyo-to-new-york',
  'london-to-paris','paris-to-london','london-to-tokyo','tokyo-to-london',
  'new-york-to-los-angeles','los-angeles-to-new-york','new-york-to-dubai','dubai-to-new-york',
  'london-to-dubai','dubai-to-london','london-to-sydney','sydney-to-london',
  'new-york-to-sydney','sydney-to-new-york','london-to-singapore','singapore-to-london',
  'new-york-to-singapore','singapore-to-new-york','london-to-hong-kong','hong-kong-to-london',
  'new-york-to-paris','paris-to-new-york','new-york-to-berlin','berlin-to-new-york',
  'london-to-berlin','berlin-to-london','london-to-mumbai','mumbai-to-london',
  'new-york-to-mumbai','mumbai-to-new-york','new-york-to-toronto','toronto-to-new-york',
  'los-angeles-to-london','london-to-los-angeles','los-angeles-to-tokyo','tokyo-to-los-angeles',
  'los-angeles-to-sydney','sydney-to-los-angeles','tokyo-to-seoul','seoul-to-tokyo',
  'tokyo-to-shanghai','shanghai-to-tokyo','tokyo-to-singapore','singapore-to-tokyo',
  'tokyo-to-hong-kong','hong-kong-to-tokyo','shanghai-to-singapore','singapore-to-shanghai',
  'hong-kong-to-singapore','singapore-to-hong-kong','london-to-amsterdam','amsterdam-to-london',
  'london-to-madrid','madrid-to-london','london-to-rome','rome-to-london',
  'paris-to-berlin','berlin-to-paris','paris-to-rome','rome-to-paris',
  'paris-to-amsterdam','amsterdam-to-paris','new-york-to-chicago','chicago-to-new-york',
  'new-york-to-sao-paulo','sao-paulo-to-new-york','new-york-to-mexico-city','mexico-city-to-new-york',
  'los-angeles-to-chicago','chicago-to-los-angeles','los-angeles-to-new-york','sydney-to-auckland',
  'auckland-to-sydney','sydney-to-melbourne','melbourne-to-sydney','dubai-to-mumbai',
  'mumbai-to-dubai','dubai-to-singapore','singapore-to-dubai','dubai-to-london','london-to-istanbul','istanbul-to-london',
  'new-york-to-cairo','cairo-to-new-york','london-to-johannesburg','johannesburg-to-london',
  'london-to-lagos','lagos-to-london','dubai-to-cairo','cairo-to-dubai',
  'mumbai-to-singapore','singapore-to-mumbai','bangkok-to-singapore','singapore-to-bangkok',
  'seoul-to-shanghai','shanghai-to-seoul','delhi-to-mumbai','mumbai-to-delhi',
  'new-york-to-seoul','seoul-to-new-york','london-to-seoul','seoul-to-london',
  'toronto-to-london','london-to-toronto','toronto-to-paris','paris-to-toronto',
  'moscow-to-london','london-to-moscow','new-york-to-moscow','moscow-to-new-york',
  'stockholm-to-london','london-to-stockholm','berlin-to-dubai','dubai-to-berlin'
]

// Build lookup from slug
export function getPair(slug) {
  const parts = slug.split('-to-')
  if (parts.length !== 2) return null
  const a = CITIES[parts[0]]
  const b = CITIES[parts[1]]
  if (!a || !b) return null
  return { a, b, slugA: parts[0], slugB: parts[1] }
}