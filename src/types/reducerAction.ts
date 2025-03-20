import { CountryData } from './countryData';

export type ReducerAction =
  | { type: 'init'; payload: CountryData[] }
  | { type: 'all' }
  | { type: 'africa' }
  | { type: 'americas' }
  | { type: 'asia' }
  | { type: 'europe' }
  | { type: 'oceania' };
