import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Awards from './Awards.tsx';
import './index.css';
import './visual-overrides.css';
import './site-enhancements';

const root = createRoot(document.getElementById('root')!);
const isAwards = window.location.pathname === '/awards';
root.render(<StrictMode>{isAwards ? <Awards /> : <App />}</StrictMode>);
