import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './utils/errorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found!');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
