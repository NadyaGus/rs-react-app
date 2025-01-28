import { Component, type ReactElement } from 'react';

import './App.css';
import { showData } from './api/showData';

class App extends Component {
  render(): ReactElement {
    return (
      <div className="App">
        <button onClick={showData}>Show Data</button>
      </div>
    );
  }
}

export default App;
