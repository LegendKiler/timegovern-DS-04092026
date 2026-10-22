import { readFileSync, writeFileSync } from 'fs';
const p = 'src/data/searchIndex.js';
let content = readFileSync(p, 'utf8');
let lines = content.split('\n');

// Remove ALL holiday entries
lines = lines.filter(line => !line.includes('href: "/holidays"'));

// Fix any dangling commas at the end of the array
let out = lines.join('\n').replace(/,\s*\]/g, ']');
writeFileSync(p, out);
console.log('Cleaned searchIndex.js. Holiday entries removed.');