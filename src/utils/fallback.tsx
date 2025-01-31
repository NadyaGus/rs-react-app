import { Component } from 'react';

class Fallback extends Component {
  render() {
    return (
      <div>
        <h1>
          Sorry. Something went wrong...
          <br />
          Please, reload the page
        </h1>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div>
    );
  }
}

export { Fallback };
