import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as THREE from 'three';
import './styles.css';

const logoLockup = '/assets/rigweda-logo.png';

const renderImages = {
  website: '/renders/webapplication.png',
  interface: '/renders/ui-ux-img.png',
  cms: '/renders/wordpressdevelopment.png',
  commerce: '/renders/ecommerce.png',
  mobile: '/renders/mobile-3d.png',
  marketing: '/renders/digitalmarketing.png',
  seo: '/renders/seo.png',
  ads: '/renders/ppc.png',
  smm: '/renders/smm.png',
  cloud: '/renders/hosting-3d.png',
  ai: '/renders/cloud-ai-data-3d.png',
  data: '/renders/cloud-ai-data-3d.png',
  analytics: '/renders/analytics-bi-3d.png',
  database: '/renders/database-3d.png',
  security: '/renders/security-network-3d.png',
  network: '/renders/networking-3d.png',
  software: '/renders/software-development.png',
  enterprise: '/renders/software-enterprise-3d.png',
  strategy: '/renders/software-development.png'
};

const projects = [
  // { title: 'Vagtha Women Fashion', category: 'Ecommerce', industry: 'Fashion', image: '/work/vagtha.webp', url: 'https://www.vagtha.com/', tags: ['UI/UX', 'Web Development', 'Ecommerce'] },
  // { title: 'Sumanaa Fashion', category: 'Ecommerce', industry: 'Fashion', image: '/work/sumanaa.webp', url: 'http://sumanaaclothing.com/', tags: ['Web Development', 'Brand Website'] },
  // { title: 'PTR Infracons', category: 'Corporate', industry: 'Construction', image: '/work/ptrinfracons.png', url: 'https://ptrinfracons.com/', tags: ['Corporate Website', 'SEO'] },
  // { title: 'Sona Interiors', category: 'Corporate', industry: 'Interiors', image: '/work/sona.png', url: 'https://www.sonainteriors.co.in/', tags: ['UI/UX', 'Web Development'] },
  // { title: 'Golden Ratio Market', category: 'Business', industry: 'Trading', image: '/work/golden-ratio.webp', url: 'https://goldenratioprofile.com/', tags: ['Web Development', 'SEO'] },
  // { title: 'VibrantPropMart', category: 'Real Estate', industry: 'Property', image: '/work/vibrantpropmart.png', url: 'https://vibrantpropmart.com/', tags: ['Web Development', 'Lead Generation'] },
  // { title: 'Dental Clinic Website', category: 'Healthcare', industry: 'Clinic', image: '/work/dental.webp', url: 'https://dental.wasmer.app/', tags: ['Healthcare Website', 'SEO'] },
  // { title: 'Flower Bouquet Website', category: 'Ecommerce', industry: 'Retail', image: '/work/flowershop.webp', url: 'https://flower.wasmer.app/', tags: ['Ecommerce', 'UI/UX'] },
  // { title: 'Sree Tourism', category: 'Travel', industry: 'Tourism', image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D', url: '#', tags: ['Travel Website', 'UI/UX', 'Web Development'] },
  // { title: 'Sri Kanchi Banaras Silks', category: 'Ecommerce', industry: 'Textiles', image: 'https://images.unsplash.com/photo-1759630814559-f9fffe187384?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', url: '#', tags: ['Textile Store', 'Ecommerce', 'Brand Website'] },
  // { title: 'Samskruti Designer Store', category: 'Ecommerce', industry: 'Fashion', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJldGFpbCUyMHN0b3JlfGVufDB8fDB8fHww', url: 'https://unsplash.com/photos/a-clothing-rack-with-clothes-hanging-on-it-28P04A4wkTI', tags: ['Designer Store', 'UI/UX', 'Ecommerce'] },
  // { title: 'Ridhira Decors', category: 'Corporate', industry: 'Interiors', image: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', url: 'https://unsplash.com/photos/beige-couch-and-armchair-tHkJAMcO3QE', tags: ['Decor Brand', 'UI/UX', 'Web Development'] }
];

const services = [
  { slug: 'ui-ux-solutions', title: 'UI/UX Solutions', group: 'Design', visual: 'interface', keywords: 'UI UX design services, product design, interface design', summary: 'Research-led interface design for websites, apps, dashboards, and digital products that customers can understand quickly.', bullets: ['User journey mapping and wireframes', 'High-fidelity website and app UI design', 'Design systems, prototypes, and usability improvements'] },
  { slug: 'webdesign', title: 'Web Design', group: 'Web Development', visual: 'website', keywords: 'web design company, responsive website design', summary: 'Modern website design with strong visual hierarchy, responsive layouts, SEO-aware structure, and conversion-focused sections.', bullets: ['Corporate websites and landing pages', 'Responsive layouts for all screens', 'Brand-aligned content presentation'] },
  { slug: 'web-development', title: 'Web Application Development', group: 'Web Development', visual: 'website', keywords: 'web application development, custom web apps', summary: 'Secure, scalable web applications for customer portals, admin dashboards, business workflows, and digital platforms.', bullets: ['React front ends and API-ready architecture', 'Dashboards, portals, booking, CRM, and inventory modules', 'Analytics, authentication, and deployment support'] },
  { slug: 'wordpress-development', title: 'WordPress Development', group: 'Web Development', visual: 'cms', keywords: 'WordPress development, CMS website development', summary: 'Fast WordPress and CMS websites that are easy to update, SEO-friendly, and ready for business content growth.', bullets: ['Custom page sections and theme setup', 'Blog, service, portfolio, and landing page structures', 'Speed, security, backup, and plugin planning'] },
  { slug: 'ecommerce-development', title: 'Ecommerce Development', group: 'Web Development', visual: 'commerce', keywords: 'ecommerce development, online store development', summary: 'Online stores that make browsing, checkout, management, and marketing feel simple and reliable.', bullets: ['Product catalog and checkout experiences', 'Payment, shipping, and order workflows', 'Conversion tracking and ecommerce SEO'] },
  { slug: 'digital-marketing', title: 'Digital Marketing', group: 'Digital Marketing', visual: 'marketing', keywords: 'digital marketing services, online marketing agency', summary: 'Integrated campaigns that connect SEO, paid ads, social content, landing pages, and analytics.', bullets: ['Campaign strategy and channel planning', 'Landing pages and lead capture', 'Monthly reporting and conversion improvement'] },
  { slug: 'seo-services', title: 'SEO Services', group: 'Digital Marketing', visual: 'seo', keywords: 'SEO services, search engine optimization', summary: 'Technical, on-page, and local SEO programs that help businesses become easier to discover online.', bullets: ['Keyword mapping and content structure', 'Technical SEO, metadata, schema, and sitemaps', 'Local SEO and Google Business Profile improvements'] },
  { slug: 'smm-services', title: 'SMM Services', group: 'Digital Marketing', visual: 'smm', keywords: 'social media marketing services, SMM agency', summary: 'Social media planning, creative direction, publishing systems, and campaign support for consistent brand visibility.', bullets: ['Content calendars and campaign ideas', 'Creative direction for posts and reels', 'Audience engagement and performance reporting'] },
  { slug: 'ppc-services', title: 'PPC Services', group: 'Digital Marketing', visual: 'ads', keywords: 'PPC services, Google Ads management', summary: 'Paid search and social ad campaigns focused on measurable enquiries, landing page quality, and efficient spend.', bullets: ['Google Ads and social ad setup', 'Conversion tracking and remarketing', 'Campaign optimization and reporting'] },
  { slug: 'software-development', title: 'Software Development', group: 'Software Development', visual: 'software', keywords: 'software development company, custom software', summary: 'Custom software systems for businesses that need workflow automation, operational control, and reliable reporting.', bullets: ['Planning, architecture, and modular builds', 'Business workflow and admin systems', 'Integrations, reporting, and support'] },
  { slug: 'powerbi-services', title: 'Power BI Services', group: 'Software Development', visual: 'analytics', keywords: 'Power BI services, business intelligence dashboards', summary: 'Business intelligence dashboards that turn scattered data into useful decisions for leadership and teams.', bullets: ['KPI dashboards and executive reports', 'Data modeling and visualization', 'Scheduled reporting and insights'] },
  { slug: 'ai-services', title: 'AI Development Services', group: 'Software Development', visual: 'ai', keywords: 'AI development services, AI automation', summary: 'AI assistants and automations that reduce repetitive work, improve response time, and make knowledge easier to use.', bullets: ['Chatbots and internal knowledge assistants', 'Document and workflow automation', 'AI integrations with business systems'] },
  { slug: 'sap-services', title: 'SAP Consulting Services', group: 'Software Development', visual: 'enterprise', keywords: 'SAP consulting services, ERP consulting', summary: 'SAP and ERP consulting support for process mapping, reporting, integrations, and business system improvements.', bullets: ['Process discovery and roadmap planning', 'ERP reporting and integration support', 'Operational workflow consultation'] },
  { slug: 'data-science-services', title: 'Data Science Services', group: 'Software Development', visual: 'data', keywords: 'data science services, predictive analytics', summary: 'Data science services for forecasting, segmentation, pattern discovery, and decision support.', bullets: ['Data preparation and modeling', 'Predictive analytics and reporting', 'Insights for marketing, sales, and operations'] },
  { slug: 'mobile-development', title: 'Mobile App Development', group: 'Mobile APP Development', visual: 'mobile', keywords: 'mobile app development, Android iOS app development', summary: 'Android, iOS, and cross-platform mobile applications with secure APIs, admin panels, analytics, and release support.', bullets: ['Customer apps and business apps', 'Push notifications, payments, and maps', 'Backend APIs and app store readiness'] },
  { slug: 'hosting-services', title: 'Hosting Services', group: 'Hosting Services', visual: 'cloud', keywords: 'hosting services, managed hosting', summary: 'Managed hosting, deployment, backup, monitoring, and performance support for business-critical websites and apps.', bullets: ['Hosting setup and migration', 'SSL, backups, uptime monitoring', 'Performance and maintenance support'] },
  { slug: 'aws-services', title: 'AWS Managed Services', group: 'Hosting Services', visual: 'cloud', keywords: 'AWS managed services, cloud hosting', summary: 'AWS architecture, deployment, monitoring, cost awareness, and managed cloud operations.', bullets: ['Cloud architecture and migration', 'Server monitoring and backups', 'Deployment pipelines and scaling plans'] },
  { slug: 'networking-solutions-services', title: 'Networking Solutions', group: 'Hosting Services', visual: 'network', keywords: 'networking solutions, IT network services', summary: 'Network planning and support for teams that need dependable connectivity, access control, and infrastructure clarity.', bullets: ['Network design and documentation', 'Access control and troubleshooting', 'Infrastructure consultation'] },
  { slug: 'security-services', title: 'Security (VAPT)', group: 'Security', visual: 'security', keywords: 'VAPT services, cybersecurity testing', summary: 'Security reviews, VAPT support, hardening, monitoring, and maintenance practices that reduce digital risk.', bullets: ['Vulnerability assessment and remediation guidance', 'Web and infrastructure hardening', 'Backup, SSL, access, and monitoring checks'] },
  { slug: 'data-services', title: 'Data Services', group: 'Data', visual: 'data', keywords: 'data services, data management', summary: 'Data collection, cleanup, integration, and reporting support for operations that depend on trustworthy information.', bullets: ['Data pipelines and migration', 'Data quality and transformation', 'Reports and operational dashboards'] },
  { slug: 'retail-services', title: 'Retail Services', group: 'Industry', visual: 'commerce', keywords: 'retail IT services, ecommerce retail solutions', summary: 'Retail websites, ecommerce workflows, inventory visibility, campaign tracking, and customer engagement systems.', bullets: ['Online stores and product catalogs', 'Inventory and order workflows', 'Promotions, analytics, and customer journeys'] },
  { slug: 'database-maintenance', title: 'Database Maintenance', group: 'Data', visual: 'database', keywords: 'database maintenance, database support', summary: 'Database health, backups, performance tuning, structure cleanup, and reliability support.', bullets: ['Backup and recovery planning', 'Query and performance review', 'Data hygiene and access practices'] },
  { slug: 'data-analytics', title: 'Data Analytics', group: 'Data', visual: 'analytics', keywords: 'data analytics services, business analytics', summary: 'Analytics systems that show what is happening across sales, marketing, operations, finance, and customer behavior.', bullets: ['KPI planning and dashboards', 'Campaign and operational analytics', 'Insights for smarter decisions'] },
  { slug: 'custom-development', title: 'Custom Development', group: 'Software Development', visual: 'software', keywords: 'custom development, custom software solutions', summary: 'Custom applications, integrations, and workflow tools built around your exact business process.', bullets: ['Requirement discovery and solution design', 'Custom modules and integrations', 'Maintainable code and support'] },
  { slug: 'it-consulting', title: 'IT Consulting', group: 'Consulting', visual: 'strategy', keywords: 'IT consulting services, technology consulting', summary: 'Technology audits, roadmaps, vendor guidance, product planning, and architecture support for better decisions.', bullets: ['Digital roadmap and audit', 'Architecture and vendor recommendations', 'Implementation planning'] }
];

const applications = [
  { title: 'Retail Commerce Application', visual: 'commerce', image: '/renders/retail-commerce.png', text: 'Customer app, catalog, checkout, loyalty, admin panel, and analytics for retail teams.' },
  { title: 'Operations Dashboard', visual: 'analytics', image: '/renders/operation-dashboard.png', text: 'Role-based dashboards for tracking leads, inventory, tasks, sales, and support workflows.' },
  { title: 'AI Service Desk', visual: 'ai', image: '/renders/service-desk.png', text: 'Knowledge assistant for customer questions, internal SOPs, document lookup, and escalation.' },
  { title: 'Marketing Intelligence Hub', visual: 'seo', image: '/renders/marketing-intelligence.png', text: 'SEO, campaign, enquiry, and conversion reporting in one growth workspace.' }
];

const serviceGroups = [
  { name: 'UI/UX Solutions', path: '/ui-ux-solutions' },
  { name: 'Web Development', path: '/web-development', submenu: ['wordpress-development', 'ecommerce-development', 'webdesign'] },
  { name: 'Digital Marketing', path: '/digital-marketing', submenu: ['seo-services', 'smm-services', 'ppc-services'] },
  { name: 'Software Development', path: '/software-development', submenu: ['powerbi-services', 'ai-services', 'sap-services', 'data-science-services', 'custom-development'] },
  { name: 'Mobile APP Development', path: '/mobile-development' },
  { name: 'Hosting Services', path: '/hosting-services', submenu: ['aws-services', 'networking-solutions-services'] },
  { name: 'Security (VAPT)', path: '/security-services' }
];

const getService = (slug) => services.find((service) => service.slug === slug);

const enquiryNeeds = [
  'Website or web application',
  'Mobile application',
  'Business application',
  'AI, cloud, or data',
  'SEO and digital marketing'
];

const cleanFormValue = (value) => String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
const isValidPhone = (value) => {
  const normalized = value.replace(/[^\d+]/g, '');
  const digits = normalized.replace(/\D/g, '');
  const hasOnlyAllowedCharacters = /^[+]?[0-9\s()-]+$/.test(value);
  const hasValidPrefix = normalized.indexOf('+') <= 0 && (normalized.match(/[+]/g) || []).length <= 1;

  return hasOnlyAllowedCharacters && hasValidPrefix && digits.length >= 8 && digits.length <= 15;
};

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

const sendEmailJsEnquiry = async (templateParams) => {
  const { serviceId, templateId, publicKey } = emailJsConfig;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured yet.');
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams
    })
  });

  if (!response.ok) {
    throw new Error('EmailJS could not send the enquiry.');
  }
};

function HeadMeta({ title, description, keywords, path = '/' }) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('keywords', keywords);
    setCanonical(`https://rigweda.com${path}`);
  }, [title, description, keywords, path]);
  return null;
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function SceneBackground() {
  useEffect(() => {
    const canvas = document.querySelector('#rigweda-field');
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const group = new THREE.Group();
    scene.add(group);

    const cyan = new THREE.Color('#48d8ff');
    const gold = new THREE.Color('#f2b84b');
    const material = new THREE.MeshStandardMaterial({ color: cyan, emissive: '#48d8ff', emissiveIntensity: 0.22, metalness: 0.5, roughness: 0.2 });
    const geometry = new THREE.SphereGeometry(0.052, 18, 18);
    const nodes = [];
    for (let i = 0; i < 88; i += 1) {
      const radius = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const node = new THREE.Mesh(geometry, material.clone());
      node.position.set(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi));
      node.userData.velocity = 0.55 + Math.random() * 0.6;
      nodes.push(node);
      group.add(node);
    }
    const positions = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 1.45) {
          positions.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z, nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    group.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: '#1b7fb6', transparent: true, opacity: 0.16 })));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.35, 0.022, 10, 160), new THREE.MeshBasicMaterial({ color: '#48d8ff', transparent: true, opacity: 0.18 }));
    ring.rotation.x = 1.2;
    ring.rotation.y = 0.55;
    group.add(ring);
    scene.add(new THREE.AmbientLight('#ffffff', 1.25));
    const keyLight = new THREE.PointLight('#e9fbff', 18, 25);
    keyLight.position.set(-3.5, 2.5, 5);
    scene.add(keyLight);

    let pointerX = 0;
    let pointerY = 0;
    const move = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.55;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.35;
    };
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('resize', resize);

    let frame = 0;
    const animate = (time) => {
      const tick = time * 0.001;
      group.rotation.y = tick * 0.08 + pointerX;
      group.rotation.x = Math.sin(tick * 0.35) * 0.08 + pointerY;
      ring.rotation.z = tick * 0.16;
      nodes.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(tick * node.userData.velocity + index) * 0.2);
        node.material.color.lerpColors(cyan, gold, (Math.sin(tick + index) + 1) / 2);
      });
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      geometry.dispose();
      lineGeometry.dispose();
    };
  }, []);

  return <canvas id="rigweda-field" aria-hidden="true" />;
}

function PageEffects({ routeKey = '' }) {
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll(
        '.hero-copy, .hero-launch-panel, .visual3d, .trust-strip, .section-heading, .service-card, .rich-card, .application-card, .project-card, .gallery-card, .content-block, .rich-list li, .contact-form'
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );

      elements.forEach((element, index) => {
        element.classList.add('reveal');
        if (element instanceof HTMLElement) {
          element.style.setProperty('--reveal-delay', `${Math.min(index * 28, 260)}ms`);
        }
        observer?.observe(element);
      });
    }, 60);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [location.pathname, routeKey]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('page-enter');
  const currentRoute = `${location.pathname}${location.search}`;
  const displayedRoute = `${displayLocation.pathname}${displayLocation.search}`;

  useEffect(() => {
    if (currentRoute !== displayedRoute) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplayLocation(location);
        setTransitionStage('page-enter');
        return;
      }

      setTransitionStage('page-exit');
    }
  }, [currentRoute, displayedRoute, location]);

  const handleTransitionEnd = () => {
    if (transitionStage === 'page-exit') {
      setDisplayLocation(location);
      setTransitionStage('page-enter');
    }
  };

  return (
    <main className={`route-shell ${transitionStage}`} onAnimationEnd={handleTransitionEnd}>
      <PageEffects routeKey={displayedRoute} />
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/privacy-policy" element={<SimplePage kind="privacy-policy" />} />
        <Route path="/thank-you" element={<SimplePage kind="thank-you" />} />
        <Route path="/:slug" element={<ServicePage />} />
      </Routes>
    </main>
  );
}

function RobotCompanion() {
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runModeRef = useRef(false);
  const directionRef = useRef(1);
  const walkIntensityRef = useRef(0);

  useEffect(() => {
    const robot = document.querySelector<HTMLElement>('.robo-companion');
    if (!robot) return undefined;

    let motionFrame = 0;
    let waypointTimer = 0;
    let sprintTimer = 0;
    const compact = () => window.innerWidth <= 680;
    const size = () => compact() ? { width: 154, height: 214 } : { width: 232, height: 314 };
    const clampPosition = (x, y) => {
      const robotSize = size();
      return {
        x: Math.max(12, Math.min(window.innerWidth - robotSize.width - 8, x)),
        y: Math.max(76, Math.min(window.innerHeight - robotSize.height - 8, y))
      };
    };
    const current = clampPosition(window.innerWidth - size().width - 30, window.innerHeight - size().height - 24);
    const target = { ...current };
    robot.style.setProperty('--robo-x', `${current.x}px`);
    robot.style.setProperty('--robo-y', `${current.y}px`);
    robot.style.setProperty('--robo-direction', '1');
    robot.style.setProperty('--robo-speed', '0.62');

    const setRunMode = (value) => {
      runModeRef.current = value;
      setRunning(value);
      robot.style.setProperty('--robo-speed', value ? '1.15' : '0.62');
    };

    const chooseWaypoint = (fast = false) => {
      const robotSize = size();
      const lanes = [
        92 + Math.random() * Math.max(70, window.innerHeight * 0.2),
        window.innerHeight * (0.38 + Math.random() * 0.24),
        window.innerHeight - robotSize.height - 32 - Math.random() * 90
      ];
      const next = clampPosition(
        18 + Math.random() * Math.max(1, window.innerWidth - robotSize.width - 36),
        lanes[Math.floor(Math.random() * lanes.length)]
      );
      target.x = next.x;
      target.y = next.y;
      window.clearTimeout(waypointTimer);
      waypointTimer = window.setTimeout(() => chooseWaypoint(), fast ? 2600 : 5200 + Math.random() * 5200);
    };

    const targetRef = target;
    chooseWaypoint();

    const walk = () => {
      const easing = runModeRef.current ? 0.023 : 0.011;
      current.x += (targetRef.x - current.x) * easing;
      current.y += (targetRef.y - current.y) * easing;
      const distance = Math.hypot(targetRef.x - current.x, targetRef.y - current.y);
      if (Math.abs(targetRef.x - current.x) > 3) {
        directionRef.current = targetRef.x > current.x ? 1 : -1;
      }
      robot.style.setProperty('--robo-x', `${current.x.toFixed(2)}px`);
      robot.style.setProperty('--robo-y', `${current.y.toFixed(2)}px`);
      robot.style.setProperty('--robo-walk', `${Math.min(1, distance / 90).toFixed(2)}`);
      robot.style.setProperty('--robo-direction', `${directionRef.current}`);
      walkIntensityRef.current = Math.min(1, distance / 90);
      if (distance < 10) chooseWaypoint();
      motionFrame = window.requestAnimationFrame(walk);
    };

    const resize = () => {
      const next = clampPosition(current.x, current.y);
      current.x = next.x;
      current.y = next.y;
      targetRef.x = next.x;
      targetRef.y = next.y;
    };

    const emote = () => {
      chooseWaypoint(true);
      setRunMode(true);
      window.clearTimeout(sprintTimer);
      sprintTimer = window.setTimeout(() => setRunMode(false), 1500);
    };
    robot.addEventListener('click', emote);
    window.addEventListener('resize', resize);
    motionFrame = window.requestAnimationFrame(walk);

    return () => {
      window.cancelAnimationFrame(motionFrame);
      window.clearTimeout(waypointTimer);
      window.clearTimeout(sprintTimer);
      robot.removeEventListener('click', emote);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7.2);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(220, 300, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const root = new THREE.Group();
    root.position.y = -0.05;
    scene.add(root);

    const white = new THREE.MeshPhysicalMaterial({ color: '#f8fbff', roughness: 0.24, metalness: 0.04, clearcoat: 0.8, clearcoatRoughness: 0.22 });
    const whiteSoft = new THREE.MeshPhysicalMaterial({ color: '#e8f0f6', roughness: 0.32, metalness: 0.1, clearcoat: 0.5 });
    const orange = new THREE.MeshPhysicalMaterial({ color: '#f2b84b', roughness: 0.28, metalness: 0.22, clearcoat: 0.7 });
    const dark = new THREE.MeshPhysicalMaterial({ color: '#061826', roughness: 0.16, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.08 });
    const joint = new THREE.MeshPhysicalMaterial({ color: '#26313a', roughness: 0.22, metalness: 0.65, clearcoat: 0.35 });
    const cyan = new THREE.MeshBasicMaterial({ color: '#55f3ff' });
    const cyanGlow = new THREE.MeshBasicMaterial({ color: '#7af8ff', transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending, depthWrite: false });
    const eyeRing = new THREE.MeshBasicMaterial({ color: '#1ee8ff', transparent: true, opacity: 0.86 });

    const addMesh = (parent, geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      mesh.rotation.set(...rotation);
      parent.add(mesh);
      return mesh;
    };

    const roundedRect = (width, height, radius) => {
      const x = -width / 2;
      const y = -height / 2;
      const shape = new THREE.Shape();
      shape.moveTo(x + radius, y);
      shape.lineTo(x + width - radius, y);
      shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius);
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height);
      shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);
      return new THREE.ShapeGeometry(shape, 20);
    };

    const head = new THREE.Group();
    head.position.y = 1.55;
    root.add(head);
    addMesh(head, new THREE.SphereGeometry(1, 48, 32), white, [0, 0, 0], [1.42, 0.86, 0.78]);
    addMesh(head, new THREE.SphereGeometry(0.22, 24, 16), whiteSoft, [-1.22, -0.02, 0.03], [0.58, 1.2, 0.72]);
    addMesh(head, new THREE.SphereGeometry(0.22, 24, 16), whiteSoft, [1.22, -0.02, 0.03], [0.58, 1.2, 0.72]);
    addMesh(head, new THREE.SphereGeometry(0.14, 24, 16), orange, [-1.34, -0.02, 0.04], [0.55, 1, 0.45]);
    addMesh(head, new THREE.SphereGeometry(0.14, 24, 16), orange, [1.34, -0.02, 0.04], [0.55, 1, 0.45]);
    addMesh(head, roundedRect(1.64, 0.56, 0.18), dark, [0, -0.04, 0.78], [1, 1, 1]);

    addMesh(head, new THREE.TorusGeometry(0.16, 0.018, 12, 40), eyeRing, [-0.48, -0.03, 0.825], [1, 1, 1]);
    addMesh(head, new THREE.TorusGeometry(0.16, 0.018, 12, 40), eyeRing, [0.48, -0.03, 0.825], [1, 1, 1]);
    const leftEye = addMesh(head, new THREE.CircleGeometry(0.105, 32), cyan, [-0.48, -0.03, 0.835], [1, 1, 1]);
    const rightEye = addMesh(head, new THREE.CircleGeometry(0.105, 32), cyan, [0.48, -0.03, 0.835], [1, 1, 1]);
    const leftEyeGlow = addMesh(head, new THREE.CircleGeometry(0.24, 32), cyanGlow, [-0.48, -0.03, 0.83], [1, 1, 1]);
    const rightEyeGlow = addMesh(head, new THREE.CircleGeometry(0.24, 32), cyanGlow, [0.48, -0.03, 0.83], [1, 1, 1]);
    addMesh(head, new THREE.SphereGeometry(0.04, 16, 8), orange, [0, 0.56, 0.69], [1, 1, 0.5]);
    addMesh(head, new THREE.BoxGeometry(0.46, 0.08, 0.05, 4, 1, 1), dark, [0, 0.42, 0.71], [1, 1, 1]);

    [-0.82, 0.82].forEach((x) => {
      const antenna = new THREE.Group();
      antenna.position.set(x, 0.72, 0.02);
      antenna.rotation.z = x < 0 ? 0.2 : -0.2;
      head.add(antenna);
      addMesh(antenna, new THREE.CylinderGeometry(0.025, 0.035, 0.78, 16), joint, [0, 0.36, 0], [1, 1, 1]);
      addMesh(antenna, new THREE.SphereGeometry(0.13, 24, 16), white, [0, 0.79, 0], [1, 1, 1]);
      addMesh(antenna, new THREE.SphereGeometry(0.075, 20, 12), cyan, [0, 0.79, 0.04], [1, 1, 1]);
    });

    const body = new THREE.Group();
    body.position.y = 0.24;
    root.add(body);
    addMesh(body, new THREE.SphereGeometry(0.62, 40, 24), white, [0, 0, 0], [0.86, 1, 0.62]);
    addMesh(body, new THREE.BoxGeometry(0.34, 0.34, 0.08, 4, 4, 1), dark, [0, 0.04, 0.49], [1, 1, 1]);
    addMesh(body, new THREE.SphereGeometry(0.16, 32, 16), cyan, [0, 0.04, 0.55], [1, 1, 0.18]);
    addMesh(body, new THREE.SphereGeometry(0.28, 32, 16), cyanGlow, [0, 0.04, 0.54], [1, 1, 0.08]);
    addMesh(body, new THREE.CylinderGeometry(0.3, 0.3, 0.18, 32), joint, [0, 0.72, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);

    const makeArm = (side) => {
      const arm = new THREE.Group();
      arm.position.set(side * 0.67, 0.34, 0);
      body.add(arm);
      addMesh(arm, new THREE.SphereGeometry(0.17, 24, 16), joint, [0, 0, 0]);
      const upper = addMesh(arm, new THREE.CapsuleGeometry(0.09, 0.42, 8, 16), whiteSoft, [side * 0.24, -0.24, 0.03], [1, 1, 1], [0, 0, side * 0.55]);
      const hand = addMesh(arm, new THREE.SphereGeometry(0.14, 24, 16), white, [side * 0.44, -0.5, 0.04], [1, 0.86, 0.72]);
      for (let i = -1; i <= 1; i += 1) {
        addMesh(hand, new THREE.CapsuleGeometry(0.025, 0.16, 4, 8), joint, [side * 0.07, -0.08, i * 0.055], [1, 1, 1], [0.6, 0, side * 0.2]);
      }
      return { arm, upper, hand };
    };

    const leftArm = makeArm(-1);
    const rightArm = makeArm(1);
    rightArm.arm.rotation.z = -0.7;
    rightArm.arm.position.y = 0.42;

    const makeLeg = (side) => {
      const leg = new THREE.Group();
      leg.position.set(side * 0.32, -0.56, 0);
      body.add(leg);
      addMesh(leg, new THREE.SphereGeometry(0.16, 24, 16), joint, [0, 0, 0]);
      const shin = addMesh(leg, new THREE.CapsuleGeometry(0.12, 0.42, 8, 16), whiteSoft, [side * 0.08, -0.33, 0], [1, 1, 1], [0, 0, side * 0.15]);
      const foot = addMesh(leg, new THREE.SphereGeometry(0.2, 24, 16), white, [side * 0.13, -0.65, 0.12], [1.28, 0.58, 0.88]);
      const sole = addMesh(leg, new THREE.BoxGeometry(0.3, 0.08, 0.15, 4, 1, 1), orange, [side * 0.13, -0.68, 0.22], [1, 1, 1]);
      return { leg, shin, foot, sole, baseX: side * 0.32 };
    };
    const leftLeg = makeLeg(-1);
    const rightLeg = makeLeg(1);

    const floorMaterial = new THREE.MeshBasicMaterial({ color: '#48d8ff', transparent: true, opacity: 0.42 });
    const floorGlow = addMesh(root, new THREE.TorusGeometry(1.15, 0.018, 10, 96), floorMaterial, [0, -1.28, -0.15], [1, 0.36, 1], [Math.PI / 2, 0, 0]);

    scene.add(new THREE.AmbientLight('#ffffff', 1.5));
    const key = new THREE.DirectionalLight('#ffffff', 4.5);
    key.position.set(-2.5, 3, 5);
    scene.add(key);
    const rim = new THREE.PointLight('#55f3ff', 10, 8);
    rim.position.set(1.9, 1.2, 2.5);
    scene.add(rim);
    const warm = new THREE.PointLight('#f2b84b', 8, 8);
    warm.position.set(-1.5, -1.4, 2.6);
    scene.add(warm);

    let frame = 0;
    const animate = (time) => {
      const tick = time * 0.001;
      const blink = Math.sin(tick * 2.8) > 0.985 ? 0.08 : 1;
      const speed = runModeRef.current ? 1.25 : 0.72;
      const stride = Math.max(0.16, walkIntensityRef.current);
      const step = Math.sin(tick * 3.15 * speed);
      const counterStep = Math.sin(tick * 3.15 * speed + Math.PI);
      const leftLift = Math.max(0, step) * stride;
      const rightLift = Math.max(0, counterStep) * stride;
      root.rotation.y += ((directionRef.current * 0.18) - root.rotation.y) * 0.05;
      root.rotation.x += ((Math.sin(tick * 0.45) * 0.015) + (stride * 0.035) - root.rotation.x) * 0.08;
      root.rotation.z = Math.sin(tick * 3.15 * speed) * 0.018 * stride;
      head.rotation.y = Math.sin(tick * 0.8) * 0.06 + directionRef.current * 0.1;
      head.rotation.x = Math.sin(tick * 0.62) * 0.018;
      body.rotation.z = Math.sin(tick * 3.15 * speed) * 0.045 * stride;
      body.rotation.x = 0.05 * stride;
      root.position.y = -0.05 + Math.abs(Math.sin(tick * 3.15 * speed)) * 0.032 * stride;

      rightArm.arm.rotation.z = -0.62 + step * 0.32 * stride;
      rightArm.arm.rotation.x = -0.12 + counterStep * 0.22 * stride;
      rightArm.hand.position.y = -0.5 - Math.abs(step) * 0.05 * stride;
      leftArm.arm.rotation.z = 0.62 + counterStep * 0.32 * stride;
      leftArm.arm.rotation.x = -0.12 + step * 0.22 * stride;
      leftArm.hand.position.y = -0.5 - Math.abs(counterStep) * 0.05 * stride;

      leftLeg.leg.rotation.z = step * 0.34 * stride;
      leftLeg.leg.rotation.x = -step * 0.22 * stride;
      leftLeg.leg.position.x = leftLeg.baseX + step * 0.035 * stride;
      leftLeg.leg.position.y = -0.56 + leftLift * 0.14;
      leftLeg.shin.rotation.z = -step * 0.12 * stride;
      leftLeg.foot.rotation.z = -step * 0.18 * stride;
      leftLeg.foot.rotation.x = leftLift * 0.38;
      leftLeg.sole.rotation.x = leftLift * 0.45;

      rightLeg.leg.rotation.z = counterStep * 0.34 * stride;
      rightLeg.leg.rotation.x = -counterStep * 0.22 * stride;
      rightLeg.leg.position.x = rightLeg.baseX + counterStep * 0.035 * stride;
      rightLeg.leg.position.y = -0.56 + rightLift * 0.14;
      rightLeg.shin.rotation.z = -counterStep * 0.12 * stride;
      rightLeg.foot.rotation.z = -counterStep * 0.18 * stride;
      rightLeg.foot.rotation.x = rightLift * 0.38;
      rightLeg.sole.rotation.x = rightLift * 0.45;
      [leftEye, rightEye, leftEyeGlow, rightEyeGlow].forEach((eye) => {
        eye.scale.y = blink;
      });
      floorGlow.rotation.z = tick * 0.7 * speed;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });
      [white, whiteSoft, orange, dark, joint, cyan, cyanGlow, eyeRing, floorMaterial].forEach((material) => material.dispose());
    };
  }, []);

  return (
    <button className={`robo-companion ${running ? 'is-running' : ''}`} type="button" aria-label="Robot companion">
      <div className="robo-shadow" />
      <div className="robo-stage">
        <canvas ref={canvasRef} className="robo-canvas" />
      </div>
    </button>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    const update = () => {
      if (header) header.dataset.elevated = window.scrollY > 16 ? 'true' : 'false';
    };
    update();
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="site-header" data-elevated="false">
      <Link className="brand" to="/" aria-label="Rigweda Technologies home"><img src={logoLockup} alt="" /></Link>
      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)}>{open ? 'Close' : 'Menu'}</button>
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/aboutus">About</NavLink>
        <div className="nav-dropdown" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
          <NavLink to="/services">Services</NavLink>
          <div className={`mega-menu ${servicesOpen ? 'show' : ''}`}>
            {serviceGroups.map((group) => (
              <div className="mega-item" key={group.name}>
                <Link to={group.path}>{group.name}</Link>
                {group.submenu && <div className="mega-sub">{group.submenu.map((slug) => <Link key={slug} to={`/${slug}`}>{getService(slug)?.title}</Link>)}</div>}
              </div>
            ))}
          </div>
        </div>
        <NavLink to="/applications">Applications</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/gallery">Our Gallery</NavLink>
        <NavLink to="/careers">Careers</NavLink>
        <NavLink to="/contactus">Contact</NavLink>
      </nav>
      <Link className="header-cta" to="/contactus">Start a Project</Link>
    </header>
  );
}

function Visual3D({ type = 'website', image }) {
  const renderImage = image ?? renderImages[type] ?? renderImages.website;
  return (
    <div className={`visual3d visual-${type}`}>
      <div className="shape-orbit one" />
      <div className="shape-orbit two" />
      <div className="visual-core">
        <img src={renderImage} alt="" loading="lazy" />
      </div>
      <div className="float-chip chip-a">{type}</div>
      <div className="float-chip chip-b">3D</div>
    </div>
  );
}

function Hero({ eyebrow, title, text, action = 'Explore Services', actionTo = '/services', visual = 'website', image, featured = false }) {
  // If the action is for contact, append #contact-form to scroll to form
  let actionToFinal = actionTo;
  if (typeof actionTo === 'string' && actionTo.match(/contact(us)?$/i)) {
    actionToFinal = actionTo + '#contact-form';
  }
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lede">{text}</p>
        <div className="hero-actions"><Link className="primary-action" to={actionToFinal}>{action}</Link><Link className="secondary-action" to="/portfolio">View Projects</Link></div>
        {featured && (
          <div className="hero-launch-panel" aria-label="Project launch planner">
            <span><strong>Launch</strong> Website / app</span>
            <span><strong>Stack</strong> UI, cloud, AI</span>
            <span><strong>Growth</strong> SEO + analytics</span>
            <Link to="/contactus#contact-form">Request options</Link>
          </div>
        )}
      </div>
      <Visual3D type={visual} image={image} />
    </section>
  );
}

function SectionHeading({ kicker, title, text }) {
  return <div className="section-heading"><div><p className="section-kicker">{kicker}</p><h2>{title}</h2></div><p>{text}</p></div>;
}

function Home() {
  return (
    <>
      <HeadMeta title="Rigweda Technologies | IT Services, Applications, Web, AI & Cloud" description="Rigweda Technologies builds SEO-friendly websites, applications, mobile apps, AI automation, cloud systems, data analytics, cybersecurity, and digital marketing engines." keywords="Rigweda Technologies, IT services, web development, applications, mobile app development, AI automation" />
      <Hero eyebrow="Innovate • Integrate • Inspire" title="Your digital systems, elevated in 3D." text="Rigweda Technologies designs websites, applications, mobile apps, AI tools, cloud platforms, and growth systems with a polished glass-cloud digital presence." visual="website" image="/renders/heroimg-transparent.png" featured />
      <section className="trust-strip"><span>SEO-ready websites</span><span>Applications</span><span>Mobile apps</span><span>AI automation</span><span>Cloud & security</span><span>Portfolio-proven delivery</span></section>
      <section className="section">
        <SectionHeading kicker="Services" title="A full IT services map, built as one connected experience." text="Customers should feel confidence quickly. Every Rigweda page connects clear content, visible proof, technical depth, and immersive 3D visuals." />
        <div className="service-grid">{services.slice(0, 12).map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
      </section>
      <ProjectsSection limit={4} />
      <ApplicationsSection compact />
    </>
  );
}

function ServiceCard({ service }) {
  const serviceImage =
    service.slug === 'web-development'
      ? '/renders/webapplication.png'
      : service.slug === 'webdesign'
        ? '/renders/web-design.png'
      : service.slug === 'wordpress-development'
        ? '/renders/wordpressdevelopment.png'
      : service.slug === 'ecommerce-development'
          ? '/renders/ecommerce.png'
          : service.slug === 'digital-marketing'
            ? '/renders/digitalmarketing.png'
            : service.slug === 'seo-services'
              ? '/renders/seo.png'
              : service.slug === 'smm-services'
                ? '/renders/smm.png'
              : service.slug === 'ppc-services'
                ? '/renders/ppc.png'
              : service.slug === 'powerbi-services'
              ? '/renders/powerbi.png'
              : service.slug === 'ai-services'
                ? '/renders/service-desk.png'
              : service.slug === 'mobile-development'
                ? '/renders/mobile-3d.png'
                : service.slug === 'hosting-services'
                  ? '/renders/hosting-3d.png'
                  : service.slug === 'aws-services'
                    ? '/renders/cloud-ai-data-3d.png'
                    : service.slug === 'networking-solutions-services'
                      ? '/renders/networking-3d.png'
                      : service.slug === 'security-services'
                        ? '/renders/security-network-3d.png'
                        : service.slug === 'data-services'
                          ? '/renders/database-3d.png'
                          : service.slug === 'retail-services'
                            ? '/renders/ecommerce-3d.png'
                            : service.slug === 'database-maintenance'
                              ? '/renders/database-3d.png'
                              : service.slug === 'data-analytics'
                                ? '/renders/analytics-bi-3d.png'
                                : service.slug === 'custom-development'
                                  ? '/renders/software-development.png'
                                  : service.slug === 'it-consulting'
                                    ? '/renders/software-enterprise-3d.png'
            : undefined;
  return <article className="service-card"><Visual3D type={service.visual} image={serviceImage} /><span>{service.group}</span><h3>{service.title}</h3><p>{service.summary}</p><Link to={`/${service.slug}`}>Explore service</Link></article>;
}

function ServicesPage() {
  return (
    <>
      <HeadMeta title="IT Services | Rigweda Technologies" description="Explore Rigweda Technologies services including UI UX, web development, ecommerce, mobile apps, AI, cloud, data, cybersecurity, hosting, SEO, PPC, SMM, SAP, and IT consulting." keywords="IT services, web development, SEO, mobile apps, AI, VAPT, AWS, SAP, Power BI" path="/services" />
      <Hero eyebrow="All Services" title="Everything a serious digital business needs." text="Rigweda brings design, engineering, infrastructure, data, security, and marketing into a single delivery model." visual="enterprise" action="Talk to Rigweda" actionTo="/contactus" image={undefined} />
      <section className="section"><div className="service-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>
    </>
  );
}

function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug) ?? services[0];
  const related = services.filter((item) => item.group === service.group && item.slug !== service.slug).slice(0, 3);
  return (
    <>
      <HeadMeta title={`${service.title} | Rigweda Technologies`} description={`${service.summary} Rigweda Technologies delivers professional ${service.title.toLowerCase()} for businesses that need reliable digital outcomes.`} keywords={service.keywords} path={`/${service.slug}`} />
      <Hero eyebrow={service.group} title={service.title} text={service.summary} visual={service.visual} action="Request Consultation" actionTo="/contactus" image={service.slug === 'ai-services' ? '/renders/ai-development.png' : undefined} />
      <section className="section split">
        <div className="content-block"><p className="section-kicker">Professional Delivery</p><h2>Built with clarity, performance, and long-term value.</h2><p>{service.summary} We shape each engagement around the business goal, the user journey, the technology stack, and the measurable result expected after launch.</p><p>Every Rigweda service page is designed to be SEO-friendly and customer-friendly: clear title, useful content, structured sections, internal links, and visible proof through projects and applications.</p></div>
        <ul className="rich-list">{service.bullets.map((bullet) => <li key={bullet}><strong>{bullet}</strong><p>Planned with practical implementation steps, clean communication, and maintainable delivery.</p></li>)}</ul>
      </section>
      <section className="section compact"><SectionHeading kicker="Related Capabilities" title="Connected services for stronger outcomes." text="Most projects need more than one service. Rigweda connects the surrounding pieces so the final result feels complete." /><div className="rich-grid">{related.map((item) => <ServiceCard key={item.slug} service={item} />)}</div></section>
    </>
  );
}

function About() {
  return (
    <>
      <HeadMeta title="About Rigweda Technologies | IT Consulting & Digital Engineering" description="Rigweda Technologies is an IT services company delivering websites, applications, mobile apps, AI, cloud, data, cybersecurity, and digital growth systems." keywords="about Rigweda Technologies, IT consulting, digital engineering" path="/aboutus" />
      <Hero eyebrow="About Rigweda" title="A technology partner built for belief." text="Customers trust a company when the message is clear, the work looks mature, and the process feels dependable. Rigweda Technologies is built around that standard." visual="strategy" action="See Services" image={undefined} />
      <section className="section split"><div className="content-block"><p className="section-kicker">Our Approach</p><h2>We design for confidence, then engineer for scale.</h2><p>Rigweda combines discovery, user experience, development, automation, cloud, security, analytics, and marketing. That means a website can become a platform, an app can become an operating system, and campaigns can be measured properly.</p></div><ul className="rich-list"><li><strong>Business-first planning</strong><p>We map goals, users, workflows, and risks before selecting tools.</p></li><li><strong>Original presentation</strong><p>We use Rigweda’s own white, gold, and copper visual language with 3D interactions.</p></li><li><strong>Long-term support</strong><p>We think beyond launch with maintenance, analytics, SEO, and security.</p></li></ul></section>
    </>
  );
}

function ApplicationsSection({ compact = false }) {
  return <section className={`section ${compact ? 'compact' : ''}`}><SectionHeading kicker="Applications" title="Application ideas customers can understand immediately." text="Instead of only listing technologies, Rigweda shows practical systems that businesses can imagine using." /><div className="application-grid">{applications.map((app) => <article className="application-card" key={app.title}><Visual3D type={app.visual} image={app.image} /><h3>{app.title}</h3><p>{app.text}</p></article>)}</div></section>;
}

function ApplicationsPage() {
  return (
    <>
      <HeadMeta title="Business Applications | Rigweda Technologies" description="Explore business application concepts by Rigweda Technologies including retail apps, dashboards, AI service desks, and marketing intelligence systems." keywords="business applications, web applications, mobile applications, AI applications" path="/applications" />
      <Hero eyebrow="Applications" title="Useful applications, not just code." text="Rigweda builds applications for customers, teams, operations, marketing, reporting, and automation. Each product is planned around real business use." visual="software" action="Discuss Application" actionTo="/contactus" image={undefined} />
      <ApplicationsSection />
    </>
  );
}

function ProjectsSection({ limit }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return <section className="section"><SectionHeading kicker="Projects" title="Portfolio proof that builds customer confidence." text="These project references from the previous portfolio are presented in a fresh Rigweda format with clean project cards and industry context." /><div className="project-grid">{list.map((project) => <article className="project-card" key={project.title}><img src={project.image} alt={project.title} /><div><span>{project.category}</span><h3>{project.title}</h3><p>{project.industry} • {project.tags.join(' • ')}</p><a href={project.url} target="_blank" rel="noreferrer">View live project</a></div></article>)}</div>{limit && <div className="center-action"><Link className="primary-action" to="/portfolio">Open full portfolio</Link></div>}</section>;
}

function Portfolio() {
  const [filter, setFilter] = useState('All');
  const filters = useMemo(() => ['All', ...Array.from(new Set(projects.flatMap((project) => project.tags)))], []);
  const visible = filter === 'All' ? projects : projects.filter((project) => project.tags.includes(filter));
  return (
    <>
      <HeadMeta title="Portfolio & Projects | Rigweda Technologies" description="Explore Rigweda Technologies project portfolio across ecommerce, fashion, construction, interiors, real estate, healthcare, and retail websites." keywords="Rigweda portfolio, web development projects, ecommerce projects" path="/portfolio" />
      <Hero eyebrow="Portfolio" title="Real project references, redesigned for Rigweda." text="A strong portfolio helps customers believe faster. These project cards show industries, expertise, and live project links in a professional format." visual="website" action="Start Similar Project" actionTo="/contactus" image={undefined} />
      <section className="section compact"><div className="filter-row">{filters.map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="project-grid">{visible.map((project) => <article className="project-card" key={project.title}><img src={project.image} alt={project.title} /><div><span>{project.category}</span><h3>{project.title}</h3><p>{project.industry} • {project.tags.join(' • ')}</p><a href={project.url} target="_blank" rel="noreferrer">View live project</a></div></article>)}</div></section>
    </>
  );
}

function Gallery() {
  return (
    <>
      <HeadMeta title="Gallery | Rigweda Technologies" description="Explore Rigweda Technologies gallery with project visuals, service concepts, application screens, and 3D digital interface presentation." keywords="Rigweda gallery, IT company gallery, project visuals" path="/gallery" />
      <Hero eyebrow="Gallery" title="A visual gallery of digital capability." text="Gallery pages should not feel empty. Rigweda uses project visuals and service-focused 3D panels to show creative and technical range." visual="interface" action="View Portfolio" actionTo="/portfolio" image={undefined} />
      <section className="section"><div className="gallery-grid">{[...projects, ...applications].map((item) => <article className="gallery-card" key={item.title}><img src={item.image} alt={item.title} /><h3>{item.title}</h3></article>)}</div></section>
    </>
  );
}

function Careers() {
  return (
    <>
      <HeadMeta title="Careers | Rigweda Technologies" description="Join Rigweda Technologies across web development, UI UX design, digital marketing, AI, cloud, data, and project delivery roles." keywords="Rigweda careers, IT jobs, web developer jobs, digital marketing careers" path="/careers" />
      <Hero eyebrow="Careers" title="Build digital products with craft." text="Rigweda looks for people who care about clean execution, useful design, reliable engineering, and measurable customer outcomes." visual="enterprise" action="Send Profile" actionTo="/contactus" image={undefined} />
      <section className="section"><div className="rich-grid">{['Frontend Developer', 'UI/UX Designer', 'Digital Marketing Executive', 'Cloud & DevOps Associate', 'Data Analyst', 'Project Coordinator'].map((role) => <article className="rich-card" key={role}><h3>{role}</h3><p>Work on real websites, applications, dashboards, campaigns, and automation systems with a quality-first team.</p><Link to="/contactus">Apply now</Link></article>)}</div></section>
    </>
  );
}

function Blog() {
  return <><HeadMeta title="Blog | Rigweda Technologies" description="Insights from Rigweda Technologies on web development, SEO, applications, AI automation, cloud, cybersecurity, and digital growth." keywords="Rigweda blog, IT blog, web development insights" path="/blog" /><Hero eyebrow="Blog" title="Ideas for smarter digital decisions." text="Practical articles and explainers for business owners planning websites, apps, automation, SEO, and secure infrastructure." visual="cms" image={undefined} /><section className="section"><div className="rich-grid">{['How SEO-ready websites are planned', 'When a business needs a custom application', 'Why cloud maintenance matters'].map((title) => <article className="rich-card" key={title}><h3>{title}</h3><p>Rigweda perspective on building digital systems with clarity, trust, and measurable value.</p></article>)}</div></section></>;
}

// import { useEffect } from 'react';
function Contact() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToContactForm = () => {
    const el = document.getElementById('contact-form');
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!el) return;

    const headerOffset = (header?.offsetHeight ?? 0) + 28;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.hash === '#contact-form') {
      window.setTimeout(scrollToContactForm, 150);
    }
  }, [location.hash]);

  const submitEnquiry = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = cleanFormValue(data.get('name'));
    const email = cleanFormValue(data.get('email')).toLowerCase();
    const phone = cleanFormValue(data.get('phone'));
    const need = cleanFormValue(data.get('need'));
    const message = cleanFormValue(data.get('message'));
    const errors = {};

    if (!/^[A-Za-z][A-Za-z .'-]{1,79}$/.test(name)) {
      errors.name = 'Enter a real name using letters, spaces, apostrophes, hyphens, or dots.';
    }

    if (!isValidEmail(email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!isValidPhone(phone)) {
      errors.phone = 'Enter a valid phone number with 8 to 15 digits.';
    }

    if (!enquiryNeeds.includes(need)) {
      errors.need = 'Select a valid project need.';
    }

    if (message.length < 20 || message.length > 1000) {
      errors.message = 'Share a project brief between 20 and 1000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus('');
      form.reportValidity();
      return;
    }

    setFormErrors({});
    setSubmitStatus('');
    setIsSubmitting(true);

    try {
      await sendEmailJsEnquiry({
        from_name: name,
        from_email: email,
        phone,
        project_need: need,
        message,
        subject: `Project enquiry from ${name}`,
        submitted_at: new Date().toISOString()
      });
      form.reset();
      navigate('/thank-you');
    } catch (error) {
      setSubmitStatus(error instanceof Error ? error.message : 'Could not send the enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeadMeta title="Contact Rigweda Technologies | Start Your IT Project" description="Contact Rigweda Technologies for websites, apps, applications, AI, cloud, data, SEO, digital marketing, cybersecurity, and IT consulting." keywords="contact Rigweda Technologies, IT project enquiry, website quote, app quote" path="/contactus" />
      <Hero eyebrow="Contact" title="Let’s shape your next digital move." text="Tell us what you want to build, improve, automate, or market. Rigweda can plan the roadmap and deliver the system." visual="strategy" action="View Services" image={undefined} />
      <section className="section contact"><div><p className="section-kicker">Start a Conversation</p><h2>Send a project enquiry.</h2><p>Use this form for websites, apps, ecommerce, AI automation, data dashboards, SEO, campaigns, cloud, or security support.</p></div><form id="contact-form" className="contact-form" onSubmit={submitEnquiry} noValidate><label>Name<input name="name" placeholder="Your name" autoComplete="name" minLength={2} maxLength={80} pattern="[A-Za-z][A-Za-z .'-]{1,79}" aria-invalid={Boolean(formErrors.name)} required />{formErrors.name && <span className="field-error">{formErrors.name}</span>}</label><label>Email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={120} aria-invalid={Boolean(formErrors.email)} required />{formErrors.email && <span className="field-error">{formErrors.email}</span>}</label><label>Phone Number<input name="phone" type="tel" inputMode="tel" placeholder="+91 98765 43210" autoComplete="tel" minLength={8} maxLength={20} pattern="[+]?[0-9\\s()\\-]{8,20}" aria-invalid={Boolean(formErrors.phone)} required />{formErrors.phone && <span className="field-error">{formErrors.phone}</span>}</label><label>Project Need<select name="need" aria-invalid={Boolean(formErrors.need)} required>{enquiryNeeds.map((need) => <option key={need}>{need}</option>)}</select>{formErrors.need && <span className="field-error">{formErrors.need}</span>}</label><label>Message<textarea name="message" rows={5} placeholder="Share a short project brief" minLength={20} maxLength={1000} aria-invalid={Boolean(formErrors.message)} required />{formErrors.message && <span className="field-error">{formErrors.message}</span>}</label>{submitStatus && <p className="form-status" role="alert">{submitStatus}</p>}<button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</button></form></section>
    </>
  );
}

function SimplePage({ kind }) {
  const map = {
    'privacy-policy': ['Privacy Policy', 'Rigweda handles enquiry data, project communication, and business information with care and practical safeguards.', 'security'],
    'thank-you': ['Thank You', 'Your enquiry has been noted. Rigweda Technologies will review the project context and respond with the next step.', 'strategy']
  };
  const [title, text, visual] = map[kind] ?? map['thank-you'];
  return <><HeadMeta title={`${title} | Rigweda Technologies`} description={text} keywords={`${title}, Rigweda Technologies`} path={`/${kind}`} /><Hero eyebrow={title} title={title} text={text} visual={visual} action="Back Home" actionTo="/" image={undefined} /></>;
}

function Footer() {
  const quickLinks = [
    ['Home', '/'],
    ['About Us', '/aboutus'],
    ['Services', '/services'],
    ['Portfolio', '/portfolio'],
    ['Contact Us', '/contactus'],
    ['Blog', '/blog'],
    ['Careers', '/careers'],
    ['Privacy Policy', '/privacy-policy']
  ];
  const footerServices = [
    ['Web Development', '/web-development'],
    ['Mobile Apps', '/mobile-development'],
    ['Digital Marketing', '/digital-marketing'],
    ['Data Services', '/data-services'],
    ['Data Analytics', '/data-analytics'],
    ['Database Maintenance', '/database-maintenance'],
    ['Retail Services', '/retail-services']
  ];
  const socialLinks = [
    ['mail', 'Email', 'mailto:sales@rigweda.com'],
    ['call', 'Call', 'tel:+917989676809'],
    ['wa', 'WhatsApp', 'https://wa.me/917989676809']
  ];

  return (
    <footer className="site-footer">
      <section className="footer-cta">
        <div>
          <h2>Want to discuss a new project?</h2>
          <p>Thanks for getting in touch. Let's discuss your project.</p>
        </div>
        <Link className="footer-cta-link" to="/contactus#contact-form">Contact Us</Link>
      </section>
      <div className="footer-grid">
        <div className="footer-about">
          <Link className="footer-brand" to="/" aria-label="Rigweda Technologies home"><img src={logoLockup} alt="" /></Link>
          <p>Rigweda Technologies delivers UI/UX design, web and mobile application development, digital marketing, cloud, and security services across India and globally.</p>
          <div className="footer-socials">
            {socialLinks.map(([short, label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>{short}</a>)}
          </div>
        </div>
        <nav className="footer-column" aria-label="Footer quick links">
          <h3>Quick Links</h3>
          {quickLinks.map(([label, path]) => <Link key={label} to={path}>{label}</Link>)}
        </nav>
        <nav className="footer-column" aria-label="Footer services">
          <h3>Services</h3>
          {footerServices.map(([label, path]) => <Link key={label} to={path}>{label}</Link>)}
        </nav>
        <address className="footer-column footer-contact">
          <h3>Contact Us</h3>
          <div><span>Phone</span><a href="tel:+917989676809">+91 7989676809</a></div>
          <div><span>Email</span><a href="mailto:sales@rigweda.com">sales@rigweda.com</a></div>
          <div><span>Address</span><a href="https://maps.app.goo.gl/EDpHMEyHhx76gvW26" target="_blank" rel="noreferrer">Flat No: 202, Anasuyaa Nilayam, Plot No: 10, Vivekananda Nagar Colony, Kukatpally, Hyderabad - 500072</a></div>
          <div><span>Remote</span><p>Remote Services Worldwide</p></div>
        </address>
      </div>
      <p className="footer-bottom">© {new Date().getFullYear()} Rigweda Technologies. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SceneBackground />
      <Navigation />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
