import { Component, type ReactElement } from 'react';

import './App.css';
import { Search } from './components/search/search';
import { CardProps } from './types/cardTypes';
import { Card } from './components/card/card';
import { fetchData } from './api/fetchData';
import { Loader } from './components/loader/loader';

export const LS_KEY = 'NADYA_GUS_KEY';

type AppState = {
  search: string;
  results: CardProps[];
  isLoading: boolean;
  isFetchError: boolean;
};

class App extends Component<AppState> {
  state: AppState = {
    search: '',
    results: [],
    isLoading: false,
    isFetchError: false,
  };

  componentDidMount(): void {
    const search = localStorage.getItem(LS_KEY);
    this.setState({ search });

    this.handleFetch(search || '');
  }

  handleSubmitForm = (value: string) => {
    this.setState({ search: value });
    localStorage.setItem(LS_KEY, value);

    this.handleFetch(value);
  };

  handleResults = (results: CardProps[]) => {
    this.setState({ results });
  };

  handleFetch = (value: string) => {
    this.setState({ isLoading: true });
    this.setState({ results: [] });
    const data = fetchData(value);
    data
      .then((results) => {
        this.handleResults(results.data);
      })
      .catch(() => {
        this.handleError();
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleError = () => {
    this.setState({ isFetchError: true });
  };

  render(): ReactElement {
    return (
      <div className="App">
        <Search
          handleSubmitForm={this.handleSubmitForm}
          value={this.state.search}
        />
        <div className="cards">
          {this.state.isLoading && <Loader />}
          {this.state.isFetchError && <p>Something went wrong</p>}
          {this.state.results &&
            this.state.results.map((result) => {
              return <Card key={result.mal_id} {...result} />;
            })}
        </div>
      </div>
    );
  }
}

export default App;
