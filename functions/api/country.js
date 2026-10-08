// Cloudflare Pages Function — returns visitor's country from CF-IPCountry header.
// Local dev (vite preview): returns 404, hook falls back to null.
// Production (Cloudflare Pages): returns { country: "US" } etc.

export async function onRequest(context) {
  const country = (context.request.cf && context.request.cf.country) || null;
  return new Response(JSON.stringify({ country }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, max-age=3600'
    }
  });
}