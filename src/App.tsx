import { Component, type ReactElement } from 'react';

import './App.css';
import { showData } from './api/showData';
import { Search } from './components/search/search';

class App extends Component {
  render(): ReactElement {
    return (
      <div className="App">
        <Search />
        <button onClick={showData}>Show Data</button>
      </div>
    );
  }
}

export default App;
