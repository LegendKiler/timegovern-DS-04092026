import fs from 'fs';

async function generate() {
  console.log("Attempting to fetch from REST Countries API...");
  let data = [];
  
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,idd,capital,population,area,currencies,languages,timezones,latlng,region');
    const json = await res.json();
    if (Array.isArray(json)) {
      data = json;
      console.log("API Fetch Successful.");
    } else {
      console.warn("API Rate Limited or Error. Falling back to GitHub dataset...");
    }
  } catch (e) {
    console.warn("API Fetch Failed. Falling back to GitHub dataset...");
  }

  if (data.length === 0) {
    console.log("Fetching from mledoze/countries (GitHub)...");
    const res = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
    const raw = await res.json();
    // Map the GitHub dataset to our expected format
    data = raw.map(c => ({
      name: { common: c.name.common },
      cca2: c.cca2,
      cca3: c.cca3,
      idd: c.idd,
      capital: c.capital,
      population: c.population || 0,
      area: c.area,
      currencies: c.currencies,
      languages: c.languages,
      timezones: c.timezones,
      latlng: c.latlng,
      region: c.region
    }));
  }

  const profiles = {};
  for (const country of data) {
    if (!country.cca2) continue;
    const code = country.cca2.toLowerCase();
    
    let dialCode = "";
    if (country.idd && country.idd.root) {
      const suffix = (country.idd.suffixes && country.idd.suffixes.length > 0) ? country.idd.suffixes[0] : "";
      dialCode = country.idd.root + suffix;
    }
    
    const capital = (country.capital && country.capital.length > 0) ? country.capital[0] : "N/A";
    
    let currency = "N/A";
    if (country.currencies) {
      const currKey = Object.keys(country.currencies)[0];
      if (currKey) currency = `${country.currencies[currKey].name} (${currKey})`;
    }
    
    let languages = "N/A";
    if (country.languages) {
      languages = Array.isArray(country.languages) ? country.languages.join(', ') : Object.values(country.languages).join(', ');
    }
    
    const timezone = (country.timezones && country.timezones.length > 0) ? country.timezones[0] : "UTC";
    const lat = (country.latlng && country.latlng.length === 2) ? Math.round(country.latlng[0] * 100) / 100 : 0;
    const lng = (country.latlng && country.latlng.length === 2) ? Math.round(country.latlng[1] * 100) / 100 : 0;
    const region = country.region || "Other";
    
    profiles[code] = {
      name: country.name.common,
      iso2: country.cca2,
      iso3: country.cca3,
      dialCode,
      capital,
      population: country.population ? country.population.toLocaleString('en-US') : "N/A",
      area: country.area ? country.area.toLocaleString('en-US') + " KM²" : "N/A",
      currency,
      languages,
      timezone,
      cityForTime: capital.toLowerCase().replace(/ /g, '-').replace(/'/g, ''),
      lat,
      lng,
      region
    };
  }
  
  const jsContent = `// Data generated automatically via Node fetch\n\nexport const COUNTRY_PROFILES = ${JSON.stringify(profiles, null, 2)};\n\nexport const getAllCountries = () => Object.values(COUNTRY_PROFILES);\nexport const getCountryProfile = (code) => COUNTRY_PROFILES[code.toLowerCase()];\n`;
  fs.writeFileSync('src/data/countryProfiles.js', jsContent);
  console.log(`Successfully generated data for ${Object.keys(profiles).length} countries.`);
}

generate();