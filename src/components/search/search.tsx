import { ChangeEvent, Component, FormEvent } from 'react';
import { fetchData } from '../../api/fetchData';
import { CardProps } from '../../types/cardTypes';

interface SearchProps {
  handleSubmitForm: (search: string) => void;
  handleResults: (results: CardProps[]) => void;
}

class Search extends Component<SearchProps> {
  state = { search: '' };

  handleInput(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ search: e.target.value });
  }

  async handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { search } = this.state;
    const data = await fetchData(search);
    this.props.handleResults(data.data);
  }

  render() {
    return (
      <search>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
        >
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => this.handleInput(e)}
          />
          <button type="submit">Search</button>
        </form>
      </search>
    );
  }
}

export { Search };
