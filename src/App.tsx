import { Route, Routes } from 'react-router';
import './App.css';
import { MainPage } from './pages/main/mainPage';
import { ErrorPage } from './pages/error/errorPage';
import { DetailsPage } from './pages/details/detailsPage';
import { ROUTES } from './utils/constants';
import { useState } from 'react';
import { ThemeContextType } from './utils/theme';
import { themeContext } from './utils/theme';

export const LS_KEY = 'NADYA_GUS_KEY';

const App = () => {
  const [theme, setTheme] = useState<ThemeContextType['theme']>('dark');

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <div className={'App' + ' ' + theme}>
        <div className={'app-container'}>
          <Routes>
            <Route path={ROUTES.root} element={<MainPage />}>
              <Route path={ROUTES.detailsWithId} element={<DetailsPage />} />
            </Route>
            <Route path={ROUTES.notFound} element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </themeContext.Provider>
  );
};

export default App;
