import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import './styles/loader.css';

const stored = localStorage.getItem('pastizza-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', initialTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
