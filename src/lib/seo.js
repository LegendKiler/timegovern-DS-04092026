export function setPageMeta() {
  setCanonical()
  const title = document.title
  const descEl = document.querySelector('meta[name="description"]')
  const desc = descEl ? descEl.content : ''
  const url = 'https://timegovern.com' + window.location.pathname

  let canon = document.querySelector('link[rel="canonical"]')
  if (!canon) {
    canon = document.createElement('link')
    canon.rel = 'canonical'
    document.head.appendChild(canon)
  }
  canon.href = url

  const og = (prop, content) => {
    const attr = prop.startsWith('twitter:') ? 'name' : 'property'
    let el = document.querySelector('meta[' + attr + '="' + prop + '"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, prop)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  og('og:title', title)
  og('og:description', desc)
  og('og:url', url)
  og('og:type', url.includes('/blog/') ? 'article' : 'website')
  og('og:site_name', 'TimeGovern')
  og('og:image', 'https://timegovern.com/icon-512.png')
  og('twitter:card', 'summary_large_image')
  og('twitter:title', title)
  og('twitter:description', desc)
  og('twitter:image', 'https://timegovern.com/icon-512.png')
}
// --- Canonical link management (added for SEO) ---
export function setCanonical(override) {
  if (typeof document === 'undefined') return
  var p = override || (window.location.pathname + window.location.search)
  var url = 'https://timegovern.com' + p
  var link = document.querySelector('link[rel="canonical"]')
  if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
  link.setAttribute('href', url)
}