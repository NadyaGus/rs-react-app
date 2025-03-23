import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const root = document.getElementById('root');

if (!root) throw new Error('No root');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
