import { memo } from 'react';
import { CountryData } from '../../types/countryData';
import styles from './countryItem.module.css';
import { Checkbox } from '../checkbox/Checkbox';

type CountryItemProps = {
  data: CountryData;
};

export const CountryItem = memo(({ data }: CountryItemProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <h2>{data.name.common}</h2>
        <p>Population: {data.population}</p>
        <p>Region: {data.region}</p>
        <Checkbox country={data} />
      </div>

      <span className={styles.flag}>{data.flag}</span>
    </li>
  );
});

CountryItem.displayName = 'CountryItem';
