import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Gallery from './Gallery.tsx';
import './index.css';
import './visual-overrides.css';
import './gallery-overrides.css';
import './route-cleanup';
import './site-enhancements';
import './final-site-fixes';
import './whatsapp-widget';

const root = createRoot(document.getElementById('root')!);
const isGallery = window.location.pathname === '/gallery' || window.location.pathname === '/awards';
root.render(<StrictMode>{isGallery ? <Gallery /> : <App />}</StrictMode>);
