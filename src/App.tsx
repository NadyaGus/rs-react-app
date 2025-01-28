import { Component, type ReactElement } from 'react';

import './App.css';
import { Search } from './components/search/search';
import { CardProps } from './types/cardTypes';
import { Card } from './components/card/card';

class App extends Component {
  state = { search: '', results: [] as CardProps[] };

  handleSubmitForm = (value: string) => {
    this.setState({ search: value });
  };

  handleResults = (results: CardProps[]) => {
    this.setState({ results });
  };

  render(): ReactElement {
    return (
      <div className="App">
        <Search
          handleSubmitForm={this.handleSubmitForm}
          handleResults={this.handleResults}
        />
        <div className="cards">
          {this.state.results.map((result) => {
            return <Card key={result.mal_id} {...result} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
