// TimeGovern Service Worker — v4 (network-first for HTML, prompt on update)
const CACHE_NAME = 'timegovern-v4'
const PRECACHE_URLS = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
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

function isAsset(url) {
  return url.pathname.startsWith('/assets/')
}

self.addEventListener('fetch', (event) => {
  const request = event.request
  let url
  try { url = new URL(request.url) } catch (e) { return }
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/')) return

  // Hashed assets: cache-first (immutable)
  if (isAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((c) => c.put(request, clone)).catch(() => {})
        }
        return res
      }))
    )
    return
  }

  // HTML + everything else: network-first, fall back to cache
  event.respondWith(
    fetch(request).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        const clone = res.clone()
        caches.open(CACHE_NAME).then((c) => c.put(request, clone)).catch(() => {})
      }
      return res
    }).catch(() => {
      return caches.match(request).then((cached) => {
        if (cached) return cached
        if (request.mode === 'navigate') return caches.match('/index.html')
        return new Response('', { status: 504, statusText: 'Offline' })
      })
    })
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})