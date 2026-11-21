/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  readonly VITE_BING_SITE_VERIFICATION?: string;
}

interface Window {
  dataLayer: unknown[];
}
