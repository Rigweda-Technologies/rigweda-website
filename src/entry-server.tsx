import React from 'react';
import { renderToString } from 'react-dom/server';
import { App, products, services, sitePages, SITE_URL, ssrHead, unlistedPages } from './main';

// Used only by scripts/prerender.mjs at build time.
export function render(url: string) {
  ssrHead.current = null;
  const html = renderToString(<App url={url} />);
  return { html, head: ssrHead.current };
}

export { products, services, sitePages, SITE_URL, unlistedPages };
