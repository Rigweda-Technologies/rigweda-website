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
  { slug: 'ai-services', title: 'AI Development Services', group: 'Software Development', visual: 'ai', keywords: 'AI development services, AI automation', summary: 'AI assistants and automations that reduce repetitive work, improve response time, and make knowledge easier to use.', bullets: ['Chatbots and internal knowledge assistants', 'Document and workflow automation', 'AI integrations with business systems'] }
];

const serviceArtwork = {
  'ui-ux-solutions': '/renders/ui-ux-img.png',
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
    <>
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
                ? '/renders/ai-servicedesk.png'
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
