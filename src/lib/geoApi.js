import tzlookup from 'tz-lookup';
const GEO_API_BASE = 'https://cdn.jsdelivr.net/npm/geo-data-api@latest/dist/api/v1/cities/country';
export function citiesUrl(iso2) { return `${GEO_API_BASE}/${String(iso2).toLowerCase()}.json`; }
export function unwrapCities(body) {
  if (Array.isArray(body)) return body;
  if (Array.isArray(body && body.data)) return body.data;
  if (Array.isArray(body && body.cities)) return body.cities;
  return [];
}
export function pickTimeZone(city) {
  const direct = city && (city.timezone || city.timeZone || city.tz || city.iana);
  if (typeof direct === 'string' && direct.trim()) return direct;
  const lat = city && (city.latitude !== undefined ? city.latitude : city.lat);
  const lon = city && (city.longitude !== undefined ? city.longitude : (city.lon !== undefined ? city.lon : city.lng));
  if (typeof lat === 'number' && typeof lon === 'number') {
    try { return tzlookup(lat, lon); } catch (e) { return null; }
  }
  return null;
}
export function pickCityName(city) {
  return (city && (city.name || city.city || city.cityName)) || '';
}
export async function fetchCountryCities(iso2, opts) {
  opts = opts || {};
  const res = await fetch(citiesUrl(iso2), { signal: opts.signal });
  if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + iso2);
  return unwrapCities(await res.json());
}
export function isValidTimeZone(tz) {
  if (!tz) return false;
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz }).format(new Date()); return true; }
  catch (e) { return false; }
}
export function safeFormat(date, timeZone, options) {
  try { return new Intl.DateTimeFormat(undefined, Object.assign({ timeZone: timeZone }, options)).format(date); }
  catch (e) { return '\u2014'; }
}