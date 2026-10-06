import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import './styles/tokens.css';
import './styles/base.css';
import './styles/typography.css';

// Bug 2: prevent browser scroll restore from firing scrollspy before intro
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
if (location.hash) {
  history.replaceState(null, '', location.pathname + location.search);
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);