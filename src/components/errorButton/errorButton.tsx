import { Component } from 'react';

export class ErrorButton extends Component {
  state = { hasError: false };

  handleClick(): void {
    this.setState({ hasError: true });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('Something went wrong.');
    }
    return <button onClick={() => this.handleClick()}>Error</button>;
  }
}
