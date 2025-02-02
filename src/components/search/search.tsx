import { ChangeEvent, Component, FormEvent } from 'react';
import styles from './search.module.css';

interface SearchProps {
  handleSubmitForm: (search: string) => void;
  value: string;
}

class Search extends Component<SearchProps> {
  state = { search: '' };

  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ search: this.props.value });
    }
  }

  handleInput(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ search: e.target.value });
  }

  async handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.handleSubmitForm(this.state.search.trim());
  }

  render() {
    return (
      <search className={styles.search}>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
          className={styles.form}
        >
          <input
            type="search"
            placeholder="Search..."
            value={this.state.search}
            onChange={(e) => this.handleInput(e)}
            className={styles.input}
          />
          <button type="submit">Search</button>
        </form>
      </search>
    );
  }
}

export { Search };
