import { CountryData } from './countryData';
import { Regions } from './regions';

export type ReducerAction =
  | { type: 'init'; payload: CountryData[] }
  | { type: 'all' }
  | { type: 'filter'; payload: Regions }
  | { type: 'search'; payload: string }
  | { type: 'sortByPopulation'; payload: 'asc' | 'desc' | 'default' };
