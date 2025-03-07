import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';
import { ErrorBoundary } from './utils/errorBoundary';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useState } from 'react';
import { ThemeContextType, themeContext } from './utils/theme';
import MainPage from './pages/main/mainPage';
import { jikanApi } from './api/createApi';
import { Route } from './+types/root';
import './App.css';

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') ?? '';
    const page = url.searchParams.get('page') ?? '1';

    const data = await store
      .dispatch(
        jikanApi.endpoints.getResults.initiate({
          q,
          page,
        })
      )
      .unwrap();
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export default function Root({ loaderData }: Route.ComponentProps) {
  const [theme, setTheme] = useState<ThemeContextType['theme']>('dark');
  const data = loaderData.data;

  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <themeContext.Provider value={{ theme, setTheme }}>
            <div className={'App' + ' ' + theme} id="root">
              <div className={'app-container'}>
                {data && data.data && <MainPage {...data} />}
              </div>
            </div>
          </themeContext.Provider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

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
