# Rigweda SEO and digital marketing plan

The website code is now search-ready (see "What the site already does" at the end). Rankings and leads now depend on the work below, most of which happens outside the code. Do the launch checklist first, then the 90-day plan.

## 1. Launch checklist (one-time, about half a day)

Do these in order. Each one blocks the next.

| # | Task | Where | Notes |
|---|---|---|---|
| 1 | Deploy the latest code | Vercel | Before this, every inner page on www.rigweda.com returns 404. |
| 2 | Make the apex redirect permanent | Vercel → Project → Settings → Domains → `rigweda.com` → Edit | Change "Redirect to www.rigweda.com" from **307** to **308 (Permanent)**. |
| 3 | Set the GA4 ID in Vercel | Vercel → Project → Settings → Environment Variables | Add `VITE_GA_MEASUREMENT_ID=G-QQSSQQFD9R` for Production, then redeploy. GA4 is loaded by the Google tag in GTM container GTM-T5VTVFKN; this ID lets the site send its custom events to it. Keep GA4 Enhanced Measurement on, including "Page changes based on browser history events": it sends all page views. Don't add page-view tags in GTM. |
| 4 | Mark the lead event as a key event | GA4 → Admin → Events | Mark `generate_lead` as a key event (sent only after the contact form is confirmed as sent). `whatsapp_click`, `phone_click`, and `email_click` are also sent; mark them as key events only if you want to count contact clicks as conversions too. |
| 5 | Verify Google Search Console | search.google.com/search-console | Add a **Domain** property for `rigweda.com` (DNS TXT record), or use the HTML tag method with `VITE_GOOGLE_SITE_VERIFICATION`. |
| 6 | Submit the sitemap | Search Console → Sitemaps | `https://www.rigweda.com/sitemap.xml`, 30 URLs. |
| 7 | Request indexing for key pages | Search Console → URL inspection | Home, /products, and the 8 /products/... pages. |
| 8 | Verify Bing Webmaster Tools | bing.com/webmasters | Use "Import from Google Search Console". This also covers ChatGPT search and Copilot, which use Bing. |
| 9 | Check rich results | search.google.com/test/rich-results | Test /products/rigweda-monitor and /seo-services. Expect SoftwareApplication, Breadcrumb, FAQ, and Organization. |
| 10 | Link GA4 to Search Console | GA4 → Admin → Product links | Brings search queries into GA4 reports. |

## 2. Google Business Profile (biggest local win)

Search "software company in Hyderabad" and the map pack appears above every website result. That pack comes from Google Business Profile, not from the website.

- Create or claim the profile at business.google.com. Category: **Software company**. Add secondary categories: *Website designer*, *Internet marketing service*.
- Use exactly the same name, address, and phone as the website footer (NAP): *Rigweda Technologies, Flat No 202, Sivaram Life Style, Pragati Nagar Main Road, Pragati Nagar, Hyderabad, Telangana 500090, +91 7989076809*. Copy it character for character everywhere below.
- Add the six products under **Products**, each with its screenshot and a link to its /products/... page.
- Upload 15+ real photos: office, team, product screens.
- Post weekly: product updates, demos, hiring. Posts keep the profile active.
- Ask every happy client for a review (see section 5).

## 3. Citations and directory listings (weeks 1–4)

Consistent listings build trust with Google and send referral traffic. Use the same NAP, logo, description, and website URL every time. Keep a spreadsheet of each listing's URL and login.

**Indian business directories:** Justdial, Sulekha, IndiaMART, TradeIndia, Yellow Pages India, Asklaila.

**Agency and service directories** (for the services pages): Clutch, GoodFirms, DesignRush, TopDevelopers.co, The Manifest, Sortlist.

**Software directories** (one listing per product, linking to its /products/... page): G2, Capterra, GetApp and Software Advice (one Gartner Digital Markets account covers all three), SaaSworthy, Techjockey (strong in India), SoftwareSuggest (India), AlternativeTo, SourceForge, Product Hunt (plan a launch day for each product).

**Company profiles:** Crunchbase, LinkedIn company page (done), Startup India / DPIIT recognition if eligible, Wellfound (AngelList) for hiring.

### Listing kit (copy exactly into every listing)

Google compares listings character by character, so paste these rather than retyping them.

| Field | Value |
|---|---|
| Business name | Rigweda Technologies |
| Address | Flat No 202, Sivaram Life Style, Pragati Nagar Main Road, Pragati Nagar, Hyderabad, Telangana 500090, India |
| Phone | +91 79890 76809 |
| Email | info@rigweda.com |
| Website | https://www.rigweda.com/ (always with `www` and `https`) |
| Logo | https://www.rigweda.com/assets/rigweda-logo.png |
| Cover / social image | https://www.rigweda.com/assets/rigweda-social.png |
| Main category | Software company |
| Other categories | Website designer, Internet marketing service, Software developer |
| Service area | India and worldwide (remote) |
| Social profiles | instagram.com/rigweda_technologies · linkedin.com/company/132213943 · facebook.com/profile.php?id=61590733351789 |

Use the same phone format (`+91 79890 76809`) everywhere. Before submitting, confirm your opening hours and the year the company was founded; many directories ask for both.

**Short description (≈150 characters):**
Rigweda Technologies builds business software: employee monitoring, AI task reminders, school learning, AI calling, and face recognition, plus web and app development.

**Long description (≈700 characters):**
Rigweda Technologies is a Hyderabad software company that builds, hosts, and supports its own products. Rigweda Monitor combines employee monitoring with HRMS. TaskPulse is an AI task app that follows up by push, voice, and phone call until work is done. GradeSight is a learning platform for K–12 schools and colleges. Rigweda Voice runs multilingual AI voice agents for support and sales calls, and Find Face recognises people in photos and live CCTV. WorkHub, ITR Filing, and RydNGo cover project management, tax filing, and self-drive car rentals. The team also delivers UI/UX design, web and mobile app development, AI solutions, and digital marketing for businesses in India and worldwide.

**Product listings** (software directories, Product Hunt, Google Business Profile → Products). Link each one to its own page, not the home page:

| Product | Category to choose | One-line description | URL |
|---|---|---|---|
| Rigweda Monitor | HR / Employee monitoring | Employee monitoring and HRMS in one platform. | https://www.rigweda.com/products/rigweda-monitor |
| TaskPulse | Productivity / Task management | The AI task app that follows up until it is done. | https://www.rigweda.com/products/taskpulse |
| GradeSight | Education / Learning management system | One place to teach, learn, and see how every student is doing. | https://www.rigweda.com/products/gradesight |
| Rigweda Voice | AI / Call center software | AI voice agents that answer and make calls for your business. | https://www.rigweda.com/products/rigweda-voice |
| Find Face | Security / Face recognition | Face recognition for photos and live CCTV. | https://www.rigweda.com/products/find-face |
| WorkHub | Project management | One workspace for projects, tasks, and team workflows. | https://www.rigweda.com/products/workhub |
| ITR Filing | Tax / Accounting | File taxes and manage compliance with a CA by your side. | https://www.rigweda.com/products/itr-filing |
| RydNGo | Car rental software | Self-drive car rentals by the hour, day, or week. | https://www.rigweda.com/products/rydngo |

Screenshots for listings are in `public/images/products/` (also at `https://www.rigweda.com/images/products/<name>.webp`). Some directories need PNG or JPG; convert them first.

**Tracking listing traffic:** add UTM tags to the website link where a directory allows it, e.g. `https://www.rigweda.com/products/rigweda-monitor?utm_source=g2&utm_medium=referral&utm_campaign=listing`. For Google Business Profile, use `https://www.rigweda.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp` so Maps and profile visits show separately in GA4. The pages' canonical tags keep these tagged URLs out of search results.

## 4. Keyword and page map

Each page targets one main topic. Don't create a second page that targets the same keyword; improve the existing one.

| Page | Main keywords (India focus) |
|---|---|
| /products/rigweda-monitor | employee monitoring software, HRMS software India, employee activity tracking, productivity monitoring software |
| /products/workhub | project management software, task management tool for teams, work management software |
| /products/rydngo | car rental software, self drive car rental platform, car rental booking system |
| /products/rigweda-voice | AI voice agent, AI calling software, AI call center software India, voice bot |
| /products/find-face | face recognition software, CCTV face recognition, face attendance system |
| /products/taskpulse | AI task reminder app, reminder app with phone call, AI to-do list, accountability app |
| /products/gradesight | learning management system, LMS for schools, school learning platform, online gradebook (US K–12 and colleges are the target market) |
| /products/itr-filing | online ITR filing platform, CA assisted tax filing, GST compliance software |
| /seo-services, /ppc-services, /smm-services, /digital-marketing | SEO company in Hyderabad, PPC agency Hyderabad, social media marketing agency Hyderabad |
| /web-development, /webdesign, /wordpress-development, /ecommerce-development | web development company Hyderabad, website design company Hyderabad, WordPress developer, ecommerce website development |
| /ai-services, /software-development, /powerbi-services | AI development company India, custom software development Hyderabad, Power BI consultants |

Check real search volume and difficulty in Google Keyword Planner (free with a Google Ads account) before writing content.

## 5. Reviews and proof (ongoing)

Reviews are the strongest local ranking factor you control, and the site currently has no testimonials.

- After each delivery or successful pilot, send the client a short message with the Google review link (GBP → "Ask for reviews").
- Ask product customers for a review on G2 or Capterra.
- Collect 3–5 short quotes with name, role, and company, plus permission, and add them to the website. This raises conversion on every page.
- Write 2–3 case studies: problem → what we built → result, with numbers where the client agrees. Publish them on the blog and link them from the matching product or service page.

## 6. Content plan (blog, 2 posts a month)

The /blog page has no posts yet. Every post should answer a real question a buyer searches for, link to one product or service page, and be at least 1,000 words with screenshots. Starter list:

1. Employee monitoring in India: what is legal and how to roll it out (→ Rigweda Monitor)
2. How to track remote team productivity without micromanaging (→ Rigweda Monitor)
3. HRMS vs. employee monitoring software: which one do you need? (→ Rigweda Monitor)
4. How AI voice agents handle customer support calls (→ Rigweda Voice)
5. AI calling for sales follow-ups: setup, costs, and compliance in India (→ Rigweda Voice)
6. Face recognition attendance vs. biometric machines (→ Find Face)
7. Why to-do lists fail and what actually gets tasks done (→ TaskPulse)
8. How to choose a learning management system for a K–12 school (→ GradeSight)
9. How to start a self-drive car rental business in India (→ RydNGo)
10. ITR filing checklist for salaried employees, by financial year (→ ITR Filing; update it every year)
11. How much does a business website cost in Hyderabad? (→ web development)
12. SEO for small businesses in Hyderabad: a practical guide (→ SEO services)

Building blog posts as separate pages needs a small code change; ask the developer before publishing the first one.

## 7. Link building (ongoing, quality over quantity)

Never buy links or use link farms. Google penalises them. Good sources:

- **Guest articles** on Indian tech and HR publications (YourStory, Inc42, HR Katha, People Matters), with a link to the relevant product page.
- **Expert quotes** through Qwoted, Featured.com, and Help a B2B Writer. Journalists link to quoted experts.
- **Partners and clients:** ask clients to add "Built by Rigweda Technologies" with a link in their footer or case study page.
- **Ecosystem:** T-Hub, NASSCOM, local Hyderabad startup events, college placement and internship pages (careers links).
- **Product launches:** Product Hunt, Hacker News "Show HN", relevant LinkedIn and Reddit communities. Contribute; don't just post links.
- **YouTube:** a 2-minute demo video for each product, linked to its page. Embed the videos on the product pages later.

## 8. Social media (consistent, not daily)

- LinkedIn: 2–3 posts a week from the company page, plus founders and team resharing. Best channel for B2B products (Monitor, WorkHub, Voice).
- Instagram and Facebook: product demos as Reels, behind-the-scenes, hiring. Best for RydNGo and ITR Filing audiences.
- Every post that mentions a product links to its /products/... page, not the home page.
- Add UTM tags to links so GA4 shows which posts bring leads, e.g. `?utm_source=linkedin&utm_medium=social&utm_campaign=monitor-launch`.

## 9. Paid campaigns (once tracking works)

Start only after steps 3–4 of the launch checklist, otherwise you can't measure cost per lead.

- **Google Search ads**, one campaign per product, sending traffic to its /products/... page. Start with exact and phrase match on the section 4 keywords and a small daily budget. Optimise for the `generate_lead` key event.
- **Brand campaign**: bid on "Rigweda" so competitors can't take your name.
- **LinkedIn ads** for Rigweda Monitor and WorkHub, targeting HR managers and founders at 50–500 employee companies in India.
- **Meta ads** for RydNGo and ITR Filing (consumer audiences), using Reels of the product.
- **Remarketing**: show ads to people who visited a product page but didn't contact you.
- Before running Google Ads, replace the one-line privacy policy with a full one (data collected, cookies and analytics, retention, contact, DPDP Act 2023 rights). Google Ads can reject sites without one.

## 10. Monthly routine and KPIs

| Every month | Tool |
|---|---|
| Leads by source (form, call, WhatsApp, email) | GA4 → key events |
| Clicks, impressions, and average position for the section 4 keywords | Search Console → Performance |
| New indexing errors or "Crawled – currently not indexed" pages | Search Console → Pages |
| Core Web Vitals (should stay "Good") | Search Console → Core Web Vitals |
| New reviews and GBP calls or direction requests | Google Business Profile |
| New backlinks | Search Console → Links |

Targets for the first 6 months: all 30 pages indexed; GBP in the Hyderabad map pack for your brand and at least one service; 10+ Google reviews; each product page ranking in the top 20 for its main keyword; a measurable cost per lead for every paid channel.

## What the site already does (for reference)

- Every page is pre-rendered to HTML with its own title, description, canonical URL (`https://www.rigweda.com/...`), social preview tags, and a single H1.
- Structured data: Organization (with address, phone, and social profiles), WebSite, breadcrumbs, a Service entry on each service page, SoftwareApplication on each product page, and FAQ markup wherever a page has FAQs.
- `sitemap.xml` is generated at build time from the page list. The build fails if a listed page is broken, duplicated, missing its H1, or has a title over 65 characters.
- Unknown URLs return a real 404 with `noindex`; `/thank-you` is `noindex` and blocked in robots.txt; the `*.vercel.app` copy sends `X-Robots-Tag: noindex`.
- Images are WebP (59.6 MB → 3.4 MB); the 3D background loads after the content; on a slow mobile connection the home page's main content appears in about 1.5 seconds.
- GA4 (G-QQSSQQFD9R) is loaded once, by Google Tag Manager (GTM-T5VTVFKN). Enhanced Measurement sends page views, scrolls, outbound clicks, downloads, and form interactions; the site adds `whatsapp_click`, `phone_click`, `email_click`, and `generate_lead` (see `src/analytics.ts`).
