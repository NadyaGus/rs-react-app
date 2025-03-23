import { memo } from 'react';
import { CountryData } from '../../types/countryData';
import { CountryItem } from '../countryItem/CountryItem';
import styles from './countryList.module.css';

type CountryListProps = {
  countries: CountryData[];
};

export const CountryList = memo(({ countries }: CountryListProps) => {
  if (countries.length === 0) {
    return <p>No countries found</p>;
  }

  return (
    <ul className={styles.list}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.cca3} />
      ))}
    </ul>
  );
});

CountryList.displayName = 'CountryList';
