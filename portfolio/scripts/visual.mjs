import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5174/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);

const out = await page.evaluate(() => {
  const g = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily.slice(0, 40), size: cs.fontSize };
  };
  const footer = document.querySelector("footer");
  const heroTitle = document.querySelector(".hero__word");
  return {
    body: g("body"),
    nav: g(".nav-wordmark"),
    heroTitle: g(".hero__word"),
    projectRow: g(".project-row"),
    projectVisual: g(".project-visual"),
    footer: g("footer"),
    footerCta: g(".footer-cta"),
    menuBtn: g(".menu-btn"),
    marquee: g(".marquee"),
    heroH: document.querySelector(".hero")?.getBoundingClientRect().height,
    heroWordH: heroTitle ? heroTitle.getBoundingClientRect().height : 0,
    firstProjectY: document.querySelector(".project-row")?.getBoundingClientRect().top,
    footerBg: footer ? getComputedStyle(footer).backgroundColor : null,
  };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
