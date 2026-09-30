// Master city database for meeting planner, world clock, and time-pair pages.
// Each entry: slug, name, timezone (IANA), country, region, lat, lng

export const CITIES = {
  // North America
  'new-york':    { name: 'New York',     tz: 'America/New_York',    country: 'USA',          region: 'North America', lat: 40.71, lng: -74.01 },
  'los-angeles': { name: 'Los Angeles',  tz: 'America/Los_Angeles', country: 'USA',          region: 'North America', lat: 34.05, lng: -118.24 },
  'chicago':     { name: 'Chicago',      tz: 'America/Chicago',     country: 'USA',          region: 'North America', lat: 41.88, lng: -87.63 },
  'denver':      { name: 'Denver',       tz: 'America/Denver',      country: 'USA',          region: 'North America', lat: 39.74, lng: -104.99 },
  'miami':       { name: 'Miami',        tz: 'America/New_York',    country: 'USA',          region: 'North America', lat: 25.76, lng: -80.19 },
  'boston':      { name: 'Boston',       tz: 'America/New_York',    country: 'USA',          region: 'North America', lat: 42.36, lng: -71.06 },
  'seattle':     { name: 'Seattle',      tz: 'America/Los_Angeles', country: 'USA',          region: 'North America', lat: 47.61, lng: -122.33 },
  'toronto':     { name: 'Toronto',      tz: 'America/Toronto',     country: 'Canada',       region: 'North America', lat: 43.65, lng: -79.38 },
  'vancouver':   { name: 'Vancouver',    tz: 'America/Vancouver',   country: 'Canada',       region: 'North America', lat: 49.28, lng: -123.12 },
  'mexico-city': { name: 'Mexico City',  tz: 'America/Mexico_City', country: 'Mexico',       region: 'North America', lat: 19.43, lng: -99.13 },
  // South America
  'sao-paulo':   { name: 'Sao Paulo',    tz: 'America/Sao_Paulo',   country: 'Brazil',       region: 'South America', lat: -23.55, lng: -46.63 },
  'rio-de-janeiro': { name: 'Rio de Janeiro', tz: 'America/Sao_Paulo', country: 'Brazil',    region: 'South America', lat: -22.91, lng: -43.17 },
  'buenos-aires':{ name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires', country: 'Argentina', region: 'South America', lat: -34.60, lng: -58.38 },
  'lima':        { name: 'Lima',         tz: 'America/Lima',        country: 'Peru',         region: 'South America', lat: -12.05, lng: -77.04 },
  'bogota':      { name: 'Bogota',       tz: 'America/Bogota',      country: 'Colombia',     region: 'South America', lat: 4.71, lng: -74.07 },
  'santiago':    { name: 'Santiago',     tz: 'America/Santiago',    country: 'Chile',        region: 'South America', lat: -33.45, lng: -70.67 },
  // Europe
  'london':      { name: 'London',       tz: 'Europe/London',       country: 'UK',           region: 'Europe', lat: 51.51, lng: -0.13 },
  'paris':       { name: 'Paris',        tz: 'Europe/Paris',        country: 'France',       region: 'Europe', lat: 48.86, lng: 2.35 },
  'berlin':      { name: 'Berlin',       tz: 'Europe/Berlin',       country: 'Germany',      region: 'Europe', lat: 52.52, lng: 13.40 },
  'madrid':      { name: 'Madrid',       tz: 'Europe/Madrid',       country: 'Spain',        region: 'Europe', lat: 40.42, lng: -3.70 },
  'barcelona':   { name: 'Barcelona',    tz: 'Europe/Madrid',       country: 'Spain',        region: 'Europe', lat: 41.39, lng: 2.17 },
  'rome':        { name: 'Rome',         tz: 'Europe/Rome',         country: 'Italy',        region: 'Europe', lat: 41.90, lng: 12.50 },
  'amsterdam':   { name: 'Amsterdam',    tz: 'Europe/Amsterdam',    country: 'Netherlands',  region: 'Europe', lat: 52.37, lng: 4.90 },
  'stockholm':   { name: 'Stockholm',    tz: 'Europe/Stockholm',    country: 'Sweden',       region: 'Europe', lat: 59.33, lng: 18.07 },
  'dublin':      { name: 'Dublin',       tz: 'Europe/Dublin',       country: 'Ireland',      region: 'Europe', lat: 53.35, lng: -6.26 },
  'zurich':      { name: 'Zurich',       tz: 'Europe/Zurich',       country: 'Switzerland',  region: 'Europe', lat: 47.38, lng: 8.54 },
  'lisbon':      { name: 'Lisbon',       tz: 'Europe/Lisbon',       country: 'Portugal',     region: 'Europe', lat: 38.72, lng: -9.14 },
  'warsaw':      { name: 'Warsaw',       tz: 'Europe/Warsaw',       country: 'Poland',       region: 'Europe', lat: 52.23, lng: 21.01 },
  'moscow':      { name: 'Moscow',       tz: 'Europe/Moscow',       country: 'Russia',       region: 'Europe', lat: 55.75, lng: 37.62 },
  'istanbul':    { name: 'Istanbul',     tz: 'Europe/Istanbul',     country: 'Turkey',       region: 'Europe', lat: 41.01, lng: 28.98 },
  // Middle East
  'dubai':       { name: 'Dubai',        tz: 'Asia/Dubai',          country: 'UAE',          region: 'Middle East', lat: 25.20, lng: 55.27 },
  'riyadh':      { name: 'Riyadh',       tz: 'Asia/Riyadh',         country: 'Saudi Arabia', region: 'Middle East', lat: 24.71, lng: 46.68 },
  'doha':        { name: 'Doha',         tz: 'Asia/Qatar',          country: 'Qatar',        region: 'Middle East', lat: 25.29, lng: 51.53 },
  'tel-aviv':    { name: 'Tel Aviv',     tz: 'Asia/Jerusalem',      country: 'Israel',       region: 'Middle East', lat: 32.08, lng: 34.78 },
  // Africa
  'cairo':       { name: 'Cairo',        tz: 'Africa/Cairo',        country: 'Egypt',        region: 'Africa', lat: 30.04, lng: 31.24 },
  'johannesburg':{ name: 'Johannesburg', tz: 'Africa/Johannesburg', country: 'South Africa', region: 'Africa', lat: -26.20, lng: 28.05 },
  'cape-town':   { name: 'Cape Town',    tz: 'Africa/Johannesburg', country: 'South Africa', region: 'Africa', lat: -33.92, lng: 18.42 },
  'lagos':       { name: 'Lagos',        tz: 'Africa/Lagos',        country: 'Nigeria',      region: 'Africa', lat: 6.52, lng: 3.38 },
  'nairobi':     { name: 'Nairobi',      tz: 'Africa/Nairobi',      country: 'Kenya',        region: 'Africa', lat: -1.29, lng: 36.82 },
  // Asia
  'mumbai':      { name: 'Mumbai',       tz: 'Asia/Kolkata',        country: 'India',        region: 'Asia', lat: 19.08, lng: 72.88 },
  'delhi':       { name: 'New Delhi',    tz: 'Asia/Kolkata',        country: 'India',        region: 'Asia', lat: 28.61, lng: 77.21 },
  'bangalore':   { name: 'Bangalore',    tz: 'Asia/Kolkata',        country: 'India',        region: 'Asia', lat: 12.97, lng: 77.59 },
  'singapore':   { name: 'Singapore',    tz: 'Asia/Singapore',      country: 'Singapore',    region: 'Asia', lat: 1.35, lng: 103.82 },
  'hong-kong':   { name: 'Hong Kong',    tz: 'Asia/Hong_Kong',      country: 'China',        region: 'Asia', lat: 22.32, lng: 114.17 },
  'shanghai':    { name: 'Shanghai',     tz: 'Asia/Shanghai',       country: 'China',        region: 'Asia', lat: 31.23, lng: 121.47 },
  'beijing':     { name: 'Beijing',      tz: 'Asia/Shanghai',       country: 'China',        region: 'Asia', lat: 39.90, lng: 116.41 },
  'tokyo':       { name: 'Tokyo',        tz: 'Asia/Tokyo',          country: 'Japan',        region: 'Asia', lat: 35.68, lng: 139.69 },
  'seoul':       { name: 'Seoul',        tz: 'Asia/Seoul',          country: 'South Korea',  region: 'Asia', lat: 37.57, lng: 126.98 },
  'bangkok':     { name: 'Bangkok',      tz: 'Asia/Bangkok',        country: 'Thailand',     region: 'Asia', lat: 13.76, lng: 100.50 },
  'kuala-lumpur':{ name: 'Kuala Lumpur', tz: 'Asia/Kuala_Lumpur',   country: 'Malaysia',     region: 'Asia', lat: 3.14, lng: 101.69 },
  'jakarta':     { name: 'Jakarta',      tz: 'Asia/Jakarta',        country: 'Indonesia',    region: 'Asia', lat: -6.21, lng: 106.85 },
  'manila':      { name: 'Manila',       tz: 'Asia/Manila',         country: 'Philippines',  region: 'Asia', lat: 14.60, lng: 120.98 },
  // Oceania
  'sydney':      { name: 'Sydney',       tz: 'Australia/Sydney',    country: 'Australia',    region: 'Oceania', lat: -33.87, lng: 151.21 },
  'melbourne':   { name: 'Melbourne',    tz: 'Australia/Melbourne', country: 'Australia',    region: 'Oceania', lat: -37.81, lng: 144.96 },
  'brisbane':    { name: 'Brisbane',     tz: 'Australia/Brisbane',  country: 'Australia',    region: 'Oceania', lat: -27.47, lng: 153.03 },
  'perth':       { name: 'Perth',        tz: 'Australia/Perth',     country: 'Australia',    region: 'Oceania', lat: -31.95, lng: 115.86 },
  'auckland':    { name: 'Auckland',     tz: 'Pacific/Auckland',    country: 'New Zealand',  region: 'Oceania', lat: -36.85, lng: 174.76 }
}

export const CITY_LIST = Object.entries(CITIES).map(([slug, c]) => ({ slug, ...c }))

export const REGIONS = [...new Set(CITY_LIST.map(c => c.region))].sort()

export function getCity(slug) {
  return CITIES[slug] || null
}