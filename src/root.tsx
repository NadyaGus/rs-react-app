import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ErrorBoundary } from './utils/errorBoundary';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import { useState } from 'react';
import { ThemeContextType, themeContext } from './utils/theme';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Anime Search By Nadya Gus</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  const [theme, setTheme] = useState<ThemeContextType['theme']>('dark');
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <themeContext.Provider value={{ theme, setTheme }}>
            <div className={'App' + ' ' + theme} id="root">
              <div className={'app-container'}>
                <Outlet />
              </div>
            </div>
          </themeContext.Provider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
