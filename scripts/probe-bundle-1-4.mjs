const checks = [
  { name: "GDP country (US)",     url: "https://api.worldbank.org/v2/country/US/indicator/NY.GDP.MKTP.CD?format=json&per_page=3&date=2020:2024" },
  { name: "GDP WLD",              url: "https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.CD?format=json&per_page=3&date=2020:2024" },
  { name: "Death rate WLD",       url: "https://api.worldbank.org/v2/country/WLD/indicator/SP.DYN.CDRT.IN?format=json&per_page=3&date=2020:2024" },
  { name: "Life exp country (US)",url: "https://api.worldbank.org/v2/country/US/indicator/SP.DYN.LE00.IN?format=json&per_page=3&date=2020:2024" },
  { name: "Life exp WLD",         url: "https://api.worldbank.org/v2/country/WLD/indicator/SP.DYN.LE00.IN?format=json&per_page=3&date=2020:2024" },
  { name: "Forest area WLD",      url: "https://api.worldbank.org/v2/country/WLD/indicator/AG.LND.FRST.K2?format=json&per_page=3&date=2020:2024" },
  { name: "Renewable energy WLD", url: "https://api.worldbank.org/v2/country/WLD/indicator/EG.FEC.RNEW.ZS?format=json&per_page=3&date=2020:2024" },
];
let failed = 0;
for (const c of checks) {
  try {
    const r = await fetch(c.url);
    const j = await r.json();
    if (!Array.isArray(j) || j.length < 2) throw new Error("no rows");
    const row = (j[1] || []).find(x => x.value != null);
    if (!row) throw new Error("all null");
    console.log("OK   " + c.name + " = " + row.value + " (" + row.date + ")");
  } catch (e) {
    console.log("FAIL " + c.name + " - " + e.message);
    failed++;
  }
}
if (failed > 0) { console.log("\n" + failed + " FAILED - aborting before generation"); process.exit(1); }
console.log("\nAll 7 probes OK - proceeding to generation");
