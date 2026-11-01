import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as THREE from 'three';
import './styles.css';

const logoLockup = '/assets/rigweda-logo.png';

const renderImages = {
  website: '/renders/webapplication.png',
  interface: '/renders/uiux-3d%20(2).png',
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
  { slug: 'ai-services', title: 'AI Development Services', group: 'Software Development', visual: 'ai', keywords: 'AI development services, AI automation', summary: 'AI assistants and automations that reduce repetitive work, improve response time, and make knowledge easier to use.', bullets: ['Chatbots and internal knowledge assistants', 'Document and workflow automation', 'AI integrations with business systems'] }
];

const serviceArtwork = {
  'ui-ux-solutions': '/renders/uiux-3d%20(2).png',
  webdesign: '/renders/web-design.png',
  'web-development': '/renders/webapplication.png',
  'wordpress-development': '/renders/wordpressdevelopment.png',
  'ecommerce-development': '/renders/ecommerce.png',
  'digital-marketing': '/renders/digitalmarketing.png',
  'seo-services': '/renders/seo.png',
  'smm-services': '/renders/smm.png',
  'ppc-services': '/renders/ppc.png',
  'software-development': '/renders/software-development.png',
  'powerbi-services': '/renders/powerbi.png',
  'ai-services': '/renders/ai-servicedesk.png'
};

const applications = [
  { title: 'Retail Commerce Application', visual: 'commerce', image: '/renders/retail-commerce.png', text: 'Customer app, catalog, checkout, loyalty, admin panel, and analytics for retail teams.' },
  { title: 'Operations Dashboard', visual: 'analytics', image: '/renders/operation-dashboard.png', text: 'Role-based dashboards for tracking leads, inventory, tasks, sales, and support workflows.' },
  { title: 'AI Service Desk', visual: 'ai', image: '/renders/ai-servicedesk.png', text: 'Knowledge assistant for customer questions, internal SOPs, document lookup, and escalation.' },
  { title: 'Marketing Intelligence Hub', visual: 'seo', image: '/renders/marketing-intelligence.png', text: 'SEO, campaign, enquiry, and conversion reporting in one growth workspace.' }
];

const serviceGroups = [
  { name: 'UI/UX Solutions', path: '/ui-ux-solutions' },
  { name: 'Web Design', path: '/webdesign' },
  { name: 'Web Application Development', path: '/web-development', submenu: ['wordpress-development', 'ecommerce-development'] },
  { name: 'Digital Marketing', path: '/digital-marketing', submenu: ['seo-services', 'smm-services', 'ppc-services'] },
  { name: 'Software Development', path: '/software-development', submenu: ['powerbi-services', 'ai-services'] }
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
  const location = useLocation();

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
    const ring = location.pathname === '/web-development' ? null : new THREE.Mesh(new THREE.TorusGeometry(3.35, 0.022, 10, 160), new THREE.MeshBasicMaterial({ color: '#48d8ff', transparent: true, opacity: 0.18 }));
    if (ring) {
      ring.rotation.x = 1.2;
      ring.rotation.y = 0.55;
      group.add(ring);
    }
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
      if (ring) ring.rotation.z = tick * 0.16;
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
  }, [location.pathname]);

  return <canvas id="rigweda-field" aria-hidden="true" />;
}

function PageEffects({ routeKey = '' }) {
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll(
        '.hero-copy, .hero-launch-panel, .visual3d, .trust-strip, .section-heading, .service-card, .rich-card, .application-card, .project-card, .gallery-card, .content-block, .rich-list li, .contact-form, .team-heading-copy, .team-orbit-graphic, .team-card, .team-section .center-action'
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
        <Route path="/ui-ux-solutions" element={<UiUxSolutionsPage />} />
        <Route path="/web-development" element={<WebApplicationDevelopmentPage />} />
        <Route path="/wordpress-development" element={<WordPressDevelopmentPage />} />
        <Route path="/ecommerce-development" element={<EcommerceDevelopmentPage />} />
        <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
        <Route path="/seo-services" element={<SeoServicesPage />} />
        <Route path="/smm-services" element={<SocialMediaMarketingPage />} />
        <Route path="/ppc-services" element={<PpcServicesPage />} />
        <Route path="/software-development" element={<SoftwareDevelopmentPage />} />
        <Route path="/powerbi-services" element={<PowerBiServicesPage />} />
        <Route path="/ai-services" element={<AiDevelopmentServicesPage />} />
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
    if (!open || !window.matchMedia('(max-width: 680px)').matches) return undefined;

    window.scrollTo({ top: 0, behavior: 'instant' });
    const nav = document.querySelector<HTMLElement>('.nav-links');
    if (nav) nav.scrollTop = 0;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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
        <div className="nav-dropdown" onMouseEnter={() => { if (window.matchMedia('(min-width: 1241px)').matches) setServicesOpen(true); }} onMouseLeave={() => { if (window.matchMedia('(min-width: 1241px)').matches) setServicesOpen(false); }}>
          <div className="services-nav-row">
            <NavLink to="/services">Services</NavLink>
            <button className="services-menu-toggle" type="button" aria-label="Toggle services menu" aria-expanded={servicesOpen} onClick={() => setServicesOpen((value) => !value)}>{servicesOpen ? '−' : '+'}</button>
          </div>
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

function Hero({ eyebrow, title, text, action = 'Explore Services', actionTo = '/services', secondaryAction = 'View Projects', secondaryTo = '/portfolio', visual = 'website', image, featured = false, pageClass = '' }) {
  // If the action is for contact, append #contact-form to scroll to form
  let actionToFinal = actionTo;
  if (typeof actionTo === 'string' && actionTo.match(/contact(us)?$/i)) {
    actionToFinal = actionTo + '#contact-form';
  }
  return (
    <section className={`hero ${pageClass}`}>
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lede">{text}</p>
        <div className="hero-actions"><Link className="primary-action" to={actionToFinal}>{action}</Link><Link className="secondary-action" to={secondaryTo}>{secondaryAction}</Link></div>
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

function TeamSection() {
  const teamAreas = [
    { name: 'Lokesh Reddy', role: 'UI Developer' },
    { name: 'Sravani', role: 'Full Stack Developer' },
    { name: 'Srinivas', role: 'Digital Marketing' },
    { name: 'Sowmya', role: 'Backend Developer' },
    { name: 'Chaitanya', role: 'Full Stack Developer' },
    { name: 'Pavan', role: 'Designer' },
    { name: 'Sivaramakrishna', role: 'Full Stack Developer' },
  ];

  return (
    <section className="section team-section">
      <div className="team-showcase-heading">
        <div className="team-heading-copy">
          <p className="team-showcase-kicker"><span /> MEET OUR TEAM</p>
          <h2>Meet <span>Our Team</span></h2>
          <p>A passionate team of professionals dedicated to delivering innovative IT solutions.</p>
        </div>
        <TeamOrbitGraphic />
      </div>
      <div className="team-grid">{teamAreas.map((member) => <article className="team-card" key={member.name}>
        <div className="team-info"><h3>{member.name}</h3><span className="team-role">{member.role}</span></div>
        <span className="team-card-arrow" aria-hidden="true">→</span>
      </article>)}</div>
      <div className="center-action"><Link className="primary-action" to="/careers">Join Our Team <span aria-hidden="true">→</span></Link></div>
    </section>
  );
}

function TeamOrbitGraphic() {
  return (
    <div className="team-orbit-graphic" role="img" aria-label="Illustration of a connected team">
      <svg viewBox="0 0 360 220" fill="none" aria-hidden="true">
        <defs><linearGradient id="team-people-fill" x1="80" y1="62" x2="280" y2="194" gradientUnits="userSpaceOnUse"><stop stopColor="#12B8E8"/><stop offset="1" stopColor="#087FF5"/></linearGradient></defs>
        <circle cx="180" cy="112" r="94" fill="#12B8E8" fillOpacity=".08"/>
        <path d="M43 125c31-81 97-115 178-98 44 9 79 37 97 73" stroke="#76DFF8" strokeOpacity=".42" strokeWidth="2"/>
        <path d="M57 151c41 48 112 63 177 36 29-12 51-31 67-54" stroke="#12B8E8" strokeOpacity=".4" strokeWidth="2"/>
        <g fill="url(#team-people-fill)">
          <circle cx="180" cy="65" r="25"/><path d="M132 142c0-26 21-47 48-47s48 21 48 47v28h-96v-28Z"/>
          <circle cx="94" cy="91" r="18"/><path d="M61 151c0-20 15-36 34-36 13 0 25 8 30 20-6 10-10 22-10 36v4H61v-24Z"/>
          <circle cx="266" cy="91" r="18"/><path d="M235 135c5-12 17-20 30-20 19 0 34 16 34 36v24h-54v-4c0-14-4-26-10-36Z"/>
          <circle cx="49" cy="120" r="13" fillOpacity=".78"/><path d="M27 163c0-13 10-23 22-23 9 0 16 5 20 13-4 7-6 15-6 24v3H27v-17Z" fillOpacity=".78"/>
          <circle cx="311" cy="120" r="13" fillOpacity=".78"/><path d="M291 153c4-8 11-13 20-13 12 0 22 10 22 23v17h-36v-3c0-9-2-17-6-24Z" fillOpacity=".78"/>
        </g>
        <path d="M58 176c63 33 178 34 246-2" stroke="#39C8F0" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      <HeadMeta title="Rigweda Technologies | IT Services, Applications, Web, AI & Cloud" description="Rigweda Technologies builds SEO-friendly websites, applications, mobile apps, AI automation, cloud systems, data analytics, cybersecurity, and digital marketing engines." keywords="Rigweda Technologies, IT services, web development, applications, mobile app development, AI automation" />
      <Hero eyebrow="Innovate • Integrate • Inspire" title="Your digital systems, elevated in 3D." text="Rigweda Technologies designs websites, applications, mobile apps, AI tools, cloud platforms, and growth systems with a polished glass-cloud digital presence." visual="website" image="/renders/herosecimg.png" featured />
      <section className="home-about" aria-labelledby="home-about-title">
        <div className="home-about-copy">
          <p className="home-about-eyebrow">ABOUT RIGWEDA</p>
          <h2 id="home-about-title">Turning Ideas Into<br /><span>Digital Reality</span></h2>
          <p>Rigweda Technologies is a technology-driven company focused on building modern digital solutions that help businesses grow, adapt, and stay ahead in a rapidly evolving digital world.</p>
          <p>From high-performance websites and custom applications to AI-powered solutions, cloud technologies, and digital growth strategies, we combine technology, creativity, and business understanding to turn ideas into impactful digital experiences.</p>
          <blockquote>Our approach is simple — understand the problem, build the right solution, and create technology that delivers real value.</blockquote>
          <Link className="home-about-action" to="/aboutus">Learn More <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-about-visual" aria-label="Rigweda digital workspace">
          <div className="home-about-glow" />
          <img src="/renders/home-aboutsec.png" alt="Digital workspace with technology solutions and business growth" />
          <div className="home-about-card home-about-card-one"><span className="about-card-icon">✦</span>Innovative Solutions</div>
          <div className="home-about-card home-about-card-two"><span className="about-card-icon">↗</span>Scalable Technology</div>
          <div className="home-about-card home-about-card-three"><span className="about-card-icon">◎</span>Business-Focused Approach</div>
        </div>
      </section>
      <section className="trust-strip"><span>SEO-ready websites</span><span>Applications</span><span>Mobile apps</span><span>AI automation</span><span>Cloud & security</span><span>Portfolio-proven delivery</span></section>
      <section className="services-showcase services-home">
        <section className="services-intro">
          <div className="services-intro-copy">
            <p className="services-kicker">OUR SERVICES <span /></p>
            <h1>Digital solutions<br />for business <span>growth.</span></h1>
            <p className="services-intro-lede">Design, development, and marketing to move your business forward.</p>
            <Link className="services-cta" to="#home-services-catalog">Explore All Services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="services-intro-art" aria-label="Digital workspace illustration">
            <img src="/renders/our-services.png" alt="Digital services workspace illustration" loading="lazy" />
          </div>
        </section>
        <ServiceShowcaseCards id="home-services-catalog" />
        <div className="services-more-link"><Link className="services-cta" to="/services">Explore All Services <span aria-hidden="true">→</span></Link></div>
        <ServicesPromises />
      </section>
      <ProjectsSection limit={4} />
      <TeamSection />
      <ApplicationsSection compact />
    </div>
  );
}

function ServiceCard({ service }) {
  const serviceImage = serviceArtwork[service.slug] ?? renderImages[service.visual] ?? renderImages.website;
  return (
    <article className="related-service-card">
      <div className={`related-service-art visual-${service.visual}`}><img src={serviceImage} alt="" loading="lazy" /><span className="related-art-orbit" aria-hidden="true" /></div>
      <div className="related-service-copy"><p className="related-service-group">{service.group}</p><h3>{service.title}</h3><p className="related-service-summary">{service.summary}</p><Link to={`/${service.slug}`}>Explore service <span aria-hidden="true">↗</span></Link></div>
    </article>
  );
}

function ServicesPage() {
  return (
    <>
      <HeadMeta title="Our Services | Rigweda Technologies" description="Explore Rigweda Technologies services: UI/UX, web design and development, WordPress, ecommerce, digital marketing, SEO, SMM, PPC, software, Power BI, and AI development." keywords="UI UX, web design, web development, WordPress, ecommerce, digital marketing, SEO, SMM, PPC, Power BI, AI development" path="/services" />
      <div className="services-showcase">
        <section className="services-intro">
          <div className="services-intro-copy">
            <p className="services-kicker">OUR SERVICES <span /></p>
            <h1>Digital solutions<br />for business <span>growth.</span></h1>
            <p className="services-intro-lede">Design, development, and marketing to move your business forward.</p>
            <Link className="services-cta" to="#all-services">Explore All Services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="services-intro-art" aria-label="Digital workspace illustration">
            {/* <img src="/renders/herosecimg.png" alt="Laptop and connected digital workspace" /> */}
          </div>
        </section>
        <ServiceShowcaseCards id="all-services" />
        <ServicesPromises />
      </div>
    </>
  );
}

const featuredServiceCards = [
  { slug: 'ui-ux-solutions', title: 'UI/UX Solutions', icon: 'pen', description: 'User-focused designs that create meaningful experiences.' },
  { slug: 'webdesign', title: 'Web Design', icon: 'layout', description: 'Modern, responsive websites shaped around your brand.' },
  { slug: 'web-development', title: 'Web Application Development', icon: 'code', description: 'Scalable and secure web applications for your business.' },
  { slug: 'applications', title: 'Mobile App Development', icon: 'smartphone', description: 'High-performance mobile apps for iOS and Android.' },
  { slug: 'wordpress-development', title: 'WordPress Development', icon: 'layers', description: 'Custom and SEO-friendly WordPress websites.' },
  { slug: 'ecommerce-development', title: 'Ecommerce Development', icon: 'cart', description: 'Online stores that deliver a seamless shopping experience.' },
  { slug: 'digital-marketing', title: 'Digital Marketing', icon: 'megaphone', description: 'Data-driven strategies to grow your brand.' },
  { slug: 'seo-services', title: 'SEO Services', icon: 'chart', description: 'Improve rankings and drive quality organic traffic.' },
  { slug: 'smm-services', title: 'Social Media Marketing', icon: 'users', description: 'Build brand visibility and connect with your audience.' },
  { slug: 'ppc-services', title: 'PPC Advertising', icon: 'target', description: 'Reach the right customers with measurable paid campaigns.' },
  { slug: 'software-development', title: 'Software Development', icon: 'plug', description: 'Custom software that supports your business workflows.' },
  { slug: 'ai-services', title: 'AI Development Services', icon: 'spark', description: 'Practical AI tools and automation for everyday work.' }
];

function ServiceShowcaseCards({ id }) {
  return (
    <section className="services-catalog" id={id} aria-label="All services">
      {featuredServiceCards.map((service) => (
        <article className="showcase-service-card" key={service.slug}>
          <div className="showcase-service-icon" aria-hidden="true"><AboutIcon name={service.icon} /></div>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <Link className="showcase-service-arrow" to={service.slug === 'applications' ? '/applications' : `/${service.slug}`} aria-label={`Explore ${service.title}`}><span aria-hidden="true">↗</span></Link>
        </article>
      ))}
    </section>
  );
}

function ServicesPromises() {
  return (
    <section className="services-promises" aria-label="Why work with Rigweda">
      <article><span className="promise-icon">✓</span><div><h3>Trusted by growing businesses</h3><p>Practical digital solutions for teams at every stage.</p></div></article>
      <article><span className="promise-icon">⌁</span><div><h3>Secure and reliable</h3><p>Thoughtful delivery with privacy and quality in mind.</p></div></article>
      <article><span className="promise-icon">◎</span><div><h3>Expert support</h3><p>Real people to help you plan, launch, and improve.</p></div></article>
      <article><span className="promise-icon">↗</span><div><h3>Ready to scale</h3><p>Technology that can grow along with your business.</p></div></article>
    </section>
  );
}

function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug) ?? services[0];
  const related = services.filter((item) => item.group === service.group && item.slug !== service.slug).slice(0, 3);
  const isWebDesign = slug === 'webdesign';
  const designTypes = [
    ['01', 'Business websites', 'A clear, credible presence that explains what you do and guides visitors to the right next step.'],
    ['02', 'Landing pages', 'Focused pages for campaigns, launches, and services with a strong message and one clear action.'],
    ['03', 'Product experiences', 'Interfaces for apps, portals, and dashboards shaped around real users and everyday tasks.'],
    ['04', 'Ecommerce storefronts', 'Product discovery and shopping journeys designed to make browsing and checkout feel simple.']
  ];
  const designProcess = [
    ['Discover', 'Align on your audience, business goals, content, and what success should look like.'],
    ['Plan', 'Shape the site map and page structure around the questions visitors need answered.'],
    ['Design', 'Create the visual system and responsive page layouts for desktop, tablet, and mobile.'],
    ['Handoff', 'Prepare design files, interaction notes, and assets so development can move forward smoothly.']
  ];
  return (
    <>
      <HeadMeta title={`${service.title} | Rigweda Technologies`} description={`${service.summary} Rigweda Technologies delivers professional ${service.title.toLowerCase()} for businesses that need reliable digital outcomes.`} keywords={service.keywords} path={`/${service.slug}`} />
      <Hero eyebrow={service.group} title={service.title} text={service.summary} visual={service.visual} action="Request Consultation" actionTo="/contactus" image={service.slug === 'ai-services' ? '/renders/ai-development.png' : undefined} />
      <section className="section split">
        <div className="content-block"><p className="section-kicker">Professional Delivery</p><h2>Built with clarity, performance, and long-term value.</h2><p>{service.summary} We shape each engagement around the business goal, the user journey, the technology stack, and the measurable result expected after launch.</p><p>Every Rigweda service page is designed to be SEO-friendly and customer-friendly: clear title, useful content, structured sections, internal links, and visible proof through projects and applications.</p></div>
        <ul className="rich-list">{service.bullets.map((bullet) => <li key={bullet}><strong>{bullet}</strong><p>Planned with practical implementation steps, clean communication, and maintainable delivery.</p></li>)}</ul>
      </section>
      {isWebDesign && <>
        <section className="webdesign-types-section section" aria-labelledby="webdesign-types-title">
          <div className="webdesign-section-heading"><p className="section-kicker">Design for the way you work</p><h2 id="webdesign-types-title">The right experience for <span>every kind of website.</span></h2><p>Start with the pages your audience needs, then build a consistent experience around your brand and goals.</p></div>
          <div className="webdesign-types-grid">{designTypes.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>
        <section className="webdesign-principles-section section" aria-labelledby="webdesign-principles-title">
          <div><p className="section-kicker">What good web design supports</p><h2 id="webdesign-principles-title">Make every visit feel <span>clear and useful.</span></h2><p>Strong design brings content, visual hierarchy, and interaction together, so visitors can understand your offer and move forward with confidence.</p></div>
          <ul>{['Responsive layouts that work across screen sizes', 'Accessible color, type, navigation, and focus states', 'Clear calls to action and conversion paths', 'Search-friendly page structure and content hierarchy', 'Consistent brand patterns and reusable components', 'Performance-aware image and interface choices'].map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
        </section>
        <section className="webdesign-process-section section" aria-labelledby="webdesign-process-title">
          <div className="webdesign-section-heading"><p className="section-kicker">From brief to build-ready</p><h2 id="webdesign-process-title">A collaborative design process, <span>step by step.</span></h2><p>Review the direction early and keep decisions connected to your users, content, and development plan.</p></div>
          <div className="webdesign-process-grid">{designProcess.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>
        <section className="webdesign-faq-section section" aria-labelledby="webdesign-faq-title">
          <div className="webdesign-section-heading"><p className="section-kicker">Web design FAQs</p><h2 id="webdesign-faq-title">A few things teams <span>often ask.</span></h2></div>
          <div className="webdesign-faq-list"><details><summary>Can you redesign our existing website?<span aria-hidden="true">+</span></summary><p>Yes. We can review your current pages, identify usability and content gaps, and plan a redesign around the highest-priority journeys.</p></details><details><summary>Will the design work on mobile?<span aria-hidden="true">+</span></summary><p>Yes. Responsive behavior is considered throughout the design so layouts and interactions adapt to mobile, tablet, and desktop.</p></details><details><summary>Can you work with our development team?<span aria-hidden="true">+</span></summary><p>Yes. We prepare organized design files and handoff notes, and can collaborate with your developers as the site is built.</p></details></div>
        </section>
        <section className="webdesign-cta"><div><p className="section-kicker">Ready to improve your website?</p><h2>Let’s shape a clearer digital experience.</h2><p>Tell us what your website needs to do and who it needs to serve.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss your website <span aria-hidden="true">→</span></Link></section>
      </>}
      <section className="related-services-section section compact"><SectionHeading kicker="Related Capabilities" title="Connected services for stronger outcomes." text="Most projects need more than one service. Rigweda connects the surrounding pieces so the final result feels complete." /><div className="related-services-grid">{related.map((item) => <ServiceCard key={item.slug} service={item} />)}</div><Link className="related-services-more" to="/services">Explore all services <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}

function UiUxSolutionsPage() {
  const capabilities = [
    ['01', 'UX research & journeys', 'Clarify user needs, map key tasks, and identify friction in the current experience.'],
    ['02', 'Information architecture', 'Organize content and navigation so people can find the next step without guesswork.'],
    ['03', 'UI & interaction design', 'Design responsive screens, meaningful states, and interactions for web and mobile products.'],
    ['04', 'Design systems & handoff', 'Create reusable patterns and clear design notes that help teams build consistently.']
  ];
  const process = [
    ['Discover', 'Align on business goals, users, constraints, and the main tasks the product must support.'],
    ['Structure', 'Prioritize content and map the core journeys before moving into detailed screens.'],
    ['Prototype', 'Explore visual directions and connect key screens into a prototype for review.'],
    ['Validate & hand off', 'Refine from feedback, document behavior, and prepare the agreed designs for development.']
  ];
  const deliverables = [
    'User flows and journey maps',
    'Information architecture and navigation',
    'Wireframes and responsive screen designs',
    'Clickable prototypes for key journeys',
    'Reusable components and design patterns',
    'Interaction states and developer handoff notes'
  ];
  const faqs = [
    ['Can you improve an existing product?', 'Yes. We can review the current experience, identify friction in important journeys, and prioritize a practical redesign.'],
    ['Do you design for mobile and desktop?', 'Yes. We plan responsive behavior across the screen sizes and devices that matter to your users.'],
    ['What will our team receive?', 'Deliverables are agreed at kickoff and can include flows, wireframes, interface designs, prototypes, reusable components, and handoff notes.'],
    ['Can you work with our developers?', 'Yes. We can review designs with your team, explain interaction details, and help resolve design questions during implementation.']
  ];

  return (
    <main className="uiux-page">
      <HeadMeta title="UI/UX Design Solutions | Rigweda Technologies" description="Research-led UI/UX design for websites, apps, dashboards, and digital products. Rigweda creates clear, accessible experiences centered on your users and business goals." keywords="UI UX design services, product design, user research, interface design, design systems" path="/ui-ux-solutions" />
      <Hero eyebrow="UI/UX Solutions" title={<>Design that feels <span>clear and effortless.</span></>} text="We turn complex ideas into intuitive digital experiences—designed around the people who use them and the goals your business needs to reach." visual="interface" action="Discuss Your Product" actionTo="/contactus" secondaryAction="Explore Our Approach" secondaryTo="#uiux-approach" image="/renders/uiux-3d%20(2).png" pageClass="hero-uiux" />
      <section className="uiux-intro section" aria-labelledby="uiux-intro-title">
        <div className="uiux-intro-copy"><p className="section-kicker">Designed around real tasks</p><h2 id="uiux-intro-title">Help people get where they need to go. <span>Make every screen count.</span></h2></div>
        <p>Good UI/UX starts with understanding what users need to do. We simplify important journeys, make information easier to scan, and give your product a consistent visual language across screens.</p>
      </section>
      <section className="uiux-capabilities section" aria-labelledby="uiux-capabilities-title">
        <div className="uiux-section-heading"><p className="section-kicker">What we help you solve</p><h2 id="uiux-capabilities-title">From user journey to <span>ready-to-build interface.</span></h2><p>Choose focused design support or bring us in across the full product experience.</p></div>
        <div className="uiux-capability-grid">{capabilities.map(([number, title, text]) => <article className="uiux-capability" key={number}><span className="uiux-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="uiux-deliverables section" aria-labelledby="uiux-deliverables-title">
        <div className="uiux-deliverables-copy"><p className="section-kicker">Clear, useful outputs</p><h2 id="uiux-deliverables-title">Design your team can <span>move forward with.</span></h2><p>We agree on the right scope together, then shape the deliverables around your product, timeline, and development workflow.</p></div>
        <ul className="uiux-deliverables-list">{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
      </section>
      <section className="uiux-process section" id="uiux-approach" aria-labelledby="uiux-process-title">
        <div className="uiux-section-heading"><p className="section-kicker">Our approach</p><h2 id="uiux-process-title">A clear path from <span>idea to interface.</span></h2><p>Collaborative design with regular checkpoints, so decisions stay connected to user needs and project goals.</p></div>
        <div className="uiux-process-grid">{process.map(([title, text], index) => <article className="uiux-process-step" key={title}><span className="uiux-step-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="uiux-accessibility section" aria-labelledby="uiux-accessibility-title"><div><p className="section-kicker">Usability in the details</p><h2 id="uiux-accessibility-title">Inclusive, responsive, <span>and consistent by design.</span></h2></div><p>We consider readable type, color contrast, clear focus and interaction states, touch-friendly controls, and responsive layouts as part of the design—not as finishing touches.</p></section>
      <section className="uiux-faq section" aria-labelledby="uiux-faq-title"><div className="uiux-section-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="uiux-faq-title">A few things teams <span>often ask.</span></h2></div><div className="uiux-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className="uiux-cta"><div><p className="section-kicker">Let’s make it feel right</p><h2>Ready to improve your digital experience?</h2><p>Tell us about your product, users, and what you want to make easier.</p></div><Link className="primary-action" to="/contactus#contact-form">Talk with our design team <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function WebApplicationDevelopmentPage() {
  const useCases = [
    ['Customer portals', 'Let customers manage accounts, submit requests, access documents, and follow service updates.'],
    ['Operations dashboards', 'Bring tasks, inventory, sales, support, and business activity into a role-aware workspace.'],
    ['Workflow applications', 'Coordinate approvals, assignments, notifications, and recurring processes across teams.'],
    ['Booking & service platforms', 'Manage availability, appointments, customer details, and service workflows in one place.']
  ];
  const capabilities = [
    ['Product planning', 'Define user roles, requirements, priorities, and a focused first release.'],
    ['Responsive interfaces', 'Build clear browser experiences for desktop, tablet, and mobile use.'],
    ['Application logic & data', 'Support the rules, records, and workflows your product depends on.'],
    ['Integrations', 'Connect agreed APIs and business services to reduce repeated data entry.'],
    ['Quality & performance', 'Review important flows, loading behavior, and error states before release.'],
    ['Release & handoff', 'Prepare deployment guidance and documentation for your team.']
  ];
  const stages = [
    ['Discover', 'Understand your business goals, users, current workflows, and technical constraints.'],
    ['Plan', 'Prioritize features, map the application structure, and agree on a practical delivery sequence.'],
    ['Build', 'Develop the application in reviewable increments and share progress at agreed checkpoints.'],
    ['Launch', 'Review key journeys, prepare the release, and hand over the agreed documentation.']
  ];
  const deliverables = ['Scope and feature plan', 'User roles and workflow map', 'Responsive web interface', 'Application logic and agreed integrations', 'Review and release checklist', 'Technical and user handoff notes'];
  const faqs = [
    ['What kinds of web applications can you build?', 'We work on customer portals, dashboards, workflow tools, booking systems, and other browser-based products shaped around specific business needs.'],
    ['Can the app connect to our existing software?', 'We can scope integrations with systems that provide suitable APIs or other supported connection methods. The exact approach depends on access and technical requirements.'],
    ['Can we start with a smaller first release?', 'Yes. We can prioritize essential user journeys for an initial release and plan additional features as later phases.'],
    ['Will the application work on mobile?', 'We design responsive browser interfaces for the agreed devices and screen sizes. Native iOS or Android apps are scoped separately.'],
    ['What happens after launch?', 'Post-launch support and future improvements can be planned based on your team’s needs and the project scope.']
  ];
  const related = ['ui-ux-solutions', 'software-development', 'ai-services'].map(getService).filter(Boolean);

  return (
    <main className="webdev-page web-development-page">
      <HeadMeta title="Web Application Development | Rigweda Technologies" description="Custom web application development for customer portals, dashboards, workflow tools, and service platforms. Plan, build, and grow a browser-based product around your business." keywords="web application development, custom web applications, customer portals, business dashboards, workflow applications" path="/web-development" />
      <Hero eyebrow="Web Application Development" title={<>Web applications built <span>around your business.</span></>} text="Bring customer services, team workflows, and business information together in a browser-based product designed for the way your people work." visual="website" action="Discuss Your Application" actionTo="/contactus" secondaryAction="Explore Capabilities" secondaryTo="#webdev-capabilities" image="/renders/webapplication.png" pageClass="hero-webdev" />

      <section className="webdev-intro section" aria-labelledby="webdev-intro-title"><div><p className="section-kicker">Purpose-built digital tools</p><h2 id="webdev-intro-title">Make complex workflows <span>easier to manage.</span></h2></div><p>We help turn business requirements into useful web software: clear interfaces for people, organized information for teams, and workflows that support daily operations.</p></section>

      <section className="webdev-usecases section" aria-labelledby="webdev-usecases-title"><div className="webdev-heading"><p className="section-kicker">What we build</p><h2 id="webdev-usecases-title">A web application for <span>the work you need to do.</span></h2><p>Start with one important workflow, then extend the product as your needs change.</p></div><div className="webdev-usecase-grid">{useCases.map(([title, text], index) => <article className="webdev-usecase" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-capabilities section" id="webdev-capabilities" aria-labelledby="webdev-capabilities-title"><div className="webdev-heading"><p className="section-kicker">Development capabilities</p><h2 id="webdev-capabilities-title">Plan, build, and prepare <span>for what comes next.</span></h2><p>We shape the technical work around the users, workflows, integrations, and release goals agreed for your project.</p></div><div className="webdev-capability-grid">{capabilities.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="webdev-principles section" aria-labelledby="webdev-principles-title"><div><p className="section-kicker">Built for real use</p><h2 id="webdev-principles-title">Clear experiences. <span>Dependable foundations.</span></h2></div><div className="webdev-principle-list"><article><h3>Responsive by design</h3><p>Keep important tasks usable across agreed desktop and mobile screen sizes.</p></article><article><h3>Accessible interactions</h3><p>Consider readable content, keyboard focus, contrast, and clear feedback in key flows.</p></article><article><h3>Thoughtful data handling</h3><p>Plan user roles, permissions, and data access around the needs of the application.</p></article></div></section>

      <section className="webdev-deliverables section" aria-labelledby="webdev-deliverables-title"><div><p className="section-kicker">Scope & handoff</p><h2 id="webdev-deliverables-title">Know what your team <span>will receive.</span></h2><p>Deliverables are agreed during planning and tailored to your application and release scope.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="webdev-process section" aria-labelledby="webdev-process-title"><div className="webdev-heading"><p className="section-kicker">Our process</p><h2 id="webdev-process-title">A practical route from <span>requirements to release.</span></h2><p>Regular reviews keep scope, decisions, and progress visible throughout delivery.</p></div><div className="webdev-process-grid">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-faq section" aria-labelledby="webdev-faq-title"><div className="webdev-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="webdev-faq-title">Planning an application? <span>Start with these.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Bring the right expertise together." text="Web applications often connect product design, software engineering, and automation. Explore related services for your project." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="webdev-cta"><div><p className="section-kicker">Start with your workflow</p><h2>Let’s plan a web application that fits your business.</h2><p>Share the users, tasks, and systems your product needs to support.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss your application <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function WordPressDevelopmentPage() {
  const siteTypes = [
    ['Business websites', 'Present your services, team, and business information in a clear, easy-to-manage site.'],
    ['Content & publishing', 'Organize articles, resources, and editorial content with practical publishing workflows.'],
    ['Campaign landing pages', 'Create focused pages for services, launches, and marketing campaigns.'],
    ['Online stores', 'Plan a WordPress commerce experience around product discovery, checkout, and store management.']
  ];
  const capabilities = [
    ['Theme design & customization', 'Shape page layouts and visual details around your brand and content needs.'],
    ['CMS setup', 'Configure page types, menus, editing patterns, and content structure for your team.'],
    ['Plugin & service integration', 'Select and configure agreed extensions and connect supported business services.'],
    ['Responsive implementation', 'Make core pages and interactions work across desktop, tablet, and mobile screens.'],
    ['Performance & technical SEO', 'Plan page speed, metadata, indexing basics, and clean site structure.'],
    ['Security & maintenance planning', 'Set up practical update, backup, and access practices for ongoing site care.']
  ];
  const stages = [
    ['Plan', 'Agree on audiences, page structure, content needs, functionality, and project scope.'],
    ['Design', 'Establish page layouts and visual direction before implementation.'],
    ['Build', 'Configure WordPress, implement templates, and add agreed content and integrations.'],
    ['Review & launch', 'Check responsive pages, forms, navigation, and handoff details before launch.']
  ];
  const deliverables = ['Page map and content structure', 'Custom or customized theme and templates', 'CMS editing setup', 'Responsive page implementation', 'Agreed plugins and integrations', 'Launch, backup, and maintenance guidance'];
  const faqs = [
    ['Can our team update the website after launch?', 'Yes. We can set up WordPress editing patterns for agreed page types and provide handoff guidance for routine content updates.'],
    ['Can you redesign or improve an existing WordPress site?', 'Yes. We can review the current site and scope updates to its structure, design, content management, or functionality.'],
    ['Can you migrate content from our current site?', 'Migration can be included after we review your current platform, content volume, and any special functionality.'],
    ['Will the website work on mobile?', 'We plan and review responsive layouts across the screen sizes that matter to your audience.'],
    ['Do you provide ongoing WordPress maintenance?', 'Maintenance can be scoped separately and may include updates, backups, and routine site checks based on your needs.']
  ];
  const related = ['ui-ux-solutions', 'ecommerce-development', 'seo-services'].map(getService).filter(Boolean);

  return (
    <main className="webdev-page wordpress-page">
      <HeadMeta title="WordPress Development Services | Rigweda Technologies" description="Custom WordPress website design and development for business sites, publishing, landing pages, and online stores. Get a manageable, responsive website built around your content and goals." keywords="WordPress development, WordPress website design, custom WordPress websites, WordPress CMS, WordPress maintenance" path="/wordpress-development" />
      <Hero eyebrow="WordPress Development" title={<>A WordPress website <span>built around your needs.</span></>} text="Create a polished, manageable website for your business, content, or online store—with page structure and editing workflows suited to your team." visual="cms" action="Discuss Your Website" actionTo="/contactus" secondaryAction="Explore Capabilities" secondaryTo="#wp-capabilities" image="/renders/wordpressdevelopment.png" pageClass="hero-webdev hero-wordpress" />

      <section className="webdev-intro section" aria-labelledby="wp-intro-title"><div><p className="section-kicker">A flexible content platform</p><h2 id="wp-intro-title">A site your visitors can use <span>and your team can manage.</span></h2></div><p>We organize your pages, content, and site functionality so customers can find useful information and your team can keep the website current.</p></section>

      <section className="webdev-usecases section" aria-labelledby="wp-sites-title"><div className="webdev-heading"><p className="section-kicker">WordPress for your business</p><h2 id="wp-sites-title">Build the kind of site <span>your goals call for.</span></h2><p>We plan the site structure and editing experience around your content, services, and audience.</p></div><div className="webdev-usecase-grid">{siteTypes.map(([title, text], index) => <article className="webdev-usecase" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-capabilities section" id="wp-capabilities" aria-labelledby="wp-capabilities-title"><div className="webdev-heading"><p className="section-kicker">What we can help with</p><h2 id="wp-capabilities-title">From first layout to <span>site management.</span></h2><p>Choose a complete website build or get help with specific parts of your WordPress site.</p></div><div className="webdev-capability-grid">{capabilities.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="webdev-principles section" aria-labelledby="wp-principles-title"><div><p className="section-kicker">Ready for everyday use</p><h2 id="wp-principles-title">Thoughtful setup for <span>the long run.</span></h2></div><div className="webdev-principle-list"><article><h3>Content clarity</h3><p>Use page structure and navigation that help visitors understand what you offer.</p></article><article><h3>Manageable editing</h3><p>Give your team practical editing patterns for the content they need to maintain.</p></article><article><h3>Ongoing care</h3><p>Plan updates, backups, and access practices to keep site maintenance on track.</p></article></div></section>

      <section className="webdev-deliverables section" aria-labelledby="wp-deliverables-title"><div><p className="section-kicker">Project deliverables</p><h2 id="wp-deliverables-title">A clear handoff for <span>your website team.</span></h2><p>We agree on the scope and handoff materials during planning, based on your site and functionality.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="webdev-process section" aria-labelledby="wp-process-title"><div className="webdev-heading"><p className="section-kicker">How we work</p><h2 id="wp-process-title">A steady path from <span>content plan to launch.</span></h2><p>We review the site with you at key points, so the finished pages match the agreed requirements.</p></div><div className="webdev-process-grid">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-faq section" aria-labelledby="wp-faq-title"><div className="webdev-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="wp-faq-title">WordPress project <span>questions.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Complete your website plan." text="Connect WordPress development with product design, ecommerce, or search optimization to support the goals of your site." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="webdev-cta"><div><p className="section-kicker">Let’s plan your site</p><h2>Ready for a WordPress website that fits your team?</h2><p>Tell us about your content, audience, and the work your website needs to do.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss your WordPress site <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function EcommerceDevelopmentPage() {
  const storeTypes = [
    ['New online stores', 'Build the core shopping experience, from product discovery to checkout and store operations.'],
    ['Growing product catalogs', 'Organize categories, product details, variants, and collections for easier browsing.'],
    ['Existing store improvements', 'Review customer journeys and prioritize updates to navigation, product pages, or checkout.'],
    ['Connected commerce workflows', 'Plan the relationships between orders, inventory, shipping, customer service, and marketing.']
  ];
  const capabilities = [
    ['Store experience & design', 'Shape responsive storefront pages around your brand, catalog, and shopping journeys.'],
    ['Product catalog setup', 'Organize products, categories, attributes, and variants for browsing and management.'],
    ['Cart & checkout', 'Plan a clear purchase flow and configure agreed checkout requirements.'],
    ['Payments & shipping', 'Integrate supported payment and shipping services based on your region and business needs.'],
    ['Orders & inventory', 'Set up practical workflows for order handling and stock visibility.'],
    ['Analytics & marketing setup', 'Plan tracking and search-friendly store structure to support ongoing promotion and review.']
  ];
  const stages = [
    ['Understand', 'Review your catalog, customers, operations, platform needs, and launch goals.'],
    ['Plan', 'Map store structure, purchase flows, integrations, and the content and product data required.'],
    ['Build & configure', 'Implement storefront pages, catalog structure, checkout, and agreed services.'],
    ['Review & launch', 'Check key shopping and order flows, prepare handoff, and coordinate the launch plan.']
  ];
  const deliverables = ['Store structure and shopping journeys', 'Responsive storefront pages', 'Product and category setup', 'Agreed checkout and payment integrations', 'Order and shipping workflow configuration', 'Launch and store management handoff'];
  const faqs = [
    ['Can you build a new online store or improve an existing one?', 'We can scope either a new store or improvements to an existing storefront, catalog, checkout, or operational workflow.'],
    ['Which ecommerce platform do you use?', 'Platform selection depends on your catalog, integrations, content needs, operations, and budget. We can discuss suitable options during project planning.'],
    ['Can you connect payment and shipping services?', 'We can configure supported providers based on your location, provider account, and project requirements. Provider availability and terms vary.'],
    ['Can you help with product and order setup?', 'Yes. We can plan catalog structure, product data requirements, and the workflows your team uses to manage orders. The amount of data migration is scoped separately.'],
    ['Will the store be mobile-friendly?', 'We plan responsive storefront and checkout experiences for the devices your customers use.'],
    ['Do you provide ongoing store support?', 'Ongoing updates and improvements can be planned as a separate support scope around your store and operating needs.']
  ];
  const related = ['ui-ux-solutions', 'wordpress-development', 'digital-marketing'].map(getService).filter(Boolean);

  return (
    <main className="webdev-page ecommerce-page">
      <HeadMeta title="Ecommerce Development Services | Rigweda Technologies" description="Ecommerce website design and development for online stores, product catalogs, checkout, payment and shipping integrations, and order workflows." keywords="ecommerce development, online store development, ecommerce website design, product catalog, checkout integration" path="/ecommerce-development" />
      <Hero eyebrow="Ecommerce Development" title={<>Create a better way <span>to shop online.</span></>} text="We build ecommerce experiences that help customers discover products, complete purchases, and stay connected—while giving your team practical tools to manage the store." visual="commerce" action="Plan Your Online Store" actionTo="/contactus" secondaryAction="Explore Capabilities" secondaryTo="#ecommerce-capabilities" image="/renders/ecommerce%20hero.png" pageClass="hero-webdev hero-ecommerce" />

      <section className="webdev-intro section" aria-labelledby="ecommerce-intro-title"><div><p className="section-kicker">Commerce shaped around your business</p><h2 id="ecommerce-intro-title">Connect the shopping journey <span>to the work behind it.</span></h2></div><p>Your storefront is one part of a larger operation. We plan the customer experience alongside product data, checkout, orders, and the services your business uses.</p></section>

      <section className="webdev-usecases section" aria-labelledby="ecommerce-types-title"><div className="webdev-heading"><p className="section-kicker">Store projects we support</p><h2 id="ecommerce-types-title">Build, improve, or connect <span>your online store.</span></h2><p>Start with your customers’ shopping needs and the workflows your team needs to manage.</p></div><div className="webdev-usecase-grid">{storeTypes.map(([title, text], index) => <article className="webdev-usecase" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-capabilities section" id="ecommerce-capabilities" aria-labelledby="ecommerce-capabilities-title"><div className="webdev-heading"><p className="section-kicker">Ecommerce capabilities</p><h2 id="ecommerce-capabilities-title">The key pieces of <span>a useful store.</span></h2><p>We scope features and integrations around your products, customers, region, and operations.</p></div><div className="webdev-capability-grid">{capabilities.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="webdev-principles section" aria-labelledby="ecommerce-principles-title"><div><p className="section-kicker">A store that works end to end</p><h2 id="ecommerce-principles-title">Customer journeys and <span>store operations, together.</span></h2></div><div className="webdev-principle-list"><article><h3>Easy product discovery</h3><p>Make categories, product information, and next steps clear across screens.</p></article><article><h3>Clear checkout steps</h3><p>Present cart, delivery, payment, and confirmation details in a straightforward flow.</p></article><article><h3>Manageable operations</h3><p>Consider how your team updates products, reviews orders, and handles routine store tasks.</p></article></div></section>

      <section className="webdev-deliverables section" aria-labelledby="ecommerce-deliverables-title"><div><p className="section-kicker">Scope & handoff</p><h2 id="ecommerce-deliverables-title">Know what’s included <span>in your store build.</span></h2><p>Project deliverables depend on the selected platform, catalog, integrations, and launch scope.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="webdev-process section" aria-labelledby="ecommerce-process-title"><div className="webdev-heading"><p className="section-kicker">Our process</p><h2 id="ecommerce-process-title">From product plan <span>to store launch.</span></h2><p>We review the essential shopping and management journeys at key points during delivery.</p></div><div className="webdev-process-grid">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-faq section" aria-labelledby="ecommerce-faq-title"><div className="webdev-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="ecommerce-faq-title">Planning an online store? <span>Let’s clarify the details.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Build a stronger commerce experience." text="Connect ecommerce development with user experience, content management, or digital marketing as your store needs grow." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="webdev-cta"><div><p className="section-kicker">Start with your catalog and goals</p><h2>Ready to plan your online store?</h2><p>Tell us what you sell, who you serve, and how your team manages orders today.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss your ecommerce project <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function DigitalMarketingPage() {
  const channels = [
    ['Search engine optimization', 'Improve technical foundations, page structure, and search-focused content for relevant discovery.'],
    ['Paid campaigns', 'Plan and manage paid search or social campaigns around your audience, offer, and budget.'],
    ['Social media marketing', 'Build a practical publishing and campaign approach for the channels your audience uses.'],
    ['Landing pages & analytics', 'Connect campaign messages to focused landing pages and useful conversion measurement.']
  ];
  const stages = [
    ['Understand', 'Review your business goals, audience, offer, current channels, and available performance data.'],
    ['Plan', 'Set priorities, define channel roles, and agree on campaign measures and budget boundaries.'],
    ['Launch', 'Prepare campaigns, content, landing pages, tracking, and review checkpoints.'],
    ['Learn & refine', 'Review performance with context, share findings, and adjust the next round of activity.']
  ];
  const deliverables = ['Channel and campaign plan', 'Audience and keyword priorities', 'Campaign and content schedule', 'Landing page recommendations', 'Conversion tracking plan', 'Regular performance summaries'];
  const faqs = [
    ['Which digital marketing channels do you support?', 'We support SEO, paid campaigns, social media marketing, landing pages, and performance measurement. The right mix depends on your audience and goals.'],
    ['Can you work with our existing campaigns?', 'Yes. We can review existing channel activity and identify practical improvements or a clearer plan for ongoing work.'],
    ['How soon will we see results?', 'Timing varies by channel, competition, budget, offer, and starting point. We set realistic review periods and use performance data to guide decisions; specific outcomes cannot be guaranteed.'],
    ['Do you need access to our accounts?', 'Access requirements depend on the services in scope. We agree on the platforms, permissions, and reporting setup before work begins.'],
    ['Can you help us measure leads and enquiries?', 'Yes. We can plan conversion events and reporting for agreed website actions, subject to the available analytics and account setup.']
  ];
  const related = ['seo-services', 'ppc-services', 'smm-services'].map(getService).filter(Boolean);

  return (
    <main className="webdev-page digital-marketing-page">
      <HeadMeta title="Digital Marketing Services | Rigweda Technologies" description="Digital marketing services for SEO, paid campaigns, social media, landing pages, and measurement. Plan connected campaigns around your audience and business goals." keywords="digital marketing services, SEO, PPC campaigns, social media marketing, campaign analytics" path="/digital-marketing" />
      <Hero eyebrow="Digital Marketing" title={<>Reach the right people. <span>Make every campaign count.</span></>} text="Connect search, paid campaigns, social media, and landing pages in a focused marketing plan shaped around your audience and business goals." visual="marketing" action="Plan Your Marketing" actionTo="/contactus" secondaryAction="Explore Services" secondaryTo="#digital-channels" image="/renders/digitalmarketing.png" pageClass="hero-webdev hero-digital-marketing" />

      <section className="webdev-intro section" aria-labelledby="marketing-intro-title"><div><p className="section-kicker">Marketing with a clear purpose</p><h2 id="marketing-intro-title">Bring your channels <span>together around your goals.</span></h2></div><p>Useful digital marketing starts with a clear audience, a relevant offer, and a way to understand what happens next. We connect channel activity to the customer journey and review what the data can tell us.</p></section>

      <section className="webdev-usecases section" id="digital-channels" aria-labelledby="marketing-channels-title"><div className="webdev-heading"><p className="section-kicker">Services & channels</p><h2 id="marketing-channels-title">A connected mix of <span>digital marketing support.</span></h2><p>Choose the channels that fit your audience, current priorities, and available resources.</p></div><div className="webdev-usecase-grid">{channels.map(([title, text], index) => <article className="webdev-usecase" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-capabilities section" aria-labelledby="marketing-plan-title"><div className="webdev-heading"><p className="section-kicker">From strategy to execution</p><h2 id="marketing-plan-title">Clear priorities for <span>each stage of the journey.</span></h2><p>Campaigns work best when messaging, destination pages, and measurement support one another.</p></div><div className="webdev-capability-grid"><article><span>01</span><div><h3>Audience & offer</h3><p>Clarify who you want to reach, what they need, and what action you want them to take.</p></div></article><article><span>02</span><div><h3>Channel roles</h3><p>Set the job for each channel and coordinate activity around shared campaign priorities.</p></div></article><article><span>03</span><div><h3>Campaign experience</h3><p>Keep ad, search, social, and landing page messages aligned with the intended next step.</p></div></article><article><span>04</span><div><h3>Measurement & learning</h3><p>Track agreed actions and use performance reviews to guide ongoing improvements.</p></div></article></div></section>

      <section className="webdev-principles section" aria-labelledby="marketing-measure-title"><div><p className="section-kicker">Measure what matters</p><h2 id="marketing-measure-title">Make decisions with <span>useful performance signals.</span></h2></div><div className="webdev-principle-list"><article><h3>Business-relevant measures</h3><p>Focus reporting on agreed actions such as qualified enquiries, purchases, or sign-ups.</p></article><article><h3>Channel context</h3><p>Read campaign activity alongside spend, audience, offer, seasonality, and landing page behavior.</p></article><article><h3>Clear next steps</h3><p>Summarize what is working, what needs review, and what to test or adjust next.</p></article></div></section>

      <section className="webdev-deliverables section" aria-labelledby="marketing-deliverables-title"><div><p className="section-kicker">Planning & reporting</p><h2 id="marketing-deliverables-title">Know what your <span>marketing work includes.</span></h2><p>Deliverables are agreed based on channels, campaign cadence, account access, and the scope of support.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="webdev-process section" aria-labelledby="marketing-process-title"><div className="webdev-heading"><p className="section-kicker">How we work</p><h2 id="marketing-process-title">Plan, launch, review, <span>and keep learning.</span></h2><p>Regular reviews keep the campaign direction connected to your goals and changing performance signals.</p></div><div className="webdev-process-grid">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-faq section" aria-labelledby="marketing-faq-title"><div className="webdev-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="marketing-faq-title">Digital marketing <span>questions.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section digital-marketing-related"><SectionHeading kicker="Related Capabilities" title="Connect marketing to your digital experience." text="Strong campaigns rely on a useful destination. Pair marketing support with search, product design, or website development." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="webdev-cta"><div><p className="section-kicker">Start with your audience and goals</p><h2>Let’s plan your next marketing campaign.</h2><p>Tell us who you want to reach, what you want to promote, and how you measure success today.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss digital marketing <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function SeoServicesPage() {
  const services = [
    ['Technical SEO', 'Review crawling, indexing, site structure, metadata, sitemaps, and technical issues affecting search discovery.'],
    ['On-page SEO', 'Improve page titles, headings, internal links, and content structure around the page’s purpose.'],
    ['Content & keyword planning', 'Map topics and search intent to useful pages, then identify content gaps and priorities.'],
    ['Local SEO', 'Improve local business information, location pages, and profile consistency for relevant local discovery.']
  ];
  const principles = [
    ['Make pages discoverable', 'Support clear crawling and indexing with useful structure, internal links, and technical basics.'],
    ['Serve the search intent', 'Create helpful, original page content that answers the questions visitors are trying to resolve.'],
    ['Measure meaningful progress', 'Review visibility, site visits, and agreed business actions together for context.']
  ];
  const stages = [
    ['Audit', 'Review the website, search visibility, priority pages, and current measurement setup.'],
    ['Prioritize', 'Identify issues and opportunities, then agree on work based on impact and effort.'],
    ['Improve', 'Apply the agreed technical, page, content, and local search updates.'],
    ['Review', 'Track changes over time, explain what the data shows, and plan the next improvements.']
  ];
  const deliverables = ['SEO audit findings and priorities', 'Keyword and search-intent map', 'Page title and content recommendations', 'Technical fixes and structured data scope', 'Internal link and site structure plan', 'Progress reporting and next-step recommendations'];
  const faqs = [
    ['How long does SEO take to show progress?', 'Timing depends on your site, competition, market, and the work required. SEO is ongoing, and no provider can guarantee a specific ranking or timeline.'],
    ['Can you work with our existing website?', 'Yes. We can review your current website and prioritize changes to technical setup, content, page structure, and local search presence.'],
    ['Do you support local SEO?', 'Yes. Local work can include location and service page recommendations, business profile improvements, and consistency checks for business information.'],
    ['Will you write or update website content?', 'Content planning and page recommendations can be part of the scope. Writing and publishing are agreed based on the pages and resources required.'],
    ['How do you report SEO performance?', 'Reporting can include search impressions, clicks, relevant landing page activity, and agreed enquiries or conversions, depending on measurement access and setup.']
  ];
  const related = ['digital-marketing', 'web-development', 'webdesign'].map(getService).filter(Boolean);

  return (
    <main className="webdev-page seo-page">
      <HeadMeta title="SEO Services | Rigweda Technologies" description="Technical, on-page, content, and local SEO services to improve website discoverability. Rigweda helps businesses prioritize search improvements and measure meaningful progress." keywords="SEO services, search engine optimization, technical SEO, on-page SEO, local SEO" path="/seo-services" />
      <Hero eyebrow="Search Engine Optimization" title={<>Help the right people <span>find your business.</span></>} text="Build a stronger search foundation with technical improvements, useful content, and local visibility—planned around your audience and business priorities." visual="seo" action="Discuss Your SEO Plan" actionTo="/contactus" secondaryAction="Explore SEO Services" secondaryTo="#seo-services" image="/renders/seo-hero.png" pageClass="hero-webdev hero-seo" />

      <section className="webdev-intro section" aria-labelledby="seo-intro-title"><div><p className="section-kicker">Search visibility with a purpose</p><h2 id="seo-intro-title">Help people discover <span>useful pages on your site.</span></h2></div><p>SEO brings together website structure, page content, and technical foundations. We identify practical improvements that make your pages easier to discover and more useful to visitors.</p></section>

      <section className="webdev-usecases section" id="seo-services" aria-labelledby="seo-services-title"><div className="webdev-heading"><p className="section-kicker">SEO services</p><h2 id="seo-services-title">Improve the foundations <span>behind search visibility.</span></h2><p>SEO work is prioritized for your current site, audience, market, and business goals.</p></div><div className="webdev-usecase-grid">{services.map(([title, text], index) => <article className="webdev-usecase" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-capabilities section" aria-labelledby="seo-principles-title"><div className="webdev-heading"><p className="section-kicker">A practical SEO foundation</p><h2 id="seo-principles-title">Technical clarity, helpful content, <span>measured progress.</span></h2></div><div className="webdev-principle-list">{principles.map(([title, text], index) => <article key={title}><span className="webdev-card-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-deliverables section" aria-labelledby="seo-deliverables-title"><div><p className="section-kicker">Audit to action plan</p><h2 id="seo-deliverables-title">Know what to fix <span>and what to do next.</span></h2><p>We turn findings into an ordered set of recommendations your team can review and implement.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="webdev-process section" aria-labelledby="seo-process-title"><div className="webdev-heading"><p className="section-kicker">How we work</p><h2 id="seo-process-title">A steady cycle of <span>review and improvement.</span></h2><p>SEO priorities can change as your site, market, and customer needs evolve.</p></div><div className="webdev-process-grid">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-principles section seo-measurement" aria-labelledby="seo-measurement-title"><div><p className="section-kicker">Reporting without guesswork</p><h2 id="seo-measurement-title">Understand the signals <span>behind your progress.</span></h2></div><div className="webdev-principle-list"><article><h3>Search visibility</h3><p>Review impressions, clicks, and the queries bringing visitors to priority pages.</p></article><article><h3>Landing page activity</h3><p>Understand how organic visitors interact with the pages they reach.</p></article><article><h3>Business actions</h3><p>Where measurement is configured, review relevant enquiries, purchases, or other agreed conversions.</p></article></div></section>

      <section className="webdev-faq section" aria-labelledby="seo-faq-title"><div className="webdev-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="seo-faq-title">SEO questions, <span>answered clearly.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Connect SEO with the rest of your digital experience." text="Search visibility works alongside useful websites and coordinated campaigns. Explore related services to support your next steps." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="webdev-cta"><div><p className="section-kicker">Start with an SEO review</p><h2>Let’s find the next useful improvement for your website.</h2><p>Tell us about your site, audience, and the search goals you are working toward.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss SEO services <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function SocialMediaMarketingPage() {
  const contentWork = [
    ['Brand voice & platform plan', 'Set a clear tone and decide how your brand should show up for each audience and channel.'],
    ['Content pillars', 'Choose recurring themes that balance useful information, product stories, proof, and conversation.'],
    ['Creative direction', 'Plan visual ideas and messaging for short video, carousels, stories, and other agreed formats.'],
    ['Publishing calendar', 'Create a realistic schedule with topics, formats, owners, and approval checkpoints.']
  ];
  const communityWork = [
    ['Conversation guidelines', 'Agree how the brand responds, what needs escalation, and how sensitive issues are handled.'],
    ['Audience engagement', 'Support timely, on-brand replies and meaningful participation in relevant conversations.'],
    ['Campaign coordination', 'Connect social posts to launches, events, promotions, and wider marketing activity.']
  ];
  const stages = [
    ['Listen', 'Understand your audience, brand voice, current channels, and business priorities.'],
    ['Plan', 'Choose content themes, formats, publishing cadence, and review responsibilities.'],
    ['Create & publish', 'Prepare content for review, schedule approved posts, and coordinate campaign activity.'],
    ['Engage & learn', 'Review audience response, handle agreed interactions, and improve the next content cycle.']
  ];
  const deliverables = ['Social channel and audience review', 'Brand voice and content pillars', 'Monthly or campaign content calendar', 'Post concepts and creative direction', 'Community response guidelines', 'Performance summary and next steps'];
  const faqs = [
    ['Which social channels do you manage?', 'The channel mix is selected around your audience, content resources, and goals. We agree on supported accounts and scope before work begins.'],
    ['How often will you publish?', 'Publishing cadence is planned around your goals, content capacity, and approval process. We agree on a realistic schedule rather than a fixed one-size-fits-all volume.'],
    ['Do you create the posts and visuals?', 'Creative direction and agreed post assets can be included in the scope. We confirm formats, source materials, review steps, and production needs during planning.'],
    ['Who responds to comments and messages?', 'We can define community management responsibilities and response guidelines with your team. Account access and escalation rules are agreed before engagement begins.'],
    ['How do you measure social media performance?', 'Reporting can cover reach, engagement, video or content interactions, clicks, and agreed business actions where platform and analytics data are available. We do not guarantee follower or engagement totals.']
  ];
  const related = ['digital-marketing', 'ppc-services', 'seo-services'].map(getService).filter(Boolean);

  return (
    <main className="webdev-page social-page">
      <HeadMeta title="Social Media Marketing Services | Rigweda Technologies" description="Social media strategy, content planning, creative direction, publishing, and community management tailored to your brand and audience." keywords="social media marketing services, social media management, content planning, community management, SMM" path="/smm-services" />
      <Hero eyebrow="Social Media Marketing" title={<>Give your brand a <span>meaningful voice online.</span></>} text="Build a consistent social presence with a clear brand voice, thoughtful content, and genuine audience engagement—planned around your team and goals." visual="smm" action="Plan Your Social Strategy" actionTo="/contactus" secondaryAction="Explore What We Do" secondaryTo="#social-content" image="/renders/smm-3d.png" pageClass="hero-webdev hero-social" />

      <section className="webdev-intro section" aria-labelledby="social-intro-title"><div><p className="section-kicker">More than a posting schedule</p><h2 id="social-intro-title">Create a presence people <span>recognize and return to.</span></h2></div><p>Strong social media management brings together a recognizable voice, useful content, and consistent community care. We help shape a practical system your team can sustain.</p></section>

      <section className="webdev-usecases section" id="social-content" aria-labelledby="social-content-title"><div className="webdev-heading"><p className="section-kicker">Content & publishing</p><h2 id="social-content-title">Make every post part of <span>a clear brand story.</span></h2><p>Plan a varied mix of content that reflects your brand and gives your audience a reason to pay attention.</p></div><div className="webdev-usecase-grid">{contentWork.map(([title, text], index) => <article className="webdev-usecase" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-capabilities section" aria-labelledby="social-community-title"><div className="webdev-heading"><p className="section-kicker">Community & coordination</p><h2 id="social-community-title">Support the conversations <span>around your brand.</span></h2><p>Engagement needs a clear voice, sensible boundaries, and a plan for responses that need your team’s attention.</p></div><div className="webdev-principle-list">{communityWork.map(([title, text], index) => <article key={title}><span className="webdev-card-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-principles section" aria-labelledby="social-success-title"><div><p className="section-kicker">A sustainable social system</p><h2 id="social-success-title">Consistent content, <span>without losing your voice.</span></h2></div><div className="webdev-principle-list"><article><h3>Content people value</h3><p>Balance product news with useful, relevant, and audience-centered content.</p></article><article><h3>A clear approval flow</h3><p>Set owners, review timelines, and escalation steps before content goes live.</p></article><article><h3>Learn from response</h3><p>Use audience feedback and platform insights to guide future topics and formats.</p></article></div></section>

      <section className="webdev-deliverables section" aria-labelledby="social-deliverables-title"><div><p className="section-kicker">What you can expect</p><h2 id="social-deliverables-title">A clear content rhythm <span>for your team.</span></h2><p>Deliverables are tailored to the chosen channels, publishing cadence, and creative scope.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="webdev-process section" aria-labelledby="social-process-title"><div className="webdev-heading"><p className="section-kicker">How we work</p><h2 id="social-process-title">Listen, plan, publish, <span>and stay connected.</span></h2><p>Regular reviews help keep the content relevant and the workflow manageable.</p></div><div className="webdev-process-grid">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-faq section" aria-labelledby="social-faq-title"><div className="webdev-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="social-faq-title">Social media <span>questions.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Connect social with your wider marketing." text="Bring social content together with paid campaigns, search visibility, and a consistent digital marketing plan." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="webdev-cta"><div><p className="section-kicker">Start with your audience and voice</p><h2>Let’s build a social presence that feels like your brand.</h2><p>Tell us who you want to reach, what you want to share, and how your team works today.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss social media support <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function PpcServicesPage() {
  const campaignTypes = [
    ['Paid search', 'Reach people searching for relevant products or services with carefully structured search campaigns.'],
    ['Paid social', 'Plan audience-led campaigns and creative for the social platforms that fit your goals.'],
    ['Remarketing', 'Reconnect with eligible visitors or audiences where platform policies and consent setup allow.'],
    ['Lead & sales campaigns', 'Align campaign objectives, landing pages, and conversion measurement to the action you want.']
  ];
  const campaignFoundations = [
    ['Audience & intent', 'Define who the campaign should reach and what need or action it should address.'],
    ['Budget & structure', 'Set spend boundaries and organize campaigns so performance can be reviewed clearly.'],
    ['Ads & landing pages', 'Keep ad messaging relevant to the page people reach after clicking.'],
    ['Tracking & review', 'Measure agreed actions and review spend, traffic quality, and campaign performance together.']
  ];
  const stages = [
    ['Assess', 'Review your goals, audience, offer, current accounts, landing pages, and tracking.'],
    ['Plan', 'Choose channels, campaign structure, budgets, targeting, and success measures.'],
    ['Launch', 'Prepare approved ads, configure tracking, and launch campaigns with agreed spend limits.'],
    ['Optimize', 'Review performance, identify issues, and make documented adjustments over time.']
  ];
  const deliverables = ['Account and campaign review', 'Channel, audience, and budget plan', 'Campaign and ad group structure', 'Ad copy and creative direction', 'Landing page and conversion tracking recommendations', 'Performance reporting and optimization notes'];
  const faqs = [
    ['Which paid advertising platforms do you support?', 'Platform selection depends on your audience, goals, region, and available account setup. We agree on the campaign channels during planning.'],
    ['How much should we spend on ads?', 'A suitable budget depends on your market, goals, competition, and testing needs. We discuss spend limits before launch and review pacing during campaign management.'],
    ['Is the advertising spend included in your service fee?', 'Media spend is paid to the advertising platform. Management fees and the campaign budget are scoped and agreed separately.'],
    ['Can you set up conversion tracking?', 'We can plan and configure agreed conversion events where account access, website setup, and consent requirements allow. Tracking should be reviewed before relying on campaign results.'],
    ['Can you guarantee leads or sales?', 'No. Campaign results depend on factors such as the offer, audience, competition, landing page, budget, and platform delivery. We focus on clear setup, measurement, and ongoing optimization.']
  ];
  const related = ['digital-marketing', 'seo-services', 'smm-services'].map(getService).filter(Boolean);

  return (
    <main className="webdev-page ppc-page">
      <HeadMeta title="PPC & Paid Advertising Services | Rigweda Technologies" description="PPC campaign planning and management for paid search and social advertising, including account structure, targeting, landing pages, conversion tracking, and reporting." keywords="PPC services, paid search management, paid social campaigns, conversion tracking, advertising campaign management" path="/ppc-services" />
      <Hero eyebrow="PPC & Paid Campaigns" title={<>Spend with a plan. <span>Learn from every campaign.</span></>} text="Reach relevant audiences through paid search and social campaigns, with clear budgets, focused landing pages, and measurement tied to your goals." visual="ads" action="Plan a Paid Campaign" actionTo="/contactus" secondaryAction="Explore Campaign Types" secondaryTo="#ppc-campaign-types" image="/renders/ppcimg.png" pageClass="hero-webdev hero-ppc" />

      <section className="webdev-intro section" aria-labelledby="ppc-intro-title"><div><p className="section-kicker">Paid media with clear boundaries</p><h2 id="ppc-intro-title">Connect campaign spend <span>to an intentional next step.</span></h2></div><p>Paid campaigns need a clear audience, relevant messaging, a useful destination, and dependable measurement. We plan these pieces together and review performance against agreed goals.</p></section>

      <section className="webdev-usecases section" id="ppc-campaign-types" aria-labelledby="ppc-types-title"><div className="webdev-heading"><p className="section-kicker">Campaign types</p><h2 id="ppc-types-title">Choose the right paid <span>route to your audience.</span></h2><p>Campaign mix depends on how customers discover, evaluate, and act on your offer.</p></div><div className="webdev-usecase-grid">{campaignTypes.map(([title, text], index) => <article className="webdev-usecase" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-capabilities section" aria-labelledby="ppc-foundations-title"><div className="webdev-heading"><p className="section-kicker">What goes into a campaign</p><h2 id="ppc-foundations-title">Strong foundations for <span>smarter campaign decisions.</span></h2></div><div className="webdev-capability-grid">{campaignFoundations.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="webdev-principles section" aria-labelledby="ppc-management-title"><div><p className="section-kicker">Campaign management</p><h2 id="ppc-management-title">Control spend. <span>Keep the work accountable.</span></h2></div><div className="webdev-principle-list"><article><h3>Agreed budget limits</h3><p>Set campaign spend boundaries and review pacing with your team.</p></article><article><h3>Relevant destinations</h3><p>Check that ad messages lead to useful, consistent landing page experiences.</p></article><article><h3>Transparent reporting</h3><p>Review spend, clicks, conversions, and limitations in the available data.</p></article></div></section>

      <section className="webdev-deliverables section" aria-labelledby="ppc-deliverables-title"><div><p className="section-kicker">What’s included</p><h2 id="ppc-deliverables-title">Clear setup, ownership, <span>and reporting.</span></h2><p>Scope is agreed around campaign channels, account access, creative needs, and tracking requirements.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="webdev-process section" aria-labelledby="ppc-process-title"><div className="webdev-heading"><p className="section-kicker">How we work</p><h2 id="ppc-process-title">Plan, launch, review, <span>and optimize.</span></h2><p>Regular checks keep campaigns aligned with your agreed budget and business priorities.</p></div><div className="webdev-process-grid">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="webdev-faq section" aria-labelledby="ppc-faq-title"><div className="webdev-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="ppc-faq-title">Paid campaign <span>questions.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Connect paid campaigns with the full customer journey." text="Combine PPC with search optimization, social media, and a wider digital marketing plan to support each stage of discovery and decision." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="webdev-cta"><div><p className="section-kicker">Start with your goals and budget</p><h2>Let’s plan a paid campaign with clear measures.</h2><p>Tell us who you want to reach, what action matters, and what budget boundaries you have in mind.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss PPC services <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function SoftwareDevelopmentPage() {
  const solutions = [
    ['Business workflow systems', 'Coordinate approvals, assignments, records, and recurring work across teams.'],
    ['Operations & management platforms', 'Bring business processes, role-based tools, and operational information together.'],
    ['Data & system integrations', 'Connect services and data sources around agreed workflows and reporting needs.']
  ];
  const foundations = [
    ['Architecture that fits', 'Choose a practical structure based on requirements, current systems, and future change.'],
    ['Roles & access', 'Plan user roles and permissions around the tasks and information each team needs.'],
    ['Integration boundaries', 'Define how data moves between the software and connected systems.'],
    ['Maintainable delivery', 'Keep the solution understandable with agreed documentation, review, and handoff practices.']
  ];
  const lifecycle = [
    ['Understand the operation', 'Map the business process, users, information, constraints, and desired outcomes.'],
    ['Design the solution', 'Agree on system boundaries, workflows, feature priorities, and a practical technical plan.'],
    ['Build in increments', 'Develop and review the solution in manageable stages, incorporating feedback at checkpoints.'],
    ['Prepare for ownership', 'Review the release, document key decisions, and plan support or future improvements.']
  ];
  const questions = [
    ['When is custom software a good fit?', 'It can be useful when important workflows need tailored logic, connected information, or tools that fit the way your teams operate. We can help assess scope and alternatives.'],
    ['Can you extend our existing software?', 'Potentially. We first review the current system, available interfaces, ownership, and technical constraints to understand what can be integrated or extended.'],
    ['Can the work be delivered in phases?', 'Yes. We can prioritize core workflows for an initial release and plan further capabilities in later phases.'],
    ['How are hosting and software ownership handled?', 'Hosting, access, intellectual property, and handoff arrangements are agreed as part of the project scope and contract.'],
    ['Do you support the system after launch?', 'Post-launch support and future development can be scoped based on the software and your team’s needs.']
  ];
  const related = ['web-development', 'ui-ux-solutions', 'ai-services'].map(getService).filter(Boolean);

  return (
    <main className="software-dev-page">
      <HeadMeta title="Custom Software Development | Rigweda Technologies" description="Custom software development for business workflows, operations platforms, system integrations, and data-driven tools. Plan and build software around your team and processes." keywords="software development services, custom business software, workflow automation, software integration, operations platforms" path="/software-development" />
      <Hero eyebrow="Custom Software Development" title={<>Software shaped for <span>the way your business works.</span></>} text="Design and build business software around your people, processes, and systems—with a practical plan for implementation, integration, and long-term ownership." visual="software" action="Discuss a Software Project" actionTo="/contactus" secondaryAction="See Our Approach" secondaryTo="#software-lifecycle" image="/renders/software-development-img.png" pageClass="hero-software" />

      <section className="software-dev-intro section" aria-labelledby="software-intro-title"><div><p className="section-kicker">Engineering around your operation</p><h2 id="software-intro-title">Bring important work into <span>one coherent system.</span></h2></div><p>Custom software can connect processes, people, and information that span teams. We start by understanding how the work happens, then shape the right system around the requirements that matter.</p></section>

      <section className="software-solutions section" aria-labelledby="software-solutions-title"><div className="software-heading"><div><p className="section-kicker">Where custom software helps</p><h2 id="software-solutions-title">Build systems for <span>real business operations.</span></h2></div><p>From internal tools to connected platforms, each engagement begins with a specific workflow or business need.</p></div><div className="software-solution-grid">{solutions.map(([title, text], index) => <article key={title}><span className="software-solution-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p><div className="software-solution-rule" /></article>)}</div></section>

      <section className="software-architecture section" aria-labelledby="software-architecture-title"><div className="software-architecture-copy"><p className="section-kicker">Designed to fit together</p><h2 id="software-architecture-title">A system is more than <span>its features.</span></h2><p>We plan how people, data, and connected tools work together, so technical decisions support everyday operations.</p></div><div className="software-architecture-map" aria-label="Software components connected to a shared business platform"><div className="software-node software-node-main"><span>CORE</span><strong>Business platform</strong></div><div className="software-node software-node-one"><span>01</span><strong>Team workflows</strong></div><div className="software-node software-node-two"><span>02</span><strong>Connected systems</strong></div><div className="software-node software-node-three"><span>03</span><strong>Useful reporting</strong></div><i className="software-connector software-connector-one"/><i className="software-connector software-connector-two"/><i className="software-connector software-connector-three"/></div></section>

      <section className="software-foundations section" aria-labelledby="software-foundations-title"><div className="software-heading"><p className="section-kicker">Technical foundations</p><h2 id="software-foundations-title">Make sound choices <span>for today and later.</span></h2></div><div className="software-foundation-grid">{foundations.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="software-lifecycle section" id="software-lifecycle" aria-labelledby="software-lifecycle-title"><div className="software-lifecycle-heading"><div><p className="section-kicker">Project lifecycle</p><h2 id="software-lifecycle-title">From business need <span>to dependable software.</span></h2></div><p>Frequent reviews keep every stage connected to the operation, the people using the system, and the outcomes it needs to support.</p></div><div className="software-lifecycle-list">{lifecycle.map(([title, text], index) => <article key={title}><span className="software-lifecycle-index">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="software-faq section" aria-labelledby="software-faq-title"><div className="software-heading"><p className="section-kicker">Questions before you start</p><h2 id="software-faq-title">Custom software, <span>clearly explained.</span></h2></div><div className="webdev-faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Bring design, engineering, and automation together." text="Explore connected capabilities that can support planning and building your software system." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="software-dev-cta"><div><p className="section-kicker">Start with the process</p><h2>Have a workflow your current tools can’t support?</h2><p>Tell us how the work happens today and what you want your team to do more easily.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss custom software <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function PowerBiServicesPage() {
  const dashboards = [
    ['Executive overview', 'Bring agreed business indicators into a concise view for leadership review.'],
    ['Sales & customer insights', 'Explore sales activity, customer segments, products, and pipeline measures.'],
    ['Operations & service', 'Monitor workflow volumes, delivery activity, and operational measures.'],
    ['Finance & performance', 'Organize financial and performance reporting around agreed definitions and periods.']
  ];
  const services = [
    ['Data source review', 'Understand available data sources, ownership, quality, and refresh needs.'],
    ['Data preparation & modeling', 'Shape data relationships and reusable business definitions for reporting.'],
    ['Measures & KPIs', 'Define calculations and indicators with stakeholders so reports use consistent logic.'],
    ['Report & dashboard design', 'Build readable, interactive reports that help answer specific business questions.'],
    ['Refresh & access planning', 'Plan update schedules, gateways where needed, and audience access based on your environment.'],
    ['Handoff & enablement', 'Document the report structure and help your team understand how to use and maintain it.']
  ];
  const stages = [
    ['Align on decisions', 'Identify the questions, users, and measures the reporting should support.'],
    ['Review the data', 'Assess sources, field definitions, data quality, and access constraints.'],
    ['Model & visualize', 'Build the reporting model and create report pages for agreed audiences and tasks.'],
    ['Validate & hand off', 'Check calculations with stakeholders, confirm refresh and access setup, and document the result.']
  ];
  const deliverables = ['Reporting requirements and KPI definitions', 'Data source and quality review', 'Data model and agreed calculations', 'Power BI reports and dashboards', 'Refresh and access configuration notes', 'Documentation and team handoff'];
  const faqs = [
    ['Can Power BI connect to our data sources?', 'Power BI supports many data sources, but connection options depend on your systems, permissions, network, and licensing. We review the environment before confirming scope.'],
    ['How often can the reports refresh?', 'Refresh frequency depends on data sources, gateway configuration, tenant settings, and licensing or capacity. We plan an appropriate setup for your environment.'],
    ['Can different teams see different data?', 'Access can be planned for user groups, and row-level security may be appropriate depending on your model, identities, and requirements. We validate the design with your team.'],
    ['Do we need Power BI licenses?', 'Licensing requirements depend on how reports are built, shared, and consumed in your organization. We can identify considerations, but your organization remains responsible for selecting and maintaining licenses.'],
    ['Can you improve reports we already have?', 'Yes. We can review existing reports and models, clarify definitions, and prioritize changes to usability, calculations, performance, or maintenance.']
  ];
  const related = ['software-development', 'ai-services', 'web-development'].map(getService).filter(Boolean);

  return (
    <main className="powerbi-page">
      <HeadMeta title="Power BI Services | Rigweda Technologies" description="Power BI consulting and dashboard development for data modeling, KPI reporting, business dashboards, refresh planning, and report handoff." keywords="Power BI services, Power BI dashboards, data modeling, business intelligence reporting, KPI dashboards" path="/powerbi-services" />
      <Hero eyebrow="Power BI & Business Intelligence" title={<>Turn business data into <span>clearer decisions.</span></>} text="Plan and build Power BI reports around the questions your teams need to answer, with thoughtful data modeling, consistent measures, and useful views." visual="analytics" action="Discuss Power BI" actionTo="/contactus" secondaryAction="Explore Dashboards" secondaryTo="#powerbi-dashboards" image="/renders/power-bi.png" pageClass="hero-powerbi" />

      <section className="powerbi-intro section" aria-labelledby="powerbi-intro-title"><div><p className="section-kicker">Business intelligence with context</p><h2 id="powerbi-intro-title">Make reporting easier <span>to understand and use.</span></h2></div><p>Useful dashboards start with shared definitions. We work with your team to understand the data, agree on the measures, and organize the report around real decisions.</p></section>

      <section className="powerbi-dashboards section" id="powerbi-dashboards" aria-labelledby="powerbi-dashboards-title"><div className="powerbi-heading"><p className="section-kicker">Reporting for different teams</p><h2 id="powerbi-dashboards-title">Views shaped around <span>the questions people ask.</span></h2><p>Choose a focused dashboard or connect multiple reporting needs through a shared model.</p></div><div className="powerbi-dashboard-grid">{dashboards.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true" /></article>)}</div></section>

      <section className="powerbi-services section" aria-labelledby="powerbi-services-title"><div className="powerbi-heading"><p className="section-kicker">What we can help with</p><h2 id="powerbi-services-title">From data source <span>to useful report.</span></h2></div><div className="powerbi-service-grid">{services.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="powerbi-model section" aria-labelledby="powerbi-model-title"><div className="powerbi-model-copy"><p className="section-kicker">A dependable reporting layer</p><h2 id="powerbi-model-title">Connect data to <span>shared business definitions.</span></h2><p>We plan how source data is prepared, related, and described so teams can use consistent measures across their reports.</p></div><div className="powerbi-flow" aria-label="Data sources flow into a model and then into reports"><article><span>01</span><strong>Data sources</strong><small>Business systems & files</small></article><i aria-hidden="true">→</i><article className="powerbi-flow-main"><span>02</span><strong>Shared model</strong><small>Relationships & measures</small></article><i aria-hidden="true">→</i><article><span>03</span><strong>Reports</strong><small>Views for each team</small></article></div></section>

      <section className="powerbi-governance section" aria-labelledby="powerbi-governance-title"><div><p className="section-kicker">Trust the numbers</p><h2 id="powerbi-governance-title">Clear definitions. <span>Careful access planning.</span></h2></div><div className="powerbi-governance-grid"><article><h3>Agree on KPI logic</h3><p>Document how important measures are defined, filtered, and interpreted.</p></article><article><h3>Validate the data</h3><p>Check report calculations and source data with the people who own the business process.</p></article><article><h3>Plan who can see what</h3><p>Align workspace and data access with your organization’s roles and environment.</p></article></div></section>

      <section className="powerbi-deliverables section" aria-labelledby="powerbi-deliverables-title"><div><p className="section-kicker">Project outputs</p><h2 id="powerbi-deliverables-title">Reporting your team <span>can maintain.</span></h2><p>Deliverables are set according to the data sources, audience, refresh requirements, and scope.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="powerbi-process section" aria-labelledby="powerbi-process-title"><div className="powerbi-heading"><p className="section-kicker">How we work</p><h2 id="powerbi-process-title">Start with decisions, <span>then shape the data.</span></h2><p>We validate definitions and report behavior with your stakeholders at agreed checkpoints.</p></div><div className="powerbi-process-list">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="powerbi-faq section" aria-labelledby="powerbi-faq-title"><div className="powerbi-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="powerbi-faq-title">Power BI questions, <span>answered.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Connect reporting with your systems." text="Power BI can sit alongside software, data integrations, and automation. Explore related services that may support your reporting goals." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="powerbi-cta"><div><p className="section-kicker">Start with the questions</p><h2>Let’s make your business reporting more useful.</h2><p>Tell us which decisions your teams need to make and where the supporting data lives.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss Power BI services <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

function AiDevelopmentServicesPage() {
  const useCases = [
    ['Knowledge assistants', 'Help teams find answers across approved internal documents and knowledge sources.'],
    ['Document workflows', 'Extract, classify, summarize, or route information for human review.'],
    ['Workflow copilots', 'Support staff with contextual suggestions inside agreed business processes.'],
    ['Customer support tools', 'Draft responses, organize enquiries, or direct requests to the right next step.']
  ];
  const safeguards = [
    ['Grounded information', 'Connect responses to approved sources where appropriate and make source context available for review.'],
    ['Human review', 'Keep people involved for sensitive, high-impact, or uncertain decisions.'],
    ['Access & data boundaries', 'Plan which users and systems can provide information to the solution.'],
    ['Evaluation & monitoring', 'Test representative tasks, review failure cases, and track performance after release.']
  ];
  const stages = [
    ['Select the use case', 'Define the task, users, expected value, risks, and what should remain under human control.'],
    ['Review data & systems', 'Check source quality, access, privacy requirements, and integration options.'],
    ['Prototype & evaluate', 'Build a focused version and test it against representative questions or workflows.'],
    ['Integrate & improve', 'Connect the approved solution to the workflow, document its limits, and plan ongoing review.']
  ];
  const deliverables = ['Use-case brief and success measures', 'Data and knowledge-source review', 'Assistant or automation prototype', 'Agreed system integrations', 'Evaluation and human-review plan', 'Technical notes and handoff guidance'];
  const faqs = [
    ['Can an AI assistant use our internal documents?', 'It may be possible to connect approved sources, depending on file formats, access controls, data quality, and the selected technical approach. We review these before confirming scope.'],
    ['Will the AI always give correct answers?', 'No. AI systems can produce incorrect or incomplete responses. We plan testing, source context, clear limitations, and human review for decisions that need it.'],
    ['How is company data handled?', 'Data access, processing, retention, and provider choices must be reviewed against your requirements and the services involved. These details are agreed before implementation.'],
    ['Can AI connect to our existing systems?', 'Integrations depend on available APIs, permissions, data formats, and the workflow. We assess feasibility during discovery.'],
    ['Can we start with a small pilot?', 'Yes. A focused prototype or pilot can help evaluate usefulness, data readiness, and operational fit before a larger rollout.']
  ];
  const related = ['software-development', 'web-development', 'powerbi-services'].map(getService).filter(Boolean);

  return (
    <main className="ai-service-page">
      <HeadMeta title="AI Development Services | Rigweda Technologies" description="AI assistants and workflow automation designed around your business processes, approved data, system integrations, and human review requirements." keywords="AI development services, AI assistants, business workflow automation, AI integrations, document processing" path="/ai-services" />
      <Hero eyebrow="AI Development Services" title={<>Put AI to work on <span>the right problems.</span></>} text="Design practical AI assistants and workflow automations around your team, data, and systems—with clear boundaries and people in the loop where they matter." visual="ai" action="Discuss an AI Use Case" actionTo="/contactus" secondaryAction="Explore Use Cases" secondaryTo="#ai-use-cases" image="/renders/uiux-3d.png" pageClass="hero-ai-services" />

      <section className="ai-service-intro section" aria-labelledby="ai-intro-title"><div><p className="section-kicker">Start with the work</p><h2 id="ai-intro-title">Find the task where <span>AI can make a useful difference.</span></h2></div><p>We begin with a specific process, not a technology demo. Together we identify repetitive or information-heavy tasks, check the available data, and decide where automation can help and where human judgment should remain.</p></section>

      <section className="ai-usecases section" id="ai-use-cases" aria-labelledby="ai-usecases-title"><div className="ai-section-heading"><p className="section-kicker">Practical AI applications</p><h2 id="ai-usecases-title">Support people across <span>everyday workflows.</span></h2><p>Choose a focused use case that can be evaluated against real tasks and business needs.</p></div><div className="ai-usecase-grid">{useCases.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="ai-pipeline section" aria-labelledby="ai-pipeline-title"><div className="ai-section-heading"><p className="section-kicker">Built around your context</p><h2 id="ai-pipeline-title">Connect the model to <span>the right information and workflow.</span></h2><p>Useful AI depends on more than the model. Data quality, permissions, integration, and review shape the result.</p></div><div className="ai-pipeline-flow"><article><span>01</span><strong>Approved data</strong><small>Sources & permissions</small></article><i aria-hidden="true">→</i><article><span>02</span><strong>AI capability</strong><small>Assistant or automation</small></article><i aria-hidden="true">→</i><article><span>03</span><strong>Business workflow</strong><small>People & systems</small></article><i aria-hidden="true">→</i><article><span>04</span><strong>Review & improve</strong><small>Evaluation over time</small></article></div></section>

      <section className="ai-safeguards section" aria-labelledby="ai-safeguards-title"><div><p className="section-kicker">Responsible implementation</p><h2 id="ai-safeguards-title">Useful automation needs <span>clear boundaries.</span></h2></div><div className="ai-safeguard-grid">{safeguards.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="ai-deliverables section" aria-labelledby="ai-deliverables-title"><div><p className="section-kicker">What the project includes</p><h2 id="ai-deliverables-title">A clear path from <span>use case to implementation.</span></h2><p>Deliverables are agreed around the use case, data sources, integrations, and level of human review required.</p></div><ul>{deliverables.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>

      <section className="ai-process section" aria-labelledby="ai-process-title"><div className="ai-section-heading"><p className="section-kicker">How we work</p><h2 id="ai-process-title">Start small. <span>Test with real tasks. Improve deliberately.</span></h2><p>Evaluation checkpoints help teams understand where the solution works, where it needs review, and what should happen next.</p></div><div className="ai-process-list">{stages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="ai-faq section" aria-labelledby="ai-faq-title"><div className="ai-section-heading"><p className="section-kicker">Frequently asked questions</p><h2 id="ai-faq-title">AI implementation, <span>explained clearly.</span></h2></div><div className="webdev-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="webdev-related related-services-section section"><SectionHeading kicker="Related Capabilities" title="Connect AI with your software and data." text="AI solutions can involve application development, system integration, and reporting. Explore connected services for your use case." /><div className="related-services-grid">{related.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>

      <section className="ai-cta"><div><p className="section-kicker">Start with a focused use case</p><h2>Let’s find where AI can help your team.</h2><p>Tell us which tasks take time, what information is involved, and where a person needs to stay in control.</p></div><Link className="primary-action" to="/contactus#contact-form">Discuss AI development <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}

const aboutIconPaths = {
  spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z"/></>,
  heart: <path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z"/>,
  check: <><path d="M20 6 9 17l-5-5"/><path d="M21 12a9 9 0 1 1-3-6.7"/></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.4-3"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  scale: <><path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7ZM17 7l-4 7h8l-4-7ZM8 21h8"/></>,
  support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4ZM20 13h-3v6h1a2 2 0 0 0 2-2v-4ZM12 21h3"/></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></>,
  cloud: <path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9.3 4.5 4.5 0 0 0 7 18Z"/>,
  smartphone: <><rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M10 5h4M11 18h2"/></>,
  cart: <><path d="M3 4h2l2.4 11h10.9L21 8H6"/><circle cx="10" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/></>,
  megaphone: <><path d="m3 11 16-6v14L3 13v-2Z"/><path d="m7 14 2 6h4l-2-5M19 10h2a2 2 0 0 1 0 4h-2"/></>,
  chart: <><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/></>,
  plug: <><path d="M9 7v4M15 7v4M7 11h10v2a5 5 0 0 1-5 5v3M12 18v3M9 3v4M15 3v4"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></>,
  pen: <><path d="m4 20 4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20Z"/><path d="m14.5 6.5 3 3"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/></>
};

function AboutIcon({ name }) {
  return <svg className="about-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{aboutIconPaths[name] ?? aboutIconPaths.spark}</svg>;
}

function About() {
  const values = [
    ['spark', 'Innovation', 'We explore better ways to solve real business problems with thoughtful technology.'],
    ['heart', 'Customer success', 'We keep customer goals and the people using each product at the center of our work.'],
    ['check', 'Quality', 'We care about clear details, dependable performance, and maintainable solutions.'],
    ['shield', 'Integrity', 'We communicate openly, set practical expectations, and take responsibility for our work.'],
    ['users', 'Collaboration', 'We work closely with customers and across disciplines to make good ideas stronger.'],
    ['refresh', 'Continuous improvement', 'We learn from feedback and keep improving products as business needs evolve.']
  ];
  const strengths = [
    ['target', 'Customer-focused solutions', 'We start with your goals, users, and day-to-day challenges.'],
    ['check', 'Quality-driven development', 'Careful planning and implementation support a dependable result.'],
    ['scale', 'Scalable technology', 'We make choices that can adapt as your products and operations grow.'],
    ['support', 'Reliable support', 'We stay available to help maintain and improve the solutions we build.'],
    ['code', 'Modern development practices', 'We use current tools and clear engineering practices suited to each project.'],
    ['layers', 'Business-oriented approach', 'We connect technical decisions to useful outcomes for your organization.']
  ];
  const expertise = [
    ['code', 'Custom Software Development', 'Purpose-built software for business workflows, operations, and reporting.', '/software-development'],
    ['layout', 'Web Application Development', 'Web platforms, portals, dashboards, and business applications.', '/web-development'],
    ['layers', 'Mobile Application Development', 'Mobile experiences connected to the services and systems your business needs.', '/applications'],
    ['plug', 'API Integration', 'Connected services and integrations that help business systems work together.', '/software-development'],
    ['cloud', 'Cloud Solutions', 'Cloud hosting, deployment, and infrastructure support for digital products.', '/services'],
    ['target', 'Business Software Solutions', 'Practical tools for customer management, team workflows, and insight.', '/software-development']
  ];
  const process = [
    ['search', 'Discover', 'We learn about your goals, users, requirements, and constraints.'],
    ['target', 'Plan', 'We agree on scope, priorities, approach, and delivery milestones.'],
    ['pen', 'Design', 'We shape the experience and technical direction before development.'],
    ['code', 'Develop', 'We build in focused steps and share progress along the way.'],
    ['check', 'Test', 'We review functionality, usability, and quality before release.'],
    ['send', 'Deliver', 'We launch the solution and help your team move into the next stage.']
  ];

  return (
    <div className="about-page">
      <HeadMeta title="About Rigweda Technologies | Digital Solutions & Software Development" description="Meet Rigweda Technologies: a technology partner building custom software, web and mobile applications, cloud solutions, and business-focused digital products." keywords="about Rigweda Technologies, software development, web applications, mobile applications, cloud solutions" path="/aboutus" />
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy"><p className="about-eyebrow"><span /> TECHNOLOGY WITH PURPOSE</p><h1 id="about-title">Building Digital Solutions That <span>Drive Innovation</span></h1><p className="about-hero-lede">Rigweda Technologies helps businesses turn ideas into useful digital products through software, applications, cloud solutions, and thoughtful engineering.</p><div className="about-hero-actions"><Link className="primary-action" to="/services">Explore Our Services <span aria-hidden="true">→</span></Link><Link className="secondary-action" to="/contactus">Contact Us</Link></div><div className="about-hero-note"><span className="about-note-dot" /> From business challenge to dependable digital solution</div></div>
        <div className="about-hero-visual"><div className="about-visual-orbit about-orbit-one"/><div className="about-visual-orbit about-orbit-two"/><div className="about-image-frame"><img src="/renders/aboutsec.png" alt="Rigweda Technologies digital solutions illustration"/></div><div className="about-visual-tag"><AboutIcon name="layers"/><span>Ideas into<br/><strong>digital products</strong></span></div></div>
      </section>
      <section className="about-section about-who" aria-labelledby="about-who-title"><div className="about-who-visual"><img src="/renders/webapplication.png" alt="Web application interface representing digital product development" loading="lazy"/><span className="about-who-caption">Technology shaped around your business</span></div><div className="about-who-copy"><p className="about-eyebrow">WHO WE ARE</p><h2 id="about-who-title">A technology partner for what comes next.</h2><p>Rigweda Technologies works with businesses to plan and build digital solutions that make work clearer, services more accessible, and ideas easier to bring to life.</p><p>We bring software development, web and mobile applications, integrations, and cloud capabilities together around each project’s needs. Our approach pairs practical business understanding with thoughtful design and reliable engineering.</p><Link className="about-inline-link" to="/services">Explore our capabilities <span aria-hidden="true">→</span></Link></div></section>
      <section className="about-section about-purpose" aria-label="Our mission and vision"><article className="about-purpose-card"><div className="about-card-icon"><AboutIcon name="target"/></div><p className="about-eyebrow">OUR MISSION</p><h2>Make technology useful.</h2><p>We create accessible, dependable digital solutions that help businesses solve meaningful problems and serve people better.</p></article><article className="about-purpose-card about-vision-card"><div className="about-card-icon"><AboutIcon name="spark"/></div><p className="about-eyebrow">OUR VISION</p><h2>Build for lasting progress.</h2><p>We aim to be a trusted technology partner, helping organizations adapt and grow through considered digital innovation.</p></article></section>
      <section className="about-section" aria-labelledby="about-values-title"><div className="about-section-heading"><div><p className="about-eyebrow">WHAT GUIDES US</p><h2 id="about-values-title">Our core values</h2></div><p>The principles behind how we think, collaborate, and deliver.</p></div><div className="about-value-grid">{values.map(([icon, title, text]) => <article className="about-value-card" key={title}><AboutIcon name={icon}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="about-section about-why" aria-labelledby="about-why-title"><div className="about-section-heading"><div><p className="about-eyebrow">THE RIGWEDA APPROACH</p><h2 id="about-why-title">Why choose Rigweda?</h2></div><p>Clear communication and thoughtful delivery keep the work connected to what matters to your business.</p></div><div className="about-strength-grid">{strengths.map(([icon, title, text], index) => <article className="about-strength-card" key={title}><span className="about-index">0{index + 1}</span><AboutIcon name={icon}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="about-section" aria-labelledby="about-expertise-title"><div className="about-section-heading"><div><p className="about-eyebrow">WHAT WE DO</p><h2 id="about-expertise-title">Our expertise</h2></div><p>Connected capabilities to help move a digital product from the first idea to everyday use.</p></div><div className="about-expertise-grid">{expertise.map(([icon, title, text, to]) => <Link className="about-expertise-card" to={to} key={title}><AboutIcon name={icon}/><h3>{title}</h3><p>{text}</p><span className="about-card-link">Learn more <span aria-hidden="true">→</span></span></Link>)}</div></section>
      <section className="about-section about-process" aria-labelledby="about-process-title"><div className="about-section-heading"><div><p className="about-eyebrow">HOW WE WORK</p><h2 id="about-process-title">A clear path from idea to impact</h2></div><p>Each project follows a collaborative process, shaped to fit its goals and scope.</p></div><ol className="about-process-grid">{process.map(([icon, title, text], index) => <li className="about-process-step" key={title}><div className="about-step-top"><span className="about-step-number">0{index + 1}</span><AboutIcon name={icon}/></div><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
      <section className="about-cta" aria-labelledby="about-cta-title"><div><p className="about-eyebrow">LET’S START A CONVERSATION</p><h2 id="about-cta-title">Let’s Build Something Great Together</h2><p>Let’s turn your ideas into meaningful digital solutions.</p></div><Link className="primary-action" to="/contactus">Contact Us <span aria-hidden="true">→</span></Link></section>
    </div>
  );
}

function ApplicationsSection({ compact = false }) {
  return <section className={`section ${compact ? 'compact' : ''}`}><SectionHeading kicker="Applications" title="Application ideas customers can understand immediately." text="Instead of only listing technologies, Rigweda shows practical systems that businesses can imagine using." /><div className="application-grid">{applications.map((app) => <article className="application-card" key={app.title}><Visual3D type={app.visual} image={app.image} /><h3>{app.title}</h3><p>{app.text}</p></article>)}</div></section>;
}

function ApplicationsPage() {
  return (
    <>
      <HeadMeta title="Business Applications | Rigweda Technologies" description="Explore business application concepts by Rigweda Technologies including retail apps, dashboards, AI service desks, and marketing intelligence systems." keywords="business applications, web applications, mobile applications, AI applications" path="/applications" />
      <Hero eyebrow="Applications" title="Useful applications, not just code." text="Rigweda builds applications for customers, teams, operations, marketing, reporting, and automation. Each product is planned around real business use." visual="software" action="Discuss Application" actionTo="/contactus" image="/renders/application.png" pageClass="hero-applications" />
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
      <Hero eyebrow="Careers" title={<><span>Build Your Career</span><span>at <em>Rigweda</em></span></>} text="Work on real-world products, solve meaningful problems, and grow your skills with a collaborative and supportive team." visual="enterprise" action="Explore Openings" actionTo="#career-openings" secondaryAction="Life at Rigweda" secondaryTo="/aboutus" image="/renders/careers.png" pageClass="hero-careers" />
      <section className="section" id="career-openings"><div className="rich-grid">{['Frontend Developer', 'UI/UX Designer', 'Digital Marketing Executive', 'Cloud & DevOps Associate', 'Data Analyst', 'Project Coordinator'].map((role) => <article className="rich-card" key={role}><h3>{role}</h3><p>Work on real websites, applications, dashboards, campaigns, and automation systems with a quality-first team.</p><Link to="/contactus">Apply now</Link></article>)}</div></section>
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
      <div className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-copy">
            <p className="contact-kicker"><span /> CONTACT RIGWEDA</p>
            <h1>Let's build your next <span>digital solution.</span></h1>
            <p>From websites and applications to AI, cloud, and business automation, our team can help you plan the right technology for your next stage.</p>
            <div className="contact-hero-actions">
              <a className="contact-primary-action" href="#contact-form">Tell us about your project <span aria-hidden="true">→</span></a>
              <Link className="contact-secondary-action" to="/services">Explore services</Link>
            </div>
          </div>
        </section>
        <section className="section contact contact-layout">
          <div className="contact-intro">
            <p className="section-kicker">START A CONVERSATION</p>
            <h2>Tell us what you want to build.</h2>
            <p>Share your goals and our team will get back to you to discuss the best next step.</p>
            <div className="contact-methods">
              <a className="contact-method" href="tel:+917989076809"><span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 5 7.2 2 2 0 0 1 7 5Z"/></svg></span><span><small>CALL OUR TEAM</small><strong>+91 79890 76809</strong></span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
              <a className="contact-method" href="mailto:info@rigweda.com"><span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg></span><span><small>EMAIL US</small><strong>info@rigweda.com</strong></span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
              <a className="contact-method" href="https://wa.me/917989076809" target="_blank" rel="noreferrer"><span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.2-3.8a8.2 8.2 0 1 1 15-4.5Z"/><path d="M9 8.5c.4 2.8 2.7 5.1 5.5 5.5l1.2-1.2 2 .8"/></svg></span><span><small>WHATSAPP</small><strong>Chat with Rigweda</strong></span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
            </div>
            <div className="contact-response-note"><span /> We typically respond within one business day.</div>
          </div>
          <form id="contact-form" className="contact-form" onSubmit={submitEnquiry} noValidate>
            <div className="contact-form-heading"><p className="section-kicker">PROJECT ENQUIRY</p><h2>Tell us about your project</h2><p>Complete the details and we’ll follow up soon.</p></div>
            <label>Name<input name="name" placeholder="Your name" autoComplete="name" minLength={2} maxLength={80} pattern="[A-Za-z][A-Za-z .'-]{1,79}" aria-invalid={Boolean(formErrors.name)} required />{formErrors.name && <span className="field-error">{formErrors.name}</span>}</label>
            <label>Email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={120} aria-invalid={Boolean(formErrors.email)} required />{formErrors.email && <span className="field-error">{formErrors.email}</span>}</label>
            <label>Phone Number<input name="phone" type="tel" inputMode="tel" placeholder="+91 98765 43210" autoComplete="tel" minLength={8} maxLength={20} pattern="[+]?[0-9\\s()\\-]{8,20}" aria-invalid={Boolean(formErrors.phone)} required />{formErrors.phone && <span className="field-error">{formErrors.phone}</span>}</label>
            <label>Project Need<select name="need" aria-invalid={Boolean(formErrors.need)} required>{enquiryNeeds.map((need) => <option key={need}>{need}</option>)}</select>{formErrors.need && <span className="field-error">{formErrors.need}</span>}</label>
            <label className="contact-message-field">Message<textarea name="message" rows={5} placeholder="Share a short project brief" minLength={20} maxLength={1000} aria-invalid={Boolean(formErrors.message)} required />{formErrors.message && <span className="field-error">{formErrors.message}</span>}</label>
            {submitStatus && <p className="form-status" role="alert">{submitStatus}</p>}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Enquiry'} <span aria-hidden="true">→</span></button>
          </form>
        </section>
      </div>
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
    ['UI/UX Solutions', '/ui-ux-solutions'],
    ['Web Design', '/webdesign'],
    ['Web Application Development', '/web-development'],
    ['WordPress Development', '/wordpress-development'],
    ['Ecommerce Development', '/ecommerce-development'],
    ['Digital Marketing', '/digital-marketing'],
    ['SEO Services', '/seo-services'],
    ['SMM Services', '/smm-services'],
    ['PPC Services', '/ppc-services'],
    ['Software Development', '/software-development'],
    ['Power BI Services', '/powerbi-services'],
    ['AI Development Services', '/ai-services']
  ];
  const socialLinks = [
    ['mail', 'Email', 'mailto:info@rigweda.com'],
    ['call', 'Call', 'tel:+917989076809'],
    ['wa', 'WhatsApp', 'https://wa.me/917989076809']
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
          <p>Rigweda Technologies delivers UI/UX, web design and development, ecommerce, software, AI, analytics, and digital marketing services across India and globally.</p>
          <div className="footer-socials">
            {socialLinks.map(([icon, label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {icon === 'mail' && <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>}
                {icon === 'call' && <path d="M7 3h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 5 7.2 2 2 0 0 1 7 5Z"/>}
                {icon === 'wa' && <><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.2-3.8a8.2 8.2 0 1 1 15-4.5Z"/><path d="M9 8.5c.4 2.8 2.7 5.1 5.5 5.5l1.2-1.2 2 .8c-.2 1.4-1.3 2.3-2.7 2.2-3.7-.4-6.9-3.6-7.3-7.3-.1-1.4.8-2.5 2.2-2.7l.8 2Z"/></>}
              </svg>
            </a>)}
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
          <div><span>Phone</span><a href="tel:+917989076809">+91 7989076809</a></div>
          <div><span>Email</span><a href="mailto:info@rigweda.com">info@rigweda.com</a></div>
          <div><span>Address</span><a href="https://maps.app.goo.gl/8cmbyhq9cmPx6Dj28?g_st=aw" target="_blank" rel="noreferrer">Flat No: 202, Sivaram Life style Pragati Nagar Main Road, Pragati Nagar Hyderabad,Telangana State-500 090</a></div>
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
