import { Route, Routes } from 'react-router';
import './App.css';

import { MainPage } from './pages/main/mainPage';
import { ErrorPage } from './pages/error/errorPage';
import { DetailsPage } from './pages/details/detailsPage';
import { ROUTES } from './utils/constants';

export const LS_KEY = 'NADYA_GUS_KEY';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path={ROUTES.root}
          element={<MainPage localStorageKey={LS_KEY} />}
        >
          <Route path={ROUTES.detailsWithId} element={<DetailsPage />} />
        </Route>

        <Route path={ROUTES.notFound} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
