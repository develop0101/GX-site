import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './visual-overrides.css';
import './site-enhancements';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
