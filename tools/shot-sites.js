// Capturas para el abanico de /experiencia/. Uso: cd tools && node shot-sites.js
const { chromium } = require("playwright");
const path = require("path");
const OUT = (f) => path.resolve(__dirname, "../assets/work", f);
const shots = [
  ["https://www.ujet.com", "ujet-hero.jpg", 1440, 900],
  ["https://oknola.com", "oknola-hero.jpg", 1440, 900],
  ["https://str8fire.io", "str8fire-hero.jpg", 1440, 900],
  ["https://goldsphere.mx/alta-joyeria/", "goldsphere-alta-m.jpg", 390, 844],
];
(async () => {
  const b = await chromium.launch();
  for (const [url, file, w, h] of shots) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: w < 500, hasTouch: w < 500, locale: "es-ES" });
    const p = await ctx.newPage();
    try { await p.goto(url, { waitUntil: "networkidle", timeout: 45000 }); } catch (e) { console.log("timeout", url); }
    await p.waitForTimeout(4000);
    await p.screenshot({ path: OUT(file), type: "jpeg", quality: 82 });
    console.log("ok", file);
    await ctx.close();
  }
  await b.close();
})();
