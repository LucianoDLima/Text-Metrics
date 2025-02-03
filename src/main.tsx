import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './app/layout/index.tsx';
import './app/style/style.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout />
  </StrictMode>
);
