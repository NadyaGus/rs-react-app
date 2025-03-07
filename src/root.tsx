import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ErrorBoundary } from './utils/errorBoundary';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <div className={'App' + ' ' + 'dark'} id="root">
            <Outlet />
          </div>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
