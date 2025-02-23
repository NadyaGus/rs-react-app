import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './search.module.css';
import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { LS_KEY } from '../../App';

const Search = () => {
  const [storedValue, setStoredValue] = useLocalStorage(LS_KEY);
  const [inputValue, setInputValue] = useState(storedValue);
  const setSearchParams = useSearchParams()[1];

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStoredValue(inputValue.trim());
    setSearchParams({ q: inputValue.trim(), page: '1' });
  };

  return (
    <div className={styles.search}>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className={styles.form}
      >
        <input
          type="search"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => handleInput(e)}
          className={styles.input}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export { Search };
