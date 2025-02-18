import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './search.module.css';
import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { LS_KEY } from '../../App';

const Search = () => {
  const [storedValue, setStoredValue] = useLocalStorage(LS_KEY);
  const [searchValue, setSearchValue] = useState(storedValue);
  const [inputValue, setInputValue] = useState(storedValue);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ q: searchValue, page: searchParams.get('page') ?? '1' });
  }, [setSearchParams, searchValue, searchParams]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(inputValue.trim());
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
