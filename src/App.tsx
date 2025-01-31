import { Component, type ReactElement } from 'react';

import './App.css';
import { Search } from './components/search/search';
import { CardProps } from './types/cardTypes';
import { Card } from './components/card/card';
import { fetchData } from './api/fetchData';

export const LS_KEY = 'NADYA_GUS_KEY';

type AppState = {
  search: string;
  results: CardProps[];
};

class App extends Component<AppState> {
  state: AppState = { search: '', results: [] };

  componentDidMount(): void {
    const search = localStorage.getItem(LS_KEY);
    this.setState({ search });

    const data = fetchData(search || '');
    data.then((results) => {
      this.handleResults(results.data);
    });
  }

  handleSubmitForm = (value: string) => {
    this.setState({ search: value });
    localStorage.setItem(LS_KEY, value);

    const data = fetchData(value);
    data.then((results) => {
      this.handleResults(results.data);
    });
  };

  handleResults = (results: CardProps[]) => {
    this.setState({ results });
  };

  render(): ReactElement {
    return (
      <div className="App">
        <Search
          handleSubmitForm={this.handleSubmitForm}
          value={this.state.search}
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
