import { Component, type ReactElement } from 'react';

import './App.css';
import { Search } from './components/search/search';
import { CardProps } from './types/cardTypes';
import { Card } from './components/card/card';
import { fetchData } from './api/fetchData';
import { Loader } from './components/loader/loader';
import { ErrorButton } from './components/errorButton/errorButton';

export const LS_KEY = 'NADYA_GUS_KEY';

type AppState = {
  search: string;
  results: CardProps[];
  isLoading: boolean;
  isFetchError: boolean;
};

class App extends Component {
  state: AppState = {
    search: '',
    results: [],
    isLoading: false,
    isFetchError: false,
  };

  componentDidMount(): void {
    const search = localStorage.getItem(LS_KEY) ?? '';
    this.setState({ search });

    this.handleFetch(search);
  }

  handleSubmitForm = (value: string) => {
    this.setState({ search: value });
    localStorage.setItem(LS_KEY, value);

    this.handleFetch(value);
  };

  handleFetch = (value: string) => {
    this.setState({ isLoading: true, isFetchError: false, results: [] });

    const data = fetchData(value);
    data
      .then((results) => {
        this.setState({ results: results.data });
      })
      .catch(() => {
        this.setState({ isFetchError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render(): ReactElement {
    return (
      <div className="App">
        <Search
          handleSubmitForm={this.handleSubmitForm}
          value={this.state.search}
        />
        <Loader isLoading={this.state.isLoading} />
        {this.state.isFetchError && <p>Something went wrong</p>}
        {this.state.results.map((result) => {
          return <Card key={result.mal_id} {...result} />;
        })}
        <ErrorButton />
      </div>
    );
  }
}

export default App;
