import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5174/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);

const results = [];

// 1. Hero content
results.push(["hero title", await page.locator(".hero__word").first().textContent()]);
results.push(["hero line3", await page.locator(".hero__word--line3").textContent()]);
results.push(["nav wordmark", await page.locator(".nav-wordmark").textContent()]);

// 2. Project rows count
const rows = await page.locator(".project-row").count();
results.push(["project rows", rows]);

// 3. First project title + link
results.push(["first project title", await page.locator(".project-title").first().textContent()]);
const firstLink = await page.locator(".project-link").first().getAttribute("href");
results.push(["first project link", firstLink]);

// 4. Capability rows
results.push(["capability rows", await page.locator(".capability-row").count()]);

// 5. About meta
results.push(["about meta blocks", await page.locator(".meta-block").count()]);

// 6. Footer CTA
results.push(["footer cta", await page.locator(".footer-cta").first().textContent()]);
results.push(["footer github", await page.locator(".footer-link").first().getAttribute("href")]);

// 7. Menu open/close
await page.click(".menu-btn");
await page.waitForTimeout(600);
const menuVisible = await page.locator(".menu-overlay").isVisible();
results.push(["menu overlay visible", menuVisible]);
const menuLinks = await page.locator(".menu-link").count();
results.push(["menu links", menuLinks]);
await page.click(".menu-btn");
await page.waitForTimeout(600);
results.push(["menu closed", (await page.locator(".menu-overlay").count()) === 0]);

// 8. Scroll to projects via menu-like anchor works (scrollY changes)
await page.locator("#projects").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
const y = await page.evaluate(() => window.scrollY);
results.push(["scroll to projects y>0", y > 500]);

// 9. cursor hidden on coarse pointer
const coarse = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
await coarse.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await coarse.waitForTimeout(1200);
results.push(["mobile cursor dot hidden", (await coarse.locator(".cursor-dot").count()) === 0]);
const mobileOverflow = await coarse.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
results.push(["mobile overflow px", mobileOverflow]);

// 10. reduced motion path
const rm = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
rm.on("pageerror", (e) => results.push(["reduced-motion pageerror", e.message]));
await rm.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await rm.waitForTimeout(800);
results.push(["reduced-motion loads", (await rm.locator(".hero__word").count()) === 3]);
await rm.close();

for (const [k, v] of results) console.log(`${k}: ${JSON.stringify(v)}`);
await browser.close();
process.exit(results.some(([, v]) => typeof v === "string" && v.includes("undefined")) ? 1 : 0);
