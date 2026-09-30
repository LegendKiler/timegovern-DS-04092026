// 30 global hub cities for weather-vs comparisons.
// All slugs must exist in astroCities.js.
// Alphabetical canonical direction: london/vs/tokyo, never tokyo/vs/london.
export const WEATHER_HUBS = [
  'amsterdam', 'auckland', 'bangkok', 'berlin', 'buenos-aires',
  'cairo', 'chicago', 'dubai', 'hong-kong', 'istanbul',
  'jakarta', 'johannesburg', 'london', 'los-angeles', 'madrid',
  'manila', 'mexico-city', 'moscow', 'mumbai', 'nairobi',
  'new-york', 'paris', 'rome', 'sao-paulo', 'seoul',
  'singapore', 'sydney', 'tokyo', 'toronto', 'vancouver',
]

export function getCanonicalPair(a, b) {
  const x = String(a).toLowerCase()
  const y = String(b).toLowerCase()
  return x < y ? [x, y] : [y, x]
}

export function buildAllPairs() {
  const pairs = []
  for (let i = 0; i < WEATHER_HUBS.length; i++) {
    for (let j = i + 1; j < WEATHER_HUBS.length; j++) {
      const [a, b] = getCanonicalPair(WEATHER_HUBS[i], WEATHER_HUBS[j])
      pairs.push([a, b])
    }
  }
  return pairs
}