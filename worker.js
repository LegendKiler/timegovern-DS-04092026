// ============================================================
// TimeGovern News RSS Proxy — v6
// - Correct text pipeline: decode entities → strip tags
// - Branded SVG fallback (source initial) when image proxy fails
// - All 7 categories with multi-feed aggregation
// ============================================================

const FEEDS = {
  general: [
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://apnews.com/hub/ap-top-news?format=rss',
    'https://feeds.skynews.com/feeds/rss/world.xml',
    'https://feeds.reuters.com/Reuters/worldNews'
  ],
  business: [
    'https://feeds.bbci.co.uk/news/business/rss.xml',
    'https://apnews.com/hub/business?format=rss',
    'https://feeds.skynews.com/feeds/rss/business.xml',
    'https://www.cnbc.com/id/10001147/device/rss/rss.html'
  ],
  technology: [
    'https://techcrunch.com/feed/',
    'https://www.theverge.com/rss/index.xml',
    'https://feeds.arstechnica.com/arstechnica/index',
    'https://www.engadget.com/rss.xml',
    'https://www.zdnet.com/news/rss.xml'
  ],
  sports: [
    'https://feeds.bbci.co.uk/sport/rss.xml',
    'https://www.aljazeera.com/xml/rss/all.xml',
    'https://www.skysports.com/rss/12040',
    'https://www.espn.com/espn/rss/news'
  ],
  health: [
    'https://feeds.bbci.co.uk/news/health/rss.xml',
    'https://news.sky.com/feeds/rss/home.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
  ],
  science: [
    'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    'https://www.sciencedaily.com/rss/all.xml',
    'https://www.sciencedaily.com/rss/all.xml',
    'https://www.nasa.gov/rss/dyn/breaking_news.rss'
  ],
  entertainment: [
    'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    'https://variety.com/feed/',
    'https://variety.com/feed/',
    'https://www.hollywoodreporter.com/feed/'
  ]
};

const SOURCE_NAMES = {
  'feeds.bbci.co.uk': 'BBC',
  'feeds.skynews.com': 'Sky News',
  'feeds.npr.org': 'NPR',
  'www.theguardian.com': 'The Guardian',
  'techcrunch.com': 'TechCrunch',
  'www.theverge.com': 'The Verge',
  'feeds.arstechnica.com': 'Ars Technica',
  'www.engadget.com': 'Engadget',
  'www.zdnet.com': 'ZDNet',
  'www.cnbc.com': 'CNBC',
  'www.skysports.com': 'Sky Sports',
  'www.espn.com': 'ESPN',
  'www.nasa.gov': 'NASA',
  'www.sciencedaily.com': 'ScienceDaily',
  'variety.com': 'Variety',
  'www.hollywoodreporter.com': 'The Hollywood Reporter'
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Max-Age': '86400'
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

function getSourceName(feedUrl) {
  try {
    const host = new URL(feedUrl).hostname;
    if (SOURCE_NAMES[host]) return SOURCE_NAMES[host];
    const base = host.replace('www.', '').split('.')[0];
    return base.charAt(0).toUpperCase() + base.slice(1);
  } catch (e) { return 'News'; }
}

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout:' + label)), ms))
  ]);
}

function extract(xml, tag) {
  const re = new RegExp('<' + tag + '>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</' + tag + '>');
  const m = xml.match(re);
  return m ? m[1].trim() : '';
}

// ---- Decode HTML entities (single + double encoded + mojibake) ----
function fixEncoding(text) {
  if (!text) return '';
  let s = text;
  // Unicode mojibake from UTF-8 read as Latin-1
  s = s.replace(/â€™/g, "'").replace(/â€œ/g, '"').replace(/â€/g, '"')
       .replace(/â€"/g, '—').replace(/â€"/g, '–').replace(/â¦/g, '...')
       .replace(/Â /g, ' ').replace(/Â£/g, '£').replace(/Â©/g, '©');
  // DOUBLE-encoded FIRST
  s = s.replace(/&amp;#8217;/g, "'").replace(/&amp;#8216;/g, "'")
       .replace(/&amp;#8220;/g, '"').replace(/&amp;#8221;/g, '"')
       .replace(/&amp;#8212;/g, '—').replace(/&amp;#8211;/g, '–')
       .replace(/&amp;#8230;/g, '...').replace(/&amp;#39;/g, "'")
       .replace(/&amp;#34;/g, '"').replace(/&amp;quot;/g, '"')
       .replace(/&amp;apos;/g, "'").replace(/&amp;nbsp;/g, ' ')
       .replace(/&amp;amp;/g, '&');
  // SINGLE-encoded numeric
  s = s.replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
       .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
       .replace(/&#8212;/g, '—').replace(/&#8211;/g, '–')
       .replace(/&#8230;/g, '...').replace(/&#39;/g, "'")
       .replace(/&#34;/g, '"');
  // Generic numeric
  s = s.replace(/&#(\d+);/g, (m, c) => {
    try { return String.fromCharCode(parseInt(c, 10)); } catch (e) { return m; }
  });
  // Named
  s = s.replace(/&quot;/g, '"').replace(/&apos;/g, "'")
       .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  // Bare &amp; LAST
  s = s.replace(/&amp;/g, '&');
  return s;
}

// ---- Strip tags AFTER decoding entities ----
function cleanText(s) {
  if (!s) return '';
  let x = fixEncoding(s);
  x = x.replace(/<[^>]*>/g, ' ');   // strip HTML tags (now real < > not &lt;)
  x = x.replace(/\s+/g, ' ').trim();
  return x;
}

function extractImage(itemXml, desc) {
  let img = null, m;
  m = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i); if (m) img = m[1];
  if (!img) { m = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i); if (m) img = m[1]; }
  if (!img) { m = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image[^"']*["']/i); if (m) img = m[1]; }
  if (!img && desc) { m = desc.match(/<img[^>]+src=["']([^"']+)["']/i); if (m) img = m[1]; }
  return img;
}

function parseRSS(xml, sourceName) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const itemXml = m[1];
    const title = extract(itemXml, 'title');
    const link = extract(itemXml, 'link');
    const desc = extract(itemXml, 'description');
    const date = extract(itemXml, 'pubDate') || extract(itemXml, 'dc:date');
    const image = extractImage(itemXml, desc);
    if (title && link) {
      items.push({
        title: cleanText(title),
        link: link,
        description: cleanText(desc).slice(0, 220),
        image: image,
        pubDate: date || new Date().toISOString(),
        source: sourceName
      });
    }
  }
  return items;
}

async function fetchFeed(url, sourceName) {
  try {
    const res = await withTimeout(fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml,application/xml,text/xml,*/*' }
    }), 8000, 'feed:' + sourceName);
    if (!res.ok) return { articles: [], source: sourceName, error: 'HTTP ' + res.status };
    const xml = new TextDecoder('utf-8').decode(await res.arrayBuffer());
    return { articles: parseRSS(xml, sourceName), source: sourceName, error: null };
  } catch (e) {
    return { articles: [], source: sourceName, error: e.message };
  }
}

async function fetchOgImage(articleUrl) {
  if (!articleUrl) return null;
  try {
    const res = await withTimeout(fetch(articleUrl, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html' },
      redirect: 'follow'
    }), 3500, 'og');
    if (!res.ok) return null;
    const text = new TextDecoder('utf-8').decode(await res.arrayBuffer()).slice(0, 200000);
    const patterns = [
      /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
      /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i
    ];
    for (const re of patterns) {
      const m = text.match(re);
      if (m && m[1] && m[1].startsWith('http')) return m[1];
    }
    return null;
  } catch (e) { return null; }
}

async function proxyImage(imageUrl) {
  try {
    let referer = new URL(imageUrl).origin + '/';
    if (imageUrl.includes('guim.co.uk') || imageUrl.includes('theguardian.com')) referer = 'https://www.theguardian.com/';
    else if (imageUrl.includes('bbci.co.uk') || imageUrl.includes('bbc.co.uk')) referer = 'https://www.bbc.co.uk/';
    else if (imageUrl.includes('npr.org')) referer = 'https://www.npr.org/';
    const res = await withTimeout(fetch(imageUrl, {
      headers: {
        'User-Agent': UA,
        'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
        'Referer': referer
      },
      redirect: 'follow'
    }), 5000, 'img');
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    return { buf, contentType };
  } catch (e) { return null; }
}

// ---- Branded SVG placeholder (used for both missing and failed images) ----
function makePlaceholder(title, source) {
  const palette = [
    ['#059669', '#047857'], ['#0891b2', '#0e7490'], ['#7c3aed', '#6d28d9'],
    ['#db2777', '#be185d'], ['#ea580c', '#c2410c'], ['#2563eb', '#1e40af']
  ];
  const safeTitle = (title || '').slice(0, 60);
  const safeSource = (source || 'NEWS').slice(0, 20);
  const hash = (safeTitle + safeSource).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const c1 = palette[hash % palette.length][0];
  const c2 = palette[hash % palette.length][1];
  const initial = safeSource.replace(/^The\s+/i, '').replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase() || 'N';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/>' +
    '</linearGradient></defs>' +
    '<rect fill="url(#g)" width="400" height="225"/>' +
    '<circle cx="200" cy="100" r="45" fill="rgba(255,255,255,0.15)"/>' +
    '<text x="200" y="115" font-family="system-ui,sans-serif" font-size="52" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">' + initial + '</text>' +
    '<text x="200" y="180" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="rgba(255,255,255,0.95)" text-anchor="middle" letter-spacing="1">' + safeSource.toUpperCase() + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// ---- ASCII-safe JSON (escapes all non-ASCII as \uXXXX) ----
function toAsciiJson(obj) {
  const json = JSON.stringify(obj);
  let out = '';
  for (let i = 0; i < json.length; i++) {
    const code = json.charCodeAt(i);
    if (code > 126) {
      out += '\\u' + code.toString(16).padStart(4, '0');
    } else {
      out += json[i];
    }
  }
  return out;
}
export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const url = new URL(request.url);

    // ---- /img proxy route ----
    if (url.pathname === '/img') {
      const target = url.searchParams.get('url');
      const source = url.searchParams.get('source') || 'NEWS';
      const title  = url.searchParams.get('title') || '';
      const fallback = makePlaceholder(title, source);

      if (!target) {
        return new Response(fallback, {
          headers: { 'Content-Type': 'image/svg+xml', 'Access-Control-Allow-Origin': '*' }
        });
      }
      const proxied = await proxyImage(target);
      if (!proxied) {
        return new Response(fallback, {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
      return new Response(proxied.buf, {
        headers: {
          'Content-Type': proxied.contentType,
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ---- /api/geo route ---- (GEO-1)
    // Reads Cloudflare edge geo metadata. Additive: only runs for /api/geo,
    // leaves the /img and news handler paths completely untouched.
    if (url.pathname === '/api/geo') {
      const cf = request.cf || {};
      const payload = {
        country:  cf.country  || null,
        region:   cf.region   || null,
        city:     cf.city     || null,
        timezone: cf.timezone || null,
        colo:     cf.colo     || null,
        source:   cf.country ? 'cloudflare-edge' : 'local-dev',
      };
      return new Response(JSON.stringify(payload), {
        headers: {
          ...CORS,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'private, max-age=3600',
          'Vary': 'CF-IPCountry',
        },
      });
    }
    // ---- /api news route ----
    const category = url.searchParams.get('category') || 'general';
    const limit = parseInt(url.searchParams.get('limit') || '12', 10);
    const skipScrape = url.searchParams.get('skipScrape') === '1';

    const feeds = FEEDS[category] || FEEDS.general;

    const results = await Promise.all(
      feeds.map(f => fetchFeed(f, getSourceName(f)))
    );

    let articles = [];
    const diagnostics = [];
    for (const r of results) {
      diagnostics.push({ source: r.source, count: r.articles.length, error: r.error });
      articles = articles.concat(r.articles);
    }

    articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const seen = new Set();
    articles = articles.filter(a => {
      const k = a.title.toLowerCase().slice(0, 50);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    articles = articles.slice(0, limit);

    if (!skipScrape) {
      articles = await Promise.all(articles.map(async (a) => {
        if (a.image) return a;
        const og = await fetchOgImage(a.link);
        return { ...a, image: og };
      }));
    }

    articles = articles.map(a => {
      let img = a.image;
      if (img && !img.startsWith('data:') && !img.startsWith('/img')) {
        img = '/img?url=' + encodeURIComponent(img)
            + '&source=' + encodeURIComponent(a.source || 'NEWS')
            + '&title=' + encodeURIComponent((a.title || '').slice(0, 60));
      }
      return { ...a, image: img || makePlaceholder(a.title, a.source) };
    });

    return new Response(toAsciiJson({
      articles, category, count: articles.length, diagnostics, enriched: !skipScrape
    }), {
      headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
};