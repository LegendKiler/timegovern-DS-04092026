const check = async (f, name, minLen) => {
  try {
    const m = await import("./src/data/" + f);
    for (const k of Object.keys(m)) {
      const v = m[k];
      if (Array.isArray(v) && v.length >= minLen) { console.log("OK   " + f + " (" + k + ") = " + v.length); return; }
    }
    console.log("FAIL " + f + " (no array >= " + minLen + ")");
    process.exitCode = 1;
  } catch (e) { console.log("FAIL " + f + " - " + e.message); process.exitCode = 1; }
};
await check("countryGdp.js", "GDP", 200);
await check("countryLifeExpectancy.js", "LE", 200);
await check("worldGdpByYear.js", "GDPy", 30);
await check("worldDeathsByYear.js", "Deathy", 30);
await check("worldLifeExpectancyByYear.js", "LEy", 30);
await check("worldForestByYear.js", "Foresty", 30);
await check("worldRenewableByYear.js", "Reny", 30);
