import { Component, FormEvent } from 'react';
import { showData } from '../../api/showData';

class Search extends Component {
  async handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await showData();
    console.log(data);
  }

  render() {
    return (
      <search>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type="search" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </search>
    );
  }
}

export { Search };
