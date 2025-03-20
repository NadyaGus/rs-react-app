import { CountryData } from '../../types/countryData';
import { CountryItem } from '../countryItem/CountryItem';
import styles from './countryList.module.css';

export const CountryList = ({ countries }: { countries: CountryData[] }) => {
  if (countries.length === 0) {
    return <p>No countries found</p>;
  }
  return (
    <ul className={styles.list}>
      {countries.map((country) => (
        <CountryItem data={country} key={country.cca3} />
      ))}
    </ul>
  );
};
