// TimeGovern Service Worker — v3 (safe caching)
// Fixes: NotFoundError on data: URLs, non-GET, opaque responses

const CACHE_NAME = 'timegovern-v3'
const PRECACHE_URLS = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  )
})

// Only cache same-origin, http(s), GET requests
function shouldCache(request, url) {
  if (request.method !== 'GET') return false
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
  if (url.origin !== self.location.origin) return false
  if (url.pathname.startsWith('/@')) return false        // Vite HMR
  if (url.pathname.startsWith('/src/')) return false     // Vite source files
  if (url.pathname.startsWith('/node_modules/')) return false
  if (url.pathname.startsWith('/api/')) return false     // never cache API
  return true
}

self.addEventListener('fetch', (event) => {
  const request = event.request
  let url
  try { url = new URL(request.url) } catch (e) { return }

  // Skip anything we can't/shouldn't cache — let the browser handle it
  if (!shouldCache(request, url)) return

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached

      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response
        if (response.type !== 'basic') return response  // skip opaque/cors

        const responseClone = response.clone()
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(request, responseClone).catch(() => {}))
          .catch(() => {})

        return response
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match('/index.html')
        return new Response('', { status: 504, statusText: 'Offline' })
      })
    })
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})