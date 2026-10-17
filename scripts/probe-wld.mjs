const checks = [
  ["pop",   "https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json&per_page=5&date=1960:2024"],
  ["co2",   "https://api.worldbank.org/v2/country/WLD/indicator/EN.GHG.CO2.MT.CE.AR5?format=json&per_page=5&date=1960:2024"],
  ["birth", "https://api.worldbank.org/v2/country/WLD/indicator/SP.DYN.CBRT.IN?format=json&per_page=5&date=1960:2024"],
];
for (const [name, url] of checks) {
  const r = await fetch(url); const j = await r.json();
  console.log(name + ": total=" + (j[0] && j[0].total) + " sample=" + (j[1] && j[1][0] ? j[1][0].date + "=" + j[1][0].value : "MISSING"));
}
