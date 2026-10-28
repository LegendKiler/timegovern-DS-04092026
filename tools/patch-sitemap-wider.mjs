import fs from 'node:fs';
import path from 'node:path';
const APPLY = process.argv.includes('--apply');
const SRC = path.join(process.cwd(), 'src');
const app = fs.readFileSync(path.join(SRC, 'App.jsx'), 'utf8');
const sm  = fs.readFileSync(path.join(SRC, 'pages', 'SiteMap.jsx'), 'utf8');
const eol = sm.includes('\r\n') ? '\r\n' : '\n';

const routeList = [];
const compToRoute = {};
app.split(/\r?\n/).forEach(l => {
  const m = l.match(/<Route\s+path=["']([^"']+)["'][^>]*element=\{<(\w+)/);
  if (m) { routeList.push(m[1]); compToRoute[m[2]] = m[1]; }
});
const matches = (p, pat) => {
  const e = p.split('/').filter(Boolean), r = pat.split('/').filter(Boolean);
  if (e.length !== r.length) return false;
  return r.every((seg, i) => seg.startsWith(':') || seg === e[i]);
};
const isRouted = p => routeList.some(r => matches(p, r));

const routesByKey = new Map();
const staticRoutes = [];
for (const r of routeList) {
  if (r.includes(':') || r === '*') continue;
  routesByKey.set(r.replace(/-/g, '').replace(/^\/+/, '').toLowerCase(), r);
  staticRoutes.push({ route: r, key: r.replace(/-/g, '').replace(/^\/+/, '').toLowerCase() });
}

const LEGAL_TITLES = {
  AdvertisingPolicy: 'Advertising Policy', AfricaPrivacy: 'Africa Privacy Laws',
  AsiaPacificPrivacy: 'Asia Pacific Privacy Laws', AustraliaAddendum: 'Australia Privacy Addendum (Privacy Act 1988)',
  AustraliaAIAddendum: 'Australia AI Addendum', ChinaAIAddendum: 'China AI Addendum',
  Disclaimer: 'Disclaimer', EuAIAddendum: 'EU AI Act Addendum',
  GdprPrivacy: 'EU GDPR Privacy Policy', GlobalAIPolicy: 'Global AI Policy',
  GlobalPrivacyCenter: 'Global Privacy Center', GlobalPrivacyPolicy: 'Global Privacy Policy',
  IndiaPrivacy: 'India DPDP Privacy Notice', LatinAmericaPrivacy: 'Latin America Privacy Laws',
  LinkPolicy: 'Link Policy', MiddleEastPrivacy: 'Middle East Privacy Laws',
  PrivacySettings: 'Privacy Settings', SingaporePrivacy: 'Singapore PDPA Privacy Policy',
  SouthAsiaPrivacy: 'South Asia Privacy Laws', TermsConditions: 'Terms & Conditions',
  UkAIAddendum: 'UK AI Addendum', UkPrivacy: 'United Kingdom Privacy Policy (UK GDPR)',
  UsAIAddendum: 'US AI Addendum', UsPrivacy: 'US Privacy Policy (CCPA/CPRA)',
  UsPrivacyNational: 'United States Privacy Policy', UsPrivacyState: 'US State-by-State Privacy Laws',
};
const legalCompFromSlug = slug => {
  const stripped = slug.replace(/^\/legal\//, '').replace(/-/g, '').toLowerCase();
  for (const k of Object.keys(LEGAL_TITLES)) if (k.toLowerCase() === stripped) return k;
  for (const k of Object.keys(LEGAL_TITLES)) if (k.toLowerCase().startsWith(stripped) && Math.abs(k.length - stripped.length) <= 3) return k;
  return null;
};
const reconstructLabel = mangled => {
  const concat = mangled.replace(/\s+/g, '');
  const words = concat.match(/[A-Z][a-z]+|[A-Z]+(?![a-z])/g) || [concat];
  return words.join(' ');
};

const SPECIAL = {
  '/legal/p-ri-va-cy-po-li-cy': { to: '/privacy', label: 'Privacy Policy' },
};

const lines = sm.split(/\r?\n/);
const entryRx = /^\s*\{\s*to:\s*"([^"]+)"\s*,\s*label:\s*"([^"]+)"\s*\},?\s*$/;
const cleanSet = new Set();
for (const line of lines) {
  const m = line.match(entryRx);
  if (m && isRouted(m[1])) cleanSet.add(m[1]);
}

const actions = [];
const samples = { replace: [], delete: [], ambiguous: [] };
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(entryRx);
  if (!m) continue;
  const [, to, label] = m;
  if (isRouted(to)) continue;
  let targetRoute = null, targetLabel = null, reason = '';
  if (SPECIAL[to]) {
    targetRoute = SPECIAL[to].to; targetLabel = SPECIAL[to].label;
  } else if (to.startsWith('/legal/')) {
    const comp = legalCompFromSlug(to);
    if (comp && compToRoute[comp]) { targetRoute = compToRoute[comp]; targetLabel = LEGAL_TITLES[comp]; }
    else if (comp) reason = 'orphan component';
    else reason = 'no legal component match';
  } else if (to.startsWith('/blog/')) {
    reason = 'blog post not published';
  } else {
    const stripped = to.replace(/^-?\//, '').replace(/-/g, '').toLowerCase();
    targetRoute = routesByKey.get(stripped) || null;
    if (targetRoute) {
      targetLabel = reconstructLabel(label);
    } else {
      const cands = staticRoutes.filter(r => r.key.endsWith('/' + stripped)).map(r => r.route);
      if (cands.length === 1) {
        targetRoute = cands[0];
        targetLabel = reconstructLabel(label);
      } else if (cands.length > 1) {
        reason = 'ambiguous (' + cands.length + ' suffix matches: ' + cands.join(', ') + ')';
      } else {
        reason = 'no route match';
      }
    }
  }
  if (targetRoute) {
    if (cleanSet.has(targetRoute)) {
      actions[i] = { action: 'delete', reason: 'duplicate of ' + targetRoute, to };
      samples.delete.push(to + '  [dup of ' + targetRoute + ']');
    } else {
      actions[i] = { action: 'replace', to: targetRoute, label: targetLabel };
      cleanSet.add(targetRoute);
      samples.replace.push(to + '  ?  ' + targetRoute + '  "' + targetLabel + '"');
    }
  } else {
    actions[i] = { action: 'delete', reason, to };
    samples.delete.push(to + '  [' + reason + ']');
  }
}

const counts = { replace: 0, delete: 0 };
const byReason = {};
for (const a of actions) {
  if (!a) continue;
  counts[a.action]++;
  if (a.action === 'delete') {
    const r = a.reason.startsWith('ambiguous') ? 'ambiguous' : a.reason;
    byReason[r] = (byReason[r] || 0) + 1;
  }
}
console.log('=== REPLACE (' + counts.replace + ') ===');
samples.replace.forEach(s => console.log('  ' + s));
console.log('\n=== DELETE (' + counts.delete + ') ===');
samples.delete.forEach(s => console.log('  ' + s));
console.log('\nDelete by reason:');
for (const [r, n] of Object.entries(byReason)) console.log('  ' + r + ': ' + n);

const newLines = [];
for (let i = 0; i < lines.length; i++) {
  const a = actions[i];
  if (!a) { newLines.push(lines[i]); continue; }
  if (a.action === 'delete') continue;
  newLines.push('  { to: "' + a.to + '", label: "' + a.label + '" },');
}
console.log('\nLines: ' + lines.length + ' ? ' + newLines.length);

if (!APPLY) { console.log('\nDRY RUN. Re-run with --apply.'); console.log('RESULT: DRY_OK'); }
else {
  fs.writeFileSync(path.join(SRC, 'pages', 'SiteMap.jsx'), newLines.join(eol));
  console.log('WROTE SiteMap.jsx'); console.log('RESULT: APPLIED');
}
