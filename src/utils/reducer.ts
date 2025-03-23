import { CountryData } from '../types/countryData';
import { ReducerAction } from '../types/reducerAction';
import { Regions } from '../types/regions';
import { SortValues } from '../types/sortValues';

const filterData = (arr: CountryData[], value: string) => {
  if (value === 'all') {
    return arr;
  }
  return arr.filter((country) => country.region.toLowerCase() === value);
};

const searchData = (arr: CountryData[], value: string) => {
  if (value === '') {
    return arr;
  }
  return arr.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );
};

const sortData = (arr: CountryData[], value: SortValues) => {
  if (value === 'asc') {
    return [...arr].sort((a, b) => a.population - b.population);
  } else if (value === 'desc') {
    return [...arr].sort((a, b) => b.population - a.population);
  } else {
    return arr;
  }
};

const getValue = (
  allData: CountryData[],
  filterValue: Regions,
  sortValue: SortValues,
  searchValue: string
) => {
  const filteredData = filterData(allData, filterValue);
  const sortedData = sortData(filteredData, sortValue);
  const searchedData = searchData(sortedData, searchValue);

  return searchedData;
};

export function reducer(
  state: {
    allData: CountryData[];
    filteredData: CountryData[];
    filter: Regions;
    sort: SortValues;
    search: string;
  },
  action: ReducerAction
): {
  allData: CountryData[];
  filteredData: CountryData[];
  filter: Regions;
  sort: SortValues;
  search: string;
} {
  switch (action.type) {
    case 'init':
      return {
        allData: action.payload,
        filteredData: action.payload,
        filter: 'all',
        sort: 'default',
        search: '',
      };

    case 'all':
      return {
        allData: state.allData,
        filteredData: getValue(state.allData, 'all', state.sort, state.search),
        filter: 'all',
        sort: state.sort,
        search: state.search,
      };

    case 'filter':
      return {
        allData: state.allData,
        filteredData: getValue(
          state.allData,
          action.payload,
          state.sort,
          state.search
        ),
        filter: action.payload,
        sort: state.sort,
        search: state.search,
      };

    case 'search':
      return {
        allData: state.allData,
        filteredData: getValue(
          state.allData,
          state.filter,
          state.sort,
          action.payload
        ),
        filter: state.filter,
        sort: state.sort,
        search: action.payload,
      };

    case 'sortByPopulation':
      return {
        allData: state.allData,
        filteredData: getValue(
          state.allData,
          state.filter,
          action.payload,
          state.search
        ),
        filter: state.filter,
        sort: action.payload,
        search: state.search,
      };

    default:
      return state;
  }
}
