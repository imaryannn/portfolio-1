import { chromium } from "playwright";
const url = process.env.URL || "http://localhost:5179";
const browser = await chromium.launch();
const vps = [
  {name:"iPhone-390", w:390, h:844}, {name:"SE-375x667", w:375, h:667},
  {name:"landscape-844x390", w:844, h:390}, {name:"fold-344x882", w:344, h:882},
  {name:"sm-320x700", w:320, h:700},
];
for (const vp of vps) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector(".hero__word--lead", { timeout: 10000 });
  await page.waitForTimeout(2000);
  const info = await page.evaluate(() => {
    const r = (sel) => { const el = document.querySelector(sel); if (!el) return null; const b = el.getBoundingClientRect(); return { y: Math.round(b.y), h: Math.round(b.height), right: Math.round(b.right), bottom: Math.round(b.bottom) }; };
    const lottie = r(".hero-lottie"); const tag = r(".hero__tag"); const foot = r(".hero__foot");
    const lottieVisible = lottie ? (lottie.y < window.innerHeight && lottie.bottom > 0 && getComputedStyle(document.querySelector(".hero-lottie")).display !== "none") : false;
    return { scrollW: document.body.scrollWidth - window.innerWidth,
      word: r(".hero__word--lead"), tag, lottie, foot,
      tagInView: tag && tag.y >= 0 && tag.bottom <= window.innerHeight,
      overlapFoot: tag && foot ? tag.bottom > foot.y : false,
      lottieVisible };
  });
  console.log(vp.name, JSON.stringify(info));
  await page.close();
}
await browser.close();
