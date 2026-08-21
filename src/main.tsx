import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Gallery from './Gallery.tsx';
import './index.css';
import './visual-overrides.css';
import './site-enhancements';

const root = createRoot(document.getElementById('root')!);
const isGallery = window.location.pathname === '/gallery' || window.location.pathname === '/awards';
root.render(<StrictMode>{isGallery ? <Gallery /> : <App />}</StrictMode>);
