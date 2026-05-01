import { chromium } from 'playwright-core';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.RIGWEDA_VERIFY_URL ?? 'http://localhost:4174';

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

const pages = [
  { path: '/', title: 'Yourdigitalsystems,elevatedin3D.', minCards: 12 },
  { path: '/aboutus', title: 'Atechnologypartnerbuiltforbelief.', minCards: 0 },
  { path: '/services', title: 'Everythingaseriousdigitalbusinessneeds.', minCards: 20 },
  { path: '/applications', title: 'Usefulapplications,notjustcode.', minCards: 4 },
  { path: '/portfolio', title: 'Realprojectreferences,redesignedforRigweda.', minCards: 8 },
  { path: '/gallery', title: 'Avisualgalleryofdigitalcapability.', minCards: 12 },
  { path: '/careers', title: 'Builddigitalproductswithcraft.', minCards: 6 },
  { path: '/contactus', title: 'Let’sshapeyournextdigitalmove.', minCards: 0 },
  { path: '/ui-ux-solutions', title: 'UI/UXSolutions', minCards: 1 },
  { path: '/wordpress-development', title: 'WordPressDevelopment', minCards: 1 },
  { path: '/ecommerce-development', title: 'EcommerceDevelopment', minCards: 1 },
  { path: '/digital-marketing', title: 'DigitalMarketing', minCards: 1 },
  { path: '/seo-services', title: 'SEOServices', minCards: 1 },
  { path: '/ppc-services', title: 'PPCServices', minCards: 1 },
  { path: '/smm-services', title: 'SMMServices', minCards: 1 },
  { path: '/software-development', title: 'SoftwareDevelopment', minCards: 1 },
  { path: '/mobile-development', title: 'MobileAppDevelopment', minCards: 1 },
  { path: '/hosting-services', title: 'HostingServices', minCards: 1 },
  { path: '/security-services', title: 'Security(VAPT)', minCards: 1 }
];

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
      const heading = document.querySelector('h1')?.textContent?.trim().replace(/\s+/g, '');
      const cards = document.querySelectorAll('.service-card, .rich-card, .mini-card, .project-card, .application-card, .gallery-card, .rich-list li, .content-block').length;
      const bounds = canvas?.getBoundingClientRect();
      const context = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
      const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 2;
      const robot = document.querySelector('.robo-companion');
      const robotStage = document.querySelector('.robo-stage');
      const robotAnimation = robotStage ? getComputedStyle(robotStage).animationName : '';

      return {
        heading,
        cards,
        canvasWidth: bounds?.width ?? 0,
        canvasHeight: bounds?.height ?? 0,
        hasWebGL: Boolean(context),
        horizontalOverflow,
        hasRobot: Boolean(robot),
        robotAnimation
      };
    });

    const safeName = pageInfo.path === '/' ? 'home' : pageInfo.path.replace(/[^a-z0-9]/gi, '-');
    const png = await page.screenshot({
      path: `/tmp/rigweda-${viewport.name}-${safeName}.png`,
      fullPage: false
    });

    if (result.heading !== pageInfo.title.replace(/\s+/g, '')) {
      throw new Error(`${viewport.name} ${pageInfo.path}: heading mismatch`);
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
    if (!result.hasRobot || !result.robotAnimation.includes('robotBob')) {
      throw new Error(`${viewport.name} ${pageInfo.path}: animated robot companion was not active`);
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
