// Recorre el sitemap a 1440 y 390 px: estado HTTP, errores de consola, desborde horizontal, imágenes rotas.
// Uso: python3 -m http.server 8765 --directory dist  &&  cd tools && node check.js [http://localhost:8765]
const { chromium } = require("playwright");
const BASE = process.argv[2] || "http://localhost:8765";

(async () => {
  const xml = await (await fetch(BASE + "/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => BASE + new URL(m[1]).pathname);
  const b = await chromium.launch();
  const problems = [];
  for (const width of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width, height: 900 } });
    for (const url of urls) {
      const p = await ctx.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push(e.message));
      p.on("console", (m) => m.type() === "error" && !/fonts\.g|favicon/.test(m.text()) && errs.push(m.text()));
      const r = await p.goto(url, { waitUntil: "load" });
      await p.waitForTimeout(150);
      const res = await p.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.src),
        brand: /outperform/i.test(document.documentElement.outerHTML),
      }));
      const bad = [];
      if (!r || r.status() !== 200) bad.push("status " + (r && r.status()));
      if (errs.length) bad.push("console: " + errs.join(" | "));
      if (res.overflow > 1) bad.push("overflow " + res.overflow + "px");
      if (res.broken.length) bad.push("broken img " + res.broken.join(", "));
      if (res.brand) bad.push("menciona Outperform");
      if (bad.length) problems.push(`${width} ${url}: ${bad.join("; ")}`);
      await p.close();
    }
    await ctx.close();
  }
  await b.close();
  console.log(`${urls.length} URLs x 2 viewports, ${problems.length} problemas`);
  problems.forEach((x) => console.log(" - " + x));
  process.exit(problems.length ? 1 : 0);
})();
