import { chromium } from 'playwright-core';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.RIGWEDA_VERIFY_URL ?? 'http://localhost:4174';

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

// Pages come from the generated sitemap, so the check always covers every indexable page.
const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
const minCardsByPath = { '/': 6, '/products': 6, '/services': 12 };
const pages = [...sitemap.matchAll(/<loc>https:\/\/www\.rigweda\.com([^<]*)<\/loc>/g)].map(([, path]) => ({
  path: path || '/',
  minCards: minCardsByPath[path || '/'] ?? 0
}));
if (!pages.length) throw new Error('sitemap.xml lists no pages');

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
];

for (const viewport of viewports) {
  for (const pageInfo of pages) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });

    await page.goto(`${baseUrl}${pageInfo.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);

    const result = await page.evaluate(() => {
      const canvas = document.querySelector('#rigweda-field');
      const headings = document.querySelectorAll('h1').length;
      const heading = document.querySelector('h1')?.textContent?.trim() ?? '';
      const cards = document.querySelectorAll('.spotlight, .product-detail, .showcase-service-card, .service-card, .rich-card, .mini-card, .project-card, .application-card, .gallery-card, .rich-list li, .content-block').length;
      const bounds = canvas?.getBoundingClientRect();
      const context = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
      const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 2;

      return {
        heading,
        headings,
        cards,
        canvasWidth: bounds?.width ?? 0,
        canvasHeight: bounds?.height ?? 0,
        hasWebGL: Boolean(context),
        horizontalOverflow
      };
    });

    const safeName = pageInfo.path === '/' ? 'home' : pageInfo.path.replace(/[^a-z0-9]/gi, '-');
    const png = await page.screenshot({
      path: `/tmp/rigweda-${viewport.name}-${safeName}.png`,
      fullPage: false
    });

    if (result.headings !== 1 || !result.heading) {
      throw new Error(`${viewport.name} ${pageInfo.path}: expected exactly one non-empty <h1>, found ${result.headings}`);
    }
    if (result.cards < pageInfo.minCards) {
      throw new Error(`${viewport.name} ${pageInfo.path}: expected at least ${pageInfo.minCards} cards, found ${result.cards}`);
    }
    if (!result.hasWebGL || result.canvasWidth < viewport.width * 0.9 || result.canvasHeight < viewport.height * 0.9) {
      throw new Error(`${viewport.name} ${pageInfo.path}: WebGL canvas did not initialize full viewport`);
    }
    if (result.horizontalOverflow) {
      throw new Error(`${viewport.name} ${pageInfo.path}: page has horizontal overflow`);
    }
    if (new Set(png).size < 80) {
      throw new Error(`${viewport.name} ${pageInfo.path}: screenshot appears blank`);
    }

    await page.close();
    console.log(`${viewport.name} ${pageInfo.path}: ok`);
  }
}

const spaPage = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
await spaPage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await spaPage.evaluate(() => {
  window.__rigwedaSpaMarker = 'router-navigation';
});
await spaPage.click('a[href="/aboutus"]');
await spaPage.waitForSelector('h1');
const spaNavigationKeptState = await spaPage.evaluate(() => window.__rigwedaSpaMarker === 'router-navigation');
if (!spaNavigationKeptState) {
  throw new Error('SPA navigation check failed: internal navigation reloaded the document');
}
await spaPage.close();
console.log('spa navigation: ok');

await browser.close();
