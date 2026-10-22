import fs from 'fs';

async function generate() {
  console.log('Fetching country stats from mledoze/countries...');
  try {
    const res = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('API returned an error:', data);
      process.exit(1);
    }

    const stats = {};
    for (const country of data) {
      if (!country.cca2) continue;
      const iso2 = country.cca2.toUpperCase();
      
      const population = country.population ? country.population.toLocaleString('en-US') : 'N/A';
      const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
      
      stats[iso2] = { population, languages };
    }

    const jsContent = `// Auto-generated from mledoze/countries\n// Do not edit manually. Run node scripts/generate-country-stats.mjs\n\nexport const COUNTRY_STATS = ${JSON.stringify(stats, null, 2)};\n`;
    fs.writeFileSync('src/data/countryStats.js', jsContent);
    console.log(`✅ Generated stats for ${Object.keys(stats).length} countries.`);
  } catch (err) {
    console.error('Fetch failed:', err);
    process.exit(1);
  }
}
generate();