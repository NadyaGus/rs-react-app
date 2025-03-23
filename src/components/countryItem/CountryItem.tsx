import { memo } from 'react';
import { CountryData } from '../../types/countryData';
import styles from './countryItem.module.css';
import { Checkbox } from '../checkbox/Checkbox';
import { useAppSelector } from '../../app/store';

type CountryItemProps = {
  country: CountryData;
};

export const CountryItem = memo(({ country }: CountryItemProps) => {
  const state = useAppSelector((state) =>
    state.visited.data.some((item) => item.cca3 === country.cca3)
  );

  return (
    <li className={styles.item + ' ' + (state ? styles.visited : '')}>
      <div className={styles.info}>
        <h2>{country.name.common}</h2>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <Checkbox country={country} />
      </div>

      <span className={styles.flag}>{country.flag}</span>
    </li>
  );
});

CountryItem.displayName = 'CountryItem';
