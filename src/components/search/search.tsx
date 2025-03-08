import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './search.module.css';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const { q: queryParam = '' } = router.query;
  const [inputValue, setInputValue] = useState([...queryParam].join(''));

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
