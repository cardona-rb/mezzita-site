// Captura de la demo para la tarjeta de /casos/ (assets/work/demo.jpg, 1440x900).
// Uso: cd tools && node shot-demo.js [https://mezzita.com]
const { chromium } = require("playwright");
const path = require("path");
const BASE = process.argv[2] || "https://mezzita.com";

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE + "/demo/?rubro=pizzeria", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: "html{scroll-behavior:auto!important}*{transition:none!important;animation-play-state:paused!important}.wa-float,.fab,[class*=float]{display:none!important}" });
  await p.evaluate(() => document.fonts.ready);
  const y = await p.evaluate(() => document.querySelectorAll("main > section")[2].getBoundingClientRect().top + scrollY - 60);
  await p.evaluate((y) => scrollTo(0, y), y);
  await p.waitForTimeout(2500);
  await p.screenshot({ path: path.resolve(__dirname, "../assets/work/demo.jpg"), type: "jpeg", quality: 85 });
  await b.close();
  console.log("ok");
})();
