import ReduxProvider from '../shared/store/reduxProvider';
import ThemeProvider from '../shared/theme/themeContext';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="__next">
        {/* <ErrorBoundary> */}
        <ThemeProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
