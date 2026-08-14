import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5181/";

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(200);

  const words = new Set();
  for (let i = 0; i < 30; i++) {
    const snap = await page.evaluate(() => {
      const ws = [...document.querySelectorAll(".preloader__word")].map((e) => e.textContent.trim());
      const rects = ws.map((t) => {
        const el = [...document.querySelectorAll(".preloader__word")].find((e) => e.textContent.trim() === t);
        const r = el.getBoundingClientRect();
        return Math.round(r.top);
      });
      return { words: ws.map((w, i) => `${w}@${rects[i]}`), inner: (() => { const el = document.querySelector(".preloader__inner"); return el ? el.getBoundingClientRect().height.toFixed(0) : null; })() };
    });
    snap.words.forEach((w) => words.add(w));
    console.log(i, JSON.stringify(snap));
    await page.waitForTimeout(90);
  }
  console.log("distinct:", [...words].join(" | "));
} finally {
  await browser.close();
}
