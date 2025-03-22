import { memo, useState } from 'react';
import { CountryData } from '../../types/countryData';
import styles from './countryItem.module.css';

type CountryItemProps = {
  data: CountryData;
  isVisited: boolean;
  setVisited: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CountryItem = memo(
  ({ data, isVisited, setVisited }: CountryItemProps) => {
    const [isVisitedState, setIsVisitedState] = useState(isVisited);

    const handleClick = () => {
      if (isVisitedState) {
        setIsVisitedState(false);
        setVisited((prev) => prev.filter((visited) => visited !== data.cca3));
      } else {
        setIsVisitedState(true);
        setVisited((prev) => [...prev, data.cca3]);
      }
    };

    return (
      <li className={styles.item}>
        <div className={styles.info}>
          <h2>{data.name.common}</h2>
          <p>Population: {data.population}</p>
          <p>Region: {data.region}</p>
          <label className={styles.visited} htmlFor="visited">
            Visited:{' '}
            <input
              type="checkbox"
              name="visited"
              checked={isVisitedState}
              onChange={handleClick}
            />
          </label>
        </div>

        <span className={styles.flag}>{data.flag}</span>
      </li>
    );
  }
);

CountryItem.displayName = 'CountryItem';
