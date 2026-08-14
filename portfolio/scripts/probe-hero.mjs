import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5174/";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "tabletSm", width: 768, height: 1024 },
  { name: "mobile", width: 430, height: 932 },
  { name: "mobileSm", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);

  const probe = await page.evaluate(() => {
    const r = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height) };
    };
    const glyph = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const range = document.createRange();
      range.selectNodeContents(el);
      const b = range.getBoundingClientRect();
      return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height) };
    };
    const union = (sels) => {
      const rects = [];
      for (const sel of sels) {
        for (const el of document.querySelectorAll(sel)) {
          const b = el.getBoundingClientRect();
          rects.push({ l: b.left, t: b.top, r: b.right, b: b.bottom });
        }
      }
      if (!rects.length) return null;
      const l = Math.min(...rects.map((x) => x.l));
      const t = Math.min(...rects.map((x) => x.t));
      const rr = Math.max(...rects.map((x) => x.r));
      const bb = Math.max(...rects.map((x) => x.b));
      return { x: Math.round(l), y: Math.round(t), w: Math.round(rr - l), h: Math.round(bb - t) };
    };
    const overlap = (a, b) =>
      a && b && a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    const obj = r(".hero-lottie svg");
    const lead = glyph(".hero__word--lead");
    const imake = glyph("h1 > span:nth-child(2)");
    const stuff = glyph(".hero-word-spring");
    const tag = r(".hero__tag");
    const foot = r(".hero__foot");
    const hero = r(".hero");

    return {
      objectVisual: obj,
      overlaps: {
        lead: overlap(obj, lead),
        imake: overlap(obj, imake),
        stuff: overlap(obj, stuff),
        tag: overlap(obj, tag),
        foot: overlap(obj, foot),
      },
      inHero: obj && hero && obj.x >= hero.x && obj.x + obj.w <= hero.x + hero.w + 2,
      lottieLoaded: obj && obj.w > 0,
      fills: [...new Set([...document.querySelectorAll(".hero-lottie svg [fill]")].map((e) => e.getAttribute("fill")))].slice(0, 8),
      imakeGlyphs: imake,
      leadGlyphs: lead,
      hero: hero,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  console.log(`\n[${vp.name}]`);
  console.log(`  objectVisual ${JSON.stringify(probe.objectVisual)}`);
  console.log(`  leadGlyphs ${JSON.stringify(probe.leadGlyphs)}`);
  console.log(`  imakeGlyphs ${JSON.stringify(probe.imakeGlyphs)}`);
  console.log(`  overlaps ${JSON.stringify(probe.overlaps)}  inHero=${probe.inHero}  lottieLoaded=${probe.lottieLoaded}`);
  console.log(`  fills ${JSON.stringify(probe.fills)}`);
  console.log(`  hero ${JSON.stringify(probe.hero)}  overflowX=${probe.overflowX}`);

  await page.close();
}

await browser.close();
