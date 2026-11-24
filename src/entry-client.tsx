import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './main';

const root = document.getElementById('root');
// Production pages arrive pre-rendered, so React attaches to the existing HTML; the dev server starts empty.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
