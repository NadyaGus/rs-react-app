import './App.css';

import { MainPage } from './pages/mainPage';

export const LS_KEY = 'NADYA_GUS_KEY';

const App = () => {
  return (
    <div className="App">
      <MainPage localStorageKey={LS_KEY} />
    </div>
  );
};

export default App;
