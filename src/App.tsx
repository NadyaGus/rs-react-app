import { useEffect, useState } from 'react';

import './App.css';
import { Search } from './components/search/search';
import { CardProps } from './types/cardTypes';
import { Card } from './components/card/card';
import { fetchData } from './api/fetchData';
import { Loader } from './components/loader/loader';
import { ErrorButton } from './components/errorButton/errorButton';

export const LS_KEY = 'NADYA_GUS_KEY';

const App = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);

  useEffect(() => {
    const search = localStorage.getItem(LS_KEY) ?? '';
    setSearch(search);
    handleFetch(search);
  }, []);

  const handleSubmitForm = (searchValue: string) => {
    setSearch(searchValue);
    localStorage.setItem(LS_KEY, searchValue);
    handleFetch(searchValue);
  };

  const handleFetch = (value: string) => {
    setIsLoading(true);
    setIsFetchError(false);
    setResults([]);

    const data = fetchData(value);
    data
      .then((results) => {
        setResults(results.data);
      })
      .catch(() => {
        setIsFetchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <Search handleSubmitForm={handleSubmitForm} value={search} />
      {isLoading && <Loader />}
      {isFetchError && <p>Something went wrong</p>}
      {results &&
        results.map((result) => {
          return <Card key={result.mal_id} {...result} />;
        })}
      <ErrorButton />
    </div>
  );
};

export default App;
