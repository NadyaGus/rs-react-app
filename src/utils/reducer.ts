import { CountryData } from '../types/countryData';
import { ReducerAction } from '../types/reducerAction';

export function reducer(
  state: { allData: CountryData[]; filteredData: CountryData[] },
  action: ReducerAction
): { allData: CountryData[]; filteredData: CountryData[] } {
  switch (action.type) {
    case 'init':
      return { allData: action.payload, filteredData: action.payload };
    case 'all':
      return { allData: state.allData, filteredData: state.allData };
    case 'africa':
      return {
        allData: state.allData,
        filteredData: state.allData.filter(
          (country) => country.region === 'Africa'
        ),
      };
    case 'americas':
      return {
        allData: state.allData,
        filteredData: state.allData.filter(
          (country) => country.region === 'Americas'
        ),
      };
    case 'asia':
      return {
        allData: state.allData,
        filteredData: state.allData.filter(
          (country) => country.region === 'Asia'
        ),
      };
    case 'europe':
      return {
        allData: state.allData,
        filteredData: state.allData.filter(
          (country) => country.region === 'Europe'
        ),
      };
    case 'oceania':
      return {
        allData: state.allData,
        filteredData: state.allData.filter(
          (country) => country.region === 'Oceania'
        ),
      };
    default:
      return state;
  }
}
