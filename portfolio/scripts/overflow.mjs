import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5174/";
const browser = await chromium.launch();

const width = 360;
const page = await browser.newPage({ viewport: { width, height: 740 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);

// Find any element wider than viewport (potential horizontal overflow / clipped text)
const overflowEls = await page.evaluate((w) => {
  const bad = [];
  document.querySelectorAll("h1,h2,h3,p,a,span,svg,div,section").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > w + 1) {
      const text = (el.textContent || "").trim().slice(0, 40);
      if (!el.closest(".marquee") && !el.closest(".menu-overlay")) {
        bad.push({ tag: el.tagName, cls: el.className?.toString().slice(0, 40), right: Math.round(r.right), w: Math.round(r.width), text });
      }
    }
  });
  return bad.slice(0, 15);
}, width);

console.log("overflow elements:", overflowEls.length ? JSON.stringify(overflowEls, null, 1) : "NONE");

// Hero foot stacking check
const foot = await page.evaluate(() => {
  const words = [...document.querySelectorAll(".hero__word")].map((w) => Math.round(w.getBoundingClientRect().width));
  const foot = document.querySelector(".hero__foot");
  const footR = foot.getBoundingClientRect();
  const heroR = document.querySelector(".hero").getBoundingClientRect();
  return { words, footBottom: Math.round(footR.bottom), heroBottom: Math.round(heroR.bottom) };
});
console.log("hero:", JSON.stringify(foot));

// Menu overlay on mobile
await page.click(".menu-btn");
await page.waitForTimeout(500);
const menu = await page.evaluate(() => {
  const links = [...document.querySelectorAll(".menu-link")].map((l) => l.getBoundingClientRect());
  return { first: Math.round(links[0].top), last: Math.round(links[links.length - 1].bottom), viewport: window.innerHeight, visible: !!document.querySelector(".menu-overlay") };
});
console.log("menu:", JSON.stringify(menu));
await page.close();
await browser.close();
