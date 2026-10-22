import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCountryCities, pickTimeZone, pickCityName, isValidTimeZone, safeFormat } from '../lib/geoApi';
import '../styles/time-tools.css';

export default function CountryWorldClockPage() {
  const params = useParams();
  const iso2 = ((params && params.iso2) || '').toLowerCase();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!iso2) { setCities([]); setLoading(false); setError(null); return; }
    const controller = new AbortController();
    setLoading(true); setError(null); setCities([]);
    fetchCountryCities(iso2, { signal: controller.signal })
      .then((list) => setCities(list))
      .catch((e) => { if (e.name !== 'AbortError') setError(e.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [iso2]);

  const entries = useMemo(() => {
    const valid = [];
    for (let i = 0; i < cities.length; i++) {
      if (valid.length >= 24) break; // Show up to 24 cities
      const c = cities[i];
      const name = pickCityName(c);
      const tz = pickTimeZone(c);
      if (!name || !tz || !isValidTimeZone(tz)) continue;
      if (valid.some(v => v.name === name)) continue; // Skip duplicate city names
      valid.push({ name, tz });
    }
    return valid;
  }, [cities]);

  if (!iso2) {
    return (
      <div className="world-clock">
        <h1>World Clock</h1>
        <p>No country selected. <Link to="/world-clock/br">Try Brazil</Link></p>
      </div>
    );
  }

  return (
    <div className="world-clock">
      <header>
        <h1>World Clock - {iso2.toUpperCase()}</h1>
        <nav>
          <Link to="/">Home</Link>{' | '}
          <Link to={'/converter?country=' + iso2}>Convert times</Link>
        </nav>
      </header>
      {loading && <p>Loading cities for "{iso2}"...</p>}
      {error && <p className="error">Failed to load {iso2}: {error}. <Link to="/world-clock/br">Back to Brazil</Link></p>}
      {!loading && !error && entries.length === 0 && <p>No cities found for "{iso2}".</p>}
      {!loading && !error && entries.length > 0 && (
        <div className="clock-grid">
          {entries.map((c, i) => (
            <div key={`${c.tz}-${i}`} className="clock-card">
              <div className="city">{c.name}</div>
              <div className="tz">{c.tz}</div>
              <div className="time">{safeFormat(now, c.tz, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
              <div className="date">{safeFormat(now, c.tz, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}