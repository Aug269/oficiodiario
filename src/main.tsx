import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Atualizações do service worker aplicadas automaticamente (modo autoUpdate).
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(<App />);
