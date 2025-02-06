import { Route, Routes } from 'react-router';
import './App.css';

import { MainPage } from './pages/main/mainPage';
import { ErrorPage } from './pages/errorPage';

export const LS_KEY = 'NADYA_GUS_KEY';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage localStorageKey={LS_KEY} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
