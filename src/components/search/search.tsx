import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './search.module.css';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { LS_KEY } from '../../pages';
import { useRouter } from 'next/router';

const Search = () => {
  // TODO: fix local storage for SSR
  const [storedValue, setStoredValue] = useLocalStorage(LS_KEY);
  const [inputValue, setInputValue] = useState(storedValue);
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStoredValue(inputValue.trim());
    router.push(`?q=${inputValue.trim()}`);
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
