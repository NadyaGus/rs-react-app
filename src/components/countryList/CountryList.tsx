import { memo, useCallback } from 'react';
import { CountryData } from '../../types/countryData';
import { CountryItem } from '../countryItem/CountryItem';
import styles from './countryList.module.css';

type CountryListProps = {
  countries: CountryData[];
  visited: string[];
  setVisited: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CountryList = memo(
  ({ countries, visited, setVisited }: CountryListProps) => {
    const checkVisited = useCallback(
      (country: CountryData) => {
        return visited.some((visited) => visited === country.cca3);
      },
      [visited]
    );

    if (countries.length === 0) {
      return <p>No countries found</p>;
    }

    return (
      <ul className={styles.list}>
        {countries.map((country) => (
          <CountryItem
            data={country}
            key={country.cca3}
            isVisited={checkVisited(country)}
            setVisited={setVisited}
          />
        ))}
      </ul>
    );
  }
);

CountryList.displayName = 'CountryList';
