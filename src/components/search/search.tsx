import { ChangeEvent, Component, FormEvent } from 'react';

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
    this.props.handleSubmitForm(this.state.search);
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
            value={this.state.search}
            onChange={(e) => this.handleInput(e)}
          />
          <button type="submit">Search</button>
        </form>
      </search>
    );
  }
}

export { Search };
