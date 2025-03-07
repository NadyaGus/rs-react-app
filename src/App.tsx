import { Route, Routes } from 'react-router';
import { ErrorPage } from './pages/error/errorPage';
import { ROUTES } from './utils/constants';
// import { useState } from 'react';
// import { ThemeContextType } from './utils/theme';
// import { themeContext } from './utils/theme';

export const LS_KEY = 'NADYA_GUS_KEY';

const App = () => {
  return (
    <div className={'app-container'}>
      <Routes>
        {/* <Route path={ROUTES.root} element={<MainPage />}>
              <Route path={ROUTES.detailsWithId} element={<DetailsPage />} />
            </Route> */}
        <Route path={ROUTES.notFound} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
