// GA4 custom events for Rigweda.com.
//
// GA4 (G-QQSSQQFD9R) is loaded once, by the Google tag inside the Google Tag Manager container
// in index.html. This module does not load a second GA4 script. It sends gtag() commands through
// the shared dataLayer, which that Google tag processes.
//
// Enhanced Measurement in GA4 already sends page_view (including React Router navigation via
// browser-history events), scroll, outbound clicks, file downloads, form interactions, site search,
// and video engagement. Do not send those events from here, or they will be counted twice.
//
// Never pass personal data (names, emails, phone numbers, messages, or any form values) as params.

type EventParams = Record<string, string | number | boolean | undefined>;

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? '';
// VITE_GA_DEBUG=true marks events with debug_mode so they appear in GA4 DebugView. Local testing only.
const DEBUG = import.meta.env.VITE_GA_DEBUG === 'true';

let clickTrackingInstalled = false;

function gtag(..._args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];
  // The Google tag only reads gtag commands as the original arguments object.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** Sends one GA4 event. Does nothing on the server, without a measurement ID, or if anything fails. */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || !MEASUREMENT_ID) return;
  try {
    const payload: EventParams = { ...params, send_to: MEASUREMENT_ID };
    if (DEBUG) payload.debug_mode = true;
    gtag('event', name, payload);
    if (DEBUG) console.info('[analytics]', name, payload);
  } catch {
    // Analytics must never break the page or block a form.
  }
}

const linkText = (link: HTMLAnchorElement): string => (link.textContent || link.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 100);

// Drops any query string (e.g. a prefilled WhatsApp message or mailto subject).
const withoutQuery = (value: string): string => value.split('?')[0];

const isWhatsApp = (url: URL): boolean => url.protocol === 'whatsapp:' || url.hostname === 'wa.me' || url.hostname.endsWith('whatsapp.com');

function onDocumentClick(event: MouseEvent): void {
  try {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!(link instanceof HTMLAnchorElement)) return;
    const url = new URL(link.href, window.location.href);
    const pagePath = window.location.pathname;
    // Only Rigweda's own public contact details appear in these links; no visitor data is involved.
    if (url.protocol === 'tel:') {
      trackEvent('phone_click', { phone_number: withoutQuery(url.pathname), link_text: linkText(link), page_path: pagePath });
    } else if (url.protocol === 'mailto:') {
      trackEvent('email_click', { email_address: withoutQuery(url.pathname), link_text: linkText(link), page_path: pagePath });
    } else if (isWhatsApp(url)) {
      trackEvent('whatsapp_click', { link_url: `${url.origin}${url.pathname}`, link_text: linkText(link), page_path: pagePath });
    }
  } catch {
    // Ignore malformed links.
  }
}

/**
 * Tracks WhatsApp, phone, and email link clicks with one delegated listener.
 * Safe to call repeatedly (StrictMode, remounts): it installs the listener once and returns its cleanup.
 */
export function installClickTracking(): () => void {
  if (typeof document === 'undefined' || clickTrackingInstalled) return () => {};
  clickTrackingInstalled = true;
  // Capture phase records the click before the router navigates away, so page_path is the page clicked on.
  document.addEventListener('click', onDocumentClick, true);
  return () => {
    document.removeEventListener('click', onDocumentClick, true);
    clickTrackingInstalled = false;
  };
}

/** The main lead conversion. Call only after the submission has been confirmed as successful. */
export function trackLead(form: { formId: string; formName: string; leadSource: string }): void {
  trackEvent('generate_lead', {
    form_id: form.formId,
    form_name: form.formName,
    lead_source: form.leadSource,
    page_path: typeof window === 'undefined' ? undefined : window.location.pathname
  });
}
