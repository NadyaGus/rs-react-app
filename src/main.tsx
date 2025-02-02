import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.tsx';
import { ErrorBoundary } from './utils/errorBoundary.tsx';

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found!');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
