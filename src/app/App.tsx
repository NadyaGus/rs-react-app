import { useEffect, useReducer, useMemo } from 'react';
import { CountryList } from '../components/countryList/CountryList';
import { FilterByRegion } from '../components/filterByRegion/filterByRegion';
import { reducer } from '../utils/reducer';
import { Search } from '../components/search/search';
import { SortByPopulation } from '../components/sortByPopulation/sortByPopulation';

function App() {
  const [data, dispatch] = useReducer(reducer, {
    allData: [],
    filteredData: [],
    filter: 'all',
    sort: 'default',
    search: '',
  });

  const filteredCountries = useMemo(() => {
    return data.filteredData;
  }, [data.filteredData]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const result = await response.json();
        dispatch({ type: 'init', payload: result });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Countries</h1>

      <div className="filters">
        <FilterByRegion dispatch={dispatch} />
        <Search dispatch={dispatch} />
        <SortByPopulation dispatch={dispatch} />
      </div>

      <CountryList countries={filteredCountries} />
    </>
  );
}

export default App;
