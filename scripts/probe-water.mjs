const url = "https://api.worldbank.org/v2/country/all/indicator/ER.H2O.FWTL.K3?format=json&per_page=5&date=2022:2024";
const r = await fetch(url);
const j = await r.json();
console.log("meta:", JSON.stringify(j[0]));
console.log("rows:", Array.isArray(j[1]) ? j[1].length : typeof j[1]);
if (Array.isArray(j[1]) && j[1].length) console.log("sample:", JSON.stringify(j[1][0], null, 2));
