'use client';
import { useState } from 'react';
import { ThemeContext, ThemeContextType } from '../utils/theme';
import { ErrorBoundary } from '../utils/errorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeContextType['theme']>('dark');
  return (
    <html lang="en">
      <body id="__next">
        <div className={'App' + ' ' + theme}>
          <ErrorBoundary>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <Provider store={store}>{children}</Provider>
            </ThemeContext.Provider>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
