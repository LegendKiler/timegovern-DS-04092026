import { useEffect, useState } from 'react';

const CACHE_KEY = 'tg:geo:v1';

/**
 * Read the geo object from sessionStorage, if present and valid.
 * sessionStorage (not localStorage) — a fresh tab re-fetches, same tab reuses.
 */
function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch { /* private mode / disabled storage — ignore */ }
  return null;
}

function writeCache(value) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(value)); } catch { /* noop */ }
}

/**
 * Browser-side timezone — works everywhere (local dev, non-CF hosts, edge failure).
 * Always available, so it backs up the edge-provided timezone.
 */
function browserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

/**
 * useGeo — one fetch per tab, cached in sessionStorage.
 *
 * Returns:
 *   { geo, loading }
 *
 * geo shape:
 *   {
 *     country:  "AU" | null,          // ISO-3166 alpha-2 (edge only)
 *     region:   "New South Wales" | null,
 *     city:     "Sydney" | null,
 *     timezone: "Australia/Sydney" | null,  // edge OR browser fallback
 *     source:   "cloudflare-edge" | "api" | "fallback" | "local-dev"
 *   }
 *
 * country is null on local Vite dev and any non-Cloudflare host.
 * timezone is always populated when the browser supports Intl.
 */
export function useGeo() {
  const [geo, setGeo] = useState(() => readCache());
  const [loading, setLoading] = useState(() => !readCache());

  useEffect(() => {
    if (geo) return;

    let cancelled = false;
    const fallbackTz = browserTimezone();

    async function fetchGeo() {
      try {
        const res = await fetch('/api/geo', { headers: { accept: 'application/json' } });
        if (!res.ok) throw new Error(`geo ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const value = {
          country:  data.country  || null,
          region:   data.region   || null,
          city:     data.city     || null,
          timezone: data.timezone || fallbackTz,
          source:   data.source   || 'api',
        };
        writeCache(value);
        setGeo(value);
      } catch {
        if (cancelled) return;
        // Network error, 404 (local dev), or edge failure:
        // still return a usable object with browser timezone.
        const value = {
          country:  null,
          region:   null,
          city:     null,
          timezone: fallbackTz,
          source:   'fallback',
        };
        writeCache(value);
        setGeo(value);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGeo();
    return () => { cancelled = true; };
  }, [geo]);

  return { geo, loading };
}

export default useGeo;