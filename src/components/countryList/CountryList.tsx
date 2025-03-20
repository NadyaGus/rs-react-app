import { CountryData } from '../../types/countryData';
import { CountryItem } from '../countryItem/CountryItem';
import styles from './countryList.module.css';

export const CountryList = ({ countries }: { countries: CountryData[] }) => {
  return (
    <ul className={styles.list}>
      {countries.map((country) => (
        <CountryItem key={country.cca3} data={country} />
      ))}
    </ul>
  );
};
