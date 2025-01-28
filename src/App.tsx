import type { ReactElement } from 'react';

import './App.css';
import { showData } from './api/showData';

function App(): ReactElement {
  return (
    <>
      <button onClick={() => showData()}>Show Data</button>
    </>
  );
}

export default App;
