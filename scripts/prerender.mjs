// Pre-renders every page to static HTML after `vite build`, so search engines and social
// networks get each page's own title, description, canonical URL, structured data, and content
// without running JavaScript. Also writes dist/sitemap.xml and dist/404.html.
//
// Run through `npm run build`. Fails the build when a listed page is broken or duplicated.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const serverDir = path.resolve('dist-ssr');
const { render, sitePages, unlistedPages, products, services, SITE_URL } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);
const orgId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

const escapeAttr = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripTags = (value) => value.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const pageName = (title) => title.split(' | ')[0];

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`index.html is missing a tag matching ${pattern}`);
  return html.replace(pattern, replacement);
}

function faqsFrom(html) {
  const faqs = [];
  for (const match of html.matchAll(/<details[^>]*><summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
    const question = stripTags(match[1].replace(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, ''));
    const answer = stripTags(match[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function softwareApplication(product) {
  return {
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: product.platforms.join(', '),
    image: `${SITE_URL}${product.image}`,
    url: `${SITE_URL}/products/${product.slug}`,
    featureList: product.features,
    publisher: { '@id': orgId }
  };
}

function schemaFor(url, head, html) {
  const graph = [];
  const pageType = url === '/aboutus' ? 'AboutPage' : url === '/contactus' ? 'ContactPage' : url === '/products' ? 'CollectionPage' : 'WebPage';
  graph.push({
    '@type': pageType,
    '@id': `${head.canonical}#webpage`,
    url: head.canonical,
    name: head.title,
    description: head.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId }
  });

  if (head.noindex) return { '@context': 'https://schema.org', '@graph': graph };

  if (url !== '/') {
    const service = services.find((item) => `/${item.slug}` === url);
    const product = products.find((item) => `/products/${item.slug}` === url);
    const trail = [{ name: 'Home', url: `${SITE_URL}/` }];
    if (service) trail.push({ name: 'Services', url: `${SITE_URL}/services` });
    if (product) trail.push({ name: 'Products', url: `${SITE_URL}/products` });
    trail.push({ name: service ? service.title : product ? product.name : pageName(head.title), url: head.canonical });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url }))
    });
    if (product) graph.push({ ...softwareApplication(product), '@id': `${head.canonical}#software` });
    if (service) {
      graph.push({
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        description: head.description,
        url: head.canonical,
        provider: { '@id': orgId },
        areaServed: ['IN', 'Worldwide']
      });
    }
  }

  if (url === '/' || url === '/products') {
    graph.push({
      '@type': 'ItemList',
      name: 'Rigweda Technologies products',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: softwareApplication(product)
      }))
    });
  }

  const faqs = faqsFrom(html);
  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function verificationTags() {
  const tags = [];
  if (process.env.VITE_GOOGLE_SITE_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${escapeAttr(process.env.VITE_GOOGLE_SITE_VERIFICATION)}" />`);
  if (process.env.VITE_BING_SITE_VERIFICATION) tags.push(`<meta name="msvalidate.01" content="${escapeAttr(process.env.VITE_BING_SITE_VERIFICATION)}" />`);
  return tags.join('\n    ');
}

function buildPage(url) {
  const { html, head } = render(url);
  if (!head) throw new Error(`${url}: the page did not render a HeadMeta`);
  const robots = head.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  const schema = JSON.stringify(schemaFor(url, head, html)).replace(/</g, '\\u003c');

  let page = template;
  page = replaceTag(page, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(head.title)}</title>`);
  page = replaceTag(page, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(head.description)}" />`);
  page = replaceTag(page, /<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${escapeAttr(head.keywords)}" />`);
  page = replaceTag(page, /<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${robots}" />`);
  page = replaceTag(page, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttr(head.canonical)}" />`);
  page = replaceTag(page, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(head.title)}" />`);
  page = replaceTag(page, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(head.description)}" />`);
  page = replaceTag(page, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${escapeAttr(head.canonical)}" />`);
  page = replaceTag(page, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttr(head.title)}" />`);
  page = replaceTag(page, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttr(head.description)}" />`);
  const extraHead = [verificationTags(), `<script type="application/ld+json">${schema}</script>`].filter(Boolean).join('\n    ');
  page = page.replace('</head>', `    ${extraHead}\n  </head>`);
  page = replaceTag(page, /<div id="root"><\/div>/, `<div id="root">${html}</div>`);
  return { page, head, html };
}

const outputFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`);
await fs.mkdir(path.join(dist, 'products'), { recursive: true });
const seenTitles = new Map();
const seenDescriptions = new Map();
const problems = [];

for (const { path: url } of sitePages) {
  const { page, head, html } = buildPage(url);
  if (head.noindex) problems.push(`${url} is listed in the sitemap but renders a noindex page (missing route?)`);
  if (head.canonical !== `${SITE_URL}${url}`) problems.push(`${url} has canonical ${head.canonical}`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${url} has ${(html.match(/<h1[\s>]/g) || []).length} <h1> headings`);
  if (head.title.length > 65) problems.push(`${url} title is ${head.title.length} characters (keep it under 65)`);
  if (seenTitles.has(head.title)) problems.push(`${url} has the same title as ${seenTitles.get(head.title)}`);
  if (seenDescriptions.has(head.description)) problems.push(`${url} has the same description as ${seenDescriptions.get(head.description)}`);
  seenTitles.set(head.title, url);
  seenDescriptions.set(head.description, url);
  await fs.writeFile(path.join(dist, outputFor(url)), page);
}

for (const url of unlistedPages) {
  const { page } = buildPage(url);
  await fs.writeFile(path.join(dist, outputFor(url)), page);
}

if (problems.length) {
  console.error(`Pre-render checks failed:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitePages.map((page) => `  <url><loc>${SITE_URL}${page.path}</loc><lastmod>${today}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await fs.rm(serverDir, { recursive: true, force: true });

console.log(`Pre-rendered ${sitePages.length} pages + ${unlistedPages.length} unlisted, wrote sitemap.xml`);
