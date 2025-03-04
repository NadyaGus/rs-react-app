import { Suspense } from 'react';
import ReduxProvider from '../shared/store/reduxProvider';
import ThemeProvider from '../shared/theme/themeContext';
import './globals.css';
import { Loader } from '../components/loader/loader';

export default function Layout({
  root,
  children,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
  example: React.ReactNode;
  root: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="__next">
        {/* <ErrorBoundary> */}
        <ThemeProvider>
          <ReduxProvider>
            <Suspense fallback={<Loader isLoading />}>
              {root}
              {children}
            </Suspense>
          </ReduxProvider>
        </ThemeProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
