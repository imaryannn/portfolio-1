import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5174/";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small", width: 360, height: 740 },
];

const browser = await chromium.launch();
let failures = 0;

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));

  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);

  const report = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflowX = doc.scrollWidth - doc.clientWidth;
    const sections = [...document.querySelectorAll("section, footer")].map((s) => ({
      id: s.id || s.tagName,
      w: Math.round(s.getBoundingClientRect().width),
      h: Math.round(s.getBoundingClientRect().height),
    }));
    const title = document.title;
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    const fonts = getComputedStyle(document.body).fontFamily;
    return { overflowX, sections, title, bodyBg, fonts };
  });

  const issues = [];
  if (report.overflowX > 1) issues.push(`H-OVERFLOW ${report.overflowX}px`);
  if (errors.length) issues.push(`console: ${errors.slice(0, 3).join(" | ")}`);
  for (const s of report.sections) {
    if (s.h === 0) issues.push(`empty section ${s.id}`);
  }
  if (report.sections.length < 7) issues.push(`only ${report.sections.length} sections`);

  if (issues.length) {
    failures++;
    console.log(`\n[${vp.name}] ✗ ${issues.join("\n  ")}`);
  } else {
    console.log(`[${vp.name}] ✓ sections=${report.sections.length} overflow=0 bodyBg=${report.bodyBg}`);
  }

  await page.screenshot({ path: `/tmp/portfolio-${vp.name}.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log(failures ? `\nFAILURES: ${failures}` : "\nALL CHECKS PASSED");
process.exit(failures ? 1 : 0);
