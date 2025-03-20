import { CountryData } from '../../types/countryData';
import styles from './countryItem.module.css';

export const CountryItem = ({ data }: { data: CountryData }) => {
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <h2>{data.name.common}</h2>
        <p>Population: {data.population}</p>
        <p>Region: {data.region}</p>
      </div>

      <span className={styles.flag}>{data.flag}</span>
    </li>
  );
};
