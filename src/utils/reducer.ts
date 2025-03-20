import { CountryData } from '../types/countryData';
import { ReducerAction } from '../types/reducerAction';
import { Regions } from '../types/regions';

const filterData = (arr: CountryData[], value: string) => {
  return arr.filter((country) => country.region.toLowerCase() === value);
};

const searchData = (arr: CountryData[], value: string) => {
  return arr.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );
};

export function reducer(
  state: {
    allData: CountryData[];
    filteredData: CountryData[];
    filter: Regions;
  },
  action: ReducerAction
): { allData: CountryData[]; filteredData: CountryData[]; filter: Regions } {
  switch (action.type) {
    case 'init':
      return {
        allData: action.payload,
        filteredData: action.payload,
        filter: 'all',
      };

    case 'all':
      return {
        allData: state.allData,
        filteredData: state.allData,
        filter: 'all',
      };

    case 'filter':
      return {
        allData: state.allData,
        filteredData: filterData(state.allData, action.payload),
        filter: action.payload,
      };

    case 'search':
      if (state.filter !== 'all') {
        const filteredData = filterData(state.allData, state.filter);
        return {
          allData: state.allData,
          filteredData: searchData(filteredData, action.payload),
          filter: state.filter,
        };
      } else {
        return {
          allData: state.allData,
          filteredData: searchData(state.allData, action.payload),
          filter: state.filter,
        };
      }
    default:
      return state;
  }
}
