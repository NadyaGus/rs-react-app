import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './search.module.css';

interface SearchProps {
  handleSubmitForm: (search: string) => void;
  value: string;
}

const Search = (props: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(props.value);
  }, [props.value]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handleSubmitForm(searchValue.trim());
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
          value={searchValue}
          onChange={(e) => handleInput(e)}
          className={styles.input}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export { Search };
